

import { firebase } from "./firebase.js";
import { TheVisionController } from "./TheVisionController.js";

const controller  = new TheVisionController();
const clients = controller.getAllClients();

var table = document.getElementById("table"),rIndex;
    
    function addTableEvent(){
        for(var i = 1; i < table.rows.length; i++){
            table.rows[i].onclick = function(){
                rIndex = this.rowIndex;
                console.log(rIndex);
                document.getElementById("idNumber").value = this.cells[0].innerHTML;
                document.getElementById("fname").value = this.cells[1].innerHTML;
                document.getElementById("lname").value = this.cells[2].innerHTML;
                document.getElementById("country").value = this.cells[3].innerHTML;
                document.getElementById("mNumber").value = this.cells[4].innerHTML;
                document.getElementById("updateBtn").click();
                sessionStorage.setItem("currentUser",setClient())
            };
        }
        try {
            document.getElementsByClassName("editRowBtn").addEventListener("click",editRow())
        } catch (error) {
            
        };
    }
                
    function addRow(clients){
            var row = document.createElement('tr');
            var tabledata = "";
            clients.forEach(element => {
                tabledata +=  "<td>"+ element.id +"</td>";
                tabledata +=  "<td>"+ element.name +"</td>";
                tabledata +=  "<td>"+ element.surname +"</td>";
                tabledata +=  "<td>"+ element.benf +"</td>";
                tabledata +=  "<td>"+ element.cellNum +"</td>";
                tabledata +=  "<td>"+ element.status +"</td>";
                row.innerHTML = tabledata
                //console.log(row);
                table.appendChild(row);
                tabledata = "";
                row = document.createElement('tr');
            });
            addTableEvent();
    }
    addRow(clients);
    function addClient(){
        const client = [{
            id: document.getElementById("idNumber").value ,
            name: document.getElementById("fname").value,
            surname: document.getElementById("lname").value,
            benf: document.getElementById("country").value,
            cellNum: document.getElementById("mNumber").value  
            }
        ]
        addRow(client);

    }
    function setClient(){
        return {
            id: document.getElementById("idNumber").value ,
            name: document.getElementById("fname").value,
            surname: document.getElementById("lname").value,
            benf: document.getElementById("country").value,
            cellNum: document.getElementById("mNumber").value  
            };
    }
    
    addTableEvent();          
    // edit the row
    function editRow(){
        try{
        table.rows[rIndex].cells[1].innerHTML = document.getElementById("fname").value;
        table.rows[rIndex].cells[2].innerHTML = document.getElementById("lname").value;
        table.rows[rIndex].cells[3].innerHTML = document.getElementById("country").value;
        table.rows[rIndex].cells[4].innerHTML = document.getElementById("mNumber").value;
        }catch(err){

        }
    }

    document.getElementById("searchBar").addEventListener('input',(e)=>{
        var results = []
        if(e.target.value){
            results = clients.filter(item => (item.name.toLowerCase().concat(item.surname.toLowerCase())).includes(e.target.value.toLowerCase()));
            results = results.map(item => '<button type="button" class="list-group-item list-group-item-action">'+item.name+" "+item.surname+'</button>')
        }
        showSearchResults(results);
        results = []
    })

    function showSearchResults(items){
        var display = items.join("");
        console.log(display);
        document.getElementById("searchList").innerHTML = display;
    }
    
    