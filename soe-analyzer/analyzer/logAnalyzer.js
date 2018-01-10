module.exports = {
  analyzeFile: function(res) {
    var fs = require('fs');
    fs.readFile('logFile', function(err, logFile) {
      if (err) throw err;
      module.exports.analyzeString(res, logFile);
      // console.log(JSON.stringify(output));
    });
  },

  analyzeString: function(res, logFile){
      var lines = logFile.toString().split("\n");

      var output = new Object();
      var callAnalysisOutput = new Object();

      var jsonEndDetector = require("../extractor/jsonEndDetector");
      var timeStampExtractor = require("../extractor/timeStampExtractor");
      var reqAndResExtractor = require("../extractor/reqAndResExtractor");
      var vgwSessionIdExtractor = require("../extractor/vgwSessionIdExtractor");

      var vgAnalyzer = require("../analyzer/vgAnalyzer");
      var wcsAnalyzer = require("../analyzer/wcsAnalyzer");
      var humanaAnalyzer = require("../analyzer/humanaAnalyzer");

      var outputCreator = require("../presentation/outputCreator");

      for (lineNumber = 0; lineNumber < lines.length; lineNumber++) {
        var line = lines[lineNumber];

        if (line.indexOf("VG to SOE  Request Start#") > -1) {
          var startTag = "VG to SOE  Request Start#";
          var endTag = "VG to SOE  Request End";
          var timeStamp = timeStampExtractor.extractTimeStamp(lines, lineNumber, startTag);
          var logsEndLineNumber = jsonEndDetector.logEndsAt(lines, lineNumber, startTag, endTag);
          var reqOrResJson = reqAndResExtractor.extractReqOrRes(lines, lineNumber, logsEndLineNumber, startTag, endTag);
          var vgwSessionId = vgwSessionIdExtractor.extractVgwSessionId(reqOrResJson);
          var nodeAnalysis = vgAnalyzer.analyzeRequest(reqOrResJson);
          nodeAnalysis = outputCreator.createOutput(vgwSessionId, timeStamp, nodeAnalysis, "VG-To-SOE-Request", reqOrResJson);
          if (!output[vgwSessionId]) {
            output[vgwSessionId] = new Object();
            callAnalysisOutput[vgwSessionId] = new Object();
          }
          output[vgwSessionId][timeStamp] = nodeAnalysis;
          lineNumber = logsEndLineNumber + 1;
        }
        if (line.indexOf("SOE to WCS Request Start#") > -1) {
          var startTag = "SOE to WCS Request Start#";
          var endTag = "SOE to WCS Request End";
          var timeStamp = timeStampExtractor.extractTimeStamp(lines, lineNumber, startTag);
          var logsEndLineNumber = jsonEndDetector.logEndsAt(lines, lineNumber, startTag, endTag);
          var reqOrResJson = reqAndResExtractor.extractReqOrRes(lines, lineNumber, logsEndLineNumber, startTag, endTag);
          var vgwSessionId = vgwSessionIdExtractor.extractVgwSessionId(reqOrResJson);
          var nodeAnalysis = wcsAnalyzer.analyzeRequest(reqOrResJson);
          nodeAnalysis = outputCreator.createOutput(vgwSessionId, timeStamp, nodeAnalysis, "SOE-To-WCS-Request", reqOrResJson);
          if (!output[vgwSessionId]) {
            output[vgwSessionId] = new Object();
            callAnalysisOutput[vgwSessionId] = new Object();
          }
          output[vgwSessionId][timeStamp] = nodeAnalysis;
          lineNumber = logsEndLineNumber + 1;
        }
        if (line.indexOf("WCS to SOE response Start#") > -1) {
          var startTag = "WCS to SOE response Start#";
          var endTag = "WCS to SOE response End";
          var timeStamp = timeStampExtractor.extractTimeStamp(lines, lineNumber, startTag);
          var logsEndLineNumber = jsonEndDetector.logEndsAt(lines, lineNumber, startTag, endTag);
          var reqOrResJson = reqAndResExtractor.extractReqOrRes(lines, lineNumber, logsEndLineNumber, startTag, endTag);
          var vgwSessionId = vgwSessionIdExtractor.extractVgwSessionId(reqOrResJson);
          var nodeAnalysisResponseText = wcsAnalyzer.analyzeResponseText(reqOrResJson);
          var nodeAnalysisAction = wcsAnalyzer.analyzeResponseAction(reqOrResJson);
          var nodeCallTransferred = wcsAnalyzer.analyzeCallTransfer(nodeAnalysisAction);

          if (nodeCallTransferred && !callAnalysisOutput[vgwSessionId]) {
              callAnalysisOutput[vgwSessionId] = new Object();              
              console.log(callAnalysisOutput);
          }

          callAnalysisOutput[vgwSessionId].callTransferred = nodeCallTransferred;
          
          var nodeAnalysis = {};
          nodeAnalysis.responseText = nodeAnalysisResponseText;
          nodeAnalysis.action = nodeAnalysisAction;
          nodeAnalysis = outputCreator.createOutput(vgwSessionId, timeStamp, nodeAnalysis, "WCS-To-SOE-Response", reqOrResJson);
          if (!output[vgwSessionId]) {
            output[vgwSessionId] = new Object();            
          }
          output[vgwSessionId][timeStamp] = nodeAnalysis;
          lineNumber = logsEndLineNumber + 1;
        }
        if (line.indexOf("SOE to VG Response Start#") > -1) {
          var startTag = "SOE to VG Response Start#";
          var endTag = "SOE to VG Response End";
          var timeStamp = timeStampExtractor.extractTimeStamp(lines, lineNumber, startTag);
          var logsEndLineNumber = jsonEndDetector.logEndsAt(lines, lineNumber, startTag, endTag);
          var reqOrResJson = reqAndResExtractor.extractReqOrRes(lines, lineNumber, logsEndLineNumber, startTag, endTag);
          var vgwSessionId = vgwSessionIdExtractor.extractVgwSessionId(reqOrResJson);
          var nodeAnalysis = vgAnalyzer.analyzeResponse(reqOrResJson);
          nodeAnalysis = outputCreator.createOutput(vgwSessionId, timeStamp, nodeAnalysis, "SOE-To-VG-Response", reqOrResJson);
          if (!output[vgwSessionId]) {
            output[vgwSessionId] = new Object();
            callAnalysisOutput[vgwSessionId] = new Object();
          }
          output[vgwSessionId][timeStamp] = nodeAnalysis;
          lineNumber = logsEndLineNumber + 1;
        }
        if (line.indexOf("Humana API Request Start#") > -1) {
          var startTag = "Humana API Request Start#";
          var endTag = "Humana API Request End";
          var timeStamp = timeStampExtractor.extractTimeStamp(lines, lineNumber, startTag);
          var logsEndLineNumber = jsonEndDetector.logEndsAt(lines, lineNumber, startTag, endTag);
          var reqOrResJson = reqAndResExtractor.extractReqOrRes(lines, lineNumber, logsEndLineNumber, startTag, endTag);
          var vgwSessionId = vgwSessionIdExtractor.extractVgwSessionId(reqOrResJson);
          var nodeAnalysis = humanaAnalyzer.analyzeRequest(reqOrResJson);
          nodeAnalysis = outputCreator.createOutput(vgwSessionId, timeStamp, nodeAnalysis, "Humana-API-Request");
          if (!output[vgwSessionId]) {
            output[vgwSessionId] = new Object();
            callAnalysisOutput[vgwSessionId] = new Object();
          }
          output[vgwSessionId][timeStamp] = nodeAnalysis;
          lineNumber = logsEndLineNumber + 1;
        }
        if (line.indexOf("Humana API Response Start#") > -1) {
          var startTag = "Humana API Response Start#";
          var endTag = "Humana API Response End";
          var timeStamp = timeStampExtractor.extractTimeStamp(lines, lineNumber, startTag);
          var logsEndLineNumber = jsonEndDetector.logEndsAt(lines, lineNumber, startTag, endTag);
          var reqOrResJson = reqAndResExtractor.extractReqOrRes(lines, lineNumber, logsEndLineNumber, startTag, endTag);
          var vgwSessionId = vgwSessionIdExtractor.extractVgwSessionId(reqOrResJson);
          var nodeAnalysis = humanaAnalyzer.analyzeResponse(reqOrResJson);
          nodeAnalysis = outputCreator.createOutput(vgwSessionId, timeStamp, nodeAnalysis, "Humana-API-Response ");
          if (!output[vgwSessionId]) {
            output[vgwSessionId] = new Object();
            callAnalysisOutput[vgwSessionId] = new Object();
          }
          output[vgwSessionId][timeStamp] = nodeAnalysis;
          lineNumber = logsEndLineNumber + 1;
        }
      }
      global.output = output;
      res.render('analysis', {
        output: output,
        callAnalysisOutput, callAnalysisOutput
      });
  }
}
