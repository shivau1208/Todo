var task = document.getElementById('btn').addEventListener('click',taskinput);

function taskinput(){
    var lin = document.createElement('li');
    lin.className = 'list-group-item mb-3';
    // lin.classList.add('mb-2');
    var input = document.getElementById('inputId').value;
    var text = document.createTextNode(input);
    lin.appendChild(text);
    if(input === ''){
        alert('You must write somthing!');
    }else{
        document.getElementById('list').appendChild(lin);
    }
    document.getElementById("inputId").value = "";
}