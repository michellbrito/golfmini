import styles from "./index.module.css";
import { stateAbbreviations, getCitySlug } from "@/utils/index";

export default function CitiesList({ cities, state, className }) {
  return (
    <section
      aria-labelledby="cities"
      className={`${styles.section} ${className || ""}`}
    >
      <h2>{state} Mini Golf Courses by City</h2>
      <ul className={styles.container}>
        {cities.map((city) => (
          <li key={city}>
            <a
              href={`/states/${stateAbbreviations[state].toLowerCase()}/cities/${getCitySlug(city)}`}
            >
              Mini Golf {city} {stateAbbreviations[state].toUpperCase()}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
