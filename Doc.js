const docx = require("docx");
const fs = require("fs");
const {
  Document,
  Packer,
  Paragraph,
  Table,
  TableCell,
  TableRow,
  WidthType,
  ImageRun,
  VerticalAlign,
  TextRun,
  AlignmentType,
  convertInchesToTwip,
  SectionType,
} = docx;

function generateDocument(document) {

  const sections = [];

  for (let i = 0; i < document.length; i++) {
    let poc = [];
    let affectedUrls = { children: [] };

    severityColor = {
      "Critical": "DB0000",
      "High": "FF0000",
      "Medium": "D8AF01",
      "Low": "FFE512",
      "Informational": "28E00B",
    }

    for (let j = 0; j < document[i].POC.length; j++) {
      poc.push(
        new TableRow({
          children: [
            new TableCell({
              columnSpan: 2,
              children: [
                new Paragraph({
                  alignment: AlignmentType.CENTER,
                  pageBreakBefore: (j + 1) % 2 === 0 ? true : false,
                  text: document[i].POC[j].text,
                }),
                new Paragraph({
                  alignment: AlignmentType.CENTER,
                  spacing: {
                    after: 200,
                  },
                  children: [
                    new ImageRun({
                      data: fs.readFileSync(`./uploads/${document[i].POC[j].file}`),
                      transformation: {
                        width: 600,
                        height: 350,
                      },
                    }),
                  ],
                }),
              ],
              margins: {
                top: convertInchesToTwip(0),
                bottom: convertInchesToTwip(0.1),
                left: convertInchesToTwip(0),
                right: convertInchesToTwip(0),
              },
            }),
          ],
        })
      );
    }

    for (let k = 0; k < document[i].AffectedURLs.length; k++) {
      affectedUrls.children.push(new Paragraph({
        text: document[i].AffectedURLs[k],
        bullet: {
          level: 0
        }
      }))
    }

    const table = new Table({
      width: {
        size: 100,
        type: WidthType.PERCENTAGE,
      },
      rows: [
        new TableRow({
          children: [
            new TableCell({
              // width: {
              //   size: 20,
              //   type: WidthType.PERCENTAGE,
              // },
              shading: {
                color: "FFFFFF",
                fill: "FF0000",
              },
              columnSpan: 2,
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: `Observation No. ${document[i].ObservationNo}`,
                      bold: true,
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
        new TableRow({
          children: [
            new TableCell({
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: "Vulnerability",
                      bold: true,
                    }),
                  ],
                }),
              ],
              margins: {
                top: convertInchesToTwip(0),
                bottom: convertInchesToTwip(0.1),
                left: convertInchesToTwip(0),
                right: convertInchesToTwip(0),
              },
            }),
            new TableCell({
              children: [
                new Paragraph({
                  text: document[i].Vulnerability,
                }),
              ],
            }),
          ],
        }),
        new TableRow({
          children: [
            new TableCell({
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: "Status",
                      bold: true,
                    }),
                  ],
                }),
              ],

            }),
            new TableCell({
              children: [
                new Paragraph({
                  text: document[i].Status,
                }),
              ],
              margins: {
                top: convertInchesToTwip(0),
                bottom: convertInchesToTwip(0.1),
                left: convertInchesToTwip(0),
                right: convertInchesToTwip(0),
              },
            }),
          ],
        }),
        new TableRow({
          children: [
            new TableCell({
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: "Severity",
                      bold: true,
                    }),
                  ],
                }),
              ],

            }),
            new TableCell({
              shading: {
                color: "FFFFFF",
                fill: severityColor[document[i].Severity],
              },
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: document[i].Severity,
                      bold: true,
                    }),
                  ],
                }),
              ],
              margins: {
                top: convertInchesToTwip(0),
                bottom: convertInchesToTwip(0.1),
                left: convertInchesToTwip(0),
                right: convertInchesToTwip(0),
              },
            }),
          ],
        }),
        new TableRow({
          children: [
            new TableCell({
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: "Description",
                      bold: true,
                    }),
                  ],
                }),
              ],

            }),
            new TableCell({
              children: [
                new Paragraph({
                  text: document[i].Description,
                }),
              ],
              margins: {
                top: convertInchesToTwip(0),
                bottom: convertInchesToTwip(0.1),
                left: convertInchesToTwip(0),
                right: convertInchesToTwip(0),
              },
            }),
          ],
        }),
        new TableRow({
          children: [
            new TableCell({
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: "Remediation",
                      bold: true,
                    }),
                  ],
                }),
              ],
            }),
            new TableCell({
              children: [
                new Paragraph({
                  text: document[i].Remediation,
                }),
              ],
              margins: {
                top: convertInchesToTwip(0),
                bottom: convertInchesToTwip(0.1),
                left: convertInchesToTwip(0),
                right: convertInchesToTwip(0),
              },
            }),
          ],
        }),
        new TableRow({
          children: [
            new TableCell({
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: "Affected URLs",
                      bold: true,
                    }),
                  ],
                }),
              ],

            }),
            new TableCell({
              children: affectedUrls.children,
              margins: {
                top: convertInchesToTwip(0),
                bottom: convertInchesToTwip(0.1),
                left: convertInchesToTwip(0),
                right: convertInchesToTwip(0),
              },
            }),
          ],
        }),
        new TableRow({
          children: [
            new TableCell({
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: "References",
                      bold: true,
                    }),
                  ],
                }),
              ],

            }),
            new TableCell({
              children: [
                new Paragraph({
                  text: document[i].References,
                }),
              ],
              margins: {
                top: convertInchesToTwip(0),
                bottom: convertInchesToTwip(0.1),
                left: convertInchesToTwip(0),
                right: convertInchesToTwip(0),
              },
            }),
          ],
        }),
        new TableRow({
          children: [
            new TableCell({
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: "Proof Of Concept",
                      bold: true,
                    }),
                  ],
                }),
              ],

            }),
            new TableCell({
              children: [
                new Paragraph({
                  text: "Screenshot shared below.",
                }),
              ],

            }),
          ],
        }),
        ...poc,
      ],
    });
    sections.push({
      properties: {
        type: SectionType.NEXT_PAGE,
      },
      children: [table],
    });
  }

  const doc = new Document({
    sections,
  });
  return doc;
}
module.exports = { generateDocument };
