import LocationPage from "./location";
import { IMAGE_URLS } from "@/utils";
import { getBackground } from "@/utils";

async function fetchLocationData(id) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/locations/${id}`,
    );
    const data = await res.json();
    if (data.photos.length === 0) {
      data.photos = [getBackground(data.type, data.theme, "metadata")];
    }
    return data;
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
  return <LocationPage id={id} />;
}
