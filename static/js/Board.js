//console.log("wczytano plik Board.js");
class Board {
    constructor() {
        //console.log("konstruktor klasy Board");
        this.boardGenerate();
        this.PawnList = [];
        this.Highlighted = [];
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
                    position: ["C8", "F8", "A7", "B7", "D7", "E7", "G7", "H7", "D3", "E3"],
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

        function CreateBoardField(row, col) {
            var box = document.createElement("div");
            box.classList.add("BoardField");
            box.id = "Box" + String.fromCharCode(col + 65) + row;
            var backgroundColor;
            if ((col + row) % 2 == 1) box.classList.add("blue");
            else box.classList.add("white");
            box.style.backgroundColor = backgroundColor;
            $("#Row" + row).append(box);
        }

        CreateRow(0);
        CreateInfoBox(0, 0);
        for (var num = 0; num < 8; num++) {
            CreateInfoBox(num + 65, 0);
        }
        CreateInfoBox(0, 0);
        for (var r = 8; r > 0; r--) {
            CreateRow(r);
            CreateInfoBox(r + 48, r);
            for (var c = 0; c < 8; c++) {
                CreateBoardField(r, c);
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
        }
    }
}
