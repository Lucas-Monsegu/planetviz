import { Temperature } from "@/model/Temperature";
import { TemperatureApiEntity } from "./TemperatureService";

export namespace TemperatureMapper {
  export const deserialize = (object: TemperatureApiEntity): Temperature.Interface => {
    const coordinates: string[] = object.coord.split(' ')

    return {
      Country: object.country,
      Value: object.value,
      Date: new Date(object.date),
      CoordLat: Number(coordinates[0]),
      CoordLong: Number(coordinates[1]),
    };
  };

  export const deserializeList = (list: TemperatureApiEntity[]): Temperature.Interface[] => {
    return list.map(value => deserialize(value));
  };
}
