const chalk = require("chalk");

const { VERSION } = require("../variables/constants");
const { date } = require("../variables/variables");

console.log(`${chalk.bold(`BubbleOS Lite, ${date} (v${VERSION})`)}`);
console.log(`Copyright (c) ${date} Bubble, Inc. All rights reserved.`);

console.log();

console.log(`For help on some available commands, type ${chalk.italic("help")}.`);
console.log(`For more information about a command, type ${chalk.italic("help <command>")}.`);

console.log();

console.log(`To exit the BubbleOS Lite shell, type ${chalk.italic("exit")}.`);

console.log();
