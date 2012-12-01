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
		
	},

	handelKeyPress:function(event){

		if(event.keyCode == 27)
		{
	 		this.removeDictBubble();	
		}

	},
	
	removeDictBubble:function(){

	}

};



GujaratiLexicon.init();
