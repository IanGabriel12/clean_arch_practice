export default class BaseException extends Error {
  status: number;
  title: string;
  message: string;
};