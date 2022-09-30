import { Component } from '@angular/core';
import * as AOS from 'aos';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'user-ui';

  public ngOnInit(): void {
    AOS.init({
      duration: 2000,
      })
  }

 
}
