import { Inject, Injectable } from '@angular/core';

import {
  Resource,
  ResourceHandler,
  ResourceAction,
  ResourceParams,
  ResourceRequestMethod,
  IResourceMethodStrict,
  IResourceMethod
} from '@ngx-resource/core';

import { IUser } from '../../interfaces';
import { IAuthenticationModuleConfig } from '../config.interface';
import { AuthenticationConfigService } from '../authentication.module';

@Injectable({
  providedIn: 'root'
})
@ResourceParams({
  withCredentials: true
})
export class AuthenticationResource extends Resource {
  constructor(@Inject(AuthenticationConfigService) private readonly config: IAuthenticationModuleConfig,
              private handler: ResourceHandler) {
    super(handler);
    this.$setPathPrefix(this.config.apiUrl + this.config.pathPrefix);
  }

  @ResourceAction({
    path: '/',
    method: ResourceRequestMethod.Get,
    withCredentials: true,
  })
  check: IResourceMethodStrict<{appCode: string | null}, void, void, IUser | null>;

  @ResourceAction({
    path: '/login',
    method: ResourceRequestMethod.Post,
    withCredentials: true
  })
  signIn: IResourceMethod<{account: string, password: string, addIfNotExists?: boolean, appCode?: string}, IUser>;

  @ResourceAction({
    path: '/logout',
    method: ResourceRequestMethod.Get,
    withCredentials: true
  })
  signOut: IResourceMethod<void, void>;
}
