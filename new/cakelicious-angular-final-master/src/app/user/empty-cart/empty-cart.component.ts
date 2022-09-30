import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-empty-cart',
  templateUrl: './empty-cart.component.html',
  styleUrls: ['./empty-cart.component.css']
})
export class EmptyCartComponent implements OnInit {
card:number|undefined;
  constructor(private activeRouter:ActivatedRoute) { }

  ngOnInit(): void {
    //alert(this.activeRouter.snapshot.params['val']);
this.card=this.activeRouter.snapshot.params['val'];

  }

}
