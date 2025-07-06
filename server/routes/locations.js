const router = require('express').Router();
const { locationRelationship, prisma, VALID_TYPES, VALID_THEMES, VALID_STATES } = require('#utils/db.js');

router.get('/', async (req, res) => {
    let { type = "", theme = "", state = "", city = "", name = "", page = -1, limit = -1 } = req.query;
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
                }
            },
            {
                city: {
                    contains: name,
                }
            }
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
            prisma.locations.count({ where: filter })
        ]);

        const currentPage = page === -1 ? 1 : page;
        const totalPages = Math.ceil(total / limit) >= 1 ? Math.ceil(total / limit) : 1;

        res.status(200).json({
            data: locations,
            pageInfo: {
                currentPage,
                hasNextPage: currentPage < totalPages,
                totalPages,
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching locations.' });
    }
})


router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const location = await prisma.locations.findUnique({
            where: { id: parseInt(id) },
            include: locationRelationship,
        });

        if (!location) {
            return res.status(404).json({ error: 'Location not found' });
        }

        res.status(200).json(location);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching the location.' });
    }
});

router.get('/state/:name', async (req, res) => {
    const { name } = req.params;
    const { limit = 5, city } = req.query;
    const state = name.toUpperCase();
    const filter = { state };

    if (Boolean(city)) {
        filter.city = city.replaceAll('-', ' ');
    }

    try {
        const topLocations = await prisma.locations.findMany({
            where: filter,
            include: locationRelationship,
            take: Number(limit)
        });

        const usedIds = topLocations.map(loc => loc.id);
        const glowInTheDarkLocations = await prisma.locations.findMany({
            where: { ...filter, theme: 'glow_in_the_dark', id: { notIn: usedIds } },
            include: locationRelationship,
            take: Number(limit)
        });

        usedIds.push(...glowInTheDarkLocations.map(loc => loc.id));
        const indoorLocations = await prisma.locations.findMany({
            where: { ...filter, type: 'indoor', id: { notIn: usedIds } },
            include: locationRelationship,
            take: Number(limit)
        });

        usedIds.push(...indoorLocations.map(loc => loc.id));
        const outdoorLocations = await prisma.locations.findMany({
            where: { ...filter, type: 'outdoor', id: { notIn: usedIds } },
            include: locationRelationship,
            take: Number(limit)
        });

        const cities = await prisma.locations.findMany({
            where: { state },
            select: {
                city: true
            },
            distinct: ['city'],
            orderBy: {
                city: 'asc'
            }
        });

        res.status(200).json({
            glowInTheDarkLocations: !glowInTheDarkLocations ? [] : glowInTheDarkLocations,
            indoorLocations: !indoorLocations ? [] : indoorLocations,
            outdoorLocations: !outdoorLocations ? [] : outdoorLocations,
            topLocations: !topLocations ? [] : topLocations,
            cities: !cities ? [] : cities.map(({ city }) => city),
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching the location.' });
    }
});

module.exports = router;