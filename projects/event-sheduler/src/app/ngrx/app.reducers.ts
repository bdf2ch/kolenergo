import { ICompany, Company } from '@kolenergo/core';
import {
  IEvent,
  IEventInterval,
  IEventLocation,
  IEventRequest,
  IEventRequestStatus,
  IEventStatus,
  IEventType,
  IRegularEvent
} from '../event-sheduler/interfaces';
import {
  EventType,
  EventStatus,
  EventInterval,
  EventLocation,
  EventRequest,
  RegularEvent,
  Event,
  EventRequestStatus
} from '../event-sheduler/models';
import * as actions from './app.actions';
import { eventShedulerInitialState, IEventShedulerState } from './app.state';
import * as moment from 'moment';


export function reducer(
  state: IEventShedulerState = eventShedulerInitialState,
  action: actions.EventShedulerActions
): IEventShedulerState {
  switch (action.type) {
    case actions.EventShedulerActionTypes.LOAD_INITIAL_DATA: {
      return {
        ...state,
        fetchingDataInProgress: true,
        applicationInitialized: false
      };
    }
    case actions.EventShedulerActionTypes.LOAD_INITIAL_DATA_SUCCESS: {
      return {
        ...state,
        date: moment(action.payload.data.date, 'DD.MM.YYYY').startOf('day').toDate(),
        applicationInitialized: true,
        companies: action.payload.data.companies.map((item: ICompany) => {
          return new Company(item);
        }),
        types: action.payload.data.types.map((item: IEventType) => {
          return new EventType(item);
        }),
        statuses: action.payload.data.statuses.map((item: IEventStatus) => {
          return new EventStatus(item);
        }),
        intervals: action.payload.data.intervals.map((item: IEventInterval) => {
          return new EventInterval(item);
        }),
        locations: action.payload.data.locations.map((item: IEventLocation) => {
          return new EventLocation(item);
        }),
        requestStatuses: action.payload.data.requestStatuses.map((item: IEventRequestStatus) => {
          return new EventRequestStatus(item);
        }),
        requests: action.payload.data.requests.map((item: IEventRequest) => {
          return new EventRequest(item);
        }),
        regularEvents: action.payload.data.regularEvents.map((item: IRegularEvent) => {
          return new RegularEvent(item);
        }),
        events: action.payload.data.events.map((item: IEvent) => {
          return new Event(item);
        })
      };
    }
    default: {
      return state;
    }
  }
}
