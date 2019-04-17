'use strict';

window.chartColors = {
	red: 'rgb(255, 99, 132)',
	orange: 'rgb(255, 159, 64)',
	yellow: 'rgb(255, 205, 86)',
	green: 'rgb(75, 192, 192)',
	blue: 'rgb(54, 162, 235)',
	purple: 'rgb(153, 102, 255)',
	grey: 'rgb(201, 203, 207)'
};

(function(global) {
	var MONTHS = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December'
	];

	var COLORS = [
		'#4dc9f6',
		'#f67019',
		'#f53794',
		'#537bc4',
		'#acc236',
		'#166a8f',
		'#00a950',
		'#58595b',
		'#8549ba'
	];

	var Samples = global.Samples || (global.Samples = {});
	var Color = global.Color;

	Samples.utils = {
		// Adapted from http://indiegamr.com/generate-repeatable-random-numbers-in-js/
		srand: function(seed) {
			this._seed = seed;
		},

		rand: function(min, max) {
			var seed = this._seed;
			min = min === undefined ? 0 : min;
			max = max === undefined ? 1 : max;
			this._seed = (seed * 9301 + 49297) % 233280;
			return min + (this._seed / 233280) * (max - min);
		},

		numbers: function(config) {
			var cfg = config || {};
			var min = cfg.min || 0;
			var max = cfg.max || 1;
			var from = cfg.from || [];
			var count = cfg.count || 8;
			var decimals = cfg.decimals || 8;
			var continuity = cfg.continuity || 1;
			var dfactor = Math.pow(10, decimals) || 0;
			var data = [];
			var i, value;

			for (i = 0; i < count; ++i) {
				value = (from[i] || 0) + this.rand(min, max);
				if (this.rand() <= continuity) {
					data.push(Math.round(dfactor * value) / dfactor);
				} else {
					data.push(null);
				}
			}

			return data;
		},

		labels: function(config) {
			var cfg = config || {};
			var min = cfg.min || 0;
			var max = cfg.max || 100;
			var count = cfg.count || 8;
			var step = (max - min) / count;
			var decimals = cfg.decimals || 8;
			var dfactor = Math.pow(10, decimals) || 0;
			var prefix = cfg.prefix || '';
			var values = [];
			var i;

			for (i = min; i < max; i += step) {
				values.push(prefix + Math.round(dfactor * i) / dfactor);
			}

			return values;
		},

		months: function(config) {
			var cfg = config || {};
			var count = cfg.count || 12;
			var section = cfg.section;
			var values = [];
			var i, value;

			for (i = 0; i < count; ++i) {
				value = MONTHS[Math.ceil(i) % 12];
				values.push(value.substring(0, section));
			}

			return values;
		},

		color: function(index) {
			return COLORS[index % COLORS.length];
		},

		transparentize: function(color, opacity) {
			var alpha = opacity === undefined ? 0.5 : 1 - opacity;
			return Color(color).alpha(alpha).rgbString();
		}
	};

	// DEPRECATED
	window.randomScalingFactor = function() {
		return Math.round(Samples.utils.rand(-100, 100));
	};

	// INITIALIZATION

	Samples.utils.srand(Date.now());

	// Google Analytics
	/* eslint-disable */
	if (document.location.hostname.match(/^(www\.)?chartjs\.org$/)) {
		(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
		(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
		m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
		})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
		ga('create', 'UA-28909194-3', 'auto');
		ga('send', 'pageview');
	}
	/* eslint-enable */

}(this));



//======================== pie chat================================================>
var randomScalingFactor = function() {
  return Math.round(Math.random() * 100);
};

var barChartData = {
  labels: [
    'Red',
    'Orange',
    'Yellow',
    'Green',
    'Blue'
  ],
  datasets: [{
    data: [
      randomScalingFactor(),
      randomScalingFactor(),
      randomScalingFactor(),
      randomScalingFactor(),
      randomScalingFactor(),
    ],
    backgroundColor: [
      window.chartColors.red,
      window.chartColors.orange,
      window.chartColors.yellow,
      window.chartColors.green,
      window.chartColors.blue,
    ],
    label: 'Dataset 1'
  }],

};

var barChartData_2 = {
  labels: [
    'Red',
    'Orange',
    'Yellow',
    'Green',
    'Blue'
  ],
  datasets: [{
      label: 'Dataset 1',
      backgroundColor: [
          window.chartColors.red,
          window.chartColors.orange,
          window.chartColors.yellow,
          window.chartColors.green,
          window.chartColors.blue,
          window.chartColors.purple,
          window.chartColors.red
      ],
      yAxisID: 'y-axis-1',
      data: [
						randomScalingFactor(),
						randomScalingFactor(),
						randomScalingFactor(),
						randomScalingFactor(),
						randomScalingFactor(),
					],
  }]

};


window.onload = function() {
  var ctx = document.getElementById('canvas').getContext('2d');
  window.myBar = new Chart(ctx, {
      type: 'bar',
      data: barChartData,
      options: {
          responsive: true,
          title: {
              display: true,
              text: 'Chart.js Bar Chart - Multi Axis'
          },
          tooltips: {
              mode: 'index',
              intersect: true
          },
          scales: {
              yAxes: [{
                  type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
                  display: true,
                  position: 'left',
                  id: 'y-axis-1',
              }],
          }
      }
  });




  var ctx_2 = document.getElementById('canvas2').getContext('2d');
  window.myBar = new Chart(ctx_2, {
      type: 'pie',
      data: barChartData_2,
      options: {
          responsive: true,
          title: {
              display: true,
              text: 'Chart.js Bar Chart - Multi Axis'
          },
          tooltips: {
              mode: 'index',
              intersect: true
          },
          scales: {
              yAxes: [{
                  type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
                  display: true,
                  position: 'left',
                  id: 'y-axis-1',
              }],
          }
      }
  });


  var ctx_3 = document.getElementById('canvas3').getContext('2d');
  window.myBar = new Chart(ctx_3, {
      type: 'radar',
      data: barChartData_2,
      options: {
          responsive: true,
          title: {
              display: true,
              text: 'Chart.js Bar Chart - Multi Axis'
          },
          tooltips: {
              mode: 'index',
              intersect: true
          },
          scales: {
              yAxes: [{
                  type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
                  display: true,
                  position: 'left',
                  id: 'y-axis-1',
              }],
          }
      }
  });


  var ctx_4 = document.getElementById('canvas4').getContext('2d');
  window.myBar = new Chart(ctx_4, {
      type: 'line',
      data: barChartData_2,
      options: {
          responsive: true,
          title: {
              display: true,
              text: 'Chart.js Bar Chart - Multi Axis'
          },
          tooltips: {
              mode: 'index',
              intersect: true
          },
          scales: {
              yAxes: [{
                  type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
                  display: true,
                  position: 'left',
                  id: 'y-axis-1',
              }],
          }
      }
  });
  
  var ctx_5 = document.getElementById('canvas5').getContext('2d');
  window.myBar = new Chart(ctx_5, {
      type: 'doughnut',
      data: barChartData_2,
      options: {
          responsive: true,
          title: {
              display: true,
              text: 'Chart.js Bar Chart - Multi Axis'
          },
          tooltips: {
              mode: 'index',
              intersect: true
          },
          scales: {
              yAxes: [{
                  type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
                  display: true,
                  position: 'left',
                  id: 'y-axis-1',
              }],
          }
      }
  });

  var ctx_6 = document.getElementById('canvas6').getContext('2d');
  window.myBar = new Chart(ctx_6, {
      type: 'bubble',
      data: barChartData_2,
      options: {
          responsive: true,
          title: {
              display: true,
              text: 'Chart.js Bar Chart - Multi Axis'
          },
          tooltips: {
              mode: 'index',
              intersect: true
          },
          scales: {
              yAxes: [{
                  type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
                  display: true,
                  position: 'left',
                  id: 'y-axis-1',
              }],
          }
      }
  });


};

//Avatar Letter script
(function(w, d){


  function LetterAvatar (name, size) {

      name  = name || '';
      size  = size || 60;

      var colours = [
        "orange", "blue", "teal", "green", "teal", "red", "purple", "black", "violet", "#2c3e50", 
        "#f1c40f", "#e67e22", "#e74c3c", "#ecf0f1", "#95a5a6", "#f39c12", "#d35400", "#c0392b", "#bdc3c7", "#7f8c8d"
    ],
          nameSplit = String(name).toUpperCase().split(' '),
          initials, charIndex, colourIndex, canvas, context, dataURI;


      if (nameSplit.length == 1) {
          initials = nameSplit[0] ? nameSplit[0].charAt(0):'?';
      } else {
          initials = nameSplit[0].charAt(0) + nameSplit[1].charAt(0);
      }

      if (w.devicePixelRatio) {
          size = (size * w.devicePixelRatio);
      }
          
      charIndex     = (initials == '?' ? 72 : initials.charCodeAt(0)) - 64;
      colourIndex   = charIndex % 20;
      canvas        = d.createElement('canvas');
      canvas.width  = size;
      canvas.height = size;
      context       = canvas.getContext("2d");
       
      context.fillStyle = colours[colourIndex - 1];
      context.fillRect (0, 0, canvas.width, canvas.height);
      context.font = Math.round(canvas.width/2)+"px Arial";
      context.textAlign = "center";
      context.fillStyle = "#FFF";
      context.fillText(initials, size / 2, size / 1.5);

      dataURI = canvas.toDataURL();
      canvas  = null;

      return dataURI;
  }

  LetterAvatar.transform = function() {

      Array.prototype.forEach.call(d.querySelectorAll('img[avatar]'), function(img, name) {
          name = img.getAttribute('avatar');
          img.src = LetterAvatar(name, img.getAttribute('width'));
          img.removeAttribute('avatar');
          img.setAttribute('alt', name);
      });
  };


  // AMD support
  if (typeof define === 'function' && define.amd) {
      
      define(function () { return LetterAvatar; });
  
  // CommonJS and Node.js module support.
  } else if (typeof exports !== 'undefined') {
      
      // Support Node.js specific `module.exports` (which can be a function)
      if (typeof module != 'undefined' && module.exports) {
          exports = module.exports = LetterAvatar;
      }

      // But always support CommonJS module 1.1.1 spec (`exports` cannot be a function)
      exports.LetterAvatar = LetterAvatar;

  } else {
      
      window.LetterAvatar = LetterAvatar;

      d.addEventListener('DOMContentLoaded', function(event) {
          LetterAvatar.transform();
      });
  }

})(window, document);


var ctx = document.getElementById('myChart').getContext('2d');
var chart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [{
        backgroundColor: '#cce5ff',
        data: [50, 60, 90, 75, 80, 65, 90, 100,160,240, 100, 35, 45, 80, 65, 140]
      }]
  },
  options: {
    responsive: false,
    legend: {
      display: false
    },
    elements: {
      line: {
        borderColor: '#007bff',
        borderWidth: 2
      },
      point: {
        color:'#fff',
        radius: 3
      }
    },
    tooltips: {
      enabled: false
    },
    scales: {
      yAxes: [
        {
          display: false
        }
      ],
      xAxes: [
        {
          display: false
        }
      ]
    }
  }
});


















// $(document).ready(function(){
	
//   var preloadbg = document.createElement("img");
//   preloadbg.src = "";
  
// 	$("#searchfield").focus(function(){
// 		if($(this).val() == "Search contacts..."){
// 			$(this).val("");
// 		}
// 	});
// 	$("#searchfield").focusout(function(){
// 		if($(this).val() == ""){
// 			$(this).val("Search contacts...");
			
// 		}
// 	});
	
// 	$("#sendmessage input").focus(function(){
// 		if($(this).val() == "Send message..."){
// 			$(this).val("");
// 		}
// 	});
// 	$("#sendmessage input").focusout(function(){
// 		if($(this).val() == ""){
// 			$(this).val("Send message...");
			
// 		}
// 	});
		
	
// 	$(".friend").each(function(){		
// 		$(this).click(function(){
// 			var childOffset = $(this).offset();
// 			var parentOffset = $(this).parent().parent().offset();
// 			var childTop = childOffset.top - parentOffset.top;
// 			var clone = $(this).find('img').eq(0).clone();
// 			var top = childTop+12+"px";
			
// 			$(clone).css({'top': top}).addClass("floatingImg").appendTo("#chatbox");									
			
// 			setTimeout(function(){$("#profile p").addClass("animate");$("#profile").addClass("animate");}, 100);
// 			setTimeout(function(){
// 				$("#chat-messages").addClass("animate");
// 				$('.cx, .cy').addClass('s1');
// 				setTimeout(function(){$('.cx, .cy').addClass('s2');}, 100);
// 				setTimeout(function(){$('.cx, .cy').addClass('s3');}, 200);			
// 			}, 150);														
			
// 			$('.floatingImg').animate({
// 				'width': "68px",
// 				'left':'108px',
// 				'top':'20px'
// 			}, 200);
			
// 			var name = $(this).find("p strong").html();
// 			var email = $(this).find("p span").html();														
// 			$("#profile p").html(name);
// 			$("#profile span").html(email);			
			
// 			$(".message").not(".right").find("img").attr("src", $(clone).attr("src"));									
// 			$('#friendslist').fadeOut();
// 			$('#chatview').fadeIn();
		
			
// 			$('#close').unbind("click").click(function(){				
// 				$("#chat-messages, #profile, #profile p").removeClass("animate");
// 				$('.cx, .cy').removeClass("s1 s2 s3");
// 				$('.floatingImg').animate({
// 					'width': "40px",
// 					'top':top,
// 					'left': '12px'
// 				}, 200, function(){$('.floatingImg').remove()});				
				
// 				setTimeout(function(){
// 					$('#chatview').fadeOut();
// 					$('#friendslist').fadeIn();				
// 				}, 50);
// 			});
			
// 		});
// 	});			
// });