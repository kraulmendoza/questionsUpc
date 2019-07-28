import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSegment, IonMenu } from '@ionic/angular';
import { BdService } from 'src/app/services/bd.service';
import { GlobalService } from 'src/app/services/global.service';
import { iPersona, iPrograma } from 'src/app/interfaces/interface';

@Component({
  selector: 'app-rankings',
  templateUrl: './rankings.page.html',
  styleUrls: ['./rankings.page.scss'],
})
export class RankingsPage implements OnInit {

  segment = '-1';
  jugadores: iPersona[] = [];
  jugadoresAux : iPersona[] = [];
  programas: iPrograma[] = [];
  itera = 0;
  programa:iPrograma = <iPrograma>{};
  niveles = ['Facil', 'Intermedio', 'Dificil']
  constructor(private bd: BdService, public global: GlobalService) { }

  ngOnInit() {
    this.loadJugadores();
    this.loadProgramas();
  }

  loadJugadores(){
    this.bd.selectWhere('personas', 'rol', 0).subscribe((jugadores:iPersona[])=>{
      this.jugadores = [];
      this.jugadores = jugadores;
      this.jugadoresAux = jugadores
    })
  }

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
      case 0:break;
      this.jugadoresAux = this.jugadores.filter((jugador) => {
        return jugador.puntajes[0];
      })
      case 1:break;
      case 2:break;
      default:
          this.jugadoresAux = this.jugadores.filter((jugador) => {
            return jugador.programa == e;
          })
        break;
    }
  }

  getPrograma(programa){
    if (this.jugadores.length !== 0) {
      return this.programas.find((item)=>{return item.id == programa}).name;
    }
    return '';
  }

  getNivel(puntajes: number[]){
    const max = Math.max(...puntajes);
    const index = puntajes.indexOf(max);
    return this.niveles[index];
  }
  getPuntaje(puntajes: number[]){
    return Math.max(...puntajes);
  }

}
