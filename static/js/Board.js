console.log("wczytano plik Board.js");
class Board {
    constructor() {
        console.log("konstruktor klasy Board");
        this.boardGenerate();
    }
    boardGenerate() {
        var backgroundColor = "white";
        for (var i = 0; i < 64; i++) {
            var box = document.createElement("div");
            box.className = "BoardField";
            box.id = "Box" + i;
            var change = i % 8 === 0;
            var backgroundColor = change
                ? backgroundColor
                : backgroundColor === "white"
                ? "deepskyblue" //#748bbd
                : "white";
            box.style.backgroundColor = backgroundColor;
            $("#board").append(box);
        }
    }
}
