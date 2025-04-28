export default async function sitemap() {
  async function getLocations() {
    const locationsResponse = await fetch("https://api.golfmini.com/locations");
    const { data } = await locationsResponse.json();
    return data.map((location) => {
      return {
        url: `https://golfmini.com/locations/${location.id}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.8,
      };
    });
  }

  const locations = await getLocations();
  return [...locations];
}
