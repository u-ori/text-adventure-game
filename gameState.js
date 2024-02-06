let autosave = JSON.parse(localStorage.getItem("autosave"));

gameState = {
    installed: localStorage.getItem("autosave") ? JSON.parse(localStorage.getItem("autosave")).installed : ["thelasthope"],
    autosave: true,
    inventory: [],
    location: "startBedroom"
}

function autoSave() {
    if (!gameState.autosave) {
        return;
    }

    localStorage.setItem("autosave", JSON.stringify({
        commandBufferLines: commandBuffer.lines,
        commandBufferScroll: commandBuffer.scroll,
        gameBufferLines: theLastHopeBuffer.lines,
        gameBufferScroll: theLastHopeBuffer.scroll,
        installed: gameState.installed
    }));
}