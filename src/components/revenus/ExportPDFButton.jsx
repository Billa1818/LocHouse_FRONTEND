import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { FaFilePdf } from "react-icons/fa";

export default function ExportPDFButton() {
  const exportToPDF = async () => {
    const element = document.getElementById("revenus-content");
    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const width = pdf.internal.pageSize.getWidth();
    const height = (canvas.height * width) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, width, height);
    pdf.save("revenus_locataire_novembre_2025.pdf");
  };

  return (
    <button
      onClick={exportToPDF}
      className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
    >
      <FaFilePdf /> Exporter en PDF
    </button>
  );
}