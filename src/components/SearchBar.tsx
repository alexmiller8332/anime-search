import React, { useEffect, useState, useMemo } from "react";
import { TextField } from "@mui/material";

interface Props {
  value?: string;
  onChange: (value: string) => void;
  minChars?: number; // minimum characters to start special searching; we still pass empty for top
  debounceMs?: number;
}

export default function SearchBar({ value = "", onChange, minChars = 1, debounceMs = 500 }: Props) {
  const [input, setInput] = useState(value);

  // keep internal input in sync if parent changes (rare)
  useEffect(() => setInput(value), [value]);

  // debounce effect
  useEffect(() => {
    const t = setTimeout(() => {
      // if input length is 0 we still forward (to show top anime)
      // otherwise only forward if meets minChars
      if (input.length === 0 || input.length >= minChars) {
        onChange(input);
      }
    }, debounceMs);
    return () => clearTimeout(t);
  }, [input, debounceMs, onChange, minChars]);

  // small optimization so onChange ref doesn't cause reruns if parent re-creates it
  // (not necessary but harmless)
  const handleChange = useMemo(
    () => (e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value),
    []
  );

  return (
    <TextField
      fullWidth
      variant="outlined"
      placeholder="Type to search anime..."
      value={input}
      onChange={handleChange}
    />
  );
}
