var app = angular.module('myApp', ['ngFacebook'])
  .config(['$facebookProvider', function($facebookProvider) {
    $facebookProvider.setAppId('610523802470685').setPermissions(['email','read_insights','pages_show_list']);
  }])
  .run(['$rootScope', '$window', function($rootScope, $window) {
    (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = "//connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
    $rootScope.$on('fb.load', function() {
      $window.dispatchEvent(new Event('fb.load'));
    });
  }])
  .controller('myCtrl', ['$scope', '$facebook', '$window' ,'$location' ,function($scope, $facebook, $window) {
    $scope.$on('fb.auth.authResponseChange', function() {
      $scope.status = $facebook.isConnected();
      if($scope.status) {
      $facebook.cachedApi('/me').then(function(user) {
		  $scope.dateRange = null;
          $scope.user = user;
		  console.log("it is called");
		  $scope.itson=1;
        });
	  $facebook.cachedApi('/me/picture?type=square').then(function(user_pic) { 
		 $scope.pic_url=user_pic.data.url;
		  var d1 = new Date();
		  var curr_date1 = d1.getDate();
          var curr_month1 = d1.getMonth() + 1; //Months are zero based
          var curr_year1 = d1.getFullYear();
          $scope.modDate = curr_year1 + "-" + curr_month1 + "-" + curr_date1;
		  console.log($scope.modDate);
		 //$window.location.href = 'http://localhost:3000/index.html'; //You should have http here.
        });	
      }
    });
    $scope.loginToggle = function() {
      if($scope.status) {
        $facebook.logout();
      } else {
        $facebook.login();
		//$window.location.href = 'http://localhost:3000/index.html'; //You should have http here.
      }};
	  
		$scope.getPageinit = function() {
    if(!$scope.status) return;
    $facebook.cachedApi('/me/accounts').then(function(pages) {	
		  $scope.ID=pages.data[0].id;
		  $scope.initpage=pages.data[0].name;
		  console.log('ID is ' + $scope.ID);
      });
	} 
	  
	$scope.getPage = function() {
    if(!$scope.status) return;
    $facebook.cachedApi('/me/accounts').then(function(pages) {
		  $scope.length = pages.data.length;
		  $scope.arr=new Array();
		  $scope.arr2=new Array();
		  $scope.arr3=new Array();
		  for(var i=0;i<$scope.length;i++){
		  var id=pages.data[i].id;
		  $scope.arr3.push(id);
		  var name=pages.data[i].name;
		  $scope.arr.push(name);
	      $facebook.cachedApi(id+'/picture').then(function(picture) {
		  $scope.arr2.push(picture.data.url);
		  });}
		   $scope.Pages = $scope.arr;
		   $scope.Urls = $scope.arr2;
		   $scope.Ids = $scope.arr3;
      });
	}
      
	
	$scope.getId = function(id) {
      if(!$scope.status) return;
		 console.log(id);
		 $scope.getid=true;
		  $scope.ID=id; 
		   for(var i=0;i<$scope.Ids.length;i++)
			 if($scope.Ids[i]==$scope.ID){
				 $scope.initpage=$scope.Pages[i];
				 $scope.initpageurl=$scope.Urls[i];
			 }
		 }
	
	$scope.$watch('since',function(val){
	var d = new Date(val);
    var curr_date = d.getDate();
    var curr_month = d.getMonth() + 1; //Months are zero based
    var curr_year = d.getFullYear();
    $scope.modDate = curr_year + "-" + curr_month + "-" + curr_date;
    console.log($scope.modDate);
	})
	
	$scope.$watch('until',function(val){
        $scope.until=val;
		console.log(val);
})
	
	$scope.getFans = function() {
      if(!$scope.status) return;
      $facebook.cachedApi($scope.ID+'/insights/page_fans?since='+$scope.modDate).then(function(pagefans) {
		  console.log(pagefans);
		  var valn=new Array();
		  var end_time2=new Array();
		  $scope.length2 = pagefans.data[0].values.length;
		  console.log($scope.length2);
		  var month = new Array();
		  month[0] = "Jan";
		  month[1] = "Feb";
		  month[2] = "March";
		  month[3] = "April";
		  month[4] = "May";
		  month[5] = "Jun";
		  month[6] = "Jul";
		  month[7] = "Aug";
		  month[8] = "Sep";
		  month[9] = "Oct";
		  month[10] = "Nov";
		  month[11] = "Dec";
		
    var d = new Date();
    var n = month[d.getMonth()];
	var datan=new Array();
	var option = {
    			title: { text: '' },
    			tooltip: { },
    			legend: { data: [ 'Page Fans' ] },
				toolbox: {
				show : true,
				feature : {
				mark : {show: false},
				dataView : {show: true, readOnly: false},
				magicType : {show: true, type: ['line', 'bar', 'stack', 'tiled']},
				restore : {show: false},
				saveAsImage : {show: true}
        }
    },
    			xAxis: { data: [ ] },
    			yAxis: { },
    			series: [{
    				name: 'Page Fans',
    				type: 'bar',
    				data: [5, 20, 36, 10, 10, 20]
    			}]
    		};
		  for(var i=0;i<$scope.length2;i++){
		  var  valt= pagefans.data[0].values[i].value;
		  valn.push(pagefans.data[0].values[i].value);
		  var time=pagefans.data[0].values[i].end_time;
		  var d = new Date(time);
		  var curr_date = d.getDate();
		  var curr_month = month[d.getMonth()]; //Months are zero based
		  var curr_year = d.getFullYear();
		  var daten= curr_date + "-" + curr_month + "-" + curr_year;
          end_time2.push(daten);
		  datan.push({date:daten,value:valt});
		  option.xAxis.data[i]=daten;
		  option.series[0].data[i]=valt;
		  }
		   console.log(option);
		  $scope.chart=option;
		  console.log( $scope.chart);
		  
      });
    }
	
	$scope.getCity = function() {
      if(!$scope.status) return;
      $facebook.cachedApi($scope.ID+'/insights/page_impressions_by_city_unique').then(function(fanscity) {
		  console.log(fanscity);
		  var option = {
    			title: { text: '' },
    			tooltip: { },
    			legend: { data: [ 'Page Fans City' ] },
				toolbox: {
				show : true,
				feature : {
				mark : {show: false},
				dataView : {show: true, readOnly: false},
				magicType : {show: true, type: ['line', 'bar', 'stack', 'tiled']},
				restore : {show: false},
				saveAsImage : {show: true}
				}
				},
    			xAxis: { data: [ ] },
    			yAxis: { },
    			series: [{
    				name: 'Page Fans City',
    				type: 'bar',
    				data: []
    			}]
    		};
	  $scope.values1 = fanscity.data[0].values[2].value;
	  console.log($scope.values1);
	  var log = [];
	  
	  angular.forEach($scope.values1, function(value, key) {
	  this.push(key + ': ' + value);}, log);
		$scope.values1 =log;
      });
    }
	
	$scope.getImpressionsorganic = function() {
      if(!$scope.status) return;
      $facebook.cachedApi($scope.ID+'/insights/page_impressions_organic_unique?since='+ $scope.modDate).then(function(pageImpressionsorganic) {
		  
		  console.log(pageImpressionsorganic);
		// $scope.values3 = pageImpressionsorganic.data[0].values[0];
		
		  var valn=new Array();
		  var end_time2=new Array();
		  $scope.length3 = pageImpressionsorganic.data[0].values.length;
		  console.log($scope.length3);
		  var month = new Array();
		  month[0] = "Jan";
		  month[1] = "Feb";
		  month[2] = "March";
		  month[3] = "April";
		  month[4] = "May";
		  month[5] = "Jun";
		  month[6] = "Jul";
		  month[7] = "Aug";
		  month[8] = "Sep";
		  month[9] = "Oct";
		  month[10] = "Nov";
		  month[11] = "Dec";
		
    var d = new Date();
    var n = month[d.getMonth()];
	var datan=new Array();
	var option = {
    			title: { text: '' },
    			tooltip: { },
    			legend: { data: [ 'Page Imp' ] },
				toolbox: {
				show : true,
				feature : {
				mark : {show: false},
				dataView : {show: true, readOnly: false},
				magicType : {show: true, type: ['line', 'bar', 'stack', 'tiled']},
				restore : {show: false},
				saveAsImage : {show: true}
        }
    },
    			xAxis: { data: [  ] },
    			yAxis: { },
    			series: [{
    				name: 'Page Imp',
    				type: 'line',
    				data: []
    			}]
    		};
		  for(var i=0;i<$scope.length3;i++){
		  var  valt= pageImpressionsorganic.data[0].values[i].value;
		  valn.push(pageImpressionsorganic.data[0].values[i].value);
		  var time=pageImpressionsorganic.data[0].values[i].end_time;
		  var d = new Date(time);
		  var curr_date = d.getDate();
		  var curr_month = month[d.getMonth()]; //Months are zero based
		  var curr_year = d.getFullYear();
		  var daten= curr_date + "-" + curr_month + "-" + curr_year;
          end_time2.push(daten);
		  datan.push({date:daten,value:valt});
		  option.xAxis.data[i]=daten;
		  option.series[0].data[i]=valt;
		  }
		   console.log(option);
		  $scope.chart2=option;
		  console.log( $scope.chart2);
		  //console.log($scope.values3); 
		 });
    }
	
	$scope.getPagefansadd = function() {
      if(!$scope.status) return;
      $facebook.cachedApi($scope.ID+'/insights/page_fan_adds?since='+ $scope.modDate).then(function(pagefansadd) {
		  
		  console.log(pagefansadd);
		  
		  //$scope.values8 = pagefansadd.insights.data[0].values[0].value;
		  //console.log($scope.values8); 
		  
		   var valn=new Array();
		  var end_time2=new Array();
		  $scope.length4 = pagefansadd.data[0].values.length;
		  console.log($scope.length4);
		  var month = new Array();
		  month[0] = "Jan";
		  month[1] = "Feb";
		  month[2] = "March";
		  month[3] = "April";
		  month[4] = "May";
		  month[5] = "Jun";
		  month[6] = "Jul";
		  month[7] = "Aug";
		  month[8] = "Sep";
		  month[9] = "Oct";
		  month[10] = "Nov";
		  month[11] = "Dec";
		
    var d = new Date();
    var n = month[d.getMonth()];
	var datan=new Array();
	var option = {
    			title: { text: '' },
    			tooltip: { },
    			legend: { data: [ 'Page Fans Add' ] },
				toolbox: {
				show : true,
				feature : {
				mark : {show: false},
				dataView : {show: true, readOnly: false},
				magicType : {show: true, type: ['line', 'bar', 'stack', 'tiled']},
				restore : {show: false},
				saveAsImage : {show: true}
        }
    },
    			xAxis: { data: [ ] },
    			yAxis: { },
    			series: [{
    				name: 'Page Fans Add',
    				type: 'line',
    				data: []
    			}]
    		};
		  for(var i=0;i<$scope.length4;i++){
		  var  valt= pagefansadd.data[0].values[i].value;
		  valn.push(pagefansadd.data[0].values[i].value);
		  var time=pagefansadd.data[0].values[i].end_time;
		  var d = new Date(time);
		  var curr_date = d.getDate();
		  var curr_month = month[d.getMonth()]; //Months are zero based
		  var curr_year = d.getFullYear();
		  var daten= curr_date + "-" + curr_month + "-" + curr_year;
          end_time2.push(daten);
		  datan.push({date:daten,value:valt});
		  option.xAxis.data[i]=daten;
		  option.series[0].data[i]=valt;
		  }
		   console.log(option);
		  $scope.chart3=option;
		  console.log( $scope.chart3);
		  
		 });
    }
	
	$scope.getImpressionspn = function() {
      if(!$scope.status) return;
      $facebook.cachedApi($scope.ID+'/insights/page_impressions_by_paid_non_paid_unique').then(function(pageImpressionspn){ 
		 console.log(pageImpressionspn);
	     //$scope.values5 = pageImpressionspn.data[0].values[0].value;
		 //console.log($scope.values5);
		  var valn=new Array();
		  var end_time2=new Array();
		  $scope.length5 = pageImpressionspn.data[0].values.length;
		  console.log($scope.length5);
		  var month = new Array();
		  month[0] = "Jan";
		  month[1] = "Feb";
		  month[2] = "March";
		  month[3] = "April";
		  month[4] = "May";
		  month[5] = "Jun";
		  month[6] = "Jul";
		  month[7] = "Aug";
		  month[8] = "Sep";
		  month[9] = "Oct";
		  month[10] = "Nov";
		  month[11] = "Dec";
		
    var d = new Date();
    var n = month[d.getMonth()];
	var datan=new Array();
	var option = {
    			title: { text: '' },
    			tooltip: { },
    			legend: { data: [ 'Page Paid/Unpaid Impressions' ] },
				toolbox: {
				show : true,
				feature : {
				mark : {show: false},
				dataView : {show: true, readOnly: false},
				magicType : {show: true, type: ['line', 'bar', 'stack', 'tiled']},
				restore : {show: false},
				saveAsImage : {show: true}
        }
    },
    			xAxis: { data: [ ] },
    			yAxis: { },
    			series: [{
    				name: 'Page Paid Impressions',
    				type: 'line',
					smooth:true,
                    itemStyle: {normal: {areaStyle: {type: 'default'}}},
    				data: []
    			},
				{
    				name: 'Page Unpaid Impressions',
    				type: 'line',
					smooth:true,
                    itemStyle: {normal: {areaStyle: {type: 'default'}}},
    				data: []
    			}
				]
    		};
		  for(var i=0;i<$scope.length5;i++){
		  var  valt1= pageImpressionspn.data[0].values[i].value.paid;
		  var  valt2= pageImpressionspn.data[0].values[i].value.unpaid;
		  
		  var time=pageImpressionspn.data[0].values[i].end_time;
		  var d = new Date(time);
		  var curr_date = d.getDate();
		  var curr_month = month[d.getMonth()]; //Months are zero based
		  var curr_year = d.getFullYear();
		  var daten= curr_date + "-" + curr_month + "-" + curr_year;
         
		  option.xAxis.data[i]=daten;
		  option.series[0].data[i]=valt1;
		  option.series[1].data[i]=valt2;
		  }
		   console.log(option);
		  $scope.chart5=option;
		  console.log( $scope.chart5);
		 
		 });
    }

    $scope.getCountry = function() {
      if(!$scope.status) return;
      $facebook.cachedApi($scope.ID+'/insights/page_fans_country/lifetime').then(function(fanscountry) {
	  //console.log(fanscountry);
	  $scope.values7 = fanscountry.data[0].values[0].value;
	  var match=[{ISO:'US',UN:'United States of America'},{ISO:'IN',UN:'India'},{ISO:'AF',UN:'Afghanistan'},{ISO:'AL',UN:'Albania'},{ISO:'DZ',UN:'Algeria'},{ISO:'AS',UN:'American Samoa'},{ISO:'AD',UN:'Andorra'},{ISO:'AO',UN:'Angola'},{ISO:'AI',UN:'Anguilla'},{ISO:'AQ',UN:'Antarctica'},{ISO:'AG',UN:'Antigua and Barbuda'},{ISO:'AR',UN:'Argentina'},{ISO:'AM',UN:'Armenia'},{ISO:'AW',UN:'Aruba'},{ISO:'AU',UN:'Australia'},{ISO:'AT',UN:'Austria'},{ISO:'AZ',UN:'Azerbaijan'},{ISO:'BS',UN:'Bahamas'},{ISO:'BH',UN:'Bahrain'},{ISO:'BD',UN:'Bangladesh'},{ISO:'BB',UN:'Barbados'},{ISO:'BY',UN:'Belarus'},{ISO:'BE',UN:'Belgium'},{ISO:'BZ',UN:'Belize'},{ISO:'BJ',UN:'Benin'},{ISO:'BM',UN:'Bermuda'},{ISO:'BT',UN:'Bhutan'},{ISO:'BO',UN:'Bolivia'},{ISO:'BQ',UN:'Caribbean Netherlands'},{ISO:'BA',UN:'Bosnia and Herzegovina'},{ISO:'BW',UN:'Botswana'},{ISO:'BV',UN:'Bouvet Island'},{ISO:'BR',UN:'Brazil'},{ISO:'IO',UN:'British Indian Ocean Territory'},{ISO:'BN',UN:'Brunei Darussalam'},{ISO:'BG',UN:'Bulgaria'},{ISO:'BF',UN:'Burkina Faso'},{ISO:'BI',UN:'Burundi'},{ISO:'KH',UN:'Cambodia'},{ISO:'CM',UN:'Cameroon'},{ISO:'CA',UN:'Canada'},{ISO:'CV',UN:'Cape Verde'},{ISO:'KY',UN:'Cayman Islands'},{ISO:'CC',UN:'Cocos Islands'},{ISO:'CO',UN:'Colombia'},{ISO:'KM',UN:'Comoros'},{ISO:'CG',UN:'Democratic Republic of the Congo'},{ISO:'CD',UN:'Republic of the Congo'},{ISO:'CK',UN:'Cook Islands'},{ISO:'CR',UN:'Costa Rica'},{ISO:'HR',UN:'Croatia'},{ISO:'CU',UN:'Cuba'},{ISO:'CW',UN:'Curacao'},{ISO:'CY',UN:'Cyprus'},{ISO:'CZ',UN:'Czech Republic'},{ISO:'CI',UN:'Côte d’Ivoire'},{ISO:'DK',UN:'Denmark'},{ISO:'DJ',UN:'Denmark'},{ISO:'DM',UN:'Dominica'},{ISO:'DO',UN:'Dominican Republic'},{ISO:'EC',UN:'Ecuador'},{ISO:'EG',UN:'Egypt'},{ISO:'SV',UN:'El Salvador'},{ISO:'GQ',UN:'Equatorial Guinea'},{ISO:'ER',UN:'Eritrea'},{ISO:'EE',UN:'Estonia'},{ISO:'ET',UN:'Ethiopia'},{ISO:'FK',UN:'Falkland Islands'},{ISO:'FO',UN:'Faroe Islands'},{ISO:'FJ',UN:'Fiji'},{ISO:'FI',UN:'Finland'},{ISO:'FR',UN:'France'},{ISO:'GF',UN:'French Guiana'},{ISO:'GA',UN:'Gabon'},{ISO:'GM',UN:'Gambia'},{ISO:'GE',UN:'Georgia'},{ISO:'DE',UN:'Germany'},{ISO:'GH',UN:'Ghana'},{ISO:'GI',UN:'Gibraltar'},{ISO:'GR',UN:'Greece'},{ISO:'GL',UN:'Greenland'},{ISO:'GD',UN:'Grenada'},{ISO:'GP',UN:'Guadeloupe'},{ISO:'GU',UN:'Guam'},{ISO:'GT',UN:'Guatemala'},{ISO:'GG',UN:'Guernsey'},{ISO:'GN',UN:'Guinea'},{ISO:'GW',UN:'Guinea-Bissau'},{ISO:'GY',UN:'Guyana'},{ISO:'HT',UN:'Haiti'},{ISO:'HM',UN:'Heard and Mcdonald Islands'},{ISO:'VA',UN:'Vatican City State'},{ISO:'HN',UN:'Honduras'},{ISO:'HK',UN:'Hong Kong'},{ISO:'HU',UN:'Hungary'},{ISO:'IS',UN:'Iceland'},{ISO:'ID',UN:'Indonesia'},{ISO:'IR',UN:'Islamic Republic of Iran'},{ISO:'IQ',UN:'Iraq'},{ISO:'IE',UN:'Ireland'},{ISO:'IM',UN:'Isle of Man'},{ISO:'IL',UN:'Israel'},{ISO:'IT',UN:'Italy'},{ISO:'JM',UN:'Jamaica'},{ISO:'JP',UN:'Japan'},{ISO:'JE',UN:'Jersey'},{ISO:'JO',UN:'Jordan'},{ISO:'KZ',UN:'Kazakhstan'},{ISO:'KE',UN:'Kenya'},{ISO:'KI',UN:'Kiribati'},{ISO:'KP',UN:'North Korea'},{ISO:'KR',UN:'South Korea'},{ISO:'KW',UN:'KWT'},{ISO:'KG',UN:'Kuwait'},{ISO:'LA',UN:'Laos'},{ISO:'LV',UN:'Latvia'},{ISO:'LB',UN:'Lebanon'},{ISO:'LS',UN:'Lesotho'},{ISO:'LR',UN:'Liberia'},{ISO:'LY',UN:'Libya'},{ISO:'LI',UN:'Liechtenstein'},{ISO:'LT',UN:'Lithuania'},{ISO:'LU',UN:'Luxembourg'},{ISO:'MO',UN:'Macao'},{ISO:'MK',UN:'Republic of Macedonia'},{ISO:'MG',UN:'Madagascar'},{ISO:'MW',UN:'Malawi'},{ISO:'MY',UN:'Malaysia'},{ISO:'MV',UN:'Maldives'},{ISO:'ML',UN:'Mali'},{ISO:'MT',UN:'Malta'},{ISO:'MH',UN:'Marshall Islands'},{ISO:'MQ',UN:'Martinique'},{ISO:'MR',UN:'Mauritania'},{ISO:'MU',UN:'Mauritius'},{ISO:'YT',UN:'Mayotte'},{ISO:'MX',UN:'Mexico'},{ISO:'FM',UN:'Federated States of Micronesia'},{ISO:'MD',UN:'Moldova'},{ISO:'MC',UN:'Monaco'},{ISO:'MN',UN:'Mongolia'},{ISO:'ME',UN:'Montenegro'},{ISO:'MS',UN:'Montserrat'},{ISO:'MA',UN:'Morocco'},{ISO:'MZ',UN:'Mozambique'},{ISO:'MM',UN:'Myanmar'},{ISO:'NA',UN:'Namibia'},{ISO:'NR',UN:'Nauru'},{ISO:'NP',UN:'Nepal'},{ISO:'NL',UN:'Netherlands'},{ISO:'NC',UN:'New Caledonia'},{ISO:'NZ',UN:'New Zealand'},{ISO:'NI',UN:'Nicaragua'},{ISO:'NE',UN:'Niger'},{ISO:'NG',UN:'Nigeria'},{ISO:'NU',UN:'Niue'},{ISO:'NF',UN:'Norfolk Island'},{ISO:'MP',UN:'Northern Mariana Islands'},{ISO:'NO',UN:'Norway'},{ISO:'OM',UN:'Oman'},{ISO:'PK',UN:'Pakistan'},{ISO:'PW',UN:'Palau'},{ISO:'PS',UN:'Palestinian Territory'},{ISO:'PA',UN:'Panama'},{ISO:'PG',UN:'Papua New Guinea'},{ISO:'PY',UN:'Paraguay'},{ISO:'PE',UN:'Peru'},{ISO:'PH',UN:'Philippines'},{ISO:'PN',UN:'Pitcairn'},{ISO:'PL',UN:'Poland'},{ISO:'PT',UN:'Portugal'},{ISO:'PR',UN:'Puerto Rico'},{ISO:'QA',UN:'Qatar'},{ISO:'RO',UN:'Romania'},{ISO:'RU',UN:'Russian Federation'},{ISO:'RW',UN:'Rwanda'},{ISO:'RE',UN:'REU'},{ISO:'BL',UN:'BLM'},{ISO:'SH',UN:'SHN'},{ISO:'KN',UN:'KNA'},{ISO:'LC',UN:'LCA'},{ISO:'MF',UN:'MAF'},{ISO:'PM',UN:'SPM'},{ISO:'VC',UN:'VCT'},{ISO:'WS',UN:'WSM'},{ISO:'SM',UN:'SMR'},{ISO:'ST',UN:'STP'},{ISO:'SA',UN:'SAU'},{ISO:'SN',UN:'SEN'},{ISO:'RS',UN:'SRB'},{ISO:'SC',UN:'SYC'},{ISO:'SL',UN:'SLE'},{ISO:'SG',UN:'SGP'},{ISO:'SX',UN:'SXM'},{ISO:'SK',UN:'SVK'},{ISO:'SI',UN:'SVN'},{ISO:'SB',UN:'SLB'},{ISO:'SO',UN:'SOM'},{ISO:'ZA',UN:'ZAF'},{ISO:'GS',UN:'SGS'},{ISO:'SS',UN:'SSD'},{ISO:'ES',UN:'ESP'},{ISO:'LK',UN:'LKA'},{ISO:'SD',UN:'SDN'},{ISO:'SR',UN:'SUR'},{ISO:'SJ',UN:'SJM'},{ISO:'SZ',UN:'SWZ'},{ISO:'SE',UN:'SWE'},{ISO:'CH',UN:'CHE'},{ISO:'SY',UN:'SYR'},{ISO:'TW',UN:'TWN'},{ISO:'TJ',UN:'TJK'},{ISO:'TZ',UN:'TZA'},{ISO:'TH',UN:'THA'},{ISO:'TL',UN:'TLS'},{ISO:'TG',UN:'TGO'},{ISO:'TK',UN:'TKL'},{ISO:'TO',UN:'TON'},{ISO:'TT',UN:'TTO'},{ISO:'TN',UN:'TUN'},{ISO:'TR',UN:'TUR'},{ISO:'TM',UN:'TKM'},{ISO:'TC',UN:'TCA'},{ISO:'TV',UN:'TUV'},{ISO:'UG',UN:'UGA'},{ISO:'UA',UN:'UKR'},{ISO:'AE',UN:'ARE'},{ISO:'GB',UN:'GBR'},{ISO:'UM',UN:'UMI'},{ISO:'UY',UN:'URY'},{ISO:'UZ',UN:'UZB'},{ISO:'VU',UN:'VUT'},{ISO:'VE',UN:'VEN'},{ISO:'VN',UN:'VNM'},{ISO:'VG',UN:'VGB'},{ISO:'VI',UN:'VIR'},{ISO:'WF',UN:'WLF'},{ISO:'EH',UN:'ESH'},{ISO:'YE',UN:'YEM'},{ISO:'ZM',UN:'ZMB'},{ISO:'ZW',UN:'ZWE'},{ISO:'AX',UN:'ALA'}];
	  
	  var log = [];
	  angular.forEach($scope.values7, function(value, key) {
		   for(i in match)
			 if(match[i]["ISO"]==key)
	  this.push(match[i]["UN"] + ': ' + value);}, log);
		$scope.values7 =log;
      });
	  console.log($scope.values7);
    }
	
	
	$scope.getfanGen = function() {
      if(!$scope.status) return;
      $facebook.cachedApi($scope.ID+'/insights/page_fans_gender_age?since='+$scope.modDate).then(function(fanGen) {
		console.log(fanGen);
		console.log($scope.data_pie);
		var valn=new Array();
		  var end_time2=new Array();
		  $scope.length6 = fanGen.data[0].values.length;
		  console.log($scope.length6);
		  var month = new Array();
		  month[0] = "Jan";
		  month[1] = "Feb";
		  month[2] = "March";
		  month[3] = "April";
		  month[4] = "May";
		  month[5] = "Jun";
		  month[6] = "Jul";
		  month[7] = "Aug";
		  month[8] = "Sep";
		  month[9] = "Oct";
		  month[10] = "Nov";
		  month[11] = "Dec";
		
    var d = new Date();
    var n = month[d.getMonth()];
	var datan=new Array();
	var option = {
    			title: { text: 'Fans by gender' },
    			tooltip: { },
    			legend: { data: [ 'Fans Male' ,'Fans Female'] },
				toolbox: {
				show : true,
				feature : {
				mark : {show: false},
				dataView : {show: true, readOnly: false},
				magicType : {show: true, type: ['line', 'bar', 'stack', 'tiled']},
				restore : {show: false},
				saveAsImage : {show: true}
        }
    },
    			xAxis: { data: [ ] },
    			yAxis: { },
    			series: [
				{
    				name: 'Fans Male',
    				type: 'bar',
    				data: [ ]
    			},
				{
    				name: 'Fans Female',
    				type: 'bar',
    				data: [ ]
    			}
				]
    		};
		
		  for(var i=0;i<$scope.length6;i++){
		  $scope.male_count=0;
		  $scope.female_count=0;
		  var  valt= fanGen.data[0].values[i].value;
		  var time=fanGen.data[0].values[i].end_time;
		  var d = new Date(time);
		  var curr_date = d.getDate();
		  var curr_month = month[d.getMonth()]; //Months are zero based
		  var curr_year = d.getFullYear();
		  var daten= curr_date + "-" + curr_month + "-" + curr_year;
         
		angular.forEach(valt, function(value, key) {
		if(key[0]=='M')
		$scope.male_count=$scope.male_count+value;
		else 
		$scope.female_count=$scope.female_count+value;
		  });
		   option.xAxis.data[i]=daten;
		  option.series[0].data[i]=$scope.male_count;
		  option.series[1].data[i]=$scope.female_count;
		  }
		   console.log(option);
		  $scope.chart6=option;
		  console.log( $scope.chart6);
		
		 
    });
	}
	$scope.getPageStories = function() {
      if(!$scope.status) return;
      $facebook.cachedApi($scope.ID+'/insights/page_stories').then(function(pageStories) {
		  
		  console.log(pageStories);
		  $scope.values9 = pageStories.data[0].values[0].value;
		  
		  if($scope.values9==0)
		  {
		     $scope.values9="No Page Stories";
		  }
		  console.log($scope.values9); 
		 });
		 
	}
	
	$scope.getPageStorytellers = function() {
      if(!$scope.status) return;
      $facebook.cachedApi($scope.ID+'/insights/page_storytellers').then(function(pageStorytellers) {
		  
		  console.log(pageStorytellers);
		  $scope.values10 = pageStorytellers.data[0];
		  
		  if(typeof $scope.values10=="undefined")
		  {
		     $scope.values10="No Page Stories tellers";
		  }
		  console.log($scope.values10); 
		 });
		 
	}
	
	$scope.getPageStorytype = function() {
      if(!$scope.status) return;
      $facebook.cachedApi($scope.ID+'/insights/page_stories_by_story_type').then(function(pageStorytype) {
		  
		  console.log(pageStorytype);
		  $scope.values11 = pageStorytype.data[0].values[0].value;
		  console.log($scope.values11); 
		  var log = [];
	  angular.forEach($scope.values11, function(value, key) {
	  this.push(key + ': ' + value);}, log);
		$scope.values11 =log;
		 });
		 
	}
	
	$scope.getPageStorytellerbyage= function() {
      if(!$scope.status) return;
      $facebook.cachedApi($scope.ID+'/insights/page_storytellers_by_age_gender').then(function(pageStorytellerbyage) {
		  
		  console.log(pageStorytellerbyage);
		  $scope.values12 = pageStorytellerbyage.data[0].values[0].value;
		  console.log($scope.values12); 
		  var log = [];
	  angular.forEach($scope.values12, function(value, key) {
	  this.push(key + ': ' + value);}, log);
		$scope.values12 =log;
		 });
		 
	}
	
	$scope.getPageStorytellerbycity = function() {
      if(!$scope.status) return;
      $facebook.cachedApi($scope.ID+'/insights/page_storytellers_by_city').then(function(storytellerbycity) {
	  $scope.values13 = storytellerbycity.data[0].values[0].value;
	  console.log($scope.values13);
	  var log = [];
	  angular.forEach($scope.values13, function(value, key) {
	  this.push(key + ': ' + value);}, log);
		$scope.values13 =log;
      });
    }
	
	$scope.getPostStories = function() {
      if(!$scope.status) return;
	  
      $facebook.cachedApi($scope.ID+'/insights/post_stories').then(function(postStories) {
		  
		  console.log(postStories);
		  $scope.values14 = postStories.data[0];
		  
		   if(typeof $scope.values14=="undefined")
		  {
		     $scope.values14="No Page Stories tellers";
		  }
		  console.log($scope.values14); 
		 });
		 
	}
	
	$scope.getPostStorytellers = function() {
      if(!$scope.status) return;
      $facebook.cachedApi($scope.ID+'/insights/post_storytellers').then(function(postStorytellers) {
		  
		  console.log(postStorytellers);
		  $scope.values15 = postStorytellers.data[0];
		  
		  if(typeof $scope.values15=="undefined")
		  {
		     $scope.values15="No Post Stories tellers";
		  }
		  console.log($scope.values15); 
		  
		 });
		 
	}
	
	$scope.getPageEngagedUsers = function() {
      if(!$scope.status) return;
      $facebook.cachedApi($scope.ID+'/insights/page_engaged_users').then(function(pageEngagedUsers) {
		  
		  console.log(pageEngagedUsers);
		  $scope.values16 = pageEngagedUsers.data[0].values[0].value;
		  
		   if($scope.values16==0)
		  {
		     $scope.values16="No Page Engaged Users";
		  }
		  console.log($scope.values16); 
		 });
		 
	}
	
	$scope.getPageConsumption = function() {
      if(!$scope.status) return;
      $facebook.cachedApi($scope.ID+'/insights/page_consumptions_by_consumption_type_unique').then(function(pageConsumption) {
	  $scope.values17 = pageConsumption.data[0].values[0].value;
	  console.log($scope.values17);
	  var log = [];
	  angular.forEach($scope.values17, function(value, key) {
	  this.push(key + ': ' + value);}, log);
		$scope.values17 =log;
      });
    }
	
    $scope.getPageCheckin= function() {
      if(!$scope.status) return;
      $facebook.cachedApi($scope.ID+'/insights/page_places_checkin_total_unique').then(function(pageCheckin) {
		  
		  console.log(pageCheckin);
		  $scope.values18 = pageCheckin.data[0].values[0].value;
		  
		   if($scope.values18==0)
		  {
		     $scope.values18="No Page Place Checkin";
		  }
		  console.log($scope.values18); 
		 });
		 
	}
		
    $scope.getPageNegativeFeedback= function() {
      if(!$scope.status) return;
      $facebook.cachedApi($scope.ID+'/insights/page_negative_feedback_by_type_unique').then(function(pageNegativeFeedback) {
		  
		  console.log(pageNegativeFeedback);
		  $scope.values19 = pageNegativeFeedback.data[0].values[0].value;
		  
		    var log = [];
	  angular.forEach($scope.values19, function(value, key) {
	  this.push(key + ': ' + value);}, log);
		$scope.values19 =log;
		 });
		 
	}
	
	$scope.getPagePositiveFeedback= function() {
      if(!$scope.status) return;
      $facebook.cachedApi($scope.ID+'/insights/page_positive_feedback_by_type_unique').then(function(pagePositiveFeedback) {
		  
		 
		  $scope.values20 = pagePositiveFeedback.data[0].values[0].value;
	  var log = [];
	  angular.forEach($scope.values20, function(value, key) {
	  this.push(key + ': ' + value);}, log);
		$scope.values20 =log;
		 });
		 
	}
	
	$scope.getPageImpressionStoryType= function() {
      if(!$scope.status) return;
      $facebook.cachedApi($scope.ID+'/insights/page_impressions_by_story_type_unique?since='+ $scope.modDate).then(function(pageImpressionStoryType) {
	      console.log(pageImpressionStoryType);
		  $scope.length7 = pageImpressionStoryType.data[0].values.length;
		  var month = new Array();
		  month[0] = "Jan";
		  month[1] = "Feb";
		  month[2] = "March";
		  month[3] = "April";
		  month[4] = "May";
		  month[5] = "Jun";
		  month[6] = "Jul";
		  month[7] = "Aug";
		  month[8] = "Sep";
		  month[9] = "Oct";
		  month[10] = "Nov";
		  month[11] = "Dec";
		  
	var option = {
    tooltip : {
        trigger: 'axis',
        axisPointer : {            
            type : 'shadow'      
        }
    },
    legend: {
        data:['Userpost', 'Pagepost','checkin','fan','question','coupon','event','mention','others']
    },
    toolbox: {
        show : true,
        feature : {
            mark : {show: false},
dataView : {show: true, readOnly: false},
            magicType : {show: true, type: ['line', 'bar', 'stack', 'tiled']},
            restore : {show: false},
            saveAsImage : {show: true}
        }
    },
    calculable : true,
    xAxis : [
        {
            type : 'value'
        }
    ],
    yAxis : [
        {
            type : 'category',
            data : []
        }
    ],
    series : [
        {
            name:'Userpost',
            type:'bar',
            stack: 'Userpost',
            itemStyle : { normal: {label : {show: true, position: 'insideRight'}}},
            data:[]
        },
        {
            name:'Pagepost',
            type:'bar',
            stack: 'Pagepost',
            itemStyle : { normal: {label : {show: true, position: 'insideRight'}}},
            data:[]
        },
        {
            name:'Checkin',
            type:'bar',
            stack: 'checkin',
            itemStyle : { normal: {label : {show: true, position: 'insideRight'}}},
            data:[]
        },
        {
            name:'fan',
            type:'bar',
            stack: 'fan',
            itemStyle : { normal: {label : {show: true, position: 'insideRight'}}},
            data:[]
        },
        {
            name:'question',
            type:'bar',
            stack: 'question',
            itemStyle : { normal: {label : {show: true, position: 'insideRight'}}},
            data:[]
        },
		{
            name:'coupon',
            type:'bar',
            stack: 'coupon',
            itemStyle : { normal: {label : {show: true, position: 'insideRight'}}},
            data:[]
        },
		{
            name:'event   ',
            type:'bar',
            stack: 'event',
            itemStyle : { normal: {label : {show: true, position: 'insideRight'}}},
            data:[]
        },
		{
            name:'mention',
            type:'bar',
            stack: 'mention',
            itemStyle : { normal: {label : {show: true, position: 'insideRight'}}},
            data:[]
        },
		{
            name:'other',
            type:'bar',
            stack: 'other',
            itemStyle : { normal: {label : {show: true, position: 'insideRight'}}},
            data:[]
        }
    ]
};
//console.log(option.xAxis[0].data);
//console.log(option.xAxis.data[1]);
          // console.log($scope.length7);      
		  for(var i=0;i<$scope.length7;i++){
		  var  foo= pageImpressionStoryType.data[0].values[i].value;
		  //console.log(foo);
		  var time=pageImpressionStoryType.data[0].values[i].end_time;
		  //console.log(time);
		  var d1 = new Date(time);
		 // console.log(d1);
		  var curr_date1 = d1.getDate();
		  // console.log(curr_date1);
		  var curr_month1 = month[d1.getMonth()]; 
		  // console.log(curr_month1);
		  var curr_year1 = d1.getFullYear();
		   //console.log(curr_year1);
		  var daten= curr_date1 + "-" + curr_month1 + "-" + curr_year1;
		  // console.log(daten);
		  option.yAxis[0].data[i]=daten;
		  //console.log(daten);
		  var l=0;
		  for(j in foo) {
			if (foo.hasOwnProperty(j)) {
			console.log(foo[j])
			option.series[l].data[i]=foo[j];	
				l++;
        }
        }
		}
		  
		  console.log(option);
		  $scope.chart7=option;
		  console.log( $scope.chart7);
		 });
		 
	}
	
	$scope.getImpressionCountry= function() {
      if(!$scope.status) return;
      $facebook.cachedApi($scope.ID+'/insights/page_impressions_by_country_unique').then(function(impressionCountry) {
	  //console.log(fanscountry);
	  $scope.values22 = impressionCountry.data[0].values[0].value;
	  //console.log($scope.values22);
	  
	 // var match=[{ISO:'US',UN:'USA'},{ISO:'IN',UN:'IND'}];
	  var match=[{ISO:'US',UN:'USA'},{ISO:'IN',UN:'IND'},{ISO:'AF',UN:'AFG'},{ISO:'AL',UN:'ALB'},{ISO:'DZ',UN:'DZA'},{ISO:'AS',UN:'ASM'},{ISO:'AD',UN:'AND'},{ISO:'AO',UN:'AGO'},{ISO:'AI',UN:'AIA'},{ISO:'AQ',UN:'ATA'},{ISO:'AG',UN:'ATG'},{ISO:'AR',UN:'ARQ'},{ISO:'AM',UN:'ARM'},{ISO:'AW',UN:'ABW'},{ISO:'AU',UN:'AUS'},{ISO:'AT',UN:'AUT'},{ISO:'AZ',UN:'AZE'},{ISO:'BS',UN:'BHS'},{ISO:'BH',UN:'BHS'},{ISO:'BD',UN:'BGD'},{ISO:'BB',UN:'BRB'},{ISO:'BY',UN:'BRB'},{ISO:'BE',UN:'BEL'},{ISO:'BZ',UN:'BLZ'},{ISO:'BJ',UN:'BEN'},{ISO:'BM',UN:'BMU'},{ISO:'BT',UN:'BTN'},{ISO:'BO',UN:'BOL'},{ISO:'BQ',UN:'BES'},{ISO:'BA',UN:'BIH'},{ISO:'BW',UN:'BWA'},{ISO:'BV',UN:'BVT'},{ISO:'BR',UN:'BRA'},{ISO:'IO',UN:'IOT'},{ISO:'BN',UN:'BRN'},{ISO:'BG',UN:'BGR'},{ISO:'BF',UN:'BFA'},{ISO:'BI',UN:'BDI'},{ISO:'KH',UN:'KHM'},{ISO:'CM',UN:'CMR'},{ISO:'CA',UN:'CAN'},{ISO:'CV',UN:'CPV'},{ISO:'KY',UN:'CYM'},{ISO:'CC',UN:'CCK'},{ISO:'CO',UN:'COL'},{ISO:'KM',UN:'COM'},{ISO:'CG',UN:'COG'},{ISO:'CD',UN:'COD'},{ISO:'CK',UN:'COK'},{ISO:'CR',UN:'CRI'},{ISO:'HR',UN:'HRV'},{ISO:'CU',UN:'CUB'},{ISO:'CW',UN:'CUW'},{ISO:'CY',UN:'CYP'},{ISO:'CZ',UN:'CZE'},{ISO:'CI',UN:'CIV'},{ISO:'DK',UN:'DNK'},{ISO:'DJ',UN:'DJI'},{ISO:'DM',UN:'DMA'},{ISO:'DO',UN:'DOM'},{ISO:'EC',UN:'ECU'},{ISO:'EG',UN:'EGY'},{ISO:'SV',UN:'SLV'},{ISO:'GQ',UN:'GNQ'},{ISO:'ER',UN:'ERI'},{ISO:'EE',UN:'EST'},{ISO:'ET',UN:'ETH'},{ISO:'FK',UN:'FLK'},{ISO:'FO',UN:'FRO'},{ISO:'FJ',UN:'FJI'},{ISO:'FI',UN:'FIN'},{ISO:'FR',UN:'FRA'},{ISO:'GF',UN:'GUF'},{ISO:'GA',UN:'GAB'},{ISO:'GM',UN:'GMB'},{ISO:'GE',UN:'GEO'},{ISO:'DE',UN:'DEU'},{ISO:'GH',UN:'GHA'},{ISO:'GI',UN:'GIB'},{ISO:'GR',UN:'GRC'},{ISO:'GL',UN:'GRL'},{ISO:'GD',UN:'GRD'},{ISO:'GP',UN:'GLP'},{ISO:'GU',UN:'GUM'},{ISO:'GT',UN:'GTM'},{ISO:'GG',UN:'GGY'},{ISO:'GN',UN:'GIN'},{ISO:'GW',UN:'GNB'},{ISO:'GY',UN:'GUY'},{ISO:'HT',UN:'HTI'},{ISO:'HM',UN:'HMD'},{ISO:'VA',UN:'VAT'},{ISO:'HN',UN:'HND'},{ISO:'HK',UN:'HKG'},{ISO:'HU',UN:'HUN'},{ISO:'IS',UN:'ISL'},{ISO:'ID',UN:'IDN'},{ISO:'IR',UN:'IRN'},{ISO:'IQ',UN:'IRQ'},{ISO:'IE',UN:'IRL'},{ISO:'IM',UN:'IMN'},{ISO:'IL',UN:'ISR'},{ISO:'IT',UN:'ITA'},{ISO:'JM',UN:'JAM'},{ISO:'JP',UN:'JPN'},{ISO:'JE',UN:'JEY'},{ISO:'JO',UN:'JOR'},{ISO:'KZ',UN:'KAZ'},{ISO:'KE',UN:'KEN'},{ISO:'KI',UN:'KIR'},{ISO:'KP',UN:'PRK'},{ISO:'KR',UN:'KOR'},{ISO:'KW',UN:'KWT'},{ISO:'KG',UN:'KGZ'},{ISO:'LA',UN:'LAO'},{ISO:'LV',UN:'LVA'},{ISO:'LB',UN:'LBN'},{ISO:'LS',UN:'LSO'},{ISO:'LR',UN:'LBR'},{ISO:'LY',UN:'LBY'},{ISO:'LI',UN:'LIE'},{ISO:'LT',UN:'LTU'},{ISO:'LU',UN:'LUX'},{ISO:'MO',UN:'MAC'},{ISO:'MK',UN:'MKD'},{ISO:'MG',UN:'MDG'},{ISO:'MW',UN:'MWI'},{ISO:'MY',UN:'MYS'},{ISO:'MV',UN:'MDV'},{ISO:'ML',UN:'MLI'},{ISO:'MT',UN:'MLT'},{ISO:'MH',UN:'MHL'},{ISO:'MQ',UN:'MTQ'},{ISO:'MR',UN:'MRT'},{ISO:'MU',UN:'MUS'},{ISO:'YT',UN:'MYT'},{ISO:'MX',UN:'MEX'},{ISO:'FM',UN:'FSM'},{ISO:'MD',UN:'MDA'},{ISO:'MC',UN:'MCO'},{ISO:'MN',UN:'MNG'},{ISO:'ME',UN:'MNE'},{ISO:'MS',UN:'MSR'},{ISO:'MA',UN:'MAR'},{ISO:'MZ',UN:'MOZ'},{ISO:'MM',UN:'MMR'},{ISO:'NA',UN:'NAM'},{ISO:'NR',UN:'NRU'},{ISO:'NP',UN:'NPL'},{ISO:'NL',UN:'NLD'},{ISO:'NC',UN:'NCL'},{ISO:'NZ',UN:'NZL'},{ISO:'NI',UN:'NIC'},{ISO:'NE',UN:'NER'},{ISO:'NG',UN:'NGA'},{ISO:'NU',UN:'NIU'},{ISO:'NF',UN:'NFK'},{ISO:'MP',UN:'MNP'},{ISO:'NO',UN:'NOR'},{ISO:'OM',UN:'OMN'},{ISO:'PK',UN:'PAK'},{ISO:'PW',UN:'PLW'},{ISO:'PS',UN:'PSE'},{ISO:'PA',UN:'PAN'},{ISO:'PG',UN:'PNG'},{ISO:'PY',UN:'PRY'},{ISO:'PE',UN:'PER'},{ISO:'PH',UN:'PHL'},{ISO:'PN',UN:'PCN'},{ISO:'PL',UN:'POL'},{ISO:'PT',UN:'PRT'},{ISO:'PR',UN:'PRI'},{ISO:'QA',UN:'QAT'},{ISO:'RO',UN:'ROU'},{ISO:'RU',UN:'RUS'},{ISO:'RW',UN:'RWA'},{ISO:'RE',UN:'REU'},{ISO:'BL',UN:'BLM'},{ISO:'SH',UN:'SHN'},{ISO:'KN',UN:'KNA'},{ISO:'LC',UN:'LCA'},{ISO:'MF',UN:'MAF'},{ISO:'PM',UN:'SPM'},{ISO:'VC',UN:'VCT'},{ISO:'WS',UN:'WSM'},{ISO:'SM',UN:'SMR'},{ISO:'ST',UN:'STP'},{ISO:'SA',UN:'SAU'},{ISO:'SN',UN:'SEN'},{ISO:'RS',UN:'SRB'},{ISO:'SC',UN:'SYC'},{ISO:'SL',UN:'SLE'},{ISO:'SG',UN:'SGP'},{ISO:'SX',UN:'SXM'},{ISO:'SK',UN:'SVK'},{ISO:'SI',UN:'SVN'},{ISO:'SB',UN:'SLB'},{ISO:'SO',UN:'SOM'},{ISO:'ZA',UN:'ZAF'},{ISO:'GS',UN:'SGS'},{ISO:'SS',UN:'SSD'},{ISO:'ES',UN:'ESP'},{ISO:'LK',UN:'LKA'},{ISO:'SD',UN:'SDN'},{ISO:'SR',UN:'SUR'},{ISO:'SJ',UN:'SJM'},{ISO:'SZ',UN:'SWZ'},{ISO:'SE',UN:'SWE'},{ISO:'CH',UN:'CHE'},{ISO:'SY',UN:'SYR'},{ISO:'TW',UN:'TWN'},{ISO:'TJ',UN:'TJK'},{ISO:'TZ',UN:'TZA'},{ISO:'TH',UN:'THA'},{ISO:'TL',UN:'TLS'},{ISO:'TG',UN:'TGO'},{ISO:'TK',UN:'TKL'},{ISO:'TO',UN:'TON'},{ISO:'TT',UN:'TTO'},{ISO:'TN',UN:'TUN'},{ISO:'TR',UN:'TUR'},{ISO:'TM',UN:'TKM'},{ISO:'TC',UN:'TCA'},{ISO:'TV',UN:'TUV'},{ISO:'UG',UN:'UGA'},{ISO:'UA',UN:'UKR'},{ISO:'AE',UN:'ARE'},{ISO:'GB',UN:'GBR'},{ISO:'UM',UN:'UMI'},{ISO:'UY',UN:'URY'},{ISO:'UZ',UN:'UZB'},{ISO:'VU',UN:'VUT'},{ISO:'VE',UN:'VEN'},{ISO:'VN',UN:'VNM'},{ISO:'VG',UN:'VGB'},{ISO:'VI',UN:'VIR'},{ISO:'WF',UN:'WLF'},{ISO:'EH',UN:'ESH'},{ISO:'YE',UN:'YEM'},{ISO:'ZM',UN:'ZMB'},{ISO:'ZW',UN:'ZWE'},{ISO:'AX',UN:'ALA'}];
		
	  //console.log(match[0]);
	  //for( i in  match){
		//  console.log(match[i]["ISO"]);
	  //}
	  var log = [];
	  angular.forEach($scope.values22, function(value, key) {
		   for(i in match)
			 if(match[i]["ISO"]==key)
	  this.push(match[i]["UN"] + ': ' + value);}, log);
		$scope.values22 =log;
      });
	  console.log($scope.values22);
    }	
    $scope.getPageReactionTotal= function() {
      if(!$scope.status) return;
      $facebook.cachedApi($scope.ID+'/insights/page_actions_post_reactions_total').then(function(pageReactionTotal) {	 
	 $scope.values23 = pageReactionTotal.data[0].values[0].value;
	  var log = [];
	  angular.forEach($scope.values23, function(value, key) {
	  this.push(key + ': ' + value);}, log);
		$scope.values23 =log;
		 });	 
	}
	
	$scope.getPageCallPhone= function() {
      if(!$scope.status) return;
      $facebook.cachedApi($scope.ID+'/insights/page_call_phone_clicks_logged_in_unique?since='+$scope.modDate).then(function(pageCallPhone) {
		  console.log(pageCallPhone);
		  $scope.values24 = pageCallPhone.data[0].values[0].value;
		  var valn=new Array();
		  var end_time2=new Array();
		  $scope.length5 = pageCallPhone.data[0].values.length;
		  console.log($scope.length4);
		  var month = new Array();
		  month[0] = "Jan";
		  month[1] = "Feb";
		  month[2] = "March";
		  month[3] = "April";
		  month[4] = "May";
		  month[5] = "Jun";
		  month[6] = "Jul";
		  month[7] = "Aug";
		  month[8] = "Sep";
		  month[9] = "Oct";
		  month[10] = "Nov";
		  month[11] = "Dec";
		
    var d = new Date();
    var n = month[d.getMonth()];
	var datan=new Array();
	var option = {
    			title: { text: '' },
    			tooltip: { },
    			legend: { data: [ 'Page Button Clicks' ] },
				toolbox: {
        show : true,
        feature : {
            mark : {show: false},
dataView : {show: true, readOnly: false},
            magicType : {show: true, type: ['line', 'bar', 'stack', 'tiled']},
            restore : {show: false},
            saveAsImage : {show: true}
        }
    },
    			xAxis: { data: [ ] },
    			yAxis: { },
    			series: [{
    				name: 'Page Button Clicks',
    				type: 'line',
    				data: []
    			}]
    		};
		  for(var i=0;i<$scope.length5;i++){
		  var  valt= pageCallPhone.data[0].values[i].value;
		  valn.push(pageCallPhone.data[0].values[i].value);
		  var time=pageCallPhone.data[0].values[i].end_time;
		  var d = new Date(time);
		  var curr_date = d.getDate();
		  var curr_month = month[d.getMonth()]; //Months are zero based
		  var curr_year = d.getFullYear();
		  var daten= curr_date + "-" + curr_month + "-" + curr_year;
          end_time2.push(daten);
		  datan.push({date:daten,value:valt});
		  option.xAxis.data[i]=daten;
		  option.series[0].data[i]=valt;
		  }
		  console.log(option);
		  $scope.chart4=option;
		  console.log( $scope.chart4);
		   if($scope.values24==0)
		  {
		     $scope.values24="No Call Button Clicked";
		  }
		  console.log($scope.values24); 
		 });
		 
		 
	}
	
	$scope.getPageGetDirection= function() {
      if(!$scope.status) return;
      $facebook.cachedApi($scope.ID+'/insights/page_get_directions_clicks_logged_in_unique').then(function(pageGetDirection) {
		  
		 
		  $scope.values25 = pageGetDirection.data[0].values[0].value;
		  if($scope.values25==0)
		  {
		     $scope.values25="No Get Direction Button";
		  }
		   
		  console.log($scope.values25); 
		 });
		 
	}
	
	$scope.getLoginView = function() {
      if(!$scope.status) return;
      $facebook.cachedApi($scope.ID+'/insights/page_views_logged_in_total').then(function(loginView){ 
		 
		 $scope.values26= loginView.data[0].values[0].value;
		 
		 });
    }
	
	$scope.getLoggedoutView = function() {
      if(!$scope.status) return;
      $facebook.cachedApi($scope.ID+'/insights/page_views_logout').then(function(loggedoutView){ 
		 
		 $scope.values27 = loggedoutView.data[0].values[0].value;
		 
		 });
    }
		
	$scope.getPageViewByProfile= function() {
      if(!$scope.status) return;
      $facebook.cachedApi($scope.ID+'/insights/page_views_by_profile_tab_total').then(function(viewByProfile) {
		  
		 
		  $scope.values28 = viewByProfile.data[0].values[0].value;
		  
		    var log = [];
	  angular.forEach($scope.values28, function(value, key) {
	  this.push(key + ': ' + value);}, log);
		$scope.values28 =log;
		 });
		 
	}
  }])
;

/*app.config(['$routeProvider', function($routeProvider) {
   $routeProvider
  .when("/main", {
    templateUrl : "main.htm"
  })
  .when("/red", {
    templateUrl : "red.htm"
  })
  .when("/green", {
    templateUrl : "green.htm"
  })
  .otherwise({
    templateUrl : "<h1> get Lost</h1>"
  }); 

}]); */


/*function accessControllerScopeVar() {
    var scope = getScopeFor("myCtrl");
    scope.$apply(function () {
        alert(scope.user);
    });
}

function accessControllerScopeFunction() {
    var scope = getScopeFor("myCtrl");
    scope.$apply(function () {
        alert('Hello ' + scope.vm.getFullName());
    });
}

function getScopeFor(id) {
    var el = document.getElementById(id);
    var scope = angular.element(el).scope();
    return scope;
}*/