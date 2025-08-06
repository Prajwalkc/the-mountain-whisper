/* eslint-disable @typescript-eslint/no-explicit-any */
const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3001/api/v1";

// API client configuration
class ApiClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private async request<T>(
    endpoint: string,
    options?: RequestInit
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;

    const config: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`API request failed: ${url}`, error);
      throw error;
    }
  }

  // Tours API
  async getTours(params?: {
    featured?: boolean;
    category?: string;
    difficulty?: string;
    page?: number;
    limit?: number;
  }): Promise<any[]> {
    const searchParams = new URLSearchParams();

    if (params?.featured !== undefined) {
      searchParams.append("featured", params.featured.toString());
    }
    if (params?.category) {
      searchParams.append("category", params.category);
    }
    if (params?.difficulty) {
      searchParams.append("difficulty", params.difficulty);
    }
    if (params?.page) {
      searchParams.append("page", params.page.toString());
    }
    if (params?.limit) {
      searchParams.append("limit", params.limit.toString());
    }

    const query = searchParams.toString();
    return this.request(`/tours${query ? `?${query}` : ""}`);
  }

  async getFeaturedTours(): Promise<any[]> {
    return this.request("/tours/featured");
  }

  async getTour(id: string): Promise<any> {
    return this.request(`/tours/${id}`);
  }

  async getTourBySlug(slug: string): Promise<any> {
    return this.request(`/tours/slug/${slug}`);
  }

  async searchTours(query: string): Promise<any[]> {
    return this.request(`/tours/search?q=${encodeURIComponent(query)}`);
  }

  // Destinations API
  async getDestinations(params?: {
    featured?: boolean;
    region?: string;
    page?: number;
    limit?: number;
  }): Promise<any[]> {
    const searchParams = new URLSearchParams();

    if (params?.featured !== undefined) {
      searchParams.append("featured", params.featured.toString());
    }
    if (params?.region) {
      searchParams.append("region", params.region);
    }
    if (params?.page) {
      searchParams.append("page", params.page.toString());
    }
    if (params?.limit) {
      searchParams.append("limit", params.limit.toString());
    }

    const query = searchParams.toString();
    return this.request(`/destinations${query ? `?${query}` : ""}`);
  }

  async getFeaturedDestinations(): Promise<any[]> {
    return this.request("/destinations/featured");
  }

  async getDestination(id: string): Promise<any> {
    return this.request(`/destinations/${id}`);
  }

  async getDestinationBySlug(slug: string): Promise<any> {
    return this.request(`/destinations/slug/${slug}`);
  }

  async searchDestinations(query: string): Promise<any[]> {
    return this.request(`/destinations/search?q=${encodeURIComponent(query)}`);
  }

  // Hotels API
  async searchHotels(params: {
    cityCode: string;
    checkInDate: string;
    checkOutDate: string;
    adults: number;
    rooms?: number;
    radius?: number;
    radiusUnit?: "KM" | "MILE";
    currency?: string;
  }): Promise<any> {
    const searchParams = new URLSearchParams();
    searchParams.append("cityCode", params.cityCode);
    searchParams.append("checkInDate", params.checkInDate);
    searchParams.append("checkOutDate", params.checkOutDate);
    searchParams.append("adults", params.adults.toString());

    if (params.rooms) {
      searchParams.append("rooms", params.rooms.toString());
    }
    if (params.radius) {
      searchParams.append("radius", params.radius.toString());
    }
    if (params.radiusUnit) {
      searchParams.append("radiusUnit", params.radiusUnit);
    }
    if (params.currency) {
      searchParams.append("currency", params.currency);
    }

    return this.request(`/hotels/search?${searchParams.toString()}`);
  }

  async getHotelOffers(
    hotelId: string,
    params: {
      checkInDate: string;
      checkOutDate: string;
      adults: number;
      rooms?: number;
      currency?: string;
    }
  ): Promise<any[]> {
    const searchParams = new URLSearchParams();
    searchParams.append("checkInDate", params.checkInDate);
    searchParams.append("checkOutDate", params.checkOutDate);
    searchParams.append("adults", params.adults.toString());

    if (params.rooms) {
      searchParams.append("rooms", params.rooms.toString());
    }
    if (params.currency) {
      searchParams.append("currency", params.currency);
    }

    return this.request(`/hotels/offers/${hotelId}?${searchParams.toString()}`);
  }

  async getHotelDetails(hotelId: string): Promise<any> {
    return this.request(`/hotels/details/${hotelId}`);
  }

  async searchCities(keyword: string): Promise<any[]> {
    return this.request(
      `/hotels/cities/search?keyword=${encodeURIComponent(keyword)}`
    );
  }

  async getNepalCities(): Promise<any[]> {
    return this.request("/hotels/cities/nepal");
  }

  async createHotelBooking(bookingData: any): Promise<any> {
    return this.request("/hotels/booking", {
      method: "POST",
      body: JSON.stringify(bookingData),
    });
  }

  async getHotelBooking(bookingReference: string): Promise<any> {
    return this.request(`/hotels/booking/${bookingReference}`);
  }
}

// Create and export API client instance
export const apiClient = new ApiClient(API_BASE_URL);

// Export individual API functions for easier use
export const toursApi = {
  getAll: (params?: Parameters<typeof apiClient.getTours>[0]) =>
    apiClient.getTours(params),
  getFeatured: () => apiClient.getFeaturedTours(),
  getById: (id: string) => apiClient.getTour(id),
  getBySlug: (slug: string) => apiClient.getTourBySlug(slug),
  search: (query: string) => apiClient.searchTours(query),
};

export const destinationsApi = {
  getAll: (params?: Parameters<typeof apiClient.getDestinations>[0]) =>
    apiClient.getDestinations(params),
  getFeatured: () => apiClient.getFeaturedDestinations(),
  getById: (id: string) => apiClient.getDestination(id),
  getBySlug: (slug: string) => apiClient.getDestinationBySlug(slug),
  search: (query: string) => apiClient.searchDestinations(query),
};

export const hotelsApi = {
  search: (params: {
    cityCode: string;
    checkInDate: string;
    checkOutDate: string;
    adults: number;
    rooms?: number;
    radius?: number;
    radiusUnit?: "KM" | "MILE";
    currency?: string;
  }) => apiClient.searchHotels(params),
  getOffers: (
    hotelId: string,
    params: {
      checkInDate: string;
      checkOutDate: string;
      adults: number;
      rooms?: number;
      currency?: string;
    }
  ) => apiClient.getHotelOffers(hotelId, params),
  getDetails: (hotelId: string) => apiClient.getHotelDetails(hotelId),
  searchCities: (keyword: string) => apiClient.searchCities(keyword),
  getNepalCities: () => apiClient.getNepalCities(),
  createBooking: (bookingData: any) =>
    apiClient.createHotelBooking(bookingData),
  getBooking: (bookingReference: string) =>
    apiClient.getHotelBooking(bookingReference),
};
