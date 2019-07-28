import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './guard/login.guard';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', canActivate:[LoginGuard], loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'registrarse', loadChildren: './pages/registrarse/registrarse.module#RegistrarsePageModule' },
  { path: 'menu', canActivate:[AuthGuard], loadChildren: './pages/menu/menu.module#MenuPageModule' },
  { path: 'crear-partida', loadChildren: './pages/crear-partida/crear-partida.module#CrearPartidaPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
