"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchDestinations = exports.searchTours = exports.filterDestinationsByRegion = exports.filterToursByCategory = exports.getTourById = exports.getDestinationById = exports.getFeaturedTravelTips = exports.getFeaturedTours = exports.getFeaturedDestinations = exports.faqs = exports.travelTips = exports.testimonials = exports.tours = exports.destinations = void 0;
// Mock data
exports.destinations = [
    {
        id: "kathmandu",
        name: "Kathmandu",
        image: "https://images.unsplash.com/photo-1588733103629-b77afe0b4342?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80",
        description: "Explore the ancient temples and bustling markets of Nepal's capital city.",
        activities: ["Cultural Tours", "Temple Visits", "Local Cuisine"],
        region: "Central Nepal",
        bestTime: "Sep-Nov, Mar-May",
        featured: true,
    },
    {
        id: "pokhara",
        name: "Pokhara",
        image: "https://images.unsplash.com/photo-1605146969463-896c33cd8eb4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
        description: "Experience the serene lakes and stunning mountain views in this peaceful city.",
        activities: ["Boating", "Paragliding", "Mountain Viewing"],
        region: "Western Nepal",
        bestTime: "Oct-Apr",
        featured: true,
    },
    {
        id: "everest",
        name: "Everest Region",
        image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1875&q=80",
        description: "Challenge yourself with a trek to the base of the world's tallest mountain.",
        activities: ["Trekking", "Mountain Climbing", "Photography"],
        region: "Eastern Nepal",
        elevation: "3,440m to 5,545m",
        bestTime: "Mar-May, Sep-Nov",
        featured: true,
    },
    {
        id: "chitwan",
        name: "Chitwan National Park",
        image: "https://images.unsplash.com/photo-1544735716-ea9a274df10b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
        description: "Encounter wildlife including rhinos and tigers in this lush national park.",
        activities: ["Safari", "Bird Watching", "Canoeing"],
        region: "Southern Nepal",
        bestTime: "Oct-Mar",
        featured: true,
    },
    {
        id: "annapurna",
        name: "Annapurna Region",
        image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd115?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2088&q=80",
        description: "Trek through diverse landscapes from subtropical forests to high alpine terrain.",
        activities: ["Trekking", "Hot Springs", "Cultural Exploration"],
        region: "North Central Nepal",
        elevation: "1,000m to 5,416m",
        bestTime: "Mar-May, Oct-Nov",
    },
    {
        id: "lumbini",
        name: "Lumbini",
        image: "https://images.unsplash.com/photo-1558455822-2b60144b56db?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
        description: "Visit the birthplace of Buddha and explore sacred monasteries and gardens.",
        activities: ["Temple Visits", "Meditation", "Historical Sites"],
        region: "Southern Nepal",
        bestTime: "Year-round (Oct-Apr best)",
    },
];
exports.tours = [
    {
        id: "everest-base-camp",
        name: "Everest Base Camp Trek",
        image: "https://images.unsplash.com/photo-1501554728187-ce583db33af7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1973&q=80",
        duration: "14 Days",
        groupSize: "2-12 People",
        season: "Mar-May, Sep-Nov",
        price: 1499,
        rating: 4.9,
        description: "Trek to the base of the world's tallest mountain through stunning Sherpa villages and breathtaking landscapes.",
        category: ["trekking", "adventure", "mountain"],
        difficulty: "Challenging",
        featured: true,
        highlights: [
            "Everest Base Camp",
            "Sherpa Culture",
            "Himalayan Views",
            "Kala Patthar",
        ],
    },
    {
        id: "annapurna-circuit",
        name: "Annapurna Circuit Trek",
        image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd115?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2088&q=80",
        duration: "12-18 Days",
        groupSize: "2-10 People",
        season: "Mar-May, Sep-Dec",
        price: 1299,
        rating: 4.8,
        description: "A classic Himalayan trek through diverse landscapes and traditional mountain communities.",
        category: ["trekking", "adventure", "mountain"],
        difficulty: "Moderate",
        featured: true,
        highlights: [
            "Thorong La Pass",
            "Muktinath Temple",
            "Diverse Landscapes",
            "Local Culture",
        ],
    },
    {
        id: "langtang-valley",
        name: "Langtang Valley Trek",
        image: "https://images.unsplash.com/photo-1432958576632-8a39f6b97dc7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2053&q=80",
        duration: "7 Days",
        groupSize: "1-8 People",
        season: "Year-round (Best: Mar-May, Sep-Nov)",
        price: 799,
        rating: 4.7,
        description: "Explore the beautiful Langtang Valley with views of snow-capped peaks and rich local culture.",
        category: ["trekking", "cultural", "mountain"],
        difficulty: "Moderate",
        highlights: [
            "Langtang Valley",
            "Tamang Culture",
            "Mountain Views",
            "Kyanjin Gompa",
        ],
    },
    {
        id: "kathmandu-valley-tour",
        name: "Kathmandu Valley Cultural Tour",
        image: "https://images.unsplash.com/photo-1469476396928-b7e238675b19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
        duration: "5 Days",
        groupSize: "1-15 People",
        season: "Year-round",
        price: 599,
        rating: 4.6,
        description: "Discover the rich cultural heritage of Kathmandu Valley with visits to UNESCO World Heritage Sites.",
        category: ["cultural", "sightseeing", "heritage"],
        difficulty: "Easy",
        featured: true,
        highlights: [
            "Pashupatinath Temple",
            "Boudhanath Stupa",
            "Durbar Squares",
            "Local Markets",
        ],
    },
    {
        id: "chitwan-safari",
        name: "Chitwan National Park Safari",
        image: "https://images.unsplash.com/photo-1540247110674-31e928ee852a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
        duration: "3 Days",
        groupSize: "1-10 People",
        season: "Oct-Mar",
        price: 449,
        rating: 4.8,
        description: "Experience wildlife including rhinos, tigers, and elephants in Nepal's first national park.",
        category: ["wildlife", "safari", "nature"],
        difficulty: "Easy",
        highlights: [
            "Rhino Spotting",
            "Jungle Safari",
            "Tharu Culture",
            "Bird Watching",
        ],
    },
    {
        id: "pokhara-leisure",
        name: "Pokhara Leisure Break",
        image: "https://images.unsplash.com/photo-1565378435245-4308658a67fc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
        duration: "4 Days",
        groupSize: "1-4 People",
        season: "Year-round",
        price: 399,
        rating: 4.5,
        description: "Relax in the scenic lake city of Pokhara with mountain views, boat rides, and optional adventure activities.",
        category: ["leisure", "scenic", "relaxation"],
        difficulty: "Easy",
        highlights: [
            "Phewa Lake",
            "Mountain Views",
            "Sarangkot Sunrise",
            "Peace Pagoda",
        ],
    },
];
exports.testimonials = [
    {
        id: 1,
        name: "Emily Johnson",
        country: "USA",
        avatar: "https://randomuser.me/api/portraits/women/65.jpg",
        rating: 5,
        text: "My trip to Everest Base Camp was the adventure of a lifetime! The guides were extremely knowledgeable and the views were breathtaking. Highly recommend this service for anyone looking to explore Nepal.",
    },
    {
        id: 2,
        name: "Marco Rossi",
        country: "Italy",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
        rating: 5,
        text: "The Annapurna Circuit trek was amazing. Everything was well-organized from start to finish. The local guides shared fascinating cultural insights that made the experience even richer.",
    },
    {
        id: 3,
        name: "Sarah Zhang",
        country: "Australia",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg",
        rating: 4,
        text: "Exploring Kathmandu and Pokhara through this service was fantastic. The accommodations were comfortable and the itinerary perfectly balanced culture, adventure, and relaxation.",
    },
];
exports.travelTips = [
    {
        id: "best-time-visit-nepal",
        title: "Best Time to Visit Nepal",
        excerpt: "Discover the optimal seasons for your Nepal adventure based on weather, festivals, and activities.",
        content: "Nepal offers different experiences throughout the year...",
        image: "https://images.unsplash.com/photo-1544735716-ea9a274df10b?ixlib=rb-4.0.3",
        category: "Planning",
        readTime: "5 min read",
        publishedAt: "2024-01-15",
        featured: true,
    },
    {
        id: "trekking-essentials",
        title: "Essential Gear for Trekking in Nepal",
        excerpt: "Complete packing checklist for your Himalayan adventure.",
        content: "Proper gear is crucial for a safe and comfortable trek...",
        image: "https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3",
        category: "Trekking",
        readTime: "8 min read",
        publishedAt: "2024-01-10",
        featured: true,
    },
    {
        id: "cultural-etiquette",
        title: "Cultural Etiquette in Nepal",
        excerpt: "Respect local customs and traditions during your visit.",
        content: "Understanding Nepali culture enhances your travel experience...",
        image: "https://images.unsplash.com/photo-1469476396928-b7e238675b19?ixlib=rb-4.0.3",
        category: "Culture",
        readTime: "6 min read",
        publishedAt: "2024-01-05",
    },
];
exports.faqs = [
    {
        question: "What is the best time to visit Nepal?",
        answer: "The best time to visit Nepal is during autumn (September-November) and spring (March-May). These seasons offer clear mountain views, pleasant weather, and are ideal for trekking.",
    },
    {
        question: "Do I need a visa to visit Nepal?",
        answer: "Most nationalities can obtain a visa on arrival at Tribhuvan International Airport or apply online. Tourist visas are available for 15, 30, or 90 days.",
    },
    {
        question: "What should I pack for trekking in Nepal?",
        answer: "Essential items include warm clothing, waterproof jacket, good trekking boots, sleeping bag, first aid kit, water purification tablets, and sun protection.",
    },
    {
        question: "Is it safe to travel solo in Nepal?",
        answer: "Nepal is generally safe for solo travelers. However, it's recommended to trek with a guide or group, especially in remote areas. Always inform someone of your itinerary.",
    },
    {
        question: "What is the currency used in Nepal?",
        answer: "The official currency is the Nepalese Rupee (NPR). US dollars are widely accepted, and ATMs are available in major cities. Credit cards are accepted in hotels and restaurants.",
    },
];
// Utility functions
const getFeaturedDestinations = () => {
    return exports.destinations.filter((dest) => dest.featured);
};
exports.getFeaturedDestinations = getFeaturedDestinations;
const getFeaturedTours = () => {
    return exports.tours.filter((tour) => tour.featured);
};
exports.getFeaturedTours = getFeaturedTours;
const getFeaturedTravelTips = () => {
    return exports.travelTips.filter((tip) => tip.featured);
};
exports.getFeaturedTravelTips = getFeaturedTravelTips;
const getDestinationById = (id) => {
    return exports.destinations.find((dest) => dest.id === id);
};
exports.getDestinationById = getDestinationById;
const getTourById = (id) => {
    return exports.tours.find((tour) => tour.id === id);
};
exports.getTourById = getTourById;
// Filter functions
const filterToursByCategory = (category) => {
    if (category === "All")
        return exports.tours;
    return exports.tours.filter((tour) => tour.category.includes(category.toLowerCase()));
};
exports.filterToursByCategory = filterToursByCategory;
const filterDestinationsByRegion = (region) => {
    if (region === "All Regions")
        return exports.destinations;
    return exports.destinations.filter((dest) => dest.region === region);
};
exports.filterDestinationsByRegion = filterDestinationsByRegion;
const searchTours = (query) => {
    const lowercaseQuery = query.toLowerCase();
    return exports.tours.filter((tour) => tour.name.toLowerCase().includes(lowercaseQuery) ||
        tour.description.toLowerCase().includes(lowercaseQuery) ||
        tour.category.some((cat) => cat.toLowerCase().includes(lowercaseQuery)));
};
exports.searchTours = searchTours;
const searchDestinations = (query) => {
    const lowercaseQuery = query.toLowerCase();
    return exports.destinations.filter((dest) => dest.name.toLowerCase().includes(lowercaseQuery) ||
        dest.description.toLowerCase().includes(lowercaseQuery) ||
        dest.activities.some((activity) => activity.toLowerCase().includes(lowercaseQuery)));
};
exports.searchDestinations = searchDestinations;
