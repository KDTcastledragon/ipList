import './UnauthSW.css';

import * as XLSX from 'xlsx';
import { useEffect, useState } from 'react';
import { DataGrid } from 'react-data-grid';


function UnauthSW() {

    const [excelData, setExcelData] = useState([]);
    const [rows, setRows] = useState([]);
    const [columns, setColumns] = useState([]);

    const handleExcelFile = async (e) => {
        const file = e.target.files[0]
        const data = await file.arrayBuffer();
        const workbook = XLSX.read(data);

        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        const jsonPostToN8N = XLSX.utils.sheet_to_json(worksheet);

        const headerRow = json[0];          // 목록
        const dataRows = json.slice(1);

        const cols = headerRow.map((col, i) => ({
            key: String(i),
            name: col,
            editable: true
        }));

        const refinedRows = dataRows.map(row => Object.fromEntries(row.map((cell, i) => [String(i), cell]))
        );

        setColumns(cols);
        setRows(refinedRows);

        console.log(`refinedRows : ${refinedRows}`);
        console.log(`dataRows : ${dataRows}`);
    };

    const onRowsChange = (newRows) => setRows(newRows);
    // function onRowsChange2(newRows) {
    //     setRows(newRows);
    // }


    return (
        <div className='UnauthSWContainer'>
            <h1>미인가 프로그램</h1>
            <div>
                <input type="file" accept=".xlsx, .xls" onChange={handleExcelFile} />
                <div className='unauthdatagrid'>
                    <table>
                        <thead>
                            <tr>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                    {/* <DataGrid
                        columns={columns}
                        rows={rows}
                        onRowsChange={onRowsChange}
                    /> */}
                </div>
            </div>
        </div>
    );
}

export default UnauthSW;