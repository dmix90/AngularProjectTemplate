import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error',
  template: `
    <h2>Page not found</h2>
  `,
  styles: []
})
export class ErrorComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
