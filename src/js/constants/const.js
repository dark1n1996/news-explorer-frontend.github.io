import moment from 'moment';

const VALIDATION_ERRORS = {
  validationLengthPass: 'Должно быть не менее 8 символов',
  validationLengthName: 'Должно быть от 2 до 30 символов',
  requiredText: 'Это обязательное поле',
  requiredEmail: 'Здесь должна быть электронная почта',
};

const IS_DEV = process.env.NODE_ENV === 'development';

const CONFIG = IS_DEV ? 'http://localhost:3000/' : 'https://api.thenewsexplorer.tk/';

const NOW = moment().format('YYYY-MM-DD');

const SEVEN_DAYS_AGO = moment().subtract(7, 'days').format('YYYY-MM-DD');

const API_KEY = 'b05767e2ad9f4d7cb8ee6cf778e5cfb4';

const PIC = 'https://sun9-53.userapi.com/t3ndc0TC2iy0Q8QiN0iD_xz82mVHSnBNMAi-eg/12oItprDwDk.jpg';

export {
  VALIDATION_ERRORS,
  IS_DEV,
  CONFIG,
  NOW,
  SEVEN_DAYS_AGO,
  API_KEY,
  PIC,
};
