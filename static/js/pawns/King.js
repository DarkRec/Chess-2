//console.log("wczytano plik King.js");
class King extends Pawn {
    constructor(position, type, color) {
        //console.log("konstruktor klasy King");
        super(position, type, color);
        this.prisoned = false;
        this.banana = true;
    }

    PlaceKings() {
        var Kings = board.PawnsPositions.White.Kings;
        for (var i in Kings.position) {
            board.PawnList.push(new King(Kings.position[i], Kings.name, "White"));
        }
        var Kings = board.PawnsPositions.Black.Kings;
        for (var i in Kings.position) {
            board.PawnList.push(new King(Kings.position[i], Kings.name, "Black"));
        }
    }

    movement() {
        ui.CurrentPawn = this;
        var tempdiv, figure;
        for (let row = -1; row < 2; row++)
            for (let col = -1; col < 2; col++) {
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
