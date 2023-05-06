import React from 'react';
import {action} from "@storybook/addon-actions";
import {Task} from "../Task";
import {TaskStatuses} from "../API/todolists-api";

export default {
    title: "Task Component",
    component: Task,
}

const changeTaskStatusCallback = action("Status changed")
const changeTaskTitleCallback = action("Title changed")
const removeTaskCallback = action("Task removed")

export const TaskBaseExample = (props: any) => {
    return <>
        <Task
            removeTask={removeTaskCallback}
            changeTaskStatus={changeTaskStatusCallback}
            changeTaskTitle={changeTaskTitleCallback}
            taskId={"1"}
            todoListId={"todoListId1"}
            status={TaskStatuses.Completed}
            title={"CSS"}
        />
        <Task
            removeTask={removeTaskCallback}
            changeTaskStatus={changeTaskStatusCallback}
            changeTaskTitle={changeTaskTitleCallback}
            taskId={"2"}
            todoListId={"todoListId2"}
            status={TaskStatuses.New}
            title={"JS"}
        />
    </>
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