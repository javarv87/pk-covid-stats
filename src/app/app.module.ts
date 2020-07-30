import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Pages
import { DefaultPageComponent } from '@pk-components/default-page/default-page.component';
import { CountryPageComponent } from '@pk-components/country-page/country-page.component';
import { NotFoundPageComponent } from '@pk-components/not-found-page/not-found-page.component';

// Common Components
import { FooterComponent } from '@pk-components/footer/footer.component';
import { HeaderComponent } from '@pk-components/header/header.component';

// Components
import { ToggleSwtichComponent } from '@pk-components/toggle-swtich/toggle-swtich.component';
import { CardComponent } from '@pk-components/card/card.component';
import { ChipComponent } from './components/chip/chip.component';

import { ThemeService } from '@pk-services/theme/theme.service';

export function themeFactory(themeService: ThemeService) {
  return () => themeService.setInitialTheme();
}

@NgModule({
  declarations: [
    AppComponent,
    DefaultPageComponent,
    CountryPageComponent,
    NotFoundPageComponent,
    HeaderComponent,
    FooterComponent,
    ToggleSwtichComponent,
    CardComponent,
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
