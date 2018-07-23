    	// 用来保存所有的属性名称和值 
		    	var props = "" ; 
		    	// 开始遍历 
		    	for ( var p in a ){ 
		    	// 方法 
		    	if ( typeof ( a [ p ]) == " function " ){ 
		    	a [ p ]() ; 
		    	} else { 
		    	// p 为属性名称，obj[p]为对应属性的值 
		    	props += p + " = " + a [ p ] + " \t " ; 
		    	} 
		    	} 
		    	// 最后显示所有的属性 
		    	alert ( props ) ; 