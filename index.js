function getAndUpdate(){
    console.log("Updating")
    tit = document.getElementById('title').value;
    desc = document.getElementById('description').value;
    // if it us null
    if (localStorage.getItem('itemsJson')==null){
        itemJsonArray = [];
        itemJsonArray.push([tit,desc]);
        localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray))
    }
    // if not null
    else{
        itemJsonArrayStr = localStorage.getItem('itemsJson')
        
        // to parse it now
        itemJsonArray = JSON.parse(itemJsonArrayStr);
        itemJsonArray.push([tit,desc]);
        localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray))
    }
    update();
}


function update(){

    // if it us null
    if (localStorage.getItem('itemsJson')==null){
        itemJsonArray = [];
        localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray))
    }
    // if not null
    else{
        itemJsonArrayStr = localStorage.getItem('itemsJson')
        
        // to parse it now
        itemJsonArray = JSON.parse(itemJsonArrayStr);
    }
  
    //populate the table
    let tablebody= document.getElementById("tablebody");
    let str="";
    //{index +1} => To start count from 1
    itemJsonArray.forEach((element,index) => {
        str +=`
        <tr>
            <th scope="row">${index +1}</th>    
            <td>${element[0]}</td>
            <td>${element[1]}</td>
            <td><button class="btn btn-sm btn-primary" onclick="deleted(${index})"> Delete</button></td>
        </tr>`;
    });
    tableBody.innerHTML = str;
}

add=document.getElementById("add");
add.addEventListener("click", getAndUpdate);
update();  // to call one time update bydefault 

//making delete function
function deleted(itemIndex){
    console.log("Delete",itemIndex);

    itemJsonArrayStr = localStorage.getItem('itemsJson');
    itemJsonArray = JSON.parse(itemJsonArrayStr);
    // FETCHED BOTH STRING AND ARRAY

    // Now deleting itemIndex from array
    // splice() ==> It adds and/or removes array elements.It overwrites the original array.
    itemJsonArray.splice(itemIndex,1);
    localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray));
    
    //calling update
    update();
}

function clearStorage(){
    if(confirm("Do you really want to Clear ?? ")){
        console.log("Clearing the storage");
        localStorage.clear();

        //updating it
        update();
    }
}