export interface HomeActions {
  loadMessage(): void;
  setMessage(message: string): void;
  setError(error: string): void;
  reset(): void;
}
