import {IMessengerState, MessengerInitialState} from './messenger.state';
import {MessengerActions, MessengerActionTypes} from './messenger.actions';
import {IChat} from '../../../interfaces';
import {Chat} from '../../../models';

export function reducer(
  state: IMessengerState = MessengerInitialState,
  action: MessengerActions
): IMessengerState {
  switch (action.type) {

    case MessengerActionTypes.LOAD_INITIAL_DATA: {
      return {
        ...state,
        isLoadingInProgress: true
      };
    }

    case MessengerActionTypes.LOAD_INITIAL_DATA_SUCCESS: {
      return {
        ...state,
        isApplicationInitialised: true,
        isLoadingInProgress: false,
        chats: action.payload.data.chats.map((item: IChat) => new Chat(item)),
        filteredChats: action.payload.data.chats.map((item: IChat) => new Chat(item)),
      };
    }

    case MessengerActionTypes.LOAD_INITIAL_DATA_FAIL: {
      return {
        ...state,
        isLoadingInProgress: false
      };
    }

    case MessengerActionTypes.LOAD_CHAT_SUCCESS: {
      return {
        ...state,
        isLoadingInProgress: false,
        selectedChat: state.selectedChat.fromAnotherWithMessages(state.selectedChat, action.payload.data)
      };
    }

    case MessengerActionTypes.SEARCH_CHAT_QUERY_CHANGED: {
      return {
        ...state,
        chatSearchQuery: action.payload,
        filteredChats:
          state.chats.filter((chat: Chat) => chat.title.toLowerCase().indexOf(action.payload.toLowerCase()) !== -1
            ? true :
            false
          )
      };
    }

    case MessengerActionTypes.SEARCH_CHAT_QUERY_CLEARED: {
      return {
        ...state,
        chatSearchQuery: null,
        filteredChats: state.chats
      };
    }

    case MessengerActionTypes.SELECT_CHAT: {
      return {
        ...state,
        selectedChat: action.payload
      };
    }

    default: {
      return state;
    }
  }
}
