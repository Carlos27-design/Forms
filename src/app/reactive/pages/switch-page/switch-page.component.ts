import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './switch-page.component.html',
  styles: [],
})
export class SwitchPageComponent implements OnInit {
  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.myForm.reset(this.person);
  }

  public myForm: FormGroup = this._formBuilder.group({
    gender: ['Masculino', [Validators.required]],
    wantNotification: [true, Validators.required],
    termsAndCondition: [false, Validators.requiredTrue],
  });

  public person = {
    gender: 'Femenino',
    wantNotification: true,
  };

  public isValidField(field: string): boolean | null {
    return (
      this.myForm.controls[field].errors && this.myForm.controls[field].touched
    );
  }

  public onSave(): void {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    this.person = this.myForm.value;
    console.log(this.myForm.value);

    const { termsAndCondition, ...newPerson } = this.myForm.value;
    this.person = newPerson;

    console.log(this.person);
  }
}
