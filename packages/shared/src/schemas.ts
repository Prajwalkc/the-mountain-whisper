import { z } from "zod";

// User schemas
export const createUserSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  phone: z.string().optional(),
  country: z.string().optional(),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export const updateUserSchema = createUserSchema
  .partial()
  .omit({ password: true });

// Tour schemas
export const createTourSchema = z.object({
  name: z.string().min(1, "Tour name is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  image: z.string().url("Invalid image URL"),
  duration: z.string(),
  groupSize: z.string(),
  season: z.string(),
  price: z.number().positive("Price must be positive"),
  difficulty: z.enum(["Easy", "Moderate", "Challenging", "Extreme"]).optional(),
  category: z.array(z.string()),
  highlights: z.array(z.string()).optional(),
  featured: z.boolean().optional(),
});

export const updateTourSchema = createTourSchema.partial();

// Destination schemas
export const createDestinationSchema = z.object({
  name: z.string().min(1, "Destination name is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  image: z.string().url("Invalid image URL"),
  activities: z.array(z.string()),
  elevation: z.string().optional(),
  bestTime: z.string().optional(),
  region: z.string(),
  featured: z.boolean().optional(),
});

export const updateDestinationSchema = createDestinationSchema.partial();

// Booking schemas
export const createBookingSchema = z.object({
  tourId: z.string().uuid("Invalid tour ID"),
  userId: z.string().uuid("Invalid user ID"),
  startDate: z.string().datetime("Invalid start date"),
  endDate: z.string().datetime("Invalid end date"),
  numberOfTravelers: z
    .number()
    .int()
    .positive("Number of travelers must be positive"),
  specialRequests: z.string().optional(),
  contactInfo: z.object({
    name: z.string().min(1, "Contact name is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(1, "Phone number is required"),
  }),
});

export const updateBookingSchema = createBookingSchema.partial();

// Contact form schema
export const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

// Search and filter schemas
export const searchSchema = z.object({
  q: z.string().optional(),
  category: z.string().optional(),
  region: z.string().optional(),
  difficulty: z.enum(["Easy", "Moderate", "Challenging", "Extreme"]).optional(),
  minPrice: z.number().optional(),
  maxPrice: z.number().optional(),
  page: z.number().int().positive().optional().default(1),
  limit: z.number().int().positive().max(100).optional().default(10),
});

// Newsletter subscription schema
export const newsletterSchema = z.object({
  email: z.string().email("Invalid email address"),
  preferences: z.array(z.string()).optional(),
});

// Review schema
export const createReviewSchema = z.object({
  tourId: z.string().uuid("Invalid tour ID"),
  userId: z.string().uuid("Invalid user ID"),
  rating: z.number().int().min(1).max(5, "Rating must be between 1 and 5"),
  title: z.string().min(1, "Review title is required"),
  comment: z.string().min(10, "Comment must be at least 10 characters"),
});

export const updateReviewSchema = createReviewSchema.partial();

// Payment schema
export const createPaymentSchema = z.object({
  bookingId: z.string().uuid("Invalid booking ID"),
  amount: z.number().positive("Amount must be positive"),
  currency: z.string().default("USD"),
  paymentMethod: z.enum(["stripe", "paypal"]),
});

// Type exports
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
