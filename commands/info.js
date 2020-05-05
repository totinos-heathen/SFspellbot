exports.run = (client, message, args) => {
    message.channel.send("Returns spell descriptions for Starfinder.\n" +
        "Made by Ada, message me at totinos.heathen@gmail.com\nVersion 1.1, created May 5th, 2020").catch(console.error);
}