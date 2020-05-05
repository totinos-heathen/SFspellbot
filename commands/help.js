exports.run = (client, message, args) => {
    message.channel.send("Type '" + client.config.prefix + "spell <spellname>' to receive the spell description.\nExample: " +
        client.config.prefix + "spell Magic Missile" + 
        "\nType '" + client.config.prefix + "info' to receive information about this bot and creator.").catch(console.error);
}