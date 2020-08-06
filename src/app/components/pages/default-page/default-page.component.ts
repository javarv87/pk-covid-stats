import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'pk-default-page',
  templateUrl: './default-page.component.html',
  styleUrls: ['./default-page.component.sass']
})
export class DefaultPageComponent implements OnInit {

  constructor() { }

  //Se uso un subject para hacer que recargue el mapa en el componente hijo
  eventsSubject:Subject<void> = new Subject<void>();

  //display es el valor que se pasa al componente hijo, que es el mapa
  display:string;

  ngOnInit(): void {
    this.display="cases";
  }

  //cada funcion corresponde a un boton, en el que se cambia el valor de display, y se emite el evento
  infectionClick(){
    this.display="cases";
    this.emitEventToChild();
  }

  deathClick(){
    this.display="deaths";
    this.emitEventToChild();
  }

  recoveriesClick(){
    this.display="recovered";
    this.emitEventToChild();
  }

  criticalClick(){
    this.display="critical";
    this.emitEventToChild();
  }

  emitEventToChild(){
    this.eventsSubject.next();
  }


}
