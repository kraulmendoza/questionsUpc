import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './guard/login.guard';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', canActivate:[LoginGuard], loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'registrarse', loadChildren: './pages/registrarse/registrarse.module#RegistrarsePageModule' },
  { path: 'menu', loadChildren: './pages/menu/menu.module#MenuPageModule' },
  { path: 'preguntas/:level', loadChildren: './pages/preguntas/preguntas.module#PreguntasPageModule' },
  { path: 'add-preguntas', loadChildren: './pages/add-preguntas/add-preguntas.module#AddPreguntasPageModule' },
  { path: 'crear-partida', loadChildren: './pages/crear-partida/crear-partida.module#CrearPartidaPageModule' },
  { path: 'programa', loadChildren: './pages/programa/programa.module#ProgramaPageModule' },
  { path: 'principal', canActivate:[AuthGuard], loadChildren: './pages/principal/principal.module#PrincipalPageModule' },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
