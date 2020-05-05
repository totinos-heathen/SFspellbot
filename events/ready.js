module.exports = (client) => {
    console.log(`Ready to serve in ${client.channels.cache.length} channels on ${client.guilds.cache.length} servers, for a total of ${client.users.cache.length} users.`);
    client.user.setActivity(client.config.prefix + "spell | " + client.config.prefix + "help | " + client.config.prefix + "info")
}