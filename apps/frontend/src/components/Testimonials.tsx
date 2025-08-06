import { Star } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { useFeaturedReviews } from '@/hooks/useApi';

const Testimonials = () => {
  const { data: reviews = [], isLoading } = useFeaturedReviews();

  if (isLoading) {
    return (
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Skeleton className="h-10 w-64 mx-auto mb-4" />
            <Skeleton className="h-6 w-96 mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="nepal-card p-6">
                <div className="flex items-center mb-4">
                  <Skeleton className="h-12 w-12 rounded-full mr-4" />
                  <div>
                    <Skeleton className="h-4 w-24 mb-2" />
                    <Skeleton className="h-3 w-16" />
                  </div>
                </div>
                <Skeleton className="h-4 w-20 mb-4" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

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
          {reviews.slice(0, 3).map((review) => (
            <div key={review.id} className="nepal-card p-6">
              <div className="flex items-center mb-4">
                <img 
                  src={review.user.avatar} 
                  alt={review.user.name} 
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold text-nepal-text-dark">{review.user.name}</h4>
                  <p className="text-sm text-gray-600">{review.user.country}</p>
                </div>
              </div>
              
              <div className="flex mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`h-4 w-4 ${i < review.rating ? 'fill-yellow-500 text-yellow-500' : 'text-gray-300'}`}
                  />
                ))}
              </div>
              
              <h5 className="font-medium text-nepal-text-dark mb-2">{review.title}</h5>
              <p className="text-gray-600 italic">"{review.comment}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;