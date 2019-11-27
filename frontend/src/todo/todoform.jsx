import React, {Component} from 'react'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'

import Grid from '../template/grid'
import IconButton from '../template/iconbutton'

import {changeDescription, search, add, clear} from './todoActions'

class TodoForm extends Component{

    constructor(props){
        super(props)
        this.keyHandler = this.keyHandler.bind(this)
    }

    componentWillMount(){
        this.props.search()
    }

    keyHandler(e){
        const {add, search, description, clear} = this.props
        if(e.key == 'Enter')
            e.shiftKey ? search() : add(description)
        if(e.key == 'Escape')
            clear()
    }

    render(){
        const {add, clear ,search, description} = this.props
        return (
            <div role="form" className="todoForm">
               <Grid cols='12 9 10'>
                    <input id="description" 
                    className="form-control" 
                    placeholder="Adicione uma tarefa" 
                    value={description}
                    onKeyUp={this.keyHandler}
                    onChange={this.props.changeDescription}
                    />
               </Grid>
                <Grid cols='12 3 2'>
                    <IconButton style='primary' icon='plus' onClick={() => add(description)}/>
                    <IconButton style='info' icon='search' onClick={search}/>
                    <IconButton style='custom-clear' icon='eraser' onClick={() => clear()}/>
                </Grid>
            </div>
        )
    }

}

const mapStateToProps = state => ({description: state.todo.description})
const mapDisatchToProps = dispatch => 
        bindActionCreators({changeDescription, search, add, clear}, dispatch)
export default connect(mapStateToProps, mapDisatchToProps)(TodoForm)