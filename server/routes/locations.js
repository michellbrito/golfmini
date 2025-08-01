const router = require("express").Router();
const zipcodes = require("zipcodes");
const {
  locationRelationship,
  prisma,
  VALID_TYPES,
  VALID_THEMES,
  VALID_STATES,
  getDistance,
} = require("#utils/db.js");
const { getGooglePhotos } = require("#utils/api.js");

router.get("/", async (req, res) => {
  let {
    type = "",
    theme = "",
    state = "",
    city = "",
    name = "",
    page = -1,
    limit = -1,
  } = req.query;
  const filter = {};
  const options = {
    include: locationRelationship,
  };

  type = type.toUpperCase();
  theme = theme.toUpperCase();
  state = state.toUpperCase();
  city = city.toUpperCase();
  page = parseInt(page);
  limit = parseInt(limit);

  // validate query params
  if (VALID_TYPES.includes(type)) {
    filter.type = type;
  }

  if (VALID_THEMES.includes(theme)) {
    filter.theme = theme;
  }

  if (VALID_STATES.includes(state)) {
    filter.state = state;
  }

  if (name.length >= 1) {
    filter.OR = [
      {
        name: {
          contains: name,
        },
      },
      {
        city: {
          contains: name,
        },
      },
    ];
  }

  if (city.length >= 1) {
    filter.city = city;
  }

  // add pagination
  if (limit >= 1) {
    options.take = limit;
    if (page >= 1) {
      options.skip = (page - 1) * options.take;
    }
  }

  if (Object.keys(filter).length >= 1) {
    options.where = filter;
  }

  try {
    const [locations, total] = await prisma.$transaction([
      prisma.locations.findMany(options),
      prisma.locations.count({ where: filter }),
    ]);

    const currentPage = page === -1 ? 1 : page;
    const totalPages =
      Math.ceil(total / limit) >= 1 ? Math.ceil(total / limit) : 1;

    res.status(200).json({
      data: locations,
      pageInfo: {
        currentPage,
        hasNextPage: currentPage < totalPages,
        totalPages,
      },
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching locations." });
  }
});

router.get("/state/:name", async (req, res) => {
  const { name } = req.params;
  const { limit = 5, city } = req.query;
  const state = name.toUpperCase();
  const filter = { state };

  if (Boolean(city)) {
    filter.city = city.replaceAll("-", " ");
  }

  try {
    const topLocations = await prisma.locations.findMany({
      where: filter,
      include: locationRelationship,
      take: Number(limit),
    });

    const usedIds = topLocations.map((loc) => loc.id);
    const glowInTheDarkLocations = await prisma.locations.findMany({
      where: { ...filter, theme: "glow_in_the_dark", id: { notIn: usedIds } },
      include: locationRelationship,
      take: Number(limit),
    });

    usedIds.push(...glowInTheDarkLocations.map((loc) => loc.id));
    const indoorLocations = await prisma.locations.findMany({
      where: { ...filter, type: "indoor", id: { notIn: usedIds } },
      include: locationRelationship,
      take: Number(limit),
    });

    usedIds.push(...indoorLocations.map((loc) => loc.id));
    const outdoorLocations = await prisma.locations.findMany({
      where: { ...filter, type: "outdoor", id: { notIn: usedIds } },
      include: locationRelationship,
      take: Number(limit),
    });

    const cities = await prisma.locations.findMany({
      where: { state },
      select: {
        city: true,
      },
      distinct: ["city"],
      orderBy: {
        city: "asc",
      },
    });

    res.status(200).json({
      glowInTheDarkLocations: !glowInTheDarkLocations
        ? []
        : glowInTheDarkLocations,
      indoorLocations: !indoorLocations ? [] : indoorLocations,
      outdoorLocations: !outdoorLocations ? [] : outdoorLocations,
      topLocations: !topLocations ? [] : topLocations,
      cities: !cities ? [] : cities.map(({ city }) => city),
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the location." });
  }
});

router.get("/nearby", async (req, res) => {
  try {
    const { zipcode, state, limit = 6 } = req.query;
    const limitNum = Math.max(1, Number(limit) || 6);
    if (!zipcode || !state) {
      return res.status(400).json({ error: "Missing zipcode or state" });
    }

    const loc = zipcodes.lookup(zipcode);
    if (!loc) {
      return res.status(400).json({ error: "Invalid zipcode" });
    }
    const { latitude, longitude } = loc;

    const locations = await prisma.locations.findMany({
      where: { state },
      include: locationRelationship,
    });

    const nearby = locations
      .map((l) => {
        const z = zipcodes.lookup(l.zipcode);
        return {
          ...l,
          distance: getDistance(z.latitude, z.longitude, latitude, longitude),
        };
      })
      .sort((a, b) => a.distance - b.distance)
      .slice(0, limitNum);

    res.status(200).json(nearby);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the location." });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const location = await prisma.locations.findUnique({
      where: { id: parseInt(id) },
      include: locationRelationship,
    });

    if (!location) {
      return res.status(404).json({ error: "Location not found" });
    }

    const cities = await prisma.locations.findMany({
      where: { state: location.state },
      select: {
        city: true,
      },
      distinct: ["city"],
      orderBy: {
        city: "asc",
      },
    });

    if (location.photos.length === 0) {
      const photos = await getGooglePhotos(location);
      if (photos.length) {
        location.photos = photos;
        await prisma.photos.createMany({
          data: photos.map((photo) => ({
            url: photo.url,
            locationId: location.id,
          })),
        });
      }
    }

    res.status(200).json({
      location,
      cities: !cities ? [] : cities.map(({ city }) => city),
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the location." });
  }
});

module.exports = router;
