import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, NavigationEnd } from '@angular/router';
import { Observable } from 'rxjs';
import { LogueoService } from '../services/logueo.service';
import { map, filter } from 'rxjs/operators';
import { BdService } from '../services/bd.service';
import { GlobalService } from '../services/global.service';
// import { GlobalService } from '../services/globales.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(public logueoSer: LogueoService, private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      return this.logueoSer.Session.pipe(map(res => {
        if (res) {
          return true;
        } else {
          this.router.navigate(['login']);
          return false;
        }
      }));
  }
}
