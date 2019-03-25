// Node app to read from Piromoni Enviro Phat and post to SF IOT Cloud
// This is bad code, not intended for use in Production environments. 

//require dotenv
require('dotenv').config();

//setup salesforce connection
var jsforce = require('jsforce');
var conn = new jsforce.Connection();

var PythonShell = require('python-shell');

conn.login(process.env.SF_USER, process.env.SF_PASS, function(err, res) {
    if(err) { return console.error(err); }

    console.log('Huzzah! Welcome to Salesforce user ID: ' + res.id);

    conn.query("select id, R__c, G__c, B__c from Asset where External_id__c='abc102'", function(err, result){
	if(err) { return console.error(err); }

	var r = result.records[0].R__c;
	var g = result.records[0].G__c;	
	var b = result.records[0].B__c;

	

	var options={
	scriptPath:'',
	args: [r,g,b],
	};


	PythonShell.run('rgb.py',options,function(err, results){
		if(err) throw err;
		console.log('results: %j', results);
		}); 
	
	});

});
