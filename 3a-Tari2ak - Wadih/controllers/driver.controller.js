const connection = require('../config/database.config');


exports.driverInfo = (req, res)=>{
    let driverId = req.query.id;
    res.render("driverView", { driver: [{ id: driverId }] });
}

exports.driverInfoRegistration = (req, res1)=>{
    let { carInfo, start, time } = req.body;
    let driverId = req.body.id;
    let number = req.body.numb;  //wasn't working when doing it on one line like line 75 so i had to split the data up
    const destination = req.body.destination;
    number = parseInt(number);
    driverId = parseInt(driverId);
  
    //console.log("in index");
  
    let insertDriverQuery = `INSERT INTO  drivers (user_id, car, starting_location, destination, number, time)
     VALUES ("${driverId}", "${carInfo}", "${start}", "${destination}", "${number}", "${time}")`;
  
    connection.query(insertDriverQuery, (err, result) => { //insert info of the ride into db
      if (err) throw err;
      res1.redirect(`/choice?id=${driverId}`);
    });
}