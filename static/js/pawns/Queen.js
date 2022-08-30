//console.log("wczytano plik Queen.js");
class Queen extends Pawn {
    constructor(position, type, color, prisoned) {
        //console.log("konstruktor klasy Queen");
        super(position, type, color);
        this.prisoned = prisoned;
    }

    PlaceQueens() {
        board.PawnsPositions.forEach(function (pawn) {
            if (pawn.type == "queen") board.PawnList.push(new Queen(pawn.position, pawn.type, pawn.color, pawn.prisoned));
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

    imprisonment() {
        var Prisoner = this;
        if (this.color == "White") {
            if ($("#Prison3")[0].childElementCount == 0) {
                $("#Prison3")[0].classList.add("prisonOpen");
                this.position = "Prison3";
            }
            if ($("#Prison4")[0].childElementCount == 0) {
                $("#Prison4")[0].classList.add("prisonOpen");
                this.position = "Prison4";
            }
        } else {
            if ($("#Prison1")[0].childElementCount == 0) {
                $("#Prison1")[0].classList.add("prisonOpen");
                this.position = "Prison1";
            }
            if ($("#Prison2")[0].childElementCount == 0) {
                $("#Prison2")[0].classList.add("prisonOpen");
                this.position = "Prison2";
            }
            net.UpdatePawns();
        }
        $(".prisonOpen").on("click.prisonOpen", function () {
            if (board.imprisoning) {
                Prisoner.position = this.id;
                var pawn = document.createElement("img");
                pawn.className = Prisoner.type;
                pawn.src = "img/" + Prisoner.color + "/" + (Prisoner.banana ? "banana" : "") + Prisoner.type + ".png";
                $(this).append(pawn);
                $(".prisonOpen").off("click.prisonOpen");
                $(".prisonOpen").removeClass("prisonOpen");
                board.imprisoning = false;
                net.UpdatePawns();
                board.win();
            }
        });
    }
}
