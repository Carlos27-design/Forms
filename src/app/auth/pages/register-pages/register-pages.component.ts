import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as cusmtomValidators from 'src/app/shared/validators/validators';
import { ValidatorsService } from '../../../shared/services/validators.service';
import { EmailValidatorService } from 'src/app/shared/validators/email-validator.service';

@Component({
  templateUrl: './register-pages.component.html',
  styles: [],
})
export class RegisterPagesComponent {
  constructor(
    private _formBuilder: FormBuilder,
    private _validatorsService: ValidatorsService,
    private _emmailValidatorService: EmailValidatorService
  ) {}

  public myForm: FormGroup = this._formBuilder.group(
    {
      name: [
        '',
        [
          Validators.required,
          Validators.pattern(
            this._validatorsService.firstNameAndLastnamePattern
          ),
        ],
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(this._validatorsService.emailPattern),
        ],
        [this._emmailValidatorService],
      ],
      userName: [
        '',
        [Validators.required, this._validatorsService.cantBeStrider],
      ],
      password: ['', [Validators.required, Validators.minLength(6)]],
      password2: ['', [Validators.required]],
    },
    {
      validators: [
        this._validatorsService.isFieldOneEqualsFieldTwo(
          'password',
          'password2'
        ),
      ],
    }
  );

  public isValidField(field: string) {
    //TODO: obtener validacion desde un servicio

    return this._validatorsService.isValidField(this.myForm, field);
  }

  public onSave(): void {
    this.myForm.markAllAsTouched();
  }
}
