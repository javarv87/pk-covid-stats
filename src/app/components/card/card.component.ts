import { Component, OnInit } from '@angular/core';
import { ThemeService } from '@pk-services/theme/theme.service';

@Component({
  selector: 'pk-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.sass']
})
export class CardComponent implements OnInit {
  isStat = false;
  title:string;
  subtitle:string;
  text:string;
  isDarkThemeActive:boolean;
  barColor:string;
  constructor(private themeService: ThemeService) {
    
   }

  ngOnInit(): void {
    this.themeService.getActiveTheme().subscribe(data => {
      this.isDarkThemeActive = data;
    });
    this.title='title';
    this.subtitle='subtitle';
    this.text='text';
    this.isStat = true;
    this.barColor = 'red';
  }
  getStatStyle() {
    let myStyles = {
       'text-align': 'right',
       'padding-right': '25px',
    };
    return myStyles;
} 

}
