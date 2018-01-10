module.exports = {
  createOutput: function(vgwSessionId, timeStamp, analysis, description, allJson) {
    var nodeAnalysis = new Object();
    nodeAnalysis.description = description;
    nodeAnalysis.analysis = analysis;
    nodeAnalysis.allJson = allJson;
    return nodeAnalysis;
  }
}
