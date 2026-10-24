export function exportToCSV(filename: string, headers: string[], rows: (string | number)[][]): void {
  // Add UTF-8 BOM for proper Unicode rendering in Microsoft Excel and other spreadsheet viewers
  const BOM = "\uFEFF";
  
  const csvContent = rows.map(row => 
    row.map(cell => {
      const cellStr = cell === null || cell === undefined ? "" : String(cell);
      // Escape quotes and wrap in quotes if containing comma, newline or quotes
      if (cellStr.includes('"') || cellStr.includes(',') || cellStr.includes('\n')) {
        return `"${cellStr.replace(/"/g, '""')}"`;
      }
      return cellStr;
    }).join(",")
  );

  const fullCSV = BOM + [headers.join(","), ...csvContent].join("\r\n");
  const blob = new Blob([fullCSV], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
