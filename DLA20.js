//DLA-20
const tableWidths = '60%';
var dla20QuestionCount = 0;

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