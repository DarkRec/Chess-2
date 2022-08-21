console.log("wczytano plik Board.js");
class Board {
    constructor() {
        console.log("konstruktor klasy Board");
        this.boardGenerate();
    }
    boardGenerate() {
        var backgroundColor = "white";
        for (var i = 0; i < 64; i++) {
            var box = document.createElement("div");
            box.className = "BoardField";
            box.id = "Box" + i;
            var change = i % 8 === 0;
            var backgroundColor = change
                ? backgroundColor
                : backgroundColor === "white"
                ? "deepskyblue" //#748bbd
                : "white";
            box.style.backgroundColor = backgroundColor;
            $("#board").append(box);
        }
<<<<<<< Updated upstream
=======
        $(document).ready(function () {
            fish.PlaceFishes();
            rook.PlaceRooks();
            monke.PlaceMonkeys();
            elephant.PlaceElephants();
            king.PlaceKings();
            queen.PlaceQueens();
            board.PlacePawns();
        });
    }

    PlacePawns() {
        for (var i in board.PawnList) {
            if (!board.PawnList[i].captured) {
                board.CreatePawn(board.PawnList[i]);
            }
        }
    }

    CreatePawn(PawnInfo) {
        var pawn = document.createElement("img");
        pawn.className = PawnInfo.type;
        pawn.src = "img/" + PawnInfo.color + "/" + PawnInfo.type + ".png";
        pawn.onclick = function () {
            board.PawnFunction(this);
        };
        $("#Box" + PawnInfo.position).append(pawn);
    }

    BoardReload() {
        //PlacePawnsFromPawnList
        let boardDiv = $(".BoardField");
        for (var i = 0; i < boardDiv.length; i++) {
            $("#" + boardDiv[i].id).empty();
        }
        this.PlacePawns();
    }

    PawnFunction(DIV) {
        if (!board.imprisoning) {
            try {
                $(".selected")[0].classList.remove("selected");
            } catch { }
            DIV.classList.add("selected");
            board.Highlighted.forEach((element) => {
                var el = element.id.slice(3, 5);
                console.log(el)
                document.getElementById("Box" + el).classList.remove("highlighted");
                if (DIV.parentElement && DIV.parentElement == element) board.Capture(DIV.parentElement);
            });
            board.Highlighted = [];
            for (var j in board.PawnList) {
                try {
                    if (
                        !board.PawnList[j].captured &&
                        board.PawnList[j].position == DIV.parentElement.id.slice(3, 5) &&
                        (ui.CurrentPawn == undefined || ui.CurrentPawn.color == DIV.src.split("/")[DIV.src.split("/").length - 2])
                    )
                        board.PawnList[j].movement();
                } catch { }
            }
        }
    }

    Capture(Pawn) {
        board.capturing = true;
        $("#Box" + ui.CurrentPawn.position)[0].children[0].classList.add("selected");
        for (var j in board.PawnList)
            if (board.PawnList[j].position == Pawn.id.slice(3, 5)) {
                if (board.PawnList[j].type == "king" || board.PawnList[j].type == "queen") {
                    board.imprisoning = true;
                    board.PawnList[j].imprisonment();
                } else board.PawnList[j].captured = true;
            }
        ui.move(Pawn);
>>>>>>> Stashed changes
    }
}
