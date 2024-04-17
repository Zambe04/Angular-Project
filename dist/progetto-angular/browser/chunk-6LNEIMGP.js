import{a as k,b as E,d as N,e as x,f as F,h as I,i as T,j as P,k as j,m as O,o as w,p as G,q as _,t as D,u as R,v as V,w as B}from"./chunk-REZEDRSE.js";import{Y as L,_ as q,d as v,j as C,o as c,p as S}from"./chunk-MRS5Q2JX.js";import{Ib as m,Ta as f,Ua as u,_ as s,ia as d,ja as l,jb as g,lb as p,ub as r,vb as n,wb as h,xc as M,zb as b,zc as y}from"./chunk-GRSPFHKH.js";function A(e,t){e&1&&(r(0,"mat-error"),m(1,"Token is "),r(2,"strong"),m(3,"required"),n()())}var z=(()=>{let t=class t{constructor(o,i){this.authService=o,this.route=i,this.btndisabled=this.authService.btndisabled}ngOnInit(){let i=this.route.snapshot.queryParams.token;i&&this.authService.setToken(i),this.inputform=new F({token:new I(null,E.required)})}onSubmit(){this.inputform.valid?(this.authService.setToken(this.inputform.value.token),this.inputform.reset()):alert("Invalid form! Please try again"),Object.keys(this.inputform.controls).forEach(o=>{this.inputform.controls[o].setErrors(null)}),this.btndisabled=!0}};t.\u0275fac=function(i){return new(i||t)(u(S),u(C))},t.\u0275cmp=d({type:t,selectors:[["app-login"]],decls:14,vars:3,consts:[[1,"form",3,"ngSubmit","formGroup"],[1,"title"],[1,"get-token"],["href","https://gorest.co.in/consumer/login","target","_blank"],[1,"input-field"],["matInput","","type","text","name","token","formControlName","token","minlength","20"],[4,"ngIf"],["mat-flat-button","","color","primary","type","submit",3,"disabled"]],template:function(i,a){i&1&&(r(0,"form",0),b("ngSubmit",function(){return a.onSubmit()}),r(1,"h1",1)(2,"strong"),m(3,"ENTER THE TOKEN"),n()(),r(4,"div",2)(5,"a",3),m(6,"click here to get your token!"),n()(),r(7,"mat-form-field",4)(8,"mat-label"),m(9,"Token"),n(),h(10,"input",5),g(11,A,4,0,"mat-error",6),n(),r(12,"button",7),m(13,"Login "),n()()),i&2&&(p("formGroup",a.inputform),f(11),p("ngIf",a.inputform.touched&&a.inputform.invalid),f(),p("disabled",!a.inputform.valid||a.btndisabled))},dependencies:[M,L,D,G,_,T,k,N,x,O,P,j,V],styles:[".form[_ngcontent-%COMP%]{display:flex;flex-direction:column;width:100%;height:80%;justify-content:center;align-items:center}.get-token[_ngcontent-%COMP%]{margin-bottom:20px}.input-field[_ngcontent-%COMP%]{width:40%;border-radius:10px}a[_ngcontent-%COMP%]{color:#001fa7}.title[_ngcontent-%COMP%]{font-family:Roboto,sans-serif;color:#001fa7;font-size:40px;margin-bottom:25px}"]});let e=t;return e})();var J=[{path:"",component:z}],K=(()=>{let t=class t{};t.\u0275fac=function(i){return new(i||t)},t.\u0275mod=l({type:t}),t.\u0275inj=s({imports:[c.forChild(J),c]});let e=t;return e})();var gt=(()=>{let t=class t{};t.\u0275fac=function(i){return new(i||t)},t.\u0275mod=l({type:t}),t.\u0275inj=s({imports:[y,v,q,R,w,B,K]});let e=t;return e})();export{gt as AuthModule};
