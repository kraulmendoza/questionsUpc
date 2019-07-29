import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { RankingProgramaPage } from './ranking-programa.page';

const routes: Routes = [
  {
    path: '',
    component: RankingProgramaPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [RankingProgramaPage]
})
export class RankingProgramaPageModule {}
