function AddMember() {
    var lastName=document.getElementById('lastNameInput').value;
    var firstName=document.getElementById('firstNameInput').value;
    var email=document.getElementById('emailInput').value;
    var sex=document.getElementById('sexInput').value;
    var birthdate=document.getElementById('birthdateInput').value;
    var boolean=0;
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (lastName==""){
        alert("Last name is empty");
        boolean=1;
    }
    if (firstName==""){
        alert("First name is empty");
        boolean=1;
    }
    if (email==""){
        alert("Email is empty");
        boolean=1;
    }
    if (sex==""){
        alert("Choose your sex");
        boolean=1;
    }
    if (birthdate==""){
        alert("Choose a birthdate");
        boolean=1;
    }

    if (regex.test(String(email).toLowerCase())){
    }
    else{
        alert("Insert a valid email");
        boolean=1;
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
        cell1.innerHTML=lastName;
        cell2.innerHTML=firstName;
        cell3.innerHTML=email;
        cell4.innerHTML=sex;
        cell5.innerHTML=birthdate; 
        cell6.innerHTML='<span class="delete-button fa fa-remove" id="deleteButton" onclick="DeleteMember(this)">'
    }
}

function DeleteMember(row){
    var table=document.getElementById('table');
    var id=row.parentNode.parentNode.rowIndex;
    table.deleteRow(id);
}

function OpenModal(){
    var modal = document.getElementById("myModal");
    var btn = document.getElementById("myBtn");
    var span = document.getElementsByClassName("close")[0];
    modal.style.display = "block";
    span.onclick = function() {
        modal.style.display = "none";
    }
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}