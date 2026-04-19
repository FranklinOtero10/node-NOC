import { envs } from "./envs.plugin"


describe('envs.plugin.ts', () => {


    test('should return env options', () => {

        expect( envs ).toEqual({
            PORT: 3000,
            MAILER_SERVICE: 'gmail',
            MAILER_EMAIL: 'test@gmail.com',
            MAILER_SECRET_KEY: '122123131',
            PROD: false,
            MONGO_URL: 'mongodb://user:123456@localhost:27017/',
            MONGO_DB_NAME: 'NOC-TEST',
            MONGO_USER: 'user',
            MONGO_PASS: '123456'
        });
    });

    test('should return error if not found env', async()=>{

        jest.resetModules();
        process.env.PORT = 'ABC';

        try {
            await import('./envs.plugin');
            expect(true).toBe(false);

        } catch (error) {
            expect(`${error}`).toContain('"PORT" should be a valid integer');
            
        }
    })


})