const spellList = require("./data.json");
const {Discord, MessageEmbed} = require("discord.js");
const List = require("collections/list");

exports.run = (client, message, args) => {
    if (args.length <= 0) {
        message.channel.send("Please include a spell you want the spell block for, after " + client.config.prefix +
            "spell.\nExample: " + client.config.prefix + "spell Magic Missile").catch(console.error);
        return
    }
    if (args.length > 1) {
        spellName = args.join(" ")
    }
    else {
        spellName = args[0]
    }
    spellName = toTitleCase(spellName)
    if (spellList[spellName] === undefined) {
        if (spellName.includes("Mass")) {
            message.channel.send("Please format Mass spells as follows: '<spell name>, Mass'\n For example, 'Inflict Pain, Mass'").catch(console.error);
            return
        }
        else if (spellName.includes("Lesser")) {
            message.channel.send("Please format Lesser spells as follows: '<spell name>, Lesser'\n For example, 'Confusion, Lesser'").catch(console.error);
            return
        }
        else if (spellName.includes("Greater")) {
            message.channel.send("Please format Greater spells as follows: '<spell name>, Greater'\n For example, 'Command, Greater'").catch(console.error);
            return
        }
        else {
            message.channel.send("Unknown spell").catch(console.error);
            return
        }
    }

    const embed = new MessageEmbed()
        .setTitle(spellName)
        /*
         * Alternatively, use "#00AE86", [0, 174, 134] or an integer number.
         */
        .setColor(0x00AE86)
        .setFooter("Command: " + client.config.prefix + "spell\nPlease report bugs to totinos.heathen@gmail.com")
        .setTimestamp();
    let desc = spellList[spellName].Description
    if (desc.length >= 5300) {
        desc = spellList[spellName]["Short Description"]
        if (desc === undefined) {
            desc = "Description too long and no short description is available. Please reference source text."
        }
    }
    if (desc.length >= 2048) {
        myList = new List()
        chopToList(desc, myList, 1024, 0, 5300)
        first = true
        while (myList.length > 0) {
            str = myList.shift()
            if (first) {
                first = false
                embed.setDescription(str)
            }
            else {
                embed.addField("Cont.", str)
            }
        }
    }
    else {
        embed.setDescription(desc)
    }

    let catArray = ["Area", "Casting Time", "Classes", "Duration", "Effect", "Range", "Saving Throw", "School", "Spell Resistance", "Targets"]
    let sum = 0
    for (cat in catArray) {
        content = spellList[spellName][catArray[cat]]
        if (content !== undefined) {
            sum += 1
            embed.addField(catArray[cat], content, true)
        }
    }
    if (sum % 3 == 2) {
        embed.addField("Source", spellList[spellName].Source, true);
    }
    else {
        embed.addField("Source", spellList[spellName].Source);
    }
    message.channel.send({ embed }).catch(console.error);
}

function toTitleCase(str) {
    return str.replace(
        /\w\S*/g,
        function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
    );
}

function chopToList(str, list, maxLength, currLength, maxMaxLength) {
    if (str.length < maxLength) {
        if (currLength + str.length < maxMaxLength) {
            list.push(str)
        }
        else {
            list.push("Could not continue, content too long. Please reference source text.")
        }
        return list
    }
    lengthRegex = "^.{0," + maxLength + "}\\s"
    substr1 = str.match(lengthRegex)[0]
    substr2 = str.substring(substr1.length, str.length)
    if (substr1.length + currLength < maxMaxLength) {
        list.push(substr1)
        currLength += substr1.length
    }
    else {
        list.push("Could not continue, content too long. Please reference source text.")
        return list
    }
    return chopToList(substr2, list, maxLength, currLength, maxMaxLength)
}