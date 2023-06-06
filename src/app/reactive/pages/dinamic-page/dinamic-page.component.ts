import { Component } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormGroup,
  FormArray,
  FormControl,
} from '@angular/forms';

@Component({
  templateUrl: './dinamic-page.component.html',
})
export class DinamicPageComponent {
  constructor(private readonly _formBuilder: FormBuilder) {}

  public myForm: FormGroup = this._formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    favorites: this._formBuilder.array([
      ['Gears of War', Validators.required],
      ['Gears of War 2', Validators.required],
      ['Gears of War 3', Validators.required],
      ['Gears of War 4', Validators.required],
      ['Gears of War 5', Validators.required],
    ]),
  });

  public newFavorite: FormControl = new FormControl('', [Validators.required]);

  public onSubmit(): void {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    console.log(this.myForm.value);
    (this.myForm.controls['favorites'] as FormArray) = this._formBuilder.array(
      []
    );
    this.myForm.reset();
  }

  public onAddToFavorites(): void {
    if (this.newFavorite.invalid) return;

    const newGame = this.newFavorite.value;

    this.favorites.push(
      this._formBuilder.control(newGame, Validators.required)
    );

    this.newFavorite.reset();
  }

  public onDeleteFavorite(index: number): void {
    this.favorites.removeAt(index);
  }

  get favorites() {
    return this.myForm.get('favorites') as FormArray;
  }

  public isValidField(field: string): boolean | null {
    return (
      this.myForm.controls[field].errors && this.myForm.controls[field].touched
    );
  }

  public validFieldArray(formArray: FormArray, index: number) {
    return (
      formArray.controls[index].errors && formArray.controls[index].touched
    );
  }

  public getFieldError(field: string): string | null {
    if (!this.myForm.controls[field]) return null;

    const errors = this.myForm.controls[field].errors || {};

    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido';

        case 'minlength':
          return `Minimo ${errors['minlength'].requiredLength} caracteres.`;
      }
    }

    return null;
  }
}
