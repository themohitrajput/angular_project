import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-update-profle',
  templateUrl: './update-profle.component.html',
  styleUrls: ['./update-profle.component.css']
})
export class UpdateProfleComponent implements OnInit {
  userData: any;
  name:any;
  email:any;
  password:any;
  userDetails:any;
  constructor() { }

  ngOnInit(): void {
    this.userData = JSON.parse(sessionStorage.getItem('user-detail') || '{}');
    console.log("hello" + this.userData)
    this.name = this.userData.current_user.name
    this.email = this.userData.current_user.email
    this.password = this.userData.current_user.password
     
  }

}
