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
        let index = respond([
            `Installing program: ${str.split(" ")[1]}`,
            "",
        ]); 
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
        }, 100)
    } else if (command === "type") {
        respond(["reading file: "+str.split(" ")[1]]);
    } else if (command === "email") {
        respond([
            "From: Your friend",
            " ",
            "Have you seen this new game?",
            "https://game.oridev.net",
            "You can install it by running `INSTALL thegame`"
        ]);
    } else if (command === "cls") {
        lines = [];
        scrollcount = 0;
    } else if (command === "thegame") {
        respond(["The protaganist awakens not know where they are at."])
    } else if (command === "") {}
    else {
        respond([`'${command}' is not recognized as an internal or external command or operable program.`]);
    }
}