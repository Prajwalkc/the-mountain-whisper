import { useEffect } from "react";
import type { Tour, Destination } from "@/lib/types";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: "website" | "article" | "product";
  structuredData?: object;
}

const SEOHead: React.FC<SEOProps> = ({
  title = "The Mountain Whisper - Your Complete Nepal Travel Planner",
  description = "Plan your perfect trip to Nepal with The Mountain Whisper. Discover mountain treks, cultural tours, adventure activities, and more!",
  keywords = "Nepal travel, Everest trekking, Annapurna circuit, Kathmandu tours, Nepal adventure, Himalayan trekking, Nepal cultural tours",
  image = "https://images.unsplash.com/photo-1542359649-31e03cd4d909?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
  url = window.location.href,
  type = "website",
  structuredData,
}) => {
  useEffect(() => {
    // Update document title
    document.title = title;

    // Update or create meta tags
    const updateMetaTag = (property: string, content: string) => {
      let element = document.querySelector(
        `meta[property="${property}"], meta[name="${property}"]`
      );
      if (!element) {
        element = document.createElement("meta");
        if (property.startsWith("og:") || property.startsWith("twitter:")) {
          element.setAttribute("property", property);
        } else {
          element.setAttribute("name", property);
        }
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    };

    // Basic meta tags
    updateMetaTag("description", description);
    updateMetaTag("keywords", keywords);

    // Open Graph tags
    updateMetaTag("og:title", title);
    updateMetaTag("og:description", description);
    updateMetaTag("og:image", image);
    updateMetaTag("og:url", url);
    updateMetaTag("og:type", type);
    updateMetaTag("og:site_name", "The Mountain Whisper");

    // Twitter Card tags
    updateMetaTag("twitter:card", "summary_large_image");
    updateMetaTag("twitter:title", title);
    updateMetaTag("twitter:description", description);
    updateMetaTag("twitter:image", image);
    updateMetaTag("twitter:site", "@mountain_whisper");

    // Additional SEO tags
    updateMetaTag("author", "The Mountain Whisper");
    updateMetaTag("robots", "index, follow");
    updateMetaTag("viewport", "width=device-width, initial-scale=1.0");

    // Structured data
    if (structuredData) {
      let structuredDataElement = document.querySelector(
        "#structured-data"
      ) as HTMLScriptElement;
      if (!structuredDataElement) {
        structuredDataElement = document.createElement(
          "script"
        ) as HTMLScriptElement;
        structuredDataElement.id = "structured-data";
        structuredDataElement.type = "application/ld+json";
        document.head.appendChild(structuredDataElement);
      }
      structuredDataElement.textContent = JSON.stringify(structuredData);
    }

    // Canonical URL
    let canonicalElement = document.querySelector(
      'link[rel="canonical"]'
    ) as HTMLLinkElement;
    if (!canonicalElement) {
      canonicalElement = document.createElement("link");
      canonicalElement.rel = "canonical";
      document.head.appendChild(canonicalElement);
    }
    canonicalElement.href = url;
  }, [title, description, keywords, image, url, type, structuredData]);

  return null;
};

export default SEOHead;

// Predefined structured data templates
export const createTourStructuredData = (tour: Tour) => ({
  "@context": "https://schema.org",
  "@type": "TouristTrip",
  name: tour.name,
  description: tour.description,
  image: tour.image,
  touristType: "Adventure Traveler",
  itinerary: {
    "@type": "ItemList",
    name: `${tour.name} Itinerary`,
    numberOfItems: parseInt(tour.duration) || 1,
  },
  offers: {
    "@type": "Offer",
    price: tour.price,
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
    validFrom: new Date().toISOString(),
    category: tour.category?.join(", "),
  },
  provider: {
    "@type": "Organization",
    name: "The Mountain Whisper",
    url: "https://themountainwhisper.com",
  },
  aggregateRating: tour.rating
    ? {
        "@type": "AggregateRating",
        ratingValue: tour.rating,
        bestRating: "5",
        worstRating: "1",
        ratingCount: "100",
      }
    : undefined,
});

export const createDestinationStructuredData = (destination: Destination) => ({
  "@context": "https://schema.org",
  "@type": "TouristDestination",
  name: destination.name,
  description: destination.description,
  image: destination.image,
  geo: destination.region
    ? {
        "@type": "GeoCoordinates",
        addressRegion: destination.region,
      }
    : undefined,
  touristType: destination.activities?.join(", "),
  includesAttraction: destination.activities?.map((activity: string) => ({
    "@type": "TouristAttraction",
    name: activity,
  })),
});
