// 1. إنشاء مصفوفة X (تبقى كما هي)
function xMatrix(listX) {
  let matrix = [];
  listX.forEach((item) => {
    // نستخدم انحدار الدرجة الثالثة: [x^3, x^2, x, 1]
    matrix.push([Math.pow(item, 3), Math.pow(item, 2), item, 1]);
  });
  return matrix;
}

/**
 * 2. حساب معاملات منحنى الانحدار (C)
 * @param {number[]} listX - قيم محتوى الماء (w)
 * @param {number[]} listY - قيم الكثافة الجافة (γd)
 * @returns {number[]} - مصفوفة المعاملات [C3, C2, C1, C0]
 */
function calculateCoefficients(listX, listY) {
  if (listX.length !== listY.length) {
    throw new Error("عدد محاولات محتوى الماء والكثافة يجب أن يتطابق.");
  }

  // المصفوفة X
  const X = xMatrix(listX);
  // المصفوفة Y (تُحوَّل إلى مصفوفة عمودية)
  const Y = listY.map((y) => [y]);

  // الخطوات الرياضية: C = (X^T * X)^-1 * X^T * Y

  // 1. حساب X^T
  const XT = math.transpose(X);

  // 2. حساب (X^T * X)
  const XTX = math.multiply(XT, X);

  // 3. حساب (X^T * X)^-1
  // (XTX هي مصفوفة مربعة 4x4، لذا يمكن إيجاد معكوسها الآن)
  const XTX_inv = math.inv(XTX);

  // 4. حساب المعاملات: C = (XTX_inv) * (X^T * Y)
  const XTY = math.multiply(XT, Y);
  const C = math.multiply(XTX_inv, XTY); // مصفوفة عمودية [C3, C2, C1, C0]

  // تحويل مصفوفة الناتج إلى مصفوفة بسيطة [C3, C2, C1, C0]
  return C.map((row) => row[0]);
}

function solveQuadratic(C3, C2, C1) {
  const A = 3 * C3;
  const B = 2 * C2;
  const C = C1;

  const discriminant = B * B - 4 * A * C;

  if (discriminant < 0) {
    return [];
  }

  const sqrtD = Math.sqrt(discriminant);
  const w1 = (-B + sqrtD) / (2 * A);
  const w2 = (-B - sqrtD) / (2 * A);

  return [w1, w2];
}

function calculator(moistureContent_w, dryDensity_yd) {
  try {
    // الخطوة 1: حساب المعاملات [C3, C2, C1, C0]
    const [C3, C2, C1, C0] = calculateCoefficients(
      moistureContent_w,
      dryDensity_yd
    );

    // الخطوة 2: إيجاد جذور المشتقة (Optimum Moisture Contents المحتملة)
    const possibleOMCs = solveQuadratic(C3, C2, C1);

    // الخطوة 3: اختيار الجذر المنطقي (عادةً هو الأقرب لبيانات الإدخال)
    let optimumMoistureContent = null;
    let maxDryDensity = -Infinity;

    // اختبار كل جذر منطقي يقع ضمن نطاق محتوى الماء
    possibleOMCs.forEach((w_opt) => {
      if (
        w_opt > Math.min(...moistureContent_w) &&
        w_opt < Math.max(...moistureContent_w)
      ) {
        // حساب الكثافة الجافة المقابلة لـ w_opt
        const density =
          C3 * Math.pow(w_opt, 3) + C2 * Math.pow(w_opt, 2) + C1 * w_opt + C0;

        if (density > maxDryDensity) {
          maxDryDensity = density;
          optimumMoistureContent = w_opt;
        }
      }
    });

    // النتيجة النهائية
    if (optimumMoistureContent && maxDryDensity > -Infinity) {
      return {
        OMC: optimumMoistureContent.toFixed(2),
        MDD: maxDryDensity.toFixed(3),
      };
    } else {
      return {
        error: "لم يتم العثور على قمة منطقية للمنحنى ضمن نطاق البيانات.",
      };
    }
  } catch (e) {
    return { error: `حدث خطأ في عملية الحساب:, ${e.message}` };
  }
}

let excelCells = [];
let MDD;
let OMC;
