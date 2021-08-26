// Import the controllers
const craftController = require("../controllers/craftController");
const ownerController = require("../controllers/ownerController");

// Define the custom Types
const CraftType = `type CraftType {
  id: ID!
  name: String
  type: String
  brand: String
  price: String
  age: Int
  owner: OwnerType
}`;

const OwnerType = `type OwnerType {
  id: ID!
  firstName: String
  lastName: String
  email: String
  crafts: [CraftType]
}`;

// Define the schema which uses the types
const schema = `
type Query {
  Crafts: [CraftType]
  Craft(id: ID): CraftType
  Owners: [OwnerType]
  Owner(id: ID): OwnerType
}

type Mutation {
  addCraft(  
    name: String
    type: String
    brand: String
    price: String
    age: Int
  ): CraftId
  
  updateCraft(
    name: String
    type: String
    brand: String
    price: String
    age: Int
    id: ID!
  ): CraftType

}

type CraftId {
  id: ID
}


${CraftType}
${OwnerType}
`;

// Define the resolvers
const resolvers = {
  Query: {
    async Crafts() {
      return await craftController.getCrafts();
    },
    async Craft(_, { id }) {
      const craft = await craftController.getCraftById({ id });
      if (craft && craft.owner_id) {
        const owner = await ownerController.getOwnerById({
          id: craft.owner_id,
        });
        craft.owner = owner;
      }
      return craft;
    },
    async Owners() {
      return await ownerController.getOwners();
    },
    async Owner(_, { id }) {
      const owner = await ownerController.getOwnerById({ id });
      const crafts = await craftController.getCraftsByOwnerId({ id });
      owner.crafts = crafts;
      return owner;
    },
  },
  Mutation: {
    async addCraft(_, fields) {
      const craft = await craftController.addCraft({ ...fields });
      return craft;
    },

    async updateCraft(_, fields) {
      const craft = await craftController.updateCraft({ ...fields });
      return craft;
    },
  },
};

module.exports = { schema, resolvers };
