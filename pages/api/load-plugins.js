import fs from "fs";
import path from "path";

export default function handler(req, res) {
  const pluginsDir = path.join(process.cwd(), "plugins");
  const plugins = [];

  fs.readdirSync(pluginsDir).forEach((pluginFolder) => {
    const pluginPath = path.join(pluginsDir, pluginFolder, "config.json");
    console.log(pluginPath, "path");
    if (fs.existsSync(pluginPath)) {
      console.log(plugins, "plugins11111111");
      const config = JSON.parse(fs.readFileSync(pluginPath, "utf8"));
      plugins.push({
        name: pluginFolder,
        config,
        url: `/plugins/${pluginFolder}/index.js`,
      });
    }
  });

  res.status(200).json(plugins);
}
