const router = require('express').Router();
const { locationRelationship, prisma, VALID_TYPES, VALID_THEMES, VALID_STATES } = require('#utils/db.js');

router.get('/', async (req, res) => {
    let { type = "", theme = "", state = "", city = "", name = "", page = -1, limit = 20 } = req.query;
    const filter = {};
    const options = {
        include: locationRelationship,
    };

    type = type.toUpperCase();
    theme = theme.toUpperCase();
    state = state.toUpperCase();
    city = city.toUpperCase();
    page = parseInt(page)
    limit = parseInt(limit)

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

    if (city.length >= 1) {
        filter.city = city;
    }

    if (name.length >= 1) {
        filter.name = {
            contains: name,
        };
    }

    // add pagination
    if (page >= 1) {
        options.take = limit;
        options.skip = (page - 1) * options.take;
    }

    if (Object.keys(filter).length >= 1) {
        options.where = filter;
    }

    try {
        const [locations, total] = await prisma.$transaction([
            prisma.locations.findMany(options),
            prisma.locations.count({ where: filter })
        ]);

        res.status(200).json({
            data: locations,
            pageInfo: {
                currentPage: page,
                hasNextPage: page === -1 ? false : Math.ceil(total / limit) > page,
                totalPages: total,
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


module.exports = router;