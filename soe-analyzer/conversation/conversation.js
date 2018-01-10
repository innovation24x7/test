module.exports = {
  analyzeConversation: function(req, res) {
    var vgwSessionId = req.query.vgwSessionId;
    console.log(vgwSessionId);
    outputJsonForVgwSessionId = global.output[vgwSessionId];

    const sortJson = require('sort-json');
 
	const sortOptions = { ignoreCase: true, reverse: false };
	const outputSortedOnKeys = sortJson(outputJsonForVgwSessionId, sortOptions);

    res.render('analysisConversation', {'conversation':outputSortedOnKeys, 'vgwSessionId': vgwSessionId});
  }
}
