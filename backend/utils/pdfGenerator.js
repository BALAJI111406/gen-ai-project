const PDFDocument = require('pdfkit');

const generatePDF = (seatingPlan) => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ margin: 50 });
      const chunks = [];

      doc.on('data', chunk => chunks.push(chunk));
      doc.on('end', () => resolve(Buffer.concat(chunks)));

      doc.fontSize(20).text('Exam Seating Arrangement', { align: 'center' });
      doc.moveDown();
      doc.fontSize(12).text(`Subject: ${seatingPlan.subject}`);
      doc.text(`Exam Date: ${new Date(seatingPlan.examDate).toLocaleDateString()}`);
      doc.text(`Total Students: ${seatingPlan.totalStudents}`);
      doc.moveDown();

      seatingPlan.seatingArrangement.forEach((hall, idx) => {
        if (idx > 0) doc.addPage();
        doc.fontSize(16).text(`Hall: ${hall.hallName}`, { underline: true });
        doc.moveDown();

        const table = {};
        hall.seats.forEach(seat => {
          if (!table[seat.row]) table[seat.row] = {};
          table[seat.row][seat.column] = seat;
        });

        doc.fontSize(10);
        Object.keys(table).sort((a, b) => a - b).forEach(row => {
          let rowText = `Row ${row}: `;
          Object.keys(table[row]).sort((a, b) => a - b).forEach(col => {
            const seat = table[row][col];
            rowText += `[${seat.registerNumber}-${seat.department}] `;
          });
          doc.text(rowText);
        });
      });

      doc.end();
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = { generatePDF };
