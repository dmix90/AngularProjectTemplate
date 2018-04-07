import { GraphQLNonNull, GraphQLID, GraphQLBoolean, GraphQLString } from 'graphql';
import { TaskType } from '@type/root.type';
import { Task } from '@entity/root.entity';

export const addTaskMutation = {
    type: TaskType,
    args: {
        description: { type: new GraphQLNonNull(GraphQLString) }
    },
    async resolve(_, { description }) {
        const tsk = new Task();
        tsk.description = description;
        await tsk.save();
        return;
    }
}
export const updateTaskMutation = {
    type: TaskType,
    args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        description: { type: GraphQLString },
        completed: { type: GraphQLBoolean }
    },
    async resolve(_, { id, description, completed }) {
        Task.updateById(id, { description, completed })
        return;
    }
}
export const removeTaskMutation = {
    type: TaskType,
    args: {
        id: { type: new GraphQLNonNull(GraphQLID) }
    },
    async resolve(_, { id }) {
        Task.removeById(id);
        return;
    }
}