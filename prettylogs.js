/*
 * console.log
 */

 !function (w, undefined) {

 	"use strict";

 	// Backend
 	
 	var _,
 		Public = _ = w.PrettyLogs = {},
 		doc = w.document,

 		nativeConsoleLog = w.console.log,

 		history = [],

 		// Bools
 		store = true,
 		isReady = false,
 		onDocumentReady = [],

 		outputMode = false,

 	// Settings
 		settings = {
 			position: "top"
 		},
 	
 	// Frontend

 		context = {
 			boxHeight: 0,
 			windowHeight: w.innerHeight,

 			update: function () {
 				this.windowHeight = w.innerHeight;
 				var resp = this.windowHeight * 0.15;
 				this.boxHeight = resp > 50 ? 50 : resp;
 			}
 		},
 		style = null,
 		logViewStyle = null,
 		hidden = true,
 		timerId = null,
 		// DOM El
 		logBox = null,
 		logView = null;
 	/*
 		HTML =  '<div id="$ID">'
 				+	''
 			+	'</div>';
	*/

 	Public.history = history;

 	Public.setOutputMode = function (mode) {

 		if (mode === null || mode === 'none') {
 			return outputMode = null;
 		}

 		w.console.log = _.log;
 		context.update();
 		return outputMode = mode;

 	}

 	Public.log = function (msg) {

 		if (store) {
 			history.push(msg);
 		}

 		if(outputMode === null) {
 			return undefined;
 		}

 		console.debug(msg);

 		if(outputMode) {
 			_.push(msg);
 		}
 
 	}

 	Public.push = function (msg) {

 		if (hidden) {
 			style.opacity = "0.8";
 			setTimeout(function () {
 				style.opacity = "0";
 				hidden = true;
 			}, 4000);
 		}

 		add(msg);

 	}

 	Public.init = function () {

	 	// Init
	 	context.update();

	 	//HTML.replace('$ID', generateNamespace());
	 	logBox = doc.createElement('div');
	 	//logBox.id = generateNamespace();
	 	
	 	style = logBox.style;

	 	style.opacity = "0";
	 	style.position = "fixed";
	 	style.boxSizing = style.webkitBoxSizing = "border-box";
	 	style.bottom = 0;
	 	style.left = 0;
	 	style.overflow = "hidden";
	 	style.width = "100%";
	 	style.height = context.boxHeight;
	 	style.zIndex = "9999";
	 	style.backgroundColor = "black";
	 	style.webkitTransition = "opacity 1s";
	 	style.fontSize = "14px";
	 	style.color = "white";

	 	logView = doc.createElement('div');
	 	logViewStyle = logView.style;

	 	logViewStyle.position = "absolute";
	 	logViewStyle.bottom = "0";

	 	logBox.appendChild(logView);
	 	doc.body.appendChild(logBox);

	 	outputMode = "pretty";
 	}

 	var add = function (msg) {
 		var msgDiv = doc.createElement('div');
 		msgDiv.textContent = msg;

 		logView.appendChild(msgDiv);
 	}

 	var generateNamespace = function ()
	{
		var namespace = "",
	    	char;
	    
	    while (namespace.length < 16) 
	    {                
	        char = Math.floor((Math.random()*42)+48);
	        
	        if (char > 64 || char < 58)
	        {
	            namespace+=String.fromCharCode(char);    
	        }                
	    }
	
	    return "pretty" + namespace;
	}

	var $ = function (fn) {
 		if (isReady) {
 			console.log("Doc is ready");
 			fn();
 		} else {
 			onDocumentReady.push(fn);
 		}
 	}

 	var documentReady = function () {
 		console.log("document state changed");
 		if (doc.readyState == "complete") {
 			onDocumentReady.forEach(function (fn) {
 				fn();
 			})

 			return true;
 		}

 		return false;
 	}

 	w.console.log = _.log;
 	$(_.init);

 	if (!documentReady()) {
 		doc.addEventListener("readystatechange", documentReady, false);
 	}


 }(window);