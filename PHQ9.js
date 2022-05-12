//PHQ9
const phq9TableWidths = '60%';
var phq9Score;

function createPHQ9(){
	$('tr').has('div[id=phq9]').eq(0).next().after('<div id=\'phq9Test\'><div id=\'phq9Container\'></div><br><img src=\'/images/spacer.gif\' height=\'15\' width=\'1\'></div>');

	$('div[id=phq9Container]').html('<b>PHQ9</b><br><br><i>Instructions: How often has client been bothered by each of the following symptoms during the past two weeks? For each symptom click the numeric push button the best describes how the client has been feeling.</i><br><br><i>0: Not At All</i><br><i>1: Several Days</i><br><i>2: More Than Half the Days</i><br><i>3: Nearly Every Day</i><br><br></td></tr>' + '<table border=\'0\' cellspacing=\'10px\' table-layout=\'fixed\' width=\'' + phq9TableWidths + '\'>' +
		'<tr><td><label for=phq9Q1 class=\'phq9Labels\'><b>Feeling down, depressed, irritable, or hopeless?</b></label></td><td><select id=\'phq9Q1\' class=\'phq9Questions\'><option value=\'\' selected disabled hidden>Select an Option</option><option value=\'0\'>0</option><option value=\'1\'>1</option><option value=\'2\'>2</option><option value=\'3\'>3</option></select></td></tr>' +
		'<tr><td><label for=phq9Q2 class=\'phq9Labels\'><b>Little interest or pleasure in doing things?</b></label></td><td><select id=\'phq9Q2\' class=\'phq9Questions\'><option value=\'\' selected disabled hidden>Select an Option</option><option value=\'0\'>0</option><option value=\'1\'>1</option><option value=\'2\'>2</option><option value=\'3\'>3</option></select></td></tr>' +
		'<tr><td><label for=phq9Q3 class=\'phq9Labels\'><b>Trouble falling asleep, staying asleep, or sleeping too much?</b></label></td><td><select id=\'phq9Q3\' class=\'phq9Questions\'><option value=\'\' selected disabled hidden>Select an Option</option><option value=\'0\'>0</option><option value=\'1\'>1</option><option value=\'2\'>2</option><option value=\'3\'>3</option></select></td></tr>' +
		'<tr><td><label for=phq9Q4 class=\'phq9Labels\'><b>Poor appetite, weight loss, or overeating?</b></label></td><td><select id=\'phq9Q4\' class=\'phq9Questions\'><option value=\'\' selected disabled hidden>Select an Option</option><option value=\'0\'>0</option><option value=\'1\'>1</option><option value=\'2\'>2</option><option value=\'3\'>3</option></select></td></tr>' +
		'<tr><td><label for=phq9Q5 class=\'phq9Labels\'><b>Feeling tired, or having little energy?</b></label></td><td><select id=\'phq9Q5\' class=\'phq9Questions\'><option value=\'\' selected disabled hidden>Select an Option</option><option value=\'0\'>0</option><option value=\'1\'>1</option><option value=\'2\'>2</option><option value=\'3\'>3</option></select></td></tr>' +
		'<tr><td><label for=phq9Q6 class=\'phq9Labels\'><b>Feeling bad about themself - or feeling that they are a failure, or that they have let themself or their family down?</b></label></td><td><select id=\'phq9Q6\' class=\'phq9Questions\'><option value=\'\' selected disabled hidden>Select an Option</option><option value=\'0\'>0</option><option value=\'1\'>1</option><option value=\'2\'>2</option><option value=\'3\'>3</option></select></td></tr>' +
		'<tr><td><label for=phq9Q7 class=\'phq9Labels\'><b>Trouble concentrating on things like school work, reading, or watching TV?</b></label></td><td><select id=\'phq9Q7\' class=\'phq9Questions\'><option value=\'\' selected disabled hidden>Select an Option</option><option value=\'0\'>0</option><option value=\'1\'>1</option><option value=\'2\'>2</option><option value=\'3\'>3</option></select></td></tr>' +
		'<tr><td><label for=phq9Q8 class=\'phq9Labels\'><b>Moving or speaking so slowly that other people could have noticed? Or the opposite - being so fidgety or restless that they were moving around a lot more than usual?</b></label></td><td><select id=\'phq9Q8\' class=\'phq9Questions\'><option value=\'\' selected disabled hidden>Select an Option</option><option value=\'0\'>0</option><option value=\'1\'>1</option><option value=\'2\'>2</option><option value=\'3\'>3</option></select></td></tr>' +
		'<tr><td><label for=phq9Q9 class=\'phq9Labels\'><b>Thoughts that they would be better off dead, or of hurting themself in some way?</b></label></td><td><select id=\'phq9Q9\' class=\'phq9Questions\'><option value=\'\' selected disabled hidden>Select an Option</option><option value=\'0\'>0</option><option value=\'1\'>1</option><option value=\'2\'>2</option><option value=\'3\'>3</option></select></td></tr>' +
		'<tr><td><label for=phq9Q10 class=\'phq9Labels\'><b>In the past year have they felt depressed or sad most days, even if they felt okay sometimes?</b></label></td><td><select id=\'phq9Q10\' class=\'phq9BonusQuestions\'><option value=\'\' selected disabled hidden>Select an Option</option><option value=\'Yes\'>Yes</option><option value=\'No\'>No</option><option value=\'Client refused to answer\'>Client refused to answer</option></select></td></tr>' +	
		'<tr><td><label for=phq9Q11 class=\'phq9Labels\'><b>If they are experiencing any of the problems on this form, how difficult have these problems made it for them to do their work, taking care of things at home, or get along with other people?</b></label></td><td><select id=\'phq9Q11\' class=\'phq9BonusQuestions\'><option value=\'\' selected disabled hidden>Select an Option</option><option value=\'Not difficult at all\'>Not difficult at all</option><option value=\'Somewhat difficult\'>Somewhat difficult</option><option value=\'Very difficult\'>Very difficult</option><option value=\'Extremely difficult\'>Extremely difficult</option><option value=\'Client refused to answer\'>Client refused to answer</option></select></td></tr>' +	
		'<tr><td><label for=phq9Q12 class=\'phq9Labels\'><b>Has there been a time in the past month when they have had serious thoughts about ending their life?</b></label></td><td><select id=\'phq9Q12\' class=\'phq9BonusQuestions\'><option value=\'\' selected disabled hidden>Select an Option</option><option value=\'Yes\'>Yes</option><option value=\'No\'>No</option><option value=\'Client refused to answer\'>Client refused to answer</option></select></td></tr>' +	
		'<tr><td><label for=phq9Q13 class=\'phq9Labels\'><b>Have they ever, in their whole life, tried to kill themself or made a suicide attempt?</b></label></td><td><select id=\'phq9Q13\' class=\'phq9BonusQuestions\'><option value=\'\' selected disabled hidden>Select an Option</option><option value=\'Yes\'>Yes</option><option value=\'No\'>No</option><option value=\'Client refused to answer\'>Client refused to answer</option></select></td></tr>' +		
		'</table>');
}

function depressionScreeningAge(){
	if(age >= 18){
		hideShow('show', 'depressionScreeningAdult', true);
		hideShow('hide', 'depressionScreeningAdolescent', false);
	}
	else if(age >= 11 && age < 18){
		hideShow('hide', 'depressionScreeningAdult', false);
		hideShow('show', 'depressionScreeningAdolescent', true);
	}
	else{
		hideShow('hide', 'depressionScreeningAdult', false);
		hideShow('hide', 'depressionScreeningAdolescent', false);
	}
}

function checkPHQ9Age(){
	if(age > 11){
		hideShow('show', 'phq9PreviousScore', false);
		hideShow('show', 'phq9', true);
		hideShow('show', 'phq9Score', true);
	}
	else{
		hideShow('hide', 'phq9PreviousScore', false);
		hideShow('hide', 'phq9', false);
		hideShow('shhideow', 'phq9Score', false);
	}
}

function checkPHQ9Perform(){
	if($('answer[id=phq9Perform]').parent().prev().find('input').prop('checked')){
		$('div[id=phq9Test]').show();
		$('.phq9Questions').attr('required', true);
		if(!$('div[id=phq9Test]').find('div[class=requiredAsterisk]').length){
			$('div[id=phq9Test]').find('label[class=phq9Labels]').find('b').after('<div class=\'requiredAsterisk\' style=\'color:red;display:inline\'>*</div>');
		}
		$('tr').has('div[id=phq9Score]').find('select').attr('disabled', true);
		$('tr').has('div[id=phq9Score]').find('select').val('');
		hideShow('show', 'phq9Score', true);
		checkPositivePHQ9();
	}
	else{
		$('div[id=phq9Test]').hide();
		$('.phq9Questions').attr('required', false);
		$('div[id=phq9Test]').find('div[class=requiredAsterisk]').remove();
		$('.phq9Questions').val('');
		$('.phq9BonusQuestions').val('');
		$('tr').has('div[id=phq9Score]').find('select').attr('disabled', false);
		$('tr').has('div[id=phq9Score]').find('div[class=requiredAsterisk]').remove();
		$('tr').has('div[id=phq9Score]').find('div[class=redAsterisk]').remove();
		$('tr').has('div[id=phq9Score]').find('select').prop('required', false);
		hideShow('hide', 'phq9Score', false);
		checkPositivePHQ9();
		console.log('PHQ-9 N/A');
	}
}

function calculatePHQ9(){
	var scoreTotal = 0;
	phq9Answers = '';

	$('.phq9Questions').each(function(){
		console.log($(this).val());
		if($(this).val() != '' && $(this).val() != 'Did Not Answer'){
			scoreTotal = scoreTotal + parseInt($(this).val());
			phq9Answers = phq9Answers + $(this).val() + ',';
		}
		else{
			phq9Answers = phq9Answers + 'N/A' + ',';
		}
	});

	$('.phq9BonusQuestions').each(function(){
		console.log($(this).val());
		if($(this).val() != '' && $(this).val() != 'Did Not Answer'){
			phq9Answers = phq9Answers + $(this).val() + ',';
		}
		else{
			phq9Answers = phq9Answers + 'N/A' + ',';
		}
	});
	
	phq9Score = scoreTotal;

	if(scoreTotal < 10){
		scoreTotal = '0' + scoreTotal;
	}

	$('tr').has('div[id=phq9Score]').find('select').val($('tr').has('div[id=phq9Score]').find('option[text=' + scoreTotal + ']').val());
	$('tr').has('div[id=phq9Score]').find('select').trigger('change');
	phq9Answers = phq9Answers.substring(0, phq9Answers.length - 1);
	savePHQ9();
}

function savePHQ9(){
	if(!phq9Answers.includes('null')){
		$('tr').has('div[id=phq9Answers]').find('input').val(phq9Answers);
	}
}

var phq9Answers;

function loadPHQ9(){
	var phq9AnswersArray;
	var count = 0;

	if($('tr').has('div[id=phq9Answers]').find('input').val() != ''){
		phq9Answers = $('tr').has('div[id=phq9Answers]').find('input').val();
		if(!$('tr').has('div[id=phq9Answers]').find('input').val().includes('null')){
			phq9AnswersArray = phq9Answers.split(',');
			
			$('.phq9Questions').each(function(){
				$(this).val(phq9AnswersArray [count]);
				count++;
			});
		}	
	}
}

function checkManualPHQ9(){
	if($('answer[id=phq9Manual]').parent().prev().find('input').prop('checked')){
		phq9Score = parseInt($('tr').has('div[id=phq9Score]').find('option[value=' + $('tr').has('div[id=phq9Score]').find('select').val() + ']').attr('text'));
	}
}

function checkPositivePHQ9(){
	hideShow('hide', 'positiveScreening', false);
	if(parseInt(phq9Score) > 9 && phq9Score != undefined){
		hideShow('show', 'positiveScreening', true);
	}
}

$('document').ready(function(){
	$('tr').has('div[id=phq9Score]').find('option').each(function(){this.setAttribute('text', this.outerText);});
	setTimeout(loadPHQ9, 500);
	setTimeout(depressionScreeningAge, 500);
	setTimeout(checkPHQ9Age, 500);
	createPHQ9();
	setTimeout(checkPHQ9Perform, 500);
	setTimeout(checkPositivePHQ9, 500);
	setTimeout(calculatePHQ9, 500);

	$('tr').has('div[id=phq9]').find('input').change(checkPHQ9Perform);
	$('.phq9Questions').change(calculatePHQ9);
	$('.phq9Questions').click(calculatePHQ9);
	$('.phq9BonusQuestions').change(calculatePHQ9);
	$('.phq9BonusQuestions').click(calculatePHQ9);
	$('tr').has('div[id=phq9Score]').find('select').change(checkManualPHQ9);
	$('tr').has('div[id=phq9Score]').find('select').click(checkManualPHQ9);
	$('tr').has('div[id=phq9Score]').find('select').change(checkPositivePHQ9);
	$('tr').has('div[id=phq9Score]').find('select').click(checkPositivePHQ9);
	$('tr').has('div[id=phq9]').find('input').change(checkPositivePHQ9);
	$('tr').has('div[id=phq9]').find('input').click(checkPositivePHQ9);
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
		$('tr').has('div[class=' + target + ']').next().find('div').show(); 
		$('td').has('div[id=' + target + ']').show(); 
		$('tr').has('div[id=' + target + ']').next().find('div').show();
		$('td').has('div[hide=' + target + ']').show(); 
		$('td').has('div[hide=' + target + ']').next().show(); 
		$('tr').has('div[hide=' + target + ']').next().find('div').show(); 		
		if(setRequired == true){
			requireHidden(true, target); 
		}
	} 
	else if(hideShow == 'hide'){ 
		$('td').has('div[class=' + target + ']').hide(); 
		$('tr').has('div[class=' + target + ']').next().find('div').hide();  
		$('td').has('div[id=' + target + ']').hide(); 
		$('tr').has('div[id=' + target + ']').next().find('div').hide(); 
		$('td').has('div[hide=' + target + ']').hide();
		$('td').has('div[hide=' + target + ']').next().hide();		
		$('tr').has('div[hide=' + target + ']').next().find('div').hide();
		if(setRequired == true){
			requireHidden(false, target); 
		}
	}  
}