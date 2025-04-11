
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Clock, ArrowRight, Tag, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

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
    id: "travel-visa-guide",
    title: "Complete Guide to Nepal Travel Visa",
    image: "https://images.unsplash.com/photo-1566642303870-fdce92046018?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    category: "Travel Tips",
    date: "April 5, 2025",
    readTime: "5 min",
    excerpt: "Everything you need to know about obtaining a travel visa for Nepal, including requirements and application process."
  },
  {
    id: "packing-for-trek",
    title: "What to Pack for Himalayan Trekking",
    image: "https://images.unsplash.com/photo-1575221052072-6a4f4d7b8d8a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    category: "Trekking",
    date: "March 22, 2025",
    readTime: "7 min",
    excerpt: "A comprehensive packing list for your Himalayan trek, from clothing to gadgets and emergency supplies."
  },
  {
    id: "best-time-visit",
    title: "Best Time to Visit Nepal - Season Guide",
    image: "https://images.unsplash.com/photo-1554968756-7090276281d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    category: "Weather",
    date: "March 15, 2025",
    readTime: "6 min",
    excerpt: "Discover the best time to visit Nepal for different activities, from trekking to wildlife safaris."
  },
  {
    id: "nepali-cuisine",
    title: "Introduction to Nepali Cuisine - What to Eat",
    image: "https://images.unsplash.com/photo-1567337710282-00832b415979?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    category: "Food",
    date: "March 1, 2025",
    readTime: "8 min",
    excerpt: "Explore the delicious world of Nepali cuisine, from momos and dal bhat to traditional sweets."
  },
  {
    id: "budget-travel-nepal",
    title: "Nepal on a Budget - Money-Saving Tips",
    image: "https://images.unsplash.com/photo-1627894466624-481d68b48199?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    category: "Budget",
    date: "February 15, 2025",
    readTime: "5 min",
    excerpt: "How to experience the best of Nepal without breaking the bank - accommodation, food, and transportation tips."
  },
  {
    id: "photography-tips-nepal",
    title: "Photography Tips for Nepal's Landscapes",
    image: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    category: "Photography",
    date: "February 5, 2025",
    readTime: "10 min",
    excerpt: "Capture stunning photos of Nepal's mountains, cultural sites, and people with these expert photography tips."
  }
];

const categories = [
  "All",
  "Travel Tips",
  "Trekking",
  "Weather",
  "Food",
  "Budget",
  "Photography",
  "Culture",
  "Safety"
];

const TravelTips = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredPosts =
    selectedCategory === "All"
      ? blogPosts
      : blogPosts.filter(post => post.category === selectedCategory);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="pt-16">
        {/* Hero section */}
        <div className="bg-nepal-purple text-white py-24 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Travel Tips & Resources</h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto">
              Expert advice to help you make the most of your Nepal adventure
            </p>
          </div>
        </div>

        {/* Content section */}
        <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          {/* Category filters */}
          <div className="mb-8 overflow-x-auto">
            <Tabs defaultValue="All" className="w-full">
              <TabsList className="mb-8 flex flex-nowrap overflow-x-auto pb-2">
                {categories.map(category => (
                  <TabsTrigger
                    key={category}
                    value={category}
                    onClick={() => setSelectedCategory(category)}
                    className="whitespace-nowrap"
                  >
                    {category}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>

          {/* Featured post */}
          {filteredPosts.length > 0 && (
            <div className="mb-16">
              <h2 className="text-2xl font-bold mb-6">Featured Article</h2>
              <div className="nepal-card overflow-hidden">
                <div className="grid md:grid-cols-5 gap-6">
                  <div className="md:col-span-2">
                    <img
                      src={filteredPosts[0].image}
                      alt={filteredPosts[0].title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="md:col-span-3 p-6 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-4 mb-4">
                        <span className="bg-nepal-purple/10 text-nepal-purple text-xs px-3 py-1 rounded-full">
                          {filteredPosts[0].category}
                        </span>
                        <div className="flex items-center text-gray-500 text-xs">
                          <Calendar className="h-3.5 w-3.5 mr-1" />
                          {filteredPosts[0].date}
                        </div>
                        <div className="flex items-center text-gray-500 text-xs">
                          <Clock className="h-3.5 w-3.5 mr-1" />
                          {filteredPosts[0].readTime} read
                        </div>
                      </div>
                      <h3 className="text-2xl font-bold text-nepal-text-dark mb-4">
                        {filteredPosts[0].title}
                      </h3>
                      <p className="text-gray-600 mb-6">{filteredPosts[0].excerpt}</p>
                    </div>
                    <Link to={`/blog/${filteredPosts[0].id}`}>
                      <Button className="nepal-button-secondary flex gap-2 items-center">
                        Read Full Article
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Blog post grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.slice(1).map(post => (
              <Link to={`/blog/${post.id}`} key={post.id}>
                <Card className="nepal-card h-full transition-transform hover:-translate-y-1">
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
                </Card>
              </Link>
            ))}
          </div>

          {/* Newsletter signup */}
          <div className="mt-16 bg-gray-50 p-8 rounded-lg">
            <div className="max-w-2xl mx-auto text-center">
              <h3 className="text-2xl font-bold mb-2">Get Travel Tips in Your Inbox</h3>
              <p className="text-gray-600 mb-6">
                Subscribe to our newsletter for the latest travel tips, exclusive offers, and
                destination insights.
              </p>
              <form className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-grow nepal-input"
                  required
                />
                <Button className="nepal-button-primary">Subscribe</Button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TravelTips;
