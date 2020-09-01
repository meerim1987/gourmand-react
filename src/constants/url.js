import { BACKEND_HOST } from './settings';
import { replaceParams } from './routes';

export const RANDOM_RECIPE_LIST = '/gourmet/category/random';
export const LATEST_RECIPE = '/recipe/latest';
export const CATEGORIES_INFO = '/gourmet/categories-info';
export const CATEGORY_INFO = '/gourmet/category/:category';
export const SIGN_OUT = '/gourmet/logout';
export const RECIPE = '/recipe/:id';
export const ADD_COMMENT = '/gourmet/add-comment';
export const COMMENT_LIST = '/gourmet/comments/:id?first=:first&count=:count';
export const DELETE_TEMP_UPLOAD = '/recipe/delete-temp-upload/:id';
export const LOGIN = '/gourmet/login?email=:email&password=:password';
export const SIGNUP = '/gourmet/sign-up';
export const ADD_RECIPE = '/recipe/add';
export const RECIPE_UPLOAD = '/recipe/upload';

export const getUrl = (uri, params = new Map()) => {
  return `${BACKEND_HOST}${replaceParams(uri, params)}`;
};
