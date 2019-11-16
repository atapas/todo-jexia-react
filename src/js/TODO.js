import React, { useState } from "react";
import { create, update, remove } from './jexia';

const TODO = (props) => {
    
    const [todos, setTodos] = useState(props.todos);
    
    async function updateTODO(event, index) {
        let newTODO = (event.target.value);
        let newTODOs = [...todos];
        if (newTODO.trim().length > 0
            && newTODOs[index].id.trim().length > 0) {
            await update('todos', {
                'key': 'id',
                'value': newTODOs[index].id,
                'toUpdate': {
                    'item': newTODO
                }
            });
        }
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

    async function createTODO(todo, index) {
        let newTODOs = [...todos];
        if (newTODOs[index].id === "") {
            if (newTODOs[index].item.trim().length === 0) {
                return;
            }
            let ret = [];
            ret = await create("todos", {
                'item': newTODOs[index].item,
                'done': false
            });
            console.log(ret);
        
            newTODOs.splice(index, 1);
            newTODOs.splice(index, 0, {
                'id': ret[0].id,
                'item': ret[0].item,
                'done': false
            });
        } /*else {
            if (newTODOs[index].item.trim().length !== 0) {
                    let ret = [];
                    ret = await update('todos', {
                        'key': 'id',
                        'value': newTODOs[index].id,
                        'toUpdate': {
                            'item': newTODOs[index].item
                        }
                    });
        
                    newTODOs.splice(index, 1);
                    newTODOs.splice(index, 0, {
                        'id': ret[0].id,
                        'item': ret[0].item,
                        'done': ret[0].done
                    });
            }
        }*/
        newTODOs.splice(index + 1, 0, {
            'id': "",
            'item': "",
            'done': false
        });
        setTodos(newTODOs);
        setTimeout(()=> {
            document.forms[0].elements[(index + 1)*2 + 1].focus();
        },0);
    };

    async function deleteTODO (index) {
        if (index === 0) {
            return;
        }
        let newTODOs = [...todos];
        let todoToDelete = newTODOs[index];
        if (todoToDelete.id !== "") {
            let deletedRecord = await remove("todos", {
                'key': 'id',
                'value': todoToDelete.id
            });
        }
        newTODOs.splice(index, 1);
        setTodos(newTODOs);
        setTimeout(() => {
            document.forms[0].elements[index*2 - 1].focus();
        }, 0);
    };

    async function toggleDone(index) {
        let newTODOs = [...todos];
        newTODOs[index].done = !newTODOs[index].done;

        await update('todos', {
            'key': 'id',
            'value': newTODOs[index].id,
            'toUpdate': {
                'done': newTODOs[index].done
            }
        });
        setTodos(newTODOs);
    }

    return(
        <div>
            <h1>TODO({todos.length})</h1>
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
                                        onChange={ e => toggleDone(i) }
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