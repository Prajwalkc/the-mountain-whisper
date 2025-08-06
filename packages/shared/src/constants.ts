// API Configuration
export const API_CONFIG = {
  BASE_URL: process.env.API_BASE_URL || "http://localhost:3001/api",
  VERSION: "v1",
  TIMEOUT: 30000,
} as const;

// Application Constants
export const APP_CONFIG = {
  NAME: "The Mountain Whisper",
  DESCRIPTION: "Your Complete Nepal Travel Planner",
  CONTACT_EMAIL: "info@themountainwhisper.com",
  SUPPORT_EMAIL: "support@themountainwhisper.com",
  PHONE: "+977-1-234-5678",
  ADDRESS: "Kathmandu, Nepal",
} as const;

// Tour Categories
export const TOUR_CATEGORIES = [
  "trekking",
  "adventure",
  "mountain",
  "cultural",
  "heritage",
  "wildlife",
  "safari",
  "leisure",
  "spiritual",
  "photography",
] as const;

// Destination Regions
export const DESTINATION_REGIONS = [
  "Central Nepal",
  "Eastern Nepal",
  "Western Nepal",
  "Southern Nepal",
  "North Central Nepal",
  "Far Western Nepal",
] as const;

// Tour Difficulties
export const TOUR_DIFFICULTIES = [
  "Easy",
  "Moderate",
  "Challenging",
  "Extreme",
] as const;

// Booking Status
export const BOOKING_STATUS = [
  "pending",
  "confirmed",
  "paid",
  "completed",
  "cancelled",
] as const;

// Payment Status
export const PAYMENT_STATUS = [
  "pending",
  "processing",
  "completed",
  "failed",
  "refunded",
] as const;

// User Roles
export const USER_ROLES = ["user", "guide", "admin", "super_admin"] as const;

// File Upload Limits
export const FILE_UPLOAD = {
  MAX_SIZE: 10 * 1024 * 1024, // 10MB
  ALLOWED_TYPES: ["image/jpeg", "image/png", "image/webp", "image/gif"],
} as const;

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 100,
} as const;

// JWT Configuration
export const JWT_CONFIG = {
  ACCESS_TOKEN_EXPIRES_IN: "15m",
  REFRESH_TOKEN_EXPIRES_IN: "7d",
  ALGORITHM: "HS256",
} as const;

// Rate Limiting
export const RATE_LIMIT = {
  WINDOW_MS: 15 * 60 * 1000, // 15 minutes
  MAX_REQUESTS: 100, // limit each IP to 100 requests per windowMs
} as const;

// Email Templates
export const EMAIL_TEMPLATES = {
  WELCOME: "welcome",
  BOOKING_CONFIRMATION: "booking-confirmation",
  PAYMENT_SUCCESS: "payment-success",
  PASSWORD_RESET: "password-reset",
  NEWSLETTER: "newsletter",
} as const;

// Social Media
export const SOCIAL_MEDIA = {
  FACEBOOK: "https://facebook.com/themountainwhisper",
  INSTAGRAM: "https://instagram.com/themountainwhisper",
  TWITTER: "https://twitter.com/mountain_whisper",
  YOUTUBE: "https://youtube.com/@themountainwhisper",
} as const;

// SEO
export const SEO_CONFIG = {
  DEFAULT_TITLE: "The Mountain Whisper - Your Complete Nepal Travel Planner",
  DEFAULT_DESCRIPTION:
    "Plan your perfect trip to Nepal with The Mountain Whisper. Discover mountain treks, cultural tours, adventure activities, and more!",
  DEFAULT_KEYWORDS:
    "Nepal travel, Everest trekking, Annapurna circuit, Kathmandu tours, Nepal adventure, Himalayan trekking, Nepal cultural tours",
  DEFAULT_IMAGE:
    "https://images.unsplash.com/photo-1542359649-31e03cd4d909?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  UNAUTHORIZED: "You are not authorized to perform this action",
  FORBIDDEN: "Access forbidden",
  NOT_FOUND: "Resource not found",
  VALIDATION_ERROR: "Validation error",
  INTERNAL_SERVER_ERROR: "Internal server error",
  RATE_LIMIT_EXCEEDED: "Too many requests, please try again later",
} as const;

// Success Messages
export const SUCCESS_MESSAGES = {
  USER_CREATED: "User created successfully",
  LOGIN_SUCCESS: "Login successful",
  LOGOUT_SUCCESS: "Logout successful",
  BOOKING_CREATED: "Booking created successfully",
  PAYMENT_SUCCESS: "Payment completed successfully",
  EMAIL_SENT: "Email sent successfully",
} as const;
