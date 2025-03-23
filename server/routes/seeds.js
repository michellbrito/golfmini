const router = require('express').Router();
const { locationRelationship, prisma } = require('#utils/db.js');
const { transformGoogleHours } = require('#utils/seed.js');

router.post('/', async (req, res) => {
    const { id } = req.body;
    try {
        const location = await prisma.locations.findUnique({
            where: { id },
            include: locationRelationship,
        });

        const placeResult = await fetch('https://places.googleapis.com/v1/places:searchText', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Goog-Api-Key': process.env.GOOGLE_API_KEY,
                'X-Goog-FieldMask': ['places.currentOpeningHours'],
            },
            body: JSON.stringify({
                textQuery: `${location.name} ${location.zipcode}`,
            }),
        })

        const { places } = await placeResult.json();

        await prisma.businessHours.createMany({
            data: transformGoogleHours(places[0].currentOpeningHours.weekdayDescriptions, id),
        });

        res.status(200).send('Location seeded successfully');
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'An error occurred while adding the location.' });
    }
});


module.exports = router;