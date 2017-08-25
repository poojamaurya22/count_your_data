var myChart  = echarts.init(document.getElementById('main'));
var myChart2 = echarts.init(document.getElementById('main2'));
var myChart3 = echarts.init(document.getElementById('main3'));
var myChart4 = echarts.init(document.getElementById('main4'));
var myChart5 = echarts.init(document.getElementById('main5'));
var myChart6 = echarts.init(document.getElementById('main6'));
var myChart7 = echarts.init(document.getElementById('main7'));

var count=0;

myChart.setTheme('heilanthus');			
myChart2.setTheme('heilanthus');			
myChart3.setTheme('heilanthus');			
myChart4.setTheme('heilanthus');			
myChart5.setTheme('heilanthus');			
myChart6.setTheme('heilanthus');			
myChart7.setTheme('heilanthus');						
function getchart() {
	var option1;
	var option2;
	var option3;
	var option4;
	var option5;
	var option6;
	var option7;
setTimeout(function() {
	var $element = $('[ng-controller="myCtrl"]');
    var scope = angular.element($element).scope();
    // myVar = setTimeout(showPage, 25000);
    //console.dir(scope.chart);
	if(count==0)
	scope.getPageinit();
    count++;
	scope.getFans();
	scope.getImpressionsorganic();
	scope.getPagefansadd();
	scope.getPageCallPhone();
	scope.getImpressionspn();
	scope.getfanGen();
	scope.getPageImpressionStoryType();
		
	option1=scope.chart;
	option2=scope.chart2;
	option3=scope.chart3;
	option4=scope.chart4;
	option5=scope.chart5;
	option6=scope.chart6;
	option7=scope.chart7;
	
	
	myChart2.setOption(option2);
	//myChart2.setTheme('heilanthus');
    myChart.setOption(option1);
    //myChart.setTheme('heilanthus');
    myChart3.setOption(option3);
    //myChart3.setTheme('heilanthus');
    myChart4.setOption(option4);
    //myChart4.setTheme('heilanthus');
    myChart5.setOption(option5);
    //myChart5.setTheme('heilanthus');
    myChart6.setOption(option6);
    //myChart6.setTheme('heilanthus');
    myChart7.setOption(option7);
    //myChart7.setTheme('heilanthus');
	}, 15000);
    }
			
	$(window).on('resize', function(){
    if(myChart != null && myChart != undefined){
    myChart.resize();
    myChart2.resize();		  
    myChart3.resize();		  
    myChart4.resize();		  
    myChart5.resize();		  
    myChart6.resize();		  
    myChart7.resize();		  
    }
    });