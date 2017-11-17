/******************** Instructions *********************************

Requirements:
Google Chrome
List of Student ID's seperated by commas

Setup:

1) Open eduphoria and navigate to the students tab in Aware.

2) Open the Console (cntrl + shift + i) and copy/paste this whole text file into the console then hit enter

3) Paste your list of student ID's (seperated by commas) into the popup window

4) Enter the title of the journal entry and body text into the popup windows

5) Begin mashing shift+enter to bulk fill out info. Make sure each operation is completed
   first, ie. don't mash super fast, each page should load before you hit shift+enter again!




********************************************************************/

//Prompt the user to enter the Student ID's
var studentIDs  = prompt("Please Enter the Student ID's, seperated by commas", "000000, 000001");

if (studentIDs == null || studentIDs == "") {
    alert("You canceled this program");
} else {

studentIDs = studentIDs.split(',');
console.log(studentIDs);
var noteTitle= prompt("Please Enter the Title for your Journal Entry", "Title Text");

if (noteTitle == null || noteTitle == "") {
    alert("You canceled this program");
} else {

var noteBody  = prompt("Please Enter the Body for your Journal Entry", "Body Text");

if (noteBody == null || noteBody == "") {
    alert("You canceled this program");
} else {

//builds a key listener for enter key presses in the search box
var i = 0; // index of the list of ID's
var blerg = document.getElementById('_ctl0_ifrSearch');
var ifrDoc = blerg.contentDocument || blerg.contentWindow.document;

var arrayLength = studentIDs.length;

// NEW THINGS TO WORK ON
   // if you are in the iframe for searching the following code auto-searches
   // blerg.contentWindow.$('#tokenfield').tokenfield('setTokens', 'studentID');
   
   
var rotation= 0; //every shift-enter command does one of three things:
// first a search is created, then the link is pressed, then the journal is updated

var d = document.getElementById('_ctl0_ifrSearch').contentWindow;
d.onkeypress = function(event) {
if(i>=arrayLength){
alert("Finished Journaling! :D ");
}else{
   if (event.keyCode == 13 && event.shiftKey && i<arrayLength) {
     if(rotation == 0){ executeSingleSearch(studentIDs[i]); }

if(rotation == 1){ loadSingleStudent(); }
if(rotation ==2){
createSingleJournalEntry();
i++;
console.log("student "+i+" of "+arrayLength+" done.");
}

rotation++;
if(rotation>2){
rotation = 0;
}
}
    }

}
   }
}



}





var executeSingleSearch = function(singleStudentID) {
// Enter the next student ID

var studentInput= ifrDoc.getElementById('tokenfield-tokenfield');
studentInput.value= singleStudentID;
}


var loadSingleStudent = function(){
//Selects the first student in the search bar
var studentLinks= ifrDoc.getElementById('searchResults').children;
studentLinks[0].click();
ifrDoc.getElementById('btnClearSearch').click();
}

var createSingleJournalEntry = function(){

//navigates to the journal section
var blerg2= document.getElementById('detailsec1');
ifrDoc2 = blerg2.contentDocument || blerg2.contentWindow.document;
ifrDoc2.getElementById('Tabstrip1_Tab3').click();
var blerg3= ifrDoc2.getElementById('Tabstrip1_JournalControl_ifrJournal');
ifrDoc3 = blerg3.contentDocument || blerg3.contentWindow.document;
ifrDoc3.getElementById('tbbAddNote').click();
document.getElementById('menuType_miJa103').click(); //adds a "note" journal entry
//document.getElementById('menuType_miJa4').click();   //adds a "parent contact" journal entry

//creates our journal entry
ifrDoc3.getElementById('txtNoteTitle').value = noteTitle;
ifrDoc3.getElementById('txtNote').value = noteBody;
ifrDoc3.getElementById('tbbNote').click();
}
