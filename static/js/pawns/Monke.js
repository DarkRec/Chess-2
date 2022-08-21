//console.log("wczytano plik Monke.js");
class Monke extends Pawn {
    constructor(position, type, color) {
        //console.log("konstruktor klasy Monke");
        super(position, type, color);
        this.jump = []
    }

    PlaceMonkeys() {
        var Monkeys = board.PawnsPositions.White.Monkeys;
        for (var i in Monkeys.position) {
            board.PawnList.push(
                new Monke(Monkeys.position[i], Monkeys.name, "White")
            );
        }
        var Monkeys = board.PawnsPositions.Black.Monkeys;
        for (var i in Monkeys.position) {
            board.PawnList.push(
                new Monke(Monkeys.position[i], Monkeys.name, "Black")
            );
        }
    }
    movement() {
        ui.CurrentPawn = this
        if (!monke.jump.includes(String.fromCharCode(this.position.charCodeAt(0)) + (parseInt(this.position.substr(1))))) { monke.jump.push(this.position) }
        for (let col = -1; col <= 1; col++) {
            for (let row = -1; row <= 1; row++) {
                try {
                    if (row != 0 || col != 0) {
                        if (($("#Box" + String.fromCharCode(this.position.charCodeAt(0) + col) + (parseInt(this.position.substr(1)) + row))[0].children[0])) {
                            let tempdiv = $("#Box" + String.fromCharCode(this.position.charCodeAt(0) + col * 2) + (parseInt(this.position.substr(1)) + row * 2))[0]
                            if (tempdiv.childElementCount == 0) {
                                tempdiv.classList.add("highlighted");
                                board.Highlighted.push(tempdiv);
                                if (!monke.jump.includes(String.fromCharCode(this.position.charCodeAt(0) + col * 2) + (parseInt(this.position.substr(1)) + row * 2))) {
                                    monke.jump.push(String.fromCharCode(this.position.charCodeAt(0) + col * 2) + (parseInt(this.position.substr(1)) + row * 2))
                                }
                            } else {
                                board.PawnList.forEach((element) => {
                                    if (String.fromCharCode(this.position.charCodeAt(0) + col * 2) + (parseInt(this.position.substr(1)) + row * 2) == element.position) {
                                        if (element.color != this.color) {
                                            tempdiv.classList.add("highlighted");
                                            board.Highlighted.push(tempdiv);
                                            if (!monke.jump.includes(String.fromCharCode(this.position.charCodeAt(0) + col * 2) + (parseInt(this.position.substr(1)) + row * 2))) {
                                                monke.jump.push(String.fromCharCode(this.position.charCodeAt(0) + col * 2) + (parseInt(this.position.substr(1)) + row * 2))
                                            }
                                        }
                                    }
                                });
                            }
                        }
                    }
                } catch { }
            }
        }
        console.log(monke.jump)
    }
}
