"use client";

import { useEffect } from "react";

export function HandshakeListener() {
  useEffect(() => {
    fetch("/api/health")
      .then((res) => res.json())
      .then((data) => {
        console.log("App health check:", data);
      })
      .catch(() => {
        console.log("Health check failed (expected in static mode)");
      });
  }, []);

  return null;
}
