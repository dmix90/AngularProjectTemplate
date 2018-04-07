import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SeoService } from '@services/seo.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(private seo: SeoService) { }

  ngOnInit() {
    this.seo.generateTags({
      title: 'Home Page',
      description: 'Landing page',
      image: 'https://i.imgur.com/13VlXI2.png',
      slug: 'home-page'
    })
  }
}
