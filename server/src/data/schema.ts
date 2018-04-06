import { GraphQLSchema } from 'graphql';
import { RootQuery } from '@query/root.query';
import { RootMutation } from '@mutation/root.mutation';

export default new GraphQLSchema({
    query: RootQuery,
    mutation: RootMutation
});