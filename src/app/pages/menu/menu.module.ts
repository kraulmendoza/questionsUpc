import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MenuPage } from './menu.page';

const routes: Routes = [
  {
    path: '',
    component: MenuPage,
    children:[
      { path: 'principal/preguntas/:level', loadChildren: '../preguntas/preguntas.module#PreguntasPageModule' },
      { path: 'principal', loadChildren: '../principal/principal.module#PrincipalPageModule' },
      { path: 'programa', loadChildren: '../programa/programa.module#ProgramaPageModule' },
      { path: 'add-preguntas', loadChildren: '../add-preguntas/add-preguntas.module#AddPreguntasPageModule' },
      { path: 'consultar', loadChildren: '../consultar/consultar.module#ConsultarPageModule' },
      { path: 'add-user', loadChildren: '../add-user/add-user.module#AddUserPageModule' },
      { path: 'tab', loadChildren: '../tab/tab.module#TabPageModule' },
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MenuPage]
})
export class MenuPageModule {}
