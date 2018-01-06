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

import { TestSuite, Test, BeforeAll } from "jec-juta";
import { expect } from "chai";
import { EjpJsletsConfig } from "../../../../../../src/com/onsoft/glasscat/context/ejp/EjpJsletsConfig";

@TestSuite({
  description: "Test the EjpJsletsConfig class properties"
})
export class EjpJsletsConfigTest {

  public config:EjpJsletsConfig = null;

  @BeforeAll()
  public initTest():void {
    this.config = new EjpJsletsConfig();
  }

  @Test({
    description: "should have a 'configFile' property set to 'null'"
  })
  public configFileTest():void {
    expect(this.config).to.have.property("configFile", null);
  }
  
  @Test({
    description: "should have a 'config' property set to 'null'"
  })
  public configTest():void {
    expect(this.config).to.have.property("config", null);
  }
  
  @Test({
    description: "should have a 'enableAutowire' property set to 'false'"
  })
  public enableAutowireTest():void {
    expect(this.config).to.have.property("enableAutowire", false);
  }
}