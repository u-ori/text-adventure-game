let theLastHopeBuffer = new Buffer(
    autosave ? autosave.gameBufferLines : 
    ["[Press `Esc` to go back]",
    "",
    "Juno wakes up in an abandoned house. There is barely any light. The ",
    "door to bathroom is slightly open. The other door is locked. There ",
    "is a computer in the middle of the room. The lights seem shattered.",
    "The carpet is ripped up in to shreds.",
    ""], 

    "You: ", 
    
    autosave ? autosave.gameBufferScroll : 0
, messageParser);