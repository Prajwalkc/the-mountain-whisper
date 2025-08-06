import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
const Amadeus = require("amadeus");

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

@Injectable()
export class HotelsService {
  private readonly logger = new Logger(HotelsService.name);
  private amadeus: any;

  constructor(private configService: ConfigService) {
    const clientId = this.configService.get<string>("amadeus.clientId");
    const clientSecret = this.configService.get<string>("amadeus.clientSecret");
    const hostname = this.configService.get<string>("amadeus.hostname");

    this.amadeus = new Amadeus({
      clientId,
      clientSecret,
      hostname,
    });

    this.logger.log(`Amadeus client initialized for ${hostname} environment`);
  }

  async searchHotels(params: HotelSearchParams): Promise<HotelSearchResponse> {
    try {
      this.logger.log(`Searching hotels for city: ${params.cityCode}`);

      // First, search for hotels by city
      const hotelListResponse =
        await this.amadeus.referenceData.locations.hotels.byCity.get({
          cityCode: params.cityCode,
          radius: params.radius || 5,
          radiusUnit: params.radiusUnit || "KM",
        });

      if (!hotelListResponse.data || hotelListResponse.data.length === 0) {
        return { hotels: [], offers: [] };
      }

      // Extract hotel IDs (limit to first 20 for performance)
      const hotelIds = hotelListResponse.data
        .slice(0, 20)
        .map((hotel: any) => hotel.hotelId);

      // Search for hotel offers
      const offersResponse = await this.amadeus.shopping.hotelOffersSearch.get({
        hotelIds: hotelIds.join(","),
        checkInDate: params.checkInDate,
        checkOutDate: params.checkOutDate,
        adults: params.adults,
        rooms: params.rooms || 1,
        currency: params.currency || "USD",
        bestRateOnly: params.bestRateOnly !== false,
      });

      // Transform the data to match our interface
      const hotels: Hotel[] = hotelListResponse.data.map((hotel: any) => ({
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

      const offers: HotelOffer[] =
        offersResponse.data?.map((offerData: any) => ({
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

      this.logger.log(
        `Found ${hotels.length} hotels and ${offers.length} offers`
      );

      return { hotels, offers };
    } catch (error) {
      this.logger.error("Error searching hotels:", error);
      throw new Error(`Hotel search failed: ${error.message}`);
    }
  }

  async getHotelOffers(
    hotelId: string,
    params: Omit<HotelSearchParams, "cityCode">
  ): Promise<HotelOffer[]> {
    try {
      const response = await this.amadeus.shopping.hotelOffersSearch.get({
        hotelIds: hotelId,
        checkInDate: params.checkInDate,
        checkOutDate: params.checkOutDate,
        adults: params.adults,
        rooms: params.rooms || 1,
        currency: params.currency || "USD",
      });

      return (
        response.data?.map((offerData: any) => ({
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
        })) || []
      );
    } catch (error) {
      this.logger.error(`Error getting hotel offers for ${hotelId}:`, error);
      throw new Error(`Failed to get hotel offers: ${error.message}`);
    }
  }

  async getHotelDetails(hotelId: string): Promise<Hotel | null> {
    try {
      const response =
        await this.amadeus.referenceData.locations.hotels.byHotels.get({
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
    } catch (error) {
      this.logger.error(`Error getting hotel details for ${hotelId}:`, error);
      throw new Error(`Failed to get hotel details: ${error.message}`);
    }
  }

  async getCityCodes(
    keyword: string
  ): Promise<Array<{ code: string; name: string; countryCode: string }>> {
    try {
      const response = await this.amadeus.referenceData.locations.get({
        keyword,
        subType: "CITY",
      });

      return (
        response.data?.map((location: any) => ({
          code: location.iataCode,
          name: location.name,
          countryCode: location.address?.countryCode,
        })) || []
      );
    } catch (error) {
      this.logger.error("Error searching city codes:", error);
      throw new Error(`City search failed: ${error.message}`);
    }
  }

  async createBooking(
    bookingData: any
  ): Promise<{ bookingReference: string; status: string; message: string }> {
    try {
      this.logger.log("Creating hotel booking");

      // Generate booking reference
      const bookingReference = `TMW-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

      // In a real implementation, you would:
      // 1. Validate the booking data
      // 2. Check availability with Amadeus
      // 3. Process payment
      // 4. Store booking in database
      // 5. Send confirmation email

      // For now, we'll simulate a successful booking
      const booking = {
        bookingReference,
        status: "confirmed",
        hotel: bookingData.hotel,
        offer: bookingData.offer,
        guestDetails: bookingData.guestDetails,
        searchParams: bookingData.searchParams,
        paymentDetails: bookingData.paymentDetails,
        createdAt: new Date().toISOString(),
        totalAmount: this.calculateTotalAmount(
          bookingData.offer,
          bookingData.searchParams
        ),
      };

      // Store booking in memory (in production, use database)
      this.storeBooking(bookingReference, booking);

      this.logger.log(`Booking created successfully: ${bookingReference}`);

      return {
        bookingReference,
        status: "confirmed",
        message: "Your hotel booking has been confirmed successfully.",
      };
    } catch (error) {
      this.logger.error("Error creating booking:", error);
      throw new Error(`Booking failed: ${error.message}`);
    }
  }

  async getBooking(bookingReference: string): Promise<any> {
    try {
      // In production, retrieve from database
      const booking = this.retrieveBooking(bookingReference);

      if (!booking) {
        throw new Error("Booking not found");
      }

      return booking;
    } catch (error) {
      this.logger.error(`Error retrieving booking ${bookingReference}:`, error);
      throw new Error(`Failed to retrieve booking: ${error.message}`);
    }
  }

  private calculateTotalAmount(offer: any, searchParams: any): number {
    const nights = this.calculateNights(
      searchParams.checkInDate,
      searchParams.checkOutDate
    );
    const basePrice = parseFloat(offer.price.total) * nights;
    const taxes = basePrice * 0.13; // 13% tax for Nepal
    return basePrice + taxes;
  }

  private calculateNights(checkInDate: string, checkOutDate: string): number {
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    return Math.ceil(
      (checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24)
    );
  }

  // In-memory storage for demo purposes (use database in production)
  private bookings = new Map<string, any>();

  private storeBooking(reference: string, booking: any): void {
    this.bookings.set(reference, booking);
  }

  private retrieveBooking(reference: string): any {
    return this.bookings.get(reference);
  }
}
