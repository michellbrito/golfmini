"use client";

// libs
import { Suspense } from "react";

// components
import Navbar from "@components/Navbar";
import Footer from "@/components/Footer";
import HomeContent from "@/components/HomeContent";

export default function Home() {
  return (
    <Suspense>
      <Navbar />
      <Suspense>
        <HomeContent />
      </Suspense>
      <Footer />
    </Suspense>
  );
}
