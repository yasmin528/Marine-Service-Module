import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule , FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit{
  
  loginForm!: FormGroup;
  fd = inject(FormBuilder);
  auth = inject(AuthService);
  router = inject(Router);

  ngOnInit(): void {
    this.loginForm = this.fd.group({
      username: ['', [Validators.required, Validators.minLength(1),Validators.pattern(/^\S+$/)]],
      password: ['', [Validators.required, Validators.minLength(1),Validators.pattern(/^\S+$/)]]
    });
  }

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onSubmit() {
    if (this.loginForm.invalid) return;
    const { username, password } = this.loginForm.value;
    this.auth.login(username, password).subscribe({
      next: () => this.router.navigate(['/dashboard']), 
      error: (err) => alert('Login failed')
    });
  }
}
