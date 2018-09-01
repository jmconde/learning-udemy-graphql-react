const graphql = require('graphql');
const axios = require('axios');

const CompanyType = require('./companyType');
const UserType = require('./userType');


console.log('CompanyType', CompanyType);
console.log('UserType', UserType);

const {
  GraphQLObjectType,
  GraphQLString
} = graphql;

module.exports = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      args: {id: {type: GraphQLString}},
      resolve(parentValue, args) {
        return axios.get(`http://localhost:3000/users/${args.id}`)
          .then(response => response.data);
      }
    },
    company: {
      type: CompanyType,
      args: {id: {type: GraphQLString}},
      resolve(parentValue, args) {
        return axios.get(`http://localhost:3000/companies/${args.id}`)
          .then(response => response.data);
      }
    }
  }
})