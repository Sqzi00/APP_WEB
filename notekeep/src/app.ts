import {Note} from './notee';
import {Notes} from './notes';
export class App {

    constructor(){
        this.fetchNote();
        this.newNote();
    }

    async fetchNote(){
        const temporary = new Notes();
        temporary.notesDisplay();
    }

    newNote(){
        const temporary = new Note();

        const addByBtn = <HTMLInputElement>document.getElementById('addBtn');
        addByBtn.addEventListener('click', (ev:Event) => temporary.newNote());

        const addByEnter = document.body;
        addByEnter.addEventListener('keydown', (ev:KeyboardEvent) => {
            if(ev.key === 'Enter'){
                temporary.newNote();
            }
        });


    }




}