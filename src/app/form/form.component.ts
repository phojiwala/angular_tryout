import { Component, EventEmitter, Input, Output } from '@angular/core'
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent {
  form!: FormGroup
  @Output() formSubmit = new EventEmitter<any>()
  @Input() todoToEdit: any

  constructor(private fb: FormBuilder) {
    this.initForm()
  }

  private initForm() {
    this.form = this.fb.group({
      id: new Date().valueOf(),
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      date: ['', Validators.required],
      file: [''],
      lang: ['', Validators.required],
      vehicles: this.fb.group({
        bike: [false],
        car: [false],
        boat: [false],
      }),
    })
  }

  ngOnChanges(changes: any) {
    if (changes['todoToEdit'] && this.todoToEdit) {
      this.form.patchValue({
        id: this.todoToEdit.id,
        firstName: this.todoToEdit.firstName,
        lastName: this.todoToEdit.lastName,
        date: this.todoToEdit.date,
        lang: this.todoToEdit.lang,
        vehicles: this.todoToEdit.vehicles,
      })
    }
  }

  onFileChange(event: any) {
    const file = event.target.files[0]
    this.form.patchValue({
      file: file,
    })
  }

  resetForm() {
    this.form.reset()
    const fileInput = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement
    if (fileInput) {
      fileInput.value = ''
    }
  }

  handleSubmit() {
    if (this.form.valid) {
      this.formSubmit.emit(this.form.value)
      this.resetForm()
    } else {
      Object.keys(this.form.controls).forEach((key) => {
        const control = this.form.get(key)
        if (control?.invalid) {
          control.markAsTouched()
        }
      })
      alert('Please fill in all required fields')
    }
  }

  getErrorMessage(controlName: string): string {
    const control = this.form.get(controlName)
    if (control?.hasError('required')) {
      return `${controlName} is required`
    }
    return ''
  }
}
