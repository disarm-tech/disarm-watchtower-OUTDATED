import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from '@app/layout/layout/layout.component';
import { SelectorFoldersComponent } from '@app/selector-folders/selector-folders/selector-folders.component';
import { MainProcessComponent } from '@app/main-process/main-process/main-process.component';
import { MatchImagesComponent } from '@app/match-images/match-images/match-images.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: SelectorFoldersComponent,
      },
      {
        path: 'process',
        component: MainProcessComponent,
      },
      {
        path: 'match-images',
        component: MatchImagesComponent,
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
