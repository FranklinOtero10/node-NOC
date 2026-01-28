import { CronJob } from "cron";

//* Patron adaptador

type Crontime = string | Date;
type OnTick = () => void;

export class CronService {

    //? Mas de 3 argumentos van en un objeto CLEAN CODE
    static createJob( cronTime: Crontime, onTick: OnTick): CronJob {
        const job = new CronJob( cronTime, onTick);

        job.start();

        return job;
    }
}