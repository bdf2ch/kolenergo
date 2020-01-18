import {Component, Host, Input, OnInit, Optional} from '@angular/core';
import {DivisionTreeComponent} from '../division-tree/division-tree.component';
import {PhoneBookDivision} from '../../models';

@Component({
  selector: 'app-division-tree-item',
  templateUrl: './division-tree-item.component.html',
  styleUrls: ['./division-tree-item.component.less']
})
export class DivisionTreeItemComponent implements OnInit {
  @Input() divisions: PhoneBookDivision[];

  constructor(@Optional() @Host() tree: DivisionTreeComponent) { }

  ngOnInit() {}

}
