import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

import { User } from '../../../../../models/user.model';

@Component({
  selector: 'lib-kolenergo-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserListComponent implements OnInit, OnChanges {
  @Input() users: (User | string)[];
  @Input() caption: string;
  @Input() showIcon: boolean;
  @Input() showAvatar: boolean;
  @Input() showCompany;
  @Input() groupByCompany: boolean;
  @Input() noUsersPlaceholder: string;
  @Input() allowRemove: boolean;
  @Input() listActions: {id: string, title: string, icon: string, isVisible: boolean, action: () => void}[];
  @Input() itemActions: {id: string, title: string, icon: string, action: (user: User) => void}[];
  @Output() userRemoved: EventEmitter<User | string> = new EventEmitter();
  public userList: User[];
  public userListCaption: string;
  public showUserListCaptionIcon: boolean;
  public showUserAvatar: boolean;
  public showUserCompany: boolean;
  public groupUsersByCompany: boolean;
  public emptyUserListPlaceholder: string;
  public allowRemoveUser: boolean;
  public userListActions: {id: string, title: string, icon: string, isVisible: boolean, action: () => void}[];
  public userItemActions: {id: string, title: string, icon: string, action: (user: User) => void}[];
  public groups: {title: string, users: User[]}[];

  constructor() {
    this.userList = [];
    this.userListCaption = null;
    this.showUserListCaptionIcon = true;
    this.showUserAvatar = true;
    this.showUserCompany = false;
    this.groupUsersByCompany = false;
    this.emptyUserListPlaceholder = null;
    this.allowRemoveUser = false;
    this.userListActions = [];
    this.userItemActions = [];
    this.groups = [];
  }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.hasOwnProperty('users')) {
      this.userList = changes.users.currentValue;
      if (this.groupUsersByCompany === true) {
        this.groups = [
          {
            title: 'Организация не указана',
            users: []
          }
        ];
        this.userList.forEach((user: User) => {
          if (user.company) {
            const findGroupCompanyById = (group: {title: string, users: User[]}) => group.title === user.company.shortTitle;
            const foundedGroup = this.groups.find(findGroupCompanyById);
            if (foundedGroup) {
              foundedGroup.users.push(user);
            } else {
              this.groups.unshift({title: user.company.shortTitle, users: [user]});
            }
          } else {
            this.groups[this.groups.length - 1].users.push(user);
          }
        });

        this.groups.sort((a: {title: string, users: User[]}, b: {title: string, users: User[]}) => {
          return a.title > b.title ? 1 : -1;
        });
      }
    }
    if (changes.hasOwnProperty('caption')) {
      this.userListCaption = changes.caption.currentValue;
    }
    if (changes.hasOwnProperty('showIcon')) {
      this.showUserListCaptionIcon = changes.showIcon.currentValue;
    }
    if (changes.hasOwnProperty('showAvatar')) {
      this.showUserAvatar = changes.showAvatar.currentValue;
    }
    if (changes.hasOwnProperty('showCompany')) {
      this.showUserCompany = changes.showCompany.currentValue;
    }
    if (changes.hasOwnProperty('groupByCompany')) {
      this.groupUsersByCompany = changes.groupByCompany.currentValue;
    }
    if (changes.hasOwnProperty('noUsersPlaceholder')) {
      this.emptyUserListPlaceholder = changes.noUsersPlaceholder.currentValue;
    }
    if (changes.hasOwnProperty('allowRemove')) {
      this.allowRemoveUser = changes.allowRemove.currentValue;
    }
    if (changes.hasOwnProperty('listActions')) {
      this.userListActions = changes.listActions.currentValue;
    }
    if (changes.hasOwnProperty('itemActions')) {
      this.userItemActions = changes.itemActions.currentValue;
    }
  }

  /**
   * Удаление пользователя из списка
   * @param user - Удаляемый пользователь
   * @param index - Индекс удаляемого элемента списка
   */
  removeUser(user: User | string, index: number) {
    this.userRemoved.emit(user);
  }
}
