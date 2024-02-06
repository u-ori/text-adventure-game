let installable = ["thelasthope"];

function commandParser(str) {
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

        if (installable.includes(str.split(" ")[1]) && !gameState.installed.includes(str.split(" ")[1])) {
            let index = respond([
                `Installing program: ${str.split(" ")[1]}`,
                "",
            ]); 
            gameState.installed.push(str.split(" ")[1]);
            let count = 0;
            currentBuffer.inputEnabled = false;
            animationLoop = setInterval(() => {
                if (count === 65) {
                    currentBuffer.lines[index+1] = "----------------------- Install Complete ------------------------";
                    currentBuffer.inputEnabled = true;
                    clearInterval(animationLoop);
                } else {
                    currentBuffer.lines[index+1] = currentBuffer.lines[index+1] + "█"
                    count++;
                }
            }, 100); 
        } else if (gameState.installed.includes(str.split(" ")[1])) {
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
    } else if (command === "save") {
        let currentdate = new Date();
        let saves = localStorage.getItem("saves") ? JSON.parse(localStorage.getItem("saves")) : [];
        saves.push({
            time: currentdate.getDate() + "/"
            + (currentdate.getMonth()+1)  + "/" 
            + currentdate.getFullYear() + " "  
            + currentdate.getHours() + ":"  
            + currentdate.getMinutes() + ":" 
            + currentdate.getSeconds(),
            id: saves.length,
            commandBufferLines: commandBuffer.lines,
            commandBufferScroll: commandBuffer.scroll,
            gameBufferLines: theLastHopeBuffer.lines,
            gameBufferScroll: theLastHopeBuffer.scroll,
            installed: gameState.installed
        });
        localStorage.setItem("saves", JSON.stringify(saves));
        respond(["Game saved at: "+ (currentdate.getDate() + "/" + (currentdate.getMonth()+1) + "/" + currentdate.getFullYear() + " " + currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds())]);
    } else if (command === "reset") {
        gameState.autosave = false; 
        localStorage.removeItem("autosave");
        location.reload();
    } else if (command === "restore") {
        if (str.split(" ")[1]) {
            let save = JSON.parse(localStorage.getItem("saves"))[parseInt(str.split(" ")[1])];
            commandBuffer.lines = save.commandBufferLines;
            commandBuffer.scroll = save.commandBufferScroll;
            theLastHopeBuffer.lines = save.gameBufferLines;
            theLastHopeBuffer.scroll = save.gameBufferScroll;
            gameState.installed = save.installed;
        } else {
            let e = [];
            for (const save of JSON.parse(localStorage.getItem("saves"))) {
                e.push(save.id+". "+save.time);
            }
            respond(e);
        }
    } else if (command === "cls") {
        currentBuffer.lines = [];
        currentBuffer.scroll = 0;
    } else if (command === "thelasthope" && gameState.installed.includes("thelasthope")) {
        currentBuffer = theLastHopeBuffer;      
    } else if (command === "") {}
    else {
        respond([`'${command}' is not recognized as an internal or external command or operable program.`]);
    }
}

function messageParser(str) {
    if (gameState.location == "startBedroom") {
        if (str.split(" ").includes("view") || (str.split(" ").includes("look") && str.split(" ").includes("around"))) {
            respond(["Juno looks around."]);
            showImage("startBedroom");
            return;
        }
    }
    respond(["Juno didn't understand you."])
}