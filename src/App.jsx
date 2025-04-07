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

  const formatoPeso = (valor) => valor ? `$ ${valor}` : "";

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
        ["V-Power Nafta", formatoPeso(precios.vnafta), formatoPeso(precios.vnafta_imp), formatoPeso(precios.vnafta_total)],
        ["Súper", formatoPeso(precios.super), formatoPeso(precios.super_imp), formatoPeso(precios.super_total)],
        ["V-Power Diesel", formatoPeso(precios.vdiesel), formatoPeso(precios.vdiesel_imp), formatoPeso(precios.vdiesel_total)],
        ["Evolux", formatoPeso(precios.evolux), formatoPeso(precios.evolux_imp), formatoPeso(precios.evolux_total)],
      ],
      styles: { halign: 'center' },
      headStyles: { fillColor: [255, 197, 73], textColor: 0 },
      theme: 'grid'
    });

    doc.addImage("/logo-shell.png", "PNG", 160, 250, 30, 30);
    doc.addImage("/logo-peta.png", "PNG", 20, 250, 30, 30);

    doc.save("precios_combustible_peta.pdf");
  };

  const handleChange = (key, value) => {
    setPrecios((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div style={{ maxWidth: '600px', margin: 'auto', padding: '20px' }}>
      <h2>Generador de Precios - PETA S.R.L.</h2>
      <input placeholder="Fecha (dd/mm/aaaa)" onChange={e => handleChange("fecha", e.target.value)} /><br /><br />

      <h4>V-Power Nafta</h4>
      <input placeholder="$ Precio Neto" onChange={e => handleChange("vnafta", e.target.value)} />
      <input placeholder="$ Impuestos" onChange={e => handleChange("vnafta_imp", e.target.value)} />
      <input placeholder="$ Total" onChange={e => handleChange("vnafta_total", e.target.value)} /><br /><br />

      <h4>Súper</h4>
      <input placeholder="$ Precio Neto" onChange={e => handleChange("super", e.target.value)} />
      <input placeholder="$ Impuestos" onChange={e => handleChange("super_imp", e.target.value)} />
      <input placeholder="$ Total" onChange={e => handleChange("super_total", e.target.value)} /><br /><br />

      <h4>V-Power Diesel</h4>
      <input placeholder="$ Precio Neto" onChange={e => handleChange("vdiesel", e.target.value)} />
      <input placeholder="$ Impuestos" onChange={e => handleChange("vdiesel_imp", e.target.value)} />
      <input placeholder="$ Total" onChange={e => handleChange("vdiesel_total", e.target.value)} /><br /><br />

      <h4>Evolux</h4>
      <input placeholder="$ Precio Neto" onChange={e => handleChange("evolux", e.target.value)} />
      <input placeholder="$ Impuestos" onChange={e => handleChange("evolux_imp", e.target.value)} />
      <input placeholder="$ Total" onChange={e => handleChange("evolux_total", e.target.value)} /><br /><br />

      <button onClick={generarPDF} style={{ backgroundColor: '#BD6100', color: 'white', padding: '10px 20px' }}>
        Ver PDF
      </button>
    </div>
  );
}