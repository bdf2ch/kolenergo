import {advertsInitialState, IAdvertsState} from './adverts.state';
import {advertsActions, AdvertsActionTypes} from './adverts.actions';
import {IAdvert} from '../interfaces';
import {Advert} from '../models';
import {portalActions, PortalActionTypes} from '../../ngrx';

export function reducer(
  state: IAdvertsState = advertsInitialState,
  action: advertsActions | portalActions
) {
  switch (action.type) {
    case PortalActionTypes.LOAD_INITIAL_DATA_SUCCESS: {
      return {
        ...state,
        totalAdverts: action.payload.data.totalAdvertsCount,
        totalPages: Math.round((action.payload.data.totalAdvertsCount / state.advertsOnPage) - 1)
      };
    }
    case AdvertsActionTypes.ADVERTS_LOAD_ADVERTS: {
      return  {
        ...state,
        page: 0,
        searchQuery: null,
        fetchingInProgress: true
      };
    }
    case AdvertsActionTypes.ADVERTS_LOAD_ADVERTS_SUCCESS: {
      return {
        ...state,
        adverts: action.payload.data.map((item: IAdvert) => {
          return new Advert(item);
        }),
        fetchingInProgress: false
      };
    }
    case AdvertsActionTypes.ADVERTS_LOAD_ADVERTS_NEXT_PAGE: {
      return {
        ...state,
        fetchingInProgress: true
      };
    }
    case AdvertsActionTypes.ADVERTS_LOAD_ADVERTS_NEXT_PAGE_SUCCESS: {
      return  {
        ...state,
        page: state.page + 1,
        adverts: [...state.adverts, ...action.payload.data.map((advert: IAdvert) => {
          return new Advert(advert);
        })],
        fetchingInProgress: false
      };
    }
    case AdvertsActionTypes.ADVERTS_ADD_AVERT: {
      return  {
        ...state,
        addingInProgress: true
      };
    }
    case AdvertsActionTypes.ADVERTS_ADD_ADVERT_SUCCESS: {
      return  {
        ...state,
        adverts: [new Advert(action.payload.data), ...state.adverts],
        newAdvert: new Advert(),
        addingInProgress: false
      };
    }
    case AdvertsActionTypes.ADVERTS_UPLOAD_IMAGE_TO_NEW_ADVERT: {
      return  {
        ...state,
        uploadingImageInProgress: true
      };
    }
    case AdvertsActionTypes.ADVERTS_UPLOAD_IMAGE_TO_NEW_ADVERT_SUCCESS: {
      return {
        ...state,
        newAdvert: new Advert(action.payload.data.advert),
        uploadingImageInProgress: false
      };
    }
    case AdvertsActionTypes.ADVERTS_UPLOAD_ATTACHMENT_TO_NEW_ADVERT: {
      return {
        ...state,
        uploadingAttachmentInProgress: true
      };
    }
    case AdvertsActionTypes.ADVERTS_UPLOAD_ATTACHMENT_TO_NEW_ADVERT_SUCCESS: {
      return {
        ...state,
        newAdvert: new Advert(action.payload.data),
        uploadingAttachmentInProgress: false
      };
    }
    case AdvertsActionTypes.ADVERTS_UPLOAD_ATTACHMENT_TO_ADVERT: {
      return {
        ...state,
        uploadingAttachmentInProgress: true
      };
    }
    case AdvertsActionTypes.ADVERTS_UPLOAD_ATTACHMENT_TO_ADVERT_SUCCESS: {
      return {
        ...state,
        newAdvert: new Advert(action.payload.data),
        uploadingAttachmentInProgress: false
      };
    }
    case AdvertsActionTypes.ADVERTS_EDIT_ADVERT_SUCCESS: {
      return {
        ...state,
        adverts: state.newAdvert.id ? [new Advert(action.payload.data), ...state.adverts] : state.adverts.map((item: Advert) => {
          return item.id === action.payload.data.id ? new Advert(item) : item;
        }),
        newAdvert: new Advert()
      };
    }
    case AdvertsActionTypes.ADVERTS_SEARCH_ADVERTS: {
      return {
        ...state,
        searchQuery: action.payload,
        searchingInProgress: true
      };
    }
    case AdvertsActionTypes.ADVERTS_SEARCH_ADVERTS_SUCCESS: {
      return {
        ...state,
        adverts: [...action.payload.data.map((item: IAdvert) => {
          return new Advert(item);
        })],
        searchingInProgress: false
      };
    }
    case AdvertsActionTypes.ADVERTS_CLEAR_SEARCH: {
      return {
        ...state
      };
    }
    default: {
      return state;
    }
  }
}
