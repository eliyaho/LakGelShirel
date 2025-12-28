export function useUiApi() {
  const get = async (): Promise<{ open: boolean }> => {
    const res = await fetch("/api/ui-state");
    return res.json();
  };

  const set = async (open: boolean): Promise<void> => {
    await fetch("/api/ui-state", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ open }),
    });
  };

  return { get, set };
}
