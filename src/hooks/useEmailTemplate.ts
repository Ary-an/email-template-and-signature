import { useState } from "react";

export type ElementType = "text" | "button" | "image" | "divider" | "html";

export interface ElementStyles {
  [key: string]: string;
}

export interface TemplateElement {
  id: string;
  type: ElementType;
  content?: string;
  styles: ElementStyles;
  src?: string;
  alt?: string;
}

export interface EmailTemplate {
  width: string;
  backgroundColor: string;
  elements: TemplateElement[];
}

const defaultTemplate: EmailTemplate = {
  width: "600px",
  backgroundColor: "#ffffff",
  elements: [],
};

export function useEmailTemplate() {
  const [template, setTemplate] = useState<EmailTemplate>({
    ...defaultTemplate,
  });
  const [selectedElement, setSelectedElement] =
    useState<TemplateElement | null>(null);

  const updateTemplate = (updates: Partial<EmailTemplate>) => {
    setTemplate((prev) => ({ ...prev, ...updates }));
  };

  const addElement = (type: ElementType) => {
    const newElement: TemplateElement = {
      id: `element-${Date.now()}`,
      type,
      content: type === "text" ? "New Text Element" : "",
      styles: {
        fontSize: "14px",
        color: "#333333",
        margin: "10px 0",
      },
      ...(type === "button" && {
        content: "Click Me",
        styles: {
          backgroundColor: "#1890ff",
          color: "#ffffff",
          padding: "8px 16px",
          borderRadius: "4px",
          border: "none",
          cursor: "pointer",
        },
      }),
      ...(type === "image" && {
        src: "https://placehold.co/1000x200",
        alt: "Placeholder Image",
        styles: {
          maxWidth: "100%",
          height: "auto",
        },
      }),
      ...(type === "divider" && {
        styles: {
          borderTop: "1px solid #e8e8e8",
          margin: "20px 0",
        },
      }),
    };

    setTemplate((prev) => ({
      ...prev,
      elements: [...prev.elements, newElement],
    }));
    setSelectedElement(newElement);
  };

  const updateElement = (id: string, updates: Partial<TemplateElement>) => {
    setTemplate((prev) => ({
      ...prev,
      elements: prev.elements.map((el) =>
        el.id === id ? { ...el, ...updates } : el
      ),
    }));
    setSelectedElement((prev) =>
      prev?.id === id ? { ...prev, ...updates } : prev
    );
  };

  const removeElement = (id: string) => {
    setTemplate((prev) => ({
      ...prev,
      elements: prev.elements.filter((el) => el.id !== id),
    }));
    if (selectedElement?.id === id) {
      setSelectedElement(null);
    }
  };

  const resetTemplate = () => {
    setTemplate({ ...defaultTemplate });
    setSelectedElement(null);
  };

  const applySignature = (signatureHtml: string) => {
    if (!signatureHtml) return;

    const signatureElement: TemplateElement = {
      id: `signature-${Date.now()}`,
      type: "html",
      content: signatureHtml,
      styles: {
        margin: "20px 0 0 0",
      },
    };

    setTemplate((prev) => ({
      ...prev,
      elements: [...prev.elements, signatureElement],
    }));
  };

  return {
    template,
    updateTemplate,
    addElement,
    selectedElement,
    setSelectedElement,
    updateElement,
    removeElement,
    resetTemplate,
    applySignature,
  };
}
