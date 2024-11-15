import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

function CreateMarkup({ content, plugins }) {
  const createMarkupF = (htmlContent) => {
    return { __html: htmlContent };
  };

  // State to store dynamically imported plugin components
  const [pluginComponents, setPluginComponents] = useState({});

  useEffect(() => {
    // Dynamically import all plugins and store them in state
    const loadPlugins = async () => {
      const components = {};

      for (const plugin of plugins) {
        try {
          const mod = await import(`@/plugins/${plugin.name}`);
          components[plugin.name] =
            mod.default?.component || (() => <div>Plugin not found</div>);
        } catch (err) {
          console.error(`Failed to load plugin ${plugin.name}`, err);
          components[plugin.name] = () => <div>Error loading plugin</div>;
        }
      }

      setPluginComponents(components);
    };

    loadPlugins();
  }, [plugins]);

  return (
    <>
      {/* Render content with dangerouslySetInnerHTML */}
      <div dangerouslySetInnerHTML={createMarkupF(content)} />
      <>Below Plugins Will be rendered in page</>
      {/* Render plugins */}
      {plugins?.map((plugin, index) => {
        const PluginComponent = pluginComponents[plugin.name];
        if (!PluginComponent) return <div key={index}>Loading...</div>;

        return (
          <div key={index}>
            <>{`Plugin Name:` + plugin.name}</>
            <PluginComponent settings={plugin.config} />
          </div>
        );
      })}
    </>
  );
}

export default CreateMarkup;
