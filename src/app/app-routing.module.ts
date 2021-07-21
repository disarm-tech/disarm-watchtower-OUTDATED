import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from '@app/layout/layout/layout.component';
import { MatchProcessComponent } from '@app/match-process/match-process.component';
import { MatchImagesComponent } from '@app/match-images/match-images.component';
import { GroupsManagerComponent } from '@app/groups-manager/components/groups-manager/groups-manager.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: GroupsManagerComponent,
      },
      {
        path: 'process',
        component: MatchProcessComponent,
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
