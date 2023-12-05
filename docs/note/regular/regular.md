<!--
 * @Author: cbw
 * @Date: 2023-10-23 19:12:38
 * @LastEditors: cbw
 * @LastEditTime: 2023-10-23 19:21:47
 * @Description: 正则
-->
## 正则

### 居民身份证

示例：`510802199912102033`

正则：`/^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/`

### 士官证

示例：`军字第2001988号`，`士字第P011816X号`

正则：`/^[\u4E00-\u9FA5](字第)([0-9a-zA-Z]{4,8})(号?)$/`

### 驾驶证

示例：`610114198911192028`

正则：`/^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}(\d|x|X)$/`

### 护照

示例：`141234567`,`G12345678`, `P1234567`

正则：`/^([a-zA-z]|[0-9]){5,17}$`

### 驾驶证

示例：`610114198911192028`

正则：`/^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}(\d|x|X)$/`

### 港澳通行证

示例：`H1234567890`

正则：`/^([A-Z]\d{6,10}(\(\w{1}\))?)$/`

### 只能数字或字母

`/[a-zA-Z0-9]+$/g`

### 只能数字

`/^[0-9]+$/g`

### 十八位身份证校验
```javascript
/**
 * 校验身份证号
 * @param {string} value
 * @returns
 */
export const checkIDCard = (value) => {
  const num = value.toUpperCase() || '';
  // 身份证号码18位，18位前17位为数字，最后一位是校验位，可能为数字或字符X。
  const reg = /^(\d{18,18}|\d{17,17}X)$/;
  if (!reg.test(num)) {
    return false;
  }
  // 校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
  // 下面分别分析出生日期和校验位
  let re;
  const len = num.length;
  if (len === 18) {
    re = new RegExp(/^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/);
    const arrSplit = num.match(re) || [];
    // 检查生日日期是否正确
    const dtmBirth = new Date(
      arrSplit[2] + '/' + arrSplit[3] + '/' + arrSplit[4],
    );
    const bGoodDay =
      dtmBirth.getFullYear() === Number(arrSplit[2]) &&
      dtmBirth.getMonth() + 1 === Number(arrSplit[3]) &&
      dtmBirth.getDate() === Number(arrSplit[4]);
    if (!bGoodDay) {
      return false;
    } else {
      // 检验18位身份证的校验码是否正确。
      // 校验位按照ISO 7064:1983.MOD
      // 11-2的规定生成，X可以认为是数字10。
      const arrInt = new Array(
        ...[7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2],
      );
      const arrCh = new Array(
        ...['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'],
      );
      let nTemp = 0;
      for (let i = 0; i < 17; i++) {
        nTemp += num.substr(i, 1) * arrInt[i];
      }
      const valnum = arrCh[nTemp % 11];
      if (valnum !== num.substr(17, 1)) {
        return false;
      }
    }
  }
  return true;
};

```
