const IS_DEV = process.env.NODE_ENV === 'development';

const CONFIG = IS_DEV ? 'http://localhost:3000/' : 'https://api.thenewsexplorer.tk/';

export {
  IS_DEV,
  CONFIG,
}