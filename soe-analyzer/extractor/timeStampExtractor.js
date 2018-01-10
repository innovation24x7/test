module.exports = {
  extractTimeStamp: function(lines, lineNumber, startTag) {
    firstLine = lines[lineNumber];
    var beginWith = firstLine.indexOf(startTag) + startTag.length;
    var endsWith = firstLine.indexOf("TS#");
    var timeStamp = firstLine.substring(beginWith+1, endsWith);    
    return timeStamp;
  }
}
