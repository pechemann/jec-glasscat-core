"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LoggerManager_1 = require("../../util/logging/LoggerManager");
const LocaleManager_1 = require("../../i18n/LocaleManager");
const jec_commons_1 = require("jec-commons");
const jec_commons_node_1 = require("jec-commons-node");
const CacheableFile_1 = require("./CacheableFile");
class DefaultSourceFileInspector {
    constructor() {
        this._processors = null;
        this._sourcePaths = null;
        this._connector = null;
        this._target = null;
        this._walkUtil = null;
        this._cache = null;
        this._inspectModeUtil = null;
        this.init();
    }
    init() {
        this._processors = new Array();
        this._sourcePaths = new Array();
        this._walkUtil = new jec_commons_node_1.WalkPathUtil();
        this._cache = new Map();
        this._inspectModeUtil = new jec_commons_1.InspectModeUtil();
    }
    inspectSourcePath(sourcePath, inspectMode) {
        let file = null;
        let targetPath = this._target + sourcePath;
        let cacheableFile = null;
        let fillCacheMode = inspectMode === jec_commons_1.InspectMode.FILL_CACHE;
        let cachedFiles = null;
        if (fillCacheMode) {
            cachedFiles = new Array();
            this._cache.set(sourcePath, cachedFiles);
        }
        this.notifyProcessStart(targetPath);
        this._walkUtil.walkSync(targetPath, (file) => {
            if (fillCacheMode) {
                cacheableFile = new CacheableFile_1.CacheableFile();
                cacheableFile.file = file;
                cacheableFile.sourcePath = sourcePath;
                cachedFiles.push(cacheableFile);
            }
            this.processFile(file);
        });
        this.notifyProcessComplete(targetPath);
    }
    processFile(file) {
        let len = this._processors.length;
        while (len--) {
            this._processors[len].process(file, this._connector);
        }
    }
    notifyProcessStart(sourcePath) {
        let len = this._processors.length;
        while (len--) {
            this._processors[len].processStart(this._connector, sourcePath);
        }
    }
    notifyProcessComplete(sourcePath) {
        let len = this._processors.length;
        while (len--) {
            this._processors[len].processComplete(this._connector, sourcePath);
        }
    }
    inspectCache() {
        let len = -1;
        let cacheableFile = null;
        let targetPath = this._target;
        this._cache.forEach((value, srcPath) => {
            targetPath = this._target + srcPath;
            this.notifyProcessStart(targetPath);
            len = value.length;
            while (len--) {
                cacheableFile = value[len];
                this.processFile(cacheableFile.file);
            }
            this.notifyProcessComplete(targetPath);
        });
    }
    setWatcher(connector) {
        let logManager = LoggerManager_1.LoggerManager.getInstance();
        let i18n = LocaleManager_1.LocaleManager.getInstance();
        if (this._connector) {
            logManager.error(i18n.get("srcInspector.initError"));
        }
        else {
            this._connector = connector;
            this._target = connector.getTarget() + jec_commons_1.UrlStringsEnum.SLASH;
            logManager.info(i18n.get("srcInspector.init"));
            this.addSourcePath("src");
        }
    }
    getWatcher() {
        return this._connector;
    }
    addProcessor(processor) {
        this._processors.push(processor);
        LoggerManager_1.LoggerManager.getInstance().info(LocaleManager_1.LocaleManager.getInstance().get("srcInspector.processorAdded", processor.constructor.name));
    }
    removeProcessor(processor) {
        let result = false;
        let id = this._processors.indexOf(processor);
        if (id !== -1) {
            this._processors.splice(id, 1);
            LoggerManager_1.LoggerManager.getInstance().info(LocaleManager_1.LocaleManager.getInstance().get("srcInspector.processorRemoved", processor.constructor.name));
        }
        return result;
    }
    addSourcePath(path) {
        this._sourcePaths.push(path);
        LoggerManager_1.LoggerManager.getInstance().info(LocaleManager_1.LocaleManager.getInstance().get("srcInspector.sourcePathAdded", path));
    }
    inspect(inspectMode) {
        let len = this._processors.length;
        let logManager = LoggerManager_1.LoggerManager.getInstance();
        let i18n = LocaleManager_1.LocaleManager.getInstance();
        if (len > 0) {
            logManager.info(i18n.get("srcInspector.lookupStart"));
            logManager.info(i18n.get("srcInspector.inspectMode", this._inspectModeUtil.inspectModeToString(inspectMode)));
            if (inspectMode === jec_commons_1.InspectMode.READ_CACHE) {
                this.inspectCache();
            }
            else {
                len = this._sourcePaths.length;
                while (len--) {
                    this.inspectSourcePath(this._sourcePaths[len], inspectMode);
                }
            }
            logManager.info(i18n.get("srcInspector.lookupComplete"));
        }
    }
    clearCache() {
        this._cache.clear();
    }
}
exports.DefaultSourceFileInspector = DefaultSourceFileInspector;
