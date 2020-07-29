import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { DefaultPageComponent } from './components/default-page/default-page.component';

import { FooterComponent } from '@pk-components/footer/footer.component';
import { NotFoundComponent } from '@pk-components/not-found/not-found.component';
import { HeaderComponent } from '@pk-components/header/header.component';
import { ToggleSwtichComponent } from '@pk-components/toggle-swtich/toggle-swtich.component';

import { ThemeService } from '@pk-services/theme/theme.service';
import { ChipComponent } from './components/chip/chip.component';

export function themeFactory(themeService: ThemeService) {
  return () => themeService.setInitialTheme();
}



@NgModule({
  declarations: [
    AppComponent,
    DefaultPageComponent,
    NotFoundComponent,
    HeaderComponent,
    ToggleSwtichComponent,
    FooterComponent,
    ChipComponent
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
