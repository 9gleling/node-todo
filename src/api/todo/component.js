import { Router } from 'express';
import successWrapper from '../../libs/success';
import BadRequestException from '../../exceptions/badRequestException';
import TodoService from './service';
import Dao from './dao';

export default class TodoComponent {
  router = Router();
  service = new TodoService(new Dao());

  getService(){
    return this.service;
  }

  constructor () {
    this.initializeRouter();
  }
  initializeRouter(){
    const router = Router();
    const path = '/todo';
    router
    .get('/', successWrapper(this.todoList))
    .get('/:todoId', successWrapper(this.findTodo))
    .post('/', successWrapper(this.register))
    .patch('/:todoId', successWrapper(this.update))
    .delete('/:todoId', successWrapper(this.delete))
    this.router.use(path, router);
  }

  /**
   * @description Todo list.
   */
  todoList = (req,res) => {
    const { UUID } = req.user;
    const vo = {
      UUID: UUID
    }

    let todoList = this.getService().findTodoListByUUID(vo);

    return { message: '조회 성공', data: {todoList} };
  }

  /**
   * @description find todo list by todo id
   */
  findTodo = (req,res) => {
    const { UUID } = req.user;
    const { todoId } = req.params;

    if(!todoId) throw new BadRequestException('필수 파라미터 누락');

    const vo = {
      UUID: UUID
      , todoId: todoId
    }

    let todoList = this.getService().findTodoByTodoId(vo);

    return { message: '조회 성공', data: {todoList} };
  }

  /**
   * @description regist todo
   */
  register = (req,res) => {
    const { UUID } = req.user;
    const vo = req.body;
    vo.UUID = UUID;

    const result = this.getService().insertTodo(vo);

    if(!result) throw new Error('등록 실패');

    return { message: '등록 성공', data: {result} };
  }

  /**
   * @description update todo status
   */
  update = (req,res) => {
    const { UUID } = req.user;
    const { todoId } = req.params;
    const vo = req.body;
    
    if(!todoId) throw new BadRequestException('필수 파라미터 누락');

    vo.UUID = UUID;
    vo.todoId = todoId;

    console.log('vo', vo);
    const result = this.getService().updateTodo(vo);

    if(!result.changes) throw new Error('업데이트 실패');

    return { message: '업데이트 성공', data: {result} };
  }

  /**
   * @description delete todo
   */
  delete = (req,res) => {
    const { UUID } = req.user;
    const { todoId } = req.params;
    const vo = req.body;

    if(!todoId) throw new BadRequestException('필수 파라미터 누락');

    vo.UUID = UUID;
    vo.todoId = todoId;

    const result = this.getService().deleteTodo(vo);

    if(!result.changes) throw new Error('삭제 실패');

    return { message: '삭제 성공', data: {result} };
  }
}
