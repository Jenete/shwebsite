import { firebase } from "./firebase.js";

const serverSide = new firebase();
const clientsArray = [];
await serverSide.getClients().then(result=> clientsArray.push(result));
clientsArray.forEach(element=> console.log(element))
console.log(clientsArray[0])
const clients = clientsArray[0]
// const clients = [
//     {
//     id: '1283458598',
//         name: "Lukhaya",
//         surname: "Jenete",
//         benf: "10",
//         cellNum: "0238474827",
//         status: '<a href="./TheVision2.html#settings">inert</a>'
// },
// serverSide.addClient({
//     id: '92283458598',
//         name: "Meil",
//         surname: "Jenete",
//         benf: "11",
//         cellNum: "078473727",
//         status: '<a href="./TheVision2.html#settings">inert</a>'
// })
// serverSide.addClient({
//     id: '8793458598',
//         name: "Weid",
//         surname: "Renete",
//         benf: "8",
//         cellNum: "084736727",
//         status: 'Active'
// })
// ]
export class TheVisionController {

    constructor(){
        
    }
    find(id){
        var item = null;
        clients.forEach(element =>{
            if (element.id == id){
                item =  element;
            }
        })
        return item != null;
    }

    Remove(id){
        var index = indexOf(id);
        if (index >= 0){
            clients.splice(index);
            return true;
        }
        return false;
    }

     indexOf(id){
        clients.forEach(element =>{
            if (element.id == id){
                return clients.indexOf(element, 1);
            }
        })
        return -1;
    }

    getDetailsOf(id){
        var item = null;
        clients.forEach(element =>{
            if (element.id == id){
                item =  element;
            }
        })
        return item;
    }

    getAllClients(){
        return clients;
    }

    getAllClientsWith(category, Cvalue){
        var results = null;
        switch(category){
            case "status":
                results = clients.filter((value,index)=>{
                    return value.status == Cvalue;
                });

        }
        return results;
    }

    addClient(client){
            clients.push(client)
    }

    updateClient (id, updatedVersion){
        if (!find(id)) return false;
        clients.forEach(element =>{
            if (element.id == id){
                var index = clients.indexOf(element);
                clients[index] = updatedVersion;
                return true;
            }
        })
        return false;
    }

    getNumOfClients(){
        return clients.length
    }

    async updateDatabase(){
        await serverSide.updateData(clients)
        await serverSide.getClients().then(result=> clientsArray.push(result));
        clientsArray.forEach(element=> console.log(element))
        console.log(clientsArray[0])
        clients = clientsArray[0]
    }
   
}



