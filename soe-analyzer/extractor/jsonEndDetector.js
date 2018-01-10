module.exports = {
  logEndsAt: function(lines, startingLineNumber, startTag, endTag) {
    
    var keepReading = true;
    for (currentLineNumber = startingLineNumber; keepReading; currentLineNumber++) {
      line = lines[currentLineNumber];
      if (line.indexOf(endTag) > "-1") {
        keepReading = false;
        return currentLineNumber;
      }
    }
  }
}
