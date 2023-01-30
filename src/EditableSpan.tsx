import React, {ChangeEvent, useState} from "react";

type EditableSpanPropsType = {
    title: string
    onChange: (newValue:string) => void
}
export const EditableSpan = (props: EditableSpanPropsType) => {
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
        ? <input onChange={onChangeTitleHandler} value={title} autoFocus={true} onBlur={activateViewMode}/>
        : <span onDoubleClick={activateEditMode}>{props.title}---{title}</span>

}