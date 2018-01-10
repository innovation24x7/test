module.exports = {
  extractReqOrRes: function(lines, startingLineNumber, logsEndLineNumber, startTag, endTag) {
    // console.log("Extracting json between " + startTag + " and " + endTag);

    var reqOrResJson = lines.slice(startingLineNumber, logsEndLineNumber + 1);

    firstLine = reqOrResJson[0];
    firstLine = firstLine.substring(firstLine.lastIndexOf("{"));
    reqOrResJson[0] = firstLine;

    lastLine = reqOrResJson[reqOrResJson.length-1];

    if (lastLine.indexOf(endTag) > "-1") {
      lastLine = lastLine.substring(0, lastLine.indexOf(endTag));
      reqOrResJson[reqOrResJson.length-1] = lastLine;
    }
    return reqOrResJson;
  }
}
