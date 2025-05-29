import { Form, Input, ColorPicker, Button } from "antd";
import type { TemplateElement } from "../../hooks/useEmailTemplate";

interface PropertiesPanelProps {
  element: TemplateElement | null;
  onUpdate: (id: string, updates: Partial<TemplateElement>) => void;
  onRemove: (id: string) => void;
}

export function PropertiesPanel({
  element,
  onUpdate,
  onRemove,
}: PropertiesPanelProps) {
  const [form] = Form.useForm();

  if (!element) {
    return (
      <div className="properties-panel">
        <div className="empty-state">
          Select an element to edit its properties
        </div>
      </div>
    );
  }

  const handleValuesChange = (changedValues: any) => {
    onUpdate(element.id, changedValues);
  };

  const handleRemove = () => {
    onRemove(element.id);
  };

  return (
    <div className="properties-panel">
      <h3>Element Properties</h3>
      <Form
        form={form}
        layout="vertical"
        initialValues={element}
        onValuesChange={handleValuesChange}
      >
        {element.type === "text" && (
          <Form.Item name="content" label="Text Content">
            <Input.TextArea rows={4} />
          </Form.Item>
        )}

        {element.type === "button" && (
          <>
            <Form.Item name="content" label="Button Text">
              <Input />
            </Form.Item>
            <Form.Item
              name={["styles", "backgroundColor"]}
              label="Background Color"
            >
              <ColorPicker />
            </Form.Item>
          </>
        )}

        {element.type === "image" && (
          <>
            <Form.Item name="src" label="Image URL">
              <Input />
            </Form.Item>
            <Form.Item name="alt" label="Alt Text">
              <Input />
            </Form.Item>
          </>
        )}

        <Form.Item name={["styles", "margin"]} label="Margin">
          <Input />
        </Form.Item>
        <Form.Item name={["styles", "padding"]} label="Padding">
          <Input />
        </Form.Item>
        <Form.Item name={["styles", "color"]} label="Text Color">
          <ColorPicker />
        </Form.Item>
        <Form.Item name={["styles", "fontSize"]} label="Font Size">
          <Input />
        </Form.Item>
      </Form>
      <Button danger onClick={handleRemove}>
        Remove Element
      </Button>
    </div>
  );
}
