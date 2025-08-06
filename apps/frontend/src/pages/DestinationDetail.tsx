
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MapPin, Mountain, Calendar, Info, ArrowRight, CheckCircle, X } from "lucide-react";

interface Destination {
  id: string;
  name: string;
  image: string;
  description: string;
  activities: string[];
  elevation?: string;
  bestTime?: string;
  region: string;
  longDescription?: string;
  highlights?: string[];
  notIncluded?: string[];
}

const destinations: Destination[] = [
  {
    id: 'kathmandu',
    name: 'Kathmandu',
    image: 'https://images.unsplash.com/photo-1588733103629-b77afe0b4342?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80',
    description: 'Explore the ancient temples and bustling markets of Nepal\'s capital city.',
    activities: ['Cultural Tours', 'Temple Visits', 'Local Cuisine', 'Shopping', 'Museums'],
    region: 'Central Nepal',
    bestTime: 'Sep-Nov, Mar-May',
    longDescription: 'Kathmandu, the capital city of Nepal, is a vibrant city filled with ancient temples, shrines, and historical sites. The city is home to seven UNESCO World Heritage Sites and is a cultural treasure trove. From the bustling streets of Thamel to the peaceful temples and stupas, Kathmandu offers a unique blend of tradition and modernity. The city is also known for its delicious Newari cuisine and handicraft shops.',
    highlights: [
      'Explore the historic Durbar Square with palaces and temples',
      'Visit the sacred Pashupatinath Temple, a major Hindu shrine',
      'Experience the spiritual atmosphere at Boudhanath Stupa',
      'Discover the ancient city of Bhaktapur',
      'Shop for handicrafts in the vibrant markets of Thamel'
    ],
    notIncluded: [
      'Mountain views (the city is in a valley surrounded by mountains)',
      'Beach activities (Nepal is a landlocked country)',
      'Desert experiences'
    ]
  },
  {
    id: 'pokhara',
    name: 'Pokhara',
    image: 'https://images.unsplash.com/photo-1605146969463-896c33cd8eb4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    description: 'Experience the serene lakes and stunning mountain views in this peaceful city.',
    activities: ['Boating', 'Paragliding', 'Mountain Viewing', 'Hiking', 'Relaxation'],
    region: 'Western Nepal',
    bestTime: 'Oct-Apr',
    longDescription: 'Pokhara is Nepal\'s second-largest city and is known for its stunning natural beauty. Set against the backdrop of the Annapurna mountain range, this lakeside city offers breathtaking views and a peaceful atmosphere. Phewa Lake, the second-largest lake in Nepal, dominates the city and offers boating opportunities with mountain reflections. The city is also a gateway to many famous treks in the Annapurna region and a hub for adventure activities like paragliding and rafting.',
    highlights: [
      'Boat ride on the serene Phewa Lake with mountain views',
      'Sunrise view from Sarangkot viewpoint',
      'Paragliding with views of lakes and mountains',
      'Visit the peaceful World Peace Pagoda',
      'Explore the mysterious Gupteshwor Cave'
    ],
    notIncluded: [
      'Historical monuments and palaces (unlike Kathmandu)',
      'Desert landscapes',
      'Shopping malls and urban entertainment'
    ]
  },
  {
    id: 'everest',
    name: 'Everest Region',
    image: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1875&q=80',
    description: 'Challenge yourself with a trek to the base of the world\'s tallest mountain.',
    activities: ['Trekking', 'Mountain Climbing', 'Photography', 'Cultural Experiences', 'Wildlife Viewing'],
    region: 'Eastern Nepal',
    elevation: '3,440m to 5,545m',
    bestTime: 'Mar-May, Sep-Nov',
    longDescription: 'The Everest Region, also known as the Khumbu region, is home to the world\'s highest peak, Mount Everest (8,848m). This region offers some of the most spectacular mountain scenery and trekking routes in the world. The area is inhabited by the Sherpa people, known for their mountaineering skills and unique culture. The main gateway to the region is through Lukla, accessed by a short flight from Kathmandu. The region includes Sagarmatha National Park, a UNESCO World Heritage Site, which protects the fragile ecosystem of the high Himalayas.',
    highlights: [
      'Trek to Everest Base Camp (5,364m)',
      'Panoramic views from Kala Patthar (5,545m)',
      'Experience Sherpa culture in villages like Namche Bazaar',
      'Visit the highest Buddhist monastery at Tengboche',
      'Spot rare Himalayan wildlife including musk deer and Himalayan tahr'
    ],
    notIncluded: [
      'Luxury accommodations',
      'Easy accessibility (requires trekking)',
      'Tropical climate (cold alpine environment)',
      'Urban entertainment'
    ]
  },
  {
    id: 'chitwan',
    name: 'Chitwan National Park',
    image: 'https://images.unsplash.com/photo-1544735716-ea9a274df10b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    description: 'Encounter wildlife including rhinos and tigers in this lush national park.',
    activities: ['Safari', 'Bird Watching', 'Canoeing', 'Cultural Shows', 'Elephant Encounters'],
    region: 'Southern Nepal',
    bestTime: 'Oct-Mar',
    longDescription: 'Chitwan National Park is Nepal\'s first national park and a UNESCO World Heritage Site. Located in the subtropical inner Terai lowlands of south-central Nepal, this park covers an area of 952.63 sq. km. The park is home to a rich array of wildlife including one-horned rhinoceros, Bengal tigers, leopards, sloth bears, and over 500 species of birds. Visitors can explore the park through jungle safaris, canoe rides, nature walks, and cultural programs featuring the indigenous Tharu community.',
    highlights: [
      'Jeep safari to spot one-horned rhinoceros and Bengal tigers',
      'Canoe ride on the Rapti River to see crocodiles and aquatic birds',
      'Bird watching with over 500 species in the park',
      'Cultural performances by the Tharu community',
      'Elephant breeding center visit'
    ],
    notIncluded: [
      'Mountain experiences (located in the lowland plains)',
      'Urban entertainment and shopping',
      'Cold climate (subtropical region)'
    ]
  },
  {
    id: 'annapurna',
    name: 'Annapurna Region',
    image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd115?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2088&q=80',
    description: 'Trek through diverse landscapes from subtropical forests to high alpine terrain.',
    activities: ['Trekking', 'Hot Springs', 'Cultural Exploration', 'Photography', 'Mountain Biking'],
    region: 'North Central Nepal',
    elevation: '1,000m to 5,416m',
    bestTime: 'Mar-May, Oct-Nov',
    longDescription: 'The Annapurna Region is one of the most popular trekking destinations in Nepal, offering diverse landscapes from subtropical forests to high alpine environments. The region includes the Annapurna Conservation Area, which is the largest protected area in Nepal and home to several peaks over 7,000m, including Annapurna I (8,091m). The area is known for its cultural diversity with Hindu and Tibetan Buddhist communities and numerous ancient monasteries and temples. The famous Annapurna Circuit trek and Annapurna Base Camp trek offer some of the most spectacular mountain scenery in the world.',
    highlights: [
      'Trek the famous Annapurna Circuit or Annapurna Base Camp',
      'Cross the challenging Thorong La Pass (5,416m)',
      'Relax in natural hot springs at Jhinu Danda',
      'Experience diverse cultures from Hindu villages to Tibetan settlements',
      'Explore the beautiful Ghandruk village with stone houses and mountain views'
    ],
    notIncluded: [
      'Luxury accommodations on most trekking routes',
      'Urban entertainment',
      'Easy accessibility to all areas (requires trekking)'
    ]
  },
  {
    id: 'lumbini',
    name: 'Lumbini',
    image: 'https://images.unsplash.com/photo-1558455822-2b60144b56db?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
    description: 'Visit the birthplace of Buddha and explore sacred monasteries and gardens.',
    activities: ['Temple Visits', 'Meditation', 'Historical Sites', 'Museum Tours', 'Cycling'],
    region: 'Southern Nepal',
    bestTime: 'Year-round (Oct-Apr best)',
    longDescription: 'Lumbini, recognized as a UNESCO World Heritage Site, is the birthplace of Siddhartha Gautama, the Lord Buddha, founder of Buddhism. Located in the southwestern plains of Nepal, this spiritual site attracts Buddhist pilgrims and tourists from around the world. The sacred area contains the Mayadevi Temple marking the exact birth spot, the sacred Bodhi tree, and the sacred pool where Buddha\'s mother bathed before giving birth. The wider Lumbini complex houses monasteries and temples built by various Buddhist nations, each with distinct architectural styles reflecting their cultural heritage.',
    highlights: [
      'Visit the Mayadevi Temple marking Buddha\'s birthplace',
      'Explore monasteries built by different Buddhist nations',
      'Meditate in the peaceful Sacred Garden',
      'See the Ashoka Pillar erected by Emperor Ashoka in 249 BCE',
      'Learn about Buddhist history at the Lumbini Museum'
    ],
    notIncluded: [
      'Mountain views (located in the plains)',
      'Adventure activities',
      'Nightlife and urban entertainment',
      'Shopping experiences'
    ]
  }
];

const DestinationDetail = () => {
  const { destinationId } = useParams();
  const destination = destinations.find(d => d.id === destinationId);

  if (!destination) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="pt-16 flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-nepal-text-dark mb-4">Destination not found</h1>
            <p className="text-gray-600 mb-6">The destination you're looking for doesn't exist or has been removed.</p>
            <Link to="/destinations">
              <Button className="nepal-button-primary">Browse all destinations</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="pt-16">
        {/* Hero section */}
        <div className="relative h-[60vh] max-h-[600px]">
          <img 
            src={destination.image} 
            alt={destination.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-nepal-text-dark to-transparent"></div>
          <div className="absolute inset-0 flex items-end">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{destination.name}</h1>
              <div className="flex flex-wrap gap-2 mb-4">
                {destination.activities.map((activity, index) => (
                  <span 
                    key={index} 
                    className="text-sm bg-nepal-purple/80 text-white px-2.5 py-1 rounded-full"
                  >
                    {activity}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-6 text-white/90">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{destination.region}</span>
                </div>
                {destination.elevation && (
                  <div className="flex items-center">
                    <Mountain className="h-4 w-4 mr-1" />
                    <span>Elevation: {destination.elevation}</span>
                  </div>
                )}
                {destination.bestTime && (
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>Best Time: {destination.bestTime}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main description */}
            <div className="lg:col-span-2">
              <div className="prose max-w-none">
                <h2 className="text-2xl font-bold mb-4 text-nepal-text-dark">About {destination.name}</h2>
                <p className="text-gray-700 mb-6">{destination.longDescription}</p>
                
                {destination.highlights && (
                  <>
                    <h3 className="text-xl font-bold mb-3 text-nepal-text-dark flex items-center">
                      <Info className="h-5 w-5 mr-2 text-nepal-purple" />
                      Highlights
                    </h3>
                    <ul className="space-y-2 mb-6">
                      {destination.highlights.map((highlight, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-nepal-purple mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
                
                {destination.notIncluded && (
                  <>
                    <h3 className="text-xl font-bold mb-3 text-nepal-text-dark flex items-center">
                      <Info className="h-5 w-5 mr-2 text-nepal-purple" />
                      Not Available Here
                    </h3>
                    <ul className="space-y-2 mb-6">
                      {destination.notIncluded.map((item, index) => (
                        <li key={index} className="flex items-start">
                          <X className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </div>
            
            {/* Tours sidebar */}
            <div>
              <Card className="shadow-md p-6">
                <h3 className="text-xl font-bold mb-4 text-nepal-text-dark">Popular Tours</h3>
                <div className="space-y-4">
                  <div className="border-b pb-4">
                    <h4 className="font-medium text-nepal-text-dark mb-1">Everest Base Camp Trek</h4>
                    <div className="text-sm text-gray-600 mb-2">14 Days from $1,499</div>
                    <Link to="/tours/everest-base-camp">
                      <Button size="sm" className="mt-1 w-full">View Tour</Button>
                    </Link>
                  </div>
                  <div className="border-b pb-4">
                    <h4 className="font-medium text-nepal-text-dark mb-1">Annapurna Circuit Trek</h4>
                    <div className="text-sm text-gray-600 mb-2">12 Days from $1,299</div>
                    <Link to="/tours/annapurna-circuit">
                      <Button size="sm" className="mt-1 w-full">View Tour</Button>
                    </Link>
                  </div>
                  <div className="pb-4">
                    <h4 className="font-medium text-nepal-text-dark mb-1">Kathmandu Valley Cultural Tour</h4>
                    <div className="text-sm text-gray-600 mb-2">5 Days from $599</div>
                    <Link to="/tours/kathmandu-valley-tour">
                      <Button size="sm" className="mt-1 w-full">View Tour</Button>
                    </Link>
                  </div>
                  <Link to="/tours">
                    <Button variant="outline" className="w-full flex items-center justify-center mt-2">
                      View all tours
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </Button>
                  </Link>
                </div>
              </Card>
              
              <Card className="shadow-md p-6 mt-6">
                <h3 className="text-xl font-bold mb-4 text-nepal-text-dark">Inquire about {destination.name}</h3>
                <form>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                      <input 
                        type="text" 
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-nepal-purple focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input 
                        type="email" 
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-nepal-purple focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                      <textarea 
                        className="w-full p-2 border border-gray-300 rounded-md h-24 focus:ring-2 focus:ring-nepal-purple focus:outline-none"
                      ></textarea>
                    </div>
                    <Button className="w-full">Send Inquiry</Button>
                  </div>
                </form>
              </Card>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DestinationDetail;
