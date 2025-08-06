
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log("Form submitted:", formData);
    
    // Show success message
    toast({
      title: "Message Sent",
      description: "Thank you! We'll get back to you shortly.",
      variant: "default"
    });
    
    // Reset form
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: ""
    });
  };

  const faqs = [
    {
      question: "What is the best time to visit Nepal?",
      answer: "The best time to visit Nepal depends on your planned activities. For trekking, autumn (September to November) and spring (March to May) offer the best weather conditions. Winter (December to February) is good for lower elevation treks and wildlife viewing, while summer/monsoon season (June to August) is ideal for specific regions like Upper Mustang and Dolpo that lie in rain shadow areas."
    },
    {
      question: "Do I need a visa to visit Nepal?",
      answer: "Yes, most visitors need a visa to enter Nepal. Visas can be obtained upon arrival at Tribhuvan International Airport or at land border crossings. You can also apply for an e-visa online before your trip. Visa fees vary depending on the length of stay: 15 days ($30), 30 days ($50), or 90 days ($125). Please check the latest requirements before traveling."
    },
    {
      question: "How do I book a tour with The Mountain Whisper?",
      answer: "You can book a tour by contacting us through this contact form, emailing us directly at info@themountainwhisper.com, or calling us at +977-1-4xxxxxx. We'll help you select the right package and customize it to your preferences. A 20% deposit is typically required to confirm your booking."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept credit/debit cards (Visa, MasterCard), bank transfers, and PayPal. For in-person payments in Kathmandu, we also accept cash in major currencies."
    },
    {
      question: "What is your cancellation policy?",
      answer: "Our standard cancellation policy offers a full refund (minus transaction fees) for cancellations made 30 days or more before the tour start date. Cancellations made 15-29 days before receive a 50% refund. For cancellations less than 15 days before the start date, no refund is provided. However, we understand circumstances change and will try to be flexible when possible."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="pt-16">
        {/* Hero section */}
        <div className="bg-nepal-purple text-white py-24 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto">
              We're here to help you plan your perfect Nepal adventure
            </p>
          </div>
        </div>

        {/* Contact content */}
        <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact info */}
            <div className="lg:col-span-1">
              <h2 className="text-2xl font-bold mb-6">Get In Touch</h2>
              
              <Card className="nepal-card p-6 mb-6">
                <div className="space-y-6">
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 mr-3 text-nepal-orange mt-1" />
                    <div>
                      <h3 className="font-medium">Office Location</h3>
                      <p className="text-gray-600 mt-1">
                        Thamel, Z-Street
                        <br />
                        Kathmandu, Nepal
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Mail className="h-5 w-5 mr-3 text-nepal-orange mt-1" />
                    <div>
                      <h3 className="font-medium">Email Us</h3>
                      <a href="mailto:info@themountainwhisper.com" className="text-nepal-purple hover:text-nepal-purple-dark transition-colors mt-1 block">
                        info@themountainwhisper.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Phone className="h-5 w-5 mr-3 text-nepal-orange mt-1" />
                    <div>
                      <h3 className="font-medium">Call Us</h3>
                      <p className="text-gray-600 mt-1">
                        +977-1-4xxxxxx
                        <br />
                        +977-9xxxxxxxxx (WhatsApp)
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Clock className="h-5 w-5 mr-3 text-nepal-orange mt-1" />
                    <div>
                      <h3 className="font-medium">Office Hours</h3>
                      <p className="text-gray-600 mt-1">
                        Sunday - Friday: 9:00 AM - 5:00 PM
                        <br />
                        Saturday: Closed
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
              
              {/* Map */}
              <Card className="nepal-card overflow-hidden">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.2680387373593!2d85.30882507548455!3d27.71473717617357!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb18fcb77fd4bd%3A0x58099b1deffed8c4!2sThamel%2C%20Kathmandu%2044600!5e0!3m2!1sen!2snp!4v1681234567890!5m2!1sen!2snp" 
                  width="100%" 
                  height="300" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy"
                  title="Our office location"
                ></iframe>
              </Card>
            </div>

            {/* Contact form */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
              
              <Card className="nepal-card p-6 mb-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block mb-2 font-medium text-gray-700">
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="nepal-input w-full"
                        placeholder="John Doe"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block mb-2 font-medium text-gray-700">
                        Your Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="nepal-input w-full"
                        placeholder="john@example.com"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block mb-2 font-medium text-gray-700">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="nepal-input w-full"
                      placeholder="How can we help you?"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block mb-2 font-medium text-gray-700">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={6}
                      className="nepal-input w-full"
                      placeholder="Please tell us what you need help with..."
                      required
                    ></textarea>
                  </div>
                  
                  <Button type="submit" className="nepal-button-primary flex gap-2">
                    <Send className="h-4 w-4" />
                    Send Message
                  </Button>
                </form>
              </Card>
              
              {/* FAQs */}
              <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left font-medium text-nepal-text-dark">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
