var test1;
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

//Hide hideOnLoad
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
		$('tr').has('div[id=tobaccoCessation]').find('select').val('');

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
		console.log('Consider a SUD Referral.');
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

	if(referralSupportedEducation){
		hideShow('show', 'referralsAlert', false);
	}

	if(referralSupportedEmployment){
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
			console.log('Total DUII Arrests have to be greater than or equal to Number of DUII Arrests in Past Month');
		}
		
		if($('tr').has('div[id=arrests]').find('input').val() < (parseInt($('tr').has('div[id=duiiArrests]').find('input').val()) + parseInt($('tr').has('div[id=arrestsPastMonth]').find('input').val()))){
			e.preventDefault();
			console.log('Total Arrests have to be greater than or equal to Total DUII Arrests and Number of Arrests in Past Month');
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
			console.log('Make sure to enter the client/legal guardian\'s full name in the text box. If capturing verbal consent, also include verbal consent in the text box.'); 
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

function requireSignature(e){
	if($('#add_signature_1_img').attr('title') == undefined || $('#add_signature_1_img').attr('title') == 'signature placeholder') {  
		//e.preventDefault();  
		console.log('Please capture client/legal guardian signature.');  
	}
}

$(document).ready(function(){ 
	$('input[name=Complete]').click(requireSignature);   
	
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
		//e.preventDefault();
		$([document.documentElement, document.body]).animate({scrollTop: $('#informedConsentLabel').offset().top},);
		console.log('Please complete Informed Consent section.');
	}
 }

 $('document').ready(function(){ 
	toggleConsentYes();
	toggleConsentNo();

	$('tr').has('div[id=consentClientYes]').find('input').click(toggleConsentYes);
	$('tr').has('div[id=consentClientNo]').find('input').click(toggleConsentNo);

	$('input[name=Complete]').click(checkConsent);
 });

// Level of Care Description auto width

function responsiveElement(selector, tabletBreak=810, mobileBreak=645, largeWidth="40vw", tabletWidth="65vw", mobileWidth="80vw"){
	// Set initial width
	if ($(window).width() > tabletBreak){ 
		$(selector).width(largeWidth);
	}
	else if ($(window).width() > mobileBreak){
		$(selector).width(tabletWidth);
	}
	else{
		$(selector).width(mobileWidth);
	}

	// Update width according to resized window
	$(window).resize(function(){
		if ($(window).width() > tabletBreak){ 
			$(selector).width(largeWidth);
		}
		else if ($(window).width() > mobileBreak){
			$(selector).width(tabletWidth);
		}
		else{
			$(selector).width(mobileWidth);
		}
	});
}

function responsiveParent(selector, parentSelector){
	// Set initial width
	if ($(window).width() > 810){ 
		$(selector).parents(parentSelector).width("40vw");
	}
	else if ($(window).width() > 645){
		$(selector).parents(parentSelector).width("65vw");
	}
	else{
		$(selector).parents(parentSelector).width("80vw");
	}

	// Update width according to resized window
	$(window).resize(function(){
		if ($(window).width() > 810){ 
			$(selector).parents(parentSelector).width("40vw");
		}
		else if ($(window).width() > 645){
			$(selector).parents(parentSelector).width("65vw");
		}
		else{
			$(selector).parents(parentSelector).width("80vw");
		}
	});
}

$('document').ready(function(){;
	responsiveParent("#locDesc", "table:first");
});

$('document').ready(function(){
	// Check Reasons for Seeking Care by default
	if(!$('tr').has('div[id=reasonsSeekingCare]').find('input').prop('checked')){
		$('tr').has('div[id=reasonsSeekingCare]').find('input').trigger('click');
		requireHiddenNotes('reasonsSeekingCare', true);
	}

	// Check Clinical Formulation by default
	if(!$('tr').has('div[id=clinicalFormulation]').find('input').prop('checked')){
		$('tr').has('div[id=clinicalFormulation]').find('input').trigger('click');
		requireHiddenNotes('clinicalFormulation', true);
	}

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
var referralSupportedEducation;
var referralSupportedEmployment;

function checkSupportedEducation(){
	referralSupportedEducation = false;

	$('tr').has('div[id=referralsInternal]').find('tr:contains(\'Supported\')').eq(1).css('background-color', 'white');

	if($('tr').has('div[id=supportedEducation]').find('select').val() == $('tr').has('div[id=supportedEducation]').find('option[text*=YES]').val()){
		console.log('Please consider a supported education referral');
		if(!$('tr').has('div[id=referrals]').find('tr:contains(\'Internal\')').eq(1).find('input').prop('checked')){
			$('tr').has('div[id=referrals]').find('tr:contains(\'Internal\')').eq(1).find('input').trigger('click');
		}
		if(!$('tr').has('div[id=referralsInternal]').find('tr:contains(\'Supported\')').eq(1).find('input').prop('checked')){
			$('tr').has('div[id=referralsInternal]').find('tr:contains(\'Supported\')').eq(1).css('background-color', 'yellow');
			referralSupportedEducation = true;
		}
	}

	
}

function checkSupportedEmployment(){
	referralSupportedEmployment = false;

	$('tr').has('div[id=referralsInternal]').find('tr:contains(\'Supported\')').eq(1).css('background-color', 'white');
	
	if($('tr').has('div[id=supportedEmployment]').find('select').val() == $('tr').has('div[id=supportedEmployment]').find('option[text*=YES]').val()){
		console.log('Please consider a supported employment referral');
		if(!$('tr').has('div[id=referrals]').find('tr:contains(\'Internal\')').eq(1).find('input').prop('checked')){
			$('tr').has('div[id=referrals]').find('tr:contains(\'Internal\')').eq(1).find('input').trigger('click');
		}
		if(!$('tr').has('div[id=referralsInternal]').find('tr:contains(\'Supported\')').eq(1).find('input').prop('checked')){
			$('tr').has('div[id=referralsInternal]').find('tr:contains(\'Supported\')').eq(1).css('background-color', 'yellow');
			referralSupportedEmployment = true;
		}
	}
}

$('document').ready(function(){
	$('tr').has('div[id=supportedEducation]').find('option').each(function(){this.setAttribute('text', this.outerText);});
	$('tr').has('div[id=supportedEmployment]').find('option').each(function(){this.setAttribute('text', this.outerText);});
	checkSupportedEducation();
	checkSupportedEmployment();

	$('tr').has('div[id=supportedEducation]').find('select').change(checkSupportedEducation);
	$('tr').has('div[id=supportedEmployment]').find('select').change(checkSupportedEmployment);
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

//MDD
var requireCSSRS;
var requirePHQ9;

function checkMDD(){
	requireCSSRS = false;
	requirePHQ9 = false;

	hideShow('hide', 'mddDx');
	if($('tr').has('div[id=evalType]').find('tr:contains(\'Annual Evaluation\')').eq(1).find('input').prop('checked')){
		hideShow('show', 'mddDx');
		if($('tr').has('div[id=mddDx]').find('tr:contains(\'Yes\')').eq(1).find('input').prop('checked')){
			requirePHQ9 = true;
		}
	}
	if($('tr').has('div[id=mddDx]').find('tr:contains(\'Yes\')').eq(1).find('input').prop('checked')){
		requireCSSRS = true;
	}
}

$('document').ready(function(){
	checkMDD();

	$('tr').has('div[id=evalType]').find('input').change(checkMDD);
	$('tr').has('div[id=evalType]').find('input').click(checkMDD);

	$('tr').has('div[id=mddDx]').find('input').change(checkMDD);
	$('tr').has('div[id=mddDx]').find('input').click(checkMDD);
});

//Tooltips
$('document').ready(function(){ 
	$('tr').find('div[id=presentForAppointment]').attr('title', 'Client must be present for evaluation to be valid'); 
	$('tr').find('div[id=presentForAppointment]').tooltip(); 
	$('tr').find('div[id=reasonsSeekingCare]').attr('title', 'Presenting problem(s), onset, frequency, intensity, and duration of symptoms'); 
	$('tr').find('div[id=reasonsSeekingCare]').tooltip(); 
	$('tr').find('div[id=currentMedications]').attr('title', 'Including prescriptions, over the counter, herbal/home remedies, vitamins/supplements, and/or other substances affecting psychopharmacology'); 
	$('tr').find('div[id=currentMedications]').tooltip(); 
	$('tr').find('div[id=situationalDangers]').attr('title', 'e.g., assault/threat, homelessness, emotional/physical trauma, domestic abuse, child abuse'); 
	$('tr').find('div[id=situationalDangers]').tooltip(); 
	$('tr').find('div[id=medicalNeeds]').attr('title', 'Unmet needs for Primary Care Provider, appointments, or referral(s)'); 
	$('tr').find('div[id=medicalNeeds]').tooltip();  
});

//Sync DLA20 Score
function syncDLA20(){
	$('tr').has('div[id=dla20Score]').find('input').val($('#dlaInline').contents().find('tr').has('div[id=dla20A]').find('input').val());
	$('tr').has('div[id=dla20Score]').find('input').trigger('change');
}

$('document').ready(function(){
	syncDLA20();

	$('#dlaInline').contents().find('tr').has('div[class=dla20Q]').find('select').change(syncDLA20);
});

//Pathway
function checkPathway(){
	if($('tr').has('div[id=levelOfTrauma]').find('tr:contains(\'Single trauma\')').eq(1).find('input').prop('checked')){
		if($('tr').has('div[id=dla20Score]').find('input').val() > 4 && $('tr').has('div[id=dla20Score]').find('input').val() <= 7 && $('tr').has('div[id=dla20Score]').find('input').val() != ''){
			if($('tr').has('div[id=aceScore]').find('input').val() <= 3 && $('tr').has('div[id=aceScore]').find('input').val() != ''){
				if($('tr').has('div[id=motivationForChange]').find('select').val() == $('tr').has('div[id=motivationForChange]').find('option').filter(function (){return $(this).html() == 'Precontemplation';}).val() || $('tr').has('div[id=motivationForChange]').find('select').val() == $('tr').has('div[id=motivationForChange]').find('option').filter(function (){return $(this).html() == 'Contemplation';}).val()){
					$('tr').has('div[id=pathwayIndicated]').find('select').val($('tr').has('div[id=pathwayIndicated]').find('option').filter(function (){return $(this).html().includes('Pathway 3');}).val());
				}
				else if($('tr').has('div[id=motivationForChange]').find('select').val() == $('tr').has('div[id=motivationForChange]').find('option').filter(function (){return $(this).html() == 'Determination';}).val() || $('tr').has('div[id=motivationForChange]').find('select').val() == $('tr').has('div[id=motivationForChange]').find('option').filter(function (){return $(this).html() == 'Action';}).val()){
					$('tr').has('div[id=pathwayIndicated]').find('select').val($('tr').has('div[id=pathwayIndicated]').find('option').filter(function (){return $(this).html().includes('Pathway 4');}).val());
				}
			}
			else if($('tr').has('div[id=aceScore]').find('input').val() > 3 && $('tr').has('div[id=aceScore]').find('input').val() != ''){
				//No pathway?
			}
		}
		else{
			//No pathway?
		}
	}
	if($('tr').has('div[id=levelOfTrauma]').find('tr:contains(\'Repeeated trauma\')').eq(1).find('input').prop('checked')){
		if($('tr').has('div[id=aceScore]').find('input').val() <= 3 && $('tr').has('div[id=aceScore]').find('input').val() != ''){
			if($('tr').has('div[id=dla20Score]').find('input').val() > 4 && $('tr').has('div[id=dla20Score]').find('input').val() <= 7 && $('tr').has('div[id=dla20Score]').find('input').val() != ''){
				if($('tr').has('div[id=motivationForChange]').find('select').val() == $('tr').has('div[id=motivationForChange]').find('option').filter(function (){return $(this).html() == 'Precontemplation';}).val() || $('tr').has('div[id=motivationForChange]').find('select').val() == $('tr').has('div[id=motivationForChange]').find('option').filter(function (){return $(this).html() == 'Contemplation';}).val()){
					$('tr').has('div[id=pathwayIndicated]').find('select').val($('tr').has('div[id=pathwayIndicated]').find('option').filter(function (){return $(this).html().includes('Pathway 3');}).val());
				}
				else if($('tr').has('div[id=motivationForChange]').find('select').val() == $('tr').has('div[id=motivationForChange]').find('option').filter(function (){return $(this).html() == 'Determination';}).val() || $('tr').has('div[id=motivationForChange]').find('select').val() == $('tr').has('div[id=motivationForChange]').find('option').filter(function (){return $(this).html() == 'Action';}).val()){
					$('tr').has('div[id=pathwayIndicated]').find('select').val($('tr').has('div[id=pathwayIndicated]').find('option').filter(function (){return $(this).html().includes('Pathway 4');}).val());
				}
			}
			else{
				//No pathway?
			}
		}
		else if($('tr').has('div[id=aceScore]').find('input').val() > 3 && $('tr').has('div[id=aceScore]').find('input').val() != ''){
			if($('tr').has('div[id=dla20Score]').find('input').val() > 2 && $('tr').has('div[id=dla20Score]').find('input').val() <= 5 && $('tr').has('div[id=dla20Score]').find('input').val() != ''){
				if($('tr').has('div[id=motivationForChange]').find('select').val() == $('tr').has('div[id=motivationForChange]').find('option').filter(function (){return $(this).html() == 'Precontemplation';}).val() || $('tr').has('div[id=motivationForChange]').find('select').val() == $('tr').has('div[id=motivationForChange]').find('option').filter(function (){return $(this).html() == 'Contemplation';}).val()){
					$('tr').has('div[id=pathwayIndicated]').find('select').val($('tr').has('div[id=pathwayIndicated]').find('option').filter(function (){return $(this).html().includes('Pathway 1');}).val());
				}
				else if($('tr').has('div[id=motivationForChange]').find('select').val() == $('tr').has('div[id=motivationForChange]').find('option').filter(function (){return $(this).html() == 'Determination';}).val() || $('tr').has('div[id=motivationForChange]').find('select').val() == $('tr').has('div[id=motivationForChange]').find('option').filter(function (){return $(this).html() == 'Action';}).val()){
					$('tr').has('div[id=pathwayIndicated]').find('select').val($('tr').has('div[id=pathwayIndicated]').find('option').filter(function (){return $(this).html().includes('Pathway 2');}).val());
				}
			}
			else{
				//No pathway?
			}
		}
	}
	if($('tr').has('div[id=levelOfTrauma]').find('tr:contains(\'Extended trauma\')').eq(1).find('input').prop('checked')){
		if($('tr').has('div[id=dla20Score]').find('input').val() > 2 && $('tr').has('div[id=dla20Score]').find('input').val() <= 5 && $('tr').has('div[id=dla20Score]').find('input').val() != ''){
			if($('tr').has('div[id=aceScore]').find('input').val() <= 3 && $('tr').has('div[id=aceScore]').find('input').val() != ''){
				//No pathway?
			}
			else if($('tr').has('div[id=aceScore]').find('input').val() > 3 && $('tr').has('div[id=aceScore]').find('input').val() != ''){
				if($('tr').has('div[id=motivationForChange]').find('select').val() == $('tr').has('div[id=motivationForChange]').find('option').filter(function (){return $(this).html() == 'Precontemplation';}).val() || $('tr').has('div[id=motivationForChange]').find('select').val() == $('tr').has('div[id=motivationForChange]').find('option').filter(function (){return $(this).html() == 'Contemplation';}).val()){
					$('tr').has('div[id=pathwayIndicated]').find('select').val($('tr').has('div[id=pathwayIndicated]').find('option').filter(function (){return $(this).html().includes('Pathway 1');}).val());
				}
				else if($('tr').has('div[id=motivationForChange]').find('select').val() == $('tr').has('div[id=motivationForChange]').find('option').filter(function (){return $(this).html() == 'Determination';}).val() || $('tr').has('div[id=motivationForChange]').find('select').val() == $('tr').has('div[id=motivationForChange]').find('option').filter(function (){return $(this).html() == 'Action';}).val()){
					$('tr').has('div[id=pathwayIndicated]').find('select').val($('tr').has('div[id=pathwayIndicated]').find('option').filter(function (){return $(this).html().includes('Pathway 2');}).val());
				}
			}
		}
		else{
			//No pathway?
		}
	}
}