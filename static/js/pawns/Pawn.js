console.log("wczytano plik Pawn.js");
class Pawn {
    constructor() {
        console.log("konstruktor klasy Pawn");
        this.PlacePawns();
    }
    PlacePawns() {
        var Pawns = [
            2, 5, 8, 9, 11, 12, 14, 15, 48, 49, 51, 52, 54, 55, 58, 61,
        ];
        for (var i in Pawns) {
            var pawn = document.createElement("img");
            pawn.className = "pawn";
            pawn.id = "pawn" + i;
            pawn.src = "img/White/pawn.png";
            if (Pawns[i] > 32) pawn.src = "img/Black/pawn.png";
            pawn.onclick = function () {
                console.log(this);
            };
            $("#Box" + Pawns[i]).append(pawn);
        }
    }
}
