
import { Button } from '@/components/ui/button';

const CTA = () => {
  return (
    <section className="relative py-20">
      {/* Background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-fixed z-0" 
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1501554728187-ce583db33af7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1973&q=80')" }}
      ></div>
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-nepal-text-dark/70 z-10"></div>
      
      {/* Content */}
      <div className="relative z-20 max-w-3xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Ready to Start Your Himalayan Adventure?
        </h2>
        <p className="text-white/90 text-lg mb-8">
          Let us help you plan the perfect Nepal experience tailored to your interests, budget, and schedule.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button className="nepal-button-primary text-lg py-6 px-8">
            Plan My Trip
          </Button>
          <Button variant="outline" className="bg-transparent border-white text-white hover:bg-white/10 text-lg py-6 px-8">
            Contact Our Experts
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTA;
