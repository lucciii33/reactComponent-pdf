import logo from './logo.svg';
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf"
import Barcode from "../src/img/barcode.jpg"
import './App.css';

function App() {
  const createPDF = async () => {
    const pdf = new jsPDF("portrait", "pt", "a4");
    const data = await html2canvas(document.querySelector("#pdf"));
    pdf.html(data).then(() => {
      pdf.save("shipping_label.pdf");
    });
    const img = data.toDataURL("image/png");  
    const imgProperties = pdf.getImageProperties(img);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;
    pdf.addImage(img, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("shipping_label.pdf");
}; 
  return (
    
    <div className="shipping">
    <h1>Download Shipping Label</h1>
    <p>Nihil quam soluta sed enim aut omnis voluptatem reprehenderit.</p>
    <div id="pdf">
        <p>TO: John Citizen</p>
        <p>123 Random Street</p>
        <p>Oak Creek, Colorado (CO), 80467</p>
        <p><img src={Barcode} alt="Barcode" style={{width:"300px"}}/></p>
    </div>
    <button onClick={createPDF} type="button">Download</button>
    </div>
  );
}

export default App;
