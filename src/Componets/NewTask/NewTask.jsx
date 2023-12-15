import React, {useState} from 'react';
import {FiDelete} from 'react-icons/fi';
import {MdOutlineCheckBoxOutlineBlank} from 'react-icons/md';
import {AiOutlineCheckSquare} from 'react-icons/ai';
import styles from "./NewTask.module.css"
import {useDispatch} from "react-redux";
import {deleteTodo, toggleStatus} from "../../Redux/User/userSlice";

const NewTask = ({items}) => {
    const dispatch = useDispatch()
    const [upDateTitle, setUpDateTitle] = useState(items.title)

    return (
        <form className={styles.form}>
            <div className={styles.cart}>
                <input className={styles.input} type="text"
                       onChange={(e) => setUpDateTitle(e.target.value)}
                       value={upDateTitle}/>
            </div>
            <span className={styles.delete} onClick={() => dispatch(deleteTodo(items.id))}>
                <FiDelete size={27} color={"silver"}/>
            </span>
            <span className={styles.check} onClick={() => dispatch(toggleStatus(items.id))}>
                {items.completed ?
                    <AiOutlineCheckSquare size={27} color={"green"}/> :
                    <MdOutlineCheckBoxOutlineBlank size={27} color={"silver"}/>}
            </span>

        </form>
    );
}

export default NewTask;