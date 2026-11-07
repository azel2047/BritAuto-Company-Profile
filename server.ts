import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI, ThinkingLevel } from '@google/genai';
import {
  routeSeoTranslations,
  resolveRouteKeyFromLocation,
} from './src/data/seoRoutes.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function getGenAIClient() {
  return new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY || 'MISSING_API_KEY',
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

function injectRouteMetaTags(html: string, reqPath: string, appUrl: string): string {
  const routeKey = resolveRouteKeyFromLocation(reqPath, '');
  const meta =
    routeSeoTranslations.id[routeKey] || routeSeoTranslations.id.beranda;

  const baseUrl = (appUrl || 'https://britauto.id').replace(/\/+$/, '');
  const canonicalUrl =
    meta.routeKey === 'beranda' ? `${baseUrl}/` : `${baseUrl}/${meta.routeKey}`;

  return html
    .replace(/<title>.*?<\/title>/s, `<title>${meta.title}</title>`)
    .replace(
      /<meta\s+name="description"\s+content="[^"]*"\s*\/>/,
      `<meta name="description" content="${meta.description}" />`
    )
    .replace(
      /<link\s+rel="canonical"\s+href="[^"]*"\s*\/>/,
      `<link rel="canonical" href="${canonicalUrl}" />`
    )
    .replace(
      /<meta\s+property="og:url"\s+content="[^"]*"\s*\/>/,
      `<meta property="og:url" content="${canonicalUrl}" />`
    )
    .replace(
      /<meta\s+property="og:title"\s+content="[^"]*"\s*\/>/,
      `<meta property="og:title" content="${meta.ogTitle}" />`
    )
    .replace(
      /<meta\s+property="og:description"\s+content="[^"]*"\s*\/>/,
      `<meta property="og:description" content="${meta.ogDescription}" />`
    )
    .replace(
      /<meta\s+name="twitter:url"\s+content="[^"]*"\s*\/>/,
      `<meta name="twitter:url" content="${canonicalUrl}" />`
    )
    .replace(
      /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/>/,
      `<meta name="twitter:title" content="${meta.twitterTitle}" />`
    )
    .replace(
      /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/>/,
      `<meta name="twitter:description" content="${meta.twitterDescription}" />`
    );
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '1mb' }));

  // Server-side endpoint for complex British vehicle symptom analysis using gemini-4-argon with HIGH thinking
  app.post('/api/diagnose', async (req, res) => {
    try {
      const { merek, modelTahun, layanan, keluhan } = req.body ?? {};

      if (!merek || !keluhan || typeof keluhan !== 'string' || keluhan.trim().length < 5) {
        res.status(400).json({
          error: 'Mohon pilih merek kendaraan dan tuliskan deskripsi keluhan minimal 5 karakter.',
        });
        return;
      }

      const prompt = [
        `Merek Mobil Inggris: ${String(merek).slice(0, 32)}`,
        `Model & Tahun: ${String(modelTahun || 'Tidak disebutkan').slice(0, 100)}`,
        `Kategori Layanan: ${String(layanan || 'Pemeriksaan Umum').slice(0, 80)}`,
        `Keluhan / Gejala Kendaraan: ${String(keluhan).slice(0, 1000)}`,
      ].join('\n');

      const ai = getGenAIClient();
      const response = await ai.models.generateContent({
        model: 'gemini-4-argon',
        contents: prompt,
        config: {
          systemInstruction:
            'Anda adalah asisten teknis pra-diagnosa di Brit Auto, bengkel spesialis mobil Inggris (Jaguar, Land Rover, Bentley, Rolls-Royce) di Jl. Karang Tengah Raya No. 9, Cilandak, Jakarta Selatan yang dipimpin oleh Bapak Agus Sugiantu (berpengalaman di dunia perbengkelan sejak 1999). Berikan ringkasan pra-diagnosa teknis dalam Bahasa Indonesia yang sopan, terstruktur, jelas, dan akurat dalam 3 poin singkat: (1) Kemungkinan komponen atau sistem yang perlu diperiksa, (2) Langkah pemeriksaan awal di bengkel, dan (3) Pengingat bahwa estimasi biaya pasti hanya diberikan setelah pemeriksaan langsung oleh teknisi dan disetujui pemilik sebelum pengerjaan dimulai. Jangan mengarang harga atau menjanjikan waktu pasti.',
          thinkingConfig: {
            thinkingLevel: ThinkingLevel.HIGH,
          },
        },
      });

      const analysisText = response.text ?? '';
      res.json({ analysis: analysisText });
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : 'Gagal menjalankan pra-diagnosa otomatis. Silakan langsung hubungi kami melalui WhatsApp.';
      console.error('Gemini API Error (/api/diagnose):', message);
      res.status(500).json({
        error:
          'Layanan analisis teknis otomatis sedang tidak tersedia. Anda tetap dapat menyimpan catatan atau langsung berkonsultasi via WhatsApp.',
        details: message,
      });
    }
  });

  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'custom',
    });
    app.use(vite.middlewares);

    app.use(async (req, res, next) => {
      try {
        const url = req.originalUrl;
        const templatePath = path.resolve(__dirname, 'index.html');
        let template = fs.readFileSync(templatePath, 'utf-8');
        template = await vite.transformIndexHtml(url, template);
        const htmlWithMeta = injectRouteMetaTags(
          template,
          req.path,
          process.env.APP_URL || `${req.protocol}://${req.get('host')}`
        );
        res.status(200).set({ 'Content-Type': 'text/html' }).end(htmlWithMeta);
      } catch (err) {
        next(err);
      }
    });
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath, { index: false }));
    app.use((req, res) => {
      const indexPath = path.join(distPath, 'index.html');
      const rawHtml = fs.readFileSync(indexPath, 'utf-8');
      const htmlWithMeta = injectRouteMetaTags(
        rawHtml,
        req.path,
        process.env.APP_URL || `${req.protocol}://${req.get('host')}`
      );
      res.status(200).set({ 'Content-Type': 'text/html' }).send(htmlWithMeta);
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Brit Auto server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
