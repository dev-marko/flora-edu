import { AxiosError } from "axios";

export interface CustomAxiosError {
  axiosError: AxiosError;
  handleGlobally: () => void;
}