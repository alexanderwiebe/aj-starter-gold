import { Component, inject, signal } from '@angular/core';
import { HomeService } from '../services/home.service';

@Component({
  selector: 'app-home',
  standalone: true,
  template: `
    <h1>Welcome to AI Document</h1>
    <button (click)="testApi()">Test API</button>
    @if (message()) {
      <p data-testid="api-response">API Response: {{ message() }}</p>
    }
  `,
  styles: ``
})
export class HomeComponent {
  private readonly homeService = inject(HomeService);

  readonly message = signal<string>('');

  testApi() {
    this.homeService.getHello().subscribe({
      next: (response) => this.message.set(response),
      error: (err) => this.message.set('Error: ' + err.message)
    });
  }
}
