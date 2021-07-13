import { AbstractControl } from '@angular/forms';
import { DealerService } from 'src/app/services/dealer.service';
import { map } from 'rxjs/operators';

export class ValidationsDealer {
  static isUniqueName(ds: DealerService, discard?: string) {
    return (control: AbstractControl) => {
      const value = control.value;
      if (discard) {
        return ds
          .existDealer(value, discard)
          .pipe(map((resp) => (resp === false ? null : { notUnique: true })));
      } else {
        return ds
          .existDealer(value)
          .pipe(map((resp) => (resp === false ? null : { notUnique: true })));
      }
    };
  }
}
