import React from 'react';
import styles from "../App/App.module.css";

const CreatTask = ({handleSubmit, setTitle, title}) => {
    return (
        <form onSubmit={handleSubmit} className={styles.addTask}>
            <input className={styles.input}
                   onChange={(e) => setTitle(e.target.value)}
                   value={title}
                   type="text"/>
            <button className={styles.button}>Add task</button>
        </form>
    );
}

export default CreatTask;