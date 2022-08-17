// obsługa interfejsu aplikacji - przycisków
//(klikologia w interfejsie)
//console.log("wczytano plik Ui.js")

class Ui {
    constructor() {
        this.CurrentPawn = "";
    }

}

$(document).on('click', '.highlighted', function () {
    document.getElementById("Box" + ui.CurrentPawn.position).innerHTML = ""
    document.getElementById("Box" + this.id.substr(3)).innerHTML = ""
    var figure = ""
    board.PawnList.forEach(element => {
        if (element.position == this.id.substr(3)) {
            element.captured = true
            element.position = "xx"
        }
    });
    board.PawnList.forEach(element => {
        if (element.position == ui.CurrentPawn.position) {
            element.position = this.id.substr(3)
            var PawnInfo = element;
            var pawn = document.createElement("img");
            pawn.className = PawnInfo.type;
            pawn.src = "img/" + PawnInfo.color + "/" + PawnInfo.type + ".png";
            pawn.onclick = function () {
                console.log(this.className);
                console.log(this);
                board.Highlighted.forEach(element => {
                    document.getElementById("Box" + element).classList.remove("highlighted")
                });
                board.Highlighted = []
                for (var j in board.PawnList) {
                    if (
                        board.PawnList[j].position ==
                        this.parentElement.id.slice(3, 5)
                    )
                        board.PawnList[j].movement();
                }
            };
            $("#Box" + PawnInfo.position).append(pawn);
            board.Highlighted.forEach(element => {
                document.getElementById("Box" + element).classList.remove("highlighted")
            });
            board.Highlighted = []
        }
    });
});

