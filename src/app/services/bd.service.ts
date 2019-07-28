import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreModule, AngularFirestoreCollection} from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BdService {

  listaInterfax: AngularFirestoreCollection;

  constructor(public firestore:AngularFirestore) { }


  public add(tabla: string, datos, tipo?: number, id?: string, idPrograma?: string) {
    let collection;
    switch (tipo) {
      case 1:
          collection = this.firestore.collection(tabla).doc(id).set(datos);
        break;
      case 2:
          collection = this.firestore.collection('programas').doc(idPrograma).collection(tabla).add(datos);
        break;
      default:
          collection = this.firestore.collection(tabla).add(datos);
        break;
    }
    return collection;
  }

  public getList(tabla: string, tipo?:number, idPrograma?: string){
    let obj;
    let lista: AngularFirestoreCollection;
    switch (tipo) {
      case 1:
          lista = this.firestore.collection('programas').doc(idPrograma).collection(tabla);
        break;
      default:
        lista = this.firestore.collection(tabla);
        break;
    }
    return lista.snapshotChanges().pipe(map(List=>{
        return List.map(event=>{
          obj = event.payload.doc.data(),
          obj.id = event.payload.doc.id
          return obj;
        })
    }));
  }
  public getDato(tabla: string, id: string){
    return this.firestore.collection(tabla).doc(id).valueChanges();
  }
  public selectWhere(tabla:string, cond: string, comp, tipo?: number, id?: string){
    let obj;
    let lista: AngularFirestoreCollection;
    
    switch (tipo) {
      case 1:
          lista = this.firestore.collection('programas').doc(id).collection(tabla, ref => ref.where(cond, '==', comp));
        break;
      default:
          lista = this.firestore.collection(tabla, ref => ref.where(cond, '==', comp));
        break;
    }
    const dato = lista.snapshotChanges().pipe(map((List) => {
        return List.map((dat) => {
            obj = dat.payload.doc.data();
            obj.id = dat.payload.doc.id;
            return obj;
        });
    }));
    return dato;
  }

  public updatePuntaje(id:string, puntjes: number[]){
    return this.firestore.collection('personas').doc(id).update({puntajes: puntjes})
  }






  // public whereAsesorias(){
  //   return this.firestore.collection("docentes", ref => ref.where("horaAsesoria","==","8")).valueChanges();
  // }
}
