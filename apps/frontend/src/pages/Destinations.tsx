import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { MapPin, Mountain, Camera, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useDestinations } from "@/hooks/useApi";
import type { Destination } from "@/lib/types";

const regions = [
  "All Regions",
  "Central Nepal",
  "Eastern Nepal",
  "Western Nepal",
  "Southern Nepal",
  "North Central Nepal",
];

const Destinations = () => {
  const [selectedRegion, setSelectedRegion] = useState("All Regions");

  const { data: allDestinations = [], isLoading } = useDestinations({
    region: selectedRegion !== "All Regions" ? selectedRegion : undefined,
  });

  const filteredDestinations = allDestinations;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="pt-16">
        {/* Hero section */}
        <div className="bg-nepal-purple text-white py-24 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Destinations
            </h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto">
              Discover the diverse landscapes and cultural treasures of Nepal
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-gray-50 py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center">
              <div className="flex flex-wrap gap-2 items-center">
                <MapPin className="h-5 w-5 text-nepal-purple" />
                <span className="font-medium mr-2">Filter by Region:</span>
                {regions.map((region) => (
                  <button
                    key={region}
                    onClick={() => setSelectedRegion(region)}
                    className={`px-3 py-1 text-sm rounded-full transition ${
                      selectedRegion === region
                        ? "bg-nepal-purple text-white"
                        : "bg-white border border-gray-300 hover:bg-gray-100"
                    }`}
                  >
                    {region}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Destinations grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, index) => (
                <Card key={index} className="overflow-hidden">
                  <Skeleton className="h-64 w-full" />
                  <div className="p-4">
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-full mb-4" />
                    <div className="flex gap-2 mb-4">
                      <Skeleton className="h-6 w-20" />
                      <Skeleton className="h-6 w-24" />
                    </div>
                    <Skeleton className="h-10 w-full" />
                  </div>
                </Card>
              ))}
            </div>
          ) : filteredDestinations.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium text-gray-900">
                No destinations found
              </h3>
              <p className="mt-2 text-gray-500">
                Try selecting a different region filter.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredDestinations.map((destination) => (
                <Card key={destination.id} className="nepal-card group">
                  <div className="relative overflow-hidden h-64">
                    <img
                      src={destination.image}
                      alt={destination.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-nepal-text-dark/80 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-xl font-bold text-white mb-1">
                        {destination.name}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {destination.activities
                          .slice(0, 3)
                          .map((activity, index) => (
                            <span
                              key={index}
                              className="text-xs bg-nepal-purple/80 text-white px-2 py-1 rounded-full"
                            >
                              {activity}
                            </span>
                          ))}
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                      {destination.description}
                    </p>

                    <div className="flex flex-wrap gap-3 mb-4">
                      {destination.elevation && (
                        <div className="flex items-center text-xs text-gray-600">
                          <Mountain className="h-3.5 w-3.5 text-nepal-purple mr-1" />
                          <span>{destination.elevation}</span>
                        </div>
                      )}
                      {destination.bestTime && (
                        <div className="flex items-center text-xs text-gray-600">
                          <Camera className="h-3.5 w-3.5 text-nepal-purple mr-1" />
                          <span>Best: {destination.bestTime}</span>
                        </div>
                      )}
                      <div className="flex items-center text-xs text-gray-600">
                        <MapPin className="h-3.5 w-3.5 text-nepal-purple mr-1" />
                        <span>{destination.region}</span>
                      </div>
                    </div>

                    <Link to={`/destinations/${destination.id}`}>
                      <Button
                        variant="outline"
                        className="w-full border-nepal-purple text-nepal-purple hover:bg-nepal-purple hover:text-white transition-colors"
                      >
                        Explore
                      </Button>
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Destinations;
