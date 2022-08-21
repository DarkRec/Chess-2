// obsługa interfejsu aplikacji - przycisków
//(klikologia w interfejsie)
//console.log("wczytano plik Ui.js")

class Ui {
    constructor() {
        this.CurrentPawn;
        this.HitPawn;
    }

    move(NewPos) {
        $("#" + NewPos.id).empty();
        board.PawnList.forEach((element) => {
            try {
                if (element.position == ui.CurrentPawn.position && element.captured == false) {
                    let elephanttemp = element.position
                    element.position = NewPos.id.substr(3);
                    //$("#NodesToMove").detach().appendTo('#DestinationContainerNode')
                    $(".selected")
                        .detach()
                        .appendTo("#Box" + element.position); //Przenoszenie obiektu z jednego miejsca do drugiego
                    board.Highlighted.forEach((element) => {
                        var el = element.id.slice(3, 5);
                        document.getElementById("Box" + el).classList.remove("highlighted");
                    });
                    if (element.type == "elephant") elephant.charge(elephanttemp, NewPos.id.substr(3));
                    if (ui.CurrentPawn.type == "fish")
                        if (
                            (ui.CurrentPawn.color == "White" && ui.CurrentPawn.position[1] == 8) ||
                            (ui.CurrentPawn.color == "Black" && ui.CurrentPawn.position[1] == 1 && !ui.CurrentPawn.captured)
                        ) {
                            ui.CurrentPawn.captured = true;
                            $("#" + NewPos.id).empty();
                            let FishUpgrade = new FishQueen(ui.CurrentPawn.position, "FishQueen", ui.CurrentPawn.color);
                            board.PawnList.push(FishUpgrade);
                            board.CreatePawn(FishUpgrade);
                            console.log(FishUpgrade);
                        }
                    if (board.capturing)
                        rook.RookList.forEach((element) => {
                            if (!element.captured && ui.CurrentPawn.color != element.color) rook.passive(element.position, element.color);
                        });
                    board.Highlighted = [];
                    board.capturing = false;
                    ui.CurrentPawn = undefined;
                }
            } catch { }
        });
        try {
            $(".selected")[0].classList.remove("selected");
        } catch { }
        //if (board.PawnColor == "White") board.PawnColor = "Black";
        //else board.PawnColor = "White";
    }
}
$(document).on("click", ".highlighted", function () {
    ui.move(this);
});
