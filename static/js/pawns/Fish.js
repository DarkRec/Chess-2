//console.log("wczytano plik Fish.js");
class Fish extends Pawn {
    constructor(position, type, color) {
        //console.log("konstruktor klasy Fish");
        super(position, type, color);
    }

    PlaceFishes() {
        var Fishes = board.PawnsPositions.White.Fishes;
        for (var i in Fishes.position) {
            board.PawnList.push(
                new Fish(Fishes.position[i], Fishes.name, "White")
            );
        }
        var Fishes = board.PawnsPositions.Black.Fishes;
        for (var i in Fishes.position) {
            board.PawnList.push(
                new Fish(Fishes.position[i], Fishes.name, "Black")
            );
        }
    }
    movement() {
        console.log("fish movement");
    }
}
