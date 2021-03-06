import { Component, OnInit } from '@angular/core';
import { ToastController, ModalController } from "@ionic/angular";
import { Router } from '@angular/router';
import { LogueoService } from 'src/app/services/logueo.service';
import { GlobalService } from 'src/app/services/global.service';
import { BdService } from 'src/app/services/bd.service';
import { iPersona } from 'src/app/interfaces/interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user = {
    user: '',
    pass: ''
  }
  constructor(private route: Router, private modal: ModalController, private logueo: LogueoService, private global: GlobalService, private bd: BdService) { }

  ngOnInit() {
  }

  openRegistrarse(){
    this.route.navigate(['/registrarse']);
  }

  loguearse(){
    let user = `${this.user.user.toLowerCase()}@unicesar.edu.co`
    console.log(this.user.user.toLowerCase());
    if (this.user.user.toLowerCase() == 'admin') {
      user = `${this.user.user}@gmail.com`;
    }
    this.logueo.loginUser(user, this.user.pass).then((auth)=>{
      this.bd.getDato('personas', auth.user.uid).subscribe((per: iPersona)=>{
        this.global.persona = per;
        console.log(this.global.persona);
        this.route.navigate(['/menu']);
      })
    })
    .catch(_=>this.global.mensaje('Usuario y/o contraseña incorrecta', 3000, 'danger'))
  }

}
