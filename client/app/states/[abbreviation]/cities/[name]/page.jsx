import { IMAGE_URLS, stateAbbreviations, getCitySlug } from "@/utils/index";
import { notFound } from "next/navigation";
import LocationCard from "@/components/LocationCard/index.jsx";
import stateStyles from "@/app/states/[abbreviation]/page.module.css";
import styles from "./page.module.css";
import { Breadcrumb } from "@chakra-ui/react";

function getCityName(city) {
  return city
    .replace(/\b\w/g, (char) => char.toUpperCase())
    .replaceAll("-", " ");
}

export async function generateMetadata({ params }) {
  const { abbreviation, name } = await params;
  const state = abbreviation.toUpperCase();
  const city = getCityName(name);
  const title = `Mini Golf ${city} ${state} | GolfMini`;
  const description = `Discover mini golf courses in ${city}, ${state}`;

  return {
    title,
    description: `${description} — perfect for casual
            fun, date nights, or family outings. Browse nearby locations and
            plan your visit`,
    openGraph: {
      title,
      description,
      url: `https://golfmini.com/states/${abbreviation.toLowerCase()}/cities/${getCitySlug(name)}}`,
      siteName: "GolfMini",
      images: [
        {
          url: IMAGE_URLS.OG,
          width: 1200,
          height: 630,
          alt: `Mini Golf in ${city} ${state}`,
        },
      ],
    },
  };
}

async function getData(state, city) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/locations/state/${state}?city=${city}&limit=9999`,
    );
    const data = await response.json();
    return {
      locations: data.topLocations,
      cities: data.cities,
    };
  } catch (error) {
    console.error(`Error fetching data for ${abbr}:`, error);
    return {
      locations: [],
      cities: [],
    };
  }
}

export default async function Page({ params }) {
  const { abbreviation, name } = await params;
  const state = abbreviation.toUpperCase();
  const city = getCityName(name);
  const stateFullName = Object.keys(stateAbbreviations).find(
    (state) => stateAbbreviations[state] === abbreviation.toUpperCase(),
  );

  if (!stateFullName) {
    notFound();
  }

  const { locations, cities } = await getData(state, name);

  const isCityReal = cities.includes(city);
  if (!isCityReal) {
    notFound();
  }

  return (
    <>
      <main className={styles.main}>
        <Breadcrumb.Root variant={"plain"} size={"lg"}>
          <Breadcrumb.List>
            <Breadcrumb.Item>
              <Breadcrumb.Link
                href="/"
                color={"#685752"}
                _hover={{ color: "#fdf7f4" }}
                fontWeight={500}
              >
                Home
              </Breadcrumb.Link>
            </Breadcrumb.Item>
            <Breadcrumb.Separator color={"red"} />
            <Breadcrumb.Item>
              <Breadcrumb.Link
                color={"#685752"}
                _hover={{ color: "#fdf7f4" }}
                fontWeight={500}
                href={`/states/${abbreviation.toLowerCase()}`}
              >
                {state}
              </Breadcrumb.Link>
            </Breadcrumb.Item>
            <Breadcrumb.Separator color={"red"} />
            <Breadcrumb.Item>
              <Breadcrumb.CurrentLink fontWeight={500}>
                {city}
              </Breadcrumb.CurrentLink>
            </Breadcrumb.Item>
          </Breadcrumb.List>
        </Breadcrumb.Root>
        <header className={stateStyles.header}>
          <h1 className={stateStyles.title}>
            Mini Golf {city} {state}
          </h1>
          <p className={stateStyles.description}>
            Discover mini golf courses in {city}, {state}— perfect for casual
            fun, date nights, or family outings. Browse nearby locations and
            plan your visit
          </p>
        </header>

        {Boolean(locations.length) && (
          <div className={styles.cardContainer}>
            {locations.map(({ name, id, city, state, type, theme, photos }) => (
              <a
                href={`/locations/${id}`}
                target="_blank"
                className={styles.cardLink}
                key={id}
              >
                <LocationCard
                  location={{
                    name,
                    id,
                    city,
                    state,
                    type,
                    theme,
                    photos,
                  }}
                />
              </a>
            ))}
          </div>
        )}

        <section aria-labelledby="cities" className={stateStyles.section}>
          <h2>{stateFullName} Mini Golf Courses by City</h2>
          <ul className={stateStyles.cityContainer}>
            {cities.map((city) => (
              <li key={city}>
                <a
                  href={`/states/${abbreviation.toLowerCase()}/cities/${getCitySlug(city)}`}
                >
                  Mini Golf {city} {abbreviation.toUpperCase()}
                </a>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </>
  );
}
