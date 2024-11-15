import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'customFeatures';
  images = [
    { source: 'https://placehold.co/600x400' },
    { source: 'https://placehold.co/600x400/orange/white' },
    { source: 'https://placehold.co/600x400/gray/orange' },
    { source: 'https://placehold.co/600x400/yellow/white' },
    { source: 'https://placehold.co/600x400/red/white' },
    { source: 'https://placehold.co/600x400/yellow/black' },
    { source: 'https://placehold.co/600x400/white/black' },
    { source: 'https://placehold.co/600x400/black/white' },
  ];
}
