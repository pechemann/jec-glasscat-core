/*!
 * JEC GlassCat Core Gruntfile.js
 * Copyright(c) 2017 Pascal ECHEMANN
 * Apache 2.0 Licensed
 * This is a part of the JEC projects: <https://github.com/pechemann/JEC>
 */

/*
 * Provides tasks for building and testing the jec-glasscat-core project.
 */
module.exports = function(grunt) {

  //--> Utilities:
  const INDEX_TAG = "index";
  const DECLATE_TAG = /declare /g;
  const IMPORT_STATEMENT = /import.*;/g;
  const TRIM_BLANK_LINES = /^\s*[\r\n]/gm;
  const PLACEHOLDER = /\/\*PLACEHOLDER\*\//g;
  const EMPTY_STRING = "";

  //--> Stores types during build process:
  let typesContent = EMPTY_STRING;

  //--> Grunt config initialization:
  grunt.initConfig({});

  //--> Compiles all ".ts" whithin the "src" folder:
  grunt.config("ts", {
    build : {
      src: ["src/**/*.ts"],
      options: {
        module: "commonjs",
        target: "es6",
        sourceMap: false,
        declaration: true,
        declarationDir: "types/temp",
        removeComments: true,
        preserveConstEnums: true,
        emitDecoratorMetadata: true,
        experimentalDecorators: true,
        alwaysStrict: true,
        fast: "never"
      }
    }
  });

  //--> Copy tasks:
  grunt.config("copy", {
    //--> Copies all ".js" files from the "src" to the "lib" folder:
    main: {
        cwd: "src",
        src: "**/*.js",
        dest: "lib",
        expand: true
    },
    //--> Initializes all type files:
    initTypes: {
      cwd: "types/temp",
      src: "**/*.ts",
      dest: "types/temp2",
      expand: true,
      flatten: true,
      filter: "isFile",
      options: {
        process: function (content, srcpath) {
          if(srcpath.indexOf(INDEX_TAG) === -1) {
            let result =  content.replace(DECLATE_TAG, EMPTY_STRING);
            result = result.replace(IMPORT_STATEMENT, EMPTY_STRING);
            result = result.replace(TRIM_BLANK_LINES, EMPTY_STRING);
            typesContent += result;
          }
          return content;
        }
      }
    },
    //--> Builds final type file:
    buildTypesFile: {
      cwd: "utils/types",
      src: "**/*.ts",
      dest: "types",
      expand: true,
      options: {
        process: function (content, srcpath) {
          content = content.replace(PLACEHOLDER, typesContent);
          return content;
        }
      }
    }
  });
  
  //--> Build the API documentation:
  grunt.config("typedoc", {
    doc: {
      src: "src/",
      options: {
        module: "commonjs",
        target: "ES6",
        out: "docs/api-reference",
        readme: "README.md",
        name: "JEC GlassCat Core Project",
        exclude: "**/*Test*.ts"
      }
    }
  });

  //--> Removes temp folders:
  grunt.config("clean", {
    build: ["types/temp", "types/temp2"]
  });

  //--> Imports the TypeScript compilation task:
  grunt.loadNpmTasks('grunt-ts');

  //--> Imports the task used for copying all ".js" files from the "src" to the 
  //    "lib" folder:
  grunt.loadNpmTasks("grunt-contrib-copy");

  //--> Imports the task used for building API documentation:
  grunt.loadNpmTasks('grunt-typedoc');
  
  //--> Imports the task used for deleting temp files:
  grunt.loadNpmTasks('grunt-contrib-clean');

  /*!
   * JEC Wildcat Tasks:
   */

  //--> Task: builds the "jec-glasscat-core" project:
  grunt.registerTask("build", ["ts:build", "copy:main",
                               "copy:initTypes", "copy:buildTypesFile",
                               "clean:build"]);

  //--> Task: builds the "jec-glasscat-core" API documentation:
  grunt.registerTask("doc", ["typedoc"]);
}