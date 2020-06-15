---
title: CodeQL jQuery example
tags:
  - Webinars
  - JavaScript
emoji: 🐞
link: https://www.youtube.com/watch?v=pYzfGaLTqC0
---

May 2020 workshop on using CodeQL to look for potential xss from unsafe input to (older versions of) jQuery plugins. Passing data directly to `$` then calling functions, like `$(options.selector).text()` were xss sinks because there was no check that a DOM element was being passed in. (Use `$(document).find(options.selector).text()` instead.)

To set up, import the code into a database used to analyze against, results of queries can be viewed inside VS Code.

The from/where/select syntax is a little SQL-y, you `import javascript` to get the autocomplete goodies, use classes and predicates to organize and reuse. Note that `=` is equality, not assignment. Concept of data flow nodes and data flow analysis (like a DAG) to account for alternate syntax, indirection. Built in taint tracking

More resources [here](https://github.com/githubsatelliteworkshops/codeql/blob/master/javascript.md).

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
