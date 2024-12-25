const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
    VALID_TYPES: ['INDOOR', 'OUTDOOR'],
    VALID_THEMES: ['CASTLE', 'GLOW_IN_THE_DARK', 'PIRATE', 'JUNGLE'],
    VALID_STATES: ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'],
    locationRelationship: {
        photos: {
            select: {
                url: true
            }
        },
        hours: {
            select: {
                day: true,
                openTime: true,
                closeTime: true
            }
        }
    },
    prisma
};