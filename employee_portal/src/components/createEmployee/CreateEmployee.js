import React, { useState } from 'react';
import MuiPhoneNumber from 'material-ui-phone-number';
import { TextareaAutosize, Select, Paper, Radio, FormControl, FormLabel, InputLabel, FormHelperText, OutlinedInput, FormControlLabel, Checkbox, NativeSelect, TextField, RadioGroup, FormGroup, Grid } from '@material-ui/core';

import './CreateEmployee.scss';
import { validate } from 'validate.js';
import { Button } from '@material-ui/core';
import axios from 'axios';

function CreateEmployee(props) {
    // const [fname, setfname] = useState('');
    // const [lname, setlname] = useState('');
    // const [etype, setetype] = useState('');
    // const [erole, seterole] = useState('');
    // const [designation, setDesignation] = useState('');
    // const [email, setemail] = useState('');
    // const [mobile1, setmobile1] = useState('');
    // const [mobile2, setmobile2] = useState('');
    // const [doj, setdoj] = useState('');
    // const [status, setStatus] = useState('');

    const [employee, setEmployee] = useState({
        fname: '',
        lname: '',
        etype: '',
        epayroll: '',
        ctc: '',
        erole: '',
        designation: '',
        rmanager: '',
        doj: '',
        status: '',
        companyEmail : '',
        email: '',
        mobile1: '',
        mobile2: '',
        dob: '',
        address: '',
    });

    const [errorMsgs, setErrorMsgs] = useState([]);

    const constraints = {
        fname: {
            presence: true
        },
        lname: {
            presence: true
        },
        epayroll: {
            presence: true
        },
        ctc: {
            presence: true,
            numericality: true
        },
        erole: {
            presence: true
        },
        designation: {
            presence: true
        },
        rmanager: {
            presence: true,
            numericality: {
                onlyInteger: true,
                greaterThan: 0
            }
        },
        doj: {
            presence: true
        },
        status: {
            presence: true
        },
        mobile1: {
            presence: true
        },
        email: {
            presence: true,
            email: true
        },
        companyEmail : {
            presence : true,
            email : true
        }

    }

    const setValueHandler = (event) => {
        let errorMsg = {};
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
        const key = event.target.name;
        let constraint = constraints[key];
        if (constraint) {
            let validationResult = validateData(key, value, constraint);
            setErrorMsgs({ ...errorMsgs, [key]: validationResult });
        }
        setEmployee({
            ...employee,
            [event.target.name]: value
        });
    }

    const setmobile1Handler = (value) => {
        let validationResult = validateData('mobile1', value);
        setEmployee({ ...employee, ['mobile1']: value });
    }

    const setmobile2Handler = (value) => {
        let validationResult = validateData('mobile2', value);
        setEmployee({ ...employee, ['mobile2']: value });
    }

    const validateData = (key, value, constraint) => {
        let inputObject = {};
        inputObject[key] = value;
        let result = validate(inputObject, { [key]: constraint });
        if (result) {
            return result[key][0];
        }
        else {
            return null;
        }
    }

    const employeeSubmitHandler = (event) => {
        event.preventDefault();
        const employeeData = employee;
        employeeData['rmanager'] = parseInt(employeeData['rmanager']);
        console.log(employeeData);
        const url = "http://localhost:8080/users/createEmployee";
        axios.post(url, employeeData)
            .then((res) => {
                console.log(res)
            })
            .catch((err) => {
                console.log(err);
            })
    }

    return (
        <>
            <div className=' col-sm-10 text-center' ><h2>Enroll Employee</h2></div>
            <Paper>
                <form className=' offset-xs-3' onSubmit={employeeSubmitHandler}>
                    <Grid container>
                        <Grid item xs={6}>
                            <TextField
                                required
                                variant='outlined'
                                id='fname'
                                name='fname'
                                label='First Name'
                                value={employee.fname}
                                onChange={setValueHandler}
                                error={errorMsgs?.fname}
                                helperText={errorMsgs?.fname} />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                required
                                variant='outlined'
                                id='lname'
                                name='lname'
                                label='Last Name'
                                value={employee.lname}
                                onChange={setValueHandler}
                                error={errorMsgs?.lname}
                                helperText={errorMsgs?.lname} />
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl required
                                variant='outlined'
                                error={errorMsgs?.etype}>
                                <InputLabel htmlFor='etype'>Employee Type</InputLabel>
                                <Select
                                    native
                                    id = 'etype'
                                    name = 'etype'
                                    label = 'Employee Type'
                                    value = {employee.etype}
                                    onChange = {setValueHandler}>
                                    <option aria-label = 'none' value = '' />
                                    <option value = 'Permanent'>Permanent</option>
                                    <option value = 'Contractor'>Contactor</option>
                                </Select>
                                <FormHelperText className='text-danger'>{errorMsgs?.etype}</FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl required
                                variant='outlined'
                                error={errorMsgs?.epayroll}>
                                <InputLabel htmlFor='epayroll'>Payroll Type</InputLabel>
                                <Select native
                                    id='epayroll'
                                    name='epayroll'
                                    label='epayroll type'
                                    value={employee.epayroll}
                                    onChange={setValueHandler}>
                                    <option aria-label='None' value='' />
                                    <option value='Permanent'>Permanent</option>
                                    <option value='Contract Type'>Contract Type</option>
                                </Select>
                                <FormHelperText>{errorMsgs?.epayroll}</FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                required
                                variant='outlined'
                                id='ctc'
                                name='ctc'
                                label='CTC'
                                value={employee.ctc}
                                onChange={setValueHandler}
                                error={errorMsgs?.ctc}
                                helperText={errorMsgs?.ctc} />
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl variant='outlined' required error={errorMsgs?.erole}>
                                <InputLabel htmlFor="erole"> Role </InputLabel>
                                <Select native
                                    id='erole'
                                    name='erole'
                                    label='erole'
                                    value={employee.erole}
                                    onChange={setValueHandler}>
                                    <option aria-label="None" value="" />
                                    <option value='Manager' >Manager</option>
                                    <option value='Associate' >Associate</option>
                                </Select>
                                <FormHelperText>{errorMsgs?.erole}</FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl variant='outlined' required error={errorMsgs?.designation}>
                                <InputLabel htmlFor='designation' >Designation</InputLabel>
                                <Select native
                                    name='designation'
                                    id='designation'
                                    label='Designation'
                                    value={employee.designation}
                                    onChange={setValueHandler}
                                >
                                    <option aria-label="None" value="" />
                                    <option value='Manager' >Manager</option>
                                    <option value='Associate' >Associate</option>
                                </Select>
                                <FormHelperText>{errorMsgs?.designation}</FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                required
                                variant='outlined'
                                id='rmanager'
                                type='number'
                                name='rmanager'
                                label='Manager'
                                value={employee.rmanager}
                                onChange={setValueHandler}
                                error={errorMsgs?.rmanager}
                                helperText={errorMsgs?.rmanager} />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField required
                                name='doj'
                                label='Joined On'
                                variant='outlined'
                                type='date'
                                defaultValue={new Date()}
                                value={employee.doj}
                                onChange={setValueHandler}
                                InputLabelProps={{ shrink: true }}
                                error={errorMsgs?.doj}
                                helperText={errorMsgs?.doj} />
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl required error={errorMsgs?.status}
                                variant = 'outlined'>
                                <InputLabel htmlFor = 'status'>Status</InputLabel>
                                <Select>
                                    <option aria-label='none' value = ''/>
                                    <option value = 'Active'>Active</option>
                                    <option value = 'Inactive'>Inactive</option>
                                </Select>
                                <FormHelperText>{errorMsgs?.status}</FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField variant='outlined'
                                required
                                label='Company Email'
                                name='companyEmail'
                                value={employee.companyEmail}
                                onChange={setValueHandler}
                                error={errorMsgs?.companyEmail}
                                helperText={errorMsgs?.companyEmail} />
                        </Grid>
                        <Grid item xs={6}>
                            <MuiPhoneNumber
                                required
                                variant='outlined'
                                name='mobile1'
                                label='Primary Mobile'
                                defaultCountry='us'
                                value={employee.mobile1}
                                onChange={setmobile1Handler}
                                error={errorMsgs?.mobile1}
                                helperText={errorMsgs?.mobile1}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <MuiPhoneNumber
                                variant='outlined'
                                name='mobile2'
                                label='Secondary Mobile'
                                defaultCountry='us'
                                value={employee.mobile2}
                                onChange={setmobile2Handler}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField variant='outlined'
                                required
                                label='Personal Email'
                                name='email'
                                value={employee.email}
                                onChange={setValueHandler}
                                error={errorMsgs?.email}
                                helperText={errorMsgs?.email} />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                name='dob'
                                label='Date of Birth'
                                variant='outlined'
                                type='date'
                                value={employee.dob}
                                onChange={setValueHandler}
                                InputLabelProps={{ shrink: true }} />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                id="address"
                                label="Address"
                                name='address'
                                multiline
                                rows={4}
                                variant="outlined"
                                value={employee.address}
                                onChange={setValueHandler}
                            />
                        </Grid>
                        <div className='text-center col-sm-10'>
                            <Button variant='contained' color='primary' type='submit'>
                                Create Employee</Button>
                        </div>
                    </Grid>
                </form>
            </Paper>
        </>
    );
}

export default CreateEmployee;