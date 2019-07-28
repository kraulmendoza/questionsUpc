import { Component, OnInit } from '@angular/core';
import { BdService } from 'src/app/services/bd.service';
import { iPrograma, iPregunta } from 'src/app/interfaces/interface';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GlobalService } from 'src/app/services/global.service';

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
  idPrograma = '';
  formPregunta: FormGroup;
  respuesta = '0';
  constructor(private db: BdService, private global: GlobalService) { }

  ngOnInit() {
    this.formPregunta = new FormGroup({
      programaId: new FormControl('', Validators.compose([Validators.required])),
      descripcion: new FormControl('', Validators.compose([Validators.required])),
      time: new FormControl(60, Validators.compose([Validators.required, Validators.min(60), Validators.max(180)])),
      level: new FormControl('1', Validators.compose([Validators.required])),
    });
    this.pregunta.opciones = new Array(4);
    this.loadProgramas();
  }

  loadProgramas(){
    this.db.getList('programas').subscribe((programas:iPrograma[]) => {
      this.programas = [];
      programas.forEach(programa => {
        this.programas.push(programa);
      });
    });
  }


  preguntaJson(form: FormGroup){
    this.pregunta.descripcion = form.get('descripcion').value;
    this.pregunta.level = parseInt(form.get('level').value);
    this.pregunta.time = parseInt(form.get('time').value);
    this.pregunta.respuesta = parseInt(this.respuesta);
  }

  add(){
    this.preguntaJson(this.formPregunta);
    console.log(this.pregunta);
    console.log(this.formPregunta.get('programaId').value)
    this.db.add('preguntas', this.pregunta, 2, '', this.formPregunta.get('programaId').value).then(_=>{
      this.global.mensaje('Se registro de forma exitosa', 2000, 'success');
    }).catch(_=>this.global.mensaje('No se pudo registrar la pregunta', 2000, 'danger'))
  }
  selectSement(e){
    this.segment = e;
  }
}
