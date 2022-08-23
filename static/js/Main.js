// start całości projektu, utworzenie obiektów poszczególnych klas

console.log("wczytano plik Main.js");

var net;
var ui;
var board;

var pawn;
var fish;
var fishqueen;
var rook;
var monke;
var elephant;
var king;
var queen;

var dev;

$(document).ready(function () {
    net = new Net(); // utworzenie obiektu klasy Net
    ui = new Ui(); // utworzenie obiektu klasy Ui
    board = new Board(); // utworzenie obiektu klasy Board

    pawn = new Pawn();
    fish = new Fish();
    fishqueen = new FishQueen();
    rook = new Rook();
    monke = new Monke();
    elephant = new Elephant();
    king = new King();
    queen = new Queen();

    dev = new Dev();
});
