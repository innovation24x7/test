module.exports = {
  extractVgwSessionId: function(reqOrResJson) {
    for (lineNumber in reqOrResJson) {
      if (reqOrResJson[lineNumber].indexOf("vgwSessionID") > -1 | reqOrResJson[lineNumber].indexOf("ucid") > -1) {
        var lineContainingVgwSessionId = reqOrResJson[lineNumber]
        var vgwSessionId = lineContainingVgwSessionId.substring(lineContainingVgwSessionId.indexOf(":"));
        var replaceall = require("replaceall");
        vgwSessionId = replaceall("\"", "", vgwSessionId);
        vgwSessionId = replaceall(",", "", vgwSessionId);
        vgwSessionId = replaceall(":", "", vgwSessionId);
        return vgwSessionId.trim();
      }
    }
  }
}
