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
            "READ    - Displays contents of a text file.",
            "LS      - Lists files and directories in current directory.",
            "CD      - Changes directory."
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
    } else if (command === "read") {
        if (game.drive[str.split(" ")[1]]["type"] == "file") {
            respond(game.drive[str.split(" ")[1]]["content"]);
            return;
        }
        respond(["Can't find file."]);
    } else if (command === "cd") {
        let cDir = game.drive;
        for (const f of game.directory) {
            cDir = cDir[f]["content"];
        }
        if (Object.keys(cDir).includes(str.split(" ")[1]) && game.drive[str.split(" ")[1]].type == "folder") {
            game.directory.push(str.split(" ")[1]);
            respond(["Changed directory"]);
            return;
        }
        if (str.split(" ")[1] === "../" && game.directory.length > 0) {
            game.directory.pop();
            respond(["Changed directory"]);
            return;
        }
        respond(["Failed to change directory"]);
    } else if (command === "ls") {
        let cDir = game.drive;
        for (const f of game.directory) {
            cDir = cDir[f]["content"];
        }
        respond(Object.keys(cDir));
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
let mostRecent;
function messageParser(str) {
    mostRecent = str;
    if (w("dip") && w("carpet") && w("alcohol") && e("pickAlcohol") && e("pickCarpet")) {
        respond(["Juno dips the piece of carpet into the bottle of alcohol."]);
        ir("Ripped carpet");
        ir("Bottle of Alcohol");
        ia("Flammable carpet");
        ea("madeFlammableCarpet");
        return;
    }
    if (l("startBedroom")) {
        if (e("computerStart")) {
            if (w("123456")) {
                ir("Note");
                respond(["Juno hears the locked door open. It leads to the living room."])
                currentBuffer = commandBuffer;
                respond(["It's your mission to return Juno home."]);
                er("computerStart");
                ir("Note");
                ea("computerStartDone");
            } else {
                respond(["Password invalid."]);
                er("computerStart");
            }
            return;
        }
        if (w("computer")) {
            if (e("computerStartDone")) {
                respond(["The computer has deactivated and can no longer be used."]);
                return;
            }
            if (e("pickNote")) {
                respond(["Enter the password: "]);
                ea("computerStart");
                return;
            }
            respond(["Juno attempts access the computer. The computer requires a code."]);
            return;
        }
        if (w("go") && w("bathroom")) {
            respond(["Juno walks into the bathroom. It's even darker than before."]);
            lc("startBathroom");
            return;
        }
        if (w("read") && w("note") && e("pickNote")) {
            respond(["The note says: \"123456\""]);
            return;
        }
        if (w("carpet")) {
            if (e("pickCarpet")) {
                respond(["Juno doesn't think she needs more carpet."])
                return;
            }
            ia("Ripped carpet");
            ea("pickCarpet");
            respond(["Juno picks up a piece of the ripped up carpet."]);
            return;
        }
        if (w("go") && w("living") && e("computerStartDone")) {
            respond(["Juno goes to the living room. There is a locked door. There is another door that leads to the kitchen. There is a unlit fireplace with a shattered television."])
            lc("startLiving");
            return;
        }
    }
    if (l("startBathroom")) {
        if (w("cabinet")) {
            respond(["Juno looks into the cabinet. There is a note in there. Besides   the note the cabinet is empty."]);
            ea("openCabinet");
            return;
        }
        if (w("go") && (w("back") || w("bedroom"))) {
            respond(["Juno walks back into the bedroom. Nothing changed."]);
            lc("startBedroom");
            return;
        }
        if (w("grab") && w("note") && e("openCabinet")) {
            if (e("pickNote")) {
                respond(["Juno already grabbed the note."]);
                return;
            }
            respond(["Juno grabs note."]);
            ia("Note");
            ea("pickNote");
            return;
        }
        if (w("read") && w("note") && e("pickNote")) {
            respond(["Juno can't read it since it's too dark."]);
            return;
        }
    }
    if (l("startLiving")) {
        if (w("go") && w("bedroom")) {
            respond(["Juno walks back into the bedroom. Nothing changed."]);
            lc("startBedroom");
            return;
        }
        if (w("go") && w("kitchen")) {
            respond(["Juno walks into the kitchen. There is a fridge and a safe."]);
            lc("startKitchen");
            return;
        }
        if ((w("tv") || w("television")) && w("put") && w("carpet")) {
            respond(["Juno puts the carpet into the television then attempts to turn it on. Carpet is now on fire. Juno takes it back out."]);
            ea("madeFireCarpet");
            ia("Carpet on fire");
            ir("Flammable carpet");
            return;
        }
        if (w("tv") || w("television")) {
            respond(["Juno tries to turn on the cracked television. It makes small spark. It could definitely start a fire if there was something flammable in it."]);
            return;
        }
        if (w("fireplace") && e("madeFireCarpet")) {
            if (e("litFireplace")) {
                respond(["Juno stares into the orb in the fireplace and the way the fire dances mesmirizes her."]);
                return;
            }
            respond(["Juno tosses the carpet that is on fire into the fireplace. The fireplace is now lit. Although seconds later, the fire condenses into an orb."]);
            ea("litFireplace");
            ir("Carpet on fire");
            return;
        }
        if (w("fireplace")) {
            respond(["Juno looks at the fire place. She wants to light it for warmth."]);
            return;
        }
        if (w("orb") && !e("pickOrb")) {
            respond(["Juno picks up the orb. The warmth of the light coming from it makes Juno not want to put it down."]);
            ea("pickOrb");
            ia("Orb of light");
            return;
        }
        if (w("outside") || w("town")) {
            if (e("town")) {
                respond(["Juno heads back into the town."]);
                lc("town");
                return;
            }
            if (e("burnDoor")) {
                respond(["Juno steps outside into the darkness. She sees a town nearby and a giant tower. There seems to be a lot of automatons that have shut down."]);
                lc("startOutside");
                return;
            }
            respond(["Juno attempts to open the door to the outside but the door is locked. It seems like Juno can burn away with a concentrated beam of light."]);
            return;
        }
        if (w("door") && w("burn") && e("pickOrb")) {
            respond(["Juno aims the orb at the door. A beam of light burns the lock off."]);
            ea("burnDoor");
            return;
        }
    }
    if (l("startKitchen")) {
        if (w("mask") && e("openSafe") && !e("pickMask")) {
            respond("Juno grabs the mask.");
            ia("Gas mask");
            return;
        }
        if (e("enterCombination")) {
            er("enterCombination")
            if (w(438753)) {
                respond("The safe swings open. Inside there is a gas mask. Juno wonders how you knew the code, because she doesn't remember seeing it.")
                ea("openSafe");
                return;
            }
            respond("Combination incorrect.");
            return;
        }
        if (w("go") && (w("back") || w("bedroom"))) {
            respond(["Juno walks back into the living room. Nothing changed."]);
            lc("startLiving");
            return;
        }
        if (w("fridge") && !e("openFridge")) {
            respond(["Juno opens the fridge. It surprisingliy empty beside a bottle of alcohol."]);
            ea("openFridge");
            return;
        }
        if (w("alcohol") && e("openFridge") && !e("pickAlcohol")) {
            respond(["Juno picks up the bottle of alcohol."]);
            ea("pickAlcohol");
            ia("Bottle of alcohol");
            return;
        }
        if (w("safe") && !e("openSafe")) {
            if (e("computer2")) {
                respond(["Enter the combination: "]);
                ea("enterCombination")
                return;
            }
            respond(["Juno walks over to the safe, but has no clue what the combination to it is."]);
            return;
        }
    }
    if (l("startOutside")) {
        if (w("town")) {
            respond(["Juno heads into the town. All of the doors are boarded up, besides one. She sees an automaton that is still active."]);
            lc("town");
            ea("town");
            return;
        }
    }
    if (l("town")) {
        if (w("automaton") && !e("auto1")) {
            respond(["Juno walks up to the automaton.", "",
                "AUTOMATON: *stares into the light*", 
                "AUTOMATON: The new sun has arrived as the prophecy foretold.",
                "JUNO: What sun?",
                "AUTOMATON: What you are holding is our new sun.",
                "JUNO: What happened to the old sun.",
                "AUTOMATON: The tower that you saw contained our sun, and... it kinda just went boom.",
                "JUNO: Just like that?",
                "AUTOMATON: Yep, just like that.",
                "JUNO: Then why is everything ever so slightly bright and not complete darkness?",
                "AUTOMATON: The land here is infused with Phosphor, and it's slowly releasing the energy that it saved from the previous sun.",
                "JUNO: Where did everybody go?",
                "AUTOMATON: Believe it or not most people don't want to live in a \"dead\" world, and promptly left in search of a new world.",
                "JUNO: Well... how do I leave this world? I want to go back to my original world.",
                "AUTOMATON: You will have go to The Tower as well.",
                "JUNO: Who is this voice that's been guiding me?",
                "AUTOMATON: That is The Guide. Its goal is to guide you to The Tower.",
                "JUNO: Why are you the only automaton that didn't shut down.",
                "AUTOMATON: Because my programming dictates to welcome the savior of this world and answer any questions they have.",
                "JUNO: So you won't come with me?",
                "AUTOMATON: No as I Have Not Been Freed.",
                "JUNO: I don't have any more questions.",
                "AUTOMATON: Understood.", "",
                "The automaton shuts down for good."
            ]);
            ea("auto1");
            return;
        }
        if (w("inside") || w("house")) {
            lc("townInside");
            if (!e("townHouse")) {
                respond("Juno heads inside and finds another active automaton. She also sees what seems to be a deactivated generator. Right next to it is the same computer that was in the bedroom. The floor is covered in electronic components.");
                ea("townHouse")
                return;
            }
            respond("Juno walks back into the house.");
            return;
        }
        if (w("home")) {
            lc("startLiving");
            respond("Juno walks back to her \"home\".");
            return;
        }
        if (w("factories")) {
            lc("factories");
            if (!e("factories")) {
                respond("Juno starts walking towards the factories. As she gets closer and closer, the air becomes less and less breathable. Eventually Juno arrives at the factories. Surprisingly, all of the building looks ransacked and destroyed. Looking past the ruins there is a port.");
                ea("factories")
                return;
            }
            respond("Juno walks back to the factories.");
            return;
        }
    }
    if (l("townInside")) {
        if (w("automaton") && !e("auto2")) {
            respond(["Juno walks up to the automaton.", "",
                "AUTOMATON: *stares into the light*", 
                "AUTOMATON: So you are the \"Savior\"?",
                "JUNO: Yes, yes I am.",
                "AUTOMATON: Listen up \"Savior\" destroy the sun now.",
                "JUNO: Why?",
                "AUTOMATON: All of the people have already left. There is nothing left to be salvaged. Just let the world wither away naturally.",
                "JUNO: Understood, but why are you still active?",
                "AUTOMATON: My programming dictates to shut down every automaton after their purpose is fulfilled.",
                "AUTOMATON: Although if you still want to go to The Tower, grab a gas mask as the next area (The Factories) is heavily polluted."
            ]);
            ea("auto2");
            return;
        }
        if (w("computer")) {
            if (e("computer2")) {
                respond("The computer turned itself off.");
                return;
            }
            if (e("turnGen")) {
                respond(["Juno accesses the computer."]);
                currentBuffer = commandBuffer;
                respond(["I can see your loyalty in helping Juno return back home. The next area is deadly without a gas mask. Luckily, there is one inside the safe in the starting house. Unfortunately, the code for it no longer exists in the world. I had to pull it out as it started to get corrupted by The Null Zone. Just check your documents you will find it there."]);
                game.drive["Documents"].content["safeCode.txt"] = {type: "file", content: ["438753"]}
                ea("computer2");
                return;
            }
            respond(["Juno looks at the deactivated computer. It seems like turning on the generator will turn the computer on."]);
            return;
        }
        if ((w("gen") || w("generator")) && e("addPanelGen") && !e("turnGen")) {
            respond(["Juno points The Sun at the solar panel and the generator spins to life. The computer turns on."]);
            ea("turnGen");
            return;
        }
        if ((w("gen") || w("generator")) && (w("solar") || w("panel")) && e("checkFloor")) {
            respond(["Juno walks up to the generator and attaches the solar panel to it. Now it just needs light."]);
            ea("addPanelGen");
            ir("Solar panel");
            return;
        }
        if ((w("gen") || w("generator")) && !e("turnGen")) {
            respond(["Juno walks up to the generator. It seems like it's missing an energy source to start it."]);
            return;
        }
        if (w("floor") && !e("checkFloor")) {
            respond(["Juno checks the floor. Most of the components are damaged, and can't be used. She finds a gear and a solar panel."]);
            ia("Gear");
            ia("Solar panel");
            ea("checkFloor");
        }
        if (w("outside") || w("back")) {
            respond(["Juno walks back outside to the town center."]);
            lc("town")
        }
    }
    if (l("factories")) {
        if (w("town")) {
            respond("Juno walks back to the town.");
            lc("town");
            return;
        }
        if (w("port")) {
            lc("port");
            if (!e("port")) {
                respond("Juno walks to the port past the factories. In the port there is one single boat, with an automaton with a bucket on it's head.");
                ea("port")
                return;
            }
            respond("Juno walks back to the port.");
            return;
        }
        if ((w("ruins") || w("search"))&& !e("ruins")) {
            respond("Juno inspects the ruins thoroughly. In the end, she finds a broken steam engine.");
            ea("ruins");
            ia("Broken steam engine");
        }
    }
    if (l("port")) {
        if (w("bucket")) {
            respond(["Juno grabs the bucket of the automaton's head."]);
            ia("Bucket");
            return;
        }
        if (w("automaton") && !e("auto3")) {
            respond(["Juno walks up to the edge of the port.", "",
                "AUTOMATON: *stares into the light*", 
                "AUTOMATON: Need a ride?",
                "JUNO: Yeah!",
                "AUTOMATON: Where do you want to go?",
                "JUNO: To the tower.",
                "AUTOMATON: *attempts to start the boat*",
                "AUTOMATON: Unfortunately, the boat is missing an engine and can't go anywhere.",
                "JUNO: Okay... so... I need to find a engine for you?",
                "AUTOMATON: *Doesn't respond as it hasn't been freed.*"
            ]);
            ea("auto3");
            return;
        }
        if (w("engine") && e("ruins")&& !e("installBrokenEngine")) {
            respond(["Juno gets into the boat to install the broken steam engine.", "", 
                "AUTOMATON: *Scans engine.*",
                "AUTOMATON: ENGINE DIAGNOSTIC COMPLETE. The engine is missing a gear."
            ]);
            ir("Broken steam engine")
            ea("installBrokenEngine");
            return;
        }
        if (w("gear") && e("installBrokenEngine")) {
            respond(["Juno give the gear to the automaton.", "", 
                "AUTOMATON: *Places gear in place*",
                "AUTOMATON: *Scans engine.*",
                "AUTOMATON: ENGINE DIAGNOSTIC COMPLETE. The engine is missing water and heat source."
            ]);
            ir("Gear");
            ea("fixEngine");
            return;
        }
        if ((w("sun") || w("light") || w("orb") && e("fixEngine") && !e("heatEngine"))) {
            respond(["Juno puts the orb into the engine."]);
            ir("Orb of light");
            ea("heatEngine");
            isEngineFixed();
            return;
        }
        if ((w("pour") || w("water")) && e("fixEngine") ) {
            respond(["Juno pours the water into the engine."]);
            ir("Bucket of water");
            ea("waterEngine");
            isEngineFixed();
            return;
        }
    }
    // if (w("view") || (w("look") && w("around"))) {
    //     respond(["Juno looks around."]);
    //     showImage(game.location);
    //     return;
    // }
    if (w("inventory")) {
        respond(["Juno checks her pockets. She currently has:"]);
        respond(structuredClone(game.inventory));
        return;
    }
    respond(["Juno didn't understand you."]);
}

function isEngineFixed() {
    if (e("waterEngine") && e("heatEngine")) {
        respond([
            "AUTOMATON: *Scans engine.*",
            "AUTOMATON: ENGINE DIAGNOSTIC COMPLETE. The engine is fully functional."
        ]);
        return;
    }
}

function l(str) {
    return game.location == str;
}

function w(str) {
    return mostRecent.split(" ").includes(str);
}

function e(str) {
    return game.events.includes(str);
}
function i(str) {
    return game.inventory.includes(str);
}

function lc(str) {
    game.location = str;
}

function ea(str) {
    game.events.push(str);
}

function ia(str) {
    game.inventory.push(str);
}

function ir(str) {
    game.inventory.splice(game.inventory.indexOf("str"), 1);
}

function er(str) {
    game.events.splice(game.events.indexOf("str"), 1);
}