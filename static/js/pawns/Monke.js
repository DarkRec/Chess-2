//console.log("wczytano plik Monke.js");
class Monke extends Pawn {
    constructor(position, type, color, banana) {
        //console.log("konstruktor klasy Monke");
        super(position, type, color);
        this.jump = [];
        this.howmanymonke = 1;
        this.banana = banana;
    }

    PlaceMonkeys() {
        board.PawnsPositions.forEach(function (pawn) {
            if (pawn.type == "monke" && !pawn.captured) board.PawnList.push(new Monke(pawn.position, pawn.type, pawn.color, pawn.banana));
        });
    }

    movement() {
        monke.jump = [];
        monke.howmanymonke = 1;
        ui.CurrentPawn = this;
        monke.jump.push(this.position);
        for (let monketab = 0; monketab <= monke.howmanymonke; monketab++) {
            this.monkes(monke.jump[monketab]);
        }
        this.unprison(this);
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
    }

    unprison() {
        board.PawnList.forEach((element) => {
            try {
                if (element.banana) {
                    if (element.position == "Prison1" && this.color != "White") {
                        if (monke.jump.includes("C5") && monke.jump.includes("A5") && $("#BoxB5")[0].children[0]) {
                            $("#Prison1")[0].classList.add("prisonbreak");
                        }
                    } else if (element.position == "Prison2" && this.color != "White") {
                        if (monke.jump.includes("C4") && monke.jump.includes("A4") && $("#BoxB4")[0].children[0]) {
                            $("#Prison2")[0].classList.add("prisonbreak");
                        }
                    } else if (element.position == "Prison3" && this.color == "White") {
                        if (monke.jump.includes("F5") && monke.jump.includes("H5") && $("#BoxG5")[0].children[0]) {
                            $("#Prison3")[0].classList.add("prisonbreak");
                        }
                    } else if (element.position == "Prison4" && this.color == "White") {
                        if (monke.jump.includes("F4") && monke.jump.includes("H4") && $("#BoxG4")[0].children[0]) {
                            $("#Prison4")[0].classList.add("prisonbreak");
                        }
                    }
                }
            } catch {}
        });
    }
}
