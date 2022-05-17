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
	checkDrinks();
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

function checkPathwayUpdate(){
	if($('tr').has('div[id=pathwayUpdate]').find('tr:contains(\'Yes\')').eq(1).find('input').prop('checked')){
		hideShow('show', 'pathwayUpdates', true);
	}
	else{
		hideShow('hide', 'pathwayUpdates', true);
	}
}

$('document').ready(function(){
	populateOptionText('pathwaySelected');
	checkPathwayUpdate();
	checkPathwaySelected();

	$('tr').has('div[id=pathwayUpdate]').find('input').change(checkPathwayUpdate);
	$('tr').has('div[id=pathwaySelected]').find('select').change(checkPathwaySelected);

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

function requireSignature(e){
	if($('#add_signature_1_img').attr('title') == undefined || $('#add_signature_1_img').attr('title') == 'signature placeholder') {  
		e.preventDefault();  alert('Please capture client/legal guardian signature.');  
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

// Level of Care Description auto width

function responsiveTable(selector, parentSelector){
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
	responsiveTable("#locDesc", "table:first");
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

//MDD
function checkMDD(){
	if($('tr').has('div[id=mddDx]').find('tr:contains(\'Yes\')').eq(1).find('input').prop('checked')){
		$('tr').has('answer[id=phq9NA]').eq(2).hide();
		$('tr').has('answer[id=cssrsNA]').eq(2).hide();
		if($('tr').has('answer[id=phq9NA]').eq(2).find('input').prop('checked')){
			$('tr').has('answer[id=phq9NA]').eq(2).find('input').prop('checked', false);
		}
		if($('tr').has('answer[id=cssrsNA]').eq(2).find('input').prop('checked')){
			$('tr').has('answer[id=cssrsNA]').eq(2).find('input').prop('checked', false);
		}
	}
	else{
		$('tr').has('answer[id=phq9NA]').eq(2).show();
		$('tr').has('answer[id=cssrsNA]').eq(2).show();
	}
}

$('document').ready(function(){
	checkMDD();

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