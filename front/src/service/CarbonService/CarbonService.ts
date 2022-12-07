import { api } from "@/service/Api/Api";
import { Carbon } from "@/model/Carbon";
import { CarbonMapper } from "./CarbonMapper";

export type CarbonApiEntity = {
  coord: string;
  value: number;
  date: string;
  country: string;
};

export namespace CarbonService {
  export function getCarbonsByYears(
    startYear: number,
    endYear: number
  ): Promise<Array<Carbon.Interface>> {
    return api
      .get(`data/co/${startYear}/${endYear}/day`)
      .then(value => {
        return CarbonMapper.deserializeList(value.data);
      })
      .catch(error => {
        throw error;
      });
  }
}
