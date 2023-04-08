import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { FileValidations } from './file-validations';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css'],
})
export class FileUploadComponent {
  uploadForm: FormGroup;
  acceptedExtensions = ['pdf'];
  constructor(private formBuilder: FormBuilder) {
    this.uploadForm = this.formBuilder.group({
      fileToUpload: [
        '',
        [
          Validators.required,
          FileValidations.fileExtensionValidator(this.acceptedExtensions),
        ],
      ],
    });
  }
  public uploadFile(event: any) {
    if (!!event.target.files) {
      this.uploadForm
        .get('fileToUpload')
        ?.addValidators([
          FileValidations.fileMaxSizeValidator(event.target.files),
          FileValidations.fileMinSizeValidator(event.target.files),
        ]);
      this.uploadForm.get('fileToUpload')?.updateValueAndValidity();
      if (this.uploadForm.valid) {
        // To Do : Implement your code here
      }
    }
  }
  get fileToUploadControl(): FormControl {
    return this.uploadForm.get('fileToUpload') as FormControl;
  }
}
