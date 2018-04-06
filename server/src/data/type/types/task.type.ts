import { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLBoolean, GraphQLNonNull } from 'graphql';

export const TaskType = new GraphQLObjectType({
    name: 'Task',
    fields: () => ({
        id: { type: GraphQLID },
        description: { type: GraphQLString },
        completed: { type: GraphQLBoolean },
    })
})