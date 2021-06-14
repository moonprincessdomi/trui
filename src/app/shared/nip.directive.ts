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
       // const checksum = (6 * parseInt(digits[0]) + 5 * parseInt(digits[1]) + 7 * parseInt(digits[2]) + 2 * parseInt(digits[3]) + 3 * parseInt(digits[4]) + 4 * parseInt(digits[5]) + 5 * parseInt(digits[6]) + 6 * parseInt(digits[7]) + 7 * parseInt(digits[8])) % 11;
  
        nipChecker = (parseInt(digits[9]) == checksum);
      }
      return nipChecker ?  null : {nipCheckerName: {value: control.value}} ;
    };
  }