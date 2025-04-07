import React, { useState } from "react";
import { jsPDF } from "jspdf";
import QRCode from "react-qr-code";

export default function App() {
  const [precios, setPrecios] = useState({
    super: "",
    premium: "",
    diesel: "",
    gnc: "",
    fecha: ""
  });
  const [pdfUrl, setPdfUrl] = useState("");

  const generarPDF = () => {
    const doc = new jsPDF();
    doc.setFillColor("#FFC549");
    doc.roundedRect(20, 20, 170, 100, 10, 10, "F");

    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text("Información sobre los precios de combustibles - PETA S.R.L.", 25, 30);

    doc.setFontSize(11);
    doc.text(`Fecha de actualización: ${precios.fecha}`, 25, 40);
    doc.text(`Súper: $${precios.super}`, 25, 55);
    doc.text(`Premium: $${precios.premium}`, 25, 65);
    doc.text(`Evolux Diesel: $${precios.diesel}`, 25, 75);
    doc.text(`GNC: $${precios.gnc}`, 25, 85);

    const pdfBlob = doc.output("bloburl");
    setPdfUrl(pdfBlob);
  };

  return (
    <div style={{ maxWidth: '500px', margin: 'auto', padding: '20px' }}>
      <h2>Generador de Precios - PETA S.R.L.</h2>
      <input placeholder="Fecha (dd/mm/aaaa)" onChange={e => setPrecios({ ...precios, fecha: e.target.value })} /><br/>
      <input placeholder="Precio Súper" onChange={e => setPrecios({ ...precios, super: e.target.value })} /><br/>
      <input placeholder="Precio Premium" onChange={e => setPrecios({ ...precios, premium: e.target.value })} /><br/>
      <input placeholder="Precio Evolux Diesel" onChange={e => setPrecios({ ...precios, diesel: e.target.value })} /><br/>
      <input placeholder="Precio GNC" onChange={e => setPrecios({ ...precios, gnc: e.target.value })} /><br/>
      <button onClick={generarPDF} style={{ backgroundColor: '#BD6100', color: 'white', padding: '10px 20px', marginTop: '10px' }}>Ver PDF</button>

      {pdfUrl && (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <p>Código QR para el archivo generado:</p>
          <QRCode value={pdfUrl} />
          <div>
            <a href={pdfUrl} download="Precios_Combustible_PETA.pdf">
              <button style={{ marginTop: '10px' }}>Descargar PDF</button>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}