import { useState } from "react"

function ToDo() {

    
    // states, werden diese verändert, wird das html neu gerendert 
    const [tasks, setTasks] = useState([{ task: 'Shopping', completed: false }, { task: 'Cleaning', completed: true }])
    const [inputTask, setInputTask] = useState('')


    // Funktion die gestartet wird, durch das onChange des Input Feldes
    function changeInput(e) {
        
        //Der Inhalt des Input Feldes wird in den inputTask state geschrieben
        setInputTask(e.target.value)
    }

    
    function addTask(e) {
        e.preventDefault()
        
        //Ein neuer Array aus der alten Taskliste + einem neuen Task
        let tasksAdded = tasks.concat({ task: inputTask, completed: true })
        
        //Die alte Taskliste wird überschrieben
        setTasks(tasksAdded)
        
        //State inputTask wird zurückgesetzt (entspricht dem Value des input Feldes, dadurch wird dieses leer)
        setInputTask('')

    }


    function deleteItem(i) {
        //Der task Array wird gefiltert, die index Position die ankommt wird rausgenommen

        //lang
        //  const filteredItems = tasks.filter((el, index) => {
        //      if (i!==index){
        //          return el
        //      }
        //      return
        //  })

        //kurz
        const filteredItems = tasks.filter((el, index) => i !== index)
        
        //alte Taskliste mit neuer überschreiben
        setTasks(filteredItems)
    }

    
    function toggleComplete(i){
        //Die Taskliste wird durchlaufen, bei der Indexpostion die in Funktion ankommt (i) wird die EIgenschaft completed umgedreht (true -false)
        const resultToggle = tasks.map((el, index) => {
            if (index === i){
                el.completed = !el.completed
            }
            return el
        })

        //erneut Taskliste überschreiben
        setTasks(resultToggle)
    }



    return (
        <>
            <form>
                <label htmlFor="Task">Define your task</label>
                <input onChange={changeInput} value={inputTask} id="Task" type="text" />
                <button onClick={addTask}>Add task</button>
            </form>

            <ul>
                {tasks.map((el, index) => {
                    return (
                        <li
                            className={el.completed ? "completed" : ""} // Styling (Klasse .completed) abhängig von der Eigenschaft completed des el
                            key={index}
                        >
                            {el.task} {/* Hier wird das Tasklistenelement ausgegeben */}
                            <button onClick={() => deleteItem(index)}>lösch mich</button>
                            <button onClick={() => toggleComplete(index)}>{el.completed ? "nicht erledigt" : "erledigt" }</button>
                            {/* Button Beschriftung abhängig von Eigenschaft completed des el, onClick Funktionen der Buttons übergeben die Indexposition des Listenelements */}
                        </li>
                    )}
                )}
            </ul>
        </>
    )
}

export default ToDo