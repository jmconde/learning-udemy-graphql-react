const graphql = require('graphql');
const axios = require('axios');

const CompanyType = require('./companyType');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
} = graphql;

module.exports = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLString },
    firstName: { type: GraphQLString },
    age: { type: GraphQLInt },
    company: {
      type: CompanyType,
      resolve(parent, args) {
        return axios.get(`http://localhost:3000/companies/${parent.companyId}`)
        .then(response => response.data);
      }
    }
  })
});