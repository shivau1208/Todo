var task = document.getElementById('btn').addEventListener('click',run);


function run(){
    var input = document.getElementById('inputId').value;
    if(input === ''){
        alert('You must write somthing!');
    }
    else{
        db()
    }
}

function taskinput(data){
    var lin = document.createElement('li');
    lin.className = 'list-group-item mt-3 d-flex li';
    // var input = data;
    var tsk = document.createTextNode(data);
    var text = document.createElement('text');
    text.className = 'text-dark mt-1 flex-grow-1 text'
    text.appendChild(tsk);
    lin.appendChild(text);
    document.getElementById('list').appendChild(lin);
    // if(input === ''){
    //     alert('You must write somthing!');
    // }else{
    //     document.getElementById('list').appendChild(lin);
    // }
    icon(lin);
    button(lin);
    image(lin);
    // document.getElementById("inputId").value = "";
}


function icon(lin) {
    var icon = document.createElement('i');
    icon.className = 'fa fa-solid fa-2x fa-bounce fa-angles-down p-1 m-1';
    icon.style = '--fa-animation-duration: 2s; --fa-animation-iteration-count: 3;';
    lin.appendChild(icon);
}

function image(lin) {
    var clk = document.createElement('i');
    clk.className = 'fa fa-solid fa-2x fa-shake fa-clock p-1 m-1';
    clk.style = '--fa-animation-duration: 2s;';
    lin.appendChild(clk);
}

function button(lin) {
    var del = document.createElement('i');
    del.className = 'fa fa-solid fa-2x fa-minus p-1 m-1 delete';
    lin.appendChild(del);
    del.addEventListener('click',Delete)
}

function Delete(){
    // e.preventDefault();
    let propt = prompt('Are you sure?');
    if(propt=='yes'){
        var div = this.parentElement;
        div.remove();
    }
}

function db(){
    const xhr = new XMLHttpRequest();
    xhr.open("GET","/task")
    xhr.onload = function(){
        var dat = JSON.parse(this.response);
        for (let i=0; i<dat.length;i++){
            var dt = dat[i].task_name;
            taskinput(dt)
        }
    }
    xhr.send();
}

// db();
fetchdata();       

function fetchdata() {
    fetch('/task')
        .then(res => res.json())
        .then(data => {
            for (let i=0; i<data.length;i++){
                var dt = data[i].task_name;
                taskinput(dt)
            }
        }
        )
        .catch(error => console.error(error))
}
// fetch('/task',{
//     method:'POST',
//     headers:{
//         'Accept':'application/json, text/plain,*/*',
//         'Content-Type':'application/json'
//     }
//     })
//     .then(res => res.json())
//     .then(data => console.log(data))
//     .catch(error => console.error(error))
    