import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonBackButton, IonButtons, IonButton, IonItem, IonTextarea, IonInput } from '@ionic/angular/standalone';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.page.html',
  styleUrls: ['./contacto.page.scss'],
  standalone: true,
  imports: [IonInput, IonTextarea, IonItem, IonButton, IonButtons, IonBackButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class ContactoPage implements OnInit {

  correo:string = "";
  mensaje:string = "";
  enviado = false;

  constructor() { }

  ngOnInit() {
  }

  async enviar() {
    console.log("method enviar()");

    await Preferences.set({
      key: 'ultimoMensaje',
      value: JSON.stringify({
        correo: this.correo,
        mensaje: this.mensaje
      })
    });

    console.log("Datos enviados: ");
    console.log((await Preferences.get({key:'ultimoMensaje'})).value);
  }


}
