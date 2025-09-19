import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@core/modules/material.module';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {}
