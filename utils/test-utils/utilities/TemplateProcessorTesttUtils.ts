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

import { GuidGenerator, HttpStatusCode } from "jec-commons";
import { SessionId } from "jec-exchange";
import { GlassCatSessionId } from "../../../src/com/onsoft/glasscat/security/session/GlassCatSessionId";

/*!
 * This module constains utilities used by all TemplateProcessor test suites.
 */

// Utilities:
export const INVALID_PATH:string = "path";
export const VALID_PATH:string = "utils/test-utils/files/test.ejs";
export const DATA:any = { title: "Test title", status: HttpStatusCode.BAD_REQUEST };
export const RENDERED_DATA:string = "<h1>Test title</h1>";
export const RENDERED_STATUS:string = "<p>400</p>";
