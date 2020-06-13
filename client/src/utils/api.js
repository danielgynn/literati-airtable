import Axios from "axios";

const STATUS_CODES = Object.freeze({
  OK: 200,
});

export async function getData(endpoint, params) {
  const result = await Axios.get(endpoint, { params });

  return returnResult(result);
}

export async function updateData(endpoint, payload, params) {
  const result = await Axios.put(endpoint, payload, { params });

  return returnResult(result);
}

export async function postData(endpoint, payload, params) {
  const result = await Axios.post(endpoint, payload, { params });

  return returnResult(result);
}

export async function deleteData(endpoint, payload) {
  const data = payload ? { data: payload } : null;
  const result = await Axios.delete(endpoint, data);

  return returnResult(result);
}

export async function patchData(endpoint, payload, params) {
  const result = await Axios.patch(endpoint, payload, { params });

  return returnResult(result);
}

function returnResult(result) {
  if (result.status === STATUS_CODES.OK || result.data) {
    return result;
  } else {
    throw new Error(result);
  }
}

export function formatEndpoint(endpoint, data) {
  const regex = /{(.*?)}/g;
  const matches = endpoint.match(regex);

  if (!data && matches && matches.length > 0) {
    endpoint = endpoint.replace(/{{.*?}}/g, "").replace(/\/\//g, "//");

    return endpoint;
  }

  if (matches && matches.length) {
    matches.forEach((match) => {
      endpoint = endpoint.replace(
        new RegExp(match, "g"),
        getProperty(match.replace(/{|}/g, ""), data)
      );
    });
  }

  if (endpoint.indexOf("{") > -1) {
    throw new Error(
      "You seem to be missing an expected property on this endpoint. Ensure you have the follow:",
      matches
    );
  }

  return endpoint;
}

function getProperty(propertyName, obj) {
  let parts = propertyName.split("."),
    length = parts.length,
    i,
    property = obj || this;

  for (i = 0; i < length; i++) {
    property = property[parts[i]];
  }

  return property;
}
