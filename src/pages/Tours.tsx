
import { useState } from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from "@/components/ui/pagination";
import { Star, Clock, Users, Calendar, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';

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
}

const allTours: Tour[] = [
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
    category: ['trekking', 'adventure', 'mountain']
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
    category: ['trekking', 'adventure', 'mountain']
  },
  {
    id: 'langtang-valley',
    name: 'Langtang Valley Trek',
    image: 'https://images.unsplash.com/photo-1432958576632-8a39f6b97dc7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2053&q=80',
    duration: '7 Days',
    groupSize: '1-8 People',
    season: 'Year-round (Best: Mar-May, Sep-Nov)',
    price: 799,
    rating: 4.7,
    description: 'Explore the beautiful Langtang Valley with views of snow-capped peaks and rich local culture.',
    category: ['trekking', 'cultural', 'mountain']
  },
  {
    id: 'kathmandu-valley-tour',
    name: 'Kathmandu Valley Cultural Tour',
    image: 'https://images.unsplash.com/photo-1469476396928-b7e238675b19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80',
    duration: '5 Days',
    groupSize: '1-15 People',
    season: 'Year-round',
    price: 599,
    rating: 4.6,
    description: 'Discover the rich cultural heritage of Kathmandu Valley with visits to UNESCO World Heritage Sites.',
    category: ['cultural', 'sightseeing', 'heritage']
  },
  {
    id: 'chitwan-safari',
    name: 'Chitwan National Park Safari',
    image: 'https://images.unsplash.com/photo-1540247110674-31e928ee852a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    duration: '3 Days',
    groupSize: '1-10 People',
    season: 'Oct-Mar',
    price: 449,
    rating: 4.8,
    description: 'Experience wildlife including rhinos, tigers, and elephants in Nepal\'s first national park.',
    category: ['wildlife', 'safari', 'nature']
  },
  {
    id: 'pokhara-leisure',
    name: 'Pokhara Leisure Break',
    image: 'https://images.unsplash.com/photo-1565378435245-4308658a67fc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80',
    duration: '4 Days',
    groupSize: '1-4 People',
    season: 'Year-round',
    price: 399,
    rating: 4.5,
    description: 'Relax in the scenic lake city of Pokhara with mountain views, boat rides, and optional adventure activities.',
    category: ['leisure', 'scenic', 'relaxation']
  }
];

const categories = ['All', 'trekking', 'adventure', 'mountain', 'cultural', 'heritage', 'wildlife', 'safari', 'leisure'];

const Tours = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('recommended');
  
  const filteredTours = selectedCategory === 'All' 
    ? allTours 
    : allTours.filter(tour => tour.category.includes(selectedCategory));
    
  const sortedTours = [...filteredTours].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'duration-short') return parseInt(a.duration) - parseInt(b.duration);
    if (sortBy === 'rating-high') return b.rating - a.rating;
    return 0; // recommended (default order)
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="pt-16">
        {/* Hero section */}
        <div className="bg-nepal-purple text-white py-24 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Tours & Packages</h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto">
              Discover the best of Nepal with our carefully crafted travel experiences
            </p>
          </div>
        </div>
        
        {/* Filters */}
        <div className="bg-gray-50 py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
              <div className="flex flex-wrap gap-2 items-center">
                <Filter className="h-5 w-5 text-nepal-purple" />
                <span className="font-medium mr-2">Categories:</span>
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-3 py-1 text-sm rounded-full transition ${
                      selectedCategory === category 
                        ? 'bg-nepal-purple text-white' 
                        : 'bg-white border border-gray-300 hover:bg-gray-100'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
              
              <div className="flex items-center">
                <label className="mr-2 font-medium">Sort by:</label>
                <select 
                  value={sortBy} 
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-nepal-purple"
                >
                  <option value="recommended">Recommended</option>
                  <option value="price-low">Price (Low to High)</option>
                  <option value="price-high">Price (High to Low)</option>
                  <option value="duration-short">Duration (Shortest)</option>
                  <option value="rating-high">Rating (Highest)</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        
        {/* Tours grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {sortedTours.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium text-gray-900">No tours found</h3>
              <p className="mt-2 text-gray-500">Try changing your filters or check back soon for new tours.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sortedTours.map((tour) => (
                <Card key={tour.id} className="nepal-card flex flex-col h-full overflow-hidden">
                  <div className="relative">
                    <img 
                      src={tour.image} 
                      alt={tour.name} 
                      className="w-full h-52 object-cover"
                    />
                    <div className="absolute top-3 right-3 bg-nepal-orange text-white px-3 py-1.5 rounded-md font-bold">
                      ${tour.price}
                    </div>
                  </div>
                  <div className="p-5 flex-grow flex flex-col">
                    <div className="flex items-center gap-1 text-yellow-500 mb-2">
                      <Star className="fill-yellow-500 h-4 w-4" />
                      <span className="text-sm font-medium">{tour.rating}</span>
                      <span className="text-sm text-gray-600 ml-1">(120+ reviews)</span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-nepal-text-dark mb-3">{tour.name}</h3>
                    
                    <p className="text-gray-600 text-sm mb-4 flex-grow">{tour.description}</p>
                    
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
                        <span>Best: {tour.season.split(',')[0]}</span>
                      </div>
                    </div>
                    
                    <Link to={`/tours/${tour.id}`}>
                      <Button className="nepal-button-primary w-full">View Details</Button>
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          )}
          
          {/* Pagination */}
          <Pagination className="mt-12">
            <PaginationContent>
              <PaginationItem>
                <PaginationLink href="#" className="hover:text-nepal-purple">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" className="hover:text-nepal-purple">2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" className="hover:text-nepal-purple">3</PaginationLink>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Tours;
