//ACE
var aceAnswers;
var acePreviousScore;
const aceTableWidths = '60%';

function createACE(){
	$('tr').has('div[id=ace]').eq(0).next().after('<div id=\'aceTest\'><div id=\'aceContainer\'></div><br><img src=\'/images/spacer.gif\' height=\'15\' width=\'1\'></div>');

	$('div[id=aceContainer]').html('<b>ACE</b><br><br><i>While the client was growing up, during their first 18 years of life:</i></td></tr>' + '<table border=\'0\' cellspacing=\'10px\' table-layout=\'fixed\' width=\'' + aceTableWidths + '\'>' +
		'<tr><td><label for=aceQ1 class=\'aceLabels\'><b>Did a parent or other adult in the household often: swear at, insult, put down, or humiliate them; or act in a way that made them afraid that they might be physically hurt?</b></label></td><td><select id=\'aceQ1\' class=\'aceQuestions\'><option value=\'\' selected disabled hidden>Select an Option</option><option value=\'Yes\'>Yes</option><option value=\'No\'>No</option></select></td></tr>' +
		'<tr><td><label for=aceQ2 class=\'aceLabels\'><b>Did a parent or other adult in the household often: push, grab, slap, throw something at them; or ever hit them so hard that they had marks or were injured?</b></label></td><td><select id=\'aceQ2\' class=\'aceQuestions\'><option value=\'\' selected disabled hidden>Select an Option</option><option value=\'Yes\'>Yes</option><option value=\'No\'>No</option></select></td></tr>' +
		'<tr><td><label for=aceQ3 class=\'aceLabels\'><b>Did an adult or person at least 5 years older than them ever: touch or fondle them or had them touch their body in a sexual way; or try to or actually had oral, anal, or vaginal sex with them?</b></label></td><td><select id=\'aceQ3\' class=\'aceQuestions\'><option value=\'\' selected disabled hidden>Select an Option</option><option value=\'Yes\'>Yes</option><option value=\'No\'>No</option></select></td></tr>' +
		'<tr><td><label for=aceQ4 class=\'aceLabels\'><b>Did they often feel that: no one in their family loved them or thought they were important or special; or their family didn\'t look out for each other, feel close to each other, or support each other?</b></label></td><td><select id=\'aceQ4\' class=\'aceQuestions\'><option value=\'\' selected disabled hidden>Select an Option</option><option value=\'Yes\'>Yes</option><option value=\'No\'>No</option></select></td></tr>' +
		'<tr><td><label for=aceQ5 class=\'aceLabels\'><b>Did they often feel that: they didn\'t have enough to eat, had to wear dirty clothes, and had no one to protect them; or their parents were too drunk or high to take care of them or take them to the doctor if they needed it?</b></label></td><td><select id=\'aceQ5\' class=\'aceQuestions\'><option value=\'\' selected disabled hidden>Select an Option</option><option value=\'Yes\'>Yes</option><option value=\'No\'>No</option></select></td></tr>' +
		'<tr><td><label for=aceQ6 class=\'aceLabels\'><b>Were their parents ever separated or divorced?</b></label></td><td><select id=\'aceQ6\' class=\'aceQuestions\'><option value=\'\' selected disabled hidden>Select an Option</option><option value=\'Yes\'>Yes</option><option value=\'No\'>No</option></select></td></tr>' +
		'<tr><td><label for=aceQ7 class=\'aceLabels\'><b>Was their mother or stepmother: often pushed, grabbed, slapped, or had something thrown at her; or sometimes, often, or very often kicked, bitten, hit with a fist, or hit with something hard; or ever repeatedly hit over at least a few minutes; or threatened with a gun or knife?</b></label></td><td><select id=\'aceQ7\' class=\'aceQuestions\'><option value=\'\' selected disabled hidden>Select an Option</option><option value=\'Yes\'>Yes</option><option value=\'No\'>No</option></select></td></tr>' +
		'<tr><td><label for=aceQ8 class=\'aceLabels\'><b>Did they live with anyone who was a problem drinker or alcoholic of who used street drugs?</b></label></td><td><select id=\'aceQ8\' class=\'aceQuestions\'><option value=\'\' selected disabled hidden>Select an Option</option><option value=\'Yes\'>Yes</option><option value=\'No\'>No</option></select></td></tr>' +
		'<tr><td><label for=aceQ9 class=\'aceLabels\'><b>Was a household member depressed or mentally ill or did a household member attempt suicide?</b></label></td><td><select id=\'aceQ9\' class=\'aceQuestions\'><option value=\'\' selected disabled hidden>Select an Option</option><option value=\'Yes\'>Yes</option><option value=\'No\'>No</option></select></td></tr>' +
		'<tr><td><label for=aceQ10 class=\'aceLabels\'><b>Did a household member go to prison?</b></label></td><td><select id=\'aceQ10\' class=\'aceQuestions\'><option value=\'\' selected disabled hidden>Select an Option</option><option value=\'Yes\'>Yes</option><option value=\'No\'>No</option></select></td></tr>' +		
		'</table>');
}

function checkACEPreviousScore(){
	if($('tr').has('div[id=acePrevious]').find('input')?.val() != ''){
		//acePreviousScore = $('tr').has('div[id=acePrevious]').find('b')[0]?.innerHTML;
		acePreviousScore = $($.parseHTML($('tr').has('div[id=acePrevious]').find('input').val())).text();
		//acePreviousScore = $('tr').has('div[id=acePrevious]').find('font').text();
		//$('tr').has('answer[id=acePerform]').eq(2).hide();
	}
	if(!$.isNumeric(acePreviousScore)){
		//$('tr').has('div[id=acePrevious]').find('div').eq(1).text('9001');
		//acePreviousScore = 9001;
	}
}

function checkACEPerform(){
	if($('answer[id=acePerform]').parent().prev().find('input').prop('checked')){
		$('div[id=aceTest]').show();
		$('.aceQuestions').attr('required', true);
		if(!$('div[id=aceTest]').find('div[class=requiredAsterisk]').length){
			$('div[id=aceTest]').find('label[class=aceLabels]').find('b').after('<div class=\'requiredAsterisk\' style=\'color:red;display:inline\'>*</div>');
		}
		$('tr').has('div[id=aceScore]').find('input').prop('readonly', true);
		hideShow('show', 'aceScore', true);
		hideShow('hide', 'acePrevious', true);
	}
	else{
		$('div[id=aceTest]').hide();
		$('.aceQuestions').attr('required', false);
		$('div[id=aceTest]').find('div[class=requiredAsterisk]').remove();
		$('tr').has('div[id=aceScore]').find('input').prop('readonly', false);
		hideShow('hide', 'aceScore', true);
		hideShow('show', 'acePrevious', false);
	}
}

function calculateACE(){
	var scoreTotal = 0;
	aceAnswers = '';

	$('.aceQuestions').each(function(){
		console.log($(this).val());
		if($(this).val() != '' && $(this).val() != 'Did Not Answer'){
			if($(this).val() == 'Yes'){
				scoreTotal++;
			}

			aceAnswers = aceAnswers + $(this).val() + ',';
		}
		else{
			aceAnswers = aceAnswers + 'N/A' + ',';
		}
	})

	aceAnswers = aceAnswers.substring(0, aceAnswers.length - 1);
	$('tr').has('div[id=aceScore]').find('input').val(scoreTotal);
	saveACE();
}

function saveACE(){
	if(!aceAnswers.includes('null')){
		$('tr').has('div[id=aceAnswers]').find('input').val(aceAnswers);
	}
}

function loadACE(){
	var aceAnswersArray;
	var count = 0;

	if($('tr').has('div[id=aceAnswers]').find('input').val() != ''){
		aceAnswers = $('tr').has('div[id=aceAnswers]').find('input').val();
		if(!$('tr').has('div[id=aceAnswers]').find('input').val().includes('null')){
			aceAnswersArray = aceAnswers.split(',');
			
			$('.aceQuestions').each(function(){
				$(this).val(aceAnswersArray [count]);
				count++;
			});
		}	
	}
}

$('document').ready(function(){
	loadACE();
	checkACEPreviousScore();
	createACE();
	checkACEPerform();
	setTimeout(loadACE, 500);
	setTimeout(checkACEPreviousScore, 500);
	setTimeout(checkACEPerform, 500);
	setTimeout(calculateACE, 500);

	$('tr').has('div[id=ace]').find('input').change(checkACEPerform);
	$('.aceQuestions').change(calculateACE);
	$('.aceQuestions').click(calculateACE);
});

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

function hideShow(hideShow, target, setRequired = true){ 
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
}