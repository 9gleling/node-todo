
# 설명
```
cd node-todo
npm install
npm start
```

* `src/server.js` initializing component
* `service.js, dao.js` db handling
* `src/libs/success.js` 성공 success response format return 실패 error middleware 전달
* `src/middlewares/exceptions.js` not found 에러 exception 정의

# Rest API
* user
	* `POST /api/user`  번호 인증 UUID 생성 bearer token return
	* `GET /api/me`
* todo
	* `GET /api/todo` todo 리스트
	* `GET /api/todo/:todoId` todoId로 todo 가져오기
	* `POST /api/todo` todo 등록
	* `PATCH /api/todo/:todoId` todo 상태 update

# Request Format
postman 사용 `request body raw json type`
* user
	* `POST /api/user` 
		```
		{
			"phone": "phone number"
		}	
		```
* todo
	* `POST /api/todo`
		```
		{
			"title": insert title,
			"content": insert content
		}
		```
	* `PATCH /api/todo/:todoId`
		 ```
		{
			"status": insert status(1:진행중, 2:완료, 3:보류),
		}
		```
		
# Response Format
* success
```
{
	"statusCode": http status code,
	"error": false,
	"data": {
		response data
	},
	"message": response message
}

```
* error
```
{
	"statusCode": http status code,
	"error": true,
	"data": null,
	"message": response error message
}
```

# 사용법
* `POST /api/user` 리턴 받은 토큰을 postman Authorization Bearer Token 등록
* `POST /api/todo` todo 생성
* `GET /api/todo` todo 리스트 보기
* `GET /api/todo/:todoId` todoId로 todo 조회
* `PATCH /api/todo/:todoId` todo 상태 변경
* `DELETE /api/todo/:todoId` todo 삭제

