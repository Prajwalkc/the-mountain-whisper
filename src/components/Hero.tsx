
import { useState } from 'react';
import { Search, MapPin, Calendar, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  const [searchType, setSearchType] = useState('destination');
  
  return (
    <section className="relative h-screen min-h-[600px] overflow-hidden">
      {/* Hero background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat" 
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80')" }}
      ></div>
      
      {/* Overlay gradient */}
      <div className="hero-overlay"></div>
      
      {/* Hero content */}
      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
        <div className="max-w-3xl animate-fade-in">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-4">
            Discover the Beauty of Nepal
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8">
            From the majestic Himalayas to ancient temples, plan your perfect adventure in the land of diversity.
          </p>
          <Button className="nepal-button-primary text-lg py-6 px-8">
            Start Your Journey
          </Button>
        </div>
        
        {/* Search bar */}
        <div className="max-w-4xl w-full mt-12 animate-scale-in">
          <div className="bg-white rounded-lg shadow-xl overflow-hidden">
            {/* Tabs */}
            <div className="flex border-b">
              <button 
                onClick={() => setSearchType('destination')}
                className={`flex-1 py-3 text-center font-medium transition-colors ${searchType === 'destination' ? 'text-nepal-purple border-b-2 border-nepal-purple' : 'text-gray-500 hover:text-gray-700'}`}
              >
                Destinations
              </button>
              <button 
                onClick={() => setSearchType('tours')}
                className={`flex-1 py-3 text-center font-medium transition-colors ${searchType === 'tours' ? 'text-nepal-purple border-b-2 border-nepal-purple' : 'text-gray-500 hover:text-gray-700'}`}
              >
                Tours & Packages
              </button>
              <button 
                onClick={() => setSearchType('hotels')}
                className={`flex-1 py-3 text-center font-medium transition-colors ${searchType === 'hotels' ? 'text-nepal-purple border-b-2 border-nepal-purple' : 'text-gray-500 hover:text-gray-700'}`}
              >
                Hotels
              </button>
            </div>
            
            {/* Search fields */}
            <div className="p-4 grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="col-span-1 md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Where</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder={searchType === 'destination' ? 'Search destinations' : searchType === 'tours' ? 'Search tours' : 'Search hotels'}
                    className="nepal-input pl-10 w-full"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">When</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Select dates"
                    className="nepal-input pl-10 w-full"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Travelers</label>
                <div className="relative">
                  <Users className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Guests"
                    className="nepal-input pl-10 w-full"
                  />
                </div>
              </div>
            </div>
            
            {/* Search button */}
            <div className="px-4 py-3 bg-gray-50 flex justify-end">
              <Button className="nepal-button-primary">
                <Search className="h-4 w-4 mr-2" />
                <span>Search</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
