import axios from 'axios';
import { Logger } from '../../logger';
const LOGGER = Logger.getInstance();
enum EPROTOCOL {
  FTP = 'ftp:',
  WS = 'ws:',
  HTTP = 'http:',
  FILE = 'file:'
}

enum ESECURE_PROTOCOL {
  FTPS = 'ftps:',
  WSS = 'wss:',
  HTTPS = 'https:',
  SSH = 'ssh:'
}

export enum EHTTP_METHOD {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  DELETE = 'delete',
  PATCH = 'patch',
  HEAD = 'head'
}

enum EHTTP_STATUS_CODE {
  OK = 200,
  BAD_REQUEST = 400,
  AUTHAURIZATION = 401,
  PERMISSON_DENIED = 403,
  NOT_FOUND = 404,
  METHOD_NOT_ALLOWED = 405,
  INTERNAL_SERVER_ERROR = 500,
  PROXY_ERROR = 502,
  UNREACHABLE_SERVER = -1
}

enum EHTTP_STATUS_TEXT {
  OK = 'OK',
  BAD_REQUEST = 'Bad Request',
  NOT_FOUND = 'Not Found',
  METHOD_NOT_ALLOWED = 'Method not allowed',
  INTERNAL_SERVER_ERROR = 'Internal server error',
  PROXY_ERROR = 'Bad Gateway/Proxy Error',
  UNREACHABLE_SERVER = 'Server not found'
}

interface IURL {
  protocol?: EPROTOCOL | ESECURE_PROTOCOL;
  hostname?: string;
  href?: string;
  pathname?: string;
  port?: number;
  query?: Query;
}

export type Query = {
  [x: string]: string;
};
export type Headers = {
  [x: string]: string;
};

interface IHTTPRequest extends IURL {
  headers: Headers;
  body?: string;
  method: EHTTP_METHOD;
}

interface IHTTPResponse {
  duration: number;
  statusCode: number;
  raison: string;
  headers: Headers;
  body: string;
}

const buildUrl = (params: IHTTPRequest) => {
  const PROTOCOL = params.protocol || window.location.protocol;
  const PATHNAME = params.pathname || window.location.pathname;
  const HOSTNAME = params.hostname || window.location.hostname;
  const PORT = params.port || window.location.port;
  const QUERY = params.query
    ? '?' +
      Object.entries(params.query)
        .map((q) => `${q[0]}=${encodeURIComponent(q[1])}`)
        .join('&')
    : '';

  if (params.href) {
    return params.href + QUERY;
  } else {
    return `${PROTOCOL}//${HOSTNAME}${
      PORT ? `${PORT}:` : ''
    }/${PATHNAME}${QUERY}`;
  }
};

function getStatusTextByCode(statusCode: number) {
  let eStatusCode: EHTTP_STATUS_CODE;
  let sStatusText: EHTTP_STATUS_TEXT;
  switch (statusCode.toString()) {
    case '200':
      eStatusCode = EHTTP_STATUS_CODE.OK;
      sStatusText = EHTTP_STATUS_TEXT.OK;
      break;
    case '400':
      eStatusCode = EHTTP_STATUS_CODE.BAD_REQUEST;
      sStatusText = EHTTP_STATUS_TEXT.BAD_REQUEST;
      break;
    case '404':
      eStatusCode = EHTTP_STATUS_CODE.NOT_FOUND;
      sStatusText = EHTTP_STATUS_TEXT.NOT_FOUND;
      break;
    case '405':
      eStatusCode = EHTTP_STATUS_CODE.METHOD_NOT_ALLOWED;
      sStatusText = EHTTP_STATUS_TEXT.METHOD_NOT_ALLOWED;
      break;
    case '500':
      eStatusCode = EHTTP_STATUS_CODE.INTERNAL_SERVER_ERROR;
      sStatusText = EHTTP_STATUS_TEXT.INTERNAL_SERVER_ERROR;
      break;
    case '502':
      eStatusCode = EHTTP_STATUS_CODE.PROXY_ERROR;
      sStatusText = EHTTP_STATUS_TEXT.PROXY_ERROR;
      break;
    case '-1':
      eStatusCode = EHTTP_STATUS_CODE.UNREACHABLE_SERVER;
      sStatusText = EHTTP_STATUS_TEXT.UNREACHABLE_SERVER;
      break;
    default:
      LOGGER.error('UNKNOWN HTTP STATUS');
      eStatusCode = EHTTP_STATUS_CODE.INTERNAL_SERVER_ERROR;
      sStatusText = EHTTP_STATUS_TEXT.INTERNAL_SERVER_ERROR;
  }
  return { text: sStatusText, code: eStatusCode };
}

export async function request(params: IHTTPRequest): Promise<IHTTPResponse> {
  const url = buildUrl(params);
  const start = Date.now();
  let axiosResponse = await axios
    .request({
      method: params.method,
      url,
      headers: params.headers
    })
    .catch((error) => {
      if (error.response) {
        axiosResponse = error.response;
      }
      LOGGER.error('error', error.response);
    });

  const titi = getStatusTextByCode(axiosResponse ? axiosResponse.status : -1);
  return {
    duration: Date.now() - start,
    statusCode: titi.code,
    raison: titi.text,
    headers: axiosResponse ? axiosResponse.headers : {},
    body: axiosResponse ? axiosResponse.request.responseText : ''
  };
}
