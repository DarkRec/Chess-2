//console.log("wczytano plik Fish.js");
class Fish extends Pawn {
    constructor(position, type, color) {
        //console.log("konstruktor klasy Fish");
        super(position, type, color);
    }

    PlaceFishes() {
        var Fishes = board.PawnsPositions.White.Fishes;
        for (var i in Fishes.position) {
            board.PawnList.push(new Fish(Fishes.position[i], Fishes.name, "White"));
        }
        var Fishes = board.PawnsPositions.Black.Fishes;
        for (var i in Fishes.position) {
            board.PawnList.push(new Fish(Fishes.position[i], Fishes.name, "Black"));
        }
    }
    movement() {
        ui.CurrentPawn = this;
        var tempdiv;
        var figure;
        //if (this.color == board.PawnColor)
        for (let row = 1; row >= 0; row--)
            for (let col = -1; col < 2; col++) {
                if (this.color == "White") {
                    try {
                        tempdiv = document.getElementById("Box" + String.fromCharCode(this.position.charCodeAt(0) + col) + (parseInt(this.position.substr(1)) + row));
                        if (tempdiv.childElementCount == 0) {
                            tempdiv.classList.add("highlighted");
                            board.Highlighted.push(tempdiv);
                        } else {
                            board.PawnList.forEach((element) => {
                                if (element.position == tempdiv.id.slice(3, 5)) {
                                    figure = element;
                                }
                            });
                            if (figure.color == "Black" && col != 0 && row != 0) {
                                tempdiv.classList.add("highlighted");
                                board.Highlighted.push(tempdiv);
                            }
                        }
                    } catch {}
                } else {
                    try {
                        tempdiv = document.getElementById("Box" + String.fromCharCode(this.position.charCodeAt(0) + col) + (parseInt(this.position.substr(1)) - row));
                        if (tempdiv.childElementCount == 0) {
                            tempdiv.classList.add("highlighted");
                            board.Highlighted.push(tempdiv);
                        } else {
                            board.PawnList.forEach((element) => {
                                if (element.position == tempdiv.id.slice(3, 5)) {
                                    figure = element;
                                }
                            });
                            if (figure.color == "White" && col != 0 && row != 0) {
                                tempdiv.classList.add("highlighted");
                                board.Highlighted.push(tempdiv);
                            }
                        }
                    } catch {}
                }
            }
    }
}
