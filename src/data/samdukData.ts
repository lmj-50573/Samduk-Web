import { 
  ShoeProduct, 
  BrandInfo, 
  LookbookItem, 
  NewsItem, 
  WhySamdukPillar, 
  FactoryFacility 
} from '../types';

export const BRANDS_DATA: BrandInfo[] = [
  {
    id: 'K2_SAFETY',
    name: 'K2 SAFETY',
    nameKo: '케이투세이프티 (K2 Safety)',
    tagline: 'ULTIMATE INDUSTRIAL PROTECTIVE WORKWEAR SHOES',
    description: '산업 안전화 시장을 선도하는 고강도 안전화 브랜드 K2 Safety.\n험로, 중공업, 물류 및 현장 기술자를 위해 최고 등급의 내답판과 토캡, BOA 다이얼 시스템을 집약한 무결점 안전 장비입니다.',
    heroImage: 'k2_main.png',
    logoText: 'K2 SAFETY',
    accentColor: '#D97706',
    categoryFocus: 'Safety & Industrial Work',
    foundedYear: '1995',
    officialStoreUrl: 'https://www.k-village.co.kr/safety',
    keyFeatures: [
      'KCS 국가안전인증 1급 및 방검(내답판) 섬유 적용',
      'BOA® 듀얼 및 싱글 다이얼 정밀 조임 시스템',
      'SRC 최고 등급 미끄럼 방지 내유성 고무 아웃솔',
      '장시간 현장 근무자를 위한 아치 서포트 인솔'
    ],
    stats: [
      { label: '안전화 시장', value: 'No.1 선도 브랜드' },
      { label: '안전 규격', value: 'KCS 1급 획득' },
      { label: '대표 모델', value: 'K2-60 / KG-40' }
    ]
  },
  {
    id: 'EIDER',
    name: 'EIDER',
    nameKo: '아이더 (Eider)',
    tagline: 'FRENCH CHIC PERFORMANCE & TRAIL WALKING',
    description: '프랑스 알프스의 모던 아웃도어 헤리티지를 담은 아이더.\n도심 워킹부터 전문 하이킹과 트레일 러닝까지 아우르는 스타일리시 퍼포먼스 풋웨어를 삼덕통상의 정밀 가공 기술로 생산합니다.',
    heroImage: '/eider_main.png',
    logoText: 'EIDER',
    accentColor: '#2563EB',
    categoryFocus: 'Trail Walking & European Performance',
    foundedYear: '1962',
    officialStoreUrl: 'https://www.eider.co.kr',
    keyFeatures: [
      '퀀텀(QUANTUM) 아치 서포트 워킹화 인솔 시스템',
      '발 피로도를 낮추는 붐버블 충격 흡수 미드솔',
      'GORE-TEX® 360도 완벽 투습 방수 멤브레인',
      '세련된 유러피안 컬러 및 슬림한 엔지니어드 핏'
    ],
    stats: [
      { label: '워킹화 만족도', value: '98.5%' },
      { label: '경량성 감축', value: '초경량 280g' },
      { label: '대표 라인업', value: 'QUANTUM / TRAIL' }
    ]
  },
  {
    id: 'BLACK_YAK',
    name: 'BLACK YAK',
    nameKo: '블랙야크 (Black Yak)',
    tagline: 'HIMALAYAN ALPINE HEAVY DUTY ENGINEERING',
    description: '히말라야 알파인 정신에서 탄생한 익스트림 아웃도어 명가 블랙야크.\n눈보라와 빙판, 거친 고산 능선까지 정복할 수 있는 강력한 그립과 방수 방풍 시스템을 자랑합니다.',
    heroImage: '/black_main.png',
    logoText: 'BLACK YAK',
    accentColor: '#111827',
    categoryFocus: 'Extreme Alpine & Heavy Duty',
    foundedYear: '1973',
    officialStoreUrl: 'https://www.blackyak.com',
    keyFeatures: [
      '히말라야 알피니스트 검증 고성능 루프 그립(Loop-Grip)',
      '3 layer GORE-TEX® 프로텍티브 투습 방수 부티',
      '외부 충격에서 발목 및 발가락을 지키는 360 프로텍터',
      '인체공학적 고밀도 PU 힐 카운터 안정성 극대화'
    ],
    stats: [
      { label: '알피니스트 검증', value: 'Himalayan Tested' },
      { label: '방수 등급', value: 'GORE-TEX Pro' },
      { label: '대표 모델', value: 'YAK-360 / ALPINE' }
    ]
  }
];

export const PRODUCTS_DATA: ShoeProduct[] = [
  {
        id: 'stelth-s6-boa-gtx',
        name: 'K2 SAFETY LT-121NA (Navy)',
        nameKo: '가벼움과 안전성을 모두 갖춘 초경량 안전화',
    brand: 'K2_SAFETY',
    category: 'Safety',
    price: 108000,
    originalPrice: 119000,
    isNew: true,
    isBest: true,
    isFeatured: true,
    rating: 4.9,
    reviewCount: 428,
    image: '/k2_safety_boa_gtx.jpg',
        gallery: [
      '/k2_safety_boa_gtx.jpg',
      '/k2_safety_boa_gtx1-1.jpg',
      '/k2_safety_boa_gtx.jpg'
    ],
        shortDescription: '460g 초경량 설계로 작업 시 발의 부담을 줄이고, \n BOA® Fit System과 논슬립 아웃솔로 편안하고 안정적인 착화감을 제공합니다.',
    specs: {
      upper: '코듀라 매쉬 - 뛰어난 내마모성, 높은 인장·찢김 강도, 가벼움, 부드러운 터치, 빠른 건조',
      sole: '파이론 미드솔, 러버 아웃솔 - 논슬립 성능으로 미끄럼 사고 예방',
      weight: '460g (Size 265mm)',
      safetyStandard: '보통 작업용 안전화 - 컴포짓 토캡(경량·단열·비금속) + ARMOR-FLEX 내답원단 / 캐솔라이트 인솔(복원력·충격흡수·항균/항취 99.9%)',
      waterproof: true,
      closureSystem: 'BOA® Fit System - 다이얼 조작으로 간편한 착탈, 최적의 착화감'
    },
    technologies: ['GORE-TEX', 'BOA', 'K-SAFETY', 'ORTHOLITE'],
    colors: ['Olive Khaki / Charcoal / Amber TPU'],
    sizes: [245, 250, 255, 260, 265, 270, 275, 280, 285, 290],
        officialStoreUrl: 'https://www.k-village.co.kr/goods/SC424020N4'
  },
  {
    id: 'stelth-a4-light-work',
    name: 'K2 SAFETY A4 ULTRA-LIGHT WORK RUNNER',
    nameKo: 'K2 SAFETY A4 초경량 워크 러너 4인치',
    brand: 'K2_SAFETY',
    category: 'Work',
    price: 179000,
    originalPrice: 199000,
    isNew: true,
    isBest: false,
    rating: 4.8,
    reviewCount: 194,
      image: '/sample.png',
      gallery: [
      '/sample.png'
    ],
    shortDescription: '러닝화처럼 가볍고 편안한 4인치 작업화. 공장 설비, 물류, 가벼운 공정에서 피로 없이 민첩한 움직임을 보장합니다.',
    specs: {
      upper: 'Breathable Armor Knit + TPU Reinforcement',
      sole: 'K2 SAFETY Flex-Grip Phylon Rubber',
      weight: '410g (Size 265mm)',
      safetyStandard: 'KCS 인증 경작업용 / 비금속 알루미늄 토캡',
      waterproof: false,
      closureSystem: 'BOA® L6 Dial Fit System'
    },
    technologies: ['BOA', 'K-SAFETY', 'ORTHOLITE'],
    colors: ['Dark Navy / White'],
    sizes: [240, 245, 250, 255, 260, 265, 270, 275, 280],
    officialStoreUrl: 'https://www.k2safety.co.kr/product/a4-work-runner'
  },
    {
        id: 'k2-safety-lt121vdg',
        name: 'K2 SAFETY LT-121VDG DARK GREY',
        nameKo: '초경량 방수 절연안전화',
        brand: 'K2_SAFETY',
        category: 'Safety',
        price: 126000,
        originalPrice: 150000,
        isNew: true,
        isBest: true,
        isFeatured: true,
        rating: 0,
        reviewCount: 0,
        image: '/k2_LT_121vdg.jpg',
        gallery: [
            '/k2_LT_121vdg.jpg',
            'k2_LT_121vdg1-1.jpg',
        ],
        shortDescription: '435g 초경량 설계로 작업 시 발의 부담을 줄이고, 방수·투습 기능과 14,000V 절연 성능으로 사계절 안전한 작업 환경을 제공합니다.',
        specs: {
            upper: '코듀라®(CORDURA®) 원단 - 뛰어난 내마모성, 높은 인장·뚫림 강도, 가벼움과 빠른 건조',
            sole: '논슬립 세제 1등급 아웃솔 - 미끄러짐 사고 예방',
            weight: '435g (265mm, 0.5PRS 기준)',
            safetyStandard: '컴포짓 토캡(비금속) + 아머플렉스 슬림 내답판 / 14,000V 절연 안전화 / 캐솔라이트 인솔(충격흡수·복원력·항균항취 99.9%)',
            waterproof: true,
            closureSystem: 'BOA® Fit System - 다이얼 조작으로 간편한 착탈, 최적의 착화감',
        },
        technologies: ['BOA', 'K-SAFETY'],
        colors: ['Dark Grey'],
        sizes: [230, 235, 240, 245, 250, 255, 260, 265, 270, 275, 280, 285, 290, 295, 300],
        officialStoreUrl: 'https://www.k-village.co.kr/goods/SC426021C6',
    },
  {
    id: 'treksta-alpine-pro-high',
    name: 'BLACK YAK ALPINE PRO MOUNTAINEERING',
    nameKo: '블랙야크 알파인 프로 고어텍스 8인치 중등산화',
    brand: 'BLACK_YAK',
    category: 'Outdoor',
    price: 360000,
    originalPrice: 410000,
    isNew: true,
    isBest: false,
    rating: 4.9,
    reviewCount: 156,
      image: '/sample.png',
      gallery: [
      '/sample.png'
    ],
    shortDescription: '히말라야 알피니스트를 위한 장거리 중등산화. 암벽과 너덜길에서도 발목을 안전하게 보호하며 루프그립으로 최상의 마찰력 제공.',
    specs: {
      upper: '2.4mm Waterproof Italian Nubuck + Kevlar Rand',
      sole: 'BLACK YAK Loop-Grip Mountaineering Sole',
      weight: '680g (Size 265mm)',
      waterproof: true,
      closureSystem: 'Precision Metal Hook & Eyelet Lace System'
    },
    technologies: ['GORE-TEX', 'VIBRAM', 'ORTHOLITE'],
    colors: ['Alpen Black', 'Earth Brown'],
    sizes: [255, 260, 265, 270, 275, 280, 285],
    officialStoreUrl: 'https://www.blackyak.com'
  },
    {
        id: 'k2-safety-kg115',
        name: 'K2 SAFETY KG-115 OLIVE KHAKI',
        nameKo: '고어텍스 쿠셔닝 안전화',
        brand: 'K2_SAFETY',
        category: 'Safety',
        price: 263000,
        originalPrice: 300000,
        isNew: false,
        isBest: true,
        isFeatured: true,
        rating: 0,
        reviewCount: 0,
        image: '/kg_115.jpg',
        gallery: [
            '/kg_115.jpg',
            '/kg_1151-1.jpg',
        ],
        shortDescription: 'GORE-TEX 방수·투습 시스템과 듀얼 BOA® Fit System을 적용해, 어떤 현장에서도 쾌적하고 정밀한 착화감을 제공하는 프리미엄 안전화입니다.',
        specs: {
            upper: '천연가죽 + 코듀라® 메쉬(듀폰社 원단) - 뛰어난 내구성과 통기성, 높은 인장·뚫림 강도, 가벼움과 빠른 건조',
            sole: '파이론 미드솔 + 이중경도 미드솔(전족부 탄성·후족부 충격흡수) + 러버 논슬립 아웃솔(세제 2등급)',
            weight: '경량 설계',
            safetyStandard: '스카이폼 밸런스 인솔 - 충격 흡수 신소재 + 아치 서포트 구조로 자세 교정 및 피로 감소',
            waterproof: true,
            closureSystem: '듀얼 BOA® Fit System - 2개의 다이얼로 발목·발등 개별 미세 조절, 최적의 핏팅감',
        },
        technologies: ['GORE-TEX', 'BOA', 'K-SAFETY'],
        colors: ['Olive Khaki'],
        sizes: [230, 235, 240, 245, 250, 255, 260, 265, 270, 275, 280, 285, 290, 295, 300],
        officialStoreUrl: 'https://www.k-village.co.kr/goods/SG623015HW',
    },
  {
    id: 'kalpa-tempo-trail-pro',
    name: 'EIDER QUANTUM TRAIL PRO 4',
    nameKo: '아이더(EIDER) 퀀텀 트레일 워킹화 프로 4',
    brand: 'EIDER',
    category: 'Outdoor',
    price: 189000,
    originalPrice: 210000,
    isNew: false,
    isBest: false,
    rating: 4.8,
    reviewCount: 219,
    image: '/k2_olive_boa_boot.svg',
    gallery: [
      '/k2_olive_boa_boot.svg',
      '/k2_olive_boa_boot_detail.svg'
    ],
    shortDescription: '아이더의 퀀텀 접지력과 아치 서포트 인솔이 만난 고성능 워킹 트레일화.',
    specs: {
      upper: 'Ripstop Engineered Mesh with Rock-Shield Toe Guard',
      sole: 'EIDER Arch Support Outsole',
      weight: '280g (Size 265mm)',
      waterproof: false,
      closureSystem: 'BOA® Dial System'
    },
    technologies: ['BOA', 'ORTHOLITE'],
    colors: ['Olive Khaki / Black'],
    sizes: [240, 245, 250, 255, 260, 265, 270, 275, 280],
    officialStoreUrl: 'https://www.eider.co.kr'
  },
  {
    id: 'feetzen-arch-comfort-01',
    name: 'K2 SAFETY URBAN RUNNER LOW',
    nameKo: '어반 러너 로우 워크 슈즈',
    brand: 'K2_SAFETY',
    category: 'Work',
    price: 108000,
    originalPrice: 119000,
    isNew: true,
    isBest: true,
    isFeatured: true,
    rating: 4.9,
    reviewCount: 610,
    image: '/k2_safety_boa_gtx2.jpg',
    gallery: [
        '/k2_safety_boa_gtx2.jpg',
        '/k2_safety_boa_gtx2-1.jpg'
    ],
    shortDescription: '도시 현장 및 경작업자들을 위한 스포티한 초경량 안전 로우 슈즈.',
    specs: {
      upper: 'Synthetic Leather & Air Mesh',
      sole: 'K2 SAFETY Anti-Slip Rubber',
      weight: '340g (Size 265mm)',
      waterproof: false,
      closureSystem: 'BOA® L6 Dial System'
    },
    technologies: ['BOA', 'K-SAFETY', 'ORTHOLITE'],
    colors: ['Olive Khaki / Charcoal'],
    sizes: [230, 235, 240, 245, 250, 255, 260, 265, 270, 275, 280],
    officialStoreUrl: 'https://www.k2safety.co.kr'
  },
  {
    id: 'feetzen-urban-commuter-gtx',
    name: 'BLACK YAK CANYON COMMUTER GORE-TEX',
    nameKo: '블랙야크 캐니언 커뮤터 고어텍스 워킹화',
    brand: 'BLACK_YAK',
    category: 'Outdoor',
    price: 215000,
    originalPrice: 245000,
    isNew: false,
    isBest: true,
    rating: 4.8,
    reviewCount: 342,
    image: '/k2_olive_boa_boot.svg',
    gallery: [
      '/k2_olive_boa_boot.svg',
      '/k2_olive_boa_boot_detail.svg'
    ],
    shortDescription: '비 오는 산길과 악천후 속에서도 발을 쾌적하게 지켜주는 블랙야크 고어텍스 워킹화.',
    specs: {
      upper: 'GORE-TEX® Invisible Fit + High-Durability Mesh',
      sole: 'BLACK YAK Loop-Grip Rubber',
      weight: '360g (Size 265mm)',
      waterproof: true,
      closureSystem: 'Speed-Lace Elastic Strap'
    },
    technologies: ['GORE-TEX', 'ORTHOLITE'],
    colors: ['Olive Khaki Monochrome'],
    sizes: [235, 240, 245, 250, 255, 260, 265, 270, 275, 280],
    officialStoreUrl: 'https://www.blackyak.com'
  },
  {
    id: 'stelth-w8-heavy-duty',
    name: 'K2 SAFETY W8 HEAVY INDUSTRY SAFE BOOT',
    nameKo: 'K2 SAFETY W8 중공업 8인치 고강도 방검 안전화',
    brand: 'K2_SAFETY',
    category: 'Safety',
    price: 285000,
    originalPrice: 320000,
    isNew: false,
    isBest: false,
    rating: 4.9,
    reviewCount: 188,
    image: '/k2_olive_boa_boot.svg',
    gallery: [
      '/k2_olive_boa_boot.svg',
      '/k2_olive_boa_boot_detail.svg'
    ],
    shortDescription: '조선소, 제철소, 중공업 현장의 안전을 책임지는 8인치 최상급 방수·방검 보아 안전 부츠.',
    specs: {
      upper: '2.2mm Full-Grain Waterproof Leather + Fire-Retardant Seams',
      sole: 'K2 SAFETY Heat-Resistant Nitrile Rubber (300°C)',
      weight: '690g (Size 265mm)',
      safetyStandard: 'KCS 인증 1급 중작업용 / 내유·내열·내답판',
      waterproof: true,
      closureSystem: 'BOA® M4 Metal Dial System'
    },
    technologies: ['GORE-TEX', 'BOA', 'K-SAFETY'],
    colors: ['Industrial Olive Khaki'],
    sizes: [250, 255, 260, 265, 270, 275, 280, 285, 290, 300],
    officialStoreUrl: 'https://www.k2safety.co.kr/product/w8-heavy-boot'
  },
  {
    id: 'treksta-trail-light-mid',
    name: 'EIDER SPEED-TRAIL MID GORE-TEX',
    nameKo: '아이더(EIDER) 스피드 트레일 미드 고어텍스 등산화',
    brand: 'EIDER',
    category: 'Outdoor',
    price: 229000,
    originalPrice: 259000,
    isNew: true,
    isBest: false,
    rating: 4.8,
    reviewCount: 271,
    image: '/k2_olive_boa_boot.svg',
    gallery: [
      '/k2_olive_boa_boot.svg',
      '/k2_olive_boa_boot_detail.svg'
    ],
    shortDescription: '당일 산행과 백패킹에 완벽한 밸런스를 제공하는 미드컷 트레일화. 가벼우면서도 발목을 견고하게 지탱합니다.',
    specs: {
      upper: 'GORE-TEX® Extended Comfort + Abrasion-Resistant TPU',
      sole: 'EIDER Multi-Directional Lug Sole',
      weight: '430g (Size 265mm)',
      waterproof: true,
      closureSystem: 'BOA® L6 Dial'
    },
    technologies: ['GORE-TEX', 'BOA', 'ORTHOLITE'],
    colors: ['Olive Khaki / Black'],
    sizes: [240, 245, 250, 255, 260, 265, 270, 275, 280],
    officialStoreUrl: 'https://www.eider.co.kr'
  },
  {
    id: 'kalpa-recovery-slide-pro',
    name: 'EIDER BIOMECH RECOVERY SLIDE',
    nameKo: '아이더(EIDER) 바이오메크 리커버리 슬라이드',
    brand: 'EIDER',
    category: 'Lifestyle',
    price: 69000,
    originalPrice: 79000,
    isNew: true,
    isBest: true,
    rating: 4.9,
    reviewCount: 940,
    image: '/k2_olive_boa_boot.svg',
    gallery: [
      '/k2_olive_boa_boot.svg',
      '/k2_olive_boa_boot_detail.svg'
    ],
    shortDescription: '장시간 작업 및 아웃도어 활동 후 지친 발을 이완시켜주는 초탄성 구름 쿠셔닝 리커버리 슬라이드.',
    specs: {
      upper: 'Zero-Rub Ergonomic EVA Foam Strap',
      sole: 'EIDER Cloud-Bounce Dual Density Foam',
      weight: '160g (Size 265mm)',
      waterproof: true,
      closureSystem: 'Slip-On Ergonomic Footbed'
    },
    technologies: ['ORTHOLITE'],
    colors: ['Olive Khaki / Charcoal'],
    sizes: [230, 240, 250, 260, 270, 280, 290],
    officialStoreUrl: 'https://www.eider.co.kr'
  },
  {
    id: 'stelth-c3-esd-cleanroom',
    name: 'K2 SAFETY C3 ESD CLEANROOM SHOES',
    nameKo: 'K2 SAFETY C3 정전기 방지 제전 클린룸 안전화',
    brand: 'K2_SAFETY',
    category: 'Work',
    price: 138000,
    originalPrice: 155000,
    isNew: false,
    isBest: false,
    rating: 4.7,
    reviewCount: 140,
    image: '/k2_olive_boa_boot.svg',
    gallery: [
      '/k2_olive_boa_boot.svg',
      '/k2_olive_boa_boot_detail.svg'
    ],
    shortDescription: '반도체 및 정밀 바이오 공정을 위해 완벽한 정전기 방지(ESD)와 먼지 억제 설계를 갖춘 첨단 작업 슈즈.',
    specs: {
      upper: 'Anti-Static Synthetic Microfiber + Conductive Thread',
      sole: 'K2 SAFETY ESD Polyurethane Sole (10^6 ~ 10^8 Ohm)',
      weight: '380g (Size 265mm)',
      safetyStandard: 'KCS 인증 정전기방지 ESD Class 1',
      waterproof: false,
      closureSystem: 'Velcro Quick-Adjust Strap'
    },
    technologies: ['K-SAFETY', 'ORTHOLITE'],
    colors: ['Clean White', 'Industrial Navy'],
    sizes: [230, 235, 240, 245, 250, 255, 260, 265, 270, 275, 280],
    officialStoreUrl: 'https://www.k2safety.co.kr/product/c3-esd-cleanroom'
  }
];

export const LOOKBOOK_DATA: LookbookItem[] = [
  {
    id: 'look-01',
    title: 'THE ALPINE SILENCE',
    subtitle: 'K2 x BLACK YAK ALPINE EDITION',
    category: 'Outdoor',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
    model: 'K2 X-GRIP KOBRA 970 & BLACK YAK ALPINE PRO',
    description: '고도 2,000m 고산 지대와 험난한 암벽 능선을 가로지르는 무조건적인 방수와 접지력. 삼덕통상의 고어텍스 본딩 공정은 자연이 던지는 극한의 도전에 침묵으로 응답합니다.',
    relatedProductIds: ['treksta-kobra-970-gtx', 'treksta-alpine-pro-high'],
    date: '2026 AUTUMN/WINTER'
  },
  {
    id: 'look-02',
    title: 'INDUSTRIAL MONOLITH',
    subtitle: 'K2 SAFETY HEAVY DUTY COLLECTION',
    category: 'Worksite',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
    model: 'K2 SAFETY S6 BOA GORE-TEX & W8 HEAVY BOOT',
    description: '조선소와 대형 설비 현장의 차가운 철골 위에서 빛나는 완벽한 방검과 내구성. 기술자의 자부심을 지키는 듬직한 안전의 미학입니다.',
    relatedProductIds: ['stelth-s6-boa-gtx', 'stelth-w8-heavy-duty'],
    date: '2026 WORKWEAR CAMPAIGN'
  },
  {
    id: 'look-03',
    title: 'HEAVY DUTY SAFETY & OUTDOOR',
    subtitle: 'K2 SAFETY x BLACK YAK COLLECTION',
    category: 'Worksite',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=80',
    model: 'K2 SAFETY URBAN RUNNER & BLACK YAK CANYON',
    description: '현장과 아웃도어를 오가는 고기능성 안전 슈즈 솔루션. 하루 1만 보 이상 거친 충격을 보완하는 고강도 탄성 바닥창.',
    relatedProductIds: ['feetzen-arch-comfort-01', 'feetzen-urban-commuter-gtx'],
    date: '2026 SPRING/SUMMER'
  }
];

export const WHY_SAMDUK_PILLARS: WhySamdukPillar[] = [
  {
    id: 'since-1997',
    number: '01',
    title: 'SINCE 1997',
    subtitle: '28+ Years of Footwear Engineering',
    description: '1997년 창립 이래 오직 프리미엄 고기능성 풋웨어 제조 한길만을 걸어온 대한민국 최고의 신발 엔지니어링 기업.',
    iconName: 'Award'
  },
  {
    id: 'premium-mfg',
    number: '02',
    title: 'PREMIUM MANUFACTURING',
    subtitle: 'GORE-TEX® & BOA® Official Certified Partner',
    description: '세계 최고 수준의 고어텍스 방수 부티 공정과 BOA® Fit System 다이얼 솔루션 공식 인증 파트너사.',
    iconName: 'ShieldCheck'
  },
  {
    id: 'global-network',
    number: '03',
    title: 'GLOBAL PRODUCTION',
    subtitle: '5,000,000+ Pairs Annual Capacity',
    description: '부산 명지 R&D 센터 및 베트남 빈즈엉 대규모 첨단 스마트 공장 네트워크를 통해 글로벌 품질 규격 달성.',
    iconName: 'Globe'
  },
  {
    id: 'trusted-partner',
    number: '04',
    title: 'TRUSTED BY GLOBAL BRANDS',
    subtitle: 'World-Class OEM / ODM Excellence',
    description: '세계 최정상급 아웃도어, 안전화, 운동화 브랜드들이 신뢰하고 선택한 기술 혁신 제조 파트너.',
    iconName: 'Users'
  }
];

export const FACTORY_FACILITIES: FactoryFacility[] = [
  {
    id: 'busan-rnd',
    name: '부산 본사 및 첨단 R&D 바이오메카닉스 센터',
    location: 'Busan, Republic of Korea (부산 강서구 녹산산업단지)',
    role: 'Global HQ, Footwear Biomechanics Lab & High-Tech Prototyping',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1000&q=80',
    capacity: 'R&D / 첨단 자동화 기획 & 품질 검증',
    description: '한국인 및 글로벌 2만여 개의 족형 3D 데이터를 연구하고, 고어텍스 수압 테스트 및 소재 충격 흡수율을 계측하는 첨단 신발 공학의 심장부입니다.',
    certifications: [
      'ISO 9001 품질경영인증',
      'ISO 14001 환경경영인증',
      'GORE-TEX® Certified Lab',
      'KCS 국가안전관리 최우수기업'
    ]
  },
  {
    id: 'vietnam-factory',
    name: '베트남 빈즈엉 첨단 스마트 공장',
    location: 'Binh Duong Province, Vietnam',
    role: 'Global Mass Production Hub & Automated Stitching Line',
    image: 'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?auto=format&fit=crop&w=1000&q=80',
    capacity: 'Annual 5,000,000+ Pairs High-Precision Production',
    description: '로봇 자동 접착 라인과 친환경 LWG 인증 가죽 제단 시스템을 도입한 동남아시아 최고 규격의 스마트 신발 제조 공장입니다.',
    certifications: [
      'GORE-TEX® Gold Manufacturing Partner',
      'BOA® Fit System Certified Factory',
      'ISO 45001 안전보건경영인증',
      'ESG Green-Tier Factory'
    ]
  }
];

export const LATEST_NEWS_DATA: NewsItem[] = [
  {
    id: 'news-2026-01',
    title: '삼덕통상 x K2 Safety, 독일 A+A 국제 안전·보건 전시회에서 차세대 GORE-TEX BOA 안전화 라인업 공개 및 극찬',
    category: 'EXHIBITION',
    date: '2026.06.18',
    summary: '독일 뒤셀도르프 A+A 박람회에서 K2 SAFETY S6 초경량 방검 보아 시리즈가 유럽 바이어들의 폭발적인 주목을 받았습니다.',
    content: '삼덕통상(대표 문창섭)이 지난달 독일 뒤셀도르프에서 열린 세계 최대 안전산업 박람회 A+A 2026에서 차세대 GORE-TEX 및 BOA Fit System 듀얼 다이얼 안전화 "K2 SAFETY S6 PRO"를 전 세계 시장에 선보였습니다. 이번 제품은 중량을 기존 6인치 안전화 대비 20% 이상 감량하면서도 SRC 최고 등급 미끄럼 방지 성능과 내답판 방검 섬유를 적용해 유럽 및 북미 안전화 바이어들의 찬사를 받았습니다.',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
    readTime: '3 Min Read'
  },
  {
    id: 'news-2026-02',
    title: '베트남 빈즈엉 스마트 생산 기지, 태양광 100% 재생에너지 시설 완료 및 RE100 달성 가속화',
    category: 'ESG',
    date: '2026.05.04',
    summary: '연간 500만 족을 생산하는 베트남 사업장에 태양광 발전 및 폐수 100% 재활용 친환경 시스템 구축 완료.',
    content: '프리미엄 신발 제조 기업 삼덕통상이 글로벌 지속가능 경영(ESG)의 일환으로 베트남 빈즈엉 공장 전 옥상 부지에 태양광 에너지 시설을 완공했습니다. 이로써 공장 사용 전력의 40%를 친환경 재생에너지로 즉시 대체하며, 친환경 수성 접착제 100% 사용 및 폐고무 순환 재활용 시스템을 도입하여 해외 주요 스포츠 및 아웃도어 클라이언트로부터 ESG 모범 제조 기업 평가를 받았습니다.',
    image: 'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?auto=format&fit=crop&w=800&q=80',
    readTime: '4 Min Read'
  },
  {
    id: 'news-2026-03',
    title: '디스커버리(DISCOVERY) 및 아이더(EIDER), 2026 S/S 시그니처 트레일 & 퀀텀 워킹화 라인업 확대',
    category: 'PRODUCT',
    date: '2026.03.22',
    summary: '부산 R&D 연구소 바이오메카닉스 설계가 적용된 어글리 트레일 스니커즈 및 프리미엄 아치 서포트 워킹화 출시.',
    content: '디스커버리 익스페디션(DISCOVERY)과 아이더(EIDER)가 2026 S/S 시즌을 맞아 기능성 신제품 라인업을 동시 공식 런칭했습니다. 디스커버리 BUCKET TRAIL PRO는 충격 흡수와 스타일리시한 청키 솔 실루엣을 결합했으며, 아이더 퀀텀(QUANTUM) 시리즈는 장시간 서서 일하거나 도심과 트레일을 걷는 현대인을 위해 한국인 발볼에 맞춘 아치 쿠셔닝 설계를 적용했습니다.',
    image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=800&q=80',
    readTime: '2 Min Read'
  }
];

export const CATEGORY_CARDS = [
  {
    id: 'Safety',
    name: 'SAFETY',
    nameKo: '안전화 / 고기능성 작업부츠',
    description: 'BOA 다이얼 & GORE-TEX 방수 방검 기술이 적용된 산업 안전의 스탠다드.',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
    count: '28 Models',
    badgeText: 'KCS 인증 1급'
  },
  {
    id: 'Outdoor',
    name: 'OUTDOOR',
    nameKo: '등산화 / 아웃도어 트래킹',
    description: '악천후와 험난한 지형을 돌파하는 하이그립 아이스락과 GORE-TEX 부티 시스템.',
    image: 'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?auto=format&fit=crop&w=800&q=80',
    count: '34 Models',
    badgeText: 'NestFIT™ 족형'
  },
  {
    id: 'Running',
    name: 'RUNNING',
    nameKo: '러닝화 / 애슬레틱',
    description: '생체역학 카본 플레이트 추진력과 질소 주입 수퍼폼 미드솔의 스피드.',
    image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=800&q=80',
    count: '16 Models',
    badgeText: 'Carbon Plate'
  },
  {
    id: 'Lifestyle',
    name: 'LIFESTYLE',
    nameKo: '컴포트 / 어반 워킹화',
    description: '이탈리안 천연가죽과 3중 아치 서포트 인솔이 주는 시티 미니멀리즘.',
    image: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=800&q=80',
    count: '22 Models',
    badgeText: '12h Comfort'
  },
  {
    id: 'Work',
    name: 'WORKWEAR',
    nameKo: '경작업 / ESD 클린룸',
    description: '초경량 4인치 작업 러너 및 정전기 방지 반도체·제전 전문 라인업.',
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80',
    count: '19 Models',
    badgeText: 'ESD Class 1'
  }
];
