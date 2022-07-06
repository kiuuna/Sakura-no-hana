const { Voice } = require("@discordjs/voice");

// db
const mongoose = require("mongoose");


module.exports = {
    name: "voiceStateUpdate",
    execute(oldState, newState, client) {
        const newMemberChannel = newState.channel;
        const oldMemberChannel = oldState.channel;

        console.log(newMemberChannel);
        
        // Check if the member joined a vc
        if (oldMemberChannel === null && newMemberChannel !== null) {
            // ...
        }

        // Check if the member left a vc
        if (oldMemberChannel !== null && newMemberChannel === null) {
            // ...
        }
    }
}