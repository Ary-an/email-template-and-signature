import { saveAs } from "file-saver";

interface TemplateElement {
  id: string;
  type: string;
  content?: string;
  styles: Record<string, string>;
  src?: string;
  alt?: string;
}

interface EmailTemplate {
  width: string;
  backgroundColor: string;
  elements: TemplateElement[];
}

export function exportAsHtml(template: EmailTemplate): string {
  const { width, backgroundColor, elements } = template;

  const htmlElements = elements
    .map((element) => {
      switch (element.type) {
        case "text":
          return `<div style="${cssToString(element.styles)}">${
            element.content
          }</div>`;
        case "button":
          return `<button style="${cssToString(element.styles)}">${
            element.content
          }</button>`;
        case "image":
          return `<img src="${element.src}" alt="${
            element.alt || ""
          }" style="${cssToString(element.styles)}" />`;
        case "divider":
          return `<hr style="${cssToString(element.styles)}" />`;
        case "html":
          return element.content || "";
        default:
          return "";
      }
    })
    .join("\n");

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Email Template</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #f5f5f5;
      font-family: Arial, sans-serif;
    }
    .email-container {
      width: ${width};
      margin: 0 auto;
      background-color: ${backgroundColor};
      padding: 20px;
    }
  </style>
</head>
<body>
  <div class="email-container">
    ${htmlElements}
  </div>
</body>
</html>`;
}

function cssToString(styles: Record<string, string>): string {
  return Object.entries(styles)
    .map(([key, value]) => `${key}: ${value};`)
    .join(" ");
}

export function downloadHtml(
  html: string,
  filename = "email-template.html"
): void {
  const blob = new Blob([html], { type: "text/html" });
  saveAs(blob, filename);
}
