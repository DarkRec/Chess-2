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
                    let elephanttemp = element.position;
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
    }

    openNav() {
        $("#mySidebar")[0].style.width = "250px";
        $("#main-sidebar")[0].style.width = "0px";
    }

    closeNav() {
        $("#mySidebar")[0].style.width = "0";
        $("#main-sidebar")[0].style.width = "50px";
    }
}
$(document).on("click", ".highlighted", function (e) {
    if (e.target.childElementCount == 0) ui.move(this);
    else board.PawnFunction(e.target.children[0]);
});

$(document).on("click", ".prisonbreak", function () {
    board.PawnList.forEach((element) => {
        if (element.banana) {
            if (this.id == "Prison1" && element.position == "Prison1") {
                ui.CurrentPawn.position = "C5"
                element.position = "A5"
                element.banana = false
                $("#Prison1").empty()
                board.BoardReload()
            }
            else if (this.id == "Prison2" && element.position == "Prison2") {
                ui.CurrentPawn.position = "C4"
                element.position = "A4"
                element.banana = false
                $("#Prison2").empty()
                board.BoardReload()
            }
            else if (this.id == "Prison3" && element.position == "Prison3") {
                ui.CurrentPawn.position = "F5"
                element.position = "H5"
                element.banana = false
                $("#Prison3").empty()
                board.BoardReload()
            }
            else if (this.id == "Prison4" && element.position == "Prison4") {
                ui.CurrentPawn.position = "F4"
                element.position = "H4"
                element.banana = false
                $("#Prison4").empty()
                board.BoardReload()
            }
        }
    })
    board.Highlighted.forEach((element) => {
        var el = element.id.slice(3, 5);
        document.getElementById("Box" + el).classList.remove("highlighted");
    });
    board.Highlighted = [];
    $(".prisonbreak")[0].classList.remove("prisonbreak");
});

$(document).on("click", ".BoardField", function (e) {
    if (e.target.localName == "div") $(".highlighted").removeClass("highlighted");
});

$(document).bind("contextmenu", function (e) {
    return false;
});
