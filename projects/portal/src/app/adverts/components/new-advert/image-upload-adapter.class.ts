import {select, Store} from '@ngrx/store';

import { AdvertsService } from '../../services/adverts.service';
import { Advert } from '../../models';
import {IAdvertsState, selectNewAdvert, UploadImageToNewAdvert, UploadImageToNewAdvertSuccess} from '../../ngrx';
import { IApplicationState } from '../../../ngrx';
import {IServerResponse} from '@kolenergo/core';
import {IAdvert} from '../../interfaces';
import {Observable} from 'rxjs';


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
            resolve({default: result.data});
          });
        } else if (this.newAdvert && !this.newAdvert.id) {
          this.adverts.uploadImage(file).then((result: IServerResponse<{url: string, advert: IAdvert}>) => {
            this.store.dispatch(new UploadImageToNewAdvertSuccess(result));
            resolve({default: result.data.url});
          });
          this.store.dispatch(new UploadImageToNewAdvert());
        }
      }));
  }

  abort() {
    console.log('upload adapter abort');
  }
}
