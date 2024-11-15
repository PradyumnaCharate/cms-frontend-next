import axios from "axios";
import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";

export default function PluginConfigurationForm({ plugin, onConfigChange }) {
  const [pluginConfig, setPluginConfig] = useState({});

  const handleInputChange = async (e, field) => {
    const { name, value, files } = e.target;
    console.log("in files");
    if (field.formType === "file") {
      const formData = new FormData();
      Array.from(files).forEach((file) => {
        formData.append("image", file); // 'image' should match the field name expected by the API
      });

      try {
        // Upload files to the backend
        const response = await axios.post("/api/upload-images", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        if (response.data.success) {
          const filePaths = response.data.filePaths;
          // Update the plugin configuration with file paths
          setPluginConfig((prev) => ({ ...prev, [name]: filePaths }));
          onConfigChange(plugin.name, { ...pluginConfig, [name]: filePaths });
        }
      } catch (error) {
        console.error("Error uploading files:", error);
      }
    } else {
      console.log("in names");
      setPluginConfig((prev) => ({ ...prev, [name]: value }));
      onConfigChange(plugin.name, pluginConfig);
    }
  };

  useEffect(() => {
    setPluginConfig({});
  }, [plugin]);

  const renderInputField = (field) => {
    switch (field.formType) {
      case "text":
        return (
          <Form.Control
            type="text"
            name={field.name}
            value={pluginConfig[field.name] || ""}
            onChange={(e) => handleInputChange(e, field)}
          />
        );
      case "number":
        return (
          <Form.Control
            type="number"
            name={field.name}
            value={pluginConfig[field.name] || ""}
            onChange={(e) => handleInputChange(e, field)}
          />
        );
      case "file":
        return (
          <Form.Control
            type="file"
            name={field.name}
            multiple={true}
            onChange={(e) => handleInputChange(e, field)}
          />
        );
      case "select":
        return (
          <Form.Control
            as="select"
            name={field.name}
            value={pluginConfig[field.name] || ""}
            onChange={(e) => handleInputChange(e, field)}
          >
            {field.options?.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </Form.Control>
        );
      default:
        return (
          <Form.Control
            type="text"
            name={field.name}
            value={pluginConfig[field.name] || ""}
            onChange={(e) => handleInputChange(e, field)}
          />
        );
    }
  };

  return (
    <div className="mt-3">
      <h5>{plugin.name} Configuration</h5>
      {plugin.config.inputs.map((field) => (
        <Form.Group key={field.name} className="mb-3">
          <Form.Label>{field.label}</Form.Label>
          {renderInputField(field)}
        </Form.Group>
      ))}
    </div>
  );
}
