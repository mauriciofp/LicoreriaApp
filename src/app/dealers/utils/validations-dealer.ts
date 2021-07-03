import { AbstractControl } from '@angular/forms';
import { DealerService } from 'src/app/services/dealer.service';
import { map } from 'rxjs/operators';

export class ValidationsDealer {

  static isUniqueName(ds: DealerService) {
    return (control: AbstractControl) => {
      const value = control.value;
      return ds.existDealer(value)
        .pipe(
          map((resp) => (
             resp === false ? null : {notUnique: true}
          ))
        );
      };
  }
}
