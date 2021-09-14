import React, { useEffect, useState } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider, PaginationListStandalone } from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
//import overlayFactory from 'react-bootstrap-table2-overlay';
import 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';


import './DirectReports.scss';
import { baseUrl, LOADING_DONE, LOADING_DATA } from './../../Contants';

function DirectReports(props) {
    const [directReports, setDirectReports] = useState([]);
    const managerId = useSelector(state => state.Login.employeeData.data?._id);
    const dispatch = useDispatch();
    const { SearchBar } = Search;
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
        totalSize: directReports.length
    }

    useEffect(() => {
        dispatch({ type: LOADING_DATA });
        console.log('use effect');
        const url = baseUrl + 'myreportees';
                axios.get(`${url}/${managerId}`)
                .then((res) => {
                    console.log(res);
                    setDirectReports(res.data.data);
                    dispatch({ type: LOADING_DONE });
                })
                .catch((err) => {
                    console.log(err);
                    dispatch({ type: LOADING_DONE });
                })
    }, [managerId])

    // const CaptionElement = () => <h3 className='Caption'>Direct Reports</h3>

    const contentTable = ({ paginationProps, paginationTableProps }) => {
            return (<div>
                <ToolkitProvider
                    bootstrap4
                    keyField="employeeId"
                    columns={columns}
                    data={directReports}
                    defaultSorted={defaultSorted}

                    search
                >
                    {
                        toolkitprops => (
                            <div>
                                <SearchBar {...toolkitprops.searchProps} />
                                <BootstrapTable
                                    striped
                                    hover

                                    {...toolkitprops.baseProps}
                                    {...paginationTableProps}
                                />
                            </div>
                        )
                    }
                </ToolkitProvider>
                <PaginationListStandalone {...paginationProps} />
            </div>
            )
    };



    return (
        <PaginationProvider pagination={
            paginationFactory(options)
        }>
            {contentTable}

        </PaginationProvider>

    );
}

export default DirectReports;