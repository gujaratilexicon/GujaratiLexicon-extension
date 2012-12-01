var GujaratiLexicon = {

	selectedWord:'',

	init:function(){

		//Intiliaze Event Handler
		document.onkeydown = this.handelKeyPress;
		document.body.onclick = this.removeDictBubble;
		document.body.addEventListener('dblclick',this.selectedWordNotification,false);

	},

	selectedWordNotification: function(){
		this.selectedWord = window.getSelection().toString().trim();
		this.wordLangIndentification(this.selectedWord);
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

	}

};



GujaratiLexicon.init();
