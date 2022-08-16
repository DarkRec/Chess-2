// start całości projektu, utworzenie obiektów poszczególnych klas

console.log("wczytano plik Main.js");

var net;
var ui;
var board;
var pawn;
var rook;
var monke;
var elephant;

$(document).ready(function () {
    net = new Net(); // utworzenie obiektu klasy Net
    ui = new Ui(); // utworzenie obiektu klasy Ui
    board = new Board(); // utworzenie obiektu klasy Board
    pawn = new Pawn();
    rook = new Rook();
    monke = new Monke();
    elephant = new Elephant();
});
