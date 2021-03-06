"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jec_commons_1 = require("jec-commons");
const LoggerContextBuilder_1 = require("./utils/LoggerContextBuilder");
const MappedPathUtil_1 = require("../util/paths/MappedPathUtil");
class GlassCatContext {
    constructor(bootstrap) {
        this._bootstrap = null;
        this._root = null;
        this._errorPage = null;
        this._loggerContexts = null;
        this._logLevel = jec_commons_1.LogLevel.TRACE;
        this.initContext(bootstrap);
    }
    initContext(bootstrap) {
        this._bootstrap = bootstrap;
        this.initPaths();
        this.initLogLevel();
        this.initLoggerFactories();
    }
    initPaths() {
        this._root = process.cwd();
        this._errorPage = MappedPathUtil_1.MappedPathUtil.getInstance()
            .resolve(this._bootstrap.config.errorPage);
    }
    initLogLevel() {
        const llu = new jec_commons_1.LogLevelUtil();
        this._logLevel = llu.stringTogLevel(this._bootstrap.config.loggers.logLevel);
    }
    initLoggerFactories() {
        const config = this._bootstrap.config.loggers;
        const factoryRefs = config.factories;
        const ctxBuiler = new LoggerContextBuilder_1.LoggerContextBuilder();
        const loader = jec_commons_1.GlobalClassLoader.getInstance();
        const llu = new jec_commons_1.LogLevelUtil();
        let factoryData = null;
        let len = factoryRefs.length;
        let loggerFactory = null;
        let loggerContext = null;
        let Contructor = null;
        let classPath = null;
        let logLevel = null;
        this._loggerContexts = new Array();
        while (len--) {
            factoryData = factoryRefs[len];
            classPath = MappedPathUtil_1.MappedPathUtil.getInstance().resolve(factoryData.factory);
            Contructor = loader.loadClass(classPath);
            loggerFactory = new Contructor();
            logLevel = factoryData.logLevel;
            loggerContext = ctxBuiler.buildContext(factoryData.name, loggerFactory, logLevel ? llu.stringTogLevel(logLevel) : this._logLevel);
            this._loggerContexts.push(loggerContext);
        }
    }
    getLoggerContexts() {
        return this._loggerContexts;
    }
    getLogLevel() {
        return this._logLevel;
    }
    getVersion() {
        return this._bootstrap.glasscat.version;
    }
    getHttpListenerConfigList() {
        return this._bootstrap.config.http.listeners;
    }
    getLocale() {
        return this._bootstrap.glasscat.locale;
    }
    getErrorPage() {
        return this._errorPage;
    }
    getRoot() {
        return this._root;
    }
}
exports.GlassCatContext = GlassCatContext;
;
