import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { Star, Clock, Users, Calendar, Filter } from "lucide-react";
import { Link } from "react-router-dom";
import { useTours, useSearchTours } from "@/hooks/useApi";
import type { Tour } from "@/lib/types";

const categories = [
  "All",
  "trekking",
  "adventure",
  "mountain",
  "cultural",
  "heritage",
  "wildlife",
  "safari",
  "leisure",
];

const Tours = () => {
  const [searchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const toursPerPage = 6;

  const searchQuery = searchParams.get("q") || "";

  // Use API hooks based on search query
  const { data: allTours = [], isLoading: isLoadingAll } = useTours({
    category: selectedCategory !== "All" ? selectedCategory : undefined,
  });

  const { data: searchResults = [], isLoading: isSearching } =
    useSearchTours(searchQuery);

  // Determine which data to use
  const tours = searchQuery ? searchResults : allTours;
  const isLoading = searchQuery ? isSearching : isLoadingAll;

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchQuery]);

  const indexOfLastTour = currentPage * toursPerPage;
  const indexOfFirstTour = indexOfLastTour - toursPerPage;
  const currentTours = tours.slice(indexOfFirstTour, indexOfLastTour);
  const totalPages = Math.ceil(tours.length / toursPerPage);

  const LoadingSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, index) => (
        <Card key={index} className="overflow-hidden">
          <Skeleton className="h-48 w-full" />
          <div className="p-4">
            <Skeleton className="h-6 w-3/4 mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-2/3 mb-4" />
            <div className="flex justify-between items-center mb-4">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-16" />
            </div>
            <Skeleton className="h-10 w-full" />
          </div>
        </Card>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="pt-16">
        {/* Hero section */}
        <div className="bg-nepal-purple text-white py-24 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {searchQuery ? `Tours for "${searchQuery}"` : "Tours & Packages"}
            </h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto">
              {searchQuery
                ? `Discover amazing tours matching your search`
                : "Discover unforgettable adventures and cultural experiences in Nepal"}
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center gap-4 mb-4">
              <Filter className="h-5 w-5 text-gray-500" />
              <span className="font-medium text-gray-700">
                Filter by category:
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={
                    selectedCategory === category ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={
                    selectedCategory === category ? "nepal-button-primary" : ""
                  }
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Tours grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {isLoading ? "Loading tours..." : `${tours.length} Tours Found`}
              </h2>
              {searchQuery && (
                <p className="text-gray-600 mt-1">
                  Results for:{" "}
                  <span className="font-medium">"{searchQuery}"</span>
                </p>
              )}
            </div>
          </div>

          {isLoading ? (
            <LoadingSkeleton />
          ) : currentTours.length === 0 ? (
            <div className="text-center py-12">
              <div className="max-w-md mx-auto">
                <div className="mb-4">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.469-1.009-5.927-2.626"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No tours found
                </h3>
                <p className="text-gray-500 mb-4">
                  {searchQuery
                    ? `No tours match your search for "${searchQuery}". Try adjusting your search terms or filters.`
                    : "No tours match the selected filters. Try selecting a different category."}
                </p>
                <Button
                  onClick={() => {
                    setSelectedCategory("All");
                    window.history.replaceState({}, "", "/tours");
                  }}
                  variant="outline"
                >
                  Clear filters
                </Button>
              </div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentTours.map((tour) => (
                  <Card
                    key={tour.id}
                    className="overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <div className="relative h-48">
                      <img
                        src={tour.image}
                        alt={tour.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      {tour.featured && (
                        <div className="absolute top-2 left-2">
                          <span className="bg-nepal-orange text-white text-xs font-bold px-2 py-1 rounded">
                            Featured
                          </span>
                        </div>
                      )}
                      {tour.difficulty && (
                        <div className="absolute top-2 right-2">
                          <span
                            className={`text-white text-xs font-bold px-2 py-1 rounded ${
                              tour.difficulty === "Easy"
                                ? "bg-green-500"
                                : tour.difficulty === "Moderate"
                                  ? "bg-yellow-500"
                                  : tour.difficulty === "Challenging"
                                    ? "bg-orange-500"
                                    : "bg-red-500"
                            }`}
                          >
                            {tour.difficulty}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="p-4">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {tour.name}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {tour.description}
                      </p>

                      <div className="grid grid-cols-2 gap-4 mb-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>{tour.duration}</span>
                        </div>
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-1" />
                          <span>{tour.groupSize}</span>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span>{tour.season}</span>
                        </div>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 mr-1 text-yellow-400 fill-current" />
                          <span>{tour.rating}</span>
                        </div>
                      </div>

                      {tour.highlights && (
                        <div className="mb-4">
                          <div className="flex flex-wrap gap-1">
                            {tour.highlights
                              .slice(0, 3)
                              .map((highlight, index) => (
                                <span
                                  key={index}
                                  className="text-xs bg-nepal-light-gray text-nepal-purple px-2 py-1 rounded"
                                >
                                  {highlight}
                                </span>
                              ))}
                          </div>
                        </div>
                      )}

                      <div className="flex justify-between items-center">
                        <div>
                          <span className="text-2xl font-bold text-nepal-purple">
                            ${tour.price}
                          </span>
                          <span className="text-gray-500 text-sm ml-1">
                            per person
                          </span>
                        </div>
                        <Link to={`/tours/${tour.id}`}>
                          <Button className="nepal-button-primary">
                            View Details
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-12 flex justify-center">
                  <Pagination>
                    <PaginationContent>
                      {Array.from({ length: totalPages }, (_, i) => (
                        <PaginationItem key={i + 1}>
                          <PaginationLink
                            onClick={() => setCurrentPage(i + 1)}
                            isActive={currentPage === i + 1}
                            className="cursor-pointer"
                          >
                            {i + 1}
                          </PaginationLink>
                        </PaginationItem>
                      ))}
                    </PaginationContent>
                  </Pagination>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Tours;
