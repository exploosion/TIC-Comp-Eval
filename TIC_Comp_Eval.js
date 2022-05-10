var age;
var cid;
var programID;
var program;
const tableWidths = '60%';

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
var referralSUD;
function checkDrinks(){
	$('tr').has('div[id=referralsInternal]').find('tr:contains(\'SUDS\')').eq(1).css('background-color', 'white');
	referralSUD = false;
	if(parseInt($('tr').has('div[id=drinksPastYear]').find('input').val()) > 2){
		alert('Consider a SUD Referral.');
		if(!$('tr').has('div[id=referrals]').find('tr:contains(\'Internal\')').eq(1).find('input').prop('checked')){
			$('tr').has('div[id=referrals]').find('tr:contains(\'Internal\')').eq(1).find('input').trigger('click');
		}
		if(!$('tr').has('div[id=referralsInternal]').find('tr:contains(\'SUDS\')').eq(1).find('input').prop('checked')){
			$('tr').has('div[id=referralsInternal]').find('tr:contains(\'SUDS\')').eq(1).css('background-color', 'yellow');
			referralSUD = true;
		}
	}
}

function checkReferralAlert(){
	hideShow('hide', 'referralsAlert', false);
	if(referralSUD){
		hideShow('show', 'referralsAlert', false);
	}

	if(referralSupported){
		hideShow('show', 'referralsAlert', false);
	}
}

$('document').ready(function(){
	checkDrinks();
	checkReferralAlert();
	$('tr').has('div[id=drinksPastYear]').find('input').change(checkDrinks);
	$('input').change(checkReferralAlert);
	$('select').change(checkReferralAlert);
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

//Referrals
function checkReferrals(){
	hideShow('hide', 'referralsInternal', false);
	hideShow('hide', 'referralsExternal', false);
	if($('tr').has('div[id=referrals]').find('tr:contains(\'Internal\')').eq(1).find('input').prop('checked')){
		hideShow('show', 'referralsInternal', false);
	}

	if($('tr').has('div[id=referrals]').find('tr:contains(\'External\')').eq(1).find('input').prop('checked')){
		hideShow('show', 'referralsExternal', false);
	}
}

function referralsInternal(){
	if($('tr').has('div[id=referrals]').find('tr:contains(\'Internal\')').eq(1).find('input').prop('checked')){
		$('tr').has('div[id=referrals]').find('tr:contains(\'None\')').eq(1).find('input').prop('checked', true);
		$('tr').has('div[id=referrals]').find('tr:contains(\'None\')').eq(1).find('input').trigger('click');
	}
}

function referralsExternal(){
	if($('tr').has('div[id=referrals]').find('tr:contains(\'External\')').eq(1).find('input').prop('checked')){
		$('tr').has('div[id=referrals]').find('tr:contains(\'None\')').eq(1).find('input').prop('checked', true);
		$('tr').has('div[id=referrals]').find('tr:contains(\'None\')').eq(1).find('input').trigger('click');
	}
}

function referralsNone(){
	if($('tr').has('div[id=referrals]').find('tr:contains(\'None\')').eq(1).find('input').prop('checked')){
		$('tr').has('div[id=referrals]').find('tr:contains(\'Internal\')').eq(1).find('input').prop('checked', true);
		$('tr').has('div[id=referrals]').find('tr:contains(\'Internal\')').eq(1).find('input').trigger('click');
		$('tr').has('div[id=referrals]').find('tr:contains(\'External\')').eq(1).find('input').prop('checked', true);
		$('tr').has('div[id=referrals]').find('tr:contains(\'External\')').eq(1).find('input').trigger('click');
	}
}

$('document').ready(function(){
	checkReferrals();

	$('tr').has('div[id=referrals]').find('input').change(checkReferrals);

	$('tr').has('div[id=referrals]').find('tr:contains(\'Internal\')').eq(1).find('input').change(referralsInternal);
	$('tr').has('div[id=referrals]').find('tr:contains(\'External\')').eq(1).find('input').change(referralsExternal);
	$('tr').has('div[id=referrals]').find('tr:contains(\'None\')').eq(1).find('input').change(referralsNone);
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

//Supported Interests
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
	// checkSupportedEducation();
	// checkSupportedEmployment();
	// checkSupportedInterestsNone();

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
			$('tr').has('div[id=pathwayEnds]').find('input').val((currentDate.getMonth() + 1) + '/' + currentDate.getDate() + '/' + currentDate.getFullYear());
			break;
		case $('tr').has('div[id=pathwaySelected]').find('option[text=\'Pathway 2\']').val():
			console.log('Pathway 2');
			if (age < 18){
				currentDate = new Date(currentDate.setDate(currentDate.getDate() + pathwayTwoChild));
			}
			else{
				currentDate = new Date(currentDate.setDate(currentDate.getDate() + pathwayTwoAdult));
			}
			$('tr').has('div[id=pathwayEnds]').find('input').val((currentDate.getMonth() + 1) + '/' + currentDate.getDate() + '/' + currentDate.getFullYear());
			break;
		case $('tr').has('div[id=pathwaySelected]').find('option[text=\'Pathway 3\']').val():
			console.log('Pathway 3');
			if (age < 18){
				currentDate = new Date(currentDate.setDate(currentDate.getDate() + pathwayThreeChild));
			}
			else{
				currentDate = new Date(currentDate.setDate(currentDate.getDate() + pathwayThreeAdult));
			}
			$('tr').has('div[id=pathwayEnds]').find('input').val((currentDate.getMonth() + 1) + '/' + currentDate.getDate() + '/' + currentDate.getFullYear());
			break;
		case $('tr').has('div[id=pathwaySelected]').find('option[text=\'Pathway 4\']').val():
			console.log('Pathway 4');
			if (age < 18){
				currentDate = new Date(currentDate.setDate(currentDate.getDate() + pathwayFourChild));
			}
			else{
				currentDate = new Date(currentDate.setDate(currentDate.getDate() + pathwayFourAdult));
			}
			$('tr').has('div[id=pathwayEnds]').find('input').val((currentDate.getMonth() + 1) + '/' + currentDate.getDate() + '/' + currentDate.getFullYear());
			break;
		default:
			$('tr').has('div[id=pathwayEnds]').find('input').val('');
	}
}

$('document').ready(function(){
	populateOptionText('pathwaySelected');
	checkPathwaySelected();

	$('tr').has('div[id=pathwaySelected]').find('select').change(checkPathwaySelected);
});

//ACE
var acePreviousScore;

function checkACEPreviousScore(){
	if($('tr').has('div[id=acePrevious]').find('input')?.val() != ''){
		acePreviousScore = $('tr').has('div[id=acePrevious]').find('b')[0]?.innerHTML;
		$('tr').has('answer[id=acePerform]').eq(2).hide();
	}
	if(!$.isNumeric(acePreviousScore)){
		$('tr').has('div[id=acePrevious]').find('div').eq(1).text('9001');
		acePreviousScore = 9001;
	}
}

function createACE(){
	$('tr').has('div[id=ace]').eq(0).next().after('<div id=\'aceTest\'><div id=\'aceContainer\'></div><br><img src=\'/images/spacer.gif\' height=\'15\' width=\'1\'></div>');

	$('div[id=aceContainer]').html('<b>ACE</b><br><br><i>While the client was growing up, during their first 18 years of life:</i></td></tr>' + '<table border=\'0\' cellspacing=\'10px\' table-layout=\'fixed\' width=\'' + tableWidths + '\'>' +
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

function checkACEPerform(){
	if($('answer[id=acePerform]').parent().prev().find('input').prop('checked')){
		$('div[id=aceTest]').show();
		$('.aceQuestions').attr('required', true);
		if(!$('div[id=aceTest]').find('div[class=requiredAsterisk]').length){
			$('div[id=aceTest]').find('label[class=aceLabels]').find('b').after('<div class=\'requiredAsterisk\' style=\'color:red;display:inline\'>*</div>');
		}
		$('tr').has('div[id=aceScore]').find('input').prop('readonly', true);
		hideShow('show', 'aceScore', true);
	}
	else if($('answer[id=acePreviousScore]').parent().prev().find('input').prop('checked')){
		$('div[id=aceTest]').hide();
		$('.aceQuestions').attr('required', false);
		$('div[id=aceTest]').find('div[class=requiredAsterisk]').remove();
		$('.aceQuestions').val('');
		$('tr').has('div[id=aceScore]').find('input').prop('readonly', true);
		$('tr').has('div[id=aceScore]').find('input').val(acePreviousScore);
		hideShow('hide', 'aceScore', false);
	}
	else if($('answer[id=aceManual]').parent().prev().find('input').prop('checked')){
		$('div[id=aceTest]').hide();
		$('.aceQuestions').attr('required', false);
		$('div[id=aceTest]').find('div[class=requiredAsterisk]').remove();
		$('.aceQuestions').val('');
		$('tr').has('div[id=aceScore]').find('input').prop('readonly', false);
		if($('tr').has('div[id=aceScore]').find('input').val() != ''){
			$('tr').has('div[id=aceScore]').find('input').val('');
		}
		hideShow('show', 'aceScore', true);
	}
	else{
		$('div[id=aceTest]').hide();
		$('.aceQuestions').attr('required', false);
		$('div[id=aceTest]').find('div[class=requiredAsterisk]').remove();
		$('.aceQuestions').val('');
		$('tr').has('div[id=aceScore]').find('input').prop('readonly', false);
		hideShow('hide', 'aceScore', false);
	}
}

function calculateACE(){
	var scoreTotal = 0;

	$('.aceQuestions').each(function(){
		console.log($(this).val());
		if($(this).val() != '' && $(this).val() != 'Did Not Answer'){
			if($(this).val() == 'Yes'){
				scoreTotal++;
			}
		}
	})

	$('tr').has('div[id=aceScore]').find('input').val(scoreTotal);
}

$('document').ready(function(){
	checkACEPreviousScore();
	createACE();
	checkACEPerform();

	$('tr').has('div[id=ace]').find('input').change(checkACEPerform);
	$('.aceQuestions').change(calculateACE);
	$('.aceQuestions').click(calculateACE);
});

//CSSRS
var cssrsPreviousScore;

function checkCSSRSPreviousScore(){
	if($('tr').has('div[id=cssrsPrevious]').find('input')?.val() != ''){
		cssrsPreviousScore = $('tr').has('div[id=cssrsPrevious]').find('b')[0]?.innerHTML;
	}
	if(!$.isNumeric(cssrsPreviousScore)){
		$('tr').has('div[id=cssrsPrevious]').find('div').eq(1).text('9001');
		cssrsPreviousScore = 9001;
	}
}

function createCSSRS(){
	$('tr').has('div[id=cssrs]').eq(0).next().after('<div id=\'cssrsTest\'><div id=\'cssrsContainer\'></div><br><img src=\'/images/spacer.gif\' height=\'15\' width=\'1\'></div>');

	$('div[id=cssrsContainer]').html('<b>CSSRS</b></td></tr>' + '<table border=\'0\' cellspacing=\'10px\' table-layout=\'fixed\' width=\'' + tableWidths + '\'>' +
		'<tr><td><label for=cssrsQ1 class=\'cssrsLabels\'><b>1. In the past month, have you wished you were dead or wished you could go to sleep and not wake up?</b></label></td><td><select id=\'cssrsQ1\' class=\'cssrsQuestions\'><option value=\'\' selected disabled hidden>Select an Option</option><option value=\'Yes\'>Yes</option><option value=\'No\'>No</option></select></td></tr>' +
		'<tr><td><label for=cssrsQ2 class=\'cssrsLabels\'><b>2. In the past month, have you actually had any thoughts about killing yourself?</b></label></td><td><select id=\'cssrsQ2\' class=\'cssrsQuestions\'><option value=\'\' selected disabled hidden>Select an Option</option><option value=\'Yes\'>Yes</option><option value=\'No\'>No</option></select></td></tr>' +
		'<tr><td><label for=cssrsQ3 class=\'cssrsLabels\'><b>3. In the past month, have you thought about how you might do this?</b></label></td><td><select id=\'cssrsQ3\' class=\'cssrsQuestions\'><option value=\'\' selected disabled hidden>Select an Option</option><option value=\'Yes\'>Yes</option><option value=\'No\'>No</option></select></td></tr>' +
		'<tr><td><label for=cssrsQ4 class=\'cssrsLabels\'><b>4. In the past month, have you had any intention of acting on these thoughts of killing yourself, as opposed to you have the thoughts but you definitely would not act on them?</b></label></td><td><select id=\'cssrsQ4\' class=\'cssrsQuestions\'><option value=\'\' selected disabled hidden>Select an Option</option><option value=\'Yes\'>Yes</option><option value=\'No\'>No</option></select></td></tr>' +
		'<tr><td><label for=cssrsQ5 class=\'cssrsLabels\'><b>5. In the past month, have you started to work out or worked out the details of how to kill yourself?</b></label></td><td><select id=\'cssrsQ5\' class=\'cssrsQuestions\'><option value=\'\' selected disabled hidden>Select an Option</option><option value=\'Yes\'>Yes</option><option value=\'No\'>No</option></select></td></tr>' +
        '<tr><td><label for=cssrsQ5A class=\'cssrsLabels\'><b>5a. Do you intend to carry out this plan?</b></label></td><td><select id=\'cssrsQ5A\' class=\'cssrsQuestions\'><option value=\'\' selected disabled hidden>Select an Option</option><option value=\'Yes\'>Yes</option><option value=\'No\'>No</option></select></td></tr>' +
		'<tr><td><label for=cssrsQ6 class=\'cssrsLabels\'><b>6. Have you ever done anything, started to do anything, or prepared to do anything to end your life? (Examples: Collected pills, obtained a gun, gave away valuables, wrote a will or suicide note, took out pills but didn\'t swallow any, held a gun but changed your mind or it was grabbed from your hand, went to the roof but didn\'t jump, or actually took pills, tried to shoot yourself, cut yourself, tried to hang yourself, etc.)</b></label></td><td><select id=\'cssrsQ6\' class=\'cssrsQuestions\'><option value=\'\' selected disabled hidden>Select an Option</option><option value=\'Yes\'>Yes</option><option value=\'No\'>No</option></select></td></tr>' +
        '<tr><td><label for=cssrsQ6A class=\'cssrsLabels\'><b>6a. How long ago did you do any of these?</b></label></td><td><select id=\'cssrsQ6A\' class=\'cssrsQuestions\'><option value=\'\' selected disabled hidden>Select an Option</option><option value=\'Within the last week\'>Within the last week</option><option value=\'Between 1 week and 1 year ago\'>Between 1 week and 1 year ago</option><option value=\'Over a year ago\'>Over a year ago</option></select></td></tr>' +		
		'</table>');
}

function checkCSSRSPerform(){
	if($('answer[id=cssrsPerform]').parent().prev().find('input').prop('checked')){
		$('div[id=cssrsTest]').show();
		$('.cssrsQuestions').attr('required', true);
		if(!$('div[id=cssrsTest]').find('div[class=requiredAsterisk]').length){
			$('div[id=cssrsTest]').find('label[class=cssrsLabels]').find('b').after('<div class=\'requiredAsterisk\' style=\'color:red;display:inline\'>*</div>');
		}
		$('tr').has('div[id=cssrsScore]').find('select').attr('disabled', true);
		hideShow('show', 'cssrsScore', true);
	}
	else if($('answer[id=cssrsPreviousScore]').parent().prev().find('input').prop('checked')){
		$('div[id=cssrsTest]').hide();
		$('.cssrsQuestions').attr('required', false);
		$('div[id=cssrsTest]').find('div[class=requiredAsterisk]').remove();
		$('.cssrsQuestions').val('');
		$('tr').has('div[id=cssrsScore]').find('select').attr('disabled', true);
		$('tr').has('div[id=cssrsScore]').find('input').val(cssrsPreviousScore);
		hideShow('hide', 'cssrsScore', false);
	}
	else if($('answer[id=cssrsManual]').parent().prev().find('input').prop('checked')){
		$('div[id=cssrsTest]').hide();
		$('.cssrsQuestions').attr('required', false);
		$('div[id=cssrsTest]').find('div[class=requiredAsterisk]').remove();
		$('.cssrsQuestions').val('');
		$('tr').has('div[id=cssrsScore]').find('select').attr('disabled', false);
		if($('tr').has('div[id=cssrsScore]').find('input').val() != ''){
			$('tr').has('div[id=cssrsScore]').find('input').val('');
		}
		hideShow('show', 'cssrsScore', true);
	}
	else{
		$('div[id=cssrsTest]').hide();
		$('.cssrsQuestions').attr('required', false);
		$('div[id=cssrsTest]').find('div[class=requiredAsterisk]').remove();
		$('.cssrsQuestions').val('');
		$('tr').has('div[id=cssrsScore]').find('select').attr('disabled', false);
		hideShow('hide', 'cssrsScore', false);
	}
}

function calculateCSSRS(){
	if($('#cssrsQ6').val() == 'Yes'){
		if($('#cssrsQ6A').val() == 'Within the last week'){
			$('tr').has('div[id=cssrsScore]').find('select').val($('tr').has('div[id=cssrsScore]').find('option[text*=Emergency]').val());
		}
		else if($('#cssrsQ6A').val() == 'Between 1 week and 1 year ago'){
			$('tr').has('div[id=cssrsScore]').find('select').val($('tr').has('div[id=cssrsScore]').find('option[text*=\'Urgent (within\']').val());
		}
		else{
			$('tr').has('div[id=cssrsScore]').find('select').val($('tr').has('div[id=cssrsScore]').find('option[text*=Routine]').val());
		}
	}
	else{
		if($('#cssrsQ3').val() == 'Yes' || $('#cssrsQ4').val() == 'Yes' || $('#cssrsQ5').val() == 'Yes'){
			if($('#cssrsQ5A').val() == 'Yes'){
				$('tr').has('div[id=cssrsScore]').find('select').val($('tr').has('div[id=cssrsScore]').find('option[text*=Emergency]').val());
			}
			else{
				$('tr').has('div[id=cssrsScore]').find('select').val($('tr').has('div[id=cssrsScore]').find('option[text*=\'Urgent (within\']').val());
			}
		}
		else{
			$('tr').has('div[id=cssrsScore]').find('select').val($('tr').has('div[id=cssrsScore]').find('option[text*=Routine]').val());
		}
	}
}

function cssrsHideShows(){
	if($('#cssrsQ1').val() == 'No' && $('#cssrsQ2').val() == 'No'){
		$('tr').has('label[for=cssrsQ3]').hide();
		$('#cssrsQ3').attr('required', false);
		$('tr').has('label[for=cssrsQ3]').find('div[class=requiredAsterisk]').remove();
		$('tr').has('label[for=cssrsQ4]').hide();
		$('#cssrsQ4').attr('required', false);
		$('tr').has('label[for=cssrsQ4]').find('div[class=requiredAsterisk]').remove();
		$('tr').has('label[for=cssrsQ5]').hide();
		$('#cssrsQ5').attr('required', false);
		$('tr').has('label[for=cssrsQ5]').find('div[class=requiredAsterisk]').remove();
		if($('#cssrsQ3').val() != ''){
			$('#cssrsQ3').val('');
		}
		if($('#cssrsQ4').val() != ''){
			$('#cssrsQ4').val('');
		}
		if($('#cssrsQ5').val() != ''){
			$('#cssrsQ5').val('');
		}
	}
	else{
		$('tr').has('label[for=cssrsQ3]').show();
		$('#cssrsQ3').attr('required', true);
		if($('div[id=cssrsTest]').find('label[for=cssrsQ3]').find('.requiredAsterisk').length == 0){
			$('div[id=cssrsTest]').find('label[for=cssrsQ3]').find('b').after('<div class=\'requiredAsterisk\' 	style=\'color:red;display:inline\'>*</div>');
		}
		$('tr').has('label[for=cssrsQ4]').show();
		$('#cssrsQ4').attr('required', true);
		if($('div[id=cssrsTest]').find('label[for=cssrsQ4]').find('.requiredAsterisk').length == 0){
			$('div[id=cssrsTest]').find('label[for=cssrsQ4]').find('b').after('<div class=\'requiredAsterisk\' 		style=\'color:red;display:inline\'>*</div>');
		}
		$('tr').has('label[for=cssrsQ5]').show();
		$('#cssrsQ5').attr('required', true);
			if($('div[id=cssrsTest]').find('label[for=cssrsQ5]').find('.requiredAsterisk').length == 0){
				$('div[id=cssrsTest]').find('label[for=cssrsQ5]').find('b').after('<div class=\'requiredAsterisk\' style=\'color:red;display:inline\'>*</div>');
		}
	}

	if($('#cssrsQ5').val() == 'Yes'){
		$('tr').has('label[for=cssrsQ5A]').show();
		$('#cssrsQ5A').attr('required', true);
		if($('div[id=cssrsTest]').find('label[for=cssrsQ5A]').find('.requiredAsterisk').length == 0){
			$('div[id=cssrsTest]').find('label[for=cssrsQ5A]').find('b').after('<div class=\'requiredAsterisk\' style=\'color:red;display:inline\'>*</div>');
		}
	}
	else{
		$('tr').has('label[for=cssrsQ5A]').hide();
		$('#cssrsQ5A').attr('required', false);
		$('tr').has('label[for=cssrsQ5A]').find('div[class=requiredAsterisk]').remove();
		if($('#cssrsQ5A').val() != ''){
			$('#cssrsQ5A').val('');
		}
	}
	
	if($('#cssrsQ6').val() == 'Yes'){
		$('tr').has('label[for=cssrsQ6A]').show();
		$('#cssrsQ6A').attr('required', true);
		if($('div[id=cssrsTest]').find('label[for=cssrsQ6A]').find('.requiredAsterisk').length == 0){
			$('div[id=cssrsTest]').find('label[for=cssrsQ6A]').find('b').after('<div class=\'requiredAsterisk\' style=\'color:red;display:inline\'>*</div>');
		}
	}
	else{
		$('tr').has('label[for=cssrsQ6A]').hide();
		$('#cssrsQ6A').attr('required', false);
		$('tr').has('label[for=cssrsQ6A]').find('div[class=requiredAsterisk]').remove();
		if($('#cssrsQ6A').val() != ''){
			$('#cssrsQ6A').val('');
		}
	}
}

$('document').ready(function(){
	$('tr').has('div[id=cssrsScore]').find('option').each(function(){this.setAttribute('text', this.outerText);});
	checkCSSRSPreviousScore();
	createCSSRS();
	checkCSSRSPerform();
	cssrsHideShows();

	$('tr').has('div[id=cssrs]').find('input').change(checkCSSRSPerform);
	$('.cssrsQuestions').change(calculateCSSRS);
	$('.cssrsQuestions').click(calculateCSSRS);
	$('.cssrsQuestions').change(cssrsHideShows);
});

//DLA-20
var dla20PreviousScore;
var dla20QuestionCount = 0;

function checkDLA20PreviousScore(){
	if($('tr').has('div[id=dla20Previous]').find('input')?.val() != ''){
		dla20PreviousScore = $('tr').has('div[id=dla20Previous]').find('b')[0]?.innerHTML;
	}
	if(!$.isNumeric(dla20PreviousScore)){
		$('tr').has('div[id=dla20Previous]').find('div').eq(1).text('9001');
		dla20PreviousScore = 9001;
	}
}

function createDLA20(){
	$('tr').has('div[id=dla20]').eq(0).next().after('<div id=\'dla20Test\'><div id=\'dla20Container\'></div><br><img src=\'/images/spacer.gif\' height=\'15\' width=\'1\'></div>');

	$('div[id=dla20Container]').html('<b>DLA 20</b></td></tr>' + '<table border=\'0\' cellspacing=\'10px\' table-layout=\'fixed\' width=\'' + tableWidths + '\'>' +
		'<tr><td><label for=dla20Q1 class=\'dla20Labels\'><b>1. Health Practices:</b></label></td><td><select id=\'dla20Q1\' class=\'dla20Questions\'><option value=\'\' selected disabled hidden>Select an Option</option><option value=\'1\'>1</option><option value=\'2\'>2</option><option value=\'3\'>3</option><option value=\'4\'>4</option><option value=\'5\'>5</option><option value=\'6\'>6</option><option value=\'7\'>7</option><option value=\'Did Not Answer\'>Did Not Answer</option></select></td></tr>' +
		'<tr><td><label for=dla20Q2 class=\'dla20Labels\'><b>2. Housing Stability, Maintenance:</b></label></td><td><select id=\'dla20Q2\' class=\'dla20Questions\'><option value=\'\' selected disabled hidden>Select an Option</option><option value=\'1\'>1</option><option value=\'2\'>2</option><option value=\'3\'>3</option><option value=\'4\'>4</option><option value=\'5\'>5</option><option value=\'6\'>6</option><option value=\'7\'>7</option><option value=\'Did Not Answer\'>Did Not Answer</option></select></td></tr>' +
		'<tr><td><label for=dla20Q3 class=\'dla20Labels\'><b>3. Communication:</b></label></td><td><select id=\'dla20Q3\' class=\'dla20Questions\'><option value=\'\' selected disabled hidden>Select an Option</option><option value=\'1\'>1</option><option value=\'2\'>2</option><option value=\'3\'>3</option><option value=\'4\'>4</option><option value=\'5\'>5</option><option value=\'6\'>6</option><option value=\'7\'>7</option><option value=\'Did Not Answer\'>Did Not Answer</option></select></td></tr>' +
		'<tr><td><label for=dla20Q4 class=\'dla20Labels\'><b>4. Safety:</b></label></td><td><select id=\'dla20Q4\' class=\'dla20Questions\'><option value=\'\' selected disabled hidden>Select an Option</option><option value=\'1\'>1</option><option value=\'2\'>2</option><option value=\'3\'>3</option><option value=\'4\'>4</option><option value=\'5\'>5</option><option value=\'6\'>6</option><option value=\'7\'>7</option><option value=\'Did Not Answer\'>Did Not Answer</option></select></td></tr>' +
		'<tr><td><label for=dla20Q5 class=\'dla20Labels\'><b>5. Managing Time:</b></label></td><td><select id=\'dla20Q5\' class=\'dla20Questions\'><option value=\'\' selected disabled hidden>Select an Option</option><option value=\'1\'>1</option><option value=\'2\'>2</option><option value=\'3\'>3</option><option value=\'4\'>4</option><option value=\'5\'>5</option><option value=\'6\'>6</option><option value=\'7\'>7</option><option value=\'Did Not Answer\'>Did Not Answer</option></select></td></tr>' +
		'<tr><td><label for=dla20Q6 class=\'dla20Labels\'><b>6. Managing Money:</b></label></td><td><select id=\'dla20Q6\' class=\'dla20Questions\'><option value=\'\' selected disabled hidden>Select an Option</option><option value=\'1\'>1</option><option value=\'2\'>2</option><option value=\'3\'>3</option><option value=\'4\'>4</option><option value=\'5\'>5</option><option value=\'6\'>6</option><option value=\'7\'>7</option><option value=\'Did Not Answer\'>Did Not Answer</option></select></td></tr>' +
		'<tr><td><label for=dla20Q7 class=\'dla20Labels\'><b>7. Nutrition:</b></label></td><td><select id=\'dla20Q7\' class=\'dla20Questions\'><option value=\'\' selected disabled hidden>Select an Option</option><option value=\'1\'>1</option><option value=\'2\'>2</option><option value=\'3\'>3</option><option value=\'4\'>4</option><option value=\'5\'>5</option><option value=\'6\'>6</option><option value=\'7\'>7</option><option value=\'Did Not Answer\'>Did Not Answer</option></select></td></tr>' +
		'<tr><td><label for=dla20Q8 class=\'dla20Labels\'><b>8. Problem Solving:</b></label></td><td><select id=\'dla20Q8\' class=\'dla20Questions\'><option value=\'\' selected disabled hidden>Select an Option</option><option value=\'1\'>1</option><option value=\'2\'>2</option><option value=\'3\'>3</option><option value=\'4\'>4</option><option value=\'5\'>5</option><option value=\'6\'>6</option><option value=\'7\'>7</option><option value=\'Did Not Answer\'>Did Not Answer</option></select></td></tr>' +
		'<tr><td><label for=dla20Q9 class=\'dla20Labels\'><b>9 Family Relationships:</b></label></td><td><select id=\'dla20Q9\' class=\'dla20Questions\'><option value=\'\' selected disabled hidden>Select an Option</option><option value=\'1\'>1</option><option value=\'2\'>2</option><option value=\'3\'>3</option><option value=\'4\'>4</option><option value=\'5\'>5</option><option value=\'6\'>6</option><option value=\'7\'>7</option><option value=\'Did Not Answer\'>Did Not Answer</option></select></td></tr>' +
		'<tr><td><label for=dla20Q10 class=\'dla20Labels\'><b>10. Alcohol/Drug Use:</b></label></td><td><select id=\'dla20Q10\' class=\'dla20Questions\'><option value=\'\' selected disabled hidden>Select an Option</option><option value=\'1\'>1</option><option value=\'2\'>2</option><option value=\'3\'>3</option><option value=\'4\'>4</option><option value=\'5\'>5</option><option value=\'6\'>6</option><option value=\'7\'>7</option><option value=\'Did Not Answer\'>Did Not Answer</option></select></td></tr>' +
		'<tr><td><label for=dla20Q11 class=\'dla20Labels\'><b>11. Leisure:</b></label></td><td><select id=\'dla20Q11\' class=\'dla20Questions\'><option value=\'\' selected disabled hidden>Select an Option</option><option value=\'1\'>1</option><option value=\'2\'>2</option><option value=\'3\'>3</option><option value=\'4\'>4</option><option value=\'5\'>5</option><option value=\'6\'>6</option><option value=\'7\'>7</option><option value=\'Did Not Answer\'>Did Not Answer</option></select></td></tr>' +
		'<tr><td><label for=dla20Q12 class=\'dla20Labels\'><b>12. Community Resources:</b></label></td><td><select id=\'dla20Q12\' class=\'dla20Questions\'><option value=\'\' selected disabled hidden>Select an Option</option><option value=\'1\'>1</option><option value=\'2\'>2</option><option value=\'3\'>3</option><option value=\'4\'>4</option><option value=\'5\'>5</option><option value=\'6\'>6</option><option value=\'7\'>7</option><option value=\'Did Not Answer\'>Did Not Answer</option></select></td></tr>' +
		'<tr><td><label for=dla20Q13 class=\'dla20Labels\'><b>13. Social Network:</b></label></td><td><select id=\'dla20Q13\' class=\'dla20Questions\'><option value=\'\' selected disabled hidden>Select an Option</option><option value=\'1\'>1</option><option value=\'2\'>2</option><option value=\'3\'>3</option><option value=\'4\'>4</option><option value=\'5\'>5</option><option value=\'6\'>6</option><option value=\'7\'>7</option><option value=\'Did Not Answer\'>Did Not Answer</option></select></td></tr>' +
		'<tr><td><label for=dla20Q14 class=\'dla20Labels\'><b>14. Sexuality:</b></label></td><td><select id=\'dla20Q14\' class=\'dla20Questions\'><option value=\'\' selected disabled hidden>Select an Option</option><option value=\'1\'>1</option><option value=\'2\'>2</option><option value=\'3\'>3</option><option value=\'4\'>4</option><option value=\'5\'>5</option><option value=\'6\'>6</option><option value=\'7\'>7</option><option value=\'Did Not Answer\'>Did Not Answer</option></select></td></tr>' +
		'<tr><td><label for=dla20Q15 class=\'dla20Labels\'><b>15. Productivity:</b></label></td><td><select id=\'dla20Q15\' class=\'dla20Questions\'><option value=\'\' selected disabled hidden>Select an Option</option><option value=\'1\'>1</option><option value=\'2\'>2</option><option value=\'3\'>3</option><option value=\'4\'>4</option><option value=\'5\'>5</option><option value=\'6\'>6</option><option value=\'7\'>7</option><option value=\'Did Not Answer\'>Did Not Answer</option></select></td></tr>' +
		'<tr><td><label for=dla20Q16 class=\'dla20Labels\'><b>16. Coping Skills:</b></label></td><td><select id=\'dla20Q16\' class=\'dla20Questions\'><option value=\'\' selected disabled hidden>Select an Option</option><option value=\'1\'>1</option><option value=\'2\'>2</option><option value=\'3\'>3</option><option value=\'4\'>4</option><option value=\'5\'>5</option><option value=\'6\'>6</option><option value=\'7\'>7</option><option value=\'Did Not Answer\'>Did Not Answer</option></select></td></tr>' +
		'<tr><td><label for=dla20Q17 class=\'dla20Labels\'><b>17. Behavior Norms:</b></label></td><td><select id=\'dla20Q17\' class=\'dla20Questions\'><option value=\'\' selected disabled hidden>Select an Option</option><option value=\'1\'>1</option><option value=\'2\'>2</option><option value=\'3\'>3</option><option value=\'4\'>4</option><option value=\'5\'>5</option><option value=\'6\'>6</option><option value=\'7\'>7</option><option value=\'Did Not Answer\'>Did Not Answer</option></select></td></tr>' +
		'<tr><td><label for=dla20Q18 class=\'dla20Labels\'><b>18. Personal Hygiene:</b></label></td><td><select id=\'dla20Q18\' class=\'dla20Questions\'><option value=\'\' selected disabled hidden>Select an Option</option><option value=\'1\'>1</option><option value=\'2\'>2</option><option value=\'3\'>3</option><option value=\'4\'>4</option><option value=\'5\'>5</option><option value=\'6\'>6</option><option value=\'7\'>7</option><option value=\'Did Not Answer\'>Did Not Answer</option></select></td></tr>' +
		'<tr><td><label for=dla20Q19 class=\'dla20Labels\'><b>19. Grooming:</b></label></td><td><select id=\'dla20Q19\' class=\'dla20Questions\'><option value=\'\' selected disabled hidden>Select an Option</option><option value=\'1\'>1</option><option value=\'2\'>2</option><option value=\'3\'>3</option><option value=\'4\'>4</option><option value=\'5\'>5</option><option value=\'6\'>6</option><option value=\'7\'>7</option><option value=\'Did Not Answer\'>Did Not Answer</option></select></td></tr>' +
		'<tr><td><label for=dla20Q20 class=\'dla20Labels\'><b>20. Dress:</b></label></td><td><select id=\'dla20Q20\' class=\'dla20Questions\'><option value=\'\' selected disabled hidden>Select an Option</option><option value=\'1\'>1</option><option value=\'2\'>2</option><option value=\'3\'>3</option><option value=\'4\'>4</option><option value=\'5\'>5</option><option value=\'6\'>6</option><option value=\'7\'>7</option><option value=\'Did Not Answer\'>Did Not Answer</option></select></td></tr>' + '</table>');
}

function checkDLA20Perform(){
	if($('answer[id=dla20Perform]').parent().prev().find('input').prop('checked')){
		$('div[id=dla20Test]').show();
		$('.dla20Questions').attr('required', true);
		if(!$('div[id=dla20Test]').find('div[class=requiredAsterisk]').length){
			$('div[id=dla20Test]').find('label[class=dla20Labels]').find('b').after('<div class=\'requiredAsterisk\' style=\'color:red;display:inline\'>*</div>');
		}
		$('tr').has('div[id=dla20Score]').find('input').prop('readonly', true);
		hideShow('show', 'dla20Score', true);
	}
	else if($('answer[id=dla20PreviousScore]').parent().prev().find('input').prop('checked')){
		$('div[id=dla20Test]').hide();
		$('.dla20Questions').attr('required', false);
		$('div[id=dla20Test]').find('div[class=requiredAsterisk]').remove();
		$('.dla20Questions').val('');
		$('tr').has('div[id=dla20Score]').find('input').prop('readonly', true);
		$('tr').has('div[id=dla20Score]').find('input').val(dla20PreviousScore);
		hideShow('hide', 'dla20Score', false);
	}
	else if($('answer[id=dla20Manual]').parent().prev().find('input').prop('checked')){
		$('div[id=dla20Test]').hide();
		$('.dla20Questions').attr('required', false);
		$('div[id=dla20Test]').find('div[class=requiredAsterisk]').remove();
		$('.dla20Questions').val('');
		$('tr').has('div[id=dla20Score]').find('input').prop('readonly', false);
		if($('tr').has('div[id=dla20Score]').find('input').val() != ''){
			$('tr').has('div[id=dla20Score]').find('input').val('');
		}
		hideShow('show', 'dla20Score', true);
	}
	else{
		$('div[id=dla20Test]').hide();
		$('.dla20Questions').attr('required', false);
		$('div[id=dla20Test]').find('div[class=requiredAsterisk]').remove();
		$('.dla20Questions').val('');
		$('tr').has('div[id=dla20Score]').find('input').prop('readonly', false);
		hideShow('hide', 'dla20Score', false);
	}
}

function calculateDLA20(){
	var scoreTotal = 0;
	var scoreAverage = 0;
	dla20QuestionCount = 0;

	$('.dla20Questions').each(function(){
		console.log($(this).val());
		if($(this).val() != '' && $(this).val() != 'Did Not Answer'){
			scoreTotal = scoreTotal + parseInt($(this).val());
			dla20QuestionCount++;
		}
	})

	scoreAverage = scoreTotal / dla20QuestionCount;

	$('tr').has('div[id=dla20Score]').find('input').val(scoreAverage);
}

$('document').ready(function(){
	checkDLA20PreviousScore();
	createDLA20();
	checkDLA20Perform();

	$('tr').has('div[id=dla20]').find('input').change(checkDLA20Perform);
	$('.dla20Questions').change(calculateDLA20);
	$('.dla20Questions').click(calculateDLA20);
	$('input[name=Complete]').click(function(e){
		if(dla20QuestionCount < 13 && $('answer[id=dla20Perform]').parent().prev().find('input').prop('checked')){
			e.preventDefault();
			alert('Please answer at least 13 questions on the DLA 20.');
		}
	});
});

//PHQ9
var phq9PreviousScore;
var phq9Score;

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

function checkPHQ9PreviousScore(){
	if($('tr').has('div[id=phq9Previous]').find('input')?.val() != ''){
		phq9PreviousScore = $('tr').has('div[id=phq9Previous]').find('b')[0]?.innerHTML;
	}
	if(!$.isNumeric(phq9PreviousScore)){
		$('tr').has('div[id=phq9Previous]').find('div').eq(1).text('27');
		phq9PreviousScore = 27;
	}
	if(phq9PreviousScore < 10){
		phq9PreviousScore = '0' + phq9PreviousScore;
	}
}

function createPHQ9(){
	$('tr').has('div[id=phq9]').eq(0).next().after('<div id=\'phq9Test\'><div id=\'phq9Container\'></div><br><img src=\'/images/spacer.gif\' height=\'15\' width=\'1\'></div>');

	$('div[id=phq9Container]').html('<b>PHQ9</b><br><br><i>Instructions: How often has client been bothered by each of the following symptoms during the past two weeks? For each symptom click the numeric push button the best describes how the client has been feeling.</i><br><br><i>0: Not At All</i><br><i>1: Several Days</i><br><i>2: More Than Half the Days</i><br><i>3: Nearly Every Day</i><br><br></td></tr>' + '<table border=\'0\' cellspacing=\'10px\' table-layout=\'fixed\' width=\'' + tableWidths + '\'>' +
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
	else if($('answer[id=phq9PreviousScore]').parent().prev().find('input').prop('checked')){
		$('div[id=phq9Test]').hide();
		$('.phq9Questions').attr('required', false);
		$('div[id=phq9Test]').find('div[class=requiredAsterisk]').remove();
		$('.phq9Questions').val('');
		$('.phq9BonusQuestions').val('');
		$('tr').has('div[id=phq9Score]').find('select').attr('disabled', true);
		$('tr').has('div[id=phq9Score]').find('select').val($('tr').has('div[id=phq9Score]').find('option[text=' + phq9PreviousScore + ']').val());
		phq9Score = phq9PreviousScore; 
		hideShow('hide', 'phq9Score', false);
		phq9Score = phq9PreviousScore;
		checkPositivePHQ9();
	}
	else if($('answer[id=phq9Manual]').parent().prev().find('input').prop('checked')){
		$('div[id=phq9Test]').hide();
		$('.phq9Questions').attr('required', false);
		$('div[id=phq9Test]').find('div[class=requiredAsterisk]').remove();
		$('.phq9Questions').val('');
		$('.phq9BonusQuestions').val('');
		$('tr').has('div[id=phq9Score]').find('select').attr('disabled', false);
		if($('tr').has('div[id=phq9Score]').find('select').val() != ''){
			$('tr').has('div[id=phq9Score]').find('select').val('');
			hideShow('show', 'phq9Score', true);
			phq9Score = '';
			checkPositivePHQ9();
		}
	}
	else{
		$('div[id=phq9Test]').hide();
		$('.phq9Questions').attr('required', false);
		$('div[id=phq9Test]').find('div[class=requiredAsterisk]').remove();
		$('.phq9Questions').val('');
		$('.phq9BonusQuestions').val('');
		$('tr').has('div[id=phq9Score]').find('select').attr('disabled', false);
		hideShow('hide', 'phq9Score', false);
		checkPositivePHQ9();
	}
}

function calculatePHQ9(){
	var scoreTotal = 0;

	$('.phq9Questions').each(function(){
		console.log($(this).val());
		if($(this).val() != '' && $(this).val() != 'Did Not Answer'){
			scoreTotal = scoreTotal + parseInt($(this).val());
		}
	})
	
	phq9Score = scoreTotal;

	if(scoreTotal < 10){
		scoreTotal = '0' + scoreTotal;
	}

	$('tr').has('div[id=phq9Score]').find('select').val($('tr').has('div[id=phq9Score]').find('option[text=' + scoreTotal + ']').val());
	$('tr').has('div[id=phq9Score]').find('select').trigger('change');
}

function checkManualPHQ9(){
	if($('answer[id=phq9Manual]').parent().prev().find('input').prop('checked')){
		phq9Score = parseInt($('tr').has('div[id=phq9Score]').find('option[value=' + $('tr').has('div[id=phq9Score]').find('select').val() + ']').attr('text'));
	}
}

function checkPositivePHQ9(){
	hideShow('hide', 'positiveScreening', false);
	hideShow('hide', 'depressionScreeningAdolescent', false);
	hideShow('hide', 'depressionScreeningAdult', false);
	hideShow('hide', 'sra', true);
	if(parseInt(phq9Score) > 9 && phq9Score != undefined){
		hideShow('show', 'positiveScreening', true);
		hideShow('show', 'sra', true);
		if(age > 10 && age < 18){
			hideShow('show', 'depressionScreeningAdolescent',true);
		}
		else if(age > 17){
			hideShow('show', 'depressionScreeningAdult',true);
		}
	}
}

$('document').ready(function(){
	$('tr').has('div[id=phq9Score]').find('option').each(function(){this.setAttribute('text', this.outerText);});
	checkPHQ9Age();
	checkPHQ9PreviousScore();
	createPHQ9();
	checkPHQ9Perform();
	checkPositivePHQ9();

	$('tr').has('div[id=phq9]').find('input').change(checkPHQ9Perform);
	$('.phq9Questions').change(calculatePHQ9);
	$('.phq9Questions').click(calculatePHQ9);
	$('tr').has('div[id=phq9Score]').find('select').change(checkManualPHQ9);
	$('tr').has('div[id=phq9Score]').find('select').change(checkPositivePHQ9);
	$('tr').has('div[id=phq9]').find('input').change(checkPositivePHQ9);
});

//Living Arrangement
var livingArrangement;
function checkLivingArragement(){
	let date = new Date();
	
	if($('tr').has('div[id=livingArrangement]').find('select').val() == ''){
		if(livingArrangement != ' '){
			$('tr').has('div[id=livingArrangement]').find('select').val($('tr').has('div[id=livingArrangement]').find('option[text=\'' + livingArrangement + '\']').val());
		}
		else{
			console.log('No previous living arrangement.');
		}
	}
	
	if($('tr').has('div[id=livingArrangement]').find('select').val() != $('tr').has('div[id=livingArrangement]').find('option[text=\'' + livingArrangement + '\']').val()){
		$('tr').has('div[id=dateLivingArrangementChanged]').find('input').val(
			((date.getMonth() + 1) < 10 ? '0' : '') + (date.getMonth() + 1) + '/' + (date.getDate() < 10 ? '0' : '') + date.getDate() + '/' + date.getFullYear()
		);
	}
	else if($('tr').has('div[id=livingArrangement]').find('select').val() == $('tr').has('div[id=livingArrangement]').find('option[text=\'' + livingArrangement + '\']').val()){
		$('tr').has('div[id=dateLivingArrangementChanged]').find('input').val('');
	}
}

$('document').ready(function(){
	$('tr').has('div[id=livingArrangement]').find('option').each(function(){this.setAttribute('text', this.outerText);});
	livingArrangement = $('tr').has('div[id=previousLivingArrangement]').find('font').text();
	$('tr').has('div[id=previousLivingArrangement]').find('input').val('');
	
	checkLivingArragement();
	
	$('tr').has('div[id=livingArrangement]').find('select').change(checkLivingArragement);
});

//Legal status
var legalStatusCounter;

function legalStatusNone(){
	if($('tr').has('div[id=legalStatus]').find('tr:contains(\'None\')').eq(1).find('input').prop('checked')){
		$('tr').has('div[id=legalStatus]').find('input').each(function(){
			$(this).prop('checked', false);
		});
		$('tr').has('div[id=legalStatus]').find('tr:contains(\'None\')').eq(1).find('input').prop('checked', true);
		checkLegalStatus();
	}
}

function legalStatusUnknown(){
	if($('tr').has('div[id=legalStatus]').find('tr:contains(\'Unknown\')').eq(1).find('input').prop('checked')){
		$('tr').has('div[id=legalStatus]').find('input').each(function(){
			$(this).prop('checked', false);
		});
		$('tr').has('div[id=legalStatus]').find('tr:contains(\'Unknown\')').eq(1).find('input').prop('checked', true);
		checkLegalStatus();
	}
}

$('document').ready(function(){
	$('tr').has('div[id=legalStatus]').find('tr:contains(\'None\')').eq(1).find('input').change(legalStatusNone);
	$('tr').has('div[id=legalStatus]').find('tr:contains(\'Unknown\')').eq(1).find('input').change(legalStatusUnknown);
	for(legalStatusCounter = 0; legalStatusCounter < $('tr').has('div[id=legalStatus]').find('input').length; legalStatusCounter++){
		if($('tr').has('div[id=legalStatus]').find('input').eq(legalStatusCounter).parents().eq(0).next(':contains(\'None\')').text() || $('tr').has('div[id=legalStatus]').find('input').eq(legalStatusCounter).parents().eq(0).next(':contains(\'Unknown\')').text()){
				
		}
		else{
			$('tr').has('div[id=legalStatus]').find('input').eq(legalStatusCounter).change(function(e){
				if (e.currentTarget.checked){
					$('tr').has('div[id=legalStatus]').find('tr:contains(\'None\')').eq(1).find('input').prop('checked', true);
					$('tr').has('div[id=legalStatus]').find('tr:contains(\'None\')').eq(1).find('input').trigger('click');
					$('tr').has('div[id=legalStatus]').find('tr:contains(\'Unknown\')').eq(1).find('input').prop('checked', true);
					$('tr').has('div[id=legalStatus]').find('tr:contains(\'Unknown\')').eq(1).find('input').trigger('click');
				}
			});
		}
	}
});

function checkLegalStatus (){
	if ($('tr').has('div[id=legalStatus]').find('input').eq(0).prop('checked') || $('tr').has('div[id=legalStatus]').find('input').eq(1).prop('checked')){
		$('td').has('div[id=sidNumberAvailable]').show();
		$('tr').has('div[id=sidNumberAvailable]').next().find('div').show();
		requireHidden (true, 'sidNumberAvailable');
		if(age >= 15){
			$('td').has('div[id=driversLicenseAvailable]').show();
			$('tr').has('div[id=driversLicenseAvailable]').next().find('div').show();
			requireHidden (true, 'driversLicenseAvailable');
		}
		else{
			$('td').has('div[id=driversLicenseAvailable]').hide();
			$('tr').has('div[id=driversLicenseAvailable]').next().find('div').hide();
			requireHidden (false, 'driversLicenseAvailable');
		}
	}
	else{
		$('td').has('div[id=sidNumberAvailable]').hide();
		$('tr').has('div[id=sidNumberAvailable]').next().find('div').hide();
		requireHidden (false, 'sidNumberAvailable');
		$('td').has('div[id=driversLicenseAvailable]').hide();
		$('tr').has('div[id=driversLicenseAvailable]').next().find('div').hide();
		requireHidden (false, 'driversLicenseAvailable');
	}
}

function checkDriversLicense (){
	if ($('tr').has('div[id=driversLicenseAvailable]').find('tr:contains(\'Yes\')').eq(1).find('input').prop('checked')){
		$('td').has('div[id=driversLicense]').show();
		$('tr').has('div[id=driversLicense]').next().find('div').show();
		requireHidden (true, 'driversLicense');
		if($('tr').has('div[id=driversLicense]').find('input').val() == '9999999'){
			$('tr').has('div[id=driversLicense]').find('input').val('');
		}
	}
	else{
		$('td').has('div[id=driversLicense]').hide();
		$('tr').has('div[id=driversLicense]').next().find('div').hide();
		requireHidden (false, 'driversLicense');
		$('tr').has('div[id=driversLicense]').find('input').val('9999999');
	}
}

function checkSidNumber (){
	if ($('tr').has('div[id=sidNumberAvailable]').find('tr:contains(\'Yes\')').eq(1).find('input').prop('checked')){
		$('td').has('div[id=sidNumber]').show();
		$('tr').has('div[id=sidNumber]').next().find('div').show();
		requireHidden (true, 'sidNumber');
		if($('tr').has('div[id=sidNumber]').find('input').val() == '9999999'){
			$('tr').has('div[id=sidNumber]').find('input').val('');
		}
	}
	else{
		$('td').has('div[id=sidNumber]').hide();
		$('tr').has('div[id=sidNumber]').next().find('div').hide();
		requireHidden (false, 'sidNumber');
		$('tr').has('div[id=sidNumber]').find('input').val('9999999');
	}
}

$('document').ready(function (){
	checkLegalStatus();
	checkDriversLicense();
	checkSidNumber();
	$('tr').has('div[id=legalStatus]').find('input').change(checkLegalStatus);
	$('tr').has('div[id=driversLicenseAvailable]').find('input').change(checkDriversLicense);
	$('tr').has('div[id=sidNumberAvailable]').find('input').change(checkSidNumber);
});

//Signatures
var initialized = false;  

function signatureDisclaimers(){ 
	if (initialized == false){ 
		$('img[id=add_signature_1_img]').click(function(){ 
			alert('Make sure to enter the client/legal guardian\'s full name in the text box. If capturing verbal consent, also include verbal consent in the text box.'); 
		});    
		initialized = true;  
		console.log('Added signature disclaimers.'); 
	} 
}  

function waitForElement (selector, callback, maxTimes = false){ 
	if (maxTimes != false){ 
		maxTimes--; 
	} 
	console.log('Attempt'); 
	if($(selector).length){ 
		callback(); 
		console.log('Finished'); 
	} 
	else{ 
		if (maxTimes === false || maxTimes > 0){ 
			setTimeout(function(){ 
				console.log('Waiting'); 
				waitForElement(selector, callback, maxTimes); 
			}, 100); 
		} 
		else{ 
			console.log('Max attempts reached, giving up.'); 
		} 
	} 
}  

function customCallBack (){ 
	console.log('It\'s here!'); 
	signatureDisclaimers(); 
}  

$(document).ready(function(){ 
	$('input[type=submit]').click(function(e){ 
	if($('#add_signature_1_img').attr('title') == undefined || $('#add_signature_1_img').attr('title') == 'signature placeholder') {  
		e.preventDefault();  alert('Please capture client signature.');  
	}    
});   
	
	waitForElement('img[id=add_signature_1_img]', customCallBack, 10); 
});

//Edit embedded signature titles
$(window).bind('load', function (){ 
	$('#add_signature_1').find('h3').text('Client/Legal Guardian Signature'); 
});

//Set dates
function setFields () {
	var today = new Date();     
	var dateString = (today.getMonth()+1) + '/' + today.getDate() + '/' + today.getFullYear();                   
	if($('tr').has('div[id=treatmentStatus]').find('b').text() != 'Active'){
		if ($('tr').has('div[id=episodeCurrent]').find('b').text() == 'False'){
			if ($('tr').has('div[id=date]').find('input').attr('value') == ''){
				$('tr').has('div[id=date]').find('input').attr('data-value', dateString);             
				$('tr').has('div[id=date]').find('input').attr('value', dateString);
			}         
		}     
	}
	if($('tr').has('div[id=episodeCurrent]').find('b').text() == 'False'){
		$('tr').has('div[id=setEpisodeCurrent]').find('input').attr('value', '1');          
	}  
}    

$(document).ready(function(){
	$('input[type=submit]').click(setFields);  
});

//Allow tooltips to display html
$('document').ready(function(){ 
	$('div, input, select, tr').tooltip({ 
		content: function(){ 
			return this.getAttribute('title'); 
		}, 
	});
 });

 //Informed Consent
function toggleConsentYes(){
	if($('tr').has('div[id=consentClientYes]').find('input').prop('checked')){
		if($('tr').has('div[id=consentClientNo]').find('input').prop('checked')){
			$('tr').has('div[id=consentClientNo]').find('input').prop('checked', true);
			$('tr').has('div[id=consentClientNo]').find('input').trigger('click');
		}
	}	
}

function toggleConsentNo(){
	if($('tr').has('div[id=consentClientNo]').find('input').prop('checked')){
		if($('tr').has('div[id=consentClientYes]').find('input').prop('checked')){
			$('tr').has('div[id=consentClientYes]').find('input').prop('checked', true);
			$('tr').has('div[id=consentClientYes]').find('input').trigger('click');
		}
	}
}

 function checkConsent(e){
	if(!$('tr').has('div[id=consentClientYes]').find('input').prop('checked') && !$('tr').has('div[id=consentClientNo]').find('input').prop('checked')){
		e.preventDefault();
		$([document.documentElement, document.body]).animate({scrollTop: $('#informedConsentLabel').offset().top},);
		alert('Please complete Informed Consent section.');
	}
 }

 $('document').ready(function(){ 
	toggleConsentYes();
	toggleConsentNo();

	$('tr').has('div[id=consentClientYes]').find('input').click(toggleConsentYes);
	$('tr').has('div[id=consentClientNo]').find('input').click(toggleConsentNo);

	$('input[name=Complete]').click(checkConsent);
 });

// Adds responsivity *helper function to responsiveElement()*
function responsiveFunctionality(selector, maxWidth="40vw", tabletWidth="65vw", mobileWidth="80vw", tabletBreak=810, mobileBreak=645, parentSelector=null){
	if (parentSelector === null){
		if ($(window).innerWidth() > tabletBreak){ 
			$(selector).width(maxWidth);
		}
		else if ($(window).innerWidth() > mobileBreak){
			$(selector).width(tabletWidth);
		}
		else{
			$(selector).width(mobileWidth);
		}
	}
	else{
		if ($(window).innerWidth() - 10 > tabletBreak){ 
			$(selector).width(largeWidth);
		}
		else if ($(window).innerWidth() - 10 > mobileBreak){
			$(selector).parents(parentSelector).width(tabletWidth);
		}
		else{
			$(selector).parents(parentSelector).width(mobileWidth);
		}
	}
}

// Makes a given selector responsive with width and breakpoint options and targetable parent selectors.
function responsiveElement(selector, maxWidth="40vw", tabletWidth="65vw", mobileWidth="80vw", tabletBreak=810, mobileBreak=645, parentSelector=null){
	responsiveFunctionality(selector, maxWidth, tabletWidth, mobileWidth, tabletBreak, mobileBreak, parentSelector);

	// Update width according to resized window
	$(window).resize(function(){
		responsiveFunctionality(selector, maxWidth, tabletWidth, mobileWidth, tabletBreak, mobileBreak, parentSelector);
	});
}

// Level of Care Description auto width

$('document').ready(function(){
	responsiveElement("#locDesc", parentSelector="table:first");
});

$('document').ready(function(){
// Check Clinical Formulation by default
	$('tr').has('div[id=clinicalFormulation]').find('input').trigger('click');

	// Check Consent Staff by default
	$('tr').has('div[id="consentStaff"]').find('input').prop('checked', true);
});

//Allergy
const allergyURL = 'https://www.cbh3.crediblebh.com/client/client_allergy.aspx?client_id=';

function setAllergyFrame(frame)
{
	$('#' + frame).attr('src', allergyURL + cid);
	
	setTimeout(function()
	{
		$('#' + frame).prop('scrolling', 'yes');
		$('#' + frame).css('overflow', 'scroll');
	}, 100);
}

$('document').ready(function()
{
	setAllergyFrame('allergyModule');
	
	$('#allergyModule').load(function(){
		$('#allergyModule').contents().find('#navigationPanel').hide();
	});
});

//Medication
const medicationURL = 'https://www.cbh3.crediblebh.com/client/client_meds_new.aspx?client_id=';

function setMedicationFrame(frame)
{
	$('#' + frame).attr('src', medicationURL + cid);
	
	setTimeout(function()
	{
		$('#' + frame).prop('scrolling', 'yes');
		$('#' + frame).css('overflow', 'scroll');
	}, 100);
}

$('document').ready(function()
{
	setMedicationFrame('medicationModule');
	
	$('#medicationModule').load(function(){
		$('#medicationModule').contents().find('#navigationPanel').hide();
	});
});

//Supported Stuff
var referralSupported;

function checkSupported(){
	referralSupported = false;

	$('tr').has('div[id=referralsInternal]').find('tr:contains(\'Supported\')').eq(1).css('background-color', 'white');

	if($('tr').has('div[id=supportedEducation]').find('select').val() == $('tr').has('div[id=supportedEducation]').find('option[text*=YES]').val() || $('tr').has('div[id=supportedEmployment]').find('select').val() == $('tr').has('div[id=supportedEmployment]').find('option[text*=YES]').val()){
		alert('Consider a Supported Employment/Education referral');
		if(!$('tr').has('div[id=referrals]').find('tr:contains(\'Internal\')').eq(1).find('input').prop('checked')){
			$('tr').has('div[id=referrals]').find('tr:contains(\'Internal\')').eq(1).find('input').trigger('click');
		}
		if(!$('tr').has('div[id=referralsInternal]').find('tr:contains(\'Supported\')').eq(1).find('input').prop('checked')){
			$('tr').has('div[id=referralsInternal]').find('tr:contains(\'Supported\')').eq(1).css('background-color', 'yellow');
			referralSupported = true;
		}
	}
}

$('document').ready(function(){
	$('tr').has('div[id=supportedEducation]').find('option').each(function(){this.setAttribute('text', this.outerText);});
	$('tr').has('div[id=supportedEmployment]').find('option').each(function(){this.setAttribute('text', this.outerText);});
	checkSupported();

	$('tr').has('div[id=supportedEducation]').find('select').change(checkSupported);
	$('tr').has('div[id=supportedEmployment]').find('select').change(checkSupported);
	$('tr').has('div[id=supportedEducation]').find('select').change(checkReferralAlert);
	$('tr').has('div[id=supportedEmployment]').find('select').change(checkReferralAlert);
});

//Referral empty check
function checkEmptyReferrals(){
	var internalReferralsChecked;
	var externalReferralsChecked;

	if(!$('tr').has('div[id=referralsInternal]').find('input').is(':checked')){
		internalReferralsChecked = false;
		if($('tr').has('div[id=referrals]').find('tr:contains(\'Internal\')').eq(1).find('input').prop('checked')){
			$('tr').has('div[id=referrals]').find('tr:contains(\'Internal\')').eq(1).find('input').trigger('click');
		}
	}
	else{
		internalReferralsChecked = true;
	}

	if(!$('tr').has('div[id=referralsExternal]').find('input').is(':checked')){
		var externalReferralsChecked = false;
		if($('tr').has('div[id=referrals]').find('tr:contains(\'External\')').eq(1).find('input').prop('checked')){
			$('tr').has('div[id=referrals]').find('tr:contains(\'External\')').eq(1).find('input').trigger('click');
		}
	}
	else{
		externalReferralsChecked = true;
	}

	if(!internalReferralsChecked && !externalReferralsChecked){
		if(!$('tr').has('div[id=referrals]').find('tr:contains(\'None\')').eq(1).find('input').prop('checked')){
			$('tr').has('div[id=referrals]').find('tr:contains(\'None\')').eq(1).find('input').trigger('click');
		}
	}
}

$('document').ready(function(){
	$('input[name=Complete]').click(checkEmptyReferrals);
});