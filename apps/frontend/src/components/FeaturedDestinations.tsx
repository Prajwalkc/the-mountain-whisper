import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "react-router-dom";
import { useFeaturedDestinations } from "@/hooks/useApi";
import type { Destination } from "@/lib/types";

const FeaturedDestinations = () => {
  const {
    data: destinations = [],
    isLoading,
    error,
  } = useFeaturedDestinations();

  if (isLoading || destinations.length === 0) {
    return (
      <section className="py-16 bg-nepal-light-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <Skeleton className="h-10 w-64" />
            <Skeleton className="h-10 w-48" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="nepal-card">
                <Skeleton className="h-64 w-full" />
                <div className="p-4">
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-3/4 mb-4" />
                  <Skeleton className="h-10 w-full" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-nepal-light-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-12">
          <h2 className="section-title">Featured Destinations</h2>
          <Link to="/destinations">
            <Button
              variant="link"
              className="text-nepal-purple hover:text-nepal-purple-dark flex items-center gap-1"
            >
              View all destinations
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {destinations.map((destination: Destination) => (
            <div key={destination.id} className="nepal-card group">
              <div className="relative overflow-hidden h-64">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-nepal-text-dark/80 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-xl font-bold text-white mb-1">
                    {destination.name}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {destination.activities
                      .slice(0, 2)
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
                {destination.bestTime && (
                  <p className="text-xs text-nepal-purple mb-2">
                    <span className="font-medium">Best time:</span>{" "}
                    {destination.bestTime}
                  </p>
                )}
                <Link to={`/destinations/${destination.id}`}>
                  <Button
                    variant="outline"
                    className="w-full border-nepal-purple text-nepal-purple hover:bg-nepal-purple hover:text-white transition-colors"
                  >
                    Explore
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

export default FeaturedDestinations;
