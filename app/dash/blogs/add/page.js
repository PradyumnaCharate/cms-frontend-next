"use client";

import { useRouter } from "next/navigation";
import useSWR from "swr";
import { Container, Form, Button, Spinner } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

function PageForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async ({ status = "published" }) => {
    // e.preventDefault();
    const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/post`;
    const method = "POST";

    try {
      setLoading(true);
      const response = await fetch(endpoint, {
        method: method,
        headers: {
          Authorization: localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          content,
          status,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit the form");
      }
      alert("Blog created successfully");
      setLoading(false);
      router.push("/dash/blogs");
    } catch (error) {
      setLoading(false);
      console.error("Error submitting form:", error);
      alert("Failed to submit the form");
    }
  };

  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    setContent(data);
  };

  return (
    <Container>
      <h2>Add Blog</h2>
      <Form>
        <Form.Group controlId="formTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            className="form-field"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formCreatedAt" className="mt-3">
          <Form.Label>Created At</Form.Label>
          <CKEditor
            editor={ClassicEditor}
            data={content}
            onChange={handleEditorChange}
          />
        </Form.Group>

        <Button
          disabled={loading}
          variant="primary"
          onClick={() => handleSubmit({ status: "published" })}
          className="mt-4 me-2"
        >
          {loading ? <Spinner animation="grow" size="sm" /> : "Publish"}
        </Button>
        <Button
          disabled={loading}
          variant="secondary"
          onClick={() => handleSubmit({ status: "draft" })}
          className="mt-4"
        >
          {loading ? <Spinner animation="grow" size="sm" /> : "Draft"}
        </Button>
      </Form>
    </Container>
  );
}

export default PageForm;
