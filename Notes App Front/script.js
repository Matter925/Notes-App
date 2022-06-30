

const saveButton =document.querySelector('#btnSave');
const titleInput =document.querySelector('#title');
const descriptionInput =document.querySelector('#description');
const notesContainer =document.querySelector('#notes__container');
const deleteButton =document.querySelector('#btnDelete');

function clearForm(){
    titleInput.value='';
    descriptionInput.value='';
    deleteButton.classList.add('hidden');

}
function displayNoteInForm(note){
    
    titleInput.value = note.title;
    descriptionInput.value = note.description;
    deleteButton.classList.remove('hidden');
    deleteButton.setAttribute('data-id',note.id);
    saveButton.setAttribute('data-id',note.id);
}

function getNoteById(id){
    
    fetch(`https://localhost:7178/api/Notes/${id}:Guid`)
    .then( data=>data.json()).then(response => displayNoteInForm(response));
    
}

function populateForm(id){
    
    getNoteById(id)
}

function AddNote( title ,description){

    const body={
        "title": title,
        "description":description,
        "isVisible": true

    };

    fetch('https://localhost:7178/api/Notes',{
        method: 'POST',
        body:JSON.stringify(body),
        headers:{
            'Content-Type': 'application/json'
        }
    }).then( data=>data.json()).then(response =>{
        clearForm();
        GetAllNotes();
    });
}

function displayNotes(notes){

 let allNotes ='';   
 notes.forEach(note=>{
   const noteElement= `<div class="note" data-id="${note.id}">
                            <h3>${note.title}</h3>
                            <p>${note.description}</p>
                        </div>
                      `;
    allNotes +=  noteElement;               
                 
 });
 notesContainer.innerHTML= allNotes  ; 
 document.querySelectorAll('.note').forEach(note=>{
  note.addEventListener('click', function(){
    
    populateForm(note.dataset.id);
  });
 });
}
function GetAllNotes(){
    
    
    fetch('https://localhost:7178/api/Notes')
    .then( data=>data.json()).then(response => displayNotes(response));
}

GetAllNotes();

function updateNote(id ,title,description){

    const body={
        "title": title,
        "description":description,
        "isVisible": true

    };

    fetch(`https://localhost:7178/api/Notes/${id}:Guid`,{
        method: 'PUT',
        body:JSON.stringify(body),
        headers:{
            'Content-Type': 'application/json'
        }
    }).then( data=>data.json()).then(response =>{
        clearForm();
        GetAllNotes();
    });
}

saveButton.addEventListener('click', function(){
    const id=saveButton.dataset.id;
    if(id){
        updateNote(id ,titleInput.value,descriptionInput.value)
    }else{
        AddNote(titleInput.value,descriptionInput.value); 

    }
    
});

function deleteNote(id){

    
    fetch(`https://localhost:7178/api/Notes/${id}:Guid`,{
        method: 'DELETE',
        headers:{
            'Content-Type': 'application/json'
        }
    }).then(response =>{
        clearForm();
        GetAllNotes();
    }
        );
}

deleteButton.addEventListener('click',function(){
 const id=deleteButton.dataset.id;
 deleteNote(id);
});