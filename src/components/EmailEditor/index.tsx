import { useRef } from "react";
import { Row, Col } from "antd";
import { Toolbar } from "./Toolbar";
import { Canvas } from "./Canvas";
import { PropertiesPanel } from "./PropertiesPanel";
import { useEmailTemplate } from "../../hooks/useEmailTemplate";
import "./EmailEditor.css";

interface EmailEditorProps {
  signature?: string;
}

export function EmailEditor({ signature }: EmailEditorProps) {
  const {
    template,
    // updateTemplate,
    addElement,
    selectedElement,
    setSelectedElement,
    updateElement,
    removeElement,
    resetTemplate,
    applySignature,
  } = useEmailTemplate();

  const canvasRef = useRef<HTMLDivElement>(null);

  const handleDownload = () => {
    // Implementation for downloading the template
    console.log("Downloading template:", template);
  };

  return (
    <div className="email-editor">
      <Row gutter={16}>
        <Col span={4}>
          <Toolbar
            onAddElement={addElement}
            onReset={resetTemplate}
            onApplySignature={() => signature && applySignature(signature)}
          />
        </Col>
        <Col span={14}>
          <Canvas
            ref={canvasRef}
            template={template}
            onSelectElement={setSelectedElement}
            selectedElement={selectedElement}
          />
        </Col>
        <Col span={6}>
          <PropertiesPanel
            element={selectedElement}
            onUpdate={updateElement}
            onRemove={removeElement}
          />
        </Col>
      </Row>
      <div className="editor-actions">
        <button onClick={handleDownload} className="download-btn">
          Download Template
        </button>
      </div>
    </div>
  );
}
