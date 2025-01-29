import { api } from "./constants.js";

//* API FUNCTION
async function httpRequest(dataType, apiMethod, content) {
  let tempMsg;
  let requestMsg = "No message yet...";
  let requestOptions;
  let header = api.defaultHeader
  if (dataType === "theme") {
    if (apiMethod === "PUT") {
      requestOptions = {
        method: apiMethod,
        headers: {
          header,
        },
        body: JSON.stringify({
          website: content,
        }),
      };
      requestMsg = `The theme switched to ${content}`;
    }
  } else if (dataType === "products") {
    if (apiMethod === "POST" || apiMethod === "PUT") {
      requestOptions = {
        method: apiMethod,
        headers: {
          header,
        },
        body: JSON.stringify(content),
      };
      if (apiMethod === "PUT") {
        dataType += "/" + content.id;
        requestMsg = `"${content.title}" has been successfully edited`;
      } else {
        requestMsg = `"${content.title}" added successfully`;
      }
    } else if (apiMethod === "DELETE") {
      requestOptions = {
        method: apiMethod,
      };
      dataType += "/" + content;
      requestMsg = `The product has been successfully deleted`;
    }
  }
  if (apiMethod === "GET") {
    requestOptions = {
      method: apiMethod,
      headers: {
        header,
      },
    };
    content ? (dataType += "/" + content) : dataType;
    requestMsg = `Website refreshed`;
  }
  try {
    const response = await fetch(api.baseUrl + dataType, requestOptions);
    const data = await response.json();
    tempMsg = `${response.status} ${response.statusText} | ${requestMsg}`;
    if (apiMethod != "GET" && dataType != "theme") {
      tempMsg = `Product ID: ${data.id} | ${tempMsg}`;
    }
    console.log(tempMsg);
    return data;
  } catch (error) {
    console.error(`Something wrong happening: `, error);
  }
}


export { httpRequest };