
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface Destination {
  id: string;
  name: string;
  image: string;
  description: string;
  activities: string[];
}

const destinations: Destination[] = [
  {
    id: 'kathmandu',
    name: 'Kathmandu',
    image: 'https://images.unsplash.com/photo-1588733103629-b77afe0b4342?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80',
    description: 'Explore the ancient temples and bustling markets of Nepal\'s capital city.',
    activities: ['Cultural Tours', 'Temple Visits', 'Local Cuisine']
  },
  {
    id: 'pokhara',
    name: 'Pokhara',
    image: 'https://images.unsplash.com/photo-1605146969463-896c33cd8eb4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    description: 'Experience the serene lakes and stunning mountain views in this peaceful city.',
    activities: ['Boating', 'Paragliding', 'Mountain Viewing']
  },
  {
    id: 'everest',
    name: 'Everest Region',
    image: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1875&q=80',
    description: 'Challenge yourself with a trek to the base of the world\'s tallest mountain.',
    activities: ['Trekking', 'Mountain Climbing', 'Photography']
  },
  {
    id: 'chitwan',
    name: 'Chitwan National Park',
    image: 'https://images.unsplash.com/photo-1544735716-ea9a274df10b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    description: 'Encounter wildlife including rhinos and tigers in this lush national park.',
    activities: ['Safari', 'Bird Watching', 'Canoeing']
  }
];

const FeaturedDestinations = () => {
  return (
    <section className="py-16 bg-nepal-light-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-12">
          <h2 className="section-title">Featured Destinations</h2>
          <Link to="/destinations">
            <Button variant="link" className="text-nepal-purple hover:text-nepal-purple-dark flex items-center gap-1">
              View all destinations
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {destinations.map((destination) => (
            <div key={destination.id} className="nepal-card group">
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
                    {destination.activities.slice(0, 2).map((activity, index) => (
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
                <Link to={`/destinations/${destination.id}`}>
                  <Button variant="outline" className="w-full border-nepal-purple text-nepal-purple hover:bg-nepal-purple hover:text-white transition-colors">
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
