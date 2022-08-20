//console.log("wczytano plik King.js");
class King extends Pawn {
    constructor(position, type, color) {
        //console.log("konstruktor klasy King");
        super(position, type, color);
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
                        if (figure.color != this.color && !figure.captured) {
                            tempdiv.classList.add("highlighted");
                            board.Highlighted.push(tempdiv);
                        }
                    }
                } catch {}
            }
    }
}
