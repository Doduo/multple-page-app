<<<<<<< HEAD
import React, { useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import '@src/common/lib/ag-grid-enterprise.cjs';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

const Bbb = () => {
	const [rowData] = useState([
		{ make: 'Toyota', model: 'Celica', price: 35000 },
		{ make: 'Ford', model: 'Mondeo', price: 32000 },
		{ make: 'Porsche', model: 'Boxster', price: 720000 },
	]);

	const [columnDefs] = useState([
		{ field: 'make' },
		{ field: 'model' },
		{ field: 'price' },
	]);

	return (
		<div className="ag-theme-alpine" style={{ height: 400, width: 600 }}>
			<AgGridReact rowData={rowData} columnDefs={columnDefs}></AgGridReact>
		</div>
	);
=======
import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const Bbb = () => {
  const [rowData] = useState([
    { make: "Toyota", model: "Celica", price: 35000 },
    { make: "Ford", model: "Mondeo", price: 32000 },
    { make: "Porsche", model: "Boxster", price: 720000 },
  ]);

  const [columnDefs] = useState([
    { field: "make" },
    { field: "model" },
    { field: "price" },
  ]);

  return (
    <div className="ag-theme-alpine" style={{ height: 400, width: 600 }}>
      <AgGridReact rowData={rowData} columnDefs={columnDefs}></AgGridReact>
    </div>
  );
>>>>>>> 6d098a9c0daafd51755cf30273ece53aa669de00
};

export default Bbb;
