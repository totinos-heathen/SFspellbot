exports.run = (client, message, args) => {
    message.channel.send("Returns spell descriptions for Starfinder.\n" +
        "Made by Ada, message me at totinos.heathen@gmail.com\nVersion " + client.package.version).catch(console.error);
}