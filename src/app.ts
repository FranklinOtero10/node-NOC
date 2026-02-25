import { PrismaClient } from "@prisma/client";
import { envs } from "./config/plugins/envs.plugin";
import { MongoDatabase } from "./data/mongo";
import { Server } from "./presentation/server";
import { LogModel } from './generated/prisma/client';


(async() => {
    main();
})();

async function main(){

    await MongoDatabase.connect({
        mongoUrl: envs.MONGO_URL,
        dbName: envs.MONGO_DB_NAME,
    })

    //const prisma = new PrismaClient();
    /* 
    const newLog = await prisma.logModel.create({
        data: {
            level: 'MEDIUM',
            message: 'Test message',
            origin: 'App.ts'
        }
    });

    console.log({ newLog}); */

    /* const logs = await prisma.logModel.findMany({
        where: {
            level: "HIGH",
        }
    });
    console.log(logs); */

    // Crear un coleccion = tables, documento = regustro
    /* const newLog = await LogModel.create({
        message: 'Test message from Mongo',
        origin: 'App.ts',
        level: 'low',
    });

    await newLog.save();

    console.log(newLog);

    const logs = await LogModel.find();
    console.log(logs); */

    Server.start();
}