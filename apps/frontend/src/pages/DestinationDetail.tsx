import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  MapPin,
  Mountain,
  Calendar,
  Info,
  ArrowRight,
  CheckCircle,
  X,
} from "lucide-react";
import { useDestination } from "@/hooks/useApi";

const DestinationDetail = () => {
  const { destinationId } = useParams();
  const {
    data: destination,
    isLoading,
    error,
  } = useDestination(destinationId || "");

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="pt-16">
          {/* Hero Section Skeleton */}
          <div className="relative h-96 bg-gray-200">
            <Skeleton className="w-full h-full" />
          </div>

          {/* Content Skeleton */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <Skeleton className="h-8 w-3/4 mb-4" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-2/3 mb-6" />

                <Skeleton className="h-6 w-1/3 mb-4" />
                {Array.from({ length: 5 }).map((_, i) => (
                  <Skeleton key={i} className="h-4 w-full mb-2" />
                ))}
              </div>

              <div>
                <Skeleton className="h-64 w-full" />
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !destination) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="pt-16 flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-nepal-text-dark mb-4">
              Destination not found
            </h1>
            <p className="text-gray-600 mb-6">
              The destination you're looking for doesn't exist or has been
              removed.
            </p>
            <Link to="/destinations">
              <Button className="nepal-button-primary">
                Browse all destinations
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="pt-16">
        {/* Hero Section */}
        <div className="relative h-96 bg-gradient-to-r from-nepal-purple to-nepal-purple-dark overflow-hidden">
          <img
            src={destination.image}
            alt={destination.name}
            className="absolute inset-0 w-full h-full object-cover mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div className="relative h-full flex items-center justify-center">
            <div className="text-center text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {destination.name}
              </h1>
              <p className="text-xl max-w-2xl mx-auto">
                {destination.description}
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-nepal-text-dark mb-4">
                  About {destination.name}
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  {destination.description}
                </p>
              </div>

              {/* Activities */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-nepal-text-dark mb-4">
                  Activities
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {destination.activities.map((activity, index) => (
                    <div
                      key={index}
                      className="flex items-center p-3 bg-nepal-light-gray rounded-lg"
                    >
                      <CheckCircle className="h-4 w-4 text-nepal-purple mr-2 flex-shrink-0" />
                      <span className="text-sm text-nepal-text-dark">
                        {activity}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Call to Action */}
              <div className="bg-nepal-light-gray p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-nepal-text-dark mb-3">
                  Ready to explore {destination.name}?
                </h3>
                <p className="text-gray-600 mb-4">
                  Discover our carefully curated tours and experiences for this
                  destination.
                </p>
                <Link to="/tours">
                  <Button className="nepal-button-primary">
                    Browse Tours
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Sidebar */}
            <div>
              <Card className="nepal-card p-6">
                <h3 className="text-lg font-semibold text-nepal-text-dark mb-4">
                  Destination Info
                </h3>

                <div className="space-y-4">
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-nepal-purple mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-nepal-text-dark">Region</p>
                      <p className="text-sm text-gray-600">
                        {destination.region}
                      </p>
                    </div>
                  </div>

                  {destination.elevation && (
                    <div className="flex items-start">
                      <Mountain className="h-5 w-5 text-nepal-purple mr-3 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-nepal-text-dark">
                          Elevation
                        </p>
                        <p className="text-sm text-gray-600">
                          {destination.elevation}
                        </p>
                      </div>
                    </div>
                  )}

                  {destination.bestTime && (
                    <div className="flex items-start">
                      <Calendar className="h-5 w-5 text-nepal-purple mr-3 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-nepal-text-dark">
                          Best Time to Visit
                        </p>
                        <p className="text-sm text-gray-600">
                          {destination.bestTime}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <Link to="/contact">
                    <Button
                      variant="outline"
                      className="w-full border-nepal-purple text-nepal-purple hover:bg-nepal-purple hover:text-white"
                    >
                      Plan Your Trip
                    </Button>
                  </Link>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DestinationDetail;
