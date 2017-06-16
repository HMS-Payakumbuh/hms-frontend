import { Component, OnInit }				from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';

@Component({
 	selector: 'rawat-jalan-page',
 	templateUrl: './rawat-jalan.component.html'
})

export class RawatJalanComponent implements OnInit {
	addForm: FormGroup;

	constructor(private formBuilder: FormBuilder) {}
	
	ngOnInit() {
		this.addForm = this.formBuilder.group({
			resepEntry: this.formBuilder.array([this.initResepEntry()])
		});
	}

	initResepEntry() {
		return this.formBuilder.group({
			obatResep: ['', Validators.required]
		});
	}

	addResepEntry() {
    const control = < FormArray > this.addForm.controls['resepEntry'];
    control.push(this.initResepEntry());
	}

	removeResepEntry(i: number) {
    const control = < FormArray > this.addForm.controls['resepEntry'];
    control.removeAt(i);
	}
}