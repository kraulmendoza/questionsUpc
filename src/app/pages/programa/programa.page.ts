import { Component, OnInit } from '@angular/core';
import { iPrograma } from 'src/app/interfaces/interface';
import { BdService } from 'src/app/services/bd.service';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-programa',
  templateUrl: './programa.page.html',
  styleUrls: ['./programa.page.scss'],
})
export class ProgramaPage implements OnInit {
  segment = 'add';
  programas:iPrograma[] = [];
  programa: iPrograma = <iPrograma>{};
  constructor(private bd: BdService, private global: GlobalService) { }

  ngOnInit() {
    this.loadProgramas();
  }

  selectSement(e){
    this.segment = e.detail.value.toString(); // y aqui se cambia cuando das click en el segment si es "add" o "show"
  }

  addPrograma(){
    this.programa.partida = {
      level: [1, 2, 3],
      puntajes: [10, 20, 30 ,40]
    }
    this.bd.selectWhere('programas', 'id', this.programa.id).subscribe((res) => {
      if (res.length === 0) {
        this.bd.add('programas', this.programa, 1, this.programa.id).then(_=>{
          this.global.mensaje('Se registro de manera exitosa', 3000, 'success');
          this.programa = <iPrograma> {};
        }).catch(_=>{
          this.global.mensaje('No se pudo registrar', 3000, 'danger');
        })
      }else {
        this.global.mensaje('Ya se registro este programa', 3000, 'danger');
      }
    })
    
  }
  loadProgramas(){
    this.bd.getList('programas').subscribe((programas:iPrograma[]) => {
      this.programas = [];
      programas.forEach(programa => {
        this.programas.push(programa);
      });
    });
  }
}
