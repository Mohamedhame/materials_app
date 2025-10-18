function soilClassification(select = "Silty Sand with Gravel (SM)") {
  const text = `Soil Classification According to ASTM D2487 : ${select}\nCoefficient of uniformity ( Cu ): ( N/A ) ( D10 not available )`;
  return text;
}
const densityText = "وزن العينة ÷ حجم القالب";
const wetSampleText = "وزن العينة الكلي - وزن القالب";
const weightwaterText = "الجفنة بالعينة الرطبة - الجفنة بالعينة الجافه";
const sampledryText = "الجفنة بالعينة جافة - الجفنة";
const humitidyText = "(وزن المياة ÷ وزن العينة جافة)÷100";
const avrghumitidyText = "(نسبة رطوبة الاولي + الثانية) ÷ 2";
const drydenisityText = "الكثافة الرطبة/(1+(متوسط نسبة الرطوبة)÷100)";
const highDensityDry = "اقصى كثافة جافة من المحاولات";
const drydenisityShort = "الكثافة الرطبة/(1+(محتوي الماء) ÷ 100)";
const cbrWetDensityText =
  "وزن العينة رطبة / حجم القالب\n(وزن القالب بالعينة - وزن العينة)/حجم القالب";

const cbrHumitidyText =
  "(وزن المياة ÷ وزن العينة جافة)÷100\nوزن الماء = وزن العينة رطبة - وزنها جافة";
