(this["webpackJsonp@for-alisia/code-client"]=this["webpackJsonp@for-alisia/code-client"]||[]).push([[96],{266:function(e,n){!function(e){e.languages.diff={coord:[/^(?:\*{3}|-{3}|\+{3}).*$/m,/^@@.*@@$/m,/^\d+.*$/m]};var n={"deleted-sign":"-","deleted-arrow":"<","inserted-sign":"+","inserted-arrow":">",unchanged:" ",diff:"!"};Object.keys(n).forEach((function(i){var a=n[i],s=[];/^\w+$/.test(i)||s.push(/\w+/.exec(i)[0]),"diff"===i&&s.push("bold"),e.languages.diff[i]={pattern:RegExp("^(?:["+a+"].*(?:\r\n?|\n|(?![\\s\\S])))+","m"),alias:s,inside:{line:{pattern:/(.)(?=[\s\S]).*(?:\r\n?|\n)?/,lookbehind:!0},prefix:{pattern:/[\s\S]/,alias:/\w+/.exec(i)[0]}}}})),Object.defineProperty(e.languages.diff,"PREFIXES",{value:n})}(Prism)}}]);
//# sourceMappingURL=96.2cef38ba.chunk.js.map