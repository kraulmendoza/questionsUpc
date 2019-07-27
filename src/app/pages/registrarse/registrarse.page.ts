import { Component, OnInit } from '@angular/core';
import { LogueoService } from 'src/app/services/logueo.service';
import { BdService } from 'src/app/services/bd.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GlobalService } from 'src/app/services/global.service';
import { iPersona } from 'src/app/interfaces/interface';

@Component({
  selector: 'app-registrarse',
  templateUrl: './registrarse.page.html',
  styleUrls: ['./registrarse.page.scss'],
})
export class RegistrarsePage implements OnInit {
  validation_messages = {
    'name': [
        { type: 'required', message: 'Nombre es obligatorio' }
      ],
    'moneyInicial': [
        { type: 'required', message: 'Campo Obligatorio' }
      ],
    'password': [
        { type: 'required', message: 'Contraseña es obligatorio' },
        { type: 'minlength', message: 'La contraseña debe tener como minimo 6 digitos' },
      ],
    'confirmPassword': [
        { type: 'required', message: 'Este campo es obligatorio' },
        { type: 'confirmPassword', message: 'La contraseña no es la misma' },
      ]
    };

  formAdd : FormGroup;
  user: iPersona;
  constructor(private loginSer: LogueoService, private db: BdService, private globalSer: GlobalService) { }

  ngOnInit() {
    this.formAdd = new FormGroup({
      name: new FormControl('', Validators.compose([Validators.required])),
      lastName: new FormControl('', Validators.compose([Validators.required])),
      programa: new FormControl('', Validators.compose([Validators.required])),
      user: new FormControl('', Validators.compose([Validators.required])),
      email: new FormControl('', Validators.compose([Validators.required])),
      pass: new FormControl('', Validators.compose([Validators.required, Validators.minLength(5)])),
    });
  }
  
  personaJson(form: FormGroup) {
      return {
        name: form.get('name').value,
        lastName: form.get('lastName').value,
        programa: form.get('programa').value,
        email: form.get('email').value,
        user: form.get('user').value,
        pass: form.get('pass').value,
        estado: true,
        puntaje: 0,
        rol: 0
      }  as iPersona;
  }

  public add(){
    this.user = this.personaJson(this.formAdd);
      const user = `${this.user.user}@unicesar.edu.co`;
      this.loginSer.createUser(user, this.user.pass)
        .then((res) => {
          this.user.id = res.user.uid;
          this.db.add('personas', this.user, 1, res.user.uid)
          .then(() => {
            this.globalSer.mensaje('se ha registrado con exito', 3000, 'success');
            this.formAdd.reset();
          }).catch(() => {
            this.globalSer.mensaje('No se pudo registrar el ususario', 3000, 'danger');
          });
        }).catch(() => {
          this.globalSer.mensaje('No se pudo crear el usuario', 3000, 'danger');
      });
    }
  // }

}
