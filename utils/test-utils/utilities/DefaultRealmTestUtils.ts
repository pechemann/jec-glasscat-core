//  DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS HEADER.
//
//   Copyright 2016-2018 Pascal ECHEMANN.
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

import { LoginStrategyConfig } from "../../../src/com/onsoft/glasscat/security/login/config/LoginStrategyConfig";
import { EjpLoginStrategyConfig } from "../../../src/com/onsoft/glasscat/security/login/config/EjpLoginStrategyConfig";
import { EjpLoginConfigImpl } from "../../../src/com/onsoft/glasscat/context/ejp/EjpLoginConfigImpl";
import { EjpRealmConfigImpl } from "../../../src/com/onsoft/glasscat/context/ejp/EjpRealmConfigImpl";
import { AuthMethod, RealmType } from "jec-exchange";
import { EjpLoginConfig, EjpRealmConfig } from "jec-glasscat-config";

/*!
 * This module constains utilities used by the DefaultRealmTest test suite.
 */

export const CONTEXTROOT:string = process.cwd();
export const buildLoginStrategyConfig:Function = function(type:RealmType):LoginStrategyConfig {
  let cfg:LoginStrategyConfig = null;
  const context:EjpLoginConfig = new EjpLoginConfigImpl();
  const realm:EjpRealmConfig = new EjpRealmConfigImpl();
  realm.type = type;
  context.realm = realm;
  context.authMethod = AuthMethod.BASIC;
  cfg = new EjpLoginStrategyConfig(context);
  return cfg;
}
