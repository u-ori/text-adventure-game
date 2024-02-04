let commandBuffer = new Buffer(
    localStorage.getItem("autosave") ? 
        JSON.parse(localStorage.getItem("autosave")).commandBufferLines : 
        ["Fluxion Systems Operating System [Version 2.1.24]",
    "(c) Fluxion Systems. All rights reserved.",
    "","You have one unread email.",""],

    "C:\\Users\\You> ", 

    localStorage.getItem("autosave") ? 
        JSON.parse(localStorage.getItem("autosave")).commandBufferScroll : 0,
    commandParser
);