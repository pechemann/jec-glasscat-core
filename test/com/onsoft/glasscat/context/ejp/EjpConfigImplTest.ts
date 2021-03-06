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
import { EjpConfigImpl } from "../../../../../../src/com/onsoft/glasscat/context/ejp/EjpConfigImpl";
import { EjpConfig } from "jec-glasscat-config";

@TestSuite({
  description: "Test the EjpConfig class properties"
})
export class EjpConfigImplTest {

  public config:EjpConfig = null;

  @BeforeAll()
  public initTest():void {
    this.config = new EjpConfigImpl();
  }

  @Test({
    description: "should have a 'webapp' property set to 'null'"
  })
  public webappTest():void {
    expect(this.config).to.have.property("webapp", null);
  }
}