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
		if(!$('tr').has('referrals').find('tr:contains(\'Internal\')').eq(1).find('input').prop('checked')){
			$('tr').has('referrals').find('tr:contains(\'Internal\')').eq(1).find('input').trigger('click');
			if(!$('tr').has('referralsInternal').find('tr:contains(\'SUDS\')').eq(1).find('input').prop('checked')){
				$('tr').has('referralsInternal').find('tr:contains(\'SUDS\')').eq(1).find('input').trigger('click');
			}
		}
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

//DLA-20
var dla20PreviousScore;

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

	$('div[id=dla20Container]').html('<b>DLA 20</b></td></tr>' + '<table border=\'0\' cellspacing=\'10px\'>' +
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
	}
	else if($('answer[id=dla20PreviousScore]').parent().prev().find('input').prop('checked')){
		$('div[id=dla20Test]').hide();
		$('.dla20Questions').attr('required', false);
		$('div[id=dla20Test]').find('div[class=requiredAsterisk]').remove();
		$('.dla20Questions').val('');
		$('tr').has('div[id=dla20Score]').find('input').prop('readonly', true);
		$('tr').has('div[id=dla20Score]').find('input').val(dla20PreviousScore);
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
	}
	else{
		$('div[id=dla20Test]').hide();
		$('.dla20Questions').attr('required', false);
		$('div[id=dla20Test]').find('div[class=requiredAsterisk]').remove();
		$('.dla20Questions').val('');
		$('tr').has('div[id=dla20Score]').find('input').prop('readonly', false);
	}
}

function calculateDLA20(){
	var scoreTotal = 0;
	var questionsAnswered = 0;
	var scoreAverage = 0;

	$('.dla20Questions').each(function(){
		console.log($(this).val());
		if($(this).val() != '' && $(this).val() != 'Did Not Answer'){
			scoreTotal = scoreTotal + parseInt($(this).val());
			questionsAnswered++;
		}
		else if($(this).val() == 'Did Not Answer'){
			questionsAnswered++;
		}
	})

	scoreAverage = scoreTotal / questionsAnswered;

	$('tr').has('div[id=dla20Score]').find('input').val(scoreAverage);
}

$('document').ready(function(){
	checkDLA20PreviousScore();
	createDLA20();
	checkDLA20Perform();

	$('tr').has('div[id=dla20]').find('input').change(checkDLA20Perform);
	$('.dla20Questions').change(calculateDLA20);
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
			alert('Make sure to enter the client\'s full name in the text box. If capturing verbal consent, also include verbal consent in the text box.'); 
		});  
		$('img[id=add_signature_2_img]').click(function(){ 
			alert('Make sure to enter the legal guardian\'s full name in the text box. If capturing verbal consent, also include verbal consent in the text box.'); 
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
		if(( $('#add_signature_1_img').attr('title') == undefined || $('#add_signature_1_img').attr('title') == 'signature placeholder' ) && ( $('#add_signature_2_img').attr('title') == undefined || $('#add_signature_2_img').attr('title') == 'signature placeholder' ) ) {  
			if($('tr').has('div[id=guardianRequiredDriver]').find('tr:contains(\'Yes\')').eq(1).find('input').prop('checked') == true){

			}  
			else {  
				e.preventDefault();  alert('Please capture client signature.');  
			}  
		}    
		if($('tr').has('div[id=guardianRequiredDriver]').find('tr:contains(\'Yes\')').eq(1).find('input').prop('checked') == true) {  
			if($('#add_signature_2_img').attr('title') == undefined || $('#add_signature_2_img').attr('title') == 'signature placeholder') {  
				e.preventDefault();  
				alert('Please capture legal guardian signature.');  
			}  
		} 
	});   
	
	waitForElement('img[id=add_signature_1_img]', customCallBack, 10); 
});

//Edit embedded signature titles
$(window).bind('load', function (){ 
	$('#add_signature_1').find('h3').text('Client Signature'); 
	$('#add_signature_2').find('h3').text('Legal Guardian Signature'); 
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