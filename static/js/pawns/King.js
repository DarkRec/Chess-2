//console.log("wczytano plik King.js");
class King extends Pawn {
    constructor(position, type, color) {
        //console.log("konstruktor klasy King");
        super(position, type, color);
    }

    PlaceKings() {
        var Kings = board.PawnsPositions.White.Kings;
        for (var i in Kings.position) {
            board.PawnList.push(
                new King(Kings.position[i], Kings.name, "White")
            );
        }
        var Kings = board.PawnsPositions.Black.Kings;
        for (var i in Kings.position) {
            board.PawnList.push(
                new King(Kings.position[i], Kings.name, "Black")
            );
        }
    }
}
