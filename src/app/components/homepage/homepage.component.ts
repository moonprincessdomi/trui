import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder} from '@angular/forms';
import { NipValidator } from 'src/app/shared/nip.directive';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.sass']
})
export class HomepageComponent implements OnInit {

  contactForm = this.fb.group({
    name: ['', Validators.required],
    nip: ['', [Validators.required, NipValidator(/^[0-9]{10}$/i)]],
    email: ['', [Validators.required, Validators.email]],
    subject: ['', Validators.required],
    driverLicense: [''],
    content: [''],
    agreements: this.fb.group({
      processing: ['', Validators.required],
      contact: ['']
    })
  })

  subjects: string[] = [
    'Współpraca',
    'Oferty pracy'
  ]

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  allComplete: boolean = false;

  setAll(completed: boolean) {
    this.allComplete = completed;
    this.contactForm.controls.agreements.setValue({
      processing: completed,
      contact: completed
    });
  }

  updateAll(): void {
    this.allComplete = this.contactForm.controls.agreements.get('processing')?.value && this.contactForm.controls.agreements.get('contact')?.value;
  }

  submit() {
    console.log('Nazwa firmy / Imię i nazwisko', this.contactForm.get('name')?.value);
    console.log('Numer NIP', this.contactForm.get('nip')?.value);
    console.log('E-mail', this.contactForm.get('email')?.value);
    console.log('Temat', this.contactForm.get('subject')?.value);
    console.log('Prawo jazdy kat.B', this.contactForm.get('driverLicense')?.value);
    console.log('Treść wiadomości', this.contactForm.get('content')?.value);
    console.log('Zgoda na przetwarzanie danych osobowych', this.contactForm.controls.agreements.get('processing')?.value);
    console.log('Zgoda na kontakt', this.contactForm.controls.agreements.get('contact')?.value);
  }
}
