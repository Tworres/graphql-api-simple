import {ApolloServer, gql} from "apollo-server";

const typeDefs = gql`
    type User{
        name: String!
    }

    type Query{
        users: [User!]!
    }
    
    type Mutation{
        createUser(name: String!): User!
    }
`


interface User {
    name: string;
}

const users: User[] = [];

const server = new ApolloServer({
    typeDefs,
    resolvers: {
        Query: {
            users : () => {
                return users;
            }
        },

        Mutation: {
            createUser : (_, args) => {
                const user = { name:args.name}
                users.push(user);

                return user;
            }
        }
    }
});

server.listen().then(({url})=>{
    console.log(`running on ${url}`)
})