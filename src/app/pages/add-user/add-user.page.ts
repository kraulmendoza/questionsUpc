import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { iPersona, iPrograma } from 'src/app/interfaces/interface';
import { LogueoService } from 'src/app/services/logueo.service';
import { BdService } from 'src/app/services/bd.service';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.page.html',
  styleUrls: ['./add-user.page.scss'],
})
export class AddUserPage implements OnInit {
  segment = 'add';
  formAdd : FormGroup;
  user: iPersona;
  users: iPersona[] = [];
  programas: iPrograma[] = [];
  constructor(private loginSer: LogueoService, private db: BdService, private globalSer: GlobalService) { }

  ngOnInit() {
    this.formAdd = new FormGroup({
      name: new FormControl('', Validators.compose([Validators.required])),
      lastName: new FormControl('', Validators.compose([Validators.required])),
      programa: new FormControl('', Validators.compose([Validators.required])),
      email: new FormControl('', Validators.compose([Validators.required])),
      pass: new FormControl('', Validators.compose([Validators.required, Validators.minLength(5)])),
    });
    this.loadProgramas();
    this.loadPersonas();
  }
  
  personaJson(form: FormGroup) {
      return {
        name: form.get('name').value,
        lastName: form.get('lastName').value,
        programa: form.get('programa').value,
        email: form.get('email').value,
        user: '',
        pass: form.get('pass').value,
        estado: true,
        rol: 1
      }  as iPersona;
  }

  loadProgramas(){
    this.db.getList('programas').subscribe((programas:iPrograma[]) => {
      this.programas = [];
      programas.forEach(programa => {
        this.programas.push(programa);
      });
    });
  }

  loadPersonas(){
    this.db.selectWhere('personas','rol', 1).subscribe((personas:iPersona[]) => {
      this.users = [];
      personas.forEach(per => {
        this.users.push(per);
      });
    });
  }

  public add(){
    this.user = this.personaJson(this.formAdd);
      const user = `${this.user.email}@unicesar.edu.co`;
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
  selectSement(e){
    this.segment = e;
  }

  getIndex(progr){
    console.log(this.programas.indexOf(progr));
    if (this.users.length !== 0) {
      return this.programas.find((item)=>{return item.id == progr}).name;
    }
    return '';
  }
}
