//console.log("wczytano plik Fish.js");
class Fish extends Pawn {
    constructor(position, type, color) {
        //console.log("konstruktor klasy Fish");
        super(position, type, color);
    }

    PlaceFishes() {
        var Fishes = board.PawnsPositions.White.Fishes;
        for (var i in Fishes.position) {
            board.PawnList.push(
                new Fish(Fishes.position[i], Fishes.name, "White")
            );
        }
        var Fishes = board.PawnsPositions.Black.Fishes;
        for (var i in Fishes.position) {
            board.PawnList.push(
                new Fish(Fishes.position[i], Fishes.name, "Black")
            );
        }
    }
    movement() {
        ui.CurrentPawn = this
        if (this.color == "White") {
            var tempdiv = ""
            for (let number = -1; number < 2; number++) {
                try {
                    tempdiv = document.getElementById("Box" + String.fromCharCode(this.position.charCodeAt(0) + number) + (parseInt(this.position.substr(1)) + 1))
                    console.log(tempdiv.children[0])
                    if (tempdiv.childElementCount == 0) {
                        tempdiv.classList.add("highlighted")
                        board.Highlighted.push(String.fromCharCode(this.position.charCodeAt(0) + number) + (parseInt(this.position.substr(1)) + 1))
                    }
                    else {
                        var figure = ""
                        board.PawnList.forEach(element => {
                            if (element.position == String.fromCharCode(this.position.charCodeAt(0) + number) + (parseInt(this.position.substr(1)) + 1)) {
                                figure = element
                            }
                        });
                        if (figure.color == "Black" && number != 0) {
                            tempdiv.classList.add("highlighted")
                            board.Highlighted.push(String.fromCharCode(this.position.charCodeAt(0) + number) + (parseInt(this.position.substr(1)) + 1))
                        }
                    }
                }
                catch { }
            }
        }
        else {
            var tempdiv = ""
            for (let number = -1; number < 2; number++) {
                try {
                    tempdiv = document.getElementById("Box" + String.fromCharCode(this.position.charCodeAt(0) + number) + (parseInt(this.position.substr(1)) - 1))
                    console.log(tempdiv.children[0])
                    if (tempdiv.childElementCount == 0) {
                        tempdiv.classList.add("highlighted")
                        board.Highlighted.push(String.fromCharCode(this.position.charCodeAt(0) + number) + (parseInt(this.position.substr(1)) - 1))
                    }
                    else {
                        var figure = ""
                        board.PawnList.forEach(element => {
                            if (element.position == String.fromCharCode(this.position.charCodeAt(0) + number) + (parseInt(this.position.substr(1)) - 1)) {
                                figure = element
                            }
                        });
                        if (figure.color == "White" && number != 0) {
                            tempdiv.classList.add("highlighted")
                            board.Highlighted.push(String.fromCharCode(this.position.charCodeAt(0) + number) + (parseInt(this.position.substr(1)) - 1))
                        }
                    }
                }
                catch { }
            }
        }
    }
}
