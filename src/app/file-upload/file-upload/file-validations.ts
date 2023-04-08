import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
const FILE_MAX_SIZE = 2000;
const FILE_MIN_SIZE = 1000;
export class FileValidations {
  public static fileExtensionValidator(
    acceptedExtensions: string[]
  ): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value) {
        const ext = control.value.split('.').pop();
        if (!acceptedExtensions.includes(ext)) {
          return {
            fileExtension: {
              acceptedExtensions: acceptedExtensions,
              actualExtension: ext,
            },
          };
        }
      }
      return null;
    };
  }
  public static fileMaxSizeValidator(files: FileList): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (files.length > 0) {
        if (Math.round(files[0].size / 1024) > FILE_MAX_SIZE) {
          return {
            fileMaxSize: {
              requiredSize: `${Math.round(FILE_MAX_SIZE) / 1000}MB`,
              actualSize: `${Math.round(
                Math.round(files[0].size / 1024) / 1000
              )}MB`,
            },
          };
        }
      }
      return null;
    };
  }
  public static fileMinSizeValidator(files: FileList): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (files.length > 0) {
        if (Math.round(files[0].size / 1024) < FILE_MIN_SIZE) {
          return {
            fileMinSize: {
              requiredSize: `${Math.round(FILE_MIN_SIZE) / 1000}MB`,
              actualSize: `${Math.round(
                Math.round(files[0].size / 1024) / 1000
              )}MB`,
            },
          };
        }
      }
      return null;
    };
  }
}
