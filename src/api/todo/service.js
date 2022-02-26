export default class TodoService {
  constructor(dao) {
    this.dao = dao;
  }

  findTodoByTodoId(vo) {
    return this.dao.findTodoByTodoId(vo);
  }

  findTodoListByUUID(vo) {
    return this.dao.findTodoListByUUID(vo);
  }

  insertTodo(vo) {
    return this.dao.insertTodo(vo);
  }

  updateTodo(vo) {
    return this.dao.updateTodo(vo);
  }

  deleteTodo(vo) {
    return this.dao.deleteTodo(vo);
  }
}
