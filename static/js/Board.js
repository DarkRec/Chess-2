//console.log("wczytano plik Board.js");
class Board {
    constructor() {
        //console.log("konstruktor klasy Board");
        this.boardGenerate();
        this.PawnList = [];
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
                Kings: { position: ["D1"], name: "king" },
                Queens: { position: ["E1"], name: "queen" },
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
                Kings: { position: ["D8"], name: "king" },
                Queens: { position: ["E8"], name: "queen" },
            },
        };
    }

    boardGenerate() {
        function CreateInfoBox(nr, row) {
            var InfoField = document.createElement("div");
            InfoField.className = "InfoField";
            InfoField.innerText = String.fromCharCode(nr);
            $("#Row" + row).append(InfoField);
        }
        function CreateRow(nr) {
            var row = document.createElement("div");
            row.id = "Row" + nr;
            row.className = "BoardRow";
            $("#board").append(row);
        }

        function CreateBoardField(row, col, change) {
            var box = document.createElement("div");
            box.className = "BoardField";
            box.id = "Box" + String.fromCharCode(c + 65) + r;
            var backgroundColor;
            if ((c + r) % 2 == 0) backgroundColor = "deepskyblue";
            else backgroundColor = "white";
            box.style.backgroundColor = backgroundColor;
            $("#Row" + row).append(box);
        }

        CreateRow(0);
        CreateInfoBox(0, 0);
        for (var num = 0; num < 8; num++) {
            CreateInfoBox(num + 65, 0);
        }
        CreateInfoBox(0, 0);
        for (var r = 1; r < 9; r++) {
            CreateRow(r);
            CreateInfoBox(r + 48, r);
            for (var c = 0; c < 8; c++) {
                var change = c % 8 === 0;
                CreateBoardField(r, c, change);
            }
            CreateInfoBox(r + 48, r);
        }
        CreateRow(9);
        CreateInfoBox(0, 9);
        for (var num = 0; num < 8; num++) {
            CreateInfoBox(num + 65, 9);
        }
        CreateInfoBox(0, 9);

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
        console.log(board.PawnList);
        for (var i in board.PawnList) {
            var PawnInfo = board.PawnList[i];
            var pawn = document.createElement("img");
            pawn.className = PawnInfo.type;
            pawn.id = PawnInfo.type + i;
            pawn.src = "img/" + PawnInfo.color + "/" + PawnInfo.type + ".png";
            pawn.onclick = function () {
                console.log(this.className);
                console.log(this);
                for (var j in board.PawnList) {
                    if (
                        board.PawnList[j].position ==
                        this.parentElement.id.slice(3, 5)
                    )
                        board.PawnList[j].movement();
                }
            };
            $("#Box" + PawnInfo.position).append(pawn);
        }
    }
}
