import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { iPersona } from '../interfaces/interface';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  jugador: iPersona = <iPersona>{};
  constructor(private toast: ToastController) { }

  async mensaje(text: string, duration: number, css?: string) {
    const t = await this.toast.create({
      message: text,
      duration: duration,
      color: css
    });
    t.present();
  }
}
