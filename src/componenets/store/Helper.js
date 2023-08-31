export const timeOut = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(() => {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const getJson = async (url) => {
  try {
    const res = await fetch(url);

    const data = await res.json();
    if (!res.ok)
      throw new Error(`We could not find that recipe. Please try another one.`);
    return data;
  } catch (err) {
    throw err;
  }
};
