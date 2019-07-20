import {Company, FilterManager, IAuthenticationState} from '@kolenergo/core';
import {
  Event,
  EventInterval,
  EventLocation,
  EventRequest,
  EventRequestStatus,
  EventStatus,
  EventType,
  RegularEvent
} from '../event-sheduler/models';
import {ECalendarModes} from '../event-sheduler/enums';

export interface IEventShedulerState {
  date: Date;
  fetchingDataInProgress: boolean;
  applicationInitialized: boolean;
  companies: Company[];
  types: EventType[];
  statuses: EventStatus[];
  intervals: EventInterval[];
  locations: EventLocation[];
  requestStatuses: EventRequestStatus[];
  requests: EventRequest[];
  regularEvents: RegularEvent[];
  events: Event[];
  filters: FilterManager;
  periodStart: number;
  periodEnd: number;
  calendarMode: ECalendarModes;
}

export interface IApplicationState {
  esa: IEventShedulerState;
  session: IAuthenticationState;
}

export const eventShedulerInitialState: IEventShedulerState = {
  date: new Date(),
  fetchingDataInProgress: false,
  applicationInitialized: false,
  companies: [],
  types: [],
  statuses: [],
  intervals: [],
  locations: [],
  requestStatuses: [],
  requests: [],
  regularEvents: [],
  events: [],
  filters: new FilterManager(),
  periodStart: null,
  periodEnd: null,
  calendarMode: ECalendarModes.WEEK_MODE
};
