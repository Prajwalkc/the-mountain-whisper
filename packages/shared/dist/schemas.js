"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPaymentSchema = exports.updateReviewSchema = exports.createReviewSchema = exports.newsletterSchema = exports.searchSchema = exports.contactFormSchema = exports.updateBookingSchema = exports.createBookingSchema = exports.updateDestinationSchema = exports.createDestinationSchema = exports.updateTourSchema = exports.createTourSchema = exports.updateUserSchema = exports.loginSchema = exports.createUserSchema = void 0;
const zod_1 = require("zod");
// User schemas
exports.createUserSchema = zod_1.z.object({
    name: zod_1.z.string().min(2, "Name must be at least 2 characters"),
    email: zod_1.z.string().email("Invalid email address"),
    password: zod_1.z.string().min(8, "Password must be at least 8 characters"),
    phone: zod_1.z.string().optional(),
    country: zod_1.z.string().optional(),
});
exports.loginSchema = zod_1.z.object({
    email: zod_1.z.string().email("Invalid email address"),
    password: zod_1.z.string().min(1, "Password is required"),
});
exports.updateUserSchema = exports.createUserSchema
    .partial()
    .omit({ password: true });
// Tour schemas
exports.createTourSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, "Tour name is required"),
    description: zod_1.z.string().min(10, "Description must be at least 10 characters"),
    image: zod_1.z.string().url("Invalid image URL"),
    duration: zod_1.z.string(),
    groupSize: zod_1.z.string(),
    season: zod_1.z.string(),
    price: zod_1.z.number().positive("Price must be positive"),
    difficulty: zod_1.z.enum(["Easy", "Moderate", "Challenging", "Extreme"]).optional(),
    category: zod_1.z.array(zod_1.z.string()),
    highlights: zod_1.z.array(zod_1.z.string()).optional(),
    featured: zod_1.z.boolean().optional(),
});
exports.updateTourSchema = exports.createTourSchema.partial();
// Destination schemas
exports.createDestinationSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, "Destination name is required"),
    description: zod_1.z.string().min(10, "Description must be at least 10 characters"),
    image: zod_1.z.string().url("Invalid image URL"),
    activities: zod_1.z.array(zod_1.z.string()),
    elevation: zod_1.z.string().optional(),
    bestTime: zod_1.z.string().optional(),
    region: zod_1.z.string(),
    featured: zod_1.z.boolean().optional(),
});
exports.updateDestinationSchema = exports.createDestinationSchema.partial();
// Booking schemas
exports.createBookingSchema = zod_1.z.object({
    tourId: zod_1.z.string().uuid("Invalid tour ID"),
    userId: zod_1.z.string().uuid("Invalid user ID"),
    startDate: zod_1.z.string().datetime("Invalid start date"),
    endDate: zod_1.z.string().datetime("Invalid end date"),
    numberOfTravelers: zod_1.z
        .number()
        .int()
        .positive("Number of travelers must be positive"),
    specialRequests: zod_1.z.string().optional(),
    contactInfo: zod_1.z.object({
        name: zod_1.z.string().min(1, "Contact name is required"),
        email: zod_1.z.string().email("Invalid email address"),
        phone: zod_1.z.string().min(1, "Phone number is required"),
    }),
});
exports.updateBookingSchema = exports.createBookingSchema.partial();
// Contact form schema
exports.contactFormSchema = zod_1.z.object({
    name: zod_1.z.string().min(2, "Name must be at least 2 characters"),
    email: zod_1.z.string().email("Invalid email address"),
    subject: zod_1.z.string().min(1, "Subject is required"),
    message: zod_1.z.string().min(10, "Message must be at least 10 characters"),
});
// Search and filter schemas
exports.searchSchema = zod_1.z.object({
    q: zod_1.z.string().optional(),
    category: zod_1.z.string().optional(),
    region: zod_1.z.string().optional(),
    difficulty: zod_1.z.enum(["Easy", "Moderate", "Challenging", "Extreme"]).optional(),
    minPrice: zod_1.z.number().optional(),
    maxPrice: zod_1.z.number().optional(),
    page: zod_1.z.number().int().positive().optional().default(1),
    limit: zod_1.z.number().int().positive().max(100).optional().default(10),
});
// Newsletter subscription schema
exports.newsletterSchema = zod_1.z.object({
    email: zod_1.z.string().email("Invalid email address"),
    preferences: zod_1.z.array(zod_1.z.string()).optional(),
});
// Review schema
exports.createReviewSchema = zod_1.z.object({
    tourId: zod_1.z.string().uuid("Invalid tour ID"),
    userId: zod_1.z.string().uuid("Invalid user ID"),
    rating: zod_1.z.number().int().min(1).max(5, "Rating must be between 1 and 5"),
    title: zod_1.z.string().min(1, "Review title is required"),
    comment: zod_1.z.string().min(10, "Comment must be at least 10 characters"),
});
exports.updateReviewSchema = exports.createReviewSchema.partial();
// Payment schema
exports.createPaymentSchema = zod_1.z.object({
    bookingId: zod_1.z.string().uuid("Invalid booking ID"),
    amount: zod_1.z.number().positive("Amount must be positive"),
    currency: zod_1.z.string().default("USD"),
    paymentMethod: zod_1.z.enum(["stripe", "paypal"]),
});
