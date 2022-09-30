import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ContactService } from 'src/app/services/contact.service';
@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {
  userData: any;
  userId: any;
  query: any;

  constructor(private contactService:ContactService , private toastr: ToastrService , private router:Router) { }

  public addQueryCall(){
    this.contactService.addQuary(this.userId ,this.query).subscribe((data:any)=>{
      console.log(data);
      if(data.status == 'ok'){
        this.toastr.success('Query Submit Successfully ,We will resolve your query on Mail please check your mail ')
        window.location.reload();
      }else{
        this.router.navigate(['/signin'])
      }
    })
  }

  public ngOnInit(): void {
    this.userData = JSON.parse(sessionStorage.getItem('user-detail') || '{}');
    this.userId = this.userData.current_user._id
  }



}
