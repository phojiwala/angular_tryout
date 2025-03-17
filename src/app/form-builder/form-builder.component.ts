import { CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms'

@Component({
  selector: 'app-form-builder',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.css'],
})
export class FormBuilderComponent implements OnInit {
  formConfig = {
    fields: [
      { label: 'Name', type: 'text', required: true },
      { label: 'Email', type: 'email', required: true },
      { label: 'Age', type: 'number', required: false },
    ],
  }
  form!: FormGroup

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.createForm()
  }

  createForm() {
    const group: any = {}
    this.formConfig.fields.forEach((field: any) => {
      const fieldName = field.label.toLowerCase()
      group[fieldName] = ['', field.required ? Validators.required : null]
    })
    this.form = this.fb.group(group)
  }

  getControl(name: string): AbstractControl | null {
    return this.form.get(name)
  }

  hasRequiredError(control: AbstractControl | null): boolean {
    return (control?.touched && control?.errors?.['required']) || false
  }

  onSubmit() {
    if (this.form.valid) {
      console.log('Form Value:', this.form.value)
    } else {
      this.form.markAllAsTouched()
    }
  }
}
