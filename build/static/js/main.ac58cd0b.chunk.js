(this.webpackJsonppuhelinluettelo=this.webpackJsonppuhelinluettelo||[]).push([[0],{15:function(e,n,t){e.exports=t(38)},37:function(e,n,t){},38:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),u=t(14),c=t.n(u),l=t(4),o=t(2),i=function(e){var n=e.text,t=e.newFilter,a=e.handleFilterChange;return r.a.createElement("form",null,r.a.createElement("div",null,n," ",r.a.createElement("input",{value:t,onChange:a})))},m=function(e){var n=e.addPerson,t=e.newName,a=e.handlePersonChange,u=e.newNumber,c=e.handleNumberChange;return r.a.createElement("form",{onSubmit:n},r.a.createElement("div",null,"name: ",r.a.createElement("input",{value:t,onChange:a})),r.a.createElement("div",null,"number: ",r.a.createElement("input",{value:u,onChange:c})),r.a.createElement("div",null,r.a.createElement("button",{type:"submit"},"add")))},s=function(e){var n=e.person,t=e.filter,a=e.handleButtonClick,u=n.name.slice(0,t.length).toLowerCase();return t.toLowerCase()===u||""===t?r.a.createElement("div",null,n.name," ",n.number,r.a.createElement("button",{onClick:a,id:n.id},"Delete")):null},d=t(3),f=t.n(d),h="/api/persons",b=function(){return f.a.get(h).then((function(e){return e.data}))},v=function(e){return f.a.post(h,e).then((function(e){return e.data}))},p=function(e){return f.a.delete(h+"/".concat(e)).then((function(e){return e.data}))},E=function(e,n){return f.a.put("".concat(h,"/").concat(e),n).then((function(e){return e.data}))},w=function(e){var n=e.message,t=e.style;return null===n?null:r.a.createElement("div",{className:t},n)},g=function(){var e=Object(a.useState)([]),n=Object(o.a)(e,2),t=n[0],u=n[1],c=Object(a.useState)(""),d=Object(o.a)(c,2),f=d[0],h=d[1],g=Object(a.useState)(""),O=Object(o.a)(g,2),j=O[0],C=O[1],k=Object(a.useState)(""),y=Object(o.a)(k,2),N=y[0],P=y[1],S=Object(a.useState)(null),T=Object(o.a)(S,2),x=T[0],F=T[1],B=Object(a.useState)(null),D=Object(o.a)(B,2),A=D[0],J=D[1];Object(a.useEffect)((function(){b().then((function(e){u(e)}))}),[]);var L=function(e){var n=e.target.id-0,a=t.find((function(e){return e.id===n}));window.confirm("Delete ".concat(a.name,"?"))&&(p(a._id).catch((function(e){F("Person ".concat(a.name," was already deleted from server")),J("error"),setTimeout((function(){F(null)}),4e3)})),u(t.filter((function(e){return e.id!==a.id}))),F("".concat(a.name," removed")),J("success"),setTimeout((function(){F(null)}),2e3))};return r.a.createElement("div",null,r.a.createElement("h2",null,"Phonebook"),r.a.createElement(w,{message:x,style:A}),r.a.createElement(i,{text:"filter shown with",newFilter:N,handleFilterChange:function(e){P(e.target.value)}}),r.a.createElement("h2",null,"Add a new"),r.a.createElement(m,{addPerson:function(e){e.preventDefault();var n={name:f,number:j},a=t.map((function(e){return e.name})).indexOf(n.name);if(-1!==a){if(window.confirm("".concat(n.name," is already added to phonebook, replace the old number with a new one?"))){var r=t.find((function(e){return e.name===n.name})),c=Object(l.a)(Object(l.a)({},r),{},{number:j});E(r._id,c).then((function(e){u(t.map((function(n){return n.name!==c.name?n:e}))),F("".concat(n.name," number changed")),J("success"),setTimeout((function(){F(null)}),2e3)})).catch((function(e){F("Person ".concat(n.name," was already deleted from server")),J("error"),setTimeout((function(){F(null)}),4e3),u(t.filter((function(e){return e.id!==a+1})))})),h(""),C("")}}else v(n).then((function(e){u(t.concat(e)),F("Added ".concat(n.name)),J("success"),setTimeout((function(){F(null)}),2e3)})).catch((function(e){console.log(e.response.data),F(e.response.data.error),J("error"),setTimeout((function(){F(null)}),4e3)})),C(""),h("")},newName:f,handlePersonChange:function(e){h(e.target.value)},newNumber:j,handleNumberChange:function(e){C(e.target.value)}}),r.a.createElement("h2",null,"Numbers"),t.map((function(e){return r.a.createElement(s,{key:e.name,person:e,filter:N,handleButtonClick:L})})))};t(37);c.a.render(r.a.createElement(g,null),document.getElementById("root"))}},[[15,1,2]]]);
//# sourceMappingURL=main.ac58cd0b.chunk.js.map