import XlsxPopulate from "xlsx-populate";
import fs from "fs";
import path from "path";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { cells, cells2, blows10Cell, blows25Cell, blows65Cell } = req.body;

    // استخدم المسار الصحيح للملف داخل Vercel
    const filePath = path.join(process.cwd(), "api", "sieve.xlsx");

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: "sieve.xlsx not found" });
    }

    const workbook = await XlsxPopulate.fromFileAsync(filePath);
    const sheet = workbook.sheet("Report");
    const proctor = workbook.sheet("Proctor");
    const blows10 = workbook.sheet("10 Blows");
    const blows25 = workbook.sheet("25 Blows");
    const blows65 = workbook.sheet("65 Blows");

    cells.forEach((c) => sheet.cell(c.address).value(c.value));
    cells2.forEach((c) => proctor.cell(c.address).value(c.value));
    blows10Cell.forEach((c) => blows10.cell(c.address).value(c.value));
    blows25Cell.forEach((c) => blows25.cell(c.address).value(c.value));
    blows65Cell.forEach((c) => blows65.cell(c.address).value(c.value));

    const buffer = await workbook.outputAsync();

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader("Content-Disposition", "attachment; filename=updated.xlsx");

    res.send(Buffer.from(buffer));
  } catch (error) {
    console.error("Error updating Excel cell:", error);
    res.status(500).json({ success: false, error: error.message });
  }
}
