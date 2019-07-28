import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LogueoService } from '../services/logueo.service';
import { map } from 'rxjs/operators';
import { BdService } from '../services/bd.service';
import { GlobalService } from '../services/global.service';
import { iPersona } from '../interfaces/interface';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(private logueoSer: LogueoService, private router: Router, private bd: BdService, private global: GlobalService) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      return this.logueoSer.Session.pipe(map(res => {
        if (res) {
          this.bd.getDato('personas', res.uid).subscribe((per:iPersona) =>{
            this.global.persona = per;
            this.router.navigate(['principal']);
          })
          return false;
        } else {
          return true;
        }
      }));
  }
}
