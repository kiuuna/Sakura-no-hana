# Sakura no hana

## About
Sakura no hana (桜の花) is a versatile Discord bot made by [me](https://github.com/kiuuna) that runs on my server.

The project is open-source so that you can:
- [See whats happening behind-the-scenes](https://github.com/kiuuna/Sakura-no-hana)
- [Issue a bug report](https://github.com/kiuuna/Sakura-no-hana/issues)
- [Request a specific feature](https://github.com/kiuuna/Sakura-no-hana/issues)
- Do anything the project [license](./LICENSE) allows you to
  
### Built With
- [**discord.js**](https://discord.js.org/#/)
  - [@discordjs/builders](https://www.npmjs.com/package/@discordjs/builders)
  - [@discordjs/rest](https://www.npmjs.com/package/@discordjs/rest)
  - [@discordjs/voice](https://www.npmjs.com/package/@discordjs/voice)
  - [discord-api-types](https://www.npmjs.com/package/discord-api-types)
- [**mongoDB**](https://www.mongodb.com)
  - [mongoose](https://www.npmjs.com/package/mongoose)
- [**Node.js**](https://nodejs.org/en/)
- [**JavaScript**](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
  
### Data Management
Since Sakura no hana does use a [database](https://www.mongodb.com), it also means that it takes the Discord ID of everyone that authenticates their account in the `#rules` channel. That being said, it is the only thing it takes from the users. The rest is created from that ID.

- Every user on Discord has their own unique ID which in this case is used to identify the person in the database for a number of reasons. Some of which are listed below.
  - Giving experience to the correct user.
  - Setting the users state to AFK.
  
*Users only get added to the database once they successfully authenticate their account in the `#rules` channel stating that they agree to their Discord ID being added to said database.*

## Contact
You can contact me on any social media platform which you can find [here](https://linktr.ee/kiuuna).<br>
However, I am most active on Discord at `kiuuna#0001`.
  
Repository link: https://github.com/kiuuna/Sakura-no-hana/
