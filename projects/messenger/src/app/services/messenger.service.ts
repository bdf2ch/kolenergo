import { Injectable } from '@angular/core';

import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IServerResponse } from '@kolenergo/core';
import { ApplicationResource } from '../resources/application.resource';
import { IApplicationInitialData } from '../interfaces';
import { environment } from '../../environments/environment';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class MessengerService {

  constructor(private readonly socket: Socket) {}

}
