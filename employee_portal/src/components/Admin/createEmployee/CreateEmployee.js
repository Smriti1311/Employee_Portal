import React, { useEffect, useState } from 'react';
import MuiPhoneNumber from 'material-ui-phone-number';
import { Select, Paper, FormControl, InputLabel, FormHelperText, TextField, Grid } from '@material-ui/core';
import { ToastContainer, toast } from 'react-toastify';


import './CreateEmployee.scss';
import { validate } from 'validate.js';
import { Button } from '@material-ui/core';
import axios from 'axios';
import { baseUrl } from '../../Contants';
import { useParams } from 'react-router';

const initialEmployee = {
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
    companyEmail: '',
    email: '',
    mobile1: '',
    mobile2: '',
    dob: '',
    address: '',
};

function CreateEmployee(props) {
    const [employee, setEmployee] = useState(initialEmployee);
    const [errorMsgs, setErrorMsgs] = useState([]);
    const [managerList, setManagerList] = useState([]);
    const [disableSubmit, setDisableSubmit] = useState(true);
    const empId = useParams();
    console.log(empId);

    
    useEffect(() => {
        console.log('use effect')
        const url = baseUrl + 'managers';
        axios.get(url)
            .then((res) => {
                console.log('axios');
                let manager = {};
                let managersList = [];
                res.data.map((employee) => {
                    console.log(employee)
                    manager = ({
                        'managerId': employee.employeeId,
                        'manager_Id' : employee._id,
                        'managerName': employee.employeeName
                    });
                    return managersList.push(manager);
                });
                setManagerList(managersList);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    console.log('managerList=',managerList)
    
    useEffect(()=>{
        if(empId.id){
        console.log('edit mode');
        axios.get(`http://localhost:8080/users/empdetails/${empId.id}`)
        .then(res => {
            console.log(res.data.data);
           const empData = res.data.data;
           console.log('edit mode=',managerList);
           const manager = managerList.filter((manager)=>{
              return  manager.manager_Id === empData.reportingTo[0]._id;
           })
           console.log('edit mode=',manager);
           setEmployee({
               ...employee,
               fname : empData.employeeName.split(' ')[0],
               lname : empData.employeeName.split(' ')[1],
               etype : empData.employeeType,
               epayroll: empData.payRollType,
               ctc: empData.cost,
               erole: empData.role,
               designation: empData.designation,
               rmanager: 'Joginaidu Gopisetti', 
               doj: empData.joinedOn,
               status: empData.status,
               companyEmail: empData.personalEmail,
               email: empData.personalEmail,
               mobile1: empData.primaryMobile,
               mobile2: empData.primaryMobile,
               dob: '',
               address: '',               
           });
           // dispatch({ type : LOADING_DONE});
        })
        .catch ( err => {
            console.log(err);
            //dispatch({ type : LOADING_DONE});
        })
    }
    },[empId.id])

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
        companyEmail: {
            presence: true,
            email: true
        }

    }


    const setValueHandler = (event) => {
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
        const key = event.target.name;
        let constraint = constraints[key];
        if (constraint) {
            let validationResult = validateData(key, value, constraint);
            if (validationResult) {
                setErrorMsgs({ ...errorMsgs, [key]: validationResult });
            }
            else {
                let errMsgs = {};
                errMsgs = { ...errorMsgs };
                delete errMsgs[key];
                setErrorMsgs(errMsgs);
            }
        }
        setEmployee({
            ...employee,
            [event.target.name]: value
        });
        enableFormHandler();
    }

    const setmobile1Handler = (value) => {
        let validationResult = validateData('mobile1', value);
        if (validationResult) {
            setErrorMsgs({ ...errorMsgs, 'mobile1': validationResult });
        }
        else {
            let errMsgs = {};
            errMsgs = { ...errorMsgs };
            delete errMsgs['mobile1'];
            setErrorMsgs(errMsgs);
        }
        setEmployee({ ...employee, 'mobile1': value });
        enableFormHandler();
    }

    const setmobile2Handler = (value) => {
        let validationResult = validateData('mobile2', value);
        if (validationResult) {
            setErrorMsgs({ ...errorMsgs, 'mobile2': validationResult });
        }
        else {
            let errMsgs = {};
            errMsgs = { ...errorMsgs };
            delete errMsgs['mobile2'];
            setErrorMsgs(errMsgs);
        }
        setEmployee({ ...employee, 'mobile2': value });
        enableFormHandler();
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

    const resetEmployee = () => {
        setEmployee(initialEmployee);
    }
    
    const employeeSubmitHandler = (event) => {
        event.preventDefault();
        const employeeData = employee;
        employeeData['rmanager'] = parseInt(employeeData['rmanager']);
        const url = baseUrl + "createEmployee";
        axios.post(url, employeeData)
            .then((res) => {
                console.log(res);
                console.log(employee);
                toast.success('Employee created');
                window.scrollTo(0, 0);
            })
            .catch((err) => {
                console.log(err);
            })
            resetEmployee();
    }

    const enableFormHandler = () => {
        if (!employee.fname ||
            !employee.lname ||
            !employee.etype ||
            !employee.epayroll ||
            !employee.ctc ||
            !employee.erole ||
            !employee.designation ||
            !employee.rmanager ||
            !employee.doj ||
            !employee.status ||
            !employee.companyEmail ||
            !employee.email ||
            !employee.mobile1) {
            setDisableSubmit(true);
        }
        else if (errorMsgs.length) {
            setDisableSubmit(true);
        }
        else {
            setDisableSubmit(false);
        }
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
                                error={!!errorMsgs?.fname}
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
                                error={!!errorMsgs?.lname}
                                helperText={errorMsgs?.lname} />
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl required
                                variant='outlined'
                                error={!!errorMsgs?.etype}>
                                <InputLabel htmlFor='etype'>Employee Type</InputLabel>
                                <Select
                                    native
                                    id='etype'
                                    name='etype'
                                    label='Employee Type'
                                    value={employee.etype}
                                    onChange={setValueHandler}>
                                    <option aria-label='none' value='' />
                                    <option value='Permanent'>Permanent</option>
                                    <option value='Contractor'>Contractor</option>
                                </Select>
                                <FormHelperText className='text-danger'>{errorMsgs?.etype}</FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl required
                                variant='outlined'
                                error={!!errorMsgs?.epayroll}>
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
                                error={!!errorMsgs?.ctc}
                                helperText={errorMsgs?.ctc} />
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl variant='outlined' required error={!!errorMsgs?.erole}>
                                <InputLabel htmlFor="erole"> Role </InputLabel>
                                <Select native
                                    id='erole'
                                    name='erole'
                                    label='erole '
                                    value={employee.erole}
                                    onChange={setValueHandler}>
                                    <option aria-label="None" value="" />
                                    <option value='Super Admin' >Super Admin</option>
                                    <option value='Admin' >Admin</option>
                                    <option value='Manager' >Manager</option>
                                    <option value='Employee' >Employee</option>
                                </Select>
                                <FormHelperText>{errorMsgs?.erole}</FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl variant='outlined' required error={!!errorMsgs?.designation}>
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
                                    <option value='Engineer' >Engineer</option>
                                    <option value='Associate Engineer' >Associate Engineer</option>
                                    <option value='HR' >HR</option>
                                    <option value='Trainee' >Trainee</option>
                                    <option value='Lead' >Lead</option>
                                </Select>
                                <FormHelperText>{errorMsgs?.designation}</FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl variant='outlined' required error={!!errorMsgs?.rmanager}>
                                <InputLabel htmlFor='rmanager'> Manager</InputLabel>
                                <Select native
                                    id='rmanager'
                                    name='rmanager'
                                    label='Manager'
                                    value={employee.rmanager}
                                    onChange={setValueHandler}>
                                    <option aria-label="None" value=''></option>
                                    {managerList.map((manager, index) => {
                                        return <option key={index} value={manager.managerId}>{manager.managerName}</option>
                                    })}
                                </Select>
                                <FormHelperText>{errorMsgs?.rmanager} </FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField required
                                name='doj'
                                label='Joined On'
                                variant='outlined'
                                type='date'
                                value={employee.doj}
                                onChange={setValueHandler}
                                InputLabelProps={{ shrink: true }}
                                error={!!errorMsgs?.doj}
                                helperText={errorMsgs?.doj} />
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl required error={!!errorMsgs?.status}
                                variant='outlined'>
                                <InputLabel htmlFor='status'>Status</InputLabel>
                                <Select native
                                    id='status'
                                    name='status'
                                    label='status'
                                    value={employee.status}
                                    onChange={setValueHandler}>
                                    <option aria-label='none' value='' />
                                    <option value='Active'>Active</option>
                                    <option value='Inactive'>Inactive</option>
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
                                error={!!errorMsgs?.companyEmail}
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
                                error={!!errorMsgs?.mobile1}
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
                                error={!!errorMsgs?.email}
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
                            <Button variant='contained' color='primary' type='submit' disabled={disableSubmit}>
                                {empId.id ? 'Edit Employee' : 'Create Employee'}
                            </Button>
                            <Button className = 'ml-2' variant='contained' color='secondary' onClick = {resetEmployee}>
                                Cancel</Button>    
                        </div>
                    </Grid>
                </form>
                <ToastContainer />
            </Paper>
        </>
    );
}

export default CreateEmployee;