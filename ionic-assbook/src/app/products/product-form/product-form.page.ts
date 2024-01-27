import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastController, NavController, IonRouterLink, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent, IonList, IonItem, IonIcon, IonButton, IonImg, IonGrid, IonRow, IonCol, IonInput, IonLabel } from '@ionic/angular/standalone';
import { ProductsService } from '../services/products.service';
import { Product } from '../interfaces/product';
import { RouterLink } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'product-form',
  templateUrl: './product-form.page.html',
  styleUrls: ['./product-form.page.scss'],
  standalone: true,
  imports: [FormsModule, RouterLink, IonRouterLink, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent, IonList, IonItem, IonIcon, IonButton, IonImg, IonGrid, IonRow, IonCol, IonInput, IonLabel]
})
export class ProductFormPage {
  newProd: Product = {
    description: '',
    price: 0,
    imageUrl: ''
  };

  #productsService = inject(ProductsService);
  #toastCtrl = inject(ToastController);
  #nav = inject(NavController)

  addProduct() {
    this.#productsService.addProduct(this.newProd).subscribe(
      async prod => {
        (await this.#toastCtrl.create({
          position: 'bottom',
          duration: 3000,
          message: 'Product added succesfully',
          color: 'success'
        })).present();
        this.#nav.navigateRoot(['/products']);
      },
      async error => (await this.#toastCtrl.create({
        position: 'bottom',
        duration: 3000,
        message: 'Error adding product'
      })).present()
    );
  }

  async takePhoto() {;
    const photo = await Camera.getPhoto({
      source: CameraSource.Camera,
      quality: 90,
      height: 640,
      width: 640,
      // allowEditing: true,
      resultType: CameraResultType.DataUrl // Base64 (url encoded)
    });

    this.newProd.imageUrl = photo.dataUrl as string;
  }

  async pickFromGallery() {
    const photo = await Camera.getPhoto({
      source: CameraSource.Photos,
      height: 640,
      width: 640,
      // allowEditing: true,
      resultType: CameraResultType.DataUrl // Base64 (url encoded)
    });

    this.newProd.imageUrl = photo.dataUrl as string;
  }
}