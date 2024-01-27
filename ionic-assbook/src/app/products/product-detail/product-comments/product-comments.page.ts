import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-product-comments',
  templateUrl: './product-comments.page.html',
  styleUrls: ['./product-comments.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ProductCommentsPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
