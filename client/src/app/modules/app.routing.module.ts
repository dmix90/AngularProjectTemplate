import { NgModule } from '@angular/core';
import { RouterModule, RouterLinkActive } from '@angular/router';
import { HomeComponent } from '@views/home/home.component';
import { ErrorComponent } from '@views/error/error.component';
import { AboutComponent } from '@views/about/about.component';

@NgModule({
  imports: [RouterModule.forRoot([
    { path: '', pathMatch: 'full', component: HomeComponent },
    { path: 'about', component: AboutComponent },
    { path: '404', component: ErrorComponent },
    { path: '**', redirectTo: '404' },
  ], { enableTracing: false, })],
  exports: [RouterModule, RouterLinkActive]
})
export class AppRoutingModule { }
