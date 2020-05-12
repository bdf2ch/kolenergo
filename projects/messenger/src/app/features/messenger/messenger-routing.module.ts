import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MessengerWrapperComponent } from "./components/messenger-wrapper/messenger-wrapper.component";
import { MessengerComponent } from "./components/messenger/messenger.component";

const routes: Routes = [{
  path: '',
  component: MessengerWrapperComponent,
  children: [
    {
      path: '',
      component: MessengerComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MessengerRoutingModule { }
