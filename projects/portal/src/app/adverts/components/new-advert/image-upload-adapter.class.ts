import {select, Store} from '@ngrx/store';

import { AdvertsService } from '../../services/adverts.service';
import { Advert } from '../../models';
import {IAdvertsState, selectNewAdvert, AdvertsUploadImageToNewAdvert, AdvertsUploadImageToNewAdvertSuccess} from '../../ngrx';
import { IApplicationState } from '../../../ngrx';
import {IServerResponse} from '@kolenergo/core';
import {IAdvert} from '../../interfaces';
import {Observable} from 'rxjs';
import { environment } from '../../../../environments/environment';


export class AdvertImageUploadAdapter {
  private readonly newAdvert$: Observable<Advert>;
  private newAdvert: Advert;

  constructor(
    private loader,
    private readonly adverts: AdvertsService,
    private readonly store: Store<IApplicationState>
  ) {
    this.loader = loader;
    this.newAdvert$ = this.store.pipe(select(selectNewAdvert));
    this.newAdvert$.subscribe((value: Advert) => {
      this.newAdvert = value;
    });
  }

  upload() {
    return this.loader.file
      .then(file => new Promise((resolve, reject) => {
        if (this.newAdvert && this.newAdvert.id) {
          this.adverts.uploadImage(file, this.newAdvert.id).then((result: IServerResponse<string>) => {
            resolve({default: `${environment.staticUrl}\\${result.data}`});
          });
        } else if (this.newAdvert && !this.newAdvert.id) {
          this.adverts.uploadImage(file).then((result: IServerResponse<{url: string, advert: IAdvert}>) => {
            this.store.dispatch(new AdvertsUploadImageToNewAdvertSuccess(result));
            resolve({default: `${environment.staticUrl}\\${result.data.url}`});
          });
          this.store.dispatch(new AdvertsUploadImageToNewAdvert());
        }
      }));
  }

  abort() {
    console.log('upload adapter abort');
  }
}
