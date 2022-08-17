//console.log("wczytano plik Monke.js");
class Monke extends Pawn {
    constructor(position, type, color) {
        //console.log("konstruktor klasy Monke");
        super(position, type, color);
    }

    PlaceMonkeys() {
        var Monkeys = board.PawnsPositions.White.Monkeys;
        for (var i in Monkeys.position) {
            board.PawnList.push(
                new Monke(Monkeys.position[i], Monkeys.name, "White")
            );
        }
        var Monkeys = board.PawnsPositions.Black.Monkeys;
        for (var i in Monkeys.position) {
            board.PawnList.push(
                new Monke(Monkeys.position[i], Monkeys.name, "Black")
            );
        }
    }
}
