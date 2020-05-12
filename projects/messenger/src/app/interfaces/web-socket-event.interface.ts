import { EEvents } from '../enums/events.enum';
import {EUsers} from "../enums";

export interface IWebSocketEvent {
  event: EEvents;
  action: EUsers | EChats;
  data: any;
}
