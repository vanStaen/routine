(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],{222:function(e,t){e.exports=function(e,t,n){var r=new Date(e,t-1,n,0,0,0,0),a=new Date(r.valueOf()+864e5);return[a.getFullYear(),a.getMonth()+1,a.getDate()]}},239:function(e,t,n){},243:function(e,t){},245:function(e,t){},259:function(e,t){},261:function(e,t){},289:function(e,t){},291:function(e,t){},292:function(e,t){},297:function(e,t){},299:function(e,t){},318:function(e,t){},330:function(e,t){},333:function(e,t){},350:function(e,t,n){},368:function(e,t,n){},369:function(e,t,n){},370:function(e,t,n){},371:function(e,t,n){},375:function(e,t,n){},376:function(e,t,n){},377:function(e,t,n){},378:function(e,t,n){},446:function(e,t,n){},447:function(e,t,n){"use strict";n.r(t);var r=n(3),a=n(0),c=n.n(a),s=n(28),o=n.n(s),i=(n(239),n(21)),u=n(49),l=n(13),d=n.n(l),j=n(18),f=n(60),h=n(213),m=n(8),b=n(133),p=n.n(b),O=new(function(){function e(){var t=this;Object(f.a)(this,e),this.token=null,this.refreshToken=localStorage.getItem("refreshToken")||null,this.login=function(e,n){t.token=e,t.refreshToken=n},this.logout=function(){localStorage.removeItem("refreshToken"),localStorage.removeItem("userId"),localStorage.removeItem("user"),localStorage.clear();var e={refreshToken:t.refreshToken};t.token=null,t.refreshToken=null,fetch("https://routine-cvs.herokuapp.com/logout",{method:"DELETE",body:JSON.stringify(e),headers:{"Content-Type":"application/json"}}).then((function(e){if(204!==e.status)throw new Error("Error when logout!")})).catch((function(e){console.log(e)}))},this.getNewToken=function(){var e=localStorage.getItem("refreshToken");if(e)try{p.a.decode(e,{complete:!0}),t.refreshToken=e}catch(r){console.log("refreshtoken is expired",r),t.logout()}if(null!==t.token)try{return p.a.decode(t.token,{complete:!0}),t.token}catch(r){console.log("token is expired",r),t.token=null}if(t.refreshToken){var n={refreshToken:t.refreshToken};return fetch("https://routine-cvs.herokuapp.com/token",{method:"POST",body:JSON.stringify(n),headers:{"Content-Type":"application/json"}}).then((function(e){if(201!==e.status)throw t.logout(),new Error("Error when refreshing the token!");return e.json()})).then((function(e){if(localStorage.setItem("refreshToken",e.refreshToken),e.token)return t.login(e.token,e.refreshToken),e.token})).catch((function(e){console.log(e)}))}},Object(m.m)(this,{_token:m.n,refreshToken:m.n,login:m.f,logout:m.f,getNewToken:m.f})}return Object(h.a)(e,[{key:"token",get:function(){return this._token},set:function(e){this._token=e}}]),e}()),v=new function e(){var t=this;Object(f.a)(this,e),this.userId=localStorage.getItem("userId")||null,this.userName=null,this.picUrl=null,this.setUserId=function(e){t.userId=e},this.setUserName=function(e){t.userName=e},this.setPicUrl=function(e){t.picUrl=e},Object(m.m)(this,{userId:m.n,setUserId:m.f,userName:m.n,setUserName:m.f,picUrl:m.n,setPicUrl:m.f})},x=(n(350),function(){return Object(r.jsxs)("div",{className:"spinner",children:[Object(r.jsx)("img",{src:"https://routine-cvs.herokuapp.com/images/venja.svg",className:"loader",alt:"Loading"}),Object(r.jsxs)("div",{className:"spinner spinner__header",children:["venja",Object(r.jsx)("span",{style:{color:"#D68910"},children:".org"})]})]})}),g=n(34),y=n.n(g),k=function(){var e=Object(j.a)(d.a.mark((function e(){var t,n;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,y()({url:"https://routine-cvs.herokuapp.com/user",method:"GET"});case 2:if(!(200!==(t=e.sent).status&201!==t.status)){e.next=9;break}if(401!==t.status){e.next=8;break}throw new Error("Error! Unauthorized(401)");case 8:throw new Error("Error! Status ".concat(t.status));case 9:return e.next=11,t.data[0];case 11:return n=e.sent,v.setUserName(n.name),v.setPicUrl(n.picurl),e.abrupt("return",n);case 15:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),w=(n(368),Object(u.a)((function(){var e=Object(a.useState)(!0),t=Object(i.a)(e,2),n=t[0],c=t[1],s=Object(a.useState)([]),o=Object(i.a)(s,2),u=o[0],l=o[1],f=function(){var e=Object(j.a)(d.a.mark((function e(){var t;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,k();case 3:t=e.sent,l(t.activities),c(!1),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(0),console.log(e.t0);case 11:case"end":return e.stop()}}),e,null,[[0,8]])})));return function(){return e.apply(this,arguments)}}();Object(a.useEffect)((function(){f()}),[]);var h=u.map((function(e){return Object(r.jsxs)(r.Fragment,{children:[e.activity," "]})}));return n?Object(r.jsx)(x,{}):Object(r.jsxs)("div",{className:"Profil__full",children:[Object(r.jsx)("div",{className:"Profil__title",children:"Profil"}),Object(r.jsx)("div",{className:"Profil__avatar",style:{backgroundImage:"url(".concat(v.picUrl,")"),backgroundSize:"cover"}}),Object(r.jsxs)("div",{className:"Profil__main",children:[Object(r.jsx)("br",{}),Object(r.jsxs)("div",{children:["hello ",v.userName,","]}),Object(r.jsx)("div",{className:"Profil__ActivitiesContainer",children:h}),Object(r.jsx)("div",{children:"Add activity"}),Object(r.jsx)("div",{children:"Manage Goal / increment"}),Object(r.jsx)("div",{children:"Edit activity title "}),Object(r.jsx)("div",{children:"Make optional/mandatory"}),Object(r.jsx)("br",{}),Object(r.jsx)("div",{className:"Profil__logout",onClick:function(){return O.logout()},children:"(logout)"})]})]})}))),_=n(226),N=function(){var e=Object(j.a)(d.a.mark((function e(t){var n,r;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,y()({url:"https://routine-cvs.herokuapp.com"+"/dailies/".concat(t),method:"GET"});case 2:if(!(200!==(n=e.sent).status&201!==n.status)){e.next=9;break}if(401!==n.status){e.next=8;break}throw new Error("Error! Unauthorized (401)");case 8:throw new Error("Error! Status ".concat(n.status));case 9:return e.next=11,n.data;case 11:return r=e.sent,e.abrupt("return",r);case 13:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),E=function(){var e=Object(j.a)(d.a.mark((function e(){var t,n;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,y()({url:"https://routine-cvs.herokuapp.com/activity",method:"GET"});case 2:if(!(200!==(t=e.sent).status&201!==t.status)){e.next=9;break}if(401!==t.status){e.next=8;break}throw new Error("Error! Unauthorized (401)");case 8:throw new Error("Error! Status ".concat(t.status));case 9:return e.next=11,t.data;case 11:return n=e.sent,e.abrupt("return",n);case 13:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),S=(n(369),function(e){return Object(r.jsx)("div",{children:Object(r.jsx)("img",{className:"logo",src:"https://routine-cvs.herokuapp.com"+"/images/".concat(e.image,".svg"),alt:e.image})})}),T=function(){var e=Object(j.a)(d.a.mark((function e(t,n,r){var a,c;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,y()({url:"https://routine-cvs.herokuapp.com"+"/streak/".concat(t,"/").concat(n,"/").concat(r),method:"GET"});case 2:if(!(200!==(a=e.sent).status&201!==a.status)){e.next=5;break}throw new Error("Error!");case 5:return e.next=7,a.data[0];case 7:return c=e.sent,e.abrupt("return",c);case 9:case"end":return e.stop()}}),e)})));return function(t,n,r){return e.apply(this,arguments)}}(),I=new function e(){var t=this;Object(f.a)(this,e),this.today=null,this.dailyStreaks=null,this.setToday=function(e){t.today=e},this.setDailyStreaks=function(e){t.dailyStreaks=e},Object(m.m)(this,{today:m.n,setToday:m.f,dailyStreaks:m.n,setDailyStreaks:m.f})},P=(n(370),(new Date).getDate()),B=Object(u.a)((function(e){var t=Object(a.useState)(I.dailyStreaks),n=Object(i.a)(t,2),c=n[0],s=n[1],o=Object(a.useState)(!0),u=Object(i.a)(o,2),l=u[0],f=u[1],h=e.activity.activity,m=function(){var t=Object(j.a)(d.a.mark((function t(n){var r;return d.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,T(e.daily.year,e.daily.month,e.daily.day);case 3:r=t.sent,n&&(I.setToday(P),I.setDailyStreaks(r)),s(r),f(!1),t.next=12;break;case 9:t.prev=9,t.t0=t.catch(0),console.log(t.t0.message);case 12:case"end":return t.stop()}}),t,null,[[0,9]])})));return function(e){return t.apply(this,arguments)}}();Object(a.useEffect)((function(){null===c&&P===e.daily.day?m(!0):e.daily.day===I.today?(s(I.dailyStreaks),f(!1)):m(!1)}),[]);var b;return l?Object(r.jsx)("div",{className:"Streak__Main",children:"?"}):c[h]?Object(r.jsx)("div",{className:"Streak__Main",style:{backgroundColor:"rgba(214, 137, 16, ".concat((b=c[h],b<2?.1:b<3?.2:b<5?.3:b<8?.4:b<12?.5:b<20?.55:b<30?.6:b<40?.65:b<50?.7:b<60?.75:b<70?.8:b<80?.85:b<99?.9:1),")")},children:c[h]>999?"999+":c[h]}):Object(r.jsx)(r.Fragment,{})})),C=n(452),F=n(453),U=n(454),D=n(231),M=n(455),z=n(228),R=n(214),L=function(){var e=Object(j.a)(d.a.mark((function e(t,n,r){var a,c;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=Object(R.a)({},n,r),e.prev=1,e.next=4,y()({url:"https://routine-cvs.herokuapp.com"+"/daily/".concat(t),method:"PATCH",data:a});case 4:if(200===(c=e.sent).status||201===c.status){e.next=7;break}throw new Error("Error!");case 7:return e.abrupt("return",{status:c.status,message:c.error});case 10:return e.prev=10,e.t0=e.catch(1),console.log(e.t0.message),e.abrupt("return",{status:500,message:e.t0.message});case 14:case"end":return e.stop()}}),e,null,[[1,10]])})));return function(t,n,r){return e.apply(this,arguments)}}(),Y=(n(371),function(e){var t=Object(a.useState)(!1),n=Object(i.a)(t,2),c=n[0],s=n[1],o=Object(a.useState)(!1),u=Object(i.a)(o,2),l=u[0],f=u[1],h=Object(a.useState)(e.dailies[e.activity.activity]?e.dailies[e.activity.activity]:0),m=Object(i.a)(h,2),b=m[0],p=m[1],O=e.dailies.id,v=e.activity.activity,x=e.activity.increment,g=e.activity.goal,y=e.activity.optional,k=b>=g&&(!!g||b>g),w=function(){var e=Object(j.a)(d.a.mark((function e(){var t,n;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return s(!0),f(!1),t=b+x,e.next=5,L(O,v,t);case 5:200===(n=e.sent).status?(p(t),s(!1)):(_.a.error({message:n.message}),f(!0));case 7:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),N=function(){var e=Object(j.a)(d.a.mark((function e(){var t,n;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return s(!0),f(!1),t=b>=x?b-x:0,e.next=5,L(O,v,t);case 5:200===(n=e.sent).status?(p(t),s(!1)):(_.a.error({message:n.message}),f(!0));case 7:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(r.jsx)(z.a,{placement:"top",title:Object(r.jsxs)(r.Fragment,{children:[e.activity.desc," ",Object(r.jsx)(B,{activity:e.activity,daily:e.dailies})]}),children:Object(r.jsxs)("div",{className:"daily__item",children:[y&&!k&&Object(r.jsx)("div",{className:"daily__optional"}),k&&Object(r.jsx)("div",{className:"daily__doneContainer",children:Object(r.jsx)("div",{className:"daily__done",children:Object(r.jsx)(C.a,{})})}),Object(r.jsx)("div",{className:"daily__actionContainer ".concat(0===g||e.disabled?"":"daily__actionContainerHover"),onMouseOver:function(){e.disabled||(g>1?(document.getElementById(v+"_minus").style.display="block",document.getElementById(v+"_plus").style.display="block"):document.getElementById(v+"_check").style.display="block")},onMouseLeave:function(){e.disabled||(g>1?(document.getElementById(v+"_minus").style.display="none",document.getElementById(v+"_plus").style.display="none"):document.getElementById(v+"_check").style.display="none")},children:g>1?Object(r.jsx)(r.Fragment,{children:Object(r.jsxs)(r.Fragment,{children:[Object(r.jsx)("div",{className:"daily__action",id:v+"_minus",onClick:N,children:Object(r.jsx)(F.a,{})}),Object(r.jsx)("div",{className:"daily__action",id:v+"_plus",onClick:w,children:Object(r.jsx)(U.a,{})})]})}):k?Object(r.jsx)(r.Fragment,{children:Object(r.jsx)("div",{className:"daily__action",id:v+"_check",onClick:N,children:Object(r.jsx)(D.a,{})})}):Object(r.jsx)(r.Fragment,{children:Object(r.jsx)("div",{className:"daily__action",id:v+"_check",onClick:w,children:Object(r.jsx)(C.a,{})})})}),Object(r.jsx)(S,{image:e.activity.activity}),Object(r.jsxs)("div",{className:"daily__text }",children:[l?Object(r.jsx)(D.a,{style:{color:"#C70039"}}):c?Object(r.jsxs)(r.Fragment,{children:[g>1?Object(r.jsxs)(r.Fragment,{children:[Object(r.jsx)(M.a,{spin:!0,style:{color:"#999"}})," / ",g," "]}):Object(r.jsx)(M.a,{spin:!0,style:{color:"#999"}}),g>1&&e.activity.unit]}):Object(r.jsxs)(r.Fragment,{children:[g>1?"".concat(b," / ").concat(g," "):"".concat(e.activity.unit,"!"),g>1&&e.activity.unit]}),y&&Object(r.jsx)("div",{style:{fontStyle:"italic",fontSize:".7em"},children:Object(r.jsx)("i",{children:"optional"})})]})]})})}),A=(n(201),n(222)),G=n.n(A),H=(n(375),n(201)),J=H().tz("Europe/Berlin").format("YYYY"),q=H().tz("Europe/Berlin").format("MM"),V=H().tz("Europe/Berlin").format("DD"),K=function(e){var t=parseInt(e,10),n=Math.floor(t/3600),r=Math.floor((t-3600*n)/60),a=t-3600*n-60*r;return n<10&&n>-10&&(n="0"+n),r<10&&r>-10&&(r="0"+r),a<10&&a>-10&&(a="0"+a),n+":"+r+":"+a},Q=function(){var e=Math.floor(Date.now()/1e3),t=G()(J,q,V);return Math.floor(new Date(Date.UTC(t[0],t[1]-1,t[2],"00","00","00"))/1e3)-e-7200},W=function(){var e=Object(a.useState)(Q()),t=Object(i.a)(e,2),n=t[0],c=t[1];return Object(a.useEffect)((function(){setTimeout((function(){c(Q())}),1e3)}),[n]),n<18e3?Object(r.jsx)("div",{className:n<7200?"countdown__alert":"",children:K(n)}):"Today"},X=(n(376),function(){var e=Object(a.useState)([]),t=Object(i.a)(e,2),n=t[0],c=t[1],s=Object(a.useState)([]),o=Object(i.a)(s,2),u=o[0],l=o[1],f=Object(a.useState)(!0),h=Object(i.a)(f,2),m=h[0],b=h[1],p=Object(a.useRef)(2),O=Object(a.useRef)(0),v=Object(a.useRef)(null),g=Object(a.useRef)(!1),y=Object(a.useRef)(!1),k=function(){var e=Object(j.a)(d.a.mark((function e(t){var n,r,a,s;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,Promise.all([N(t+1),E()]);case 3:n=e.sent,r=Object(i.a)(n,2),a=r[0],s=r[1],c(a),l(s),t+1>a.length&&(g.current=!0,v.current=O.current+1),e.next=16;break;case 12:e.prev=12,e.t0=e.catch(0),console.log(e.t0.message),_.a.error({message:e.t0.message});case 16:b(!1);case 17:case"end":return e.stop()}}),e,null,[[0,12]])})));return function(t){return e.apply(this,arguments)}}(),w=Object(a.useCallback)((function(e){e.preventDefault();var t=e.key.toLowerCase();if(!1===y.current){if(y.current=!0,"arrowdown"===t){if(v.current!==O.current-1){var n=O.current+1,r=document.getElementById("daily".concat(n)).getBoundingClientRect().top+window.scrollY;window.scrollTo({top:r,behavior:"smooth"})}if(!g.current){p.current++;var a=p.current;k(a)}}else if("arrowup"===t){if(O.current>0){var c=O.current-1,s=document.getElementById("daily".concat(c)).getBoundingClientRect().top+window.scrollY;window.scrollTo({top:s,behavior:"smooth"})}}else if("enter"===t){O.current=0;var o=document.getElementById("daily0").getBoundingClientRect().top+window.scrollY;window.scrollTo({top:o,behavior:"smooth"})}setTimeout((function(){y.current=!1}),500)}}),[]),S=Object(a.useCallback)((function(e){O.current=Math.round(window.scrollY/window.innerHeight),g.current||p.current===O.current+1&&(p.current=O.current+2,k(O.current+2))}),[]);Object(a.useEffect)((function(){k(p.current)}),[]),Object(a.useEffect)((function(){return document.addEventListener("keydown",w),document.addEventListener("scroll",S),function(){document.removeEventListener("keydown",w),document.removeEventListener("scroll",S)}}),[w,S]);for(var T=function(e){return u.map((function(t){return Object(r.jsx)(Y,{activity:t,dailies:n[e],disabled:e>1},t.activity)}))},I=[],P=0;P<p.current;P++)I.push(Object(r.jsxs)("div",{className:"Dailies__full",id:"daily".concat(P),children:[Object(r.jsx)("div",{className:"dailies__date",children:Object(r.jsxs)("div",{children:[0===P&&Object(r.jsx)(W,{}),1===P&&"Yesterday",P>1&&"".concat(n[P].day,".").concat(n[P].month,".").concat(n[P].year)]})}),Object(r.jsx)("div",{className:"dailies__main",children:T(P)})]},P));return m?Object(r.jsx)(x,{}):I}),Z=n(456),$=function(e){var t=e.condition,n=e.wrap,r=e.children;return t?n(r):r},ee=Object(u.a)((function(e){return Object(r.jsx)($,{condition:!e.showProfil,wrap:function(e){return Object(r.jsx)(z.a,{placement:"left",title:"Edit profil",children:e})},children:e.showProfil?Object(r.jsx)("div",{className:"FloatButton__float",onClick:function(){return e.setShowProfil(!1)},children:Object(r.jsx)(D.a,{className:"FloatButton__close"})}):v.picUrl?Object(r.jsx)("div",{className:"FloatButton__float",style:{backgroundImage:"url(".concat(v.picUrl,")"),backgroundSize:"cover"},onClick:function(){return e.setShowProfil(!0)}}):Object(r.jsx)("div",{className:"FloatButton__float FloatButton__background",onClick:function(){return e.setShowProfil(!0)},children:Object(r.jsx)(Z.a,{className:"FloatButton__icon"})})})})),te=function(){return Object(r.jsx)(z.a,{placement:"left",title:"Add sporatical task",children:Object(r.jsx)("div",{className:"FloatButton__float  FloatButton__background",children:Object(r.jsx)(U.a,{className:"FloatButton__icon"})})})},ne=n(457),re=function(){return Object(r.jsx)(z.a,{placement:"left",title:"Any obstacle?",children:Object(r.jsx)("div",{className:"FloatButton__float  FloatButton__background",children:Object(r.jsx)(ne.a,{className:"FloatButton__icon"})})})},ae=(n(377),function(e){return Object(a.useEffect)((function(){k()}),[]),Object(r.jsxs)("div",{className:"Menu__floating",children:[Object(r.jsx)(ee,{showProfil:e.showProfil,setShowProfil:e.setShowProfil}),Object(r.jsx)(te,{}),Object(r.jsx)(re,{})]})}),ce=n(449),se=n(450),oe=n(451),ie=n(227),ue=function(){var e=Object(j.a)(d.a.mark((function e(t,n){var r,a,c,s,o;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r={email:t,password:n},e.next=3,fetch("https://routine-cvs.herokuapp.com/login",{method:"POST",body:JSON.stringify(r),headers:{"Content-Type":"application/json"}});case 3:if(!(200!==(a=e.sent).status&201!==a.status)){e.next=10;break}return e.next=7,a.json();case 7:throw c=e.sent,s=c.error,new Error(s);case 10:return e.next=12,a.json();case 12:return o=e.sent,e.abrupt("return",o);case 14:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),le=n(458),de=n(459),je=n(232),fe=n(233),he=(n(378),function(){var e=Object(a.useState)(!0),t=Object(i.a)(e,2),n=t[0],c=t[1],s=Object(a.useState)(!1),o=Object(i.a)(s,2),u=o[0],l=o[1],f=function(){var e=Object(j.a)(d.a.mark((function e(t){var r,a,c,s;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(l(!0),r=t.email,a=t.password,c=t.remember,t.username,n){e.next=8;break}e.next=22;break;case 8:return e.prev=8,e.next=11,ue(r,a);case 11:s=e.sent,!0===c&&(localStorage.setItem("refreshToken",s.refreshToken),localStorage.setItem("userId",s.userId)),O.login(s.token,s.refreshToken),v.setUserId(s.userId),e.next=21;break;case 17:e.prev=17,e.t0=e.catch(8),_.a.warn({message:e.t0.message}),console.log(e.t0);case 21:l(!1);case 22:case"end":return e.stop()}}),e,null,[[8,17]])})));return function(t){return e.apply(this,arguments)}}();return Object(r.jsxs)("div",{className:"login__full",children:[Object(r.jsxs)("div",{className:"login__header",children:[Object(r.jsx)("img",{className:"login__logo",src:"https://routine-cvs.herokuapp.com/images/venja.svg",alt:"logo"}),"Venja.org"]}),Object(r.jsxs)(ce.a,{name:"normal_login",className:"login__form",initialValues:{remember:!0},onFinish:f,children:[Object(r.jsx)(ce.a.Item,{name:"username",hidden:n,rules:[{required:!n,message:"How should we call you?"}],children:Object(r.jsx)(se.a,{prefix:Object(r.jsx)(Z.a,{className:"site-form-item-icon"}),placeholder:"Name"})}),Object(r.jsx)(ce.a.Item,{name:"email",rules:[{type:"email",required:!0,message:"Please input your Email!"}],children:Object(r.jsx)(se.a,{prefix:Object(r.jsx)(le.a,{className:"site-form-item-icon"}),placeholder:"Email"})}),Object(r.jsx)(ce.a.Item,{name:"password",rules:[{required:!0,message:"Please input your Password!"}],children:Object(r.jsx)(se.a.Password,{prefix:Object(r.jsx)(de.a,{className:"site-form-item-icon"}),placeholder:"input Password",iconRender:function(e){return e?Object(r.jsx)(je.a,{}):Object(r.jsx)(fe.a,{})}})}),Object(r.jsxs)(ce.a.Item,{hidden:!n,children:[Object(r.jsx)(ce.a.Item,{name:"remember",valuePropName:"checked",noStyle:!0,children:Object(r.jsx)(oe.a,{children:Object(r.jsx)("span",{className:"login__remember",children:"Remember me"})})}),Object(r.jsx)("a",{className:"login__formforgot",href:"/#",children:"Recover password"})]}),Object(r.jsxs)(ce.a.Item,{children:[Object(r.jsx)(ie.a,{type:"primary",htmlType:"submit",className:"login__formbutton",children:u?Object(r.jsx)(M.a,{spin:!0}):n?"Log in":"Create account"}),Object(r.jsxs)("div",{className:"login__switchmode",children:["Or"," ",Object(r.jsx)("span",{className:"login__switchmodetext",onClick:function(){c(!n)},children:n?"register now!":"log into your account!"})]})]})]})]})});y.a.interceptors.request.use(function(){var e=Object(j.a)(d.a.mark((function e(t){var n;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,!O.token){e.next=7;break}return e.next=4,O.token;case 4:e.t0=e.sent,e.next=10;break;case 7:return e.next=9,O.getNewToken();case 9:e.t0=e.sent;case 10:(n=e.t0)&&(t.headers=Object.assign({Authorization:"Bearer ".concat(n),"Content-Type":"application/json"})),e.next=17;break;case 14:e.prev=14,e.t1=e.catch(0),console.log(e.t1);case 17:return e.abrupt("return",t);case 18:case"end":return e.stop()}}),e,null,[[0,14]])})));return function(t){return e.apply(this,arguments)}}(),(function(e){return console.log("Interceptor Error",e),Promise.reject(e)}));n(446);var me=function(){var e=.01*window.innerHeight;document.documentElement.style.setProperty("--vh","".concat(e,"px"))};window.addEventListener("resize",me);var be=Object(u.a)((function(){var e=Object(a.useState)(!1),t=Object(i.a)(e,2),n=t[0],c=t[1];return Object(a.useEffect)((function(){O.refreshToken&&O.login(O.getNewToken(),O.refreshToken),me()}),[]),Object(r.jsx)("div",{className:"App",children:Object(r.jsx)("header",{className:"App__header",children:O.refreshToken?Object(r.jsxs)(r.Fragment,{children:[Object(r.jsx)(ae,{showProfil:n,setShowProfil:c}),Object(r.jsx)("div",{className:"App__main",children:n?Object(r.jsx)(w,{}):Object(r.jsx)(X,{})})]}):Object(r.jsx)(he,{})})})}));o.a.render(Object(r.jsx)(c.a.StrictMode,{children:Object(r.jsx)(be,{})}),document.getElementById("root"))}},[[447,1,2]]]);
//# sourceMappingURL=main.bd3af5b8.chunk.js.map