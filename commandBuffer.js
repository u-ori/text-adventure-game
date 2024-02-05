let commandBuffer = new Buffer(
    autosave ? autosave.commandBufferLines : 
    ["Fluxion Systems Operating System [Version 2.1.24]",
    "(c) Fluxion Systems. All rights reserved.",
    "","You have one unread email.",""],

    "C:\\Users\\You> ", 

    autosave ? autosave.commandBufferScroll : 0,
    commandParser
);