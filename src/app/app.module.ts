import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material/material.module';
import { CoreGuards } from './guards';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './views/auth/auth.module';
import { OffersModule } from './views/offers/offers.module';
import { OfferService } from './views/offers/services/offer.service';
import { HttpClientService } from './shared/http';
import { CookieService } from 'ngx-cookie-service';
import { BrandsModule } from './views/brands/brands.module';
import { MatGoogleMapsAutocompleteModule } from '@angular-material-extensions/google-maps-autocomplete';
import { AgmCoreModule } from '@agm/core';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
    SharedModule,
    AuthModule,
    OffersModule,
    BrandsModule,
    HttpClientModule,
    MatGoogleMapsAutocompleteModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAp6cnxztG7VN62TsfvgATQ3YVDfgCN0tw',
      libraries: ['places']
    }),
  ],
  providers: [
    CoreGuards,
    OfferService,
    HttpClientService,
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
