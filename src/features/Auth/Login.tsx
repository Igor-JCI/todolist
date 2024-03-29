import React from 'react'
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {FormikHelpers, useFormik} from "formik";
import {useSelector} from "react-redux";
import {login} from "./auth-reducer";
import {Navigate} from "react-router-dom";
import {authActions, authSelectors} from "./";
import {useAppDispatch} from "../../utils/redux-utils";

export const Login = () => {
    const dispatch = useAppDispatch()
    const isLoggedIn = useSelector(authSelectors.selectIsLoggedIn)
    type FormValuesType = {
        email: string,
        password: string,
        rememberMe: boolean
    }

    const formik = useFormik({
            validate: (values) => {
                if (!values.email) {
                    return {
                        email: "email is requred"
                    }
                }
                if (!values.password) {
                    return {
                        password: "password is requred"
                    }
                }
            },
            initialValues: {
                email: "",
                password: "",
                rememberMe: false
            },
            onSubmit: async (values: FormValuesType, formikHelpers: FormikHelpers<FormValuesType>) => {
                const resultAction = await dispatch(authActions.login(values))
                if (login.rejected.match(resultAction)) {
                    if (resultAction.payload?.fieldsError?.length) {
                        const error = resultAction.payload?.fieldsError[0]
                        formikHelpers.setFieldError(error.field, error.error)
                    } else {

                    }
                }
            }
        })
    ;

    if (isLoggedIn) {
        return <Navigate to={"/"}/>
    }

    return <Grid container justifyContent={'center'}>
        <Grid item justifyContent={'center'}>
            <form onSubmit={formik.handleSubmit}>
                <FormControl>
                    <FormLabel>
                        <p>To log in get registered
                            <a href={'https://social-network.samuraijs.com/'}
                               target={'_blank'}
                               rel="noopener noreferrer"
                            > here
                            </a>
                        </p>
                        <p>or use common test account credentials:</p>
                        <p>Email: 7.jciab.7@gmail.com</p>
                        <p>Password: 111</p>
                    </FormLabel>
                    <FormGroup>
                        <TextField label="Email" margin="normal"
                                   {...formik.getFieldProps("email")}
                        />
                        {formik.errors.email ? <div>{formik.errors.email}</div> : null}
                        <TextField type="password" label="Password"
                                   margin="normal"
                                   {...formik.getFieldProps("password")}
                        />
                        {formik.errors.password ? <div>{formik.errors.password}</div> : null}
                        <FormControlLabel label={'Remember me'} control={<Checkbox
                            {...formik.getFieldProps("rememberMe")}
                            checked={formik.values.rememberMe}
                        />}
                        />
                        <Button type={'submit'} variant={'contained'} color={'primary'}>
                            Login
                        </Button>
                    </FormGroup>
                </FormControl>
            </form>
        </Grid>
    </Grid>
}