
// Replaces the url vars with the provided value in params

export const replaceParams = (route, params) => {
  let result = route;
  for (const [key, val] of params.entries()) {
    result = result.replace(`:${key}`, val);
  }

  return result;
};

export const ABOUT = '/about';
export const CONTACT = '/contact';
export const SIGN_IN = '/sign-in';
export const RECIPE_POST = '/recipe-post';
export const RECIPE = '/recipe/:id';
export const SIGN_UP = '/sign-up';
export const SIGN_OUT = '/sign-out';
export const CATEGORY = '/category/:category';
export const CATEGORIES = '/categories';

export const PARAM_CATEGORY = 'category';
export const PARAM_ID = 'id';
export const PARAM_FIRST = 'first';
export const PARAM_COUNT = 'count';
export const PARAM_EMAIL = 'email';
export const PARAM_PASSWORD = 'password';
