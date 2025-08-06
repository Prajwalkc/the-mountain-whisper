import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Param,
  BadRequestException,
} from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from "@nestjs/swagger";
import {
  HotelsService,
  HotelSearchParams,
  HotelSearchResponse,
  HotelOffer,
  Hotel,
} from "./hotels.service";

@ApiTags("hotels")
@Controller("hotels")
export class HotelsController {
  constructor(private readonly hotelsService: HotelsService) {}

  @Get("search")
  @ApiOperation({ summary: "Search for hotels" })
  @ApiResponse({
    status: 200,
    description: "Hotels and offers retrieved successfully",
  })
  @ApiQuery({
    name: "cityCode",
    required: true,
    type: String,
    description: "IATA city code (e.g., KTM for Kathmandu)",
  })
  @ApiQuery({
    name: "checkInDate",
    required: true,
    type: String,
    description: "Check-in date (YYYY-MM-DD)",
  })
  @ApiQuery({
    name: "checkOutDate",
    required: true,
    type: String,
    description: "Check-out date (YYYY-MM-DD)",
  })
  @ApiQuery({
    name: "adults",
    required: true,
    type: Number,
    description: "Number of adult guests",
  })
  @ApiQuery({
    name: "rooms",
    required: false,
    type: Number,
    description: "Number of rooms (default: 1)",
  })
  @ApiQuery({
    name: "radius",
    required: false,
    type: Number,
    description: "Search radius (default: 5)",
  })
  @ApiQuery({
    name: "radiusUnit",
    required: false,
    enum: ["KM", "MILE"],
    description: "Radius unit (default: KM)",
  })
  @ApiQuery({
    name: "currency",
    required: false,
    type: String,
    description: "Currency code (default: USD)",
  })
  async searchHotels(
    @Query("cityCode") cityCode: string,
    @Query("checkInDate") checkInDate: string,
    @Query("checkOutDate") checkOutDate: string,
    @Query("adults") adults: string,
    @Query("rooms") rooms?: string,
    @Query("radius") radius?: string,
    @Query("radiusUnit") radiusUnit?: "KM" | "MILE",
    @Query("currency") currency?: string
  ): Promise<HotelSearchResponse> {
    if (!cityCode || !checkInDate || !checkOutDate || !adults) {
      throw new BadRequestException(
        "Missing required parameters: cityCode, checkInDate, checkOutDate, adults"
      );
    }

    const searchParams: HotelSearchParams = {
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

  @Get("offers/:hotelId")
  @ApiOperation({ summary: "Get hotel offers by hotel ID" })
  @ApiResponse({
    status: 200,
    description: "Hotel offers retrieved successfully",
  })
  @ApiQuery({ name: "checkInDate", required: true, type: String })
  @ApiQuery({ name: "checkOutDate", required: true, type: String })
  @ApiQuery({ name: "adults", required: true, type: Number })
  @ApiQuery({ name: "rooms", required: false, type: Number })
  @ApiQuery({ name: "currency", required: false, type: String })
  async getHotelOffers(
    @Param("hotelId") hotelId: string,
    @Query("checkInDate") checkInDate: string,
    @Query("checkOutDate") checkOutDate: string,
    @Query("adults") adults: string,
    @Query("rooms") rooms?: string,
    @Query("currency") currency?: string
  ): Promise<HotelOffer[]> {
    if (!checkInDate || !checkOutDate || !adults) {
      throw new BadRequestException(
        "Missing required parameters: checkInDate, checkOutDate, adults"
      );
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

  @Get("details/:hotelId")
  @ApiOperation({ summary: "Get hotel details by hotel ID" })
  @ApiResponse({
    status: 200,
    description: "Hotel details retrieved successfully",
  })
  async getHotelDetails(
    @Param("hotelId") hotelId: string
  ): Promise<Hotel | null> {
    return this.hotelsService.getHotelDetails(hotelId);
  }

  @Get("cities/search")
  @ApiOperation({ summary: "Search for city codes" })
  @ApiResponse({
    status: 200,
    description: "City codes retrieved successfully",
  })
  @ApiQuery({
    name: "keyword",
    required: true,
    type: String,
    description: "City name or keyword",
  })
  async searchCities(
    @Query("keyword") keyword: string
  ): Promise<Array<{ code: string; name: string; countryCode: string }>> {
    if (!keyword) {
      throw new BadRequestException("Missing required parameter: keyword");
    }

    return this.hotelsService.getCityCodes(keyword);
  }

  @Get("cities/nepal")
  @ApiOperation({ summary: "Get popular Nepal city codes for hotels" })
  @ApiResponse({
    status: 200,
    description: "Nepal city codes retrieved successfully",
  })
  async getNepalCities(): Promise<
    Array<{ code: string; name: string; countryCode: string }>
  > {
    // Popular Nepal destinations with their IATA codes
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

  @Post("booking")
  @ApiOperation({ summary: "Create hotel booking" })
  @ApiResponse({
    status: 201,
    description: "Hotel booking created successfully",
  })
  async createBooking(
    @Body() bookingData: any
  ): Promise<{ bookingReference: string; status: string; message: string }> {
    return this.hotelsService.createBooking(bookingData);
  }

  @Get("booking/:bookingReference")
  @ApiOperation({ summary: "Get booking details by reference" })
  @ApiResponse({
    status: 200,
    description: "Booking details retrieved successfully",
  })
  async getBooking(
    @Param("bookingReference") bookingReference: string
  ): Promise<any> {
    return this.hotelsService.getBooking(bookingReference);
  }
}
