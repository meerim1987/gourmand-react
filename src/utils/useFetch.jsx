import { useState, useEffect } from 'react';
import { getUrl } from '../constants/url';

export const useFetch = (uri, lazy = false, options = undefined) => {
  const [data, setData] = useState(null);
  const [fetching, setFetching] = useState(uri !== null);
  const [error, setError] = useState(null);

  const get = async () => {
    if (uri === null) {
      return;
    }
    try {
      let details;

      if (options) {
        details = options;
      }

      const rawResponse = await fetch(getUrl(uri), details);
      const data = await rawResponse.json();
      setData(data);
      setFetching(false);
      setError(null);
    } catch (error) {
      setData(null);
      setFetching(false);
      setError(error);
    }
  };

  useEffect(() => {
    if (!lazy) {
      get();
    }
  }, [uri]);

  return { data, fetching, error, get };
};
