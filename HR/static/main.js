document.getElementById('btn').addEventListener('click',run);

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
    var tsk = document.createTextNode(data);
    var text = document.createElement('text');
    text.className = 'text-dark mt-1 flex-grow-1 text'
    text.appendChild(tsk);
    lin.appendChild(text);
    document.getElementById('list').appendChild(lin);
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

function button(lin) {
    var Delete = document.createElement('i');
    Delete.className = 'fa fa-solid fa-2x fa-minus p-1 m-1';
    lin.appendChild(Delete);
    Delete.addEventListener('click',delSingle)
}

function image(lin) {
    var clk = document.createElement('i');
    clk.className = 'fa fa-solid fa-2x fa-shake fa-clock p-1 m-1';
    clk.style = '--fa-animation-duration: 2s;';
    lin.appendChild(clk);
}

document.getElementById('right').addEventListener('click', markRead)
function markRead(){
    var li = document.querySelectorAll('.li');
    for (j=0; j<li.length;j++){
        li[j].firstChild.style = 'text-decoration: line-through;text-decoration-style: solid;text-decoration-thickness: 2px;';
        fetch('/complete',{
            method: 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                task_name:li[j].firstChild.textContent,
            })
        })
    }
}

fetchdata();       

function fetchdata() {
    fetch('/list')
        .then(res => res.json())
        .then(data => {
            for (let i=0; i<data.length;i++){
                const dt = data.sort((a,b) => {
                    if (b.time>a.time){
                        return 1;
                    }else{
                        return -1;
                    }
                });
                taskinput(dt[i].task_name);
            }
        }
        )
        .catch(error => console.error(error))
}

function db(){
    const xhr = new XMLHttpRequest();
    xhr.open("GET","/list")
    xhr.onload = function(){
        var dat = JSON.parse(this.response);
        for (let i=0; i<dat.length;i++){
            var dt = dat[i].task_name;
            taskinput(dt)
        }
    }
    xhr.send();
}

function delSingle(){
    let propt = prompt('Are you sure?');
    if(propt=='yes'){
        var div = this.parentElement;
        div.remove();
        const d= JSON.stringify(div.firstChild.textContent);
        delS(d);
    }
}

document.getElementById('del').addEventListener('click',delAll);

function delAll(){
    let propt = prompt('Are you sure?');
    if(propt=='yes'){
        let lis = document.querySelectorAll('.li');
        for (i=0; i<lis.length;i++){
            lis[i].remove();
            const d= JSON.stringify(lis[i].firstChild.textContent);
            delA(d);
        }
    }
}

function delA(d) {
    fetch('/del', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
            },
        // body: JSON.stringify(d)
        body: d
    })
    .catch(error => console.error(error));
}
function delS(d){
    var xml = new XMLHttpRequest()
    xml.open('POST','/del',true);
    xml.setRequestHeader('Content-Type','application/json')
    xml.send(d)
}
    