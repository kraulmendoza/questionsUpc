import { Component, OnInit } from '@angular/core';
import { iPrograma, iPregunta } from 'src/app/interfaces/interface';
import { BdService } from 'src/app/services/bd.service';

@Component({
  selector: 'app-consultar',
  templateUrl: './consultar.page.html',
  styleUrls: ['./consultar.page.scss'],
})
export class ConsultarPage implements OnInit {
  programas: iPrograma[] = [];
  preguntaLen = 0;
  constructor(private bd: BdService) { }

  ngOnInit() {
    this.loadProgramas();
  }

  loadProgramas(){
    this.bd.getList('programas').subscribe((progs:iPrograma[]) => {
      this.programas = [];
      this.preguntaLen = 0;
      progs.forEach((programa,index) => {
        this.programas.push(programa);
        this.programas[index].preguntas = [];
        this.bd.getList('preguntas',1,programa.id).subscribe((preguntas:iPregunta[])=>{
          this.programas[index].preguntas = [];
          this.programas[index].preguntas = preguntas;
          this.preguntaLen += preguntas.length;
        })
      });
    });
  }

}
