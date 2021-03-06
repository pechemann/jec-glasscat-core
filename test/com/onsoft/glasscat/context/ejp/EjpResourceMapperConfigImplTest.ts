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
import { EjpResourceMapperConfigImpl } from "../../../../../../src/com/onsoft/glasscat/context/ejp/EjpResourceMapperConfigImpl";
import { EjpResourceMapperConfig } from "jec-glasscat-config";

@TestSuite({
  description: "Test the EjpResourceMapperConfigImpl class properties"
})
export class EjpResourceMapperConfigImplTest {

  public config:EjpResourceMapperConfig = null;

  @BeforeAll()
  public initTest():void {
    this.config = new EjpResourceMapperConfigImpl();
  }

  @Test({
    description: "should have a 'name' property set to 'null'"
  })
  public nameTest():void {
    expect(this.config).to.have.property("name", null);
  }
  
  @Test({
    description: "should have a 'value' property set to 'null'"
  })
  public valueTest():void {
    expect(this.config).to.have.property("value", null);
  }
}