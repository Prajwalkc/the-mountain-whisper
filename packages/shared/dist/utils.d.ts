/**
 * Formats currency values
 * @param amount - The amount to format
 * @param currency - Currency code (default: USD)
 * @returns Formatted currency string
 */
export declare function formatCurrency(amount: number, currency?: string): string;
/**
 * Formats dates in a readable format
 * @param date - Date string or Date object
 * @returns Formatted date string
 */
export declare function formatDate(date: string | Date): string;
/**
 * Truncates text to a specified length
 * @param text - Text to truncate
 * @param length - Maximum length
 * @returns Truncated text with ellipsis
 */
export declare function truncateText(text: string, length: number): string;
/**
 * Creates a slug from a string
 * @param text - Text to convert to slug
 * @returns URL-friendly slug
 */
export declare function createSlug(text: string): string;
/**
 * Validates email format
 * @param email - Email to validate
 * @returns Boolean indicating if email is valid
 */
export declare function isValidEmail(email: string): boolean;
/**
 * Generates a random ID
 * @param length - Length of the ID (default: 8)
 * @returns Random string ID
 */
export declare function generateId(length?: number): string;
/**
 * Safely parses JSON with error handling
 * @param jsonString - JSON string to parse
 * @param fallback - Fallback value if parsing fails
 * @returns Parsed object or fallback
 */
export declare function safeJsonParse<T>(jsonString: string, fallback: T): T;
/**
 * Capitalizes the first letter of each word
 * @param text - Text to capitalize
 * @returns Capitalized text
 */
export declare function capitalizeWords(text: string): string;
/**
 * Debounces a function call
 * @param func - Function to debounce
 * @param wait - Wait time in milliseconds
 * @returns Debounced function
 */
export declare function debounce<T extends (...args: unknown[]) => unknown>(func: T, wait: number): (...args: Parameters<T>) => void;
/**
 * Calculates pagination metadata
 * @param page - Current page number
 * @param limit - Items per page
 * @param total - Total number of items
 * @returns Pagination metadata
 */
export declare function calculatePagination(page: number, limit: number, total: number): {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    offset: number;
};
/**
 * Filters an array of objects by a search query
 * @param items - Array of objects to search
 * @param query - Search query
 * @param fields - Fields to search in
 * @returns Filtered array
 */
export declare function searchItems<T extends Record<string, unknown>>(items: T[], query: string, fields: (keyof T)[]): T[];
/**
 * Sorts an array of objects by a field
 * @param items - Array of objects to sort
 * @param field - Field to sort by
 * @param direction - Sort direction
 * @returns Sorted array
 */
export declare function sortItems<T extends Record<string, unknown>>(items: T[], field: keyof T, direction?: "asc" | "desc"): T[];
/**
 * Optimizes image URLs for better performance
 * @param url - The original image URL
 * @param width - Desired width
 * @param height - Desired height
 * @param quality - Image quality (1-100)
 * @returns Optimized image URL
 */
export declare function optimizeImageUrl(url: string, width?: number, height?: number, quality?: number): string;
