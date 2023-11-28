import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@mui/material";
import {ControlPoint} from "@mui/icons-material";


type AddItemFormPropsType = {
    addItem: (title: string) => Promise<any>,
    disabled?: boolean
}
export const AddItemForm = React.memo(({addItem, disabled = false}: AddItemFormPropsType) => {
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
    const addItemHandler = async () => {
        if (title.trim() !== "") {
            try {
                await addItem(title.trim())
                setTitle("")
            } catch (error: any) {
                setError(error.message)
            }
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
        <IconButton disabled={disabled} size={"large"} onClick={addItemHandler} color={"primary"}
                    style={{marginLeft: "5px"}}> <ControlPoint/></IconButton>
    </div>
})
