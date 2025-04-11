
import { Star } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  country: string;
  avatar: string;
  rating: number;
  text: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Emily Johnson',
    country: 'USA',
    avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
    rating: 5,
    text: 'My trip to Everest Base Camp was the adventure of a lifetime! The guides were extremely knowledgeable and the views were breathtaking. Highly recommend this service for anyone looking to explore Nepal.'
  },
  {
    id: 2,
    name: 'Marco Rossi',
    country: 'Italy',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    rating: 5,
    text: 'The Annapurna Circuit trek was amazing. Everything was well-organized from start to finish. The local guides shared fascinating cultural insights that made the experience even richer.'
  },
  {
    id: 3,
    name: 'Sarah Zhang',
    country: 'Australia',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    rating: 4,
    text: 'Exploring Kathmandu and Pokhara through this service was fantastic. The accommodations were comfortable and the itinerary perfectly balanced culture, adventure, and relaxation.'
  }
];

const Testimonials = () => {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-nepal-text-dark mb-4">What Our Travelers Say</h2>
          <p className="text-nepal-gray max-w-2xl mx-auto">
            Hear from adventurers who have experienced the magic of Nepal through our services.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="nepal-card p-6">
              <div className="flex items-center mb-4">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.name} 
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold text-nepal-text-dark">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">{testimonial.country}</p>
                </div>
              </div>
              
              <div className="flex mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`h-4 w-4 ${i < testimonial.rating ? 'fill-yellow-500 text-yellow-500' : 'text-gray-300'}`}
                  />
                ))}
              </div>
              
              <p className="text-gray-600 italic">"{testimonial.text}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
