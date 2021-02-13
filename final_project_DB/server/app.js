const express = require ('express');
const cors = require ('cors');
const mysql = require('mysql');

const bcrypt = require('bcrypt');

const saltRounds=10;
const app = express();
//app.use(cors());
const bodyparser = require ('body-parser');
app.use(bodyparser.json());


const connection =mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Anubhav@1234',
  database: 'databaseTermEndProject'
});

connection.connect(err =>{
  if(err){
    return err;
  }
});

app.get('/',(req, res) => {
  connection.query("Select * from userDetail",(err,result) =>{

    if(err) {
      return res.send(err)
    } else {
      return res.json({
        data: result
      })
    }
  })
});

app.post('/api/signup', (req, res) => {
//  return res.json('yes')
console.log(req.body.firstname);
bcrypt.hash(req.body.password, saltRounds, function(err,hash){
var data = req.body


    var doc = {
        Fname: data.firstname,
        Lname: data.lastname,
        Email: data.email,
        Password: hash,
        Contact: data.contact
    };
    connection.query("INSERT INTO userDetail SET ? ",doc , (err, result) => {
        if (err)
            console.log(err);
        else
            res.json('yes');

    })
    });

});

app.post('/api/login', (req, res) => {
    var data = req.body.email
    console.log(data)
    var doc =  req.body.email;
    connection.query("SELECT Password FROM userDetail WHERE Email =  ? ",doc ,function(err, result) {
        if (err) {
      //    console.log("djfhsuihfduisjodkms")
            console.log(err);}
        else{
            console.log(result[0].Password)
            bcrypt.compare(req.body.password,result[0].Password,function(err,result){
                if(result==true){
                    res.json("true")
                    console.log("LOGGED IN")
                } else{
                    console.log("incorrect password")
                    res.json("false")
                    console.log(result)
                }
            });
        }
    });

});

app.post('/api/dashboard', (req, res) => {
//  return res.json('yes')
console.log(req.body);

var data = req.body
console.log(data.value);
console.log(data.max);

    var doc = {
      value : data.value,
      min: req.body.min,
      max: req.body.max,
      zipcode: req.body.zipode
    };
    var doc1 = [req.body.min , req.body.max]
    // var doc1 = [req.body.minschoolscore, req.body.maxschoolscore];
    // var doc2 = [req.body.minprice, req.body.maxprice]
    // var doc3 = [req.body.minincome, req.body.maxincome]
    // var doc4 = [req.body.mincrimerate, req.body.maxcrimerate]
    var doc5 = [Number(req.body.zipcode)]
    var demi = Number(doc.value)

    console.log(doc.value);
  if ( doc.value[0] === '3') {connection.query("Select parcelid , bathroomcnt , bedroomcnt , regionidzip , yearbuilt , price from property p, schoolstats s where p.regionidzip = s.Zip AND avg_API Between ? and ?",doc1, (err, result) => {
        if (err){
console.log("I am here");
            console.log(err);

          }
        else{
          console.log("I am here");
        console.log(result);
            res.json(result);
}
    })
} else if( doc.value[0] === '2' ) {connection.query("Select parcelid , bathroomcnt , bedroomcnt , regionidzip , yearbuilt , price from property where price Between ? and ?",doc1, (err, result) => {
      if (err){
console.log("I am here");
          console.log(err);

        }
      else{
        console.log("I am here2");
      console.log(result);
          res.json(result);
}
  })

}else if( doc.value[0] === '1'){connection.query("Select parcelid , bathroomcnt , bedroomcnt , regionidzip , yearbuilt , price from property p, calizipinfo c where p.regionidzip = c.Zip_Code Between ? and ? LIMIT 100", doc1 , function(err, result){
      if (err){
console.log("I am here1111");
          console.log(err);

        }
      else{
        console.log("I am here31111");
  //      var string=JSON.stringify(result);
  //      var json=JSON.parse(string);
  //      console.log(json);
      // JSON.parse(JSON.stringify(result));
          res.json(result);
}
  })

}else if ( doc.value[0] === '4' ){connection.query("Select parcelid , bathroomcnt , bedroomcnt , regionidzip , yearbuilt , price from property p, calizipinfo c, countycrime cc where p.regionidzip = c.Zip_Code AND c.County = cc.County And Crimesperofficer Between ? and ?",doc1, (err, result) => {
      if (err){
console.log("I am here4");
          console.log(err);

        }
      else{
        console.log("I am here3");
      console.log(result);
          res.json(result);
}
  })

}else if( doc.zipcode != null ){connection.query("Select parcelid , bathroomcnt , bedroomcnt , regionidzip , yearbuilt , price from property  where regionidzip  = ?",doc5, (err, result) => {
      if (err){
console.log("I am here4");
          console.log(err);

        }
      else{
        console.log("I am here6");
      console.log(result);
          res.json(result);
}
  })

}
console.log("dvhfhs");
    });


app.listen(() =>{
  console.log('connected to db')
})

module.exports=app;
