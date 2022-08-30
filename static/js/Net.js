//console.log("wczytano plik Net.js")
class Net {
    constructor() {
        //console.log("konstruktor klasy Net")
    }

    template() {
        $.ajax({
            url: "/",
            data: {},
            type: "POST",
            success: function (data) {},
            error: function (xhr, status, error) {
                console.log(xhr);
            },
        });
    }

    GetPawns() {
        $.ajax({
            url: "/",
            data: {},
            type: "POST",
            success: function (data) {
                var parseData = JSON.parse(data);
                if (parseData.start) {
                    board.PawnsPositions = parseData.pawns;
                    board.CreatePawns();
                }
            },
            error: function (xhr, status, error) {
                console.log(xhr);
            },
        });
    }

    UpdatePawns() {
        $.ajax({
            url: "/updatePawns",
            data: { pawns: JSON.stringify(board.PawnList) },
            type: "POST",
            error: function (xhr, status, error) {
                console.log(xhr);
            },
        });
    }

    ResetPawns() {
        $.ajax({
            url: "/resetPawns",
            data: { pawns: JSON.stringify(board.PawnList) },
            type: "POST",
            success: function (data) {
                board.PawnsPositions = JSON.parse(data).pawns;
                console.log(board.PawnList);
                board.CreatePawns();
            },
            error: function (xhr, status, error) {
                console.log(xhr);
            },
        });
    }
}
