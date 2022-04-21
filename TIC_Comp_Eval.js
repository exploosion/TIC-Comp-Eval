var cid;
var programID;
var program;

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