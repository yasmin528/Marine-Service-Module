import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit, signal, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-showMessage',
  imports: [CommonModule],
  templateUrl: './showMessage.component.html',
  styleUrls: ['./showMessage.component.css']
})
export class ShowMessageComponent {
  private counter = 0;

  messages = signal<{
    text: string;
    type: 'success' | 'error' | 'info';
    id: number;
    show: boolean;
  }[]>([]);

  getColor(type: 'success' | 'error' | 'info') {
    return {
      success: 'bg-green-500',
      error: 'bg-red-500',
      info: 'bg-blue-500'
    }[type];
  }

  show(text: string, type: 'success' | 'error' | 'info' = 'success', duration = 3000) {
    const id = this.counter++;
    const msg = { text, type, id, show: false };

    this.messages.update(current => [...current, msg]);

    requestAnimationFrame(() => {
      this.messages.update(current => current.map(m => m.id === id ? { ...m, show: true } : m));
    });

    setTimeout(() => {
      this.messages.update(current => current.map(m => m.id === id ? { ...m, show: false } : m));

      setTimeout(() => {
        this.messages.update(current => current.filter(m => m.id !== id));
      }, 500); 
    }, duration);
  }

}
