const express = require("express");

//-------------------------------------------------
const app = express();

app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(express.static("static"));

//-------------------------------------------------
const PORT = 8000;

app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT);
});
//-------------------------------------------------
const path = require("path");

//-------------------------------------------------
const cors = require("cors");
app.use(cors());
//-------------------------------------------------
const favicon = require("serve-favicon");

app.use(favicon(path.join("static", "/favicon.ico")));
app.get("/favicon.ico", (req, res) => res.status(204));

const hbs = require("hbs");
app.set("view engine", "hbs");
hbs.registerPartials(__dirname + "/views/partials");

var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database("ChessBoard.db");

//Na później
//-------------------------------------------------
/*
const cookieParser = require('cookie-parser')

app.use(cookieParser());

//-------------------------------------------------

const session = require('express-session')

app.use(session({
    name: 'rules_session',
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
}));

//-------------------------------------------------


bodyParser = require('body-parser'),
app.use(bodyParser.urlencoded({ extended: true }));



//app.use(session({ secret: 'code', cookie: { maxAge: 60000 }}));
*/

//-------------------------------------------------

//////////    //////////    //////////
//      //    //                //
//            //                //
//    ////    //////////        //
//      //    //                //
//      //    //                //
//////////    //////////        //

//-------------------------------------------------

app.get("/", function (req, res) {
    res.render("main");
});

//-------------------------------------------------

//////////    //////////    //////////    //////////
//      //    //      //    //                //
//      //    //      //    //                //
//////////    //      //    //////////        //
//            //      //            //        //
//            //      //            //        //
//            //////////    //////////        //

//-------------------------------------------------
console.log("aaa");
var PawnsPositions = [];

app.post("/", function (req, res) {
    if (!PawnsPositions[0])
        db.serialize(function () {
            db.each(
                "SELECT * FROM PawnList",
                function (err, row) {
                    PawnsPositions.push(row);
                },
                function () {
                    res.send(JSON.stringify({ pawns: PawnsPositions, start: true }));
                }
            );
        });
    else res.send(JSON.stringify({ pawns: PawnsPositions, start: true }));
});

app.post("/updatePawns", function (req, res) {
    PawnsPositions = JSON.parse(req.body.pawns);
    res.send(JSON.stringify({ pawns: PawnsPositions, start: false }));
});

app.post("/resetPawns", function (req, res) {
    PawnsPositions = [];
    db.serialize(function () {
        db.each(
            "SELECT * FROM PawnList",
            function (err, row) {
                PawnsPositions.push(row);
            },
            function () {
                res.send(JSON.stringify({ pawns: PawnsPositions, start: true }));
            }
        );
    });
});
