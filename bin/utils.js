const fs = require("fs");
const editJsonFile = require("edit-json-file");
function editEslintFile(nameofproject) {
  let file = editJsonFile(`./${nameofproject}/.eslintrc.json`);
  if (typeof file.get("extends") == "string") {
    file.set("extends", [file.get("extends"), "next/babel"]);
  } else if (Array.isArray(file.get("extends"))) {
    file.set("extends", [...file.get("extends"), "next/babel"]);
  }
  file.save();
}
function showHelp() {
  console.log("\n\tplease add arguments\n");
}

function newProject(nameofproject) {
  var spawn = require("child_process").spawn,
    npx = spawn("npx", ["create-next-app", nameofproject]);

  console.log("Creating new Next Project");

  npx.on("exit", (code) => {
    editEslintFile(nameofproject);
    console.log("exit code:" + code);

    if (code === 0)
      console.log(
        `Installed Successfully \n\t now type cd ${nameofproject} \n\t npm run dev `
      );
  });
}

let component_content = (name) => `
import styles from "./${name}.module.css";

function ${name} () {
  return (
    <div className={styles.test}>
      ${name} works!
    </div>
  )
}

export default ${name}
`;

function add(typeToAdd, directory) {
  if (typeToAdd) {
    if (!directory) {
      console.log("No  directory specified");
      return;
    }
    let name = directory.split("/")[directory.split("/").length - 1];

    let dir = "./" + directory;
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      fs.writeFile(
        `${dir}/${name}.js`,
        component_content(name),
        function (err) {
          if (err) throw err;
        }
      );
      fs.writeFile(
        `${dir}/${name}.module.css`,
        "/*write your styles here*/\n.test {color:red;}",
        function (err) {
          if (err) throw err;
        }
      );
    }
    return;
  }
  if (!directory) {
    console.log("No  directory specified");
  }
  console.log("No type specified");
}

module.exports = { showHelp, add, newProject };
