# Sarvam MCP Server

An MCP server implementation that integrates the Sarvam API, providing comprehensive text processing capabilities for Indian languages.

## Features

- **Language Identification**: Detect language and script of input text (e.g., en-IN, hi-IN, Latin, Devanagari)
- **Text Analytics**: Perform deep analysis and answer specific questions about text content
- **Text Translation**: Translate between languages with speaker gender, mode, and script controls
- **Smart Processing**: Support for numerals format, spoken form, and custom processing options

## Tools

- **language-identification**
  - Identifies language and script of input text
  - Inputs:
    - `input` (string): Text to identify language and script

- **text-analytics**
  - Performs comprehensive text analysis
  - Inputs:
    - `text` (string): Text to analyze
    - `questions` (string[]): Array of questions to answer about the text

- **translate-text**
  - Translates text between languages
  - Inputs:
    - `input` (string): Text to translate
    - `source_language_code` (string): Source language code
    - `target_language_code` (string): Target language code
    - `speaker_gender` (string, optional): Speaker's gender
    - `mode` (string, optional): Translation mode
    - `model` (string, optional): Translation model
    - `enable_processing` (boolean, optional): Enable additional processing
    - `output_script` (string, optional): Target script
    - `numerals_format` (string, optional): Format for numerals

- **transliterate-text**
  - Converts text between different scripts
  - Inputs:
    - `input` (string): Text to transliterate
    - `source_language_code` (string): Source language code
    - `target_language_code` (string): Target language code
    - `numerals_format` (string, optional): Format for numerals
    - `spoken_form` (boolean, optional): Enable spoken form
    - `spoken_form_numerals_language` (string, optional): Language for spoken numerals

## Configuration

### Getting an API Key

1. Sign up for a Sarvam API account
2. Generate your API key from the developer dashboard

### Usage with Claude Desktop

Add this to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "sarvam": {
      "command": "npx",
      "args": [
        "-y",
        "sarvam-mcp-server"
      ],
      "env": {
        "SARVAM_API_KEY": "YOUR_API_KEY_HERE"
      }
    }
  }
}
```

### NPM Package

The package is available on npm as `sarvam-mcp-server`. Install it using:

```bash
npm install sarvam-mcp-server
```

### Usage with Docker

The server is available as a Docker image at [shbhtngpl/sarvam-mcp-server](https://hub.docker.com/repository/docker/shbhtngpl/sarvam-mcp-server).

1. Pull the image:
```bash
docker pull shbhtngpl/sarvam-mcp-server
```

2. Run the container:
```bash
docker run -i --rm -e SARVAM_API_KEY=your_api_key_here shbhtngpl/sarvam-mcp-server
```

For Claude Desktop integration, use this configuration in your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "sarvam": {
      "command": "docker",
      "args": [
        "run",
        "-i",
        "--rm",
        "-e",
        "SARVAM_API_KEY",
        "shbhtngpl/sarvam-mcp-server"
      ],
      "env": {
        "SARVAM_API_KEY": "YOUR_API_KEY_HERE"
      }
    }
  }
}
```

## Development

### Local Development

1. Clone the repository:
```bash
git clone https://github.com/Shobhit-Nagpal/sarvam-mcp-server.git
cd sarvam-mcp-server
```

2. Install dependencies:
```bash
npm install
```

3. Run the server:
```bash
npm start
```

## License

This MCP server is licensed under the MIT License. This means you are free to use, modify, and distribute the software, subject to the terms and conditions of the MIT License. For more details, please see the LICENSE file in the project repository.
