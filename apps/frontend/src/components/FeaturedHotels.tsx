import { Star, MapPin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

const FeaturedHotels = () => {
  const featuredHotels = [
    {
      id: "1",
      name: "Hotel Yak & Yeti",
      location: "Kathmandu",
      image:
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      rating: 5,
      price: "USD 150",
      description: "Luxury heritage hotel in the heart of Kathmandu",
    },
    {
      id: "2",
      name: "Pokhara Grande",
      location: "Pokhara",
      image:
        "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      rating: 4,
      price: "USD 120",
      description: "Stunning lake views with mountain backdrop",
    },
    {
      id: "3",
      name: "Chitwan Safari Lodge",
      location: "Chitwan",
      image:
        "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80",
      rating: 4,
      price: "USD 90",
      description: "Jungle lodge perfect for wildlife enthusiasts",
    },
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? "fill-yellow-500 text-yellow-500" : "text-gray-300"}`}
      />
    ));
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="section-title">Featured Hotels</h2>
            <p className="section-subtitle">
              Handpicked accommodations for your perfect Nepal stay
            </p>
          </div>
          <Link to="/hotels">
            <Button
              variant="link"
              className="text-nepal-purple hover:text-nepal-purple-dark flex items-center gap-1"
            >
              View all hotels
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredHotels.map((hotel) => (
            <Card
              key={hotel.id}
              className="nepal-card overflow-hidden group hover:shadow-xl transition-all"
            >
              <div className="relative h-48">
                <img
                  src={hotel.image}
                  alt={hotel.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3 bg-nepal-orange text-white px-3 py-1.5 rounded-md font-bold">
                  {hotel.price}
                </div>
              </div>
              <CardContent className="p-6">
                <div className="flex items-center gap-1 text-yellow-500 mb-2">
                  {renderStars(hotel.rating)}
                  <span className="text-sm text-gray-600 ml-1">
                    ({hotel.rating} star)
                  </span>
                </div>

                <h3 className="text-xl font-bold text-nepal-text-dark mb-2">
                  {hotel.name}
                </h3>

                <div className="flex items-center gap-1 text-gray-600 mb-3">
                  <MapPin className="h-4 w-4" />
                  <span className="text-sm">{hotel.location}</span>
                </div>

                <p className="text-gray-600 text-sm mb-4">
                  {hotel.description}
                </p>

                <Link to="/hotels">
                  <Button className="nepal-button-primary w-full">
                    Book Now
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/hotels">
            <Button className="nepal-button-secondary">
              Explore All Hotels in Nepal
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedHotels;
