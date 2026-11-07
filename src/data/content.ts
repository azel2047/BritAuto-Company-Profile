/**
 * ALL EDITABLE WEBSITE CONTENT FOR BRIT AUTO (BAHASA INDONESIA & ENGLISH)
 * Non-programmers can edit text, services, brands, process steps,
 * contact details, and image paths directly in this single file.
 */

export type Language = 'id' | 'en';

export interface NavItem {
  label: string;
  href: string;
}

export interface BrandItem {
  id: string;
  name: 'Jaguar' | 'Land Rover' | 'Bentley' | 'Rolls-Royce';
  tagline: string;
  models: string;
  specialtyNote: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  iconName:
    | 'Cpu'
    | 'CalendarCheck'
    | 'Wrench'
    | 'Snowflake'
    | 'Zap'
    | 'Gauge'
    | 'Cog'
    | 'PackageCheck';
  highlighted?: boolean;
  whatsappMessage: string;
}

export interface StatItem {
  value: string;
  label: string;
}

export interface ProcessStepItem {
  stepNumber: string;
  title: string;
  description: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface TestimonialItem {
  id: string;
  marque: 'Jaguar' | 'Land Rover' | 'Bentley' | 'Rolls-Royce';
  vehicleModel: string;
  serviceCategory: string;
  quote: string;
  ownerTitle: string;
  location: string;
}

export interface GalleryItem {
  id: string;
  /** Set `imageUrl` to a path inside `/public/...` when a real workshop photo is ready. Leave empty `""` to render the neutral luxury workshop placeholder. */
  imageUrl: string;
  title: string;
  category: string;
  marque: 'Jaguar' | 'Land Rover' | 'Bentley' | 'Rolls-Royce';
  description: string;
  technicalNote: string;
  alt: string;
  iconName: 'Cpu' | 'Cog' | 'Gauge' | 'Wrench' | 'Zap' | 'CarFront';
}

export interface ImagePlaceholderSlot {
  /** Set `imageUrl` to a path inside `/public/...` when a real photo is ready (e.g. "/foto-bengkel.jpg"). Leave empty `""` to render the neutral workshop placeholder. */
  imageUrl: string;
  alt: string;
  caption: string;
  subcaption: string;
}

const idContent = {
  business: {
    name: 'Brit Auto',
    tagline: 'Spesialis perawatan mobil Inggris di Jakarta Selatan.',
    foundedYear: '2022',
    ownerName: 'Bapak Agus Sugiantu',
    ownerExperienceSince: '1999',
    /** Set `logoImageUrl` to an image path (e.g. "/logo-brit-auto.png") to replace the text wordmark with an image logo */
    logoImageUrl: '',
  },

  contact: {
    address: 'Jl. Karang Tengah Raya No. 9, Cilandak, Jakarta Selatan',
    phoneDisplay: '0812-8700-0772',
    phoneTelHref: 'tel:+6281287000772',
    whatsappBaseUrl: 'https://wa.me/628128700772',
    defaultWhatsappMessage:
      'Halo Brit Auto, saya ingin konsultasi servis mobil saya.',
    email: 'admin@britauto.id',
    emailHref: 'mailto:admin@britauto.id',
    openingHoursPlaceholder: 'Jam operasional: [isi sesuai jam buka]',
    googleMapsDirectionsUrl:
      'https://www.google.com/maps/search/?api=1&query=Jl.+Karang+Tengah+Raya+No.+9,+Cilandak,+Jakarta+Selatan',
    googleMapsEmbedUrl:
      'https://www.google.com/maps?q=Jl.+Karang+Tengah+Raya+No.+9,+Cilandak,+Jakarta+Selatan&output=embed',
    labels: {
      address: 'Alamat Bengkel',
      phone: 'Telepon & WhatsApp',
      email: 'Email Resmi',
      hours: 'Waktu Layanan',
      loadingMap: 'Memuat peta lokasi bengkel...',
      mapIframeTitle:
        'Peta Lokasi Bengkel Brit Auto di Jl. Karang Tengah Raya No. 9, Cilandak, Jakarta Selatan',
    },
  },

  navbar: {
    links: [
      { label: 'Beranda', href: '#beranda' },
      { label: 'Merek', href: '#merek' },
      { label: 'Layanan', href: '#layanan' },
      { label: 'Tentang', href: '#tentang' },
      { label: 'Galeri', href: '#galeri' },
      { label: 'Cara Kerja', href: '#cara-kerja' },
      { label: 'FAQ', href: '#faq' },
      { label: 'Kontak', href: '#kontak' },
    ] as NavItem[],
    ctaLabel: 'Hubungi Kami',
    languageToggleAria: 'Ganti bahasa ke Bahasa Inggris',
    themeToggleDarkAria: 'Aktifkan mode gelap',
    themeToggleLightAria: 'Aktifkan mode terang',
    openMenuAria: 'Buka menu navigasi',
    closeMenuAria: 'Tutup menu navigasi',
  },

  hero: {
    badge: 'Spesialis Mobil Inggris',
    headline: 'Perawatan Mobil Inggris, Ditangani Ahlinya',
    subheadline:
      'Brit Auto melayani Jaguar, Land Rover, Bentley dan Rolls-Royce dengan teknisi berpengalaman dan estimasi biaya yang jelas sebelum pengerjaan.',
    primaryCta: 'Chat WhatsApp',
    secondaryCta: 'Lihat Layanan',
    secondaryHref: '#layanan',
    floatingCards: {
      left: {
        number: '21+',
        label: 'Tahun pengalaman pemilik di dunia perbengkelan',
        chip: 'Sejak 1999',
      },
      center: {
        label: 'Spesialis Merek Inggris',
        brandsLine: 'Jaguar · Land Rover · Bentley · Rolls-Royce',
        chip: '4 Teknisi Berpengalaman',
        imageSlot: {
          imageUrl: '',
          alt: 'Area pengerjaan mesin mobil Inggris di bengkel Brit Auto Cilandak',
          caption: 'Foto bengkel',
          subcaption: 'Slot foto ruang mesin / bengkel Brit Auto',
        } as ImagePlaceholderSlot,
      },
      right: {
        chip: 'Transparan',
        title: 'Estimasi biaya disetujui sebelum pengerjaan',
        detail:
          'Rincian pemeriksaan dan perkiraan biaya disampaikan dengan jelas sebelum tindakan dimulai.',
        targetHref: '#cara-kerja',
        arrowAriaLabel: 'Pelajari alur kerja dan estimasi biaya',
      },
    },
  },

  brands: {
    pill: 'Merek',
    heading: 'Merek yang Kami Tangani',
    subtitle: 'Fokus pada mobil Inggris, bukan sekadar bengkel umum.',
    items: [
      {
        id: 'jaguar',
        name: 'Jaguar',
        tagline: 'Perawatan dan perbaikan Jaguar',
        models: 'XF · XJ · F-Pace · E-Pace · F-Type',
        specialtyNote: 'Penanganan mesin, transmisi, kelistrikan, dan suspensi Jaguar.',
      },
      {
        id: 'land-rover',
        name: 'Land Rover',
        tagline: 'Perawatan dan perbaikan Land Rover',
        models: 'Defender · Range Rover Vogue · Sport · Velar · Evoque',
        specialtyNote: 'Penanganan suspensi udara, sistem penggerak, dan modul elektronik.',
      },
      {
        id: 'bentley',
        name: 'Bentley',
        tagline: 'Perawatan dan perbaikan Bentley',
        models: 'Continental GT · Flying Spur · Bentayga',
        specialtyNote: 'Perawatan mesin W12 & V8, sistem pendingin, dan kenyamanan kabin.',
      },
      {
        id: 'rolls-royce',
        name: 'Rolls-Royce',
        tagline: 'Perawatan dan perbaikan Rolls-Royce',
        models: 'Ghost · Phantom · Wraith · Cullinan',
        specialtyNote: 'Perawatan presisi tinggi untuk kehalusan mesin, kaki-kaki, dan kelistrikan.',
      },
    ] as BrandItem[],
  },

  services: {
    pill: 'Layanan',
    heading: 'Layanan untuk Mobil Inggris Anda',
    subtitle: 'Dari servis berkala hingga mobil yang sedang bermasalah.',
    linkLabel: 'Selengkapnya',
    symptomTriggerLabel: 'Cek Gejala',
    items: [
      {
        id: 'diagnosa-komputer',
        title: 'Diagnosa Komputer',
        description:
          'Pemeriksaan menyeluruh modul elektronik dan kode gangguan pada mobil Inggris Anda.',
        iconName: 'Cpu',
        highlighted: true,
        whatsappMessage:
          'Halo Brit Auto, saya ingin konsultasi layanan Diagnosa Komputer untuk mobil Inggris saya.',
      },
      {
        id: 'servis-berkala',
        title: 'Servis Berkala',
        description:
          'Penggantian oli, filter, dan pemeriksaan rutin agar performa kendaraan tetap terjaga.',
        iconName: 'CalendarCheck',
        whatsappMessage:
          'Halo Brit Auto, saya ingin konsultasi layanan Servis Berkala untuk mobil Inggris saya.',
      },
      {
        id: 'perbaikan-mobil-bermasalah',
        title: 'Perbaikan Mobil Bermasalah',
        description:
          'Penanganan khusus untuk mobil Inggris dengan keluhan berulang atau kendala yang sulit ditemukan.',
        iconName: 'Wrench',
        whatsappMessage:
          'Halo Brit Auto, saya ingin konsultasi mengenai Perbaikan Mobil Bermasalah untuk mobil saya.',
      },
      {
        id: 'ac-pendingin',
        title: 'AC & Pendingin',
        description:
          'Perawatan sistem AC kabin serta pendingin mesin agar suhu kerja mobil tetap stabil.',
        iconName: 'Snowflake',
        whatsappMessage:
          'Halo Brit Auto, saya ingin konsultasi layanan AC & Pendingin untuk mobil Inggris saya.',
      },
      {
        id: 'kelistrikan',
        title: 'Kelistrikan',
        description:
          'Pemeriksaan dan perbaikan jalur kabel, sensor, aki, alternator, dan modul kelistrikan.',
        iconName: 'Zap',
        whatsappMessage:
          'Halo Brit Auto, saya ingin konsultasi layanan Kelistrikan untuk mobil Inggris saya.',
      },
      {
        id: 'suspensi-kaki-kaki',
        title: 'Suspensi & Kaki-kaki',
        description:
          'Perbaikan suspensi udara, kompresor, bushing, dan komponen kaki-kaki untuk kenyamanan berkendara.',
        iconName: 'Gauge',
        whatsappMessage:
          'Halo Brit Auto, saya ingin konsultasi layanan Suspensi & Kaki-kaki untuk mobil Inggris saya.',
      },
      {
        id: 'mesin-transmisi',
        title: 'Mesin & Transmisi',
        description:
          'Penanganan kebocoran, suara kasar, perpindahan gigi tidak halus, hingga perbaikan mesin.',
        iconName: 'Cog',
        whatsappMessage:
          'Halo Brit Auto, saya ingin konsultasi layanan Mesin & Transmisi untuk mobil Inggris saya.',
      },
      {
        id: 'penggantian-suku-cadang',
        title: 'Penggantian Suku Cadang',
        description:
          'Penyediaan dan pemasangan suku cadang yang sesuai spesifikasi untuk mobil Inggris Anda.',
        iconName: 'PackageCheck',
        whatsappMessage:
          'Halo Brit Auto, saya ingin menanyakan Penggantian Suku Cadang untuk mobil Inggris saya.',
      },
    ] as ServiceItem[],
  },

  about: {
    pill: 'Tentang Kami',
    heading: 'Dikelola Langsung oleh Ahlinya',
    description:
      'Brit Auto dipimpin langsung oleh Bapak Agus Sugiantu, yang berpengalaman di dunia perbengkelan sejak 1999. Brit Auto berdiri pada 2022 dengan fokus pada mobil pabrikan Inggris, terutama mobil yang sedang bermasalah.',
    secondaryNote:
      'Dengan tim 4 teknisi berpengalaman dan 1 staf administrasi, kami membatasi jumlah kendaraan yang ditangani setiap bulan agar setiap mobil mendapatkan perhatian, ketelitian pemeriksaan, dan pengerjaan yang tuntas.',
    ledByLabel: 'Dipimpin oleh',
    sinceLabel: 'Sejak',
    stats: [
      {
        value: '1999',
        label: 'Mulai di dunia perbengkelan',
      },
      {
        value: '2022',
        label: 'Brit Auto berdiri',
      },
      {
        value: '4',
        label: 'Teknisi berpengalaman',
      },
    ] as StatItem[],
    workshopImageSlot: {
      imageUrl: '',
      alt: 'Suasana kerja dan area pemeriksaan mobil di bengkel Brit Auto Cilandak, Jakarta Selatan',
      caption: 'Foto bengkel',
      subcaption:
        'Slot foto ruang kerja & fasilitas pemeriksaan Brit Auto (dapat diganti di src/data/content.ts)',
    } as ImagePlaceholderSlot,
  },

  gallery: {
    pill: 'Galeri Bengkel',
    heading: 'Dokumentasi Area Kerja & Pengerjaan',
    subtitle:
      'Slot dokumentasi ruang mesin, pemeriksaan modul komputer, serta penanganan kaki-kaki mobil Inggris di Brit Auto Cilandak (tanpa menampilkan nomor polisi atau wajah pelanggan).',
    placeholderBadge: 'Foto Bengkel',
    viewDetailLabel: 'Lihat Detail',
    closeModalAria: 'Tutup pratinjau galeri',
    prevImageAria: 'Foto sebelumnya',
    nextImageAria: 'Foto berikutnya',
    items: [
      {
        id: 'galeri-diagnosa-ecu',
        title: 'Diagnosa Komputer & Modul Elektronik',
        category: 'Diagnosa Komputer',
        marque: 'Land Rover',
        description:
          'Pemeriksaan menyeluruh jaringan modul elektronik dan pembacaan kode gangguan pada Range Rover sebelum menentukan langkah perbaikan.',
        technicalNote: 'Slot Foto 01 · Area Diagnosa Elektronik (dapat diisi di src/data/content.ts)',
        iconName: 'Cpu',
        imageUrl: '',
        alt: 'Pemeriksaan diagnosa komputer pada modul elektronik Land Rover di bengkel Brit Auto',
      },
      {
        id: 'galeri-ruang-mesin-jaguar',
        title: 'Pemeriksaan Ruang Mesin V6 & V8',
        category: 'Mesin & Transmisi',
        marque: 'Jaguar',
        description:
          'Pengecekan sistem pendingin, jalur vakum, dan kebocoran fluida pada ruang mesin Jaguar oleh teknisi berpengalaman.',
        technicalNote: 'Slot Foto 02 · Ruang Mesin Jaguar (dapat diisi di src/data/content.ts)',
        iconName: 'Cog',
        imageUrl: '',
        alt: 'Area pengerjaan ruang mesin Jaguar di Brit Auto Cilandak',
      },
      {
        id: 'galeri-suspensi-udara',
        title: 'Kalibrasi Suspensi Udara & Kaki-kaki',
        category: 'Suspensi & Kaki-kaki',
        marque: 'Land Rover',
        description:
          'Penanganan kompresor air suspension, valve block, dan peredam kejut untuk mengembalikan kenyamanan berkendara.',
        technicalNote: 'Slot Foto 03 · Area Lift Bay & Suspensi (dapat diisi di src/data/content.ts)',
        iconName: 'Gauge',
        imageUrl: '',
        alt: 'Pengerjaan suspensi udara dan kaki-kaki mobil Inggris di lift bay Brit Auto',
      },
      {
        id: 'galeri-powertrain-bentley',
        title: 'Perawatan Berkala & Sistem Pendingin',
        category: 'Servis Berkala',
        marque: 'Bentley',
        description:
          'Perawatan rutin spesifikasi presisi untuk menjaga kestabilan suhu kerja mesin W12/V8 dan sirkulasi AC kabin.',
        technicalNote: 'Slot Foto 04 · Perawatan Mesin Bentley (dapat diisi di src/data/content.ts)',
        iconName: 'Wrench',
        imageUrl: '',
        alt: 'Perawatan berkala ruang mesin dan sistem pendingin Bentley di Brit Auto',
      },
      {
        id: 'galeri-kelistrikan-rolls-royce',
        title: 'Pemeriksaan Kelistrikan & Kenyamanan Kabin',
        category: 'Kelistrikan',
        marque: 'Rolls-Royce',
        description:
          'Pengujian sistem pengisian daya, sensor bodi, serta modul elektronik kabin dengan ketelitian tinggi.',
        technicalNote: 'Slot Foto 05 · Inpeksi Kelistrikan Presisi (dapat diisi di src/data/content.ts)',
        iconName: 'Zap',
        imageUrl: '',
        alt: 'Pemeriksaan sistem kelistrikan mobil mewah Inggris di Brit Auto Cilandak',
      },
      {
        id: 'galeri-serah-terima',
        title: 'Pemeriksaan Akhir Sebelum Serah Terima',
        category: 'Kontrol Kualitas',
        marque: 'Jaguar',
        description:
          'Setiap pekerjaan diperiksa kembali secara menyeluruh sebelum kendaraan diserahkan kembali kepada pemilik.',
        technicalNote: 'Slot Foto 06 · Area Pemeriksaan Akhir (dapat diisi di src/data/content.ts)',
        iconName: 'CarFront',
        imageUrl: '',
        alt: 'Area pemeriksaan akhir kendaraan sebelum serah terima di Brit Auto',
      },
    ] as GalleryItem[],
  },

  process: {
    pill: 'Cara Kerja',
    heading: 'Cara Kerja Kami',
    subtitle:
      'Alur penanganan yang jelas dari saat kendaraan tiba hingga diserahkan kembali kepada Anda.',
    stepPrefix: 'Tahap',
    steps: [
      {
        stepNumber: '1',
        title: 'Mobil datang & didata',
        description: 'Data kendaraan dan keluhan Anda dicatat dengan rapi.',
      },
      {
        stepNumber: '2',
        title: 'Pemeriksaan & keluhan',
        description: 'Teknisi memeriksa dan memastikan sumber masalah.',
      },
      {
        stepNumber: '3',
        title: 'Estimasi & persetujuan',
        description:
          'Biaya diperkirakan dan disetujui Anda sebelum pengerjaan dimulai.',
      },
      {
        stepNumber: '4',
        title: 'Pengerjaan & serah terima',
        description:
          'Pekerjaan selesai, diperiksa, lalu mobil diserahkan kepada Anda.',
      },
    ] as ProcessStepItem[],
  },

  testimonials: {
    pill: 'Pengalaman Klien',
    heading: 'Tanggapan Pemilik Mobil Inggris',
    subtitle:
      'Catatan penanganan servis dan perbaikan dari pemilik kendaraan yang mempercayakan mobilnya di Brit Auto Cilandak (identitas pemilik dirahasiakan demi privasi).',
    privacyNote:
      'Demi menjaga privasi pelanggan, nama pribadi dan nomor polisi kendaraan tidak ditampilkan.',
    items: [
      {
        id: 'testimoni-land-rover',
        marque: 'Land Rover',
        vehicleModel: 'Range Rover Vogue',
        serviceCategory: 'Suspensi & Kaki-kaki',
        quote:
          'Suspensi udara bagian depan sering turun saat diparkir semalaman. Setelah diperiksa di Brit Auto, sumber kebocoran pada valve block ditemukan dengan tepat dan rincian estimasi biayanya dijelaskan terlebih dahulu sebelum dikerjakan.',
        ownerTitle: 'Pemilik Range Rover Vogue',
        location: 'Cilandak, Jakarta Selatan',
      },
      {
        id: 'testimoni-jaguar',
        marque: 'Jaguar',
        vehicleModel: 'Jaguar XF',
        serviceCategory: 'Diagnosa Komputer & Kelistrikan',
        quote:
          'Indikator gangguan kelistrikan yang sebelumnya muncul berulang kali ditelusuri melalui diagnosa modul secara menyeluruh. Penjelasan teknis dari Bapak Agus Sugiantu dan tim sangat jelas tanpa mengganti komponen yang tidak perlu.',
        ownerTitle: 'Pemilik Jaguar XF',
        location: 'Pondok Indah, Jakarta Selatan',
      },
      {
        id: 'testimoni-bentley',
        marque: 'Bentley',
        vehicleModel: 'Bentley Continental GT',
        serviceCategory: 'Servis Berkala & Pendingin',
        quote:
          'Perawatan berkala serta pengecekan sistem pendingin mesin dan AC ditangani dengan rapi. Setiap tahap pekerjaan dikomunikasikan lebih dulu dan biaya akhir sesuai dengan estimasi awal yang saya setujui.',
        ownerTitle: 'Pemilik Bentley Continental GT',
        location: 'Kebayoran Baru, Jakarta Selatan',
      },
    ] as TestimonialItem[],
  },

  faq: {
    pill: 'Tanya Jawab (FAQ)',
    heading: 'Pertanyaan yang Sering Diajukan',
    subtitle:
      'Informasi seputar durasi pengerjaan, garansi servis, metode pembayaran, serta prosedur konsultasi di Brit Auto.',
    ctaPrompt: 'Masih memiliki pertanyaan khusus mengenai kondisi mobil Inggris Anda?',
    ctaButtonLabel: 'Tanyakan via WhatsApp',
    items: [
      {
        id: 'durasi-servis',
        category: 'Durasi Pengerjaan',
        question: 'Berapa lama estimasi waktu pengerjaan servis atau perbaikan?',
        answer:
          'Untuk servis berkala dan diagnosa komputer awal, pengerjaan umumnya dapat diselesaikan pada hari yang sama setelah pemeriksaan. Untuk mobil dengan keluhan berat (trouble case), perbaikan mesin, transmisi, atau suspensi udara, durasi pengerjaan bergantung pada hasil pemeriksaan teknisi serta ketersediaan suku cadang, dan akan kami informasikan secara jelas saat pengajuan estimasi.',
      },
      {
        id: 'garansi-servis',
        category: 'Garansi',
        question: 'Apakah ada garansi untuk pengerjaan dan suku cadang yang diganti?',
        answer:
          'Ya. Setiap pekerjaan perbaikan dan penggantian suku cadang di Brit Auto dilengkapi dengan garansi sesuai jenis tindakan dan spesifikasi komponen yang disepakati pada lembar estimasi. Rincian cakupan garansi disampaikan secara transparan sebelum pengerjaan dimulai.',
      },
      {
        id: 'metode-pembayaran',
        category: 'Metode Pembayaran',
        question: 'Metode pembayaran apa saja yang diterima di Brit Auto?',
        answer:
          'Kami menerima pembayaran melalui transfer bank dan pembayaran non-tunai (cashless) sesuai rincian faktur resmi bengkel. Seluruh rincian biaya jasa dan suku cadang baru ditagihkan sesuai estimasi yang telah Anda setujui sebelum pengerjaan dimulai.',
      },
      {
        id: 'perlu-janji-temu',
        category: 'Jadwal & Kuota',
        question: 'Apakah harus menghubungi via WhatsApp terlebih dahulu sebelum membawa mobil?',
        answer:
          'Sangat disarankan untuk menghubungi kami terlebih dahulu melalui WhatsApp di 0812-8700-0772. Karena Brit Auto membatasi jumlah kendaraan yang ditangani setiap bulan oleh 4 teknisi kami, konfirmasi awal memastikan ketersediaan ruang kerja bagi mobil Anda.',
      },
    ] as FAQItem[],
  },

  contactSection: {
    pill: 'Kontak & Lokasi',
    heading: 'Hubungi Brit Auto',
    subtitle:
      'Konsultasikan keluhan mobil Inggris Anda melalui WhatsApp, telepon, atau kunjungi langsung bengkel kami di Cilandak, Jakarta Selatan.',
    primaryCtaLabel: 'Chat WhatsApp',
    secondaryCtaLabel: 'Petunjuk Arah',
  },

  diagnosticAssistant: {
    triggerLabel: 'Catat & Analisis Keluhan Mobil',
    modalPill: 'Konsultasi Teknis',
    modalTitle: 'Catatan Keluhan & Pra-Diagnosa Teknis',
    modalSubtitle:
      'Tuliskan gejala pada Jaguar, Land Rover, Bentley, atau Rolls-Royce Anda untuk menyiapkan ringkasan keluhan sebelum dikirim ke WhatsApp Brit Auto.',
    brandLabel: 'Pilih Merek Mobil Inggris',
    modelLabel: 'Model & Tahun Kendaraan',
    modelPlaceholder: 'Contoh: Range Rover Sport 2020',
    serviceLabel: 'Kategori Layanan',
    symptomLabel: 'Keluhan atau Gejala Kendaraan',
    symptomPlaceholder:
      'Tuliskan keluhan mobil Anda (contoh: indikator mesin menyala, suspensi udara turun, AC kurang dingin)...',
    analyzeButton: 'Susun Ringkasan Pra-Diagnosa',
    analyzingButton: 'Menyusun Ringkasan Pemeriksaan...',
    summaryHeading: 'Ringkasan Pra-Diagnosa Awal',
    sendWhatsAppButton: 'Kirim ke WhatsApp Brit Auto',
    saveButton: 'Simpan Catatan',
    savingButton: 'Menyimpan...',
    loginGoogleButton: 'Masuk Google untuk Simpan Riwayat',
    historyHeading: 'Riwayat Catatan Kendaraan Anda',
  },

  footer: {
    quickLinksHeading: 'Tautan Cepat',
    contactHeading: 'Kontak & Alamat',
    phonePrefix: 'Telepon / WhatsApp:',
    emailPrefix: 'Email:',
    copyright: '© 2026 Brit Auto. Seluruh hak dilindungi.',
  },
};

const enContent: typeof idContent = {
  business: {
    ...idContent.business,
    tagline: 'Specialist British luxury car workshop in South Jakarta.',
  },

  contact: {
    ...idContent.contact,
    defaultWhatsappMessage:
      'Hello Brit Auto, I would like to consult regarding service for my British car.',
    openingHoursPlaceholder: 'Opening hours: [insert operating hours]',
    labels: {
      address: 'Workshop Address',
      phone: 'Phone & WhatsApp',
      email: 'Official Email',
      hours: 'Service Hours',
      loadingMap: 'Loading workshop location map...',
      mapIframeTitle:
        'Brit Auto Workshop Location Map at Jl. Karang Tengah Raya No. 9, Cilandak, South Jakarta',
    },
  },

  navbar: {
    links: [
      { label: 'Home', href: '#beranda' },
      { label: 'Brands', href: '#merek' },
      { label: 'Services', href: '#layanan' },
      { label: 'About', href: '#tentang' },
      { label: 'Gallery', href: '#galeri' },
      { label: 'Process', href: '#cara-kerja' },
      { label: 'FAQ', href: '#faq' },
      { label: 'Contact', href: '#kontak' },
    ],
    ctaLabel: 'Contact Us',
    languageToggleAria: 'Switch language to Bahasa Indonesia',
    themeToggleDarkAria: 'Switch to dark mode',
    themeToggleLightAria: 'Switch to light mode',
    openMenuAria: 'Open navigation menu',
    closeMenuAria: 'Close navigation menu',
  },

  hero: {
    badge: 'British Car Specialist',
    headline: 'British Car Care, Handled by Experts',
    subheadline:
      'Brit Auto services Jaguar, Land Rover, Bentley, and Rolls-Royce with experienced technicians and a transparent cost estimate before any work begins.',
    primaryCta: 'Chat WhatsApp',
    secondaryCta: 'View Services',
    secondaryHref: '#layanan',
    floatingCards: {
      left: {
        number: '21+',
        label: "Years of owner's experience in the automotive workshop industry",
        chip: 'Since 1999',
      },
      center: {
        label: 'British Marque Specialist',
        brandsLine: 'Jaguar · Land Rover · Bentley · Rolls-Royce',
        chip: '4 Experienced Technicians',
        imageSlot: {
          imageUrl: '',
          alt: 'British car engine bay service area at Brit Auto Cilandak workshop',
          caption: 'Workshop photo',
          subcaption: 'Engine bay / Brit Auto workshop photo slot',
        },
      },
      right: {
        chip: 'Transparent',
        title: 'Cost estimate approved before work begins',
        detail:
          'Inspection details and cost estimates are clearly communicated before any repair starts.',
        targetHref: '#cara-kerja',
        arrowAriaLabel: 'Learn about our workflow and cost estimation',
      },
    },
  },

  brands: {
    pill: 'Brands',
    heading: 'Marques We Service',
    subtitle: 'Focused on British automobiles, not a general mass-market garage.',
    items: [
      {
        id: 'jaguar',
        name: 'Jaguar',
        tagline: 'Jaguar maintenance and repair',
        models: 'XF · XJ · F-Pace · E-Pace · F-Type',
        specialtyNote: 'Engine, transmission, electrical, and suspension care for Jaguar.',
      },
      {
        id: 'land-rover',
        name: 'Land Rover',
        tagline: 'Land Rover maintenance and repair',
        models: 'Defender · Range Rover Vogue · Sport · Velar · Evoque',
        specialtyNote: 'Air suspension, drivetrain, and electronic module diagnostics.',
      },
      {
        id: 'bentley',
        name: 'Bentley',
        tagline: 'Bentley maintenance and repair',
        models: 'Continental GT · Flying Spur · Bentayga',
        specialtyNote: 'W12 & V8 powertrain servicing, cooling systems, and cabin comfort.',
      },
      {
        id: 'rolls-royce',
        name: 'Rolls-Royce',
        tagline: 'Rolls-Royce maintenance and repair',
        models: 'Ghost · Phantom · Wraith · Cullinan',
        specialtyNote: 'High-precision care for engine refinement, suspension, and electronics.',
      },
    ],
  },

  services: {
    pill: 'Services',
    heading: 'Services for Your British Car',
    subtitle: 'From periodic maintenance to complex trouble cases.',
    linkLabel: 'Learn More',
    symptomTriggerLabel: 'Check Symptoms',
    items: [
      {
        id: 'diagnosa-komputer',
        title: 'Computer Diagnostics',
        description:
          'Comprehensive electronic module scanning and fault code troubleshooting for your British vehicle.',
        iconName: 'Cpu',
        highlighted: true,
        whatsappMessage:
          'Hello Brit Auto, I would like to consult about Computer Diagnostics for my British car.',
      },
      {
        id: 'servis-berkala',
        title: 'Periodic Maintenance',
        description:
          'Oil changes, filters, and routine inspections to keep your vehicle performing reliably.',
        iconName: 'CalendarCheck',
        whatsappMessage:
          'Hello Brit Auto, I would like to consult about Periodic Maintenance for my British car.',
      },
      {
        id: 'perbaikan-mobil-bermasalah',
        title: 'Trouble Case Repair',
        description:
          'Dedicated troubleshooting for British cars with recurring issues or hard-to-diagnose faults.',
        iconName: 'Wrench',
        whatsappMessage:
          'Hello Brit Auto, I would like to consult regarding Trouble Case Repair for my vehicle.',
      },
      {
        id: 'ac-pendingin',
        title: 'AC & Cooling System',
        description:
          'Cabin climate control and engine cooling system care for stable operating temperatures.',
        iconName: 'Snowflake',
        whatsappMessage:
          'Hello Brit Auto, I would like to consult about AC & Cooling System service for my British car.',
      },
      {
        id: 'kelistrikan',
        title: 'Electrical Systems',
        description:
          'Inspection and repair of wiring harnesses, sensors, battery, alternator, and control modules.',
        iconName: 'Zap',
        whatsappMessage:
          'Hello Brit Auto, I would like to consult about Electrical Systems service for my British car.',
      },
      {
        id: 'suspensi-kaki-kaki',
        title: 'Suspension & Undercarriage',
        description:
          'Air suspension, compressor, bushings, and chassis components for optimal ride comfort.',
        iconName: 'Gauge',
        whatsappMessage:
          'Hello Brit Auto, I would like to consult about Suspension & Undercarriage repair for my British car.',
      },
      {
        id: 'mesin-transmisi',
        title: 'Engine & Transmission',
        description:
          'Resolving fluid leaks, rough operation, gear shift hesitation, and mechanical overhauls.',
        iconName: 'Cog',
        whatsappMessage:
          'Hello Brit Auto, I would like to consult about Engine & Transmission service for my British car.',
      },
      {
        id: 'penggantian-suku-cadang',
        title: 'Parts Replacement',
        description:
          'Sourcing and fitting specification-matched replacement parts for your British vehicle.',
        iconName: 'PackageCheck',
        whatsappMessage:
          'Hello Brit Auto, I would like to inquire about Parts Replacement for my British car.',
      },
    ],
  },

  about: {
    pill: 'About Us',
    heading: 'Directly Managed by the Specialist',
    description:
      'Brit Auto is led directly by Mr. Agus Sugiantu, who has worked in the automotive workshop industry since 1999. Founded in 2022, Brit Auto focuses on British-made automobiles, especially trouble-case vehicles.',
    secondaryNote:
      'With a focused team of 4 experienced technicians and 1 administrator, we handle a limited number of cars each month so every vehicle receives thorough inspection and meticulous care.',
    ledByLabel: 'Led by',
    sinceLabel: 'Since',
    stats: [
      {
        value: '1999',
        label: 'Started in automotive workshops',
      },
      {
        value: '2022',
        label: 'Brit Auto established',
      },
      {
        value: '4',
        label: 'Experienced technicians',
      },
    ],
    workshopImageSlot: {
      imageUrl: '',
      alt: 'Inspection bay and working environment at Brit Auto Cilandak, South Jakarta',
      caption: 'Workshop photo',
      subcaption:
        'Brit Auto workshop & inspection bay photo slot (editable in src/data/content.ts)',
    },
  },

  gallery: {
    pill: 'Workshop Gallery',
    heading: 'Workshop Bays & Technical Documentation',
    subtitle:
      'Documentation slots showcasing engine bays, computer module diagnostics, and suspension work at Brit Auto Cilandak (strictly excluding license plates or customer faces).',
    placeholderBadge: 'Workshop Photo',
    viewDetailLabel: 'View Details',
    closeModalAria: 'Close gallery preview',
    prevImageAria: 'Previous photo',
    nextImageAria: 'Next photo',
    items: [
      {
        id: 'galeri-diagnosa-ecu',
        title: 'Computer & Electronic Module Diagnostics',
        category: 'Computer Diagnostics',
        marque: 'Land Rover',
        description:
          'Comprehensive electronic module network scanning and fault code analysis on a Range Rover prior to preparing the repair plan.',
        technicalNote: 'Photo Slot 01 · Electronic Diagnostic Bay (editable in src/data/content.ts)',
        iconName: 'Cpu',
        imageUrl: '',
        alt: 'Computer diagnostic scanning on Land Rover electronic modules at Brit Auto workshop',
      },
      {
        id: 'galeri-ruang-mesin-jaguar',
        title: 'V6 & V8 Engine Bay Inspection',
        category: 'Engine & Transmission',
        marque: 'Jaguar',
        description:
          'Inspection of cooling lines, vacuum routing, and fluid seals inside a Jaguar engine bay by our experienced technicians.',
        technicalNote: 'Photo Slot 02 · Jaguar Engine Bay (editable in src/data/content.ts)',
        iconName: 'Cog',
        imageUrl: '',
        alt: 'Jaguar engine bay service area at Brit Auto Cilandak',
      },
      {
        id: 'galeri-suspensi-udara',
        title: 'Air Suspension & Undercarriage Calibration',
        category: 'Suspension & Undercarriage',
        marque: 'Land Rover',
        description:
          'Servicing air suspension compressors, valve blocks, and dampers to restore ride height accuracy and comfort.',
        technicalNote: 'Photo Slot 03 · Lift Bay & Suspension (editable in src/data/content.ts)',
        iconName: 'Gauge',
        imageUrl: '',
        alt: 'Air suspension and undercarriage work on a British SUV at Brit Auto lift bay',
      },
      {
        id: 'galeri-powertrain-bentley',
        title: 'Periodic Maintenance & Cooling System Care',
        category: 'Periodic Maintenance',
        marque: 'Bentley',
        description:
          'Precision routine servicing to maintain stable operating temperatures on W12/V8 engines and cabin climate systems.',
        technicalNote: 'Photo Slot 04 · Bentley Powertrain Care (editable in src/data/content.ts)',
        iconName: 'Wrench',
        imageUrl: '',
        alt: 'Periodic maintenance on Bentley engine bay and cooling system at Brit Auto',
      },
      {
        id: 'galeri-kelistrikan-rolls-royce',
        title: 'Electrical System & Cabin Comfort Verification',
        category: 'Electrical Systems',
        marque: 'Rolls-Royce',
        description:
          'Testing charging systems, body sensors, and interior control modules with meticulous care.',
        technicalNote: 'Photo Slot 05 · Precision Electrical Inspection (editable in src/data/content.ts)',
        iconName: 'Zap',
        imageUrl: '',
        alt: 'British luxury car electrical system inspection at Brit Auto Cilandak',
      },
      {
        id: 'galeri-serah-terima',
        title: 'Final Quality Check Before Handover',
        category: 'Quality Control',
        marque: 'Jaguar',
        description:
          'Every completed repair undergoes a final verification check before the vehicle is handed back to the owner.',
        technicalNote: 'Photo Slot 06 · Final Inspection Bay (editable in src/data/content.ts)',
        iconName: 'CarFront',
        imageUrl: '',
        alt: 'Final vehicle inspection bay prior to owner handover at Brit Auto',
      },
    ],
  },

  process: {
    pill: 'How We Work',
    heading: 'How We Work',
    subtitle:
      'A clear, structured workflow from vehicle arrival to final handover.',
    stepPrefix: 'Step',
    steps: [
      {
        stepNumber: '1',
        title: 'Arrival & registration',
        description: 'Your vehicle details and symptoms are carefully recorded.',
      },
      {
        stepNumber: '2',
        title: 'Inspection & diagnosis',
        description: 'Technicians inspect and pinpoint the root cause of the issue.',
      },
      {
        stepNumber: '3',
        title: 'Estimate & approval',
        description:
          'Costs are estimated and approved by you before any repair work begins.',
      },
      {
        stepNumber: '4',
        title: 'Repair & handover',
        description:
          'Work is completed, verified, and the car is handed back to you.',
      },
    ],
  },

  testimonials: {
    pill: 'Client Feedback',
    heading: 'What British Car Owners Say',
    subtitle:
      'Service and troubleshooting notes from vehicle owners who entrust their cars to Brit Auto Cilandak (identities anonymized for client privacy).',
    privacyNote:
      'To protect client privacy, personal names and license plate numbers are never displayed.',
    items: [
      {
        id: 'testimoni-land-rover',
        marque: 'Land Rover',
        vehicleModel: 'Range Rover Vogue',
        serviceCategory: 'Suspension & Undercarriage',
        quote:
          'The front air suspension kept dropping overnight. After inspection at Brit Auto, the exact leak in the valve block was pinpointed and the cost estimate was clearly approved before repair began.',
        ownerTitle: 'Range Rover Vogue Owner',
        location: 'Cilandak, South Jakarta',
      },
      {
        id: 'testimoni-jaguar',
        marque: 'Jaguar',
        vehicleModel: 'Jaguar XF',
        serviceCategory: 'Computer Diagnostics & Electrical',
        quote:
          'An intermittent electrical fault warning was traced through comprehensive module diagnostics. Mr. Agus Sugiantu and his team explained the root cause clearly without replacing unnecessary parts.',
        ownerTitle: 'Jaguar XF Owner',
        location: 'Pondok Indah, South Jakarta',
      },
      {
        id: 'testimoni-bentley',
        marque: 'Bentley',
        vehicleModel: 'Bentley Continental GT',
        serviceCategory: 'Periodic Maintenance & Cooling',
        quote:
          'Periodic servicing and cooling system inspection were handled meticulously. Every stage was communicated beforehand and the final invoice matched the upfront estimate I approved.',
        ownerTitle: 'Bentley Continental GT Owner',
        location: 'Kebayoran Baru, South Jakarta',
      },
    ],
  },

  faq: {
    pill: 'FAQ',
    heading: 'Frequently Asked Questions',
    subtitle:
      'Answers to common questions regarding service duration, warranty coverage, payment methods, and consultation procedures at Brit Auto.',
    ctaPrompt: 'Have a specific question about your British car?',
    ctaButtonLabel: 'Ask via WhatsApp',
    items: [
      {
        id: 'durasi-servis',
        category: 'Service Duration',
        question: 'How long does maintenance or repair typically take?',
        answer:
          'Routine periodic maintenance and initial computer diagnostics can generally be completed within the same day after inspection. For trouble-case vehicles, engine, transmission, or air suspension repairs, the duration depends on our technicians’ inspection findings and parts availability, which we communicate clearly along with the cost estimate.',
      },
      {
        id: 'garansi-servis',
        category: 'Warranty',
        question: 'Do you provide a warranty on workmanship and replaced parts?',
        answer:
          'Yes. Every repair job and parts replacement at Brit Auto includes warranty coverage tailored to the type of work and part specification agreed upon in your written estimate. Warranty terms are explained transparently before work begins.',
      },
      {
        id: 'metode-pembayaran',
        category: 'Payment Methods',
        question: 'What payment methods are accepted at Brit Auto?',
        answer:
          'We accept bank transfers and cashless payments based on the official workshop invoice. All labor and parts charges strictly follow the cost estimate that you approved prior to the start of work.',
      },
      {
        id: 'perlu-janji-temu',
        category: 'Scheduling',
        question: 'Should I contact Brit Auto via WhatsApp before bringing my car in?',
        answer:
          'We strongly recommend contacting us via WhatsApp at 0812-8700-0772 beforehand. Because Brit Auto handles a limited number of vehicles per month across our 4 experienced technicians, scheduling ahead ensures a dedicated bay is ready for your car.',
      },
    ],
  },

  contactSection: {
    pill: 'Contact & Location',
    heading: 'Contact Brit Auto',
    subtitle:
      'Consult regarding your British car via WhatsApp, phone, or visit our workshop directly in Cilandak, South Jakarta.',
    primaryCtaLabel: 'Chat WhatsApp',
    secondaryCtaLabel: 'Get Directions',
  },

  diagnosticAssistant: {
    triggerLabel: 'Log & Analyze Vehicle Symptoms',
    modalPill: 'Technical Consultation',
    modalTitle: 'Symptom Log & Technical Pre-Diagnosis',
    modalSubtitle:
      'Describe the symptoms on your Jaguar, Land Rover, Bentley, or Rolls-Royce to prepare a structured summary before chatting on WhatsApp.',
    brandLabel: 'Select British Marque',
    modelLabel: 'Vehicle Model & Year',
    modelPlaceholder: 'Example: Range Rover Sport 2020',
    serviceLabel: 'Service Category',
    symptomLabel: 'Vehicle Symptoms or Issues',
    symptomPlaceholder:
      'Describe the issue (e.g., check engine light on, air suspension dropping overnight, weak AC cooling)...',
    analyzeButton: 'Generate Pre-Diagnosis Summary',
    analyzingButton: 'Generating Inspection Summary...',
    summaryHeading: 'Initial Pre-Diagnosis Summary',
    sendWhatsAppButton: 'Send to Brit Auto WhatsApp',
    saveButton: 'Save Record',
    savingButton: 'Saving...',
    loginGoogleButton: 'Sign in with Google to Save History',
    historyHeading: 'Your Saved Vehicle Consultation Records',
  },

  footer: {
    quickLinksHeading: 'Quick Links',
    contactHeading: 'Contact & Address',
    phonePrefix: 'Phone / WhatsApp:',
    emailPrefix: 'Email:',
    copyright: '© 2026 Brit Auto. All rights reserved.',
  },
};

export const translations: Record<Language, typeof idContent> = {
  id: idContent,
  en: enContent,
};

export const siteContent = idContent;

export function getSiteContent(language: Language = 'id') {
  return translations[language] || idContent;
}

export function buildWhatsAppLink(
  message?: string,
  language: Language = 'id'
): string {
  const activeContent = getSiteContent(language);
  const text = message || activeContent.contact.defaultWhatsappMessage;
  return `${activeContent.contact.whatsappBaseUrl}?text=${encodeURIComponent(text)}`;
}
