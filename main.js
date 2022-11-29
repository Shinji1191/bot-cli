const inquirer = require("inquirer");
const chalk = require("chalk");
const { writeFileSync } = require("fs")

function cli() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "What are you gonna make:",
        name: "project",
        choices: [
          "Prefix Command",
          "Slash Command",
          "Message Context Command",
          "User Context Command",
        ],
      },
      {
        type: "input",
        message: "The name of the command:",
        name: "name",
      },
      {
        type: "input",
        message: "Description of the command:",
        name: "description",
      },
      {
        type: "list",
        message: "Category of the command",
        name: "category",
        choices: [
          "Administrator",
          "Bot",
          "Developer",
          "Fun",
          "Economy",
          "Information",
          "Moderation",
          "Members",
          "Music",
          "Misc",
          "NSFW",
          "Private",
          "Premium",
          "Users",
          "Utility",
        ],
      },
    ])
    .then((answers) => {
      let fileToWrite = "";

      if (answers.project === "Prefix Command") {
        fileToWrite = `
const { PrefixCommand } = require("../../Build/Classes/SlashCommand");

module.exports = new PrefixCommand({
  name: "${answers.name}",
  description: "${answers.description}",
  category: "${answers.category}",
  // aliases: [],
  // usage: "",
  // adminOnly: true,
  // devOnly: true,
  // guildOnly: true,
  // nsfw: true,
  // userPermissions: [],
  // botPermissions: [],
  async run(client, message, args) {}
});
      `;

        const cwd = process.cwd();
        writeFileSync(
          cwd + `/main/Commands/${answers.category}/${answers.name}.js`,
          fileToWrite,
          { encoding: "utf8" }
        );
      }
      if (answers.project === "Slash Command") {
        fileToWrite = `
const { SlashCommand } = require("../../Build/Classes/SlashCommand");

module.exports = new SlashCommand({
  name: "${answers.name}",
  description: "${answers.description}",
  category: "${answers.category}",
  // usage: "",
  // adminOnly: true,
  // devOnly: true,
  // guildOnly: true,
  // nsfw: true,
  // userPermissions: [],
  // botPermissions: [],
  async run(client, interaction) {}
});
      `;

        const cwd = process.cwd();
        writeFileSync(
          cwd + `/main/SlashCommands/${answers.category}/${answers.name}.js`,
          fileToWrite,
          { encoding: "utf8" }
        );
      }
      if (answers.project === "Message Context Command") {
        fileToWrite = `
const { UserContextCommand } = require("../../Build/Classes/UserContextCommand");
const { ApplicationCommandType } = require("discord.js");

module.exports = new UserContextCommand({
  name: "${answers.name}",
  category: "${answers.category}",
  type: ApplicationCommandType.Message
  async run(client, interaction) {}
});
      `;
        const cwd = process.cwd();
        writeFileSync(
          cwd + `/main/SlashCommands/${answers.category}/${answers.name}.js`,
          fileToWrite,
          { encoding: "utf8" }
        );
      }
      if (answers.project === "User Context Command") {
        fileToWrite = `
const { UserContextCommand } = require("../../Build/Classes/UserContextCommand");
const { ApplicationCommandType } = require("discord.js");

module.exports = new UserContextCommand({
  name: "${answers.name}",
  category: "${answers.category}",
  type: ApplicationCommandType.User
  async run(client, interaction) {}
});
      `;
        const cwd = process.cwd();
        writeFileSync(
          cwd + `/main/SlashCommands/${answers.category}/${answers.name}.js`,
          fileToWrite,
          { encoding: "utf8" }
        );
      }

      console.log(
        `${chalk.greenBright.bold(`✅ ${answers.name}`)} has been created`
      );

      process.exit()
    });
}

module.exports = cli