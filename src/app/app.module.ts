import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from '@app/layout/layout.module';
import { UiModule } from '@app/ui/ui.module';
import { NavigationModule } from '@app/navigation/navigation.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxElectronModule } from 'ngx-electron';
import { ModalityModule } from '@app/modality/modality.module';
import { SelectorFoldersModule } from '@app/selector-folders/selector-folders.module';
import { MatchProcessModule } from '@app/match-process/match-process.module';
import { MatchImagesModule } from '@app/match-images/match-images.module';
import { GroupsManagerModule } from '@app/groups-manager/groups-manager.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgxElectronModule,
    LayoutModule,
    UiModule,
    NavigationModule,
    ModalityModule,
    SelectorFoldersModule,
    GroupsManagerModule,
    MatchProcessModule,
    MatchImagesModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
