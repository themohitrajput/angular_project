import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/app/services/login.service';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  user: User = new User('', '', '', '');
  otp: any;
  Repassword: any;
  visible :boolean=true;
  changetype: boolean = true;
  visible2:boolean=true;
  changetype2: boolean = true;
  constructor(
    private service: LoginService,
    private router: Router,
    private toastr: ToastrService
  ) {}
    // hide and show password method
    viewPass(){
      this.visible = !this.visible;
      this.changetype = !this.changetype
    }
    viewRePass(){
      this.visible2 = !this.visible2;
      this.changetype2 = !this.changetype2;
    }


  public signUp(val: any) {
    val = '' + val;
    console.log(this.otp);
    console.log(val);
      if (val !== this.otp) {
        this.toastr.error('otp wrong ', 'try again');
        console.log(val);
      } else {
        console.log(this.user);
        this.service.signUp(this.user).subscribe((data: any) => {
          console.log(data);
          this.toastr.success(
            'Congratulations :' +
              data.name +
              ', Your account has been created successfully, Please check your Mail inbox to activate your account..'
          );
          this.router.navigate(['/signin']);
        });
      }

  }

  sendOtp() {
    if (this.user.password == this.Repassword) {
      this.service.verifyOtp(this.user).subscribe((data) => {
        console.log(data);
        this.otp = data.Otp;
      });
    }else{
      this.Repassword = 1;

      this.toastr.warning("password not match Re-enter the password ")
    }
  }
  ngOnInit(): void {}
}
