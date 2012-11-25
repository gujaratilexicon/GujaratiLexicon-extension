

function getDictionaryOption(){
	return $('#dict').text(); 
}

function setDictonayOption(option){
	$('#dict').text(option);
}

function XmlHTTPRequest(URL, callback){

    var xhr = new XMLHttpRequest();
    xhr.open("GET", URL, false);

    xhr.onreadystatechange = function() {
    
    
     if (xhr.readyState == 4 && xhr.status==200) {
      //document.getElementById("add").innerHTML =  xhr.responseText;
        
        callback(xhr.responseText); 
        
   
      } 

     
  }
    
    
xhr.send();   

    
}

function composeURL( dictType, selectedWord ){

  if(dictType === 0)
  {
    return "http://www.gujaratilexicon.com/dictionary/EG/" + selectedWord;
  }
  else if(dictType === 1)
  {
    return "http://www.gujaratilexicon.com/dictionary/GG/" + selectedWord;
  }
  else if(dictType === 2)
  {
    return "http://www.gujaratilexicon.com/dictionary/GE/" + selectedWord;
  }
  else if(dictType === 3)
  {
    return "http://www.gujaratilexicon.com/dictionary/HG/" + selectedWord;
  }

}

chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse) {

  	if(request.getDictOpt)
  	{
  		sendResponse({ curDictOpt: getDictionaryOption() });
  	}
  	else if(request.setDictOpt)
  	{
  		setDictonayOption(request.setDictOpt);
      sendResponse({});
  	}

    if(request.SW)
    {
      var tempDictAndWord = request.SW;
      var dictionaryType = tempDictAndWord[0];
      var tempSelectedWord = tempDictAndWord.substr(1 , tempDictAndWord.length);

      var URL = composeURL(dictionaryType , tempSelectedWord);



    }





  });
