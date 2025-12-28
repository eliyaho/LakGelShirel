"use client";

export function useUiState() {
  const fetchState = async (): Promise<{ open: boolean }> => {
    const res = await fetch("/api/ui-state");
    return res.json();
  };

  const setState = async (open: boolean): Promise<{ success: boolean }> => {
    const res = await fetch("/api/ui-state", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ open }),
    });
    return res.json();
  };

  return { fetchState, setState };
}
