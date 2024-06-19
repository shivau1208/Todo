// Load Task List
fetchdata();
async function fetchdata() {
  fetch('/list')
    .then((res) => res.json())
    .then((data) => {
      // for (let i=0; i<data.length;i++){
      //     const dt = data.sort((a,b) => {
      //         if (b.time>a.time){
      //             return 1;
      //         }else{
      //             return -1;
      //         }
      //     });
      //     tasklist(dt[i].task_name,dt[i].task_complete)
      // }
      if(Array.isArray(data)){
        data.map((dt) => tasklist(dt._id,dt.task_name, dt.task_complete, dt.due_time, dt.discr));
      }else{
        console.log(data.message)
      }
    })
    .catch((error) => console.error(error));
}
function db() {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', '/list');
  xhr.onload = function () {
    let dat = JSON.parse(this.response);
    for (let i = 0; i < dat.length; i++) {
      let dt = dat[i].task_name;
      let complete = dat[i].task_complete;
      tasklist(dt, complete);
    }
  };
  xhr.send();
}

// Adding New Task
document.getElementById('modal').addEventListener('click', insert);
function insert() {
  document.getElementById('form').addEventListener('submit', async function (e) {
    e.preventDefault();
    let oname = e.target.inputId.value;
    let odate = e.target.date.value;
    let odiscr = e.target.message_text.value;
    let complete = 0
    if (oname != '' && odate != '') {
      await fetch('/task', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ oname, odate, odiscr, complete}),
      });
      document.getElementById('close').click();
      window.location.reload();
    } else {
      alert('You must write something!');
    }
    // var xml = new XMLHttpRequest();
    // xml.open('POST','/task');
    // xml.setRequestHeader('Content-Type','application/json')
    // xml.send(JSON.stringify({oname,odate,odiscr}))
  });
  db();
}

// Displaing New Task
function tasklist(id,data, complete, time, discr) {
  let lin = document.createElement('div');
  lin.id = id
  lin.className = 'list-group-item mt-3 d-flex align-items-center li list-width';
  let tsk = document.createTextNode(data);
  let text = document.createElement('h4');
  text.className = 'text-dark mt-1 flex-grow-1 text';
  text.id = 'read';
  text.style.textDecoration = 'none';
  text.addEventListener('click', function (e) {
    let name = data;
    linethrough(e, name);
  });
  text.appendChild(tsk);
  if (complete == 1) {
    text.style = 'text-decoration: line-through;text-decoration-style: solid;text-decoration-thickness: 2px;';
  }
  lin.appendChild(text);
  if (complete == 1) {
    document.getElementById('list').append(lin);
  } else {
    document.getElementById('list').prepend(lin);
  }
  EditIconFunc(lin, data, time, discr);
  DeleteIconFunc(lin);
}

// Strike-Through to Mark as Read
function linethrough(ev, name) {
  let task_complete = null
  console.log(ev.target.style.textDecoration)
  if (ev.target.style.textDecoration !== 'none') {
    ev.target.style.textDecoration = 'none';
    task_complete = 0;
    document.getElementById('list').prepend(ev.target.parentElement);
    fetch('/complete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ task_complete, name }),
    });
  } else {
    ev.target.style = 'text-decoration: line-through;text-decoration-style: solid;text-decoration-thickness: 2px;';
    task_complete = 1;
    document.getElementById('list').append(ev.target.parentElement);
    fetch('/complete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ task_complete, name }),
    });
  }
}

// Edit Task
function EditIconFunc(lin, name, time, discr) {
  let edit = document.createElement('i');
  edit.className = 'fa fa-solid fa-pen-to-square p-1 m-1 edit';
  edit.style.cursor = 'pointer';
  lin.appendChild(edit);
  edit.addEventListener('click', function (e) {
    editable(name, time, discr);
  });
}
function editable(name, time, discr) {
  document.getElementById('modal1').click();
  let input = document.getElementById('inputId');
  input.value = name;
  let x = new Date(time);
  let y = x.toISOString().slice(0, 16);
  document.getElementById('date').value = y;
  document.getElementById('message_text').value = discr;
  update(name);
}
function update(name) {
  document.getElementById('form').addEventListener('submit', async function (e) {
    e.preventDefault();
    let nname = e.target.inputId.value;
    let ndate = e.target.date.value;
    let ndiscr = e.target.message_text.value;
    console.log(name, nname, ndate, ndiscr);
    await fetch('/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nname, ndate, ndiscr, name }),
    });
    document.getElementById('close').click();
    window.location.reload();
  });
}

// Modal Close Button Event
document.getElementById('close').addEventListener('click', cls);
function cls() {
  document.getElementById('inputId').value = '';
  document.getElementById('date').value = '';
  document.getElementById('message_text').value = '';
}

// Delete Single Task
function DeleteIconFunc(lin) {
  let delete_icon = document.createElement('i');
  delete_icon.className = 'fa fa-solid fa-minus p-1 m-1';
  delete_icon.style.cursor = 'pointer';
  lin.appendChild(delete_icon);
  delete_icon.addEventListener('click', delSingle);
}
function delSingle() {
  let div = this.parentElement;
  div.remove();
  let xml = new XMLHttpRequest();
  xml.open('POST', '/delete', true);
  xml.setRequestHeader('Content-Type', 'application/json');
  xml.send(JSON.stringify(div.firstChild.textContent));
}

// Mark as Read all Tasks
document.getElementById('right').addEventListener('click', markRead);
function markRead() {
  let li = document.querySelectorAll('.li');
  for (j = 0; j < li.length; j++) {
    li[j].firstChild.style = 'text-decoration: line-through;text-decoration-style: solid;text-decoration-thickness: 2px;';
    fetch('/complete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        task_name: li[j].firstChild.textContent,
      }),
    });
  }
}

// Delete All Tasks
document.getElementById('del').addEventListener('click', delAll);
function delAll() {
  let propt = prompt('Are you sure?');
  if (propt == 'yes') {
    fetch('/deleteall', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(()=>fetchdata())
    
  }
}
