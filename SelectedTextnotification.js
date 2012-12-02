var GujaratiLexicon = {

	selectedWord:'',
	curDictOpt:'',

	init:function(){

		//Intiliaze Event Handler
		if(document)
		{
			document.onkeydown = this.handelKeyPress;
			document.body.onclick = this.removeDictBubble;
			document.body.addEventListener('dblclick',this.selectedWordNotification,false);

			this.getCurDictOpt();
		}	

	},

	getCurDictOpt : function(){ //Get Current Dictionary Option and Set it to Global Dictionary Variable (curDictOpt)
		chrome.extension.sendMessage({getDictOpt: true}, function(response) {
		this.curDictOpt = response.curDictOpt;
		});
		}
	},

	selectedWordNotification: function(){

		this.selectedWord = window.getSelection().toString().trim();

		var tempLang = this.wordLangIndentification(this.selectedWord); //Indentify Word Language

		if(tempLang)
		{

		}
	},

	handelKeyPress:function(event){

		if(event.keyCode == 27)
		{
	 		this.removeDictBubble();	
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

		if(language === 0)
		{

		}
		else if(language === 1)
		{

		}
		else if(language === 2)
		{

		}
	}

};



GujaratiLexicon.init();