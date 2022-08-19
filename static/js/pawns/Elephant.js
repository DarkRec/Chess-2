//console.log("wczytano plik Elephant.js");
class Elephant extends Pawn {
    constructor(position, type, color) {
        //console.log("konstruktor klasy Elephant");
        super(position, type, color);
    }

    PlaceElephants() {
        var Elephants = board.PawnsPositions.White.Elephants;
        for (var i in Elephants.position) {
            board.PawnList.push(
                new Elephant(Elephants.position[i], Elephants.name, "White")
            );
        }
        var Elephants = board.PawnsPositions.Black.Elephants;
        for (var i in Elephants.position) {
            board.PawnList.push(
                new Elephant(Elephants.position[i], Elephants.name, "Black")
            );
        }
    }
    movement() {
        console.log(board.PawnList)
        ui.CurrentPawn = this;
        var tempdiv;
        var figure;
        //if (this.color == board.PawnColor)
        for (let row = -2; row <= 2; row += 4)
            for (let col = -2; col <= 2; col += 4) {
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
                            if (figure.color == "Black" && figure.captured == false && col != 0 && row != 0) {
                                tempdiv.classList.add("highlighted");
                                board.Highlighted.push(tempdiv);
                            }
                        }
                    } catch { }
                } else {
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
                            if (figure.color == "White" && figure.captured == false && col != 0 && row != 0) {
                                tempdiv.classList.add("highlighted");
                                board.Highlighted.push(tempdiv);
                            }
                        }
                    } catch { }
                }
            }
    }
    charge(start, destination) {
        console.log(start)
        console.log(destination)
        for (let row = -2; row <= 2; row += 4) {
            for (let col = -2; col <= 2; col += 4) {
                if (destination == String.fromCharCode(start.charCodeAt(0) + col) + (parseInt(start.substr(1)) + row)) {
                    $("#Box" + String.fromCharCode(start.charCodeAt(0) + col / 2) + (parseInt(start.substr(1)) + row / 2)).empty()
                    board.PawnList.forEach((element) => {
                        if (element.position == String.fromCharCode(start.charCodeAt(0) + col / 2) + (parseInt(start.substr(1)) + row / 2)) {
                            element.captured = true
                        }
                    });
                }
            }
        }
    }
}
