import { configure, getLogger } from 'log4js'

configure({
    appenders: {
        out: { type: 'stdout', layout: { type: 'coloured' } },
        errorFile: { type: 'file', filename: 'logs/errors.log' }
    },
    categories: {
        default: { appenders: ['out'], level: 'ALL' },
        error: { appenders: ['errorFile'], level: 'ERROR' }
    }
})

export const logger = getLogger()
export const errorLogger = getLogger('error')