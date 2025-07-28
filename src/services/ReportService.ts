
import PDFDocument from "pdfkit"
import { Response } from 'express';

export const generateSalesReportPDF = async (
  res: Response,
  salesData: {
    totalRevenue: number;
    totalBookings: number;
    averageOrderValue: number;
    topEvents: { name: string; revenue: number; bookings: number }[];
  }
) => {
  const doc = new PDFDocument();
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename="sales-report.pdf"');

  doc.pipe(res);

  doc.fontSize(20).text('Sales Report', { align: 'center' });
  doc.moveDown();

  doc.fontSize(12).text(`Total Revenue: $${salesData.totalRevenue.toLocaleString()}`);
  doc.text(`Total Bookings: ${salesData.totalBookings}`);
  doc.text(`Average Order Value: $${salesData.averageOrderValue.toFixed(2)}`);
  doc.moveDown();

  doc.fontSize(14).text('Top Performing Events:');
  doc.moveDown(0.5);

  salesData.topEvents.forEach((event, idx) => {
    doc.fontSize(12).text(
      `${idx + 1}. ${event.name} - $${event.revenue.toLocaleString()} revenue, ${event.bookings} bookings`
    );
  });

  doc.end(); // finalize
};
