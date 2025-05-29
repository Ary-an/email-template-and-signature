import React, { forwardRef } from "react";
import type {
  EmailTemplate,
  TemplateElement,
} from "../../hooks/useEmailTemplate";

interface CanvasProps {
  template: EmailTemplate;
  selectedElement: TemplateElement | null;
  onSelectElement: (element: TemplateElement) => void;
}

export const Canvas = forwardRef<HTMLDivElement, CanvasProps>(
  ({ template, selectedElement, onSelectElement }, ref) => {
    const handleElementClick = (
      e: React.MouseEvent,
      element: TemplateElement
    ) => {
      e.stopPropagation();
      onSelectElement(element);
    };

    return (
      <div
        ref={ref}
        className="canvas"
        style={{
          width: template.width,
          backgroundColor: template.backgroundColor,
          minHeight: "500px",
          padding: "20px",
          border: "1px dashed #d9d9d9",
        }}
      >
        {template.elements.map((element) => (
          <div
            key={element.id}
            onClick={(e) => handleElementClick(e, element)}
            style={{
              ...element.styles,
              outline:
                selectedElement?.id === element.id
                  ? "2px solid #1890ff"
                  : "none",
              padding: "8px",
              position: "relative",
            }}
            dangerouslySetInnerHTML={
              element.type === "html"
                ? { __html: element.content || "" }
                : undefined
            }
          >
            {element.type === "text" && element.content}
            {element.type === "button" && element.content}
            {element.type === "image" && (
              <img src={element.src} alt={element.alt} style={element.styles} />
            )}
            {element.type === "divider" && <hr style={element.styles} />}
          </div>
        ))}
      </div>
    );
  }
);

Canvas.displayName = "Canvas";
