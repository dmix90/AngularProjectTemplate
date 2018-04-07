import { GraphQLID, GraphQLString, GraphQLBoolean, GraphQLNonNull, GraphQLList } from 'graphql';
import { TaskType } from '@type/root.type';
import { Task } from '@entity/root.entity';

export const getTaskQuery = {
    type: TaskType,
    args: { id: { type: new GraphQLNonNull(GraphQLID) } },
    async resolve(_, { id }) {
        return await Task.findOneById(id);
    }
}
export const getTasksQuery = {
    type: new GraphQLList(TaskType),
    async resolve() {
        return await Task.find();
    }
}