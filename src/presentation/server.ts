import { CronJob } from "cron";
import { CronService } from "./cron/cron-service";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { EmailService } from "./email/email.service";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";
import { MongoLogDatasource } from "../infrastructure/datasources/mongo-log.datasource";
import { LogSeverityLevel } from "../domain/entities/log.entity";
import { PostgresLogDatasource } from "../infrastructure/datasources/postgres-log.datasource";
import { CheckServiceMultiple } from "../domain/use-cases/checks/check-service-multiple";


const fsLogRepository = new LogRepositoryImpl(
    new FileSystemDatasource(),
);

const mongoLogRepository = new LogRepositoryImpl(
    new MongoLogDatasource(),
);

const postgresLogRepository = new LogRepositoryImpl(
    new PostgresLogDatasource(),
);

//const emailService = new EmailService();


export class Server {

    public static async start() {

        console.log('Server started...');

        //? Mandar email

        /* new SendEmailLogs(
            emailService, 
            fileSystemLogRepository
        ).execute(
            ['test98@gmail.com', 'test1@gmail.com'],
        ) */


        /* const emailService = new EmailService(
            fileSystemLogRepository,
        );
        emailService.sendEmailWithFileSystemLogs(
            ['test98@gmail.com', 'test1@gmail.com']
        ); */

        /* const logs = await logRepository.getLogs(LogSeverityLevel.high);
        console.log(logs); */


        //* Usando solo un servicio de guardado (filesystem, mongo, postgres)
        // CronService.createJob(
        //     '*/5 * * * * *',
        //     () => {
        //         const url ='https://google.com'
        //         new CheckService(
        //             logRepository,
        //             () => console.log(` ${ url } is ok`),
        //             ( error ) => console.log( error )
        //         ).execute( url );
        //         //new CheckService().execute( 'http://localhost:3000');
        //     }
        // );
        //*

        //? Usando guardado multiple 3 servicios
        CronService.createJob(
            '*/5 * * * * *',
            () => {
                const url ='https://google.com'
                new CheckServiceMultiple(
                    [fsLogRepository, mongoLogRepository, postgresLogRepository],
                    () => console.log(` ${ url } is ok`),
                    ( error ) => console.log( error )
                ).execute( url );
                //new CheckService().execute( 'http://localhost:3000');
            }
        );

        //?
        
    }
}