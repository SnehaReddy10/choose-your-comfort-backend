const z = require('zod');
const STATUS_CODES = require('../../constants/status-codes');
const Address = require('../../models/Address');
const User = require('../../models/User');
const { USER } = require('../../constants/messages');

const addressSchema = z.object({
  streetName: z.string(),
  city: z.string(),
  state: z.string(),
  pincode: z.string().max(7),
});

const AddAddressController = async (req, res) => {
  try {
    const { streetName, city, state, pincode } = req.body;

    const { success, error } = addressSchema.safeParse({
      streetName,
      city,
      state,
      pincode,
    });

    if (!success) {
      const errors = error.errors.map((x) => x.message);
      return res.status(STATUS_CODES.BadRequest).json({ error: errors });
    }

    const address = await Address({ streetName, city, state, pincode });
    address.save();

    const user = await User.findByIdAndUpdate(req.user._id, {
      addresses: [...req.user.addresses, address._id],
    });
    return res.json({ message: USER.ADDRESS_ADDED, user });
  } catch (err) {
    console.log('AddAddressController', err);
    return res.status(500).send(GENERIC_ERRORS.INTERNAL_SERVER_ERROR);
  }
};

module.exports = AddAddressController;
