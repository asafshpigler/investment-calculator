(this["webpackJsonpinvestment-calculator"]=this["webpackJsonpinvestment-calculator"]||[]).push([[0],{229:function(e,t,n){},336:function(e,t,n){},337:function(e,t,n){},338:function(e,t,n){},339:function(e,t,n){},340:function(e,t,n){},341:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),c=n(47),s=n.n(c),o=n(17),u=n(59),i=(n(207),Object(u.b)({name:"isLoggedIn",initialState:{value:!1},reducers:{setUserLoggedIn:function(e,t){e.value=t.payload}}})),l=function(e){return e.session.value},d=i.actions.setUserLoggedIn,j=i.reducer,b=n(14);function p(e){e.preventDefault()}function h(e){return JSON.parse(JSON.stringify(e))}var m=n(110),v="NORMAL",x="SPITZER",O=n.n(m)()().format("YYYY-MM-DD"),g={charts:[],currentChart:{userInputOneTime:[],userInputMonthly:[],userInputMortgage:{type:x,startDate:O,loanAmount:0,duration:0,loanRate:1.5,paymentPeriods:void 0}},propertyIds:[]},f=Object(u.b)({name:"charts",initialState:{value:g},reducers:{setCharts:function(e,t){e.value.charts=t.payload},setCurrentChart:function(e,t){e.value.currentChart=t.payload},replaceChartInCharts:function(e,t){var n=h(e.value.charts),a=t.payload,r=n.findIndex((function(e){return e.propertyId===a.propertyId}));n[r]=a,e.value.charts=n},setPropertyIds:function(e,t){e.value.propertyIds=t.payload},setMortgageType:function(e,t){var n=t.payload;e.value.currentChart.userInputMortgage.type=n,n===x?(e.value.currentChart.userInputMortgage.paymentPeriods=void 0,e.value.currentChart.userInputMortgage.duration=0,e.value.currentChart.userInputMortgage.loanRate=0):n===v&&(e.value.currentChart.userInputMortgage.duration=void 0,e.value.currentChart.userInputMortgage.loanRate=void 0,e.value.currentChart.userInputMortgage.paymentPeriods=[{duration:0,amount:0}])},setMortgageStartDate:function(e,t){e.value.currentChart.userInputMortgage.startDate=t.payload},setMortgageAmount:function(e,t){e.value.currentChart.userInputMortgage.loanAmount=t.payload},setMortgageDuration:function(e,t){e.value.currentChart.userInputMortgage.duration=t.payload},setMortgageLoanRate:function(e,t){e.value.currentChart.userInputMortgage.loanRate=t.payload},setMortgagePaymentPeriods:function(e,t){e.value.currentChart.userInputMortgage.paymentPeriods=t.payload},addPaymentPeriod:function(e){e.value.currentChart.userInputMortgage.paymentPeriods=[].concat(Object(b.a)(e.value.currentChart.userInputMortgage.paymentPeriods),[{duration:0,amount:0}])},setOneTimeExpenses:function(e,t){e.value.currentChart.userInputOneTime=t.payload},addOneTimeExpense:function(e){e.value.currentChart.userInputOneTime=[].concat(Object(b.a)(e.value.currentChart.userInputOneTime),[{paymentDate:O,amount:0}])},setMonthlyExpenses:function(e,t){e.value.currentChart.userInputMonthly=t.payload},addMonthlyExpense:function(e){e.value.currentChart.userInputMonthly=[].concat(Object(b.a)(e.value.currentChart.userInputMonthly),[{startDate:O,duration:0,amount:0}])}}}),y=function(e){return e.charts.value.currentChart},C=function(e){return e.charts.value.propertyIds},I=function(e){return e.charts.value.currentChart.userInputMortgage.type},M=function(e){return e.charts.value.currentChart.userInputMortgage.startDate},N=function(e){return e.charts.value.currentChart.userInputMortgage.loanAmount},D=function(e){return e.charts.value.currentChart.userInputMortgage.duration},P=function(e){return e.charts.value.currentChart.userInputMortgage.loanRate},S=function(e){return e.charts.value.currentChart.userInputMortgage.paymentPeriods},k=function(e){return e.charts.value.currentChart.userInputOneTime},A=function(e){return e.charts.value.currentChart.userInputMonthly},E=f.actions,w=E.setCharts,T=E.setCurrentChart,L=E.replaceChartInCharts,R=E.setPropertyIds,Y=E.setMortgageType,F=E.setMortgageStartDate,U=E.setMortgageAmount,$=E.setMortgageDuration,z=E.setMortgageLoanRate,G=E.setMortgagePaymentPeriods,J=E.addPaymentPeriod,B=E.setOneTimeExpenses,W=E.addOneTimeExpense,q=E.setMonthlyExpenses,V=E.addMonthlyExpense,Z=f.reducer,_=Object(u.b)({name:"expenses",initialState:{value:[]},reducers:{setExpenses:function(e,t){e.value=t.payload}}}),H=(_.actions.setExpenses,_.reducer),K=Object(u.a)({reducer:{session:j,charts:Z,expenses:H},devTools:!0}),Q=n(21),X=n(180),ee=n(425),te=n(429),ne=n(427),ae=n(428),re=n(29),ce=n.n(re),se=n(54),oe=n(80),ue=n.n(oe);function ie(){return ue.a.get("/charts").then((function(e){return e.data}))}function le(e){return ue.a.post("/signup",{userName:e}).then((function(e){return e.data}))}function de(e){return ue.a.post("/login",{userName:e}).then((function(e){return e.data}))}function je(){return ue.a.post("/logout")}function be(e){return ue.a.post("/property-expenses",e).then((function(e){return e.data}))}function pe(){return(pe=Object(se.a)(ce.a.mark((function e(){return ce.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("appLogin"),e.next=3,de();case 3:if(!e.sent){e.next=8;break}return K.dispatch(d(!0)),e.next=8,xe();case 8:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function he(){return(he=Object(se.a)(ce.a.mark((function e(t){return ce.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,de(t);case 2:return K.dispatch(d(!0)),e.next=5,xe();case 5:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function me(){return(me=Object(se.a)(ce.a.mark((function e(t){return ce.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,le(t);case 2:return K.dispatch(d(!0)),e.next=5,xe();case 5:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function ve(){return(ve=Object(se.a)(ce.a.mark((function e(){return ce.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,je();case 2:K.dispatch(d(!1));case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function xe(){return Oe.apply(this,arguments)}function Oe(){return(Oe=Object(se.a)(ce.a.mark((function e(){var t;return ce.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("getUserData"),e.next=3,ie();case 3:t=e.sent,K.dispatch(w(t)),K.dispatch(T(t[0])),K.dispatch(R(t.map((function(e){return e.propertyId}))));case 7:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function ge(){return fe.apply(this,arguments)}function fe(){return(fe=Object(se.a)(ce.a.mark((function e(){var t,n,a,r,c,s,o,u,i,l,d,j,b,p;return ce.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=K.getState().charts.value.currentChart,n=t.userInputMortgage,a=t.userInputOneTime,r=t.userInputMonthly,c=t.propertyId,t.charts,s=n.type,o=n.startDate,u=n.loanAmount,i=n.duration,l=n.loanRate,d=n.paymentPeriods,j=null,s===x?j={type:s,startDate:o,loanAmount:u,duration:i,loanRate:+(l/100).toFixed(4)}:s===v&&(j={type:s,startDate:o,loanAmount:u,paymentPeriods:d}),b={propertyId:c,oneTimeExpenses:a,monthlyExpenses:r,mortgageExpenses:j},e.next=7,be(b);case 7:p=e.sent,K.dispatch(T(p)),K.dispatch(L(p));case 10:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var ye=n(1);var Ce=function(){var e=Object(o.c)(l),t=Object(Q.g)();return Object(ye.jsx)(ee.a,{position:"static",children:Object(ye.jsxs)(ne.a,{children:[Object(ye.jsx)(ae.a,{variant:"h6",component:"div",sx:{flexGrow:1},children:"Investment Calculator"}),e&&Object(ye.jsx)(te.a,{color:"inherit",onClick:function(){(function(){return ve.apply(this,arguments)})().then((function(){t.push("/login")}))},children:"Logout"})]})})},Ie=n(9),Me=n(418),Ne=n(177),De=n.n(Ne),Pe=(n(229),"LOGIN"),Se="SIGN_UP";var ke=function(){var e=Object(a.useState)(Pe),t=Object(Ie.a)(e,2),n=t[0],r=t[1],c=Object(a.useState)(""),s=Object(Ie.a)(c,2),o=s[0],u=s[1],i=Object(a.useState)(!1),l=Object(Ie.a)(i,2),d=l[0],j=l[1],b=Object(Q.g)();return Object(ye.jsxs)("div",{className:"login-signup",children:[Object(ye.jsx)(ae.a,{className:"title",variant:"h4",children:n===Pe?"Login":"Sign up"}),Object(ye.jsxs)("form",{className:"form",onSubmit:function(e){switch(p(e),n){case Pe:(function(e){return he.apply(this,arguments)})(o).then((function(){b.push("/")})).catch((function(e){j(!0)}));break;case Se:(function(e){return me.apply(this,arguments)})(o).then((function(){b.push("/")}));break;default:throw new Error("code error, invalid userMode")}},children:[Object(ye.jsx)(Me.a,{onChange:function(e){u(e.target.value),d&&j(!1)},value:o,className:"form-input",required:!0,label:"User Id"}),Object(ye.jsxs)("div",{className:"btn-container",children:[Object(ye.jsx)(te.a,{onClick:function(){r(n===Pe?Se:Pe)},children:n===Pe?"Sign up":"Login"}),Object(ye.jsx)(te.a,{variant:"contained",type:"submit",children:"Go!"})]})]}),d&&Object(ye.jsxs)("div",{className:"error-container",children:[Object(ye.jsx)("span",{className:"error-msg",children:"User Doesn't Exist"}),Object(ye.jsx)(De.a,{})]})]})},Ae=n(426),Ee=n(431),we=n(416),Te=n(412),Le=n(419),Re=n(430),Ye=n(181),Fe=function(){var e=Object(o.c)(y),t=e.labels,n=e.incomes,a=e.oneTimeExpenses,r=e.netRevenues,c=e.monthlyExpenses,s={labels:t,datasets:[{type:"line",label:"Net Revenue",data:r,backgroundColor:"white",borderColor:"black",borderWidth:2},{label:"Income",data:n,backgroundColor:"lightgreen"},{label:"Mortgage",data:e.mortgageExpenses,backgroundColor:"#931A25"},{label:"Monthly",data:c,backgroundColor:"#E97171"},{label:"One Time",data:a,backgroundColor:"#FFCB8E"}]};return Object(ye.jsx)(Ye.a,{data:s,options:{scales:{x:{stacked:!0},y:{stacked:!0,ticks:{callback:function(e){return e+"$"}}}}}})};n(336);var Ue=function(){var e=Object(o.c)(y),t=Object(o.c)(C);return Object(ye.jsxs)(Ee.a,{className:"chart-card",elevation:3,children:[Object(ye.jsx)(ae.a,{className:"title",variant:"h4",children:"Property"}),Object(ye.jsxs)(Re.a,{fullWidth:!0,children:[Object(ye.jsx)(Le.a,{id:"select-property-id",children:"Property ID"}),Object(ye.jsx)(Te.a,{labelId:"select-property-id",id:"select-id",label:"PropertyId",value:e.propertyId||"",onChange:function(e){!function(e){console.log("setChartByPropertyId",e);var t=K.getState().charts.value.charts.find((function(t){return t.propertyId===e}));K.dispatch(T(t))}(e.target.value)},children:t.map((function(e){return Object(ye.jsx)(we.a,{value:e,children:e},e)}))})]}),Object(ye.jsx)(Fe,{})]})},$e=n(115),ze=n.n($e),Ge=n(432),Je=n(414),Be=n(421),We=n(413),qe=n(433),Ve=n(67),Ze=n(410),_e=n(411),He=n(409);var Ke=function(e){return Object(ye.jsxs)("div",{className:"input-container",children:[Object(ye.jsxs)(ae.a,{variant:"h6",className:"input-label",children:[e.title,":"]}),Object(ye.jsx)(He.b,{dateAdapter:Ze.a,children:Object(ye.jsx)(_e.a,{label:e.label,value:e.value,onChange:function(t){var n=t.format("YYYY-MM-DD");e.onChange(n)},inputFormat:"DD/MM/YYYY",renderInput:function(e){return Object(ye.jsx)(Me.a,Object(Ve.a)({},e))}})})]})},Qe=n(437),Xe=n(422);var et=function(e){return Object(ye.jsxs)("div",{className:"input-container",children:[Object(ye.jsxs)(ae.a,{variant:"h6",className:"input-label",children:[e.title,":"]}),Object(ye.jsx)(Xe.a,{type:"number",value:e.value,onChange:function(t){e.onChange(+t.target.value)},startAdornment:e.adornment&&Object(ye.jsx)(Qe.a,{position:"start",children:e.adornment})})]})},tt=n(436),nt=n(76),at=n.n(nt),rt=n(75),ct=n.n(rt);var st=function(){var e=Object(o.b)(),t=Object(o.c)(M),n=Object(o.c)(N),a=Object(o.c)(S);function r(t,n){var r=h(a);r[t].duration=n,e(G(r))}function c(t,n){var r=h(a);r[t].amount=n,e(G(r))}function s(t){var n=h(a);n.splice(t,1),e(G(n))}function u(){e(J())}return Object(ye.jsxs)(ye.Fragment,{children:[Object(ye.jsx)(Ke,{value:t,onChange:function(t){e(F(t))},title:"Start Date",label:"Loan Start Date"}),Object(ye.jsx)(et,{value:n,onChange:function(t){e(U(t))},title:"Amount"}),a&&a.map((function(e,t){return Object(ye.jsxs)(Ee.a,{className:"expenses-list-card",elevation:3,children:[0!==t&&Object(ye.jsx)(tt.a,{onClick:s.bind(null,t),className:"delete-btn","aria-label":"delete",color:"error",children:Object(ye.jsx)(ct.a,{})}),Object(ye.jsx)(et,{value:e.duration,onChange:r.bind(null,t),title:"Duration (Months)"}),Object(ye.jsx)(et,{value:e.amount,onChange:c.bind(null,t),title:"Amount",adornment:"$"}),t===a.length-1&&Object(ye.jsx)(te.a,{onClick:u,variant:"contained",endIcon:Object(ye.jsx)(at.a,{}),children:"Add Payment Period"})]},t)}))]})},ot=n(417),ut=(n(337),[{value:0,label:"0"},{value:1,label:"1%"},{value:2,label:"2%"},{value:3,label:"3%"},{value:4,label:"4%"},{value:5,label:"5%"}]);var it=function(){var e=Object(o.b)(),t=Object(o.c)(M),n=Object(o.c)(N),a=Object(o.c)(D),r=Object(o.c)(P);function c(t){e(z(t.target.value))}return Object(ye.jsxs)(ye.Fragment,{children:[Object(ye.jsx)(Ke,{value:t,onChange:function(t){e(F(t))},title:"Start Date",label:"Loan Start Date"}),Object(ye.jsx)(et,{value:n,onChange:function(t){e(U(t))},title:"Amount",adornment:"$"}),Object(ye.jsx)(et,{value:a,onChange:function(t){e($(t))},title:"Duration (Months)"}),Object(ye.jsxs)("div",{className:"input-container loan-rate-container",children:[Object(ye.jsx)(ae.a,{variant:"h6",className:"input-label loan-rate-label",children:"Loan Rate (Percentage):"}),Object(ye.jsx)(ot.a,{className:"loan-rate-slider",value:r,onChange:c,step:.1,min:0,max:5,marks:ut,valueLabelDisplay:"on"})]})]})};var lt=function(){var e=Object(o.b)(),t=Object(o.c)(k);function n(n,a){var r=h(t);r[n].paymentDate=a,console.log({i:n,date:a,nextPeriods:r}),e(B(r))}function a(n,a){var r=h(t);r[n].amount=a,e(B(r))}function r(n){var a=h(t);a.splice(n,1),e(B(a))}function c(){e(W())}return Object(ye.jsx)(ye.Fragment,{children:t&&t.map((function(e,s){return Object(ye.jsxs)(Ee.a,{className:"expenses-list-card",elevation:3,children:[0!==s&&Object(ye.jsx)(tt.a,{onClick:r.bind(null,s),className:"delete-btn","aria-label":"delete",color:"error",children:Object(ye.jsx)(ct.a,{})}),Object(ye.jsx)(Ke,{value:e.paymentDate,onChange:n.bind(null,s),title:"Payment Date"}),Object(ye.jsx)(et,{value:e.amount,onChange:a.bind(null,s),title:"Amount",adornment:"$"}),s===t.length-1&&Object(ye.jsx)(te.a,{onClick:c,variant:"contained",endIcon:Object(ye.jsx)(at.a,{}),children:"Add One Time Expense"})]},s)}))})};var dt=function(){var e=Object(o.b)(),t=Object(o.c)(A);function n(n,a){var r=h(t);r[n].startDate=a,e(q(r))}function a(n,a){var r=h(t);r[n].amount=a,e(q(r))}function r(n,a){var r=h(t);r[n].duration=a,e(q(r))}function c(n){var a=h(t);a.splice(n,1),e(q(a))}function s(){e(V())}return Object(ye.jsx)(ye.Fragment,{children:t&&t.map((function(e,o){return Object(ye.jsxs)(Ee.a,{className:"expenses-list-card",elevation:3,children:[0!==o&&Object(ye.jsx)(tt.a,{onClick:c.bind(null,o),className:"delete-btn","aria-label":"delete",color:"error",children:Object(ye.jsx)(ct.a,{})}),Object(ye.jsx)(Ke,{value:e.startDate,onChange:n.bind(null,o),title:"Payment Date"}),Object(ye.jsx)(et,{value:e.amount,onChange:a.bind(null,o),title:"Amount",adornment:"$"}),Object(ye.jsx)(et,{value:e.duration,onChange:r.bind(null,o),title:"Duration"}),o===t.length-1&&Object(ye.jsx)(te.a,{onClick:s,variant:"contained",endIcon:Object(ye.jsx)(at.a,{}),children:"Add Monthly Expense"})]},o)}))})};n(338);var jt=function(){var e=Object(o.b)(),t=Object(o.c)(I),n=Object(a.useState)(0),r=Object(Ie.a)(n,2),c=r[0],s=r[1];function u(t){e(Y(t.target.value))}function i(e){return l.apply(this,arguments)}function l(){return(l=Object(se.a)(ce.a.mark((function e(t){return ce.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return p(t),e.next=3,ge();case 3:console.log("expenses updated"),window.scrollTo({top:0,behavior:"smooth"});case 5:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return Object(ye.jsxs)(Ee.a,{elevation:3,className:"expenses-card",children:[Object(ye.jsxs)(We.a,{className:"tabs",value:c,onChange:function(e,t){console.log({newValue:t}),s(t)},"aria-label":"basic tabs example",children:[Object(ye.jsx)(qe.a,{label:"One Time Expenses"}),Object(ye.jsx)(qe.a,{label:"Monthly Expenses"}),Object(ye.jsx)(qe.a,{label:"Mortgage"})]}),Object(ye.jsx)("div",{style:{display:0===c?"initial":"none"},children:Object(ye.jsxs)("form",{onSubmit:i,children:[Object(ye.jsx)(lt,{}),Object(ye.jsx)("footer",{className:"submit-btn-container",children:Object(ye.jsx)(te.a,{variant:"contained",endIcon:Object(ye.jsx)(ze.a,{}),size:"large",type:"submit",children:"Submit"})})]})}),Object(ye.jsx)("div",{style:{display:1===c?"initial":"none"},children:Object(ye.jsxs)("form",{onSubmit:i,children:[Object(ye.jsx)(dt,{}),Object(ye.jsx)("footer",{className:"submit-btn-container",children:Object(ye.jsx)(te.a,{variant:"contained",endIcon:Object(ye.jsx)(ze.a,{}),size:"large",type:"submit",children:"Submit"})})]})}),Object(ye.jsx)("div",{style:{display:2===c?"initial":"none"},children:Object(ye.jsxs)("form",{onSubmit:i,children:[Object(ye.jsxs)("div",{className:"input-container",children:[Object(ye.jsx)(ae.a,{variant:"h6",className:"input-label",children:"Loan Type:"}),Object(ye.jsxs)(Be.a,{value:t,onChange:u,row:!0,"aria-label":"loan-type",name:"row-radio-buttons-group",children:[Object(ye.jsx)(Ge.a,{value:v,control:Object(ye.jsx)(Je.a,{}),label:"Normal"}),Object(ye.jsx)(Ge.a,{value:x,control:Object(ye.jsx)(Je.a,{}),label:"Spitzer"})]})]}),t===x?Object(ye.jsx)(it,{}):Object(ye.jsx)(st,{}),Object(ye.jsx)("footer",{className:"submit-btn-container",children:Object(ye.jsx)(te.a,{variant:"contained",endIcon:Object(ye.jsx)(ze.a,{}),size:"large",type:"submit",children:"Submit"})})]})})]})};n(339);var bt=function(){var e=Object(o.c)(y),t=e.avgAnnualIncome,n=e.avgAnnualExpense,a=e.avgAnnualProfit,r=[{txt:"Avg Annual Income",number:(t||"").toLocaleString(),className:"income"},{txt:"Avg Annual Expense",number:(n||"").toLocaleString(),className:"expense"},{txt:"Avg Annual Profit",number:(a||"").toLocaleString(),className:"profit"}];return Object(ye.jsxs)("main",{className:"main",children:[Object(ye.jsxs)("div",{className:"chart-and-numbers-container",children:[Object(ye.jsx)(Ue,{}),Object(ye.jsx)("div",{className:"property-numbers-container",children:r.map((function(e){return Object(ye.jsx)(Ae.a,{className:"property-number ".concat(e.className),children:Object(ye.jsxs)(ae.a,{variant:"h5",children:[e.txt," ",Object(ye.jsx)("br",{}),Object(ye.jsx)("span",{className:"number",children:e.number})]})},e.txt)}))})]}),Object(ye.jsx)(jt,{})]})};var pt=function(){var e=Object(o.c)(l);return Object(ye.jsxs)(X.a,{children:[Object(ye.jsx)(Ce,{}),Object(ye.jsxs)(Q.d,{children:[Object(ye.jsx)(Q.b,{path:"/login",children:Object(ye.jsx)(ke,{})}),Object(ye.jsx)(Q.b,{path:"/",render:function(){return!0===e?Object(ye.jsx)(bt,{}):Object(ye.jsx)(Q.a,{to:"/login"})}})]})]})};n(340);(function(){return pe.apply(this,arguments)})().then((function(){s.a.render(Object(ye.jsx)(r.a.StrictMode,{children:Object(ye.jsx)(o.a,{store:K,children:Object(ye.jsx)(pt,{})})}),document.getElementById("root"))}))}},[[341,1,2]]]);
//# sourceMappingURL=main.62a5b38d.chunk.js.map