import { Component, OnInit } from '@angular/core';
import { LogueoService } from 'src/app/services/logueo.service';
import { BdService } from 'src/app/services/bd.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IPersona } from 'src/app/interfaz/interface';
import { GlobalService } from 'src/app/services/global.service';

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
  user: IPersona;
  constructor(private loginSer: LogueoService, private db: BdService, private globalSer: GlobalService) { }

  ngOnInit() {
    this.formAdd = new FormGroup({
      pName: new FormControl('', Validators.compose([Validators.required])),
      sName: new FormControl(''),
      pLastName: new FormControl('', Validators.compose([Validators.required])),
      sLastName: new FormControl('', Validators.compose([Validators.required])),
      tel: new FormControl('', Validators.compose([Validators.required, Validators.minLength(9), Validators.maxLength(9)])),
      user: new FormControl('', Validators.compose([Validators.required])),
      pass: new FormControl('', Validators.compose([Validators.required, Validators.minLength(5)])),
    });
  }
  
  cobroJson(form: FormGroup) {
      return {
        primerNombre: form.get('pName').value,
        segundoNombre: form.get('sName').value,
        primerApellido: form.get('pLastName').value,
        segundoApellido: form.get('sLastName').value,
        telefono: form.get('tel').value,
        user: form.get('user').value,
        pass: form.get('pass').value,
        estado: true,
        rol: 0
      }  as IPersona;
  }

  public add(){
    this.user = this.cobroJson(this.formAdd);
    // if (this.usuario.password !== this.formCobro.get('confirmPassword').value) {
    //   this.globalSer.mensaje('las contraseñas no son iguales', 3000, ' danger');
    // } else {
      const user = `${this.user.user}@unicesar.edu.co`;
      this.loginSer.createUser(user, this.user.pass)
        .then((res) => {
          this.user.id = res.user.uid;
          this.db.add('persona', this.user, 1, res.user.uid)
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
