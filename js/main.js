localStorage.setItem('c_function',"");
localStorage.setItem('c_filename',"");

					localStorage.setItem('counter',0);
function initialize() {

jQuery(document).ready(function($) {

console.log("document ready");

$(document).ready(function(){
	$('#doc-trigger').click(function(){
		$(this).next('#doc-content').slideToggle();
		$(this).toggleClass('doc-active');					
		
		if ($(this).hasClass('doc-active')) $(this).find('span').html('-')
			else $(this).find('span').html('+')
		});
	$('#bug-trigger').click(function(){
                $(this).next('#bug-content').slideToggle();
                $(this).toggleClass('bug-active');

                if ($(this).hasClass('bug-active')) $(this).find('span').html('-')
                        else $(this).find('span').html('+')
                });
	$('#login-trigger').click(function(){
		$(this).next('#login-content').slideToggle();
		$(this).toggleClass('active');					
		
		if ($(this).hasClass('active')) $(this).find('span').html('&#x25B2;')
			else $(this).find('span').html('&#x25BC;')
		})
});


$("#doc-submit").click(function() {
console.log("submit clicked");

if(($("#tag").val()!="") && ($("#link11").val()!="")){
upload_edcs($("#tag").val(),$("#link11").val());

/*
 var leftDiv = document.createElement("div"); //Create left div
        leftDiv.class = "doc-links"; //Assign div id
        leftDiv.setAttribute("style", "float:left; width:330px; line-height: 26px; text-align:left; font-size:10pt; padding-left:10px; height:26px; text-decoration:none;"); //Set div attributes
        leftDiv.style.background =  "white";
        a = document.createElement('a');
        a.href =  $("#link11").val();
	a.innerHTML = $("#tag").val();
	a.class = "href-link";
        a.setAttribute("style", "text-decoration:none; :hover {background: #3B5998, color: white;}"); //Set div attributes
document.styleSheets[0].insertRule('.doc-links:hover { background-color: red; }', 0);
    leftDiv.appendChild(a);
    document.getElementById('doc-window').appendChild(leftDiv);
*/
$("#link11").val("");
$("#tag").val("");
 $("#doc-trigger").next('#doc-content').slideToggle();
                $("#doc-trigger").toggleClass('doc-active');

                if ($("#doc-trigger").hasClass('doc-active')) $("#doc-trigger").find('span').html('-');
                        else $("#doc-trigger").find('span').html('+');
}
return false;
});


$("#bug-submit").click(function() {
console.log("submit clicked");

if(($("#tagb").val()!="") && ($("#link12").val()!="")){
upload_bugfix($("#tagb").val(),$("#link12").val());
/*
 var leftDiv = document.createElement("div"); //Create left div
        leftDiv.class = "bug-links"; //Assign div id
        leftDiv.setAttribute("style", "float:left; width:330px; line-height: 26px; text-align:left; font-size:10pt; padding-left:10px; height:26px; text-decoration:none;"); //Set div attributes
        leftDiv.style.background =  "white";
        a = document.createElement('a');
        a.href =  $("#link12").val();
        a.innerHTML = $("#tagb").val();
        a.class = "href-link";
        a.setAttribute("style", "text-decoration:none; :hover {background: #3B5998, color: white;}"); //Set div attributs
document.styleSheets[0].insertRule('.bug-links:hover { background-color: red; }', 0);
    leftDiv.appendChild(a);
    document.getElementById('bug-window').appendChild(leftDiv);
*/
$("#tagb").val("");
$("#link12").val("");
 $("#bug-trigger").next('#bug-content').slideToggle();
                $("#bug-trigger").toggleClass('bug-active');

                if ($("#bug-trigger").hasClass('bug-active')) $("#bug-trigger").find('span').html('-');
                        else $("#bug-trigger").find('span').html('+');
}
return false;
});

$("#submit").click(function() {
console.log("submit clicked");
localStorage.setItem("username",$("#username").val());
document.getElementById("login-trigger").innerHTML=localStorage.getItem("username")+"<span>&nbsp;&nbsp;&nbsp;▼</span>";

$("#login-trigger").next('#login-content').slideToggle();
                $("#login-trigger").toggleClass('active');

                if ($("#login-trigger").hasClass('active')) $("#login-trigger").find('span').html('&#x25B2;')
                        else $("#login-trigger").find('span').html('&#x25BC;')


return false;
});

/* Reading Unique database functions into an array for AUTOCOMPLETE - An inefficient solution  */
$.ajax({
type : 'POST',
data: {"filesubpath":"json"},
url : "http://flippedlogic.com/socialcode/read.php",
dataType: "text",
success:function (data) {
var fnames=data.split("]");
var fnames=fnames[0]+'"!aaaaabbbbbbccdfggdedf"]';
var fnames=JSON.parse(fnames);


/* Enabling autocomplete on search bar */
$('#search1').typeahead([
	{
name: 'function_names',
local: fnames,
}
]);

}
});
// --> End of AUTOCOMPLETE

toggle_func();




return false;

});

}


function reinitialize() {

jQuery(document).ready(function($) {


/* Updating Flow Tree if any */
CollapsibleLists.apply();

/*$('.main_function').css("background","none");
var ht=$("document").height()+"px";
$("#wrap1").css({"height":ht});
console.log($(document).height());
*/

if(localStorage.getItem("username")!== undefined) {
document.getElementById("login-trigger").innerHTML=localStorage.getItem("username")+"<span>&nbsp;&nbsp;&nbsp;▼</span>";
}




/* Hover borders on flow graphs */
$(".li_click").hover(function(){ 

		var id = "#"+$(this).attr('id');
		if($(this).attr('class').indexOf("main_function") == -1) 
		{
		$(this).css("border","2px solid rgba(255, 0, 0, .5)");
		$(this).css("border-radius","6px");
		}
		return false;
		},function(){
		$(this).css("border-style","none");
		$(this).css("border-width","2px");
		return false;
		});

/* Double Click Event on flow graphs */
$(".li_click").dblclick(function(){
		localStorage.setItem('dblclk',1);
		setTimeout(function() { localStorage.setItem('dblclk',0); },300);

localStorage.setItem('c_function',$(this).attr('id'));
console.log("this id:"+$(this).attr('id'));
$(this).css("font-weight","bold");
$(this).css("color","#3B5998");
$.ajax({
type : 'POST',
url : "http://flippedlogic.com/socialcode/db.php",
dataType: "text",
data: {"function_name":$(this).attr('id')},
success:function (data) {
update_page(data);
}
});

/* Reading File associated with the function */
/*$.ajax({
type : 'POST',
url : "http://flippedlogic.com/socialcode/read.php",
dataType: "text",
data: {"filesubpath":"match-trees.c"},
success:function (data) {
document.getElementById('source_code').innerHTML= '<code id="code1"><pre class="brush:cpp;">'+ data + '</pre></code>';

SyntaxHighlighter.highlight();
var searchtext='void shift_tree_by(const unsigned char *hash1,';
	$('#source_code').scrollTop($("*:contains("+searchtext+"):last").offset().top-150);//This will search html file for function signature and scroll to that position 
	}
});
*/
return false;
}); //--end of double click event handling

/* Comments submit handler */
$('.submit_comment').click(function() {

		var comment_data = $('textarea').val();
		var user = localStorage.getItem("username");
console.log("in submit comments");
if(comment_data!=""){
console.log("comment data "+comment_data);
upload_comments(user, comment_data);

/*
var x = document.getElementById("main_comments_display").innerHTML;
document.getElementById("main_comments_display").innerHTML='<div class="comments_div"><div class="inline"><img src="img/pic.gif" alt="Smiley face" width="42" height="42"></div><div class="inlinep">'+'<b><i><u>'+user+'</u></i></b><br><p align="justify">'+comment_data+'</p></div><br class="clearBoth" /></div>'+x;
*/
$("textarea").val('');
}
return false;
});

/* Handing search bar */
$('#search1').keypress(function(event){
		if (event.keyCode == 13) {
		event.preventDefault();
		var fname = $("#search1").val();
		$("#search1").val('');
if(fname!="") {
localStorage.setItem('c_function',fname);
/* Sending request to get function callflow */
$.ajax({
type : 'POST',
url : "http://www.flippedlogic.com/cgi-bin/post.py",
data: {"function_name":fname},
success:function (data) {

console.log(data);
var data = JSON.parse(String(data));
flow_construction(data);
}
});


$.ajax({
type : 'POST',
url : "http://flippedlogic.com/socialcode/db.php",  
dataType: "text",         
data: {"function_name":fname},
success:function (data) {
console.log("php: "+data)
update_page(data);
}          
});  

}

    }
});

return false; //this statement stops the other event listeners from clicking.

});

}

localStorage.setItem('tog',1);

if(localStorage.getItem('seach_prev')==1) {
var function_prev=localStorage.getItem('function_name');
$.ajax({
type : 'POST',
url : "http://www.flippedlogic.com/cgi-bin/post.py",
data: {"function_name":function_prev},
success:function (data) {

var data = JSON.parse(data);
flow_construction(data);
localStorage.setItem('function_name',"");
localStorage.setItem('search_prev',0);

}
});
}
var toggle=1;


initialize();
reinitialize();




function flow_construction(data) {
	var fdata = { "new_node()": [{"new_node_A()": [{"new1":"n1"},"new2"]}, {"new_node_B()": [{"b_1":["b11()","c11"]},"b_2","b_3"]}]};        

	var fdata = { "new_node()": [{"new_node_A()": [{"new1":["n1"]},"new2"]}, {"new_node_B()": [{"b_1":["b11()","c11"]},"b_2","b_3"]}]};        
	//var fdata = {"my1": {"mya":"x1", "myb": "y2"}};

	var json = '{ "array_list_add": { "array_list_put_idx": { "array_list_expand_internal": { "realloc": {"memset": {},"json_max": {}}, "memset": {},"json_max": {}}}}}';
	var json = '{"qsortx": {"array_list_put_idx": {}}, "array_list_expand_internal": {}, "array_list_sort": {"qsort": {}}, "array_list_free": {"free": {}}, "array_list_add": {"array_list_put_idx": {"array_list_expand_internal": {"realloc": {}, "memset": {}, "json_max": {}}}}, "array_list_get_idx": {}}';
	var json = '{"main": {"read_cache": {}, "OPT_STRING": {}, "lstat": {}, "ce_match_stat": {}, "error": {}, "strerror": {}, "decode_85": {"say": {}, "error": {"va_end": {}, "error_routine": {}, "va_start": {}}, "prep_base85": {"ARRAY_SIZE": {}}, "say1": {}, "say2": {}}, "OPT_END": {}, "parse_options": {"parse_options_start": {"die": {"die_is_recursing": {}, "die_routine": {}, "fputs": {}, "va_end": {}, "exit": {}, "va_start": {}}, "memset": {}, "parse_options_check": {"exit": {}, "optbug": {"error": {"va_end": {}, "error_routine": {}, "va_start": {}}}}}, "parse_options_step": {"parse_options_usage": {"usage_with_options_internal": {"putchar": {}, "utf8_fprintf": {"fputs": {}, "strbuf_vaddf": {"vsnprintf": {}, "va_copy": {}, "strbuf_setlen": {"die": {"die_is_recursing": {}, "die_routine": {}, "fputs": {}, "va_end": {}, "exit": {}, "va_start": {}}}, "die": {}, "strbuf_grow": {"die": {"die_is_recursing": {}, "die_routine": {}, "fputs": {}, "va_end": {}, "exit": {}, "va_start": {}}, "ALLOC_GROW": {}, "unsigned_add_overflows": {}}, "va_end": {}, "strbuf_avail": {}}, "va_end": {}, "utf8_strwidth": {"utf8_strnwidth": {"display_mode_esc_sequence_len": {"isdigit": {}}, "strlen": {}}}, "va_start": {}}, "fprintf": {}, "fprintf_ln": {"putc": {}, "va_end": {}, "vfprintf": {}, "va_start": {}}, "fputc": {}}}, "parse_nodash_opt": {"get_value": {"strtol": {}, "die": {"die_is_recursing": {}, "die_routine": {}, "fputs": {}, "va_end": {}, "exit": {}, "va_start": {}}, "fix_filename": {"xstrdup": {"try_to_free_routine": {}, "die": {"die_is_recursing": {}, "die_routine": {}, "fputs": {}, "va_end": {}, "exit": {}, "va_start": {}}, "strdup": {}, "strlen": {}}, "strlen": {}, "strcmp": {}, "is_absolute_path": {}, "prefix_filename": {"strcpy": {}, "memcpy": {}, "is_absolute_path": {"is_dir_sep": {}, "has_dos_drive_prefix": {}}}}, "get_arg": {"opterror": {"error": {"va_end": {}, "error_routine": {}, "va_start": {}}}}, "opterror": {}}}}}, "printf": {}, "usage": {"usagef": {"va_end": {}, "usage_routine": {}, "va_start": {}}}, "encode_85": {"say": {}, "say1": {}}, "strlen": {}, "strcmp": {}, "OPT_INTEGER": {}}}';


	var fdata = JSON.parse(json); 
	console.log(fdata); 

	var list = [];
	var max_depth=0;

	localStorage.setItem('counter',0);
	get_json(data,0,0,0);
	console.log(list);
	adjust_islast(list);
	construct_list(list);

	reinitialize();
	//CollapsibleLists.apply();

	function adjust_islast(list) {
		//console.log("MaxDepth: "+max_depth);

		for(var i=1;i<=max_depth;i++) {
			var pos = list.lastIndexOf(i)
				list[pos+1]=1;
		}

	}

	
	function get_json(data,islast, depth,prevkey) {

		jQuery(document).ready(function($){ 
				$('#main_flow').html("");



				$.each(data, function(key, value){
					//console.log(key,value);
					if(depth>max_depth) max_depth=depth;
					
					var ckey=parseInt(localStorage.getItem('counter'))+1;
					localStorage.setItem('counter',ckey);
					var child=nkey(value);
					if(islast) {
						console.log("list:"+list);
						console.log("prevkey:"+prevkey); 
						var index=find_pos(list,String(prevkey));
						if(index==-1) {  list.push(key,String('a'+ckey),depth,1); }
						else list.splice(index+3,0,key,String('a'+ckey),depth,1); 
						
						 }
					else {  
						console.log("list:"+list);
						console.log("prevkey:"+prevkey); 
						
						var index=find_pos(list,String(prevkey));
						console.log("index:"+index);
						if(index==-1) { list.push(key,String('a'+ckey),depth,0); }
						else list.splice(index+3,0,key,String('a'+ckey),depth,0); 

						}

					if(nkey(value)>0) {
					if((nkey(value)-1)) get_json(value,0,(depth+1),String('a'+ckey)); //need to split
					else get_json(value,0,(depth+1),String('a'+ckey));
					}
					else return;
					});
				/*catch(err) {
				  if(islast) {

				  console.log("ca"+data+"(l)"+depth);
				  list.push(data,depth,0)
				  }
				  else {
				  console.log("ca"+data+depth);
				  list.push(data,depth,0)
				  }
				  }*/
		});
	}

	function construct_list(list) {

		var string="";
		for(var i=0; i<list.length; i=i+4) {

			if(list[i+3]==1) string+="<li id="+list[i]+" class='lastChild li_click'>"+list[i];
			else {

				if(list[i+2]==0){	string+="<li id="+list[i]+" class='li_click main_function'>"+list[i];}
				else 	string+="<li id="+list[i]+" class='li_click'>"+list[i];
			}
			if(list[i+6]==list[i+2]) string+="</li>";
			else if(list[i+6]>list[i+2]) { if(list[i+2]==0) { string+="<ul class='collapsibleList'>";} else {string+="<ul>";} }
			else if(list[i+6]<list[i+2]) {
					var lxt = parseInt(list[i+2])-parseInt(list[i+6]);
					string+="</li>";
					for(var j=0; j<lxt; j++)
						string+='</ul>';

				}
			
		}	

		document.getElementById('main_flow').innerHTML+=string;
		//CollapsibleLists.apply();
	}


}

function new_func() {
	console.log("new function");
	var $j = jQuery.noConflict(); 
	$j("#source_code").hover(function() {
			console.log("hovered");
			var codeInnerWidth = 800;
			console.log(codeInnerWidth);
			if (codeInnerWidth > 563) {

			$j("#demopage").hide();
			$j("#demopage1").hide();
			$j(this)
			.stop(true, false)
			.css({
zIndex: "100",
position: "relative"
})
			.animate({
width: codeInnerWidth + "px"
});
			}
			}, function() {


				$j("#demopage").show();
				$j("#demopage1").show();
				$j(this).stop(true, false).animate({
width: 563
});
});
}

function toggle_func() {
	console.log("toggle function");

	var $j = jQuery.noConflict(); 

	$j('#source_code').click(function() {
			console.log("clicked");

			if(localStorage.getItem('tog')==1) {
			var codeInnerWidth = 800;
			localStorage.setItem('tog',0);
			console.log("here2");    
			$j("#demopage").hide();
			$j("#demopage1").hide();
			$j('#source_code').animate({width: 800});

			return false;
			}
			else if( localStorage.getItem('tog')==0) 	 {
			localStorage.setItem('tog',1);
			console.log("here1"); 
			$j("#demopage").show();
			$j("#demopage1").show();
			$j('#source_code').animate({width: "40%"});

			return false;
			}

	});
}

function Jump(line)
{
	console.log("in jump");

	var nodeList = document.querySelectorAll("."+"line.number"+line);
	for (var i = 0, length = nodeList.length; i < length; i++) {
		var ta = nodeList[i];
		var jump = 1;
		ta=document.getElementById("source_code");
		ta.scrollTop = 1250;
		break;
	}

}

function request_source_code(function_name) {


	console.log("in req src code");




}


function nkey(obj) {

	var count = 0;       
	for ( property in obj )  
	{
		if(obj.hasOwnProperty(property))
		{
			count++;
		}
	}

	return count;
}

function send_request(fname) {

	$.ajax({
type : 'POST',
url : "http://flippedlogic.com/socialcode/db.php",
dataType: "text",
data: {"function_name":fname},
success:function (data) {
console.log("flow "+data)
}
});



}

function getKeyByValue(obj, value) {
    for( var prop in obj ) {
        if( this.hasOwnProperty( prop ) ) {
             if( this[ prop ] === value )
                 return prop;
        }
    }
}

function find_pos(arr,obj) {
return (arr.indexOf(obj));
}

function update_page(data) {

console.log("hlkfnslfnds;lfkjn");
console.log("data: "+data);
var data = JSON.parse(data);
var fname=data["fname"];
var edcs=data["edcs"];
var signature=data["signature"];
var comments=data["comments"];
var author=data["author"];
var bugfix=data["bugfix"];
var filename=data["filename"];
var linenumber=data["linenumber"];
var desc=data["desc"];


localStorage.setItem('c_filename',filename);

console.log(fname,signature);

update_signature(signature);
update_comments(comments);
update_desc(desc);
update_file(filename,linenumber);
update_author(author);
update_bugfix(bugfix);
update_edcs(edcs);


}


function update_signature(signature)
{
document.getElementById("view1").innerHTML='<code id="code1"><pre><b>'+localStorage.getItem("c_function")+'</b><br>'+ String(signature) + '</pre></code>';

}


function update_desc(desc)
{
document.getElementById("view3").innerHTML=String(desc);
}
function update_file(filename,linenumber)
{
console.log("hello1w");
	var $j = jQuery.noConflict(); 

/* Reading File associated with the function */
$j.ajax({
type : 'POST',
url : "http://flippedlogic.com/socialcode/read.php",
dataType: "text",
data: {"filesubpath":filename},
success:function (data) {
console.log("hellow");
document.getElementById('source_code').innerHTML= '<code id="code1"><pre class="brush:cpp;">'+ data + '</pre></code>';

/* Making code look good ! */
SyntaxHighlighter.highlight();

/* Search for the function and display early */
var searchtext='line number'+linenumber;
var foundin = $j('#source_code').find('.number'+linenumber);
	console.log('foundin '+foundin,"line: ",linenumber);
        $j('#source_code').scrollTop(foundin.offset().top);//This will search html file for function signature and scroll to that position 
 }
});




}
function update_author(author)
{
document.getElementById("view2").innerHTML=String(author);

}

function update_comments(comments)
{

document.getElementById("main_comments_display").innerHTML="";
for(var i=0; i<comments.length; i=i+2) {
if((comments[i]!="")||(comments[i+1]!=""))
{

if(comments=="") {
console.log("sudden");
} else {
//var user = comments.match(/\#([^)]+)\#/)[1];
//var remaining = comments.substr(user.length+2);

var x=document.getElementById("main_comments_display").innerHTML;
document.getElementById("main_comments_display").innerHTML='<div class="comments_div"><div class="inline"><img src="img/pic.gif" alt="Smiley face" width="42" height="42"></div><div class="inlinep">'+'<b><i><u>'+comments[i]+'</u></i></b><br><p align="justify">'+comments[i+1]+'</p></div><br class="clearBoth" /></div>'+x;
}
}
}
}

function update_bugfix(bugfix)
{

document.getElementById("bug-window").innerHTML="";
if((bugfix[0]!="")||(bugfix[1]!=""))
{
for(var i=0; i<bugfix.length; i=i+2) {
var leftDiv = document.createElement("div"); //Create left div
        leftDiv.class = "bug-links"; //Assign div id
        leftDiv.setAttribute("style", "float:left; width:330px; line-height: 26px; text-align:left; font-size:10pt; padding-left:10px; height:26px; text-decoration:none;"); //Set div attributes
        leftDiv.style.background =  "white";
        a = document.createElement('a');
        a.href =  bugfix[i+1];
        a.innerHTML = bugfix[i];
        a.class = "href-link";
        a.setAttribute("style", "text-decoration:none; :hover {background: #3B5998, color: white;}"); //Set div attributs
document.styleSheets[0].insertRule('.bug-links:hover { background-color: red; }', 0);
    leftDiv.appendChild(a);
    document.getElementById('bug-window').appendChild(leftDiv);
}
}
}
function update_edcs(edcs) 
{
console.log("EDCS:"+edcs);
document.getElementById("doc-window").innerHTML="";
if((edcs[0]!="")||(edcs[1]!=""))
{
for(var i=0; i<edcs.length; i=i+2) {
console.log("EDCS "+edcs[0],edcs[1]);
var leftDiv = document.createElement("div"); //Create left div
        leftDiv.class = "doc-links"; //Assign div id
        leftDiv.setAttribute("style", "float:left; width:330px; line-height: 26px; text-align:left; font-size:10pt; padding-left:10px; height:26px; text-decoration:none;"); //Set div attributes
        leftDiv.style.background =  "white";
        a = document.createElement('a');
        a.href =  edcs[i+1];
        a.innerHTML = edcs[i];
        a.class = "href-link";
        a.setAttribute("style", "text-decoration:none; :hover {background: #3B5998, color: white;}"); //Set div attributes
document.styleSheets[0].insertRule('.doc-links:hover { background-color: red; }', 0);
    leftDiv.appendChild(a);
    document.getElementById('doc-window').appendChild(leftDiv);
}
}
}

function upload_comments(username,comments) {

console.log("once");
var $j = jQuery.noConflict();
 
$j.ajax({
type : 'POST',
url : "http://flippedlogic.com/socialcode/upload.php",
dataType: "text",
data: {"fname":localStorage.getItem("c_function"), "filename":localStorage.getItem("c_filename"), "tag":"comments", "data0":username, "data1":comments},
success:function (data) {
console.log(data);
data=JSON.parse(data);
console.log(data);
update_comments(data["comments"]);
 }
});

}


function upload_bugfix(bugid, link) {

console.log("once");
var $j = jQuery.noConflict();
 
$j.ajax({
type : 'POST',
url : "http://flippedlogic.com/socialcode/upload.php",
dataType: "text",
data: {"fname":localStorage.getItem("c_function"), "filename":localStorage.getItem("c_filename"), "tag":"bugfix", "data0":bugid, "data1":link},
success:function (data) {
console.log(data);
data=JSON.parse(data);
update_bugfix(data["bugfix"]);
 }
});

}

function upload_edcs(doc, link) {

console.log("once");
var $j = jQuery.noConflict();
 
$j.ajax({
type : 'POST',
url : "http://flippedlogic.com/socialcode/upload.php",
dataType: "text",
data: {"fname":localStorage.getItem("c_function"), "filename":localStorage.getItem("c_filename"), "tag":"edcs", "data0":doc, "data1":link},
success:function (data) {
console.log(data);
data=JSON.parse(data);
console.log(data);
update_edcs(data["edcs"]);
 }
});

}

