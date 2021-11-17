//toogle menu
const inputFiled = document.querySelector('#textInput');
const addBtn     = document.querySelector('#addButton');
const tasksCount = document.querySelector('.tasksCount span');
const finishedTasks = document.querySelector('.TasksFinished span');
const masterDiv  = document.querySelector('.taskContaienr')

//add array that store tasks
let arrayTasks=[];

console.log(arrayTasks);


if (arrayTasks.length === 0){
    arrayTasks = JSON.parse(window.localStorage.getItem('task'));
}

//triger function that getting saved in local storage
getSaved();

addBtn.addEventListener('click', ()=>{
    if(inputFiled.value === ""){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `This Filed Can't Be Left Blank `,
        })
    }else{
        addTask(inputFiled.value);
        inputFiled.value="";
    }
})

function addTask(inValue){
    let newTask={
        id:Date.now().toString(),
        title:inValue,
        completeStat:false,
    }
    //push task to empty array
    arrayTasks.push(newTask);

    //add task to page
    addTaskToPage(arrayTasks);
    
    //add to localStorage
    saveTask(arrayTasks);
    
}



function addTaskToPage(x){
    masterDiv.innerHTML="";

    x.forEach(element => {
        const div = document.createElement('div');
        div.className ='task';
        div.setAttribute('data-id' , element.id)
        const h4 = document.createElement('h4');
        h4.className = 'selectCircle';
        const h3 = document.createElement('h3');
        h3.className = "taskTitle";
        //finish btn
        const iconFinish = document.createElement('ion-icon')
        iconFinish.setAttribute('name','checkmark-outline')
        iconFinish.className = 'taskFinished';
        iconFinish.onclick=()=>{

        //    newTask.completeStat=true;
        }
    
        //delete btn
        const iconDel = document.createElement('ion-icon')
        iconDel.setAttribute('name','trash-outline')
        iconDel.className = 'deleteBTN';
    
        //append step
        div.appendChild(h4)
        div.appendChild(h3);
        div.appendChild(iconFinish);
        div.appendChild(iconDel)
        h3.appendChild(document.createTextNode(element.title));
        //append Maindiv to div task container
        masterDiv.appendChild(div);
        inputFiled.value="";
   
    });

}



    //delete task 
    masterDiv.addEventListener('click',(event)=>{
     if(event.target.classList.contains("deleteBTN")){
      //  let test = event.target.parentElement.getAttribute('data-id');
      //  console.log(test); 
        
        //delete from local storage

        //Delete From Page
        event.target.parentElement.remove();
    }

    //finish task
    if(event.target.classList.contains('taskFinished')){
        event.target.parentElement.classList.toggle('done')
    }

    })


    //add Task to LocalStorage
    function saveTask(paramTask){
        window.localStorage.setItem('Task' , JSON.stringify(paramTask) )
    }

    //GET FROM LOCAL STORAGE
    function getSaved(){
        let data = window.localStorage.getItem('Task');
        if (data) {
            let ConvLocStor = JSON.parse(data);
            addTaskToPage(ConvLocStor);
        }

    }

    //ON CLICK DELETE BTN WILL DELETE ALSO FROM LOCAL STORAGE
    function deleteFromSaved(CurrentTaskID){
        for( let i = 0 ; i < arrayTasks.length ; i++){
            return arrayTasks[i]
        }
    }
