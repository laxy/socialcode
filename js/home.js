localStorage.setItem('function_name','');
localStorage.setItem('seach_prev',1);
initialize();
function initialize() {

jQuery(document).ready(function($) {

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
$('#search2').typeahead([
        {
name: 'function_names',
local: fnames,
}
]);

}
});
// --> End of AUTOCOMPLETE

/* Handing search bar */
$('#search2').keypress(function(event){
                if (event.keyCode == 13) {
                event.preventDefault();
                var fname = $("#search2").val();
 		console.log(fname);
                $("#search2").val('');

localStorage.setItem('seach_prev',1);
localStorage.setItem('function_name',fname);
window.location.href = "http://www.flippedlogic.com/main/revauto.html";


}
});//--end of search bar event handling



 return false;

 });

 }


