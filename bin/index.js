#! /usr/bin/env node

const argv = require("yargs");
const utils = require("./utils.js");

argv
  .command(
    "new [name of project]",
    "creates a new project",
    (yargs) => {
      yargs.positional("name of project", {
        discribe: "the Project name",
        default: "new-nextjs-app",
      });
    },
    (argv) => {
      utils.newProject(argv.nameofproject);
    }
  )
  .option("verbose", {
    alias: "v",
    type: "boolean",
    description: "Run with verbose logging",
  }).argv;


argv
  .command(
    "add [type] [dir]",
    "adds something",
    (yargs) => {
      yargs.positional("type", {
        discribe: "type to add",
      });
      yargs.positional("dir", {
        discribe: "directory to add type to add",
      })
    },
    (argv) => {
      utils.add(argv.type, argv.dir)
    }
  )
  .help()
  .option("verbose", {
    alias: "v",
    type: "boolean",
    description: "Run with verbose logging",
  }).argv;