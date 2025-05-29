import { Card, Col, Row, Button } from "antd";
import { useEmailTemplate } from "../../hooks/useEmailTemplate";
import "./TemplateGallery.css";

const templates = [
  {
    id: "newsletter",
    name: "Newsletter",
    thumbnail: "https://placehold.co/300x200?text=Newsletter",
    description: "Clean newsletter template with header and content sections",
  },
  {
    id: "promotional",
    name: "Promotional",
    thumbnail: "https://placehold.co/300x200?text=Promotional",
    description: "Eye-catching promotional email with call-to-action buttons",
  },
  {
    id: "announcement",
    name: "Announcement",
    thumbnail: "https://placehold.co/300x200?text=Announcement",
    description: "Simple announcement template with focus on the message",
  },
  {
    id: "invitation",
    name: "Invitation",
    thumbnail: "https://placehold.co/300x200?text=Invitation",
    description: "Elegant invitation template with RSVP section",
  },
];

export function TemplateGallery() {
  const { resetTemplate } = useEmailTemplate();

  const loadTemplate = (templateId: string) => {
    // In a real app, this would load the actual template structure
    console.log(`Loading template: ${templateId}`);
    resetTemplate();
    // Add template-specific elements here
  };

  return (
    <div className="template-gallery">
      <Row gutter={[16, 16]}>
        {templates.map((template) => (
          <Col key={template.id} xs={24} sm={12} md={8} lg={6}>
            <Card
              hoverable
              cover={<img alt={template.name} src={template.thumbnail} />}
            >
              <Card.Meta
                title={template.name}
                description={template.description}
              />
              <Button
                type="primary"
                onClick={() => loadTemplate(template.id)}
                style={{ marginTop: "16px" }}
              >
                Use This Template
              </Button>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}
