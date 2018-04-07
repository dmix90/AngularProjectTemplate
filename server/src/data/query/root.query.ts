import { GraphQLObjectType } from 'graphql';
import { getTaskQuery, getTasksQuery } from '@queries/task.query';

export const RootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        task: getTaskQuery,
        tasks: getTasksQuery,
    }
})