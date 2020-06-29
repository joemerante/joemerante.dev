---
title: CodeQL jQuery example
tags:
  - AppSec
  - JavaScript
  - Webinars
emoji: 🐞
link: https://www.youtube.com/watch?v=pYzfGaLTqC0
---

The example below comes from a May 2020 workshop on using CodeQL. To set up CodeQL, you import code into a database to run queries against using the CodeQL language. The results of queries can be viewed inside Visual Studio Code. More resources [here](https://github.com/githubsatelliteworkshops/codeql/blob/master/javascript.md).

The snippet below checks for potentially unsafe input to `$` in jQuery plugins. In the older version of Bootstrap examined in the workshop, an xss vulnerability existed because the library didn't check whether actual DOM elements were being passed to `$`, creating an xss sink. For example, when `.text()` is called in code like `$(options.textSrcSelector).text()`, an unsafe string passed to `$` could be executed by jQuery. The [workshop repo](https://github.com/githubsatelliteworkshops/codeql/blob/master/javascript.md) suggests one better way to refactor the code.

The from/where/select syntax is a little SQL-y, you `import javascript` to get the autocomplete goodies in VS Code, use classes and predicates to organize and reuse code. Note that `=` is equality, not assignment. Other concepts of data flow nodes and data flow analysis (like a DAG) to account for alternate syntax & indirection were explained well. Built in taint tracking is another neat feature.

```js
import javascript
import DataFlow::PathGraph

class Config extends TaintTracking::Configuration {
  Config() { this = "Config" }
  override predicate isSource(DataFlow::Node source) {
    exists(DataFlow::FunctionNode plugin |
      plugin = jquery().getAPropertyRead("fn").getAPropertySource() and
      plugin.getLastParameter() = source
    )
  }
  override predicate isSink(DataFlow::Node sink) {
    sink = jquery().getACall().getArgument(0)
  }
}

from Config config, DataFlow::PathNode source, DataFlow::PathNode sink
where config.hasFlowPath(source, sink)
select sink, source, sink, "Potential XSS vulnerability in plugin."
```
