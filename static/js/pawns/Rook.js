//console.log("wczytano plik Rook.js");
class Rook extends Pawn {
    constructor(position, type, color) {
        //console.log("konstruktor klasy Rook");
        super(position, type, color);
        this.RookList = [];
    }

    PlaceRooks() {
        var Rooks = board.PawnsPositions.White.Rooks;
        for (var i in Rooks.position) {
            var newRook = new Rook(Rooks.position[i], Rooks.name, "White");
            board.PawnList.push(newRook);
            rook.RookList.push(newRook);
        }
        var Rooks = board.PawnsPositions.Black.Rooks;
        for (var i in Rooks.position) {
            var newRook = new Rook(Rooks.position[i], Rooks.name, "Black");
            board.PawnList.push(newRook);
            rook.RookList.push(newRook);
        }
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
    passive(id) {
        for (let num = -3; num < 4; num += 2) {
            try {
                var Prey = board.PawnList.find(
                    (el) => el.position == String.fromCharCode(id.charCodeAt(0) + Math.round(num % 3)) + (parseInt(id.substr(1)) + Math.round(num / 3))
                );
                if (Prey.type == "king" || Prey.type == "queen") {
                    board.imprisoning = true;
                    Prey.imprisonment();
                }
                if (Prey.color == ui.CurrentPawn.color && !Prey.captured) {
                    Prey.captured = true;
                    $("#Box" + Prey.position).empty();
                }
            } catch {}
        }
    }
}
