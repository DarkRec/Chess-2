// obsługa interfejsu aplikacji - przycisków
//(klikologia w interfejsie)
//console.log("wczytano plik Ui.js")

class Ui {
    constructor() {
        this.CurrentPawn;
    }

    move(NewPos) {
        console.log(ui.CurrentPawn.position)
        $("#" + NewPos.id).empty();
        board.PawnList.forEach((element) => {
            if (ui.CurrentPawn != undefined && element.position == ui.CurrentPawn.position && element.captured == false) {
                if (element.type == "elephant") {
                    elephant.charge(element.position, NewPos.id.substr(3))
                }
                element.position = NewPos.id.substr(3);
                //$("#NodesToMove").detach().appendTo('#DestinationContainerNode')
                console.log($(".selected"));
                console.log(element.position);
                console.log(element);
                $(".selected")
                    .detach()
                    .appendTo("#Box" + element.position); //Przenoszenie obiektu z jednego miejsca do drugiego
                board.Highlighted.forEach((element) => {
                    var el = element.id.slice(3, 5);
                    document.getElementById("Box" + el).classList.remove("highlighted");
                });
                board.Highlighted = [];
                ui.CurrentPawn = undefined;
            }
        });

        $(".selected")[0].classList.remove("selected");
        //if (board.PawnColor == "White") board.PawnColor = "Black";
        //else board.PawnColor = "White";
    }
}
$(document).on("click", ".highlighted", function () {
    ui.move(this);
});
