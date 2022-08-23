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
        this.PawnsPositions = {
            White: {
                Fishes: {
                    position: ["C1", "F1", "A2", "B2", "D2", "E2", "G2", "H2"],
                    name: "fish",
                },
                Rooks: { position: ["A1", "H1"], name: "rook" },
                Monkeys: { position: ["B1", "G1"], name: "monke" },
                Elephants: {
                    position: ["C2", "F2"],
                    name: "elephant",
                },
                Kings: { position: ["E1"], name: "king" },
                Queens: { position: ["D1"], name: "queen" },
            },
            Black: {
                Fishes: {
                    position: ["C8", "F8", "A7", "B7", "D7", "E7", "G7", "H7"],
                    name: "fish",
                },
                Rooks: { position: ["A8", "H8"], name: "rook" },
                Monkeys: { position: ["B8", "G8"], name: "monke" },
                Elephants: {
                    position: ["C7", "F7"],
                    name: "elephant",
                },
                Kings: { position: ["E8"], name: "king" },
                Queens: { position: ["D8"], name: "queen" },
            },
        };
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
        if (PawnInfo.type == "king" && PawnInfo.banana) pawn.src = "img/" + PawnInfo.color + "/bananaking.png";
        pawn.onclick = function () {
            board.PawnFunction(this);
        };
        $("#Box" + PawnInfo.position).append(pawn);
    }

    BoardReload() {
        let boardDiv = $(".BoardField");
        for (var i = 0; i < boardDiv.length; i++) {
            $("#" + boardDiv[i].id).empty();
        }
        this.PlacePawns();
    }

    PawnFunction(DIV) {
        console.log(DIV);
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
}
