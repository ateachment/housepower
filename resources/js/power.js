// Power of house
// js gauge: http://bernii.github.io/gauge.js/

new Vue({
	el: '#power',

	data() {
		return {
			items: undefined,
			polling: null,
			power: '?',
      power2: '?'
		}
	},

created() {
	this.getData();
	this.pollData();
},
beforeDestroy () {
	clearInterval(this.polling)
},

methods: {
	pollData() {
		this.polling = setInterval(() => {
			this.getData();
		}, 1000) // refresh every 1 sec.
	},
    /**
        * Print the summary and start time of the departures in next hour
        * of a given STOP_ID
        */
    getData() {
          var data = this.$http.get(POWER_URL).then(function(data) {
              //this.items = data;
          this.power = Math.round(this.formattedItems(data));
          gauge.set(this.power); // set actual value
          this.power2 = this.formattedItems2(data).toFixed(3);
          gauge2.set(this.power2); // set actual value
        });
        //console.log(this.items);
    }, 
   
	
    formattedItems(data) {
		  var body = data['body'];
      var formattedStr = body["data"][0]["tuples"][0][1];

        
      //var body = data['body'];
	  
	  	return formattedStr; 	
    },

    formattedItems2(data) {
      var keyName = "timestampGas";
      var body = data['body'];
      var timestampGas = body["data"][1]["tuples"][0][0];
      var timestampAct = body["data"][0]["tuples"][0][0];
      var timestampDiff = 0;

      
      
      if(!$cookies.isKey(keyName))
      {
        var timestamp = { timestamp:timestampGas, diff:timestampDiff };
        $cookies.set(keyName, timestamp);
      }
      else
      {
          var timestampGasOld = $cookies.get(keyName).timestamp;
          var timestampDiffOld = $cookies.get(keyName).diff;
          if(timestampGas != timestampGasOld)
          {
            console.log("Aktualisierung");
            console.log("timestampDiff2 = " + timestampDiff);
            timestampDiff = timestampGas - timestampGasOld;
            console.log("timestampDiff3 = " + timestampDiff);
            var timestamp = { timestamp:timestampGas, diff:timestampDiff };
            $cookies.set(keyName, timestamp);
          }
          else
            if(timestampAct - timestampGasOld > timestampDiffOld)
            {
              console.log("Zeitdifferenz wächst");
              timestampDiff = timestampAct - timestampGasOld;
              console.log("timestampDiff1 = " + timestampDiff);
              //return timestampAct - timestampGasOld;
            }
            else
              timestampDiff = timestampDiffOld;



          console.log($cookies.get(keyName));
          console.log("Protokoll: timestampAct=" + timestampAct + " timestampGas=" + timestampGas + " timestampGasOld=" + timestampGasOld + " timestampDiffOld=" +timestampDiffOld + "  timestampDiff=" + timestampDiff);
      }
      
      //var body = data['body'];
  
      return 60*60/(timestampDiff)/0.1; 	
    }
    
  }
});



  var opts = {
    angle: 0, // The span of the gauge arc
    lineWidth: 0.44, // The line thickness
    radiusScale: 1, // Relative radius
    pointer: {
      length: 0.6, // // Relative to gauge radius
      strokeWidth: 0.035, // The thickness
      color: '#000000' // Fill color
    },
    limitMax: true,     // If false, max value increases automatically if value > maxValue
    limitMin: false,     // If true, the min value of the gauge will be fixed
    colorStart: '#6FADCF',   // Colors
    colorStop: '#8FC0DA',    // just experiment with them
    strokeColor: '#E0E0E0',  // to see which ones work best for you
    generateGradient: true,
    highDpiSupport: true,     // High resolution support
    staticLabels: {
      font: "10px sans-serif",  // Specifies font
      labels: [0, 100, 200, 300, 600, 900, 1200, 1500],  // Print labels at these values
      color: "#000000",  // Optional: Label text color
      fractionDigits: 0  // Optional: Numerical precision. 0=round off.
    },
    staticZones: [
     {strokeStyle: "#30B32D", min: 0, max: 300}, // Green
     {strokeStyle: "#FFDD00", min: 300, max: 600}, // Yellow
     {strokeStyle: "#F03E3E", min: 600, max: 1500}  // Red
    ],
    renderTicks: {
            divisions: 5,
            divWidth: 1.1,
            divLength: 0.7,
            divColor: '#000000',
            subDivisions: 3,
            subLength: 0.5,
            subWidth: 0.6,
            subColor: 666666
          }
  };
  var target = document.getElementById('canvas-preview'); // your canvas element
  var gauge = new Gauge(target).setOptions(opts); // create sexy gauge!
  gauge.animationSpeed = 32; 
  gauge.maxValue = 1500; // set max gauge value
  gauge.setMinValue(0);  // Prefer setter over gauge.minValue = 0
  
  
  
  var opts2 = {
    angle: 0, // The span of the gauge arc
    lineWidth: 0.44, // The line thickness
    radiusScale: 1, // Relative radius
    pointer: {
      length: 0.6, // // Relative to gauge radius
      strokeWidth: 0.035, // The thickness
      color: '#000000' // Fill color
    },
    limitMax: true,     // If false, max value increases automatically if value > maxValue
    limitMin: false,     // If true, the min value of the gauge will be fixed
    colorStart: '#6FADCF',   // Colors
    colorStop: '#8FC0DA',    // just experiment with them
    strokeColor: '#E0E0E0',  // to see which ones work best for you
    generateGradient: true,
    highDpiSupport: true,     // High resolution support
    staticLabels: {
      font: "10px sans-serif",  // Specifies font
      labels: [1.0, 2.0],  // Print labels at these values
      color: "#000000",  // Optional: Label text color
      fractionDigits: 0  // Optional: Numerical precision. 0=round off.
    },
    staticZones: [
     {strokeStyle: "#30B32D", min: 0, max: 1}, // Green
     {strokeStyle: "#FFDD00", min: 1, max: 2}, // Yellow
     {strokeStyle: "#F03E3E", min: 2, max: 2.5}  // Red
    ],
    renderTicks: {
            divisions: 5,
            divWidth: 1.1,
            divLength: 0.7,
            divColor: '#000000',
            subDivisions: 3,
            subLength: 0.5,
            subWidth: 0.6,
            subColor: 666666
          }
  };
  var target2 = document.getElementById('canvas-preview2'); // your canvas element
  var gauge2 = new Gauge(target2).setOptions(opts2); // create sexy gauge!
  gauge2.animationSpeed = 32; 
  gauge2.maxValue = 2.5; // set max gauge value
  gauge2.setMinValue(0);  // Prefer setter over gauge.minValue = 0

