function parseMessage(str) {
    let command = str.split(" ")[0];
    if (command === "help") {
        respond([
            "CLS  - Clears the screen",
            "HELP - Shows all commands and how to use them.",
            "TYPE - Displays contents of a text file."
        ]);
    } else if (command === "type") {
        respond(["reading file: "+str.split(" ")[1]]);
    } else if (command === "cls") {
        lines = [];
        scrollcount = 0;
    }
    else {
        respond([`'${command}' is not recognized as an internal or external command or operable program.`]);
    }
}