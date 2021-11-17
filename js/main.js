const inputFiled = document.querySelector('#textInput');
const addBtn     = document.querySelector('#addButton');
const add_container = document.querySelector('.add_container');
const tasksCount = document.querySelector('.tasksCount span');
const masterDiv  = document.querySelector('.taskContaienr');
const clear_all  = document.querySelector('.Clear_all');
const Theme_Btn  = document.querySelector('.Theme')
const Theme_picker_Box = document.querySelector('.theme_Box');
const Litems  = document.querySelectorAll('.theme_Box ul li');
const color_Box  = document.querySelectorAll('.colorBox')
const menuBtn    = document.querySelector('.Toggle');
const status_menu    = document.querySelector('.menu');
//Create Array To Store Task

let TasksContainer =[];

//Fix The Local Storage Return to 0 Items After Reload page
if (TasksContainer == '' && TasksContainer !== null ) {
        TasksContainer = JSON.parse(window.localStorage.getItem('Task'))
}


//Get Items From LocalStorage in Page Load
GetLocalStorage();


//Trigger Delete From Page Function
DeleteTasks();


GetPickedColor();

//Incrament tasks Count 
tasksCount.innerHTML = TasksContainer.length


addBtn.addEventListener( 'click',()=>{
    if(inputFiled.value === ""){
        Swal.fire({
            icon:'error',
            title:'Oops',
            text: 'Slowly Dont leave input Filed blank',
        })
    }else{
        STORE_VALUE(inputFiled.value.trim());
        inputFiled.value = '';
    }
})

function STORE_VALUE(inputValue){
    //Create Object to Store Task [ value & ID & ComleteStat]
    let Task = {

        ID: Date.now(),
        Title: inputValue,
        CompleteStat:false,
    } 

    //Pushing The (Task Object) to TasksContainer
    TasksContainer.push(Task);

    //Adding The (Task Container) Values To Page As Html Elements
    BUILD_HTML_ELEMENT(TasksContainer);
    
    //Adding Tasks To LocalStorage 
    SaveLocalStorage(TasksContainer);

    //Incrament tasks Count 
    tasksCount.innerHTML = TasksContainer.length

    //Focus on Input Filed After Adding Task
    FocusIN(inputFiled);
}
function BUILD_HTML_ELEMENT(ArrayValues){
    //Empty The Task Elements Container Div
    masterDiv.innerHTML='';
    //Looping on (TasksContainer) values
    ArrayValues.map( (value)=>{
        //Create Div For task and set class & Attribute
        let div = document.createElement('div');
        div.className= "task"
        if (value.CompleteStat == true) {
            div.className = 'task done'
        }
        div.setAttribute('data-id' , value.ID);
        //Create Select 
        let h4 = document.createElement('h4');
        h4.className = 'selectCircle';
        //Create Element For Display Task Title
        let h3 = document.createElement('h3');
        h3.className = 'taskTitle';
        h3.appendChild(document.createTextNode(value.Title));
        //Create Icon For Delete BTN
        let Del_Ico = document.createElement('ion-icon');
        Del_Ico.setAttribute('name' , 'trash-outline');
        Del_Ico.className= 'deleteBTN';
        //Create Element For Finish BTN
        let Finish_Ico = document.createElement('ion-icon');
        Finish_Ico.setAttribute('name' , 'checkmark-outline');
        Finish_Ico.className= "taskFinished";

        //Append Child Element TO div Parent Element
        div.appendChild(h4);
        div.appendChild(h3);
        div.appendChild(Del_Ico);
        div.appendChild(Finish_Ico);
        
        //Append div Parent Element To Div Task Container Div
        masterDiv.appendChild(div);



    })
}

    //Adding Tasks To LocalStorage 

    function SaveLocalStorage(Task){
        window.localStorage.setItem('Task' , JSON.stringify(Task));
    }

    //Get Elements From Local Storage
    function GetLocalStorage(){
        let Data = window.localStorage.getItem('Task')
        if(Data){
            let DataConverted = JSON.parse(Data);
                BUILD_HTML_ELEMENT(DataConverted)
        }
    }

    //Focus On Input Filed 
    function FocusIN(input){
        inputFiled.focus()
    }

    //Delete Element From Page & Local Storage
    function DeleteTasks(){
        masterDiv.addEventListener( 'click' , (e)=>{
            if (e.target.classList.contains('deleteBTN')) {
                e.target.parentElement.remove();

                //Delete From LocalStorage
                DeleteStoredItem(e.target.parentElement.getAttribute('data-id'))
            }
        })
    }

    //Delete From LocalStorage
    function DeleteStoredItem(item){
        
        //Remove Task From SaveLocalStorage;
        TasksContainer = TasksContainer.filter( arrValue => arrValue.ID != item );
        SaveLocalStorage(TasksContainer);
    }

    //Finishs Task BTN
    masterDiv.addEventListener( "click",e=>{
        if(e.target.classList.contains('taskFinished')){
            e.target.parentElement.classList.toggle('done');
            Finish_Task_Stat(e.target.parentElement.getAttribute('data-id'));

        }
    })

    function Finish_Task_Stat(TaskID){
        TasksContainer.map( (stat)=> {
            if (stat.ID == TaskID) {
                stat.CompleteStat == false ? stat.CompleteStat = true : stat.CompleteStat = false
                SaveLocalStorage(TasksContainer);
            }
        })
    }

    //clear All BTN Properties 
    /* Hi , Its Function is Stopeed Until Fix Issue */
    // clear_all.addEventListener('click',()=>{
    //     masterDiv.innerHTML="";
    //     window.localStorage.removeItem('Task')
    // })

    //add click event t open status menu
    menuBtn.addEventListener('click' ,()=>{
        status_menu.classList.toggle('theme_Box_opened')
    })

    // Theme Proprites Start

    //add event to Toggle theme box open or close
    Theme_Btn.addEventListener('click' , ()=>{
        Theme_picker_Box.classList.toggle('theme_Box_opened')
    } )

    //Add color to li (Smoll Box's) with attribute 
        Litems.forEach((v)=>{
            v.addEventListener( 'click',e =>{

                // window.localStorage.setItem('Task_Back_Color', e.target.getAttribute('data-color'));
                
                // masterDiv.style.backgroundColor=window.localStorage.getItem('Task_Back_Color')
                SavePickedColor(e.target.getAttribute('data-color'));
                GetPickedColor();
            })
        })

        //Save Picked Color To Local Storage 
        function SavePickedColor(colorParam){
            window.localStorage.setItem('Task_back_Color',colorParam)
        }
        function GetPickedColor(){
            window.localStorage.getItem('Task_back_Color');
            masterDiv.style.backgroundColor=window.localStorage.getItem('Task_back_Color');
            add_container.style.backgroundColor=window.localStorage.getItem('Task_back_Color');
        }
        