let theLastHopeBuffer = new Buffer(
    localStorage.getItem("autosave") ? 
        JSON.parse(localStorage.getItem("autosave")).gameBufferLines : 
    [
    "[Press `Esc` to exit the game]",
    "",
    "The protaganist wakes up in a",
    ""
], "You: ", 
localStorage.getItem("autosave") ? 
        JSON.parse(localStorage.getItem("autosave")).gameBufferScroll : 0
, messageParser);