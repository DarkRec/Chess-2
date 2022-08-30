//console.log("wczytano plik Dev.js")
class Dev {
    constructor() {
        this.DevMode = true;
        this.PawnTypes = ["fish", "fishqueen", "elephant", "rook", "monke", "queen", "bananaking"];
        this.CurrentPawn;
        this.Controlls();
    }

    Controlls() {
        $("<div/>", {
            id: "switch",
        }).appendTo("#controllPanel");
        $("<label/>", {
            for: "DevMode",
            text: "DevMode",
        }).appendTo("#switch");

        $("<input/>", {
            type: "checkbox",
            name: "DevMode",
            id: "DevModeSwitch",
            class: "switch_1",
        }).appendTo("#switch");

        $("#DevModeSwitch").on("change", function (e) {
            if (this.checked) {
                this.DevMode = true;
                $(document).on("click", ".BoardField", function (e) {
                    dev.CurrentPawn.position = e.target.id.slice(3, 5);
                    if (dev.CurrentPawn) {
                        if (dev.CurrentPawn.type == "fish")
                            board.PawnList.push(new Fish(dev.CurrentPawn.position, dev.CurrentPawn.type, dev.CurrentPawn.color));
                        else if (dev.CurrentPawn.type == "fishqueen")
                            board.PawnList.push(new FishQueen(dev.CurrentPawn.position, dev.CurrentPawn.type, dev.CurrentPawn.color));
                        else if (dev.CurrentPawn.type == "elephant")
                            board.PawnList.push(new Elephant(dev.CurrentPawn.position, dev.CurrentPawn.type, dev.CurrentPawn.color));
                        else if (dev.CurrentPawn.type == "rook")
                            board.PawnList.push(new Rook(dev.CurrentPawn.position, dev.CurrentPawn.type, dev.CurrentPawn.color));
                        else if (dev.CurrentPawn.type == "monke")
                            board.PawnList.push(new Monke(dev.CurrentPawn.position, dev.CurrentPawn.type, dev.CurrentPawn.color));
                        else if (dev.CurrentPawn.type == "queen")
                            board.PawnList.push(new Queen(dev.CurrentPawn.position, dev.CurrentPawn.type, dev.CurrentPawn.color));
                        else if (dev.CurrentPawn.type == "bananaking")
                            board.PawnList.push(new King(dev.CurrentPawn.position, dev.CurrentPawn.type, dev.CurrentPawn.color));
                        board.CreatePawn(dev.CurrentPawn);
                    }
                });
                $(".BoardField").bind("contextmenu", function (e) {
                    $("#" + this.id).empty();
                    for (var j in board.PawnList)
                        if (board.PawnList[j].position == this.id.slice(3, 5) && !board.PawnList[j].captured) board.PawnList[j].captured = true;
                });
            } else {
                if ($(".PawnSelect").length != 0) $(".PawnSelect")[0].classList.remove("PawnSelect");
                this.DevMode = true;
                $(document).off("click", ".BoardField");
                $(".BoardField").unbind("contextmenu");
            }
        });

        $("<div/>", {
            id: "PawnsList",
        }).appendTo("#controllPanel");

        this.PawnTypes.forEach((TypeName) => {
            var div = $("<div/>", {
                class: "samePawn",
            }).appendTo("#PawnsList");
            var WBtab = ["White", "Black"];
            for (var i in WBtab) {
                var div2 = $("<div/>").appendTo(div);
                $("<img/>", {
                    src: "img/" + WBtab[i] + "/" + TypeName + ".png",
                    click: function () {
                        dev.CurrentPawn = undefined;
                        if ($(".PawnSelect").length != 0) $(".PawnSelect")[0].classList.remove("PawnSelect");
                        this.parentElement.classList.add("PawnSelect");
                        dev.CurrentPawn = {
                            color: this.src.split("/")[this.src.split("/").length - 2],
                            type: this.src.split("/")[this.src.split("/").length - 1].split(".")[0],
                        };
                    },
                }).appendTo(div2);
            }
        });

        $("<button/>").appendTo("#controllPanel");
        var span = document.createElement("span");
        span.innerText = "Reset";
        span.onclick = function () {
            net.ResetPawns();
        };
        $("button").append(span);
        var iDiv = document.createElement("i");
        iDiv.onclick = function () {
            net.ResetPawns();
        };
        $("button").append(iDiv);
    }
}
