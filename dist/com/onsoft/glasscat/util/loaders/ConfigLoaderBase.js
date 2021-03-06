"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MappedPathUtil_1 = require("../paths/MappedPathUtil");
const LoggerManager_1 = require("../logging/LoggerManager");
const jec_commons_node_1 = require("jec-commons-node");
const GlassCatLocaleManager_1 = require("../../i18n/GlassCatLocaleManager");
const GlassCatError_1 = require("../../exceptions/GlassCatError");
const GlassCatErrorCode_1 = require("../../exceptions/GlassCatErrorCode");
class ConfigLoaderBase {
    constructor() { }
    loadConfigSync(filePath) {
        const path = MappedPathUtil_1.MappedPathUtil.getInstance().resolve(filePath);
        let json = null;
        let logManager = null;
        let i18n = null;
        try {
            json = jec_commons_node_1.GlobalJsonLoader.getInstance().loadSync(path);
        }
        catch (e) {
            logManager = LoggerManager_1.LoggerManager.getInstance();
            i18n = GlassCatLocaleManager_1.GlassCatLocaleManager.getInstance();
            if (logManager.isInitialized() && i18n.isInitialized()) {
                logManager.error(i18n.get("errors.loadingFile", e));
            }
            throw new GlassCatError_1.GlassCatError(GlassCatErrorCode_1.GlassCatErrorCode.CONFIG_LOADING_FAILURE, e);
        }
        return json;
    }
    loadConfig(filePath, success, error) {
        const path = MappedPathUtil_1.MappedPathUtil.getInstance().resolve(filePath);
        let logManager = null;
        let i18n = null;
        let gcError = null;
        jec_commons_node_1.GlobalJsonLoader.getInstance().load(path, success, (e) => {
            logManager = LoggerManager_1.LoggerManager.getInstance();
            i18n = GlassCatLocaleManager_1.GlassCatLocaleManager.getInstance();
            if (logManager.isInitialized() && i18n.isInitialized()) {
                logManager.error(i18n.get("errors.loadingFile", e));
            }
            ;
            gcError = new GlassCatError_1.GlassCatError(GlassCatErrorCode_1.GlassCatErrorCode.CONFIG_LOADING_FAILURE, e);
            error(gcError);
        });
    }
}
exports.ConfigLoaderBase = ConfigLoaderBase;
;
