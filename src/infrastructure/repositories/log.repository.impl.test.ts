import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { LogRepositoryImpl } from "./log.repository.impl";


describe('LogRepositoryImpl', () => {

    const mockLogDatasource = {
        saveLog: jest.fn(),
        getLogs: jest.fn(),
    }

    const logRepository = new LogRepositoryImpl(mockLogDatasource);

    beforeEach(() => {
        jest.clearAllMocks();
    })

    //? Objetos en js se pasan por referencia

    test('saveLog should call the datasource with argumentes', async() => {

        const log = { level: LogSeverityLevel.high, message: 'hola'} as LogEntity;
        await logRepository.saveLog( log );
        expect( mockLogDatasource.saveLog ).toHaveBeenCalledWith( log );
        
    });

    test('getLogs should call the datasource with argumentes', async() => {

        const lowSeverity = LogSeverityLevel.high;

        await logRepository.getLogs( lowSeverity );
        expect( mockLogDatasource.getLogs ).toHaveBeenCalledWith( lowSeverity );
        
    });

})