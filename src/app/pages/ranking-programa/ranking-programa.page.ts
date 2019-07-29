import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSegment, IonMenu } from '@ionic/angular';
import { BdService } from 'src/app/services/bd.service';
import { GlobalService } from 'src/app/services/global.service';
import { iPersona, iPrograma } from 'src/app/interfaces/interface';

@Component({
  selector: 'app-ranking-programa',
  templateUrl: './ranking-programa.page.html',
  styleUrls: ['./ranking-programa.page.scss'],
})
export class RankingProgramaPage implements OnInit {

  
  segment = '-1';
  jugadores: iPersona[] = [];
  jugadoresAux : iPersona[] = [];
  programas: iPrograma[] = [];
  itera = 0;
  programa:iPrograma = <iPrograma>{};
  niveles = ['Facil', 'Intermedio', 'Dificil'];
  constructor(private bd: BdService, public global: GlobalService) { }

  ngOnInit() {
    this.loadJugadores();
    this.loadProgramas();
  }

  loadJugadores(){
    this.bd.selectWhere('personas', 'rol', 0).subscribe((jugadores:iPersona[])=>{
      this.jugadores = [];
      this.jugadoresAux = [];
      jugadores.forEach((jugador, j) => {
        if (jugador.programa === this.global.persona.programa) {    
          this.jugadores.push(jugador);
          this.jugadores[j].puntajeMax = Math.max(...jugador.puntajes);
          this.jugadores.sort((a, b)=> {return b.puntajeMax - a.puntajeMax});
          this.jugadoresAux.push(jugadores[j]);
        }
      });
      
    })
  }
  // jugadores.forEach((jugador, j) => {
  //   jugadores[j].puntajeMax = Math.max(...jugador.puntajes);
  // });
  // jugadores.sort((a, b)=> {return b.puntajeMax - a.puntajeMax});
  // this.jugadores = jugadores;
  // this.jugadoresAux = jugadores;

  loadProgramas(){
    this.bd.getList('programas').subscribe((programas:iPrograma[])=>{
      this.programas = [];
      this.programas = programas;
    })
  }
  segmentChanged(e){
    switch (parseInt(e)) {
      case -1:
        this.jugadoresAux = this.jugadores;
        break;
      case 0:  console.log(this.getNiveles(e));
      this.getNiveles(e);
      break;
      case 1: this.getNiveles(e);break;
      case 2: this.getNiveles(e);break;
      default:
          // this.jugadoresAux = this.jugadores.filter((jugador) => {
          //   return jugador.programa == e;
          // })
        break;
    }
  }

  getNiveles(e){
    // this.jugadoresAux = this.jugadores.filter((jugador) => {
    //   // return jugador.puntajes.filter((punta,index)=>{return index == e})
    //   return jugador.puntajes[parseInt(e)] > 0;
    // })
    this.jugadoresAux = [];
    this.jugadores.forEach(juga => {
      if (juga.puntajes[parseInt(e)] > 0) {
        this.jugadoresAux.push(juga);
      }
    });
  }

  getPrograma(programa){
    if (this.jugadores.length !== 0) {
      return this.programas.find((item)=>{return item.id == programa}).name;
    }
    return '';
  }

  getNivel(puntajes: number[]){
    let max = 0;
    let index =-1;
    switch (parseInt(this.segment)) {
      case -1: max = Math.max(...puntajes);index = puntajes.indexOf(max); break;
      case 0:index = parseInt(this.segment);
      break;
      case 1:index = parseInt(this.segment);break;
      case 2: index = parseInt(this.segment);break;
      default:
          // max = Math.max(...puntajes); index = puntajes.indexOf(max);
        break;
    }
    return this.niveles[index];
  }
  getPuntaje(puntajes: number[]){
    let max = 0;
    let index =-1;
    switch (parseInt(this.segment)) {
      case -1: max = Math.max(...puntajes);index = puntajes.indexOf(max); break;
      case 0:  //console.log(this.getNiveles(e));
        //this.getNiveles(this.segment);
        index = parseInt(this.segment);
      break;
      case 1:index = parseInt(this.segment);break;
      case 2: index = parseInt(this.segment);break;
      default:
          // max = Math.max(...puntajes); index = puntajes.indexOf(max);
        break;
    }
    return puntajes[index];
    // return Math.max(...puntajes);
  }
}
