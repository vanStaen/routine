(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],{261:function(e,t){e.exports=function(e,t,n){var r=new Date(e,t-1,n,0,0,0,0),c=new Date(r.valueOf()+864e5);return[c.getFullYear(),c.getMonth()+1,c.getDate()]}},279:function(e,t,n){},297:function(e,t,n){},298:function(e,t,n){},299:function(e,t,n){},303:function(e,t,n){},304:function(e,t,n){},305:function(e,t,n){},309:function(e,t){},311:function(e,t){},325:function(e,t){},327:function(e,t){},355:function(e,t){},357:function(e,t){},358:function(e,t){},363:function(e,t){},365:function(e,t){},384:function(e,t){},396:function(e,t){},399:function(e,t){},416:function(e,t,n){},520:function(e,t,n){},521:function(e,t,n){},522:function(e,t,n){},523:function(e,t,n){},524:function(e,t,n){},525:function(e,t,n){"use strict";n.r(t);var r=n(1),c=n(0),a=n.n(c),s=n(32),i=n.n(s),o=(n(279),n(39)),u=n(9),l=n.n(u),j=n(20),d=n(21),f=n(33),h=n.n(f),b=function(){var e=Object(j.a)(l.a.mark((function e(t){var n,r;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,h()({url:"https://routine-cvs.herokuapp.com"+"/dailies/".concat(t),method:"GET"});case 2:if(!(200!==(n=e.sent).status&201!==n.status)){e.next=9;break}if(401!==n.status){e.next=8;break}throw new Error("Error! Unauthorized (401)");case 8:throw new Error("Error! Status ".concat(n.status));case 9:return e.next=11,n.data;case 11:return r=e.sent,e.abrupt("return",r);case 13:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),m=function(){var e=Object(j.a)(l.a.mark((function e(){var t,n;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,h()({url:"https://routine-cvs.herokuapp.com/activity",method:"GET"});case 2:if(!(200!==(t=e.sent).status&201!==t.status)){e.next=9;break}if(401!==t.status){e.next=8;break}throw new Error("Error! Unauthorized (401)");case 8:throw new Error("Error! Status ".concat(t.status));case 9:return e.next=11,t.data;case 11:return n=e.sent,e.abrupt("return",n);case 13:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),p=(n(297),function(e){var t=!!e.invert,n=!!e.big;return Object(r.jsx)("div",{children:Object(r.jsx)("img",{className:"".concat(n?"logo__big":"logo"," ").concat(t&&"invert"),src:"https://routine-cvs.herokuapp.com"+"/images/".concat(e.image,".svg"),alt:e.image})})}),v=function(){var e=Object(j.a)(l.a.mark((function e(t,n,r){var c,a;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,h()({url:"https://routine-cvs.herokuapp.com"+"/streak/".concat(t,"/").concat(n,"/").concat(r),method:"GET"});case 2:if(!(200!==(c=e.sent).status&201!==c.status)){e.next=5;break}throw new Error("Error!");case 5:return e.next=7,c.data[0];case 7:return a=e.sent,e.abrupt("return",a);case 9:case"end":return e.stop()}}),e)})));return function(t,n,r){return e.apply(this,arguments)}}(),O=n(10),x=n(7),g=new function e(){var t=this;Object(O.a)(this,e),this.today=null,this.dailyStreaks=null,this.setToday=function(e){t.today=e},this.setDailyStreaks=function(e){t.dailyStreaks=e},Object(x.m)(this,{today:x.n,setToday:x.f,dailyStreaks:x.n,setDailyStreaks:x.f})},y=(n(298),(new Date).getDate()),k=Object(o.a)((function(e){var t=Object(c.useState)(g.dailyStreaks),n=Object(d.a)(t,2),a=n[0],s=n[1],i=Object(c.useState)(!0),o=Object(d.a)(i,2),u=o[0],f=o[1],h=e.activity.activity,b=function(){var t=Object(j.a)(l.a.mark((function t(n){var r;return l.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,v(e.daily.year,e.daily.month,e.daily.day);case 3:r=t.sent,n&&(g.setToday(y),g.setDailyStreaks(r)),s(r),f(!1),t.next=12;break;case 9:t.prev=9,t.t0=t.catch(0),console.log(t.t0.message);case 12:case"end":return t.stop()}}),t,null,[[0,9]])})));return function(e){return t.apply(this,arguments)}}();Object(c.useEffect)((function(){null===a&&y===e.daily.day?b(!0):e.daily.day===g.today?(s(g.dailyStreaks),f(!1)):b(!1)}),[]);var m;return u?Object(r.jsx)("div",{className:"Streak__Main",children:"?"}):a[h]?Object(r.jsx)("div",{className:"Streak__Main",style:{backgroundColor:"rgba(214, 137, 16, ".concat((m=a[h],m<2?.1:m<3?.2:m<5?.3:m<8?.4:m<12?.5:m<20?.55:m<30?.6:m<40?.65:m<50?.7:m<60?.75:m<70?.8:m<80?.85:m<99?.9:1),")")},children:a[h]>999?"999+":a[h]}):Object(r.jsx)(r.Fragment,{})})),_=n(532),w=n(533),N=n(534),E=n(131),S=n(535),T=n(268),P=n(128),I=n(531),C=n(26),F=function(){var e=Object(j.a)(l.a.mark((function e(t,n,r){var c,a;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return c=Object(C.a)({},n,r),e.prev=1,e.next=4,h()({url:"https://routine-cvs.herokuapp.com"+"/dailies/".concat(t),method:"PATCH",data:c});case 4:if(200===(a=e.sent).status||201===a.status){e.next=7;break}throw new Error("Error!");case 7:return e.abrupt("return",{status:a.status,message:a.error});case 10:return e.prev=10,e.t0=e.catch(1),console.log(e.t0.message),e.abrupt("return",{status:500,message:e.t0.message});case 14:case"end":return e.stop()}}),e,null,[[1,10]])})));return function(t,n,r){return e.apply(this,arguments)}}(),B=(n(299),function(e){var t=Object(c.useState)(!1),n=Object(d.a)(t,2),a=n[0],s=n[1],i=Object(c.useState)(!1),o=Object(d.a)(i,2),u=o[0],f=o[1],h=Object(c.useState)(e.dailies[e.activity.activity]?e.dailies[e.activity.activity]:0),b=Object(d.a)(h,2),m=b[0],v=b[1],O=e.dayFromToday,x=e.dailies.id,g=e.activity.activity,y=e.activity.increment,C=e.activity.goal,B=e.activity.optional,A=m>=C&&(!!C||m>C),U=function(){var e=Object(j.a)(l.a.mark((function e(){var t,n;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return s(!0),f(!1),t=m+y,e.next=5,F(x,g,t);case 5:200===(n=e.sent).status?(v(t),s(!1)):(T.a.error({message:n.message}),f(!0));case 7:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),D=function(){var e=Object(j.a)(l.a.mark((function e(){var t,n;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return s(!0),f(!1),t=m>=y?m-y:0,e.next=5,F(x,g,t);case 5:200===(n=e.sent).status?(v(t),s(!1)):(T.a.error({message:n.message}),f(!0));case 7:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(r.jsx)(P.a,{placement:"top",title:Object(r.jsxs)(r.Fragment,{children:[e.activity.desc," ",Object(r.jsx)(k,{activity:e.activity,daily:e.dailies})]}),children:Object(r.jsxs)("div",{className:"Activity__item",children:[B&&!A&&Object(r.jsx)("div",{className:"Activity__optional"}),A&&Object(r.jsx)("div",{className:"Activity__doneContainer",children:Object(r.jsx)("div",{className:"Activity__done",children:Object(r.jsx)(_.a,{})})}),Object(r.jsx)("div",{className:"Activity__actionContainer ".concat(0===C?"":"Activity__actionContainerHover"),onMouseOver:function(){O<2&&(C>1?(document.getElementById(g+O+"_minus").style.display="block",document.getElementById(g+O+"_plus").style.display="block"):document.getElementById(g+O+"_check").style.display="block")},onMouseLeave:function(){O<2&&(C>1?(document.getElementById(g+O+"_minus").style.display="none",document.getElementById(g+O+"_plus").style.display="none"):document.getElementById(g+O+"_check").style.display="none")},children:C>1?Object(r.jsx)(r.Fragment,{children:Object(r.jsxs)(r.Fragment,{children:[0===O?Object(r.jsx)("div",{className:"Activity__action",id:g+O+"_minus",onClick:D,children:Object(r.jsx)(w.a,{})}):Object(r.jsx)(I.a,{title:Object(r.jsxs)(r.Fragment,{children:["Update this task from"," ",Object(r.jsx)("b",{children:Object(r.jsx)("u",{children:"yesterday"})}),"?"]}),placement:"bottom",onConfirm:D,okText:"Yes",cancelText:"No",children:Object(r.jsx)("div",{className:"Activity__action",id:g+O+"_minus",children:Object(r.jsx)(w.a,{})})}),0===O?Object(r.jsx)("div",{className:"Activity__action",id:g+O+"_plus",onClick:U,children:Object(r.jsx)(N.a,{})}):Object(r.jsx)(I.a,{title:Object(r.jsxs)(r.Fragment,{children:["Update this task from"," ",Object(r.jsx)("b",{children:Object(r.jsx)("u",{children:"yesterday"})}),"?"]}),placement:"bottom",onConfirm:U,okText:"Yes",cancelText:"No",children:Object(r.jsx)("div",{className:"Activity__action",id:g+O+"_plus",children:Object(r.jsx)(N.a,{})})})]})}):A?Object(r.jsx)(r.Fragment,{children:0===O?Object(r.jsx)("div",{className:"Activity__action",id:g+O+"_check",onClick:D,children:Object(r.jsx)(E.a,{})}):Object(r.jsx)(I.a,{title:Object(r.jsxs)(r.Fragment,{children:["Update this task from"," ",Object(r.jsx)("b",{children:Object(r.jsx)("u",{children:"yesterday"})}),"?"]}),placement:"bottom",onConfirm:D,okText:"Yes",cancelText:"No",children:Object(r.jsx)("div",{className:"Activity__action",id:g+O+"_check",children:Object(r.jsx)(E.a,{})})})}):Object(r.jsx)(r.Fragment,{children:0===O?Object(r.jsx)("div",{className:"Activity__action",id:g+O+"_check",onClick:U,children:Object(r.jsx)(_.a,{})}):Object(r.jsx)(I.a,{title:Object(r.jsxs)(r.Fragment,{children:["Update this task from"," ",Object(r.jsx)("b",{children:Object(r.jsx)("u",{children:"yesterday"})}),"?"]}),placement:"bottom",onConfirm:U,okText:"Yes",cancelText:"No",children:Object(r.jsx)("div",{className:"Activity__action",id:g+O+"_check",children:Object(r.jsx)(_.a,{})})})})}),Object(r.jsx)(p,{image:e.activity.activity}),Object(r.jsxs)("div",{className:"Activity__text }",children:[u?Object(r.jsx)(E.a,{style:{color:"#C70039"}}):a?Object(r.jsxs)(r.Fragment,{children:[C>1?Object(r.jsxs)(r.Fragment,{children:[Object(r.jsx)(S.a,{spin:!0,style:{color:"#999"}})," / ",C," "]}):Object(r.jsx)(S.a,{spin:!0,style:{color:"#999"}}),C>1&&e.activity.unit]}):Object(r.jsxs)(r.Fragment,{children:[C>1?"".concat(m," / ").concat(C," "):"".concat(e.activity.unit,"!"),C>1&&e.activity.unit]}),B&&Object(r.jsx)("div",{style:{fontStyle:"italic",fontSize:".7em"},children:Object(r.jsx)("i",{children:"optional"})})]})]})})}),A=(n(178),n(261)),U=n.n(A),D=(n(303),n(178)),M=D().tz("Europe/Berlin").format("YYYY"),Y=D().tz("Europe/Berlin").format("MM"),z=D().tz("Europe/Berlin").format("DD"),R=function(e){var t=parseInt(e,10),n=Math.floor(t/3600),r=Math.floor((t-3600*n)/60),c=t-3600*n-60*r;return n<10&&n>-10&&(n="0"+n),r<10&&r>-10&&(r="0"+r),c<10&&c>-10&&(c="0"+c),n+":"+r+":"+c},L=function(){var e=Math.floor(Date.now()/1e3),t=U()(M,Y,z);return Math.floor(new Date(Date.UTC(t[0],t[1]-1,t[2],"00","00","00"))/1e3)-e-7200},G=function(){var e=Object(c.useState)(L()),t=Object(d.a)(e,2),n=t[0],a=t[1];return Object(c.useEffect)((function(){setTimeout((function(){a(L())}),1e3)}),[n]),n<18e3?Object(r.jsx)("div",{className:n<7200?"countdown__alert":"",children:R(n)}):"Today"},H=(n(304),function(){return Object(r.jsxs)("div",{className:"spinner",children:[Object(r.jsx)("img",{src:"https://routine-cvs.herokuapp.com/images/venja.svg",className:"loader",alt:"Loading"}),Object(r.jsxs)("div",{className:"spinner spinner__header",children:["venja",Object(r.jsx)("span",{style:{color:"#D68910"},children:".org"})]})]})}),J=(n(305),function(){var e=Object(c.useState)([]),t=Object(d.a)(e,2),n=t[0],a=t[1],s=Object(c.useState)([]),i=Object(d.a)(s,2),o=i[0],u=i[1],f=Object(c.useState)(!0),h=Object(d.a)(f,2),p=h[0],v=h[1],O=Object(c.useRef)(2),x=Object(c.useRef)(0),g=Object(c.useRef)(null),y=Object(c.useRef)(!1),k=Object(c.useRef)(!1),_=function(){var e=Object(j.a)(l.a.mark((function e(t){var n,r,c,s;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,Promise.all([b(t+1),m()]);case 3:n=e.sent,r=Object(d.a)(n,2),c=r[0],s=r[1],a(c),u(s),t+1>c.length&&(y.current=!0,g.current=x.current+1),e.next=15;break;case 12:e.prev=12,e.t0=e.catch(0),console.log(e.t0.message);case 15:v(!1);case 16:case"end":return e.stop()}}),e,null,[[0,12]])})));return function(t){return e.apply(this,arguments)}}(),w=Object(c.useCallback)((function(e){e.preventDefault();var t=e.key.toLowerCase();if(!1===k.current){if(k.current=!0,"arrowdown"===t){if(g.current!==x.current-1){var n=x.current+1,r=document.getElementById("daily".concat(n)).getBoundingClientRect().top+window.scrollY;window.scrollTo({top:r,behavior:"smooth"})}if(!y.current){O.current++;var c=O.current;_(c)}}else if("arrowup"===t){if(x.current>0){var a=x.current-1,s=document.getElementById("daily".concat(a)).getBoundingClientRect().top+window.scrollY;window.scrollTo({top:s,behavior:"smooth"})}}else if("enter"===t){x.current=0;var i=document.getElementById("daily0").getBoundingClientRect().top+window.scrollY;window.scrollTo({top:i,behavior:"smooth"})}setTimeout((function(){k.current=!1}),500)}}),[]),N=Object(c.useCallback)((function(e){x.current=Math.round(window.scrollY/window.innerHeight),y.current||O.current===x.current+1&&(O.current=x.current+2,_(x.current+2))}),[]);Object(c.useEffect)((function(){_(O.current)}),[]),Object(c.useEffect)((function(){return document.addEventListener("keydown",w),document.addEventListener("scroll",N),function(){document.removeEventListener("keydown",w),document.removeEventListener("scroll",N)}}),[w,N]);for(var E=function(e){return o.map((function(t){return Object(r.jsx)(B,{activity:t,dailies:n[e],dayFromToday:e},t.activity)}))},S=[],T=0;T<O.current;T++)S.push(Object(r.jsxs)("div",{className:"Dailies__full",id:"daily".concat(T),children:[Object(r.jsx)("div",{className:"dailies__date",children:Object(r.jsxs)("div",{children:[0===T&&Object(r.jsx)(G,{}),1===T&&"Yesterday",T>1&&"".concat(n[T].day,".").concat(n[T].month,".").concat(n[T].year)]})}),Object(r.jsx)("div",{className:"dailies__main",children:E(T)})]},T));return p?Object(r.jsx)(H,{}):S}),q=n(529),V=n(16),K=n(95),Q=n.n(K),W=new(function(){function e(){var t=this;Object(O.a)(this,e),this.token=null,this.refreshToken=localStorage.getItem("refreshToken")||null,this.login=function(e,n){t.token=e,t.refreshToken=n},this.logout=function(){localStorage.removeItem("refreshToken"),localStorage.removeItem("userId"),localStorage.removeItem("user"),localStorage.clear();var e={refreshToken:t.refreshToken};t.token=null,t.refreshToken=null,fetch("https://routine-cvs.herokuapp.com/logout",{method:"DELETE",body:JSON.stringify(e),headers:{"Content-Type":"application/json"}}).then((function(e){if(204!==e.status)throw new Error("Error on logout!")})).catch((function(e){console.log(e)}))},this.getNewToken=function(){var e=localStorage.getItem("refreshToken");if(e)try{Q.a.decode(e,{complete:!0}),t.refreshToken=e}catch(r){r instanceof K.TokenExpiredError?(console.log("refreshtoken is expired",r),t.logout()):console.log("unknown error:",r)}if(null!==t.token)try{return Q.a.decode(t.token,{complete:!0}),t.token}catch(r){r instanceof K.TokenExpiredError?(console.log("token is expired",r),t.logout()):console.log("unknown error:",r)}if(t.refreshToken){var n={refreshToken:t.refreshToken};return fetch("https://routine-cvs.herokuapp.com/token",{method:"POST",body:JSON.stringify(n),headers:{"Content-Type":"application/json"}}).then((function(e){if(201!==e.status)throw t.logout(),new Error("Error when refreshing the token!");return e.json()})).then((function(e){if(localStorage.setItem("refreshToken",e.refreshToken),e.token)return t.login(e.token,e.refreshToken),t.token=e.token,e.token})).catch((function(e){console.log(e)}))}},Object(x.m)(this,{_token:x.n,refreshToken:x.n,login:x.f,logout:x.f,getNewToken:x.f})}return Object(V.a)(e,[{key:"token",get:function(){return this._token},set:function(e){this._token=e}}]),e}()),X=new function e(){var t=this;Object(O.a)(this,e),this.userId=localStorage.getItem("userId")||null,this.userActivities=null,this.userName=null,this.picUrl=null,this.setUserId=function(e){t.userId=e},this.setUserActivities=function(e){t.userActivities=e},this.setUserName=function(e){t.userName=e},this.setPicUrl=function(e){t.picUrl=e},Object(x.m)(this,{userId:x.n,setUserId:x.f,userActivities:x.n,setUserActivities:x.f,userName:x.n,setUserName:x.f,picUrl:x.n,setPicUrl:x.f})},Z=function(){var e=Object(j.a)(l.a.mark((function e(){var t,n;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,h()({url:"https://routine-cvs.herokuapp.com/user",method:"GET"});case 2:if(!(200!==(t=e.sent).status&201!==t.status)){e.next=9;break}if(401!==t.status){e.next=8;break}throw new Error("Error! Unauthorized(401)");case 8:throw new Error("Error! Status ".concat(t.status));case 9:return e.next=11,t.data[0];case 11:return n=e.sent,X.setUserActivities(n.activities),X.setUserName(n.name),X.setPicUrl(n.picurl),e.abrupt("return",n);case 16:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),$=function(){var e=Object(j.a)(l.a.mark((function e(){var t,n;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,h()({url:"https://routine-cvs.herokuapp.com/activity/list",method:"GET"});case 2:if(!(200!==(t=e.sent).status&201!==t.status)){e.next=9;break}if(401!==t.status){e.next=8;break}throw new Error("Error! Unauthorized(401)");case 8:throw new Error("Error! Status ".concat(t.status));case 9:return e.next=11,t.data.map((function(e){return e}));case 11:return n=e.sent,e.abrupt("return",n);case 13:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();n(416);var ee=Object(o.a)((function(){var e,t=Object(c.useState)(!0),n=Object(d.a)(t,2),a=n[0],s=n[1],i=Object(c.useState)([]),o=Object(d.a)(i,2),u=o[0],f=o[1],h=Object(c.useState)([]),b=Object(d.a)(h,2),m=b[0],v=b[1],O=Object(c.useState)(!1),x=Object(d.a)(O,2),g=x[0],y=x[1],k=Object(c.useState)(null),_=Object(d.a)(k,2),w=_[0],N=_[1],E=function(){var e=Object(j.a)(l.a.mark((function e(){var t,n,r,c,a,i;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,Promise.all([Z(),$()]);case 3:return t=e.sent,n=Object(d.a)(t,2),r=n[0],c=n[1],e.next=9,r.activities.map((function(e){return e.activity}));case 9:a=e.sent,i=c.filter((function(e){return!a.includes(e.activity)})),f(r.activities),v(i),s(!1),e.next=19;break;case 16:e.prev=16,e.t0=e.catch(0),console.log(e.t0);case 19:case"end":return e.stop()}}),e,null,[[0,16]])})));return function(){return e.apply(this,arguments)}}();Object(c.useEffect)((function(){E()}),[]);var S,T=function(e){y(!0),N(e)},P=u.map((function(e){return Object(r.jsxs)("div",{className:"Profil__activities",onClick:function(){return T(e)},children:[Object(r.jsx)(p,{image:e.activity}),e.activity]})})),I=m.map((function(e){return Object(r.jsx)("div",{className:"Profil__activities",onClick:function(){return T(e)},children:Object(r.jsx)(p,{image:e.activity})})}));return a?Object(r.jsx)(H,{}):Object(r.jsxs)(r.Fragment,{children:[Object(r.jsx)(q.a,(e={title:(S=null===w||void 0===w?void 0:w.activity,void 0===S||null===S?null:S.charAt(0).toUpperCase()+S.slice(1)),placement:"right",closable:!0,visible:g,onClose:function(){y(!1),N(null)}},Object(C.a)(e,"placement","left"),Object(C.a)(e,"children",null!==w&&Object(r.jsx)(p,{image:w.activity,invert:!0,big:!0})),e)),Object(r.jsxs)("div",{className:"Profil__full",children:[Object(r.jsx)("div",{className:"Profil__avatar",style:{backgroundImage:"url(".concat(X.picUrl,")"),backgroundSize:"cover"}}),Object(r.jsxs)("div",{className:"Profil__main",children:[Object(r.jsxs)("div",{children:["hello ",X.userName,","]}),Object(r.jsx)("div",{className:"Profil__logout",onClick:function(){return W.logout()},children:"(logout)"}),Object(r.jsxs)("div",{className:"Profil__container",children:[Object(r.jsx)("div",{className:"Profil__containerTitle",children:"Manage activity"}),Object(r.jsx)("div",{children:P})]}),Object(r.jsxs)("div",{className:"Profil__container",children:[Object(r.jsx)("div",{className:"Profil__containerTitle",children:"Add activity"}),Object(r.jsx)("div",{children:I})]})]})]})]})})),te=function(){var e=Object(j.a)(l.a.mark((function e(t){var n,r;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,h()({url:"https://routine-cvs.herokuapp.com/stats/",method:"GET"});case 2:if(!(200!==(n=e.sent).status&201!==n.status)){e.next=9;break}if(401!==n.status){e.next=8;break}throw new Error("Error! Unauthorized");case 8:throw new Error("Error! Status ".concat(n.status));case 9:return e.next=11,n.data;case 11:return r=e.sent,e.abrupt("return",r);case 13:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),ne=n(266),re=(n(520),Object(o.a)((function(){var e=Object(c.useState)(!0),t=Object(d.a)(e,2),n=t[0],a=t[1],s=Object(c.useState)([]),i=Object(d.a)(s,2),o=i[0],u=i[1],f=Object(c.useRef)([0,1,2,3,4,5,6,7,8,9]),h=[],b=function(){var e=Object(j.a)(l.a.mark((function e(){var t,n;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,te();case 3:t=e.sent,n=t.map((function(e){return"".concat(e.day,".").concat(e.month,".").concat(e.year)})),u(n),X.userActivities.map((function(e){e.activity;h.push(e.activity)})),console.log(f.current),e.next=13;break;case 10:e.prev=10,e.t0=e.catch(0),console.log(e.t0.message);case 13:a(!1);case 14:case"end":return e.stop()}}),e,null,[[0,10]])})));return function(){return e.apply(this,arguments)}}();Object(c.useEffect)((function(){b()}),[]);var m={labels:o,datasets:[{label:"Run",backgroundColor:"rgba(214, 137, 16, 0.95)",borderColor:"rgba(214, 137, 16, 1)",data:f.current}]};return n?Object(r.jsx)(H,{}):Object(r.jsxs)("div",{className:"Stats__full",children:[Object(r.jsx)("div",{className:"Stats__title",children:"Statistics"}),Object(r.jsx)("div",{className:"Stats__main",children:Object(r.jsx)(ne.a,{data:m})})]})}))),ce=n(527),ae=n(528),se=n(530),ie=n(94),oe=function(){var e=Object(j.a)(l.a.mark((function e(t,n){var r,c,a,s,i;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r={email:t,password:n},e.next=3,fetch("https://routine-cvs.herokuapp.com/login",{method:"POST",body:JSON.stringify(r),headers:{"Content-Type":"application/json"}});case 3:if(!(200!==(c=e.sent).status&201!==c.status)){e.next=10;break}return e.next=7,c.json();case 7:throw a=e.sent,s=a.error,new Error(s);case 10:return e.next=12,c.json();case 12:return i=e.sent,e.abrupt("return",i);case 14:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),ue=n(536),le=n(537),je=n(538),de=n(272),fe=n(273),he=(n(521),function(){var e=Object(c.useState)(!0),t=Object(d.a)(e,2),n=t[0],a=t[1],s=Object(c.useState)(!1),i=Object(d.a)(s,2),o=i[0],u=i[1],f=function(){var e=Object(j.a)(l.a.mark((function e(t){var r,c,a,s;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(u(!0),r=t.email,c=t.password,a=t.remember,t.username,n){e.next=8;break}e.next=22;break;case 8:return e.prev=8,e.next=11,oe(r,c);case 11:s=e.sent,!0===a&&(localStorage.setItem("refreshToken",s.refreshToken),localStorage.setItem("userId",s.userId)),W.login(s.token,s.refreshToken),X.setUserId(s.userId),e.next=21;break;case 17:e.prev=17,e.t0=e.catch(8),T.a.warn({message:e.t0.message}),console.log(e.t0);case 21:u(!1);case 22:case"end":return e.stop()}}),e,null,[[8,17]])})));return function(t){return e.apply(this,arguments)}}();return Object(r.jsxs)("div",{className:"login__full",children:[Object(r.jsxs)("div",{className:"login__header",children:[Object(r.jsx)("img",{className:"login__logo",src:"https://routine-cvs.herokuapp.com/images/venja.svg",alt:"logo"}),"Venja.org"]}),Object(r.jsxs)(ce.a,{name:"normal_login",className:"login__form",initialValues:{remember:!0},onFinish:f,children:[Object(r.jsx)(ce.a.Item,{name:"username",hidden:n,rules:[{required:!n,message:"How should we call you?"}],children:Object(r.jsx)(ae.a,{prefix:Object(r.jsx)(ue.a,{className:"site-form-item-icon"}),placeholder:"Name"})}),Object(r.jsx)(ce.a.Item,{name:"email",rules:[{type:"email",required:!0,message:"Please input your Email!"}],children:Object(r.jsx)(ae.a,{prefix:Object(r.jsx)(le.a,{className:"site-form-item-icon"}),placeholder:"Email"})}),Object(r.jsx)(ce.a.Item,{name:"password",rules:[{required:!0,message:"Please input your Password!"}],children:Object(r.jsx)(ae.a.Password,{prefix:Object(r.jsx)(je.a,{className:"site-form-item-icon"}),placeholder:"input Password",iconRender:function(e){return e?Object(r.jsx)(de.a,{}):Object(r.jsx)(fe.a,{})}})}),Object(r.jsxs)(ce.a.Item,{hidden:!n,children:[Object(r.jsx)(ce.a.Item,{name:"remember",valuePropName:"checked",noStyle:!0,children:Object(r.jsx)(se.a,{children:Object(r.jsx)("span",{className:"login__remember",children:"Remember me"})})}),Object(r.jsx)("a",{className:"login__formforgot",href:"/#",children:"Recover password"})]}),Object(r.jsxs)(ce.a.Item,{children:[Object(r.jsx)(ie.a,{type:"primary",htmlType:"submit",className:"login__formbutton",children:o?Object(r.jsx)(S.a,{spin:!0}):n?"Log in":"Create account"}),Object(r.jsxs)("div",{className:"login__switchmode",children:["Or"," ",Object(r.jsx)("span",{className:"login__switchmodetext",onClick:function(){a(!n)},children:n?"register now!":"log into your account!"})]})]})]})]})}),be=new function e(){var t=this;Object(O.a)(this,e),this.showPage="daily",this.setShowPage=function(e){t.showPage=e},Object(x.m)(this,{showPage:x.n,setShowPage:x.f})},me=function(e){var t=e.condition,n=e.wrap,r=e.children;return t?n(r):r},pe=Object(o.a)((function(e){return Object(r.jsx)(me,{condition:"profil"!==be.showPage,wrap:function(e){return Object(r.jsx)(P.a,{placement:"left",title:"Edit profil",children:e})},children:"profil"===be.showPage?"":X.picUrl?Object(r.jsx)("div",{className:"FloatButton__float",style:{backgroundImage:"url(".concat(X.picUrl,")"),backgroundSize:"cover"},onClick:function(){return be.setShowPage("profil")}}):Object(r.jsx)("div",{className:"FloatButton__float FloatButton__background",onClick:function(){return be.setShowPage("profil")},children:Object(r.jsx)(ue.a,{className:"FloatButton__icon"})})})})),ve=function(){return Object(r.jsx)(P.a,{placement:"left",title:"Add sporatical task",children:Object(r.jsx)("div",{className:"FloatButton__float  FloatButton__background",children:Object(r.jsx)(N.a,{className:"FloatButton__icon"})})})},Oe=n(539),xe=function(){return Object(r.jsx)(P.a,{placement:"left",title:"Any obstacle?",children:Object(r.jsx)("div",{className:"FloatButton__float  FloatButton__background",children:Object(r.jsx)(Oe.a,{className:"FloatButton__icon"})})})},ge=(n(522),Object(o.a)((function(){return Object(r.jsx)(me,{condition:"stats"!==be.showPage,wrap:function(e){return Object(r.jsx)(P.a,{placement:"left",title:"Show statistics",children:e})},children:"stats"===be.showPage?"":Object(r.jsx)("div",{className:"FloatButton__float  FloatButton__background",onClick:function(){return be.setShowPage("stats")},children:Object(r.jsx)("img",{className:"StatsButton__logo",src:"https://routine-cvs.herokuapp.com/images/stats.svg",alt:"stats"})})})}))),ye=Object(o.a)((function(){return"daily"!==be.showPage&&Object(r.jsx)("div",{className:"FloatButton__float",onClick:function(){return be.setShowPage("daily")},children:Object(r.jsx)(E.a,{className:"FloatButton__close"})})})),ke=(n(523),function(e){return Object(c.useEffect)((function(){Z()}),[]),Object(r.jsxs)("div",{className:"Menu__floating",children:[Object(r.jsx)(ye,{}),Object(r.jsx)(pe,{}),Object(r.jsx)(ge,{}),Object(r.jsx)(ve,{}),Object(r.jsx)(xe,{})]})});h.a.interceptors.request.use(function(){var e=Object(j.a)(l.a.mark((function e(t){var n;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,!W.token){e.next=7;break}return e.next=4,W.token;case 4:e.t0=e.sent,e.next=10;break;case 7:return e.next=9,W.getNewToken();case 9:e.t0=e.sent;case 10:(n=e.t0)&&(t.headers=Object.assign({Authorization:"Bearer ".concat(n),"Content-Type":"application/json"})),e.next=17;break;case 14:e.prev=14,e.t1=e.catch(0),console.log(e.t1);case 17:return e.abrupt("return",t);case 18:case"end":return e.stop()}}),e,null,[[0,14]])})));return function(t){return e.apply(this,arguments)}}(),(function(e){return console.log("Interceptor Error",e),Promise.reject(e)}));n(524);var _e=function(){var e=.01*window.innerHeight;document.documentElement.style.setProperty("--vh","".concat(e,"px"))};window.addEventListener("resize",_e);var we=Object(o.a)((function(){return Object(c.useEffect)((function(){W.refreshToken&&function(){try{W.getNewToken()}catch(e){console.log(e)}}(),Z(),_e()}),[]),Object(r.jsx)("div",{className:"App",children:Object(r.jsx)("header",{className:"App__header",children:W.refreshToken?Object(r.jsxs)(r.Fragment,{children:[Object(r.jsx)(ke,{}),Object(r.jsxs)("div",{className:"App__main",children:["daily"===be.showPage&&Object(r.jsx)(J,{}),"profil"===be.showPage&&Object(r.jsx)(ee,{}),"stats"===be.showPage&&Object(r.jsx)(re,{})]})]}):Object(r.jsx)(he,{})})})}));i.a.render(Object(r.jsx)(a.a.StrictMode,{children:Object(r.jsx)(we,{})}),document.getElementById("root"))}},[[525,1,2]]]);
//# sourceMappingURL=main.d709717d.chunk.js.map