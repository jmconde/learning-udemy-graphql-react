const graphql = require('graphql');
const axios = require('axios');

const UserType = require('./userType');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList
} = graphql;

module.exports =  new GraphQLObjectType({
  name: 'Company',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    users: {
      type: new GraphQLList(UserType),
      resolve(parent) {
        return axios.get(`http://localhost:3000/companies/${parent.id}/users`)
        .then(response => response.data);
      }
    }
  })
});