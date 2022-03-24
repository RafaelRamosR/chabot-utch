type Information = {
  id: string;
  code: string;
  messages: string[];
};

type Log = {
  id: string;
  code: string;
  messages: string[];
};

export type DatabaseSchema = {
  info: Information[];
  log: Log[];
};

export const initialSchema = {
  info: [],
  log: [],
}
