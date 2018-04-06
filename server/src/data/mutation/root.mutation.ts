import { GraphQLObjectType } from 'graphql';
import { addTaskMutation, updateTaskMutation, removeTaskMutation } from '@mutations/task.mutation';

export const RootMutation = new GraphQLObjectType({
    name: 'RootMutation',
    fields: {
        addTask: addTaskMutation,
        updateTask: updateTaskMutation,
        removeTask: removeTaskMutation,
    }
})