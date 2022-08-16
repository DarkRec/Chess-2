console.log("wczytano plik Rook.js");
class Rook {
    constructor() {
        console.log("konstruktor klasy Rook");
        this.PlaceRooks();
    }
    PlaceRooks() {
        var Rooks = [0, 7, 56, 63];
        for (var i in Rooks) {
            var rook = document.createElement("img");
            rook.className = "rook";
            rook.id = "rook" + i;
            rook.src = "img/White/rook.png";
            if (Rooks[i] > 32) rook.src = "img/Black/rook.png";
            rook.onclick = function () {
                console.log(this);
            };
            $("#Box" + Rooks[i]).append(rook);
        }
    }
}
