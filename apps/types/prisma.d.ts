export interface DatabaseClient {
  $queryRaw<T = unknown>(query: TemplateStringsArray, ...values: unknown[]): Promise<T>;
  $disconnect(): Promise<void>;
}
