import {AppStorage} from './appStorageLocal';

export class Note{

    async newNote(){

            const tmp = new AppStorage();
            tmp.addNewNote();
    }

}