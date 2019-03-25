// Node app to read from Piromoni Enviro Phat and post to SF IOT Cloud
// This is bad code, not intended for use in Production environments. 

//require dotenv
require('dotenv').config();

//setup salesforce connection
var jsforce = require('jsforce');
var conn = new jsforce.Connection();

//setup python bits
var pythonShell = require('python-shell');
var pythonPath = 'readings.py';
var py = new pythonShell(pythonPath);

//everything is setup, let's connect to SF!
conn.login(process.env.SF_USER, process.env.SF_PASS, function(err, res) {
    if(err) { return console.error(err); }
    console.log('Huzzah! Welcome to Salesforce user ID: ' + res.id);

    //we're ready to grab the python reading from phat now
    py.on('message', function(message) {
        //data returned from phat, post to platform event in Salesforce
        
	var arr = JSON.parse(message);
	//console.log(arr[1]);

	conn.sobject('Inbound_Payload__e').create({
            Inbound_Reading__c: arr[0],
	    Inbound_Motion__c: arr[1],
	    Temp__c: arr[2],
            Pressure__c: arr[3],
	    rgb__c: arr[4] + "," + arr[5] + "," + arr[6],
	    Device_Id__c: 'abc102'
        }, function(err, ret){
            if (err || !ret.success) { return console.error(err, ret);}
            console.log('Event record: ' + ret.id + ' created successfully. Reading was: ' + message);
        });
    });

    //this bit would handle the end to the input stream
    //however the device will run for ever so this shouldn't be necessary
    py.end(function(err) {
        if(err) {throw err;}
        console.log('this thing is finished');
    });
});
