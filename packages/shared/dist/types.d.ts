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
