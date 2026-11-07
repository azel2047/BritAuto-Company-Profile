/**
 * Route-specific Open Graph and Twitter metadata definitions for Brit Auto
 * Supports both Bahasa Indonesia ('id') and English ('en') across all routes and section anchors.
 */

import type { Language } from './content.ts';

export type RouteKey =
  | 'beranda'
  | 'merek'
  | 'layanan'
  | 'tentang'
  | 'galeri'
  | 'cara-kerja'
  | 'faq'
  | 'kontak';

export interface RouteSeoMetadata {
  routeKey: RouteKey;
  path: string;
  hash: string;
  title: string;
  description: string;
  ogTitle: string;
  ogDescription: string;
  ogType: 'website' | 'article';
  twitterCard: 'summary_large_image';
  twitterTitle: string;
  twitterDescription: string;
}

export const routeSeoTranslations: Record<
  Language,
  Record<RouteKey, RouteSeoMetadata>
> = {
  id: {
    beranda: {
      routeKey: 'beranda',
      path: '/',
      hash: '#beranda',
      title: 'Brit Auto | Bengkel Spesialis Mobil Inggris di Jakarta Selatan',
      description:
        'Brit Auto melayani perawatan dan perbaikan Jaguar, Land Rover, Bentley dan Rolls-Royce di Cilandak, Jakarta Selatan. Teknisi berpengalaman, estimasi biaya jelas.',
      ogTitle: 'Brit Auto | Bengkel Spesialis Mobil Inggris di Jakarta Selatan',
      ogDescription:
        'Perawatan dan perbaikan Jaguar, Land Rover, Bentley dan Rolls-Royce di Cilandak, Jakarta Selatan dengan estimasi biaya yang jelas sebelum pengerjaan.',
      ogType: 'website',
      twitterCard: 'summary_large_image',
      twitterTitle: 'Brit Auto | Bengkel Spesialis Mobil Inggris di Jakarta Selatan',
      twitterDescription:
        'Brit Auto melayani perawatan dan perbaikan Jaguar, Land Rover, Bentley dan Rolls-Royce di Cilandak, Jakarta Selatan. Teknisi berpengalaman, estimasi biaya jelas.',
    },
    merek: {
      routeKey: 'merek',
      path: '/merek',
      hash: '#merek',
      title: 'Merek Mobil Inggris: Jaguar, Land Rover, Bentley & Rolls-Royce | Brit Auto',
      description:
        'Spesialis perawatan dan perbaikan Jaguar, Land Rover, Bentley, dan Rolls-Royce di Jakarta Selatan. Fokus pada mobil Inggris, bukan bengkel umum.',
      ogTitle: 'Spesialis Jaguar, Land Rover, Bentley & Rolls-Royce | Brit Auto',
      ogDescription:
        'Penanganan khusus untuk empat merek mobil mewah Inggris di Cilandak, Jakarta Selatan oleh teknisi berpengalaman.',
      ogType: 'website',
      twitterCard: 'summary_large_image',
      twitterTitle: 'Spesialis Jaguar, Land Rover, Bentley & Rolls-Royce | Brit Auto',
      twitterDescription:
        'Fokus pada perawatan dan perbaikan Jaguar, Land Rover, Bentley, serta Rolls-Royce di Jakarta Selatan.',
    },
    layanan: {
      routeKey: 'layanan',
      path: '/layanan',
      hash: '#layanan',
      title: 'Layanan Servis, Diagnosa Komputer & Perbaikan Mobil Inggris | Brit Auto',
      description:
        'Layanan lengkap mobil Inggris di Brit Auto: Diagnosa Komputer, Servis Berkala, Perbaikan Mobil Bermasalah, AC & Pendingin, Kelistrikan, Suspensi, Mesin & Transmisi.',
      ogTitle: 'Layanan Perawatan & Perbaikan Mobil Inggris | Brit Auto Jakarta Selatan',
      ogDescription:
        'Dari diagnosa komputer dan servis berkala hingga penanganan mobil Inggris yang sedang bermasalah dengan estimasi biaya transparan.',
      ogType: 'website',
      twitterCard: 'summary_large_image',
      twitterTitle: 'Layanan Servis & Diagnosa Mobil Inggris | Brit Auto',
      twitterDescription:
        'Diagnosa komputer, servis berkala, kelistrikan, suspensi udara, mesin & transmisi untuk Jaguar, Land Rover, Bentley, dan Rolls-Royce.',
    },
    tentang: {
      routeKey: 'tentang',
      path: '/tentang',
      hash: '#tentang',
      title: 'Tentang Brit Auto | Dipimpin Bapak Agus Sugiantu (Pengalaman Sejak 1999)',
      description:
        'Brit Auto dipimpin langsung oleh Bapak Agus Sugiantu yang berpengalaman di dunia perbengkelan sejak 1999. Berdiri pada 2022 dengan 4 teknisi berpengalaman.',
      ogTitle: 'Tentang Brit Auto | Dikelola Langsung oleh Ahlinya Sejak 1999',
      ogDescription:
        'Kenali Brit Auto di Cilandak, Jakarta Selatan—bengkel spesialis mobil Inggris yang dipimpin oleh Bapak Agus Sugiantu bersama 4 teknisi berpengalaman.',
      ogType: 'website',
      twitterCard: 'summary_large_image',
      twitterTitle: 'Tentang Brit Auto | Spesialis Mobil Inggris Jakarta Selatan',
      twitterDescription:
        'Dipimpin langsung oleh Bapak Agus Sugiantu (pengalaman perbengkelan sejak 1999) dengan fokus pada mobil pabrikan Inggris.',
    },
    galeri: {
      routeKey: 'galeri',
      path: '/galeri',
      hash: '#galeri',
      title: 'Galeri Dokumentasi Bengkel & Pengerjaan Mobil Inggris | Brit Auto',
      description:
        'Dokumentasi pengerjaan ruang mesin, diagnosa komputer, suspensi udara, dan servis berkala Jaguar, Land Rover, Bentley, serta Rolls-Royce di Brit Auto Cilandak.',
      ogTitle: 'Galeri Dokumentasi Pengerjaan Mobil Inggris | Brit Auto Jakarta Selatan',
      ogDescription:
        'Standar kerapian kerja dan ketelitian diagnosa teknis pada ruang mesin serta sistem elektronik mobil mewah Inggris di bengkel Brit Auto.',
      ogType: 'website',
      twitterCard: 'summary_large_image',
      twitterTitle: 'Galeri Bengkel & Dokumentasi Servis | Brit Auto',
      twitterDescription:
        'Dokumentasi pengerjaan teknis Jaguar, Land Rover, Bentley, dan Rolls-Royce tanpa menampilkan identitas atau pelat nomor klien.',
    },
    'cara-kerja': {
      routeKey: 'cara-kerja',
      path: '/cara-kerja',
      hash: '#cara-kerja',
      title: 'Cara Kerja & Transparansi Estimasi Biaya Servis | Brit Auto',
      description:
        'Alur kerja transparan di Brit Auto: mobil datang & didata, pemeriksaan sumber masalah, estimasi biaya disetujui sebelum pengerjaan, hingga serah terima.',
      ogTitle: 'Cara Kerja Kami | Estimasi Biaya Disetujui Sebelum Pengerjaan — Brit Auto',
      ogDescription:
        '4 tahap pengerjaan yang rapi dan transparan di Brit Auto Cilandak. Biaya diperkirakan dan disetujui Anda sebelum pengerjaan dimulai.',
      ogType: 'website',
      twitterCard: 'summary_large_image',
      twitterTitle: 'Cara Kerja & Estimasi Biaya Transparan | Brit Auto',
      twitterDescription:
        'Pendataan keluhan, pemeriksaan teknisi, persetujuan estimasi biaya di awal, dan serah terima kendaraan yang rapi.',
    },
    faq: {
      routeKey: 'faq',
      path: '/faq',
      hash: '#faq',
      title: 'FAQ Servis Mobil Inggris: Durasi, Garansi & Pembayaran | Brit Auto',
      description:
        'Jawaban atas pertanyaan umum seputar durasi servis, garansi pengerjaan & suku cadang, serta metode pembayaran di bengkel Brit Auto Jakarta Selatan.',
      ogTitle: 'Pertanyaan Umum (FAQ) Servis Mobil Inggris | Brit Auto',
      ogDescription:
        'Informasi lengkap mengenai estimasi waktu pengerjaan, garansi servis, metode pembayaran, dan reservasi di Brit Auto Cilandak.',
      ogType: 'website',
      twitterCard: 'summary_large_image',
      twitterTitle: 'FAQ Servis, Garansi & Pembayaran | Brit Auto',
      twitterDescription:
        'Ketahui durasi servis, cakupan garansi pengerjaan, dan metode pembayaran di Brit Auto Jakarta Selatan.',
    },
    kontak: {
      routeKey: 'kontak',
      path: '/kontak',
      hash: '#kontak',
      title: 'Hubungi Brit Auto | Lokasi Bengkel Cilandak, Jakarta Selatan & WhatsApp',
      description:
        'Kunjungi Brit Auto di Jl. Karang Tengah Raya No. 9, Cilandak, Jakarta Selatan atau hubungi WhatsApp 0812-8700-0772 dan email admin@britauto.id.',
      ogTitle: 'Hubungi Brit Auto | Jl. Karang Tengah Raya No. 9, Cilandak, Jakarta Selatan',
      ogDescription:
        'Konsultasikan servis atau keluhan mobil Inggris Anda melalui WhatsApp 0812-8700-0772 atau kunjungi bengkel kami di Cilandak, Jakarta Selatan.',
      ogType: 'website',
      twitterCard: 'summary_large_image',
      twitterTitle: 'Kontak & Lokasi Bengkel Brit Auto Cilandak | 0812-8700-0772',
      twitterDescription:
        'Jl. Karang Tengah Raya No. 9, Cilandak, Jakarta Selatan · WhatsApp 0812-8700-0772 · admin@britauto.id.',
    },
  },
  en: {
    beranda: {
      routeKey: 'beranda',
      path: '/',
      hash: '#beranda',
      title: 'Brit Auto | Specialist British Car Workshop in South Jakarta',
      description:
        'Brit Auto provides maintenance and repair for Jaguar, Land Rover, Bentley, and Rolls-Royce in Cilandak, South Jakarta. Experienced technicians, transparent estimates.',
      ogTitle: 'Brit Auto | Specialist British Car Workshop in South Jakarta',
      ogDescription:
        'Expert care for Jaguar, Land Rover, Bentley, and Rolls-Royce in Cilandak, South Jakarta with clear cost estimates approved before work begins.',
      ogType: 'website',
      twitterCard: 'summary_large_image',
      twitterTitle: 'Brit Auto | Specialist British Car Workshop in South Jakarta',
      twitterDescription:
        'Maintenance and repair for Jaguar, Land Rover, Bentley, and Rolls-Royce in Cilandak, South Jakarta. Experienced technicians, transparent cost estimates.',
    },
    merek: {
      routeKey: 'merek',
      path: '/merek',
      hash: '#merek',
      title: 'British Marques We Service: Jaguar, Land Rover, Bentley & Rolls-Royce | Brit Auto',
      description:
        'Dedicated maintenance and repair for Jaguar, Land Rover, Bentley, and Rolls-Royce in South Jakarta. Focused exclusively on British luxury cars.',
      ogTitle: 'Jaguar, Land Rover, Bentley & Rolls-Royce Specialist | Brit Auto',
      ogDescription:
        'Boutique specialist care for British luxury marques in Cilandak, South Jakarta handled by experienced technicians.',
      ogType: 'website',
      twitterCard: 'summary_large_image',
      twitterTitle: 'Jaguar, Land Rover, Bentley & Rolls-Royce Specialist | Brit Auto',
      twitterDescription:
        'Focused on British luxury automobiles—Jaguar, Land Rover, Bentley, and Rolls-Royce—in South Jakarta.',
    },
    layanan: {
      routeKey: 'layanan',
      path: '/layanan',
      hash: '#layanan',
      title: 'Services, Computer Diagnostics & Trouble Case Repair | Brit Auto',
      description:
        'Comprehensive British car services at Brit Auto: Computer Diagnostics, Periodic Maintenance, Trouble Case Repair, AC & Cooling, Electrical, Suspension, Engine & Transmission.',
      ogTitle: 'British Car Maintenance & Diagnostic Services | Brit Auto South Jakarta',
      ogDescription:
        'From computer diagnostics and routine servicing to complex trouble-case repairs with transparent cost approval.',
      ogType: 'website',
      twitterCard: 'summary_large_image',
      twitterTitle: 'British Car Services & Diagnostics | Brit Auto',
      twitterDescription:
        'Computer diagnostics, periodic maintenance, air suspension, electrical, and engine care for Jaguar, Land Rover, Bentley, and Rolls-Royce.',
    },
    tentang: {
      routeKey: 'tentang',
      path: '/tentang',
      hash: '#tentang',
      title: 'About Brit Auto | Led by Mr. Agus Sugiantu (21+ Years Experience Since 1999)',
      description:
        'Brit Auto is led directly by Mr. Agus Sugiantu, with automotive workshop experience since 1999. Founded in 2022 in South Jakarta with 4 experienced technicians.',
      ogTitle: 'About Brit Auto | Directly Managed by the Specialist Since 1999',
      ogDescription:
        'Meet Brit Auto in Cilandak, South Jakarta—a boutique British car specialist workshop led by Mr. Agus Sugiantu and 4 experienced technicians.',
      ogType: 'website',
      twitterCard: 'summary_large_image',
      twitterTitle: 'About Brit Auto | British Car Specialist South Jakarta',
      twitterDescription:
        'Led directly by Mr. Agus Sugiantu (workshop experience since 1999) focusing on British-built luxury cars and trouble cases.',
    },
    galeri: {
      routeKey: 'galeri',
      path: '/galeri',
      hash: '#galeri',
      title: 'Workshop Documentation & British Car Service Gallery | Brit Auto',
      description:
        'Technical documentation of engine bay inspections, computer diagnostics, air suspension calibration, and periodic maintenance at Brit Auto South Jakarta.',
      ogTitle: 'British Car Workshop Gallery & Documentation | Brit Auto South Jakarta',
      ogDescription:
        'Explore our clean workshop standards, diagnostic bays, and technical care for Jaguar, Land Rover, Bentley, and Rolls-Royce in Cilandak.',
      ogType: 'website',
      twitterCard: 'summary_large_image',
      twitterTitle: 'Workshop & Technical Documentation Gallery | Brit Auto',
      twitterDescription:
        'Technical service documentation for British luxury marques with strict client privacy protection.',
    },
    'cara-kerja': {
      routeKey: 'cara-kerja',
      path: '/cara-kerja',
      hash: '#cara-kerja',
      title: 'How We Work & Transparent Cost Estimation | Brit Auto',
      description:
        'Transparent 4-step workflow at Brit Auto: vehicle arrival & logging, root-cause inspection, upfront cost estimate approval, and verified handover.',
      ogTitle: 'How We Work | Cost Estimates Approved Before Work Begins — Brit Auto',
      ogDescription:
        'Clear 4-stage service process at Brit Auto Cilandak. Every cost estimate is approved by you before any repair work starts.',
      ogType: 'website',
      twitterCard: 'summary_large_image',
      twitterTitle: 'How We Work & Transparent Estimates | Brit Auto',
      twitterDescription:
        'Symptom logging, technician inspection, upfront cost approval before work begins, and thorough vehicle handover.',
    },
    faq: {
      routeKey: 'faq',
      path: '/faq',
      hash: '#faq',
      title: 'FAQ: Service Duration, Warranty & Payment Methods | Brit Auto',
      description:
        'Answers to common questions about British car service duration, workmanship & parts warranty, and payment methods at Brit Auto South Jakarta.',
      ogTitle: 'Frequently Asked Questions (FAQ) | Brit Auto South Jakarta',
      ogDescription:
        'Learn about service timeframes, warranty coverage, payment options, and scheduling at Brit Auto Cilandak.',
      ogType: 'website',
      twitterCard: 'summary_large_image',
      twitterTitle: 'FAQ: Service Duration, Warranty & Payment | Brit Auto',
      twitterDescription:
        'Everything you need to know about service duration, warranty coverage, and payment methods at Brit Auto.',
    },
    kontak: {
      routeKey: 'kontak',
      path: '/kontak',
      hash: '#kontak',
      title: 'Contact Brit Auto | Cilandak South Jakarta Workshop Location & WhatsApp',
      description:
        'Visit Brit Auto at Jl. Karang Tengah Raya No. 9, Cilandak, South Jakarta or contact us via WhatsApp at 0812-8700-0772 and email admin@britauto.id.',
      ogTitle: 'Contact Brit Auto | Jl. Karang Tengah Raya No. 9, Cilandak, South Jakarta',
      ogDescription:
        'Consult with Brit Auto regarding your British car via WhatsApp 0812-8700-0772 or visit our workshop in Cilandak, South Jakarta.',
      ogType: 'website',
      twitterCard: 'summary_large_image',
      twitterTitle: 'Contact & Location — Brit Auto Cilandak | 0812-8700-0772',
      twitterDescription:
        'Jl. Karang Tengah Raya No. 9, Cilandak, South Jakarta · WhatsApp 0812-8700-0772 · admin@britauto.id.',
    },
  },
};

export function resolveRouteKeyFromLocation(
  pathname: string,
  hash: string
): RouteKey {
  const cleanHash = hash.replace(/^#/, '').trim().toLowerCase();
  if (
    cleanHash === 'merek' ||
    cleanHash === 'layanan' ||
    cleanHash === 'tentang' ||
    cleanHash === 'galeri' ||
    cleanHash === 'cara-kerja' ||
    cleanHash === 'faq' ||
    cleanHash === 'kontak' ||
    cleanHash === 'beranda'
  ) {
    return cleanHash;
  }

  const cleanPath = pathname.replace(/^\/+|\/+$/g, '').toLowerCase();
  if (
    cleanPath === 'merek' ||
    cleanPath === 'layanan' ||
    cleanPath === 'tentang' ||
    cleanPath === 'galeri' ||
    cleanPath === 'cara-kerja' ||
    cleanPath === 'faq' ||
    cleanPath === 'kontak' ||
    cleanPath === 'beranda'
  ) {
    return cleanPath;
  }

  return 'beranda';
}
