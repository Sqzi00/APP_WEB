import {IAppStorage} from "./IAppStorage";
import {Notes} from "./Notes";
import {AppFirebaseStorage} from './appFirebaseStorage';
import {firebaseModeOn} from './configFB';
export class AppStorage{
    notes: IAppStorage[] = [];

    //sprawdzanie ilosci elementow w tablicy
    lastIdFromStorage(){
        if(localStorage.getItem("note") === null){
            return 0;
        }
        else {
            const x = JSON.parse(localStorage.getItem("note"));
            let id:number = 1;
            x.map((x: any) =>{
                if(x.id > id) {
                    id=x.id;
                }
            })
            return id;
        }
    }

    //szkielet notatki
    async addNewNote(){
        const noteTitle = <HTMLInputElement>document.getElementById('title');
        const title = noteTitle.value;
        const noteDescription = <HTMLInputElement>document.getElementById('description');
        const description = noteDescription.value;
        const colorName= <HTMLSelectElement>document.getElementById('color');
        const color = colorName.value;

        const x= this.lastIdFromStorage();

        const object: IAppStorage = {
            id: x+1,
            title: title,
            description: description,
            color: color,
            date: new Date().toDateString(),
            isPinned: false,
        }

        if(title == "" || description == ""){
            alert("Enter data!");
        }
        else {
            if(firebaseModeOn === true){
                const tmp = new AppFirebaseStorage();
                tmp.addNote(object);
            }
            else{

            this.saveDataToLocalStorage(object);
            }

            const divId = document.getElementById('notes');
            divId.innerHTML = "";

            const divNotesPinnedId = document.getElementById('pinnedNotes');
            divNotesPinnedId.innerHTML = "";

            const y = new Notes;
            y.notesDisplay();

            noteTitle.value="";
            noteDescription.value="";


        }

    }

    //zapis do localStorage
    saveDataToLocalStorage(addNewNote: any) {
        if(localStorage.getItem("note") === null){
            this.notes.push(addNewNote);
            localStorage.setItem("note", JSON.stringify(this.notes));
        }
        else {
            const notes2: IAppStorage[] = [];
            const a = JSON.parse(localStorage.getItem("note"));

            a.map((x:any) =>{
                notes2.push(x);
            })

            notes2.push(addNewNote);
            localStorage.setItem("note",JSON.stringify(notes2));

        }

    }

    //wyciaganie z localStorage
    fetchDataFromLocalStorage(){
        if(localStorage.getItem("note") === null ){
            return 0;
        }
        else return JSON.parse(localStorage.getItem("note"));

    }

    //usuwanie z localStorage
    removeFromLocalStorage(data:any) {
        localStorage.removeItem(data);
    }

}