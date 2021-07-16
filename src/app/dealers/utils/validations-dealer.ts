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

  static isUniqueEmail(ds: DealerService, discard?: string) {
    return (control: AbstractControl) => {
      const value = control.value;
      if (discard) {
        return ds
          .existEmail(value, discard)
          .pipe(map((resp) => (resp === false ? null : { notUnique: true })));
      } else {
        return ds
          .existEmail(value)
          .pipe(map((resp) => (resp === false ? null : { notUnique: true })));
      }
    };
  }

  static existUser(ds: DealerService, discard?: string) {
    return (control: AbstractControl) => {
      const value = control.value;
      if (discard) {
        return ds
          .existUser(value, discard)
          .pipe(map((resp) => (resp === true ? null : { noUser: true })));
      } else {
        return ds
          .existUser(value)
          .pipe(map((resp) => (resp === true ? null : { noUser: true })));
      }
    };
  }
}
