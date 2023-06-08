import { Injectable } from '@angular/core';
import {
  AbstractControl,
  AsyncValidator,
  ValidationErrors,
} from '@angular/forms';
import { Observable, delay, of, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EmailValidatorService implements AsyncValidator {
  validate(
    control: AbstractControl<any, any>
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    const email = control.value;

    const httpObservable = new Observable<ValidationErrors | null>(
      (subscriber) => {
        if (email === 'carlos.coronado@gmail.com') {
          subscriber.next({ emailTaken: 'email is Taken' });
          subscriber.complete();
          //return;
        }

        subscriber.next(null);
        subscriber.complete;
      }
    ).pipe(delay(2000));

    return httpObservable;
  }
}
