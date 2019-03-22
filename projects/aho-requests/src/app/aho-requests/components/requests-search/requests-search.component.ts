import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-requests-search',
  templateUrl: './requests-search.component.html',
  styleUrls: ['./requests-search.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RequestsSearchComponent implements OnInit {
  @Input() search: string;

  constructor() { }

  ngOnInit() {
  }

}
