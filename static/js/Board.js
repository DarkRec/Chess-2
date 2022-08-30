//console.log("wczytano plik Board.js");
class Board {
    constructor() {
        //console.log("konstruktor klasy Board");
        this.PawnList = [];
        this.Highlighted = [];
        this.BoardStructure = [
            ["", "C ", "CA", "CB", "CC", "CD", "CE", "CF", "CG", "CH", "C ", ""],
            ["", "C8", "B", "B", "B", "B", "B", "B", "B", "B", "C8", ""],
            ["", "C7", "B", "B", "B", "B", "B", "B", "B", "B", "C7", ""],
            ["", "C6", "B", "B", "B", "B", "B", "B", "B", "B", "C6", ""],
            ["P1", "C5", "B", "B", "B", "B", "B", "B", "B", "B", "C5", "P3"],
            ["P2", "C4", "B", "B", "B", "B", "B", "B", "B", "B", "C4", "P4"],
            ["", "C3", "B", "B", "B", "B", "B", "B", "B", "B", "C3", ""],
            ["", "C2", "B", "B", "B", "B", "B", "B", "B", "B", "C2", ""],
            ["", "C1", "B", "B", "B", "B", "B", "B", "B", "B", "C1", ""],
            ["", "C ", "CA", "CB", "CC", "CD", "CE", "CF", "CG", "CH", "C ", ""],
        ];
        this.PawnsPositions = [];
        this.PawnColor = "White";
        this.capturing = false;
        this.imprisoning = false;
        this.boardGenerate();
    }

    boardGenerate() {
        for (var row in this.BoardStructure) {
            var rowDiv = document.createElement("div");
            rowDiv.id = "Row" + row;
            rowDiv.className = "BoardRow";
            $("#board").append(rowDiv);
            for (var col in this.BoardStructure[row]) {
                var Field = this.BoardStructure[row][col];
                var Box = document.createElement("div");
                if (Field[0] == "C") {
                    Box.classList.add("InfoField");
                    Box.innerText = Field[1];
                } else if (Field[0] == "B") {
                    Box.classList.add("BoardField");
                    Box.id = "Box" + String.fromCharCode(+col + 63) + (9 - row);
                    if ((+col + +row) % 2 == 0) Box.classList.add("blue");
                    else Box.classList.add("white");
                } else if (Field[0] == "P") {
                    Box.classList.add("PrisonField");
                    Box.id = "Prison" + Field[1];
                    if ((+col + +row) % 2 == 0) Box.classList.add("blue");
                    else Box.classList.add("white");
                } else Box.classList.add("EmptyField");
                $("#Row" + row).append(Box);
            }
        }
        net.GetPawns();
    }

    CreatePawns() {
        board.PawnList = [];
        fish.PlaceFishes();
        rook.PlaceRooks();
        monke.PlaceMonkeys();
        elephant.PlaceElephants();
        king.PlaceKings();
        queen.PlaceQueens();
        fishqueen.PlaceFishQueens();
        this.PlacePawns();
    }

    PlacePawns() {
        this.EmptyBoard();
        for (var i in board.PawnList) if (!board.PawnList[i].captured) board.BuildPawn(board.PawnList[i]);
    }

    BuildPawn(PawnInfo) {
        if (!PawnInfo.captured) {
            var pawn = document.createElement("img");
            pawn.className = PawnInfo.type;
            pawn.src = "img/" + PawnInfo.color + "/" + (PawnInfo.banana ? "banana" : "") + PawnInfo.type + ".png";
            pawn.onclick = function () {
                board.PawnFunction(this);
            };
            if (PawnInfo.position[0] != "P") $("#Box" + PawnInfo.position).append(pawn);
            else $("#" + PawnInfo.position).append(pawn);
        }
    }

    EmptyBoard() {
        let boardDiv = $(".BoardField");
        for (var i = 0; i < boardDiv.length; i++) {
            $("#" + boardDiv[i].id).empty();
        }
        boardDiv = $(".PrisonField");
        for (var i = 0; i < boardDiv.length; i++) {
            $("#" + boardDiv[i].id).empty();
        }
    }

    PawnFunction(DIV) {
        if (!board.imprisoning) {
            try {
                $(".selected")[0].classList.remove("selected");
            } catch {}
            DIV.classList.add("selected");
            board.Highlighted.forEach((element) => {
                var el = element.id.slice(3, 5);
                document.getElementById("Box" + el).classList.remove("highlighted");
                if (DIV.parentElement && DIV.parentElement == element) board.Capture(DIV.parentElement);
            });
            $(".prisonbreak").removeClass("prisonbreak");
            board.Highlighted = [];
            for (var j in board.PawnList) {
                try {
                    if (
                        !board.PawnList[j].captured &&
                        board.PawnList[j].position == DIV.parentElement.id.slice(3, 5) &&
                        (ui.CurrentPawn == undefined || ui.CurrentPawn.color == DIV.src.split("/")[DIV.src.split("/").length - 2])
                    )
                        board.PawnList[j].movement();
                } catch {}
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
    }

    win() {
        if ($("#Prison1")[0].children[0] && $("#Prison2")[0].children[0]) {
            alert("white win!");
        } else if ($("#Prison3")[0].children[0] && $("#Prison4")[0].children[0]) {
            alert("black win!");
        }
    }
}
