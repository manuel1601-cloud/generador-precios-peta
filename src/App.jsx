import React, { useState } from "react";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

export default function App() {
  const [precios, setPrecios] = useState({
    fecha: "",
    vnafta: "", vnafta_imp: "", vnafta_total: "",
    super: "", super_imp: "", super_total: "",
    vdiesel: "", vdiesel_imp: "", vdiesel_total: "",
    evolux: "", evolux_imp: "", evolux_total: ""
  });

  const generarPDF = () => {
    const doc = new jsPDF();

    doc.setFillColor("#FFC549");
    doc.roundedRect(10, 10, 190, 270, 5, 5, "F");

    doc.setTextColor(0, 0, 0);
    doc.setFontSize(16);
    doc.text("Información sobre la", 20, 25);
    doc.text("Componente Impositiva", 20, 33);
    doc.text("en los Precios de Combustibles", 20, 41);

    doc.setFontSize(12);
    doc.text("Estimado Cliente,", 20, 55);
    doc.setFontSize(11);
    doc.text("En cumplimiento con la Ley 27743 y normas complementarias,", 20, 63);
    doc.text("informamos la componente impositiva en los precios de", 20, 70);
    doc.text("nuestros productos combustibles:", 20, 77);

    doc.setFontSize(10);
    doc.text("Fecha de actualización: " + precios.fecha, 20, 87);

    autoTable(doc, {
      startY: 95,
      head: [["", "Precio Neto", "Total Impuestos", "Precio Final"]],
      body: [
        ["V-Power Nafta", precios.vnafta, precios.vnafta_imp, precios.vnafta_total],
        ["Súper", precios.super, precios.super_imp, precios.super_total],
        ["V-Power Diesel", precios.vdiesel, precios.vdiesel_imp, precios.vdiesel_total],
        ["Evolux", precios.evolux, precios.evolux_imp, precios.evolux_total],
      ],
      styles: { halign: 'center' },
      headStyles: { fillColor: [255, 197, 73], textColor: 0 },
      theme: 'grid'
    });

    doc.addImage("/logo-shell.png", "PNG", 160, 250, 30, 30);
    doc.addImage("/logo-peta.png", "PNG", 20, 250, 30, 30);

    doc.save("precios_combustible_peta.pdf");
  };

  return (
    <div style={{ maxWidth: '600px', margin: 'auto', padding: '20px' }}>
      <h2>Generador de Precios - PETA S.R.L.</h2>
      <input placeholder="Fecha (dd/mm/aaaa)" onChange={e => setPrecios({ ...precios, fecha: e.target.value })} /><br /><br />

      <h4>V-Power Nafta</h4>
      <input placeholder="Precio Neto" onChange={e => setPrecios({ ...precios, vnafta: e.target.value })} />
      <input placeholder="Impuestos" onChange={e => setPrecios({ ...precios, vnafta_imp: e.target.value })} />
      <input placeholder="Total" onChange={e => setPrecios({ ...precios, vnafta_total: e.target.value })} /><br /><br />

      <h4>Súper</h4>
      <input placeholder="Precio Neto" onChange={e => setPrecios({ ...precios, super: e.target.value })} />
      <input placeholder="Impuestos" onChange={e => setPrecios({ ...precios, super_imp: e.target.value })} />
      <input placeholder="Total" onChange={e => setPrecios({ ...precios, super_total: e.target.value })} /><br /><br />

      <h4>V-Power Diesel</h4>
      <input placeholder="Precio Neto" onChange={e => setPrecios({ ...precios, vdiesel: e.target.value })} />
      <input placeholder="Impuestos" onChange={e => setPrecios({ ...precios, vdiesel_imp: e.target.value })} />
      <input placeholder="Total" onChange={e => setPrecios({ ...precios, vdiesel_total: e.target.value })} /><br /><br />

      <h4>Evolux</h4>
      <input placeholder="Precio Neto" onChange={e => setPrecios({ ...precios, evolux: e.target.value })} />
      <input placeholder="Impuestos" onChange={e => setPrecios({ ...precios, evolux_imp: e.target.value })} />
      <input placeholder="Total" onChange={e => setPrecios({ ...precios, evolux_total: e.target.value })} /><br /><br />

      <button onClick={generarPDF} style={{ backgroundColor: '#BD6100', color: 'white', padding: '10px 20px' }}>
        Ver PDF
      </button>
    </div>
  );
}