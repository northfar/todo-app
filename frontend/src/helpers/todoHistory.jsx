import React, {Component} from 'react'

import PageHeader from '../template/pageheader'
import TodoForm from '../todo/todoform'
import TodoList from '../todo/todolist'
import api from '../services/api'

export default class Todo extends Component {

    constructor(props){
        super(props)

        this.state = {description : '', list: []}
        this.handleChange = this.handleChange.bind(this)
        this.handleAdd = this.handleAdd.bind(this)
        this.handleRemove = this.handleRemove.bind(this)
        this.handleMarkAsDone = this.handleMarkAsDone.bind(this)
        this.handleMarkAsPending = this.handleMarkAsPending.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
        this.handleClear = this.handleClear.bind(this)
        this.refresh()
    }

    refresh(description = ''){
        const search = description ? `&description__regex=/${description}/` : ''
        api.get(`/todos?sort=-createdAt${search}`)
            .then(res => this.setState({...this.state, description, list: res.data}))
    }

    handleAdd(){
        const description = this.state.description
        api.post('/todos', {description})
           .then(res => this.refresh(this.state.description))
    }

    handleChange(e){
        this.setState({...this.state, description: e.target.value})
    }

    handleSearch(){
        this.refresh(this.state.description)
    }

    handleRemove(todo){
        api.delete(`/todos/${todo._id}`)
            .then(res => this.refresh(this.state.description))
    }

    handleMarkAsDone(todo){
        api.put(`/todos/${todo._id}`, {...todo, done: true})
            .then(res => this.refresh(this.state.description))
    }

    handleMarkAsPending(todo){
        api.put(`/todos/${todo._id}`, {...todo, done: false})
            .then(res => this.refresh(this.state.description))
    }

    handleClear(){
        this.refresh()
    }

    render(){
        return(
            <div>
                <PageHeader name='Tarefas' small='Cadastro'/>
                <TodoForm description={this.state.description}
                          handleChange={this.handleChange}   
                          handleAdd={this.handleAdd}
                          handleSearch={this.handleSearch}
                          handleClear={this.handleClear}
                          />
                <TodoList list={this.state.list}
                           handleRemove={this.handleRemove}
                           handleMarkAsDone={this.handleMarkAsDone}
                           handleMarkAsPending={this.handleMarkAsPending}  
                />
            </div>
        )
    }
}