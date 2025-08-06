import { z } from "zod";
export declare const createUserSchema: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodString;
    password: z.ZodString;
    phone: z.ZodOptional<z.ZodString>;
    country: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    name: string;
    email: string;
    password: string;
    phone?: string | undefined;
    country?: string | undefined;
}, {
    name: string;
    email: string;
    password: string;
    phone?: string | undefined;
    country?: string | undefined;
}>;
export declare const loginSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
export declare const updateUserSchema: z.ZodObject<Omit<{
    name: z.ZodOptional<z.ZodString>;
    email: z.ZodOptional<z.ZodString>;
    password: z.ZodOptional<z.ZodString>;
    phone: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    country: z.ZodOptional<z.ZodOptional<z.ZodString>>;
}, "password">, "strip", z.ZodTypeAny, {
    name?: string | undefined;
    email?: string | undefined;
    phone?: string | undefined;
    country?: string | undefined;
}, {
    name?: string | undefined;
    email?: string | undefined;
    phone?: string | undefined;
    country?: string | undefined;
}>;
export declare const createTourSchema: z.ZodObject<{
    name: z.ZodString;
    description: z.ZodString;
    image: z.ZodString;
    duration: z.ZodString;
    groupSize: z.ZodString;
    season: z.ZodString;
    price: z.ZodNumber;
    difficulty: z.ZodOptional<z.ZodEnum<["Easy", "Moderate", "Challenging", "Extreme"]>>;
    category: z.ZodArray<z.ZodString, "many">;
    highlights: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    featured: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    name: string;
    description: string;
    image: string;
    duration: string;
    groupSize: string;
    season: string;
    price: number;
    category: string[];
    difficulty?: "Easy" | "Moderate" | "Challenging" | "Extreme" | undefined;
    featured?: boolean | undefined;
    highlights?: string[] | undefined;
}, {
    name: string;
    description: string;
    image: string;
    duration: string;
    groupSize: string;
    season: string;
    price: number;
    category: string[];
    difficulty?: "Easy" | "Moderate" | "Challenging" | "Extreme" | undefined;
    featured?: boolean | undefined;
    highlights?: string[] | undefined;
}>;
export declare const updateTourSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    image: z.ZodOptional<z.ZodString>;
    duration: z.ZodOptional<z.ZodString>;
    groupSize: z.ZodOptional<z.ZodString>;
    season: z.ZodOptional<z.ZodString>;
    price: z.ZodOptional<z.ZodNumber>;
    difficulty: z.ZodOptional<z.ZodOptional<z.ZodEnum<["Easy", "Moderate", "Challenging", "Extreme"]>>>;
    category: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    highlights: z.ZodOptional<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
    featured: z.ZodOptional<z.ZodOptional<z.ZodBoolean>>;
}, "strip", z.ZodTypeAny, {
    difficulty?: "Easy" | "Moderate" | "Challenging" | "Extreme" | undefined;
    featured?: boolean | undefined;
    name?: string | undefined;
    description?: string | undefined;
    image?: string | undefined;
    duration?: string | undefined;
    groupSize?: string | undefined;
    season?: string | undefined;
    price?: number | undefined;
    category?: string[] | undefined;
    highlights?: string[] | undefined;
}, {
    difficulty?: "Easy" | "Moderate" | "Challenging" | "Extreme" | undefined;
    featured?: boolean | undefined;
    name?: string | undefined;
    description?: string | undefined;
    image?: string | undefined;
    duration?: string | undefined;
    groupSize?: string | undefined;
    season?: string | undefined;
    price?: number | undefined;
    category?: string[] | undefined;
    highlights?: string[] | undefined;
}>;
export declare const createDestinationSchema: z.ZodObject<{
    name: z.ZodString;
    description: z.ZodString;
    image: z.ZodString;
    activities: z.ZodArray<z.ZodString, "many">;
    elevation: z.ZodOptional<z.ZodString>;
    bestTime: z.ZodOptional<z.ZodString>;
    region: z.ZodString;
    featured: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    name: string;
    description: string;
    image: string;
    activities: string[];
    region: string;
    elevation?: string | undefined;
    featured?: boolean | undefined;
    bestTime?: string | undefined;
}, {
    name: string;
    description: string;
    image: string;
    activities: string[];
    region: string;
    elevation?: string | undefined;
    featured?: boolean | undefined;
    bestTime?: string | undefined;
}>;
export declare const updateDestinationSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    image: z.ZodOptional<z.ZodString>;
    activities: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    elevation: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    bestTime: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    region: z.ZodOptional<z.ZodString>;
    featured: z.ZodOptional<z.ZodOptional<z.ZodBoolean>>;
}, "strip", z.ZodTypeAny, {
    elevation?: string | undefined;
    featured?: boolean | undefined;
    name?: string | undefined;
    description?: string | undefined;
    image?: string | undefined;
    activities?: string[] | undefined;
    bestTime?: string | undefined;
    region?: string | undefined;
}, {
    elevation?: string | undefined;
    featured?: boolean | undefined;
    name?: string | undefined;
    description?: string | undefined;
    image?: string | undefined;
    activities?: string[] | undefined;
    bestTime?: string | undefined;
    region?: string | undefined;
}>;
export declare const createBookingSchema: z.ZodObject<{
    tourId: z.ZodString;
    userId: z.ZodString;
    startDate: z.ZodString;
    endDate: z.ZodString;
    numberOfTravelers: z.ZodNumber;
    specialRequests: z.ZodOptional<z.ZodString>;
    contactInfo: z.ZodObject<{
        name: z.ZodString;
        email: z.ZodString;
        phone: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        name: string;
        email: string;
        phone: string;
    }, {
        name: string;
        email: string;
        phone: string;
    }>;
}, "strip", z.ZodTypeAny, {
    tourId: string;
    userId: string;
    startDate: string;
    endDate: string;
    numberOfTravelers: number;
    contactInfo: {
        name: string;
        email: string;
        phone: string;
    };
    specialRequests?: string | undefined;
}, {
    tourId: string;
    userId: string;
    startDate: string;
    endDate: string;
    numberOfTravelers: number;
    contactInfo: {
        name: string;
        email: string;
        phone: string;
    };
    specialRequests?: string | undefined;
}>;
export declare const updateBookingSchema: z.ZodObject<{
    tourId: z.ZodOptional<z.ZodString>;
    userId: z.ZodOptional<z.ZodString>;
    startDate: z.ZodOptional<z.ZodString>;
    endDate: z.ZodOptional<z.ZodString>;
    numberOfTravelers: z.ZodOptional<z.ZodNumber>;
    specialRequests: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    contactInfo: z.ZodOptional<z.ZodObject<{
        name: z.ZodString;
        email: z.ZodString;
        phone: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        name: string;
        email: string;
        phone: string;
    }, {
        name: string;
        email: string;
        phone: string;
    }>>;
}, "strip", z.ZodTypeAny, {
    tourId?: string | undefined;
    userId?: string | undefined;
    startDate?: string | undefined;
    endDate?: string | undefined;
    numberOfTravelers?: number | undefined;
    specialRequests?: string | undefined;
    contactInfo?: {
        name: string;
        email: string;
        phone: string;
    } | undefined;
}, {
    tourId?: string | undefined;
    userId?: string | undefined;
    startDate?: string | undefined;
    endDate?: string | undefined;
    numberOfTravelers?: number | undefined;
    specialRequests?: string | undefined;
    contactInfo?: {
        name: string;
        email: string;
        phone: string;
    } | undefined;
}>;
export declare const contactFormSchema: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodString;
    subject: z.ZodString;
    message: z.ZodString;
}, "strip", z.ZodTypeAny, {
    name: string;
    email: string;
    message: string;
    subject: string;
}, {
    name: string;
    email: string;
    message: string;
    subject: string;
}>;
export declare const searchSchema: z.ZodObject<{
    q: z.ZodOptional<z.ZodString>;
    category: z.ZodOptional<z.ZodString>;
    region: z.ZodOptional<z.ZodString>;
    difficulty: z.ZodOptional<z.ZodEnum<["Easy", "Moderate", "Challenging", "Extreme"]>>;
    minPrice: z.ZodOptional<z.ZodNumber>;
    maxPrice: z.ZodOptional<z.ZodNumber>;
    page: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
    limit: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
}, "strip", z.ZodTypeAny, {
    page: number;
    limit: number;
    difficulty?: "Easy" | "Moderate" | "Challenging" | "Extreme" | undefined;
    category?: string | undefined;
    region?: string | undefined;
    q?: string | undefined;
    minPrice?: number | undefined;
    maxPrice?: number | undefined;
}, {
    difficulty?: "Easy" | "Moderate" | "Challenging" | "Extreme" | undefined;
    category?: string | undefined;
    region?: string | undefined;
    q?: string | undefined;
    minPrice?: number | undefined;
    maxPrice?: number | undefined;
    page?: number | undefined;
    limit?: number | undefined;
}>;
export declare const newsletterSchema: z.ZodObject<{
    email: z.ZodString;
    preferences: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    email: string;
    preferences?: string[] | undefined;
}, {
    email: string;
    preferences?: string[] | undefined;
}>;
export declare const createReviewSchema: z.ZodObject<{
    tourId: z.ZodString;
    userId: z.ZodString;
    rating: z.ZodNumber;
    title: z.ZodString;
    comment: z.ZodString;
}, "strip", z.ZodTypeAny, {
    tourId: string;
    userId: string;
    rating: number;
    title: string;
    comment: string;
}, {
    tourId: string;
    userId: string;
    rating: number;
    title: string;
    comment: string;
}>;
export declare const updateReviewSchema: z.ZodObject<{
    tourId: z.ZodOptional<z.ZodString>;
    userId: z.ZodOptional<z.ZodString>;
    rating: z.ZodOptional<z.ZodNumber>;
    title: z.ZodOptional<z.ZodString>;
    comment: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    tourId?: string | undefined;
    userId?: string | undefined;
    rating?: number | undefined;
    title?: string | undefined;
    comment?: string | undefined;
}, {
    tourId?: string | undefined;
    userId?: string | undefined;
    rating?: number | undefined;
    title?: string | undefined;
    comment?: string | undefined;
}>;
export declare const createPaymentSchema: z.ZodObject<{
    bookingId: z.ZodString;
    amount: z.ZodNumber;
    currency: z.ZodDefault<z.ZodString>;
    paymentMethod: z.ZodEnum<["stripe", "paypal"]>;
}, "strip", z.ZodTypeAny, {
    bookingId: string;
    amount: number;
    currency: string;
    paymentMethod: "stripe" | "paypal";
}, {
    bookingId: string;
    amount: number;
    paymentMethod: "stripe" | "paypal";
    currency?: string | undefined;
}>;
export type CreateUserInput = z.infer<typeof createUserSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
export type CreateTourInput = z.infer<typeof createTourSchema>;
export type UpdateTourInput = z.infer<typeof updateTourSchema>;
export type CreateDestinationInput = z.infer<typeof createDestinationSchema>;
export type UpdateDestinationInput = z.infer<typeof updateDestinationSchema>;
export type CreateBookingInput = z.infer<typeof createBookingSchema>;
export type UpdateBookingInput = z.infer<typeof updateBookingSchema>;
export type ContactFormInput = z.infer<typeof contactFormSchema>;
export type SearchInput = z.infer<typeof searchSchema>;
export type NewsletterInput = z.infer<typeof newsletterSchema>;
export type CreateReviewInput = z.infer<typeof createReviewSchema>;
export type UpdateReviewInput = z.infer<typeof updateReviewSchema>;
export type CreatePaymentInput = z.infer<typeof createPaymentSchema>;
