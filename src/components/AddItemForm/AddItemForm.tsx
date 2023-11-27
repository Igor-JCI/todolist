import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@mui/material";
import {ControlPoint} from "@mui/icons-material";


type AddItemFormPropsType = {
    addItem: (title: string) => void,
    disabled?: boolean
}
 export const AddItemForm = React.memo(({addItem, disabled = false  }: AddItemFormPropsType) => {
    console.log("Form is called")
    let [title, setTitle] = useState("")
    const [error, setError] = useState<string | null>(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null)
        }
        if (e.charCode === 13) {
            addItemHandler()
        }
    }
    const addItemHandler = () => {
        if (title.trim() !== "") {
            addItem(title.trim())
            setTitle("")
        } else {
            setError("Title is required")
        }
    }
    return <div>
        <TextField value={title}
                   disabled={disabled}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   error={!!error}
                   label="Type value" variant="outlined"
                   helperText={error}
        />
        <IconButton disabled={disabled} size={"large"} onClick={addItemHandler} color={"primary"} style = {{marginLeft: "5px"}}> <ControlPoint/></IconButton>
    </div>
})
