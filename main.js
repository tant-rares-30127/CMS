function AddMember() {
    var lastName=document.getElementById('lastNameInput').value;
    var firstName=document.getElementById('firstNameInput').value;
    var email=document.getElementById('emailInput').value;
    var sex=document.getElementById('sexInput').value;
    var birthdate=document.getElementById('birthdateInput').value;
    console.log(`${lastName} ${firstName} ${email} ${sex} ${birthdate}`);
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

function DeleteMember(row){
    var table=document.getElementById('table');
    var id=row.parentNode.parentNode.rowIndex;
    table.deleteRow(id);
}
