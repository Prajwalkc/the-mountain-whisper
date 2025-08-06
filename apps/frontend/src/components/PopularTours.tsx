import { Star, Clock, Users, Calendar, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "react-router-dom";
import { useFeaturedTours } from "@/hooks/useApi";
import type { Tour } from "@/lib/types";

// Mock data as fallback
const mockTours: Tour[] = [
  {
    id: "everest-base-camp",
    name: "Everest Base Camp Trek",
    image:
      "https://images.unsplash.com/photo-1501554728187-ce583db33af7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1973&q=80",
    duration: "14 Days",
    groupSize: "2-12 People",
    season: "Mar-May, Sep-Nov",
    price: 1499,
    rating: 4.9,
    description:
      "Trek to the base of the world's tallest mountain through stunning Sherpa villages and breathtaking landscapes.",
    category: ["Trekking", "Adventure"],
  },
  {
    id: "annapurna-circuit",
    name: "Annapurna Circuit Trek",
    image:
      "https://images.unsplash.com/photo-1575311373937-040b8e1fd115?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2088&q=80",
    duration: "12-18 Days",
    groupSize: "2-10 People",
    season: "Mar-May, Sep-Dec",
    price: 1299,
    rating: 4.8,
    description:
      "A classic Himalayan trek through diverse landscapes and traditional mountain communities.",
    category: ["Trekking", "Cultural"],
  },
  {
    id: "langtang-valley",
    name: "Langtang Valley Trek",
    image:
      "https://images.unsplash.com/photo-1432958576632-8a39f6b97dc7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2053&q=80",
    duration: "7 Days",
    groupSize: "1-8 People",
    season: "Year-round (Best: Mar-May, Sep-Nov)",
    price: 799,
    rating: 4.7,
    description:
      "Explore the beautiful Langtang Valley with views of snow-capped peaks and rich local culture.",
    category: ["Trekking", "Nature"],
  },
];

const PopularTours = () => {
  const { data: tours = [], isLoading, error } = useFeaturedTours();

  if (isLoading) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Skeleton className="h-10 w-64 mx-auto mb-4" />
            <Skeleton className="h-6 w-96 mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <Skeleton className="h-64 w-full" />
                <div className="p-6">
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-full mb-4" />
                  <div className="flex justify-between items-center mb-4">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                  <Skeleton className="h-10 w-full" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Use API data if available, otherwise fall back to mock data
  const displayTours = tours.length > 0 ? tours : mockTours;

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-12">
          <h2 className="section-title">Popular Tours & Packages</h2>
          <Link to="/tours">
            <Button
              variant="link"
              className="text-nepal-purple hover:text-nepal-purple-dark flex items-center gap-1"
            >
              View all tours
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {displayTours.slice(0, 6).map((tour) => (
            <div key={tour.id} className="nepal-card flex flex-col h-full">
              <div className="relative">
                <img
                  src={tour.image}
                  alt={tour.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-3 right-3 bg-nepal-orange text-white px-3 py-1.5 rounded-md font-bold">
                  ${tour.price}
                </div>
              </div>
              <div className="p-5 flex-grow flex flex-col">
                <div className="flex items-center gap-1 text-yellow-500 mb-2">
                  <Star className="fill-yellow-500 h-4 w-4" />
                  <span className="text-sm font-medium">{tour.rating}</span>
                  <span className="text-sm text-gray-600 ml-1">
                    (120+ reviews)
                  </span>
                </div>

                <h3 className="text-xl font-bold text-nepal-text-dark mb-3">
                  {tour.name}
                </h3>

                <p className="text-gray-600 text-sm mb-4 flex-grow">
                  {tour.description}
                </p>

                <div className="grid grid-cols-3 gap-2 mb-4 text-xs text-gray-600">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5 text-nepal-purple" />
                    <span>{tour.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-3.5 w-3.5 text-nepal-purple" />
                    <span>{tour.groupSize}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5 text-nepal-purple" />
                    <span>Best: {tour.season.split(",")[0]}</span>
                  </div>
                </div>

                <Link to={`/tours/${tour.id}`}>
                  <Button className="nepal-button-primary w-full">
                    View Details
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularTours;
