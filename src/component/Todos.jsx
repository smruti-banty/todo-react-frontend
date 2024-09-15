import { upadateTodoState } from "../service/TodoService";

function Todos({ todos, fetchTodos }) {
    async function completeStateChange(id, state) {
        try {
            const respone = await upadateTodoState(id, state);
            if (respone.status === 200) {
                fetchTodos();
            }
        } catch (error) {
            console.error(error);
        }

    }
    return <section className="mt-4 max-h-20 overflow-y-auto">
        {todos.map(todo =>
            <div className="flex gap-4 items-center" key={todo.id}>
                <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => completeStateChange(todo.id, !todo.completed)}
                />
                <p className={todo.completed ? "line-through" : ""}>{todo.title}</p>
            </div>
        )}
    </section>
}

export default Todos;