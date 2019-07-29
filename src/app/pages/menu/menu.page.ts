import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';
import { LogueoService } from 'src/app/services/logueo.service';
import { MenuController } from '@ionic/angular';
import { iPersona } from 'src/app/interfaces/interface';

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
      icon: 'home'
    },{
      title: 'Usuarios',
      url: '/menu/add-user',
      icon: 'contacts'
    },
    {
      title: 'Programas',
      url: '/menu/programa',
      icon: 'apps'
    },{
      title: 'Preguntas',
      url: '/menu/add-preguntas',
      icon: 'help'
    },{
      title: 'Rankings',
      url: '/menu/tab',
      icon: 'analytics'
    },
  ];
  pagesDocente = [
    {
      title: 'Preguntas',
      url: '/menu/add-preguntas',
      icon: 'help'
    },{
      title: 'Rankings',
      url: '/menu/tab',
      icon: 'analytics'
    },
  ];
  pagesEstudiante = [
    {
      title: 'Jugar',
      url: '/menu/principal',
      icon: 'play'
    },{
      title: 'Rankings',
      url: '/menu/tab',
      icon: 'analytics'
    },
  ];
  pages = [];
  selectedPath = '';
  constructor(private router: Router, private global: GlobalService, private logueo: LogueoService, private menu: MenuController) {
    this.router.events.subscribe((event: RouterEvent) => {
      if (event && event.url) {
        this.selectedPath = event.url;
      }
    });
  }

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
    this.global.persona = <iPersona>{}
  }
}
