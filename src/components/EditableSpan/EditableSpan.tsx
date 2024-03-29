import React, {ChangeEvent, useState} from "react";
import {TextField} from "@mui/material";

type EditableSpanPropsType = {
    title: string
    onChange: (newValue: string) => void
}
export const EditableSpan = React.memo((props: EditableSpanPropsType) => {
    let [editMode, setEditMode] = useState(false)
    let [title, setTitle] = useState("")

    const activateEditMode = () => {
        setEditMode(true)
        setTitle(props.title)
    }
    const activateViewMode = () => {
        setEditMode(false)
        props.onChange(title)

    }
    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let value = e.currentTarget.value
        setTitle(value)
    }
    return editMode
        ? <TextField variant={"filled"} onChange={onChangeTitleHandler} value={title} autoFocus={true}
                     onBlur={activateViewMode}/>
        : <span onDoubleClick={activateEditMode}>{props.title}</span>

})