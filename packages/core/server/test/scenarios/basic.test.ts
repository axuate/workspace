import request from 'supertest';
import { HttpResponse } from '@axuate/http';
import { createServer } from '../../src/createServer';
import { Controller } from '../../src/decorators/Controller';
import { Get } from '../../src/decorators/Get';
import type { Middleware } from '../../src/entities/Middleware';
import { Injectable } from '@axuate/container';

describe('Basic', () => {
  beforeAll(() => {
    jest.resetAllMocks();
  });

  it('should return 404 if the route does not exist', async () => {
    const server = createServer({});
    await request(server).get('/test').expect(404);
  });

  it('should return HttpResponse from controller', async () => {
    @Controller()
    class TestController {
      @Get('/test')
      public getTest(): HttpResponse {
        return new HttpResponse(200);
      }
    }

    const server = createServer({
      controllers: [TestController]
    });

    await request(server).get('/test').expect(200);
  });

  it('should add prefix to request path', async () => {
    @Controller({ prefix: '/api' })
    class TestController {
      @Get('/test')
      public getTest(): HttpResponse {
        return new HttpResponse(200);
      }
    }

    const server = createServer({
      controllers: [TestController]
    });

    await request(server).get('/api/test').expect(200);
  });

  it('should add version to request path', async () => {
    @Controller({ version: 1 })
    class TestController {
      @Get('/test')
      public getTest(): HttpResponse {
        return new HttpResponse(200);
      }
    }

    const server = createServer({
      controllers: [TestController]
    });

    await request(server).get('/v1/test').expect(200);
  });

  it('should call middleware', async () => {
    @Controller()
    class TestController {
      @Get('/test')
      public getTest(): HttpResponse {
        return new HttpResponse(200);
      }
    }

    @Injectable
    class TestMiddleware implements Middleware {
      public onResponse(): HttpResponse {
        return new HttpResponse(201);
      }
    }

    const server = createServer({
      middlewares: [TestMiddleware],
      controllers: [TestController]
    });

    await request(server).get('/test').expect(201);
  });
});
