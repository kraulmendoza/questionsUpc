import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, NavigationEnd } from '@angular/router';
import { Observable } from 'rxjs';
import { LogueoService } from '../services/logueo.service';
import { map, filter } from 'rxjs/operators';
import { BdService } from '../services/bd.service';
import { GlobalService } from '../services/global.service';
import { iPersona } from '../interfaces/interface';
// import { GlobalService } from '../services/globales.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  url = '';
  constructor(public logueoSer: LogueoService, private router: Router, private bd: BdService, private global: GlobalService) {
    this.getUrl();
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      return this.logueoSer.Session.pipe(map(res => {
        if (res) {
          this.bd.getDato('personas', res.uid).subscribe((per:iPersona) =>{
            console.log(per);
            // this.global.persona = per;
            // this.router.navigate(['menu']);
          })
          return true;
        } else {
          this.router.navigate(['login']);
          return false;
        }
      }));
  }
  getUrl(){
    this.router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe((e: any) => {
      console.log(e);
      const urlArray = e.url.split('/');
      console.log(urlArray);
      // Result: urlArray: ["", "tabs", "groups", "new-group?type=group"]
      // Grab the last page url.
      let pageUrl = urlArray[urlArray.length - 2]
      console.log(pageUrl);
    });
  }
}
