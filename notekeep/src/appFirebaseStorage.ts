import firebase  from "firebase";
import { firebaseConfig } from "./configFB";
import { IAppStorage } from "./IAppStorage";

export class AppFirebaseStorage{
    firebaseApp: any;
    db: any;

    constructor(){

        if (!firebase.apps.length) {
            this.firebaseApp = firebase.initializeApp(firebaseConfig);
        }
        else{
            this.firebaseApp = firebase.app();
        }

        this.db = this.firebaseApp.firestore();
    }

    async addNote(note:IAppStorage) {
        await this.db.collection('notatki').add(note);
    }

    async deleteNote(id: string){
        await this.db.collection('notatki').doc(id).delete();
    }

    async pinNote(id: string, note: IAppStorage){
        await this.db.collection('notatki').doc(id).update(note);
    }

    async getNote(id:string){
        return await this.db.collection('notatki').doc(id).get().then((res:any) => res.data());
    }

    async getNotes(){
        const collection = await this.db.collection('notatki').get().then((res: any) => ({size: res.size, docs: res.docs}));
        return collection.docs.map((doc: any) => ({id: doc.id, data: doc.data()}));
    }

}
