export declare const API_CONFIG: {
    readonly BASE_URL: string;
    readonly VERSION: "v1";
    readonly TIMEOUT: 30000;
};
export declare const APP_CONFIG: {
    readonly NAME: "The Mountain Whisper";
    readonly DESCRIPTION: "Your Complete Nepal Travel Planner";
    readonly CONTACT_EMAIL: "info@themountainwhisper.com";
    readonly SUPPORT_EMAIL: "support@themountainwhisper.com";
    readonly PHONE: "+977-1-234-5678";
    readonly ADDRESS: "Kathmandu, Nepal";
};
export declare const TOUR_CATEGORIES: readonly ["trekking", "adventure", "mountain", "cultural", "heritage", "wildlife", "safari", "leisure", "spiritual", "photography"];
export declare const DESTINATION_REGIONS: readonly ["Central Nepal", "Eastern Nepal", "Western Nepal", "Southern Nepal", "North Central Nepal", "Far Western Nepal"];
export declare const TOUR_DIFFICULTIES: readonly ["Easy", "Moderate", "Challenging", "Extreme"];
export declare const BOOKING_STATUS: readonly ["pending", "confirmed", "paid", "completed", "cancelled"];
export declare const PAYMENT_STATUS: readonly ["pending", "processing", "completed", "failed", "refunded"];
export declare const USER_ROLES: readonly ["user", "guide", "admin", "super_admin"];
export declare const FILE_UPLOAD: {
    readonly MAX_SIZE: number;
    readonly ALLOWED_TYPES: readonly ["image/jpeg", "image/png", "image/webp", "image/gif"];
};
export declare const PAGINATION: {
    readonly DEFAULT_PAGE: 1;
    readonly DEFAULT_LIMIT: 10;
    readonly MAX_LIMIT: 100;
};
export declare const JWT_CONFIG: {
    readonly ACCESS_TOKEN_EXPIRES_IN: "15m";
    readonly REFRESH_TOKEN_EXPIRES_IN: "7d";
    readonly ALGORITHM: "HS256";
};
export declare const RATE_LIMIT: {
    readonly WINDOW_MS: number;
    readonly MAX_REQUESTS: 100;
};
export declare const EMAIL_TEMPLATES: {
    readonly WELCOME: "welcome";
    readonly BOOKING_CONFIRMATION: "booking-confirmation";
    readonly PAYMENT_SUCCESS: "payment-success";
    readonly PASSWORD_RESET: "password-reset";
    readonly NEWSLETTER: "newsletter";
};
export declare const SOCIAL_MEDIA: {
    readonly FACEBOOK: "https://facebook.com/themountainwhisper";
    readonly INSTAGRAM: "https://instagram.com/themountainwhisper";
    readonly TWITTER: "https://twitter.com/mountain_whisper";
    readonly YOUTUBE: "https://youtube.com/@themountainwhisper";
};
export declare const SEO_CONFIG: {
    readonly DEFAULT_TITLE: "The Mountain Whisper - Your Complete Nepal Travel Planner";
    readonly DEFAULT_DESCRIPTION: "Plan your perfect trip to Nepal with The Mountain Whisper. Discover mountain treks, cultural tours, adventure activities, and more!";
    readonly DEFAULT_KEYWORDS: "Nepal travel, Everest trekking, Annapurna circuit, Kathmandu tours, Nepal adventure, Himalayan trekking, Nepal cultural tours";
    readonly DEFAULT_IMAGE: "https://images.unsplash.com/photo-1542359649-31e03cd4d909?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80";
};
export declare const ERROR_MESSAGES: {
    readonly UNAUTHORIZED: "You are not authorized to perform this action";
    readonly FORBIDDEN: "Access forbidden";
    readonly NOT_FOUND: "Resource not found";
    readonly VALIDATION_ERROR: "Validation error";
    readonly INTERNAL_SERVER_ERROR: "Internal server error";
    readonly RATE_LIMIT_EXCEEDED: "Too many requests, please try again later";
};
export declare const SUCCESS_MESSAGES: {
    readonly USER_CREATED: "User created successfully";
    readonly LOGIN_SUCCESS: "Login successful";
    readonly LOGOUT_SUCCESS: "Logout successful";
    readonly BOOKING_CREATED: "Booking created successfully";
    readonly PAYMENT_SUCCESS: "Payment completed successfully";
    readonly EMAIL_SENT: "Email sent successfully";
};
