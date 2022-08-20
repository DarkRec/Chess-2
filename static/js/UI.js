// obsługa interfejsu aplikacji - przycisków
//(klikologia w interfejsie)
//console.log("wczytano plik Ui.js")

class Ui {
    constructor() {
        this.CurrentPawn;
    }

    move(NewPos) {
        $("#" + NewPos.id).empty();
        board.PawnList.forEach((element) => {
            try {
                if (element.position == ui.CurrentPawn.position && element.captured == false) {
                    if (element.type == "elephant") elephant.charge(element.position, NewPos.id.substr(3));
                    element.position = NewPos.id.substr(3);
                    //$("#NodesToMove").detach().appendTo('#DestinationContainerNode')
                    $(".selected")
                        .detach()
                        .appendTo("#Box" + element.position); //Przenoszenie obiektu z jednego miejsca do drugiego
                    board.Highlighted.forEach((element) => {
                        var el = element.id.slice(3, 5);
                        document.getElementById("Box" + el).classList.remove("highlighted");
                    });
                    if (board.capturing)
                        rook.RookList.forEach((element) => {
                            if (!element.captured && ui.CurrentPawn.color != element.color) rook.passive(element.position);
                        });
                    board.Highlighted = [];
                    board.capturing = false;
                    ui.CurrentPawn = undefined;
                }
            } catch {}
        });
        try {
            $(".selected")[0].classList.remove("selected");
        } catch {}
        //if (board.PawnColor == "White") board.PawnColor = "Black";
        //else board.PawnColor = "White";
    }
}
$(document).on("click", ".highlighted", function () {
    ui.move(this);
});
