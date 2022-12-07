import { api } from "@/service/Api/Api";
import { Temperature } from "@/model/Temperature";
import { TemperatureMapper } from "./TemperatureMapper";

export type TemperatureApiEntity = {
  coord: string;
  value: number;
  date: string;
  country: string;
};

export namespace TemperatureService {
  export function getTemperaturesByYears(
    startYear: number,
    endYear: number
  ): Promise<Temperature.Interface[]> {
    return api
      .get(`data/temp/${startYear}/${endYear}/day`)
      .then(value => {
        return TemperatureMapper.deserializeList(value.data);
      })
      .catch(error => {
        throw error;
      });
  }
}
