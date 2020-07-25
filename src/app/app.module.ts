import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
<<<<<<< HEAD
import { CountryPageComponentComponent } from './Component/country-page-component/country-page-component.component';
=======
import { FooterComponent } from './components/footer/footer.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HeaderComponent } from '@pk-components/header/header.component';
import { ToggleSwtichComponent } from '@pk-components/toggle-swtich/toggle-swtich.component';
>>>>>>> dab657a959c6cf7c6a13e094e0b02cd891d917ac

import { ThemeService } from '@pk-services/theme/theme.service';

export function themeFactory(themeService: ThemeService) {
  return () => themeService.setInitialTheme();
}
 
@NgModule({
  declarations: [
    AppComponent,
<<<<<<< HEAD
    CountryPageComponentComponent
=======
    NotFoundComponent,
    HeaderComponent,
    FooterComponent,
    ToggleSwtichComponent
>>>>>>> dab657a959c6cf7c6a13e094e0b02cd891d917ac
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
