import {advertsInitialState, IAdvertsState} from './adverts.state';
import {advertsActions, AdvertsActionTypes} from './adverts.actions';
import {IAdvert} from '../interfaces';
import {Advert} from '../models';

export function reducer(
  state: IAdvertsState = advertsInitialState,
  action: advertsActions
) {
  switch (action.type) {
    case AdvertsActionTypes.LOAD_ADVERTS: {
      return  {
        ...state,
        fetchingInProgress: true
      };
    }
    case AdvertsActionTypes.LOAD_ADVERTS_SUCCESS: {
      return {
        ...state,
        adverts: action.payload.data.map((item: IAdvert) => {
          return new Advert(item);
        }),
        fetchingInProgress: false
      };
    }
    case AdvertsActionTypes.ADD_AVERT: {
      return  {
        ...state,
        addingInProgress: true
      };
    }
    case AdvertsActionTypes.ADD_ADVERT_SUCCESS: {
      return  {
        ...state,
        adverts: [new Advert(action.payload.data), ...state.adverts],
        newAdvert: new Advert(),
        addingInProgress: false
      };
    }
    case AdvertsActionTypes.UPLOAD_IMAGE_TO_NEW_ADVERT_SUCCESS: {
      return {
        ...state,
        newAdvert: new Advert({
          id: action.payload.data.advert.id,
          title: state.newAdvert.title,
          preview: state.newAdvert.preview,
          content: state.newAdvert.content,
          dateCreated: action.payload.data.advert.dateCreated,
          dateChanged: null,
          user: state.newAdvert.user
        })
      };
    }
    case AdvertsActionTypes.EDIT_ADVERT_SUCCESS: {
      return {
        ...state,
        adverts: state.newAdvert.id ? [new Advert(action.payload.data), ...state.adverts] : state.adverts.map((item: Advert) => {
          return item.id === action.payload.data.id ? new Advert(item) : item;
        }),
        newAdvert: new Advert()
      };
    }
    default: {
      return state;
    }
  }
}
