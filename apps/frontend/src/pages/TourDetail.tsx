import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Star,
  Clock,
  Users,
  Calendar,
  MapPin,
  ShoppingCart,
  Check,
  X,
  Mountain,
  Utensils,
  Hotel,
  Bus,
} from "lucide-react";
import { useTour } from "@/hooks/useApi";

const TourDetail = () => {
  const { tourId } = useParams();
  const { data: tour, isLoading, error } = useTour(tourId || "");
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

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

                <div className="grid grid-cols-3 gap-4 mb-6">
                  <Skeleton className="h-20 w-full" />
                  <Skeleton className="h-20 w-full" />
                  <Skeleton className="h-20 w-full" />
                </div>
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

  if (error || !tour) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="pt-16 flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-nepal-text-dark mb-4">
              Tour not found
            </h1>
            <p className="text-gray-600 mb-6">
              The tour you're looking for doesn't exist or has been removed.
            </p>
            <Link to="/tours">
              <Button className="nepal-button-primary">Browse all tours</Button>
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
            src={tour.image}
            alt={tour.name}
            className="absolute inset-0 w-full h-full object-cover mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div className="relative h-full flex items-center justify-center">
            <div className="text-center text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {tour.name}
              </h1>
              <p className="text-xl max-w-2xl mx-auto">{tour.description}</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Tour Overview */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-nepal-text-dark mb-4">
                  Tour Overview
                </h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                  {tour.description}
                </p>

                {/* Quick Info Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-nepal-light-gray p-4 rounded-lg text-center">
                    <Clock className="h-6 w-6 text-nepal-purple mx-auto mb-2" />
                    <p className="text-sm font-medium text-nepal-text-dark">
                      Duration
                    </p>
                    <p className="text-xs text-gray-600">{tour.duration}</p>
                  </div>
                  <div className="bg-nepal-light-gray p-4 rounded-lg text-center">
                    <Users className="h-6 w-6 text-nepal-purple mx-auto mb-2" />
                    <p className="text-sm font-medium text-nepal-text-dark">
                      Group Size
                    </p>
                    <p className="text-xs text-gray-600">{tour.groupSize}</p>
                  </div>
                  <div className="bg-nepal-light-gray p-4 rounded-lg text-center">
                    <Calendar className="h-6 w-6 text-nepal-purple mx-auto mb-2" />
                    <p className="text-sm font-medium text-nepal-text-dark">
                      Season
                    </p>
                    <p className="text-xs text-gray-600">{tour.season}</p>
                  </div>
                  <div className="bg-nepal-light-gray p-4 rounded-lg text-center">
                    <Star className="h-6 w-6 text-nepal-purple mx-auto mb-2" />
                    <p className="text-sm font-medium text-nepal-text-dark">
                      Rating
                    </p>
                    <p className="text-xs text-gray-600">{tour.rating}/5</p>
                  </div>
                </div>
              </div>

              {/* Highlights */}
              {tour.highlights && tour.highlights.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-nepal-text-dark mb-4">
                    Tour Highlights
                  </h3>
                  <div className="space-y-2">
                    {tour.highlights.map((highlight, index) => (
                      <div key={index} className="flex items-start">
                        <Check className="h-5 w-5 text-nepal-purple mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Categories */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-nepal-text-dark mb-4">
                  Categories
                </h3>
                <div className="flex flex-wrap gap-2">
                  {tour.category.map((cat, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-nepal-purple text-white text-sm rounded-full capitalize"
                    >
                      {cat}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div>
              <Card className="nepal-card p-6 sticky top-6">
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-nepal-purple mb-2">
                    ${tour.price}
                  </div>
                  <p className="text-gray-600">per person</p>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Duration:</span>
                    <span className="font-medium">{tour.duration}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Group Size:</span>
                    <span className="font-medium">{tour.groupSize}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Best Season:</span>
                    <span className="font-medium">{tour.season}</span>
                  </div>
                  {tour.difficulty && (
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Difficulty:</span>
                      <span className="font-medium capitalize">
                        {tour.difficulty.toLowerCase()}
                      </span>
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Rating:</span>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="font-medium ml-1">{tour.rating}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button className="nepal-button-primary w-full">
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Book Now
                  </Button>
                  <Link to="/contact">
                    <Button
                      variant="outline"
                      className="w-full border-nepal-purple text-nepal-purple hover:bg-nepal-purple hover:text-white"
                    >
                      Ask Questions
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

export default TourDetail;
