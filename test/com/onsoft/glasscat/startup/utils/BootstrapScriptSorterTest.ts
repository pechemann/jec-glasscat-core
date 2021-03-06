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

import { TestSuite, Test } from "jec-juta";
import { expect } from "chai";
import { BootstrapScriptSorter } from "../../../../../../src/com/onsoft/glasscat/startup/utils/BootstrapScriptSorter";
import { BootstrapScript } from "jec-commons";

import * as utils from "../../../../../../utils/test-utils/utilities/BootstrapScriptSorterTestUtils"; 

@TestSuite({
  description: "Test the BootstrapScriptSorter class methods"
})
export class BootstrapScriptSorterTest {

  @Test({
    description: "should sort the specified collection from higher to lower IDs",
    repeat: 5
  })
  public sortCollectionTest():void {
    const sorter:BootstrapScriptSorter = new BootstrapScriptSorter();
    const collection:BootstrapScript[] = utils.buildBootstrapScriptColl();
    let len:number = collection.length;
    let priority:number = 0;
    let script:BootstrapScript = null;
    sorter.sortCollection(collection);
    while(len--) {
      script = collection[len];
      expect(script.getPriority() >= priority).to.be.true;
      priority = script.getPriority();
    }
  }
}