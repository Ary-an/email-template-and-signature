import { Button, Space } from "antd";
import { type ElementType } from "../../hooks/useEmailTemplate";

interface ToolbarProps {
  onAddElement: (type: ElementType) => void;
  onReset: () => void;
  onApplySignature: () => void;
}

export function Toolbar({
  onAddElement,
  onReset,
  onApplySignature,
}: ToolbarProps) {
  return (
    <div className="toolbar">
      <Space direction="vertical" style={{ width: "100%" }}>
        <Button block onClick={() => onAddElement("text")}>
          Add Text
        </Button>
        <Button block onClick={() => onAddElement("button")}>
          Add Button
        </Button>
        <Button block onClick={() => onAddElement("image")}>
          Add Image
        </Button>
        <Button block onClick={() => onAddElement("divider")}>
          Add Divider
        </Button>
        <Button block onClick={onApplySignature}>
          Add Signature
        </Button>
        <Button block danger onClick={onReset}>
          Reset Template
        </Button>
      </Space>
    </div>
  );
}
