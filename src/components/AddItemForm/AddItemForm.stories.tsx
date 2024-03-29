import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {AddItemForm} from "./AddItemForm";
import {action} from "@storybook/addon-actions";

export default {
  title: "AddItemForm Component",
  component: AddItemForm,
}

const asyncCallBack = async (...params:any[]) => {
  action("Button 'add' was pressed inside the form")(...params)
}

export const AddItemFormBaseExample = (props:any) => {
  return<AddItemForm addItem={asyncCallBack}/>
}

export const AddItemFormDisabledExample = (props:any) => {
  return<AddItemForm disabled = {true} addItem={asyncCallBack}/>
}

/*
const actionCLick = action('utton')
export const AddItemFormBaseExample = (props:any) => {
  return<AddItemForm addItem={(title)=>{alert(title)}}/>
}
*/

/*export default {
  title: "AddItemForm Component",
  component: AddItemForm,
} as ComponentMeta<typeof AddItemForm>;*//*
const Template: ComponentStory<typeof AddItemForm> = (args) => <AddItemForm {...args} />;
export const Primary = Template.bind({});
Primary.args = {
};*/

