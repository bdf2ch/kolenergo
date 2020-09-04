import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material';

import { User, UserSearchService } from '@kolenergo/core';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.less']
})
export class UserSearchComponent implements OnInit {
  userSearchForm: FormGroup;
  users$: Observable<User[]>;
  selectedUser: User;
  @Input() label: string;
  @Input() hint: string;
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
        return value && value.length > 2 ? this.users.searchUsers(value, false, false, 8) : of([]);
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
    return this.selectedUser
      ? `${this.selectedUser.firstName} ${this.selectedUser.lastName}`
      : user
        ? `${user.firstName} ${user.lastName}`
        : '';
  }

  /**
   * Сброс выбранного пользователя
   */
  onClear() {
    this.selectedUser = null;
    this.userSearchForm.controls.query.setValue('');
    this.clear.emit();
  }

  /**
   * Установка текцущего пользователя
   * @param user - Текущий пользователь
   */
  setSelected(user: User) {
    this.selectedUser = user;
    this.userSearchForm.controls.query.setValue(user ? user : null);
  }

  /**
   * Сброс выбранного пользователя
   */
  clearSelected() {
    this.selectedUser = null;
    this.userSearchForm.controls.query.setValue('');
  }
}
