class Buffer {
    constructor(startingLines, inputPrefix, scroll, parser) {
        this.lines = startingLines;
        this.input = "";
        this.inputPrefix= inputPrefix;
        this.inputEnabled = true;
        this.scroll = scroll;
        this.parser = parser;
        this.image;
    }
}

function respond(list) {
    let lineIndex = currentBuffer.lines.length;
    for (let i = 0; i < list.length; i++) {
        if (list[i].length === 0) {
            currentBuffer.lines.push("");
        }
        while (list[i].length > 0) {
            currentBuffer.lines.push(list[i].substring(0, 65));
            list[i] = list[i].substring(65);
        }
    }
    currentBuffer.lines.push("");
    return lineIndex;
}

function showImage(str) {
    currentBuffer.image = str;
}