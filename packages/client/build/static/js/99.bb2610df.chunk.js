(this["webpackJsonpcode-book"]=this["webpackJsonpcode-book"]||[]).push([[99],{269:function(o,e){!function(o){o.languages.django={comment:/^{#[\s\S]*?#}$/,tag:{pattern:/(^{%[+-]?\s*)\w+/,lookbehind:!0,alias:"keyword"},delimiter:{pattern:/^{[{%][+-]?|[+-]?[}%]}$/,alias:"punctuation"},string:{pattern:/("|')(?:\\.|(?!\1)[^\\\r\n])*\1/,greedy:!0},filter:{pattern:/(\|)\w+/,lookbehind:!0,alias:"function"},test:{pattern:/(\bis\s+(?:not\s+)?)(?!not\b)\w+/,lookbehind:!0,alias:"function"},function:/\b[a-z_]\w+(?=\s*\()/i,keyword:/\b(?:and|as|by|else|for|if|import|in|is|loop|not|or|recursive|with|without)\b/,operator:/[-+*/%=]=?|!=|\*\*?=?|\/\/?=?|<[<=>]?|>[=>]?|[&|^~]/,number:/\b\d+(?:\.\d+)?\b/,boolean:/[Tt]rue|[Ff]alse|[Nn]one/,variable:/\b\w+?\b/,punctuation:/[{}[\](),.:;]/};var e=/{{[\s\S]*?}}|{%[\s\S]*?%}|{#[\s\S]*?#}/g,n=o.languages["markup-templating"];o.hooks.add("before-tokenize",(function(o){n.buildPlaceholders(o,"django",e)})),o.hooks.add("after-tokenize",(function(o){n.tokenizePlaceholders(o,"django")})),o.languages.jinja2=o.languages.django,o.hooks.add("before-tokenize",(function(o){n.buildPlaceholders(o,"jinja2",e)})),o.hooks.add("after-tokenize",(function(o){n.tokenizePlaceholders(o,"jinja2")}))}(Prism)}}]);
//# sourceMappingURL=99.bb2610df.chunk.js.map