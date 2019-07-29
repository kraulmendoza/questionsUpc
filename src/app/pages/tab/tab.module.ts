import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TabPage } from './tab.page';

const routes: Routes = [
  {
    path: 'tab',
    component: TabPage,
    children: [
      { path: 'rankings', loadChildren: '../rankings/rankings.module#RankingsPageModule' },
      { path: 'ranking-programa', loadChildren: '../ranking-programa/ranking-programa.module#RankingProgramaPageModule'},
    ]
  },
  {
    path: '',
    redirectTo: 'tab/rankings',
    pathMatch: 'full'
  }
];
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TabPage]
})
export class TabPageModule {}
