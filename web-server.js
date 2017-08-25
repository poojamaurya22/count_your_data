
var express = require('express');
var app = express();

app.use(express.static(__dirname+'/../..'));
app.use('/index.js',express.static(__dirname + '/index.js'));
app.use('/index.html',express.static(__dirname + '/production/index.html'));
app.use('/ngFacebook.js',express.static(__dirname + '/ngFacebook.js'));
app.use('/angular.min.js',express.static(__dirname + '/angular.min.js'));
app.use('/bar-chart.js',express.static(__dirname + '/bar-chart.js'));
app.use('/controller.js',express.static(__dirname + '/controller.js'));
app.use('/chart.js',express.static(__dirname + '/chart.js'));
app.use('/piechart.js',express.static(__dirname + '/piechart.js'));
app.use('/chartnew.js',express.static(__dirname + '/chartnew.js'));
app.use('/echarts.js',express.static(__dirname + '/echarts.js'));


app.use('/bootstrap.min.css',express.static(__dirname + '/vendors/bootstrap/dist/css/bootstrap.min.css'));
app.use('/font-awesome.min.css',express.static(__dirname + '/vendors/font-awesome/css/font-awesome.min.css'));
app.use('/nprogress.css',express.static(__dirname + '/vendors/nprogress/nprogress.css'));
app.use('/green.css',express.static(__dirname + '/vendors/iCheck/skins/flat/green.css'));
app.use('/bootstrap-progressbar-3.3.4.min.css',express.static(__dirname + '/vendors/bootstrap-progressbar/css/bootstrap-progressbar-3.3.4.min.css'));
app.use('/jqvmap.min.css',express.static(__dirname + '/vendors/jqvmap/dist/jqvmap.min.css'));
app.use('/daterangepicker.css',express.static(__dirname + '/vendors/bootstrap-daterangepicker/daterangepicker.css'));
app.use('/custom.min.css',express.static(__dirname + '/build/css/custom.min.css'));
app.use('/jquery.min.js',express.static(__dirname + '/vendors/jquery/dist/jquery.min.js'));
app.use('/bootstrap.min.js',express.static(__dirname + '/vendors/bootstrap/dist/js/bootstrap.min.js'));
app.use('/fastclick.js',express.static(__dirname + '/vendors/fastclick/lib/fastclick.js'));
app.use('/nprogress.js',express.static(__dirname + '/vendors/nprogress/nprogress.js'));
app.use('/Chart.min.js',express.static(__dirname + '/vendors/Chart.js/dist/Chart.min.js'));
app.use('/gauge.min.js',express.static(__dirname + '/vendors/gauge.js/dist/gauge.min.js'));
app.use('/bootstrap-progressbar.min.js',express.static(__dirname + '/vendors/bootstrap-progressbar/bootstrap-progressbar.min.js'));
app.use('/icheck.min.js',express.static(__dirname + '/vendors/iCheck/icheck.min.js'));
app.use('/skycons.js',express.static(__dirname + '/vendors/skycons/skycons.js'));
app.use('/jquery.flot.js',express.static(__dirname + '/vendors/Flot/jquery.flot.js'));
app.use('/jquery.flot.pie.js',express.static(__dirname + '/vendors/Flot/jquery.flot.pie.js'));
app.use('/jquery.flot.time.js',express.static(__dirname + '/vendors/Flot/jquery.flot.time.js'));
app.use('/jquery.flot.stack.js',express.static(__dirname + '/vendors/Flot/jquery.flot.stack.js'));
app.use('/jquery.flot.resize.js',express.static(__dirname + '/vendors/Flot/jquery.flot.resize.js'));
app.use('/jquery.flot.orderBars.js',express.static(__dirname + '/vendors/flot.orderbars/js/jquery.flot.orderBars.js'));
app.use('/jquery.flot.spline.min.js',express.static(__dirname + '/vendors/flot-spline/js/jquery.flot.spline.min.js'));
app.use('/curvedLines.js',express.static(__dirname + '/vendors/flot.curvedlines/curvedLines.js'));
app.use('/date.js',express.static(__dirname + '/vendors/DateJS/build/date.js'));
app.use('/jquery.vmap.js',express.static(__dirname + '/vendors/jqvmap/dist/jquery.vmap.js'));
app.use('/jquery.vmap.world.js',express.static(__dirname + '/vendors/jqvmap/dist/maps/jquery.vmap.world.js'));
app.use('/jquery.vmap.sampledata.js',express.static(__dirname + '/vendors/jqvmap/examples/js/jquery.vmap.sampledata.js'));
app.use('/moment.min.js',express.static(__dirname + '/vendors/moment/min/moment.min.js'));
app.use('/daterangepicker.js',express.static(__dirname + '/vendors/bootstrap-daterangepicker/daterangepicker.js'));
app.use('/custom.min.js',express.static(__dirname + '/build/js/custom.min.js'));


app.get('/',function(req,res){
res.sendFile(__dirname +'/production/index.html');
});
var port = process.env.HTTP_PORT || 3000;
app.listen(port, function () {
  var host = (process.env.HTTP_HOST || this.address().address);

  console.log('App listening at http://%s:%s', host, port);
});