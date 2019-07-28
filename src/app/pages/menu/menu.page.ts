import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';
import { LogueoService } from 'src/app/services/logueo.service';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  pagesAdmin = [
    {
      title: 'Principal',
      url: '/menu/consultar',
      icon: 'person'
    },{
      title: 'Usuarios',
      url: '/menu/add-user',
      icon: 'person'
    },
    {
      title: 'Programas',
      url: '/menu/programa',
      icon: 'person'
    },{
      title: 'Preguntas',
      url: '/menu/add-preguntas',
      icon: 'person'
    },{
      title: 'Estadisticas',
      url: '/menu/estadistica',
      icon: 'person'
    },
  ];
  pagesDocente = [
    {
      title: 'Preguntas',
      url: '/menu/add-preguntas',
      icon: 'person'
    },{
      title: 'Asignatura',
      url: '/menu/asignatura',
      icon: 'person'
    },{
      title: 'Resultados',
      url: '/menu/resultados',
      icon: 'person'
    },
  ];
  pagesEstudiante = [
    {
      title: 'Jugar',
      url: '/menu/principal',
      icon: 'person'
    },{
      title: 'Rankings',
      url: '/menu/rankings',
      icon: 'person'
    },
  ];
  pages = [];
  constructor(private router: Router, private global: GlobalService, private logueo: LogueoService, private menu: MenuController) { }

  ngOnInit() {
    switch (this.global.persona.rol) {
      case 0:
        this.pages = this.pagesEstudiante;
        this.openPage(this.pages[0].url);
      break;
      case 1:
        this.pages = this.pagesDocente;
        this.openPage(this.pages[0].url);
      break;
      case 2:
        this.pages = this.pagesAdmin;
        this.openPage(this.pages[0].url);
      break;
    }
  }

  openPage(url: string){
    this.router.navigate([url]);
    this.menu.close();
  }

  salir(){
    this.logueo.cerrarSesion();
    this.router.navigate(['']);
  }
}
