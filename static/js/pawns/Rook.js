//console.log("wczytano plik Rook.js");
class Rook extends Pawn {
    constructor(position, type, color) {
        //console.log("konstruktor klasy Rook");
        super(position, type, color);
        this.RookList = [];
    }

    PlaceRooks() {
        board.PawnsPositions.forEach(function (pawn) {
            if (pawn.type == "rook" && !pawn.captured) {
                var newRook = new Rook(pawn.position, pawn.type, pawn.color);
                board.PawnList.push(newRook);
                rook.RookList.push(newRook);
            }
        });
    }

    movement() {
        ui.CurrentPawn = this;
        for (let row = 1; row <= 8; row++) {
            for (let col = 0; col <= 7; col++) {
                if ($("#Box" + String.fromCharCode(col + 65) + row).is(":empty")) {
                    $("#Box" + String.fromCharCode(col + 65) + row).addClass("highlighted");
                    board.Highlighted.push(document.getElementById("Box" + String.fromCharCode(col + 65) + row));
                }
            }
        }
    }

    passive(id, color) {
        for (let num = -3; num < 4; num += 2) {
            try {
                var Prey;
                board.PawnList.forEach((element) => {
                    if (
                        element.position == String.fromCharCode(id.charCodeAt(0) + Math.round(num % 3)) + (parseInt(id.substr(1)) + Math.round(num / 3)) &&
                        !element.captured
                    ) {
                        Prey = element;
                        if (Prey.color != color) {
                            if (Prey.type == "king" || Prey.type == "queen") {
                                board.imprisoning = true;
                                Prey.imprisonment();
                            } else {
                                Prey.captured = true;
                            }
                            $("#Box" + Prey.position).empty();
                        }
                    }
                });
            } catch {}
        }
    }
}
