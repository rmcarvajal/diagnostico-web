export const CompletedTask = ({task,index,deleteTask}) => {
    return(
            <div key={index}>
                <h2>{task}</h2>
                <button onClick={() => deleteTask(index)}>delete task</button>

            </div>
    )
}