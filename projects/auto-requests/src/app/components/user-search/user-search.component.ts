import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material';

import {User, UserSearchService} from '@kolenergo/core';
import {RoutePoint} from '../../models';
import {debounceTime, distinctUntilChanged, switchMap, tap} from 'rxjs/operators';
import {Observable, of} from 'rxjs';


@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.less']
})
export class UserSearchComponent implements OnInit {
  userSearchForm: FormGroup;
  users$: Observable<User[]>;
  selectedUser: User;
  @Output() select: EventEmitter<User>;
  @Output() clear: EventEmitter<void>;

  constructor(
    private readonly builder: FormBuilder,
    private readonly users: UserSearchService
  ) {
    this.userSearchForm = this.builder.group({
      query: new FormControl(null)
    });
    this.selectedUser = null;
    this.select = new EventEmitter<User>();
    this.clear = new EventEmitter<void>();
  }

  ngOnInit() {
    this.users$ = this.userSearchForm.controls.query.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((value) =>  {
        return value.length > 2 ? this.users.searchUsers(value, false, false) : of([]);
      })
    );
  }

  /**
   * Выбор пользователя
   * @param uevent - Событие
   */
  onSelect(event: MatAutocompleteSelectedEvent) {
    this.selectedUser = event.option.value;
    this.select.emit(event.option.value);
  }

  /**
   * Отображение в поле ввода выбранного пользователя в меню
   * @param user - Выбранный пользователь
   */
  display(user: User): string {
    return user ? `${user.firstName} ${user.lastName}` : '';
  }

  /**
   * Сброс выбранного пользователя
   */
  onClear() {
    this.selectedUser = null;
    this.userSearchForm.controls.query.setValue('');
    this.clear.emit();
  }
}
