import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/model/category';
import { Flavour } from 'src/app/model/flavour';
import { Occassion } from 'src/app/model/occassion';
import { FlavourService } from 'src/app/services/flavour.service';
import { CategoryService } from 'src/app/services/category.service';
import { LoginService } from 'src/app/services/login.service';
import { ProductService } from 'src/app/services/product.service';
import { OccassionService } from 'src/app/services/occassion.service';
import { ElementRef, ViewChild } from '@angular/core';
declare var webkitSpeechRecognition:any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  occassionList: Occassion[] | any;
  categoryList: Category[] | any=[];
  flavourList?: Flavour[]; // or |any
  title="CAKELICIOUS";
  load:any=true;
  constructor(
    private router: Router,
    private service: LoginService,
    private flavourService: FlavourService,
    private category: CategoryService,
    private occassionServe: OccassionService,
    private ElByClassName: ElementRef,
  ) {
    this.occassionServe.getOccassion().subscribe((data: any) => {
      // console.log(data);
      this.occassionList = data;
    });
    this.category.getCategory().subscribe((data: any) => {
      // console.log(data);
      this.categoryList = data;
    });

    this.flavourService.getFlaovurList().subscribe(
      (data) => {
        this.flavourList = data;
      },
      (err) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status == 500) alert('Something went wrong...');
        }
      }
    );

    // setTimeout(()=>{
    //   this.load=false;
    // },3000)  
  }

  public searchProduct(event: any) {
    let searchText = event.target.value;
    console.log(searchText);
    this.router.navigate(['/searchProduct', searchText]);
  }

  change(search_form: any) {
    search_form.classList.toggle('active');
  }

  menuClick(menu:any,overlay:any,mobileMenuHead:any,sf:any){
    menu.classList.toggle('active')
    // overlay.classList.add('active')
    mobileMenuHead.classList.add('active');
    sf.classList.remove('active');

  }

  subMenu(subMenu:any,title:any){

     subMenu.classList.add('active')
    subMenu.style.animation = "slideLeft 0.5s ease forwards";
    this.title = title;
  }

  hideSubMenu(subMenu:any,submenu2:any,submenu3:any){
    this.title = "CAKELICIOUS";

    subMenu.style.animation = "slideRight 0.5s ease forwards";
    setTimeout(() =>{
       subMenu.classList.remove("active");
    },300);

    submenu2.style.animation = "slideRight 0.5s ease forwards";
    setTimeout(() =>{
       submenu2.classList.remove("active");
    },300);

    submenu3.style.animation = "slideRight 0.5s ease forwards";
    setTimeout(() =>{
       submenu3.classList.remove("active");
    },300);
  }

  signout() {
    sessionStorage.removeItem('jwt-token');
    sessionStorage.removeItem('user-detail');
    alert("logout success");
    this.router.navigate(['/signin']);
  }

  ngOnInit() {

   
  }

  isLoggedIn() {
    return this.service.checkToken();
  }
  searching(){
    if("webkitSpeechRecognition" in window){
      
      let vSearch = new webkitSpeechRecognition();
      vSearch.continuous = false;
      vSearch.interimResults = false;
      vSearch.lang = "en-US";
      vSearch.maxAlternatives = 1
      vSearch.start();

      vSearch.onresult = async (e:any) =>{
        vSearch.stop();
        console.log(e.results[0][0].transcript);
      }
      vSearch.onerror = function(e:any){
        console.log(e);
        vSearch.stop();
      }
    }
    else{
      console.log("Your browser dosen't support speech recognition");
    }
  }

  search(event:any){
      let text = event.target.value

      this.router.navigate(['/searchProduct',text])
  }

 
}
