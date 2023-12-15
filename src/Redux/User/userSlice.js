import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {nanoid} from "nanoid";


export const fetchTodo = createAsyncThunk(
    'users/fetchTodo',
    async (_, {rejectWithValue}) => {
        try {
            const response = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=5")
            if (!response.ok) {
                throw new Error("Server Error")
            }
            const data = response.json()
            return data
        } catch (e) {
            return rejectWithValue(e.message)
        }

    }
)

export const deleteTodo = createAsyncThunk(
    "user/deleteTodo",
    async (id, {rejectWithValue, dispatch}) => {
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
                method: "DELETE"
            })
            if (!response.ok) {
                throw new Error("Server Error")
            }
            dispatch(removeTodo(id))
        } catch (e) {
            return rejectWithValue(e.message)
        }
    }
)

// export const addNewTodos = createAsyncThunk(
//     "user/toggleStatus",
//     async (title, {rejectWithValue, dispatch}) => {
//         try {
//             const todo = {
//                 title: title,
//                 userId: 1,
//                 completed: false
//             }
//
//             const response = await fetch("https://jsonplaceholder.typicode.com/todos", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json"
//                 },
//                 body: JSON.stringify(todo)
//             })
//             if (!response.ok) {
//                 throw new Error("Server Error")
//             }
//             const data = await response.json()
//             console.log(data)
//             dispatch(addNewTodo(data))
//         } catch (e) {
//             return rejectWithValue(e.message)
//         }
//     }
// )


export const toggleStatus = createAsyncThunk(
    "user/toggleStatus",
    async (id, {rejectWithValue, dispatch, getState}) => {
        const todo = getState().user.todo.find(todo => todo.id === id)
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    completed: !todo.completed
                })
            })
            if (!response.ok) {
                throw new Error("Server Error")
            }
            dispatch(completeTodo(id))
        } catch (e) {
            return rejectWithValue(e.message)
        }
    }
)


const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: [],
        todo: [],
        status: null,
        error: null
    },
    reducers: {
        addNewTodo: (state, {payload}) => {

            state.todo.push({
                title: payload,
                id: nanoid(),
                completed: false
            })
        },
        removeTodo: (state, {payload}) => {
            state.todo = state.todo.filter(todo => todo.id !== payload)
        },
        completeTodo: (state, {payload}) => {
            const toggleTodo = state.todo.find(todo => todo.id === payload)
            toggleTodo.completed = !toggleTodo.completed
        }
    },
    extraReducers: {
        [fetchTodo.pending]: (state) => {
            state.status = "loading"
            state.error = null
        },
        [fetchTodo.fulfilled]: (state, {payload}) => {
            state.status = "resolved"
            state.todo = payload

        },
        [fetchTodo.rejected]: (state, {payload}) => {
            state.status = "BedRequest"
            state.error = payload
        }
    }
})

export default userSlice.reducer;
export const {addNewTodo, removeTodo, completeTodo} = userSlice.actions