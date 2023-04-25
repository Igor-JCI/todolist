import React from 'react';
/*import AppWithRedux from "../AppWithRedux";
import {Provider} from "react-redux";
import {store} from "./../state/store";
import {ReduxStoreProviderDecorator} from "./ReduxStoreProviderDecorator";

export default {
  title: "AppWithRedux Component",
  component: AppWithRedux,
  decorators:[ReduxStoreProviderDecorator]
}

export const AppWithReduxBaseExample = (props:any) => {
  return<Provider store={store}><AppWithRedux/></Provider>

}

/!*
const actionCLick = action('utton')
export const AddItemFormBaseExample = (props:any) => {
  return<AddItemForm addItem={(title)=>{alert(title)}}/>
}
*!/
/!*export default {
  title: "AddItemForm Component",
  component: AddItemForm,
} as ComponentMeta<typeof AddItemForm>;*!//!*
const Template: ComponentStory<typeof AddItemForm> = (args) => <AddItemForm {...args} />;
export const Primary = Template.bind({});
Primary.args = {
};*!/*/

