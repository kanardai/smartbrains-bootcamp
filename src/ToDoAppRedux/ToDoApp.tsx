/** @jsxImportSource @emotion/react */
import React, { useRef } from 'react'
import { useState } from 'react'
import styled from '@emotion/styled'
import { css } from '@emotion/react'
import { TodoItem } from './TodoItem'
import { Btn_Style, Div_TodoItem } from './themeTodo'
import { colors, mediaSize } from '../utils/theme'
import { useSelector, useDispatch } from 'react-redux'
import { AppDispatch, RootState } from '../utils/store'
import {
    addTodo,
    deleteTodo,
    completeTodo,
    filteredTodos,
    changeOrder,
} from './toDoAppSlice'
import { useWindowResizer } from '../utils/hookWindowResizer'

export type Todo = {
    id: string
    todoName: string
    complete: boolean
}

export type TodoFilter = 'all' | 'active' | 'completed'

export const TodoAppRedux = () => {
    const todosFiltered = useSelector(
        (state: RootState) => state.todos.valueFiltered
    )
    const dispatch = useDispatch<AppDispatch>()
    const [todoName, setTodoName] = useState('')
    const [filterButton, setFilterButton] = useState('all' as TodoFilter)

    const dragItem = useRef('')
    const dragOverItem = useRef('')

    const dragStart = (e: React.DragEvent<HTMLDivElement>, id: string) => {
        dragItem.current = id
    }

    const dragEnter = (e: React.DragEvent<HTMLDivElement>, id: string) => {
        dragOverItem.current = id
    }

    const drop = (e: React.DragEvent<HTMLDivElement>) => {
        dispatch(
            changeOrder({
                dragItemId: dragItem.current,
                droppedItemId: dragOverItem.current,
            })
        )
        dragItem.current = ''
        dragOverItem.current = ''
        dispatch(filteredTodos())
    }

    const completeTodoButton = (id: string) => {
        dispatch(completeTodo(id))
        dispatch(filteredTodos())
    }

    const deleteTodoButton = (id: string) => {
        dispatch(deleteTodo(id))
        dispatch(filteredTodos())
    }

    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch(addTodo(todoName))
        dispatch(filteredTodos('all'))
        setTodoName('')
    }

    return (
        <div
            css={css`
                margin: 30px;
                display: flex;
                flex-direction: column;
                align-items: center;
            `}
        >
            <form onSubmit={submitHandler}>
                <div>
                    <Input_Todo
                        type="text"
                        placeholder="What needs to be done?"
                        maxLength={20}
                        value={todoName}
                        onChange={(e) => setTodoName(e.target.value)}
                    />
                </div>

                {useWindowResizer().width < mediaSize.mobile && (
                    <Button_Submit type="submit">ADD TODO</Button_Submit>
                )}
            </form>

            <Div_List>
                {todosFiltered.map((todoItem, index) => (
                    <TodoItem
                        key={todoItem.id}
                        todoItem={todoItem}
                        completeTodo={completeTodoButton}
                        deleteTodoButton={deleteTodoButton}
                        dragStart={dragStart}
                        dragEnter={dragEnter}
                        dragEnd={drop}
                    />
                ))}
            </Div_List>

            <Div_TodoItem
                css={css`
                    border: solid 3px ${colors.highlight};
                    border-radius: 3px 3px 20px 20px;
                    margin-top: -2px;
                `}
            >
                <Btn_Style
                    complete={filterButton === 'active'}
                    highlight={colors.highlight}
                    secondary={colors.secondary}
                    onClick={() => {
                        dispatch(filteredTodos('active'))
                        setFilterButton('active')
                    }}
                >
                    Active
                </Btn_Style>
                <Btn_Style
                    css={css`
                        width: 90px;
                    `}
                    complete={filterButton === 'completed'}
                    highlight={colors.highlight}
                    secondary={colors.secondary}
                    onClick={() => {
                        dispatch(filteredTodos('completed'))
                        setFilterButton('completed')
                    }}
                >
                    Completed
                </Btn_Style>
                <Btn_Style
                    complete={filterButton === 'all'}
                    highlight={colors.highlight}
                    secondary={colors.secondary}
                    onClick={() => {
                        dispatch(filteredTodos('all'))
                        setFilterButton('all')
                    }}
                >
                    All
                </Btn_Style>
            </Div_TodoItem>
        </div>
    )
}

const Div_List = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const Input_Todo = styled.input`
    @media (${mediaSize.mediaMobile}) {
        width: 300px;
    }
    @media (${mediaSize.mediaLaptop}) {
        width: 700px;
    }
    height: 80px;
    background-color: ${colors.primary};
    color: ${colors.secondary};
    border: solid 3px ${colors.highlight};
    border-radius: 20px 20px 5px 5px;
    text-align: center;
    font-size: 25px;
    margin: 10px;
    &:focus {
        outline: none;
        border-width: 5px;
    }
`

const Button_Submit = styled.button`
    width: 300px;
    color: ${colors.highlight};
    border: none;
    background-color: ${colors.primary};
    margin-bottom: 12px;
    height: 30px;
    :active {
        font-size: large;
    }
`
