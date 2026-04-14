"use client";

import { useEffect, useMemo, useState } from "react";

function formatLocation(timeZone) {
  if (!timeZone) {
    return "Location unavailable";
  }

  const city = timeZone.split("/").pop()?.replace(/_/g, " ") || timeZone;
  return city;
}

export function SpecimenInfo() {
  const [now, setNow] = useState(() => new Date());
  const [timeZone, setTimeZone] = useState("America/New_York");

  useEffect(() => {
    const resolvedTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (resolvedTimeZone) {
      setTimeZone(resolvedTimeZone);
    }

    const interval = window.setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => window.clearInterval(interval);
  }, []);

  const formattedDateTime = useMemo(() => {
    return new Intl.DateTimeFormat("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      second: "2-digit",
      timeZoneName: "short",
    }).format(now);
  }, [now]);

  return (
    <div className="specimen-info" aria-label="Specimen capture information">
      <span className="specimen-url">troopzsoulja.com</span>
      <span>{formattedDateTime}</span>
      <span>{formatLocation(timeZone)}</span>
    </div>
  );
}
