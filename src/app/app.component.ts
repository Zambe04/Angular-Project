import { Component } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Progetto-Angular';

  constructor(private router: Router){}

  onTabChanged(event: MatTabChangeEvent): void{
    switch(event.index){
      case 0: this.router.navigate(['/users'])
      break
      case 1: this.router.navigate(['/post'])
      break
      case 2: this.router.navigate(["/login"])
    }
  }
}
