import { stateAbbreviations, getCitySlug } from "@/utils";

export default async function sitemap() {
  const citySlugs = [];

  async function getLocations() {
    const locationsResponse = await fetch("https://api.golfmini.com/locations");
    const { data } = await locationsResponse.json();
    return data.map((location) => {
      const citySlug = `${location.state.toLocaleLowerCase()}/cities/${getCitySlug(location.city)}`;
      if (!citySlugs.includes(citySlug)) {
        citySlugs.push(citySlug);
      }
      return {
        url: `https://golfmini.com/locations/${location.id}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.9,
      };
    });
  }

  function getStates() {
    return Object.values(stateAbbreviations)
      .filter((stateAbbreviation) => stateAbbreviation !== "WY")
      .map((stateAbbreviation) => {
        return {
          url: `https://golfmini.com/states/${stateAbbreviation.toLocaleLowerCase()}`,
          lastModified: new Date(),
          changeFrequency: "monthly",
          priority: 0.8,
        };
      });
  }

  function getCities() {
    return citySlugs.map((citySlug) => {
      return {
        url: `https://golfmini.com/states/${citySlug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
      };
    });
  }

  const locations = await getLocations();
  const states = getStates();
  const cities = getCities();

  return [
    {
      url: "https://golfmini.com",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1.0,
    },
    ...locations,
    ...states,
    ...cities,
  ];
}
