var GujaratiLexicon = {

	selectedWord:'',
	curDictOpt:'',
	mousePosX:'',
	mousePosY:'',
	
	init:function(){

		//Intiliaze Event Handler
		if(document)
		{
			document.onkeydown = GujaratiLexicon.handelKeyPress;
			document.body.onclick = GujaratiLexicon.removeDictBubble;
			document.body.addEventListener('dblclick',GujaratiLexicon.selectedWordNotification,false);

			GujaratiLexicon.getCurDictOpt();
		}	

	},

	getCurDictOpt : function(){ /*Get Current Dictionary Option and Set it to Global Dictionary Variable (curDictOpt)*/
		chrome.extension.sendMessage({getDictOpt: true}, function(response) {
		GujaratiLexicon.curDictOpt = response.curDictOpt;
		//console.log( this.curDictOpt );
		});
		
	},

	selectedWordNotification: function(event){

		GujaratiLexicon.selectedWord = window.getSelection().toString().trim();
		var tempLang = GujaratiLexicon.wordLangIndentification(GujaratiLexicon.selectedWord); /*Indentify Word Language*/

		GujaratiLexicon.mousePosX = event.pageX;
		GujaratiLexicon.mousePosY = event.pageY;

		if(tempLang !== false)
		{
			GujaratiLexicon.renderBubble( event.pageX , event.pageY , GujaratiLexicon.selectedWord, "Searching . . ." );
			GujaratiLexicon.getDictTranslation( GujaratiLexicon.dictionarySelection(tempLang) );
		}

	},

	handelKeyPress:function(event){

		if(event.keyCode == 27)
		{
	 		GujaratiLexicon.removeDictBubble();	
		}

	},

	removeDictBubble:function(){

	},

	wordLangIndentification : function( tempWord ){

		if(tempWord === "")
		{
			return false;
		}

		if(/^[a-zA-Z]*$/.test(tempWord)) //test for English Language
		{
			return 0; 
		}
		else if( /^[\u0A80-\u0AFF]*$/.test(tempWord) ) //test for Gujarati Language
		{
			return 1;
		}
		else if( /^[\u0900-\u097F]*$/.test(tempWord) ) //test for Hindi Language
		{
			return 2;
		}
		else
		{
			return false;
		}

	},

	dictionarySelection : function( language ){

		if(language === 1)
		{
			return GujaratiLexicon.curDictOpt;
		}
		else 
		{
			return language + ".0";
		}
	},

	getDictTranslation : function( dicttype ){
		chrome.extension.sendMessage({SW: dicttype + GujaratiLexicon.selectedWord }, function(response) {
			renderBubble( GujaratiLexicon.mousePosX , GujaratiLexicon.mousePosY , GujaratiLexicon.selectedWord , response.TW );

	});

	},

	renderBubble : function (mouseX, mouseY, word, meaning){
	
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

};



GujaratiLexicon.init();