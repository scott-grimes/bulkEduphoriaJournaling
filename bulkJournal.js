/******************** Instructions *********************************

Requirements:
Google Chrome
List of Student ID's seperated by commas

Setup:

1) Open eduphoria and navigate to the students tab in Aware.

2) Open the Console (cntrl + shift + i) and copy/paste this whole text file into the console then hit enter

3) Paste your list of student ID's (seperated by commas) into the popup window

4) Enter the title of the journal entry and body text into the popup windows

5) Click on the search box and hit enter (leave the box blank).

6) When you  that a student's journal entry has been added successfully,
click on the search box and hit enter again to move on to the next student.

Running the Program:

1) Click on the search box and press shift+enter to auto-fill the next student's ID
2) Press shift+enter and wait for the students name to appear
3) Press shift+enter to load the student
4) Press shift+enter to auto-fill the journal. Confirm that the entry is correct
5) click on the search box and press shift+enter again, repeat this process

TLDR MASH shift+enter, making sure that the student page is fully loaded each time.


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
document.getElementById('menuType_miJa103').click();

//creates our journal entry
ifrDoc3.getElementById('txtNoteTitle').value = noteTitle;
ifrDoc3.getElementById('txtNote').value = noteBody;
ifrDoc3.getElementById('tbbNote').click();
}
