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
var HotelsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.HotelsService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const Amadeus = require("amadeus");
let HotelsService = HotelsService_1 = class HotelsService {
    constructor(configService) {
        this.configService = configService;
        this.logger = new common_1.Logger(HotelsService_1.name);
        this.bookings = new Map();
        const clientId = this.configService.get("amadeus.clientId");
        const clientSecret = this.configService.get("amadeus.clientSecret");
        const hostname = this.configService.get("amadeus.hostname");
        this.amadeus = new Amadeus({
            clientId,
            clientSecret,
            hostname,
        });
        this.logger.log(`Amadeus client initialized for ${hostname} environment`);
    }
    async searchHotels(params) {
        try {
            this.logger.log(`Searching hotels for city: ${params.cityCode}`);
            const hotelListResponse = await this.amadeus.referenceData.locations.hotels.byCity.get({
                cityCode: params.cityCode,
                radius: params.radius || 5,
                radiusUnit: params.radiusUnit || "KM",
            });
            if (!hotelListResponse.data || hotelListResponse.data.length === 0) {
                return { hotels: [], offers: [] };
            }
            const hotelIds = hotelListResponse.data
                .slice(0, 20)
                .map((hotel) => hotel.hotelId);
            const offersResponse = await this.amadeus.shopping.hotelOffersSearch.get({
                hotelIds: hotelIds.join(","),
                checkInDate: params.checkInDate,
                checkOutDate: params.checkOutDate,
                adults: params.adults,
                rooms: params.rooms || 1,
                currency: params.currency || "USD",
                bestRateOnly: params.bestRateOnly !== false,
            });
            const hotels = hotelListResponse.data.map((hotel) => ({
                hotelId: hotel.hotelId,
                name: hotel.name,
                rating: hotel.rating,
                contact: hotel.contact,
                address: hotel.address,
                geoCode: hotel.geoCode,
                amenities: hotel.amenities,
                media: hotel.media,
                description: hotel.description,
            }));
            const offers = offersResponse.data?.map((offerData) => ({
                id: offerData.offers[0]?.id,
                hotelId: offerData.hotel?.hotelId,
                checkInDate: offerData.offers[0]?.checkInDate,
                checkOutDate: offerData.offers[0]?.checkOutDate,
                roomQuantity: offerData.offers[0]?.roomQuantity,
                adults: offerData.offers[0]?.guests?.adults,
                price: offerData.offers[0]?.price,
                room: offerData.offers[0]?.room,
                guests: offerData.offers[0]?.guests,
                policies: offerData.offers[0]?.policies,
            })) || [];
            this.logger.log(`Found ${hotels.length} hotels and ${offers.length} offers`);
            return { hotels, offers };
        }
        catch (error) {
            this.logger.error("Error searching hotels:", error);
            throw new Error(`Hotel search failed: ${error.message}`);
        }
    }
    async getHotelOffers(hotelId, params) {
        try {
            const response = await this.amadeus.shopping.hotelOffersSearch.get({
                hotelIds: hotelId,
                checkInDate: params.checkInDate,
                checkOutDate: params.checkOutDate,
                adults: params.adults,
                rooms: params.rooms || 1,
                currency: params.currency || "USD",
            });
            return (response.data?.map((offerData) => ({
                id: offerData.offers[0]?.id,
                hotelId: offerData.hotel?.hotelId,
                checkInDate: offerData.offers[0]?.checkInDate,
                checkOutDate: offerData.offers[0]?.checkOutDate,
                roomQuantity: offerData.offers[0]?.roomQuantity,
                adults: offerData.offers[0]?.guests?.adults,
                price: offerData.offers[0]?.price,
                room: offerData.offers[0]?.room,
                guests: offerData.offers[0]?.guests,
                policies: offerData.offers[0]?.policies,
            })) || []);
        }
        catch (error) {
            this.logger.error(`Error getting hotel offers for ${hotelId}:`, error);
            throw new Error(`Failed to get hotel offers: ${error.message}`);
        }
    }
    async getHotelDetails(hotelId) {
        try {
            const response = await this.amadeus.referenceData.locations.hotels.byHotels.get({
                hotelIds: hotelId,
            });
            if (!response.data || response.data.length === 0) {
                return null;
            }
            const hotel = response.data[0];
            return {
                hotelId: hotel.hotelId,
                name: hotel.name,
                rating: hotel.rating,
                contact: hotel.contact,
                address: hotel.address,
                geoCode: hotel.geoCode,
                amenities: hotel.amenities,
                media: hotel.media,
                description: hotel.description,
            };
        }
        catch (error) {
            this.logger.error(`Error getting hotel details for ${hotelId}:`, error);
            throw new Error(`Failed to get hotel details: ${error.message}`);
        }
    }
    async getCityCodes(keyword) {
        try {
            const response = await this.amadeus.referenceData.locations.get({
                keyword,
                subType: "CITY",
            });
            return (response.data?.map((location) => ({
                code: location.iataCode,
                name: location.name,
                countryCode: location.address?.countryCode,
            })) || []);
        }
        catch (error) {
            this.logger.error("Error searching city codes:", error);
            throw new Error(`City search failed: ${error.message}`);
        }
    }
    async createBooking(bookingData) {
        try {
            this.logger.log("Creating hotel booking");
            const bookingReference = `TMW-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
            const booking = {
                bookingReference,
                status: "confirmed",
                hotel: bookingData.hotel,
                offer: bookingData.offer,
                guestDetails: bookingData.guestDetails,
                searchParams: bookingData.searchParams,
                paymentDetails: bookingData.paymentDetails,
                createdAt: new Date().toISOString(),
                totalAmount: this.calculateTotalAmount(bookingData.offer, bookingData.searchParams),
            };
            this.storeBooking(bookingReference, booking);
            this.logger.log(`Booking created successfully: ${bookingReference}`);
            return {
                bookingReference,
                status: "confirmed",
                message: "Your hotel booking has been confirmed successfully.",
            };
        }
        catch (error) {
            this.logger.error("Error creating booking:", error);
            throw new Error(`Booking failed: ${error.message}`);
        }
    }
    async getBooking(bookingReference) {
        try {
            const booking = this.retrieveBooking(bookingReference);
            if (!booking) {
                throw new Error("Booking not found");
            }
            return booking;
        }
        catch (error) {
            this.logger.error(`Error retrieving booking ${bookingReference}:`, error);
            throw new Error(`Failed to retrieve booking: ${error.message}`);
        }
    }
    calculateTotalAmount(offer, searchParams) {
        const nights = this.calculateNights(searchParams.checkInDate, searchParams.checkOutDate);
        const basePrice = parseFloat(offer.price.total) * nights;
        const taxes = basePrice * 0.13;
        return basePrice + taxes;
    }
    calculateNights(checkInDate, checkOutDate) {
        const checkIn = new Date(checkInDate);
        const checkOut = new Date(checkOutDate);
        return Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
    }
    storeBooking(reference, booking) {
        this.bookings.set(reference, booking);
    }
    retrieveBooking(reference) {
        return this.bookings.get(reference);
    }
};
exports.HotelsService = HotelsService;
exports.HotelsService = HotelsService = HotelsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], HotelsService);
//# sourceMappingURL=hotels.service.js.map