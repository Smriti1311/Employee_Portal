import React, { useEffect, useState } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider, PaginationListStandalone } from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
//import overlayFactory from 'react-bootstrap-table2-overlay';
import 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import axios from 'axios';

import './DirectReports.scss';

function DirectReports(props) {
    const [directReports, setDirectReports] = useState([]);
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
        totalSize: directReports
    }

    useEffect(() => {
        const url = "http://localhost:8080/users/allemployees";
        axios.get(url)
            .then((res) => {
                console.log(res.data.data);
                setDirectReports(res.data.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

   // const CaptionElement = () => <h3 className='Caption'>Direct Reports</h3>

    const contentTable = ({ paginationProps, paginationTableProps }) => (
        <div>
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
    );



    return (
        <PaginationProvider pagination={
            paginationFactory(options)
        }>
            {contentTable}

        </PaginationProvider>

    );
}

export default DirectReports;