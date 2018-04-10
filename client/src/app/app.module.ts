import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { RouterModule, RouterLinkActive } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
//PWA
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '@environments/environment';
//Views
import { HeaderComponent } from '@views/header/header.component';
import { FooterComponent } from '@views/footer/footer.component';
import { HomeComponent } from '@views/home/home.component';
import { ErrorComponent } from '@views/error/error.component';
import { AboutComponent } from '@views/about/about.component';
//Components
import { TodoComponent } from '@components/todo/todo.component';
import { StatusComponent } from './components/status/status.component';
//Apollo GraphQL
import { ApolloModule, Apollo } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
//Services
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
    RouterModule.forRoot([
      { path: '', pathMatch: 'full', component: HomeComponent },
      { path: 'about', component: AboutComponent },
      { path: '404', component: ErrorComponent },
      { path: '**', redirectTo: '404' },
    ], { enableTracing: false, }),
    // AppRoutingModule,
    environment.production ? ServiceWorkerModule.register('ngsw-worker.js') : [],
    FormsModule,
    HttpClientModule,
    ApolloModule,
    HttpLinkModule
  ],
  exports: [RouterModule, RouterLinkActive],
  providers: [SeoService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(apollo: Apollo, httpLink: HttpLink) {
    apollo.create({
      link: httpLink.create({ uri: "https://localhost/api" }),
      cache: new InMemoryCache()
    });
  }
}
