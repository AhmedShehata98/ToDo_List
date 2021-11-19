const inputFiled = document.querySelector('#textInput');
const addBtn     = document.querySelector('#addButton');
const add_container    = document.querySelector('.add_container');
const tasksCount = document.querySelector('.tasksCount span');
const masterDiv  = document.querySelector('.taskContaienr');
const clear_all  = document.querySelector('.Clear_all');
const Theme_Btn  = document.querySelector('.Theme')
const Theme_picker_Box = document.querySelector('.theme_Box');
const Litems  = document.querySelectorAll('.theme_Box ul li');
const color_Box  = document.querySelectorAll('.colorBox')
const menuBtn    = document.querySelector('.Toggle');
const status_menu      = document.querySelector('.menu');
const RootElement= document.querySelector(':root');
//Create Array To Store Task

let TasksContainer =[];

//Fix The Local Storage Return to 0 Items After Reload page
if ( window.localStorage.getItem('Task') !== null && TasksContainer == '')
{
    TasksContainer = JSON.parse(window.localStorage.getItem('Task'))
}

//Get Items From LocalStorage in Page Load
// NIGHT_MODE_SWITCHER();
// LIGHT_MODE_SWITCHER();
GetLocalStorage();


//Trigger Delete From Page Function
DeleteTasks();


GetPickedColor();

//Incrament tasks Count 
INCREMENT_OR_DEC_CONT();


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

        //Focus on Input Filed After Adding Task
        FocusIN(inputFiled);
        
        //CHECK_USER_DATA(inputFiled.value);
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
    INCREMENT_OR_DEC_CONT();


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
        if (window.localStorage.getItem('night_Mode_body') !== null && window.localStorage.getItem('night_Mode_txt') !== null ) {
            window.localStorage.getItem('night_Mode_body')
            window.localStorage.getItem('night_Mode_txt' )
            
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
        INCREMENT_OR_DEC_CONT();
    }

    //Clear Input Field 
    document.querySelector('.empty_field').addEventListener('click' , (e)=>{
        inputFiled.value='';
    })

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

    clear_all.addEventListener('click',()=>{
        window.localStorage.removeItem('Task');
        masterDiv.innerHTML="";
        location.reload()
    })
    document.querySelector('.Clear_all_aside').addEventListener('click' , ()=>{
        window.localStorage.removeItem('Task')
        masterDiv.innerHTML="";
        location.reload()
    })

    //add click event to open status menu
    menuBtn.addEventListener('click' ,()=>{
        status_menu.classList.toggle('theme_Box_opened')
        Theme_picker_Box.classList.remove('theme_Box_opened')
    })

    // Theme Proprites Start

    //add event to Toggle theme box open or close
    Theme_Btn.addEventListener('click' , ()=>{
        Theme_picker_Box.classList.toggle('theme_Box_opened')
        status_menu.classList.remove('theme_Box_opened')

    } )

    //Add color to li (Smoll Box's) with attribute 
        Litems.forEach((v)=>{
            v.addEventListener( 'click',e =>{
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
            RootElement.style.setProperty('--main-clr',window.localStorage.getItem('Task_back_Color')); 
        }
        
        //Task Count Inc/decrement Function
        function INCREMENT_OR_DEC_CONT(){
            if( window.localStorage.getItem('Task') !== null)
            {
                document.querySelector('section aside li span').innerHTML = JSON.parse(window.localStorage.getItem('Task')).length;
                tasksCount.innerHTML = JSON.parse(window.localStorage.getItem('Task')).length;
            }
        }

        function CHECK_USER_DATA(inData){

            if (TasksContainer.length >=1) //its Means the TasksContainer its have a items
            {

                TasksContainer.forEach((tasks)=>{
                    if (tasks.Title.includes(inData.toUpperCase()) ||  tasks.Title.includes(inData.toLowerCase()) ) // Check if there is repeated Tasks
                    {
                        Swal.fire({
                            title: 'Repeated Input Text',
                            text: "Don't Repeat Your Task",
                            icon:'warning'
                        })
                        inputFiled.innerHTML = '';
                    }else{
                         STORE_VALUE(inputFiled.value.trim());
                         inputFiled.innerHTML = '';
                    }
                })


            }else{
                STORE_VALUE(inputFiled.value.trim());
                inputFiled.innerHTML = '';
            }
        }

        // Create Night Mode 
        function NIGHT_MODE_SWITCHER(){
            SAVE_NIGHT_MODE();
            document.querySelector('.Night').addEventListener('click' , ()=>{
                document.querySelector('.Night').style.visibility= "hidden";
                document.querySelector('.Light').style.display="flex"
                RootElement.style.setProperty('--main-clr' , window.localStorage.getItem('Task_back_Color'))
            })
        }

        function SAVE_NIGHT_MODE(){

            window.localStorage.setItem('night_Mode_body' , RootElement.style.setProperty('--sec-clr','#212121'));
            window.localStorage.setItem('night_Mode_txt' , RootElement.style.setProperty('--tx-clr','#F9F9F9'));
        }

        //Create Light Mode
        function LIGHT_MODE_SWITCHER(){
            SAVE_LIGHT_MODE();
            document.querySelector('.Light').addEventListener('click' , ()=>{
                document.querySelector('.Light').style.display= "none";
                document.querySelector('.Night').style.visibility= "visible";

            })
        }

        function SAVE_LIGHT_MODE(){
            window.localStorage.setItem('Light_Mode_body' , RootElement.style.setProperty('--sec-clr','#EEEEEE') )
            window.localStorage.setItem('Light_Mode_txt' , RootElement.style.setProperty('--tx-clr','#090910') )
        }