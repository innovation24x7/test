module.exports = {

  analyzeRequest: function(requestJson) {
    var reqAsString = "";
    for (line in requestJson) {
      reqAsString += requestJson[line]
    }
    requestJson = JSON.parse(reqAsString);
    return requestJson.input;
  },

  analyzeResponseText: function(responseJson) {
    var reqAsString = "";    
    for (line in responseJson) {
      reqAsString += responseJson[line]
    }
    responseJson = JSON.parse(reqAsString);

    var responseText = "";
    if(responseJson.output.vgwActionSequence){
      var commands = responseJson.output.vgwActionSequence;
      for(i=0; i<commands.length; i++){
        if(commands[i].command == 'vgwActPlayText'){
          if(commands[i].parameters && commands[i].parameters.text){
            responseText = commands[i].parameters.text;
          }
        }
      }
    }
    
    return responseText;
  },

  analyzeResponseAction: function(responseJson) {
    var reqAsString = "";
    for (line in responseJson) {
      reqAsString += responseJson[line]
    }
    responseJson = JSON.parse(reqAsString);
    return responseJson.context.action;
  },

  analyzeCallTransfer: function(action) {      	
  	if(action != undefined){
    	return JSON.stringify(action).indexOf("transferToAgent") > -1;
	}
  }
}
