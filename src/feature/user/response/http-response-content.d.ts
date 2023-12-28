export type HttpResponseContent<T> = {
  status: number;
  content: T | string;
};
