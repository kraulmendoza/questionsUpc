import { Component, OnInit } from '@angular/core';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { GlobalService } from 'src/app/services/global.service';
import { iPregunta, iPrograma } from 'src/app/interfaces/interface';
import { BdService } from 'src/app/services/bd.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'app-preguntas',
  templateUrl: './preguntas.page.html',
  styleUrls: ['./preguntas.page.scss'],
})
export class PreguntasPage implements OnInit {
  preguntas: iPregunta[] = [];
  pregunta: iPregunta = <iPregunta>{};
  indexPregunta = 0;
  btnContinuar = true;
  colorDuracion = '';
  respuesta = 0;
  intervalo;
  state = false;
  level = 0;
  duracion = 0;
  preguntasLen = 0;
  puntuaciones = [10, 20, 30, 40];
  duraciones = new Array(4);
  puntajeTotal = 0;
  ayuda = {
    ayuda1: 0,
    ayuda2: []
  };
  constructor(private actionSheet: ActionSheetController,
    private global: GlobalService, private db: BdService,
    private activeRoute: ActivatedRoute, private alert: AlertController,
    private router: Router, private share: SocialSharing) { }

  ngOnInit() {
    this.level = parseInt(this.activeRoute.snapshot.paramMap.get('level'));
    this.loadPreguntas();
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
        this.perdiste();
        setTimeout(() => {
          this.router.navigate(['menu/principal']);
        }, 3000);
      }
    }, 1000);
  }

  desordenar(array){
    var t = array.sort(function(a,b) {return (Math.random()-0.5)});
    return [...t];
  }
  async openHelp(){
    console.log(this.ayuda.ayuda2.length);
    if (this.ayuda.ayuda1 == 1 && this.ayuda.ayuda2.length !== 0) {
      this.global.mensaje('Se le acabarón las ayuda jajajaja', 1000, 'danger');
    }else{
    const action = await this.actionSheet.create({
      header: 'Opciones de ayuda',
      cssClass: 'actionCss',
      buttons: [
        {
          text: 'Pedir ayuda a un amigo',
          handler: () => {
            if (this.ayuda.ayuda1 == 0) {
              let texto = '';
              texto += `${this.pregunta.descripcion}\n`;
              this.pregunta.opciones.forEach((opc, index) => {
                texto += `${index+1}) ${opc}.\n`;
              });
              texto += `\nAyudame con esta pregunta.`;
              console.log(texto);
              this.share.share(texto);
              this.duracion += 60;
              this.ayuda.ayuda1 = 1;
            }else {
              this.global.mensaje('Ya utilizo esta ayuda', 1000, 'danger');
            }
          }
        },{
          text: '50 : 50',
          handler: () => {
            if (this.ayuda.ayuda2.length === 0) {
              for (let index = 0; index < 2; index++) {
                let num = this.pregunta.respuesta-1;
                if (this.ayuda.ayuda2.length == 0) {
                  while (num === this.pregunta.respuesta-1) {
                    num = Math.floor(Math.random() * (4 - 0)) + 0;
                  }
                  this.ayuda.ayuda2[index] = num;
                }else {
                  while (num === this.pregunta.respuesta-1 || this.ayuda.ayuda2.indexOf(num) !== -1) {
                    num = Math.floor(Math.random() * (4 - 0)) + 0;
                  }
                  this.ayuda.ayuda2[index] = num;
                }
              };
            }else {
              this.global.mensaje('Ya utilizo esta ayuda', 1000, 'danger');
            }
          }
        }
      ]
    });
    return await action.present();
    }
  }
  show(res) {
    this.respuesta = parseInt(res);
  }

  async resultado(){
    const alrt = await this.alert.create({
      header: '¡Correcto!',
      subHeader: `Siguiente Pregunta`,
      message: `llevas ${this.puntajeTotal} puntos!`,
      buttons: [{
        text: 'OK',
        handler: () => {
          this.continuar();
          if (this.puntajeTotal > this.global.persona.puntajes[this.level-1]) {
            this.global.persona.puntajes[this.level-1] = this.puntajeTotal;
            this.db.updatePuntaje(this.global.persona.id,this.global.persona.puntajes).then(_=> console.log('correcto')).catch(_=> console.log('error'));
          }
          if (this.ayuda.ayuda2.length !== 0) {
            this.ayuda.ayuda2 = [-1, -1];
          }
        }
      }]
    });
    return await alrt.present();
  }

  async ganaste(){
    const alrt = await this.alert.create({
      header: `¡Felicidades!`,
      message: `Ganaste con ${this.puntajeTotal} puntos!`,
      buttons: [{
        text: 'OK',
        handler: () => {
          if (this.puntajeTotal > this.global.persona.puntajes[this.level-1]) {
            this.global.persona.puntajes[this.level-1] = this.puntajeTotal;
            this.db.updatePuntaje(this.global.persona.id,this.global.persona.puntajes).then(_=> console.log('correcto')).catch(_=> console.log('error'));
          }
          this.router.navigate(['/menu/principal']);
        }
      }]
    });
    return await alrt.present();
  }

  async perdiste(){
    const alrt = await this.alert.create({
      header: `Perdiste`,
      message: `¡Ups que mala suerte jajaja obtuviste ${this.puntajeTotal} puntos!`,
      buttons: [{
        text: 'OK',
        handler: ()=>{
          this.router.navigate(['/menu/principal']);
        }
      }]
    });
    return await alrt.present();
  }

  enviar(){
    if (this.respuesta === this.preguntas[this.indexPregunta].respuesta) {
      this.global.mensaje('correcto', 2000, 'success');
      this.btnContinuar = false;
      clearInterval(this.intervalo);
      this.puntajeTotal += this.getPuntaje();
      if (this.indexPregunta === this.preguntasLen-1) {
        this.ganaste();
      } else {
        this.resultado();
      }
    }else{
      clearInterval(this.intervalo);
      this.global.mensaje('Respuesta incorrecta', 2000, 'danger');
      this.perdiste();
      setTimeout(() => {
        this.router.navigate(['menu/principal']);
      }, 3000);
    }
  }

  getPuntaje(){
    let pun = 0;
    let bandera = false;
    this.duraciones.forEach((dur,index) => {
      if (!bandera) {
        if (this.duracion <= dur) {
          pun = this.puntuaciones[index];
          bandera = true;
        }
        if (this.duracion >= this.duraciones[3]) {
          pun = this.puntuaciones[index] + 5;
        }
      }
    });
    return pun;
  }
  continuar(){
    this.indexPregunta++;
    this.duracion = this.preguntas[this.indexPregunta].time;
    this.pregunta = this.preguntas[this.indexPregunta];
    this.colorDuracion = '';
    this.loadDuraciones();
    this.empezar();
    this.btnContinuar = true;
  }

  loadDuraciones(){
    const division = (this.duracion * 0.8) / this.puntuaciones.length;
    for (let index = 0; index < this.puntuaciones.length; index++) {
      this.duraciones[index] = (index+1) * division
    }
  }

  loadPreguntas(){
    this.db.selectWhere('preguntas', 'level', this.level,1,this.global.persona.programa).subscribe((preguntas:iPregunta[]) =>{
      console.log(preguntas);
      const pregs: iPregunta[] = [];
      preguntas.forEach(pregunta => {
        pregs.push(pregunta);
      });
      this.preguntas = this.desordenar(pregs);
      this.pregunta = this.preguntas[this.indexPregunta];
      this.duracion = this.preguntas[this.indexPregunta].time;
      this.preguntasLen = this.preguntas.length;
      console.log(this.preguntas);
      this.loadDuraciones();
    })
  }
}
