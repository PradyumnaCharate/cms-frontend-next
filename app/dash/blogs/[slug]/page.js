"use client";

import { useRouter } from "next/navigation";
import useSWR from "swr";
import { Container, Form, Button, Spinner } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const fetcher = (url) => {
  const token = localStorage.getItem("token");

  return fetch(url, {
    headers: {
      Authorization: `${token}`,
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    return res.json();
  });
};

function PageForm({ params }) {
  const router = useRouter();
  const { slug } = React.use(params);
  const [loading, setLoading] = useState(false);
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/posts/${slug}`,
    fetcher
  );

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  console.log(data);
  useEffect(() => {
    if (data) {
      setTitle(data?.data?.title);
      setContent(data?.data?.content);
    }
  }, [data]);

  const handleSubmit = async ({ status = "published" }) => {
    const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/pages/${slug}`;
    const method = "PUT";

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
      alert("Blog updated successfully");
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

  if (error) return <Container>Error: {error.message}</Container>;
  if (isLoading || !data) return <Container>Loading...</Container>;

  return (
    <Container>
      <h2>Edit Blog</h2>
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
          onClick={() => handleSubmit({ status: "archived" })}
          className="mt-4"
        >
          {loading ? <Spinner animation="grow" size="sm" /> : "Archive"}
        </Button>
      </Form>
    </Container>
  );
}

export default PageForm;
