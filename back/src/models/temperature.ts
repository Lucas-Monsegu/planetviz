import mongoose from "mongoose";

const Schema = mongoose.Schema;
const GenericSchema = new Schema({
  country: { type: String},
  coord: {type: String},
  date: { type: Date, required: true },
  value: { type: Number, required: true }
});
;
export const Temperature = mongoose.model("temp", GenericSchema, "temp");
export const TemperatureDaily = mongoose.model("tempDaily", GenericSchema, "tempDaily");
export const TemperatureMonthly = mongoose.model("tempMonthly", GenericSchema, "tempMonthly");
export const TemperatureYearly = mongoose.model("tempYearly", GenericSchema, "tempYearly");

export const Wind = mongoose.model("wind", GenericSchema, "wind");
export const WindDaily = mongoose.model("windDaily", GenericSchema, "windDaily");
export const WindMonthly = mongoose.model("windMonthly", GenericSchema, "windMonthly");
export const WindYearly = mongoose.model("windYearly", GenericSchema, "windYearly");


export const Humidity = mongoose.model("humidity", GenericSchema, "humidity");
export const HumidityDaily = mongoose.model("humidityDaily", GenericSchema, "humidityDaily");
export const HumidityMonthly = mongoose.model("humidityMonthly", GenericSchema, "humidityMonthly");
export const HumidityYearly = mongoose.model("humidityYearly", GenericSchema, "humidityYearly");


export const Pressure = mongoose.model("pressure", GenericSchema, "pressure");
export const PressureDaily = mongoose.model("pressureDaily", GenericSchema, "pressureDaily");
export const PressureMonthly = mongoose.model("pressureMonthly", GenericSchema, "pressureMonthly");
export const PressureYearly = mongoose.model("pressureYearly", GenericSchema, "pressureYearly");