var express = require('express');
var router = express.Router();

var loki = require('lokijs');

var db = new loki('data.json', {
  autoload: true,
  autoloadCallback: databaseInitialize,
  autosave: true,
  autosaveInterval: 4000
});

// implement the autoloadback referenced in loki constructor
function databaseInitialize() {
  var submissions = db.getCollection("submissions");
  if (submissions === null) {
    bookings = db.addCollection("submissions");
  }
}

/* GET home page. */
router.get('/', function (req, res, next) {

  var total = db.getCollection("submissions").count();
  var numofmale = db.getCollection("submissions").chain().find({ "gender": "male" }).count();
  var numoffemale = db.getCollection("submissions").chain().find({ "gender": "female" }).count();

  var numofPC = db.getCollection("submissions").chain().find({ "device": "PC"}).count();
  var numofMOBILE = db.getCollection("submissions").chain().find({ "device": "MOBILE" }).count();
  var numofCONSOLE = db.getCollection("submissions").chain().find({ "device": "CONSOLE"}).count();

  var numofRPG = db.getCollection("submissions").chain().find({ "game": "RPG"}).count();
  var numofARPG = db.getCollection("submissions").chain().find({ "game": "ARPG"}).count();
  var numofSRPG = db.getCollection("submissions").chain().find({ "game": "SRPG"}).count();
  var numofMOBA = db.getCollection("submissions").chain().find({ "game": "MOBA"}).count();
  var numofSTG = db.getCollection("submissions").chain().find({ "game": "STG"}).count();
  var numofFPS = db.getCollection("submissions").chain().find({ "game": "FPS"}).count();
  var numofTPS = db.getCollection("submissions").chain().find({ "game": "TPS"}).count();
  var numofTCG = db.getCollection("submissions").chain().find({ "game": "TCG"}).count();
  var numofACT= db.getCollection("submissions").chain().find({ "game": "ACT"}).count();
  var numofFTG= db.getCollection("submissions").chain().find({ "game": "FTG"}).count();

  res.render('index', {
    charttotal: total,
    chartnumofmale: numofmale,
    chartnumoffemale: numoffemale,

    chartnumofPC: numofPC,
    chartnumofMOBILE: numofMOBILE,
    chartnumofCONSOLE: numofCONSOLE,

    chartnumofRPG: numofRPG,
    chartnumofARPG: numofARPG,
    chartnumofSRPG: numofSRPG,
    chartnumofMOBA: numofMOBA,
    chartnumofSTG: numofSTG,
    chartnumofFPS: numofFPS,
    chartnumofTPS: numofTPS,
    chartnumofTCG: numofTCG,
    chartnumofACT: numofACT,
    chartnumofFTG: numofFTG
  });

});


/* AJAX Handle the Form */
router.post('/submissions', function (req, res) {

  req.body.year = parseInt(req.body.year);

  var result = db.getCollection("submissions").insert(req.body);

  res.status(201).json({ id: result.$loki });
});

/* Display all submissions */
router.get('/submissions', function (req, res) {

  var result = db.getCollection("submissions").find();

  res.render('submissions', { submissions: result });
});

/* Display a single Submission */
router.get('/submissions/read/:id', function (req, res) {

  console.log(req.params.id)

  let result = db.getCollection("submissions").findOne({ $loki: parseInt(req.params.id) });

  console.log(JSON.stringify(result))

  if (result)
    res.render('submission', { submission: result });
  else
    res.status(404).send('Unable to find the requested resource!');

});

// Delete a single submission 
router.delete('/submissions/:id', function (req, res) {


  let result = db.getCollection("submissions").findOne({ $loki: parseInt(req.params.id) });

  if (!result) return res.status(404).send('Unable to find the requested resource!');

  db.getCollection("submissions").remove(result);


  if (req.get('Accept').indexOf('html') === -1) {
    return res.status(204).send();	    // for ajax request
  } else {
    return res.redirect('/submissions');	// for normal HTML request
  }

});

// Form for updating a single Booking 
router.get('/submissions/update/:id', function (req, res) {

  let result = db.getCollection("submissions").findOne({ $loki: parseInt(req.params.id) });

  if (!result) return res.status(404).send('Unable to find the requested resource!');

  res.render("update", { submission: result })

});

// Updating a single Booking 
router.post('/submissions/update/:id', function (req, res) {

  let result = db.getCollection("submissions").findOne({ $loki: parseInt(req.params.id) });

  if (!result) return res.status(404).send('Unable to find the requested resource!');

  db.getCollection("submissions").findAndUpdate({ $loki: parseInt(req.params.id) },
    function (item) {
      Object.assign(item, req.body)
    });

  res.send("submission updated.");

});

/* Searching */
router.get('/submissions/search', function (req, res) {

  var whereClause = {};

  if (req.query.name) whereClause.name = { $regex: req.query.name };

  var parsedyear = parseInt(req.query.year);
  if (!isNaN(parsedyear)) whereClause.year = parsedyear;

  let results = db.getCollection("submissions").find(whereClause)

  return res.render('submissions', { submissions: results });

});

/* Pagination */
router.get('/submissions/paginate', function (req, res) {

  var count = Math.max(req.query.limit, 2) || 2;
  var start = Math.max(req.query.offset, 0) || 0;

  var results = db.getCollection("submissions").chain().find({}).offset(start).limit(count).data();

  var totalNumRecords = db.getCollection("submissions").count();

  return res.render('paginate', { submissions: results, numOfRecords: totalNumRecords });

});

/* Ajax Pagination */
router.get('/submissions/aginate', function (req, res) {
  if (req.get('Accept').indexOf('html') === -1) {

    var count = Math.max(req.query.limit, 2) || 2;
    var start = Math.max(req.query.offset, 0) || 0;

    var results = db.getCollection("submissions").chain().find({}).offset(start).limit(count).data();

    return res.json(results);

  } else {

    var totalNumRecords = db.getCollection("submissions").count();

    return res.render('aginate', { numOfRecords: totalNumRecords });
  }

});

module.exports = router;





