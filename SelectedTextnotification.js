var GujaratiLexicon = {

	selectedWord:'',
	curDictOpt:'',
	mousePosX:'',
	mousePosY:'',
	curDictType:[{"0" : "Eng-Guj" },
				 {"1" : "Guj-Guj" },
				 {"2" : "Hin-Guj" }
	],

	
	init:function(){

		//Intiliaze Event Handler
		if(document)
		{
			document.onkeydown = GujaratiLexicon.handelKeyPress;
			document.body.addEventListener('dblclick',GujaratiLexicon.selectedWordNotification,false);
			document.body.addEventListener('click', GujaratiLexicon.removeDictBubble,false);
			//document.body.onclick = removeDictBubble;

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

		if($('#GujaratiLexicon').length == 0)
		{
			GujaratiLexicon.mousePosX = event.pageX;
			GujaratiLexicon.mousePosY = event.pageY;
		}
		

		if(tempLang !== false)
		{
			GujaratiLexicon.curDictType = GujaratiLexicon.dictionarySelection(tempLang);
			GujaratiLexicon.renderBubble( GujaratiLexicon.mousePosX , GujaratiLexicon.mousePosY , GujaratiLexicon.selectedWord, "Searching . . ." );
			GujaratiLexicon.getDictTranslation();
		}

	},

	handelKeyPress:function(event){

		if(event.keyCode == 27)
		{
	 		GujaratiLexicon.removeDictBubble();	
		}

	},

	removeDictBubble:function(){

		if($('#GujaratiLexicon'))
		{
			$('#GujaratiLexicon').remove();
		}

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

	getDictTranslation : function( ){
		chrome.extension.sendMessage({SW: GujaratiLexicon.curDictType + GujaratiLexicon.selectedWord }, function(response) {
			
			GujaratiLexicon.renderBubble( GujaratiLexicon.mousePosX , GujaratiLexicon.mousePosY , GujaratiLexicon.selectedWord , response.TW );

	});

	},

	renderBubble : function (mouseX, mouseY, word, meaning){
		
		GujaratiLexicon.removeDictBubble();
		divContainer=document.createElement('div');
	
		$('html').append(divContainer);		
		divContainer.id = 'GujaratiLexicon';
		divContainer.className = 'arrow_box';
		divContainer.style.top = mouseY + 10+ 'px';
		divContainer.style.left = mouseX - 140 + 'px'; 
		
		divGLXBubbleSelectedWord = document.createElement('div');
		divGLXBubbleSelectedWord.id = 'GLXBubbleSelectedWord';
		divGLXBubbleSelectedWord.innerHTML = word;
		divGLXBubbleSelectedWord.className = 'selectedWord';
		$('#GujaratiLexicon').append(divGLXBubbleSelectedWord);

		divGLXBubbleTranslatedWord = document.createElement('div');
		divGLXBubbleTranslatedWord.id = 'GLXBubbleTranslatedWord';
  		divGLXBubbleTranslatedWord.innerHTML =  meaning;
		divGLXBubbleTranslatedWord.className = 'traslatedWord';
		$('#GujaratiLexicon').append(divGLXBubbleTranslatedWord);

		divGLXHyperLink = document.createElement('div');
		divGLXHyperLink.id = 'GLXHyperLink';
		$('#GujaratiLexicon').append(divGLXHyperLink);
		divGLXHyperLink.className = 'gujaratiLexiconLink';
		divGLXHyperLink.innerHTML = "<a target=\"_blank\" href=\"http://www.gujaratilexicon.com/\">" +  "Powered By:" + "    GujaratiLexicon  " + "</a>";
		
		$('html #GujaratiLexicon').bind('click' , GujaratiLexicon.selectedWordNotification);
	
}

};



GujaratiLexicon.init();