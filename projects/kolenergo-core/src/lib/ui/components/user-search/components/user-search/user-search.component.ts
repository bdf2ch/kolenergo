import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material';

import { Observable, of } from 'rxjs';
import {debounceTime, distinctUntilChanged, finalize, switchMap} from 'rxjs/operators';

import { User } from '../../../../../models/user.model';
import { UserSearchService } from '../../services/user-search.service';

@Component({
  selector: 'lib-kolenergo-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.less']
})
export class UserSearchComponent implements OnInit, OnChanges {
  @Input() label: string;
  @Input() placeholder: string;
  @Input() formAppearance: string;
  @Input() withCompanyDetails: boolean;
  @Input() withDepartmentDetails: boolean;
  @Input() showCompany: boolean;
  @Input() clearOnSelect: boolean;
  @Output() userSelected: EventEmitter<User> = new EventEmitter();
  @Output() userEntered: EventEmitter<string> = new EventEmitter();
  @Output() searchCleared: EventEmitter<void> = new EventEmitter();
  public inputLabel: string;
  public inputPlaceholder: string;
  public formFieldAppearance: string;
  public withCompany: boolean;
  public withDepartment: boolean;
  public showCompanyLabel: boolean;
  public clearInputWhenUserSelected: boolean;
  public users$: Observable<User[]>;
  public resultLength: number;
  public userSearchForm: FormGroup;

  constructor(private builder: FormBuilder,
              private userSearchService: UserSearchService) {
    this.inputLabel = null;
    this.inputPlaceholder = null;
    this.formFieldAppearance = 'standard';
    this.withCompany = false;
    this.withDepartment = false;
    this.showCompanyLabel = false;
    this.clearInputWhenUserSelected = false;
    this.resultLength = 0;
  }

  ngOnInit() {
    this.userSearchForm = this.builder.group({
      query: new FormControl(null)
    });

    this.users$ = this.userSearchForm
      .get('query')
      .valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((value) =>  {
          return value.length > 2 ? this.userSearchService.searchUsers(value, this.withCompany, this.withDepartment) : of([]);
        })
      );

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.hasOwnProperty('label')) {
      this.inputLabel = changes.label.currentValue;
    }
    if (changes.hasOwnProperty('placeholder')) {
      this.inputPlaceholder = changes.placeholder.currentValue;
    }
    if (changes.hasOwnProperty('formAppearance')) {
      this.formFieldAppearance = changes.formAppearance.currentValue;
    }
    if (changes.hasOwnProperty('withCompanyDetails')) {
      this.withCompany = changes.withCompanyDetails.currentValue;
    }
    if (changes.hasOwnProperty('withDepartmentDetails')) {
      this.withDepartment = changes.withDepartmentDetails.currentValue;
    }
    if (changes.hasOwnProperty('showCompany')) {
      this.showCompanyLabel = changes.showCompany.currentValue;
    }
    if (changes.hasOwnProperty('clearOnSelect')) {
      this.clearInputWhenUserSelected = changes.clearOnSelect.currentValue;
    }
  }

  enterUser(user: string) {
    console.log('user', user);
    this.userEntered.emit(user);
    this.userSearchForm.get('query').reset('');
  }

  /**
   * Событие выбора пользователя из выпадающего списка
   * @param event - Событие
   */
  selectUser(event: MatAutocompleteSelectedEvent) {
    this.userSelected.emit(event.option.value);
    if (this.clearInputWhenUserSelected) {
      this.userSearchForm.get('query').setValue('');
    }
  }

  /**
   * Отображение имени выбранного пользователя в форме ввода
   * @param user - Выбранный пользователь
   */
  displaySelectedUser(user?: User): string {
    return user ? `${user.firstName} ${user.secondName ? user.secondName : ''} ${user.lastName}` : '';
  }

  /**
   * Очитска условия поиска
   */
  clearSearch() {
    this.userSearchForm.get('query').setValue('');
    this.searchCleared.emit();
  }

}
