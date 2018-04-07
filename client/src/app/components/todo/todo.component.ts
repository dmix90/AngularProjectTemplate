import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

@Component({
    selector: 'todo',
    templateUrl: './todo.component.html',
    styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
    todos = [
        // { id: 1, description: 'Add Todo', completed: false, editActive: false },
        // { id: 2, description: 'Test', completed: false, editActive: false },
        // { id: 3, description: 'YO Mama', completed: false, editActive: false },
    ];
    constructor(private apollo: Apollo) {
        this.apollo.query({
            query: gql`{
                tasks{
                    id
                    description
                    completed
                }
            }`
        }).subscribe(({ data }) => {
            console.log(data);
            this.todos = data['tasks'].slice();
            console.log(this.todos);
        });
    }

    ngOnInit() { }

    addTodo(todo: any) {
        if (todo.value !== '' && this.todos.length > 0) {
            this.todos.push({ id: this.todos[this.todos.length - 1].id + 1, description: todo.value, completed: false, editActive: false });
        } else if (todo.value !== '' && this.todos.length === 0) {
            this.todos.push({ id: 1, description: todo.value, completed: false, editActive: false });
        }
        else {
            alert('Please enter some text');
        }
        todo.value = '';
    }
    completeTodo(id, $event) {
        $event.stopPropagation();
        // for (let i = 0; i < this.todos.length; i++) {
        //     if (this.todos[i].id === id) {
        //         this.todos[i].completed = !this.todos[i].completed;
        //     }
        // }
        this.apollo.mutate({
            mutation: gql`
            mutation{
                updateTask(id:1, description:"${this.todos[id].description}",completed:true){
                    description
                }
            }
        `}).subscribe();
    }
    updateTodo(id, $event) {
        $event.stopPropagation();
        for (let i = 0; i < this.todos.length; i++) {
            if (this.todos[i].id === id) {
                this.todos[i].editActive = !this.todos[i].editActive;
            }
        }
    }
    removeTodo(id) {
        // for (let i = 0; i < this.todos.length; i++) {
        //     if (this.todos[i].id === id) {
        //         this.todos.splice(i, 1);
        //     }
        // }
        console.log(id);
        this.apollo.mutate({
            mutation: gql`
            mutation{
                removeTask(id: $objId){
                    description
                }
            }
        `, variables: {
                objId: id
            }
        }).subscribe();
    }
}
