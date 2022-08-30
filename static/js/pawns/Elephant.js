//console.log("wczytano plik Elephant.js");
class Elephant extends Pawn {
    constructor(position, type, color) {
        //console.log("konstruktor klasy Elephant");
        super(position, type, color);
    }

    PlaceElephants() {
        board.PawnsPositions.forEach(function (pawn) {
            if (pawn.type == "elephant" && !pawn.captured) board.PawnList.push(new Elephant(pawn.position, pawn.type, pawn.color));
        });
    }

    movement() {
        ui.CurrentPawn = this;
        var tempdiv, figure;
        for (let row = -2; row <= 2; row += 4)
            for (let col = -2; col <= 2; col += 4) {
                try {
                    tempdiv = $("#Box" + String.fromCharCode(this.position.charCodeAt(0) + col) + (parseInt(this.position.substr(1)) + row))[0];
                    if (tempdiv.childElementCount == 0) {
                        tempdiv.classList.add("highlighted");
                        board.Highlighted.push(tempdiv);
                    } else {
                        board.PawnList.forEach((element) => {
                            if (element.position == tempdiv.id.slice(3, 5) && !element.captured) figure = element;
                        });
                        if (figure.color != this.color) {
                            tempdiv.classList.add("highlighted");
                            board.Highlighted.push(tempdiv);
                        }
                    }
                } catch {}
            }
    }
    charge(start, destination) {
        for (let row = -2; row <= 2; row += 4) {
            for (let col = -2; col <= 2; col += 4) {
                if (destination == String.fromCharCode(start.charCodeAt(0) + col) + (parseInt(start.substr(1)) + row)) {
                    $("#Box" + String.fromCharCode(start.charCodeAt(0) + col / 2) + (parseInt(start.substr(1)) + row / 2)).empty();
                    board.PawnList.forEach((element) => {
                        if (element.position == String.fromCharCode(start.charCodeAt(0) + col / 2) + (parseInt(start.substr(1)) + row / 2)) {
                            if (element.type == "king" || element.type == "queen") {
                                board.imprisoning = true;
                                element.imprisonment();
                            }
                            element.captured = true;
                            net.UpdatePawns();
                            let temp = element;
                            rook.RookList.forEach((element) => {
                                if (!element.captured && temp.color == element.color) rook.passive(element.position, temp.color);
                            });
                            if (element.color != ui.CurrentPawn.color) board.capturing = true;
                        }
                    });
                }
            }
        }
    }
}
