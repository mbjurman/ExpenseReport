using System.IO;
using ExpenseReport;
using NUnit.Framework;
using iTextSharp.text;
using iTextSharp.text.pdf;

namespace ExpenseReportTests
{
    [TestFixture]
    public class ExpenseReportPdfTests
    {
        [Test]
        public void CreatePdfFromExpenseReport()
        {
            Report report = new Report();
            report.AddExpense(AccountType.FakturerasKund, 2, 1);
            ReportPdf pdf = new ReportPdf(report);
            pdf.WriteToDisk("ExpenseReport.pdf");
        }
    }

    public class ReportPdf
    {
        private readonly Report _report;

        public ReportPdf(Report report)
        {
            _report = report;
        }

        public void WriteToDisk(string fileName)
        {
            CreatePdf(new FileStream(fileName, FileMode.Create));
        }

        private void CreatePdf(FileStream outputStream)
        {
            var doc = new Document(PageSize.A4);

            PdfWriter.GetInstance(doc, outputStream);

            doc.Open();

            WriteFrontPage(doc);
            doc.NewPage();
            WriteSpecification(doc);

            foreach (var representation in _report.Representations)
            {
                doc.NewPage();
                doc.Add(new Paragraph("Representation"));
            }

            PdfPTable table = new PdfPTable(2);
            table.AddCell(new PdfPCell { Colspan = 1 });
            PdfPCell cell = new PdfPCell { Colspan = 1, HorizontalAlignment = 1, Phrase = new Phrase("REPRESENTATIONSKOSTNADER") };
            table.AddCell(cell);
            table.AddCell("Col 1 Row 1");
            table.AddCell("Col 2 Row 1");
            table.AddCell("Col 3 Row 1");
            table.AddCell("Col 1 Row 2");
            table.AddCell("Col 2 Row 2");
            table.AddCell("Col 3 Row 2");
            doc.Add(table);
            doc.Close();
        }

        private static void WriteSpecification(Document doc)
        {
            doc.Add(new Paragraph("Specifikation"));
        }

        private static void WriteFrontPage(Document doc)
        {
            doc.Add(new Paragraph("Redovisning"));
        }
    }
}
