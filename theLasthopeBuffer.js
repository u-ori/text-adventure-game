let theLastHopeBuffer = new Buffer(
    autosave ? autosave.gameBufferLines : 
    ["[Press `Esc` to exit the game]",
    "",
    "The protaganist wakes up in a",
    ""], 

    "You: ", 
    
    autosave ? autosave.gameBufferScroll : 0
, messageParser);