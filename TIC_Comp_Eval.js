var age;
var cid;
var programID;
var program;

//Set text property of dropdown options to be available to search for
function populateOptionText (target){
	$('tr').has('div[id=' + target + ']').find('option').each(function(){this.setAttribute('text', this.outerText);});
}

//Get client ID>
$('document').ready(function(){
	if(window.parent[0].$){
		cid = window.parent[0].$('input[id=client_id]')?.val();
		console.log('Client ID found.');
	}
	
	if(cid == undefined)
	{
		cid = '200079';
	}

	try{ 
		programID = window.parent[0].$('input[id=programId]').val(); 
	}
	catch{ 
		if(programID == undefined){ 
			programID = 130; 
		} 
	}  
	
	if($('tr').has('div[id=clientAge]').find('input')?.val() != ''){
		age = $('tr').has('div[id=clientAge]').find('font').text();
		console.log(age);
	}
	if(!$.isNumeric(age)){
		age = 18;
	}
	
	$('input[name=Complete]').prop('disabled', false);
});

function requireHidden (condition, target) { 
	$('tr').find('div[class*=' + target + ']').next().remove(); 
	$('tr').find('div[id=' + target + ']').next().remove();  
	if(condition) { 
		$('tr').has('div[class*=' + target + ']').find('input').prop('required', true); 
		$('tr').has('div[class*=' + target + ']').find('select').prop('required', true); 
		$('tr').find('div[class*=' + target + ']').after('<div class=\'redAsterisk\' style=\'color : red; display : inline\'>*</div>');$('tr').has('div[id=' + target + ']').find('input').prop('required', true); $('tr').has('div[id=' + target + ']').find('select').prop('required', true); 
		$('tr').find('div[id=' + target + ']').after('<div class=\'redAsterisk\' style=\'color : red; display : inline\'>*</div>');  
	} 
	else { 
		$('tr').has('div[class*=' + target + ']').find('input').prop('required', false); 
		$('tr').has('div[class*=' + target + ']').find('select').prop('required', false); 
		$('tr').has('div[id=' + target + ']').find('input').prop('required', false); $('tr').has('div[id=' + target + ']').find('select').prop('required', false);
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

$('document').ready(function(){
	hideShow('hide', 'hideOnLoad', false);
});

//Set Dx frame

const dxURL = 'https://www.cbh3.crediblebh.com/client/client_axis.aspx?client_id=';

function setDxFrame(frame)
{
	try{
		$('#' + frame).attr('src', dxURL + cid);
	}
	catch(e){
		console.log(e);
	}
	
	setTimeout(function()
	{
		$('#' + frame).prop('scrolling', 'yes');
		$('#' + frame).css('overflow', 'scroll');
	}, 100);
}

$('document').ready(function()
{
	setDxFrame('dxModule');
	
	$('#dxModule').load(function(){
		$('#dxModule').contents().find('#navigationPanel').hide();
	});
});

//Set Tx frame
const txURL = 'https://www.cbh3.crediblebh.com/client/client_tx.aspx?client_id=';

function setTxPlan(frame)
{
	try{
		$('#' + frame).attr('src', txURL + cid);
	}
	catch(e){
		console.log(e);
	}
	
	setTimeout(function()
	{
		$('#' + frame).prop('scrolling', 'yes');
		$('#' + frame).css('overflow', 'scroll');
	}, 100);
}

$('document').ready(function()
{
	setTxPlan('txPlanModule');
	
	$('#txPlanModule').load(function(){
		$('#txPlanModule').contents().find('#navigationPanel').hide();
	});
});

function checkDxUpdate(){
	if($('tr').has('div[id=dxUpdate]').find('tr:contains(\'Yes\')').eq(1).find('input').prop('checked')){
		hideShow('show', 'dxModule', false);
	}
	else{
		hideShow('hide', 'dxModule', false);
	}
}

function checkTxUpdate(){
	if($('tr').has('div[id=txPlanUpdate]').find('tr:contains(\'Yes\')').eq(1).find('input').prop('checked')){
		hideShow('show', 'txPlanModule', false);
	}
	else{
		hideShow('hide', 'txPlanModule', false);
	}
}

$('document').ready(function()
{
	checkDxUpdate();
	checkTxUpdate();
	
	$('tr').has('div[id=dxUpdate]').find('input').change(checkDxUpdate);
	$('tr').has('div[id=txPlanUpdate]').find('input').change(checkTxUpdate);
});

//Tobacco questions
function checkTobacco(){
	hideShow('hide', 'tobaccoCessation', false);
	if($('tr').has('div[id=tobaccoUse]').find('select').val() == $('tr').has('div[id=tobaccoUse]').find('option[text=\'1-YES\']').val()){
		hideShow('show', 'tobaccoCessation', true);
	}
	else if($('tr').has('div[id=tobaccoUse]').find('select').val() == $('tr').has('div[id=tobaccoUse]').find('option[text=\'2-NO\']').val()){
		if($('tr').has('div[id=tobaccoCessation]').find('select').val() == ''){
			$('tr').has('div[id=tobaccoCessation]').find('select').val($('tr').has('div[id=tobaccoCessation]').find('option[text=\'2-NO\']').val());
		}
	}
}

$('document').ready(function(){
	populateOptionText('tobaccoUse');
	populateOptionText('tobaccoCessation');

	checkTobacco();

	$('tr').has('div[id=tobaccoUse]').find('select').change(checkTobacco);
});

//SUD referral based on drinks
function checkDrinks(){
	if(parseInt($('tr').has('div[id=drinksPastYear]').find('input').val()) > 2){
		alert('Consider a SUD Referral.');
	}
}

$('document').ready(function(){
	$('tr').has('div[id=drinksPastYear]').find('input').change(checkDrinks);
});

//SUD questions
function checkSUD(){
	hideShow('hide', 'substanceResourcesOffered', false);
	if($('tr').has('div[id=substanceUse]').find('select').val() == $('tr').has('div[id=substanceUse]').find('option[text=\'1-YES\']').val()){
		hideShow('show', 'substanceResourcesOffered', true);
	}
	else if($('tr').has('div[id=substanceUse]').find('select').val() == $('tr').has('div[id=substanceUse]').find('option[text=\'2-NO\']').val()){
		if($('tr').has('div[id=substanceResourcesOffered]').find('select').val() == ''){
			$('tr').has('div[id=substanceResourcesOffered]').find('select').val($('tr').has('div[id=substanceResourcesOffered]').find('option[text=\'NO\']').val());
		}
	}
}

$('document').ready(function(){
	populateOptionText('substanceUse');
	populateOptionText('substanceResourcesOffered');

	checkSUD();

	$('tr').has('div[id=substanceUse]').find('select').change(checkSUD);
});

//School Questions
function checkSchoolAge(){
	if(age >= 25 || $('tr').has('div[id=evalType]').find('tr:contains(\'Initial\')').eq(1).find('input').prop('checked')){
		hideShow('hide', 'schoolQuestions', false);
		if($('tr').has('div[id=schoolAttendanceImprovement]').find('select').val() == ''){
			$('tr').has('div[id=schoolAttendanceImprovement]').find('select').val($('tr').has('div[id=schoolAttendanceImprovement]').find('option[text=\'Not Applicable\']').val());
		}
		if($('tr').has('div[id=academicImprovement]').find('select').val() == ''){
			$('tr').has('div[id=academicImprovement]').find('select').val($('tr').has('div[id=academicImprovement]').find('option[text=\'Not Applicable\']').val());
		}
		if($('tr').has('div[id=schoolBehaviorImprovement]').find('select').val() == ''){
			$('tr').has('div[id=schoolBehaviorImprovement]').find('select').val($('tr').has('div[id=schoolBehaviorImprovement]').find('option[text=\'Not Applicable\']').val());
		}
	}
	else{
		hideShow('show', 'schoolQuestions', true);
		if($('tr').has('div[id=schoolAttendanceImprovement]').find('select').val() == $('tr').has('div[id=schoolAttendanceImprovement]').find('option[text=\'Not Applicable\']').val()){
			$('tr').has('div[id=schoolAttendanceImprovement]').find('select').val('');
		}
		if($('tr').has('div[id=academicImprovement]').find('select').val() == $('tr').has('div[id=academicImprovement]').find('option[text=\'Not Applicable\']').val()){
			$('tr').has('div[id=academicImprovement]').find('select').val('');
		}
		if($('tr').has('div[id=schoolBehaviorImprovement]').find('select').val() == $('tr').has('div[id=schoolBehaviorImprovement]').find('option[text=\'Not Applicable\']').val()){
			$('tr').has('div[id=schoolBehaviorImprovement]').find('select').val('');
		}
	}
}

$('document').ready(function(){
	populateOptionText('schoolAttendanceImprovement');
	populateOptionText('academicImprovement');
	populateOptionText('schoolBehaviorImprovement');

	checkSchoolAge();

	$('tr').has('div[id=evalType]').find('input').change(checkSchoolAge);
});

//Supported Intersts
function checkSupportedEducation(){
	hideShow('hide', 'supportedEducation', false);
	if($('tr').has('div[id=supportedInterests]').find('tr:contains(\'Education\')').eq(1).find('input').prop('checked')){
		if($('tr').has('div[id=supportedInterests]').find('tr:contains(\'None\')').eq(1).find('input').prop('checked')){
			$('tr').has('div[id=supportedInterests]').find('tr:contains(\'None\')').eq(1).find('input').prop('checked', false);
		}

		if($('tr').has('div[id=supportedInterests]').find('tr:contains(\'Education\')').eq(1).find('input').prop('checked')){
			hideShow('show', 'supportedEducation', true);
		}
	}
}

function checkSupportedEmployment(){
	hideShow('hide', 'supportedEmployment', false);
	if($('tr').has('div[id=supportedInterests]').find('tr:contains(\'Employment\')').eq(1).find('input').prop('checked')){
		if($('tr').has('div[id=supportedInterests]').find('tr:contains(\'None\')').eq(1).find('input').prop('checked')){
			$('tr').has('div[id=supportedInterests]').find('tr:contains(\'None\')').eq(1).find('input').prop('checked', false);
		}

		if($('tr').has('div[id=supportedInterests]').find('tr:contains(\'Employment\')').eq(1).find('input').prop('checked')){
			hideShow('show', 'supportedEmployment', true);
		}
	}
}

function checkSupportedInterestsNone(){
	hideShow('hide', 'supportedEducation', false);
	hideShow('hide', 'supportedEmployment', false);
	if($('tr').has('div[id=supportedInterests]').find('tr:contains(\'None\')').eq(1).find('input').prop('checked')){
		$('tr').has('div[id=supportedInterests]').find('tr:contains(\'Education\')').eq(1).find('input').prop('checked', false);
		$('tr').has('div[id=supportedInterests]').find('tr:contains(\'Employment\')').eq(1).find('input').prop('checked', false);

		if($('tr').has('div[id=supportedEducation]').find('select').val() != ''){
			$('tr').has('div[id=supportedEducation]').find('select').val($('tr').has('div[id=supportedEducation]').find('option[text=\'2=NO\']').val());
		}

		if($('tr').has('div[id=supportedEmployment]').find('select').val() != ''){
			$('tr').has('div[id=supportedEmployment]').find('select').val($('tr').has('div[id=supportedEmployment]').find('option[text=\'2=NO\']').val());
		}
	}
}

$('document').ready(function(){
	populateOptionText('supportedEducation');
	populateOptionText('supportedEmployment');
	checkSupportedEducation();
	checkSupportedEmployment();
	checkSupportedInterestsNone();

	$('tr').has('div[id=supportedInterests]').find('tr:contains(\'Education\')').eq(1).find('input').change(checkSupportedEducation);
	$('tr').has('div[id=supportedInterests]').find('tr:contains(\'Employment\')').eq(1).find('input').change(checkSupportedEmployment);
	$('tr').has('div[id=supportedInterests]').find('tr:contains(\'None\')').eq(1).find('input').change(checkSupportedInterestsNone);
});

//Arrests
function checkArrests(){
	hideShow('hide', 'arrests', false);

	if(parseInt($('tr').has('div[id=arrestsTotal]').find('input').val()) > 0){
		hideShow('show', 'arrestsLast30', true);
		hideShow('show', 'arrestsDUITotal', true);

		if(parseInt($('tr').has('div[id=arrestsDUITotal]').find('input').val()) > 0){
			hideShow('show', 'arrestsDUILast30', true);
		}
	}
}

$('document').ready(function(){
	checkArrests();

	$('tr').has('div[id=arrestsTotal]').find('input').change(checkArrests);
	$('tr').has('div[class=arrests]').find('input').change(checkArrests);
});

//Checks for arrests
$('document').ready(function(){
	$('input[name=Complete]').prop('disabled', false);
	$('input[name=Complete]').click(function(e){
		if($('tr').has('div[id=duiiArrests]').find('input').val() < $('tr').has('div[id=duiiArrestsPastMonth]').find('input').val()){
			e.preventDefault();
			alert('Total DUII Arrests have to be greater than or equal to Number of DUII Arrests in Past Month');
		}
		
		if($('tr').has('div[id=arrests]').find('input').val() < (parseInt($('tr').has('div[id=duiiArrests]').find('input').val()) + parseInt($('tr').has('div[id=arrestsPastMonth]').find('input').val()))){
			e.preventDefault();
			alert('Total Arrests have to be greater than or equal to Total DUII Arrests and Number of Arrests in Past Month');
		}
	});
});

//Pathways
var currentDate;
const pathwayOneChild = 30 * 6;
const pathwayOneAdult = 30 * 9;
const pathwayTwoChild = 30 * 12;
const pathwayTwoAdult = 30 * 12;
const pathwayThreeChild = 30 * 12;
const pathwayThreeAdult = 30 * 3;
const pathwayFourChild = 30 * 9;
const pathwayFourAdult = 30 * 6;


function checkPathwaySelected(){
	currentDate = new Date();
	switch($('tr').has('div[id=pathwaySelected]').find('select').val()){
		case $('tr').has('div[id=pathwaySelected]').find('option[text=\'Pathway 1\']').val():
			console.log('Pathway 1');
			if (age < 18){
				currentDate = new Date(currentDate.setDate(currentDate.getDate() + pathwayOneChild));
			}
			else{
				currentDate = new Date(currentDate.setDate(currentDate.getDate() + pathwayOneAdult));
			}
			break;
		case $('tr').has('div[id=pathwaySelected]').find('option[text=\'Pathway 2\']').val():
			console.log('Pathway 2');
			if (age < 18){
				currentDate = new Date(currentDate.setDate(currentDate.getDate() + pathwayTwoChild));
			}
			else{
				currentDate = new Date(currentDate.setDate(currentDate.getDate() + pathwayTwoAdult));
			}
			break;
		case $('tr').has('div[id=pathwaySelected]').find('option[text=\'Pathway 3\']').val():
			console.log('Pathway 3');
			if (age < 18){
				currentDate = new Date(currentDate.setDate(currentDate.getDate() + pathwayThreeChild));
			}
			else{
				currentDate = new Date(currentDate.setDate(currentDate.getDate() + pathwayThreeAdult));
			}
			break;
		case $('tr').has('div[id=pathwaySelected]').find('option[text=\'Pathway 4\']').val():
			console.log('Pathway 4');
			if (age < 18){
				currentDate = new Date(currentDate.setDate(currentDate.getDate() + pathwayFourChild));
			}
			else{
				currentDate = new Date(currentDate.setDate(currentDate.getDate() + pathwayFourAdult));
			}
			break;
		default:
	}

	$('tr').has('div[id=pathwayEnds]').find('input').val((currentDate.getMonth() + 1) + '/' + currentDate.getDate() + '/' + currentDate.getFullYear());
}

$('document').ready(function(){
	populateOptionText('pathwaySelected');
	checkPathwaySelected();

	$('tr').has('div[id=pathwaySelected]').find('select').change(checkPathwaySelected);
});