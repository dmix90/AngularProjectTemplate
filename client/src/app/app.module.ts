import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { HeaderComponent } from '@views/header/header.component';
import { FooterComponent } from '@views/footer/footer.component';
import { HomeComponent } from '@views/home/home.component';
import { ErrorComponent } from '@views/error/error.component';
import { AboutComponent } from '@views/about/about.component';
import { AppRoutingModule } from '@modules/app.routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
//Apollo GraphQL
import { ApolloModule, Apollo } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
//
//PWA
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '@environments/environment';
//
import { TodoComponent } from '@components/todo/todo.component';
import { StatusComponent } from './components/status/status.component';
//
import { SeoService } from '@services/seo.service';

@Component({
  selector: 'app-root',
  template: `
    <app-header></app-header>
    <router-outlet></router-outlet>
    <app-footer></app-footer>
  `
})
export class AppComponent { }

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ErrorComponent,
    TodoComponent,
    StatusComponent,
    AboutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    environment.production ? ServiceWorkerModule.register('ngsw-worker.js') : [],
    FormsModule,
    HttpClientModule,
    ApolloModule,
    HttpLinkModule
  ],
  providers: [SeoService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(apollo: Apollo, httpLink: HttpLink) {
    apollo.create({
      link: httpLink.create({ uri: "http://localhost:4201/graphql" }),
      cache: new InMemoryCache()
    });
  }
}
