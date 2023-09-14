const docx = require("docx");
const fs = require("fs");
const {
  Document,
  Paragraph,
  Table,
  TableCell,
  TableRow,
  WidthType,
  ImageRun,
  TextRun,
  AlignmentType,
  convertInchesToTwip,
  SectionType,
  Footer,
  Header,
  PageNumber
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

    if (document[i].POC.length > 0) {
      for (let j = 0; j < document[i].POC.length; j++) {
        poc.push(
          new TableRow({
            children: [
              new TableCell({
                columnSpan: 2,
                children: [
                  new Paragraph({
                    alignment: AlignmentType.JUSTIFIED,
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
                        data: document[i].POC[j].file ? fs.readFileSync(`./uploads/${document[i].POC[j].file}`) : "",
                        transformation: {
                          width: 580,
                          height: 350,
                        },
                      }),
                    ],
                  }),
                ],
                margins: {
                  top: convertInchesToTwip(0.1),
                  bottom: convertInchesToTwip(0.1),
                  left: convertInchesToTwip(0.12),
                  right: convertInchesToTwip(0.12),
                },
              }),
            ],
          })
        );
      }
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
              shading: {
                color: "FFFFFF",
                fill: "FF0000",
              },
              columnSpan: 2,
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: `Observation No. ${i + 1}`,
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
              width: {
                size: 30,
                type: WidthType.PERCENTAGE,
              },
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: "Vulnerability",
                      bold: true,
                    })
                  ]
                })
              ],
            }),
            new TableCell({
              children: [
                new Paragraph({
                  text: document[i].Vulnerability,
                }),
              ],
              margins: {
                top: convertInchesToTwip(0),
                bottom: convertInchesToTwip(0.1),
                left: convertInchesToTwip(0.05),
                right: convertInchesToTwip(0.1),
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
                left: convertInchesToTwip(0.05),
                right: convertInchesToTwip(0.1),
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
                left: convertInchesToTwip(0.05),
                right: convertInchesToTwip(0.1),
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
                    })
                  ]
                })
              ]
            }),
            new TableCell({
              children: [
                new Paragraph({
                  text: document[i].Description,
                  alignment: AlignmentType.JUSTIFIED,
                }),
              ],
              margins: {
                top: convertInchesToTwip(0),
                bottom: convertInchesToTwip(0.1),
                left: convertInchesToTwip(0.05),
                right: convertInchesToTwip(0.1),
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
                  children: [
                    new TextRun({
                      text: document[i].Remediation,
                    }),
                  ],
                  alignment: AlignmentType.JUSTIFIED
                }),
              ],
              margins: {
                top: convertInchesToTwip(0),
                bottom: convertInchesToTwip(0.1),
                left: convertInchesToTwip(0.05),
                right: convertInchesToTwip(0.1),
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
                left: convertInchesToTwip(0.05),
                right: convertInchesToTwip(0.1),
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
                left: convertInchesToTwip(0.05),
                right: convertInchesToTwip(0.1),
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
              margins: {
                top: convertInchesToTwip(0),
                bottom: convertInchesToTwip(0.1),
                left: convertInchesToTwip(0.05),
                right: convertInchesToTwip(0.1),
              },
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
      headers: {
        default: new Header({
          children: [
            new Paragraph({
              alignment: AlignmentType.RIGHT,
              spacing: {
                after: 200,
              },
              children: [
                new ImageRun({
                  data: fs.readFileSync("./images/logo.png"),
                  transformation: {
                    width: 60,
                    height: 55,
                  },
                }),
              ],
            })
          ],
        })
      },
      footers: {
        default: new Footer({
          children: [
            new Paragraph({
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      children: ["Confidential"],
                      italics: true
                    }),
                  ],
                }),
                new Paragraph({
                  children: [
                    new TextRun({
                      text: "Protean InfoSec Services Limited",
                      bold: true,
                    }),
                  ],
                }),
                new Paragraph({
                  children: [
                    new TextRun({
                      children: ["(Formerly NSDL e-Governance InfoSec Services Limited)                                                                 Page ", PageNumber.CURRENT, " of ", PageNumber.TOTAL_PAGES],
                      italics: true
                    }),
                  ],
                }),
              ],
              alignment: AlignmentType.LEFT
            })
          ],
        }),
      },
    });
  }

  const doc = new Document({
    sections,
    creator: "Protean Infosec",

  });
  return doc;
}

module.exports = { generateDocument };
