
import { Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface BlogPost {
  id: string;
  title: string;
  image: string;
  category: string;
  date: string;
  readTime: string;
  excerpt: string;
}

const blogPosts: BlogPost[] = [
  {
    id: 'travel-visa-guide',
    title: 'Complete Guide to Nepal Travel Visa',
    image: 'https://images.unsplash.com/photo-1566642303870-fdce92046018?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    category: 'Travel Tips',
    date: 'April 5, 2025',
    readTime: '5 min',
    excerpt: 'Everything you need to know about obtaining a travel visa for Nepal, including requirements and application process.'
  },
  {
    id: 'packing-for-trek',
    title: 'What to Pack for Himalayan Trekking',
    image: 'https://images.unsplash.com/photo-1575221052072-6a4f4d7b8d8a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    category: 'Trekking',
    date: 'March 22, 2025',
    readTime: '7 min',
    excerpt: 'A comprehensive packing list for your Himalayan trek, from clothing to gadgets and emergency supplies.'
  },
  {
    id: 'best-time-visit',
    title: 'Best Time to Visit Nepal - Season Guide',
    image: 'https://images.unsplash.com/photo-1554968756-7090276281d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    category: 'Weather',
    date: 'March 15, 2025',
    readTime: '6 min',
    excerpt: 'Discover the best time to visit Nepal for different activities, from trekking to wildlife safaris.'
  }
];

const TravelTips = () => {
  return (
    <section className="py-16 bg-nepal-light-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-12">
          <h2 className="section-title">Travel Tips & Resources</h2>
          <Link to="/blog">
            <Button variant="link" className="text-nepal-purple hover:text-nepal-purple-dark flex items-center gap-1">
              View all articles
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Link to={`/blog/${post.id}`} key={post.id}>
              <div className="nepal-card h-full transition-transform hover:-translate-y-1">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-48 object-cover"
                />
                <div className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className="bg-nepal-purple/10 text-nepal-purple text-xs px-2 py-1 rounded-full">
                      {post.category}
                    </span>
                    <div className="flex items-center text-gray-500 text-xs">
                      <Clock className="h-3 w-3 mr-1" />
                      {post.readTime} read
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-nepal-text-dark mb-2">{post.title}</h3>
                  <p className="text-gray-600 text-sm line-clamp-2">{post.excerpt}</p>
                  <div className="mt-4 text-xs text-gray-500">{post.date}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TravelTips;
