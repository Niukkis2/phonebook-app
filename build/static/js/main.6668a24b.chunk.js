(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{14:function(e,n,t){e.exports=t(37)},19:function(e,n,t){},37:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),c=t(13),o=t.n(c),u=(t(19),t(2)),i=function(e){return e.persons.map((function(n){return r.a.createElement("p",{key:n.id},n.name," ",n.number,r.a.createElement("button",{onClick:function(){return e.onClick(n.id)}},"delete"))}))},l=function(e){return r.a.createElement("form",null,r.a.createElement("div",null,"filter shown with ",r.a.createElement("input",{value:e.matcher,onChange:e.onMatcherChange})))},m=function(e){return r.a.createElement("form",{onSubmit:e.onSubmit},r.a.createElement("div",null,"name: ",r.a.createElement("input",{value:e.name,onChange:e.onNameChange})),r.a.createElement("div",null,"number: ",r.a.createElement("input",{value:e.number,onChange:e.onNumberChange})),r.a.createElement("div",null,r.a.createElement("button",{type:"submit"},"add")))},f=t(3),s=t.n(f),d="/api/persons",h=function(){return s.a.get(d).then((function(e){return e.data}))},b=function(e){return s.a.post(d,e).then((function(e){return e.data}))},p=function(e,n){return s.a.put("".concat(d,"/").concat(e),n).then((function(e){return e.data}))},E=function(e){return s.a.delete("".concat(d,"/").concat(e)).then((function(e){return e.data}))},v=function(e){var n=e.notification;return null===n?null:r.a.createElement("div",{className:n.type},n.message)};var g=function(){var e=Object(a.useState)([]),n=Object(u.a)(e,2),t=n[0],c=n[1],o=Object(a.useState)(""),f=Object(u.a)(o,2),s=f[0],d=f[1],g=Object(a.useState)(""),C=Object(u.a)(g,2),w=C[0],j=C[1],O=Object(a.useState)(""),k=Object(u.a)(O,2),S=k[0],y=k[1],N=Object(a.useState)(null),D=Object(u.a)(N,2),M=D[0],J=D[1];Object(a.useEffect)((function(){h().then((function(e){return c(e)}))}),[]);var L=function(e,n){J({message:e,type:n}),setTimeout((function(){J(null)}),2e3)},x=0===S.length?t:t.filter((function(e){return e.name.toLowerCase().includes(S.toLowerCase())}));return r.a.createElement("div",null,r.a.createElement("h2",null,"Phonebook"),r.a.createElement(v,{notification:M}),r.a.createElement(l,{matcher:S,onMatcherChange:function(e){y(e.target.value)}}),r.a.createElement("h3",null,"add a new"),r.a.createElement(m,{onSubmit:function(e){e.preventDefault();var n=t.find((function(e){return e.name===s}));n?window.confirm("".concat(n.name," is already added to the phonebook, replace the old number with a new one?"))&&p(n.id,{name:n.name,number:w}).then((function(e){c(t.map((function(t){return t.id!==n.id?t:e}))),L("Changed number of ".concat(n.name),"success"),d(""),j("")})):b({name:s,number:w}).then((function(e){c(t.concat(e)),L("Added ".concat(s),"success"),d(""),j("")})).catch((function(e){console.log(e.response.data.error),L("".concat(e.response.data.error," "),"error")}))},name:s,onNameChange:function(e){d(e.target.value)},number:w,onNumberChange:function(e){j(e.target.value)}}),r.a.createElement("h3",null,"Numbers"),r.a.createElement(i,{persons:x,onClick:function(e){var n=t.find((function(n){return n.id===e}));window.confirm("Delete ".concat(n.name))&&E(e).then((function(a){c(t.filter((function(n){return n.id!==e}))),L("Deleted ".concat(n.name),"success")})).catch((function(){c(t.filter((function(n){return n.id!==e}))),L("".concat(n.name," had already been removed"),"error")}))}}))};o.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(g,null)),document.getElementById("root"))}},[[14,1,2]]]);
//# sourceMappingURL=main.6668a24b.chunk.js.map