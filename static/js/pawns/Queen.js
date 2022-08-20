//console.log("wczytano plik Queen.js");
class Queen extends Pawn {
    constructor(position, type, color) {
        //console.log("konstruktor klasy Queen");
        super(position, type, color);
        this.prisoned = false;
    }

    PlaceQueens() {
        var Queens = board.PawnsPositions.White.Queens;
        for (var i in Queens.position) {
            board.PawnList.push(new Queen(Queens.position[i], Queens.name, "White"));
        }
        var Queens = board.PawnsPositions.Black.Queens;
        for (var i in Queens.position) {
            board.PawnList.push(new Queen(Queens.position[i], Queens.name, "Black"));
        }
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
                            tempdiv = $("#Box" + String.fromCharCode(this.position.charCodeAt(0) + col * range) + (parseInt(this.position.substr(1)) + row * range))[0];
                            if (tempdiv.childElementCount == 0) {
                                tempdiv.classList.add("highlighted");
                                board.Highlighted.push(tempdiv);
                            } else {
                                figure = board.PawnList.find((el) => el.position == tempdiv.id.slice(3, 5));
                                if (figure.color != ui.CurrentPawn.color && !figure.captured) {
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

    imprisonment() {
        var Prisoner = this;
        if (this.color == "White") {
            if ($("#Prison3")[0].childElementCount == 0) $("#Prison3")[0].classList.add("prisonOpen");
            if ($("#Prison4")[0].childElementCount == 0) $("#Prison4")[0].classList.add("prisonOpen");
        } else {
            if ($("#Prison1")[0].childElementCount == 0) $("#Prison1")[0].classList.add("prisonOpen");
            if ($("#Prison2")[0].childElementCount == 0) $("#Prison2")[0].classList.add("prisonOpen");
        }
        $(".prisonOpen").on("click.prisonOpen", function () {
            if (board.imprisoning) {
                Prisoner.position = this.id;
                var pawn = document.createElement("img");
                pawn.className = Prisoner.type;
                pawn.src = "img/" + Prisoner.color + "/" + Prisoner.type + ".png";
                $(this).append(pawn);
                $(".prisonOpen").off("click.prisonOpen");
                $(".prisonOpen").removeClass("prisonOpen");
                board.imprisoning = false;
            }
        });
    }
}
