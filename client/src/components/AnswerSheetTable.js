// import React from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import "../styles/AnswerSheetTable.css";

// const answerSheets = [
//   {
//     status: "Check Answersheet",
//     checked: "No",
//     marks: 0,
//     attendance: "Present",
//   },
//   {
//     status: "Checked",
//     checked: "Yes",
//     marks: 97,
//     attendance: "Present",
//   },
//   {
//     status: "Check Answersheet",
//     checked: "No",
//     marks: 0,
//     attendance: "Present",
//   },  
// ];

// const AnswerSheetTable = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { subject } = location.state || { subject: "Subject Name" };

//   return (
//     <div className="container">
//       <div className="header">
//         <button className="back-btn" onClick={() => navigate(-1)}>
//           ⬅ Back
//         </button>
//         <h2>{subject}</h2>
//       </div>

//       <table className="answer-sheet-table">
//         <thead>
//           <tr>
//             <th>Check Answersheet</th>
//             <th>Is Checked</th>
//             <th>Marks</th>
//             <th>Attendance</th>
//           </tr>
//         </thead>
//         <tbody>
//           {answerSheets.map((sheet, index) => (
//             <tr key={index}>
//               <td>
//                 <button
//                   className="check-btn"
//                   onClick={() => navigate(`/evaluation/${index}`)}
//                 >
//                   {sheet.status}
//                 </button>
//               </td>
//               <td>{sheet.checked}</td>
//               <td>{sheet.marks}</td>
//               <td>{sheet.attendance}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default AnswerSheetTable;


import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/AnswerSheetTable.css";

const AnswerSheetTable = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { subject } = location.state || { subject: "Subject Name" };
  const pdfs = location.state?.pdfs || []; // Get the PDFs from location state

  return (
    <div className="container">
      <div className="header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          ⬅ Back
        </button>
        <h2>{subject}</h2>
      </div>

      <h3>List of Uploaded PDFs:</h3>
      <ul>
        {pdfs.map((pdf, index) => (
          <li key={index}>{pdf.filename || pdf.pdfUrl || "Unknown PDF"}</li>
        ))}
      </ul>

      <table className="answer-sheet-table">
        <thead>
          <tr>
            <th>Check Answersheet</th>
            <th>Is Checked</th>
            <th>Marks</th>
            <th>Attendance</th>
          </tr>
        </thead>
        <tbody>
          {pdfs.map((pdf, index) => (
            <tr key={index}>
              <td>
                <button
                  className="check-btn"
                  onClick={() =>
                    navigate(`/evaluation/${index}`, {
                      state: { pdfUrl: pdf.pdfUrl },
                    })
                  }
                >
                  Check Answersheet
                </button>
              </td>
              <td>No</td>
              <td>0</td>
              <td>Present</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AnswerSheetTable;