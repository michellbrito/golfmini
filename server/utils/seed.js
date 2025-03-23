function transformGoogleHours(googleHours, locationId) {
    return googleHours.map(dayString => {
        if (!dayString) return null;

        let [day, hours] = dayString.split(': ');
        hours = hours.split('–');

        if (!hours || hours === 'Closed') {
            return {
                day,
                openTime: "CLOSED",
                closeTime: "CLOSED"
            };
        }

        let openTime = Boolean(hours[0]) ? hours[0].trim().toUpperCase() : "CLOSED";
        let closeTime = Boolean(hours[1]) ? hours[1].trim().toUpperCase() : "CLOSED";

        if (openTime !== "CLOSED" && !openTime.includes('AM') && !openTime.includes('PM')) {
            openTime = openTime.includes('12:') || !openTime.includes('AM') && !openTime.includes('PM') ? `${openTime} PM` : `${openTime} AM`;
        }

        if (closeTime !== "CLOSED" && !closeTime.includes('AM') && !closeTime.includes('PM')) {
            closeTime = `${closeTime} PM`;
        }

        return {
            day,
            openTime,
            closeTime,
            locationId
        };
    }).filter(Boolean);
}

const getAllLocationIds = async () => {
    const response = await fetch('http://localhost:3001/locations');
    const { data } = await response.json();
    return data.map(location => location.id);
};

const seedLocation = async (locationId) => {
    try {
        const response = await fetch('http://localhost:3001/seeds', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: locationId })
        });

        console.log(`Location ${locationId} seeded:`, await response.text());
    } catch (error) {
        console.error(`Error seeding location ${locationId}:`, error);
    }
};

const seedAllLocations = async () => {
    const locationIds = await getAllLocationIds();
    console.log(`Found ${locationIds.length} locations to seed`);

    for (const id of locationIds) {
        await seedLocation(id);
    }

    console.log('Seeding complete!');
};

module.exports = {
    transformGoogleHours
};