import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Pages
import { DefaultPageComponent } from '@pk-components/pages/default-page/default-page.component';
import { CountryPageComponent } from '@pk-components/pages/country-page/country-page.component';
import { NotFoundPageComponent } from '@pk-components/pages/not-found-page/not-found-page.component';

// Common Components
import { FooterComponent } from '@pk-components/core/footer/footer.component';
import { HeaderComponent } from '@pk-components/core/header/header.component';

// Components
import { ToggleSwtichComponent } from '@pk-components/common/toggle-swtich/toggle-swtich.component';
import { CardComponent } from '@pk-components/common/card/card.component';
import { ChipComponent } from './components/common/chip/chip.component';

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
