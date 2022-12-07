import { Country } from "@/model/Country";
import { CountryApiEntity } from "./CountryService";

export namespace CountryMapper {
  export const deserialize = (object: CountryApiEntity): Country.Interface => {
    return {
      Name: object.name,
      Code: object.code
    };
  };

  export const deserializeList = (list: CountryApiEntity[]): Country.Interface[] => {
    return list.map(value => deserialize(value));
  };
}
