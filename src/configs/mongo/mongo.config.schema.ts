import * as Joi from 'joi';

export default Joi.object({
  DB_MONGO_URL: Joi.string().required(),
});
