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
    res.send();
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

app.post("/", function (req, res) {});
