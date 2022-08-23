//console.log("wczytano plik Fish.js");
class Fish extends Pawn {
    constructor(position, type, color) {
        //console.log("konstruktor klasy Fish");
        super(position, type, color);
    }

    PlaceFishes() {
        var Fishes = board.PawnsPositions.White.Fishes;
        for (var i in Fishes.position) board.PawnList.push(new Fish(Fishes.position[i], Fishes.name, "White"));
        var Fishes = board.PawnsPositions.Black.Fishes;
        for (var i in Fishes.position) board.PawnList.push(new Fish(Fishes.position[i], Fishes.name, "Black"));
    }

    movement() {
        ui.CurrentPawn = this;
        var tempdiv, figure, tempRow;
        for (let row = 1; row >= 0; row--) {
            tempRow = row;
            if (this.color == "Black") {
                tempRow *= -1;
            }
            for (let col = -1; col < 2; col++) {
                try {
                    tempdiv = $("#Box" + String.fromCharCode(this.position.charCodeAt(0) + col) + (parseInt(this.position.substr(1)) + tempRow))[0];
                    if (tempdiv.childElementCount == 0) {
                        tempdiv.classList.add("highlighted");
                        board.Highlighted.push(tempdiv);
                    } else {
                        board.PawnList.forEach((element) => {
                            if (element.position == tempdiv.id.slice(3, 5) && !element.captured) figure = element;
                        });
                        if (figure.color != this.color && col != 0 && row != 0) {
                            tempdiv.classList.add("highlighted");
                            board.Highlighted.push(tempdiv);
                        }
                    }
                } catch {}
            }
        }
    }
}
