let installable = ["thelasthope"];
let installed = [];

function parseMessage(str) {
    let command = str.split(" ")[0];
    command = command.toLowerCase();
    if (command === "help") {
        respond([
            "CLS     - Clears the screen",
            "EMAIL   - Displays most recent email received",
            "HELP    - Shows all commands and how to use them.",
            "INSTALL - Installs the specified program.",
            "TYPE    - Displays contents of a text file."
        ]);
    } else if (command === "install") {
        if (str.split(" ")[1] === undefined) {
            respond(["Program name not specified."])
            return
        }

        if (installable.includes(str.split(" ")[1]) && !installed.includes(str.split(" ")[1])) {
            let index = respond([
                `Installing program: ${str.split(" ")[1]}`,
                "",
            ]); 
            installed.push(str.split(" ")[1]);
            let count = 0;
            userInputEnabled = false;
            animationLoop = setInterval(() => {
                if (count === 65) {
                    lines[index+1] = "----------------------- Install Complete ------------------------";
                    userInputEnabled = true;
                    clearInterval(animationLoop);
                } else {
                    lines[index+1] = lines[index+1] + "█"
                    count++;
                }
            }, 100);
        } else if (installed.includes(str.split(" ")[1])) {
            respond([
                "Program is already installed."
            ]);
        } else {
            respond([
                "Cannot find the program in the registry."
            ]);
        }
    } else if (command === "type") {
        respond(["reading file: "+str.split(" ")[1]]);
    } else if (command === "email") {
        respond([
            "From: Your friend",
            " ",
            "Have you seen this new game?",
            "It's called The Last Hope.",
            "You can install it by running `install thelasthope`"
        ]);
    } else if (command === "cls") {
        lines = [];
        scrollcount = 0;
    } else if (command === "thelasthope" && installed.includes("thelasthope")) {
        showDirectory = false;
        
    } else if (command === "") {}
    else {
        respond([`'${command}' is not recognized as an internal or external command or operable program.`]);
    }
}