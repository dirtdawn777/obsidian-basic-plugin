import { App, Notice, Plugin, Setting, PluginSettingTab } from 'obsidian';

// Remember to rename these classes and interfaces!

interface MyPluginSettings {
  feature: string;
}

const DEFAULT_SETTINGS: MyPluginSettings = {
  feature: "default",
};

export default class MyPlugin extends Plugin {
  settings: MyPluginSettings = DEFAULT_SETTINGS;

  async onload() {
    await this.loadSettings();

    this.addRibbonIcon('dice', 'Sample Plugin', (_evt: MouseEvent) => {
      // Called when the user clicks the icon.
      new Notice('This is a notice!');
    });

    this.addSettingTab(new SampleSettingTab(this.app, this));
  }

  onunload() {
  }

  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }
}

class SampleSettingTab extends PluginSettingTab {
  plugin: MyPlugin;

  constructor(app: App, plugin: MyPlugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display(): void {
    const { containerEl } = this;

    containerEl.empty();

    new Setting(containerEl)
      .setName('Setting #1')
      .setDesc('It\'s a secret')
      .addText(text => text
        .setPlaceholder('Enter your secret')
        .setValue(this.plugin.settings.feature)
        .onChange(async (value) => {
          this.plugin.settings.feature = value;
          await this.plugin.saveSettings();
        }));
  }
}

