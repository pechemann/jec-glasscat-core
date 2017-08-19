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

import {Jslet, JsletContext, SecurityContext, SessionContext} from "jec-exchange";
import {EjpJsletContext} from "../EjpJsletContext";
import {ClassLoader} from "jec-commons";
import {LocaleManager} from "../../i18n/LocaleManager";
import {LoggerManager} from "../../util/logging/LoggerManager";
import {DomainConnector} from "../../domains/connectors/DomainConnector";
import {LoginStrategy} from "../../security/login/LoginStrategy";
import {GlassCatError} from "../../exceptions/GlassCatError";
import {GlassCatErrorCode} from "../../exceptions/GlassCatErrorCode";

/**
 * The singleton helper for creating <code>JsletContext</code> objects, from 
 * data specified in a configuration file.
 */
export class JsletContextBuilder {

  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>JsletContextBuilder</code> instance.
   */
  constructor() {
    if(JsletContextBuilder._locked || JsletContextBuilder.INSTANCE) {
      let msg:string = LocaleManager.getInstance().get(
        "errors.singleton", "JsletContextBuilder"
      );
      throw new GlassCatError(GlassCatErrorCode.SINGLETON_ERROR, msg);
    }
    JsletContextBuilder._locked = true;
  }
  //////////////////////////////////////////////////////////////////////////////
  // Singleton managment
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Prevents <code>JsletContextBuilder</code> illegal instanciations.
   */
  private static _locked:boolean = true;

  /**
   * The <code>JsletContextBuilder</code> singleton instance reference.
   */
  private static INSTANCE:JsletContextBuilder = null;

  /**
   * Returns a reference to the <code>JsletContextBuilder</code> singleton.
   *
   * @return {HttpStatusReportBuilder} a reference to the
   *                                   <code>JsletContextBuilder</code>
   *                                   singleton.
   */
  public static getInstance():JsletContextBuilder{
    if(JsletContextBuilder.INSTANCE === null) {
      JsletContextBuilder._locked = false;
      JsletContextBuilder.INSTANCE = new JsletContextBuilder();
    }
    return JsletContextBuilder.INSTANCE;
  }
  //////////////////////////////////////////////////////////////////////////////
  // Private methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates and returns a new <code>Jslet</code> instance.
   *
   * @param {string} path the path to the jslet class file.
   * @param {string} target the path to the EJP for which to build the jslet.
   * @return {Jslet} a new <code>Jslet</code> instance.
   */
  private buildJslet(path:string, target:string):Jslet {
    let loader:ClassLoader = new ClassLoader();
    let jslet:Jslet = null;
    let Contructor:any = null;
    try {
      Contructor = loader.loadClass(target + path);
      jslet = new Contructor();
    } catch(e){
      // TODO: log error message
      throw new GlassCatError(GlassCatErrorCode.INVALID_JSLET_CONFIG);
    }
    return jslet;
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Builds and returns the <code>JsletContext</code>, from the specified
   * configuration file, for an <code>EjpContainer</code> instance.
   *
   * @param {DomainConnector} connector domain connector on which will be
   *                                    deployed the new context.
   * @param {SecurityContext} securityContext the <code>SecurityContext</code>
   *                                          associated with this
   *                                          <code>JsletContext</code>
   *                                          instance.
   * @param {SessionContext} sessionContext the <code>SessionContext</code> 
   *                                        associated with this
   *                                        <code>JsletContext</code> instance.
   * @param {LoginStrategy} loginStrategy the <code>LoginStrategy</code> 
   *                                      associated with this
   *                                      <code>JsletContext</code> instance.
   * @return {JsletContext} a new <code>JsletContext</code> instance.
   */
  public buildContext(connector:DomainConnector,
                      securityContext:SecurityContext,
                      sessionContext:SessionContext,
                      loginStrategy:LoginStrategy):JsletContext {
    let context:JsletContext = new EjpJsletContext(connector,
                                                   securityContext,
                                                   sessionContext,
                                                   loginStrategy);
    let i18n:LocaleManager = LocaleManager.getInstance();
    var msg:string = i18n.get("jslet.newContext", connector.getContextRoot());
    LoggerManager.getInstance().info(msg);
    return context;
  }

  /**
   * Loads and adds the specified list jslets path references for the specified
   * <code>JsletContext</code> instance.
   *
   * @param {Array<string>} jslets an array of jslets references to initialize.
   */
  public initJslets(context:JsletContext, jslets:string[]):void {
    let len:number = -1;
    let jslet:Jslet = null;
    let path:string = null;
    let target:string = context.getSourcePath();
    if(jslets) {
      len = jslets.length;
      while(len--) {
        path = jslets[len];
        jslet = this.buildJslet(path, target);
        context.addJslet(jslet);
      }
    }
  }
}
