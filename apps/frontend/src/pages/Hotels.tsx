import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HotelSearch from "@/components/HotelSearch";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Star, Shield, Phone } from "lucide-react";

const Hotels = () => {
  const benefits = [
    {
      icon: <Star className="h-8 w-8 text-nepal-orange" />,
      title: "Best Price Guarantee",
      description:
        "We guarantee the best prices for your hotel bookings in Nepal.",
    },
    {
      icon: <Shield className="h-8 w-8 text-nepal-orange" />,
      title: "Secure Booking",
      description: "Your booking is protected with our secure payment system.",
    },
    {
      icon: <MapPin className="h-8 w-8 text-nepal-orange" />,
      title: "Local Expertise",
      description: "Handpicked hotels with local insights and recommendations.",
    },
    {
      icon: <Phone className="h-8 w-8 text-nepal-orange" />,
      title: "24/7 Support",
      description: "Round-the-clock customer support for your peace of mind.",
    },
  ];

  const popularDestinations = [
    {
      name: "Kathmandu",
      code: "KTM",
      description:
        "Explore ancient temples and vibrant markets in Nepal's capital",
      image:
        "https://images.unsplash.com/photo-1588733103629-b77afe0b4342?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80",
      hotels: "200+",
    },
    {
      name: "Pokhara",
      code: "PKR",
      description: "Serene lakes and stunning mountain views await you",
      image:
        "https://images.unsplash.com/photo-1605146969463-896c33cd8eb4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      hotels: "150+",
    },
    {
      name: "Chitwan",
      code: "BWA",
      description: "Wildlife adventures in Nepal's famous national park",
      image:
        "https://images.unsplash.com/photo-1544735716-ea9a274df10b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      hotels: "80+",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-nepal-purple to-nepal-purple-dark py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Find Your Perfect Hotel in Nepal
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
            Discover comfortable accommodations across Nepal's most beautiful
            destinations. From luxury resorts to cozy guesthouses, we have the
            perfect stay for your journey.
          </p>
        </div>
      </section>

      {/* Hotel Search Component */}
      <section className="py-12 bg-white">
        <HotelSearch />
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title">Why Book Hotels with Us</h2>
            <p className="section-subtitle">
              Experience the best of Nepal hospitality with our trusted hotel
              partners
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="nepal-card text-center">
                <CardContent className="p-6">
                  <div className="flex justify-center mb-4">{benefit.icon}</div>
                  <h3 className="text-lg font-semibold text-nepal-text-dark mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title">Popular Hotel Destinations</h2>
            <p className="section-subtitle">
              Discover the most sought-after places to stay in Nepal
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {popularDestinations.map((destination, index) => (
              <Card
                key={index}
                className="nepal-card overflow-hidden group cursor-pointer hover:shadow-xl transition-all"
              >
                <div className="relative h-48">
                  <img
                    src={destination.image}
                    alt={destination.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-bold mb-1">
                      {destination.name}
                    </h3>
                    <p className="text-sm opacity-90">
                      {destination.hotels} hotels available
                    </p>
                  </div>
                </div>
                <CardContent className="p-6">
                  <p className="text-gray-600 text-sm mb-4">
                    {destination.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-nepal-purple font-medium">
                      Explore Hotels
                    </span>
                    <MapPin className="h-4 w-4 text-nepal-purple" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-nepal-orange to-nepal-orange-dark">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Explore Nepal?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Book your perfect hotel today and start your unforgettable journey
            through the Himalayas.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-nepal-orange px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Search Hotels Now
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-nepal-orange transition-colors">
              View All Destinations
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Hotels;
