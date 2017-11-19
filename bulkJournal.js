/***************** Eduphoria Bulk Journaling Script ****************
Author: Scott Grimes

Requirements:
Google Chrome
List of Student ID's seperated by commas

Setup:
1) Open eduphoria and navigate to the students tab in Aware.
2) Open the Console (cntrl + shift + i) and copy/paste this whole text file into the console then hit enter
3) Paste your list of student ID's (seperated by commas) into the popup window
4) Enter the title of the journal entry and body text into the popup windows
5) The script will automatically add the same entry for each student in your list
6) At the end a pop-up window will confirm that the script is done
********************************************************************/


// Executes a search for a specific student
var searchStudent = function(studentID) {
    console.log('Searching for : '+studentID);
    return new Promise(function(resolve, reject) {
        var searchElement = document.getElementById('_ctl0_ifrSearch');
        searchElement.contentWindow.$('#tokenfield').tokenfield('setTokens', studentID);
        setTimeout(function(){ }, 1000);
        resolve();
    });
}

// Clicks on the student in the search window
var loadStudent = function(){ 
    return new Promise(function(resolve, reject) {
        var loadStudentInterval= setInterval(function() {
            try{
                var searchElement = document.getElementById('_ctl0_ifrSearch');
                var ifrDoc = searchElement.contentDocument || blerg.contentWindow.document;
                var studentLinks= ifrDoc.getElementById('searchResults').children;
                if (studentLinks.length>0) {
                    clearInterval(loadStudentInterval);
                    studentLinks[0].click();
                    ifrDoc.getElementById('btnClearSearch').click();
                    setTimeout(function(){ }, 1000);
                    resolve();
                }
            }catch(e){}
        }, 2000); 
  });
}

// Clicks on the journal tab in the student details window
var clickJournalTab = function(){
    return new Promise(function(resolve, reject) {
        var clickJournalTabInterval = setInterval(function() {
        try{
            var blerg2= document.getElementById('detailsec1');
            var ifrDoc2 = blerg2.contentDocument || blerg2.contentWindow.document;
            if (ifrDoc2.getElementById('Tabstrip1_Tab3')) {
                clearInterval(clickJournalTabInterval);
                ifrDoc2.getElementById('Tabstrip1_Tab3').click();
                setTimeout(function(){ }, 1000);
                resolve();
            }
        }catch(e){}
        }, 2000); 
    });
}

// Opens the note-adding menu
var clickAddNote = function(){
    return new Promise(function(resolve, reject) {
        var clickAddNoteInterval = setInterval(function() {
        try{
            var blerg2= document.getElementById('detailsec1');
            var ifrDoc2 = blerg2.contentDocument || blerg2.contentWindow.document;
            var blerg3= ifrDoc2.getElementById('Tabstrip1_JournalControl_ifrJournal');
            var ifrDoc3 = blerg3.contentDocument || blerg3.contentWindow.document;
            if (ifrDoc3.getElementById('tbbAddNote')) {
                clearInterval(clickAddNoteInterval);
                ifrDoc3.getElementById('tbbAddNote').click();
                setTimeout(function(){ }, 500);
                resolve();
           }
        }catch(e){}
        }, 1000); 
    });
}

// Clicks on the type of note to add (parent or regular note)
var clickTypeOfNote = function(){
    return new Promise(function(resolve, reject) {
        var clickTypeOfNoteInterval = setInterval(function() {
            try{
                var blerg2= document.getElementById('detailsec1');
                var ifrDoc2 = blerg2.contentDocument || blerg2.contentWindow.document;
                var blerg3= ifrDoc2.getElementById('Tabstrip1_JournalControl_ifrJournal');
                var ifrDoc3 = blerg3.contentDocument || blerg3.contentWindow.document;
                if (document.getElementById('menuType_miJa103')) {
                    clearInterval(clickTypeOfNoteInterval);
                    document.getElementById('menuType_miJa103').click(); //adds a "note" journal entry
                    //document.getElementById('menuType_miJa4').click();   //adds a "parent contact" journal entry
                    setTimeout(function(){ }, 500);
                    resolve();
                 }
            }catch(e){}
        }, 1000);
    });
}

// Adds the journal entry
var createJournalEntry = function(){
    return new Promise(function(resolve, reject) { 
        var blerg2= document.getElementById('detailsec1');
        var ifrDoc2 = blerg2.contentDocument || blerg2.contentWindow.document;
        var blerg3= ifrDoc2.getElementById('Tabstrip1_JournalControl_ifrJournal');
        var ifrDoc3 = blerg3.contentDocument || blerg3.contentWindow.document;
        ifrDoc3 = blerg3.contentDocument || blerg3.contentWindow.document; 
        ifrDoc3.getElementById('txtNoteTitle').value = noteTitle;
        ifrDoc3.getElementById('txtNote').value = noteBody;
        ifrDoc3.getElementById('tbbNote').click();
        setTimeout(function(){ }, 2000);
        resolve();
    });
}

// Builds a promise chain, with each student executed in sequence
var startProgram = function(studentIDs) {
    var pChain = Promise.resolve();
        for(let i of studentIDs){
            pChain = pChain.then(()=>searchStudent(i))
                .then(loadStudent)
                .then(clickJournalTab)
                .then(clickAddNote)
                .then(clickTypeOfNote)
                .then(createJournalEntry)
        }
}


//Prompt the user to enter the Student ID's
var studentIDs  = prompt("Please Enter the Student ID's, seperated by commas", "000000, 000001");

if (studentIDs == null || studentIDs == "" ||studentIDs == "000000, 000001") {
    alert("You canceled this program");
}
else{
    studentIDs = studentIDs.split(',');
    var noteTitle= prompt("Please Enter the Title for your Journal Entry", "Title Text");
    if (noteTitle == null || noteTitle == "" || noteTitle == "Title Text") {
        alert("You canceled this program");
    }
    else {
        var noteBody  = prompt("Please Enter the Body for your Journal Entry", "Body Text");
        if (noteBody == null || noteBody == "" || noteBody == "Body Text") {
            alert("You canceled this program");
        }
        else {
            startProgram(studentIDs);
        }
    }
}


