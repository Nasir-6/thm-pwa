import React from 'react'
import { parse } from 'papaparse';
type Props = {}

const DataProcessor = (props: Props) => {

    const changeHandler = (event:any) => {
        console.log(event.target.files[0]);
        // Passing file data (event.target.files[0]) to parse using Papa.parse
        parse(event.target.files[0], {
          header: true,
          skipEmptyLines: true,
          complete: function (results) {
            // console.log(results.data)
    
            const data = results.data;
    
            console.log("data", data);
            // csvToJson(data); //
            console.log("THIS IS JSON", JSON.stringify(data));
          },
        });
    }

  return (
    <>
    <div>DataProcessor</div>
    {/* File Uploader */}
    <input
        type="file"
        name="file"
        accept=".csv"
        onChange={changeHandler}
        style={{ display: "block", margin: "10px auto" }}
      />
    </>
  )
}

export default DataProcessor;