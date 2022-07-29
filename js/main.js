var task = document.getElementById('btn').addEventListener('click',taskinput);


function taskinput(){
    var lin = document.createElement('li');
    lin.className = 'list-group-item mb-3 d-flex justify-content-between';
    var input = document.getElementById('inputId').value;
    var text = document.createTextNode(input);
    lin.appendChild(text);
    if(input === ''){
        alert('You must write somthing!');
    }else{
        document.getElementById('list').appendChild(lin);
    }
    document.getElementById("inputId").value = "";
    var span = document.createElement('button');
    var txt = document.createTextNode('X');
    span.className = 'btn btn-danger'
    span.appendChild(txt);
    lin.appendChild(span);
    span.addEventListener('click',function(e){
        e.preventDefault();
        // let prompt = prompt('Are you sure?');
        let propt = prompt('Are you sure?');
        if(propt=='yes'){
            var div = this.parentElement;
            div.remove();
        }
    })
} 
