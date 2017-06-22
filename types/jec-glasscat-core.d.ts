/*!
 * JEC GlassCat Core Node Module
 * Copyright(c) 2017 Pascal ECHEMANN
 * Apache 2.0 Licensed
 * This is a part of the JEC Projects: <https://github.com/pechemann/JEC>
 */

declare module "jec-glasscat-core" {

import { SourceFileInspector, FilePreProcessor, FileProperties, JcadContext,
         JecContainer, Decorator, AbstractDecoratorConnector, UrlPattern,
         AbstractLogger, LogFormatter, Logger } from "jec-commons";
import { JsletContext, Jslet, SessionError, HttpResponse, HttpRequest,
         WebJsletParams, SessionContext, SecurityContext, CookieOptions,
         SendFileOptions, SecurityRole, SecurityConstraint, StaticResources,
         SessionId, SessionOwner, Session, Credentials   } from "jec-exchange";
import * as express from "express";
import * as http from "http";


export class BootstrapConfig {
    constructor();
    glasscat: GlasscatConfig;
    config: ToolsConfig;
}
export class GlasscatConfig {
    constructor();
    version: string;
    locale: string;
}
export class HttpConfig {
    constructor();
    listeners: HttpListenerConfig[];
}
export class HttpListenerConfig {
    constructor();
    monitoring: HttpMonitoringConfig;
    id: string;
    port: number;
    address: string;
    secured: boolean;
    server: string;
    sslPath: string;
    domain: string;
    securityConfig: string[];
}
export class HttpMonitoringConfig {
    constructor();
    enabled: boolean;
    factory: string;
}
export class LoggerFactoryConfig {
    constructor();
    name: string;
    factory: string;
    logLevel: string;
}
export class LoggersConfig {
    constructor();
    logLevel: string;
    factories: LoggerFactoryConfig[];
}
export class SecurityConfig {
    constructor();
    headerModules: any[];
}
export class ToolsConfig {
    constructor();
    loggers: LoggersConfig;
    http: HttpConfig;
    security: SecurityConfig;
    errorPage: string;
}
export class BootstrapConfigParser {
    constructor();
    private parseGlasscatConfig(bootstrap);
    private parseToolsConfig(bootstrap);
    private parserHttpListener(httpListener);
    private parseHttpMonitoring(monitoring);
    private parseHttpConfig(httpData);
    private parseLoggersConfig(loggers);
    private parseSecurityConfig(security);
    parse(bootstrap: any): BootstrapConfig;
}
export class DomainContext {
    constructor();
    private _map;
    init(): void;
    addDomain(domain: Domain): void;
    getDomainList(): Domain[];
}
export class Domain {
    constructor();
    name: string;
    host: string;
    target: string;
    connector: DomainConnectorConfig;
}
export class DomainConfig {
    constructor();
    domains: Domain[];
}
export class DomainConnectorConfig {
    constructor();
    type: string;
    server: string;
}
export class DomainBuilder {
    constructor();
    buildDomainConnector(connector: any): DomainConnectorConfig;
    buildDomain(config: any): Domain;
}
export class DomainConfigLoader extends ConfigLoaderBase implements ConfigLoader {
    constructor();
    private static readonly DOMAIN_FILE_PATH;
    loadSync(): any;
    load(success: (data: any) => void, error: (err: any) => void): void;
}
export class DomainConfigParser {
    constructor();
    private parseDomains(domains);
    parse(manifest: any): DomainConfig;
}
export class DomainConfigSerializer {
    constructor();
    serialize(config: DomainConfig, success: (data: string) => void, error: (err: any) => void): void;
}
export class DomainConfigUpdater {
    constructor();
    private static readonly DOMAIN_FILE_PATH;
    private _serializer;
    private init();
    update(config: DomainConfig, result: (err: any) => void): void;
}
export class DomainContextBuilder {
    constructor();
    buildContext(config: any): DomainContext;
}
export class EjpBootstrapConfig {
    constructor();
    path: string;
    priority: number;
}
export class EjpConfig {
    constructor();
    webapp: EjpWebAppConfig;
}
export class EjpConstraintConfig {
    constructor();
    name: string;
    roles: string[];
    urlPattern: string;
    errorUrl: string;
}
export class EjpFormConfig {
    constructor();
    loginUrl: string;
    errorUrl: string;
}
export class EjpJsletsConfig {
    constructor();
    configFile: string;
    config: string[];
    enableAutowire: boolean;
}
export class EjpLoginConfig {
    constructor();
    authMethod: string;
    formConfig: EjpFormConfig;
    realm: EjpRealmConfig;
}
export class EjpRealmConfig {
    constructor();
    type: string;
    securedArea: string;
    connectorFactory: string;
}
export class EjpResourceMapperConfig {
    constructor();
    name: string;
    value: string;
}
export class EjpRoleConfig {
    constructor();
    name: string;
    path: string;
}
export class EjpSecurityConfig {
    constructor();
    constraints: EjpConstraintConfig[];
    roles: EjpRoleConfig[];
    staticResources: EjpStaticResourcesConfig[];
}
export class EjpSessionConfig {
    constructor();
    storage: string;
    errorUrl: string;
    maxAge: number;
}
export class EjpStaticResourcesConfig {
    constructor();
    urlPattern: string;
}
export class EjpWebAppConfig {
    constructor();
    name: string;
    description: string;
    version: string;
    author: string;
    contextRoot: string;
    state: string;
    welcomeFile: string;
    jslets: EjpJsletsConfig;
    bootstrap: EjpBootstrapConfig[];
    session: EjpSessionConfig;
    resourceMap: Array<EjpResourceMapperConfig>;
    login: EjpLoginConfig;
    security: EjpSecurityConfig;
}
export class EjpConfigLoader extends ConfigLoaderBase {
    constructor();
    static readonly MANIFEST_PATH: string;
    loadSync(projectPath: string): any;
    load(projectPath: string, success: (data: any) => void, error: (err: any) => void): void;
}
export class EjpConfigParser {
    constructor();
    private parseWebApp(manifest);
    private parseSecurity(manifest);
    private parseStaticConfig(staticResources);
    private parseRolesConfig(roles);
    private parseConstraintsConfig(constraints);
    private parseLogin(manifest);
    private parseFormConfig(manifest);
    private parseRealm(manifest);
    private parseJslets(manifest);
    private parseBootstrapFiles(manifest);
    private parseResourceMap(manifest);
    private parseSession(manifest);
    parse(manifest: any): EjpConfig;
}
export class EjpConfigSerializer {
    constructor();
    private _validator;
    private init();
    private stringify(config, optimize);
    private optimizeWebbAppConfig(result, webapp);
    private optimizeBootstrapConfig(result, config);
    private optimizeJsletConfig(result, jsletConfig);
    private optimizeLoginConfig(result, loginConfig);
    private optimizeSessionConfig(result, sessionConfig);
    private optimizeResourceMapConfig(result, resourceMapper);
    private optimizeSecurityConfig(result, securityConfig);
    private optimizeRoles(rolesConfig);
    private optimizeConstraints(constraintsConfig);
    private optimizeStaticResources(staticResourcesConfig);
    serialize(config: EjpConfig, success: (data: string) => void, error: (err: any) => void, optimize?: boolean): void;
}
export class EjpConfigUpdater {
    constructor();
    private _serializer;
    private init();
    update(projectPath: string, config: EjpConfig, result: (err: any) => void, optimize?: boolean): void;
}
export class EjpConfigValidator {
    constructor();
    validate(config: EjpConfig, result: (err: any) => void): void;
}
export class DefaultSourceFileInspector implements SourceFileInspector {
    constructor();
    private _processors;
    private _sourcePaths;
    private _connector;
    private _target;
    private _walkUtil;
    private init();
    private inspectSourcePath(sourcePath);
    private processFile(file);
    private notifyProcessStart(sourcePath);
    private notifyProcessComplete(sourcePath);
    setWatcher(connector: DomainConnector): void;
    getWatcher(): DomainConnector;
    addProcessor(processor: FilePreProcessor): void;
    addSourcePath(path: string): void;
    inspect(): void;
}
export class GlassCatContext {
    constructor(bootstrap: BootstrapConfig);
    private _bootstrap;
    private _root;
    private _errorPage;
    private _loggerContexts;
    private _logLevel;
    private initContext(bootstrap);
    private initPaths();
    private initLogLevel();
    private initLoggerFactories();
    getLoggerContexts(): LoggerContext[];
    getLogLevel(): number;
    getVersion(): string;
    getHttpListenerConfigList(): Array<HttpListenerConfig>;
    getLocale(): string;
    getErrorPage(): string;
    getRoot(): string;
}
export class LoggerContext {
    constructor();
    factory: LoggerFactory;
    name: string;
    logLevel: number;
}
export class GlassCatConfigLoader extends ConfigLoaderBase implements ConfigLoader {
    constructor();
    private static readonly BOOTSTRAP_FILE_PATH;
    loadSync(): any;
    load(success: (data: any) => void, error: (err: any) => void): void;
}
export class GlassCatConfigUpdater {
    constructor();
    private static readonly BOOTSTRAP_FILE_PATH;
    update(config: BootstrapConfig, result: (err: any) => void): void;
}
export class GlassCatContextBuilder {
    constructor();
    buildContext(): GlassCatContext;
}
export class LoggerContextBuilder {
    constructor();
    buildContext(name: string, factory: LoggerFactory, logLevel: number): LoggerContext;
}
export class ContextValidator implements KernelValidator {
    constructor();
    validate(kernel: Kernel): void;
}
export class EnvironmentValidator implements KernelValidator {
    constructor();
    validate(kernel: Kernel): void;
}
export interface KernelValidator {
    validate(kernel: Kernel): void;
}
export class DomainConnectorManager {
    constructor();
    private _connectorMap;
    private _contextRootUtil;
    private _errorPage;
    init(): void;
    addConnector(connector: DomainConnector, listener: HttpListener): void;
    getDomainConnector(contextRoot: string): DomainConnector;
    getErrorPage(): string;
    setErrorPage(errorPage: string): void;
}
export class GlassCat {
    constructor();
    private _kernel;
    private runProcesses();
    private killProcesses();
    private initKernel();
    private initLogger();
    private checkConfig();
    private initServices();
    private startServices();
    start(): void;
    stop(): void;
}
export class HttpServiceManager {
    constructor();
    private _httpServiceMap;
    init(): void;
    initManagers(connectorManager: DomainConnectorManager, securityManager: SecurityManager): void;
    addService(service: HttpService): void;
    getService(name: string): HttpService;
    startServices(): void;
    stopServices(): void;
}
export class JsletManager {
    constructor();
    private _jsletContextMap;
    private init();
    addContext(ref: string, context: JsletContext): void;
    getContext(ref: string): JsletContext;
    getJslet(ref: string, url: string): Jslet;
}
export class Kernel {
    constructor();
    private static readonly VERSION;
    private static readonly CODE_NAME;
    private _startTime;
    private _context;
    private _httpServiceManager;
    private _domainConnectorManager;
    private _jsletManager;
    private _securityManager;
    private _jcadContext;
    private init();
    private initJcadContext();
    private createHttpListeners();
    private initLocales();
    private initDomainConnectors();
    private initSecurityLayer();
    private initJsletEngine();
    private initSingletons();
    private initRootPath(root);
    initContext(): void;
    initServices(): void;
    startServices(): void;
    stopServices(): void;
    getContext(): GlassCatContext;
    getVersion(): string;
}
export class SecurityManager {
    constructor();
    private _contextRootUtil;
    private _connectorManager;
    private init();
    private validateSession(session, constraint);
    private isStaticResource(crd, context, properties);
    setDomainConnectorManager(manager: DomainConnectorManager): void;
    validateTransaction(req: express.Request, res: express.Response, service: HttpService, result: (error?: AuthenticationError) => any): void;
    getHeaderSecurityParams(service: HttpService): string[];
    processSession(service: HttpService, req: express.Request, res: express.Response, result: (error?: SessionError) => any): void;
}
export class SplashScreen {
    constructor();
    displayMessage(version: string): void;
}
export class SourceMapProcessor implements FilePreProcessor {
    constructor();
    private _fileList;
    private init();
    processStart(watcher: any, sourcePath: string): void;
    process(file: FileProperties, connector: DomainConnector): void;
    processComplete(connector: DomainConnector, sourcePath: string): void;
    getGraph(): void;
}
export class AbstractDomainConnector implements DomainConnector {
    constructor();
    protected __version: string;
    protected __name: string;
    protected __target: string;
    protected __contextRoot: string;
    protected __host: string;
    protected __config: EjpConfig;
    protected __server: string;
    protected __container: DomainContainer;
    private _startDate;
    private _jcadContext;
    private getServerInfo();
    init(version: string, data: any, jsletManager: JsletManager, jcadContext: JcadContext): void;
    getName(): string;
    getTarget(): string;
    getContextRoot(): string;
    getHost(): string;
    getServer(): string;
    getContainer(): DomainContainer;
    getConfig(): EjpConfig;
    getJcadContext(): JcadContext;
    getStatusInfo(): any;
}
export interface DomainConnector {
    getName(): string;
    getTarget(): string;
    init(version: string, data: any, jsletManager: JsletManager, jcadContext: JcadContext): void;
    getContextRoot(): string;
    getHost(): string;
    getServer(): string;
    getStatusInfo(): any;
    getContainer(): DomainContainer;
    getConfig(): EjpConfig;
    getJcadContext(): JcadContext;
}
export class EjpConnector extends AbstractDomainConnector {
    constructor();
    init(version: string, data: any, jsletManager: JsletManager, jcadContext: JcadContext): void;
    toString(): string;
}
export class DomainConnectorBuilder {
    constructor();
    private static readonly EJP;
    build(version: string, data: any, jsletManager: JsletManager, jcadContext: JcadContext): DomainConnector;
}
export class DomainConnectorManagerBuilder {
    constructor();
    build(version: string, context: GlassCatContext, httpManager: HttpServiceManager, jsletManager: JsletManager, securityManager: SecurityManager, jcadContext: JcadContext): DomainConnectorManager;
}
export interface DomainContainer extends JecContainer {
    init(connector: DomainConnector, jsletManager: JsletManager): void;
    getJsletContext(): JsletContext;
    getLoginStrategy(): LoginStrategy;
    getSourceFileInspector(): SourceFileInspector;
    process(properties: HttpLocalProperties, req: HttpRequest, res: HttpResponse, result: (error?: DomainRequestError) => any): void;
    getState(): string;
    getMappedResource(name: string): string;
    getLogger(): Logger;
}
export class DomainState {
    static readonly STATELESS: string;
    static readonly STATEFUL: string;
}
export class EjpContainer implements DomainContainer {
    constructor();
    private _connector;
    private _jsletManager;
    private _jsletContext;
    private _contextRoot;
    private _webapp;
    private _src;
    private _welcomeFile;
    private _state;
    private _resourceMap;
    private _sourceFileInspector;
    private _templateProcessor;
    private _loginStrategy;
    private _contextManager;
    private initConfig(config);
    private createLoginStrategy(config);
    private initResourceMap(config);
    private initLoginStrategy();
    private initState(config);
    private initBootstrapScripts(config);
    private initSessionContext(config);
    private initSecurityContext(config);
    private initSourceFileInspector();
    private initJsletContextManager();
    private deleteJsletContextManager();
    init(connector: DomainConnector, jsletManager: JsletManager): void;
    getJsletContext(): JsletContext;
    getLoginStrategy(): LoginStrategy;
    getSourceFileInspector(): SourceFileInspector;
    getLogger(): Logger;
    process(properties: HttpLocalProperties, req: HttpRequest, res: HttpResponse, result: (error?: DomainRequestError) => any): void;
    getState(): string;
    toString(): string;
    getMappedResource(name: string): string;
}
export class DomainRequestError {
    constructor();
    statusCode: number;
    detailsCode: string;
    message: string;
    static buildNotFoundError(): DomainRequestError;
}
export class LocaleManager {
    constructor();
    private static INSTANCE;
    static getInstance(): LocaleManager;
    init(locale: string): void;
    get(key: string, ...replace: string[]): string;
}
export class EjpJsletContext implements JsletContext {
    constructor(connector: DomainConnector, securityContext: SecurityContext, sessionContext: SessionContext, loginStrategy: LoginStrategy);
    private _jsletMap;
    private _urlPatternUtils;
    private _urlPatternBuilder;
    private _urlPatternColl;
    private _connector;
    private _securityContext;
    private _sessionContext;
    private _loginStrategy;
    private init(connector, securityContext, sessionContext, loginStrategy);
    addJslet(jslet: Jslet): void;
    getJslet(url: string): Jslet;
    getStatusInfo(): any;
    getDirectoryPath(): string;
    getSourcePath(): string;
    getSecurityContext(): SecurityContext;
    getSessionContext(): SessionContext;
    authenticate(req: HttpRequest, res: HttpResponse, result: (error?: any) => void): void;
    invalidateSession(req: HttpRequest, res: HttpResponse, result: (error?: SessionError) => any): void;
    getLogger(): Logger;
}
export class JsletConnector extends AbstractDecoratorConnector {
    constructor(jcadReference: string, decorator: Decorator);
}
export class WebJsletDecorator implements Decorator {
    constructor();
    decorate(target: any, params: WebJsletParams): any;
}
export class JsletContextManager {
    constructor();
    private _jcadContext;
    private initContext(jcadReference, decoratorClass);
    private removeContext(jcadReference);
    createContext(jcadContext: JcadContext): void;
    deleteContext(): void;
}
export class JsletContextBuilder {
    constructor();
    private static INSTANCE;
    static getInstance(): JsletContextBuilder;
    init(): void;
    private buildJslet(path, target);
    buildContext(connector: DomainConnector, securityContext: SecurityContext, sessionContext: SessionContext, loginStrategy: LoginStrategy): JsletContext;
    initJslets(context: JsletContext, jslets: string[]): void;
}
export class JsletsAutowireProcessor implements FilePreProcessor {
    constructor();
    private static readonly WEBJSLET_MASK;
    private static readonly EXCHANGE_MASK;
    private _jsletFiles;
    private initObj();
    processStart(connector: DomainConnector, sourcePath: string): void;
    process(file: FileProperties, connector: DomainConnector): void;
    processComplete(connector: DomainConnector, sourcePath: string): void;
}
export interface ConnectionListener {
    getId(): string;
    getPort(): number;
    getAdress(): string;
    getServer(): string;
}
export class GlassCatHttpRequest implements HttpRequest {
    constructor(req: express.Request);
    protected __expReq: express.Request;
    private init(req);
    getBaseUrl(): string;
    getBody(): any;
    getCookies(): any;
    getHostname(): string;
    getIp(): string;
    getMethod(): string;
    getOriginalUrl(): string;
    getPath(): string;
    getProtocol(): string;
    getQuery(): any;
    isSecured(): boolean;
    accepts(types: string | string[]): string | void;
    acceptsCharsets(charset: string | string[]): string | boolean;
    acceptsEncodings(encoding: string | string[]): string | boolean;
    acceptsLanguages(lang: string | string[]): string | boolean;
    getHeader(field: string): string;
    isTypeOfContent(type: string | string[]): boolean;
}
export class GlassCatHttpResponse implements HttpResponse {
    constructor(res: express.Response);
    protected __expRsq: express.Response;
    private init(res);
    getHeadersSent(): boolean;
    attachment(filename?: string): HttpResponse;
    cookie(name: string, value: string, options?: CookieOptions): HttpResponse;
    clearCookie(name: string, options?: CookieOptions): HttpResponse;
    download(path: string, filename?: string, complete?: (err?: Error) => any): void;
    end(data?: any, encoding?: string): HttpResponse;
    format(obj: any): HttpResponse;
    getHeader(field: string): string;
    links(links: any): HttpResponse;
    location(path: string): HttpResponse;
    redirect(path: string): HttpResponse;
    send(body: any): HttpResponse;
    sendFile(path: string, options?: SendFileOptions, complete?: (err?: Error) => any): HttpResponse;
    sendStatus(statusCode: number): HttpResponse;
    setHeader(field: string, value: string): HttpResponse;
    status(statusCode: number): HttpResponse;
    type(type: string): HttpResponse;
    vary(field: string): HttpResponse;
    getLocalProperties(): HttpLocalProperties;
}
export class ConsoleTransactionMonitor implements TransactionMonitor {
    constructor();
    send(transaction: HttpTransaction): void;
}
export class ConsoleTransactionMonitorFactory implements TransactionMonitorFactory {
    constructor();
    build(): TransactionMonitor;
}
export class HttpTransaction {
    constructor(url: string);
    private init(url);
    private _id;
    private _url;
    private _initialTimestamp;
    private _finalTimestamp;
    private _closed;
    private _success;
    getInitialTimestamp(): number;
    getFinalTimestamp(): number;
    getUrl(): string;
    getId(): string;
    isClosed(): boolean;
    getSuccess(): boolean;
    close(success: boolean): void;
    toString(): string;
}
export class TransactionManager {
    constructor();
    private _transactionMonitor;
    private _transactionMap;
    private init();
    getTransactionMonitor(): TransactionMonitor;
    setTransactionMonitor(transactionMonitor: TransactionMonitor): void;
    openTransaction(req: express.Request, res: express.Response): void;
    closeTransaction(req: express.Request, res: express.Response): void;
}
export interface TransactionMonitor {
    send(transaction: HttpTransaction): void;
}
export class TransactionMonitorDerivation implements TransactionMonitor {
    constructor();
    send(transaction: HttpTransaction): void;
}
export interface TransactionMonitorFactory {
    build(): TransactionMonitor;
}
export interface Socket {
    write(signal: string): void;
}
export class SocketEventType {
}
export interface SocketFactory {
    createConnection(options: any, connectListener: () => void): Socket;
}
export class RoutePattern {
    constructor(pattern: string);
    private _pattern;
    private _name;
    private init(pattern);
    getName(): string;
    setName(name: string): void;
    match(url: string, success: (result: any) => void, fail: () => void): void;
    test(url: string): boolean;
    exec(url: string): any;
}
export function Routes(metadata: any): Function;
export class EjpSecurityContext implements SecurityContext {
    constructor(contextRoot: string);
    private _contextRoot;
    private _securityRoleMap;
    private _constraintsMap;
    private _staticResourcesMap;
    private _urlPatternUtils;
    private _urlPatternColl;
    private init(contextRoot);
    addSecurityRole(role: SecurityRole): void;
    getSecurityRole(name: string): SecurityRole;
    addSecurityConstraint(constraint: SecurityConstraint): void;
    getSecurityConstraint(url: string): SecurityConstraint;
    addStaticResources(resources: StaticResources): void;
    getStaticResources(url: string): StaticResources;
    getContextRoot(): string;
}
export class EjpSessionContext implements SessionContext {
    constructor(contextRoot: string, config: EjpConfig);
    private _contextRoot;
    private _sessionManager;
    private _sessionBuilder;
    private _sessionMap;
    private _maxAge;
    private _errorUrl;
    private _sessionErrorBuilder;
    private init(contextRoot, config);
    private initSessionManager(sessionConfig);
    private processExpiredSession(sessionId, result);
    getContextRoot(): string;
    getErrorUrl(): string;
    invalidateSession(req: HttpRequest, result: (error?: SessionError) => any): void;
    initSessionId(): SessionId;
    initSession(req: HttpRequest, sessionOwner: SessionOwner, result: (error?: SessionError) => any): void;
    loadSession(sessionId: SessionId, result: (error?: SessionError) => any): void;
    refreshSession(sessionId: SessionId, data: any, result: (error?: SessionError) => any): void;
    unloadSession(sessionId: SessionId, result: (error?: SessionError) => any): void;
    hasSession(sessionId: SessionId): boolean;
    getSession(sessionId: SessionId): Session;
}
export class BasicSecurityConstraint implements SecurityConstraint {
    constructor(context: EjpConstraintConfig);
    private _name;
    private _errorUrl;
    private _urlPattern;
    private _roles;
    private init(context);
    getName(): string;
    getUrlPattern(): UrlPattern;
    hasRole(role: string): boolean;
    getErrorUrl(): string;
}
export class BasicStaticResources implements StaticResources {
    constructor(context: EjpStaticResourcesConfig);
    private _urlPattern;
    private init(context);
    getUrlPattern(): UrlPattern;
}
export class DefaultUserHashModule implements UserHashModule {
    constructor();
    private _key;
    private readonly HASH_ALGORITHM;
    private readonly SPACER;
    private readonly ALGORITHM;
    private readonly ROLES_SEPARATOR;
    private getCipher();
    private getDecipher();
    private encryptString(text);
    private decryptString(text);
    setPrivateKey(key: string): void;
    encryptUser(alias: string, password: string, roles: string[]): string;
    encryptAlias(alias: string): string;
    encryptPassword(password: string): string;
    encryptRoles(roles: string[]): string;
    decryptAlias(alias: string): string;
    decryptRoles(roles: string): string[];
}
export interface UserHashModule {
    setPrivateKey(key: string): void;
    encryptUser(alias: string, password: string, roles: string[]): string;
    encryptAlias(alias: string): string;
    encryptPassword(password: string): string;
    encryptRoles(roles: string[]): string;
    decryptAlias(alias: string): string;
    decryptRoles(roles: string): string[];
}
export class AuthMethod {
    static readonly NONE: string;
    static readonly FORM: string;
    static readonly EJP_FORM: string;
    static readonly BASIC: string;
    static readonly DIGEST: string;
}
export class EjpLoginStrategyConfig implements LoginStrategyConfig {
    constructor(context: EjpLoginConfig);
    private init(context);
    private _context;
    private _authMethod;
    private _formProperties;
    private _securedArea;
    getAuthMethod(): string;
    getFormProperties(): FormProperties;
    getSecuredArea(): string;
}
export class FormProperties {
    constructor(context: EjpFormConfig);
    private _loginUrl;
    private _errorUrl;
    private init(context);
    getLoginUrl(): string;
    getErrorUrl(): string;
}
export interface LoginStrategyConfig {
    getAuthMethod(): string;
    getFormProperties(): FormProperties;
    getSecuredArea(): string;
}
export class LoginStrategy {
    constructor(strategyConfig: LoginStrategyConfig);
    private _strategyConfig;
    private _loginModule;
    private _jsletContext;
    private _sessionContext;
    private init(strategyConfig);
    initStrategy(container: DomainContainer): void;
    applyLoginStrategy(req: HttpRequest, res: HttpResponse, result: (error?: any) => void): void;
    getLoginStrategyConfig(): LoginStrategyConfig;
    getJsletContext(): JsletContext;
    authenticate(req: HttpRequest, res: HttpResponse, result: (error?: any) => void): void;
    invalidateSession(req: HttpRequest, res: HttpResponse, result: (error?: SessionError) => any): void;
}
export class AbstractLoginModule implements LoginModule {
    constructor();
    protected __realm: Realm;
    protected __strategy: LoginStrategy;
    protected __loginStrategyConfig: LoginStrategyConfig;
    setLoginStrategy(strategy: LoginStrategy): void;
    applyLoginStrategy(req: HttpRequest, res: HttpResponse, result: (error?: any) => void): void;
    applyLogoutStrategy(req: HttpRequest, res: HttpResponse, result: (error?: any) => void): void;
    applyAuthenticationStrategy(req: HttpRequest, res: HttpResponse, error: any, result: (error?: any) => void): void;
    getCredentials(req: HttpRequest): Credentials;
    authenticate(credentials: Credentials, success: (owner: SessionOwner) => any, error: (error: any) => any): void;
}
export class BasicModule extends AbstractLoginModule {
    constructor();
    private static readonly AUTHORIZATION;
    private static readonly BASIC;
    private static readonly SEPARATOR;
    private buildRealm();
    private buildUnauthorizedResponse(res);
    applyLoginStrategy(req: HttpRequest, res: HttpResponse, result: (error?: any) => void): void;
    applyLogoutStrategy(req: HttpRequest, res: HttpResponse, result: (error?: any) => void): void;
    applyAuthenticationStrategy(req: HttpRequest, res: HttpResponse, error: any, result: (error?: any) => void): void;
    getCredentials(req: HttpRequest): Credentials;
}
export class EjpFormModule extends AbstractLoginModule {
    constructor();
    applyLoginStrategy(req: HttpRequest, res: HttpResponse, result: (error?: any) => void): void;
    applyAuthenticationStrategy(req: HttpRequest, res: HttpResponse, error: any, result: (error?: any) => void): void;
    applyLogoutStrategy(req: HttpRequest, res: HttpResponse, result: (error?: any) => void): void;
    getCredentials(req: HttpRequest): Credentials;
}
export interface LoginModule {
    setLoginStrategy(strategy: LoginStrategy): void;
    applyLoginStrategy(req: HttpRequest, res: HttpResponse, result: (error?: any) => void): void;
    applyLogoutStrategy(req: HttpRequest, res: HttpResponse, result: (error?: any) => void): void;
    applyAuthenticationStrategy(req: HttpRequest, res: HttpResponse, error: any, result: (error?: any) => void): void;
    getCredentials(req: HttpRequest): Credentials;
    authenticate(credentails: Credentials, success: (owner: SessionOwner) => any, error: (error: any) => any): void;
}
export class AbstractRealmConnector implements RealmConnector {
    constructor();
    protected __securityContext: SecurityContext;
    protected __userHashModule: UserHashModule;
    protected extractRoles(roles: string[]): SecurityRole[];
    authenticate(credentials: Credentials, success: Function, error: Function): void;
    setSecurityContext(securityContext: SecurityContext): void;
    setUserHashModule(userHashModule: UserHashModule): void;
    getUserHashModule(): UserHashModule;
}
export class AdminFileRealmConnector extends AbstractRealmConnector implements RealmConnector {
    constructor();
    private readonly LINE_EVENT;
    private readonly CLOSE_EVENT;
    private readonly SPACER;
    private _gksPath;
    private init();
    private getStream();
    private getReadLine(stream);
    authenticate(credentials: Credentials, success: Function, error: Function): void;
}
export interface RealmConnector {
    authenticate(credentials: Credentials, success: Function, error: Function): void;
    setSecurityContext(securityContext: SecurityContext): void;
    setUserHashModule(userHashModule: UserHashModule): void;
    getUserHashModule(): UserHashModule;
}
export class DefaultRealm implements Realm {
    constructor(config: LoginStrategyConfig);
    private _realmType;
    private _realmConnector;
    private init(config);
    getRealmType(): string;
    getRealmConnector(): RealmConnector;
    authenticate(credentials: Credentials, success: (sessionOwner: SessionOwner) => any, error: (error: any) => any): void;
}
export interface Realm {
    getRealmType(): string;
    getRealmConnector(): RealmConnector;
    authenticate(credentials: Credentials, success: (sessionOwner: SessionOwner) => any, error: (error: any) => any): void;
}
export class RealmType {
    static readonly FILE: string;
    static readonly LDAP: string;
    static readonly DB: string;
    static readonly ADMIN_FILE: string;
    static readonly CUSTOM: string;
}
export class DefaultRealmBuilder implements RealmBuilder {
    constructor();
    buildRealm(strategyConfig: LoginStrategyConfig, securityContext: SecurityContext): Realm;
}
export interface RealmBuilder {
    buildRealm(strategyConfig: LoginStrategyConfig, securityContext: SecurityContext): Realm;
}
export class BasicSecurityRole implements SecurityRole {
    constructor(name: string);
    protected __name: string;
    private initObj(name);
    getName(): string;
}
export function Secured(metadata: any): Function;
export class BasicCredentials implements Credentials {
    constructor();
    login: string;
    password: string;
}
export class LocalSessionStorage implements SessionStorage {
    constructor();
    private _sessionMap;
    private _sessionMapTimer;
    private _sessionMapTimerInterval;
    private _sessionErrorBuilder;
    private initObj();
    private invalidateSessionMap();
    private checkSessionMapSize();
    add(session: Session, result: (error?: SessionError) => any): void;
    get(sessionId: SessionId, success: (session: Session) => any, error: (error: SessionError) => any): void;
    remove(sessionId: SessionId, result: (error?: SessionError) => any): void;
}
export interface SessionStorage {
    add(session: Session, result: (error?: SessionError) => any): void;
    get(sessionId: SessionId, success: (session: Session) => any, error: (error: SessionError) => any): void;
    remove(sessionId: SessionId, result: (error?: SessionError) => any): void;
}
export class AuthenticationError {
    constructor(statusCode: number);
    private _statusCode;
    getStatusCode(): number;
}
export class BasicSessionError implements SessionError {
    constructor(sessionId: SessionId, errorType: string, message?: string);
    private _sessionId;
    private _errorType;
    private _message;
    private initObj(sessionId, errorType, message?);
    getSessionId(): SessionId;
    getErrorType(): string;
    getMessage(): string;
    toString(): string;
}
export class GlassCatSession implements Session {
    constructor();
    sessionId: SessionId;
    sessionOwner: SessionOwner;
    expires: number;
    data: any;
}
export class GlassCatSessionId implements SessionId {
    constructor(id: string);
    private _id;
    getId(): string;
    authurl: string;
}
export class GlassCatSessionOwner implements SessionOwner {
    constructor(id: string, alias: string, roles: SecurityRole[]);
    private _id;
    private _alias;
    private _roles;
    private init(id, alias, roles);
    getAlias(): string;
    isGranted(securityConstraint: SecurityConstraint): boolean;
}
export class EjpSessionManager implements SessionManager {
    constructor();
    private _guid;
    private readonly HASH_ALGORITHM;
    private readonly OUTPUT_ENCODING;
    private _connector;
    private _sessionIdBuilder;
    private init();
    getSessionStorage(): SessionStorage;
    setSessionStorage(sessionStorage: SessionStorage): void;
    initSessionId(): SessionId;
    addSession(session: Session, result: (error?: SessionError) => any): void;
    getSession(sessionId: SessionId, success: (session: Session) => any, error: (error: SessionError) => any): void;
    removeSession(sessionId: SessionId, result: (error?: SessionError) => any): void;
}
export interface SessionManager {
    getSessionStorage(): SessionStorage;
    setSessionStorage(sessionStorage: SessionStorage): void;
    initSessionId(): SessionId;
    addSession(session: Session, result: (error?: SessionError) => any): void;
    getSession(sessionId: SessionId, success: (session: Session) => any, error: (error: SessionError) => any): void;
    removeSession(sessionId: SessionId, result: (error?: SessionError) => any): void;
}
export class CredentialsBuilder {
    constructor();
    build(login: string, password: string): Credentials;
}
export class SessionBuilder {
    buildSession(sessionId: SessionId, sessionOwner: SessionOwner): Session;
}
export class SessionErrorBuilder {
    build(sessionId: SessionId, errorType: string, message?: string): SessionError;
}
export class SessionIdBuilder {
    buildSessionId(guid: string): SessionId;
}
export class SessionIdUtil {
    private static readonly SEPARATOR;
    private static readonly PARAM_SEPARATOR;
    static readonly SESSION_ID_NAME: string;
    static readonly COOKIES: string;
    static parseSessionIdCookie(cookies: any): SessionId;
    static stringifySessionId(sessionId: SessionId): string;
}
export class SessionOwnerBuilder {
    build(id: string, alias: string, roles: SecurityRole[]): SessionOwner;
}
export class SessionStorageSolver {
    constructor();
    getSessionStorage(config: EjpSessionConfig): SessionStorage;
}
export class SessionStorageType {
    static readonly LOCAL: string;
    static readonly REDIS: string;
}
export class SessionUtil {
    static getExirationTime(maxAge: number): number;
    static setSessionCookie(res: any, sessionId: SessionId, service: HttpService): void;
}
export class SecurityConstraintBuilder {
    constructor();
    build(context: EjpConstraintConfig): SecurityConstraint;
}
export class StaticResourcesBuilder {
    constructor();
    build(context: EjpStaticResourcesConfig): StaticResources;
}
/// <reference types="node" />
export class AbstractHttpService implements HttpService {
    constructor(listener: HttpListener);
    protected __listener: HttpListener;
    protected __app: express.Application;
    protected __server: http.Server;
    protected __connectorManager: DomainConnectorManager;
    protected __securityManager: SecurityManager;
    protected __transactionManager: TransactionManager;
    protected __enableMonitoring: boolean;
    protected __errorManager: HttpServiceErrorManager;
    private _isActive;
    private _server;
    private init(listener);
    private initSecuredServer();
    private holdTransaction(req, res, next);
    private releaseTransaction(req, res, next);
    private checkSession(req, res, next);
    private validateRequest(req, res, next);
    private processRequest(req, res, next);
    private initHeadersSecurity();
    private initTransactionInterceptor();
    private initTransactionFilter();
    private initSessionsSecurity();
    private createTransactionInterceptors();
    private initErrorFilter();
    getHttpListener(): HttpListener;
    initConnectors(connectorManager: DomainConnectorManager): void;
    initSecurity(securityManager: SecurityManager): void;
    start(): void;
    stop(): void;
    isActive(): boolean;
}
export class DefaultHttpService extends AbstractHttpService implements HttpService {
    constructor(listener: HttpListener);
}
export interface HttpService {
    getHttpListener(): HttpListener;
    initConnectors(connectorManager: DomainConnectorManager): void;
    initSecurity(securityManager: SecurityManager): void;
    start(): void;
    stop(): void;
    isActive(): boolean;
}
export class DefaultHttpListener implements HttpListener {
    constructor(config: HttpListenerConfig);
    private _id;
    private _port;
    private _address;
    private _isSecured;
    private _server;
    private _protocol;
    private _domain;
    private _securityConfig;
    private _enableMonitoring;
    private _transactionMonitor;
    private init(config);
    getId(): string;
    getPort(): number;
    getAdress(): string;
    getSecured(): boolean;
    getServer(): string;
    getProtocol(): string;
    getDomain(): string;
    getSecurityConfig(): string[];
    enableMonitoring(): boolean;
    getTransactionMonitor(): TransactionMonitor;
}
export interface HttpListener extends ConnectionListener {
    getSecured(): boolean;
    getProtocol(): string;
    getDomain(): string;
    getSecurityConfig(): string[];
    enableMonitoring(): boolean;
    getTransactionMonitor(): TransactionMonitor;
}
export class HttpListenerFactory {
    constructor();
    build(config: HttpListenerConfig): HttpListener;
}
export class HttpMonitoring {
    constructor(config: HttpMonitoringConfig);
    private _config;
    private _enableMonitoring;
    private _transactionMonitor;
    init(config: HttpMonitoringConfig): void;
    enableMonitoring(): boolean;
    getTransactionMonitor(): TransactionMonitor;
}
/// <reference types="node" />
export class ResourceProxy {
    constructor();
    private static INSTANCE;
    static getInstance(): ResourceProxy;
    init(): void;
    private static readonly RESOURCE_PROXY_SIZE;
    private static readonly INDEX;
    private static readonly RESOURCE_PROXY_PATTERN;
    getConectorRef(listener: HttpListener, contextRoot: string): string;
    testUrl(url: string): boolean;
    getProxyPath(baseUrl: string, listener: HttpListener, domainConnectorManager: DomainConnectorManager): string;
    loadFile(path: string, callback: (err: NodeJS.ErrnoException, data: Buffer) => void): void;
}
export class HttpLocalProperties {
    constructor();
    connector: DomainConnector;
    contextRootData: ContextRootData;
    containerState: string;
    sessionId: SessionId;
    transactionFails: boolean;
    isStatic: boolean;
    trimmedUrl: string;
    redirectUrl: string;
    contextRootRef: string;
}
export class HttpServiceBuilder {
    constructor();
    buildServices(httpServiceManager: HttpServiceManager, httpListenerConfigList: Array<HttpListenerConfig>): void;
}
/// <reference types="node" />
export class HttpServiceErrorManager {
    constructor();
    processNestedResourceError(properties: HttpLocalProperties, error: NodeJS.ErrnoException, httpRequest: HttpRequest, httpResponse: HttpResponse, errorTemplatePath: string): void;
    processDomainRequestError(properties: HttpLocalProperties, error: DomainRequestError, httpRequest: HttpRequest, httpResponse: HttpResponse, errorTemplatePath: string): void;
    processSessionError(properties: HttpLocalProperties, error: SessionError, httpRequest: HttpRequest, httpResponse: HttpResponse, errorTemplatePath: string): void;
    processAuthenticationError(properties: HttpLocalProperties, error: AuthenticationError, httpRequest: HttpRequest, httpResponse: HttpResponse, errorTemplatePath: string): void;
}
export class HttpServiceFactory {
    build(config: HttpListenerConfig): HttpService;
}
export class DefaultTemplateProcessor implements TemplateProcessor {
    constructor();
    renderFile(templatePath: string, data: any, req: HttpRequest, res: HttpResponse): void;
}
export class ErrorTemplateProcessor implements TemplateProcessor {
    constructor();
    private static INSTANCE;
    static getInstance(): TemplateProcessor;
    renderFile(templatePath: string, data: any, req: HttpRequest, res: HttpResponse): void;
}
export class ErrorStatusBuilder {
    constructor();
    private static INSTANCE;
    static getInstance(): ErrorStatusBuilder;
    init(): void;
    build(req: HttpRequest, res: HttpResponse, templatePath: string, statusCode?: number, detailsCode?: string): void;
}
export class ForbiddenStatusBuilder {
    constructor();
    private static INSTANCE;
    static getInstance(): ForbiddenStatusBuilder;
    init(): void;
    build(req: HttpRequest, res: HttpResponse, templatePath: string, detailsCode?: string): void;
}
export class HttpStatusReport {
    constructor();
    title: string;
    type: string;
    message: string;
    description: string;
    version: string;
    status: number;
    codeName: string;
    toString(): string;
}
export class HttpStatusReportBuilder {
    constructor();
    private static INSTANCE;
    static getInstance(): HttpStatusReportBuilder;
    init(version: string, codeName: string): void;
    private _version;
    private _codeName;
    build(status: number, title: string, message: string, description: string): HttpStatusReport;
}
export interface TemplateProcessor {
    renderFile(templatePath: string, data: any, req: HttpRequest, res: HttpResponse): void;
}
export class BootstrapScriptSorter {
    constructor();
    private sortFunction(obj1, obj2);
    sortCollection(bootstrapCollection: any[]): void;
}
export class ContextRootData {
    constructor();
    containsNestedResource: boolean;
    needsRedirection: boolean;
    newPath: string;
    contextRoot: string;
    reset(): void;
    toString(): string;
}
export class ContextRootUtil {
    constructor();
    private static readonly REFERER;
    private static readonly HOST;
    private _contextRootData;
    private init();
    static readonly INDEX: string;
    buildContextRoot(connector: DomainConnector, listener: HttpListener): string;
    extractContextRoot(reqest: express.Request): ContextRootData;
}
export interface ConfigLoader {
    loadSync(): any;
    load(success: (data: any) => void, error: (err: any) => void): void;
}
export class ConfigLoaderBase {
    constructor();
    protected loadConfigSync(filePath: string): any;
    loadConfig(filePath: string, success: (data: any) => void, error: (err: any) => void): void;
}
export class ConsoleLoggerFactory implements LoggerFactory {
    private constructor();
    build(context: LoggerContext): Logger;
}
export class FileLogger extends AbstractLogger {
    constructor();
    private _formatter;
    private FILE_PATH;
    private init();
    private appendLog(message);
    debug(marker: any, context?: string): void;
    error(marker: any, context?: string): void;
    info(marker: any, context?: string): void;
    trace(marker: any, context?: string): void;
    warn(marker: any, context?: string): void;
    toString(): string;
}
export class FileLoggerFactory implements LoggerFactory {
    private constructor();
    build(context: LoggerContext): Logger;
}
export class GlassCatConsoleLogger extends AbstractLogger {
    constructor();
    private _formatter;
    private init();
    debug(marker: any, context?: string): void;
    error(marker: any, context?: string): void;
    info(marker: any, context?: string): void;
    trace(marker: any, context?: string): void;
    warn(marker: any, context?: string): void;
    toString(): string;
}
export class GlassCatLogFormatter implements LogFormatter {
    constructor();
    appender: string;
    timeFormat: string;
    format(level: string, marker: any, useAppender?: boolean, context?: string): string;
}
export interface LoggerFactory {
    build(context: LoggerContext): Logger;
}
export class LoggerManager extends AbstractLogger {
    constructor();
    private static INSTANCE;
    static getInstance(): Logger;
    init(loggers: Logger[], logLevel: number): void;
    private _loggers;
    setLogLevel(logLevel: number): void;
    setName(name: string): void;
    debug(marker: any): void;
    error(marker: any): void;
    info(marker: any): void;
    trace(marker: any): void;
    warn(marker: any): void;
}
export class LoggerManagerBuilder {
    constructor();
    private _ctx;
    context(value: GlassCatContext): LoggerManagerBuilder;
    build(): Logger;
}
export class MappedPathUtil {
    constructor();
    private static INSTANCE;
    static getInstance(): MappedPathUtil;
    init(rootPath: string): void;
    private _rootPath;
    private _glasscatPath;
    private _modulesPath;
    private static readonly GLASSCAT_PATTERN;
    private static readonly ROOT_PATTERN;
    private static readonly MODULES_PATTERN;
    private static readonly GLASSCAT_PATH;
    private static readonly MODULES_PATH;
    resolve(path: string): string;
}
export class TemplatePaths {
    constructor();
    projectPath: string;
    relativePathPattern: string;
    directoryPath: string;
    filePath: string;
}
export class TemplatePathsSolver {
    constructor();
    private static readonly WORKSPACE_PATH;
    private fixFilePath(path);
    private resolveRelativePath(path);
    private resolveProjectPath(project);
    private resolveDirPath(projectPath, path);
    private resolveFilePath(dirPath, fileName, extention);
    private countOccurrences(string, subString, allowOverlapping?);
    resolve(fileName: string, fileExtension: string, projectPath: string, filePath: string): TemplatePaths;
}
export class BasicUrlPattern implements UrlPattern {
    constructor();
    pattern: string;
    strict: boolean;
    baseUrl: string;
    baseUrlLength: number;
    toString(): string;
}
export class UrlPatternBuilder {
    constructor();
    build(pattern: string): UrlPattern;
}
export class UrlPatternUtils {
    constructor();
    match(url: string, pattern: UrlPattern): boolean;
}
export class UrlUtils {
    constructor();
    private static INSTANCE;
    static getInstance(): UrlUtils;
    init(): void;
    trimContextRoot(url: string, contextRootRef: string): string;
}

}