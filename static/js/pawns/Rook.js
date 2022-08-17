//console.log("wczytano plik Rook.js");
class Rook extends Pawn {
    constructor(position, type, color) {
        //console.log("konstruktor klasy Rook");
        super(position, type, color);
    }

    PlaceRooks() {
        var Rooks = board.PawnsPositions.White.Rooks;
        for (var i in Rooks.position) {
            board.PawnList.push(
                new Rook(Rooks.position[i], Rooks.name, "White")
            );
        }
        var Rooks = board.PawnsPositions.Black.Rooks;
        for (var i in Rooks.position) {
            board.PawnList.push(
                new Rook(Rooks.position[i], Rooks.name, "Black")
            );
        }
    }
}
