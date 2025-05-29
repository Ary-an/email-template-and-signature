import { useState } from "react";
import {
  Card,
  Form,
  Input,
  Button,
  Divider,
  Upload,
  message,
  Row,
  Col,
  Radio,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import "./SignatureCreator.css";
import {
  signatureTemplates,
  type SignatureTemplate,
} from "./signatureTemplates";

const getSignatureTemplate = (design: string): SignatureTemplate => {
  return signatureTemplates[design] || signatureTemplates.corporate;
};

export function SignatureCreator() {
  const [form] = Form.useForm();
  const [signatureHtml, setSignatureHtml] = useState("");
  const [logoUrl, setLogoUrl] = useState("");

  const designs = [
    { value: "corporate", label: "Corporate" },
    { value: "minimalist", label: "Minimalist" },
    { value: "creative", label: "Creative" },
    { value: "modern", label: "Modern" },
  ];

  const beforeUpload = (file: File) => {
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      message.error("You can only upload image files!");
      return Upload.LIST_IGNORE;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setLogoUrl(reader.result as string);
    };
    return false;
  };

  const onFinish = (values: Record<string, string>) => {
    const { name, title, phone, email, website, design } = values;

    const template = getSignatureTemplate(design);

    const html = template({
      name,
      title,
      phone,
      email,
      website,
      logoUrl,
    });

    setSignatureHtml(html);
    message.success("Signature created successfully!");
  };

  const handleDownload = (format: "html" | "txt") => {
    if (!signatureHtml) {
      message.warning("Please create a signature first!");
      return;
    }

    const content =
      format === "html" ? signatureHtml : signatureHtml.replace(/<[^>]*>/g, "");

    const blob = new Blob([content], {
      type: format === "html" ? "text/html" : "text/plain",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `signature.${format}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="signature-creator">
      <Card title="Create Your Signature" className="signature-card">
        <Row gutter={16}>
          <Col span={12}>
            <Form form={form} onFinish={onFinish} layout="vertical">
              <Form.Item
                name="name"
                label="Full Name"
                rules={[{ required: true }]}
              >
                <Input placeholder="John Doe" />
              </Form.Item>
              <Form.Item name="title" label="Job Title">
                <Input placeholder="Marketing Manager" />
              </Form.Item>
              <Form.Item name="phone" label="Phone Number">
                <Input placeholder="+1 (123) 456-7890" />
              </Form.Item>
              <Form.Item
                name="email"
                label="Email"
                rules={[{ type: "email", required: true }]}
              >
                <Input placeholder="john.doe@example.com" />
              </Form.Item>
              <Form.Item name="website" label="Website">
                <Input placeholder="example.com" />
              </Form.Item>
              <Form.Item name="logo" label="Logo">
                <Upload
                  beforeUpload={beforeUpload}
                  maxCount={1}
                  accept="image/*"
                  showUploadList={false}
                >
                  <Button icon={<UploadOutlined />}>Upload Logo</Button>
                </Upload>
                {logoUrl && (
                  <div style={{ marginTop: 10 }}>
                    <img
                      src={logoUrl}
                      alt="Preview"
                      style={{ maxHeight: 50, maxWidth: 150 }}
                    />
                    <Button
                      type="link"
                      danger
                      onClick={() => setLogoUrl("")}
                      style={{ marginLeft: 10 }}
                    >
                      Remove
                    </Button>
                  </div>
                )}
              </Form.Item>
              <Form.Item
                label="Design Style"
                name="design"
                initialValue="corporate"
              >
                <Radio.Group
                  options={designs}
                  optionType="button"
                  buttonStyle="solid"
                />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Generate Signature
                </Button>
              </Form.Item>
            </Form>
          </Col>
          <Col span={12}>
            <Divider orientation="left">Preview</Divider>
            <div
              className="signature-preview"
              dangerouslySetInnerHTML={{
                __html:
                  signatureHtml || "<p>Your signature will appear here</p>",
              }}
            />
            {signatureHtml && (
              <div className="signature-actions">
                <Button type="primary" onClick={() => handleDownload("html")}>
                  Download as HTML
                </Button>
                <Button onClick={() => handleDownload("txt")}>
                  Download as TXT
                </Button>
                <Button
                  type="default"
                  onClick={() => {
                    navigator.clipboard.writeText(signatureHtml);
                    message.success("HTML copied to clipboard!");
                  }}
                >
                  Copy HTML
                </Button>
              </div>
            )}
          </Col>
        </Row>
      </Card>
    </div>
  );
}
