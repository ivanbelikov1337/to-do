import React, {useState, useEffect} from 'react';
import styles from './App.module.css';
import NewTask from "../NewTask/NewTask";
import {TbWriting} from 'react-icons/tb';
import {useDispatch, useSelector} from "react-redux";
import {addNewTodo, fetchTodo} from "../../Redux/User/userSlice";
import CreatTask from "../CreatTask/CreatTask";


function App() {
    const [title, setTitle] = useState("")

    const dispatch = useDispatch()
    const {todo, status, error} = useSelector(({user}) => user)

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(addNewTodo(title))
        setTitle("")
    }

    useEffect(() => {
        dispatch(fetchTodo())
    }, [dispatch])
    return (
        <section className={styles.wrapper}>
            <h1 className={styles.title}>TO-DO LIST</h1>
            <div className={styles.write}><TbWriting color={"white"} size={60}/></div>
            <CreatTask handleSubmit={handleSubmit} setTitle={setTitle} title={title}/>
            {status === "loading" && <h2>Loading...</h2>}
            {error && <h2>An error: {error}</h2>}
            <div className={styles.items}>
                {todo.map(items => (<NewTask key={items.id} setTitle={setTitle} items={items}/>))}
            </div>
        </section>
    );
}

export default App;
