import { CommonModule } from '@angular/common';
import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { Router, RouterLink, RouterModule } from "@angular/router";

@Component({
  selector: 'app-header',
  imports: [RouterLink  , RouterModule , CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
constructor(public router: Router) {}
  mobileMenuOpen = false;

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  isActive(path: string) {
    const pathNow = this.router.url 
    return  pathNow.includes(path);
  }
}
