import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/app/services/login.service';
import { SocialAuthService, GoogleLoginProvider } from 'angularx-social-login';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
  user: User = new User('', '', '', '');
  visible:boolean= true;
  changetype:boolean = true;
  constructor(
    private service: LoginService,
    private toastr: ToastrService,
    private social: SocialAuthService,
    private router: Router
  ) {}

  // show and hide password
  viewPass(){
    this.visible = !this.visible;
    this.changetype = !this.changetype
  }

  signinWithGoogle() {
    this.social
      .signIn(GoogleLoginProvider.PROVIDER_ID)
      .then(() => {
        this.social.authState.subscribe((data) => {
          console.log(data.email);
          this.service.SignInGoogle(data.email).subscribe(
            (data) => {
              console.log(data.token);
              if (data.status == 'login-success') {
                this.toastr.success('Login Success', 'WELCOME TO CAKELICIOUS');
                sessionStorage.setItem('jwt-token', data.token);
                sessionStorage.setItem('user-detail', JSON.stringify(data));
                this.router.navigate(['/']);
              } else {
              }
            },
            (err) => {
              if (err instanceof HttpErrorResponse) {
                if (err.status == 400) {
                  this.toastr.error('Email is Not Rgisterd with us ');
                  this.router.navigate(['signup']);
                } else this.toastr.error('Server Error', 'Error');
              }
            }
          );
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  public signIn() {
    this.service.signInn(this.user).subscribe((data: any) => {
      console.log(data);
      if (data.status == 'login-success') {
        this.toastr.success('Login Success', 'WELCOME TO CAKELICIOUS');
        sessionStorage.setItem('jwt-token', data.token);
        sessionStorage.setItem('user-detail', JSON.stringify(data));
        this.router.navigate(['/']);
      }
    },
    (err) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status == 401) {
          this.toastr.error('Email is Not Rgisterd with us ');
          this.router.navigate(['signup']);
        } else this.toastr.error('Server Error', 'Error');
      }
    });
  }

  ngOnInit(): void {}
}
