import { articlesActions, ArticlesActionTypes } from './articles.actions';
import { IArticlesState, articlesInitialState } from './articles.state';

export function reducer(
  state: IArticlesState = articlesInitialState,
  action: articlesActions
): IArticlesState {
  switch (action.type) {
    case ArticlesActionTypes.ARTICLES_LOAD_ARTICLES: {
      return {
        ...state,
        selectedSection: action.payload,
        fetchingInProgress: true
      };
    }
    case ArticlesActionTypes.ARTICLES_LOAD_ARTICLES_SUCCESS: {
      return {
        ...state,
        fetchingInProgress: false
      };
    }
    default: {
      return state;
    }
  }
}
