import { IMAGE_URLS, stateAbbreviations, getCitySlug } from "@/utils/index";
import { notFound } from "next/navigation";
import LocationCard from "@/components/LocationCard/index.jsx";
import styles from "./page.module.css";

export async function generateStaticParams() {
  return Object.values(stateAbbreviations).map((abbreviation) => ({
    abbreviation: abbreviation.toLowerCase(),
  }));
}

export async function generateMetadata({ params }) {
  const { abbreviation } = await params;
  const abbr = abbreviation.toUpperCase();
  const stateFullName = Object.keys(stateAbbreviations).find(
    (state) => stateAbbreviations[state] === abbr,
  );

  const title = `Mini Golf ${stateFullName} | GolfMini`;

  return {
    title,
    description: `Explore mini golf courses across ${stateFullName} — great for date nights, weekend plans, or casual fun. Find themed layouts and unique spots to play throughout the state.`,
    openGraph: {
      title,
      description: `Explore mini golf courses across ${stateFullName}`,
      url: `https://golfmini.com/states/${abbreviation}`,
      siteName: "GolfMini",
      images: [
        {
          url: IMAGE_URLS.OG,
          width: 1200,
          height: 630,
          alt: `Mini Golf in ${stateFullName}`,
        },
      ],
    },
  };
}

async function getStateData(abbr) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/locations/state/${abbr}`,
    );
    const data = await response.json();
    return {
      glowInTheDarkLocations: data.glowInTheDarkLocations,
      indoorLocations: data.indoorLocations,
      outdoorLocations: data.outdoorLocations,
      topLocations: data.topLocations,
      cities: data.cities,
    };
  } catch (error) {
    console.error(`Error fetching data for ${abbr}:`, error);
    return {
      glowInTheDarkLocations: [],
      indoorLocations: [],
      outdoorLocations: [],
      topLocations: [],
      cities: [],
    };
  }
}

function ViewAllCard({ query }) {
  const params = new URLSearchParams(query).toString();
  const href = params ? `/?${params}` : "/";

  return (
    <a className={styles.cardLink} href={href}>
      <div className={styles.viewMoreCard}>
        <p>View All</p>
      </div>
    </a>
  );
}

export default async function Page({ params }) {
  const { abbreviation } = await params;
  const abbr = abbreviation.toUpperCase();

  const stateFullName = Object.keys(stateAbbreviations).find(
    (state) => stateAbbreviations[state] === abbr,
  );

  if (!stateFullName) {
    notFound();
  }

  const {
    glowInTheDarkLocations,
    indoorLocations,
    outdoorLocations,
    topLocations,
    cities,
  } = await getStateData(abbr);

  return (
    <>
      <main className={styles.main}>
        <header className={styles.header}>
          <h1 className={styles.title}>Mini Golf in {stateFullName}</h1>
          <p className={styles.description}>
            Explore mini golf courses across {stateFullName} — great for date
            nights, weekend plans, or casual fun. Find themed layouts and unique
            spots to play throughout the state.
          </p>
        </header>

        {Boolean(topLocations.length) && (
          <section aria-labelledby="top-picks" className={styles.section}>
            <h2 id="top-picks">Best Mini Golf in {stateFullName}</h2>
            <div className={styles.cardContainer}>
              {topLocations.map(
                ({ name, id, city, state, type, theme, photos }) => (
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
                ),
              )}
              <ViewAllCard query={{ state: abbreviation.toUpperCase() }} />
            </div>
          </section>
        )}

        {Boolean(indoorLocations.length) && (
          <section aria-labelledby="indoor" className={styles.section}>
            <h2 id="indoor">Indoor Mini Golf {stateFullName}</h2>
            <div className={styles.cardContainer}>
              {indoorLocations.map(
                ({ name, id, city, state, type, theme, photos }) => (
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
                ),
              )}
              <ViewAllCard
                query={{ state: abbreviation.toUpperCase(), type: "INDOOR" }}
              />
            </div>
          </section>
        )}

        {Boolean(outdoorLocations.length) && (
          <section aria-labelledby="outdoor" className={styles.section}>
            <h2 id="outdoor">Outdoor Mini Golf {stateFullName}</h2>
            <div className={styles.cardContainer}>
              {outdoorLocations.map(
                ({ name, id, city, state, type, theme, photos }) => (
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
                ),
              )}
              <ViewAllCard
                query={{ state: abbreviation.toUpperCase(), type: "OUTDOOR" }}
              />
            </div>
          </section>
        )}

        {Boolean(glowInTheDarkLocations.length) && (
          <section aria-labelledby="glow" className={styles.section}>
            <h2 id="glow">Glow In The Dark Mini Golf {stateFullName}</h2>
            <div className={styles.cardContainer}>
              {glowInTheDarkLocations.map(
                ({ name, id, city, state, type, theme, photos }) => (
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
                ),
              )}
              <ViewAllCard
                query={{
                  state: abbreviation.toUpperCase(),
                  theme: "GLOW_IN_THE_DARK",
                }}
              />
            </div>
          </section>
        )}

        <section aria-labelledby="cities" className={styles.section}>
          <h2>{stateFullName} Mini Golf Courses by City</h2>
          <ul className={styles.cityContainer}>
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
