import axios from "axios";
import { useEffect, useState } from "react";

export const useApi = ({ endpoint, method, body }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [response, setResponse] = useState(null);
  const [success, setSuccess] = useState(false);
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const response = await axios({
          method,
          baseURL: "http://localhost:8080",
          url: endpoint,
          data: body,
        });
        setResponse(response);
        setSuccess(true);
      } catch (error) {
        setError(true);
        setSuccess(false);
      } finally {
        setLoading(false);
      }
    };
    fetchApi();
  }, [body, endpoint, method]);
  return { loading, error, response, success };
};
