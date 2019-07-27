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
  preguntas: iPregunta[] = [{
    descripcion: '¿cuando es 2 +2?',
    opciones: ['1','2','3','4'],
    respuesta: 2
  }];
  btnContinuar = true;
  duracion = 15;
  colorDuracion = '';
  constructor(private actionSheet: ActionSheetController, private global: GlobalService) { }

  ngOnInit() {
    const intervalo = setInterval(() => {
      this.duracion--;
      if (this.duracion < 10) {
        this.colorDuracion = 'danger';
      }
      if (this.duracion == 0) {
        this.global.mensaje('se acabo el tiempo', 3000, 'danger');
        clearInterval(intervalo);
      }
    }, 1000);
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

}
