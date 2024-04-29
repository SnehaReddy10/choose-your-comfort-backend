const COMMON = {
  SERVICE_DOWN: 'Service is down. Please try again in sometime',
};

const AUTH = {
  SIGNIN_REQUIRED: 'Please signin',
};

const PRODUCT = {
  NOT_FOUND: 'Product Not Found',
  DELETED: 'Product deleted successfully',
};

const USER = {
  NOT_FOUND: 'User not found. Please create new account',
  INVALID_CREDENTIALS: 'Invalid Credentials. Please try again.',
  USER_ALREADY_EXISTS: 'User already exists. Please login',
  PASSWORD_SHOULD_MATCH: 'Password should match',
  USERNAME_MAX_50: 'Username should be of length less than 50',
  INVALID_EMAIL: 'Invalid email',
  PASSWORD_MIN_8: 'Password should be of length greater than 8',
  ADDRESS_ADDED: 'Address added succesfully',
};

const CART = {
  NOT_FOUND: 'Cart not found',
  PRODUCT_ADDED: 'Product Added To Cart Successfully',
  PRODUCT_REMOVED: 'Product Removed Successfully',
  DELETED: 'Cart Deleted Successfully',
};

const WISHLIST = {
  NOT_FOUND: 'Wishlist not found',
  PRODUCT_ADDED: 'Product Added To Wishlist Successfully',
  PRODUCT_REMOVED: 'Product Removed Successfully',
};

const CATEGORY = {
  NOT_FOUND: 'Category not found',
  PRODUCT_ADDED: 'Category Added Successfully',
  DELETED: 'Category Deleted Successfully',
};

module.exports = {
  PRODUCT,
  USER,
  CART,
  WISHLIST,
  AUTH,
  COMMON,
  CATEGORY,
};
