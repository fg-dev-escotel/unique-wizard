import axios from "axios";

export async function fetch(method, url, body) {
  const token = localStorage.getItem("token");
  
  try {
    const config = {
      method,
      url,
      data: body,
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` })
      },
    };

    const { data } = await axios(config);
    return { ok: true, data };
  } catch (e) {
    console.log(e);
    return { ok: false, response: e.response };
  }
}

export async function fetchSinToken(method, url, body) {
  try {
    const config = {
      method,
      url,
      data: body,
      headers: {
        "Content-Type": "application/json",
      },
    };

    const data = await axios(config);
    return { ok: true, data };
  } catch (e) {
    console.log({ e });
    if (e.response) return { ok: false, response: e.response };
    else return { ok: false };
  }
}

export const postFile = async (url, formData) => {
  const token = localStorage.getItem("token");

  try {
    const config = {
      method: "post",
      url,
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
        ...(token && { Authorization: `Bearer ${token}` })
      },
    };

    const { data } = await axios(config);
    return { ok: true, data };
  } catch (e) {
    console.log({ e });
    if (e.response) return { ok: false, response: e.response };
    else return { ok: false };
  }
};

export async function getFile(url, name) {
  const token = localStorage.getItem("token");

  try {
    const config = {
      url,
      method: "GET",
      responseType: "blob",
      headers: {
        ...(token && { Authorization: `Bearer ${token}` })
      },
    };

    const response = await axios(config);
    
    // Create blob URL and download
    const blob = new Blob([response.data]);
    const downloadUrl = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(downloadUrl);
    
    return { ok: true };
  } catch (e) {
    console.log({ e });
    if (e.response) return { ok: false, response: e.response };
    else return { ok: false };
  }
}