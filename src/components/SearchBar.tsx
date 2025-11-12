import { TextField } from "@mui/material";
import { useState, useEffect } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [input, setInput] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      if (input.length >= 1) onSearch(input);
    }, 500); // debounce 0.5s
    return () => clearTimeout(handler);
  }, [input, onSearch]);

  return (
    <TextField
      fullWidth
      variant="outlined"
      label="Search Anime"
      value={input}
      onChange={(e) => setInput(e.target.value)}
    />
  );
}
