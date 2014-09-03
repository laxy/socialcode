/* Initializate local data */
localStorage.setItem('c_function',"");
localStorage.setItem('c_filename',"");
localStorage.setItem('counter',0);
localStorage.setItem('tog',1);


/* Like main function: Start of code */
if(localStorage.getItem('seach_prev')==1) {
    var function_prev=localStorage.getItem('function_name');
    /* ajaxSetup - Setup csrf headers for all ajax requests */
    function csrfSafeMethod(method) {
        // these HTTP methods do not require CSRF protection
        return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
    }
    
    $.ajaxSetup({
        beforeSend: function(xhr, settings) {
            if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
                var csrftoken = $.cookie('csrftoken');
                xhr.setRequestHeader("X-CSRFToken", csrftoken);
            }
        }
    });
    
    $.ajax({
        type : 'POST',
        url : "/socialcode/search/",
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
// End of main function

/* Utility Functions */   

/* Function: getKeyByValue */
function getKeyByValue(obj, value) {
    for( var prop in obj ) {
        if( this.hasOwnProperty( prop ) ) {
            if( this[ prop ] === value )
                return prop;
        }
    }
}

/* Function: find_pos - give the index of given object in an array */
function find_pos(arr,obj) {
    return (arr.indexOf(obj));
}

/* Function: nkey - no sure what this function did! :) */
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

/* Function: Jump - jumps to a particular line in the code display */
function Jump(line)
{
    var nodeList = document.querySelectorAll("."+"line.number"+line);
    for (var i = 0, length = nodeList.length; i < length; i++) {
        var ta = nodeList[i];
        var jump = 1;
        ta=document.getElementById("source_code");
        ta.scrollTop = 1250;
        break;
    }
}

/* Function: send_request - Sends an ajax post request with function name */
function send_request(fname) {
    $.ajax({
        type : 'POST',
        url : "/socialcode/get_func_data/",
        dataType: "text",
        data: {"function_name":fname},
        success:function (data) {
        }
    });
}

/* Function - toggle_func - I think this toggles to source code area on click, makes it bigger/expands on click. */
function toggle_func() {
    var $j = jQuery.noConflict(); 
    $j('#source_code').click(function() {
        if(localStorage.getItem('tog')==1) {
            var codeInnerWidth = 800;
            localStorage.setItem('tog',0);
            $j("#demopage").hide();
            $j("#demopage1").hide();
            $j('#source_code').animate({width: 800});
            return false;
        }
        else if( localStorage.getItem('tog')==0) 	 {
            localStorage.setItem('tog',1);
            $j("#demopage").show();
            $j("#demopage1").show();
            $j('#source_code').animate({width: "40%"});
            return false;
        }
    });
}

/* Function: new_func - not sure what this does :) */
function new_func() {
    var $j = jQuery.noConflict(); 
    $j("#source_code").hover(function() {
        var codeInnerWidth = 800;
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

/* Function: request_source_code */
function request_source_code(function_name) {     
}

/* Function: upload_edcs */
function upload_edcs(doc, link) {
    var $j = jQuery.noConflict();
    $j.ajax({
        type : 'POST',
        url : "/socialcode/upload_func_data/",
        dataType: "text",
        data: {"fname":localStorage.getItem("c_function"), "filename":localStorage.getItem("c_filename"), "tag":"edcs", "data0":doc, "data1":link},
        success:function (data) {
            data=JSON.parse(data);
            update_edcs(data["edcs"]);
        }
    });
}

/* Function: update_edcs */
function update_edcs(edcs) 
{
    document.getElementById("doc-window").innerHTML="";
    if((edcs[0]!="")||(edcs[1]!=""))
    {
        for(var i=0; i<edcs.length; i=i+2) {
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

/* Function: upload_bugfix */
function upload_bugfix(bugid, link) {
    var $j = jQuery.noConflict();  
    $j.ajax({
        type : 'POST',
        url : "/socialcode/upload_func_data/",
        dataType: "text",
        data: {"fname":localStorage.getItem("c_function"), "filename":localStorage.getItem("c_filename"), "tag":"bugfix", "data0":bugid, "data1":link},
        success:function (data) {
            data=JSON.parse(data);
            update_bugfix(data["bugfix"]);
        }
    }); 
}

/* Function: update_bugfix */
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

/* Function: upload_comments */
function upload_comments(username,comments) {
    var $j = jQuery.noConflict();
    
    $j.ajax({
        type : 'POST',
        url : "/socialcode/upload_func_data/",
        dataType: "text",
        data: {"fname":localStorage.getItem("c_function"), "filename":localStorage.getItem("c_filename"), "tag":"comments", "data0":username, "data1":comments},
        success:function (data) {
            data=JSON.parse(data);
            update_comments(data["comments"]);
        }
    });
}

/* Function: update_comments */
function update_comments(comments)
{
    document.getElementById("main_comments_display").innerHTML="";
    for(var i=0; i<comments.length; i=i+2) {
        if((comments[i]!="")||(comments[i+1]!=""))
        {
            
            if(comments=="") {
            } else {                
                var x=document.getElementById("main_comments_display").innerHTML;
                document.getElementById("main_comments_display").innerHTML='<div class="comments_div"><div class="inline"><img src="img/pic.gif" alt="Smiley face" width="42" height="42"></div><div class="inlinep">'+'<b><i><u>'+comments[i]+'</u></i></b><br><p align="justify">'+comments[i+1]+'</p></div><br class="clearBoth" /></div>'+x;
            }
        }
    }
}

/* Function: update_author */
function update_author(author)
{
    document.getElementById("view2").innerHTML=String(author);
}

/* Function: update_file */
function update_file(filename,linenumber)
{
    var $j = jQuery.noConflict(); 
    
    /* Reading File associated with the function */
    $j.ajax({
        type : 'POST',
        url : "/socialcode/load_file/",
        dataType: "text",
        data: {"filesubpath":filename},
        success:function (data) {
            document.getElementById('source_code').innerHTML= '<code id="code1"><pre class="brush:cpp;">'+ data + '</pre></code>';
            
            /* Making code look good ! */
            SyntaxHighlighter.highlight();
            
            /* Search for the function and display early */
            var searchtext='line number'+linenumber;
            var foundin = $j('#source_code').find('.number'+linenumber);
            $j('#source_code').scrollTop(foundin.offset().top);//This will search html file for function signature and scroll to that position 
        }
    });
}

/* Function: update_signature */    
function update_signature(signature)
{
    document.getElementById("view1").innerHTML='<code id="code1"><pre><b>'+localStorage.getItem("c_function")+'</b><br>'+ String(signature) + '</pre></code>';
    
}

/* Function: update_desc */
function update_desc(desc)
{
    document.getElementById("view3").innerHTML=String(desc);
}

/* Function: update_page - updates the page with information of the current function.  */
function update_page(data) {
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
    update_signature(signature);
    update_comments(comments);
    update_desc(desc);
    update_file(filename,linenumber);
    update_author(author);
    update_bugfix(bugfix);
    update_edcs(edcs);
}

/* Function: flow_construction */
function flow_construction(data) {     
    /* Contains functions: adjust_islast, get_json, construct_list inside it. 
Some of these functions need local variables of flow_construction */
    var list = [];
    var max_depth=0;
    localStorage.setItem('counter',0);
    get_json(data,0,0,0);
    adjust_islast(list);
    construct_list(list);
    reinitialize();
    //CollapsibleLists.apply();
    
    function adjust_islast(list) {
        for(var i=1;i<=max_depth;i++) {
            var pos = list.lastIndexOf(i)
            list[pos+1]=1;
        }
    }
    
    /* Function: get_json */
    function get_json(data,islast, depth,prevkey) {
        jQuery(document).ready(function($){ 
            $('#main_flow').html("");
            $.each(data, function(key, value){
                if(depth>max_depth) max_depth=depth;
                var ckey=parseInt(localStorage.getItem('counter'))+1;
                localStorage.setItem('counter',ckey);
                var child=nkey(value);
                if(islast) {
                    var index=find_pos(list,String(prevkey));
                    if(index==-1) {  list.push(key,String('a'+ckey),depth,1); }
                    else list.splice(index+3,0,key,String('a'+ckey),depth,1); 
                }
                else {  
                    var index=find_pos(list,String(prevkey));
                    if(index==-1) { list.push(key,String('a'+ckey),depth,0); }
                    else list.splice(index+3,0,key,String('a'+ckey),depth,0); 
                }
                
                if(nkey(value)>0) {
                    if((nkey(value)-1)) get_json(value,0,(depth+1),String('a'+ckey)); //need to split
                    else get_json(value,0,(depth+1),String('a'+ckey));
                }
                else return;
            });
});
}
    
    /* Function: construct_list */
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

/* Function -reinitialize */
function reinitialize() {
    jQuery(document).ready(function($) {
        /* ajaxSetup - Setup csrf headers for all ajax requests */
        function csrfSafeMethod(method) {
            // these HTTP methods do not require CSRF protection
            return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
        }
        $.ajaxSetup({
            beforeSend: function(xhr, settings) {
                if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
                    var csrftoken = $.cookie('csrftoken');
                    xhr.setRequestHeader("X-CSRFToken", csrftoken);
                }
            }
        });
        
        /* Updating Flow Tree if any */
        CollapsibleLists.apply();
        
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
            $(this).css("font-weight","bold");
            $(this).css("color","#3B5998");
            $.ajax({
                type : 'POST',
                url : "/socialcode/get_func_data/",
                dataType: "text",
                data: {"function_name":$(this).attr('id')},
                success:function (data) {
                    update_page(data);
                }
            });
            return false;
        }); //--end of double click event handling
        
        /* Comments submit handler */
        $('.submit_comment').click(function() {
            var comment_data = $('textarea').val();
            var user = localStorage.getItem("username");
            if(comment_data!=""){
                upload_comments(user, comment_data);
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
                    $.ajaxSetup({
                        beforeSend: function(xhr, settings) {
                            if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
                                var csrftoken = $.cookie('csrftoken');
                                xhr.setRequestHeader("X-CSRFToken", csrftoken);
                            }
                        }
                    });
                    /* Sending request to get function callflow */
                    $.ajax({
                        type : 'POST',
                        url : "/socialcode/search/",
                        data: {"function_name":fname},
                        success:function (data) {
                            var data = JSON.parse(String(data));
                            flow_construction(data);
                        }
                    });
                    
                    $.ajax({
                        type : 'POST',
                        url : "/socialcode/get_func_data/",  
                        dataType: "text",         
                        data: {"function_name":fname},
                        success:function (data) {
                            update_page(data);
                        }          
                    });  
                }
            }
        });
        return false; //this statement stops the other event listeners from clicking.
    });
    
} // End of reinitialize function

/* Function: initialize */
function initialize() {    
    jQuery(document).ready(function($) {
        /* ajaxSetup - Setup csrf headers for all ajax requests */
        function csrfSafeMethod(method) {
            // these HTTP methods do not require CSRF protection
            return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
        }
        $.ajaxSetup({
            beforeSend: function(xhr, settings) {
                if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
                    var csrftoken = $.cookie('csrftoken');
                    xhr.setRequestHeader("X-CSRFToken", csrftoken);
                }
            }
        });
        
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
            if(($("#tag").val()!="") && ($("#link11").val()!="")){
                upload_edcs($("#tag").val(),$("#link11").val());
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
            if(($("#tagb").val()!="") && ($("#link12").val()!="")){
                upload_bugfix($("#tagb").val(),$("#link12").val());
                
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
            url : "/socialcode/main/autocomplete/",
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