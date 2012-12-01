

var divContainer;
var tempWord;
var dictOption ;

var selectWord = function(e){


var word = window.getSelection().toString().trim();

if( word == ""  )
{
	
	
	return;
}

if ( tempWord !== undefined)
{
	if (tempWord.slice(1,tempWord.length) === word)
	{
		return;
	}

}

tempWord = word;

var testEnglish = /^[a-zA-Z]*$/.test(tempWord);
//console.log(testHindi);

if( testEnglish )
{
	
	tempWord = '0' + tempWord;	
	
}
else if( /^[\u0A80-\u0AFF]*$/.test(tempWord) )
{
	tempWord = dictOption + tempWord ;
	
}
else if( /^[\u0900-\u097F]*$/.test(tempWord) )
{
	tempWord = '3' + tempWord ;
}
else
{
	return;
}

//renderBubble(e.pageX,e.pageY, word, "Searching . . .");

	if($('#GujaratiLexicon').length !== 0)
	{
			$('#GLXBubbleQuery').text(word);
			$('#GLXBubbleMeaning').text("Searching . . .");
			
			if(!testEnglish)
			{
				tempWord = dictOption + word;
			}
	}
	else
	{
		renderBubble(e.pageX,e.pageY, word,"Searching . . ." );
	}



chrome.extension.sendMessage({SW: tempWord}, function(response) {


if($('#GujaratiLexicon') )
{
	$('#GLXBubbleMeaning').text(response.TW );
	//$('#GujaratiLexicon').bind(selectWord);
	$("html #GujaratiLexicon").bind("click",selectWord);
	//document.html.addEventListener('dblclick',selectWord,false);
}
else
{
	
}



})};



function handleDivClick(e)
{
	e.stopPropagation();
}

function handelKeyPress(e)
{
	if(e.keyCode == 27)
	{
	 removeDictionary();
	
	}
}

function removeDictionary()
{
	
	var tooltip = $("#GujaratiLexicon");
	tempWord = "";
	if(tooltip != null)
	{
	
	$("#GujaratiLexicon").remove();
	document.body.addEventListener('dblclick',selectWord,true);
	
	}
}



function renderBubble(mouseX, mouseY, word, meaning) {
	
	
	if($('#GujaratiLexicon'))
	{ 
	 // $('#GujaratiLexicon').remove();
	}
	
	var docWidth = document.width;
	

	//$("div[id^='GujaratiLexicon']").css({'position':'absolute'});
	
	divContainer=document.createElement('div');
	$('html').append(divContainer);	
	divContainer.id = 'GujaratiLexicon';
	
		
	divGLXBubbleMain = document.createElement('div');
	divGLXBubbleMain.id = 'GLXBubbleMain';
	divGLXBubbleMain.className = 'bubble-main ';
	

	$('#GujaratiLexicon').append(divGLXBubbleMain);

	divGLXDictOption = document.createElement('div');
	divGLXDictOption.id = 'GLXDictOption';
	divGLXDictOption.className = 'dict-opt';
	//divGLXDictOption.innerHTML = "GUJ-GUJ";
	$('#GLXBubbleMain').append(divGLXDictOption);
	$('#GLXDictOption').html('<span>GUJ-GUJ</span><span>GUJ-ENG</span>');

	$("#GLXDictOption span:first").bind("click",setGujGuj);
	$("#GLXDictOption span:last").bind("click",setGujEng);

	if(dictOption === "1")
	{
		$("#GLXDictOption span:first").css({'color' : 'black'});
	}
	else
	{
		$("#GLXDictOption span:last").css({'color' : 'black'});
	}

	$("#GLXDictOption span:first").css({'padding-right':'12px'});
	
	divGLXBubbleClose = document.createElement('div');
	divGLXBubbleClose.id = 'GLXBubbleClose';
	divGLXBubbleClose.className = 'bubble-close';
	divGLXBubbleClose.innerHTML =  'X';
	$('#GLXBubbleMain').append(divGLXBubbleClose);
	$("#GLXBubbleClose").bind("click",removeDictionary);
		
  
	divGLXBubbleQuery = document.createElement('div');
	divGLXBubbleQuery.id = 'GLXBubbleQuery';
	
	divGLXBubbleQuery.innerHTML = word;
	divGLXBubbleQuery.style.fontWeight = "bold";
	divGLXBubbleQuery.style.fontSize = "15px";
	divGLXBubbleQuery.className = 'query';

	/*text-transform: uppercase;
	text-shadow: 0 1px 2px rgba(0, 0, 0, 0.4);
	font-weight: normal;*/

	$("#GLXBubbleQuery").css({'color' : 'black', 'text-transform': 'uppercase',	'font-weight': 'bold', 'text-shadow': '0 1px 2px rgba(0, 0, 0, 0.4)','text-transform': 'uppercase'});

	
	$('#GLXBubbleMain').append(divGLXBubbleQuery);
		
	divGLXBubbleMeaning = document.createElement('div');
	divGLXBubbleMeaning.id = 'GLXBubbleMeaning';
  	divGLXBubbleMeaning.innerHTML =  meaning;
	divGLXBubbleMeaning.className = 'meaning-color';
	$('#GLXBubbleMain').append(divGLXBubbleMeaning);

	$("#GLXBubbleMeaning").css({'color' : 'black'});
	
	divGLXarrowContainer = document.createElement('div');
	divGLXarrowContainer.id = 'GLXarrowContainer';
	$('#GujaratiLexicon').append(divGLXarrowContainer);
	
	divGLXarrowMain = document.createElement('div');
	divGLXarrowMain.id = 'GLXarrowMain';
	
	
	$('#GLXarrowContainer').append(divGLXarrowMain);
	
	divGLXBubblearrowInnerUp = document.createElement('div');
	divGLXBubblearrowInnerUp.id = 'GLXBubblearrowInnerUp';
	$('#GLXarrowContainer').append(divGLXBubblearrowInnerUp);
	divGLXBubblearrowInnerUp.className = 'up-arrow';
	
	
	
	if( mouseX - 130 <= 0)
	{	
		
		
		divGLXBubblearrowInnerUp.style.top = mouseY + 5 + 'px' ;
		divGLXBubblearrowInnerUp.style.left = mouseX  + 'px';
		divGLXBubblearrowInnerUp.style.visibility = 'visible';
		
		mouseX = 5;
	}
	else
	{
		mouseX = mouseX - 130;
		
		divGLXBubblearrowInnerUp.style.top = mouseY + 5 + 'px' ;
		divGLXBubblearrowInnerUp.style.left = mouseX + 122 + 'px';
		divGLXBubblearrowInnerUp.style.visibility = 'visible';
	}
	
	
	
	
	
	divGLXHyperLink = document.createElement('div');
	divGLXHyperLink.id = 'GLXHyperLink';
	$('#GLXBubbleMain').append(divGLXHyperLink);
	divGLXHyperLink.className = 'gujaratilexicon-link';
	divGLXHyperLink.innerHTML = "<a target=\"_blank\" href=\"http://www.gujaratilexicon.com/\">" +  "Powered By:" + "    GujaratiLexicon  " + "</a>";
	$('#GLXHyperLink a').css({'color':'#11C', 'font-size' : '10px' , 'text-shadow' : 'none' , 'text-decoration': 'none' , 'font-weight': 'normal'});
	
	
  
 // $('html').bind("click",removeDictionary);
  
  console.log("Docwidth:- " + docWidth );
  console.log("Mouse- " + (mouseX + 250 ));
  console.log($('#GLXBubbleMain').width());
  
  if ( (mouseX + 273) <= docWidth)
  {
	divGLXBubbleMain.style.top = mouseY + 15+ 'px';
	divGLXBubbleMain.style.left = mouseX + 'px'; 
	divGLXBubbleMain.style.visibility = 'visible'; 
  }
  else
  {
	divGLXBubbleMain.style.top = mouseY + 15+ 'px';
	var temp = mouseX - ( (mouseX + 273) - (docWidth));
	
	console.log(temp);
	divGLXBubbleMain.style.left = temp + 'px'; 
	divGLXBubbleMain.style.visibility = 'visible'; 
	
  }
  
  
  
}




function setGujGuj()
{

	
	$(this).css({'color' : 'black'});

	chrome.extension.sendMessage({setDictOpt : '1'}, function(response) {
	
});
	init();

	//$("#GLXDictOption span:first").bind("click",setGujGuj);
	$("#GLXDictOption span:last").css({'color' : '#DC7'});


}

function setGujEng()
{
	
	console.log("Gujarati to English");
	$(this).css({'color' : 'black'});

	chrome.extension.sendMessage({setDictOpt : '2'}, function(response) {
	
	});

	init();
	$("#GLXDictOption span:first").css({'color' : '#DC7'});
}



function init(){

chrome.extension.sendMessage({getDictOpt: true}, function(response) {
	dictOption = response.curDictOpt;
	console.log(dictOption);
	document.body.onclick = removeDictionary;
});

}

document.onkeydown = handelKeyPress;
document.body.onclick = removeDictionary;
document.body.addEventListener('dblclick',selectWord,false);

init();