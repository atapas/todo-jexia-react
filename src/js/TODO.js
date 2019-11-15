import React, { useState } from "react";
import { create } from './jexia';

const TODO = (props) => {
    
    const [todos, setTodos] = useState(props.todos);
    
    const getRandomId = () => {
        return Math.floor(Math.random() * 100);
    }

    const updateTODO = (event, index) => {
        let newTODO = (event.target.value);
        let newTODOs = [...todos];
        newTODOs[index].item = newTODO;
        setTodos(newTODOs);
    };

    const handleKeyDown = (event, index) => {
        if (event.key === 'Enter') {
            console.log('Attempting Create');
            createTODO(event.target.value, index);
        }

        if((event.key === 'Backspace' 
            || event.key === 'Delete') &&
                (todos[index].item.trim().length === 1 
                    || todos[index].item.trim().length === 0)) {
            console.log('Attempting Delete');
            deleteTODO(index);
        }
    };

    const createTODO = (todo, index) => {
        let newTODOs = [...todos];
        /*create("todos", {
            'item': "Test123",
            'done': false
        });*/
        newTODOs.splice(index + 1, 0, {
            'id': getRandomId(),
            'item': "",
            'done': false
        });
        setTodos(newTODOs);
        setTimeout(()=> {
            document.forms[0].elements[(index + 1)*2 + 1].focus();
        },0);
    };

    const deleteTODO = (index) => {
        if (index === 0) {
            return;
        }
        let newTODOs = [...todos];
        newTODOs.splice(index, 1);
        setTodos(newTODOs);
        setTimeout(() => {
            document.forms[0].elements[index*2 - 1].focus();
        }, 0);
    };

    const toggleDone = (event, index) => {
        let newTODOs = [...todos];
        newTODOs[index].done = !newTODOs[index].done;
        setTodos(newTODOs);
    }

    return(
        <div>
            <h1>TODO</h1>
            <form>
                <ul>
                    {
                        todos.map((todo, i) => (
                            <div key={ todo.id } 
                                className={`todo ${todo.done && 'todo-done'}`}>
                                <label className="ckcontainer">
                                    <input
                                        className={'checkbox'}
                                        name={todo.item }
                                        type="checkbox"
                                        checked={todo.done}
                                        onChange={ e => toggleDone(e, i)}
                                    />
                                    <span className="checkmark"></span>
                                </label>
                                
                                <input
                                    className={ 'textbox' }
                                    type="text"
                                    value={ todo.item }
                                    onChange = { e => updateTODO(e, i) }
                                    onKeyDown = { e => handleKeyDown(e, i) }
                                />
                            </div>
                        ))
                    }
                </ul>
            </form>
        </div>
    )
}

export default TODO;