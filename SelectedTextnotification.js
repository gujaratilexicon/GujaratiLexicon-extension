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
	
	
	
}

};



GujaratiLexicon.init();