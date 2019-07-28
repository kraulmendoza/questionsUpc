import { Component, OnInit } from '@angular/core';
import { iPersona, iPrograma } from 'src/app/interfaces/interface';
import { GlobalService } from 'src/app/services/global.service';
import { BdService } from 'src/app/services/bd.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {
  level = '';
  jugador: iPersona = <iPersona> {};
  programa:iPrograma = <iPrograma> {};
  constructor(private global: GlobalService, private db: BdService, private router: Router) { }

  ngOnInit() {
    this.jugador = this.global.persona;
    this.db.getDato('programas', this.jugador.programa).subscribe((programa: iPrograma) => {
      this.programa = programa;
    })
  }

  jugar(){
    this.router.navigate(['/preguntas', this.level])
  }

}
