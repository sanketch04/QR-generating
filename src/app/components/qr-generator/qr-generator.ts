import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { QRCodeComponent } from 'angularx-qrcode';
import { SafeUrl } from '@angular/platform-browser';

import { TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-qr-generator',
  standalone: true,
  imports: [FormsModule, QRCodeComponent, TranslatePipe],
  templateUrl: './qr-generator.html',
  styleUrl: './qr-generator.css',
})
export class QrGenerator {
  private translate = inject(TranslateService);

  qrData: string = 'https://www.google.com';

  qrCodeDownloadLink: SafeUrl = '';

  logoUrl: string = '/images/logo.png';

  logoSize: number = 60;

  currentLanguage: string = 'en';

  constructor() {
    this.translate.addLangs(['en', 'es', 'hi', 'mr','ru']);

    this.translate.use('en');
  }

  generateQRCode(): void {
    console.log('QR Data:', this.qrData);
  }

  onQRCodeURL(url: SafeUrl): void {
    this.qrCodeDownloadLink = url;
  }

  changeLanguage(language: string): void {
    this.currentLanguage = language;

    this.translate.use(language);
  }
}
