import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonRow, IonCol, IonGrid, IonBackButton, IonButtons } from '@ionic/angular/standalone';
import { Products } from 'src/app/services/products';
import { Product } from 'src/app/models/producto.model';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
  standalone: true,
  imports: [IonButtons, IonBackButton, IonGrid, IonCol, IonRow, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class ProductosPage implements OnInit {

  products: Product[] = [];

  constructor(private servicio: Products) { }

  async ngOnInit() {
    this.products = await this.servicio.getProducts();
  }

}
