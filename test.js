document.getElementById("a").addEventListener("keypress", (e) => {
    if (e.key !== 'Enter') {
        return
    }
    document.getElementById("e").innerText = document.getElementById("a").value.split(" ")
    let target = ["turn", "on"]
    if (target.every(v => document.getElementById("a").value.split(" ").includes(v))) {
        document.getElementById("e").innerText = "gj"
    }
});

