import nodemailer from 'nodemailer'
import { envs } from '../../config/plugins/envs.plugin'
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';
import { LogRepository } from '../../domain/repository/log.repository';

interface SendMailOptions {
    to: string | string[],
    subject: string,
    htmlBody: string,
    attachements?: Atachements[],
}

interface Atachements {
    filename: string, 
    path: string,
}

//todo Attachement


export class EmailService {
    private transporter = nodemailer.createTransport({
        service: envs.MAILER_SERVICE,
        auth: {
            user: envs.MAILER_EMAIL,
            pass: envs.MAILER_SECRET_KEY,
        }
    });

    constructor(
        //private readonly logRepository: LogRepository
    ) {}

    async sendEmail(options: SendMailOptions): Promise<boolean> {

        const { to, subject, htmlBody, attachements = [] } = options;

        try {

            const sentInformation = await this.transporter.sendMail({
                to: to,
                subject: subject,
                html: htmlBody,
                attachments: attachements,
            });

            //console.log(sentInformation);
            //this.logRepository.saveLog(log);

            return true;
        } catch (error) {
            //this.logRepository.saveLog(log);
            return false;
        }
    }

    async sendEmailWithFileSystemLogs( to: string | string[] ){

        const subject = 'Logs del servidor';
        const htmlBody = `
        <h3>Logs de sistema - NOC</h3>
        <p>Minim officia cupidatat laborum duis elit consectetur nostrud laborum Lorem id esse.</p>
        <p>Ver logs adjuntos</p>
        `;

        const attachements: Atachements[] = [
            {filename: 'logs-all.log', path: './logs/logs-all.log',},
            {filename: 'logs-high.log', path: './logs/logs-high.log',},
            {filename: 'logs-medium.log', path: './logs/logs-medium.log',},
        ];

        return this.sendEmail({
            to, subject, attachements, htmlBody
        });
    }
}