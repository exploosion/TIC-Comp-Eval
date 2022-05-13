//CSSRS
const cssrsTableWidths = '60%';

function createCSSRS(){
	
	$('tr').has('div[id=cssrs]').eq(0).next().after('<div id=\'cssrsTest\'><div id=\'cssrsContainer\'></div><br><img src=\'/images/spacer.gif\' height=\'15\' width=\'1\'></div>');

	$('div[id=cssrsContainer]').html('<b>CSSRS</b></td></tr>' + '<table border=\'0\' cellspacing=\'10px\' table-layout=\'fixed\' width=\'' + cssrsTableWidths + '\'>' +
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
		if($('#cssrsQ6A').val() == 'Within the last week' || $('#cssrsQ5A').val() == 'Yes'){
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

	cssrsAnswers = '';

	$('.cssrsQuestions').each(function(){
		console.log($(this).val());
		if($(this).val() != '' && $(this).val() != 'Did Not Answer'){
			cssrsAnswers = cssrsAnswers + $(this).val() + ',';
		}
		else{
			cssrsAnswers = cssrsAnswers + 'N/A' + ',';
		}
	})

	cssrsAnswers = cssrsAnswers.substring(0, cssrsAnswers.length - 1);
	saveCSSRS();
}

function saveCSSRS(){
	if(!cssrsAnswers.includes('null')){
		$('tr').has('div[id=cssrsAnswers]').find('input').val(cssrsAnswers);
	}
}

var cssrsAnswers;

function loadCSSRS(){
	var cssrsAnswersArray;
	var count = 0;

	if($('tr').has('div[id=cssrsAnswers]').find('input').val() != ''){
		cssrsAnswers = $('tr').has('div[id=cssrsAnswers]').find('input').val();
		if(!$('tr').has('div[id=cssrsAnswers]').find('input').val().includes('null')){
			cssrsAnswersArray = cssrsAnswers.split(',');
			
			$('.cssrsQuestions').each(function(){
				$(this).val(cssrsAnswersArray [count]);
				count++;
			});
		}	
	}
}

function cssrsHideShows(){
	if($('answer[id=cssrsPerform]').parent().prev().find('input').prop('checked')){
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
	else{
		$('#cssrsQ1').attr('required', false);
		$('tr').has('label[for=cssrsQ1]').find('div[class=requiredAsterisk]').remove();
		$('#cssrsQ2').attr('required', false);
		$('tr').has('label[for=cssrsQ2]').find('div[class=requiredAsterisk]').remove();
		$('#cssrsQ3').attr('required', false);
		$('tr').has('label[for=cssrsQ3]').find('div[class=requiredAsterisk]').remove();
		$('#cssrsQ4').attr('required', false);
		$('tr').has('label[for=cssrsQ4]').find('div[class=requiredAsterisk]').remove();
		$('#cssrsQ5').attr('required', false);
		$('tr').has('label[for=cssrsQ5]').find('div[class=requiredAsterisk]').remove();
		$('#cssrsQ5A').attr('required', false);
		$('tr').has('label[for=cssrsQ5A]').find('div[class=requiredAsterisk]').remove();
		$('#cssrsQ6').attr('required', false);
		$('tr').has('label[for=cssrsQ6]').find('div[class=requiredAsterisk]').remove();
		$('#cssrsQ6A').attr('required', false);
		$('tr').has('label[for=cssrsQ6A]').find('div[class=requiredAsterisk]').remove();
	}
}

$('document').ready(function(){
	$('tr').has('div[id=cssrsScore]').find('option').each(function(){this.setAttribute('text', this.outerText);});
	loadCSSRS();
	createCSSRS();
	checkCSSRSPerform();
	cssrsHideShows();
	setTimeout(loadCSSRS, 500);
	setTimeout(checkCSSRSPerform, 500);
	setTimeout(cssrsHideShows, 500);
	setTimeout(calculateCSSRS, 500);

	$('tr').has('div[id=cssrs]').find('input').change(checkCSSRSPerform);
	$('.cssrsQuestions').change(calculateCSSRS);
	$('.cssrsQuestions').click(calculateCSSRS);
	$('.cssrsQuestions').change(cssrsHideShows);
});