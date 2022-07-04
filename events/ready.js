const mongoose = require("mongoose");
const { db } = require("../config.json");

module.exports = {
    name: "ready",
    once: true,
    async execute(client) {
        const count = client.guilds.cache.map((g) => g.memberCount).reduce((a, c) => a + c);
        const date = new Date();

        client.user.setPresence({
            activities: [{
                name: `${count} members`,
                type: "WATCHING"
            }],
            status: "dnd"
        });

        // Connect to the db
        await mongoose.connect(db, {})
        .then(() => {
            console.log("Successfully connected to the db.");
        })
        .catch((error) => {
            console.error(`Unable to connect to the db, ${error}.`);
        });

        console.log(`${date.toUTCString()} (/) ${client.user.tag} is online`);
    }
}