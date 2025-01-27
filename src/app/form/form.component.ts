import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      date: ['', Validators.required],
      file: [''],
      lang: ['', Validators.required],
      vehicles: this.fb.group({
        bike: [false],
        car: [false],
        boat: [false]
      })
    });
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    this.form.patchValue({
      file: file
    });
  }

  handleSubmit() {
    if (this.form.valid) {
      console.log('Form Values:', this.form.value);
    } else {
      console.log('Form is invalid');
    }
  }
}