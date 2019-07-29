import { Component, OnInit } from '@angular/core';
import { BdService } from 'src/app/services/bd.service';
import { iPrograma, iPregunta } from 'src/app/interfaces/interface';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GlobalService } from 'src/app/services/global.service';
import { IonItemSliding, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-add-preguntas',
  templateUrl: './add-preguntas.page.html',
  styleUrls: ['./add-preguntas.page.scss'],
})
export class AddPreguntasPage implements OnInit {
  opciones = new Array(4);
  segment = 'add';
  programas: iPrograma[] = [];
  pregunta: iPregunta = <iPregunta> {};
  preguntas: iPregunta[] = [];
  idPrograma = '';
  formPregunta: FormGroup;
  respuesta = '0';
  numPreguntas = 0;
  searchPrograma  = '';
  namePrograma = '';
  constructor(private db: BdService, public global: GlobalService, private alerta: AlertController) { }

  ngOnInit() {
    this.formPregunta = new FormGroup({
      programaId: new FormControl('', Validators.compose([Validators.required])),
      descripcion: new FormControl('', Validators.compose([Validators.required])),
      time: new FormControl(60, Validators.compose([Validators.required, Validators.min(60), Validators.max(180)])),
      level: new FormControl('1', Validators.compose([Validators.required])),
    });
    if (this.global.persona.rol === 1) {
      this.formPregunta.get('programaId').setValue(this.global.persona.programa);
    }
    this.pregunta.opciones = new Array(4);
    this.loadProgramas();
    this.searchPrograma = this.global.persona.programa;
  }

  loadProgramas(){
    this.db.getList('programas').subscribe((programas:iPrograma[]) => {
      this.programas = [];
      this.preguntas = [];
      programas.forEach((programa, index) => {
        if (programa.id == this.global.persona.programa) {
          this.namePrograma = programa.name;
        }
        this.programas.push(programa);
        this.programas[index].preguntas = [];
        this.db.getList('preguntas',1,programa.id).subscribe((preguntas:iPregunta[])=>{
          preguntas.forEach(pre => {
            this.preguntas.push(pre);
          });
          this.programas[index].preguntas = [];
          this.programas[index].preguntas = preguntas;
        })
      });
    });
  }

  preguntaJson(form: FormGroup){
    this.pregunta.descripcion = form.get('descripcion').value;
    this.pregunta.level = parseInt(form.get('level').value);
    this.pregunta.time = parseInt(form.get('time').value);
    this.pregunta.respuesta = parseInt(this.respuesta);
  }

  limpiarFormulario(form: FormGroup){
    form.get('descripcion').setValue('');
    this.pregunta.opciones = [];
    this.respuesta = '';
  }

  add(){
    this.preguntaJson(this.formPregunta);
    this.db.add('preguntas', this.pregunta, 2, '', this.formPregunta.get('programaId').value).then(_=>{
      this.global.mensaje('Se registro de forma exitosa', 2000, 'success');
      this.limpiarFormulario(this.formPregunta);
    }).catch(_=>this.global.mensaje('No se pudo registrar la pregunta', 2000, 'danger'))
  }
  selectSement(e){
    this.segment = e;
  }

  async delete(slidingItem: IonItemSliding, pregunta: iPregunta, idPrograma: string) {
    slidingItem.close();
    console.log(`pregunta: ${pregunta.id} - idPrograma: ${idPrograma}`)
    // aqui teniendo el docente o cualquier objeto, obtienes el id y lo puedes eliminar
    const alert = await this.alerta.create({
      header: 'Eliminar Pregunta',
      subHeader: 'Estas a punto de eliminar esta pregunta estas seguro ?',
      buttons: [
        {
          text: 'Confirmar',
          role: 'Confirmar',
          cssClass: 'primary',
          handler: () => {
            this.db.deleteQuestion(pregunta.id,idPrograma).then(_=>{this.global.mensaje('Ha eliminado la pregunta',2000, 'success')})
            .catch(_=>{this.global.mensaje('Error no se pudo eliminar la pregunta',2000, 'danger')});
          }
        }
      ]
    });
    await alert.present();
  }
}
