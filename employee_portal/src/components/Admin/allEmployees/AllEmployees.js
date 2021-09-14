import React, { useEffect, useState } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import { Dropdown } from 'react-bootstrap';
import paginationFactory, { PaginationProvider, PaginationListStandalone } from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
//import overlayFactory from 'react-bootstrap-table2-overlay';
import 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router';

import { LOADING_DATA, LOADING_DONE } from 'components/Contants';
import * as ActionCreators from 'store/Actions/index';
import './AllEmployees.scss';
import { ToastContainer } from 'react-toastify';

function AllEmployess(props) {
    const [allEmployees, setAllEmployees] = useState([]);
    const empDeleted = useSelector(state => state.EmployeeData.empDeleted);
    const empUpdated = useSelector(state => state.EmployeeData.empUpdated);
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    const { SearchBar } = Search;

    const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
        <a
            href=""
            ref={ref}
            onClick={(e) => {
                e.preventDefault();
                onClick(e);
            }}
        >
            {children}
            <span className="threedots" />
        </a>
    ));


    const UpdateEmpHandler = (id) => {
        console.log('edit emp=', id);
        dispatch(ActionCreators.EditEmployee(id, history, location));
    }

    const DeleteEmpHandler = (id) => {
        console.log('delete emp=', id);
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className='custom-ui'>
                        <h1>Are you sure?</h1>
                        <p>You want to delete this file?</p>
                        <button onClick={onClose}>No</button>
                        <button
                            onClick={() => {
                                dispatch(ActionCreators.DeleteEmployee(id));
                                onClose();
                            }}
                        >
                            Yes, Delete it!
                        </button>
                    </div>
                );
            }
        });
    }

    const ViewEmpHandler = (id) => {
        console.log('view emp=', id);
        dispatch(ActionCreators.ViewEmployee(id, history, location));
    }

    const crudAction = (cell, row, rowIndex) => {
        console.log('cell=', cell);
        console.log('row=', row);
        const id = row?._id;
        console.log(id);
        return (
            <div>
                <Dropdown>
                    <Dropdown.Toggle as={CustomToggle} />
                    <Dropdown.Menu size="sm" title="">
                        <Dropdown.Item
                            onClick={() => UpdateEmpHandler(id)}
                        >Edit</Dropdown.Item>
                        <Dropdown.Item
                            onClick={() => ViewEmpHandler(id)}
                        >
                            View
                        </Dropdown.Item>
                        <Dropdown.Item
                            onClick={() => DeleteEmpHandler(id)}
                        >Delete</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        )
    }

    const columns = [
        {
            dataField: 'employeeName',
            text: 'Employee Name',
            sort: true
        },
        {
            dataField: 'employeeId',
            text: 'EmployeeId',
            sort: true
        },
        {
            dataField: 'personalEmail',
            text: 'Email',
            sort: true
        },
        {
            dataField: 'designation',
            text: 'Designation',
            sort: true
        },
        {
            dataField: 'status',
            text: 'Status',
            sort: true
        },
        {
            dataField: 'Actions',
            text: 'Actions',
            formatter: crudAction
        }
    ];

    const defaultSorted = [{
        dataField: 'EmployeeName',
        order: 'desc'
    }];

    const options = {
        custom: true,
        paginationSize: 8,
        pageStartIndex: 1,
        firstPageText: 'First',
        prePageText: 'Back',
        nextPageText: 'Next',
        lastPageText: 'Last',
        nextPageTitle: 'First page',
        prePageTitle: 'Pre page',
        firstPageTitle: 'Next page',
        lastPageTitle: 'Last page',
        showTotal: true,
        totalSize: allEmployees.length
    }

    useEffect(() => {
        dispatch({ type: LOADING_DATA });
        const url = "http://localhost:8080/users/allemployees";
        axios.get(url)
            .then((res) => {
                console.log(res.data.data);
                setAllEmployees(res.data.data);
                dispatch({ type: LOADING_DONE });
            })
            .catch((err) => {
                console.log(err);
                dispatch({ type: LOADING_DONE });
            })
    }, [empDeleted, empUpdated])



    // const CaptionElement = () => <h3 className='Caption'>Direct Reports</h3>

    const contentTable = ({ paginationProps, paginationTableProps }) => {
        return (<div className="allEmployeeOuter">
            <ToolkitProvider
                bootstrap4
                keyField="employeeId"
                columns={columns}
                data={allEmployees}
                defaultSorted={defaultSorted}
                search>
                {
                    toolkitprops => (
                        <div>
                            <SearchBar {...toolkitprops.searchProps} />
                            <BootstrapTable
                                striped
                                hover
                                {...toolkitprops.baseProps}
                                {...paginationTableProps} />
                        </div>
                    )
                }
            </ToolkitProvider>
            <PaginationListStandalone {...paginationProps} />
        </div>
        )
    };

    return (
        <>
        <PaginationProvider pagination={
            paginationFactory(options)
        }>
            {contentTable}
        </PaginationProvider>
        <ToastContainer />
        </>
    );
}

export default AllEmployess;