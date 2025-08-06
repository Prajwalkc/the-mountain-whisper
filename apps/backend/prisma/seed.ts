import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seeding...");

  // Create sample destinations
  const destinations = await Promise.all([
    prisma.destination.create({
      data: {
        name: "Kathmandu",
        slug: "kathmandu",
        description:
          "Explore the ancient temples and bustling markets of Nepal's capital city.",
        image:
          "https://images.unsplash.com/photo-1588733103629-b77afe0b4342?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80",
        activities: ["Cultural Tours", "Temple Visits", "Local Cuisine"],
        region: "Central Nepal",
        bestTime: "Sep-Nov, Mar-May",
        featured: true,
      },
    }),
    prisma.destination.create({
      data: {
        name: "Pokhara",
        slug: "pokhara",
        description:
          "Experience the serene lakes and stunning mountain views in this peaceful city.",
        image:
          "https://images.unsplash.com/photo-1605146969463-896c33cd8eb4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
        activities: ["Boating", "Paragliding", "Mountain Viewing"],
        region: "Western Nepal",
        bestTime: "Oct-Apr",
        featured: true,
      },
    }),
    prisma.destination.create({
      data: {
        name: "Everest Region",
        slug: "everest",
        description:
          "Challenge yourself with a trek to the base of the world's tallest mountain.",
        image:
          "https://images.unsplash.com/photo-1501854140801-50d01698950b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1875&q=80",
        activities: ["Trekking", "Mountain Climbing", "Photography"],
        region: "Eastern Nepal",
        elevation: "3,440m to 5,545m",
        bestTime: "Mar-May, Sep-Nov",
        featured: true,
      },
    }),
    prisma.destination.create({
      data: {
        name: "Chitwan National Park",
        slug: "chitwan",
        description:
          "Encounter wildlife including rhinos and tigers in this lush national park.",
        image:
          "https://images.unsplash.com/photo-1544735716-ea9a274df10b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
        activities: ["Safari", "Bird Watching", "Canoeing"],
        region: "Southern Nepal",
        bestTime: "Oct-Mar",
        featured: true,
      },
    }),
  ]);

  // Create sample tours
  const tours = await Promise.all([
    prisma.tour.create({
      data: {
        name: "Everest Base Camp Trek",
        slug: "everest-base-camp-trek",
        description:
          "Experience the ultimate adventure with our 14-day trek to Everest Base Camp. Walk in the footsteps of legendary mountaineers and witness breathtaking Himalayan vistas.",
        image:
          "https://images.unsplash.com/photo-1501854140801-50d01698950b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1875&q=80",
        duration: "14 days",
        groupSize: "2-12 people",
        season: "Mar-May, Sep-Nov",
        price: 2499.0,
        rating: 4.9,
        difficulty: "CHALLENGING",
        category: ["Trekking", "Adventure", "Mountain"],
        highlights: [
          "Reach Everest Base Camp at 5,364m",
          "Stunning views of Everest, Lhotse, and Ama Dablam",
          "Experience Sherpa culture in Namche Bazaar",
          "Visit Tengboche Monastery",
          "Cross suspension bridges over deep gorges",
        ],
        featured: true,
      },
    }),
    prisma.tour.create({
      data: {
        name: "Annapurna Circuit Trek",
        slug: "annapurna-circuit-trek",
        description:
          "Embark on one of the world's most diverse treks, crossing the Thorong La Pass and experiencing incredible mountain scenery.",
        image:
          "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80",
        duration: "12 days",
        groupSize: "2-15 people",
        season: "Mar-May, Sep-Nov",
        price: 1899.0,
        rating: 4.8,
        difficulty: "MODERATE",
        category: ["Trekking", "Adventure", "Cultural"],
        highlights: [
          "Cross Thorong La Pass at 5,416m",
          "Visit the sacred Muktinath Temple",
          "Experience diverse landscapes and cultures",
          "Hot springs in Tatopani",
          "Panoramic mountain views",
        ],
        featured: true,
      },
    }),
    prisma.tour.create({
      data: {
        name: "Kathmandu Cultural Tour",
        slug: "kathmandu-cultural-tour",
        description:
          "Discover the rich heritage of Kathmandu Valley with visits to UNESCO World Heritage sites and traditional markets.",
        image:
          "https://images.unsplash.com/photo-1588733103629-b77afe0b4342?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80",
        duration: "3 days",
        groupSize: "1-20 people",
        season: "Year-round",
        price: 299.0,
        rating: 4.7,
        difficulty: "EASY",
        category: ["Cultural", "Heritage", "City Tour"],
        highlights: [
          "Visit Pashupatinath Temple",
          "Explore Boudhanath Stupa",
          "Discover Durbar Square",
          "Traditional Newari cuisine",
          "Local handicraft shopping",
        ],
        featured: true,
      },
    }),
    prisma.tour.create({
      data: {
        name: "Chitwan Safari Adventure",
        slug: "chitwan-safari-adventure",
        description:
          "Experience Nepal's incredible wildlife in Chitwan National Park with jungle safaris, canoe rides, and cultural programs.",
        image:
          "https://images.unsplash.com/photo-1544735716-ea9a274df10b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
        duration: "4 days",
        groupSize: "2-16 people",
        season: "Oct-Mar",
        price: 599.0,
        rating: 4.6,
        difficulty: "EASY",
        category: ["Wildlife", "Safari", "Nature"],
        highlights: [
          "Spot one-horned rhinoceros",
          "Jungle safari on elephant back",
          "Canoe ride on Rapti River",
          "Bird watching (500+ species)",
          "Tharu cultural dance",
        ],
        featured: true,
      },
    }),
    prisma.tour.create({
      data: {
        name: "Pokhara Lake & Mountains",
        slug: "pokhara-lake-mountains",
        description:
          "Relax by the serene Phewa Lake while enjoying panoramic views of the Annapurna range in Nepal's adventure capital.",
        image:
          "https://images.unsplash.com/photo-1605146969463-896c33cd8eb4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
        duration: "5 days",
        groupSize: "1-12 people",
        season: "Year-round",
        price: 799.0,
        rating: 4.5,
        difficulty: "EASY",
        category: ["Leisure", "Adventure", "Nature"],
        highlights: [
          "Sunrise from Sarangkot",
          "Boat ride on Phewa Lake",
          "Visit Peace Pagoda",
          "Paragliding adventure",
          "Davis Falls and caves",
        ],
        featured: false,
      },
    }),
  ]);

  // Create sample users
  const users = await Promise.all([
    prisma.user.create({
      data: {
        email: "john.doe@example.com",
        name: "John Doe",
        password:
          "$2b$10$rKjWnQvJz7P.kZ4xGjYvAOu0hO1L2XqF4gN5MwPvTcRbSdUeVhWxO", // password: 'password123'
        phone: "+1-555-0123",
        country: "United States",
        role: "USER",
      },
    }),
    prisma.user.create({
      data: {
        email: "sarah.wilson@example.com",
        name: "Sarah Wilson",
        password:
          "$2b$10$rKjWnQvJz7P.kZ4xGjYvAOu0hO1L2XqF4gN5MwPvTcRbSdUeVhWxO", // password: 'password123'
        phone: "+44-20-7946-0958",
        country: "United Kingdom",
        role: "USER",
      },
    }),
    prisma.user.create({
      data: {
        email: "admin@themountainwhisper.com",
        name: "Admin User",
        password:
          "$2b$10$rKjWnQvJz7P.kZ4xGjYvAOu0hO1L2XqF4gN5MwPvTcRbSdUeVhWxO", // password: 'password123'
        phone: "+977-1-4444444",
        country: "Nepal",
        role: "ADMIN",
      },
    }),
  ]);

  // Create sample reviews
  const reviews = await Promise.all([
    prisma.review.create({
      data: {
        userId: users[0].id,
        tourId: tours[0].id,
        rating: 5,
        title: "Incredible Adventure!",
        comment:
          "The Everest Base Camp trek was absolutely life-changing. Our guide was knowledgeable and the views were breathtaking. Highly recommend!",
      },
    }),
    prisma.review.create({
      data: {
        userId: users[1].id,
        tourId: tours[1].id,
        rating: 5,
        title: "Amazing Circuit Trek",
        comment:
          "The Annapurna Circuit offered such diverse landscapes and cultures. The hot springs were a perfect way to relax after long hiking days.",
      },
    }),
    prisma.review.create({
      data: {
        userId: users[0].id,
        tourId: tours[2].id,
        rating: 4,
        title: "Rich Cultural Experience",
        comment:
          "Loved exploring the temples and learning about Nepalese culture. The local food was fantastic!",
      },
    }),
  ]);

  // Create newsletter subscriptions
  await Promise.all([
    prisma.newsletter.create({
      data: {
        email: "travel@example.com",
        preferences: ["Tours", "Destinations", "Travel Tips"],
      },
    }),
    prisma.newsletter.create({
      data: {
        email: "adventure@example.com",
        preferences: ["Adventure Tours", "Trekking"],
      },
    }),
  ]);

  console.log("✅ Database seeded successfully!");
  console.log(`📊 Created:`);
  console.log(`   - ${destinations.length} destinations`);
  console.log(`   - ${tours.length} tours`);
  console.log(`   - ${users.length} users`);
  console.log(`   - ${reviews.length} reviews`);
  console.log(`   - 2 newsletter subscriptions`);
}

main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
