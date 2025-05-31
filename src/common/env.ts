let instance: EnvManager | undefined;

class EnvManager {

  // State
  private SARVAM_API_KEY: string | undefined;

  constructor() {
    if (instance) {
      throw new Error("Only one instance of EnvManager can be created");
    }

    this.setSarvamAPIKey();

    instance = this;
  }

  // Methods

  private setSarvamAPIKey() {
    const sarvamApiKey = process.env.SARVAM_API_KEY;

    if (!sarvamApiKey) {
      throw new Error("Please add your Sarvam API key in the MCP config");
    }

    this.SARVAM_API_KEY = sarvamApiKey;
  }

  public getSarvamAPIKey() {
    return this.SARVAM_API_KEY;
  }
}

const envManager = Object.freeze(new EnvManager());

export default envManager;
