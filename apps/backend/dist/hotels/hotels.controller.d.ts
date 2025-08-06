import { HotelsService, HotelSearchResponse, HotelOffer, Hotel } from "./hotels.service";
export declare class HotelsController {
    private readonly hotelsService;
    constructor(hotelsService: HotelsService);
    searchHotels(cityCode: string, checkInDate: string, checkOutDate: string, adults: string, rooms?: string, radius?: string, radiusUnit?: "KM" | "MILE", currency?: string): Promise<HotelSearchResponse>;
    getHotelOffers(hotelId: string, checkInDate: string, checkOutDate: string, adults: string, rooms?: string, currency?: string): Promise<HotelOffer[]>;
    getHotelDetails(hotelId: string): Promise<Hotel | null>;
    searchCities(keyword: string): Promise<Array<{
        code: string;
        name: string;
        countryCode: string;
    }>>;
    getNepalCities(): Promise<Array<{
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
}
