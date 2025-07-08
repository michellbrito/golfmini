import { IMAGE_URLS, getBackground } from "@/utils";
import Footer from "@/components/Footer";
import Location from "./location";
import Navbar from "@components/Navbar";

async function fetchLocationData(id) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/locations/${id}`,
    );
    const { location } = await res.json();
    if (location.photos.length === 0) {
      location.photos = [
        getBackground(location.type, location.theme, "metadata"),
      ];
    }
    return location;
  } catch (error) {
    return {
      name: "Location Not Found",
      photos: [IMAGE_URLS.OG],
    };
  }
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const data = await fetchLocationData(id);

  return {
    title: data.name,
    openGraph: {
      title: data.name,
      description: `${data.street}, ${data.city}, ${data.state} ${data.zipcode}`,
      url: `https://golfmini.com/locations/${id}`,
      siteName: "GolfMini",
      images: [
        {
          url: data.photos[0],
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}

export default async function Page({ params }) {
  const { id } = await params;
  return (
    <>
      <Navbar />
      <Location id={id} />
      <Footer />
    </>
  );
}
