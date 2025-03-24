"use client";

// libs
import { Suspense } from "react";

// components
import Navbar from "@components/Navbar";
import Footer from "@/components/Footer";
import HomeContent from "@/components/HomeContent";

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
