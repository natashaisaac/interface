var express= require ('express');
var bodyparser= require ('body-parser');
var path= require ('path');
var mysql = require('mysql'); 
var ejsLint = require('ejs-lint');
var app= express();

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "AItopyaByon8"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});



/*
var logger = function (req, res, next){
	console.log('loggning.....');
	next();
}

app.use(logger);
*/


// view Engine
app.set('view Engine', 'ejs');
app.set('views', path.join(__dirname,'views'));

//bodyparser middleware
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: false}));




//set static path
app.use(express.static(path.join(__dirname, 'public')));


function getquery(qry){
con.query(qry, function(error,rows,field){
		if (!!error){
			console.log('error');
			return ;
		}else {
			
			console.log(rows);
			return rows;
		}

	});
};

app.get('/',function(req,res){
	let tablesform = getquery("SELECT * FROM aitopya.icd10");
	//console.log(tablesform)
	res.render('index.ejs', {
            tablesform: tablesform,
       
    });
	
	});
app.post('/',(req, res)=>{

	console.log(req.body)
});

app.listen(3000,function(){
	console.log('server starting on port 3000.....')

})


