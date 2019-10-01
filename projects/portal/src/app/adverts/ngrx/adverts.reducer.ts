import {advertsInitialState, IAdvertsState} from './adverts.state';
import {advertsActions, AdvertsActionTypes} from './adverts.actions';
import {IAdvert} from '../interfaces';
import {Advert} from '../models';
import {portalActions, PortalActionTypes} from '../../ngrx';
import {Attachment} from '../../portal/models';

export function reducer(
  state: IAdvertsState = advertsInitialState,
  action: advertsActions | portalActions
) {
  switch (action.type) {
    case PortalActionTypes.LOAD_INITIAL_DATA_SUCCESS: {
      return {
        ...state,
        templates: action.payload.data.adverts.templates.map((item: IAdvert) => new Advert(item)),
        totalAdverts: action.payload.data.adverts.total,
        totalPages: Math.ceil((action.payload.data.adverts.total / state.advertsOnPage)) - 1
      };
    }
    case AdvertsActionTypes.ADVERTS_LOAD_ADVERTS: {
      return  {
        ...state,
        selectedAdvert: null,
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
    case AdvertsActionTypes.ADVERTS_LOAD_ADVERT: {
      return {
        ...state,
        selectedAdvert: null,
        fetchingInProgress: true
      };
    }
    case AdvertsActionTypes.ADVERTS_LOAD_ADVERT_SUCCESS: {
      return {
        ...state,
        selectedAdvert: new Advert(action.payload.data),
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
    case AdvertsActionTypes.ADVERTS_LOAD_SIMILAR_ADVERTS_SUCCESS: {
      return {
        ...state,
        selectedAdvert: state.selectedAdvert.changeSimilar(action.payload.data.map((item: IAdvert) => new Advert(item)))
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
        templates: action.payload.data.advert.isTemplate
          ? [...state.templates, new Advert(action.payload.data.advert)]
          : [...state.templates],
        adverts: action.payload.data.adverts.map((item: IAdvert) => {
          return new Advert(item);
        }),
        totalAdverts: action.payload.data.total,
        totalPages: Math.ceil((action.payload.data.total / state.advertsOnPage)) - 1,
        newAdvert: new Advert(),
        addingInProgress: false
      };
    }
    case AdvertsActionTypes.ADVERTS_EDIT_ADVERT_SUCCESS: {
      return {
        ...state,
        templates: action.payload.data.advert.isTemplate
          ? [...state.templates, new Advert(action.payload.data.advert)]
          : [...state.templates],
        adverts: action.payload.data.adverts.map((item: IAdvert) => {
          return new Advert(item);
        }),
        totalAdverts: action.payload.data.total,
        totalPages: Math.ceil((action.payload.data.total / state.advertsOnPage)) - 1,
        newAdvert: new Advert(),
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
        newAdvert: new Advert(action.payload.data.advert).changeImage(action.payload.data.url),
        uploadingImageInProgress: false
      };
    }
    case AdvertsActionTypes.ADVERTS_UPLOAD_IMAGE_TO_ADVERT: {
      return {
        ...state,
        uploadingImageInProgress: true
      };
    }
    case AdvertsActionTypes.ADVERTS_UPLOAD_IMAGE_TO_ADVERT_SUCCESS: {
      return {
        ...state,
        newAdvert: state.newAdvert.changeImage(action.payload.data),
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
    case AdvertsActionTypes.ADVERTS_DELETE_ATTACHMENT: {
      return {
        ...state,
        deletingAttachmentInProgress: true
      };
    }
    case AdvertsActionTypes.ADVERTS_DELETE_ATTACHMENT_SUCCESS: {
      return {
        ...state,
        selectedAdvert: state.selectedAdvert.changeAttachments(state.selectedAdvert.attachments.filter((item: Attachment) => {
          return item.id !== action.payload.id ? true : false;
        })),
        deletingAttachmentInProgress: false
      };
    }
    case AdvertsActionTypes.ADVERTS_DELETE_ATTACHMENT_FROM_NEW_ADVERT_SUCCESS : {
      return {
        ...state,
        newAdvert: state.newAdvert.changeAttachments(state.newAdvert.attachments.filter((item: Attachment) => {
          return item.id !== action.payload.id ? true : false;
        })),
        deletingAttachmentInProgress: false
      };
    }
    case AdvertsActionTypes.ADVERTS_DELETE_ATTACHMENT_FROM_NEW_ADVERT_BASED_ON_TEMPLATE: {
      return  {
        ...state,
        newAdvert: state.newAdvert.changeAttachments(state.newAdvert.attachments.filter((item: Attachment) => {
          return item.id !== action.payload.id ? true : false;
        }))
      };
    }
    case AdvertsActionTypes.ADVERTS_RESET_NEW_ADVERT: {
      return {
        ...state,
        newAdvert: new Advert()
      };
    }
    case AdvertsActionTypes.ADVERTS_DELETE_ADVERT: {
      return {
        ...state,
        deletingInProgress: true
      };
    }
    case AdvertsActionTypes.ADVERTS_DELETE_ADVERT_SUCCESS: {
      return {
        ...state,
        templates: action.payload.isTemplate
          ? state.templates.filter((advert: Advert) => {
            return advert.id !== action.payload.id ? true : false;
          })
          : state.templates,
        adverts: [...state.adverts.filter((advert: Advert) => {
          return advert.id !== action.payload.id ? true : false;
        })],
        deletingInProgress: false
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
