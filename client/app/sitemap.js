import { stateAbbreviations } from "@/utils";

export default async function sitemap() {
  async function getLocations() {
    const locationsResponse = await fetch("https://api.golfmini.com/locations");
    const { data } = await locationsResponse.json();
    return data.map((location) => {
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

  const locations = await getLocations();
  const states = getStates();
  return [
    {
      url: "https://golfmini.com",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1.0,
    },
    ...locations,
    ...states,
  ];
}
