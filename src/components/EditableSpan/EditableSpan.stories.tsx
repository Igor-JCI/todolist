import React from 'react';
import {action} from "@storybook/addon-actions";
import {Task} from "../../features/TodolistsList/Todolist/Task/Task";
import {EditableSpan} from "./EditableSpan";

export default {
  title: "EditableSpan Component",
  component: EditableSpan,
}


const changeCallback = action("Value changed")

export const EditableSpanBaseExample = (props:any) => {
  return<EditableSpan title={"Start value"} onChange={changeCallback}/>
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

