import { Component, EventEmitter, Input, Output } from '@angular/core'
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms'
import { CommonModule } from '@angular/common'
import { ErrorMessageComponent } from '../shared/error-message/error-message.component'

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ErrorMessageComponent],
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
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      income: ['', [Validators.required, Validators.minLength(2)]],
      date: ['', [Validators.required, this.futureDateValidator]],
      // file: ['', [Validators.required]],
      lang: ['', Validators.required],
      vehicles: this.fb.group(
        {
          bike: [false],
          car: [false],
          boat: [false],
        },
        { validator: this.atLeastOneVehicleValidator }
      ),
    })
  }

  private futureDateValidator(control: any) {
    const selectedDate = new Date(control.value)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return selectedDate >= today ? null : { pastDate: true }
  }

  private atLeastOneVehicleValidator(group: FormGroup) {
    const hasVehicle = Object.values(group.value).some(
      (value) => value === true
    )
    return hasVehicle ? null : { noVehicle: true }
  }

  ngOnChanges(changes: any) {
    if (changes['todoToEdit']) {
      this.initForm();
      if (this.todoToEdit) {
        this.form.patchValue({
          id: this.todoToEdit.id,
          firstName: this.todoToEdit.firstName,
          lastName: this.todoToEdit.lastName,
          income: this.todoToEdit.income,
          date: this.todoToEdit.date,
          lang: this.todoToEdit.lang,
          vehicles: this.todoToEdit.vehicles,
        });
      }
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
