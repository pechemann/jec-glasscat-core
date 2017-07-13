//  DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS HEADER.
//
//   Copyright 2016-2017 Pascal ECHEMANN.
//
//   Licensed under the Apache License, Version 2.0 (the "License");
//   you may not use this file except in compliance with the License.
//   You may obtain a copy of the License at
//
//       http://www.apache.org/licenses/LICENSE-2.0
//
//   Unless required by applicable law or agreed to in writing, software
//   distributed under the License is distributed on an "AS IS" BASIS,
//   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//   See the License for the specific language governing permissions and
//   limitations under the License.

import {DomainContainer} from "./DomainContainer";
import {LoggerManager} from "../../util/logging/LoggerManager";
import {JsletContextBuilder} from "../../jslets/utils/JsletContextBuilder";
import {DomainConnector} from "../connectors/DomainConnector";
import {LocaleManager} from "../../i18n/LocaleManager";
import {EjpConnector} from "../connectors/EjpConnector";
import {JsletManager} from "../../core/JsletManager";
import {JsletContext, HttpJslet, Jslet, HttpRequest, HttpResponse,
        SecurityContext, SecurityConstraint, StaticResources, SessionError,
        SessionId, SessionContext} from "jec-exchange";
import {HttpStatusReportBuilder} from "../../templates/status/HttpStatusReportBuilder";
import {HttpStatusReport} from "../../templates/status/HttpStatusReport";
import {ErrorTemplateProcessor} from "../../templates/error/ErrorTemplateProcessor";
import {TemplateProcessor} from "../../templates/TemplateProcessor";
import {DefaultTemplateProcessor} from "../../templates/DefaultTemplateProcessor";
import {StaticResourcesBuilder} from "../../security/utils/StaticResourcesBuilder";
import {SecurityConstraintBuilder} from "../../security/utils/SecurityConstraintBuilder";
import {EjpSecurityContext} from "../../security/context/EjpSecurityContext";
import {DomainState} from "./DomainState";
import {EjpSessionContext} from "../../security/context/EjpSessionContext";
import {DomainRequestError} from "../errors/DomainRequestError";
import {HttpLocalProperties} from "../../services/http/utils/HttpLocalProperties";
import {EjpLoginStrategyConfig} from "../../security/login/config/EjpLoginStrategyConfig";
import {LoginStrategyConfig} from "../../security/login/config/LoginStrategyConfig";
import {LoginStrategy} from "../../security/login/LoginStrategy";
import {DefaultSourceFileInspector} from "../../context/files/DefaultSourceFileInspector";
import {Logger, JecStringsEnum, UrlStringsEnum, HttpStatusCode, ClassLoader,
        SourceFileInspector, JcadContext} from "jec-commons";
import {JsletsAutowireProcessor} from "../../jslets/utils/JsletsAutowireProcessor";
import {EjpConfig} from "../../context/ejp/EjpConfig";
import {EjpWebAppConfig} from "../../context/ejp/EjpWebAppConfig";
import {EjpJsletsConfig} from "../../context/ejp/EjpJsletsConfig";
import {EjpBootstrapConfig} from "../../context/ejp/EjpBootstrapConfig";
import {EjpSecurityConfig} from "../../context/ejp/EjpSecurityConfig";
import {EjpConstraintConfig} from "../../context/ejp/EjpConstraintConfig";
import {EjpStaticResourcesConfig} from "../../context/ejp/EjpStaticResourcesConfig";
import {EjpRoleConfig} from "../../context/ejp/EjpRoleConfig";
import {EjpResourceMapperConfig} from "../../context/ejp/EjpResourceMapperConfig";
import {JsletContextManager} from "../../jslets/jcad/JsletContextManager";
import {BootstrapScriptSorter} from "../../util/bootstrap/BootstrapScriptSorter";
import {NotFoundErrorBuilder} from "../errors/NotFoundErrorBuilder";

/**
 * The <code>EjpContainer</code> class is the concrete implementation of the
 * <code>DomainContainer</code> interface for standard EJP applications.
 */
export class EjpContainer implements DomainContainer {

  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>EjpContainer</code> instance.
   */
  constructor() {}

  //////////////////////////////////////////////////////////////////////////////
  // Private properties
  //////////////////////////////////////////////////////////////////////////////

  /**
   * The domain connector associated with this <code>EjpContainer</code>
   * instance.
   */
  private _connector:EjpConnector = null;

  /**
   * The reference to the <code>JsletManager</code> of the GlassCat container.
   */
  private _jsletManager:JsletManager = null;

  /**
   * The reference to the <code>JsletContext</code> instance for this domain
   * container.
   */
  private _jsletContext:JsletContext = null;
  
  /**
   * The context root for this domain container.
   */
  private _contextRoot:string = null;

  /**
   * The reference to the computed <code>webapp</code> path for this domain
   * container.
   */
  private _webapp:string = null;

  /**
   * The reference to the computed <code>src</code> path for this domain
   * container.
   */
  private _src:string = null;

  /**
   * The reference to the welcome file URI path for this domain container.
   */
  private _welcomeFile:string = null;

  /**
   * Indicates the state of this GlassCat container. Possible values are
   * constants of the <code>DomainState</code> class.
   */
  private _state:string = null;

  /**
   * The map used to store mapped resources references.
   */
  private _resourceMap:Map<string, string> = null;

  /**
   * The source file inspector for this domain.
   */
  private _sourceFileInspector:SourceFileInspector = null;

  /**
   * The template processor used within this domain for rendering HTML pages.
   */
  private _templateProcessor:TemplateProcessor = null;

  /**
   * The login strategy for this domain.
   */
  private _loginStrategy:LoginStrategy = null;

  /**
   * The reference to the <code>JsletContextManager</code> that is used to 
   * manage JCAD context objects for this container.
   */
  private _contextManager:JsletContextManager = null;

  /**
   * The reference to the builder used to create <code>NotFoundError</code>  
   * objects.
   */
  private _notFoundErrorBuilder:NotFoundErrorBuilder = null;

  //////////////////////////////////////////////////////////////////////////////
  // Private methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Initializes the configuration properties associated with this 
   * <code>EjpContainer</code> instance.
   * 
   * @param {EjpConfig} config the <code>EjpConfig</code> instance associated 
   *                           with this <code>EjpContainer</code> instance.
   */
  private initConfig(config:EjpConfig):void {
    let securityContext:SecurityContext = null;
    let sessionContext:SessionContext = null;
    let webapp:EjpWebAppConfig = config.webapp;
    let jsletsConfig:EjpJsletsConfig = webapp.jslets;
    let builder:JsletContextBuilder = JsletContextBuilder.getInstance();
    this.initState(config);
    this.initResourceMap(config);
    if(this._state === DomainState.STATEFUL) {
      securityContext = this.initSecurityContext(config);
      sessionContext = this.initSessionContext(config);
      this.createLoginStrategy(config);
      this._jsletContext = builder.buildContext(
          this._connector, securityContext,
          sessionContext, this._loginStrategy
      );
      this.initLoginStrategy();
    } else {
       this._jsletContext =builder.buildContext(
          this._connector, null, null, null
      );
    }
    if(jsletsConfig.enableAutowire) {
      this.getSourceFileInspector().addProcessor(new JsletsAutowireProcessor());
    }
    this.initBootstrapScripts(config);
    this._sourceFileInspector.inspect();
    if(webapp.jslets) {
      builder.initJslets(this._jsletContext, jsletsConfig.config);
    }
    this._jsletManager.addContext(this._contextRoot, this._jsletContext);
    this._welcomeFile = config.webapp.welcomeFile;
    this._notFoundErrorBuilder = new NotFoundErrorBuilder();
  }

  /**
   * Creates the login engine for this <code>EjpContainer</code> instance.
   *
   * @param {EjpConfig} config the <code>EjpConfig</code> instance associated
   *                           with this <code>EjpContainer</code> instance.
   */
  private createLoginStrategy(config:EjpConfig):void {
    let loginStrategyConfig:LoginStrategyConfig =
                                new EjpLoginStrategyConfig(config.webapp.login);
    this._loginStrategy = new LoginStrategy(loginStrategyConfig);
  };

  /**
   * Initializes the resources map for this <code>EjpContainer</code> instance.
   *
   * @param {EjpConfig} config the <code>EjpConfig</code> instance associated 
   *                           with this <code>EjpContainer</code> instance.
   */
  private initResourceMap(config:EjpConfig):void {
    let resourceMap:EjpResourceMapperConfig[] = config.webapp.resourceMap;
    let len:number = -1;
    let resourceMapper:EjpResourceMapperConfig = null;
    this._resourceMap = new Map<string, string>();
    if(resourceMap) {
      len = resourceMap.length;
      while(len--) {
        resourceMapper = resourceMap[len];
        this._resourceMap.set(resourceMapper.name, resourceMapper.value);
      }
    }
  }

  /**
   * Initializes the login engine for this <code>EjpContainer</code> instance.
   */
  private initLoginStrategy():void {
    this._loginStrategy.initStrategy(this);
  };
  
  /**
   * Initializes the state of this <code>EjpContainer</code> instance.
   *
   * @param {EjpConfig} config the <code>EjpConfig</code> instance associated 
   *                           with this <code>EjpContainer</code> instance.
   */
  private initState(config:EjpConfig):void {
    let state:string = config.webapp.state;
    if(state) {
      if(state === DomainState.STATEFUL || state === DomainState.STATELESS) {
        this._state = state;
      } else {
        let msg:string = LocaleManager.getInstance().get("errors.invalidState");
        LoggerManager.getInstance().error(msg);
        throw new Error(msg);
      }
    } else this._state = DomainState.STATELESS;
  }

  /**
   * Initializes the bootstrap scripts associated with this 
   * <code>EjpContainer</code> instance.
   *
   * @param {EjpConfig} config the <code>EjpConfig</code> instance associated 
   *                           with this <code>EjpContainer</code> instance.
   */
  private initBootstrapScripts(config:EjpConfig):void {
    let loader:ClassLoader = new ClassLoader();
    let scripts:EjpBootstrapConfig[] = config.webapp.bootstrap;
    let script:EjpBootstrapConfig = null;
    let Contructor:any = null;
    let sorter:BootstrapScriptSorter = null;
    let len:number = -1;
    if(scripts) {
      sorter = new BootstrapScriptSorter();
      sorter.sortCollection(scripts);
      len = scripts.length;
      while(len--) {
        script = scripts[len];
        Contructor = loader.loadClass(this._src + script.path);
        new Contructor().run(this);
      }
    }
  }

  /**
   * Initializes the session context for this <code>EjpContainer</code>
   * instance.
   *
   * @param {EjpConfig} config the <code>EjpConfig</code> instance associated 
   *                           with this <code>EjpContainer</code> instance.
   */
  private initSessionContext(config:EjpConfig):SessionContext {
    let sessionContext:SessionContext =
                               new EjpSessionContext(this._contextRoot, config);
    let msg:string = 
      LocaleManager.getInstance()
                   .get("security.context.sessionAdded", this._contextRoot);
    LoggerManager.getInstance().info(msg);
    return sessionContext;
  }

  /**
   * Initializes the security context for this <code>EjpContainer</code> instance.
   *
   * @param {EjpConfig} config the <code>EjpConfig</code> instance associated 
   *                           with this <code>EjpContainer</code> instance.
   */
  private initSecurityContext(config:EjpConfig):SecurityContext {
    let security:EjpSecurityConfig = config.webapp.security;
    let securityContext:SecurityContext = 
                                      new EjpSecurityContext(this._contextRoot);
    let constraint:SecurityConstraint = null;
    let staticRes:StaticResources = null;
    let Contructor:any = null;
    let loader:ClassLoader = new ClassLoader();
    let constraints:EjpConstraintConfig[] = null;
    let resources:EjpStaticResourcesConfig[] = null;
    let resourcesBuilder:StaticResourcesBuilder = null;
    let securityConstraintBuilder:SecurityConstraintBuilder = null;
    let roles:EjpRoleConfig[] = null;
    let role:EjpRoleConfig = null;
    let len:number = -1;
    let msg:string = 
      LocaleManager.getInstance()
                   .get("security.context.securityAdded", this._contextRoot);
    LoggerManager.getInstance().info(msg);
    if(security) {
      resourcesBuilder = new StaticResourcesBuilder();
      securityConstraintBuilder = new SecurityConstraintBuilder();
      constraints = security.constraints;
      len = constraints.length;
      while(len--) {
        constraint = securityConstraintBuilder.build(constraints[len]);
        securityContext.addSecurityConstraint(constraint);
      }
      resources = security.staticResources;
      len = resources.length;
      while(len--) {
        staticRes = resourcesBuilder.build(resources[len]);
        securityContext.addStaticResources(staticRes);
      }
      roles = security.roles;
      len = roles.length;
      while(len--) {
        role = roles[len];
        Contructor = loader.loadClass(this._src + role.path);
        securityContext.addSecurityRole(new Contructor());
      }
    }
    return securityContext;
  }

  /**
   * Initializes the source file inspector for this <code>EjpContainer</code>
   * instance.
   */
  private initSourceFileInspector():void {
    this._sourceFileInspector = new DefaultSourceFileInspector();
    this._sourceFileInspector.setWatcher(this._connector);
  }

  /**
   * Initializes the jslet JCAD context manager for this
   * <code>EjpContainer</code> instance.
   */
  private initJsletContextManager():void {
    this._contextManager = new JsletContextManager();
    this._contextManager.createContext(this._connector.getJcadContext());
  }

  /**
   * Removes the jslet JCAD context manager associated with this 
   * <code>EjpContainer</code> instance.
   */
  private deleteJsletContextManager():void {
      this._contextManager.deleteContext();
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * @inheritDoc
   */
  public init(connector:DomainConnector, jsletManager:JsletManager):void {
    let i18n:LocaleManager = LocaleManager.getInstance();
    let msg:string = "domain container initialization start";
    LoggerManager.getInstance().info(msg);
    msg = "domain connector: name=" + connector.getName();
    LoggerManager.getInstance().info(msg);
    this._connector = connector as EjpConnector;
    this._jsletManager = jsletManager;
    this._contextRoot = connector.getContextRoot();
    let target:string = connector.getTarget();
    this._webapp = target + JecStringsEnum.WEB_APP;
    this._src = target + JecStringsEnum.SRC;
    this._templateProcessor = new DefaultTemplateProcessor();
     this.initJsletContextManager();
    this.initSourceFileInspector();
    this.initConfig(connector.getConfig());
    this.deleteJsletContextManager();
    msg = i18n.get("domains.containers.init");
    msg += "\n   => " + i18n.get("domains.containers.contextRoot", this._contextRoot);
    msg += "\n   * " + i18n.get("domains.containers.type", this.toString());
    LoggerManager.getInstance().info(msg);
  }

  /**
   * @inheritDoc
   */
  public getJsletContext():JsletContext {
    return this._jsletContext;
  }

  /**
   * @inheritDoc
   */
  public getLoginStrategy():LoginStrategy {
    return this._loginStrategy;
  }
  
  /**
   * @inheritDoc
   */
  public getSourceFileInspector():SourceFileInspector {
    return this._sourceFileInspector;
  }

  /**
   * @inheritDoc
   */
  public getLogger():Logger {
    return LoggerManager.getInstance();
  }

  /**
   * @inheritDoc
   */
  public process(properties:HttpLocalProperties,
                 req:HttpRequest, res:HttpResponse,
                 result:(error?:DomainRequestError)=>any):void {
    let urlMarkIndex:number = -1;
    let self:EjpContainer = this;
    let sessionId:SessionId = properties.sessionId;
    let domainRequestError:DomainRequestError = null;
    let jslet:Jslet = null;
    let url:string = properties.trimmedUrl;
    let isStateful:boolean = this._state === DomainState.STATEFUL;
    let sessionContext:SessionContext = this._jsletContext.getSessionContext();
    //LoggerManager.getInstance().debug("resource access: " + url);
    jslet = this._jsletManager.getJslet(this._contextRoot, url);
    if(jslet) {
      jslet.before();
      jslet.service(
        req,
        res,
        function(request:HttpRequest, response:HttpResponse, data:any):void {
          let renderTemplate:Function = function():void {
            let ejsPath:string = (jslet as HttpJslet).getTemplate();
            if(ejsPath) {
              self._templateProcessor.renderFile(
                (self._webapp + ejsPath), data, request, response
              );
            }
            jslet.after();
            result();
          };
          if(isStateful) {
            if(sessionContext.hasSession(sessionId)) {
              sessionContext.refreshSession(
                sessionId,
                null,
                (err:SessionError) => {
                  if(err) {
                    domainRequestError = new DomainRequestError();
                    domainRequestError.statusCode =
                                           HttpStatusCode.INTERNAL_SERVER_ERROR;
                    domainRequestError.message = err.getMessage()
                    result(domainRequestError);
                  } else renderTemplate();
                }
              );
            } else renderTemplate();
          } else renderTemplate();
        }
      );
    } else {
      if(url.length === 0) {
        if(this._welcomeFile) {
          res.sendFile(this._welcomeFile, { root: this._webapp });
          result();
        } else {
          result(this._notFoundErrorBuilder.build());
        }
      } else {
        urlMarkIndex = url.indexOf(UrlStringsEnum.MARK);
        if(urlMarkIndex !== -1) url = url.substr(0, urlMarkIndex);
        res.sendFile(url, { root: this._webapp });
        result();
      }
    };
  }
  
  /**
   * @inheritDoc
   */
  public getState():string {
    return this._state;
  }

  /**
   * @inheritDoc
   */
  public toString():string {
    return "[DomainContainer::EjpContainer]";
  }

  /**
   * @inheritDoc
   */
  public getMappedResource(name:string):string {
    return this._resourceMap.get(name);
  }
}