import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pk-default-page',
  templateUrl: './default-page.component.html',
  styleUrls: ['./default-page.component.sass']
})
export class DefaultPageComponent implements OnInit {

  constructor() { }

  display:string;

  ngOnInit(): void {
    this.display="cases";
  }

  infectionClick(){
    this.display="cases";
  }

  deathClick(){
    this.display="deaths";
  }

  recoveriesClick(){
    this.display="recovered";
  }

  criticalClick(){
    this.display="critical";
  }


}
