//console.log("wczytano plik FishQueen.js");
class FishQueen extends Pawn {
    constructor(position, type, color) {
        //console.log("konstruktor klasy FishQueen");
        super(position, type, color);
    }

    PlaceFishQueens() {
        board.PawnsPositions.forEach(function (pawn) {
            if (pawn.type == "fishqueen" && !pawn.captured) board.PawnList.push(new FishQueen(pawn.position, pawn.type, pawn.color));
        });
    }

    movement() {
        ui.CurrentPawn = this;
        var tempdiv, figure;
        for (let row = -1; row < 2; row++)
            for (let col = -1; col < 2; col++) {
                if (col == 0 && row == 0);
                else
                    for (let range = 1; range < 8; range++)
                        try {
                            tempdiv = $(
                                "#Box" + String.fromCharCode(this.position.charCodeAt(0) + col * range) + (parseInt(this.position.substr(1)) + row * range)
                            )[0];
                            if (tempdiv.childElementCount == 0) {
                                tempdiv.classList.add("highlighted");
                                board.Highlighted.push(tempdiv);
                            } else {
                                figure = board.PawnList.find((el) => el.position == tempdiv.id.slice(3, 5) && !el.captured);
                                if (figure.color != ui.CurrentPawn.color) {
                                    tempdiv.classList.add("highlighted");
                                    board.Highlighted.push(tempdiv);
                                }
                                break;
                            }
                        } catch {
                            break;
                        }
            }
    }
}
