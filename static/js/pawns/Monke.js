console.log("wczytano plik Monke.js");
class Monke {
    constructor() {
        console.log("konstruktor klasy Monke");
        this.PlaceMonkes();
    }
    PlaceMonkes() {
        var Monkes = [1, 6, 57, 62];
        for (var i in Monkes) {
            var monke = document.createElement("img");
            monke.className = "monke";
            monke.id = "monke" + i;
            monke.src = "img/White/monke.png";
            if (Monkes[i] > 32) monke.src = "img/Black/monke.png";
            monke.onclick = function () {
                console.log(this);
            };
            $("#Box" + Monkes[i]).append(monke);
        }
    }
}
