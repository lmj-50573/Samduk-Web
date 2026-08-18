export type NavSection = 
  | 'HOME'
  | 'SHOP'
  | 'BRANDS'
  | 'LOOKBOOK'
  | 'STORY'
  | 'NEWS'
  | 'CONTACT'
  | 'MYPAGE'
  | 'ADMIN';

export type ShoeCategory = 
  | 'ALL'
  | 'Safety'
  | 'Outdoor'
  | 'Running'
  | 'Lifestyle'
  | 'Work';

export type BrandId = 'K2_SAFETY' | 'EIDER' | 'BLACK_YAK';

export interface CustomShoePhoto {
  id: string;
  title: string;
  image: string; // Base64 data URL or Blob URL or image URL
  additionalImages?: string[];
  brand: BrandId | 'CUSTOM';
  brandNameKo?: string;
  category: ShoeCategory;
  description: string;
  price?: number;
  specs?: {
    upper?: string;
    sole?: string;
    weight?: string;
    closureSystem?: string;
  };
  targetProductId?: string; // If this uploaded photo replaces an existing product image
  isCustomCraft?: boolean;
  createdAt: string;
}

export interface ShoeProduct {
  id: string;
  name: string;
  nameKo: string;
  brand: BrandId | 'CUSTOM';
  category: ShoeCategory;
  price: number;
  originalPrice?: number;
  isNew: boolean;
  isBest: boolean;
  isFeatured?: boolean;
  isCustomCraft?: boolean;
  rating: number;
  reviewCount: number;
  image: string;
  gallery: string[];
  shortDescription: string;
  specs: {
    upper: string;
    sole: string;
    weight: string;
    safetyStandard?: string;
    waterproof?: boolean;
    closureSystem: string; // e.g. "BOA® Fit System" or "Quick-Lace"
  };
  technologies: ('GORE-TEX' | 'BOA' | 'VIBRAM' | 'K-SAFETY' | 'ORTHOLITE' | 'CARBON-PLATE' | 'CUSTOM-CRAFT')[];
    colors: string[];
    colorVariants?: {
        name: string;
        image: string;
        gallery: string[];
    }[];
    sizes: number[];
  officialStoreUrl: string;
}

export interface BrandInfo {
  id: BrandId;
  name: string;
  nameKo: string;
  tagline: string;
  description: string;
  heroImage: string;
  logoText: string;
  accentColor: string;
  categoryFocus: string;
  foundedYear: string;
  officialStoreUrl: string;
  keyFeatures: string[];
  stats: {
    label: string;
    value: string;
  }[];
}

export interface LookbookItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'Outdoor' | 'Worksite' | 'Urban' | 'Mountain';
  image: string;
  model: string;
  description: string;
  relatedProductIds: string[];
  date: string;
}

export interface NewsItem {
  id: string;
  title: string;
  category: 'EXHIBITION' | 'PRODUCT' | 'CORPORATE' | 'ESG';
  date: string;
  summary: string;
  content: string;
  image: string;
  readTime: string;
}

export interface WhySamdukPillar {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
}

export interface FactoryFacility {
  id: string;
  name: string;
  location: string;
  role: string;
  image: string;
  capacity: string;
  description: string;
  certifications: string[];
}
