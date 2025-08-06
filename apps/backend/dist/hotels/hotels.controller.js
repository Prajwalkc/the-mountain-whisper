"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HotelsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const hotels_service_1 = require("./hotels.service");
let HotelsController = class HotelsController {
    constructor(hotelsService) {
        this.hotelsService = hotelsService;
    }
    async searchHotels(cityCode, checkInDate, checkOutDate, adults, rooms, radius, radiusUnit, currency) {
        if (!cityCode || !checkInDate || !checkOutDate || !adults) {
            throw new common_1.BadRequestException("Missing required parameters: cityCode, checkInDate, checkOutDate, adults");
        }
        const searchParams = {
            cityCode,
            checkInDate,
            checkOutDate,
            adults: parseInt(adults, 10),
            rooms: rooms ? parseInt(rooms, 10) : 1,
            radius: radius ? parseInt(radius, 10) : 5,
            radiusUnit: radiusUnit || "KM",
            currency: currency || "USD",
        };
        return this.hotelsService.searchHotels(searchParams);
    }
    async getHotelOffers(hotelId, checkInDate, checkOutDate, adults, rooms, currency) {
        if (!checkInDate || !checkOutDate || !adults) {
            throw new common_1.BadRequestException("Missing required parameters: checkInDate, checkOutDate, adults");
        }
        const params = {
            checkInDate,
            checkOutDate,
            adults: parseInt(adults, 10),
            rooms: rooms ? parseInt(rooms, 10) : 1,
            currency: currency || "USD",
        };
        return this.hotelsService.getHotelOffers(hotelId, params);
    }
    async getHotelDetails(hotelId) {
        return this.hotelsService.getHotelDetails(hotelId);
    }
    async searchCities(keyword) {
        if (!keyword) {
            throw new common_1.BadRequestException("Missing required parameter: keyword");
        }
        return this.hotelsService.getCityCodes(keyword);
    }
    async getNepalCities() {
        return [
            { code: "KTM", name: "Kathmandu", countryCode: "NP" },
            { code: "PKR", name: "Pokhara", countryCode: "NP" },
            { code: "BWA", name: "Bhairahawa", countryCode: "NP" },
            { code: "JKR", name: "Janakpur", countryCode: "NP" },
            { code: "BIR", name: "Biratnagar", countryCode: "NP" },
            { code: "NPJ", name: "Nepalgunj", countryCode: "NP" },
            { code: "DHI", name: "Dhangadhi", countryCode: "NP" },
        ];
    }
    async createBooking(bookingData) {
        return this.hotelsService.createBooking(bookingData);
    }
    async getBooking(bookingReference) {
        return this.hotelsService.getBooking(bookingReference);
    }
};
exports.HotelsController = HotelsController;
__decorate([
    (0, common_1.Get)("search"),
    (0, swagger_1.ApiOperation)({ summary: "Search for hotels" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Hotels and offers retrieved successfully",
    }),
    (0, swagger_1.ApiQuery)({
        name: "cityCode",
        required: true,
        type: String,
        description: "IATA city code (e.g., KTM for Kathmandu)",
    }),
    (0, swagger_1.ApiQuery)({
        name: "checkInDate",
        required: true,
        type: String,
        description: "Check-in date (YYYY-MM-DD)",
    }),
    (0, swagger_1.ApiQuery)({
        name: "checkOutDate",
        required: true,
        type: String,
        description: "Check-out date (YYYY-MM-DD)",
    }),
    (0, swagger_1.ApiQuery)({
        name: "adults",
        required: true,
        type: Number,
        description: "Number of adult guests",
    }),
    (0, swagger_1.ApiQuery)({
        name: "rooms",
        required: false,
        type: Number,
        description: "Number of rooms (default: 1)",
    }),
    (0, swagger_1.ApiQuery)({
        name: "radius",
        required: false,
        type: Number,
        description: "Search radius (default: 5)",
    }),
    (0, swagger_1.ApiQuery)({
        name: "radiusUnit",
        required: false,
        enum: ["KM", "MILE"],
        description: "Radius unit (default: KM)",
    }),
    (0, swagger_1.ApiQuery)({
        name: "currency",
        required: false,
        type: String,
        description: "Currency code (default: USD)",
    }),
    __param(0, (0, common_1.Query)("cityCode")),
    __param(1, (0, common_1.Query)("checkInDate")),
    __param(2, (0, common_1.Query)("checkOutDate")),
    __param(3, (0, common_1.Query)("adults")),
    __param(4, (0, common_1.Query)("rooms")),
    __param(5, (0, common_1.Query)("radius")),
    __param(6, (0, common_1.Query)("radiusUnit")),
    __param(7, (0, common_1.Query)("currency")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String, String, String, String]),
    __metadata("design:returntype", Promise)
], HotelsController.prototype, "searchHotels", null);
__decorate([
    (0, common_1.Get)("offers/:hotelId"),
    (0, swagger_1.ApiOperation)({ summary: "Get hotel offers by hotel ID" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Hotel offers retrieved successfully",
    }),
    (0, swagger_1.ApiQuery)({ name: "checkInDate", required: true, type: String }),
    (0, swagger_1.ApiQuery)({ name: "checkOutDate", required: true, type: String }),
    (0, swagger_1.ApiQuery)({ name: "adults", required: true, type: Number }),
    (0, swagger_1.ApiQuery)({ name: "rooms", required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: "currency", required: false, type: String }),
    __param(0, (0, common_1.Param)("hotelId")),
    __param(1, (0, common_1.Query)("checkInDate")),
    __param(2, (0, common_1.Query)("checkOutDate")),
    __param(3, (0, common_1.Query)("adults")),
    __param(4, (0, common_1.Query)("rooms")),
    __param(5, (0, common_1.Query)("currency")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String, String]),
    __metadata("design:returntype", Promise)
], HotelsController.prototype, "getHotelOffers", null);
__decorate([
    (0, common_1.Get)("details/:hotelId"),
    (0, swagger_1.ApiOperation)({ summary: "Get hotel details by hotel ID" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Hotel details retrieved successfully",
    }),
    __param(0, (0, common_1.Param)("hotelId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], HotelsController.prototype, "getHotelDetails", null);
__decorate([
    (0, common_1.Get)("cities/search"),
    (0, swagger_1.ApiOperation)({ summary: "Search for city codes" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "City codes retrieved successfully",
    }),
    (0, swagger_1.ApiQuery)({
        name: "keyword",
        required: true,
        type: String,
        description: "City name or keyword",
    }),
    __param(0, (0, common_1.Query)("keyword")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], HotelsController.prototype, "searchCities", null);
__decorate([
    (0, common_1.Get)("cities/nepal"),
    (0, swagger_1.ApiOperation)({ summary: "Get popular Nepal city codes for hotels" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Nepal city codes retrieved successfully",
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HotelsController.prototype, "getNepalCities", null);
__decorate([
    (0, common_1.Post)("booking"),
    (0, swagger_1.ApiOperation)({ summary: "Create hotel booking" }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: "Hotel booking created successfully",
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], HotelsController.prototype, "createBooking", null);
__decorate([
    (0, common_1.Get)("booking/:bookingReference"),
    (0, swagger_1.ApiOperation)({ summary: "Get booking details by reference" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Booking details retrieved successfully",
    }),
    __param(0, (0, common_1.Param)("bookingReference")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], HotelsController.prototype, "getBooking", null);
exports.HotelsController = HotelsController = __decorate([
    (0, swagger_1.ApiTags)("hotels"),
    (0, common_1.Controller)("hotels"),
    __metadata("design:paramtypes", [hotels_service_1.HotelsService])
], HotelsController);
//# sourceMappingURL=hotels.controller.js.map