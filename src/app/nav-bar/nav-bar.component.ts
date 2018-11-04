import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  username: string = "Deepankar"
  isLoggedIn: boolean = false;
  // get isLoggedIn(): boolean {
  //   return (localStorage.getItem('JWT')!==null)
  // }
  constructor() { }

  ngOnInit() {
  }

}
