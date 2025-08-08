module.exports = {
  getGooglePhotos: async function (location) {
    try {
      const address = `${location.street}, ${location.city}, ${location.state} ${location.zipcode}`;
      const placeResult = await fetch(
        "https://places.googleapis.com/v1/places:searchText",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Goog-Api-Key": process.env.GOOGLE_API_KEY,
            "X-Goog-FieldMask": ["places.id", "places.photos"],
          },
          body: JSON.stringify({
            textQuery: `${location.name} ${address}`,
          }),
        }
      );

      const { places } = await placeResult.json();
      if (!places || places.length === 0) {
        return res.status(404).json({ error: "Google Place not found" });
      }

      let selectedPlace = null;
      for (let place of places) {
        if (place?.photos && place.photos.length > 0) {
          selectedPlace = place;
          break;
        }
      }
      
      if (!selectedPlace) {
        selectedPlace = places[0];
      }
      
      const photos =
        selectedPlace?.photos?.slice(0, 5).map((photo) => {
          return {
            url: `https://places.googleapis.com/v1/${photo.name}/media?maxWidthPx=800&key=${process.env.GOOGLE_API_KEY}`,
          };
        }) ?? [];

      return photos;
    } catch (error) {
      console.error(error.response?.data || error);
      res.status(500).json({ error: "Failed to fetch Google photos." });
    }
  },

  saveImageFromUrlToCloudflare: async function (url) {
    const FormData = require("form-data");
    const axios = require("axios");
    const form = new FormData();
    form.append("url", url);
    try {
      const cloudflareRes = await axios.post(
        `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/images/v1`,
        form,
        {
          headers: {
            ...form.getHeaders(),
            Authorization: `Bearer ${process.env.CLOUDFLARE_API_TOKEN}`,
          },
        }
      );
      return cloudflareRes?.data?.result?.variants[0] ?? null;
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to upload image to Cloudflare." });
    }
  },
};
