import { api } from "@/service/Api/Api";
import { Country } from "@/model/Country";
import { CountryMapper } from "./CountryMapper";
import Axios, { AxiosResponse } from "axios";

export type CountryApiEntity = {
  name: string;
  code: string;
};

export namespace CountryService {
  export function getCountries(): Promise<Country.Interface[]> {
    return Axios
      .get(`static/country.json`)
      .then((value: AxiosResponse<CountryApiEntity[]>) => {
        return CountryMapper.deserializeList(value.data);
      })
      .catch((error: any) => {
        throw error;
      });
  }
}
