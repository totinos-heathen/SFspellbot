exports.run = (client, message, args) => {
    message.channel.send("Type '" + client.config.prefix + "spell <spellname>' to receive the spell block.\nExample: " +
        client.config.prefix + "spell Magic Missile").catch(console.error);
}