var task = document.getElementById('btn').addEventListener('click',run);


function run(){
    taskinput();
}

function taskinput(){
    var lin = document.createElement('li');
    lin.className = 'list-group-item mt-3 d-flex';
    var input = document.getElementById('inputId').value;
    var tsk = document.createTextNode(input);
    var text = document.createElement('text');
    text.className = 'text-dark mt-1 flex-grow-1'
    text.appendChild(tsk);
    lin.appendChild(text);
    if(input === ''){
        alert('You must write somthing!');
    }else{
        document.getElementById('list').appendChild(lin);
    }
    document.getElementById("inputId").value = "";
    icon(lin);
    button(lin);
    image(lin); 
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
    del.className = 'fa fa-solid fa-2x fa-minus p-1 m-1';
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


