//console.log("wczytano plik Pawn.js");
class Pawn {
    constructor(position, type, color) {
        console.log("konstruktor klasy Pawn");
        this.position = position;
        this.type = type;
        this.color = color;
        this.captured = false;
    }

    movement() {
        console.log("jeszcze nie ma ustawionego ruchu");
    }
}
