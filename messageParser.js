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

        if (installable.includes(str.split(" ")[1]) && !game.installed.includes(str.split(" ")[1])) {
            let index = respond([
                `Installing program: ${str.split(" ")[1]}`,
                "",
            ]); 
            game.installed.push(str.split(" ")[1]);
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
        } else if (game.installed.includes(str.split(" ")[1])) {
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
            installed: game.installed
        });
        localStorage.setItem("saves", JSON.stringify(saves));
        respond(["Game saved at: "+ (currentdate.getDate() + "/" + (currentdate.getMonth()+1) + "/" + currentdate.getFullYear() + " " + currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds())]);
    } else if (command === "reset") {
        game.autosave = false; 
        localStorage.removeItem("autosave");
        location.reload();
    } else if (command === "restore") {
        if (str.split(" ")[1]) {
            let save = JSON.parse(localStorage.getItem("saves"))[parseInt(str.split(" ")[1])];
            commandBuffer.lines = save.commandBufferLines;
            commandBuffer.scroll = save.commandBufferScroll;
            theLastHopeBuffer.lines = save.gameBufferLines;
            theLastHopeBuffer.scroll = save.gameBufferScroll;
            game.installed = save.installed;
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
    } else if (command === "thelasthope" && game.installed.includes("thelasthope")) {
        currentBuffer = theLastHopeBuffer;      
    } else if (command === "") {}
    else {
        respond([`'${command}' is not recognized as an internal or external command or operable program.`, "Use the `help` command to view internal commands."]);
    }
}

function messageParser(str) {
    if (str.split(" ").includes("dip") && str.split(" ").includes("carpet") && str.split(" ").includes("alcohol") && game.events.includes("pickAlcohol") && game.events.includes("pickCarpet")) {
        respond(["Juno dips the piece of carpet into the bottle of alcohol."]);
        game.inventory.splice(game.inventory.indexOf("Ripped carpet"), 1);
        game.inventory.splice(game.inventory.indexOf("Bottle of Alcohol"), 1);
        game.inventory.push("Flammable carpet");
        game.events.push("madeFlammableCarpet");
        return;
    }
    if (game.location == "startBedroom") {
        if (game.events.includes("computerStart")) {
            if (str.split(" ").includes("123456")) {
                game.inventory.splice(game.inventory.indexOf("Note"), 1);
                respond(["Juno hears the locked door open. It leads to the living room."])
                currentBuffer = commandBuffer;
                respond(["It's your mission to return Juno home."]);
                game.events.splice(game.events.indexOf("computerStart"), 1);
                game.inventory.splice(game.inventory.indexOf("Note"), 1);
                game.events.push("computerStartDone");
            } else {
                respond(["Password invalid."]);
                game.events.splice(game.events.indexOf("computerStart"), 1);
            }
            return;
        }
        if (str.split(" ").includes("computer")) {
            if (game.events.includes("computerStartDone")) {
                respond(["The computer has deactivated and can no longer be used."]);
                return;
            }
            if (game.inventory.includes("Note")) {
                respond(["Enter the password: "]);
                game.events.push("computerStart");
                return;
            }
            respond(["Juno attempts access the computer. The computer requires a code."]);
            return;
        }
        if (str.split(" ").includes("go") && str.split(" ").includes("bathroom")) {
            respond(["Juno walks into the bathroom. It's even darker than before."]);
            game.location = "startBathroom";
            return;
        }
        if (str.split(" ").includes("read") && str.split(" ").includes("note") && game.events.includes("pickNote")) {
            respond(["The note says: \"123456\""]);
            return;
        }
        if (str.split(" ").includes("carpet")) {
            if (game.events.includes("pickCarpet")) {
                respond(["Juno doesn't think she needs more carpet."])
                return;
            }
            game.inventory.push("Ripped carpet");
            game.events.push("pickCarpet");
            respond(["Juno picks up a piece of the ripped up carpet."]);
            return;
        }
        if (str.split(" ").includes("go") && str.split(" ").includes("living") && game.events.includes("computerStartDone")) {
            respond(["Juno goes to the living room. There is a locked door. There is another door that leads to the kitchen. There is a unlit fireplace with a shattered television."])
            game.location = "startLiving";
            return;
        }
    }
    if (game.location == "startBathroom") {
        if (str.split(" ").includes("cabinet")) {
            respond(["Juno looks into the cabinet. There is a note in there. Besides   the note the cabinet is empty."]);
            game.events.push("openCabinet");
            return;
        }
        if (str.split(" ").includes("go") && (str.split(" ").includes("back") || str.split(" ").includes("bedroom"))) {
            respond(["Juno walks back into the bedroom. Nothing changed."]);
            game.location = "startBedroom";
            return;
        }
        if (str.split(" ").includes("grab") && str.split(" ").includes("note") && game.events.includes("openCabinet")) {
            if (game.events.includes("pickNote")) {
                respond(["Juno already grabbed the note."]);
                return;
            }
            respond(["Juno grabs note."]);
            game.inventory.push("Note");
            game.events.push("pickNote");
            return;
        }
        if (str.split(" ").includes("read") && str.split(" ").includes("note") && game.events.includes("pickNote")) {
            respond(["Juno can't read it since it's too dark."]);
            return;
        }
    }
    if (game.location == "startLiving") {
        if (str.split(" ").includes("go") && str.split(" ").includes("bedroom")) {
            respond(["Juno walks back into the bedroom. Nothing changed."]);
            game.location = "startBedroom";
            return;
        }
        if (str.split(" ").includes("go") && str.split(" ").includes("kitchen")) {
            respond(["Juno walks into the kitchen."]);
            game.location = "startKitchen";
            return;
        }
        if ((str.split(" ").includes("tv") || str.split(" ").includes("television")) && str.split(" ").includes("put") && str.split(" ").includes("carpet")) {
            respond(["Juno puts the carpet into the television then attempts to turn it on. Carpet is now on fire. Juno takes it back out."]);
            game.events.push("madeFireCarpet");
            game.inventory.push("Carpet on fire");
            game.inventory.splice(game.inventory.indexOf("Flammable carpet"), 1);
            return;
        }
        if (str.split(" ").includes("tv") || str.split(" ").includes("television")) {
            respond(["Juno tries to turn on the cracked television. It makes small spark. It could definitely start a fire if there was something flammable in it."]);
            return;
        }
        if (str.split(" ").includes("fireplace") && game.events.includes("madeFireCarpet")) {
            if (game.events.includes("litFireplace")) {
                respond(["Juno stares into the orb in the fireplace and the way the fire dances mesmirizes her."]);
                return;
            }
            respond(["Juno tosses the carpet that is on fire into the fireplace. The fireplace is now lit. Although seconds later, the fire condenses into an orb."]);
            game.events.push("litFireplace");
            game.inventory.splice(game.inventory.indexOf("Carpet on fire"), 1);
            return;
        }
        if (str.split(" ").includes("fireplace")) {
            respond(["Juno looks at the fire place. She wants to light it for warmth."]);
            return;
        }
        if (str.split(" ").includes("orb") && !game.events.includes("pickOrb")) {
            respond(["Juno picks up the orb. The warmth of the light coming from it makes Juno not want to put it down."]);
            game.events.push("pickOrb");
            game.inventory.push("Orb of light");
            return;
        }
        if (str.split(" ").includes("outside")) {
            if (game.events.includes("burnDoor")) {
                respond([""]);
                return;
            }
            respond(["Juno attempts to open the door to the outside but the door is locked. It seems like Juno can burn away with a concentrated beam of light."]);
            return;
        }
        if (str.split(" ").includes("door")) {
            respond([""]);
            return;
        }
    }
    if (game.location == "startKitchen") {
        if (str.split(" ").includes("go") && (str.split(" ").includes("back") || str.split(" ").includes("bedroom"))) {
            respond(["Juno walks back into the living room. Nothing changed."]);
            game.location = "startLiving";
            return;
        }
        if (str.split(" ").includes("fridge")) {
            respond(["Juno opens the fridge. It surprisingliy empty beside a bottle of alcohol."]);
            game.events.push("openFridge");
            return;
        }
        if (str.split(" ").includes("alcohol") && game.events.includes("openFridge")) {
            if (game.events.includes("pickAlcohol")) {
                respond(["Juno doesn't understand you. Did you think there would be more?"]);
                return;
            }
            respond(["Juno picks up the bottle of alcohol."]);
            game.events.push("pickAlcohol");
            game.inventory.push("Bottle of alcohol");
            return;
        }
    }
    if (str.split(" ").includes("view") || (str.split(" ").includes("look") && str.split(" ").includes("around"))) {
        respond(["Juno looks around."]);
        showImage(game.location);
        return;
    }
    if (str.split(" ").includes("inventory")) {
        respond(["Juno checks her pockets. She currently has:"]);
        respond(structuredClone(game.inventory));

        return;
    }
    respond(["Juno didn't understand you."])
}