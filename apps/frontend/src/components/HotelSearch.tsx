import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Search,
  MapPin,
  Calendar,
  Users,
  Bed,
  Star,
  Wifi,
  Car,
  Coffee,
  Utensils,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useHotelSearch, useNepalCities } from "@/hooks/useApi";
import HotelBookingModal from "@/components/HotelBookingModal";
import type { HotelSearchParams, Hotel, HotelOffer } from "@/lib/types";

const HotelSearch = () => {
  const [urlSearchParams] = useSearchParams();
  const [searchParams, setSearchParams] = useState<HotelSearchParams>({
    cityCode: "",
    checkInDate: "",
    checkOutDate: "",
    adults: 2,
    rooms: 1,
    currency: "USD",
  });

  // Handle URL search parameters from Hero component
  useEffect(() => {
    const whereParam = urlSearchParams.get("q");
    const dateParam = urlSearchParams.get("date");
    const travelersParam = urlSearchParams.get("travelers");

    if (whereParam || dateParam || travelersParam) {
      setSearchParams((prev) => ({
        ...prev,
        // Try to map the 'where' parameter to a city code if it matches Nepal cities
        ...(whereParam && { cityCode: mapLocationToCityCode(whereParam) }),
        ...(dateParam && { checkInDate: dateParam }),
        ...(travelersParam && { adults: parseInt(travelersParam) || 2 }),
      }));

      // Auto-search if all required fields are filled from URL params
      if (whereParam && dateParam) {
        setTimeout(() => {
          setShouldSearch(true);
          setHasSearched(true);
        }, 100);
      }
    }
  }, [urlSearchParams]);

  // Update form validity whenever search parameters change
  useEffect(() => {
    setFormValid(isFormValid());
  }, [searchParams]);

  const [bookingModal, setBookingModal] = useState<{
    isOpen: boolean;
    hotel?: Hotel;
    offer?: HotelOffer;
  }>({
    isOpen: false,
  });

  const { data: nepalCities = [] } = useNepalCities();
  const [shouldSearch, setShouldSearch] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [formValid, setFormValid] = useState(false);

  const {
    data: searchResults,
    isLoading,
    error,
  } = useHotelSearch(
    shouldSearch &&
      searchParams.cityCode &&
      searchParams.checkInDate &&
      searchParams.checkOutDate
      ? searchParams
      : undefined
  );

  const handleSearch = () => {
    if (formValid) {
      setShouldSearch(true);
      setHasSearched(true);
    }
  };

  const isFormValid = () => {
    // Check basic required fields
    const hasRequiredFields = !!(
      searchParams.cityCode &&
      searchParams.checkInDate &&
      searchParams.checkOutDate &&
      searchParams.adults > 0 &&
      searchParams.rooms > 0
    );

    // Check date validity
    let datesValid = false;
    if (searchParams.checkInDate && searchParams.checkOutDate) {
      const checkIn = new Date(searchParams.checkInDate);
      const checkOut = new Date(searchParams.checkOutDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Reset time to start of day

      datesValid = checkIn < checkOut && checkIn >= today;
    }

    return hasRequiredFields && datesValid;
  };

  // Reset search when form parameters change
  const handleFormChange = (updates: Partial<HotelSearchParams>) => {
    setSearchParams((prev) => ({ ...prev, ...updates }));
    setShouldSearch(false); // Reset search trigger
  };

  const handleBookNow = (hotel: Hotel, offer: HotelOffer) => {
    setBookingModal({
      isOpen: true,
      hotel,
      offer,
    });
  };

  const closeBookingModal = () => {
    setBookingModal({
      isOpen: false,
    });
  };

  const mapLocationToCityCode = (location: string): string => {
    const locationLower = location.toLowerCase();
    const cityMapping: { [key: string]: string } = {
      kathmandu: "KTM",
      pokhara: "PKR",
      chitwan: "BWA",
      bhairahawa: "BWA",
      janakpur: "JKR",
      biratnagar: "BIR",
      nepalgunj: "NPJ",
      dhangadhi: "DHI",
    };

    for (const [name, code] of Object.entries(cityMapping)) {
      if (locationLower.includes(name)) {
        return code;
      }
    }

    // Default to Kathmandu if no match found
    return "KTM";
  };

  const formatPrice = (price: string, currency: string) => {
    return `${currency} ${parseFloat(price).toFixed(2)}`;
  };

  const getAmenityIcon = (amenity: string) => {
    const amenityLower = amenity.toLowerCase();
    if (amenityLower.includes("wifi") || amenityLower.includes("internet"))
      return <Wifi className="h-4 w-4" />;
    if (amenityLower.includes("parking") || amenityLower.includes("car"))
      return <Car className="h-4 w-4" />;
    if (amenityLower.includes("coffee") || amenityLower.includes("breakfast"))
      return <Coffee className="h-4 w-4" />;
    if (amenityLower.includes("restaurant") || amenityLower.includes("dining"))
      return <Utensils className="h-4 w-4" />;
    return null;
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? "fill-yellow-500 text-yellow-500" : "text-gray-300"}`}
      />
    ));
  };

  const combineHotelData = (hotels: Hotel[], offers: HotelOffer[]) => {
    return hotels.map((hotel) => {
      const hotelOffers = offers.filter(
        (offer) => offer.hotelId === hotel.hotelId
      );
      return {
        ...hotel,
        offers: hotelOffers,
        bestOffer:
          hotelOffers.length > 0
            ? hotelOffers.reduce((best, current) =>
                parseFloat(current.price.total) < parseFloat(best.price.total)
                  ? current
                  : best
              )
            : null,
      };
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Search Form */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-nepal-text-dark">
            <Search className="h-6 w-6 text-nepal-purple" />
            Find Your Perfect Hotel in Nepal
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="space-y-2">
              <Label htmlFor="destination" className="text-sm font-medium">
                Destination
              </Label>
              <Select
                value={searchParams.cityCode}
                onValueChange={(value) => handleFormChange({ cityCode: value })}
              >
                <SelectTrigger id="destination">
                  <SelectValue placeholder="Select city" />
                </SelectTrigger>
                <SelectContent>
                  {nepalCities.map((city) => (
                    <SelectItem key={city.code} value={city.code}>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-nepal-purple" />
                        {city.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="checkin" className="text-sm font-medium">
                Check-in
              </Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-nepal-purple" />
                <Input
                  id="checkin"
                  type="date"
                  className="pl-10"
                  value={searchParams.checkInDate}
                  onChange={(e) =>
                    handleFormChange({ checkInDate: e.target.value })
                  }
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="checkout" className="text-sm font-medium">
                Check-out
              </Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-nepal-purple" />
                <Input
                  id="checkout"
                  type="date"
                  className="pl-10"
                  value={searchParams.checkOutDate}
                  onChange={(e) =>
                    handleFormChange({ checkOutDate: e.target.value })
                  }
                  min={
                    searchParams.checkInDate ||
                    new Date().toISOString().split("T")[0]
                  }
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="guests" className="text-sm font-medium">
                Guests & Rooms
              </Label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-nepal-purple" />
                  <Input
                    id="guests"
                    type="number"
                    min="1"
                    max="10"
                    className="pl-10"
                    value={searchParams.adults}
                    onChange={(e) =>
                      handleFormChange({ adults: parseInt(e.target.value) })
                    }
                  />
                </div>
                <div className="relative flex-1">
                  <Bed className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-nepal-purple" />
                  <Input
                    type="number"
                    min="1"
                    max="5"
                    className="pl-10"
                    value={searchParams.rooms}
                    onChange={(e) =>
                      handleFormChange({ rooms: parseInt(e.target.value) })
                    }
                  />
                </div>
              </div>
            </div>

            <div className="flex items-end">
              <Button
                onClick={handleSearch}
                className="nepal-button-primary w-full"
                disabled={!formValid || isLoading}
              >
                <Search className="h-4 w-4 mr-2" />
                {isLoading ? "Searching..." : "Search Hotels"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Initial State - No Search Performed */}
      {!hasSearched && !isLoading && (
        <Card className="border-gray-200">
          <CardContent className="p-12 text-center">
            <div className="text-gray-400 mb-4">
              <Search className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              Ready to Find Your Perfect Hotel?
            </h3>
            <p className="text-gray-500">
              Fill in your travel details above and click "Search Hotels" to
              discover amazing accommodations in Nepal.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Search Results */}
      {hasSearched && isLoading && (
        <div className="space-y-6">
          {Array.from({ length: 3 }).map((_, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex gap-6">
                  <Skeleton className="w-64 h-48 rounded-lg" />
                  <div className="flex-1 space-y-4">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-4 w-full" />
                    <div className="flex justify-between items-end">
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-4 w-24" />
                      </div>
                      <Skeleton className="h-10 w-32" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {hasSearched && error && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-6 text-center">
            <p className="text-red-600">
              Error searching hotels: {error.message}
            </p>
          </CardContent>
        </Card>
      )}

      {hasSearched && searchResults && !isLoading && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-nepal-text-dark">
              {searchResults.hotels?.length || 0} Hotels Found
            </h2>
            <div className="text-sm text-gray-600">
              {searchParams.checkInDate} - {searchParams.checkOutDate} •{" "}
              {searchParams.adults} guests • {searchParams.rooms} room(s)
            </div>
          </div>

          {combineHotelData(
            searchResults.hotels || [],
            searchResults.offers || []
          ).map((hotel) => (
            <Card
              key={hotel.hotelId}
              className="nepal-card hover:shadow-lg transition-shadow"
            >
              <CardContent className="p-6">
                <div className="flex gap-6">
                  {/* Hotel Image */}
                  <div className="w-64 h-48 rounded-lg overflow-hidden bg-gray-200 flex-shrink-0">
                    {hotel.media && hotel.media.length > 0 ? (
                      <img
                        src={hotel.media[0].uri}
                        alt={hotel.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src =
                            "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80";
                        }}
                      />
                    ) : (
                      <img
                        src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                        alt={hotel.name}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>

                  {/* Hotel Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-xl font-bold text-nepal-text-dark mb-1">
                            {hotel.name}
                          </h3>
                          <div className="flex items-center gap-1 mb-2">
                            {hotel.rating && renderStars(hotel.rating)}
                            {hotel.rating && (
                              <span className="text-sm text-gray-600 ml-1">
                                ({hotel.rating} star)
                              </span>
                            )}
                          </div>
                        </div>
                        {hotel.bestOffer && (
                          <div className="text-right">
                            <div className="text-2xl font-bold text-nepal-orange">
                              {formatPrice(
                                hotel.bestOffer.price.total,
                                hotel.bestOffer.price.currency
                              )}
                            </div>
                            <div className="text-sm text-gray-600">
                              per night
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                        <MapPin className="h-4 w-4" />
                        <span>
                          {hotel.address.lines.join(", ")},{" "}
                          {hotel.address.cityName}
                        </span>
                      </div>

                      {hotel.description && (
                        <p className="text-gray-700 text-sm mb-4 line-clamp-2">
                          {hotel.description.text}
                        </p>
                      )}

                      {/* Amenities */}
                      {hotel.amenities && hotel.amenities.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {hotel.amenities.slice(0, 6).map((amenity, index) => (
                            <Badge
                              key={index}
                              variant="secondary"
                              className="text-xs"
                            >
                              {getAmenityIcon(amenity)}
                              <span className="ml-1">{amenity}</span>
                            </Badge>
                          ))}
                          {hotel.amenities.length > 6 && (
                            <Badge variant="outline" className="text-xs">
                              +{hotel.amenities.length - 6} more
                            </Badge>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="flex justify-between items-end">
                      <div className="space-y-1">
                        {hotel.bestOffer && (
                          <>
                            <div className="text-sm text-gray-600">
                              {hotel.bestOffer.room.type}
                            </div>
                            <div className="text-xs text-green-600">
                              {hotel.offers.length} room option(s) available
                            </div>
                          </>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                        {hotel.bestOffer && (
                          <Button
                            className="nepal-button-primary"
                            size="sm"
                            onClick={() =>
                              handleBookNow(hotel, hotel.bestOffer)
                            }
                          >
                            Book Now
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {searchResults.hotels?.length === 0 && (
            <Card className="border-gray-200">
              <CardContent className="p-12 text-center">
                <div className="text-gray-400 mb-4">
                  <Search className="h-16 w-16 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  No Hotels Found
                </h3>
                <p className="text-gray-500">
                  Try adjusting your search criteria or selecting a different
                  destination.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Booking Modal */}
      {bookingModal.isOpen && bookingModal.hotel && bookingModal.offer && (
        <HotelBookingModal
          isOpen={bookingModal.isOpen}
          onClose={closeBookingModal}
          hotel={bookingModal.hotel}
          offer={bookingModal.offer}
          searchParams={{
            checkInDate: searchParams.checkInDate,
            checkOutDate: searchParams.checkOutDate,
            adults: searchParams.adults,
            rooms: searchParams.rooms || 1,
          }}
        />
      )}
    </div>
  );
};

export default HotelSearch;
