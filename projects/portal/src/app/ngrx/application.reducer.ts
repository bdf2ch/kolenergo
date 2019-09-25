import {IPortalState, portalInitialState} from './application.state';
import {portalActions, PortalActionTypes} from './application.actions';
import {IAdvert} from '../adverts/interfaces';
import {Advert} from '../adverts/models';

export function reducer(
  state: IPortalState = portalInitialState,
  action: portalActions): IPortalState {
  switch (action.type) {
    case PortalActionTypes.LOAD_INITIAL_DATA_SUCCESS: {
      return {
        ...state,
        advertsOnStartPage: action.payload.data.adverts.adverts.map((item: IAdvert) => {
          return new Advert(item);
        }),
        totalAdvertsCount: action.payload.data.adverts.total
      };
    }
    case PortalActionTypes.LOAD_ADVERTS_PREVIOUS_PAGE: {
      return {
        ...state,
        advertsIsFetching: true
      };
    }
    case PortalActionTypes.LOAD_ADVERTS_PREVIOUS_PAGE_SUCCESS: {
      return {
        ...state,
        advertsOnStartPage: action.payload.data.map((item: IAdvert) => {
          return new Advert(item);
        }),
        advertsIsFetching: false
      };
    }
    case PortalActionTypes.LOAD_ADVERTS_NEXT_PAGE: {
      return  {
        ...state,
        advertsIsFetching: true
      };
    }
    case PortalActionTypes.LOAD_ADVERTS_NEXT_PAGE_SUCCESS: {
      return {
        ...state,
        advertsOnStartPage: action.payload.data.map((item: IAdvert) => {
          return new Advert(item);
        }),
        advertsIsFetching: false
      };
    }
    default: {
      return  state;
    }
  }
}
