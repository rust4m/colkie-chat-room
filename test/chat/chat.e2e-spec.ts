import { app } from '../../jest.e2e-setup';
import * as request from 'supertest';

let groupId;
let userId;

describe('Chat Controller -> Create Group (POST)', () => {
    it('Creates and returns new group', async () => {
        const res = await request(app.getHttpServer())
            .post('/chat/group/create')
            .send({ name: 'some group' });

        const resBody = res.body;

        expect(resBody.statusCode).toBe(200);
        expect(resBody.timeStamp).toBe(new Date().toUTCString());

        expect(resBody.data).toHaveProperty('name');
        expect(resBody.data).toHaveProperty('id');
        expect(resBody.data).toHaveProperty('createdAt');

        groupId = resBody.data.id;
    });
});

describe('Chat Controller -> Create User (POST)', () => {
    it('Creates and returns new user', async () => {
        const res = await request(app.getHttpServer())
            .post('/chat/user/create')
            .send({
                fullName: 'Rustam',
                groupIds: [groupId],
            });

        const resBody = res.body;

        expect(resBody.statusCode).toBe(200);
        expect(resBody.timeStamp).toBe(new Date().toUTCString());

        expect(resBody.data).toHaveProperty('fullName');
        expect(resBody.data).toHaveProperty('groups');
        expect(resBody.data).toHaveProperty('createdAt');
        expect(resBody.data).toHaveProperty('id');

        userId = resBody.data.id;
    });
});

describe('Chat Controller -> Create Message (POST)', () => {
    it('Creates and returns new messsage', async () => {
        const res = await request(app.getHttpServer()).post('/chat/message/create').send({
            content: 'hello',
            subject: 'work',
            userId,
        });

        const resBody = res.body;

        expect(resBody.statusCode).toBe(200);
        expect(resBody.timeStamp).toBe(new Date().toUTCString());

        expect(resBody.data).toHaveProperty('content');
        expect(resBody.data).toHaveProperty('subject');
        expect(resBody.data).toHaveProperty('prevMessageId');
        expect(resBody.data).toHaveProperty('user');
        expect(resBody.data).toHaveProperty('userGroups');
        expect(resBody.data).toHaveProperty('id');
        expect(resBody.data).toHaveProperty('createdAt');
    });
});

describe('Chat Controller -> Get Group Messages (GET)', () => {
    it('Returns group messages', async () => {
        const res = await request(app.getHttpServer()).get(`/chat/group/${groupId}/messages`).send({
            content: 'hello',
            subject: 'work',
            userId,
        });

        const resBody = res.body;

        expect(resBody.statusCode).toBe(200);
        expect(resBody.timeStamp).toBe(new Date().toUTCString());

        resBody.data.map(item => {
            expect(item).toHaveProperty('prevMessageId');
            expect(item).toHaveProperty('subject');
            expect(item).toHaveProperty('content');
            expect(item).toHaveProperty('id');
            expect(item).toHaveProperty('createdAt');
        });
    });
});
