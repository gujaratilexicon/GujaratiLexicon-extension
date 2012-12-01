var GujaratiLexicon = {

	init:function(){

		//Intiliaze Event Handler
		document.onkeydown = handelKeyPress;
		document.body.onclick = removeDictionary;
		document.body.addEventListener('dblclick',this.selectWord,false);

	}




};

GujaratiLexicon.init();
