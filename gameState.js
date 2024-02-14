let autosave = JSON.parse(localStorage.getItem("autosave"));

game = {
    installed: localStorage.getItem("autosave") ? JSON.parse(localStorage.getItem("autosave")).installed : [],
    autosave: true,
    inventory: localStorage.getItem("autosave") ? JSON.parse(localStorage.getItem("autosave")).inventory : [],
    events: localStorage.getItem("autosave") ? JSON.parse(localStorage.getItem("autosave")).events : [],
    location: localStorage.getItem("autosave") ? JSON.parse(localStorage.getItem("autosave")).location : "startBedroom",
    drive: localStorage.getItem("autosave") ? JSON.parse(localStorage.getItem("autosave")).drive : {
        "Documents": {
            type: "folder",
            readable: true,
            content: {}
        },
        "text.txt": {
            type: "file",
            content: ["test\neee"],
            readable: false
        }
    },
    directory: localStorage.getItem("autosave") ? JSON.parse(localStorage.getItem("autosave")).directory : []
}

function autoSave() {
    if (!game.autosave) {
        return;
    }

    localStorage.setItem("autosave", JSON.stringify({
        commandBufferLines: commandBuffer.lines,
        commandBufferScroll: commandBuffer.scroll,
        gameBufferLines: theLastHopeBuffer.lines,
        gameBufferScroll: theLastHopeBuffer.scroll,
        installed: game.installed,
        inventory: game.inventory,
        events: game.events,
        location: game.location,
        drive: game.drive,
        directory: game.directory,
    }));
}