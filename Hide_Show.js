function requireHidden (condition, target) { 
	$('tr').find('div[class*=' + target + ']').next().remove(); 
	$('tr').find('div[id=' + target + ']').next().remove();  
	if(condition) { 
		$('tr').has('div[class*=' + target + ']').find('input').prop('required', true); 
		$('tr').has('div[class*=' + target + ']').find('select').prop('required', true); 
		$('tr').find('div[class*=' + target + ']').after('<div class=\'redAsterisk\' style=\'color : red; display : inline\'>*</div>');
		$('tr').has('div[id=' + target + ']').find('input').prop('required', true); 
		$('tr').has('div[id=' + target + ']').find('select').prop('required', true); 
		$('tr').find('div[id=' + target + ']').after('<div class=\'redAsterisk\' style=\'color : red; display : inline\'>*</div>');  
	} 
	else { 
		$('tr').has('div[class*=' + target + ']').find('input').prop('required', false); 
		$('tr').has('div[class*=' + target + ']').find('select').prop('required', false); 
		$('tr').has('div[id=' + target + ']').find('input').prop('required', false); 
		$('tr').has('div[id=' + target + ']').find('select').prop('required', false);
	} 
}  

function requireHiddenNotes (condition, target) { 
	if(condition) { 
		$('tr').has('div[class*=' + target + ']').next().find('textarea').prop('required', true); 
		$('tr').has('div[id=' + target + ']').next().find('textarea').prop('required', true); 
	} 
	else { 
		$('tr').has('div[class*=' + target + ']').next().find('textarea').prop('required', false); 
		$('tr').has('div[id=' + target + ']').next().find('textarea').prop('required', false); 
	} 
}  

/* function hideShow(hideShow, target, setRequired = true){ 
	if(hideShow == 'show'){ 
		$('td').has('div[class=' + target + ']').show(); 
		$('td').has('div[class=' + target + ']').next().show(); 
		$('tr').has('div[class=' + target + ']').next().show(); 
		$('tr').has('div[class=' + target + ']').next().find('div').show(); 
		$('td').has('div[id=' + target + ']').show(); 
		$('td').has('div[id=' + target + ']').next().show(); 
		$('tr').has('div[id=' + target + ']').next().show();
		$('tr').has('div[id=' + target + ']').next().find('div').show();
		$('td').has('div[hide=' + target + ']').show(); 
		$('td').has('div[hide=' + target + ']').next().show(); 
		$('tr').has('div[hide=' + target + ']').next().show();
		$('tr').has('div[hide=' + target + ']').next().find('div').show(); 		
		if(setRequired == true){
			requireHidden(true, target); 
		}
	} 
	else if(hideShow == 'hide'){ 
		$('td').has('div[class=' + target + ']').hide(); 
		$('td').has('div[class=' + target + ']').next().hide();
		$('tr').has('div[class=' + target + ']').next().hide();
		$('tr').has('div[class=' + target + ']').next().find('div').hide();  
		$('td').has('div[id=' + target + ']').hide(); 
		$('td').has('div[id=' + target + ']').next().hide();
		$('tr').has('div[id=' + target + ']').next().hide();
		$('tr').has('div[id=' + target + ']').next().find('div').hide(); 
		$('td').has('div[hide=' + target + ']').hide();
		$('td').has('div[hide=' + target + ']').next().hide();	
		$('tr').has('div[hide=' + target + ']').next().hide();		
		$('tr').has('div[hide=' + target + ']').next().find('div').hide();
		if(setRequired == true){
			requireHidden(false, target); 
		}
	}  
} */

function hideShow(hideShow, target, setRequired = true){ 
	if(hideShow == 'show'){ 
        $('td').has('div[class=' + target + ']').show(); 
		$('tr').has('div[class=' + target + ']').show(); 
		$('tr').has('div[class=' + target + ']').next().show(); 
        $('td').has('div[id=' + target + ']').show();
		$('tr').has('div[id=' + target + ']').show(); 
		$('tr').has('div[id=' + target + ']').next().show(); 
        $('td').has('div[hide=' + target + ']').show();
		$('tr').has('div[hide=' + target + ']').show(); 
		$('tr').has('div[hide=' + target + ']').next().show(); 	
		if(setRequired == true){
			requireHidden(true, target); 
		}
	} 
	else if(hideShow == 'hide'){ 
        $('td').has('div[class=' + target + ']').hide(); 
		$('tr').has('div[class=' + target + ']').hide(); 
		$('tr').has('div[class=' + target + ']').next().hide();
        $('td').has('div[id=' + target + ']').hide(); 
		$('tr').has('div[id=' + target + ']').hide(); 
		$('tr').has('div[id=' + target + ']').next().hide();
        $('td').has('div[hide=' + target + ']').hide(); 
		$('tr').has('div[hide=' + target + ']').hide();
		$('tr').has('div[hide=' + target + ']').next().hide();	
		if(setRequired == true){
			requireHidden(false, target); 
		}
	}  
}