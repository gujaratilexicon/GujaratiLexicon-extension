function getDictionaryOption(){
	return $('#dict').text(); 
}

function setDictonayOption(option){
	$('#dict').text(option);
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

    




  });
