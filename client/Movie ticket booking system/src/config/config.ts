const environment = {
  DEVELOPMENT: "development",
  PRODUCTION: "production",
};

type Environment = (typeof environment)[keyof typeof environment];

// Set the environment variable
let env: Environment = "development"; // staging API

let API_URL: string;

const defaultOptions = {
  baseURL: "",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Headers": "*",
    "Cross-Origin-Opener-Policy": "same-origin",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  },
};

switch (env) {
  case environment.PRODUCTION:
    API_URL = `http://192.168.24.122:8005/api/v1`;
    break;

  case environment.DEVELOPMENT:
    API_URL = `http://192.168.24.122:8005/api/v1`;
    break;

  default:
    throw new Error(`Unknown environment: ${env}`);
}

defaultOptions.baseURL = API_URL;

export { API_URL, defaultOptions };
