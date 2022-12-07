import { Carbon } from "@/model/Carbon";
import { CarbonApiEntity } from "./CarbonService";

export namespace CarbonMapper {
  export const deserialize = (object: CarbonApiEntity): Carbon.Interface => {
    const coordinates: string[] = object.coord.split(' ')

    return {
      Country: object.country,
      Value: object.value,
      Date: new Date(object.date),
      CoordLat: Number(coordinates[0]),
      CoordLong: Number(coordinates[1]),
    };
  };

  export const deserializeList = (list: CarbonApiEntity[]): Carbon.Interface[] => {
    return list.map(value => deserialize(value));
  };
}