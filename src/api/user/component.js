import { Router } from 'express';
import successWrapper from '../../libs/success';
import BadRequestException from '../../exceptions/badRequestException';
import { signing } from '../../middlewares/auth';
import UserService from './service';
import Dao from './dao';

export default class UserComponent {
  router = Router();
  service = new UserService(new Dao());

  getService(){
    return this.service;
  }

  constructor () {
    this.initializeRouter();
  }
  initializeRouter(){
    const router = Router();
    const path = '/user';
    router
    .post('/', successWrapper(this.signUp))
    .get('/me', successWrapper(this.me))
    this.router.use(path, router);
  }
  signUp = (req,res) => {
    const { phone } = req.body;
    if(!phone){
      throw new BadRequestException('필수 파라미터 누락: phone number');
    }
    let user = this.getService().findUserByPhone(phone);
    if(!user){
      this.getService().insertUser(phone);
      user = this.getService().findUserByPhone(phone);
    }
    let token = signing(user.UUID);

    return { message: 'OK', data: {token} };
  }

  me = (req,res) => {
    const { UUID } = req.user;
    let user = this.getService().findUserByUUID(UUID);
    
    return { message: 'OK', data: {user} };
  }
}
