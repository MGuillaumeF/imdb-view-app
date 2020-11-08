export enum ELOG_LEVEL {
    DEBUG = "DEBUG",
    INFO = "INFO",
    WARN = "WARN",
    ERROR = "ERROR",
    FATAL = "FATAL"
}

export class Logger {
    /**
     * @private
     * @property The level of logger
     */
    private level: ELOG_LEVEL;
    /**
     * @private
     * @static
     * @property The logger instance to lock multi instance of Logger
     */
    private static instance : Logger;
    /**
     * @private to lock direct instance
     * @constructor
     * @param level The logger level
     */
    private constructor(level : ELOG_LEVEL) {
        this.level = level;
    }
    /**
     * @private
     * @method trace To print message in appender 
     * @param level The level of message
     * @param msg The message to print
     */
    private trace (level : ELOG_LEVEL, ...msg : any[]) {
        switch(level) {
            case ELOG_LEVEL.DEBUG :
                console.debug(`[${new Date().toLocaleString()}] - [${level}]`, ...msg);
                break;
            case ELOG_LEVEL.INFO :
                console.info(`[${new Date().toLocaleString()}] - [${level}]`, ...msg);
                break;
            case ELOG_LEVEL.WARN :
                console.warn(`[${new Date().toLocaleString()}] - [${level}]`, ...msg);
                break;
            default:
                console.error(`[${new Date().toLocaleString()}] - [${level}]`, ...msg);
        }
    }
    /**
     * @static
     * @method getIstance To get the instance of Logger
     */
    public static getInstance(): Logger {
        if (!Logger.instance) {
            Logger.instance = new Logger(ELOG_LEVEL.INFO);
        }
        return Logger.instance;
    }
    /**
     * @method getLogLevel To get the logger level
     * @returns the logger level
     */
    public getLogLevel() {
        return this.level;
    }
    /**
     * @method setLogLevel To change logger level 
     * @param level The new level of logger
     */
    public setLogLevel(level : ELOG_LEVEL) {
        this.level = level;
    }
    /**
     * @method debug to print debug message
     * @param msg The message to print
     */
    public debug (...msg : any[]) {
        if (this.level === ELOG_LEVEL.DEBUG) {
            this.trace(ELOG_LEVEL.DEBUG, ...msg);
        }
    }
    /**
     * @method info to print info message
     * @param msg The message to print
     */
    public info (...msg : any[]) {
        if ([ELOG_LEVEL.DEBUG, ELOG_LEVEL.INFO].includes(this.level)) {
            this.trace(ELOG_LEVEL.DEBUG, ...msg);
        }
    }
    /**
     * @method warn to print warn message
     * @param msg The message to print
     */
    public warn (...msg : any[]) {
        if ([ELOG_LEVEL.DEBUG, ELOG_LEVEL.INFO, ELOG_LEVEL.WARN].includes(this.level)) {
            this.trace(ELOG_LEVEL.WARN, ...msg);
        }
    }
    /**
     * @method error to print error message
     * @param msg The message to print
     */
    public error (...msg : any[]) {
        this.trace(ELOG_LEVEL.ERROR, ...msg);
    }
    /**
     * @method fatal to print fatal message
     * @param msg The message to print
     */
    public fatal (...msg : any[]) {
        this.trace(ELOG_LEVEL.FATAL, ...msg);
    }
}
