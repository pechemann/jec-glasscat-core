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
import { LoggerContext } from "../../../../../src/com/onsoft/glasscat/context/LoggerContext";
import { LogLevel } from "jec-commons";

@TestSuite({
  description: "Test the LoggerContext class properties"
})
export class LoggerContextTest {

  public context:LoggerContext = null;

  @BeforeAll()
  public initTest():void {
    this.context = new LoggerContext();
  }
  
  @Test({
    description: "should have a 'factory' property set to 'null'"
  })
  public factoryTest():void {
    expect(this.context).to.have.property("factory", null);
  }
  
  @Test({
    description: "should have a 'name' property set to 'null'"
  })
  public nameTest():void {
    expect(this.context).to.have.property("name", null);
  }
  
  @Test({
    description: "should have a 'logLevel' property set to 'null'"
  })
  public logLevelTest():void {
    expect(this.context).to.have.property("logLevel", LogLevel.TRACE);
  }
}