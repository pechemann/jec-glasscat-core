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

import {GlassCatContext} from "../GlassCatContext";
import {GlassCatConfigLoader} from "./GlassCatConfigLoader";
import {BootstrapConfig} from "jec-glasscat-config";
import {BootstrapConfigParser} from "../core/utils/BootstrapConfigParser";

/**
 * A Builder utility for managing GlassCat containers contexts.
 */
export class GlassCatContextBuilder {

  ////////////////////////////////////////////////////////////////////////////
  // Constructor function
  ////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>GlassCatContextBuilder</code> instance.
   */
  constructor() {}

  ////////////////////////////////////////////////////////////////////////////
  // Public methods
  ////////////////////////////////////////////////////////////////////////////

  /**
   * Builds the container context, extracted from the bootstrap file parameters.
   *
   * @return {GlassCatContext} a new <code>GlassCatContext</code> instance.
   */
  public buildContext():GlassCatContext {
    const loader:GlassCatConfigLoader = new GlassCatConfigLoader();
    const parser:BootstrapConfigParser = new BootstrapConfigParser();
    const config:any = loader.loadSync();
    const bootstrap:BootstrapConfig = parser.parse(config);
    const ctx:GlassCatContext = new GlassCatContext(bootstrap);
    return ctx;
  }
};
