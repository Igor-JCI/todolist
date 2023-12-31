import React from 'react';
import App from "./App";
import {BrowserRouterDecorator, ReduxStoreProviderDecorator} from "../stories/ReduxStoreProviderDecorator";

export default {
    title: "Application Stories",
    component: App,
    decorators: [ReduxStoreProviderDecorator, BrowserRouterDecorator]
}

export const AppBaseExample = (props: any) => {
    return (<App demo={true}/>)
}


/*import Application from "../Application";
import {Provider} from "react-redux";
import {store} from "./../state/store";
import {ReduxStoreProviderDecorator} from "./ReduxStoreProviderDecorator";

export default {
  title: "Application Component",
  component: Application,
  decorators:[ReduxStoreProviderDecorator]
}

export const AppWithReduxBaseExample = (props:any) => {
  return<Provider store={store}><Application/></Provider>

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

