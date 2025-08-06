import { useQuery } from "@tanstack/react-query";
import { toursApi, destinationsApi, hotelsApi } from "@/lib/api";

// Tours hooks
export const useTours = (params?: Parameters<typeof toursApi.getAll>[0]) => {
  return useQuery({
    queryKey: ["tours", params],
    queryFn: () => toursApi.getAll(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useFeaturedTours = () => {
  return useQuery({
    queryKey: ["tours", "featured"],
    queryFn: toursApi.getFeatured,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useTour = (id: string) => {
  return useQuery({
    queryKey: ["tours", id],
    queryFn: () => toursApi.getById(id),
    enabled: !!id,
    staleTime: 10 * 60 * 1000,
  });
};

export const useTourBySlug = (slug: string) => {
  return useQuery({
    queryKey: ["tours", "slug", slug],
    queryFn: () => toursApi.getBySlug(slug),
    enabled: !!slug,
    staleTime: 10 * 60 * 1000,
  });
};

export const useSearchTours = (query: string) => {
  return useQuery({
    queryKey: ["tours", "search", query],
    queryFn: () => toursApi.search(query),
    enabled: !!query && query.length > 2,
    staleTime: 2 * 60 * 1000, // 2 minutes for search results
  });
};

// Destinations hooks
export const useDestinations = (
  params?: Parameters<typeof destinationsApi.getAll>[0]
) => {
  return useQuery({
    queryKey: ["destinations", params],
    queryFn: () => destinationsApi.getAll(params),
    staleTime: 5 * 60 * 1000,
  });
};

export const useFeaturedDestinations = () => {
  return useQuery({
    queryKey: ["destinations", "featured"],
    queryFn: destinationsApi.getFeatured,
    staleTime: 10 * 60 * 1000,
  });
};

export const useDestination = (id: string) => {
  return useQuery({
    queryKey: ["destinations", id],
    queryFn: () => destinationsApi.getById(id),
    enabled: !!id,
    staleTime: 10 * 60 * 1000,
  });
};

export const useDestinationBySlug = (slug: string) => {
  return useQuery({
    queryKey: ["destinations", "slug", slug],
    queryFn: () => destinationsApi.getBySlug(slug),
    enabled: !!slug,
    staleTime: 10 * 60 * 1000,
  });
};

export const useSearchDestinations = (query: string) => {
  return useQuery({
    queryKey: ["destinations", "search", query],
    queryFn: () => destinationsApi.search(query),
    enabled: !!query && query.length > 2,
    staleTime: 2 * 60 * 1000,
  });
};

// Hotels hooks
export const useHotelSearch = (
  params?: Parameters<typeof hotelsApi.search>[0]
) => {
  return useQuery({
    queryKey: ["hotels", "search", params],
    queryFn: () => hotelsApi.search(params!),
    enabled:
      !!params &&
      !!params.cityCode &&
      !!params.checkInDate &&
      !!params.checkOutDate,
    staleTime: 5 * 60 * 1000,
  });
};

export const useHotelOffers = (
  hotelId: string,
  params?: Parameters<typeof hotelsApi.getOffers>[1]
) => {
  return useQuery({
    queryKey: ["hotels", "offers", hotelId, params],
    queryFn: () => hotelsApi.getOffers(hotelId, params!),
    enabled:
      !!hotelId && !!params && !!params.checkInDate && !!params.checkOutDate,
    staleTime: 5 * 60 * 1000,
  });
};

export const useHotelDetails = (hotelId: string) => {
  return useQuery({
    queryKey: ["hotels", "details", hotelId],
    queryFn: () => hotelsApi.getDetails(hotelId),
    enabled: !!hotelId,
    staleTime: 10 * 60 * 1000,
  });
};

export const useSearchCities = (keyword: string) => {
  return useQuery({
    queryKey: ["hotels", "cities", keyword],
    queryFn: () => hotelsApi.searchCities(keyword),
    enabled: !!keyword && keyword.length > 2,
    staleTime: 10 * 60 * 1000,
  });
};

export const useNepalCities = () => {
  return useQuery({
    queryKey: ["hotels", "cities", "nepal"],
    queryFn: () => hotelsApi.getNepalCities(),
    staleTime: 60 * 60 * 1000, // 1 hour
  });
};
