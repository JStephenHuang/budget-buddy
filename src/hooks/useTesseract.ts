import { useState, useEffect } from "react";
import { createWorker } from "tesseract.js";

export const useTesseract = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [logs, setLogs] = useState<Tesseract.LoggerMessage>();
  const [error, setError] = useState<string | null>(null);

  const [worker, setWorker] = useState<Tesseract.Worker>();

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      setWorker(
        await createWorker({
          logger: (m) => setLogs(m),
        })
      );
      setIsLoading(false);
    })();
  }, []);

  return { isLoading, logs, worker, error };
};
