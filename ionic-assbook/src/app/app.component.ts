import { CommonModule } from '@angular/common';
import { Component, effect, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Platform, NavController, IonApp, IonSplitPane, IonMenu, IonContent, IonList, IonListHeader, IonNote, IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterOutlet, IonAvatar, IonImg, IonRouterLink } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { home, logIn,exit, documentText, checkmarkCircle, images, camera, arrowUndoCircle } from 'ionicons/icons';
import { AuthService } from './auth/services/auth.service';
import { User } from '../app/auth/interfaces/users';
import { SplashScreen } from '@capacitor/splash-screen';
import { StatusBar, Style } from '@capacitor/status-bar';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [ RouterLink, RouterLinkActive, IonRouterLink, CommonModule, IonApp, IonSplitPane, IonMenu, IonContent, IonList, IonListHeader, IonNote, IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterOutlet, IonAvatar, IonImg ],
})
export class AppComponent {
  user: User | null = null;

  #authService = inject(AuthService);
  #platform = inject(Platform);
  #nav = inject(NavController);

  public appPages = [
    { title: 'Home', url: '/products', icon: 'home' },
    { title: 'Add product', url: '/products/add', icon: 'add' },
  ];
  labels: any;
  constructor() {
    addIcons({ home, exit, logIn, documentText, checkmarkCircle, images, camera, arrowUndoCircle });

    // effect(() => {
    //   if (this.#authService.logged()) {
    //     this.#authService.getProfile().subscribe((user: User | null) => (this.user = user));
    //   } else {
    //     this.user = null;
    //   }
    // });

    effect(async () => {
      if (this.#authService.logged()) {
        try {
          const user = await this.#authService.getProfile();
          this.user = user;
        } catch (error) {
          console.error('Error fetching user profile:', error);
        }
      } else {
        this.user = null;
      }
    });
    

    this.initializeApp();
  }

  async initializeApp() {

    if (this.#platform.is('capacitor')) {
      await this.#platform.ready();
      SplashScreen.hide();
      StatusBar.setBackgroundColor({ color: '#3880ff' });
      StatusBar.setStyle({ style: Style.Dark });
  
      if (this.#authService.logged()) {
        try {
          const user = await this.#authService.getProfile();
          this.user = user;
        } catch (error) {
          console.error('Error fetching user profile:', error);
        }
      } else {
        this.user = null;
      }
    }
  }

  async logout() {
    await this.#authService.logout();
    this.#nav.navigateRoot(['/auth/login']);
  }
  
}