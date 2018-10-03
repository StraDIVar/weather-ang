import { NgModule } from '@angular/core';
import {
  MatFormFieldModule,
  MatInputModule,
  MatAutocompleteModule,
  MatCardModule,
  MatListModule,
  MatDividerModule,
  MatButtonModule,
  MatIconModule
} from '@angular/material';
import {  } from '@angular/material/checkbox';

@NgModule({
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatCardModule,
    MatListModule,
    MatDividerModule,
    MatButtonModule,
    MatIconModule
  ],
  exports: [
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatCardModule,
    MatListModule,
    MatDividerModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class MatCustomModule { }
