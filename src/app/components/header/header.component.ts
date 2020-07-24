import { Component, OnInit } from '@angular/core';
import { ThemeService } from '@pk-services/theme/theme.service';

@Component({
  selector: 'pk-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {
 
  isDarkThemeActive;

  constructor(private themeService: ThemeService) { }

  ngOnInit(): void {
    this.themeService.getActiveTheme().subscribe(data => {
      this.isDarkThemeActive = data;
    });
  }

  onToggleTheme(e: boolean) {
    this.themeService.switchTheme(e);
  }
}
