import {Component, OnInit, Input} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss']
})
export class LinkComponent implements OnInit {

  @Input() linkText: string;
  @Input() linkTo: string;

  constructor(public router: Router) { }

  ngOnInit() {

  }
  navigate = () => {
      this.router.navigate([this.linkTo]);
  }

}
