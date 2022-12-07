import Vue from "vue";
import Vuex from "vuex";
import { CarbonService } from "@/service/CarbonService/CarbonService";
import { Carbon } from "@/model/Carbon";
import { Temperature } from "@/model/Temperature";
import { TemperatureService } from "@/service/TemperatureService/TemperatureService";
import { Country } from "@/model/Country";
import { CountryService } from "@/service/CountryService/CountryService";
import { DataEnum } from "@/model/DataEnum/DataEnum";
import { Wind } from "@/model/Wind/Wind";
import { Pressure } from "@/model/Pressure/Pressure";
import { Humidity } from "@/model/Humidity/Humidity";
import { StepEnum } from "@/model/StepEnum/DataEnum";

Vue.use(Vuex);

export type Years = {
  startDate: number;
  endDate: number;
};

export type State = {
  step: StepEnum;
  carbonsByYears: Carbon.Interface[];
  temperaturesByYears: Temperature.Interface[];
  humidityByYears: Humidity.Interface[];
  pressureByYears: Pressure.Interface[];
  windByYears: Wind.Interface[];
  countries: Country.Interface[];
  selectedData:
  | Country.Interface[]
  | Carbon.Interface[]
  | Temperature.Interface[]
  | Wind.Interface[]
  | Pressure.Interface[];
  selectedDataType: DataEnum;
  locations: any;
  startDate: Date;
  endDate: Date;
  usedDate: Date;
};

const state: State = {
  step: StepEnum.Day,
  carbonsByYears: [],
  temperaturesByYears: [],
  humidityByYears: [],
  pressureByYears: [],
  windByYears: [],
  countries: [],
  selectedData: [],
  selectedDataType: DataEnum.Carbon,
  locations: {
    AL: {
      glong: -1.2217304763960306,
      glat: 0.715584993317675,
      name: "Albania",
      lat: 41,
      long: 20,
      alpha2: "AL"
    },
    DZ: {
      glong: -1.5184364492350666,
      glat: 0.4886921905584123,
      name: "Algeria",
      lat: 28,
      long: 3,
      alpha2: "DZ"
    },
    AS: {
      glong: -4.537856055185257,
      glat: -0.2501632776761032,
      name: "American Samoa",
      lat: -14.3333,
      long: -170,
      alpha2: "AS"
    },
    AD: {
      glong: -1.5428710587629872,
      glat: 0.7417649320975901,
      name: "Andorra",
      lat: 42.5,
      long: 1.6,
      alpha2: "AD"
    },
    AO: {
      glong: -1.2479104151759457,
      glat: -0.2181661564992912,
      name: "Angola",
      lat: -12.5,
      long: 18.5,
      alpha2: "AO"
    },
    AI: {
      glong: -2.6732632194143986,
      glat: 0.31852258848896514,
      name: "Anguilla",
      lat: 18.25,
      long: -63.1667,
      alpha2: "AI"
    },
    AQ: {
      glong: -1.5707963267948966,
      glat: -1.5707963267948966,
      name: "Antarctica",
      lat: -90,
      long: 0,
      alpha2: "AQ"
    },
    AG: {
      glong: -2.649409804527392,
      glat: 0.2975786374650332,
      name: "Antigua and Barbuda",
      lat: 17.05,
      long: -61.8,
      alpha2: "AG"
    },
    AR: {
      glong: -2.6878070480712672,
      glat: -0.5934119456780721,
      name: "Argentina",
      lat: -34,
      long: -64,
      alpha2: "AR"
    },
    AM: {
      glong: -0.7853981633974483,
      glat: 0.6981317007977318,
      name: "Armenia",
      lat: 40,
      long: 45,
      alpha2: "AM"
    },
    AW: {
      glong: -2.791945608550013,
      glat: 0.2181661564992912,
      name: "Aruba",
      lat: 12.5,
      long: -69.9667,
      alpha2: "AW"
    },
    AU: {
      glong: 0.7504915783575616,
      glat: -0.47123889803846897,
      name: "Australia",
      lat: -27,
      long: 133,
      alpha2: "AU"
    },
    AT: {
      glong: -1.3380863416387365,
      glat: 0.8261219308342319,
      name: "Austria",
      lat: 47.3333,
      long: 13.3333,
      alpha2: "AT"
    },
    AZ: {
      glong: -0.74176493209759,
      glat: 0.7068583470577035,
      name: "Azerbaijan",
      lat: 40.5,
      long: 47.5,
      alpha2: "AZ"
    },
    BS: {
      glong: -2.897246558310587,
      glat: 0.4232423436086249,
      name: "Bahamas",
      lat: 24.25,
      long: -76,
      alpha2: "BS"
    },
    BH: {
      glong: -0.688532389911763,
      glat: 0.4537856055185257,
      name: "Bahrain",
      lat: 26,
      long: 50.55,
      alpha2: "BH"
    },
    BD: {
      glong: 0.0,
      glat: 0.41887902047863906,
      name: "Bangladesh",
      lat: 24,
      long: 90,
      alpha2: "BD"
    },
    BB: {
      glong: -2.6098484263724364,
      glat: 0.22980226662233738,
      name: "Barbados",
      lat: 13.1667,
      long: -59.5333,
      alpha2: "BB"
    },
    BY: {
      glong: -1.0821041362364843,
      glat: 0.9250245035569946,
      name: "Belarus",
      lat: 53,
      long: 28,
      alpha2: "BY"
    },
    BE: {
      glong: -1.5009831567151233,
      glat: 0.8872084546540335,
      name: "Belgium",
      lat: 50.8333,
      long: 4,
      alpha2: "BE"
    },
    BZ: {
      glong: -3.119776037939864,
      glat: 0.3010692959690218,
      name: "Belize",
      lat: 17.25,
      long: -88.75,
      alpha2: "BZ"
    },
    BJ: {
      glong: -1.5315264186250241,
      glat: 0.1658062789394613,
      name: "Benin",
      lat: 9.5,
      long: 2.25,
      alpha2: "BJ"
    },
    BM: {
      glong: -2.700897017461225,
      glat: 0.5643225430350826,
      name: "Bermuda",
      lat: 32.3333,
      long: -64.75,
      alpha2: "BM"
    },
    BT: {
      glong: 0.008726646259971549,
      glat: 0.4799655442984406,
      name: "Bhutan",
      lat: 27.5,
      long: 90.5,
      alpha2: "BT"
    },
    BO: {
      glong: -2.705260340591211,
      glat: -0.29670597283903605,
      name: "Bolivia, Plurinational State of",
      lat: -17,
      long: -65,
      alpha2: "BO"
    },
    BA: {
      glong: -1.2566370614359172,
      glat: 0.767944870877505,
      name: "Bosnia and Herzegovina",
      lat: 44,
      long: 18,
      alpha2: "BA"
    },
    BW: {
      glong: -1.1519173063162575,
      glat: -0.3839724354387525,
      name: "Botswana",
      lat: -22,
      long: 24,
      alpha2: "BW"
    },
    BV: {
      glong: -1.5114551322270893,
      glat: -0.9500403077258295,
      name: "Bouvet Island",
      lat: -54.4333,
      long: 3.4,
      alpha2: "BV"
    },
    BR: {
      glong: -2.5307274153917776,
      glat: -0.17453292519943295,
      name: "Brazil",
      lat: -10,
      long: -55,
      alpha2: "BR"
    },
    IO: {
      glong: -0.32288591161895086,
      glat: -0.10471975511965977,
      name: "British Indian Ocean Territory",
      lat: -6,
      long: 71.5,
      alpha2: "IO"
    },
    BN: {
      glong: 0.4305151306016852,
      glat: 0.07853981633974483,
      name: "Brunei Darussalam",
      lat: 4.5,
      long: 114.6667,
      alpha2: "BN"
    },
    BG: {
      glong: -1.1344640137963142,
      glat: 0.7504915783575616,
      name: "Bulgaria",
      lat: 43,
      long: 25,
      alpha2: "BG"
    },
    BF: {
      glong: -1.6057029118347832,
      glat: 0.22689280275926285,
      name: "Burkina Faso",
      lat: 13,
      long: -2,
      alpha2: "BF"
    },
    BI: {
      glong: -1.0471975511965979,
      glat: -0.061086523819801536,
      name: "Burundi",
      lat: -3.5,
      long: 30,
      alpha2: "BI"
    },
    KH: {
      glong: 0.2617993877991496,
      glat: 0.22689280275926285,
      name: "Cambodia",
      lat: 13,
      long: 105,
      alpha2: "KH"
    },
    CM: {
      glong: -1.361356816555577,
      glat: 0.10471975511965977,
      name: "Cameroon",
      lat: 6,
      long: 12,
      alpha2: "CM"
    },
    CA: {
      glong: -3.2288591161895095,
      glat: 1.0471975511965976,
      name: "Canada",
      lat: 60,
      long: -95,
      alpha2: "CA"
    },
    CV: {
      glong: -1.9896753472735356,
      glat: 0.2792526803190927,
      name: "Cape Verde",
      lat: 16,
      long: -24,
      alpha2: "CV"
    },
    KY: {
      glong: -2.9757863746503315,
      glat: 0.34033920413889424,
      name: "Cayman Islands",
      lat: 19.5,
      long: -80.5,
      alpha2: "KY"
    },
    CF: {
      glong: -1.2042771838760873,
      glat: 0.12217304763960307,
      name: "Central African Republic",
      lat: 7,
      long: 21,
      alpha2: "CF"
    },
    TD: {
      glong: -1.239183768915974,
      glat: 0.2617993877991494,
      name: "Chad",
      lat: 15,
      long: 19,
      alpha2: "TD"
    },
    CL: {
      glong: -2.8099800957108707,
      glat: -0.5235987755982988,
      name: "Chile",
      lat: -30,
      long: -71,
      alpha2: "CL"
    },
    CN: {
      glong: 0.2617993877991496,
      glat: 0.6108652381980153,
      name: "China",
      lat: 35,
      long: 105,
      alpha2: "CN"
    },
    CX: {
      glong: 0.27343549792219557,
      glat: -0.1832595714594046,
      name: "Christmas Island",
      lat: -10.5,
      long: 105.6667,
      alpha2: "CX"
    },
    CC: {
      glong: 0.11926358377652857,
      glat: -0.2181661564992912,
      name: "Cocos (Keeling) Islands",
      lat: -12.5,
      long: 96.8333,
      alpha2: "CC"
    },
    CO: {
      glong: -2.827433388230814,
      glat: 0.06981317007977318,
      name: "Colombia",
      lat: 4,
      long: -72,
      alpha2: "CO"
    },
    KM: {
      glong: -0.7984881327874057,
      glat: -0.21234897410239412,
      name: "Comoros",
      lat: -12.1667,
      long: 44.25,
      alpha2: "KM"
    },
    CG: {
      glong: -1.3089969389957472,
      glat: -0.017453292519943295,
      name: "Congo",
      lat: -1,
      long: 15,
      alpha2: "CG"
    },
    CD: {
      glong: -1.1344640137963142,
      glat: 0.0,
      name: "Congo, the Democratic Republic of the",
      lat: 0,
      long: 25,
      alpha2: "CD"
    },
    CK: {
      glong: -4.35925127684092,
      glat: -0.370590996063712,
      name: "Cook Islands",
      lat: -21.2333,
      long: -159.7667,
      alpha2: "CK"
    },
    CR: {
      glong: -3.0368728984701336,
      glat: 0.17453292519943295,
      name: "Costa Rica",
      lat: 10,
      long: -84,
      alpha2: "CR"
    },
    CI: {
      glong: -1.658062789394613,
      glat: 0.13962634015954636,
      name: "Côte d'Ivoire",
      lat: 8,
      long: -5,
      alpha2: "CI"
    },
    HR: {
      glong: -1.3002702927357754,
      glat: 0.7883076272605227,
      name: "Croatia",
      lat: 45.1667,
      long: 15.5,
      alpha2: "HR"
    },
    CU: {
      glong: -2.9670597283903604,
      glat: 0.3752457891787808,
      name: "Cuba",
      lat: 21.5,
      long: -80,
      alpha2: "CU"
    },
    CY: {
      glong: -0.9948376736367678,
      glat: 0.6108652381980153,
      name: "Cyprus",
      lat: 35,
      long: 33,
      alpha2: "CY"
    },
    CZ: {
      glong: -1.3002702927357754,
      glat: 0.868301302867179,
      name: "Czech Republic",
      lat: 49.75,
      long: 15.5,
      alpha2: "CZ"
    },
    DK: {
      glong: -1.3962634015954636,
      glat: 0.9773843811168246,
      name: "Denmark",
      lat: 56,
      long: 10,
      alpha2: "DK"
    },
    DJ: {
      glong: -0.8203047484373349,
      glat: 0.20071286397934787,
      name: "Djibouti",
      lat: 11.5,
      long: 43,
      alpha2: "DJ"
    },
    DM: {
      glong: -2.641264352908335,
      glat: 0.2690721747922098,
      name: "Dominica",
      lat: 15.4167,
      long: -61.3333,
      alpha2: "DM"
    },
    DO: {
      glong: -2.8041629133139736,
      glat: 0.3316125578789226,
      name: "Dominican Republic",
      lat: 19,
      long: -70.6667,
      alpha2: "DO"
    },
    EC: {
      glong: -2.923426497090502,
      glat: -0.03490658503988659,
      name: "Ecuador",
      lat: -2,
      long: -77.5,
      alpha2: "EC"
    },
    EG: {
      glong: -1.0471975511965979,
      glat: 0.47123889803846897,
      name: "Egypt",
      lat: 27,
      long: 30,
      alpha2: "EG"
    },
    SV: {
      glong: -3.1226855018029385,
      glat: 0.24143663141613156,
      name: "El Salvador",
      lat: 13.8333,
      long: -88.9167,
      alpha2: "SV"
    },
    GQ: {
      glong: -1.3962634015954636,
      glat: 0.03490658503988659,
      name: "Equatorial Guinea",
      lat: 2,
      long: 10,
      alpha2: "GQ"
    },
    ER: {
      glong: -0.8901179185171081,
      glat: 0.2617993877991494,
      name: "Eritrea",
      lat: 15,
      long: 39,
      alpha2: "ER"
    },
    EE: {
      glong: -1.117010721276371,
      glat: 1.0297442586766543,
      name: "Estonia",
      lat: 59,
      long: 26,
      alpha2: "EE"
    },
    ET: {
      glong: -0.9075712110370514,
      glat: 0.13962634015954636,
      name: "Ethiopia",
      lat: 8,
      long: 38,
      alpha2: "ET"
    },
    FK: {
      glong: -2.600540585471551,
      glat: -0.9032078879070654,
      name: "Falkland Islands (Malvinas)",
      lat: -51.75,
      long: -59,
      alpha2: "FK"
    },
    FO: {
      glong: -1.6929693744344996,
      glat: 1.0821041362364843,
      name: "Faroe Islands",
      lat: 62,
      long: -7,
      alpha2: "FO"
    },
    FJ: {
      glong: 1.4835298641951797,
      glat: -0.3141592653589793,
      name: "Fiji",
      lat: -18,
      long: 175,
      alpha2: "FJ"
    },
    FI: {
      glong: -1.117010721276371,
      glat: 1.117010721276371,
      name: "Finland",
      lat: 64,
      long: 26,
      alpha2: "FI"
    },
    FR: {
      glong: -1.53588974175501,
      glat: 0.8028514559173915,
      name: "France",
      lat: 46,
      long: 2,
      alpha2: "FR"
    },
    GF: {
      glong: -2.4958208303518914,
      glat: 0.06981317007977318,
      name: "French Guiana",
      lat: 4,
      long: -53,
      alpha2: "GF"
    },
    PF: {
      glong: -4.014257279586958,
      glat: -0.2617993877991494,
      name: "French Polynesia",
      lat: -15,
      long: -140,
      alpha2: "PF"
    },
    TF: {
      glong: -0.4014257279586959,
      glat: -0.7504915783575616,
      name: "French Southern Territories",
      lat: -43,
      long: 67,
      alpha2: "TF"
    },
    GA: {
      glong: -1.3657201396855627,
      glat: -0.017453292519943295,
      name: "Gabon",
      lat: -1,
      long: 11.75,
      alpha2: "GA"
    },
    GM: {
      glong: -1.8599397879850412,
      glat: 0.23503825437832038,
      name: "Gambia",
      lat: 13.4667,
      long: -16.5667,
      alpha2: "GM"
    },
    GE: {
      glong: -0.8115781021773633,
      glat: 0.7330382858376184,
      name: "Georgia",
      lat: 42,
      long: 43.5,
      alpha2: "GE"
    },
    DE: {
      glong: -1.413716694115407,
      glat: 0.890117918517108,
      name: "Germany",
      lat: 51,
      long: 9,
      alpha2: "DE"
    },
    GH: {
      glong: -1.6057029118347832,
      glat: 0.13962634015954636,
      name: "Ghana",
      lat: 8,
      long: -2,
      alpha2: "GH"
    },
    GI: {
      glong: -1.6644629117616763,
      glat: 0.6315177192368643,
      name: "Gibraltar",
      lat: 36.1833,
      long: -5.3667,
      alpha2: "GI"
    },
    GR: {
      glong: -1.186823891356144,
      glat: 0.6806784082777885,
      name: "Greece",
      lat: 39,
      long: 22,
      alpha2: "GR"
    },
    GL: {
      glong: -2.2689280275926285,
      glat: 1.2566370614359172,
      name: "Greenland",
      lat: 72,
      long: -40,
      alpha2: "GL"
    },
    GD: {
      glong: -2.647083280634484,
      glat: 0.2114763094763969,
      name: "Grenada",
      lat: 12.1167,
      long: -61.6667,
      alpha2: "GD"
    },
    GP: {
      glong: -2.6456276760383206,
      glat: 0.28361600344907856,
      name: "Guadeloupe",
      lat: 16.25,
      long: -61.5833,
      alpha2: "GP"
    },
    GU: {
      glong: 0.9561489601078095,
      glat: 0.23503825437832038,
      name: "Guam",
      lat: 13.4667,
      long: 144.7833,
      alpha2: "GU"
    },
    GT: {
      glong: -3.1459559767197787,
      glat: 0.27052603405912107,
      name: "Guatemala",
      lat: 15.5,
      long: -90.25,
      alpha2: "GT"
    },
    GG: {
      glong: -1.6154767556459515,
      glat: 0.8639379797371932,
      name: "Guernsey",
      lat: 49.5,
      long: -2.56,
      alpha2: "GG"
    },
    GN: {
      glong: -1.7453292519943295,
      glat: 0.19198621771937624,
      name: "Guinea",
      lat: 11,
      long: -10,
      alpha2: "GN"
    },
    GW: {
      glong: -1.832595714594046,
      glat: 0.20943951023931953,
      name: "Guinea-Bissau",
      lat: 12,
      long: -15,
      alpha2: "GW"
    },
    GY: {
      glong: -2.600540585471551,
      glat: 0.08726646259971647,
      name: "Guyana",
      lat: 5,
      long: -59,
      alpha2: "GY"
    },
    HT: {
      glong: -2.8347061752238742,
      glat: 0.3316125578789226,
      name: "Haiti",
      lat: 19,
      long: -72.4167,
      alpha2: "HT"
    },
    HM: {
      glong: -0.30514114911392465,
      glat: -0.926769832808989,
      name: "Heard Island and McDonald Islands",
      lat: -53.1,
      long: 72.5167,
      alpha2: "HM"
    },
    VA: {
      glong: -1.3535028349216025,
      glat: 0.731292956585624,
      name: "Holy See (Vatican City State)",
      lat: 41.9,
      long: 12.45,
      alpha2: "VA"
    },
    HN: {
      glong: -3.080506129769992,
      glat: 0.2617993877991494,
      name: "Honduras",
      lat: 15,
      long: -86.5,
      alpha2: "HN"
    },
    HK: {
      glong: 0.4217884843417137,
      glat: 0.38833575856873837,
      name: "Hong Kong",
      lat: 22.25,
      long: 114.1667,
      alpha2: "HK"
    },
    HU: {
      glong: -1.2217304763960306,
      glat: 0.8203047484373349,
      name: "Hungary",
      lat: 47,
      long: 20,
      alpha2: "HU"
    },
    IS: {
      glong: -1.8849555921538759,
      glat: 1.1344640137963142,
      name: "Iceland",
      lat: 65,
      long: -18,
      alpha2: "IS"
    },
    IN: {
      glong: -0.2268928027592627,
      glat: 0.3490658503988659,
      name: "India",
      lat: 20,
      long: 77,
      alpha2: "IN"
    },
    ID: {
      glong: 0.5235987755982987,
      glat: -0.08726646259971647,
      name: "Indonesia",
      lat: -5,
      long: 120,
      alpha2: "ID"
    },
    IR: {
      glong: -0.6457718232379019,
      glat: 0.5585053606381855,
      name: "Iran, Islamic Republic of",
      lat: 32,
      long: 53,
      alpha2: "IR"
    },
    IQ: {
      glong: -0.8028514559173916,
      glat: 0.5759586531581288,
      name: "Iraq",
      lat: 33,
      long: 44,
      alpha2: "IQ"
    },
    IE: {
      glong: -1.710422666954443,
      glat: 0.9250245035569946,
      name: "Ireland",
      lat: 53,
      long: -8,
      alpha2: "IE"
    },
    IM: {
      glong: -1.6502088077606385,
      glat: 0.9464920533565249,
      name: "Isle of Man",
      lat: 54.23,
      long: -4.55,
      alpha2: "IM"
    },
    IL: {
      glong: -0.964294411726867,
      glat: 0.5497787143782138,
      name: "Israel",
      lat: 31.5,
      long: 34.75,
      alpha2: "IL"
    },
    IT: {
      glong: -1.3468129878987083,
      glat: 0.7475821144944872,
      name: "Italy",
      lat: 42.8333,
      long: 12.8333,
      alpha2: "IT"
    },
    JM: {
      glong: -2.923426497090502,
      glat: 0.31852258848896514,
      name: "Jamaica",
      lat: 18.25,
      long: -77.5,
      alpha2: "JM"
    },
    JP: {
      glong: 0.837758040957278,
      glat: 0.6283185307179586,
      name: "Japan",
      lat: 36,
      long: 138,
      alpha2: "JP"
    },
    JE: {
      glong: -1.6079718398623757,
      glat: 0.8588765249064096,
      name: "Jersey",
      lat: 49.21,
      long: -2.13,
      alpha2: "JE"
    },
    JO: {
      glong: -0.9424777960769379,
      glat: 0.5410520681182421,
      name: "Jordan",
      lat: 31,
      long: 36,
      alpha2: "JO"
    },
    KZ: {
      glong: -0.38397243543875237,
      glat: 0.8377580409572781,
      name: "Kazakhstan",
      lat: 48,
      long: 68,
      alpha2: "KZ"
    },
    KE: {
      glong: -0.9075712110370514,
      glat: 0.017453292519943295,
      name: "Kenya",
      lat: 1,
      long: 38,
      alpha2: "KE"
    },
    KI: {
      glong: 1.4486232791552935,
      glat: 0.02472607951300367,
      name: "Kiribati",
      lat: 1.4167,
      long: 173,
      alpha2: "KI"
    },
    KP: {
      glong: 0.6457718232379022,
      glat: 0.6981317007977318,
      name: "Korea, Democratic People's Republic of",
      lat: 40,
      long: 127,
      alpha2: "KP"
    },
    KR: {
      glong: 0.6544984694978737,
      glat: 0.6457718232379019,
      name: "Korea, Republic of",
      lat: 37,
      long: 127.5,
      alpha2: "KR"
    },
    KW: {
      glong: -0.7390055665501871,
      glat: 0.5120359693038363,
      name: "Kuwait",
      lat: 29.3375,
      long: 47.6581,
      alpha2: "KW"
    },
    KG: {
      glong: -0.26179938779914935,
      glat: 0.715584993317675,
      name: "Kyrgyzstan",
      lat: 41,
      long: 75,
      alpha2: "KG"
    },
    LA: {
      glong: 0.2617993877991496,
      glat: 0.3141592653589793,
      name: "Lao People's Democratic Republic",
      lat: 18,
      long: 105,
      alpha2: "LA"
    },
    LV: {
      glong: -1.1344640137963142,
      glat: 0.9948376736367678,
      name: "Latvia",
      lat: 57,
      long: 25,
      alpha2: "LV"
    },
    LB: {
      glong: -0.9453872599400125,
      glat: 0.5905024818149975,
      name: "Lebanon",
      lat: 33.8333,
      long: 35.8333,
      alpha2: "LB"
    },
    LS: {
      glong: -1.0733774899765127,
      glat: -0.5148721293383272,
      name: "Lesotho",
      lat: -29.5,
      long: 28.5,
      alpha2: "LS"
    },
    LR: {
      glong: -1.7366026057343578,
      glat: 0.11344640137963143,
      name: "Liberia",
      lat: 6.5,
      long: -9.5,
      alpha2: "LR"
    },
    LY: {
      glong: -1.2740903539558606,
      glat: 0.4363323129985824,
      name: "Libyan Arab Jamahiriya",
      lat: 25,
      long: 17,
      alpha2: "LY"
    },
    LI: {
      glong: -1.4044088532145211,
      glat: 0.8232142123004094,
      name: "Liechtenstein",
      lat: 47.1667,
      long: 9.5333,
      alpha2: "LI"
    },
    LT: {
      glong: -1.1519173063162575,
      glat: 0.9773843811168246,
      name: "Lithuania",
      lat: 56,
      long: 24,
      alpha2: "LT"
    },
    LU: {
      glong: -1.4631671078121622,
      glat: 0.868301302867179,
      name: "Luxembourg",
      lat: 49.75,
      long: 6.1667,
      alpha2: "LU"
    },
    MO: {
      glong: 0.41102503884466457,
      glat: 0.386881899301827,
      name: "Macao",
      lat: 22.1667,
      long: 113.55,
      alpha2: "MO"
    },
    MK: {
      glong: -1.186823891356144,
      glat: 0.7301288219745439,
      name: "Macedonia, the former Yugoslav Republic of",
      lat: 41.8333,
      long: 22,
      alpha2: "MK"
    },
    MG: {
      glong: -0.7504915783575616,
      glat: -0.3490658503988659,
      name: "Madagascar",
      lat: -20,
      long: 47,
      alpha2: "MG"
    },
    MW: {
      glong: -0.9773843811168245,
      glat: -0.23561944901923448,
      name: "Malawi",
      lat: -13.5,
      long: 34,
      alpha2: "MW"
    },
    MY: {
      glong: 0.39269908169872414,
      glat: 0.04363323129985824,
      name: "Malaysia",
      lat: 2.5,
      long: 112.5,
      alpha2: "MY"
    },
    MV: {
      glong: -0.296705972839036,
      glat: 0.05672320068981571,
      name: "Maldives",
      lat: 3.25,
      long: 73,
      alpha2: "MV"
    },
    ML: {
      glong: -1.6406094968746698,
      glat: 0.29670597283903605,
      name: "Mali",
      lat: 17,
      long: -4,
      alpha2: "ML"
    },
    MT: {
      glong: -1.3162697259888074,
      glat: 0.6254090668548841,
      name: "Malta",
      lat: 35.8333,
      long: 14.5833,
      alpha2: "MT"
    },
    MH: {
      glong: 1.3613568165555772,
      glat: 0.15707963267948966,
      name: "Marshall Islands",
      lat: 9,
      long: 168,
      alpha2: "MH"
    },
    MQ: {
      glong: -2.6354471705114375,
      glat: 0.2559822054022523,
      name: "Martinique",
      lat: 14.6667,
      long: -61,
      alpha2: "MQ"
    },
    MR: {
      glong: -1.7802358370342162,
      glat: 0.3490658503988659,
      name: "Mauritania",
      lat: 20,
      long: -12,
      alpha2: "MR"
    },
    MU: {
      glong: -0.56635934227216,
      glat: -0.35401036816976583,
      name: "Mauritius",
      lat: -20.2833,
      long: 57.55,
      alpha2: "MU"
    },
    YT: {
      glong: -0.7824886995343738,
      glat: -0.2239833388961883,
      name: "Mayotte",
      lat: -12.8333,
      long: 45.1667,
      alpha2: "YT"
    },
    MX: {
      glong: -3.3510321638291125,
      glat: 0.40142572795869574,
      name: "Mexico",
      lat: 23,
      long: -102,
      alpha2: "MX"
    },
    FM: {
      glong: 1.19118721448613,
      glat: 0.12071918837269179,
      name: "Micronesia, Federated States of",
      lat: 6.9167,
      long: 158.25,
      alpha2: "FM"
    },
    MD: {
      glong: -1.064650843716541,
      glat: 0.8203047484373349,
      name: "Moldova, Republic of",
      lat: 47,
      long: 29,
      alpha2: "MD"
    },
    MC: {
      glong: -1.4416419621473162,
      glat: 0.7632900777624361,
      name: "Monaco",
      lat: 43.7333,
      long: 7.4,
      alpha2: "MC"
    },
    MN: {
      glong: 0.2617993877991496,
      glat: 0.8028514559173915,
      name: "Mongolia",
      lat: 46,
      long: 105,
      alpha2: "MN"
    },
    ME: {
      glong: -1.239183768915974,
      glat: 0.7330382858376184,
      name: "Montenegro",
      lat: 42,
      long: 19,
      alpha2: "ME"
    },
    MS: {
      glong: -2.6563911215353695,
      glat: 0.29234264970905016,
      name: "Montserrat",
      lat: 16.75,
      long: -62.2,
      alpha2: "MS"
    },
    MA: {
      glong: -1.658062789394613,
      glat: 0.5585053606381855,
      name: "Morocco",
      lat: 32,
      long: -5,
      alpha2: "MA"
    },
    MZ: {
      glong: -0.9599310885968813,
      glat: -0.31852258848896514,
      name: "Mozambique",
      lat: -18.25,
      long: 35,
      alpha2: "MZ"
    },
    MM: {
      glong: 0.13962634015954634,
      glat: 0.3839724354387525,
      name: "Myanmar",
      lat: 22,
      long: 98,
      alpha2: "MM"
    },
    NA: {
      glong: -1.2740903539558606,
      glat: -0.3839724354387525,
      name: "Namibia",
      lat: -22,
      long: 17,
      alpha2: "NA"
    },
    NR: {
      glong: 1.342449664768722,
      glat: -0.00930784090088576,
      name: "Nauru",
      lat: -0.5333,
      long: 166.9167,
      alpha2: "NR"
    },
    NP: {
      glong: -0.1047197551196597,
      glat: 0.4886921905584123,
      name: "Nepal",
      lat: 28,
      long: 84,
      alpha2: "NP"
    },
    NL: {
      glong: -1.4704398948052226,
      glat: 0.9162978572970231,
      name: "Netherlands",
      lat: 52.5,
      long: 5.75,
      alpha2: "NL"
    },
    AN: {
      glong: -2.770710187540998,
      glat: 0.21380283336930536,
      name: "Netherlands Antilles",
      lat: 12.25,
      long: -68.75,
      alpha2: "AN"
    },
    NC: {
      glong: 1.317723585255719,
      glat: -0.3752457891787808,
      name: "New Caledonia",
      lat: -21.5,
      long: 165.5,
      alpha2: "NC"
    },
    NZ: {
      glong: 1.4660765716752366,
      glat: -0.715584993317675,
      name: "New Zealand",
      lat: -41,
      long: 174,
      alpha2: "NZ"
    },
    NI: {
      glong: -3.0543261909900767,
      glat: 0.22689280275926285,
      name: "Nicaragua",
      lat: 13,
      long: -85,
      alpha2: "NI"
    },
    NE: {
      glong: -1.4311699866353502,
      glat: 0.2792526803190927,
      name: "Niger",
      lat: 16,
      long: 8,
      alpha2: "NE"
    },
    NG: {
      glong: -1.4311699866353502,
      glat: 0.17453292519943295,
      name: "Nigeria",
      lat: 10,
      long: 8,
      alpha2: "NG"
    },
    NU: {
      glong: -4.535529531292348,
      glat: -0.33219375251983674,
      name: "Niue",
      lat: -19.0333,
      long: -169.8667,
      alpha2: "NU"
    },
    NF: {
      glong: 1.3604841519295796,
      glat: -0.5067266777192696,
      name: "Norfolk Island",
      lat: -29.0333,
      long: 167.95,
      alpha2: "NF"
    },
    MP: {
      glong: 0.9730210579868386,
      glat: 0.26529004630313807,
      name: "Northern Mariana Islands",
      lat: 15.2,
      long: 145.75,
      alpha2: "MP"
    },
    NO: {
      glong: -1.3962634015954636,
      glat: 1.0821041362364843,
      name: "Norway",
      lat: 62,
      long: 10,
      alpha2: "NO"
    },
    OM: {
      glong: -0.5759586531581288,
      glat: 0.3665191429188092,
      name: "Oman",
      lat: 21,
      long: 57,
      alpha2: "OM"
    },
    PK: {
      glong: -0.34906585039886595,
      glat: 0.5235987755982988,
      name: "Pakistan",
      lat: 30,
      long: 70,
      alpha2: "PK"
    },
    PW: {
      glong: 0.7766715171374767,
      glat: 0.1308996938995747,
      name: "Palau",
      lat: 7.5,
      long: 134.5,
      alpha2: "PW"
    },
    PS: {
      glong: -0.9555677654668955,
      glat: 0.5585053606381855,
      name: "Palestinian Territory, Occupied",
      lat: 32,
      long: 35.25,
      alpha2: "PS"
    },
    PA: {
      glong: -2.9670597283903604,
      glat: 0.15707963267948966,
      name: "Panama",
      lat: 9,
      long: -80,
      alpha2: "PA"
    },
    PG: {
      glong: 0.9948376736367681,
      glat: -0.10471975511965977,
      name: "Papua New Guinea",
      lat: -6,
      long: 147,
      alpha2: "PG"
    },
    PY: {
      glong: -2.5830872929516078,
      glat: -0.40142572795869574,
      name: "Paraguay",
      lat: -23,
      long: -58,
      alpha2: "PY"
    },
    PE: {
      glong: -2.897246558310587,
      glat: -0.17453292519943295,
      name: "Peru",
      lat: -10,
      long: -76,
      alpha2: "PE"
    },
    PH: {
      glong: 0.5585053606381853,
      glat: 0.22689280275926285,
      name: "Philippines",
      lat: 13,
      long: 122,
      alpha2: "PH"
    },
    PN: {
      glong: -3.7943457938356726,
      glat: -0.4310963252425994,
      name: "Pitcairn",
      lat: -24.7,
      long: -127.4,
      alpha2: "PN"
    },
    PL: {
      glong: -1.2217304763960306,
      glat: 0.9075712110370514,
      name: "Poland",
      lat: 52,
      long: 20,
      alpha2: "PL"
    },
    PT: {
      glong: -1.710422666954443,
      glat: 0.6894050545377601,
      name: "Portugal",
      lat: 39.5,
      long: -8,
      alpha2: "PT"
    },
    PR: {
      glong: -2.7314402793711254,
      glat: 0.31852258848896514,
      name: "Puerto Rico",
      lat: 18.25,
      long: -66.5,
      alpha2: "PR"
    },
    QA: {
      glong: -0.6763150851478027,
      glat: 0.445058959258554,
      name: "Qatar",
      lat: 25.5,
      long: 51.25,
      alpha2: "QA"
    },
    RE: {
      glong: -0.6003932626860494,
      glat: -0.36826447217080355,
      name: "Réunion",
      lat: -21.1,
      long: 55.6,
      alpha2: "RE"
    },
    RO: {
      glong: -1.1344640137963142,
      glat: 0.8028514559173915,
      name: "Romania",
      lat: 46,
      long: 25,
      alpha2: "RO"
    },
    RU: {
      glong: 0.17453292519943298,
      glat: 1.0471975511965976,
      name: "Russian Federation",
      lat: 60,
      long: 100,
      alpha2: "RU"
    },
    RW: {
      glong: -1.0471975511965979,
      glat: -0.03490658503988659,
      name: "Rwanda",
      lat: -2,
      long: 30,
      alpha2: "RW"
    },
    SH: {
      glong: -1.6702800941585734,
      glat: -0.2780885457080125,
      name: "Saint Helena, Ascension and Tristan da Cunha",
      lat: -15.9333,
      long: -5.7,
      alpha2: "SH"
    },
    KN: {
      glong: -2.6659904324213386,
      glat: 0.3025231552359331,
      name: "Saint Kitts and Nevis",
      lat: 17.3333,
      long: -62.75,
      alpha2: "KN"
    },
    LC: {
      glong: -2.6377736944043457,
      glat: 0.24230929604212875,
      name: "Saint Lucia",
      lat: 13.8833,
      long: -61.1333,
      alpha2: "LC"
    },
    PM: {
      glong: -2.5539978903086182,
      glat: 0.8173952845742604,
      name: "Saint Pierre and Miquelon",
      lat: 46.8333,
      long: -56.3333,
      alpha2: "PM"
    },
    VC: {
      glong: -2.6389378290154264,
      glat: 0.23125612588924865,
      name: "Saint Vincent and the Grenadines",
      lat: 13.25,
      long: -61.2,
      alpha2: "VC"
    },
    WS: {
      glong: -4.578579822622041,
      glat: -0.23707330828614576,
      name: "Samoa",
      lat: -13.5833,
      long: -172.3333,
      alpha2: "WS"
    },
    SM: {
      glong: -1.3540840295625167,
      glat: 0.7638730177326022,
      name: "San Marino",
      lat: 43.7667,
      long: 12.4167,
      alpha2: "SM"
    },
    ST: {
      glong: -1.4486232791552935,
      glat: 0.017453292519943295,
      name: "Sao Tome and Principe",
      lat: 1,
      long: 7,
      alpha2: "ST"
    },
    SA: {
      glong: -0.7853981633974483,
      glat: 0.4363323129985824,
      name: "Saudi Arabia",
      lat: 25,
      long: 45,
      alpha2: "SA"
    },
    SN: {
      glong: -1.8151424220741026,
      glat: 0.24434609527920614,
      name: "Senegal",
      lat: 14,
      long: -14,
      alpha2: "SN"
    },
    RS: {
      glong: -1.2042771838760873,
      glat: 0.767944870877505,
      name: "Serbia",
      lat: 44,
      long: 21,
      alpha2: "RS"
    },
    SC: {
      glong: -0.5992291280749692,
      glat: -0.07999367560665611,
      name: "Seychelles",
      lat: -4.5833,
      long: 55.6667,
      alpha2: "SC"
    },
    SL: {
      glong: -1.7715091907742444,
      glat: 0.14835298641951802,
      name: "Sierra Leone",
      lat: 8.5,
      long: -11.5,
      alpha2: "SL"
    },
    SG: {
      glong: 0.24085543677521737,
      glat: 0.023853414887006503,
      name: "Singapore",
      lat: 1.3667,
      long: 103.8,
      alpha2: "SG"
    },
    SK: {
      glong: -1.2304571226560024,
      glat: 0.8493941510803243,
      name: "Slovakia",
      lat: 48.6667,
      long: 19.5,
      alpha2: "SK"
    },
    SI: {
      glong: -1.3089969389957472,
      glat: 0.8028514559173915,
      name: "Slovenia",
      lat: 46,
      long: 15,
      alpha2: "SI"
    },
    SB: {
      glong: 1.2042771838760875,
      glat: -0.13962634015954636,
      name: "Solomon Islands",
      lat: -8,
      long: 159,
      alpha2: "SB"
    },
    SO: {
      glong: -0.7155849933176751,
      glat: 0.17453292519943295,
      name: "Somalia",
      lat: 10,
      long: 49,
      alpha2: "SO"
    },
    ZA: {
      glong: -1.1519173063162575,
      glat: -0.5061454830783556,
      name: "South Africa",
      lat: -29,
      long: 24,
      alpha2: "ZA"
    },
    GS: {
      glong: -2.2165681500327983,
      glat: -0.9512044423369095,
      name: "South Georgia and the South Sandwich Islands",
      lat: -54.5,
      long: -37,
      alpha2: "GS"
    },
    ES: {
      glong: -1.6406094968746698,
      glat: 0.6981317007977318,
      name: "Spain",
      lat: 40,
      long: -4,
      alpha2: "ES"
    },
    LK: {
      glong: -0.15707963267948966,
      glat: 0.12217304763960307,
      name: "Sri Lanka",
      lat: 7,
      long: 81,
      alpha2: "LK"
    },
    SD: {
      glong: -1.0471975511965979,
      glat: 0.2617993877991494,
      name: "Sudan",
      lat: 15,
      long: 30,
      alpha2: "SD"
    },
    SR: {
      glong: -2.548180707911721,
      glat: 0.06981317007977318,
      name: "Suriname",
      lat: 4,
      long: -56,
      alpha2: "SR"
    },
    SJ: {
      glong: -1.2217304763960306,
      glat: 1.361356816555577,
      name: "Svalbard and Jan Mayen",
      lat: 78,
      long: 20,
      alpha2: "SJ"
    },
    SZ: {
      glong: -1.0210176124166828,
      glat: -0.4625122517784973,
      name: "Swaziland",
      lat: -26.5,
      long: 31.5,
      alpha2: "SZ"
    },
    SE: {
      glong: -1.3089969389957472,
      glat: 1.0821041362364843,
      name: "Sweden",
      lat: 62,
      long: 15,
      alpha2: "SE"
    },
    CH: {
      glong: -1.4311699866353502,
      glat: 0.8203047484373349,
      name: "Switzerland",
      lat: 47,
      long: 8,
      alpha2: "CH"
    },
    SY: {
      glong: -0.9075712110370514,
      glat: 0.6108652381980153,
      name: "Syrian Arab Republic",
      lat: 35,
      long: 38,
      alpha2: "SY"
    },
    TW: {
      glong: 0.5410520681182422,
      glat: 0.41015237421866746,
      name: "Taiwan, Province of China",
      lat: 23.5,
      long: 121,
      alpha2: "TW"
    },
    TJ: {
      glong: -0.33161255787892263,
      glat: 0.6806784082777885,
      name: "Tajikistan",
      lat: 39,
      long: 71,
      alpha2: "TJ"
    },
    TZ: {
      glong: -0.9599310885968813,
      glat: -0.10471975511965977,
      name: "Tanzania, United Republic of",
      lat: -6,
      long: 35,
      alpha2: "TZ"
    },
    TH: {
      glong: 0.17453292519943298,
      glat: 0.2617993877991494,
      name: "Thailand",
      lat: 15,
      long: 100,
      alpha2: "TH"
    },
    TL: {
      glong: 0.6198833544430702,
      glat: -0.1492256510455152,
      name: "Timor-Leste",
      lat: -8.55,
      long: 125.5167,
      alpha2: "TL"
    },
    TG: {
      glong: -1.5504335704118788,
      glat: 0.13962634015954636,
      name: "Togo",
      lat: 8,
      long: 1.1667,
      alpha2: "TG"
    },
    TK: {
      glong: -4.572762640225143,
      glat: -0.15707963267948966,
      name: "Tokelau",
      lat: -9,
      long: -172,
      alpha2: "TK"
    },
    TO: {
      glong: -4.625122517784973,
      glat: -0.3490658503988659,
      name: "Tonga",
      lat: -20,
      long: -175,
      alpha2: "TO"
    },
    TT: {
      glong: -2.6354471705114375,
      glat: 0.19198621771937624,
      name: "Trinidad and Tobago",
      lat: 11,
      long: -61,
      alpha2: "TT"
    },
    TN: {
      glong: -1.413716694115407,
      glat: 0.5934119456780721,
      name: "Tunisia",
      lat: 34,
      long: 9,
      alpha2: "TN"
    },
    TR: {
      glong: -0.9599310885968813,
      glat: 0.6806784082777885,
      name: "Turkey",
      lat: 39,
      long: 35,
      alpha2: "TR"
    },
    TM: {
      glong: -0.5235987755982989,
      glat: 0.6981317007977318,
      name: "Turkmenistan",
      lat: 40,
      long: 60,
      alpha2: "TM"
    },
    TC: {
      glong: -2.8201606012377534,
      glat: 0.37960911230876665,
      name: "Turks and Caicos Islands",
      lat: 21.75,
      long: -71.5833,
      alpha2: "TC"
    },
    TV: {
      glong: 1.5358897417550104,
      glat: -0.13962634015954636,
      name: "Tuvalu",
      lat: -8,
      long: 178,
      alpha2: "TV"
    },
    UG: {
      glong: -1.0122909661567112,
      glat: 0.017453292519943295,
      name: "Uganda",
      lat: 1,
      long: 32,
      alpha2: "UG"
    },
    UA: {
      glong: -1.0122909661567112,
      glat: 0.8552113334772214,
      name: "Ukraine",
      lat: 49,
      long: 32,
      alpha2: "UA"
    },
    AE: {
      glong: -0.6283185307179586,
      glat: 0.41887902047863906,
      name: "United Arab Emirates",
      lat: 24,
      long: 54,
      alpha2: "AE"
    },
    GB: {
      glong: -1.6057029118347832,
      glat: 0.9424777960769379,
      name: "United Kingdom",
      lat: 54,
      long: -2,
      alpha2: "GB"
    },
    US: {
      glong: -3.263765701229396,
      glat: 0.6632251157578452,
      name: "United States",
      lat: 38,
      long: -97,
      alpha2: "US"
    },
    UM: {
      glong: 1.3369222070276563,
      glat: 0.3365570756498225,
      name: "United States Minor Outlying Islands",
      lat: 19.2833,
      long: 166.6,
      alpha2: "UM"
    },
    UY: {
      glong: -2.548180707911721,
      glat: -0.5759586531581288,
      name: "Uruguay",
      lat: -33,
      long: -56,
      alpha2: "UY"
    },
    UZ: {
      glong: -0.45378560551852565,
      glat: 0.715584993317675,
      name: "Uzbekistan",
      lat: 41,
      long: 64,
      alpha2: "UZ"
    },
    VU: {
      glong: 1.343903524035634,
      glat: -0.2792526803190927,
      name: "Vanuatu",
      lat: -16,
      long: 167,
      alpha2: "VU"
    },
    VE: {
      glong: -2.7227136331111543,
      glat: 0.13962634015954636,
      name: "Venezuela, Bolivarian Republic of",
      lat: 8,
      long: -66,
      alpha2: "VE"
    },
    VN: {
      glong: 0.27925268031909267,
      glat: 0.2792526803190927,
      name: "Viet Nam",
      lat: 16,
      long: 106,
      alpha2: "VN"
    },
    VG: {
      glong: -2.6965336943312392,
      glat: 0.32288591161895097,
      name: "Virgin Islands, British",
      lat: 18.5,
      long: -64.5,
      alpha2: "VG"
    },
    VI: {
      glong: -2.7023508767281363,
      glat: 0.3199764477558764,
      name: "Virgin Islands, U.S.",
      lat: 18.3333,
      long: -64.8333,
      alpha2: "VI"
    },
    WF: {
      glong: -4.646066468808905,
      glat: -0.23212879051524585,
      name: "Wallis and Futuna",
      lat: -13.3,
      long: -176.2,
      alpha2: "WF"
    },
    EH: {
      glong: -1.7976891295541595,
      glat: 0.4276056667386107,
      name: "Western Sahara",
      lat: 24.5,
      long: -13,
      alpha2: "EH"
    },
    YE: {
      glong: -0.7330382858376184,
      glat: 0.2617993877991494,
      name: "Yemen",
      lat: 15,
      long: 48,
      alpha2: "YE"
    },
    ZM: {
      glong: -1.0471975511965979,
      glat: -0.2617993877991494,
      name: "Zambia",
      lat: -15,
      long: 30,
      alpha2: "ZM"
    },
    ZW: {
      glong: -1.0471975511965979,
      glat: -0.3490658503988659,
      name: "Zimbabwe",
      lat: -20,
      long: 30,
      alpha2: "ZW"
    },
    AF: {
      glong: -0.43633231299858233,
      glat: 0.5759586531581288,
      name: "Afghanistan",
      lat: 33,
      long: 65,
      alpha2: "AF"
    }
  },
  startDate: new Date(new Date().setHours(1, 0, 0, 0)),
  endDate: new Date(new Date().setDate(new Date().getDate() + 2)),
  usedDate: new Date()
};

export default new Vuex.Store({
  state: state,
  mutations: {
    FETCH_CARBONS_BY_YEARS(state: State, carbons: Carbon.Interface[]) {
      state.carbonsByYears = carbons;
    },
    FETCH_TEMPERATURES_BY_YEARS(
      state: State,
      temperatures: Temperature.Interface[]
    ) {
      state.temperaturesByYears = temperatures;
    },
    FETCH_COUNTRIES(state: State, countries: Country.Interface[]) {
      state.countries = countries;
    },
    FETCH_SELECTED_DATA(state: State, selectedDataType: DataEnum) {
      state.selectedDataType = selectedDataType;
    },
    CHANGE_SELECTED_DATA(state: State) {
      switch (state.selectedDataType) {
        case DataEnum.Carbon:
          state.selectedData = state.carbonsByYears;
          break;
        case DataEnum.Humidity:
          state.selectedData = state.humidityByYears;
          break;
        case DataEnum.Pressure:
          state.selectedData = state.pressureByYears;
          break;
        case DataEnum.Temperature:
          state.selectedData = state.temperaturesByYears;
          break;
      }
    },
    CHANGE_STEP(state: State, selectedStep: StepEnum) {
      state.step = selectedStep;
    },
    CHANGE_START_DATE(state: State, startDate: Date) {
      state.startDate = startDate;
    },
    CHANGE_END_DATE(state: State, endDate: Date) {
      state.endDate = endDate;
    },
    CHANGE_USED_DATE(state: State, usedDate: Date) {
      state.usedDate = usedDate;
    }
  },
  getters: {
    step: (state: State) => state.step,
    carbonsByYears: (state: State) => state.carbonsByYears,
    tempaturesByYears: (state: State) => state.temperaturesByYears,
    countries: (state: State) => state.countries,
    selectedData: (state: State) => state.selectedData,
    selectedDataType: (state: State) => state.selectedDataType,
    getLocation: (state: State) => (alpha2: string) => state.locations[alpha2],
    getLocations: (state: State) => state.locations,
    getStartDate: (state: State) => state.startDate,
    getEndDate: (state: State) => state.endDate,
    getUsedDate: (state: State) => state.usedDate
  },
  actions: {
    getCarbons({ commit, state }: any, years: Years) {
      CarbonService.getCarbonsByYears(years.startDate, years.endDate)
        .then((response: Carbon.Interface[]) => {
          commit("FETCH_CARBONS_BY_YEARS", response);
        })
        .catch(error => error);
    },
    getTemperatures({ commit, state }: any, years: Years) {
      TemperatureService.getTemperaturesByYears(years.startDate, years.endDate)
        .then((response: Temperature.Interface[]) => {
          commit("FETCH_TEMPERATURES_BY_YEARS", response);
        })
        .catch(error => error);
    },
    getCountries({ commit, state }: any) {
      CountryService.getCountries()
        .then((response: Country.Interface[]) => {
          commit("FETCH_COUNTRIES", response);
        })
        .catch(error => error);
    },
    setSelectedData({ commit, state }: any, selectedData: DataEnum) {
      commit("FETCH_SELECTED_DATA", selectedData);
      commit("CHANGE_SELECTED_DATA");
    },
    setStep({ commit, state }: any, selectedStep: StepEnum) {
      commit("CHANGE_STEP", selectedStep);
    },
    setStartDate({ commit, state }: any, startDate: string) {
      commit("CHANGE_START_DATE", new Date(startDate));
    },
    setEndDate({ commit, state }: any, endDate: string) {
      commit("CHANGE_END_DATE", new Date(endDate));
    },
    setUsedDate({ commit, state }: any, usedDate: string) {
      commit("CHANGE_USED_DATE", new Date(usedDate));
    }
  }
});
