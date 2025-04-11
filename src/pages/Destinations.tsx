
import { useState } from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Mountain, Camera, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Destination {
  id: string;
  name: string;
  image: string;
  description: string;
  activities: string[];
  elevation?: string;
  bestTime?: string;
  region: string;
}

const allDestinations: Destination[] = [
  {
    id: 'kathmandu',
    name: 'Kathmandu',
    image: 'https://images.unsplash.com/photo-1588733103629-b77afe0b4342?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80',
    description: 'Explore the ancient temples and bustling markets of Nepal\'s capital city.',
    activities: ['Cultural Tours', 'Temple Visits', 'Local Cuisine'],
    region: 'Central Nepal',
    bestTime: 'Sep-Nov, Mar-May'
  },
  {
    id: 'pokhara',
    name: 'Pokhara',
    image: 'https://images.unsplash.com/photo-1605146969463-896c33cd8eb4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    description: 'Experience the serene lakes and stunning mountain views in this peaceful city.',
    activities: ['Boating', 'Paragliding', 'Mountain Viewing'],
    region: 'Western Nepal',
    bestTime: 'Oct-Apr'
  },
  {
    id: 'everest',
    name: 'Everest Region',
    image: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1875&q=80',
    description: 'Challenge yourself with a trek to the base of the world\'s tallest mountain.',
    activities: ['Trekking', 'Mountain Climbing', 'Photography'],
    region: 'Eastern Nepal',
    elevation: '3,440m to 5,545m',
    bestTime: 'Mar-May, Sep-Nov'
  },
  {
    id: 'chitwan',
    name: 'Chitwan National Park',
    image: 'https://images.unsplash.com/photo-1544735716-ea9a274df10b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    description: 'Encounter wildlife including rhinos and tigers in this lush national park.',
    activities: ['Safari', 'Bird Watching', 'Canoeing'],
    region: 'Southern Nepal',
    bestTime: 'Oct-Mar'
  },
  {
    id: 'annapurna',
    name: 'Annapurna Region',
    image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd115?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2088&q=80',
    description: 'Trek through diverse landscapes from subtropical forests to high alpine terrain.',
    activities: ['Trekking', 'Hot Springs', 'Cultural Exploration'],
    region: 'North Central Nepal',
    elevation: '1,000m to 5,416m',
    bestTime: 'Mar-May, Oct-Nov'
  },
  {
    id: 'lumbini',
    name: 'Lumbini',
    image: 'https://images.unsplash.com/photo-1558455822-2b60144b56db?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
    description: 'Visit the birthplace of Buddha and explore sacred monasteries and gardens.',
    activities: ['Temple Visits', 'Meditation', 'Historical Sites'],
    region: 'Southern Nepal',
    bestTime: 'Year-round (Oct-Apr best)'
  }
];

const regions = ['All Regions', 'Central Nepal', 'Eastern Nepal', 'Western Nepal', 'Southern Nepal', 'North Central Nepal'];

const Destinations = () => {
  const [selectedRegion, setSelectedRegion] = useState('All Regions');
  
  const filteredDestinations = selectedRegion === 'All Regions' 
    ? allDestinations 
    : allDestinations.filter(destination => destination.region === selectedRegion);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="pt-16">
        {/* Hero section */}
        <div className="bg-nepal-purple text-white py-24 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Destinations</h1>
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
                {regions.map(region => (
                  <button
                    key={region}
                    onClick={() => setSelectedRegion(region)}
                    className={`px-3 py-1 text-sm rounded-full transition ${
                      selectedRegion === region 
                        ? 'bg-nepal-purple text-white' 
                        : 'bg-white border border-gray-300 hover:bg-gray-100'
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
          {filteredDestinations.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium text-gray-900">No destinations found</h3>
              <p className="mt-2 text-gray-500">Try selecting a different region filter.</p>
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
                      <h3 className="text-xl font-bold text-white mb-1">{destination.name}</h3>
                      <div className="flex flex-wrap gap-2">
                        {destination.activities.slice(0, 3).map((activity, index) => (
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
                    <p className="text-gray-600 text-sm line-clamp-2 mb-4">{destination.description}</p>
                    
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
                      <Button variant="outline" className="w-full border-nepal-purple text-nepal-purple hover:bg-nepal-purple hover:text-white transition-colors">
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
