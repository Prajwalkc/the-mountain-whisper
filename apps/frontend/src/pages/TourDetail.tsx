
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
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
  Bus
} from 'lucide-react';

interface Tour {
  id: string;
  name: string;
  image: string;
  duration: string;
  groupSize: string;
  season: string;
  price: number;
  rating: number;
  description: string;
  category: string[];
  location?: string;
  difficulty?: string;
  altitude?: string;
  meals?: string;
  accommodation?: string;
  transportation?: string;
  galleryImages?: string[];
  highlights?: string[];
  included?: string[];
  excluded?: string[];
  itinerary?: {day: string, title: string, description: string, accommodation?: string, meals?: string}[];
}

const tours: Tour[] = [
  {
    id: 'everest-base-camp',
    name: 'Everest Base Camp Trek',
    image: 'https://images.unsplash.com/photo-1501554728187-ce583db33af7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1973&q=80',
    duration: '14 Days',
    groupSize: '2-12 People',
    season: 'Mar-May, Sep-Nov',
    price: 1499,
    rating: 4.9,
    description: 'Trek to the base of the world\'s tallest mountain through stunning Sherpa villages and breathtaking landscapes.',
    category: ['trekking', 'adventure', 'mountain'],
    location: 'Solukhumbu District, Nepal',
    difficulty: 'Moderate to Challenging',
    altitude: '5,364m at Everest Base Camp',
    meals: 'Breakfast, Lunch, Dinner',
    accommodation: 'Teahouses/Lodges',
    transportation: 'Flights, Private vehicles',
    galleryImages: [
      'https://images.unsplash.com/photo-1501554728187-ce583db33af7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1973&q=80',
      'https://images.unsplash.com/photo-1533206482744-c531d71c5d5d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      'https://images.unsplash.com/photo-1514043454212-14c181f46583?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80',
      'https://images.unsplash.com/photo-1623297916628-60dcce9b0501?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
    ],
    highlights: [
      'Stand at the base of Mount Everest, the world\'s highest peak',
      'Visit the famous Namche Bazaar, gateway to Everest',
      'Experience Sherpa culture and visit ancient monasteries',
      'Spectacular mountain views including Everest, Lhotse, Nuptse, and Ama Dablam',
      'Trek through Sagarmatha National Park, a UNESCO World Heritage Site'
    ],
    included: [
      'All ground transportation as per the itinerary',
      'Domestic flights (Kathmandu-Lukla-Kathmandu)',
      'Accommodation in teahouses/lodges during the trek',
      'All meals during the trek (breakfast, lunch & dinner)',
      'Experienced English-speaking trekking guide',
      'Porter service (2:1 ratio)',
      'All necessary trekking permits and fees',
      'First aid medical kit',
      'Welcome and farewell dinner'
    ],
    excluded: [
      'International flight to and from Kathmandu',
      'Travel and rescue insurance',
      'Personal equipment and clothing',
      'Personal expenses (phone calls, laundry, bar bills, battery recharge, extra porters)',
      'Tips for guides and porters',
      'Extra nights accommodation in Kathmandu',
      'Optional trips and sightseeing tours'
    ],
    itinerary: [
      {
        day: 'Day 1',
        title: 'Arrival in Kathmandu (1,400m)',
        description: 'Welcome to Nepal! Upon your arrival at Tribhuvan International Airport, our representative will meet you and transfer you to your hotel. Evening welcome dinner and trek briefing.',
        accommodation: 'Hotel in Kathmandu',
        meals: 'Dinner'
      },
      {
        day: 'Day 2',
        title: 'Fly to Lukla (2,840m) and trek to Phakding (2,610m)',
        description: 'Early morning flight to Lukla. After meeting our crew, we start our trek through the Dudh Koshi Valley to Phakding.',
        accommodation: 'Teahouse in Phakding',
        meals: 'Breakfast, Lunch, Dinner'
      },
      {
        day: 'Day 3',
        title: 'Trek to Namche Bazaar (3,440m)',
        description: 'Today we cross several suspension bridges and climb to the Sherpa capital of Namche Bazaar. First views of Mt. Everest (weather permitting).',
        accommodation: 'Teahouse in Namche Bazaar',
        meals: 'Breakfast, Lunch, Dinner'
      },
      {
        day: 'Day 14',
        title: 'Fly back to Kathmandu',
        description: 'Morning flight from Lukla to Kathmandu. Free time in the afternoon for shopping or exploration. Farewell dinner in the evening.',
        accommodation: 'Hotel in Kathmandu',
        meals: 'Breakfast, Dinner'
      }
    ]
  },
  {
    id: 'annapurna-circuit',
    name: 'Annapurna Circuit Trek',
    image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd115?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2088&q=80',
    duration: '12-18 Days',
    groupSize: '2-10 People',
    season: 'Mar-May, Sep-Dec',
    price: 1299,
    rating: 4.8,
    description: 'A classic Himalayan trek through diverse landscapes and traditional mountain communities.',
    category: ['trekking', 'adventure', 'mountain'],
    location: 'Annapurna Region, Nepal',
    difficulty: 'Moderate to Challenging',
    altitude: '5,416m at Thorong La Pass',
    meals: 'Breakfast, Lunch, Dinner',
    accommodation: 'Teahouses/Lodges',
    transportation: 'Private vehicles, Local buses'
  }
];

const TourDetail = () => {
  const { tourId } = useParams();
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedDate, setSelectedDate] = useState('');
  const [people, setPeople] = useState(2);
  
  // Find the tour based on the id parameter
  const tour = tours.find(t => t.id === tourId);
  
  if (!tour) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="pt-16 flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold">Tour Not Found</h1>
            <p className="mt-4">The tour you are looking for does not exist or has been removed.</p>
            <Button className="nepal-button-primary mt-6">Return to Tours</Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const availableDates = [
    "April 15, 2025",
    "April 28, 2025",
    "May 10, 2025",
    "May 25, 2025",
    "September 5, 2025",
    "September 18, 2025",
    "October 3, 2025",
    "October 17, 2025"
  ];
  
  const handleBookNow = () => {
    alert(`Booking ${tour.name} for ${selectedDate} with ${people} people`);
    // In a real app, this would lead to a booking/payment flow
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="pt-16">
        {/* Hero Section with Main Image */}
        <div className="relative h-80 sm:h-96 md:h-[500px]">
          <img 
            src={tour.image} 
            alt={tour.name} 
            className="w-full h-full object-cover brightness-75"
          />
          <div className="absolute inset-0 bg-black/30 flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-white">
              <h1 className="text-3xl md:text-5xl font-bold mb-4">{tour.name}</h1>
              <div className="flex items-center gap-1 text-yellow-400 mb-4">
                <Star className="fill-yellow-400 h-5 w-5" />
                <span className="font-medium">{tour.rating}</span>
                <span className="text-white/80 ml-1">(120+ reviews)</span>
              </div>
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{tour.duration}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>{tour.groupSize}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{tour.season}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>{tour.location}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left column - Tour info */}
            <div className="lg:w-2/3">
              {/* Navigation tabs */}
              <div className="border-b border-gray-200 mb-6">
                <div className="flex space-x-8">
                  {['overview', 'itinerary', 'details', 'gallery'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`py-4 font-medium border-b-2 transition-colors ${
                        activeTab === tab 
                          ? 'border-nepal-purple text-nepal-purple' 
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Tab content */}
              <div className="mb-10">
                {activeTab === 'overview' && (
                  <div>
                    <h2 className="text-2xl font-bold mb-4">Tour Overview</h2>
                    <p className="text-gray-700 mb-6">{tour.description}</p>
                    
                    {tour.highlights && (
                      <div className="mb-6">
                        <h3 className="text-xl font-semibold mb-4">Tour Highlights</h3>
                        <ul className="space-y-2">
                          {tour.highlights.map((highlight, index) => (
                            <li key={index} className="flex items-start">
                              <Check className="h-5 w-5 text-nepal-purple mr-2 mt-0.5 flex-shrink-0" />
                              <span>{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                      <div className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 bg-white">
                        <div className="bg-nepal-purple/10 p-3 rounded-full">
                          <Mountain className="h-6 w-6 text-nepal-purple" />
                        </div>
                        <div>
                          <h4 className="text-sm text-gray-500">Difficulty</h4>
                          <p className="font-medium">{tour.difficulty}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 bg-white">
                        <div className="bg-nepal-purple/10 p-3 rounded-full">
                          <MapPin className="h-6 w-6 text-nepal-purple" />
                        </div>
                        <div>
                          <h4 className="text-sm text-gray-500">Max Altitude</h4>
                          <p className="font-medium">{tour.altitude}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 bg-white">
                        <div className="bg-nepal-purple/10 p-3 rounded-full">
                          <Utensils className="h-6 w-6 text-nepal-purple" />
                        </div>
                        <div>
                          <h4 className="text-sm text-gray-500">Meals</h4>
                          <p className="font-medium">{tour.meals}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 bg-white">
                        <div className="bg-nepal-purple/10 p-3 rounded-full">
                          <Hotel className="h-6 w-6 text-nepal-purple" />
                        </div>
                        <div>
                          <h4 className="text-sm text-gray-500">Accommodation</h4>
                          <p className="font-medium">{tour.accommodation}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
                      {tour.included && (
                        <div>
                          <h3 className="text-xl font-semibold mb-4">What's Included</h3>
                          <ul className="space-y-2">
                            {tour.included.map((item, index) => (
                              <li key={index} className="flex items-start">
                                <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                <span className="text-gray-700">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {tour.excluded && (
                        <div>
                          <h3 className="text-xl font-semibold mb-4">What's Not Included</h3>
                          <ul className="space-y-2">
                            {tour.excluded.map((item, index) => (
                              <li key={index} className="flex items-start">
                                <X className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                                <span className="text-gray-700">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                )}
                
                {activeTab === 'itinerary' && (
                  <div>
                    <h2 className="text-2xl font-bold mb-6">Tour Itinerary</h2>
                    {tour.itinerary ? (
                      <div className="space-y-6">
                        {tour.itinerary.map((day, index) => (
                          <div key={index} className="border-l-2 border-nepal-purple pl-6 pb-6 relative">
                            <div className="absolute -left-2.5 top-0 h-5 w-5 rounded-full bg-nepal-purple"></div>
                            <h3 className="text-xl font-semibold text-nepal-text-dark mb-1">{day.day}: {day.title}</h3>
                            <p className="text-gray-700 mb-3">{day.description}</p>
                            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
                              {day.accommodation && (
                                <div className="flex items-center gap-1">
                                  <Hotel className="h-4 w-4 text-nepal-purple" />
                                  <span>{day.accommodation}</span>
                                </div>
                              )}
                              {day.meals && (
                                <div className="flex items-center gap-1">
                                  <Utensils className="h-4 w-4 text-nepal-purple" />
                                  <span>{day.meals}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500">Detailed itinerary coming soon.</p>
                    )}
                  </div>
                )}
                
                {activeTab === 'details' && (
                  <div>
                    <h2 className="text-2xl font-bold mb-6">Essential Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <h3 className="text-xl font-semibold mb-4">Best Time to Visit</h3>
                        <p className="text-gray-700 mb-6">
                          The best time to do the {tour.name} is during pre-monsoon (March to May) 
                          and post-monsoon (September to November) seasons. These periods offer 
                          stable weather conditions, clear skies, and moderate temperatures, 
                          making them ideal for trekking and enjoying mountain views.
                        </p>
                        
                        <h3 className="text-xl font-semibold mb-4">Physical Requirements</h3>
                        <p className="text-gray-700 mb-6">
                          This trek requires a good level of fitness as you will be walking for 
                          5-7 hours daily on varied terrain including steep ascents and descents. 
                          Prior trekking experience, though not essential, is beneficial. We recommend 
                          preparing with cardio exercises and hiking practice before your trip.
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="text-xl font-semibold mb-4">Accommodation</h3>
                        <p className="text-gray-700 mb-6">
                          During the trek, you will stay in teahouses/lodges which provide basic 
                          but comfortable accommodation. Rooms are typically twin-sharing with simple 
                          beds and blankets. Bathrooms may be shared, and hot showers are available 
                          for an additional cost in most places.
                        </p>
                        
                        <h3 className="text-xl font-semibold mb-4">Permits Required</h3>
                        <p className="text-gray-700">
                          For this trek, you need a TIMS card (Trekkers' Information Management System) 
                          and a permit for the specific conservation area. Our package includes all 
                          necessary permits, which we will arrange for you once you provide your passport details.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                
                {activeTab === 'gallery' && (
                  <div>
                    <h2 className="text-2xl font-bold mb-6">Tour Gallery</h2>
                    {tour.galleryImages ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {tour.galleryImages.map((image, index) => (
                          <img 
                            key={index} 
                            src={image} 
                            alt={`${tour.name} image ${index + 1}`} 
                            className="rounded-lg object-cover w-full h-64"
                          />
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500">Gallery images coming soon.</p>
                    )}
                  </div>
                )}
              </div>
            </div>
            
            {/* Right column - Booking widget */}
            <div className="lg:w-1/3">
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 sticky top-20">
                <div className="text-center mb-4">
                  <span className="text-3xl font-bold text-nepal-text-dark">${tour.price}</span>
                  <span className="text-gray-500">/person</span>
                </div>
                
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Select Date
                    </label>
                    <select 
                      value={selectedDate} 
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-nepal-purple"
                      required
                    >
                      <option value="">Choose a departure date</option>
                      {availableDates.map((date) => (
                        <option key={date} value={date}>{date}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Number of People
                    </label>
                    <div className="flex border border-gray-300 rounded-md overflow-hidden">
                      <button 
                        onClick={() => setPeople(Math.max(1, people - 1))}
                        className="px-4 py-2 bg-gray-100 hover:bg-gray-200 focus:outline-none"
                      >
                        -
                      </button>
                      <input 
                        type="number" 
                        value={people} 
                        readOnly
                        className="w-full text-center border-none focus:outline-none py-2"
                      />
                      <button 
                        onClick={() => setPeople(people + 1)}
                        className="px-4 py-2 bg-gray-100 hover:bg-gray-200 focus:outline-none"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 pt-4 mb-6">
                  <div className="flex justify-between mb-2">
                    <span>Base Price</span>
                    <span>${tour.price} × {people}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>Booking Fee</span>
                    <span>$49</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg mt-4">
                    <span>Total</span>
                    <span>${tour.price * people + 49}</span>
                  </div>
                </div>
                
                <Button 
                  className="w-full bg-nepal-orange hover:bg-nepal-orange/90 text-white py-3 flex items-center justify-center gap-2"
                  disabled={!selectedDate}
                  onClick={handleBookNow}
                >
                  <ShoppingCart className="h-5 w-5" />
                  Book Now
                </Button>
                
                <p className="text-sm text-center text-gray-500 mt-4">
                  No payment required now. Reserve your spot today!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TourDetail;
