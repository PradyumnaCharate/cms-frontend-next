"use client";

import { useRouter } from "next/navigation";
import useSWR from "swr";
import {
  Container,
  Form,
  Button,
  Spinner,
  Dropdown,
  Badge,
} from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import PluginConfigurationForm from "@/components/Plugins/PluginConfigurationForm";

function PageForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const fetcher = (url) => {
    let token;
    if (typeof window !== "undefined") {
      token = localStorage.getItem("token");
    }
    console.log(token);
    return fetch(url, {
      headers: {
        Authorization: `${token}`,
      },
    }).then((res) => {
      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }
      return res.json();
    });
  };
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [availablePlugins, setAvailablePlugins] = useState([]);
  const [selectedPlugins, setSelectedPlugins] = useState(new Set());
  const [pluginConfigurations, setPluginConfigurations] = useState([]);
  const { data: d, error: e } = useSWR("/api/load-plugins", fetcher);
  const handleConfigChange = (pluginName, config) => {
    console.log(pluginConfigurations, config);
    setPluginConfigurations((prevConfigs) => {
      const existingPluginIndex = prevConfigs.findIndex(
        (plugin) => plugin.name === pluginName
      );

      if (existingPluginIndex !== -1) {
        // Update the config for an existing plugin
        const updatedConfigs = [...prevConfigs];
        updatedConfigs[existingPluginIndex] = {
          ...updatedConfigs[existingPluginIndex],
          config,
        };
        return updatedConfigs;
      } else {
        // Add a new plugin configuration if it doesn’t exist
        return [...prevConfigs, { name: pluginName, config }];
      }
    });
  };

  useEffect(() => {
    if (d && d.length > 0) {
      setAvailablePlugins(d);
    }
  }, [d]);
  const togglePluginSelection = (pluginName) => {
    setSelectedPlugins((prevSelected) => {
      const newSelected = new Set(prevSelected);
      if (newSelected.has(pluginName)) {
        newSelected.delete(pluginName);
      } else {
        newSelected.add(pluginName);
      }
      return newSelected;
    });
  };

  const handleSubmit = async ({ status = "published" }) => {
    const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/page`;
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
          pluginConfigurations,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit the form");
      }
      alert("Page created successfully");
      setLoading(false);
      router.push("/dash/contentpages");
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
      <h2>Add Page</h2>
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
        <Form.Group controlId="formPlugins" className="mt-3">
          <Form.Label>Configure Plugins</Form.Label>
          <Dropdown>
            <Dropdown.Toggle>
              {selectedPlugins.size > 0
                ? Array.from(selectedPlugins).join(", ")
                : "Select Plugin"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {availablePlugins.map((plugin) => (
                <Dropdown.Item
                  key={plugin.name}
                  eventKey={plugin.name}
                  active={selectedPlugins.has(plugin.name)}
                  onClick={() => togglePluginSelection(plugin.name)}
                >
                  {selectedPlugins.has(plugin.name) ? "✔ " : ""}
                  {plugin.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <div className="mt-2">
            {Array.from(selectedPlugins).map((plugin) => (
              <Badge key={plugin} pill bg="primary" className="me-2">
                {plugin}
              </Badge>
            ))}
          </div>
          {Array.from(selectedPlugins).length > 0 && (
            <div>
              {Array.from(selectedPlugins).map((pluginName) => {
                const plugin = availablePlugins.find(
                  (p) => p.name === pluginName
                );
                return (
                  <PluginConfigurationForm
                    key={pluginName}
                    plugin={plugin}
                    onConfigChange={handleConfigChange}
                  />
                );
              })}
            </div>
          )}
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
