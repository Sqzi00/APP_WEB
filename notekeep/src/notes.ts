import {AppStorage} from './appStorageLocal';
import {IAppStorage} from './IAppStorage';
import { AppFirebaseStorage } from './appFirebaseStorage';
import { firebaseModeOn } from './configFB';
export class Notes{

    async notesDisplay(){
        if (firebaseModeOn === true){
            //#region firebase
            console.log("firebase");
            const tmp = new AppFirebaseStorage();
            const x = await tmp.getNotes();

            for(let i = 0; i < x.length; i++){

                //tworzenie szkieletu
                const noteBox = document.createElement('div');
                const noteBoxTop = document.createElement('div');
                noteBoxTop.className = 'noteBoxTopClass'
                noteBox.className = 'noteBoxClass'
                noteBox.setAttribute("id","note" + x[i].id);
                const noteBoxTitle = document.createElement('h1');
                const noteBoxDescription = document.createElement('p');
                const noteBoxDate = document.createElement('p');
                const noteDeleteBtn = document.createElement('input');
                noteDeleteBtn.setAttribute("type", "button")
                noteDeleteBtn.setAttribute("value", "Remove");
                noteDeleteBtn.setAttribute("id", "deleteBtn"+x[i].id);
                const notePinBtn = document.createElement('input');
                notePinBtn.setAttribute("type", "button");
                    if(x[i].data.isPinned === true){
                        notePinBtn.setAttribute("value", "Unpin");
                    }
                    else notePinBtn.setAttribute("value", "Pin");
                notePinBtn.setAttribute("id", "pinBtn"+x[i].id);

                //delete button
                noteDeleteBtn.addEventListener('click', async (ev:Event) => {
                    const btnId = ((ev.target as Element).id).replace("deleteBtn",'');
                    await tmp.deleteNote(btnId);

                    const notesDiv = document.getElementById('notes');
                    const notesDivPinned = document.getElementById('pinnedNotes');
                    notesDiv.innerHTML = "";
                    notesDivPinned.innerHTML = "";

                    this.notesDisplay();
                })

                //pin button
                notePinBtn.addEventListener('click', async (ev:Event) => {
                    const noteFirebaseId = ((ev.target as Element).id).replace('pinBtn', '');
                    const noteFirebase = await tmp.getNote(noteFirebaseId);

                    if(noteFirebase.isPinned === true){
                        noteFirebase.isPinned = false;
                        await tmp.pinNote(noteFirebaseId, noteFirebase);

                        const space = document.getElementById('notes');
                        const noteId = document.getElementById("note" + x[i].id);
                        space.appendChild(noteId);
                        const btn = document.getElementById("pinBtn"+x[i].id);
                        btn.setAttribute("value", "Pin");
                    }

                    else {
                        noteFirebase.isPinned = true;
                        await tmp.pinNote(noteFirebaseId, noteFirebase);

                        const space = document.getElementById('pinnedNotes');
                        space.appendChild(noteBox);
                        const btn = document.getElementById("pinBtn"+x[i].id);
                        btn.setAttribute("value", "Unpin");
                    }
                })

                //uzupelnienie szkieletu danymi
                noteBoxTitle.innerHTML = x[i].data.title;
                noteBoxDescription.innerHTML = x[i].data.description;
                noteBoxDate.innerHTML=x[i].data.date;
                noteBox.style.borderColor = x[i].data.color;
                noteBoxTop.style.backgroundColor = x[i].data.color;

                //wrzucenie szkieletu z danymi na strone
                if(x[i].data.isPinned === true){
                    const spacePinned = document.getElementById('pinnedNotes');
                    spacePinned.appendChild(noteBox);
                        noteBox.appendChild(noteBoxTop);
                    noteBox.appendChild(noteBoxTitle);
                    noteBox.appendChild(noteBoxDescription);
                    noteBox.appendChild(noteBoxDate);
                    noteBox.appendChild(noteDeleteBtn);
                    noteBox.appendChild(notePinBtn);
                }
                else{
                    const space = document.getElementById('notes');
                    space.appendChild(noteBox);
                    noteBox.appendChild(noteBoxTop);
                    noteBox.appendChild(noteBoxTitle);
                    noteBox.appendChild(noteBoxDescription);
                    noteBox.appendChild(noteBoxDate);
                    noteBox.appendChild(noteDeleteBtn);
                    noteBox.appendChild(notePinBtn);
                }
            }
        }
            //#endregion


        else{
            //#region local storage
            console.log("localStorage");
            const tmp = new AppStorage;
            const x = tmp.fetchDataFromLocalStorage();

            for(let i = 0; i < x.length; i++){

            //tworzenie szkieletu
            const noteBox = document.createElement('div');
            const noteBoxTop = document.createElement('div');
            noteBoxTop.className = 'noteBoxTopClass'
            noteBox.className = 'noteBoxClass'
            noteBox.setAttribute("id","note" + x[i].id);
            const noteBoxTitle = document.createElement('h1');
            const noteBoxDescription = document.createElement('p');
            const noteBoxDate = document.createElement('p');
            const noteDeleteBtn = document.createElement('input');
            noteDeleteBtn.setAttribute("type", "button")
            noteDeleteBtn.setAttribute("value", "Remove");
            noteDeleteBtn.setAttribute("id", "deleteBtn"+x[i].id);
            const notePinBtn = document.createElement('input');
            notePinBtn.setAttribute("type", "button");
                if(x[i].isPinned === true){
                    notePinBtn.setAttribute("value", "Unpin");
                }
                else notePinBtn.setAttribute("value", "Pin");
            notePinBtn.setAttribute("id", "pinBtn"+x[i].id);

            //delete button
            noteDeleteBtn.addEventListener('click', (ev:Event) => {
                const btnId = ((ev.target as Element).id).replace("deleteBtn",'');
                const notes2: IAppStorage[] = [];
                const a = JSON.parse(localStorage.getItem("note"));

                a.map((x:any) =>{
                    if(x.id == btnId){

                    }
                    else {
                        notes2.push(x);
                    }
                })

                if(a.length === 1){
                    localStorage.removeItem("note");
                    const notesDiv = document.getElementById('notes');
                    const notesDivPinned = document.getElementById('pinnedNotes');
                    notesDiv.innerHTML = "";
                    notesDivPinned.innerHTML = "";
                }
                else {
                    const notesDivPinned = document.getElementById('pinnedNotes');
                    notesDivPinned.innerHTML = "";
                    const notesDiv = document.getElementById('notes');
                    notesDiv.innerHTML = "";
                    localStorage.setItem("note",JSON.stringify(notes2));
                    this.notesDisplay();
                }
            })

            //pin button
            notePinBtn.addEventListener('click', (ev:Event) => {
                const a = JSON.parse(localStorage.getItem("note"));
                if(a[i].isPinned === true){
                    const space = document.getElementById('notes');
                    const noteId = document.getElementById("note" + x[i].id);
                    space.appendChild(noteId);
                    const btn = document.getElementById("pinBtn"+x[i].id);
                    btn.setAttribute("value", "Pin");

                    const a = JSON.parse(localStorage.getItem("note"));
                    const notes2: IAppStorage[] = [];
                    a.map((y:any) =>{
                        if(y.id === x[i].id){
                            y.isPinned = false;
                            notes2.push(y);
                        }
                        else {
                            notes2.push(y);
                        }
                    })

                    localStorage.setItem("note",JSON.stringify(notes2));
                }
                else {
                    const space = document.getElementById('pinnedNotes');
                    space.appendChild(noteBox);
                    const btn = document.getElementById("pinBtn"+x[i].id);
                    btn.setAttribute("value", "Unpin");

                    const a = JSON.parse(localStorage.getItem("note"));
                    const notes2: IAppStorage[] = [];
                    a.map((y:any) =>{
                        if(y.id === x[i].id){
                            y.isPinned = true;
                            notes2.push(y);
                        }
                        else {
                            notes2.push(y);
                        }
                    })

                    localStorage.setItem("note",JSON.stringify(notes2));

                }
            })

            //uzupelnienie szkieletu danymi
            noteBoxTitle.innerHTML = x[i].title;
            noteBoxDescription.innerHTML = x[i].description;
            noteBoxDate.innerHTML=x[i].date;
            noteBox.style.borderColor = x[i].color;
            noteBoxTop.style.backgroundColor = x[i].color;

            //wrzucenie szkieletu z danymi na strone
            if(x[i].isPinned === true){
                const spacePinned = document.getElementById('pinnedNotes');
                spacePinned.appendChild(noteBox);
                    noteBox.appendChild(noteBoxTop);
                noteBox.appendChild(noteBoxTitle);
                noteBox.appendChild(noteBoxDescription);
                noteBox.appendChild(noteBoxDate);
                noteBox.appendChild(noteDeleteBtn);
                noteBox.appendChild(notePinBtn);
            }
            else{
                const space = document.getElementById('notes');
                space.appendChild(noteBox);
                noteBox.appendChild(noteBoxTop);
                noteBox.appendChild(noteBoxTitle);
                noteBox.appendChild(noteBoxDescription);
                noteBox.appendChild(noteBoxDate);
                noteBox.appendChild(noteDeleteBtn);
                noteBox.appendChild(notePinBtn);
            }
    }

    }

    }


}