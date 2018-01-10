module.exports = {
  analyzeRequest: function(requestJson) {
    var reqAsString = "";
    for (line in requestJson) {
      reqAsString += requestJson[line]
    }
    requestJson = JSON.parse(reqAsString);
    return requestJson;
  },
  analyzeResponse: function(responseJson) {
    var responseAsString = "";
    for (line in responseJson) {
      responseAsString += responseJson[line]
    }
    responseJson = JSON.parse(responseAsString);
    return responseJson;
  }
}
