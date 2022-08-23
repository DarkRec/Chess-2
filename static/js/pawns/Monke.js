//console.log("wczytano plik Monke.js");
class Monke extends Pawn {
    constructor(position, type, color) {
        //console.log("konstruktor klasy Monke");
        super(position, type, color);
        this.jump = [];
        this.howmanymonke = 1;
    }
    PlaceMonkeys() {
        var Monkeys = board.PawnsPositions.White.Monkeys;
        for (var i in Monkeys.position) board.PawnList.push(new Monke(Monkeys.position[i], Monkeys.name, "White"));
        var Monkeys = board.PawnsPositions.Black.Monkeys;
        for (var i in Monkeys.position) board.PawnList.push(new Monke(Monkeys.position[i], Monkeys.name, "Black"));
    }
    movement() {
        monke.jump = [];
        monke.howmanymonke = 1;
        ui.CurrentPawn = this;
        monke.jump.push(this.position);
        for (let monketab = 0; monketab <= monke.howmanymonke; monketab++) {
            this.monkes(monke.jump[monketab]);
        }
        for (let col = -1; col <= 1; col++) {
            for (let row = -1; row <= 1; row++) {
                try {
                    if (col == 0 || row == 0) {
                        if (col == 0 && row == 0) {
                        } else {
                            let tempdiv = $(
                                "#Box" + String.fromCharCode(ui.CurrentPawn.position.charCodeAt(0) + col) + (parseInt(ui.CurrentPawn.position.substr(1)) + row)
                            )[0];
                            if (tempdiv.children.length == 0) {
                                tempdiv.classList.add("highlighted");
                                board.Highlighted.push(tempdiv);
                            }
                        }
                    }
                } catch {}
            }
        }
    }
    monkes(pos) {
        for (let col = -1; col <= 1; col++) {
            for (let row = -1; row <= 1; row++) {
                try {
                    if (row != 0 || col != 0) {
                        //console.log(pos)
                        if ($("#Box" + String.fromCharCode(pos.charCodeAt(0) + col) + (parseInt(pos.substr(1)) + row))[0].children[0]) {
                            let tempdiv = $("#Box" + String.fromCharCode(pos.charCodeAt(0) + col * 2) + (parseInt(pos.substr(1)) + row * 2))[0];
                            if (tempdiv.childElementCount == 0) {
                                tempdiv.classList.add("highlighted");
                                board.Highlighted.push(tempdiv);
                                if (!monke.jump.includes(String.fromCharCode(pos.charCodeAt(0) + col * 2) + (parseInt(pos.substr(1)) + row * 2))) {
                                    monke.jump.push(String.fromCharCode(pos.charCodeAt(0) + col * 2) + (parseInt(pos.substr(1)) + row * 2));
                                    monke.howmanymonke++;
                                }
                            } else {
                                board.PawnList.forEach((element) => {
                                    if (String.fromCharCode(pos.charCodeAt(0) + col * 2) + (parseInt(pos.substr(1)) + row * 2) == element.position) {
                                        if (element.color != this.color && element.captured == false) {
                                            tempdiv.classList.add("highlighted");
                                            board.Highlighted.push(tempdiv);
                                        }
                                    }
                                });
                            }
                        }
                    }
                } catch {}
            }
        }
        //console.log(monke.jump)
    }
}
