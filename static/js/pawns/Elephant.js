console.log("wczytano plik Elephant.js");
class Elephant {
    constructor() {
        console.log("konstruktor klasy Elephant");
        this.PlaceElephants();
    }
    PlaceElephants() {
        var Elephants = [10, 13, 50, 53];
        for (var i in Elephants) {
            var elephant = document.createElement("img");
            elephant.className = "elephant";
            elephant.id = "elephant" + i;
            elephant.src = "img/White/elephant.png";
            if (Elephants[i] > 32) elephant.src = "img/Black/elephant.png";
            elephant.onclick = function () {
                console.log(this);
            };
            $("#Box" + Elephants[i]).append(elephant);
        }
    }
}
