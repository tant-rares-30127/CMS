import {initializeApp} from "https://www.gstatic.com/firebasejs/9.0.1/firebase-app.js";
import {getFirestore, doc, setDoc, getDoc, getDocs, collection, Timestamp, deleteDoc, query, where} from "https://www.gstatic.com/firebasejs/9.0.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDxqcFls44cCSrDK60cbr6aBZh6ioImRtY",
  authDomain: "cms-madebyrares.firebaseapp.com",
  projectId: "cms-madebyrares",
  storageBucket: "cms-madebyrares.appspot.com",
  messagingSenderId: "121958132101",
  appId: "1:121958132101:web:d793d87dcb57e795973cec",
  measurementId: "G-HSRBRG5LWE"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db=getFirestore(firebaseApp);
const querySnapshot = await getDocs(collection(db, "members"));
const membersRef = collection(db, "members");
var lastMemberId=0;

//Changing the format of date
function RefactorDate(day, month, year){
    var namedMonth;
    if (month==1) namedMonth=" January ";
    if (month==2) namedMonth=" February ";
    if (month==3) namedMonth=" March ";
    if (month==4) namedMonth=" April ";
    if (month==5) namedMonth=" May ";
    if (month==6) namedMonth=" June ";
    if (month==7) namedMonth=" July ";
    if (month==8) namedMonth=" August ";
    if (month==9) namedMonth=" September ";
    if (month==10) namedMonth=" October ";
    if (month==11) namedMonth=" November ";
    if (month==12) namedMonth=" December ";
    return day + namedMonth + year
}

function ClearModalFields(){
    document.getElementById('lastNameInput').value=null;
    document.getElementById('firstNameInput').value=null;
    document.getElementById('emailInput').value=null;
    document.getElementById('sexInput').value=null;
    document.getElementById('birthdateInput').value=null;
}

function InsertElementInTable(element, firstName, lastName){
    var email=element.data()["email"];
    var sex=element.data()["sex"];
    var date=element.data()["birthdate"].toDate();
    var year=date.getFullYear();
    var month=date.getMonth() + 1;
    var day=date.getDate();
    var table=document.getElementById('table');
    var row=table.insertRow();
    row.className="bottom-row";
    var cell1=row.insertCell(0);
    var cell2=row.insertCell(1);
    var cell3=row.insertCell(2);
    var cell4=row.insertCell(3);
    var cell5=row.insertCell(4);
    var cell6=row.insertCell(5);
    cell1.innerHTML=firstName;
    cell2.innerHTML=lastName;
    cell3.innerHTML=email;
    cell4.innerHTML=sex;
    cell5.innerHTML=RefactorDate(day, month, year);
    cell6.innerHTML='<span class="delete-button fa fa-remove" id="deleteButton">';
    var drop=document.getElementsByClassName("delete-button");
    var currentid=element.data()["id"];
    drop[row.rowIndex-1].addEventListener("click", async function(){
          DeleteMember(row, currentid);
        });
    if (currentid>lastMemberId) lastMemberId=currentid;
}

// Adding members from firestore to table
function  ReadMembersFromDatabase(){
    var name = document.getElementById("searchBar").value;
    querySnapshot.forEach(element => {
        var lastName=element.data()["lastname"];
        var firstName=element.data()["firstname"];
        if (name==null) InsertElementInTable(element);
        else if (firstName.includes(name) || lastName.includes(name)) InsertElementInTable(element, lastName, firstName);
  });
}
ReadMembersFromDatabase();
// ------------>


//Adding members to the database and table

//In the database
async function AddMemberInDatabase(lastName, firstName, Email, Sex, Birthdate){
  lastMemberId++;
  var currentid=lastMemberId;
  await setDoc(doc(membersRef, `${currentid}`),{
    firstname: firstName,
    lastname: lastName,
    email: Email,
    sex: Sex,
    birthdate: Timestamp.fromDate(Birthdate),
    id: currentid
  });
}

//Event listener
document.getElementById("addButton").addEventListener("click", async function(){
    AddMember();
    ClearModalFields();
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
});

//In the table
function AddMember() {
    var lastName=document.getElementById('lastNameInput').value;
    var firstName=document.getElementById('firstNameInput').value;
    var email=document.getElementById('emailInput').value;
    var sex=document.getElementById('sexInput').value;
    var birthdate=document.getElementById('birthdateInput').value;
    var boolean=0;
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    //Last name alert
    if (firstName==""){
        alert("First name is empty");
        boolean=1;
    }
    else{
        //First name alert
        if (lastName==""){
            alert("Last name is empty");
            boolean=1;
        }
        else{
            //Email alert
            if (email==""){
                alert("Email is empty");
                boolean=1;
            }
            else{
                //Sex alert
                if (sex==""){
                    alert("Choose your sex");
                    boolean=1;
                }
                else{
                    //Birthdate alert
                    if (birthdate==""){
                        alert("Choose a birthdate");
                        boolean=1;
                    }
                    else{
                        //Email regex alert
                        if (regex.test(String(email).toLowerCase())){
                        }
                        else{
                            alert("Insert a valid email");
                            boolean=1;
                        }
                    }
                }
            }
        }
    }

    var dtToday = new Date();
    var year = dtToday.getFullYear();
    var month = dtToday.getMonth();
    var day = dtToday.getDate();
    var selectedData=document.getElementById("birthdateInput").value;
    var selectedDate=new Date(selectedData);
    var selectedYear=selectedDate.getFullYear();
    var selectedMonth=selectedDate.getMonth();
    var selectedDay=selectedDate.getDate();

    if (year-selectedYear<=16){
        if (year-selectedYear==16){
            if (selectedMonth>=month)
                if (selectedMonth==month){
                    if (selectedDay>day){
                        boolean=1;
                        alert("You have to be at least 16 years old");
                    }
                }
                else{
                    boolean=1;
                    alert("You have to be at least 16 years old");
                }
        }
        else{
            boolean=1;
            alert("You have to be at least 16 years old");
        }
    } 

    if (boolean==0){
        var table=document.getElementById('table');
        var row=table.insertRow();
        row.className="bottom-row";
        var cell1=row.insertCell(0);
        var cell2=row.insertCell(1);
        var cell3=row.insertCell(2);
        var cell4=row.insertCell(3);
        var cell5=row.insertCell(4);
        var cell6=row.insertCell(5);
        cell1.innerHTML=firstName;
        cell2.innerHTML=lastName;
        cell3.innerHTML=email;
        cell4.innerHTML=sex;
        cell5.innerHTML=RefactorDate(selectedDay, selectedMonth+1, selectedYear);
        cell6.innerHTML='<span class="delete-button fa fa-remove" id="deleteButton">'
        var drop=document.getElementsByClassName("delete-button");
        var currentid=lastMemberId+1;
        console.log(currentid);
        drop[row.rowIndex-1].addEventListener("click", async function(){
            console.log(currentid);
            DeleteMember(row, currentid);
        });
        AddMemberInDatabase(lastName, firstName, email, sex, selectedDate);
    }
}
//--------------->


//Deleting members from the database and table
//From the database
function DeleteMemberFromDatabase(currentid){
  deleteDoc(doc(db, "members", `${currentid}`));
}

//From the table
function DeleteMember(row, currentid){
    var table=document.getElementById('table');
    var id=row.rowIndex;
    table.deleteRow(id);
    DeleteMemberFromDatabase(currentid);
}
//------------------>

//Remove data from the table
function CleanTable(){
    var table=document.getElementById("table");
    for (var i=table.rows.length-1; i>0; i-- ){
        table.deleteRow(i);
    }
}

//Search bar
document.getElementById("searchIcon").addEventListener("click", async function(){
    CleanTable();
    ReadMembersFromDatabase();
});

//Modal interaction
//Open modal eventlistener
document.getElementById("myBtn").addEventListener("click", async function(){
  OpenModal();
});

//Open modal function
function OpenModal(){
    var modal = document.getElementById("myModal");
    var btn = document.getElementById("myBtn");
    var span = document.getElementsByClassName("close")[0];
    modal.style.display = "block";
    span.onclick = function() {
        modal.style.display = "none";
        ClearModalFields();
    }
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
            ClearModalFields();
        }
    }
}
//-------------->
