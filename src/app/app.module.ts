import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

<<<<<<< HEAD
import { CountryPageComponentComponent } from './Component/country-page-component/country-page-component.component';

import { FooterComponent } from './components/footer/footer.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
=======

import { DefaultPageComponent } from './components/default-page/default-page.component';

import { FooterComponent } from '@pk-components/footer/footer.component';
import { NotFoundComponent } from '@pk-components/not-found/not-found.component';
>>>>>>> 7b14a78347029eac83f4a93ec7d9eecc2eed9146
import { HeaderComponent } from '@pk-components/header/header.component';
import { ToggleSwtichComponent } from '@pk-components/toggle-swtich/toggle-swtich.component';


import { ThemeService } from '@pk-services/theme/theme.service';

export function themeFactory(themeService: ThemeService) {
  return () => themeService.setInitialTheme();
}

<<<<<<< HEAD
@NgModule({
  declarations: [
    AppComponent,

    CountryPageComponentComponent,

    NotFoundComponent,
    HeaderComponent,
    FooterComponent,
    ToggleSwtichComponent

=======


@NgModule({
  declarations: [
    AppComponent,
    DefaultPageComponent,
    NotFoundComponent,
    HeaderComponent,
    ToggleSwtichComponent,
    FooterComponent
>>>>>>> 7b14a78347029eac83f4a93ec7d9eecc2eed9146
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [{
    provide: APP_INITIALIZER,
    useFactory: themeFactory,
    deps: [ThemeService],
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
