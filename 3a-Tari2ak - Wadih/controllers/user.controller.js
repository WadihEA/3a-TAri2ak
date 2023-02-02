const connection = require('../config/database.config');


exports.onStart = (req, res)=>{
    res.redirect("/login");
}

exports.login = (req, res)=>{
    res.render("loginView", { login: [{ valid: true }] });
}

exports.UserLogin = (req, res)=>{
  const { name, pass } = req.body;
  let userLoginQuery = `select * from users where username = '${name}' and password = '${pass}'`;

  connection.query(userLoginQuery, (err, result) => {
    if (err) throw err;
    //console.log(result);
    if (result == "" && name != null) { //check if query result is null meaning user is not found in db
      res.render("loginView", { login: [{ valid: false }] });  //render login view with wrong credentials message displayed
    } else {
      let id = result[0].user_id
      res.redirect(`/choice?id=${id}`); //redirect user to choice page while passing user id
    }
  });
}

exports.registration = (req, res)=>{
    res.render("registration", { user: [{ taken: false }] }); //render registration view 
}

exports.userRegistration = (req, res1)=>{
    const { fn, ln, un, dob, password, uni } = req.body;
    let validUsernameQuery = `select * from users where username = '${un}'`;
    //console.log(validUsernameQuery);
    connection.query(validUsernameQuery, (err, res) => {
      //console.log(res);
      if (res == "") { //check if username is taken or not
        let userRegistrationQuery = `INSERT INTO users 
          (user_fn,user_ln,username, user_dob, password, university, country_id)
          VALUES
          ("${fn}", "${ln}", "${un}", "${dob}", "${password}","${uni}",1)`;
        //console.log(userRegistrationQuery);
        connection.query(userRegistrationQuery, (err, result) => { //add user to db
          if (err) throw err;
          res1.redirect("/");
        });
      } else {
        //console.log("Already taken");
        res1.render("registration", { user: [{ taken: true }] }); //render registration view with already taken message
      }
    });
}

exports.choice = (req, res)=>{
    let driverId = req.query.id;
    res.render("choice", { user: [{ id: driverId }] });
}
exports.rideInfo = (req, res)=>{
  
  let sql = `select * from users left outer join drivers
  on users.user_id = drivers.user_id `;
connection.query(sql, (err, result) => {
  if (err) throw err;
  
  res.render("rideInfoView", { rides: result });
});
}
exports.rideInfoSeacrh = (req, res)=>{ 
  let value = req.body.value;
  let field = req.body.field;
  let sql;
  //console.log(value + "\t" + field);
  if(field == 'Name'){
    sql = `select * from users left outer join drivers
  on users.user_id = drivers.user_id where user_fn ="${value}" `;
  }
  else if(field == 'Starting location'){
    sql = `select * from users left outer join drivers
  on users.user_id = drivers.user_id where starting_location ="${value}" `;
  }
  else if(field == 'Destination'){
    sql = `select * from users left outer join drivers
  on users.user_id = drivers.user_id where destination ="${value}" `;
  }
  
connection.query(sql, (err, result) => {
  if (err) throw err;
  
  res.render("search", { rides: result });
});
}