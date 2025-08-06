import { ConfigService } from "@nestjs/config";
export interface HotelSearchParams {
    cityCode: string;
    checkInDate: string;
    checkOutDate: string;
    adults: number;
    rooms?: number;
    radius?: number;
    radiusUnit?: "KM" | "MILE";
    hotelIds?: string[];
    priceRange?: string;
    currency?: string;
    bestRateOnly?: boolean;
}
export interface HotelOffer {
    id: string;
    hotelId: string;
    checkInDate: string;
    checkOutDate: string;
    roomQuantity: number;
    adults: number;
    price: {
        total: string;
        base: string;
        currency: string;
        taxes?: any[];
    };
    room: {
        type: string;
        typeEstimated?: {
            category: string;
            beds: number;
            bedType: string;
        };
        description?: {
            text: string;
            lang: string;
        };
    };
    guests: {
        adults: number;
    };
    policies: {
        cancellations?: any[];
        guarantee?: any;
        deposit?: any;
    };
}
export interface Hotel {
    hotelId: string;
    name: string;
    rating?: number;
    contact?: {
        phone?: string;
        fax?: string;
    };
    address: {
        lines: string[];
        postalCode: string;
        cityName: string;
        countryCode: string;
    };
    geoCode: {
        latitude: number;
        longitude: number;
    };
    amenities?: string[];
    media?: Array<{
        uri: string;
        category: string;
    }>;
    description?: {
        text: string;
        lang: string;
    };
}
export interface HotelSearchResponse {
    hotels: Hotel[];
    offers: HotelOffer[];
}
export declare class HotelsService {
    private configService;
    private readonly logger;
    private amadeus;
    constructor(configService: ConfigService);
    searchHotels(params: HotelSearchParams): Promise<HotelSearchResponse>;
    getHotelOffers(hotelId: string, params: Omit<HotelSearchParams, "cityCode">): Promise<HotelOffer[]>;
    getHotelDetails(hotelId: string): Promise<Hotel | null>;
    getCityCodes(keyword: string): Promise<Array<{
        code: string;
        name: string;
        countryCode: string;
    }>>;
    createBooking(bookingData: any): Promise<{
        bookingReference: string;
        status: string;
        message: string;
    }>;
    getBooking(bookingReference: string): Promise<any>;
    private calculateTotalAmount;
    private calculateNights;
    private bookings;
    private storeBooking;
    private retrieveBooking;
}
