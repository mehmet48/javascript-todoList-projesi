const form=document.querySelector("#todo-form");
const todoinput=document.querySelector("#todo");
const todolist=document.querySelector(".list-group");
const firstcarbody=document.querySelectorAll(".card-body")[0];
const secondcardbody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const clearbutton = document.querySelector("#clear-todos");

eventlisteners();

function eventlisteners(){
    form.addEventListener("submit",addTodo);
    document.addEventListener("DOMContentLoaded",loadAllTodosToUI);
    secondcardbody.addEventListener("click",deleteTodo);
    filter.addEventListener("keyup",filterTodos);
    clearbutton.addEventListener("click",clearAllTodos);
}
function clearAllTodos(e){
    if(confirm("TÜMÜNÜ SİLMEK İSTEDİĞİNİZDEN EMİN MİSİNİZ?")){
        //todolist.innerHTML="";
        while(todolist.firstElementChild !=null){
            todolist.removeChild(todolist.firstElementChild);

        }


    }
}
function filterTodos(e){
   // console.log(e.target.value);
   const filterValue =e.target.value.tolowercase();
   const listitems =document.querySelectorAll(".list-group-item");

   listitems.forEach(function(listItem){
       const text =listitems.textContent.tolowercase();
       if(text.indexOf(filterValue)===-1){
           listitems.setAttribute("style","display : none ");
       }
       else{
           listitems.setAttribute("style","display : block");
       }

        

   });
}
function deleteTodo(e){
    if(e.target.className==="fa fa-remove"){
        e.target.parentElement.parentElement.remove();
        deleteTodoFormStorage(e.target.parentElement.parentElement.textContent);
        showAlert("suscess","todo başarıyla silindi...");
    }
}
function deleteTodoFormStorage(todo){
    let todos=getTodosFromStorage();
   
    todos.forEach(function(todo,index){
        if(todo===deletetodo){
            todos.splice(index,1);
        }
    });
    
    localStorage.setItem("todos",json.stringify(todos));
}
function loadAllTodosToUI(){
    let todos = getTodosFromStorage();

    todos.forEach(function(todo){
            addtodotoui(todo);
    })
}
function addTodo(e){
    const newTodo =todoinput.value.trim();
    
    if(newTodo===""){
        showAlert("danger","lütfen bir todo girin...");
    }
    else{
        addtodotoui(newTodo);
        addtodotostorage(newTodo);
        showAlert("succes","todo başarıyla eklendi...");

    }
    addtodotoui(newTodo); 

    e.preventDefault();
}

function getTodosFromStorage(){
    let todos;

    if(localStorage.getItem("todos")===null){
        todos=[];
    }
    else{
        todos=JSON.parse(localStorage.getItem("todos"));
    }

}

function addtodotostorage(newTodo){
    let todos = getTodosFromStorage();

    todos.push(newTodo);
    
    localStorage.setItem("todos",JSON.stringify(todos));


}
function showAlert(type,message){
    const alert =document.createElement("div");
    alert.className='alert alert-${type}';
    alert.textContent=message;
    firstcarbody.appendChild(alert);
    setTimeout(function() {
        alert.remove();
    }, 1000);
        
   
}
function addtodotoui(newTodo){ //string degerini lis item olarak 



    const listItem = document.createElement("li");
    const link =document.createElement("a");
    link.href="#";
    link.className="delete-item";
    link.innerHTML="<i class = 'fa fa-remove'></i> ";

    listItem.className="list-group-item d-flex justify-content-between";
    listItem.appendChild(document.createTextNode(newTodo));
    listItem.appendChild(link);

    // todo list e list item ekleme
    todolist.appendChild(listItem);
    todoinput.value="";
}
