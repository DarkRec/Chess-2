//console.log("wczytano plik Elephant.js");
class Elephant extends Pawn {
    constructor(position, type, color) {
        //console.log("konstruktor klasy Elephant");
        super(position, type, color);
    }

    PlaceElephants() {
        var Elephants = board.PawnsPositions.White.Elephants;
        for (var i in Elephants.position) {
            board.PawnList.push(
                new Elephant(Elephants.position[i], Elephants.name, "White")
            );
        }
        var Elephants = board.PawnsPositions.Black.Elephants;
        for (var i in Elephants.position) {
            board.PawnList.push(
                new Elephant(Elephants.position[i], Elephants.name, "Black")
            );
        }
    }
}
