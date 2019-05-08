import {Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {LinkComponent} from '../link/link.component'
@Component({
  selector: 'app-common-form',
  templateUrl: './common-form.component.html',
  styleUrls: ['./common-form.component.scss']
})
export class CommonFormComponent implements OnInit {

  commonForm = new FormGroup({
    name: new FormControl(),
    channel: new FormControl()
  })

  @ViewChild(LinkComponent) LinkComp: LinkComponent;

  @Input() buttonText: string;
  // tslint:disable-next-line:no-output-on-prefix
  @Output() onFormSubmit = new EventEmitter<any>();

  constructor() { }
  ngOnInit() {
  }

  formSubmit = () => {
    this.onFormSubmit.emit(this.commonForm.value);
  }

}
