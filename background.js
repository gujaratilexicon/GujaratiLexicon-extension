function getDictionaryOption(){
	return $('#dict').text(); 
}

function setDictonayOption( option ){
	$('#dict').text(option);
}

function XmlHTTPRequest( URL, callback ){
	var xhr = new XMLHttpRequest();
	xhr.open("GET", URL, false);

	xhr.onreadystatechange = function() {

	if (xhr.readyState == 4 && xhr.status==200) {
		//document.getElementById("add").innerHTML = xhr.responseText;
		callback(xhr.responseText);
	}

	};

	xhr.send();

}

function composeURL( dictType, selectedWord ) {
	if( dictType === "0.0" ) {
		return "http://www.gujaratilexicon.com/dictionary/EG/" + selectedWord;
	}
	else if( dictType === "1.1" ) {
		return "http://www.gujaratilexicon.com/dictionary/GG/" + selectedWord;
	}
	else if( dictType === "1.2" ) {
		return "http://www.gujaratilexicon.com/dictionary/GE/" + selectedWord;
	}
	else if(dictType === "2.0") {
		return "http://www.gujaratilexicon.com/dictionary/HG/" + selectedWord;
	}
}

function sendTranslation( responsehandler, selectedWord, exactWordInWebPage, pronunciation,  finalTranslation ) {
	if(finalTranslation !== "") {
		if(selectedWord.toLowerCase() === exactWordInWebPage.split(' ').join('')) {
			responsehandler({ TW: finalTranslation,
							  PRONUNCIATION : pronunciation });
		}
		else {
			responsehandler({TW: "No Exact Match Found.!!"}); 
		}
	}
	else {
		responsehandler({TW: "Not Found.!!"});
	}
}

chrome.extension.onMessage.addListener(
	function( request, sender, sendResponse ) {
	if(request.getDictOpt) {
		sendResponse({ curDictOpt: getDictionaryOption() });
	}
	else if( request.setDictOpt ) {
		setDictonayOption(request.setDictOpt);
		sendResponse({Not: "null"});
	}

	if(request.SW) {
	var tempDictAndWord = request.SW;
	// var dictionaryType =  parseInt(tempDictAndWord[0]);

	//if(dictionaryType === 1)
	{
		var tempSelectedWord = tempDictAndWord.substr(3, tempDictAndWord.length);
		dictionaryType = tempDictAndWord.substr(0 , 3);
	}

	var URL = composeURL(dictionaryType, tempSelectedWord);

	XmlHTTPRequest(URL, function(tempWebpage) {
		document.getElementById('ab').innerHTML =  tempWebpage;
		var selectAllMetaTag = $('#ab meta');
		var exactWordInWebpage = $('#ab #details .rc_border .wordbox h1').text();
		var pronunciation = $( $('#details .rc_border table tbody td')[2] ).text();
		var finalTranslation = selectAllMetaTag[1]["content"];

		sendTranslation( sendResponse , tempSelectedWord , exactWordInWebpage , pronunciation, finalTranslation );
		});

	}

});
