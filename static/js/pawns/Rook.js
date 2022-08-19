//console.log("wczytano plik Rook.js");
class Rook extends Pawn {
    constructor(position, type, color) {
        //console.log("konstruktor klasy Rook");
        super(position, type, color);
    }

    PlaceRooks() {
        var Rooks = board.PawnsPositions.White.Rooks;
        for (var i in Rooks.position) {
            board.PawnList.push(
                new Rook(Rooks.position[i], Rooks.name, "White")
            );
        }
        var Rooks = board.PawnsPositions.Black.Rooks;
        for (var i in Rooks.position) {
            board.PawnList.push(
                new Rook(Rooks.position[i], Rooks.name, "Black")
            );
        }
    }

    movement() {
        ui.CurrentPawn = this;
        for (let row = 1; row <= 8; row++) {
            for (let col = 0; col <= 7; col++) {
                if ($("#Box" + String.fromCharCode(col + 65) + row).is(':empty')) {
                    $("#Box" + String.fromCharCode(col + 65) + row).addClass("highlighted")
                    board.Highlighted.push(document.getElementById("Box" + String.fromCharCode(col + 65) + row));
                }
            }
        }
    }
}
