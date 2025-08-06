/* eslint-disable @typescript-eslint/no-explicit-any */
// Core data types for the Nepal travel website

export interface Destination {
  id: string;
  name: string;
  image: string;
  description: string;
  activities: string[];
  elevation?: string;
  bestTime?: string;
  region: string;
  featured?: boolean;
}

export interface Tour {
  id: string;
  name: string;
  image: string;
  duration: string;
  groupSize: string;
  season: string;
  price: number;
  rating: number;
  description: string;
  category: string[];
  featured?: boolean;
  difficulty?: "Easy" | "Moderate" | "Challenging" | "Extreme";
  highlights?: string[];
}

export interface Testimonial {
  id: number;
  name: string;
  country: string;
  avatar: string;
  rating: number;
  text: string;
}

export interface TravelTip {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  readTime: string;
  publishedAt: string;
  featured?: boolean;
}

export interface SearchFilters {
  query: string;
  category?: string;
  region?: string;
  priceRange?: [number, number];
  duration?: string;
  difficulty?: Tour["difficulty"];
}

export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

// API Response types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Hotel-related types
export interface HotelSearchParams {
  cityCode: string;
  checkInDate: string;
  checkOutDate: string;
  adults: number;
  rooms?: number;
  radius?: number;
  radiusUnit?: "KM" | "MILE";
  currency?: string;
}

export interface Hotel {
  hotelId: string;
  name: string;
  rating?: number;
  contact?: {
    phone?: string;
    fax?: string;
  };
  address: {
    lines: string[];
    postalCode: string;
    cityName: string;
    countryCode: string;
  };
  geoCode: {
    latitude: number;
    longitude: number;
  };
  amenities?: string[];
  media?: Array<{
    uri: string;
    category: string;
  }>;
  description?: {
    text: string;
    lang: string;
  };
}

export interface HotelOffer {
  id: string;
  hotelId: string;
  checkInDate: string;
  checkOutDate: string;
  roomQuantity: number;
  adults: number;
  price: {
    total: string;
    base: string;
    currency: string;
    taxes?: any[];
  };
  room: {
    type: string;
    typeEstimated?: {
      category: string;
      beds: number;
      bedType: string;
    };
    description?: {
      text: string;
      lang: string;
    };
  };
  guests: {
    adults: number;
  };
  policies: {
    cancellations?: any[];
    guarantee?: any;
    deposit?: any;
  };
}

export interface HotelSearchResponse {
  hotels: Hotel[];
  offers: HotelOffer[];
}

export interface CityCode {
  code: string;
  name: string;
  countryCode: string;
}
