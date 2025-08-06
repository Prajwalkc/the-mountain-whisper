"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatCurrency = formatCurrency;
exports.formatDate = formatDate;
exports.truncateText = truncateText;
exports.createSlug = createSlug;
exports.isValidEmail = isValidEmail;
exports.generateId = generateId;
exports.safeJsonParse = safeJsonParse;
exports.capitalizeWords = capitalizeWords;
exports.debounce = debounce;
exports.calculatePagination = calculatePagination;
exports.searchItems = searchItems;
exports.sortItems = sortItems;
exports.optimizeImageUrl = optimizeImageUrl;
/**
 * Formats currency values
 * @param amount - The amount to format
 * @param currency - Currency code (default: USD)
 * @returns Formatted currency string
 */
function formatCurrency(amount, currency = "USD") {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount);
}
/**
 * Formats dates in a readable format
 * @param date - Date string or Date object
 * @returns Formatted date string
 */
function formatDate(date) {
    const dateObj = typeof date === "string" ? new Date(date) : date;
    return new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    }).format(dateObj);
}
/**
 * Truncates text to a specified length
 * @param text - Text to truncate
 * @param length - Maximum length
 * @returns Truncated text with ellipsis
 */
function truncateText(text, length) {
    if (text.length <= length)
        return text;
    return text.slice(0, length).trim() + "...";
}
/**
 * Creates a slug from a string
 * @param text - Text to convert to slug
 * @returns URL-friendly slug
 */
function createSlug(text) {
    return text
        .toLowerCase()
        .replace(/[^\w ]+/g, "")
        .replace(/ +/g, "-");
}
/**
 * Validates email format
 * @param email - Email to validate
 * @returns Boolean indicating if email is valid
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
/**
 * Generates a random ID
 * @param length - Length of the ID (default: 8)
 * @returns Random string ID
 */
function generateId(length = 8) {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}
/**
 * Safely parses JSON with error handling
 * @param jsonString - JSON string to parse
 * @param fallback - Fallback value if parsing fails
 * @returns Parsed object or fallback
 */
function safeJsonParse(jsonString, fallback) {
    try {
        return JSON.parse(jsonString);
    }
    catch {
        return fallback;
    }
}
/**
 * Capitalizes the first letter of each word
 * @param text - Text to capitalize
 * @returns Capitalized text
 */
function capitalizeWords(text) {
    return text.replace(/\b\w/g, (char) => char.toUpperCase());
}
/**
 * Debounces a function call
 * @param func - Function to debounce
 * @param wait - Wait time in milliseconds
 * @returns Debounced function
 */
function debounce(func, wait) {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
}
/**
 * Calculates pagination metadata
 * @param page - Current page number
 * @param limit - Items per page
 * @param total - Total number of items
 * @returns Pagination metadata
 */
function calculatePagination(page, limit, total) {
    const totalPages = Math.ceil(total / limit);
    const hasNextPage = page < totalPages;
    const hasPreviousPage = page > 1;
    const offset = (page - 1) * limit;
    return {
        page,
        limit,
        total,
        totalPages,
        hasNextPage,
        hasPreviousPage,
        offset,
    };
}
/**
 * Filters an array of objects by a search query
 * @param items - Array of objects to search
 * @param query - Search query
 * @param fields - Fields to search in
 * @returns Filtered array
 */
function searchItems(items, query, fields) {
    if (!query.trim())
        return items;
    const lowercaseQuery = query.toLowerCase();
    return items.filter((item) => fields.some((field) => {
        const value = item[field];
        if (typeof value === "string") {
            return value.toLowerCase().includes(lowercaseQuery);
        }
        if (Array.isArray(value)) {
            return value.some((v) => typeof v === "string" && v.toLowerCase().includes(lowercaseQuery));
        }
        return false;
    }));
}
/**
 * Sorts an array of objects by a field
 * @param items - Array of objects to sort
 * @param field - Field to sort by
 * @param direction - Sort direction
 * @returns Sorted array
 */
function sortItems(items, field, direction = "asc") {
    return [...items].sort((a, b) => {
        const aValue = a[field];
        const bValue = b[field];
        if (typeof aValue === "string" && typeof bValue === "string") {
            return direction === "asc"
                ? aValue.localeCompare(bValue)
                : bValue.localeCompare(aValue);
        }
        if (typeof aValue === "number" && typeof bValue === "number") {
            return direction === "asc" ? aValue - bValue : bValue - aValue;
        }
        return 0;
    });
}
/**
 * Optimizes image URLs for better performance
 * @param url - The original image URL
 * @param width - Desired width
 * @param height - Desired height
 * @param quality - Image quality (1-100)
 * @returns Optimized image URL
 */
function optimizeImageUrl(url, width, height, quality = 80) {
    if (!url)
        return "/placeholder.svg";
    // If it's an Unsplash URL, add optimization parameters
    if (url.includes("unsplash.com")) {
        const params = new URLSearchParams();
        if (width)
            params.set("w", width.toString());
        if (height)
            params.set("h", height.toString());
        params.set("q", quality.toString());
        params.set("auto", "format");
        params.set("fit", "crop");
        const separator = url.includes("?") ? "&" : "?";
        return `${url}${separator}${params.toString()}`;
    }
    return url;
}
