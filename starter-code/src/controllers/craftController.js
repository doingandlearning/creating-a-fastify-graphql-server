const boom = require("boom");

const Craft = require("../models/Craft");

// Get all crafts
exports.getCrafts = async (request, reply) => {
  try {
    const crafts = await Craft.find();
    return crafts;
  } catch (error) {
    throw boom.boomify(error);
  }
};

// Get craft by id
exports.getCraftById = async (request, reply) => {
  try {
    const craft = await Craft.findById(request.params.id);
    return craft;
  } catch (error) {
    throw boom.boomify(error);
  }
};

// Add a new craft
exports.addCraft = async (request, reply) => {
  try {
    const craft = new Craft(request.body);
    return craft.save();
  } catch (error) {
    throw boom.boomify(error);
  }
};

// Update an existing craft
exports.updateCraft = async (request, reply) => {
  try {
    const update = await Craft.findByIdAndUpdate(
      request.params.id,
      request.body,
      { new: true }
    );
    return update;
  } catch (error) {
    throw boom.boomify(error);
  }
};

// Delete an existing craft
exports.deleteCraft = async (request, reply) => {
  try {
    const craft = await Craft.findByIdAndRemove(request.params.id);
    return craft;
  } catch (error) {
    throw boom.boomify(error);
  }
};
