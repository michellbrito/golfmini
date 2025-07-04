import { Suspense } from "react";
import { IMAGE_URLS } from "@/utils";

import Footer from "@/components/Footer";
import HomeContent from "@/components/HomeContent";
import Navbar from "@components/Navbar";

export function generateMetadata() {
  const title = "GolfMini";
  const description =
    "Find the best mini golf courses in the US with GolfMini. Explore top-rated locations, reviews, and ratings to plan your next fun outing.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: "https://golfmini.com",
      siteName: "GolfMini",
      images: [
        {
          url: IMAGE_URLS.OG,
          width: 1200,
          height: 630,
          alt: "Mini Golf in the US",
        },
      ],
    },
  };
}

export default function Home() {
  return (
    <>
      <Navbar />
      <Suspense>
        <HomeContent />
      </Suspense>
      <Footer />
    </>
  );
}
