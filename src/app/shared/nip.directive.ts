import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

export function NipValidator(reg: RegExp): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const nip = control.value;
      const nipWithoutDashes = nip.replace(/-/g, "");
      let nipChecker;
      if (reg.test(nipWithoutDashes) == false) {
        nipChecker = false;
      }
      else {
        const digits = ("" + nipWithoutDashes).split("");
        const weights = [6,5,7,2,3,4,5,6,7];
        const sum = weights.reduce((acc, x, i) => {
            return acc + x * parseInt(digits[i]);
        }, 0);
        const checksum = sum % 11;  
        nipChecker = (parseInt(digits[9]) == checksum);
      }
      return nipChecker ?  null : {nipCheckerName: {value: control.value}} ;
    };
  }