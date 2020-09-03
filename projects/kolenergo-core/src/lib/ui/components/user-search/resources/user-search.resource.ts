import {Inject, Injectable} from '@angular/core';

import {
  IResourceMethodStrict,
  Resource,
  ResourceAction,
  ResourceHandler,
  ResourceParams,
  ResourceRequestMethod
} from '@ngx-resource/core';

import { IServerResponse, IUser } from '../../../../interfaces';
import { UserSearchConfigService } from '../user-search.module';
import { IUserSearchModuleConfig } from '../config.interface';

@Injectable({
  providedIn: 'root'
})
@ResourceParams({
  withCredentials: true
})
export class UserSearchResource extends Resource {

  constructor(@Inject(UserSearchConfigService) private readonly config: IUserSearchModuleConfig,
              private handler: ResourceHandler) {
    super(handler);
    this.$setPathPrefix(this.config.apiUrl + this.config.pathPrefix);
  }

  @ResourceAction({
    path: '/',
    method: ResourceRequestMethod.Get,
    withCredentials: true
  })
  searchUsers: IResourceMethodStrict<void, { query: string, withCompany: boolean, withDepartment: boolean, companyId: number }, void, IServerResponse<IUser[]>>;
}
