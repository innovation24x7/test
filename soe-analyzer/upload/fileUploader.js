module.exports = {
  upload: function(req, res, next) {
    var logAnalyzer = require("../analyzer/logAnalyzer.js");

    if (!req.files){
      return res.status(400).send('No files were uploaded.');
    }

    var logFileAsString = "";

    // console.log(req.files);
    var filesArray = req.files['soeappLogFile'];


    if(filesArray.length > 1){
      for(var i=0;i<filesArray.length;i++){
        var logFileToAnalyze = filesArray[i];
        console.log(logFileToAnalyze.name);
        logFileAsString += logFileToAnalyze.data.toString();
      }
    }else{
       logFileAsString = req.files['soeappLogFile'].data.toString();
    }

    /*var fs = require('fs');
    fs.writeFile("logFile", logFileAsString, function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("The log file was saved!");
        logAnalyzer.analyzeFile(res);
    }); */
    logAnalyzer.analyzeString(res, logFileAsString);
  }
}
