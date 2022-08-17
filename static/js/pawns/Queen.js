//console.log("wczytano plik Queen.js");
class Queen extends Pawn {
    constructor(position, type, color) {
        //console.log("konstruktor klasy Queen");
        super(position, type, color);
    }

    PlaceQueens() {
        var Queens = board.PawnsPositions.White.Queens;
        for (var i in Queens.position) {
            board.PawnList.push(
                new Queen(Queens.position[i], Queens.name, "White")
            );
        }
        var Queens = board.PawnsPositions.Black.Queens;
        for (var i in Queens.position) {
            board.PawnList.push(
                new Queen(Queens.position[i], Queens.name, "Black")
            );
        }
    }
}
