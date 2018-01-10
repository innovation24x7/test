const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();
app.use(fileUpload());

var bodyParser = require('body-parser')
var multer  = require('multer')
// var storage = multer.memoryStorage()
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})
var upload = multer({ storage: storage })

app.use( bodyParser.json() );

app.use(bodyParser.urlencoded({limit: '200mb', extended: true}));
app.use(bodyParser.json({limit: '200mb'}));

// var receiver = require('./routes/analyze')
// app.post('/analyze', receiver.receive);

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

var path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

var fileUploader = require("./upload/fileUploader.js");
app.post('/uploadFile', upload.single('soeappLogFile'), fileUploader.upload);
// app.post('/uploadFile', upload.any(), fileUploader.upload)


var conversation = require("./conversation/conversation.js");
app.get('/analyzeConversation',conversation.analyzeConversation);

app.get('/', function (req, res) {
  
  res.render('fileUpload');
  // logAnalyzer.analyze(res);

})

var port = process.env.PORT || process.env.VCAP_APP_PORT || 3001;
app.listen(port, function () {
  console.log('Example app listening on port 3000!')
})
