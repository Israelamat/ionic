import { Routes } from "@angular/router";

export const productsRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./home/home.page').then(m => m.HomePage),
  },
  {
    path: 'add',
    loadComponent: () =>
      import('./product-form/product-form.page').then(
        (m) => m.ProductFormPage
      ),
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./product-detail/product-detail.page').then(
        (m) => m.ProductDetailPage
      ),
    loadChildren: () => // Child (inner) routes
      import('./product-detail/product-detail.routes').then((m) => m.productDetailRoutes),
  },
];