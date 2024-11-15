"use client";
import { useState } from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { useRouter } from "next/navigation";

const PluginUpload = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) return;

    const formData = new FormData();
    formData.append("zipFile", file);

    const response = await fetch("/api/install-plugin", {
      method: "POST",
      body: formData,
    });

    const result = await response.json();
    if (result.success) {
      alert("Plugins uploaded and extracted!");
    } else {
      alert("Error uploading plugins.");
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Row className="w-100">
        <Col xs={12} md={6} lg={4} className="mx-auto">
          <Card className="shadow-lg border-0 p-4">
            <Card.Body>
              <Card.Title className="text-center mb-4">
                Install Plugins
              </Card.Title>
              <form onSubmit={handleSubmit} className="text-center">
                <div className="mb-3">
                  <input
                    type="file"
                    accept=".zip"
                    onChange={handleFileChange}
                    className="form-control"
                  />
                </div>
                <Button type="submit" variant="primary" size="lg">
                  Upload Plugin
                </Button>
              </form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PluginUpload;
