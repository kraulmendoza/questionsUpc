import { Component, OnInit } from '@angular/core';
import { iPregunta } from 'src/app/interfaces/interface';
import { ActionSheetController } from '@ionic/angular';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-preguntas',
  templateUrl: './preguntas.page.html',
  styleUrls: ['./preguntas.page.scss'],
})
export class PreguntasPage implements OnInit {
  preguntas: iPregunta[] = [
    {
      descripcion: '¿cuando es 2 +2?',
      opciones: ['1','2','3','4'],
      respuesta: 2
    },
    {
      descripcion: '¿cuando es 6 +2?',
      opciones: ['5','2','3','8'],
      respuesta: 4
    }
  ];
  indexPregunta = 0;
  btnContinuar = true;
  duracion = 15;
  colorDuracion = '';
  respuesta = 0;
  intervalo;
  stateOpc = false;
  state = false;
  constructor(private actionSheet: ActionSheetController, private global: GlobalService) { }

  ngOnInit() {
    this.empezar();
  }

  empezar(){
    this.intervalo = setInterval(() => {
      this.duracion--;
      if (this.duracion < 10) {
        this.colorDuracion = 'danger';
      }
      if (this.duracion == 0) {
        this.global.mensaje('se acabo el tiempo', 3000, 'danger');
        clearInterval(this.intervalo);
      }
    }, 1000);
  }

  desordenar(array){
    var t = array.sort(function(a,b) {return (Math.random()-0.5)});
    return [...t];
  }
  async openHelp(){
    const action = await this.actionSheet.create({
      header: 'Opciones de ayuda',
      buttons: [
        {
          text: 'Pedir ayuda a un amigo',
          handler: () => {

          }
        },{
          text: 'Quitar 2 opciones',
          handler: () => {

          }
        }
      ]
    });
    return await action.present();
  }
  show(res) {
    this.respuesta = parseInt(res);
  }

  enviar(){
    if (this.respuesta === this.preguntas[this.indexPregunta].respuesta) {
      this.global.mensaje('correcto', 2000, 'success');
      this.btnContinuar = false;
      clearInterval(this.intervalo);
    }else{
      this.global.mensaje('Respuesta incorrecta', 2000, 'danger');
    }
  }
  continuar(){
    this.indexPregunta++;
    this.duracion = 15;
    this.colorDuracion = '';
    this.empezar();
  }

}
