import React,{useContext} from 'react'
import reportContext from '../context/Report/ReportContext'
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const Report = () => {
    const context = useContext(reportContext)
    const {reports}= context  

    const  printDocument=()=> {
        const input = document.getElementById('divToPrint');
        html2canvas(input)
          .then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF();
            pdf.addImage(imgData, 'JPEG', 0, 0);
            // pdf.output('dataurlnewwindow');
            pdf.save("download.pdf");
          })
        ;
      }
        
    return (
        <div className='container my-2' >
        <div id='divToPrint' className="container" style={{display:"flex",flexDirection:"column",justifyContent:"center",width:"60em"}}>
            <h1 style={{display:"flex",justifyContent:"center"}}>{reports[0].EName}</h1>
            <p className='border_report' >{reports[0][0].Report}</p>
        </div>
        <button onClick={printDocument} style={{position:"relative", left:"55em"}} type="button" class="btn btn-outline-primary my-2">Generate PDF</button>
        </div>
    )
}

export default Report
