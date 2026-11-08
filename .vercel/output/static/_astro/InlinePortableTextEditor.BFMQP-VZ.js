import{r as e}from"./rolldown-runtime.XKyaHtl9.js";import{c as t}from"./html-block.ClFHzl_P.js";import{$ as n,$t as r,Ct as i,G as a,H as o,Ht as s,It as c,J as l,Jt as u,K as d,Lt as f,Nt as p,Q as m,Qt as h,Tt as g,U as _,Ut as v,W as y,Wt as b,X as x,Xt as S,Y as C,Yt as w,Z as T,Zt as E,_t as D,a as O,an as k,at as A,bt as j,c as M,cn as N,ct as P,d as F,dn as I,dt as ee,en as te,et as ne,f as L,ft as R,gt as z,ht as re,i as ie,in as ae,it as oe,jt as se,kt as ce,l as le,ln as ue,lt as de,mn as fe,mt as pe,n as me,nn as he,nt as ge,o as _e,ot as ve,q as ye,r as be,rn as xe,rt as Se,s as Ce,sn as we,st as Te,t as Ee,tn as De,tt as Oe,u as ke,ut as Ae,vt as je,xt as Me}from"./lib.NDCvW4Yk.js";import{t as Ne}from"./react.B54jxNxs.js";import{$r as Pe,Ca as Fe,Da as Ie,Dq as Le,Dw as Re,Em as ze,FE as Be,Gw as Ve,Ha as He,JW as Ue,Ja as We,Ka as Ge,Ma as Ke,NE as qe,Pa as Je,Qa as Ye,Ra as Xe,Ua as Ze,Uw as Qe,Xa as $e,ZH as et,_L as tt,ao as nt,bt as rt,dQ as it,do as at,fG as ot,fS as st,gA as ct,hw as lt,iV as ut,ka as dt,m as ft,oG as pt,oI as mt,oV as ht,po as gt,rG as _t,ro as vt,so as yt,uG as bt,zE as xt,z_ as St}from"./index.es.C4CMJdY9.js";import{t as Ct}from"./jsx-runtime.D9gUpo36.js";import{t as wt}from"./react-dom.c_sf7UW_.js";var Tt=i;function Et(e){let{char:t,allowSpaces:n,allowToIncludeChar:r,allowedPrefixes:i,startOfLine:a,$position:o}=e,s=n&&!r,c=p(t),l=RegExp(`\\s${c}$`),u=a?`^`:``,d=r?``:c,f=RegExp(s?`${u}${c}.*?(?=\\s${d}|$)`:`${u}(?:^)?${c}[^\\s${d}]*`,`gm`),m=o.nodeBefore?.isText&&o.nodeBefore.text;if(!m)return null;let h=o.pos-m.length,g=Array.from(m.matchAll(f)).pop();if(!g||g.input===void 0||g.index===void 0)return null;let _=g.input.slice(Math.max(0,g.index-1),g.index),v=RegExp(`^[${i?.map(p).join(``)}\0]?$`).test(_);if(i!==null&&!v)return null;let y=h+g.index,b=y+g[0].length;return s&&l.test(m.slice(b-1,b+1))&&(g[0]+=` `,b+=1),y<o.pos&&b>=o.pos?{range:{from:y,to:b},query:g[0].slice(t.length),text:g[0]}:null}function Dt(e){return e.docChanged?e.steps.some(e=>{let t=e.slice;if(!t?.content)return!1;let n=t.content.textBetween(0,t.content.size,`
`);return/\s/.test(n)}):!1}function Ot(e){return()=>{let t=e.state.selection.$anchor.pos,{top:n,right:r,bottom:i,left:a}=e.view.coordsAtPos(t);try{return new DOMRect(a,n,r-a,i-n)}catch{return null}}}function kt(e,t,n,r){return n?()=>{let n=r.getState(e.state)?.decorationId;return t.dom.querySelector(`[data-decoration-id="${n}"]`)?.getBoundingClientRect()||null}:Ot(e)}function At({match:e,dismissedRange:t,state:n,transaction:r,editor:i,shouldResetDismissed:a,effectiveAllowSpaces:o}){return a?.({editor:i,state:n,range:t,match:e,transaction:r,allowSpaces:o})?!1:o?e.range.from===t.from:e.range.from===t.from&&!Dt(r)}function jt({view:e,pluginKeyRef:t}){let n=e.state.tr.setMeta(t,{exit:!0});e.dispatch(n)}function Mt({pluginKey:e,decorationTag:t,decorationClass:n,decorationContent:r,decorationEmptyClass:i,renderer:a,dispatchExit:o}){return{handleKeyDown(t,n){var r;let i=e.getState(t.state);if(!i.active)return!1;if(n.key===`Escape`||n.key===`Esc`){var s;return a==null||(s=a.onKeyDown)==null||s.call(a,{view:t,event:n,range:i.range}),o(t),!0}return(a==null||(r=a.onKeyDown)==null?void 0:r.call(a,{view:t,event:n,range:i.range}))||!1},decorations(a){let{active:o,range:s,decorationId:c,query:l}=e.getState(a);if(!o)return null;let d=!l?.length,f=[n];return d&&f.push(i),w.create(a.doc,[u.inline(s.from,s.to,{nodeName:t,class:f.join(` `),"data-decoration-id":c||void 0,"data-decoration-content":r})])}}}function Nt({editor:e,char:t,effectiveAllowSpaces:n,allowToIncludeChar:r,allowedPrefixes:i,startOfLine:a,findSuggestionMatch:o,allow:s,shouldShow:c,shouldKeepDismissed:l,pluginKey:u}){return{init(){return{active:!1,range:{from:0,to:0},query:null,text:null,composing:!1,dismissedRange:null}},apply(d,f,p,m){let{isEditable:h}=e,{composing:g}=e.view,{selection:_}=d,{empty:v,from:y}=_,b={...f},x=d.getMeta(u);if(x&&x.exit)return b.active=!1,b.decorationId=null,b.range={from:0,to:0},b.query=null,b.text=null,b.dismissedRange=f.active?{...f.range}:f.dismissedRange,b;if(b.composing=g,d.docChanged&&b.dismissedRange!==null&&(b.dismissedRange={from:d.mapping.map(b.dismissedRange.from),to:d.mapping.map(b.dismissedRange.to)}),h&&(v||e.view.composing)){(y<f.range.from||y>f.range.to)&&!g&&!f.composing&&(b.active=!1);let u=o({char:t,allowSpaces:n,allowToIncludeChar:r,allowedPrefixes:i,startOfLine:a,$position:_.$from}),p=`id_${Math.floor(Math.random()*4294967295)}`;u&&s({editor:e,state:m,range:u.range,isActive:f.active})&&(!c||c({editor:e,range:u.range,query:u.query,text:u.text,transaction:d}))?(b.dismissedRange!==null&&!l({match:u,dismissedRange:b.dismissedRange,state:m,transaction:d})&&(b.dismissedRange=null),b.dismissedRange===null?(b.active=!0,b.decorationId=f.decorationId||p,b.range=u.range,b.query=u.query,b.text=u.text):b.active=!1):(u||(b.dismissedRange=null),b.active=!1)}else b.active=!1;return b.active||(b.decorationId=null,b.range={from:0,to:0},b.query=null,b.text=null),b}}}function Pt({editor:e,items:t}){let n=null,r=null,i=null,a=()=>{r!==null&&(clearTimeout(r),r=null),i?.(),i=null},o=e=>new Promise(t=>{i=t,r=setTimeout(()=>{r=null;let e=i;i=null,e?.()},e)}),s=()=>{n?.abort(),a(),n=null};return{abort:s,fetch:async(r,i)=>{s(),n=new AbortController;let a=n;if(i>0&&await o(i),n!==a||a.signal.aborted)return{status:`aborted`};try{let i=await t({editor:e,query:r,signal:a.signal});return n!==a||a.signal.aborted?{status:`aborted`}:{status:`resolved`,items:i}}catch{return n!==a||a.signal.aborted?{status:`aborted`}:{status:`error`}}}}}function Ft({placement:e,offset:t,flip:n,floatingUi:r}){var i;let o=[a({mainAxis:t.mainAxis??4,crossAxis:t.crossAxis??0})];return n&&o.push(y()),r!=null&&(i=r.middleware)!=null&&i.length&&o.push(...r.middleware),{placement:e,strategy:r?.strategy??`absolute`,middleware:o}}function It(e){if(e instanceof HTMLElement)return e;if(typeof e==`string`)try{let t=document.querySelector(e);if(t)return t}catch{return document.body}return document.body}function Lt({getReferenceRect:e,contextElement:t,config:n,container:r,dismissOnOutsideClick:i,dismiss:a}){return(s,c={})=>{let l={getBoundingClientRect:()=>e()??new DOMRect,contextElement:t},u=!1,d=!s.isConnected;d&&It(r).appendChild(s),c.onPosition||(s.style.visibility=`hidden`,s.style.width=`max-content`);let f=o(l,s,()=>{_(l,s,{placement:n.placement,strategy:n.strategy,middleware:n.middleware}).then(({x:e,y:t,placement:n,strategy:r})=>{c.onPosition?c.onPosition({x:e,y:t,placement:n,strategy:r}):(Object.assign(s.style,{position:r,left:`${e}px`,top:`${t}px`}),u||(u=!0,s.style.visibility=``))})},c.autoUpdate),p;return i&&(p=e=>{let n=e.target;!(n instanceof Node)||s.contains(n)||t.contains(n)||a()},document.addEventListener(`pointerdown`,p,!0)),()=>{f(),p&&document.removeEventListener(`pointerdown`,p,!0),d&&s.remove()}}}function Rt({editor:e,pluginKey:t,items:n,renderer:r,minQueryLength:i,debounce:a,initialItems:o,placement:s,offset:c,container:l,flip:u,floatingUi:d,dismissOnOutsideClick:f,command:p,clientRectFor:m,dispatchExit:h}){let g,_=Pt({editor:e,items:n}),v=Ft({placement:s,offset:c,flip:u,floatingUi:d});function y(e,t){switch(e){case`started`:var n;r==null||(n=r.onStart)==null||n.call(r,t);break;case`updated`:var i;r==null||(i=r.onUpdate)==null||i.call(r,t);break;case`stopped`:var a;r==null||(a=r.onExit)==null||a.call(r,t)}}return{update:async(n,d)=>{let b=t.getState(d),x=t.getState(n.state);if(!b||!x)return;let S=null,C=b.query!==x.query,w=b.text!==x.text,T=b.range.from!==x.range.from||b.range.to!==x.range.to,E=C||w||T;if(!b.active&&x.active)S=`started`;else if(b.active&&!x.active)S=`stopped`;else if(x.active&&E)S=`updated`;else return;let D=S===`stopped`?b:x,O=n.dom.querySelector(`[data-decoration-id="${D.decorationId}"]`),k=m(n,O),A=i===0||(D.query?D.query.length>=i:!1),j=(S===`started`||S===`updated`)&&A;if(g={editor:e,range:D.range,query:D.query||``,text:D.text||``,items:o??[],command:t=>p({editor:e,range:D.range,props:t}),decorationNode:O,clientRect:k,loading:j,placement:s,offset:{mainAxis:c.mainAxis??4,crossAxis:c.crossAxis??0},container:l,flip:u,floatingUi:v,mount:Lt({getReferenceRect:k,contextElement:n.dom,config:v,container:l,dismissOnOutsideClick:f,dismiss:()=>h(e.view)})},S===`started`){var M;r==null||(M=r.onBeforeStart)==null||M.call(r,g)}if(S===`updated`){var N;r==null||(N=r.onBeforeUpdate)==null||N.call(r,g)}if(S===`started`&&y(S,g),S===`started`||S===`updated`){if(!j)_.abort(),g={...g,items:o??[],loading:!1};else{g={...g,items:o??[],loading:!0},S=`updated`,y(S,g);let e=await _.fetch(D.query||``,a);if(e.status===`aborted`)return;if(!t.getState(n.state)?.active){_.abort();return}g=e.status===`resolved`?{...g,items:e.items,loading:!1}:{...g,loading:!1}}}S===`stopped`?(_.abort(),y(S,g),g=void 0):S===`updated`&&y(S,g)},destroy:()=>{var e;_.abort(),g&&(r==null||(e=r.onExit)==null||e.call(r,g))}}}var zt=new ae(`suggestion`);function Bt({pluginKey:e=zt,editor:t,char:n=`@`,allowSpaces:r=!1,allowToIncludeChar:i=!1,allowedPrefixes:a=[` `],startOfLine:o=!1,decorationTag:s=`span`,decorationClass:c=`suggestion`,decorationContent:l=``,decorationEmptyClass:u=`is-empty`,command:d=()=>null,items:f=()=>[],minQueryLength:p=0,debounce:m=0,initialItems:h,placement:g=`bottom-start`,offset:_={},container:v,flip:y=!0,floatingUi:b,dismissOnOutsideClick:x=!0,render:S=()=>({}),allow:C=()=>!0,findSuggestionMatch:w=Et,shouldShow:T,shouldResetDismissed:E}){let D=S?.(),O=r&&!i,k=(n,r)=>kt(t,n,r,e);function A(e){return At({...e,editor:t,shouldResetDismissed:E,effectiveAllowSpaces:O})}let j=t=>jt({view:t,pluginKeyRef:e});return new xe({key:e,view:()=>Rt({editor:t,pluginKey:e,items:f,renderer:D,minQueryLength:p,debounce:m,initialItems:h,placement:g,offset:_,container:v,flip:y,floatingUi:b,dismissOnOutsideClick:x,command:d,clientRectFor:k,dispatchExit:j}),state:Nt({editor:t,char:n,effectiveAllowSpaces:O,allowToIncludeChar:i,allowedPrefixes:a,startOfLine:o,findSuggestionMatch:w,allow:C,shouldShow:T,shouldKeepDismissed:A,pluginKey:e}),props:Mt({pluginKey:e,decorationTag:s,decorationClass:c,decorationContent:l,decorationEmptyClass:u,renderer:D,dispatchExit:j})})}function Vt(e,t=zt){let n=e.state.tr.setMeta(t,{exit:!0});e.dispatch(n)}var Ht=Bt,B=e(Ne(),1),Ut=`/_emdash/api/media/file/`;function Wt(e){let t=e.split(`/`);return t.some(e=>e===``||e===`.`||e===`..`)?`${Ut}${encodeURIComponent(e)}`:`${Ut}${t.map(encodeURIComponent).join(`/`)}`}function Gt(e){let t=qt(e)?e:{},n=qt(t.asset)?t.asset:{},r=qt(n.meta)?Kt(n.meta.storageKey):void 0,i=Kt(n.url)??Kt(n.src)??(r?Wt(r):void 0),a=Kt(n.provider),o=Kt(t.alt)??Kt(n.alt),s=typeof t.width==`number`?t.width:n.width,c=typeof t.height==`number`?t.height:n.height,l={asset:{_type:`reference`,_ref:Kt(n._ref)??Kt(n.id)??``,...i?{url:i}:{},...a?{provider:a}:{}}};return o&&(l.alt=o),typeof s==`number`&&(l.width=s),typeof c==`number`&&(l.height=c),l}function Kt(e){return typeof e==`string`&&e?e:void 0}function qt(e){return typeof e==`object`&&!!e&&!Array.isArray(e)}function Jt(e){if(typeof e==`string`){let t=e.trim();return t?{href:t}:null}if(typeof e!=`object`||!e)return null;let{href:t,blank:n}=e;if(typeof t!=`string`)return null;let r=t.trim();return r?n===!0?{href:r,blank:!0}:{href:r}:null}var Yt=new Set([`strong`,`em`,`underline`,`strike-through`,`subscript`,`superscript`,`code`]),Xt=new Set([`bold`,`strong`,`italic`,`em`,`underline`,`strike`,`strikethrough`,`subscript`,`superscript`,`code`,`link`,`emdashPortableTextSpan`]);function Zt(e){return typeof e==`object`&&!!e&&!Array.isArray(e)}function Qt(e,t,n){if(Array.isArray(e)){for(let r of e)Qt(r,t,n);return}if(!Zt(e))return;let r=t;if(Array.isArray(e.markDefs)){let n=new Map(t);for(let t of e.markDefs)Zt(t)&&typeof t._key==`string`&&n.set(t._key,t);r=n}if(e._type===`span`&&Array.isArray(e.marks))for(let t of e.marks){if(typeof t!=`string`||Yt.has(t))continue;let e=r.get(t);e?._type!==`link`&&n.add(typeof e?._type==`string`?e._type:t)}for(let[t,i]of Object.entries(e))t!==`markDefs`&&Qt(i,r,n)}function $t(e,t){for(let n of e.marks??[])Xt.has(n.type)||t.add(n.type);for(let n of e.content??[])$t(n,t)}var en=class extends Error{marks;constructor(e){let t=[...new Set(e)].toSorted();super(`Unsupported Portable Text marks: ${t.join(`, `)}`),this.name=`UnsupportedPortableTextMarksError`,this.marks=t}};function tn(e){let t=new Set;for(let n of e)(n._type===`block`||n._type===`table`)&&Qt(n,new Map,t);return[...t].toSorted()}function nn(e){let t=tn(e);if(t.length>0)throw new en(t)}function rn(e){let t=new Set;for(let n of e.content)$t(n,t);if(t.size>0)throw new en(t)}function V(e){if(typeof e!=`string`)return;let t=e.trim();return t.length>0&&t.length<=128?t:void 0}function H(e){return typeof e==`number`&&Number.isInteger(e)&&e>=1&&e<=2147483647?e:void 0}function an(e){let t=`legacy:${e}`;if(t.length<=128)return t;let n=2166136261;for(let t=0;t<e.length;t++)n^=e.charCodeAt(t),n=Math.imul(n,16777619);return`legacy:${e.slice(0,96)}:${(n>>>0).toString(36)}:${e.length.toString(36)}`}function on(e,t){return{listId:V(e?.listId)??an(t),listStart:H(e?.listStart)??H(e?.start)??1}}function sn(e){let t=[],n=(e,r,i,a)=>{e.type===`orderedList`&&t.push({node:e,path:r,depth:i,context:a});for(let[t,o]of(e.content??[]).entries()){let e=`${r}:${t}`;n(o,e,i+1,o.type===`listItem`?`listItem:${e}`:a)}};for(let[t,r]of e.content.entries())n(r,`root:${t}`,0,`root`);return t}function cn(e){return{...e,attrs:e.attrs?{...e.attrs}:void 0,content:e.content?.map(cn),marks:e.marks?.map(e=>({...e,attrs:e.attrs?{...e.attrs}:void 0}))}}function ln(e,t,n){let r=an(`repair:${e}:${t}`),i=`:${n.toString(36)}`;return`${r.slice(0,128-i.length)}${i}`}function un(e){let t={...e,content:e.content.map(cn)},n=new Map,r=new Set,i=sn(t).map(e=>{let t=V(e.node.attrs?.listId)??an(`pm-json:${e.path}:${e.depth}:${e.context}`),i=JSON.stringify([e.depth,e.context]),a=JSON.stringify([t,i]),o=n.get(a);if(!o){if(!r.has(t))o=t;else{let e=0;do o=ln(t,i,e++);while(r.has(o))}n.set(a,o),r.add(o)}return{...e,listId:o,scopeKey:JSON.stringify([o,e.depth,e.context])}}),a=new Map;for(let e of i){let t=H(e.node.attrs?.listStart);t!==void 0&&!a.has(e.scopeKey)&&a.set(e.scopeKey,t)}for(let e of i)a.has(e.scopeKey)||a.set(e.scopeKey,H(e.node.attrs?.start)??1);let o=new Map;for(let e of i){let t=a.get(e.scopeKey),n=o.get(e.scopeKey)??0,r=H(t+n)??1,i=e.node.content?.filter(e=>e.type===`listItem`).length??0;o.set(e.scopeKey,n+i),e.node.attrs={...e.node.attrs,listId:e.listId,listStart:t,start:r}}return t}var dn=ve.extend({excludes:``}),fn=[[`heading1`,1],[`heading2`,2],[`heading3`,3],[`heading4`,4],[`heading5`,5],[`heading6`,6]],pn=[{id:`paragraph`,label:`Paragraph`,icon:Ie},{id:`heading1`,label:`Heading 1`,icon:We,markdown:`#`},{id:`heading2`,label:`Heading 2`,icon:He,markdown:`##`},{id:`heading3`,label:`Heading 3`,icon:Ze,markdown:`###`},{id:`heading4`,label:`Heading 4`,icon:$e,markdown:`####`},{id:`heading5`,label:`Heading 5`,icon:Ye,markdown:`#####`},{id:`heading6`,label:`Heading 6`,icon:Ge,markdown:`######`},{id:`bulletList`,label:`Bullet List`,icon:Re,markdown:`-`},{id:`orderedList`,label:`Numbered List`,icon:lt,markdown:`1.`},{id:`blockquote`,label:`Quote`,icon:ze,markdown:`>`},{id:`codeBlock`,label:`Code Block`,icon:ht,markdown:"```"}];function mn(e){return pn.filter(t=>![`heading4`,`heading5`,`heading6`].includes(t.id)||t.id===e)}function hn(e){return e===`bulletList`||e===`orderedList`}function gn(e){let{selection:t}=e.state;if(t instanceof he){let{name:e}=t.node.type;if(e===`bulletList`||e===`orderedList`)return e}let{$from:n,$to:r}=t;for(let e=n.sharedDepth(r.pos);e>0;e--){let{name:t}=n.node(e).type;if(t===`bulletList`||t===`orderedList`)return t}}function _n(e){if(e.isActive(`codeBlock`))return`codeBlock`;let t=gn(e);if(t)return t;if(e.isActive(`blockquote`))return`blockquote`;for(let[t,n]of fn)if(e.isActive(`heading`,{level:n}))return t;return e.isActive(`paragraph`)?`paragraph`:void 0}function vn(e){let{state:t}=e;if(!e.isEditable)return!1;let n=!1,r=!1;return t.doc.nodesBetween(t.selection.from,t.selection.to,e=>(e.isTextblock?n=!0:e.isAtom&&(r=!0),!e.isTextblock)),n&&!r}function yn(e){for(let t=e.depth-1;t>0;t--){let{name:n}=e.node(t).type;if(n===`listItem`||n===`blockquote`)return t}return null}function bn(e,t,n){let r=e.resolve(t);for(let e=r.sharedDepth(n);e>0;e--){let{name:t}=r.node(e).type;if(t===`bulletList`||t===`orderedList`)return r.before(e)}return null}function xn(e,t,n){return n(De.create({doc:e.doc,selection:t}),t=>{for(let n of t.steps)e.step(n)})}function Sn(e,t,n,r,i={}){e.setBlockType(t,n,r,e=>r.spec.attrs?.textAlign&&e.attrs.textAlign!==void 0?{...i,textAlign:e.attrs.textAlign}:i)}function Cn(e,t,n){let r=e.doc.resolve(t);for(let t=r.depth;t>0;t--){if(r.node(t).type!==n)continue;let i=r.after(t),a=e.doc.resolve(i).nodeAfter,o=typeof a?.attrs.start==`number`&&a.attrs.start!==1;a?.type===n&&!o&&N(e.doc,i)&&e.join(i);let s=r.before(t);e.doc.resolve(s).nodeBefore?.type===n&&N(e.doc,s)&&e.join(s);return}}function wn(e,t){let{selection:n}=e,{schema:i}=e.doc.type,a=[];e.doc.nodesBetween(n.from,n.to,(e,t)=>!e.isTextblock||(a.push(t+1),!1));let o=a[0],s=a.at(-1);if(o===void 0||s===void 0)return!1;let c=e.steps.length,l=t=>e.mapping.slice(c).map(t),u=hn(t)?i.nodes[t]:void 0,d=u?bn(e.doc,o,s):null;if(u&&d!==null)e.setNodeMarkup(d,u);else{for(let t of a)for(let n=0;n<32;n++){let n=e.doc.resolve(l(t)),r=yn(n);if(r===null)break;let a=n.node(r).type.name===`listItem`?S(i.nodes.listItem):h;if(!xn(e,we.create(e.doc,n.pos),a))break}let n=l(o),c=l(s),d=fn.find(([e])=>e===t)?.[1],f=a.some(t=>yn(e.doc.resolve(l(t)))!==null);if((d!==void 0||t===`codeBlock`)&&f)return!0;d===void 0?t===`codeBlock`?e.setBlockType(n,c,i.nodes.codeBlock):t===`paragraph`?Sn(e,n,c,i.nodes.paragraph):(e.setBlockType(n,c,i.nodes.paragraph),xn(e,we.create(e.doc,l(o),e.doc.resolve(l(s)).end()),u?E(u):r(i.nodes.blockquote))):Sn(e,n,c,i.nodes.heading,{level:d})}return u&&Cn(e,l(o),u),e.setSelection(we.between(e.doc.resolve(l(n.anchor)),e.doc.resolve(l(n.head)))),!0}function Tn(e,t,n){if(!e.isEditable)return;let r=_n(e)===t,i=e.chain().focus();n&&i.deleteRange(n),r||i.command(({tr:e})=>wn(e,t)),i.run()}var En=`input:not([inert]):not([inert] *),select:not([inert]):not([inert] *),textarea:not([inert]):not([inert] *),a[href]:not([inert]):not([inert] *),area[href]:not([inert]):not([inert] *),button:not([inert]):not([inert] *),[tabindex]:not(slot):not([inert]):not([inert] *),audio[controls]:not([inert]):not([inert] *),video[controls]:not([inert]):not([inert] *),[contenteditable]:not([contenteditable="false"]):not([inert]):not([inert] *),details>summary:first-of-type:not([inert]):not([inert] *),details:not([inert]):not([inert] *)`,Dn=typeof Element>`u`,On=Dn?function(){}:Element.prototype.matches||Element.prototype.msMatchesSelector||Element.prototype.webkitMatchesSelector,kn=!Dn&&Element.prototype.getRootNode?function(e){return e==null||e.getRootNode==null?void 0:e.getRootNode()}:function(e){return e?.ownerDocument},An=function(e,t){t===void 0&&(t=!0);var n=e==null||e.getAttribute==null?void 0:e.getAttribute(`inert`);return n===``||n===`true`||t&&e&&(typeof e.closest==`function`?e.closest(`[inert]`):An(e.parentNode))},jn=function(e){var t,n=e==null||e.getAttribute==null||(t=e.getAttribute(`contenteditable`))==null?void 0:t.toLowerCase();return n===``||n===`true`||n===`plaintext-only`},Mn=function(e,t,n){if(An(e))return[];var r=Array.prototype.slice.apply(e.querySelectorAll(En));return t&&On.call(e,En)&&r.unshift(e),r=r.filter(n),r},Nn=function(e,t,n){for(var r=[],i=Array.from(e);i.length;){var a=i.shift();if(!An(a,!1)){if(a.tagName===`SLOT`){var o=a.assignedElements(),s=Nn(o.length?o:a.children,!0,n);n.flatten?r.push.apply(r,s):r.push({scopeParent:a,candidates:s})}else{On.call(a,En)&&n.filter(a)&&(t||!e.includes(a))&&r.push(a);var c=a.shadowRoot||typeof n.getShadowRoot==`function`&&n.getShadowRoot(a),l=!An(c,!1)&&(!n.shadowRootFilter||n.shadowRootFilter(a));if(c&&l){var u=Nn(c===!0?a.children:c.children,!0,n);n.flatten?r.push.apply(r,u):r.push({scopeParent:a,candidates:u})}else i.unshift.apply(i,a.children)}}}return r},Pn=function(e){return!isNaN(parseInt(e.getAttribute(`tabindex`),10))},Fn=function(e){if(!e)throw Error(`No node provided`);return e.tabIndex<0&&(/^(AUDIO|VIDEO|DETAILS)$/.test(e.tagName)||jn(e))&&!Pn(e)?0:e.tabIndex},In=function(e,t){var n=Fn(e);return n<0&&t&&!Pn(e)?0:n},Ln=function(e,t){return e.tabIndex===t.tabIndex?e.documentOrder-t.documentOrder:e.tabIndex-t.tabIndex},Rn=function(e){return e.tagName===`INPUT`},zn=function(e){return Rn(e)&&e.type===`hidden`},Bn=function(e){return e.tagName===`DETAILS`&&Array.prototype.slice.apply(e.children).some(function(e){return e.tagName===`SUMMARY`})},Vn=function(e,t){for(var n=0;n<e.length;n++)if(e[n].checked&&e[n].form===t)return e[n]},Hn=function(e){if(!e.name)return!0;var t=e.form||kn(e),n=function(e){return t.querySelectorAll(`input[type="radio"][name="`+e+`"]`)},r;if(typeof window<`u`&&window.CSS!==void 0&&typeof window.CSS.escape==`function`)r=n(window.CSS.escape(e.name));else try{r=n(e.name)}catch(e){return console.error(`Looks like you have a radio button with a name attribute containing invalid CSS selector characters and need the CSS.escape polyfill: %s`,e.message),!1}var i=Vn(r,e.form);return!i||i===e},Un=function(e){return Rn(e)&&e.type===`radio`},Wn=function(e){return Un(e)&&!Hn(e)},Gn=function(e){var t=e&&kn(e),n=t?.host,r=!1;if(t&&t!==e){var i,a;for(r=!!((i=n)!=null&&(i=i.ownerDocument)!=null&&i.contains(n)||e!=null&&(a=e.ownerDocument)!=null&&a.contains(e));!r&&n;){var o;t=kn(n),n=t?.host,r=!!((o=n)!=null&&(o=o.ownerDocument)!=null&&o.contains(n))}}return r},Kn=function(e){var t=e.getBoundingClientRect(),n=t.width,r=t.height;return n===0&&r===0},qn=function(e,t){var n=t.displayCheck,r=t.getShadowRoot;if(n===`full-native`&&`checkVisibility`in e)return!e.checkVisibility({checkOpacity:!1,opacityProperty:!1,contentVisibilityAuto:!0,visibilityProperty:!0,checkVisibilityCSS:!0});var i=getComputedStyle(e).visibility;if(i===`hidden`||i===`collapse`)return!0;var a=On.call(e,`details>summary:first-of-type`)?e.parentElement:e;if(On.call(a,`details:not([open]) *`))return!0;if(!n||n===`full`||n===`full-native`||n===`legacy-full`){if(typeof r==`function`){for(var o=e;e;){var s=e.parentElement,c=kn(e);if(s&&!s.shadowRoot&&r(s)===!0)return Kn(e);e=e.assignedSlot?e.assignedSlot:!s&&c!==e.ownerDocument?c.host:s}e=o}if(Gn(e))return!e.getClientRects().length;if(n!==`legacy-full`)return!0}else if(n===`non-zero-area`)return Kn(e);return!1},Jn=function(e){if(/^(INPUT|BUTTON|SELECT|TEXTAREA)$/.test(e.tagName))for(var t=e.parentElement;t;){if(t.tagName===`FIELDSET`&&t.disabled){for(var n=0;n<t.children.length;n++){var r=t.children.item(n);if(r.tagName===`LEGEND`)return On.call(t,`fieldset[disabled] *`)?!0:!r.contains(e)}return!0}t=t.parentElement}return!1},Yn=function(e,t){return!(t.disabled||zn(t)||qn(t,e)||Bn(t)||Jn(t))},Xn=function(e,t){return!(Wn(t)||Fn(t)<0||!Yn(e,t))},Zn=function(e){var t=parseInt(e.getAttribute(`tabindex`),10);return!!(isNaN(t)||t>=0)},Qn=function(e){var t=[],n=[];return e.forEach(function(e,r){var i=!!e.scopeParent,a=i?e.scopeParent:e,o=In(a,i),s=i?Qn(e.candidates):a;o===0?i?t.push.apply(t,s):t.push(a):n.push({documentOrder:r,tabIndex:o,item:e,isScope:i,content:s})}),n.sort(Ln).reduce(function(e,t){return t.isScope?e.push.apply(e,t.content):e.push(t.content),e},[]).concat(t)},$n=function(e,t){return t||={},Qn(t.getShadowRoot?Nn([e],t.includeContainer,{filter:Xn.bind(null,t),flatten:!1,getShadowRoot:t.getShadowRoot,shadowRootFilter:Zn}):Mn(e,t.includeContainer,Xn.bind(null,t)))},er=function(e,t){return t||={},t.getShadowRoot?Nn([e],t.includeContainer,{filter:Yn.bind(null,t),flatten:!0,getShadowRoot:t.getShadowRoot}):Mn(e,t.includeContainer,Yn.bind(null,t))},tr=function(e,t){if(t||={},!e)throw Error(`No node provided`);return On.call(e,En)!==!1&&Xn(t,e)};function nr(){let e=navigator.userAgentData;return e!=null&&e.platform?e.platform:navigator.platform}function rr(){let e=navigator.userAgentData;return e&&Array.isArray(e.brands)?e.brands.map(e=>{let{brand:t,version:n}=e;return t+`/`+n}).join(` `):navigator.userAgent}function ir(){return/apple/i.test(navigator.vendor)}function ar(){let e=/android/i;return e.test(nr())||e.test(rr())}function or(){return nr().toLowerCase().startsWith(`mac`)&&!navigator.maxTouchPoints}function sr(){return rr().includes(`jsdom/`)}var cr=`data-floating-ui-focusable`,lr=`input:not([type='hidden']):not([disabled]),[contenteditable]:not([contenteditable='false']),textarea:not([disabled])`,ur=`ArrowLeft`,dr=`ArrowRight`,fr=`ArrowUp`,pr=`ArrowDown`;function mr(e){let t=e.activeElement;for(;((n=t)==null||(n=n.shadowRoot)==null?void 0:n.activeElement)!=null;){var n;t=t.shadowRoot.activeElement}return t}function U(e,t){if(!e||!t)return!1;let n=t.getRootNode==null?void 0:t.getRootNode();if(e.contains(t))return!0;if(n&&Oe(n)){let n=t;for(;n;){if(e===n)return!0;n=n.parentNode||n.host}}return!1}function hr(e){return`composedPath`in e?e.composedPath()[0]:e.target}function gr(e,t){if(t==null)return!1;if(`composedPath`in e)return e.composedPath().includes(t);let n=e;return n.target!=null&&t.contains(n.target)}function _r(e){return e.matches(`html,body`)}function W(e){return e?.ownerDocument||document}function vr(e){return m(e)&&e.matches(lr)}function yr(e){return e?e.getAttribute(`role`)===`combobox`&&vr(e):!1}function br(e){if(!e||sr())return!0;try{return e.matches(`:focus-visible`)}catch{return!0}}function xr(e){return e?e.hasAttribute(cr)?e:e.querySelector(`[`+cr+`]`)||e:null}function Sr(e,t,n){return n===void 0&&(n=!0),e.filter(e=>e.parentId===t&&(!n||e.context?.open)).flatMap(t=>[t,...Sr(e,t.id,n)])}function Cr(e,t){let n,r=-1;function i(t,a){a>r&&(n=t,r=a),Sr(e,t).forEach(e=>{i(e.id,a+1)})}return i(t,0),e.find(e=>e.id===n)}function wr(e,t){let n=[],r=e.find(e=>e.id===t)?.parentId;for(;r;){let t=e.find(e=>e.id===r);r=t?.parentId,t&&(n=n.concat(t))}return n}function G(e){e.preventDefault(),e.stopPropagation()}function Tr(e){return`nativeEvent`in e}function Er(e){return e.mozInputSource===0&&e.isTrusted?!0:ar()&&e.pointerType?e.type===`click`&&e.buttons===1:e.detail===0&&!e.pointerType}function Dr(e){return sr()?!1:!ar()&&e.width===0&&e.height===0||ar()&&e.width===1&&e.height===1&&e.pressure===0&&e.detail===0&&e.pointerType===`mouse`||e.width<1&&e.height<1&&e.pressure===0&&e.detail===0&&e.pointerType===`touch`}function Or(e,t){let n=[`mouse`,`pen`];return t||n.push(``,void 0),n.includes(e)}var K=typeof document<`u`?B.useLayoutEffect:function(){},kr={...B};function q(e){let t=B.useRef(e);return K(()=>{t.current=e}),t}var Ar=kr.useInsertionEffect||(e=>e());function J(e){let t=B.useRef(()=>{});return Ar(()=>{t.current=e}),B.useCallback(function(){var e=[...arguments];return t.current==null?void 0:t.current(...e)},[])}function jr(e,t,n){return Math.floor(e/t)!==n}function Mr(e,t){return t<0||t>=e.current.length}function Nr(e,t){return Y(e,{disabledIndices:t})}function Pr(e,t){return Y(e,{decrement:!0,startingIndex:e.current.length,disabledIndices:t})}function Y(e,t){let{startingIndex:n=-1,decrement:r=!1,disabledIndices:i,amount:a=1}=t===void 0?{}:t,o=n;do o+=r?-a:a;while(o>=0&&o<=e.current.length-1&&zr(e,o,i));return o}function Fr(e,t){let{event:n,orientation:r,loop:i,rtl:a,cols:o,disabledIndices:s,minIndex:c,maxIndex:l,prevIndex:u,stopEvent:d=!1}=t,f=u;if(n.key===fr){if(d&&G(n),u===-1)f=l;else if(f=Y(e,{startingIndex:f,amount:o,decrement:!0,disabledIndices:s}),i&&(u-o<c||f<0)){let e=u%o,t=l%o,n=l-(t-e);f=t===e?l:t>e?n:n-o}Mr(e,f)&&(f=u)}if(n.key===pr&&(d&&G(n),u===-1?f=c:(f=Y(e,{startingIndex:u,amount:o,disabledIndices:s}),i&&u+o>l&&(f=Y(e,{startingIndex:u%o-o,amount:o,disabledIndices:s}))),Mr(e,f)&&(f=u)),r===`both`){let t=Se(u/o);n.key===(a?ur:dr)&&(d&&G(n),u%o===o-1?i&&(f=Y(e,{startingIndex:u-u%o-1,disabledIndices:s})):(f=Y(e,{startingIndex:u,disabledIndices:s}),i&&jr(f,o,t)&&(f=Y(e,{startingIndex:u-u%o-1,disabledIndices:s}))),jr(f,o,t)&&(f=u)),n.key===(a?dr:ur)&&(d&&G(n),u%o===0?i&&(f=Y(e,{startingIndex:u+(o-u%o),decrement:!0,disabledIndices:s})):(f=Y(e,{startingIndex:u,decrement:!0,disabledIndices:s}),i&&jr(f,o,t)&&(f=Y(e,{startingIndex:u+(o-u%o),decrement:!0,disabledIndices:s}))),jr(f,o,t)&&(f=u));let r=Se(l/o)===t;Mr(e,f)&&(f=i&&r?n.key===(a?dr:ur)?l:Y(e,{startingIndex:u-u%o-1,disabledIndices:s}):u)}return f}function Ir(e,t,n){let r=[],i=0;return e.forEach((e,a)=>{let{width:o,height:s}=e,c=!1;for(n&&(i=0);!c;){let e=[];for(let n=0;n<o;n++)for(let r=0;r<s;r++)e.push(i+n+r*t);i%t+o<=t&&e.every(e=>r[e]==null)?(e.forEach(e=>{r[e]=a}),c=!0):i++}}),[...r]}function Lr(e,t,n,r,i){if(e===-1)return-1;let a=n.indexOf(e),o=t[e];switch(i){case`tl`:return a;case`tr`:return o?a+o.width-1:a;case`bl`:return o?a+(o.height-1)*r:a;case`br`:return n.lastIndexOf(e)}}function Rr(e,t){return t.flatMap((t,n)=>e.includes(t)?[n]:[])}function zr(e,t,n){if(typeof n==`function`)return n(t);if(n)return n.includes(t);let r=e.current[t];return r==null||r.hasAttribute(`disabled`)||r.getAttribute(`aria-disabled`)===`true`}var Br=()=>({getShadowRoot:!0,displayCheck:typeof ResizeObserver==`function`&&ResizeObserver.toString().includes(`[native code]`)?`full`:`none`});function Vr(e,t){let n=$n(e,Br()),r=n.length;if(r===0)return;let i=mr(W(e)),a=n.indexOf(i);return n[a===-1?t===1?0:r-1:a+t]}function Hr(e){return Vr(W(e).body,1)||e}function Ur(e){return Vr(W(e).body,-1)||e}function Wr(e,t){let n=t||e.currentTarget,r=e.relatedTarget;return!r||!U(n,r)}function Gr(e){$n(e,Br()).forEach(e=>{e.dataset.tabindex=e.getAttribute(`tabindex`)||``,e.setAttribute(`tabindex`,`-1`)})}function Kr(e){e.querySelectorAll(`[data-tabindex]`).forEach(e=>{let t=e.dataset.tabindex;delete e.dataset.tabindex,t?e.setAttribute(`tabindex`,t):e.removeAttribute(`tabindex`)})}var X=Ct(),qr=e(wt(),1);function Jr(e){let t=B.useRef(void 0),n=B.useCallback(t=>{let n=e.map(e=>{if(e!=null){if(typeof e==`function`){let n=e,r=n(t);return typeof r==`function`?r:()=>{n(null)}}return e.current=t,()=>{e.current=null}}});return()=>{n.forEach(e=>e?.())}},e);return B.useMemo(()=>e.every(e=>e==null)?null:e=>{t.current&&=(t.current(),void 0),e!=null&&(t.current=n(e))},e)}var Yr=`data-floating-ui-focusable`,Xr=`active`,Zr=`selected`,Qr=`ArrowLeft`,$r=`ArrowRight`,ei=`ArrowUp`,ti=`ArrowDown`,ni=[Qr,$r],ri=[ei,ti];[...ni,...ri];var ii={...B},ai=!1,oi=0,si=()=>`floating-ui-`+Math.random().toString(36).slice(2,6)+oi++;function ci(){let[e,t]=B.useState(()=>ai?si():void 0);return K(()=>{e??t(si())},[]),B.useEffect(()=>{ai=!0},[]),e}var li=ii.useId||ci;function ui(){let e=new Map;return{emit(t,n){var r;(r=e.get(t))==null||r.forEach(e=>e(n))},on(t,n){e.has(t)||e.set(t,new Set),e.get(t).add(n)},off(t,n){var r;(r=e.get(t))==null||r.delete(n)}}}var di=B.createContext(null),fi=B.createContext(null),pi=()=>B.useContext(di)?.id||null,mi=()=>B.useContext(fi);function hi(e){return`data-floating-ui-`+e}function Z(e){e.current!==-1&&(clearTimeout(e.current),e.current=-1)}var gi=hi(`safe-polygon`);function _i(e,t,n){if(n&&!Or(n))return 0;if(typeof e==`number`)return e;if(typeof e==`function`){let n=e();return typeof n==`number`?n:n?.[t]}return e?.[t]}function vi(e){return typeof e==`function`?e():e}function yi(e,t){t===void 0&&(t={});let{open:n,onOpenChange:r,dataRef:i,events:a,elements:o}=e,{enabled:s=!0,delay:c=0,handleClose:l=null,mouseOnly:u=!1,restMs:d=0,move:f=!0}=t,p=mi(),m=pi(),h=q(l),g=q(c),_=q(n),v=q(d),y=B.useRef(),b=B.useRef(-1),x=B.useRef(),S=B.useRef(-1),C=B.useRef(!0),w=B.useRef(!1),E=B.useRef(()=>{}),D=B.useRef(!1),O=J(()=>{let e=i.current.openEvent?.type;return e?.includes(`mouse`)&&e!==`mousedown`});B.useEffect(()=>{if(!s)return;function e(e){let{open:t}=e;t||(Z(b),Z(S),C.current=!0,D.current=!1)}return a.on(`openchange`,e),()=>{a.off(`openchange`,e)}},[s,a]),B.useEffect(()=>{if(!s||!h.current||!n)return;function e(e){O()&&r(!1,e,`hover`)}let t=W(o.floating).documentElement;return t.addEventListener(`mouseleave`,e),()=>{t.removeEventListener(`mouseleave`,e)}},[o.floating,n,r,s,h,O]);let k=B.useCallback(function(e,t,n){t===void 0&&(t=!0),n===void 0&&(n=`hover`);let i=_i(g.current,`close`,y.current);i&&!x.current?(Z(b),b.current=window.setTimeout(()=>r(!1,e,n),i)):t&&(Z(b),r(!1,e,n))},[g,r]),A=J(()=>{E.current(),x.current=void 0}),j=J(()=>{if(w.current){let e=W(o.floating).body;e.style.pointerEvents=``,e.removeAttribute(gi),w.current=!1}}),M=J(()=>i.current.openEvent?[`click`,`mousedown`].includes(i.current.openEvent.type):!1);B.useEffect(()=>{if(!s)return;function e(e){if(Z(b),C.current=!1,u&&!Or(y.current)||vi(v.current)>0&&!_i(g.current,`open`))return;let t=_i(g.current,`open`,y.current);t?b.current=window.setTimeout(()=>{_.current||r(!0,e,`hover`)},t):n||r(!0,e,`hover`)}function t(e){if(M()){j();return}E.current();let t=W(o.floating);if(Z(S),D.current=!1,h.current&&i.current.floatingContext){n||Z(b),x.current=h.current({...i.current.floatingContext,tree:p,x:e.clientX,y:e.clientY,onClose(){j(),A(),M()||k(e,!0,`safe-polygon`)}});let r=x.current;t.addEventListener(`mousemove`,r),E.current=()=>{t.removeEventListener(`mousemove`,r)}}else y.current===`touch`&&U(o.floating,e.relatedTarget)||k(e)}function a(e){M()||i.current.floatingContext&&(h.current==null||h.current({...i.current.floatingContext,tree:p,x:e.clientX,y:e.clientY,onClose(){j(),A(),M()||k(e)}})(e))}function c(){Z(b)}function l(e){M()||k(e,!1)}if(T(o.domReference)){let r=o.domReference,i=o.floating;return n&&r.addEventListener(`mouseleave`,a),f&&r.addEventListener(`mousemove`,e,{once:!0}),r.addEventListener(`mouseenter`,e),r.addEventListener(`mouseleave`,t),i&&(i.addEventListener(`mouseleave`,a),i.addEventListener(`mouseenter`,c),i.addEventListener(`mouseleave`,l)),()=>{n&&r.removeEventListener(`mouseleave`,a),f&&r.removeEventListener(`mousemove`,e),r.removeEventListener(`mouseenter`,e),r.removeEventListener(`mouseleave`,t),i&&(i.removeEventListener(`mouseleave`,a),i.removeEventListener(`mouseenter`,c),i.removeEventListener(`mouseleave`,l))}}},[o,s,e,u,f,k,A,j,r,n,_,p,g,h,i,M,v]),K(()=>{var e;if(s&&n&&(e=h.current)!=null&&(e=e.__options)!=null&&e.blockPointerEvents&&O()){w.current=!0;let e=o.floating;if(T(o.domReference)&&e){var t;let n=W(o.floating).body;n.setAttribute(gi,``);let r=o.domReference,i=p==null||(t=p.nodesRef.current.find(e=>e.id===m))==null||(t=t.context)==null?void 0:t.elements.floating;return i&&(i.style.pointerEvents=``),n.style.pointerEvents=`none`,r.style.pointerEvents=`auto`,e.style.pointerEvents=`auto`,()=>{n.style.pointerEvents=``,r.style.pointerEvents=``,e.style.pointerEvents=``}}}},[s,n,m,o,p,h,O]),K(()=>{n||(y.current=void 0,D.current=!1,A(),j())},[n,A,j]),B.useEffect(()=>()=>{A(),Z(b),Z(S),j()},[s,o.domReference,A,j]);let N=B.useMemo(()=>{function e(e){y.current=e.pointerType}return{onPointerDown:e,onPointerEnter:e,onMouseMove(e){let{nativeEvent:t}=e;function i(){!C.current&&!_.current&&r(!0,t,`hover`)}u&&!Or(y.current)||n||vi(v.current)===0||D.current&&e.movementX**2+e.movementY**2<2||(Z(S),y.current===`touch`?i():(D.current=!0,S.current=window.setTimeout(i,vi(v.current))))}}},[u,r,n,_,v]);return B.useMemo(()=>s?{reference:N}:{},[s,N])}var bi=B.createContext({hasProvider:!1,timeoutMs:0,delayRef:{current:0},initialDelayRef:{current:0},timeoutIdRef:{current:-1},currentIdRef:{current:null},currentContextRef:{current:null}});function xi(e){let{children:t,delay:n,timeoutMs:r=0}=e,i=B.useRef(n),a=B.useRef(n),o=B.useRef(null),s=B.useRef(null),c=B.useRef(-1);return(0,X.jsx)(bi.Provider,{value:B.useMemo(()=>({hasProvider:!0,delayRef:i,initialDelayRef:a,currentIdRef:o,timeoutMs:r,currentContextRef:s,timeoutIdRef:c}),[r]),children:t})}function Si(e,t){t===void 0&&(t={});let{open:n,onOpenChange:r,floatingId:i}=e,{enabled:a=!0}=t,{currentIdRef:o,delayRef:s,timeoutMs:c,initialDelayRef:l,currentContextRef:u,hasProvider:d,timeoutIdRef:f}=B.useContext(bi),[p,m]=B.useState(!1);return K(()=>{function e(){var e;m(!1),(e=u.current)==null||e.setIsInstantPhase(!1),o.current=null,u.current=null,s.current=l.current}if(a&&o.current&&!n&&o.current===i){if(m(!1),c)return f.current=window.setTimeout(e,c),()=>{clearTimeout(f.current)};e()}},[a,n,i,o,s,c,l,u,f]),K(()=>{if(!a||!n)return;let e=u.current,t=o.current;u.current={onOpenChange:r,setIsInstantPhase:m},o.current=i,s.current={open:0,close:_i(l.current,`close`)},t!==null&&t!==i?(Z(f),m(!0),e?.setIsInstantPhase(!0),e?.onOpenChange(!1)):(m(!1),e?.setIsInstantPhase(!1))},[a,n,i,r,o,s,c,l,u,f]),K(()=>()=>{u.current=null},[u]),B.useMemo(()=>({hasProvider:d,delayRef:s,isInstantPhase:p}),[d,s,p])}var Ci=0;function wi(e,t){t===void 0&&(t={});let{preventScroll:n=!1,cancelPrevious:r=!0,sync:i=!1}=t;r&&cancelAnimationFrame(Ci);let a=()=>e?.focus({preventScroll:n});i?a():Ci=requestAnimationFrame(a)}function Ti(e){return e?.ownerDocument||document}var Ei={inert:new WeakMap,"aria-hidden":new WeakMap,none:new WeakMap};function Di(e){return e===`inert`?Ei.inert:e===`aria-hidden`?Ei[`aria-hidden`]:Ei.none}var Oi=new WeakSet,ki={},Ai=0,ji=()=>typeof HTMLElement<`u`&&`inert`in HTMLElement.prototype;function Mi(e){return e?Oe(e)?e.host:Mi(e.parentNode):null}var Ni=(e,t)=>t.map(t=>{if(e.contains(t))return t;let n=Mi(t);return e.contains(n)?n:null}).filter(e=>e!=null);function Pi(e,t,n,r){let i=`data-floating-ui-inert`,a=r?`inert`:n?`aria-hidden`:null,o=Ni(t,e),s=new Set,c=new Set(o),l=[];ki[i]||(ki[i]=new WeakMap);let u=ki[i];o.forEach(d),f(t),s.clear();function d(e){e&&!s.has(e)&&(s.add(e),e.parentNode&&d(e.parentNode))}function f(e){e&&!c.has(e)&&[].forEach.call(e.children,e=>{if(ye(e)!==`script`){if(s.has(e))f(e);else{let t=a?e.getAttribute(a):null,n=t!==null&&t!==`false`,r=Di(a),o=(r.get(e)||0)+1,s=(u.get(e)||0)+1;r.set(e,o),u.set(e,s),l.push(e),o===1&&n&&Oi.add(e),s===1&&e.setAttribute(i,``),!n&&a&&e.setAttribute(a,a===`inert`?``:`true`)}}})}return Ai++,()=>{l.forEach(e=>{let t=Di(a),n=(t.get(e)||0)-1,r=(u.get(e)||0)-1;t.set(e,n),u.set(e,r),n||(!Oi.has(e)&&a&&e.removeAttribute(a),Oi.delete(e)),r||e.removeAttribute(i)}),Ai--,Ai||(Ei.inert=new WeakMap,Ei[`aria-hidden`]=new WeakMap,Ei.none=new WeakMap,Oi=new WeakSet,ki={})}}function Fi(e,t,n){t===void 0&&(t=!1),n===void 0&&(n=!1);let r=Ti(e[0]).body;return Pi(e.concat(Array.from(r.querySelectorAll(`[aria-live],[role="status"],output`))),r,t,n)}var Ii={border:0,clip:`rect(0 0 0 0)`,height:`1px`,margin:`-1px`,overflow:`hidden`,padding:0,position:`fixed`,whiteSpace:`nowrap`,width:`1px`,top:0,left:0},Li=B.forwardRef(function(e,t){let[n,r]=B.useState();K(()=>{ir()&&r(`button`)},[]);let i={ref:t,tabIndex:0,role:n,"aria-hidden":!n||void 0,[hi(`focus-guard`)]:``,style:Ii};return(0,X.jsx)(`span`,{...e,...i})}),Ri={clipPath:`inset(50%)`,position:`fixed`,top:0,left:0},zi=B.createContext(null),Bi=hi(`portal`);function Vi(e){e===void 0&&(e={});let{id:t,root:n}=e,r=li(),i=Ui(),[a,o]=B.useState(null),s=B.useRef(null);return K(()=>()=>{a?.remove(),queueMicrotask(()=>{s.current=null})},[a]),K(()=>{if(!r||s.current)return;let e=t?document.getElementById(t):null;if(!e)return;let n=document.createElement(`div`);n.id=r,n.setAttribute(Bi,``),e.appendChild(n),s.current=n,o(n)},[t,r]),K(()=>{if(n===null||!r||s.current)return;let e=n||i?.portalNode;e&&!ne(e)&&(e=e.current),e||=document.body;let a=null;t&&(a=document.createElement(`div`),a.id=t,e.appendChild(a));let c=document.createElement(`div`);c.id=r,c.setAttribute(Bi,``),e=a||e,e.appendChild(c),s.current=c,o(c)},[t,n,r,i]),a}function Hi(e){let{children:t,id:n,root:r,preserveTabOrder:i=!0}=e,a=Vi({id:n,root:r}),[o,s]=B.useState(null),c=B.useRef(null),l=B.useRef(null),u=B.useRef(null),d=B.useRef(null),f=o?.modal,p=o?.open,m=!!o&&!o.modal&&o.open&&i&&!!(r||a);return B.useEffect(()=>{if(!a||!i||f)return;function e(e){a&&Wr(e)&&(e.type===`focusin`?Kr:Gr)(a)}return a.addEventListener(`focusin`,e,!0),a.addEventListener(`focusout`,e,!0),()=>{a.removeEventListener(`focusin`,e,!0),a.removeEventListener(`focusout`,e,!0)}},[a,i,f]),B.useEffect(()=>{a&&(p||Kr(a))},[p,a]),(0,X.jsxs)(zi.Provider,{value:B.useMemo(()=>({preserveTabOrder:i,beforeOutsideRef:c,afterOutsideRef:l,beforeInsideRef:u,afterInsideRef:d,portalNode:a,setFocusManagerState:s}),[i,a]),children:[m&&a&&(0,X.jsx)(Li,{"data-type":`outside`,ref:c,onFocus:e=>{if(Wr(e,a)){var t;(t=u.current)==null||t.focus()}else Ur(o?o.domReference:null)?.focus()}}),m&&a&&(0,X.jsx)(`span`,{"aria-owns":a.id,style:Ri}),a&&qr.createPortal(t,a),m&&a&&(0,X.jsx)(Li,{"data-type":`outside`,ref:l,onFocus:e=>{if(Wr(e,a)){var t;(t=d.current)==null||t.focus()}else Hr(o?o.domReference:null)?.focus(),o!=null&&o.closeOnFocusOut&&o?.onOpenChange(!1,e.nativeEvent,`focus-out`)}})]})}var Ui=()=>B.useContext(zi);function Wi(e){return B.useMemo(()=>t=>{e.forEach(e=>{e&&(e.current=t)})},e)}var Gi=20,Ki=[];function qi(){Ki=Ki.filter(e=>e.deref()?.isConnected)}function Ji(e){qi(),e&&ye(e)!==`body`&&(Ki.push(new WeakRef(e)),Ki.length>Gi&&(Ki=Ki.slice(-20)))}function Yi(){return qi(),Ki[Ki.length-1]?.deref()}function Xi(e){let t=Br();return tr(e,t)?e:$n(e,t)[0]||e}function Zi(e,t){var n;if(!t.current.includes(`floating`)&&!((n=e.getAttribute(`role`))!=null&&n.includes(`dialog`)))return;let r=Br(),i=er(e,r).filter(e=>{let t=e.getAttribute(`data-tabindex`)||``;return tr(e,r)||e.hasAttribute(`data-tabindex`)&&!t.startsWith(`-`)}),a=e.getAttribute(`tabindex`);t.current.includes(`floating`)||i.length===0?a!==`0`&&e.setAttribute(`tabindex`,`0`):(a!==`-1`||e.hasAttribute(`data-tabindex`)&&e.getAttribute(`data-tabindex`)!==`-1`)&&(e.setAttribute(`tabindex`,`-1`),e.setAttribute(`data-tabindex`,`-1`))}var Qi=B.forwardRef(function(e,t){return(0,X.jsx)(`button`,{...e,type:`button`,ref:t,tabIndex:-1,style:Ii})});function $i(e){let{context:t,children:n,disabled:r=!1,order:i=[`content`],guards:a=!0,initialFocus:o=0,returnFocus:s=!0,restoreFocus:c=!1,modal:l=!0,visuallyHiddenDismiss:u=!1,closeOnFocusOut:d=!0,outsideElementsInert:f=!1,getInsideElements:p=()=>[]}=e,{open:h,onOpenChange:g,events:_,dataRef:v,elements:{domReference:y,floating:b}}=t,x=J(()=>v.current.floatingContext?.nodeId),S=J(p),C=typeof o==`number`&&o<0,w=yr(y)&&C,T=ji(),E=!T||a,D=!E||T&&f,O=q(i),k=q(o),A=q(s),j=mi(),M=Ui(),N=B.useRef(null),P=B.useRef(null),F=B.useRef(!1),I=B.useRef(!1),ee=B.useRef(-1),te=B.useRef(-1),ne=M!=null,L=xr(b),R=J(function(e){return e===void 0&&(e=L),e?$n(e,Br()):[]}),z=J(e=>{let t=R(e);return O.current.map(e=>y&&e===`reference`?y:L&&e===`floating`?L:t).filter(Boolean).flat()});B.useEffect(()=>{if(r||!l)return;function e(e){if(e.key===`Tab`){U(L,mr(W(L)))&&R().length===0&&!w&&G(e);let t=z(),n=hr(e);O.current[0]===`reference`&&n===y&&(G(e),e.shiftKey?wi(t[t.length-1]):wi(t[1])),O.current[1]===`floating`&&n===L&&e.shiftKey&&(G(e),wi(t[0]))}}let t=W(L);return t.addEventListener(`keydown`,e),()=>{t.removeEventListener(`keydown`,e)}},[r,y,L,l,O,w,R,z]),B.useEffect(()=>{if(r||!b)return;function e(e){let t=hr(e),n=R().indexOf(t);n!==-1&&(ee.current=n)}return b.addEventListener(`focusin`,e),()=>{b.removeEventListener(`focusin`,e)}},[r,b,R]),B.useEffect(()=>{if(r||!d)return;function e(){I.current=!0,setTimeout(()=>{I.current=!1})}function t(e){let t=e.relatedTarget,n=e.currentTarget,r=hr(e);queueMicrotask(()=>{let i=x(),a=!(U(y,t)||U(b,t)||U(t,b)||U(M?.portalNode,t)||t!=null&&t.hasAttribute(hi(`focus-guard`))||j&&(Sr(j.nodesRef.current,i).find(e=>U(e.context?.elements.floating,t)||U(e.context?.elements.domReference,t))||wr(j.nodesRef.current,i).find(e=>[e.context?.elements.floating,xr(e.context?.elements.floating)].includes(t)||e.context?.elements.domReference===t)));if(n===y&&L&&Zi(L,O),c&&n!==y&&!(r!=null&&r.isConnected)&&mr(W(L))===W(L).body){m(L)&&L.focus();let e=ee.current,t=R(),n=t[e]||t[t.length-1]||L;m(n)&&n.focus()}v.current.insideReactTree?v.current.insideReactTree=!1:(w||!l)&&t&&a&&!I.current&&t!==Yi()&&(F.current=!0,g(!1,e,`focus-out`))})}let n=!(j||!M);function i(){Z(te),v.current.insideReactTree=!0,te.current=window.setTimeout(()=>{v.current.insideReactTree=!1})}if(b&&m(y))return y.addEventListener(`focusout`,t),y.addEventListener(`pointerdown`,e),b.addEventListener(`focusout`,t),n&&b.addEventListener(`focusout`,i,!0),()=>{y.removeEventListener(`focusout`,t),y.removeEventListener(`pointerdown`,e),b.removeEventListener(`focusout`,t),n&&b.removeEventListener(`focusout`,i,!0)}},[r,y,b,L,l,j,M,g,d,c,R,w,x,O,v]);let re=B.useRef(null),ie=B.useRef(null),ae=Wi([re,M?.beforeInsideRef]),oe=Wi([ie,M?.afterInsideRef]);B.useEffect(()=>{var e,t;if(r||!b)return;let n=Array.from((M==null||(e=M.portalNode)==null?void 0:e.querySelectorAll(`[`+hi(`portal`)+`]`))||[]),i=(t=(j?wr(j.nodesRef.current,x()):[]).find(e=>yr(e.context?.elements.domReference||null)))==null||(t=t.context)==null?void 0:t.elements.domReference,a=[b,i,...n,...S(),N.current,P.current,re.current,ie.current,M?.beforeOutsideRef.current,M?.afterOutsideRef.current,O.current.includes(`reference`)||w?y:null].filter(e=>e!=null),o=l||w?Fi(a,!D,D):Fi(a);return()=>{o()}},[r,y,b,l,O,M,w,E,D,j,x,S]),K(()=>{if(r||!m(L))return;let e=mr(W(L));queueMicrotask(()=>{let t=z(L),n=k.current,r=(typeof n==`number`?t[n]:n.current)||L,i=U(L,e);!C&&!i&&h&&wi(r,{preventScroll:r===L})})},[r,h,L,C,z,k]),K(()=>{if(r||!L)return;let e=W(L);Ji(mr(e));function t(e){let{reason:t,event:n,nested:r}=e;if([`hover`,`safe-polygon`].includes(t)&&n.type===`mouseleave`&&(F.current=!0),t===`outside-press`){if(r)F.current=!1;else if(Er(n)||Dr(n))F.current=!1;else{let e=!1;document.createElement(`div`).focus({get preventScroll(){return e=!0,!1}}),e?F.current=!1:F.current=!0}}}_.on(`openchange`,t);let n=e.createElement(`span`);n.setAttribute(`tabindex`,`-1`),n.setAttribute(`aria-hidden`,`true`),Object.assign(n.style,Ii),ne&&y&&y.insertAdjacentElement(`afterend`,n);function i(){if(typeof A.current==`boolean`){let e=y||Yi();return e&&e.isConnected?e:n}return A.current.current||n}return()=>{_.off(`openchange`,t);let r=mr(e),a=U(b,r)||j&&Sr(j.nodesRef.current,x(),!1).some(e=>U(e.context?.elements.floating,r)),o=i();queueMicrotask(()=>{let t=Xi(o);A.current&&!F.current&&m(t)&&(t===r||r===e.body||a)&&t.focus({preventScroll:!0}),n.remove()})}},[r,b,L,A,v,_,j,ne,y,x]),B.useEffect(()=>(queueMicrotask(()=>{F.current=!1}),()=>{queueMicrotask(qi)}),[r]),K(()=>{if(!r&&M)return M.setFocusManagerState({modal:l,closeOnFocusOut:d,open:h,onOpenChange:g,domReference:y}),()=>{M.setFocusManagerState(null)}},[r,M,l,h,g,d,y]),K(()=>{r||L&&Zi(L,O)},[r,L,O]);function se(e){return r||!u||!l?null:(0,X.jsx)(Qi,{ref:e===`start`?N:P,onClick:e=>g(!1,e.nativeEvent),children:typeof u==`string`?u:`Dismiss`})}let ce=!r&&E&&(!l||!w)&&(ne||l);return(0,X.jsxs)(X.Fragment,{children:[ce&&(0,X.jsx)(Li,{"data-type":`inside`,ref:ae,onFocus:e=>{if(l){let e=z();wi(i[0]===`reference`?e[0]:e[e.length-1])}else if(M!=null&&M.preserveTabOrder&&M.portalNode){if(F.current=!1,Wr(e,M.portalNode))Hr(y)?.focus();else{var t;(t=M.beforeOutsideRef.current)==null||t.focus()}}}}),!w&&se(`start`),n,se(`end`),ce&&(0,X.jsx)(Li,{"data-type":`inside`,ref:oe,onFocus:e=>{if(l)wi(z()[0]);else if(M!=null&&M.preserveTabOrder&&M.portalNode){if(d&&(F.current=!0),Wr(e,M.portalNode))Ur(y)?.focus();else{var t;(t=M.afterOutsideRef.current)==null||t.focus()}}}})]})}function ea(e){return m(e.target)&&e.target.tagName===`BUTTON`}function ta(e){return m(e.target)&&e.target.tagName===`A`}function na(e){return vr(e)}function ra(e,t){t===void 0&&(t={});let{open:n,onOpenChange:r,dataRef:i,elements:{domReference:a}}=e,{enabled:o=!0,event:s=`click`,toggle:c=!0,ignoreMouse:l=!1,keyboardHandlers:u=!0,stickIfOpen:d=!0}=t,f=B.useRef(),p=B.useRef(!1),m=B.useMemo(()=>({onPointerDown(e){f.current=e.pointerType},onMouseDown(e){let t=f.current;e.button===0&&s!==`click`&&(Or(t,!0)&&l||(n&&c&&(!(i.current.openEvent&&d)||i.current.openEvent.type===`mousedown`)?r(!1,e.nativeEvent,`click`):(e.preventDefault(),r(!0,e.nativeEvent,`click`))))},onClick(e){let t=f.current;s===`mousedown`&&f.current?f.current=void 0:Or(t,!0)&&l||(n&&c&&(!(i.current.openEvent&&d)||i.current.openEvent.type===`click`)?r(!1,e.nativeEvent,`click`):r(!0,e.nativeEvent,`click`))},onKeyDown(e){f.current=void 0,e.defaultPrevented||!u||ea(e)||(e.key===` `&&!na(a)&&(e.preventDefault(),p.current=!0),ta(e)||e.key===`Enter`&&r(!(n&&c),e.nativeEvent,`click`))},onKeyUp(e){e.defaultPrevented||!u||ea(e)||na(a)||e.key===` `&&p.current&&(p.current=!1,r(!(n&&c),e.nativeEvent,`click`))}}),[i,a,s,l,u,r,n,d,c]);return B.useMemo(()=>o?{reference:m}:{},[o,m])}var ia={pointerdown:`onPointerDown`,mousedown:`onMouseDown`,click:`onClick`},aa={pointerdown:`onPointerDownCapture`,mousedown:`onMouseDownCapture`,click:`onClickCapture`},oa=e=>({escapeKey:typeof e==`boolean`?e:e?.escapeKey??!1,outsidePress:typeof e==`boolean`?e:e?.outsidePress??!0});function sa(e,t){t===void 0&&(t={});let{open:r,onOpenChange:i,elements:a,dataRef:o}=e,{enabled:s=!0,escapeKey:c=!0,outsidePress:u=!0,outsidePressEvent:f=`pointerdown`,referencePress:p=!1,referencePressEvent:h=`pointerdown`,ancestorScroll:g=!1,bubbles:_,capture:v}=t,y=mi(),b=J(typeof u==`function`?u:()=>!1),x=typeof u==`function`?b:u,S=B.useRef(!1),{escapeKey:w,outsidePress:E}=oa(_),{escapeKey:D,outsidePress:O}=oa(v),k=B.useRef(!1),A=J(e=>{if(!r||!s||!c||e.key!==`Escape`||k.current)return;let t=o.current.floatingContext?.nodeId,n=y?Sr(y.nodesRef.current,t):[];if(!w&&(e.stopPropagation(),n.length>0)){let e=!0;if(n.forEach(t=>{var n;(n=t.context)!=null&&n.open&&!t.context.dataRef.current.__escapeKeyBubbles&&(e=!1)}),!e)return}i(!1,Tr(e)?e.nativeEvent:e,`escape-key`)}),j=J(e=>{var t;let n=()=>{var t;A(e),(t=hr(e))==null||t.removeEventListener(`keydown`,n)};(t=hr(e))==null||t.addEventListener(`keydown`,n)}),M=J(e=>{let t=o.current.insideReactTree;o.current.insideReactTree=!1;let r=S.current;if(S.current=!1,f===`click`&&r||t||typeof x==`function`&&!x(e))return;let s=hr(e),c=`[`+hi(`inert`)+`]`,l=W(a.floating).querySelectorAll(c),u=T(s)?s:null;for(;u&&!n(u);){let e=C(u);if(n(e)||!T(e))break;u=e}if(l.length&&T(s)&&!_r(s)&&!U(s,a.floating)&&Array.from(l).every(e=>!U(u,e)))return;if(m(s)&&F){let t=n(s),r=d(s),i=/auto|scroll/,a=t||i.test(r.overflowX),o=t||i.test(r.overflowY),c=a&&s.clientWidth>0&&s.scrollWidth>s.clientWidth,l=o&&s.clientHeight>0&&s.scrollHeight>s.clientHeight,u=r.direction===`rtl`,f=l&&(u?e.offsetX<=s.offsetWidth-s.clientWidth:e.offsetX>s.clientWidth),p=c&&e.offsetY>s.clientHeight;if(f||p)return}let p=o.current.floatingContext?.nodeId,h=y&&Sr(y.nodesRef.current,p).some(t=>gr(e,t.context?.elements.floating));if(gr(e,a.floating)||gr(e,a.domReference)||h)return;let g=y?Sr(y.nodesRef.current,p):[];if(g.length>0){let e=!0;if(g.forEach(t=>{var n;(n=t.context)!=null&&n.open&&!t.context.dataRef.current.__outsidePressBubbles&&(e=!1)}),!e)return}i(!1,e,`outside-press`)}),N=J(e=>{var t;let n=()=>{var t;M(e),(t=hr(e))==null||t.removeEventListener(f,n)};(t=hr(e))==null||t.addEventListener(f,n)});B.useEffect(()=>{if(!r||!s)return;o.current.__escapeKeyBubbles=w,o.current.__outsidePressBubbles=E;let e=-1;function t(e){i(!1,e,`ancestor-scroll`)}function n(){window.clearTimeout(e),k.current=!0}function u(){e=window.setTimeout(()=>{k.current=!1},ge()?5:0)}let d=W(a.floating);c&&(d.addEventListener(`keydown`,D?j:A,D),d.addEventListener(`compositionstart`,n),d.addEventListener(`compositionend`,u)),x&&d.addEventListener(f,O?N:M,O);let p=[];return g&&(T(a.domReference)&&(p=l(a.domReference)),T(a.floating)&&(p=p.concat(l(a.floating))),!T(a.reference)&&a.reference&&a.reference.contextElement&&(p=p.concat(l(a.reference.contextElement)))),p=p.filter(e=>e!==d.defaultView?.visualViewport),p.forEach(e=>{e.addEventListener(`scroll`,t)}),()=>{c&&(d.removeEventListener(`keydown`,D?j:A,D),d.removeEventListener(`compositionstart`,n),d.removeEventListener(`compositionend`,u)),x&&d.removeEventListener(f,O?N:M,O),p.forEach(e=>{e.removeEventListener(`scroll`,t)}),window.clearTimeout(e)}},[o,a,c,x,f,r,i,g,s,w,E,A,D,j,M,O,N]),B.useEffect(()=>{o.current.insideReactTree=!1},[o,x,f]);let P=B.useMemo(()=>({onKeyDown:A,...p&&{[ia[h]]:e=>{i(!1,e.nativeEvent,`reference-press`)},...h!==`click`&&{onClick(e){i(!1,e.nativeEvent,`reference-press`)}}}}),[A,i,p,h]),F=B.useMemo(()=>{function e(e){e.button===0&&(S.current=!0)}return{onKeyDown:A,onMouseDown:e,onMouseUp:e,[aa[f]]:()=>{o.current.insideReactTree=!0}}},[A,f,o]);return B.useMemo(()=>s?{reference:P,floating:F}:{},[s,P,F])}function ca(e){let{open:t=!1,onOpenChange:n,elements:r}=e,i=li(),a=B.useRef({}),[o]=B.useState(()=>ui()),s=pi()!=null,[c,l]=B.useState(r.reference),u=J((e,t,r)=>{a.current.openEvent=e?t:void 0,o.emit(`openchange`,{open:e,event:t,reason:r,nested:s}),n?.(e,t,r)}),d=B.useMemo(()=>({setPositionReference:l}),[]),f=B.useMemo(()=>({reference:c||r.reference||null,floating:r.floating||null,domReference:r.reference}),[c,r.reference,r.floating]);return B.useMemo(()=>({dataRef:a,open:t,onOpenChange:u,elements:f,events:o,floatingId:i,refs:d}),[t,u,f,o,i,d])}function la(e){let{elements:t,...n}=e===void 0?{}:e,{nodeId:r}=n,i=ca({...n,elements:{reference:t?.reference??null,floating:t?.floating??null}}),a=n.rootContext||i,o=a.elements,[s,c]=B.useState(null),[l,u]=B.useState(null),d=o?.domReference||s,f=B.useRef(null),p=mi();K(()=>{d&&(f.current=d)},[d]);let m=F({...n,elements:{...o,...l&&{reference:l}}}),h=B.useCallback(e=>{let t=T(e)?{getBoundingClientRect:()=>e.getBoundingClientRect(),getClientRects:()=>e.getClientRects(),contextElement:e}:e;u(t),m.refs.setReference(t)},[m.refs]),g=B.useCallback(e=>{(T(e)||e===null)&&(f.current=e,c(e)),(T(m.refs.reference.current)||m.refs.reference.current===null||e!==null&&!T(e))&&m.refs.setReference(e)},[m.refs]),_=B.useMemo(()=>({...m.refs,setReference:g,setPositionReference:h,domReference:f}),[m.refs,g,h]),v=B.useMemo(()=>({...m.elements,domReference:d}),[m.elements,d]),y=B.useMemo(()=>({...m,...a,refs:_,elements:v,nodeId:r}),[m,_,v,r,a]);return K(()=>{a.dataRef.current.floatingContext=y;let e=p?.nodesRef.current.find(e=>e.id===r);e&&(e.context=y)}),B.useMemo(()=>({...m,context:y,refs:_,elements:v}),[m,_,v,y])}function ua(){return or()&&ir()}function da(e,t){t===void 0&&(t={});let{open:n,onOpenChange:r,events:i,dataRef:a,elements:o}=e,{enabled:s=!0,visibleOnly:c=!0}=t,l=B.useRef(!1),u=B.useRef(-1),d=B.useRef(!0);B.useEffect(()=>{if(!s)return;let e=x(o.domReference);function t(){!n&&m(o.domReference)&&o.domReference===mr(W(o.domReference))&&(l.current=!0)}function r(){d.current=!0}function i(){d.current=!1}return e.addEventListener(`blur`,t),ua()&&(e.addEventListener(`keydown`,r,!0),e.addEventListener(`pointerdown`,i,!0)),()=>{e.removeEventListener(`blur`,t),ua()&&(e.removeEventListener(`keydown`,r,!0),e.removeEventListener(`pointerdown`,i,!0))}},[o.domReference,n,s]),B.useEffect(()=>{if(!s)return;function e(e){let{reason:t}=e;(t===`reference-press`||t===`escape-key`)&&(l.current=!0)}return i.on(`openchange`,e),()=>{i.off(`openchange`,e)}},[i,s]),B.useEffect(()=>()=>{Z(u)},[]);let f=B.useMemo(()=>({onMouseLeave(){l.current=!1},onFocus(e){if(l.current)return;let t=hr(e.nativeEvent);if(c&&T(t)){if(ua()&&!e.relatedTarget){if(!d.current&&!vr(t))return}else if(!br(t))return}r(!0,e.nativeEvent,`focus`)},onBlur(e){l.current=!1;let t=e.relatedTarget,n=e.nativeEvent,i=T(t)&&t.hasAttribute(hi(`focus-guard`))&&t.getAttribute(`data-type`)===`outside`;u.current=window.setTimeout(()=>{let e=mr(o.domReference?o.domReference.ownerDocument:document);!t&&e===o.domReference||U(a.current.floatingContext?.refs.floating.current,e)||U(o.domReference,e)||i||r(!1,n,`focus`)})}}),[a,o.domReference,r,c]);return B.useMemo(()=>s?{reference:f}:{},[s,f])}function fa(e,t,n){let r=new Map,i=n===`item`,a=e;if(i&&e){let{[Xr]:t,[Zr]:n,...r}=e;a=r}return{...n===`floating`&&{tabIndex:-1,[Yr]:``},...a,...t.map(t=>{let r=t?t[n]:null;return typeof r==`function`?e?r(e):null:r}).concat(e).reduce((e,t)=>(t&&Object.entries(t).forEach(t=>{let[n,a]=t;if(!(i&&[Xr,Zr].includes(n))){if(n.indexOf(`on`)===0){if(r.has(n)||r.set(n,[]),typeof a==`function`){var o;(o=r.get(n))==null||o.push(a),e[n]=function(){var e=[...arguments];return r.get(n)?.map(t=>t(...e)).find(e=>e!==void 0)}}}else e[n]=a}}),e),{})}}function pa(e){e===void 0&&(e=[]);let t=e.map(e=>e?.reference),n=e.map(e=>e?.floating),r=e.map(e=>e?.item),i=B.useCallback(t=>fa(t,e,`reference`),t),a=B.useCallback(t=>fa(t,e,`floating`),n),o=B.useCallback(t=>fa(t,e,`item`),r);return B.useMemo(()=>({getReferenceProps:i,getFloatingProps:a,getItemProps:o}),[i,a,o])}var ma=`Escape`;function ha(e,t,n){switch(e){case`vertical`:return t;case`horizontal`:return n;default:return t||n}}function ga(e,t){return ha(t,e===ei||e===ti,e===Qr||e===$r)}function _a(e,t,n){return ha(t,e===ti,n?e===Qr:e===$r)||e===`Enter`||e===` `||e===``}function va(e,t,n){return ha(t,n?e===Qr:e===$r,e===ti)}function ya(e,t,n,r){return t===`both`||t===`horizontal`&&r&&r>1?e===ma:ha(t,n?e===$r:e===Qr,e===ei)}function ba(e,t){let{open:n,onOpenChange:r,elements:i,floatingId:a}=e,{listRef:o,activeIndex:s,onNavigate:c=()=>{},enabled:l=!0,selectedIndex:u=null,allowEscape:d=!1,loop:f=!1,nested:p=!1,rtl:h=!1,virtual:g=!1,focusItemOnOpen:_=`auto`,focusItemOnHover:v=!0,openOnArrowKeyDown:y=!0,disabledIndices:b=void 0,orientation:x=`vertical`,parentOrientation:S,cols:C=1,scrollItemIntoView:w=!0,virtualItemRef:T,itemSizes:E,dense:D=!1}=t,O=q(xr(i.floating)),k=pi(),A=mi();K(()=>{e.dataRef.current.orientation=x},[e,x]);let j=J(()=>{c(P.current===-1?null:P.current)}),M=yr(i.domReference),N=B.useRef(_),P=B.useRef(u??-1),F=B.useRef(null),I=B.useRef(!0),ee=B.useRef(j),te=B.useRef(!!i.floating),ne=B.useRef(n),L=B.useRef(!1),R=B.useRef(!1),z=q(b),re=q(n),ie=q(w),ae=q(u),[oe,se]=B.useState(),[ce,le]=B.useState(),ue=J(()=>{function e(e){if(g){var t;(t=e.id)!=null&&t.endsWith(`-fui-option`)&&(e.id=a+`-`+Math.random().toString(16).slice(2,10)),se(e.id),A?.events.emit(`virtualfocus`,e),T&&(T.current=e)}else wi(e,{sync:L.current,preventScroll:!0})}let t=o.current[P.current],n=R.current;t&&e(t),(L.current?e=>e():requestAnimationFrame)(()=>{let r=o.current[P.current]||t;if(!r)return;t||e(r);let i=ie.current;i&&fe&&(n||!I.current)&&(r.scrollIntoView==null||r.scrollIntoView(typeof i==`boolean`?{block:`nearest`,inline:`nearest`}:i))})});K(()=>{l&&(n&&i.floating?N.current&&u!=null&&(R.current=!0,P.current=u,j()):te.current&&(P.current=-1,ee.current()))},[l,n,i.floating,u,j]),K(()=>{if(l&&n&&i.floating){if(s==null){if(L.current=!1,ae.current!=null)return;if(te.current&&(P.current=-1,ue()),(!ne.current||!te.current)&&N.current&&(F.current!=null||N.current===!0&&F.current==null)){let e=0,t=()=>{o.current[0]==null?(e<2&&(e?requestAnimationFrame:queueMicrotask)(t),e++):(P.current=F.current==null||_a(F.current,x,h)||p?Nr(o,z.current):Pr(o,z.current),F.current=null,j())};t()}}else Mr(o,s)||(P.current=s,ue(),R.current=!1)}},[l,n,i.floating,s,ae,p,o,x,h,j,ue,z]),K(()=>{var e;if(!l||i.floating||!A||g||!te.current)return;let t=A.nodesRef.current,n=(e=t.find(e=>e.id===k))==null||(e=e.context)==null?void 0:e.elements.floating,r=mr(W(i.floating)),a=t.some(e=>e.context&&U(e.context.elements.floating,r));n&&!a&&I.current&&n.focus({preventScroll:!0})},[l,i.floating,A,k,g]),K(()=>{if(!l||!A||!g||k)return;function e(e){le(e.id),T&&(T.current=e)}return A.events.on(`virtualfocus`,e),()=>{A.events.off(`virtualfocus`,e)}},[l,A,g,k,T]),K(()=>{ee.current=j,ne.current=n,te.current=!!i.floating}),K(()=>{n||(F.current=null,N.current=_)},[n,_]);let de=s!=null,fe=B.useMemo(()=>{function e(e){if(!re.current)return;let t=o.current.indexOf(e);t!==-1&&P.current!==t&&(P.current=t,j())}return{onFocus(t){let{currentTarget:n}=t;L.current=!0,e(n)},onClick:e=>{let{currentTarget:t}=e;return t.focus({preventScroll:!0})},onMouseMove(t){let{currentTarget:n}=t;L.current=!0,R.current=!1,v&&e(n)},onPointerLeave(e){let{pointerType:t}=e;if(I.current&&t!==`touch`&&(L.current=!0,v&&(P.current=-1,j(),!g))){var n;(n=O.current)==null||n.focus({preventScroll:!0})}}}},[re,O,v,o,j,g]),pe=B.useCallback(()=>{var e;return S??(A==null||(e=A.nodesRef.current.find(e=>e.id===k))==null||(e=e.context)==null||(e=e.dataRef)==null?void 0:e.current.orientation)},[k,A,S]),me=J(e=>{if(I.current=!1,L.current=!0,e.which===229||!re.current&&e.currentTarget===O.current)return;if(p&&ya(e.key,x,h,C)){ga(e.key,pe())||G(e),r(!1,e.nativeEvent,`list-navigation`),m(i.domReference)&&(g?A?.events.emit(`virtualfocus`,i.domReference):i.domReference.focus());return}let t=P.current,a=Nr(o,b),s=Pr(o,b);if(M||(e.key===`Home`&&(G(e),P.current=a,j()),e.key===`End`&&(G(e),P.current=s,j())),C>1){let t=E||Array.from({length:o.current.length},()=>({width:1,height:1})),n=Ir(t,C,D),r=n.findIndex(e=>e!=null&&!zr(o,e,b)),i=n.reduce((e,t,n)=>t!=null&&!zr(o,t,b)?n:e,-1),c=n[Fr({current:n.map(e=>e==null?null:o.current[e])},{event:e,orientation:x,loop:f,rtl:h,cols:C,disabledIndices:Rr([...(typeof b==`function`?null:b)||o.current.map((e,t)=>zr(o,t,b)?t:void 0),void 0],n),minIndex:r,maxIndex:i,prevIndex:Lr(P.current>s?a:P.current,t,n,C,e.key===ti?`bl`:e.key===(h?Qr:$r)?`tr`:`tl`),stopEvent:!0})];if(c!=null&&(P.current=c,j()),x===`both`)return}if(ga(e.key,x)){if(G(e),n&&!g&&mr(e.currentTarget.ownerDocument)===e.currentTarget){P.current=_a(e.key,x,h)?a:s,j();return}_a(e.key,x,h)?f?P.current=t>=s?d&&t!==o.current.length?-1:a:Y(o,{startingIndex:t,disabledIndices:b}):P.current=Math.min(s,Y(o,{startingIndex:t,disabledIndices:b})):f?P.current=t<=a?d&&t!==-1?o.current.length:s:Y(o,{startingIndex:t,decrement:!0,disabledIndices:b}):P.current=Math.max(a,Y(o,{startingIndex:t,decrement:!0,disabledIndices:b})),Mr(o,P.current)&&(P.current=-1),j()}}),he=B.useMemo(()=>g&&n&&de&&{"aria-activedescendant":ce||oe},[g,n,de,ce,oe]),ge=B.useMemo(()=>({"aria-orientation":x===`both`?void 0:x,...M?{}:he,onKeyDown:me,onPointerMove(){I.current=!0}}),[he,me,x,M]),_e=B.useMemo(()=>{function e(e){_===`auto`&&Er(e.nativeEvent)&&(N.current=!0)}function t(e){N.current=_,_===`auto`&&Dr(e.nativeEvent)&&(N.current=!0)}return{...he,onKeyDown(e){I.current=!1;let t=e.key.startsWith(`Arrow`),i=[`Home`,`End`].includes(e.key),a=t||i,s=va(e.key,x,h),c=ya(e.key,x,h,C),l=va(e.key,pe(),h),d=ga(e.key,x),f=(p?l:d)||e.key===`Enter`||e.key.trim()===``;if(g&&n){let t=A?.nodesRef.current.find(e=>e.parentId==null),n=A&&t?Cr(A.nodesRef.current,t.id):null;if(a&&n&&T){let t=new KeyboardEvent(`keydown`,{key:e.key,bubbles:!0});if(s||c){let r=n.context?.elements.domReference===e.currentTarget,i=c&&!r?n.context?.elements.domReference:s?o.current.find(e=>e?.id===oe):null;i&&(G(e),i.dispatchEvent(t),le(void 0))}if((d||i)&&n.context&&n.context.open&&n.parentId&&e.currentTarget!==n.context.elements.domReference){var m;G(e),(m=n.context.elements.domReference)==null||m.dispatchEvent(t);return}}return me(e)}if(n||y||!t){if(f){let t=ga(e.key,pe());F.current=p&&t?null:e.key}p?l&&(G(e),n?(P.current=Nr(o,z.current),j()):r(!0,e.nativeEvent,`list-navigation`)):d&&(u!=null&&(P.current=u),G(e),!n&&y?r(!0,e.nativeEvent,`list-navigation`):me(e),n&&j())}},onFocus(){n&&!g&&(P.current=-1,j())},onPointerDown:t,onPointerEnter:t,onMouseDown:e,onClick:e}},[oe,he,C,me,z,_,o,p,j,r,n,y,x,pe,h,u,A,g,T]);return B.useMemo(()=>l?{reference:_e,floating:ge,item:fe}:{},[l,_e,ge,fe])}var xa=new Map([[`select`,`listbox`],[`combobox`,`listbox`],[`label`,!1]]);function Sa(e,t){t===void 0&&(t={});let{open:n,elements:r,floatingId:i}=e,{enabled:a=!0,role:o=`dialog`}=t,s=li(),c=r.domReference?.id||s,l=B.useMemo(()=>xr(r.floating)?.id||i,[r.floating,i]),u=xa.get(o)??o,d=pi()!=null,f=B.useMemo(()=>u===`tooltip`||o===`label`?{[`aria-`+(o===`label`?`labelledby`:`describedby`)]:n?l:void 0}:{"aria-expanded":n?`true`:`false`,"aria-haspopup":u===`alertdialog`?`dialog`:u,"aria-controls":n?l:void 0,...u===`listbox`&&{role:`combobox`},...u===`menu`&&{id:c},...u===`menu`&&d&&{role:`menuitem`},...o===`select`&&{"aria-autocomplete":`none`},...o===`combobox`&&{"aria-autocomplete":`list`}},[u,l,d,n,c,o]),p=B.useMemo(()=>{let e={id:l,...u&&{role:u}};return u===`tooltip`||o===`label`?e:{...e,...u===`menu`&&{"aria-labelledby":c}}},[u,l,c,o]),m=B.useCallback(e=>{let{active:t,selected:n}=e,r={role:`option`,...t&&{id:l+`-fui-option`}};switch(o){case`select`:case`combobox`:return{...r,"aria-selected":n}}return{}},[l,o]);return B.useMemo(()=>a?{reference:f,floating:p,item:m}:{},[a,f,p,m])}function Ca(e,t){let[n,r]=B.useState(e);return e&&!n&&r(!0),B.useEffect(()=>{if(!e&&n){let e=setTimeout(()=>r(!1),t);return()=>clearTimeout(e)}},[e,n,t]),n}function wa(e,t){t===void 0&&(t={});let{open:n,elements:{floating:r}}=e,{duration:i=250}=t,a=(typeof i==`number`?i:i.close)||0,[o,s]=B.useState(`unmounted`),c=Ca(n,a);return!c&&o===`close`&&s(`unmounted`),K(()=>{if(r){if(n){s(`initial`);let e=requestAnimationFrame(()=>{qr.flushSync(()=>{s(`open`)})});return()=>{cancelAnimationFrame(e)}}s(`close`)}},[n,r]),{isMounted:c,status:o}}function Ta(e,t){let{open:n,dataRef:r}=e,{listRef:i,activeIndex:a,onMatch:o,onTypingChange:s,enabled:c=!0,findMatch:l=null,resetMs:u=750,ignoreKeys:d=[],selectedIndex:f=null}=t,p=B.useRef(-1),m=B.useRef(``),h=B.useRef(f??a??-1),g=B.useRef(null),_=J(o),v=J(s),y=q(l),b=q(d);K(()=>{n&&(Z(p),g.current=null,m.current=``)},[n]),K(()=>{n&&m.current===``&&(h.current=f??a??-1)},[n,f,a]);let x=J(e=>{e?r.current.typing||(r.current.typing=e,v(e)):r.current.typing&&(r.current.typing=e,v(e))}),S=J(e=>{function t(e,t,n){let r=y.current?y.current(t,n):t.find(e=>e?.toLocaleLowerCase().indexOf(n.toLocaleLowerCase())===0);return r?e.indexOf(r):-1}let r=i.current;if(m.current.length>0&&m.current[0]!==` `&&(t(r,r,m.current)===-1?x(!1):e.key===` `&&G(e)),r==null||b.current.includes(e.key)||e.key.length!==1||e.ctrlKey||e.metaKey||e.altKey)return;n&&e.key!==` `&&(G(e),x(!0)),r.every(e=>!e||e[0]?.toLocaleLowerCase()!==e[1]?.toLocaleLowerCase())&&m.current===e.key&&(m.current=``,h.current=g.current),m.current+=e.key,Z(p),p.current=window.setTimeout(()=>{m.current=``,h.current=g.current,x(!1)},u);let a=h.current,o=t(r,[...r.slice((a||0)+1),...r.slice(0,(a||0)+1)],m.current);o===-1?e.key!==` `&&(m.current=``,x(!1)):(_(o),g.current=o)}),C=B.useMemo(()=>({onKeyDown:S}),[S]),w=B.useMemo(()=>({onKeyDown:S,onKeyUp(e){e.key===` `&&x(!1)}}),[S,x]);return B.useMemo(()=>c?{reference:C,floating:w}:{},[c,C,w])}var Ea=`data-emdash-bubble-popup`,Da=B.createContext(null),Oa=B.createContext(!0);function ka(){let[e]=B.useState(()=>{if(typeof document>`u`)return null;let e=document.createElement(`div`);return e.className=`emdash-inline-ui`,e});return B.useLayoutEffect(()=>{if(e)return document.body.append(e),()=>e.remove()},[e]),e}function Aa(e,t){e.isConnected||(t.append(e),queueMicrotask(()=>{e.style.visibility===`hidden`&&e.remove()}))}function ja(e){return{name:`transformOrigin`,fn:({x:t,y:n,placement:r,rects:i,elements:a})=>{let o=a.reference.getBoundingClientRect(),s=e?.()??o,c=r.startsWith(`top`)?s.top:s.bottom;return{data:{x:i.reference.x+s.left+s.width/2-o.left-t,y:i.reference.y+c-o.top-n}}}}}function Ma(e){return e?{transformOrigin:`${e.x}px ${e.y}px`}:{}}function Na(e,t){B.useLayoutEffect(()=>{e&&t()},[e,t])}var Pa={open:400,close:0};function Fa({children:e}){return(0,X.jsx)(xi,{delay:Pa,timeoutMs:400,children:e})}function Ia(e){let t=B.useContext(Da),n=B.useContext(Oa),[r,i]=B.useState(!1),a=r&&n;B.useEffect(()=>{n||i(!1)},[n]);let s=B.useRef(null),{refs:c,floatingStyles:l,context:u,placement:d,middlewareData:f,isPositioned:p,update:m}=la({open:a,onOpenChange:i,placement:`top`,strategy:`fixed`,transform:!1,middleware:[M(10),_e({padding:8}),le({padding:8}),O({element:s}),ja()],whileElementsMounted:o});Na(a,m);let{delayRef:h,isInstantPhase:g,hasProvider:_}=Si(u),{getReferenceProps:v,getFloatingProps:y}=pa([yi(u,{delay:()=>_?h.current:Pa,mouseOnly:!0}),da(u,{visibleOnly:!0}),sa(u,{referencePress:!0})]),{isMounted:b,status:x}=wa(u,{duration:g||!n?0:150}),S=b?(0,X.jsx)(Hi,{root:t,children:(0,X.jsxs)(`div`,{ref:c.setFloating,style:{...l,...Ma(f.transformOrigin),visibility:p||x===`close`?void 0:`hidden`},className:`emdash-inline-ui-tooltip`,"data-status":x,"data-instant":g?``:void 0,dir:`auto`,"aria-hidden":`true`,...y(),children:[e,(0,X.jsxs)(`svg`,{ref:s,width:`20`,height:`10`,viewBox:`0 0 20 10`,className:`emdash-inline-ui-tooltip-arrow`,"data-side":d.startsWith(`bottom`)?`bottom`:`top`,style:{left:f.arrow?.x},children:[(0,X.jsx)(`path`,{className:`emdash-inline-ui-tooltip-arrow-fill`,d:`M9.66437 2.60207L4.80758 6.97318C4.07308 7.63423 3.11989 8 2.13172 8H0V10H20V8H18.5349C17.5468 8 16.5936 7.63423 15.8591 6.97318L11.0023 2.60207C10.622 2.2598 10.0447 2.25979 9.66437 2.60207Z`}),(0,X.jsx)(`path`,{className:`emdash-inline-ui-tooltip-arrow-shadow`,d:`M8.99542 1.85876C9.75604 1.17425 10.9106 1.17422 11.6713 1.85878L16.5281 6.22989C17.0789 6.72568 17.7938 7.00001 18.5349 7.00001L15.89 7L11.0023 2.60207C10.622 2.2598 10.0447 2.2598 9.66436 2.60207L4.77734 7L2.13171 7.00001C2.87284 7.00001 3.58774 6.72568 4.13861 6.22989L8.99542 1.85876Z`}),(0,X.jsx)(`path`,{className:`emdash-inline-ui-tooltip-arrow-stroke`,d:`M10.3333 3.34539L5.47654 7.71648C4.55842 8.54279 3.36693 9 2.13172 9H0V8H2.13172C3.11989 8 4.07308 7.63423 4.80758 6.97318L9.66437 2.60207C10.0447 2.25979 10.622 2.2598 11.0023 2.60207L15.8591 6.97318C16.5936 7.63423 17.5468 8 18.5349 8H20V9H18.5349C17.2998 9 16.1083 8.54278 15.1901 7.71648L10.3333 3.34539Z`})]})]})}):null;return{setReference:c.setReference,getReferenceProps:v,tooltip:S}}function La({label:e,active:t,onClick:n,children:r}){let{setReference:i,getReferenceProps:a,tooltip:o}=Ia(e);return(0,X.jsxs)(X.Fragment,{children:[(0,X.jsx)(`button`,{ref:i,type:`button`,className:`emdash-inline-ui-button`,"aria-label":e,"aria-pressed":t,...a({onMouseDown:e=>e.preventDefault(),onClick:n}),children:r}),o]})}function Ra({label:e,icon:t,tooltip:n,pressed:r,expanded:i,buttonRef:a,onClick:o}){let{setReference:s,getReferenceProps:c,tooltip:l}=Ia(n??e),u=Jr([s,a]),d=B.useId();return(0,X.jsxs)(X.Fragment,{children:[(0,X.jsxs)(`button`,{ref:u,type:`button`,className:`emdash-inline-ui-trigger emdash-inline-ui-text-button`,"aria-pressed":r,"aria-haspopup":i===void 0?void 0:`dialog`,"aria-expanded":i,"aria-describedby":n===void 0?void 0:d,"data-open":i?``:void 0,...c({onMouseDown:e=>e.preventDefault(),onClick:o}),children:[t,(0,X.jsx)(`span`,{className:`emdash-inline-ui-text-button-label`,children:e}),n!==void 0&&(0,X.jsx)(`span`,{id:d,"aria-hidden":`true`,className:`emdash-inline-ui-sr-only`,children:n})]}),n===void 0?null:l]})}function za(){return(0,X.jsx)(`div`,{"aria-hidden":`true`,className:`emdash-inline-ui-separator`})}function Ba({editor:e,label:t,open:n,onOpenChange:r,placement:i,iconOnly:a,trigger:s,groups:c}){let l=B.useContext(Da),u=B.useRef([]),d=B.useRef([]),[f,p]=B.useState(null),m=B.useRef(null),h=()=>{e.isDestroyed||e.view.focus()},{refs:g,floatingStyles:_,context:v,middlewareData:y,isPositioned:b,update:x}=la({open:n,onOpenChange:(e,t,n)=>{r(e),!e&&n===`escape-key`&&h()},placement:i,strategy:`fixed`,transform:!1,middleware:[M(4),_e({padding:8}),le({padding:8}),ke({padding:8,apply:({availableHeight:e,elements:t})=>{t.floating.style.maxHeight=`${Math.min(416,Math.max(0,e))}px`}}),ja(()=>m.current?.getBoundingClientRect()??new DOMRect)],whileElementsMounted:o});B.useLayoutEffect(()=>{let e=m.current?.closest(`[role="toolbar"]`)?.parentElement;if(!e)return;let t=new DOMRect;g.setPositionReference({contextElement:e,getBoundingClientRect:()=>(e.isConnected&&(t=e.getBoundingClientRect()),t)})},[g]),Na(n,x);let S=Jr([g.setReference,m]),{isMounted:C,status:w}=wa(v,{duration:{open:100,close:75}}),{getReferenceProps:T,getFloatingProps:E,getItemProps:D}=pa([ra(v),sa(v),Sa(v,{role:`menu`}),ba(v,{listRef:u,activeIndex:f,onNavigate:p,loop:!0}),Ta(v,{listRef:d,activeIndex:f,onMatch:n?p:void 0})]),O=0;return(0,X.jsxs)(X.Fragment,{children:[(0,X.jsx)(`button`,{ref:S,type:`button`,className:`emdash-inline-ui-trigger`,"aria-label":t,"data-icon-only":a?``:void 0,"data-open":n?``:void 0,...T({onMouseDown:e=>e.preventDefault()}),children:s}),C&&(0,X.jsx)(Hi,{root:l,children:(0,X.jsx)($i,{context:v,modal:!1,returnFocus:!1,disabled:w===`close`,children:(0,X.jsx)(`div`,{ref:g.setFloating,style:{..._,...Ma(y.transformOrigin),visibility:b||w===`close`?void 0:`hidden`},className:`emdash-inline-ui-menu`,"data-status":w,"data-emdash-bubble-popup":``,...E({onKeyDown:e=>{e.key===`Tab`&&(e.preventDefault(),r(!1),h())}}),children:c.map((e,t)=>(0,X.jsxs)(B.Fragment,{children:[t>0&&(0,X.jsx)(`div`,{role:`separator`,className:`emdash-inline-ui-menu-separator`}),(0,X.jsxs)(`div`,{role:`group`,"aria-label":e.label,children:[e.label&&(0,X.jsx)(`div`,{"aria-hidden":`true`,className:`emdash-inline-ui-menu-label`,children:e.label}),e.items.map(e=>{let t=O++;return(0,X.jsxs)(`button`,{ref:n=>{u.current[t]=n,d.current[t]=e.label},type:`button`,role:e.role??`menuitem`,"aria-checked":e.role?e.checked===!0:void 0,disabled:e.disabled,tabIndex:f===t?0:-1,className:`emdash-inline-ui-menu-item`,"data-highlighted":f===t?``:void 0,...D({onClick:()=>{r(!1),e.onSelect()}}),children:[(0,X.jsx)(e.icon,{className:`emdash-inline-ui-menu-icon`,"aria-hidden":`true`}),(0,X.jsx)(`span`,{className:`emdash-inline-ui-menu-text`,children:e.label}),e.checked&&(0,X.jsx)(et,{className:`emdash-inline-ui-menu-check`,"aria-hidden":`true`})]},e.label)})]})]},e.label??t))})})})]})}var Va=`button:not([disabled]), a[href], input`;function Ha(e,t){B.useEffect(()=>{let n=e.view.dom,r=e=>{if(e.key!==`Tab`||e.shiftKey||e.altKey||e.ctrlKey||e.metaKey||e.defaultPrevented||e.isComposing)return;let n=t.querySelector(`[role="toolbar"]`)?.querySelector(Va);n&&(e.preventDefault(),n.focus())};return n.addEventListener(`keydown`,r),()=>n.removeEventListener(`keydown`,r)},[e,t])}var Ua=`a[href], button, input, select, textarea, [tabindex], [contenteditable="true"]`;function Wa(e){let t=e.view.dom;for(let e of document.querySelectorAll(Ua))if(!(e.tabIndex<0||t.contains(e)||e.closest(`.emdash-inline-ui`))&&t.compareDocumentPosition(e)&Node.DOCUMENT_POSITION_FOLLOWING&&(e.focus(),document.activeElement===e))return!0;return!1}function Ga(e,t){if(e.nativeEvent.isComposing||e.defaultPrevented)return;let n=e.currentTarget,r=[...n.querySelectorAll(Va)];if(e.key===`Escape`||e.key===`Tab`&&e.shiftKey&&document.activeElement===r[0]){e.preventDefault(),t.isDestroyed||t.view.focus();return}if(e.key===`Tab`&&!e.shiftKey&&document.activeElement===r.at(-1)&&Wa(t)){e.preventDefault();return}let i=[...n.querySelectorAll(`button:not([disabled]), a[href]`)].filter(e=>e.getClientRects().length>0),a=i.findIndex(e=>e===document.activeElement);if(a===-1)return;let o=getComputedStyle(n).direction===`rtl`?-1:1,s;switch(e.key){case`ArrowRight`:s=a+o;break;case`ArrowLeft`:s=a-o;break;case`Home`:s=0;break;case`End`:s=i.length-1;break;default:return}e.preventDefault(),i[(s+i.length)%i.length]?.focus()}function Ka(e){if(!(e instanceof HTMLElement)||typeof e.animate!=`function`)return;let t=window.matchMedia(`(prefers-reduced-motion: reduce)`).matches;e.animate(t?[{opacity:0},{opacity:1}]:[{opacity:0,transform:`translateY(2px) scale(0.98)`},{opacity:1,transform:`none`}],{duration:120,easing:`cubic-bezier(0.23, 1, 0.32, 1)`})}var qa=`
	@property --emdash-inline-ui-fade-start {
		syntax: "<length>";
		inherits: false;
		initial-value: 0px;
	}
	@property --emdash-inline-ui-fade-end {
		syntax: "<length>";
		inherits: false;
		initial-value: 0px;
	}
	@keyframes emdash-inline-ui-scroll-fade {
		0% { --emdash-inline-ui-fade-start: 0px; }
		10%, 100% { --emdash-inline-ui-fade-start: 24px; }
		0%, 90% { --emdash-inline-ui-fade-end: 24px; }
		100% { --emdash-inline-ui-fade-end: 0px; }
	}
	@keyframes emdash-inline-ui-menu-in {
		from { opacity: 0; scale: 0.97; }
	}
	@keyframes emdash-inline-ui-tooltip-in {
		from { opacity: 0; scale: 0.9; }
	}
	.emdash-inline-ui {
		position: absolute;
		inset-block-start: 0;
		inset-inline-start: 0;
		z-index: 1000000;
		color-scheme: light dark;
		--emdash-ui-surface: light-dark(#fff, oklch(20.5% 0 0));
		--emdash-ui-raised: light-dark(#fff, oklch(17% 0 0));
		--emdash-ui-text: light-dark(#1d2327, oklch(97% 0 0));
		--emdash-ui-subtle: light-dark(#646970, oklch(70.8% 0 0));
		--emdash-ui-placeholder: light-dark(oklch(70.8% 0 0), oklch(55.6% 0 0));
		--emdash-ui-tint: light-dark(#f0f0f1, oklch(26.9% 0 0));
		--emdash-ui-line: light-dark(oklch(14.5% 0 0 / 0.1), oklch(32% 0 0));
		--emdash-ui-hairline: light-dark(oklch(93.5% 0 0), oklch(26.9% 0 0));
		--emdash-ui-fill: light-dark(#dcdcde, oklch(26.9% 0 0));
		--emdash-ui-link: light-dark(oklch(42.4% 0.199 265.638), oklch(70.7% 0.165 254.624));
		--emdash-ui-danger: light-dark(oklch(50.5% 0.213 27.518), oklch(70.4% 0.191 22.216));
		--emdash-ui-danger-ring: light-dark(oklch(63.7% 0.237 25.331), oklch(57.7% 0.245 27.325));
		--emdash-ui-focus: light-dark(oklch(15% 0 0), oklch(93.5% 0 0));
		--emdash-ui-brand: light-dark(oklch(57.72% 0.2324 260), oklch(51.948% 0.2324 260));
		--emdash-ui-tip-shadow: light-dark(oklch(92.8% 0.006 264.531), transparent);
		--emdash-ui-tip-stroke: light-dark(transparent, oklch(26.9% 0 0));
		--emdash-ui-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
		color: var(--emdash-ui-text);
		font-family: ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
			"Segoe UI Symbol", "Noto Color Emoji";
		font-size: 14px;
		font-style: normal;
		font-weight: 400;
		line-height: 20px;
		letter-spacing: normal;
		text-align: start;
		text-transform: none;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}
	.emdash-inline-ui :where(*, *::before, *::after) {
		box-sizing: border-box;
	}
	.emdash-inline-ui :where(button, input, a) {
		min-width: 0;
		min-height: 0;
		margin: 0;
		font: inherit;
		color: inherit;
		letter-spacing: inherit;
		text-decoration: none;
		text-shadow: none;
		text-transform: none;
	}
	.emdash-inline-ui :where(svg) {
		display: block;
		flex: none;
	}
	.emdash-inline-ui-bar,
	.emdash-inline-ui-menu,
	.emdash-inline-ui .emdash-slash-menu {
		border-radius: 10px;
		background: var(--emdash-ui-surface);
		box-shadow: 0 0 0 1px var(--emdash-ui-line), var(--emdash-ui-shadow);
	}
	.emdash-inline-ui-bar {
		display: flex;
		max-width: 100%;
		align-items: center;
		gap: 2px;
		padding: 4px;
	}
	.emdash-inline-ui-toolbar {
		display: flex;
		min-width: 0;
		align-items: center;
		gap: 2px;
		margin: -4px;
		padding: 4px;
		overflow-x: auto;
		scroll-padding-inline: 4px;
		border-radius: inherit;
		scrollbar-width: none;
		animation: emdash-inline-ui-scroll-fade linear;
		animation-timeline: scroll(self inline);
		mask-image: linear-gradient(
			to var(--emdash-inline-ui-fade-direction, right),
			transparent,
			black var(--emdash-inline-ui-fade-start),
			black calc(100% - var(--emdash-inline-ui-fade-end)),
			transparent
		);
	}
	.emdash-inline-ui-toolbar:dir(rtl) {
		--emdash-inline-ui-fade-direction: left;
	}
	.emdash-inline-ui-toolbar::-webkit-scrollbar {
		display: none;
	}
	.emdash-inline-ui-button,
	.emdash-inline-ui-trigger {
		display: inline-flex;
		flex: none;
		height: 32px;
		align-items: center;
		justify-content: center;
		gap: 4px;
		padding: 0;
		border: 0;
		border-radius: 6px;
		background: transparent;
		color: var(--emdash-ui-text);
		cursor: pointer;
		outline: none;
		box-shadow: none;
		font-size: 14px;
		line-height: 20px;
		-webkit-tap-highlight-color: transparent;
	}
	.emdash-inline-ui-button {
		width: 32px;
	}
	.emdash-inline-ui-trigger {
		padding-inline: 8px;
		cursor: default;
	}
	.emdash-inline-ui-trigger[data-icon-only] {
		width: 32px;
		padding-inline: 0;
	}
	.emdash-inline-ui-button:hover,
	.emdash-inline-ui-trigger:hover,
	.emdash-inline-ui-trigger[data-open] {
		background: var(--emdash-ui-tint);
	}
	.emdash-inline-ui-button[aria-pressed="true"],
	.emdash-inline-ui-trigger[aria-pressed="true"] {
		background: var(--emdash-ui-tint);
		color: var(--emdash-ui-link);
	}
	.emdash-inline-ui-text-button {
		gap: 6px;
		cursor: pointer;
	}
	.emdash-inline-ui-text-button > svg {
		width: 16px;
		height: 16px;
	}
	.emdash-inline-ui-button:focus-visible {
		box-shadow: 0 0 0 2px var(--emdash-ui-brand);
	}
	.emdash-inline-ui-trigger:focus-visible,
	.emdash-inline-ui-link-url:focus-visible {
		box-shadow: 0 0 0 2px color-mix(in oklch, var(--emdash-ui-focus) 50%, transparent);
	}
	.emdash-inline-ui-button svg,
	.emdash-inline-ui-trigger > svg:only-child {
		width: 16px;
		height: 16px;
	}
	.emdash-inline-ui-trigger-label {
		max-width: 128px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.emdash-inline-ui-caret {
		width: 12px;
		height: 12px;
		color: var(--emdash-ui-subtle);
	}
	.emdash-inline-ui-separator {
		flex: none;
		width: 1px;
		height: 20px;
		margin-inline: 2px;
		background: var(--emdash-ui-hairline);
	}
	.emdash-inline-ui-link-edit {
		display: flex;
		min-width: 0;
		align-items: flex-start;
		gap: 4px;
	}
	.emdash-inline-ui-field {
		display: flex;
		min-width: 0;
		flex-direction: column;
		gap: 4px;
	}
	.emdash-inline-ui-field-row {
		display: flex;
		min-width: 0;
		align-items: center;
		gap: 4px;
	}
	.emdash-inline-ui-input {
		width: 288px;
		min-width: 0;
		max-width: 100%;
		height: 32px;
		padding: 0 12px;
		border: 0;
		border-radius: 8px;
		background: var(--emdash-ui-surface);
		box-shadow: 0 0 0 1px var(--emdash-ui-line);
		color: var(--emdash-ui-text);
		font-size: 14px;
		line-height: 20px;
		outline: none;
	}
	.emdash-inline-ui-input::placeholder {
		color: var(--emdash-ui-placeholder);
		opacity: 1;
	}
	.emdash-inline-ui-input:focus {
		box-shadow: 0 0 0 1.5px color-mix(in oklch, var(--emdash-ui-focus) 50%, transparent);
	}
	.emdash-inline-ui-input[aria-invalid="true"] {
		box-shadow: 0 0 0 1px var(--emdash-ui-danger-ring);
	}
	.emdash-inline-ui-input[aria-invalid="true"]:focus {
		box-shadow: 0 0 0 1.5px color-mix(in oklch, var(--emdash-ui-danger-ring) 50%, transparent);
	}
	.emdash-inline-ui-field-error {
		max-width: 288px;
		margin: 0;
		padding: 4px 8px;
		color: var(--emdash-ui-danger);
		font-size: 12px;
		line-height: 16px;
	}
	.emdash-inline-ui-link-preview {
		max-width: min(448px, calc(100vw - 16px));
	}
	.emdash-inline-ui-link-globe {
		width: 16px;
		height: 16px;
		margin-inline-start: 6px;
		color: var(--emdash-ui-subtle);
	}
	.emdash-inline-ui-link-url {
		min-width: 0;
		overflow: hidden;
		padding-inline: 6px;
		border-radius: 4px;
		color: var(--emdash-ui-link);
		font-size: 14px;
		outline: none;
		text-decoration: none;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.emdash-inline-ui-link-url:hover {
		text-decoration: underline;
	}
	span.emdash-inline-ui-link-url {
		color: var(--emdash-ui-subtle);
	}
	.emdash-inline-ui-menu {
		min-width: 224px;
		overflow-y: auto;
		overscroll-behavior: contain;
		padding: 4px;
		outline: none;
	}
	/*
	 * Entrances are animations: floating-ui leaves its opening status before
	 * the first paint, so a transition from it would never run. Exits are
	 * transitions, as the closing status keeps the element on the page.
	 */
	.emdash-inline-ui-menu,
	.emdash-inline-ui .emdash-slash-menu {
		animation: emdash-inline-ui-menu-in 100ms cubic-bezier(0, 0, 0.2, 1);
		transition: opacity 75ms cubic-bezier(0, 0, 0.2, 1);
	}
	.emdash-inline-ui-menu[data-status="close"],
	.emdash-inline-ui .emdash-slash-menu[data-status="close"] {
		opacity: 0;
		pointer-events: none;
	}
	.emdash-inline-ui-menu-label {
		padding: 6px 8px 2px;
		color: var(--emdash-ui-subtle);
		font-size: 12px;
		font-weight: 500;
		line-height: 16px;
		user-select: none;
	}
	.emdash-inline-ui-menu-separator {
		height: 1px;
		margin: 4px -4px;
		background: var(--emdash-ui-hairline);
	}
	.emdash-inline-ui-menu-item {
		display: flex;
		width: 100%;
		height: 32px;
		align-items: center;
		gap: 8px;
		padding: 0 8px;
		border: 0;
		border-radius: 6px;
		background: transparent;
		color: var(--emdash-ui-text);
		cursor: default;
		outline: none;
		text-align: start;
		user-select: none;
	}
	.emdash-inline-ui-menu-item[data-highlighted] {
		background: var(--emdash-ui-tint);
	}
	.emdash-inline-ui-menu-item:disabled {
		opacity: 0.5;
		pointer-events: none;
	}
	.emdash-inline-ui-menu-icon {
		width: 16px;
		height: 16px;
		color: var(--emdash-ui-subtle);
	}
	.emdash-inline-ui-menu-check {
		width: 16px;
		height: 16px;
	}
	.emdash-inline-ui-menu-text {
		min-width: 0;
		flex: 1;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.emdash-inline-ui-tooltip {
		padding: 6px 10px;
		border-radius: 6px;
		background: var(--emdash-ui-raised);
		box-shadow: 0 10px 15px -3px var(--emdash-ui-tip-shadow), 0 4px 6px -4px var(--emdash-ui-tip-shadow);
		color: var(--emdash-ui-text);
		font-size: 13px;
		line-height: calc(1 / 0.85);
		outline: 1px solid var(--emdash-ui-fill);
		pointer-events: none;
		width: max-content;
		max-width: min(288px, calc(100vw - 16px));
		overflow-wrap: break-word;
		animation: emdash-inline-ui-tooltip-in 150ms cubic-bezier(0.4, 0, 0.2, 1);
		transition-property: scale, opacity;
		transition-duration: 150ms;
		transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
	}
	.emdash-inline-ui-tooltip[data-status="close"] {
		scale: 0.9;
		opacity: 0;
	}
	.emdash-inline-ui-tooltip[data-instant] {
		animation: none;
		transition-duration: 0ms;
	}
	.emdash-inline-ui-tooltip-arrow {
		position: absolute;
		display: block;
	}
	.emdash-inline-ui-tooltip-arrow[data-side="top"] {
		bottom: -8px;
		rotate: 180deg;
	}
	.emdash-inline-ui-tooltip-arrow[data-side="bottom"] {
		top: -8px;
	}
	.emdash-inline-ui-tooltip-arrow-fill {
		fill: var(--emdash-ui-raised);
	}
	.emdash-inline-ui-tooltip-arrow-shadow {
		fill: var(--emdash-ui-tip-shadow);
	}
	.emdash-inline-ui-tooltip-arrow-stroke {
		fill: var(--emdash-ui-tip-stroke);
	}
	.emdash-inline-ui .emdash-slash-menu {
		display: flex;
		width: 320px;
		max-width: calc(100vw - 16px);
		flex-direction: column;
		overflow: hidden;
	}
	.emdash-slash-menu-viewport {
		min-height: 0;
		flex: 1;
		overflow-y: auto;
		overscroll-behavior: contain;
		padding: 4px;
		scroll-padding-block: 4px;
	}
	.emdash-slash-menu-group-label {
		padding: 6px 8px 2px;
		color: var(--emdash-ui-subtle);
		font-size: 12px;
		font-weight: 500;
		line-height: 16px;
		user-select: none;
	}
	[role="group"] + [role="group"] > .emdash-slash-menu-group-label {
		padding-block-start: 12px;
	}
	.emdash-slash-menu-item {
		display: flex;
		width: 100%;
		height: 32px;
		align-items: center;
		gap: 10px;
		padding: 0 8px;
		border: 0;
		border-radius: 6px;
		background: transparent;
		color: var(--emdash-ui-text);
		cursor: default;
		outline: none;
		text-align: start;
	}
	.emdash-slash-menu-item[aria-current="true"] {
		background: var(--emdash-ui-tint);
	}
	.emdash-slash-menu-icon {
		width: 18px;
		height: 18px;
		color: var(--emdash-ui-subtle);
	}
	.emdash-slash-menu-title {
		min-width: 0;
		flex: 1;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.emdash-slash-menu-markdown {
		flex: none;
		padding-inline-start: 12px;
		color: var(--emdash-ui-subtle);
		font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
		font-size: 12px;
		line-height: 16px;
	}
	.emdash-slash-menu-empty {
		margin: 0;
		padding: 6px 8px;
		color: var(--emdash-ui-subtle);
	}
	.emdash-slash-menu-footer {
		display: flex;
		flex: none;
		align-items: center;
		gap: 12px;
		padding: 8px 12px;
		border-block-start: 1px solid var(--emdash-ui-hairline);
		color: var(--emdash-ui-subtle);
		font-size: 12px;
		line-height: 16px;
	}
	.emdash-slash-menu-footer-text {
		min-width: 0;
		flex: 1;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.emdash-inline-ui-sr-only {
		position: absolute;
		width: 1px;
		height: 1px;
		overflow: hidden;
		clip-path: inset(50%);
		white-space: nowrap;
	}
	@media (max-width: 639px) {
		.emdash-inline-ui-text-button {
			width: 32px;
			padding-inline: 0;
		}
		.emdash-inline-ui-text-button-label {
			position: absolute;
			width: 1px;
			height: 1px;
			overflow: hidden;
			clip-path: inset(50%);
			white-space: nowrap;
		}
	}
	@media (pointer: coarse) {
		.emdash-inline-ui-button,
		.emdash-inline-ui-trigger,
		.emdash-inline-ui-input {
			height: 44px;
		}
		/* iOS zooms the page into a field with smaller text. */
		.emdash-inline-ui-input {
			font-size: 16px;
		}
		.emdash-inline-ui-button,
		.emdash-inline-ui-trigger[data-icon-only] {
			width: 44px;
		}
		.emdash-inline-ui-menu-item,
		.emdash-slash-menu-item {
			height: 44px;
		}
		.emdash-slash-menu-esc {
			display: none;
		}
	}
	@media (max-width: 639px) and (pointer: coarse) {
		.emdash-inline-ui-text-button {
			width: 44px;
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.emdash-inline-ui-menu,
		.emdash-inline-ui-tooltip,
		.emdash-inline-ui .emdash-slash-menu {
			animation: none;
			transition: none;
		}
	}
`,Ja=/(?:^|\s)(!\[(.+|:?)]\((\S+)(?:(?:\s+)["'](\S+)["'])?\))$/,Ya=ce.create({name:`image`,addOptions(){return{inline:!1,allowBase64:!1,HTMLAttributes:{},resize:!1}},inline(){return this.options.inline},group(){return this.options.inline?`inline`:`block`},draggable:!0,addAttributes(){return{src:{default:null},alt:{default:null},title:{default:null},width:{default:null},height:{default:null}}},parseHTML(){return[{tag:this.options.allowBase64?`img[src]`:`img[src]:not([src^="data:"])`}]},renderHTML({HTMLAttributes:e}){return[`img`,s(this.options.HTMLAttributes,e)]},parseMarkdown:(e,t)=>t.createNode(`image`,{src:e.href,title:e.title,alt:e.text}),renderMarkdown:e=>{let t=e.attrs?.src??``,n=e.attrs?.alt??``,r=e.attrs?.title??``;return r?`![${n}](${t} "${r}")`:`![${n}](${t})`},addNodeView(){if(!this.options.resize||!this.options.resize.enabled||typeof document>`u`)return null;let{directions:e,minWidth:t,minHeight:n,alwaysPreserveAspectRatio:r}=this.options.resize,i=new Set([`src`,`width`,`height`]);return({node:a,getPos:o,HTMLAttributes:c,editor:l})=>{let u=document.createElement(`img`);u.draggable=!1;let d=s(this.options.HTMLAttributes,c);Object.entries(d).forEach(([e,t])=>{if(t!=null)switch(e){case`src`:case`width`:case`height`:break;default:u.setAttribute(e,t)}}),d.src!==null&&(u.src=d.src);let p={...c},m=e=>{typeof e==`string`&&e!==``?u.getAttribute(`src`)!==e&&(u.src=e):(u.hasAttribute(`src`)&&u.removeAttribute(`src`),u.src!==``&&(u.src=``))};m(c.src);let h=new se({element:u,editor:l,node:a,getPos:o,onResize:(e,t)=>{u.style.width=`${e}px`,u.style.height=`${t}px`},onCommit:(e,t)=>{let n=o();n!==void 0&&this.editor.chain().setNodeSelection(n).updateAttributes(this.name,{width:e,height:t}).run()},onUpdate:e=>{if(e.type!==a.type)return!1;let t=l.extensionManager.attributes.filter(t=>t.type===e.type.name),n=f(e,t);return Object.keys(p).forEach(e=>{!i.has(e)&&!(e in n)&&u.removeAttribute(e)}),Object.entries(n).forEach(([e,t])=>{i.has(e)||(t==null?u.removeAttribute(e):u.setAttribute(e,t))}),m(n.src),p=n,!0},options:{directions:e,min:{width:t,height:n},preserveAspectRatio:r===!0}}),g=h.dom,_=()=>{g.style.visibility=``,g.style.pointerEvents=``};return g.style.visibility=`hidden`,g.style.pointerEvents=`none`,u.complete&&u.naturalWidth>0?_():(u.onload=_,u.onerror=_),h}},addCommands(){return{setImage:e=>({commands:t})=>t.insertContent({type:this.name,attrs:e})}},addInputRules(){return[v({find:Ja,type:this.type,getAttributes:e=>{let[,,t,n,r]=e;return{src:n,alt:t,title:r}}})]}}),Xa=`/_emdash/api`,Za=`/_emdash/admin/media`,Qa=9,$a=3,eo=50,to=240,no=8,ro=600,io=/auto|scroll|overlay/,ao=new Set([`ArrowUp`,`ArrowDown`,`ArrowLeft`,`ArrowRight`,`PageUp`,`PageDown`,`Home`,`End`,` `]),oo={id:`local`,name:`Library`};function so(e){return typeof e==`object`&&!!e}function Q(e){return typeof e==`string`&&e.trim()?e:void 0}function co(e){return typeof e==`number`&&Number.isFinite(e)&&e>0?e:null}async function lo(e,t){let n=await fetch(e,{credentials:`same-origin`,headers:{"X-EmDash-Request":`1`},signal:t});if(!n.ok)throw Error(`Media request failed with status ${n.status}`);let r=await n.json();if(!so(r)||!so(r.data))throw Error(`Unexpected media response`);return r.data}function uo(e,t){return!e.startsWith(`/_emdash/api/media/file/`)||t===`image/svg+xml`?e:`/_image?${new URLSearchParams({href:new URL(e,window.location.origin).href,w:String(to),f:`webp`})}`}function fo(e,t){e.dataset.original===void 0&&t&&(e.dataset.original=``,e.src=t)}function po(e,t){if(!so(e))return null;let n=Q(e.id);if(!n)return null;let r=so(e.meta)?e.meta:{},i=t.id===oo.id,a=Q(e.storageKey),o=(i?Q(e.url)??(a&&`/_emdash/api/media/file/${a}`):Q(e.previewUrl))??``;return{id:n,name:Q(e.filename)??``,thumbnail:i?uo(o,Q(e.mimeType)??``):o,original:o,chosen:{src:o,alt:Q(e.alt)?.trim()??null,mediaId:n,provider:i?`local`:t.id===`external-url`?`external`:t.id,width:co(e.width),height:co(e.height),blurhash:Q(e.blurhash)??Q(r.blurhash)??null,dominantColor:Q(e.dominantColor)??Q(r.dominantColor)??null}}}async function mo(e,t,n){let r=e.id===oo.id,i=new URLSearchParams({mimeType:`image/`}),a;r?(i.set(`page`,String(t)),i.set(`limit`,String(Qa)),a=`${Xa}/media?${i}`):(i.set(`limit`,String(eo)),a=`${Xa}/media/providers/${encodeURIComponent(e.id)}?${i}`);let o=await lo(a,n),s=(Array.isArray(o.items)?o.items:[]).flatMap(t=>po(t,e)??[]);return{sourceId:e.id,page:r?t:1,images:s,total:r&&typeof o.totalCount==`number`?o.totalCount:s.length,more:!r&&Q(o.nextCursor)!==void 0}}function ho(){let[e,t]=B.useState([oo]);return B.useEffect(()=>{let e=new AbortController;return(async()=>{try{let n=await lo(`${Xa}/media/providers`,e.signal),r=(Array.isArray(n.items)?n.items:[]).flatMap(e=>{if(!so(e))return[];let t=Q(e.id),n=so(e.capabilities)?e.capabilities:{};return!t||t===oo.id||n.browse===!1?[]:[{id:t,name:Q(e.name)??t}]});!e.signal.aborted&&r.length>0&&t([oo,...r])}catch{}})(),()=>e.abort()},[]),e}function go(e,t){let[n,r]=B.useState(0),[i,a]=B.useState(null),o=e.id===oo.id,s=[e.id,o?t:1,n].join(`
`);B.useEffect(()=>{let n=new AbortController;return(async()=>{try{let r=await mo(e,t,n.signal);n.signal.aborted||a({key:s,listing:r})}catch{if(n.signal.aborted)return;a(e=>({key:s,listing:e?.listing,failed:!0}))}})(),()=>n.abort()},[s]);let c=i?.listing?.sourceId===e.id?i.listing:void 0,l=c!==void 0&&(!o||c.page===t);return{listing:c,loading:i?.key!==s,failed:i?.key===s&&i.failed===!0&&!l,retry:()=>r(e=>e+1)}}function _o(e,t,n,r){let i=Math.abs(r)>=Math.abs(n);for(let n=e instanceof Element?e:null;n&&n!==t;n=n.parentElement){let e=getComputedStyle(n);if(i?io.test(e.overflowY)&&n.scrollHeight>n.clientHeight:io.test(e.overflowX)&&n.scrollWidth>n.clientWidth)return!0}return!1}function vo({icon:e,title:t,detail:n,children:r}){return(0,X.jsxs)(`div`,{className:`emdash-inline-ui-picker-message`,children:[(0,X.jsx)(e,{"aria-hidden":`true`}),(0,X.jsx)(`strong`,{children:t}),n&&(0,X.jsx)(`span`,{children:n}),r]})}function yo({uiRoot:e,reference:t,origin:n,gap:r,label:i,current:a,fromToolbar:s=!1,onChoose:c,onClose:l}){let u=B.useRef(null),d=B.useRef(!1),f=B.useRef(null),p=B.useRef(l);p.current=l;let m=B.useId(),h=ho(),[g,_]=B.useState(oo.id),v=h.find(e=>e.id===g)??oo,y=v.id===oo.id,b=v.id,[x,S]=B.useState({view:b,page:1}),C=x.view===b?x.page:1,{listing:w,loading:T,failed:E,retry:D}=go(v,C),O=B.useRef(D);O.current=D,B.useEffect(()=>{let e=()=>{document.visibilityState===`visible`&&O.current()};return document.addEventListener(`visibilitychange`,e),()=>document.removeEventListener(`visibilitychange`,e)},[]);let k=w?.total??0,A=Math.max(1,Math.ceil(k/Qa)),j=Math.min(C,A),N=y?w?.page??j:j,P=w?y?w.images:w.images.slice((N-1)*Qa,N*Qa):[],F=(N-1)*Qa,I=!w||P.length===0&&k>0,ee=!E&&!I&&k>0;B.useEffect(()=>{y&&w&&!T&&w.page>A&&S({view:b,page:A})},[y,w,T,A,b]);let te=`${b}\n${N}`,[ne,L]=B.useState({view:te,index:-1}),R=ne.view===te&&ne.index<P.length?ne.index:-1,z=e=>L({view:te,index:e}),[re,ie]=B.useState(null),{refs:ae,elements:oe,floatingStyles:se,middlewareData:ce,isPositioned:ue}=la({open:!0,placement:`bottom-start`,strategy:`fixed`,transform:!1,middleware:[M(r),_e({padding:8}),le({padding:8}),ke({padding:8,apply:({availableHeight:e,elements:{floating:t}})=>{t.style.maxHeight=`${Math.max(0,e)}px`}}),ja(n)],whileElementsMounted:o});B.useLayoutEffect(()=>ae.setPositionReference(t),[t,ae]);let de=B.useRef(!1);B.useEffect(()=>{let e=u.current;ue&&e&&(de.current&&document.activeElement!==document.body||(de.current=!0,e.focus({preventScroll:!0})),ee&&!T&&document.activeElement===e&&e.querySelector(`[data-index="0"]`)?.focus({preventScroll:!0}))},[ue,ee,T,te]),B.useEffect(()=>{let e=t.getBoundingClientRect(),n=0,r=window.matchMedia?.(`(pointer: coarse)`).matches===!0,i=0,a=()=>{r&&(i=performance.now()+ro)};a();let o=()=>{n=0;let r=t.getBoundingClientRect();if(performance.now()<i)e=r;else if(Math.abs(r.top-e.top)>no||Math.abs(r.left-e.left)>no){let e=document.activeElement,t=e===document.body||u.current?.contains(e);p.current(t?`scroll`:`blur`)}},s=e=>{e.target instanceof Node&&u.current?.contains(e.target)||(n||=requestAnimationFrame(o))},c=()=>{performance.now()<i&&a()},l=e=>{e.target instanceof HTMLInputElement&&u.current?.contains(e.target)&&a()};return document.addEventListener(`scroll`,s,{capture:!0,passive:!0}),document.addEventListener(`focusin`,l),document.addEventListener(`focusout`,l),window.addEventListener(`resize`,c),window.visualViewport?.addEventListener(`resize`,c),()=>{document.removeEventListener(`scroll`,s,{capture:!0}),document.removeEventListener(`focusin`,l),document.removeEventListener(`focusout`,l),window.removeEventListener(`resize`,c),window.visualViewport?.removeEventListener(`resize`,c),cancelAnimationFrame(n)}},[t]),B.useEffect(()=>{let e=oe.floating;if(!e)return;let t=null,n=t=>{t.ctrlKey||_o(t.target,e,t.deltaX,t.deltaY)||t.preventDefault()},r=e=>{let n=e.touches[0];t=n?{x:n.clientX,y:n.clientY}:null},i=n=>{let r=n.touches[0];if(!r||!t||n.touches.length>1)return;let i=r.clientX-t.x,a=r.clientY-t.y;_o(n.target,e,i,a)||n.preventDefault()};return e.addEventListener(`wheel`,n,{passive:!1}),e.addEventListener(`touchstart`,r,{passive:!0}),e.addEventListener(`touchmove`,i,{passive:!1}),()=>{e.removeEventListener(`wheel`,n),e.removeEventListener(`touchstart`,r),e.removeEventListener(`touchmove`,i)}},[oe.floating]),B.useEffect(()=>{let t=!1,n=n=>{let r=u.current,i=n.target instanceof Node?n.target:null,a=!(i&&r?.contains(i));d.current=a,t=n.pointerType!==`mouse`&&!(i&&e.contains(i)),a&&!r?.contains(document.activeElement)&&p.current(`blur`)},r=()=>{let e=document.activeElement;t&&e instanceof HTMLElement&&u.current?.contains(e)&&e.blur()};return document.addEventListener(`pointerdown`,n,!0),document.addEventListener(`pointerup`,r,!0),()=>{document.removeEventListener(`pointerdown`,n,!0),document.removeEventListener(`pointerup`,r,!0)}},[e]);let fe=e=>{let t=e.relatedTarget;t instanceof Node&&e.currentTarget.contains(t)||(t instanceof Node||d.current?l(`blur`):document.hasFocus()&&queueMicrotask(()=>{let e=u.current,t=document.activeElement;e?.isConnected&&!e.contains(t)&&(t&&t!==document.body?p.current(`blur`):e.focus({preventScroll:!0}))}))},pe=e=>{z(e),u.current?.querySelector(`[data-index="${e}"]`)?.focus()},me=e=>{ie(null);let t=Math.min(Math.max(1,Math.round(e)),A);if(!Number.isFinite(t)||t===j)return;let n=document.activeElement;n instanceof HTMLElement&&(n.dataset.index!==void 0||n.tagName===`BUTTON`&&n.closest(`.emdash-inline-ui-pagination`)&&(t===1||t===A))&&u.current?.focus({preventScroll:!0}),S({view:b,page:t})},he=(e,t)=>{e.id!==v.id&&(t.focus(),_(e.id))},ge=()=>{u.current?.focus({preventScroll:!0}),D()},ve=e=>{if(e.nativeEvent.isComposing)return;if(e.repeat&&e.key===`Enter`&&e.target instanceof HTMLElement&&e.target.dataset.index!==void 0){e.preventDefault();return}if(e.key===`Escape`){e.preventDefault(),l(`escape`);return}if(e.key===`Tab`){let t=[...e.currentTarget.querySelectorAll(`input, button, a[href]`)].filter(e=>e.tabIndex>=0&&!e.matches(`:disabled`));e.preventDefault();let n=t.findIndex(e=>e===document.activeElement);t[e.shiftKey?n<=0?t.length-1:n-1:(n+1)%t.length]?.focus();return}if(e.altKey||e.ctrlKey||e.metaKey)return;let t=e.target;if((t instanceof HTMLInputElement?e.key===`PageUp`||e.key===`PageDown`:ao.has(e.key)&&!(e.key===` `&&t instanceof HTMLButtonElement))&&e.preventDefault(),t===e.currentTarget){e.key.startsWith(`Arrow`)&&ee&&!T&&pe(0);return}if(!(t instanceof HTMLElement)||t.dataset.index===void 0)return;let n=Number(t.dataset.index),r=P.length-1,i=getComputedStyle(e.currentTarget).direction===`rtl`?-1:1,a;switch(e.key){case`ArrowDown`:a=n+$a,a>r&&(a=Math.floor(n/$a)<Math.floor(r/$a)?r:n);break;case`ArrowUp`:a=n-$a;break;case`ArrowRight`:a=Math.min(r,Math.max(0,n+i));break;case`ArrowLeft`:a=Math.min(r,Math.max(0,n-i));break;case`Home`:a=0;break;case`End`:a=r;break;default:return}a>=0&&pe(a)},ye=e=>{let t=getComputedStyle(e.currentTarget).direction===`rtl`?-1:1,n=h.findIndex(e=>e.id===v.id),r;switch(e.key){case`ArrowRight`:r=n+t;break;case`ArrowLeft`:r=n-t;break;case`Home`:r=0;break;case`End`:r=h.length-1;break;default:return}e.preventDefault(),r=(r+h.length)%h.length;let i=e.currentTarget.querySelectorAll(`[role="tab"]`)[r],a=h[r];i&&a&&(he(a,i),i.focus())},be=`Showing ${F+1}–${F+P.length} of ${k}${w?.more?`+`:``}`,xe,Se;return E?(xe=`Images couldn't load`,Se=(0,X.jsx)(vo,{icon:rt,title:xe,children:(0,X.jsx)(`button`,{type:`button`,className:`emdash-inline-ui-picker-action`,onClick:ge,children:`Try again`})})):I?(xe=`Loading images`,Se=(0,X.jsx)(`div`,{"aria-hidden":`true`,className:`emdash-inline-ui-picker-grid`,children:Array.from({length:Qa},(e,t)=>(0,X.jsx)(`span`,{className:`emdash-inline-ui-picker-tile`},t))})):k===0?(xe=`No images yet`,Se=y?(0,X.jsx)(vo,{icon:qe,title:xe,detail:`Images added to the media library show up here.`,children:(0,X.jsxs)(`a`,{href:Za,target:`_blank`,rel:`noopener noreferrer`,className:`emdash-inline-ui-picker-action`,children:[`Open media library`,(0,X.jsx)(it,{"aria-hidden":`true`}),(0,X.jsx)(`span`,{className:`emdash-inline-ui-sr-only`,children:` (opens in a new tab)`})]})}):(0,X.jsx)(vo,{icon:qe,title:xe,detail:`Images added to ${v.name} show up here.`})):(xe=be,Se=(0,X.jsxs)(`div`,{id:m,role:`listbox`,"aria-label":`Images`,"aria-busy":T||void 0,className:`emdash-inline-ui-picker-grid`,children:[P.map((e,t)=>{let n=e.name||`Image`,r=a?.mediaId===e.id&&a.provider===e.chosen.provider;return(0,X.jsxs)(`button`,{type:`button`,role:`option`,"aria-selected":t===R,"aria-label":r?`${n} (current image)`:n,tabIndex:t===Math.max(R,0)?0:-1,"data-index":t,"data-highlighted":t===R?``:void 0,className:`emdash-inline-ui-picker-tile`,onPointerMove:e=>{if(t===R)return;let n=document.activeElement;n instanceof HTMLElement&&n.dataset.index!==void 0?e.currentTarget.focus({preventScroll:!0}):z(t)},onFocus:()=>{t!==R&&z(t)},onPointerDown:()=>{f.current=e.id},onClick:t=>{let n=f.current;f.current=null,t.detail>0&&n!==null&&n!==e.id||c(e.chosen)},children:[e.thumbnail&&(0,X.jsx)(`img`,{src:e.thumbnail,alt:``,loading:`lazy`,decoding:`async`,draggable:!1,onError:t=>fo(t.currentTarget,e.original)},e.id),r&&(0,X.jsx)(`span`,{className:`emdash-inline-ui-picker-badge`,children:(0,X.jsx)(et,{weight:`bold`,"aria-hidden":`true`})})]},t)}),A>1&&Array.from({length:Qa-P.length},(e,t)=>(0,X.jsx)(`span`,{"aria-hidden":`true`,className:`emdash-inline-ui-picker-filler`},`filler-${t}`))]})),(0,X.jsx)(Hi,{root:e,children:(0,X.jsxs)(`div`,{ref:e=>{u.current=e,ae.setFloating(e)},role:`dialog`,"aria-label":i,tabIndex:-1,className:`emdash-inline-ui-picker`,style:{...se,...Ma(ce.transformOrigin),visibility:ue?void 0:`hidden`},...s?{[Ea]:``}:{},onKeyDown:ve,onMouseDown:e=>{e.target instanceof HTMLInputElement||e.preventDefault()},onBlur:fe,children:[(0,X.jsx)(`span`,{className:`emdash-inline-ui-sr-only`,role:`status`,children:xe}),h.length>1&&(0,X.jsx)(`div`,{role:`tablist`,"aria-label":`Image source`,className:`emdash-inline-ui-picker-tabs`,onKeyDown:ye,children:h.map(e=>(0,X.jsx)(`button`,{type:`button`,role:`tab`,"aria-selected":e.id===v.id,"aria-controls":ee?m:void 0,tabIndex:e.id===v.id?0:-1,className:`emdash-inline-ui-picker-tab`,onClick:t=>he(e,t.currentTarget),children:e.name},e.id))}),Se,ee&&(0,X.jsxs)(`div`,{className:`emdash-inline-ui-picker-foot`,children:[(0,X.jsx)(`span`,{className:`emdash-inline-ui-picker-count`,"aria-hidden":`true`,children:be}),(0,X.jsxs)(`nav`,{className:`emdash-inline-ui-pagination`,"aria-label":`Image pages`,children:[(0,X.jsx)(`button`,{type:`button`,"aria-label":`First page`,disabled:j<=1,onClick:()=>me(1),children:(0,X.jsx)(ot,{"aria-hidden":`true`})}),(0,X.jsx)(`button`,{type:`button`,"aria-label":`Previous page`,disabled:j<=1,onClick:()=>me(j-1),children:(0,X.jsx)(_t,{"aria-hidden":`true`})}),(0,X.jsx)(`input`,{"aria-label":`Page number`,inputMode:`numeric`,autoComplete:`off`,value:re??String(j),onChange:e=>ie(e.target.value),onKeyDown:e=>{e.key!==`Enter`||e.nativeEvent.isComposing||(e.preventDefault(),re!==null&&me(Number(re)))},onBlur:()=>{re!==null&&me(Number(re))}}),(0,X.jsx)(`button`,{type:`button`,"aria-label":`Next page`,disabled:j>=A,onClick:()=>me(j+1),children:(0,X.jsx)(Ue,{"aria-hidden":`true`})}),(0,X.jsx)(`button`,{type:`button`,"aria-label":`Last page`,disabled:j>=A,onClick:()=>me(A),children:(0,X.jsx)(bt,{"aria-hidden":`true`})})]})]})]})})}var bo=`
	.emdash-inline-ui-picker {
		display: flex;
		width: 360px;
		max-width: calc(100vw - 16px);
		flex-direction: column;
		overflow: hidden;
		border-radius: 10px;
		background: var(--emdash-ui-surface);
		box-shadow: 0 0 0 1px var(--emdash-ui-line), var(--emdash-ui-shadow);
		outline: none;
		animation: emdash-inline-ui-menu-in 100ms cubic-bezier(0, 0, 0.2, 1);
	}
	.emdash-inline-ui-picker-tabs {
		display: flex;
		flex: none;
		gap: 2px;
		padding: 4px;
		overflow-x: auto;
		overscroll-behavior-x: contain;
		border-block-end: 1px solid var(--emdash-ui-hairline);
		scrollbar-width: none;
	}
	.emdash-inline-ui-picker-tab {
		flex: none;
		height: 28px;
		padding: 0 10px;
		border: 0;
		border-radius: 6px;
		background: transparent;
		color: var(--emdash-ui-subtle);
		cursor: pointer;
		font-size: 13px;
		outline: none;
	}
	.emdash-inline-ui-picker-tab:hover {
		color: var(--emdash-ui-text);
	}
	.emdash-inline-ui-picker-tab[aria-selected="true"] {
		background: var(--emdash-ui-tint);
		color: var(--emdash-ui-text);
		font-weight: 500;
	}
	.emdash-inline-ui-picker-tab:focus-visible {
		box-shadow: 0 0 0 2px var(--emdash-ui-brand);
	}
	/* Rows keep their tiles' height and the grid scrolls, rather than squeezing them. */
	.emdash-inline-ui-picker-grid {
		display: grid;
		min-height: 0;
		flex: 0 1 auto;
		grid-template-columns: repeat(${$a}, minmax(0, 1fr));
		grid-auto-rows: max-content;
		gap: 4px;
		padding: 4px;
		overflow-y: auto;
		overscroll-behavior: contain;
		scroll-padding-block: 4px;
	}
	.emdash-inline-ui-picker-tile {
		position: relative;
		aspect-ratio: 1;
		padding: 0;
		overflow: hidden;
		border: 0;
		border-radius: 6px;
		background: var(--emdash-ui-tint);
		cursor: pointer;
		outline: none;
	}
	.emdash-inline-ui-picker-tile img {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
	.emdash-inline-ui-picker-tile::after {
		content: "";
		position: absolute;
		inset: 0;
		border-radius: inherit;
		box-shadow: inset 0 0 0 1px light-dark(rgb(0 0 0 / 0.06), rgb(255 255 255 / 0.07));
		pointer-events: none;
	}
	.emdash-inline-ui-picker-tile[data-highlighted]::after {
		box-shadow: inset 0 0 0 2px var(--emdash-ui-brand), inset 0 0 0 4px var(--emdash-ui-surface);
	}
	.emdash-inline-ui-picker-filler {
		aspect-ratio: 1;
		visibility: hidden;
	}
	.emdash-inline-ui-picker-badge {
		position: absolute;
		inset-block-start: 6px;
		inset-inline-end: 6px;
		display: grid;
		width: 20px;
		height: 20px;
		place-items: center;
		border-radius: 999px;
		background: var(--emdash-ui-brand);
		box-shadow: 0 0 0 2px var(--emdash-ui-surface);
		color: #fff;
	}
	.emdash-inline-ui-picker-badge svg {
		width: 12px;
		height: 12px;
	}
	.emdash-inline-ui-picker-message {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 2px;
		padding: 28px 16px;
		color: var(--emdash-ui-subtle);
		text-align: center;
	}
	.emdash-inline-ui-picker-message > svg {
		width: 28px;
		height: 28px;
		margin-block-end: 6px;
	}
	.emdash-inline-ui-picker-message strong {
		max-width: 100%;
		color: var(--emdash-ui-text);
		font-weight: 500;
		overflow-wrap: anywhere;
	}
	.emdash-inline-ui-picker-action {
		display: inline-flex;
		height: 32px;
		align-items: center;
		gap: 6px;
		margin-block-start: 12px;
		padding: 0 10px;
		border: 0;
		border-radius: 6px;
		background: transparent;
		box-shadow: 0 0 0 1px var(--emdash-ui-line);
		color: var(--emdash-ui-text);
		cursor: pointer;
		outline: none;
	}
	.emdash-inline-ui-picker-action:hover {
		background: var(--emdash-ui-tint);
	}
	.emdash-inline-ui-picker-action:focus-visible {
		box-shadow: 0 0 0 2px var(--emdash-ui-brand);
	}
	.emdash-inline-ui-picker-action > svg {
		width: 14px;
		height: 14px;
		color: var(--emdash-ui-subtle);
	}
	.emdash-inline-ui-picker-foot {
		display: flex;
		flex: none;
		align-items: center;
		gap: 12px;
		padding-block: 6px;
		padding-inline: 12px 6px;
		border-block-start: 1px solid var(--emdash-ui-hairline);
		color: var(--emdash-ui-subtle);
		font-size: 12px;
		line-height: 16px;
	}
	.emdash-inline-ui-picker-count {
		min-width: 0;
		flex: 1;
		overflow: hidden;
		font-variant-numeric: tabular-nums;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.emdash-inline-ui-pagination {
		display: flex;
		flex: none;
		overflow: hidden;
		border-radius: 8px;
		box-shadow: 0 0 0 1px var(--emdash-ui-line);
	}
	.emdash-inline-ui-pagination > button,
	.emdash-inline-ui-pagination > input {
		width: 28px;
		height: 28px;
		padding: 0;
		border: 0;
		background: var(--emdash-ui-surface);
		color: var(--emdash-ui-text);
		outline: none;
	}
	.emdash-inline-ui-pagination > :not(:first-child) {
		border-inline-start: 1px solid var(--emdash-ui-line);
	}
	.emdash-inline-ui-pagination > button {
		display: grid;
		place-items: center;
		cursor: pointer;
	}
	.emdash-inline-ui-pagination > button:hover:not(:disabled) {
		background: var(--emdash-ui-tint);
	}
	.emdash-inline-ui-pagination > button:disabled {
		color: var(--emdash-ui-placeholder);
		cursor: default;
	}
	.emdash-inline-ui-pagination > :focus-visible {
		box-shadow: inset 0 0 0 2px var(--emdash-ui-brand);
	}
	.emdash-inline-ui-pagination svg {
		width: 14px;
		height: 14px;
	}
	.emdash-inline-ui-pagination:dir(rtl) svg {
		scale: -1 1;
	}
	.emdash-inline-ui-pagination > input {
		width: 36px;
		font-size: 12px;
		font-variant-numeric: tabular-nums;
		text-align: center;
	}
	@media (pointer: coarse) {
		.emdash-inline-ui-pagination > button,
		.emdash-inline-ui-pagination > input {
			width: 40px;
			height: 40px;
		}
		/* iOS zooms the page into a field with smaller text. */
		.emdash-inline-ui-pagination > input {
			font-size: 16px;
		}
		.emdash-inline-ui-picker-tab,
		.emdash-inline-ui-picker-action {
			height: 44px;
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.emdash-inline-ui-picker {
			animation: none;
		}
	}
`,xo=`emdashInlineImageToolbar`,So=`button:not([disabled]), a[href], input`,Co=100,wo=`Add a caption`;function To(e){return e===`left`||e===`center`||e===`right`||e===`wide`||e===`full`?e:void 0}function Eo(e){return typeof e==`number`&&Number.isFinite(e)&&e>0?e:void 0}function Do(e){let t=Eo(e.width),n=Eo(e.height),r=Eo(e.displayWidth),i=Eo(e.displayHeight),a=t&&n?t/n:void 0;return r&&i?{width:r,height:i}:r&&a?{width:r,height:Math.round(r/a)}:i&&a?{width:Math.round(i*a),height:i}:{width:t,height:n}}function Oo(e){let{selection:t}=e;return t instanceof he&&t.node.type.name===`image`?t:null}function ko(e,t){let n=e.view.nodeDOM(t);return n instanceof HTMLElement?n.querySelector(`figcaption textarea`):null}function Ao(e){e.view.dispatch(e.state.tr.setMeta(`focus`,{event:void 0}).setMeta(`addToHistory`,!1))}function jo(e,t,n){e.commands.command(({tr:e,state:r})=>{let i=r.schema.nodes.image;if(!i)return!1;let a=e.doc.resolve(Math.min(t,e.doc.content.size)),o=i.create(n),s=a.parent.isTextblock&&a.parent.childCount===0,c=a.depth;for(;c>1&&a.node(c-1).childCount===1;)c--;let l;if(a.depth===0)l=a.pos,e.insert(l,o);else if(s&&c===1)l=a.before(1),e.replaceWith(l,a.after(1),o);else if(a.depth===1&&a.parentOffset===0)l=a.before(1),e.insert(l,o);else{let t=a.after(1);s&&e.deleteRange(a.before(),a.after()),l=e.mapping.map(t),e.insert(l,o)}return e.setSelection(he.create(e.doc,l)).scrollIntoView(),!0})}function Mo(e,t){let n=Eo(e.width),r=Eo(e.height),i=Eo(t.width),a=Eo(t.height);return!n||!r||!i||!a?!1:Math.abs(n*a-r*i)<=Math.max(i,a)}function No(e,t,n){e.commands.command(({tr:e})=>{let r=e.doc.nodeAt(t);if(r?.type.name!==`image`)return!1;let i=r.attrs,a={width:i.displayWidth,height:i.displayHeight},o=Mo(a,i)&&!Mo(a,n);return e.setNodeMarkup(t,void 0,{...i,...n,title:null,...o?{displayHeight:null}:{}}),e.setSelection(he.create(e.doc,t)),!0})}function Po(e,t){if(e.pointerType!==`mouse`)return;let n=e.currentTarget.closest(`[draggable]`);n&&(n.draggable=t)}function Fo(e){e.dataTransfer.types.includes(`Files`)&&e.preventDefault()}function Io({node:e,editor:t,getPos:n,updateAttributes:r}){let i=e.attrs,a=typeof i.src==`string`?i.src:``,o=typeof i.alt==`string`?i.alt:``,s=typeof i.title==`string`&&i.title?i.title:void 0,c=typeof i.caption==`string`?i.caption:``,l=To(i.alignment),{width:u,height:d}=Do(i),f=B.useRef(null);B.useEffect(()=>{let e=f.current;if(!e)return;let t=e=>{e.dataTransfer?.types.includes(`Files`)||e.stopPropagation()};return e.addEventListener(`dragover`,t),e.addEventListener(`drop`,t),()=>{e.removeEventListener(`dragover`,t),e.removeEventListener(`drop`,t)}},[]);let p=()=>{let e=n();typeof e==`number`&&t.commands.setNodeSelection(e)},m=e=>{e.target instanceof Element&&e.target.closest(`figcaption`)||p()};return(0,X.jsxs)(de,{as:`figure`,className:l?`emdash-image emdash-image--align-${l}`:`emdash-image`,onPointerDown:e=>{e.pointerType===`mouse`&&e.isPrimary&&e.button===0&&m(e)},onClick:m,onDragEnter:Fo,onDragOver:Fo,children:[(0,X.jsx)(`img`,{src:a,alt:o,title:s,width:u,height:d,draggable:!1,"data-drag-handle":``}),(0,X.jsx)(`figcaption`,{"data-value":c||wo,children:(0,X.jsx)(`textarea`,{ref:f,rows:1,tabIndex:-1,dir:`auto`,value:c,placeholder:wo,"aria-label":`Caption`,onChange:e=>r({caption:e.target.value}),onFocus:()=>{p(),Ao(t)},onKeyDown:r=>{if(r.nativeEvent.isComposing||r.keyCode===229)return;let i=n();if(typeof i==`number`){if(r.key===`Enter`){r.preventDefault();let n=i+e.nodeSize;t.chain().insertContentAt(n,{type:`paragraph`}).focus(n+1).run()}else(r.key===`Escape`||r.key===`Tab`&&r.shiftKey)&&(r.preventDefault(),t.commands.setNodeSelection(i),t.view.focus())}},onPointerEnter:e=>Po(e,!1),onPointerLeave:e=>Po(e,!0)})})]})}var Lo=Ya.extend({addAttributes(){return{...this.parent?.(),mediaId:{default:null},provider:{default:null},width:{default:null},height:{default:null},displayWidth:{default:null},displayHeight:{default:null},caption:{default:null},blurhash:{default:null},dominantColor:{default:null},alignment:{default:null,rendered:!1},link:{default:null,rendered:!1}}},addNodeView(){return Ae(Io)},addKeyboardShortcuts(){return{Tab:({editor:e})=>{let t=Oo(e.state),n=t&&ko(e,t.from);return n?(n.focus(),!0):!1}}}});function Ro({value:e,onChange:t,onSave:n,onCancel:r}){let i=B.useRef(null);return B.useEffect(()=>{i.current?.focus(),i.current?.select()},[]),(0,X.jsxs)(`div`,{className:`emdash-inline-ui-field-row`,children:[(0,X.jsx)(`input`,{ref:i,type:`text`,dir:`auto`,autoComplete:`off`,className:`emdash-inline-ui-input`,value:e,placeholder:`Describe the image`,"aria-label":`Alt text`,onChange:e=>t(e.target.value),onKeyDown:e=>{e.nativeEvent.isComposing||e.keyCode===229||(e.key===`Enter`?(e.preventDefault(),n()):e.key===`Escape`&&(e.preventDefault(),r()))}}),(0,X.jsx)(La,{label:`Cancel`,onClick:r,children:(0,X.jsx)(ft,{})}),(0,X.jsx)(La,{label:`Save alt text`,onClick:n,children:(0,X.jsx)(et,{})})]})}function zo({editor:e,uiRoot:t,scrollTarget:n,onReplaced:r}){let[i,a]=B.useState(`controls`),[o,s]=B.useState(!1),[c,l]=B.useState(!1),[u,d]=B.useState(``),f=B.useRef(null),p=B.useRef(null),m=B.useRef(null),h=B.useRef(-1/0),g=R({editor:e,selector:({editor:e})=>{let t=Oo(e.state),n=t?.node.attrs;return{position:t?.from??null,alt:typeof n?.alt==`string`?n.alt:``,mediaId:typeof n?.mediaId==`string`?n.mediaId:``,provider:typeof n?.provider==`string`&&n.provider?n.provider:`local`}}}),_=g.alt.trim()!==``;B.useEffect(()=>{a(`controls`),s(!1)},[g.position]),B.useEffect(()=>{c&&!e.isDestroyed&&e.view.dispatch(e.state.tr.setMeta(xo,`updatePosition`))},[e,i,c]);let v=B.useCallback(()=>t,[t]),y=B.useMemo(()=>({strategy:`absolute`,placement:`top`,offset:10,flip:{padding:8},shift:{padding:8},size:{padding:8,apply:({availableWidth:e,elements:t})=>{t.floating.style.maxWidth=`${Math.max(0,e)}px`}},scrollTarget:n,onShow:()=>{l(!0),performance.now()-h.current>Co&&Ka(p.current)},onHide:()=>{h.current=performance.now(),l(!1),a(`controls`),s(!1)}}),[n]),b=B.useCallback(({editor:e,element:n,state:r,view:i})=>{let a=Oo(r);if(!e.isEditable||!a)return!1;let o=n.ownerDocument.activeElement,s=i.hasFocus()||n.contains(o)||!!o?.closest(`[data-emdash-bubble-popup]`)||!!i.nodeDOM(a.from)?.contains(o);return s&&Aa(n,t),s},[t]),x=B.useMemo(()=>({getBoundingClientRect:()=>f.current?.getBoundingClientRect()??new DOMRect,get contextElement(){return f.current??void 0}}),[]),S=B.useCallback(()=>m.current?.getBoundingClientRect()??new DOMRect,[]),C=()=>{m.current?.focus({preventScroll:!0}),s(!1)},w=t=>{t.mediaId===g.mediaId&&t.provider===g.provider?C():(g.position!==null&&No(e,g.position,t),C(),r())},T=()=>{let e=document.activeElement;(f.current?.contains(e)||e?.closest(`[data-emdash-bubble-popup]`))&&p.current?.focus({preventScroll:!0}),s(!1),d(g.alt),a(`alt`)},E=()=>{e.view.focus(),a(`controls`)};return(0,X.jsxs)(X.Fragment,{children:[(0,X.jsx)(L,{ref:f,editor:e,pluginKey:xo,appendTo:v,updateDelay:0,options:y,shouldShow:b,children:(0,X.jsx)(`div`,{ref:p,tabIndex:-1,role:`toolbar`,"aria-label":`Image controls`,className:`emdash-inline-ui-bar emdash-image-bubble-menu`,onMouseDown:()=>{e.view.hasFocus()||e.view.dispatch(e.state.tr.setMeta(`blur`,{event:{relatedTarget:p.current}}))},onKeyDown:t=>{if(t.key===`Tab`&&t.shiftKey&&g.position!==null){let n=ko(e,g.position),r=t.currentTarget.querySelector(So);if(n&&document.activeElement===r){t.preventDefault(),n.focus();return}}Ga(t,e)},children:(0,X.jsx)(Oa.Provider,{value:c,children:(0,X.jsx)(Fa,{children:i===`alt`?(0,X.jsx)(Ro,{value:u,onChange:d,onSave:()=>{let t=u.trim();t!==g.alt.trim()&&e.commands.updateAttributes(`image`,{alt:t||null}),E()},onCancel:E}):(0,X.jsxs)(X.Fragment,{children:[(0,X.jsx)(Ra,{label:`Replace`,icon:(0,X.jsx)(Be,{"aria-hidden":`true`}),expanded:o,buttonRef:m,onClick:()=>o?C():s(!0)}),(0,X.jsx)(Ra,{label:`Alt text`,icon:(0,X.jsx)(gt,{"aria-hidden":`true`}),pressed:_,tooltip:_?g.alt.trim():`No description yet`,onClick:T}),(0,X.jsx)(za,{}),(0,X.jsx)(La,{label:`Delete image`,onClick:()=>{e.view.focus(),e.commands.deleteSelection()},children:(0,X.jsx)(Pe,{})})]})})})})}),o&&g.position!==null&&(0,X.jsx)(yo,{uiRoot:t,reference:x,origin:S,gap:4,label:`Replace image`,current:{provider:g.provider,mediaId:g.mediaId},fromToolbar:!0,onChoose:w,onClose:e=>e===`blur`?s(!1):C()})]})}var Bo=`
	.emdash-inline-editor .emdash-image {
		margin: 1.5rem 0;
	}
	.emdash-inline-editor .emdash-image img {
		max-width: 100%;
		height: auto;
	}
	.emdash-inline-editor .ProseMirror-selectednode > .emdash-image > img {
		outline: 2px solid oklch(57.72% 0.2324 260);
		outline-offset: 3px;
	}
	.emdash-inline-editor .emdash-image figcaption {
		display: grid;
		margin-top: 0.5rem;
		color: var(--emdash-caption-color, var(--color-muted, #666));
		font-size: 0.875rem;
		text-align: center;
	}
	/* An invisible copy of the text sizes the cell the field fills, so the field grows as it wraps. */
	.emdash-inline-editor .emdash-image figcaption::after,
	.emdash-inline-editor .emdash-image figcaption textarea {
		grid-area: 1 / 1;
		min-width: 0;
		margin: 0;
		padding: 0;
		border: 0;
		font: inherit;
		letter-spacing: inherit;
		line-height: inherit;
		text-align: inherit;
		white-space: pre-wrap;
		overflow-wrap: anywhere;
	}
	.emdash-inline-editor .emdash-image figcaption::after {
		content: attr(data-value) " ";
		visibility: hidden;
	}
	.emdash-inline-editor .emdash-image figcaption textarea {
		display: block;
		width: 100%;
		height: 100%;
		overflow: hidden;
		resize: none;
		background: transparent;
		color: inherit;
		outline: none;
	}
	.emdash-inline-editor .emdash-image figcaption textarea::placeholder {
		color: inherit;
		opacity: 0.6;
	}
	.emdash-inline-editor .emdash-image figcaption textarea:focus-visible {
		border-radius: 2px;
		outline: 2px solid color-mix(in srgb, currentColor 35%, transparent);
		outline-offset: 2px;
	}
	.emdash-inline-editor .emdash-image--align-left,
	.emdash-inline-editor .emdash-image--align-right {
		width: fit-content;
		max-width: 50%;
	}
	.emdash-inline-editor .emdash-image--align-left {
		float: left;
		margin: 0 1.5rem 1rem 0;
	}
	.emdash-inline-editor .emdash-image--align-right {
		float: right;
		margin: 0 0 1rem 1.5rem;
	}
	.emdash-inline-editor .emdash-image--align-center {
		width: fit-content;
		margin-inline: auto;
	}
	.emdash-inline-editor .emdash-image--align-wide,
	.emdash-inline-editor .emdash-image--align-full {
		width: 100%;
	}
	@media (max-width: 640px) {
		.emdash-inline-editor .emdash-image--align-left,
		.emdash-inline-editor .emdash-image--align-right {
			float: none;
			width: 100%;
			max-width: 100%;
			margin-inline: 0;
		}
	}
`,Vo=`emdashInlineTextToolbar`,Ho=`emdashInlineLinkToolbar`,Uo=/auto|scroll|overlay/;function Wo(e){for(let t=e.parentElement;t&&t!==document.body;t=t.parentElement){let e=getComputedStyle(t);if(Uo.test(e.overflowY+e.overflowX))return t}}function Go(e){let[t,n]=B.useState(null);return B.useEffect(()=>n(Wo(e.view.dom)),[e]),t}var Ko=[{mark:`bold`,label:`Bold`,icon:vt},{mark:`italic`,label:`Italic`,icon:Xe},{mark:`underline`,label:`Underline`,icon:Fe},{mark:`strike`,label:`Strikethrough`,icon:Je},{mark:`code`,label:`Inline Code`,icon:ut}],qo=[`bold`,`italic`,`underline`,`strike`,`code`,`subscript`,`superscript`],Jo=[{value:`left`,label:`Left`,icon:yt},{value:`center`,label:`Center`,icon:at},{value:`right`,label:`Right`,icon:nt}],Yo=/\S/,Xo=/^(?:https?:|mailto:|tel:|\/|#)/i,Zo=/^https?:\/\/(?:www\.)?/i,Qo=/^([a-z][a-z0-9+.-]*:|[/#?])/i,$o=/^\S+\.\S{2,}$/,es=/^[^\s@/:]+@[^\s@/]+\.[^\s@/]{2,}$/,ts=/^(?:localhost|[a-z0-9-]+(?:\.[a-z0-9-]+)+):\d+(?:[/?#]|$)/i,ns=/^(?:\.{1,2}\/|[^./]+\/)/;function rs(e){let t=e.trim();return ts.test(t)?`https://${t}`:Qo.test(t)||ns.test(t)?t:es.test(t)?`mailto:${t}`:$o.test(t)?`https://${t}`:t}function is(e){let t=e.schema.marks.link;if(!t)return;let{$from:n,empty:r}=e.selection,i=t.isInSet(n.nodeAfter?.marks??[]);return r?i??t.isInSet(n.nodeBefore?.marks??[]):i}function as(e,t){let n=rs(t);if(!e.can().setLink({href:n}))return!1;let r=e.chain().focus().extendMarkRange(`link`,is(e.state)?.attrs).setLink({href:n});return e.state.selection.empty&&!e.isActive(`link`)?r.run():r.command(({tr:e,state:t})=>{let n=t.schema.marks.link;return n?(e.setSelection(we.near(e.doc.resolve(e.selection.to),-1)),e.removeStoredMark(n),!0):!1}).run()}function os(e){e.chain().focus().extendMarkRange(`link`,is(e.state)?.attrs).unsetLink().run()}function ss(e){if(e.isDestroyed||!e.view.dom.isConnected)return null;let{state:t,view:n}=e,r=is(t),i=r&&c(t.selection.$from,r.type,r.attrs);if(!i)return null;let a=n.domAtPos(i.from),o=n.domAtPos(i.to),s=document.createRange();s.setStart(a.node,a.offset),s.setEnd(o.node,o.offset);let l=n.coordsAtPos(t.selection.from),u=(l.top+l.bottom)/2,d=[...s.getClientRects()].filter(e=>e.width>0&&e.top<=u&&e.bottom>=u);if(d.length===0)return null;let f=Math.min(...d.map(e=>e.left)),p=Math.min(...d.map(e=>e.top)),m=Math.max(...d.map(e=>e.right)),h=Math.max(...d.map(e=>e.bottom));return new DOMRect(f,p,m-f,h-p)}function cs(e){let t=getComputedStyle(e.view.dom).direction===`rtl`?`right`:`left`,n=new Set,r=!1,{from:i,to:a}=e.state.selection;e.state.doc.nodesBetween(i,a,(e,i,a)=>{if(e.type.name!==`paragraph`&&e.type.name!==`heading`)return!0;a?.type.name!==`doc`&&(r=!0);let o=e.attrs.textAlign;return n.add(o===`left`||o===`center`||o===`right`||o===`justify`?o:t),!1});let o=r||n.size===0;return{value:!o&&n.size===1?[...n][0]:void 0,unavailable:o}}function ls({editor:e,appendTo:t,scrollTarget:n,onEdit:r}){let i=R({editor:e,selector:({editor:e})=>{let t=is(e.state)?.attrs.href;return typeof t==`string`?t:``}}),[a,o]=B.useState(!1),s=B.useRef(null),c=B.useRef(null),l=B.useCallback(()=>{let t=ss(e);return t&&{getBoundingClientRect:()=>t,getClientRects:()=>[t]}},[e]);B.useLayoutEffect(()=>{a&&!e.isDestroyed&&e.view.dispatch(e.state.tr.setMeta(Ho,`updatePosition`))},[e,i,a]);let u=B.useMemo(()=>({strategy:`absolute`,placement:`bottom-start`,offset:6,flip:{padding:8},shift:{padding:8},scrollTarget:n,onShow:()=>{o(!0),Ka(c.current)},onHide:()=>o(!1)}),[n]),d=B.useCallback(({editor:e,element:n,state:r,oldState:i,view:a})=>{let o=e.isEditable&&r.selection instanceof we&&r.selection.empty&&is(r)!==void 0&&(e.isActive(`link`)||!i||i.doc.eq(r.doc))&&(a.hasFocus()||n.contains(n.ownerDocument.activeElement));return o&&Aa(n,t()),o},[t]);return(0,X.jsx)(L,{ref:s,editor:e,pluginKey:Ho,appendTo:t,getReferencedVirtualElement:l,updateDelay:0,options:u,shouldShow:d,children:(0,X.jsx)(`div`,{ref:c,role:`toolbar`,"aria-label":`Link options`,className:`emdash-inline-ui-bar emdash-inline-ui-link-preview emdash-link-bubble-menu`,onKeyDown:t=>Ga(t,e),children:(0,X.jsx)(Oa.Provider,{value:a,children:(0,X.jsxs)(Fa,{children:[(0,X.jsx)(ct,{className:`emdash-inline-ui-link-globe`,"aria-hidden":`true`}),Xo.test(i)?(0,X.jsx)(`a`,{href:i,target:`_blank`,rel:`noopener noreferrer`,dir:`auto`,className:`emdash-inline-ui-link-url`,children:i.replace(Zo,``)}):(0,X.jsx)(`span`,{dir:`auto`,className:`emdash-inline-ui-link-url`,children:i}),(0,X.jsx)(za,{}),(0,X.jsx)(La,{label:`Edit link`,onClick:r,children:(0,X.jsx)(St,{})}),(0,X.jsx)(La,{label:`Remove link`,onClick:()=>os(e),children:(0,X.jsx)(Qe,{})})]})})})})}function us({editor:e,linked:t,onDone:n}){let[r,i]=B.useState(()=>{let t=e.getAttributes(`link`).href;return typeof t==`string`?t:``}),[a,o]=B.useState(!1),s=B.useRef(null),c=B.useId();B.useEffect(()=>{s.current?.focus()},[]),B.useEffect(()=>{e.isDestroyed||e.view.dispatch(e.state.tr.setMeta(Vo,`updatePosition`))},[e,a]);let l=()=>{os(e),n()},u=()=>{r.trim()===``?l():as(e,r)?n():o(!0)};return(0,X.jsxs)(`div`,{className:`emdash-inline-ui-link-edit`,children:[(0,X.jsxs)(`div`,{className:`emdash-inline-ui-field`,children:[(0,X.jsx)(`input`,{ref:s,type:`text`,inputMode:`url`,autoComplete:`off`,spellCheck:!1,className:`emdash-inline-ui-input`,value:r,placeholder:`Type or paste a URL`,"aria-label":`Link URL`,"aria-invalid":a||void 0,"aria-describedby":a?c:void 0,onChange:e=>{i(e.target.value),o(!1)},onKeyDown:t=>{t.nativeEvent.isComposing||(t.key===`Enter`?(t.preventDefault(),u()):t.key===`Escape`&&(t.preventDefault(),n(),e.commands.focus()))}}),a&&(0,X.jsx)(`p`,{id:c,role:`alert`,className:`emdash-inline-ui-field-error`,children:`This link can't be used. Enter a web address, such as https://example.com.`})]}),(0,X.jsx)(La,{label:`Apply link`,onClick:u,children:(0,X.jsx)(et,{})}),t&&(0,X.jsx)(La,{label:`Remove link`,onClick:l,children:(0,X.jsx)(Qe,{})})]})}var ds={unavailable:!0};function fs({editor:e,uiRoot:t,onImageReplaced:n}){let[r,i]=B.useState(!1),[a,o]=B.useState(null),s=(e,t)=>o(n=>t?e:n===e?null:n),[c,l]=B.useState(!1),u=B.useRef(null),d=B.useRef(null),f=B.useRef(r);f.current=r,Ha(e,t);let p=Go(e),m=R({editor:e,selector:({editor:e})=>({bold:e.isActive(`bold`),italic:e.isActive(`italic`),underline:e.isActive(`underline`),strike:e.isActive(`strike`),code:e.isActive(`code`),subscript:e.isActive(`subscript`),superscript:e.isActive(`superscript`),link:e.isActive(`link`),canTurnInto:vn(e),blockType:_n(e)})}),h=B.useCallback(()=>t,[t]),g=B.useMemo(()=>({strategy:`absolute`,placement:`top-start`,offset:8,flip:{padding:8},shift:{padding:8},size:{padding:8,apply:({availableWidth:e,elements:t})=>{t.floating.style.maxWidth=`${Math.max(0,e)}px`}},scrollTarget:p??void 0,onShow:()=>{let e=d.current;l(!0),Ka(e),f.current&&e?.querySelector(`input`)?.focus()},onHide:()=>{l(!1),i(!1),o(null)}}),[p]),_=B.useCallback(({editor:e,element:n,state:r,view:i})=>{let{selection:a}=r,o=n.ownerDocument.activeElement,s=n.contains(o)||!!o?.closest(`[data-emdash-bubble-popup]`),c=e.isEditable&&(a instanceof we||a instanceof te)&&Yo.test(r.doc.textBetween(a.from,a.to,` `))&&!e.isActive(`codeBlock`)&&(i.hasFocus()||s);return c&&Aa(n,t),c},[t]),v=pn.find(e=>e.id===m.blockType),y=[{label:`Turn into`,items:mn(m.blockType).map(t=>({label:t.label,icon:t.icon,role:`menuitemradio`,checked:t.id===m.blockType,onSelect:()=>Tn(e,t.id)}))}],b=a===`more`?cs(e):ds,x=[{items:[{label:`Subscript`,icon:Ke,role:`menuitemcheckbox`,checked:m.subscript,onSelect:()=>e.chain().focus().toggleSubscript().run()},{label:`Superscript`,icon:dt,role:`menuitemcheckbox`,checked:m.superscript,onSelect:()=>e.chain().focus().toggleSuperscript().run()}]},{label:`Align`,items:Jo.map(({value:t,label:n,icon:r})=>({label:n,icon:r,role:`menuitemradio`,checked:b.value===t,disabled:b.unavailable,onSelect:()=>e.chain().focus().setTextAlign(t).run()}))},{items:[{label:`Clear formatting`,icon:mt,onSelect:()=>{let t=e.chain().focus();for(let e of qo)t.unsetMark(e);t.run()}}]}];return p===null?null:(0,X.jsxs)(Da.Provider,{value:t,children:[(0,X.jsx)(ls,{editor:e,appendTo:h,scrollTarget:p,onEdit:()=>{e.chain().focus().extendMarkRange(`link`,is(e.state)?.attrs).run(),i(!0)}}),(0,X.jsx)(L,{ref:u,editor:e,pluginKey:Vo,appendTo:h,updateDelay:120,options:g,shouldShow:_,children:(0,X.jsx)(`div`,{ref:d,role:`toolbar`,"aria-label":`Format selection`,className:`emdash-inline-ui-bar emdash-bubble-menu`,onKeyDown:t=>Ga(t,e),children:(0,X.jsx)(Oa.Provider,{value:c,children:(0,X.jsx)(Fa,{children:r?(0,X.jsx)(us,{editor:e,linked:m.link,onDone:()=>i(!1)}):(0,X.jsxs)(`div`,{className:`emdash-inline-ui-toolbar`,children:[m.canTurnInto&&(0,X.jsxs)(X.Fragment,{children:[(0,X.jsx)(Ba,{editor:e,label:`Turn into`,placement:`bottom-start`,open:a===`turnInto`,onOpenChange:e=>s(`turnInto`,e),trigger:(0,X.jsxs)(X.Fragment,{children:[(0,X.jsx)(`span`,{className:`emdash-inline-ui-trigger-label`,children:v?.label??`Turn into`}),(0,X.jsx)(pt,{className:`emdash-inline-ui-caret`,"aria-hidden":`true`})]}),groups:y}),(0,X.jsx)(za,{})]}),(0,X.jsx)(La,{label:m.link?`Edit link`:`Add link`,active:m.link,onClick:()=>i(!0),children:(0,X.jsx)(Ve,{})}),(0,X.jsx)(za,{}),Ko.map(({mark:t,label:n,icon:r})=>(0,X.jsx)(La,{label:n,active:m[t],onClick:()=>e.chain().focus().toggleMark(t).run(),children:(0,X.jsx)(r,{})},t)),(0,X.jsx)(za,{}),(0,X.jsx)(Ba,{editor:e,label:`More formatting`,placement:`bottom-end`,iconOnly:!0,open:a===`more`,onOpenChange:e=>s(`more`,e),trigger:(0,X.jsx)(tt,{weight:`bold`,"aria-hidden":`true`}),groups:x})]})})})})}),(0,X.jsx)(zo,{editor:e,uiRoot:t,scrollTarget:p,onReplaced:n})]})}var ps=Symbol.for(`emdash:inline-code-block-lowlight`),ms=globalThis,hs=ms[ps]??(()=>{let e=Ee(me);return e.register({dockerfile:be}),ms[ps]=e,e})(),gs={highlight(e,t){return hs.highlight(hs.registered(e)?e:`plaintext`,t)},highlightAuto(e){return hs.highlight(`plaintext`,e)},listLanguages(){return hs.listLanguages()},registered(e){return hs.registered(e)}},_s=[{id:`plaintext`,label:`Plain text`,aliases:[`text`,`plain`,`txt`]},{id:`astro`,label:`Astro`},{id:`bash`,label:`Bash`,aliases:[`sh`,`shell`,`zsh`]},{id:`c`,label:`C`},{id:`cpp`,label:`C++`,aliases:[`c++`]},{id:`csharp`,label:`C#`,aliases:[`cs`,`c#`]},{id:`css`,label:`CSS`},{id:`diff`,label:`Diff`,aliases:[`patch`]},{id:`dockerfile`,label:`Dockerfile`,aliases:[`docker`]},{id:`go`,label:`Go`,aliases:[`golang`]},{id:`graphql`,label:`GraphQL`,aliases:[`gql`]},{id:`html`,label:`HTML`},{id:`java`,label:`Java`},{id:`javascript`,label:`JavaScript`,aliases:[`js`]},{id:`json`,label:`JSON`},{id:`jsx`,label:`JSX`},{id:`kotlin`,label:`Kotlin`,aliases:[`kt`]},{id:`lua`,label:`Lua`},{id:`markdown`,label:`Markdown`,aliases:[`md`]},{id:`mdx`,label:`MDX`},{id:`php`,label:`PHP`},{id:`python`,label:`Python`,aliases:[`py`]},{id:`ruby`,label:`Ruby`,aliases:[`rb`]},{id:`rust`,label:`Rust`,aliases:[`rs`]},{id:`scss`,label:`SCSS`,aliases:[`sass`]},{id:`sql`,label:`SQL`},{id:`svelte`,label:`Svelte`},{id:`swift`,label:`Swift`},{id:`toml`,label:`TOML`},{id:`tsx`,label:`TSX`},{id:`typescript`,label:`TypeScript`,aliases:[`ts`]},{id:`vue`,label:`Vue`},{id:`xml`,label:`XML`},{id:`yaml`,label:`YAML`,aliases:[`yml`]},{id:`zig`,label:`Zig`}];function vs(e){if(!e)return null;let t=e.trim().toLowerCase();if(!t)return null;for(let e of _s)if(e.id===t||e.aliases?.includes(t))return e;return null}var ys=/[^a-z0-9_-]+/g,bs=/^-+|-+$/g;function xs(e){if(!e)return;let t=e.trim();if(!t)return;let n=vs(t);return n?n.id:t.toLowerCase().replace(ys,`-`).replace(bs,``)||void 0}function Ss(e){if(!e)return`Plain text`;let t=vs(e);return t?t.label:e}async function Cs(e,t){if(navigator.clipboard?.writeText)try{await navigator.clipboard.writeText(e);return}catch{}if(!t())return;let n=document.activeElement,r=document.getSelection(),i=r?.rangeCount?r.getRangeAt(0).cloneRange():null,a=document.createElement(`textarea`);a.value=e,a.readOnly=!0,a.dataset.emdashClipboardFallback=``,a.style.position=`fixed`,a.style.opacity=`0`,document.body.append(a),a.select();try{if(!document.execCommand(`copy`))throw Error(`Clipboard copy failed`)}finally{a.remove(),n instanceof HTMLElement&&n.isConnected&&n.focus(),i&&(r?.removeAllRanges(),r?.addRange(i))}}function ws({id:e}){return(0,X.jsx)(`datalist`,{id:e,children:_s.map(e=>(0,X.jsx)(`option`,{value:e.id,label:e.label},e.id))})}var Ts={height:`1.75rem`,width:`1.75rem`,display:`inline-flex`,alignItems:`center`,justifyContent:`center`,border:`none`,background:`transparent`,cursor:`pointer`,color:`inherit`,borderRadius:`0.25rem`};function Es(){return(0,X.jsx)(`svg`,{width:`14`,height:`14`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2.5`,strokeLinecap:`round`,strokeLinejoin:`round`,"aria-hidden":`true`,children:(0,X.jsx)(`polyline`,{points:`20 6 9 17 4 12`})})}function Ds(){return(0,X.jsxs)(`svg`,{width:`14`,height:`14`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2.5`,strokeLinecap:`round`,strokeLinejoin:`round`,"aria-hidden":`true`,children:[(0,X.jsx)(`line`,{x1:`18`,y1:`6`,x2:`6`,y2:`18`}),(0,X.jsx)(`line`,{x1:`6`,y1:`6`,x2:`18`,y2:`18`})]})}function Os({node:e,updateAttributes:t}){let[n,r]=B.useState(!1),[i,a]=B.useState(`idle`),o=typeof e.attrs.language==`string`?e.attrs.language:``,[s,c]=B.useState(o),l=B.useRef(null),u=B.useRef(null),d=B.useRef(null),f=B.useRef(0),p=B.useId();B.useEffect(()=>{n||c(o)},[o,n]);let m=B.useCallback(()=>{c(o),r(!0),setTimeout(()=>l.current?.focus(),0)},[o]),h=B.useCallback(()=>{r(!1),c(o)},[o]),g=B.useCallback(()=>{t({language:xs(s)??null}),r(!1)},[s,t]),_=e=>{e.key===`Enter`?(e.preventDefault(),g()):e.key===`Escape`&&(e.preventDefault(),h())};B.useEffect(()=>{if(!n)return;let e=e=>{let t=e.target instanceof Node?e.target:null;u.current&&t&&!u.current.contains(t)&&h()};return document.addEventListener(`mousedown`,e),()=>document.removeEventListener(`mousedown`,e)},[n,h]),B.useEffect(()=>()=>{f.current+=1,d.current&&clearTimeout(d.current)},[]);let v=B.useCallback(async()=>{let t=++f.current;a(`idle`);try{if(await Cs(e.textContent,()=>t===f.current),t!==f.current)return;a(`copied`),d.current&&clearTimeout(d.current),d.current=setTimeout(a,1500,`idle`)}catch{if(t!==f.current)return;d.current&&clearTimeout(d.current),a(`failed`)}},[e.textContent]),y=Ss(o),b=i===`copied`,x=i===`failed`;return(0,X.jsxs)(de,{className:`emdash-inline-code-block`,"data-language":o||void 0,children:[(0,X.jsx)(ws,{id:p}),(0,X.jsx)(`pre`,{className:`emdash-code-block`,children:(0,X.jsx)(P,{as:`code`})}),(0,X.jsxs)(`div`,{className:`emdash-inline-code-block-controls-wrap`,"data-persistent":n||i!==`idle`?`true`:`false`,contentEditable:!1,children:[n?(0,X.jsxs)(`div`,{ref:u,className:`emdash-inline-code-block-popover`,style:{display:`flex`,alignItems:`center`,gap:`0.25rem`,padding:`0.25rem`,borderRadius:`0.375rem`,boxShadow:`0 4px 12px rgba(0,0,0,0.1)`},children:[(0,X.jsx)(`input`,{ref:l,type:`text`,list:p,value:s,onChange:e=>c(e.target.value),onKeyDown:_,className:`emdash-inline-code-block-language-input`,placeholder:`Language`,"aria-label":`Language`,style:{height:`1.75rem`,fontSize:`0.75rem`,padding:`0 0.5rem`,borderRadius:`0.25rem`}}),(0,X.jsx)(`button`,{type:`button`,onMouseDown:e=>e.preventDefault(),onClick:g,title:`Apply language`,"aria-label":`Apply language`,style:Ts,children:(0,X.jsx)(Es,{})}),(0,X.jsx)(`button`,{type:`button`,onMouseDown:e=>e.preventDefault(),onClick:h,title:`Cancel`,"aria-label":`Cancel`,style:Ts,children:(0,X.jsx)(Ds,{})})]}):(0,X.jsxs)(`div`,{className:`emdash-inline-code-block-chip`,style:{display:`inline-flex`,maxWidth:`min(100%, calc(100vw - 1rem))`,height:`26px`,fontSize:`13px`},children:[(0,X.jsxs)(`button`,{type:`button`,onMouseDown:e=>e.preventDefault(),onClick:m,title:`Set language`,"aria-label":`Set language (current: ${y})`,style:{minWidth:0,flexShrink:1,display:`inline-flex`,alignItems:`center`,gap:`0.25rem`,padding:`0 0.5rem`,border:0,background:`transparent`,color:`inherit`,font:`inherit`},children:[(0,X.jsx)(`span`,{style:{overflow:`hidden`,textOverflow:`ellipsis`,whiteSpace:`nowrap`},children:o?y:`Set language`}),(0,X.jsx)(`span`,{style:{flexShrink:0},"aria-hidden":`true`,children:`⌄`})]}),(0,X.jsx)(`button`,{type:`button`,onMouseDown:e=>e.preventDefault(),onClick:v,title:x?`Retry copy`:b?`Copied`:`Copy code`,"aria-label":x?`Retry copy`:`Copy code`,style:{...Ts,height:`26px`,width:`26px`,flexShrink:0,borderInlineStart:`1px solid var(--emdash-code-border)`},children:(0,X.jsx)(`span`,{"aria-hidden":`true`,children:b?(0,X.jsx)(Es,{}):x?(0,X.jsx)(Ds,{}):`⧉`})})]}),(0,X.jsx)(`span`,{role:`status`,"aria-live":`polite`,style:{position:`absolute`,width:1,height:1,overflow:`hidden`,clipPath:`inset(50%)`},children:x?`Copy failed`:b?`Copied`:``})]})]})}var ks=ie.extend({addKeyboardShortcuts(){let e=this.parent?.()??{},t=()=>{let{$from:e,$to:t}=this.editor.state.selection;return e.parent.type===this.type&&e.sameParent(t)};return{...e,"Mod-a":()=>{if(!t())return!1;let{$from:e}=this.editor.state.selection;return this.editor.commands.setTextSelection({from:e.start(),to:e.end()})},Tab:n=>t()?e.Tab?.(n)??!1:!1,"Shift-Tab":n=>t()?e[`Shift-Tab`]?.(n)??!1:!1}},addNodeView(){return Ae(Os)}}).configure({lowlight:gs,defaultLanguage:`plaintext`,enableTabIndentation:!0,tabSize:4}),As=`Basic blocks`,js=/\s+/,Ms=/^\s/;function Ns(e,t){let n=pn.find(t=>t.id===e);if(!n)throw Error(`Unknown block type: ${e}`);return{...t,title:n.label,icon:n.icon,markdown:n.markdown,category:As,command:({editor:t,range:n})=>Tn(t,e,n)}}var Ps=[Ns(`paragraph`,{id:`paragraph`,description:`Start writing with plain text`,aliases:[`text`,`plain`,`p`]}),Ns(`heading1`,{id:`heading1`,description:`Large section heading`,aliases:[`h1`,`title`]}),Ns(`heading2`,{id:`heading2`,description:`Medium section heading`,aliases:[`h2`,`subtitle`]}),Ns(`heading3`,{id:`heading3`,description:`Small section heading`,aliases:[`h3`]}),Ns(`bulletList`,{id:`bulletList`,description:`Create a bullet list`,aliases:[`ul`,`unordered`,`bulleted`]}),Ns(`orderedList`,{id:`numberedList`,description:`Create a numbered list`,aliases:[`ol`,`ordered`]}),Ns(`blockquote`,{id:`quote`,description:`Insert a blockquote`,aliases:[`blockquote`,`cite`]}),Ns(`codeBlock`,{id:`codeBlock`,description:`Insert a code block`,aliases:[`pre`,`snippet`,"```"]}),{id:`divider`,title:`Divider`,description:`Insert a horizontal rule`,icon:st,aliases:[`hr`,`---`,`—-`,`separator`,`line`],markdown:`---`,category:As,command:({editor:e,range:t})=>{e.chain().focus().deleteRange(t).setHorizontalRule().run()}},Ns(`heading4`,{id:`heading4`,description:`Smaller section heading`,aliases:[`h4`],searchOnly:!0}),Ns(`heading5`,{id:`heading5`,description:`Minor section heading`,aliases:[`h5`],searchOnly:!0}),Ns(`heading6`,{id:`heading6`,description:`Smallest section heading`,aliases:[`h6`],searchOnly:!0}),{id:`image`,title:`Image`,description:`Insert an image`,icon:xt,aliases:[`img`,`photo`,`picture`],category:`Media`,command:({editor:e,range:t,openImagePicker:n})=>{e.chain().deleteRange(t).run(),n()}},{id:`htmlBlock`,title:`HTML`,description:`Insert raw HTML`,icon:Le,aliases:[`html`,`raw`,`markup`],category:`Advanced`,command:({editor:e,range:t})=>{e.chain().focus().deleteRange(t).insertContent({type:`htmlBlock`,attrs:{html:``,isolated:!0}}).run()}}];function Fs(e,t,n,r=[]){let i=e.toLowerCase().trim();if(!i)return 1;let a=t.toLowerCase(),o=r.map(e=>e.toLowerCase());if(o.includes(i))return 100;if(a===i)return 95;if(a.startsWith(i))return 90;let s=a.split(js);if(i.length>1&&s.map(e=>e[0]).join(``).startsWith(i))return 85;if(s.some(e=>e.startsWith(i)))return 80;if(o.some(e=>e.startsWith(i)))return 70;if(i.length<3)return 0;if(a.includes(i))return 60;if(n.toLowerCase().includes(i))return 40;let c=0;for(let e of a)if(e===i[c]&&c++,c===i.length)return 20;return 0}function Is(e){if(!e.trim()){let e=Ps.filter(e=>!e.searchOnly),t=[...new Set(e.map(e=>e.category))];return e.toSorted((e,n)=>t.indexOf(e.category)-t.indexOf(n.category))}return Ps.map((t,n)=>({item:t,order:n,score:Fs(e,t.title,t.description,[...t.aliases??[],...t.markdown?[t.markdown]:[]])})).filter(e=>e.score>0).toSorted((e,t)=>t.score-e.score||e.order-t.order).map(e=>e.item)}var Ls={isOpen:!1,items:[],selectedIndex:0,clientRect:null,range:null,query:``,dismissedSlashFrom:null};function Rs(e){let{onStateChange:t,getState:n,onCommand:r,onDismiss:i}=e;return g.create({name:`slashCommands`,onTransaction(){let e=n();if(e.dismissedSlashFrom===null)return;let r=Math.min(e.dismissedSlashFrom+1,this.editor.state.doc.content.size);this.editor.state.doc.textBetween(e.dismissedSlashFrom,r)!==`/`&&t(e=>({...e,dismissedSlashFrom:null}))},addProseMirrorPlugins(){return[Ht({editor:this.editor,char:`/`,startOfLine:!0,decorationClass:`emdash-slash-query`,command:({props:e})=>r(e),items:({query:e})=>Is(e),allowSpaces:!0,allow:({state:e,range:t})=>{if(n().dismissedSlashFrom===t.from)return!1;let r=e.doc.textBetween(t.from+1,t.to);return!Ms.test(r)&&(!js.test(r)||Is(r).length>0)},render:()=>({onStart:e=>{t({isOpen:!0,items:e.items,selectedIndex:0,clientRect:e.clientRect??null,range:e.range,query:e.query,dismissedSlashFrom:null})},onUpdate:e=>{t(t=>({...t,items:e.items,selectedIndex:0,clientRect:e.clientRect??null,range:e.range,query:e.query,dismissedSlashFrom:null}))},onKeyDown:({event:e})=>{if(e.key===`Escape`||e.key===`Tab`)return i(),e.key===`Escape`;let{items:a,selectedIndex:o}=n();if(e.key===`ArrowUp`||e.key===`ArrowDown`){if(a.length===0)return!0;let n=e.key===`ArrowUp`?-1:1;return t(e=>({...e,selectedIndex:(e.selectedIndex+n+a.length)%a.length})),!0}if(e.key===`Enter`){let e=a[o];return e?(r(e),!0):!1}return!1},onExit:()=>{t(e=>({...e,isOpen:!1}))}})})]}})}function zs({editor:e,uiRoot:t,state:n,onCommand:r,onClose:i,setSelectedIndex:a}){let s=B.useRef(null),c=B.useRef(null),{refs:l,floatingStyles:u,context:d,isPositioned:f,middlewareData:p}=la({open:n.isOpen,placement:`bottom-start`,strategy:`fixed`,transform:!1,middleware:[M(6),_e({padding:8,fallbackAxisSideDirection:`none`}),le({padding:8}),ke({padding:8,apply:({availableHeight:e,elements:t})=>{t.floating.style.maxHeight=`${Math.min(336,Math.max(0,e))}px`}}),Ce(),ja()],whileElementsMounted:o}),{isMounted:m,status:h}=wa(d,{duration:{open:100,close:75}}),{clientRect:g}=n,_=B.useRef(null);B.useLayoutEffect(()=>{l.setPositionReference(g?{getBoundingClientRect:()=>(_.current=g()??_.current,_.current??new DOMRect),contextElement:e.view.dom}:null)},[g,e,l]);let v=B.useRef(null);B.useEffect(()=>{if(!n.isOpen)return;let e=v.current===n.selectedIndex;if(v.current=null,e)return;let t=s.current,r=t?.querySelector(`[data-index="${n.selectedIndex}"]`);if(!t||!r)return;if(n.selectedIndex===0){t.scrollTop=0;return}let i=r.previousElementSibling,a=(i?.classList.contains(`emdash-slash-menu-group-label`)?i:r).getBoundingClientRect().top,{bottom:o}=r.getBoundingClientRect(),c=t.getBoundingClientRect(),l=Number.parseFloat(getComputedStyle(t).scrollPaddingTop)||0;a<c.top+l?t.scrollTop-=c.top+l-a:o>c.bottom-l&&(t.scrollTop+=o-(c.bottom-l))},[n.selectedIndex,n.isOpen]);let y=B.useRef(!1);if(B.useEffect(()=>{n.isOpen||(y.current=!1)},[n.isOpen]),B.useEffect(()=>{if(!n.isOpen)return;let e=e=>{e.target instanceof Node&&c.current?.contains(e.target)||i()};return document.addEventListener(`pointerdown`,e,!0),()=>document.removeEventListener(`pointerdown`,e,!0)},[i,n.isOpen]),!m||!g)return null;let b=n.items[n.selectedIndex],x=[];return n.items.forEach((e,t)=>{let r=n.query?`results`:e.category,i=x.find(e=>e.key===r);i?i.entries.push({item:e,index:t}):x.push({key:r,label:e.category,entries:[{item:e,index:t}]})}),(0,qr.createPortal)((0,X.jsxs)(`div`,{ref:e=>{c.current=e,l.setFloating(e)},style:{...u,...Ma(p.transformOrigin),visibility:(f||h===`close`)&&!p.hide?.referenceHidden?`visible`:`hidden`},role:`dialog`,className:`emdash-slash-menu`,"data-status":h,"aria-label":`Insert block`,onPointerMove:()=>{y.current=!0},children:[b&&(0,X.jsxs)(`span`,{className:`emdash-inline-ui-sr-only`,role:`status`,children:[`Selected `,b.title]}),(0,X.jsx)(`div`,{ref:s,className:`emdash-slash-menu-viewport`,children:n.items.length===0?(0,X.jsx)(`p`,{className:`emdash-slash-menu-empty`,children:`No results`}):x.map(e=>(0,X.jsxs)(`div`,{role:`group`,"aria-label":n.query?void 0:e.label,children:[!n.query&&(0,X.jsx)(`div`,{"aria-hidden":`true`,className:`emdash-slash-menu-group-label`,children:e.label}),e.entries.map(({item:e,index:t})=>(0,X.jsxs)(`button`,{type:`button`,tabIndex:-1,"data-index":t,"aria-current":t===n.selectedIndex?`true`:void 0,className:`emdash-slash-menu-item`,onPointerDown:e=>e.preventDefault(),onClick:()=>r(e),onMouseEnter:()=>{y.current&&t!==n.selectedIndex&&(v.current=t,a(t))},children:[(0,X.jsx)(e.icon,{className:`emdash-slash-menu-icon`,"aria-hidden":`true`}),(0,X.jsx)(`span`,{className:`emdash-slash-menu-title`,children:e.title}),e.markdown&&(0,X.jsx)(`span`,{"aria-hidden":`true`,className:`emdash-slash-menu-markdown`,children:(0,X.jsx)(`bdi`,{dir:`ltr`,children:e.markdown})})]},e.id))]},e.key))}),(0,X.jsxs)(`div`,{className:`emdash-slash-menu-footer`,children:[(0,X.jsx)(`span`,{className:`emdash-slash-menu-footer-text`,"aria-hidden":`true`,children:b?b.description:`Type to filter`}),(0,X.jsx)(`span`,{className:`emdash-slash-menu-esc`,"aria-hidden":`true`,children:(0,X.jsx)(`bdi`,{dir:`ltr`,children:`esc`})})]})]}),t)}var Bs=/^(\d+)\.\s$/;function Vs(){return globalThis.crypto?.randomUUID?.()??`list-${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`}function Hs(e,t,n){let r=an(`repair:${e}:${t}`),i=`:${n.toString(36)}`;return`${r.slice(0,128-i.length)}${i}`}function Us(e){let t=[];return e.descendants((n,r)=>{if(n.type.name!==`orderedList`)return;let i=e.resolve(r),a=`root`,o=null;for(let e=i.depth;e>0;e--)if(i.node(e).type.name===`listItem`){o=i.before(e),a=`listItem:${o}`;break}o===null&&i.depth>0&&(o=i.before(i.depth),a=`${i.node(i.depth).type.name}:${o}`),t.push({node:n,pos:r,depth:i.depth,context:a,contextPos:o})}),t}function Ws(e){let t=Us(e),n=new Map,r=new Set,i=t.map(e=>{let t=V(e.node.attrs.listId)??an(`pm:${e.pos}:${e.depth}:${e.context}`),i=JSON.stringify([e.depth,e.context]),a=JSON.stringify([t,i]),o=n.get(a);if(!o){if(!r.has(t))o=t;else{let e=0;do o=Hs(t,i,e++);while(r.has(o))}n.set(a,o),r.add(o)}return{...e,listId:o,scopeKey:JSON.stringify([o,e.depth,e.context])}}),a=new Map;for(let e of i){let t=H(e.node.attrs.listStart);t!==void 0&&!a.has(e.scopeKey)&&a.set(e.scopeKey,t)}for(let e of i)a.has(e.scopeKey)||a.set(e.scopeKey,H(e.node.attrs.start)??1);let o=new Map,s=[];for(let e of i){let t=a.get(e.scopeKey),n=o.get(e.scopeKey)??0,r=H(t+n)??1;o.set(e.scopeKey,n+e.node.childCount),(e.node.attrs.listId!==e.listId||e.node.attrs.listStart!==t||e.node.attrs.start!==r)&&s.push({pos:e.pos,attrs:{...e.node.attrs,listId:e.listId,listStart:t,start:r}})}return s}function Gs(e){let t=Ws(e.doc);if(t.length===0){let t=Us(e.doc);if(!t.some((e,n)=>{let r=t[n+1];return r!==void 0&&r.pos===e.pos+e.node.nodeSize&&r.depth===e.depth&&r.context===e.context&&V(r.node.attrs.listId)===V(e.node.attrs.listId)&&H(r.node.attrs.listStart)===H(e.node.attrs.listStart)}))return null}let n=e.tr;for(let e of t)n.setNodeMarkup(e.pos,void 0,e.attrs);let r=Us(n.doc),i=r.flatMap((e,t)=>{let n=r[t+1];return n!==void 0&&n.pos===e.pos+e.node.nodeSize&&n.depth===e.depth&&n.context===e.context&&V(n.node.attrs.listId)===V(e.node.attrs.listId)&&H(n.node.attrs.listStart)===H(e.node.attrs.listStart)?[n.pos]:[]});for(let e of i.toReversed())N(n.doc,e)&&n.join(e);return n.docChanged?n:null}function Ks(e){let t=new Map,n=0,r=(e,i,a)=>{let o=[];return e.forEach((e,s,c)=>{let l=e.type.name===`listItem`?`${a}/listItem:${c}`:a,u=r(e.content,i+1,l);if(e.type.name!==`orderedList`){o.push(e.copy(u));return}let d=V(e.attrs.listId)??`missing:${n++}`,f=JSON.stringify([d,i,a]),p=t.get(f);p||(p={listId:Vs(),listStart:H(e.attrs.start)??H(e.attrs.listStart)??1},t.set(f,p)),o.push(e.type.create({...e.attrs,...p,start:p.listStart},u,e.marks))}),I.fromArray(o)};return new fe(r(e.content,0,`root`),e.openStart,e.openEnd)}function qs(e){let t=!1;return e.content.descendants(e=>e.type.name!==`orderedList`||(t=!0,!1)),t}function Js(e){let t=Us(e.doc).findLast(t=>e.selection.from>=t.pos&&e.selection.from<=t.pos+t.node.nodeSize);if(!t)return null;let n=V(t.node.attrs.listId),r=H(t.node.attrs.start);if(!n||r===void 0)return null;let i=0;return t.node.forEach((n,r)=>{t.pos+1+r+n.nodeSize<=e.selection.from&&i++}),{listId:n,listStart:H(r+i)??1}}function Ys(e,t,n,r){let i=e=>{let a=[];return e.forEach(e=>{let o=i(e.content);a.push(e.type.name===`orderedList`&&V(e.attrs.listId)===t?e.type.create({...e.attrs,listId:n,listStart:r,start:r},o,e.marks):e.copy(o))}),I.fromArray(a)};return new fe(i(e.content),e.openStart,e.openEnd)}function Xs(e,t){let n=Js(t);if(!n)return e;let r=!1,i=e=>{let t=[];return e.forEach(e=>{let a=!r&&e.type.name===`orderedList`&&V(e.attrs.listId)===n.listId;a&&(r=!0);let o=i(e.content);a?t.push(e.type.create({...e.attrs,start:n.listStart},o,e.marks)):t.push(e.copy(o))}),I.fromArray(t)};return new fe(i(e.content),e.openStart,e.openEnd)}function Zs(e,t){let n=Js(t);return n?Ys(e,n.listId,Vs(),n.listStart):e}function Qs(e){let t=Us(e.doc),n=t.findLast(t=>e.selection.from>=t.pos&&e.selection.to<=t.pos+t.node.nodeSize);return n&&t.filter(t=>t.depth===n.depth&&t.context===n.context&&e.selection.from<t.pos+t.node.nodeSize&&e.selection.to>t.pos).length===1?{current:n,lists:t}:null}function $s(e,t,n){let r=Qs(e);if(!r)return!1;let{current:i,lists:a}=r,o=V(i.node.attrs.listId);if(!o)return!1;let s=a.filter(e=>e.depth===i.depth&&e.context===i.context),c=s.findLast(e=>e.pos<i.pos),l=c?V(c.node.attrs.listId):void 0;if(n===`continue`&&(!l||l===o))return!1;if(!t)return!0;let u=n===`continue`?l:Vs(),d=n===`continue`?H(c.node.attrs.listStart)??1:1,f=e.tr;for(let e of s)e.pos<i.pos||V(e.node.attrs.listId)!==o||f.setNodeMarkup(e.pos,void 0,{...e.node.attrs,listId:u,listStart:d});return t(f),!0}function ec(e,t,n,r){let i=e.tr;r&&i.deleteSelection();let a=i.mapping.map(n),o=i.doc;if(i.replaceRange(a,a,t),i.doc.eq(o))return null;let s=a;return i.mapping.maps.at(-1)?.forEach((e,t,n,r)=>{s=Math.max(s,r)}),{transaction:i,from:a,to:s}}function tc(e,t,n,r){if(!qs(n))return!1;let i=e.posAtCoords({left:t.clientX,top:t.clientY});if(!i)return!1;let a=ue(e.state.doc,i.pos,n)??i.pos;if(!r){let t=ec(e.state,Ks(n),a,!1);if(!t)return!1;let r=Math.min(t.to,t.transaction.doc.content.size);return t.transaction.setSelection(k.near(t.transaction.doc.resolve(r),-1)),e.focus(),e.dispatch(t.transaction.setMeta(`uiEvent`,`drop`).scrollIntoView()),!0}let o=Qs(e.state);if(!o)return!1;let s=ec(e.state,n,a,!0);if(!s)return!1;let c=o.current.contextPos,l=c===null?null:s.transaction.mapping.map(c,1);if(Us(s.transaction.doc).some(e=>e.pos<s.to&&e.pos+e.node.nodeSize>s.from&&e.depth===o.current.depth&&e.contextPos===l))return!1;let u=Zs(n,e.state);if(u===n)return!1;let d=ec(e.state,u,a,!0);if(!d)return!1;let f=Math.min(d.to,d.transaction.doc.content.size);return d.transaction.setSelection(k.near(d.transaction.doc.resolve(f),-1)),e.focus(),e.dispatch(d.transaction.setMeta(`uiEvent`,`drop`).scrollIntoView()),!0}var nc=A.extend({addAttributes(){let e=this.parent?.()??{};return{...e,start:{...e.start,parseHTML:e=>H(Number(e.dataset.emdashListFirst))??H(Number(e.getAttribute(`start`)))??1},listId:{default:null,parseHTML:e=>V(e.dataset.emdashListId)??null,rendered:!1},listStart:{default:null,parseHTML:e=>H(Number(e.dataset.emdashListStart))??null,rendered:!1}}},renderHTML({HTMLAttributes:e,node:t}){let{start:n,...r}=e,i=H(t.attrs.start)??1,a={"data-emdash-list-id":V(t.attrs.listId),"data-emdash-list-start":H(t.attrs.listStart),"data-emdash-list-first":i};return i===1?[`ol`,s(this.options.HTMLAttributes,r,a),0]:[`ol`,s(this.options.HTMLAttributes,{...r,start:i},a),0]},addCommands(){return{toggleOrderedList:()=>({commands:e,chain:t})=>this.editor.isActive(this.name)?e.toggleList(this.name,this.options.itemTypeName,this.options.keepMarks):t().toggleList(this.name,this.options.itemTypeName,this.options.keepMarks).updateAttributes(this.name,{listId:Vs(),listStart:1}).run(),continueOrderedList:()=>({state:e,dispatch:t})=>$s(e,t,`continue`),restartOrderedList:()=>({state:e,dispatch:t})=>$s(e,t,`restart`)}},addInputRules(){return[b({find:Bs,type:this.type,getAttributes:e=>{let t=H(Number(e[1]))??1;return{start:t,listStart:t,listId:Vs()}},joinPredicate:()=>!1})]},addProseMirrorPlugins(){return[new xe({appendTransaction:(e,t,n)=>Gs(n),props:{transformCopied:(e,t)=>Xs(e,t.state),handleDrop:tc,handlePaste(e,t,n){return qs(n)?(e.dispatch(e.state.tr.replaceSelection(Ks(n)).setMeta(`paste`,!0).setMeta(`uiEvent`,`paste`).scrollIntoView()),!0):!1}}})]}}),rc=/<[^>]+\bdata-emdash-table-block(?:\s|=|>)/i;function ic(e){return e._type===`block`}function ac(e){return typeof e==`object`&&!!e&&`_type`in e&&e._type===`table`}function oc(e){return typeof e==`object`&&!!e&&`type`in e&&e.type===`doc`&&`content`in e&&Array.isArray(e.content)}function $(){return Math.random().toString(36).substring(2,11)}function sc(e){return e.toLowerCase().startsWith(`ar`)?`لا يمكن إفلات الملفات أو لصقها هنا. اكتب /image لاختيار صورة من مكتبة الوسائط.`:`Files can’t be dropped or pasted here. Type /image to choose an image from the media library.`}function cc(e){if(!e)return!1;if(e.files.length>0)return!0;for(let t=0;t<e.items.length;t++)if(e.items[t]?.kind===`file`)return!0;return!1}function lc(e){let t=(e,t)=>cc(t.dataTransfer)?(t.preventDefault(),!0):!1;return{handleDOMEvents:{dragenter:t,dragover:t,drop:(t,n)=>cc(n.dataTransfer)?(n.preventDefault(),e(),!0):!1,paste:(t,n)=>cc(n.clipboardData)?(n.preventDefault(),e(),!0):!1}}}function uc(e,t){let n=e?.[t];return typeof n==`string`?n:``}function dc(e,t){let n=e?.[t];return typeof n==`string`&&n?n:void 0}function fc(e,t){let n=e?.[t];return typeof n==`number`?n:void 0}function pc(e,t){let n=fc(e,t);return n!==void 0&&Number.isFinite(n)&&n>0?n:void 0}function mc(e){return e===`left`||e===`center`||e===`right`||e===`wide`||e===`full`?e:void 0}function hc(e){return e===`external-url`?`external`:e}function gc(e){if(!e||e.type!==`doc`||!e.content)return[];let t=[];for(let n=0;n<e.content.length;n++){let r=_c(e.content[n],`root:${n}`);r&&(Array.isArray(r)?t.push(...r):t.push(r))}return t}function _c(e,n){switch(e.type){case`paragraph`:{let{children:t,markDefs:n}=yc(e.content||[]);if(t.length===0)return null;let r=e.attrs?.textAlign,i=r===`center`||r===`right`||r===`justify`?r:void 0;return{_type:`block`,_key:$(),style:`normal`,children:t,markDefs:n.length>0?n:void 0,...i?{textAlign:i}:{}}}case`heading`:{let{children:t,markDefs:n}=yc(e.content||[]),r=fc(e.attrs,`level`)??1;if(t.length===0)return null;let i={1:`h1`,2:`h2`,3:`h3`,4:`h4`,5:`h5`,6:`h6`}[r]??`h1`,a=e.attrs?.textAlign,o=a===`center`||a===`right`||a===`justify`?a:void 0;return{_type:`block`,_key:$(),style:i,children:t,markDefs:n.length>0?n:void 0,...o?{textAlign:o}:{}}}case`bulletList`:return vc(e.content||[],`bullet`,1,e.attrs,n);case`orderedList`:return vc(e.content||[],`number`,1,e.attrs,n);case`blockquote`:{let t=[];for(let n of e.content||[])if(n.type===`paragraph`){let{children:e,markDefs:r}=yc(n.content||[]);e.length>0&&t.push({_type:`block`,_key:$(),style:`blockquote`,children:e,markDefs:r.length>0?r:void 0})}return t.length===1?t[0]??null:t.length>0?t:null}case`codeBlock`:{let t=(e.content||[]).map(e=>e.text||``).join(``);return{_type:`code`,_key:$(),code:t,language:dc(e.attrs,`language`)}}case`htmlBlock`:return{_type:`htmlBlock`,_key:$(),...t(e.attrs??{})};case`image`:{let t=dc(e.attrs,`provider`),n=dc(e.attrs,`blurhash`),r=dc(e.attrs,`dominantColor`),i=dc(e.attrs,`title`),a=Object.hasOwn(e.attrs??{},`caption`)?dc(e.attrs,`caption`)??(i?``:void 0):i;return{_type:`image`,_key:$(),asset:{_ref:uc(e.attrs,`mediaId`),url:uc(e.attrs,`src`),provider:t&&t!==`local`?t:void 0},alt:dc(e.attrs,`alt`),caption:a,title:i,width:pc(e.attrs,`width`),height:pc(e.attrs,`height`),...n?{blurhash:n}:{},...r?{dominantColor:r}:{},displayWidth:pc(e.attrs,`displayWidth`),displayHeight:pc(e.attrs,`displayHeight`),alignment:mc(e.attrs?.alignment),link:Jt(e.attrs?.link)??void 0}}case`horizontalRule`:return{_type:`break`,_key:$(),style:`lineBreak`};case`table`:{let t=e.attrs?.rawTable;return ac(t)?t:null}case`pluginBlock`:{let{blockType:t,id:n,identityField:r,data:i}=e.attrs??{},a=r===`url`||r===``?r:`id`;return{...i&&typeof i==`object`?i:{},_type:typeof t==`string`?t:`embed`,_key:$(),...a?{[a]:typeof n==`string`?n:``}:{}}}default:return null}}function vc(e,t,n,r,i){let a=[],o=t===`number`?on(r,i):void 0;for(let r=0;r<e.length;r++){let s=e[r];if(s.type===`listItem`)for(let e=0;e<(s.content?.length??0);e++){let c=s.content[e];if(c.type===`paragraph`){let{children:e,markDefs:r}=yc(c.content||[]);e.length>0&&a.push({_type:`block`,_key:$(),style:`normal`,listItem:t,level:n,...o,children:e,markDefs:r.length>0?r:void 0})}else if(c.type===`bulletList`||c.type===`orderedList`){let t=c.type===`bulletList`?`bullet`:`number`;a.push(...vc(c.content||[],t,n+1,c.attrs,`${i}:${r}:${e}`))}}}return a}function yc(e){let t=[],n=[],r=new Map;for(let i of e)if(i.type===`text`&&i.text){let e=[];for(let t of i.marks||[]){let i=bc(t,n,r);i&&e.push(i)}t.push({_type:`span`,_key:$(),text:i.text,marks:e.length>0?e:void 0})}else if(i.type===`hardBreak`){if(t.length>0){let e=t.at(-1);e&&(e.text+=`
`)}else t.push({_type:`span`,_key:$(),text:`
`})}return t.length===0&&t.push({_type:`span`,_key:$(),text:``}),{children:t,markDefs:n}}function bc(e,t,n){switch(e.type){case`bold`:case`strong`:return`strong`;case`italic`:case`em`:return`em`;case`underline`:return`underline`;case`strike`:case`strikethrough`:return`strike-through`;case`code`:return`code`;case`link`:{let r=uc(e.attrs,`href`);if(n.has(r))return n.get(r);let i=$();return t.push({_type:`link`,_key:i,href:r,blank:e.attrs?.target===`_blank`}),n.set(r,i),i}default:return e.type}}function xc(e){if(!e||e.length===0)return{type:`doc`,content:[{type:`paragraph`}]};nn(e);let t=[],n=0;for(;n<e.length;){let r=e[n];if(!r)n++;else if(ic(r)&&r.listItem){let i=[],a=r.listItem,o=n,s=a===`number`?V(r.listId):void 0;for(;n<e.length;){let t=e[n];if(!t||!ic(t)||!t.listItem)break;let r=t.level||1,o=t.listItem===`number`?V(t.listId):void 0,c=a!==`number`||r>1||(s?o===s:o===void 0);if(r>1||t.listItem===a&&c)i.push(t),n++;else break}t.push(Cc(i,a,`root:${o}`))}else if(ic(r)&&r.style===`blockquote`&&r.listItem===void 0){let r=[];for(;n<e.length;){let t=e[n];if(!t||!ic(t)||t.style!==`blockquote`||t.listItem!==void 0)break;r.push(t),n++}t.push({type:`blockquote`,content:r.map(e=>{let t=Ec(e.children,e.markDefs||[]);return{type:`paragraph`,content:t.length>0?t:void 0}})})}else{let e=Sc(r);e&&t.push(e),n++}}return un({type:`doc`,content:t.length>0?t:[{type:`paragraph`}]})}function Sc(e){if(ic(e)){let{style:t=`normal`,children:n,markDefs:r=[],textAlign:i}=e,a=Ec(n,r);return t===`blockquote`?{type:`blockquote`,content:[{type:`paragraph`,content:a.length>0?a:void 0}]}:t?.startsWith(`h`)?{type:`heading`,attrs:{level:parseInt(t.substring(1),10),...i?{textAlign:i}:{}},content:a.length>0?a:void 0}:{type:`paragraph`,attrs:i?{textAlign:i}:void 0,content:a.length>0?a:void 0}}if(e._type===`code`){let t=e;return{type:`codeBlock`,attrs:{language:typeof t.language==`string`&&t.language.length>0?t.language:null},content:t.code?[{type:`text`,text:t.code}]:void 0}}if(e._type===`break`)return{type:`horizontalRule`};if(e._type===`htmlBlock`)return{type:`htmlBlock`,attrs:{...t(e)}};if(e._type===`image`){let t=e,n=t.asset?.meta,{asset:r,alt:i,width:a,height:o}=Gt(t),s=typeof t.blurhash==`string`?t.blurhash:typeof n?.blurhash==`string`?n.blurhash:null,c=typeof t.dominantColor==`string`?t.dominantColor:typeof n?.dominantColor==`string`?n.dominantColor:null;return{type:`image`,attrs:{src:r.url||t.url||(r._ref?`/_emdash/api/media/file/${r._ref}`:``),alt:i||``,title:t.title||``,caption:Object.hasOwn(t,`caption`)?t.caption||``:t.title||``,mediaId:r._ref||void 0,provider:hc(r.provider),width:a,height:o,blurhash:s,dominantColor:c,displayWidth:t.displayWidth,displayHeight:t.displayHeight,alignment:mc(t.alignment)??null,link:Jt(t.link)}}}if(e._type===`table`)return{type:`table`,attrs:{rawTable:e}};let n=typeof e.id==`string`?`id`:typeof e.url==`string`?`url`:``,r=n?e[n]:void 0,i=Object.fromEntries(Object.entries(e).filter(([e])=>!e.startsWith(`_`)&&e!==n));return{type:`pluginBlock`,attrs:{blockType:typeof e._type==`string`?e._type:`embed`,id:typeof r==`string`?r:``,identityField:n,data:i}}}function Cc(e,t,n){let r=[],i=0;for(;i<e.length;){let a=e[i];if((a.level||1)===1){let o=[];for(i++;i<e.length&&(e[i].level||1)>1;)o.push(e[i]),i++;r.push(Tc(a,o,t,`${n}:${r.length}`))}else r.push(Tc(a,[],t,`${n}:${r.length}`)),i++}let a=e[0],o=V(a.listId)??an(`${n}:${a._key}`),s=H(a.listStart),c=t===`number`?{listId:o,...s===void 0?{}:{listStart:s}}:void 0;return{type:t===`bullet`?`bulletList`:`orderedList`,attrs:c?{...c,start:c.listStart??1}:void 0,content:r}}function wc(e,t,n,r,i){if((e.level||2)>t)return!0;if((e.listItem||n)!==r)return!1;if(r!==`number`)return!0;let a=V(e.listId);return i?a===i:a===void 0}function Tc(e,t,n,r){let i=[{type:`paragraph`,content:Ec(e.children,e.markDefs||[])}];if(t.length>0){let e=1/0;for(let n of t){let t=n.level||2;t<e&&(e=t)}let a=0;for(;a<t.length;){let o=a,s=t[a].listItem||n,c=s===`number`?V(t[a].listId):void 0,l=[];do l.push(t[a]),a++;while(a<t.length&&wc(t[a],e,n,s,c));i.push(Cc(l.map(e=>({...e,level:(e.level||2)-1})),s,`${r}:nested:${o}`))}}return{type:`listItem`,content:i}}function Ec(e,t){let n=[],r=new Map(t.map(e=>[e._key,e]));for(let t of e){if(t._type!==`span`)continue;let e=t.text.split(`
`);for(let i=0;i<e.length;i++){let a=e[i];if(a&&a.length>0){let e=Dc(t.marks||[],r),i={type:`text`,text:a};e.length>0&&(i.marks=e),n.push(i)}i<e.length-1&&n.push({type:`hardBreak`})}}return n}function Dc(e,t){let n=[];for(let r of e)switch(r){case`strong`:n.push({type:`bold`});break;case`em`:n.push({type:`italic`});break;case`underline`:n.push({type:`underline`});break;case`strike-through`:n.push({type:`strike`});break;case`code`:n.push({type:`code`});break;case`superscript`:n.push({type:`superscript`});break;case`subscript`:n.push({type:`subscript`});break;default:{let e=t.get(r);e&&e._type===`link`&&n.push({type:`link`,attrs:{href:e.href,target:e.blank?`_blank`:null}});break}}return n}var Oc=ce.create({name:`htmlBlock`,group:`block`,atom:!0,selectable:!0,draggable:!0,addAttributes(){let e={rendered:!1,parseHTML:()=>null};return{html:{default:``,...e},css:{default:``,...e},js:{default:``,...e},isolated:{default:!1,...e}}},parseHTML(){return[{tag:`div[data-emdash-html-block="true"]`}]},renderHTML({HTMLAttributes:e}){return[`div`,s(e,{"data-emdash-html-block":`true`,class:`emdash-plugin-block-placeholder`,contenteditable:`false`}),`HTML block (edit in admin)`]}}),kc=ce.create({name:`table`,group:`block`,atom:!0,selectable:!0,draggable:!0,addOptions(){return{placeholder:`Table (edit in admin)`}},addAttributes(){return{rawTable:{default:null,rendered:!1,parseHTML:()=>null}}},parseHTML(){return[{tag:`div[data-emdash-table-block="true"]`}]},addProseMirrorPlugins(){return[new xe({props:{handleDOMEvents:{cut:(e,t)=>{let n=!1;return e.state.selection.content().content.descendants(e=>{n||=e.type.name===`table`}),n?(t.preventDefault(),!0):!1}},handlePaste:(e,t,n)=>{let r=t.clipboardData?.getData(`text/html`)??``;if(!rc.test(r))return!1;let i=!1,a=!1;return n.content.descendants(e=>{e.type.name===`table`&&(i=!0,ac(e.attrs.rawTable)||(a=!0))}),i&&!a?!1:(t.preventDefault(),!0)}}})]},renderHTML({HTMLAttributes:e}){return[`div`,s(e,{"data-emdash-table-block":`true`,class:`emdash-plugin-block-placeholder`,contenteditable:`false`}),this.options.placeholder]}}),Ac=ce.create({name:`pluginBlock`,group:`block`,atom:!0,selectable:!0,draggable:!0,addAttributes(){let e={rendered:!1,parseHTML:()=>null};return{blockType:{default:``,...e},id:{default:``,...e},identityField:{default:`id`,...e},data:{default:{},...e}}},parseHTML(){return[{tag:`div[data-emdash-plugin-block="true"]`}]},renderHTML({HTMLAttributes:e,node:t}){let n=typeof t.attrs.blockType==`string`?t.attrs.blockType:``,r=n||`Block`;return[`div`,s(e,{"data-emdash-plugin-block":`true`,"data-block-type":n,class:`emdash-plugin-block-placeholder`,contenteditable:`false`}),`Plugin block: ${r} (edit in admin)`]}});function jc({value:e,collection:t,entryId:n,field:r,tablePlaceholder:i=kc.options.placeholder}){let a=B.useRef(e),o=B.useRef(null),s=B.useRef(!1),c=B.useRef(null),[l,u]=B.useState(null),[d,f]=B.useState(null),p=B.useCallback(()=>{let e=document.documentElement.lang||navigator.language;f(t=>({message:sc(e),version:(t?.version??0)+1}))},[]),m=B.useMemo(()=>lc(p),[p]),h=ka(),[g,_]=B.useState(Ls),v=B.useRef(g),y=B.useCallback(e=>{let t=typeof e==`function`?e(v.current):e;v.current=t,_(t)},[]),b=B.useRef({run:e=>{},dismiss:()=>{}}),[x]=B.useState(()=>{try{return{content:xc(e||[]),error:null}}catch(e){if(e instanceof en)return{content:{type:`doc`,content:[{type:`paragraph`}]},error:e};throw e}}),S=x.content,C=x.error,[w,T]=B.useState(null),E=B.useCallback(()=>{let e=c.current;if(!e)return a.current;let t=e.getJSON();return oc(t)?(rn(t),gc(t)):a.current},[]),O=B.useCallback(async e=>{if(C||s.current&&!e?.keepalive)return;let i=c.current?.state.doc;if(!i||!o.current||i.eq(o.current))return;s.current=!0;let l=()=>{},u=new Promise(e=>{l=()=>e()});document.dispatchEvent(new CustomEvent(`emdash:save-pending`,{detail:{done:u}}));try{let s=E(),c=await fetch(`/_emdash/api/content/${encodeURIComponent(t)}/${encodeURIComponent(n)}`,{method:`PUT`,credentials:`same-origin`,headers:{"Content-Type":`application/json`,"X-EmDash-Request":`1`},body:JSON.stringify({data:{[r]:s},skipRevision:!0}),keepalive:e?.keepalive??!1});c.ok?(T(null),a.current=s,o.current=i,document.dispatchEvent(new CustomEvent(`emdash:save`,{detail:{state:`saved`}})),document.dispatchEvent(new CustomEvent(`emdash:content-changed`,{detail:{collection:t,id:n}}))):(T(`Save failed: ${c.status}`),document.dispatchEvent(new CustomEvent(`emdash:save`,{detail:{state:`error`}})),console.error(`Save failed:`,c.status))}catch(e){T(e instanceof en?`Save failed: unsupported formatting (${e.marks.join(`, `)}).`:`Save failed. Please try again.`),document.dispatchEvent(new CustomEvent(`emdash:save`,{detail:{state:`error`}})),console.error(`Save failed:`,e)}finally{s.current=!1,l()}},[t,n,r,E,C]);B.useEffect(()=>{let e=()=>void O({keepalive:!0});return window.addEventListener(`pagehide`,e),()=>window.removeEventListener(`pagehide`,e)},[O]);let k=B.useMemo(()=>Rs({onStateChange:y,getState:()=>v.current,onCommand:e=>b.current.run(e),onDismiss:()=>b.current.dismiss()}),[y]),A=ee({extensions:[oe.configure({dropcursor:{color:`#3b82f6`,width:2},codeBlock:!1,code:!1,orderedList:!1,link:!1,underline:!1}),nc,dn,ks,Lo,pe,je,D,j.configure({openOnClick:!1,HTMLAttributes:{target:null,class:`underline text-blue-600 dark:text-blue-400`}}),Tt.configure({includeChildren:!0,placeholder:({node:e})=>e.type.name===`paragraph`?`Type / for commands...`:``}),z.configure({types:[`heading`,`paragraph`]}),Me.configure({className:`has-focus`,mode:`all`}),re,Oc,kc.configure({placeholder:i}),Ac,k],content:S,immediatelyRender:!1,editorProps:{attributes:{class:`prose prose-sm sm:prose-base dark:prose-invert max-w-none emdash-inline-editor`,dir:`auto`},...m},onUpdate:()=>{document.dispatchEvent(new CustomEvent(`emdash:save`,{detail:{state:`unsaved`}}))}});B.useEffect(()=>{c.current=A,A&&!o.current&&(o.current=A.state.doc)},[A]);let M=B.useCallback(e=>{let{range:t}=v.current;A&&t&&(e.command({editor:A,range:t,openImagePicker:()=>u(A.state.selection.from)}),y(e=>({...e,isOpen:!1})))},[A,y]),N=B.useCallback(()=>{let{range:e}=v.current;y(t=>({...t,isOpen:!1,dismissedSlashFrom:e?e.from:t.dismissedSlashFrom})),A&&e&&Vt(A.view)},[A,y]);b.current={run:M,dismiss:N};let P=l!==null;B.useEffect(()=>{if(!A||!P)return;let e=({transaction:e})=>{e.docChanged&&u(t=>t===null?t:e.mapping.map(t))};return A.on(`transaction`,e),()=>{A.off(`transaction`,e)}},[A,P]);let F=B.useMemo(()=>A&&l!==null?{getBoundingClientRect:()=>{if(A.isDestroyed)return new DOMRect;let{view:e}=A,t=e.coordsAtPos(Math.min(l,e.state.doc.content.size));return new DOMRect(t.left,t.top,0,t.bottom-t.top)},contextElement:A.view.dom}:null,[A,l]),I=B.useCallback(e=>{let t=e.relatedTarget instanceof HTMLElement?e.relatedTarget:null;if(t&&e.currentTarget.contains(t)||t?.hasAttribute(`data-emdash-clipboard-fallback`)||t&&h?.contains(t))return;let n=e.nativeEvent;queueMicrotask(()=>{!A||A.isDestroyed||A.view.hasFocus()||h?.contains(document.activeElement)||A.view.dispatch(A.state.tr.setMeta(`blur`,{event:n}))}),O()},[A,O,h]);return!A||!h?null:(0,X.jsxs)(`div`,{onBlur:I,children:[C?(0,X.jsxs)(`div`,{className:`emdash-inline-editor-error`,role:`alert`,dir:`auto`,children:[`This field can’t be edited here because it contains unsupported Portable Text marks:`,` `,C.marks.join(`, `),`.`]}):(0,X.jsxs)(X.Fragment,{children:[(0,X.jsx)(fs,{editor:A,uiRoot:h,onImageReplaced:()=>void O()}),(0,X.jsx)(Te,{editor:A})]}),w?(0,X.jsx)(`div`,{className:`emdash-inline-editor-error`,role:`alert`,dir:`auto`,children:w}):null,d?(0,X.jsx)(`div`,{className:`emdash-inline-editor-guidance`,role:`status`,"aria-live":`polite`,dir:`auto`,children:d.message},d.version):null,(0,X.jsx)(zs,{editor:A,uiRoot:h,state:g,onCommand:M,onClose:N,setSelectedIndex:e=>y(t=>({...t,selectedIndex:e}))}),l!==null&&F&&(0,X.jsx)(yo,{uiRoot:h,reference:F,gap:6,label:`Insert image`,onChoose:e=>{jo(A,l,e),A.view.focus(),u(null),O()},onClose:e=>{e!==`blur`&&A.view.focus(),u(null)}}),(0,X.jsx)(`style`,{children:`
				.emdash-inline-code-block {
					position: relative;
					margin-block: 1rem;
					--emdash-code-background: var(--emdash-inline-code-background, #f7f7f5);
					--emdash-code-foreground: var(--emdash-inline-code-foreground, #24292f);
					--emdash-code-muted: var(--emdash-inline-code-muted, #57606a);
					--emdash-code-keyword: var(--emdash-inline-code-keyword, #b8172a);
					--emdash-code-string: var(--emdash-inline-code-string, #0a3069);
					--emdash-code-number: var(--emdash-inline-code-number, #0550ae);
					--emdash-code-title: var(--emdash-inline-code-title, #7545c7);
					--emdash-code-border: var(--emdash-inline-code-border, #7d8590);
					--emdash-code-control-background: var(
						--emdash-inline-code-control-background,
						var(--emdash-inline-bg, #ffffff)
					);
					--emdash-code-control-foreground: var(
						--emdash-inline-code-control-foreground,
						#24292f
					);
					--emdash-code-focus: var(--emdash-inline-code-focus, #0550ae);
				}
				.emdash-inline-code-block .emdash-code-block {
					margin: 0;
					padding: 1rem;
					padding-block: 30px !important;
					border: 0 !important;
					border-radius: 0.5rem;
					background: var(--emdash-code-background) !important;
					color: var(--emdash-code-foreground) !important;
					caret-color: var(--emdash-code-foreground) !important;
					overflow-x: auto;
				}
				.emdash-inline-code-block .emdash-code-block code {
					background: transparent !important;
					color: inherit !important;
					font-size: 13px !important;
				}
				.emdash-inline-code-block :is(.hljs-comment, .hljs-quote) {
					color: var(--emdash-code-muted);
				}
				.emdash-inline-code-block
					:is(.hljs-keyword, .hljs-literal, .hljs-selector-tag, .hljs-section, .hljs-link, .hljs-deletion) {
					color: var(--emdash-code-keyword);
				}
				.emdash-inline-code-block
					:is(.hljs-string, .hljs-attr, .hljs-attribute, .hljs-symbol, .hljs-bullet, .hljs-addition) {
					color: var(--emdash-code-string);
				}
				.emdash-inline-code-block :is(.hljs-number, .hljs-meta) {
					color: var(--emdash-code-number);
				}
				.emdash-inline-code-block
					:is(.hljs-title, .hljs-name, .hljs-type, .hljs-built_in, .hljs-selector-id, .hljs-selector-class) {
					color: var(--emdash-code-title);
				}
				.emdash-inline-code-block-popover,
				.emdash-inline-code-block-chip {
					box-sizing: border-box;
					border: 1px solid var(--emdash-code-border);
					background: var(--emdash-code-control-background);
					color: var(--emdash-code-control-foreground);
				}
				.emdash-inline-code-block-controls-wrap {
					position: absolute;
					inset-block-start: 0;
					inset-inline-end: 0.25rem;
					z-index: 100;
					max-inline-size: min(calc(100% - 0.25rem), calc(100vw - 1rem));
					opacity: 0;
					pointer-events: none;
					user-select: none;
					transition: opacity 120ms ease-out;
				}
				.emdash-inline-code-block:hover .emdash-inline-code-block-controls-wrap,
				.emdash-inline-code-block:focus-within .emdash-inline-code-block-controls-wrap,
				.emdash-inline-code-block-controls-wrap[data-persistent="true"] {
					opacity: 1;
					pointer-events: auto;
				}
				.emdash-inline-code-block-popover {
					inline-size: min(14rem, 100%, calc(100vw - 1rem));
				}
				.emdash-inline-code-block-language-input {
					min-inline-size: 0;
					flex: 1;
					border: 1px solid var(--emdash-code-border);
					background: transparent;
					color: inherit;
				}
				.emdash-inline-code-block-controls-wrap button:focus-visible,
				.emdash-inline-code-block-language-input:focus-visible {
					outline: 2px solid var(--emdash-code-focus);
					outline-offset: 2px;
				}
				@media (hover: none), (pointer: coarse) {
					.emdash-inline-code-block-controls-wrap {
						opacity: 1;
						pointer-events: auto;
					}
				}
				@media (prefers-reduced-motion: reduce) {
					.emdash-inline-code-block-controls-wrap {
						transition: none;
					}
				}
				@media (prefers-color-scheme: dark) {
					.emdash-inline-code-block {
						--emdash-code-background: var(--emdash-inline-code-background, #202020);
						--emdash-code-foreground: var(--emdash-inline-code-foreground, #f0f3f6);
						--emdash-code-muted: var(--emdash-inline-code-muted, #c9d1d9);
						--emdash-code-keyword: var(--emdash-inline-code-keyword, #ffc1bb);
						--emdash-code-string: var(--emdash-inline-code-string, #b9ddff);
						--emdash-code-number: var(--emdash-inline-code-number, #a8d5ff);
						--emdash-code-title: var(--emdash-inline-code-title, #e5ccff);
						--emdash-code-border: var(--emdash-inline-code-border, #6e7681);
						--emdash-code-control-background: var(
							--emdash-inline-code-control-background,
							var(--emdash-inline-bg, #161b22)
						);
						--emdash-code-control-foreground: var(
							--emdash-inline-code-control-foreground,
							#f0f3f6
						);
						--emdash-code-focus: var(--emdash-inline-code-focus, #a8d5ff);
					}
				}
				.emdash-inline-editor .emdash-slash-query {
					margin-inline: -0.25em;
					padding: 0.125em 0.25em;
					border-radius: 0.375rem;
					background: color-mix(in srgb, currentColor 8%, transparent);
				}
				.emdash-inline-editor .emdash-slash-query.is-empty::after {
					content: "Type to search";
					color: color-mix(in srgb, currentColor 45%, transparent);
					pointer-events: none;
				}
				${qa}
				${bo}
				${Bo}
				.emdash-inline-editor:focus {
					outline: none;
				}
				.emdash-inline-editor:focus p.is-editor-empty {
					display: flow-root;
				}
				.emdash-inline-editor:focus p.is-editor-empty::before {
					content: attr(data-placeholder);
					float: inline-start;
					width: 100%;
					margin-inline-end: -100%;
					opacity: 0.5;
					pointer-events: none;
				}
				.emdash-inline-editor-guidance {
					margin-block-start: 0.75rem;
					padding-block: 0.625rem;
					padding-inline: 0.875rem;
					border: 1px solid #bfdbfe;
					border-radius: 0.5rem;
					background: #eff6ff;
					color: #1e3a8a;
					font-size: 0.875rem;
					font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
					line-height: 1.4;
					text-align: start;
				}
				.emdash-inline-editor-error {
					margin-block-start: 0.75rem;
					padding-block: 0.625rem;
					padding-inline: 0.875rem;
					border: 1px solid #fecaca;
					border-radius: 0.5rem;
					background: #fef2f2;
					color: #991b1b;
					font-size: 0.875rem;
					font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
					line-height: 1.4;
					text-align: start;
				}
				.emdash-plugin-block-placeholder {
					margin: 0.75rem 0;
					padding: 0.625rem 0.875rem;
					border: 1px dashed #d1d5db;
					border-radius: 0.5rem;
					background: #f9fafb;
					color: #4b5563;
					font-size: 0.875rem;
					font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
					user-select: none;
				}
				@media (prefers-color-scheme: dark) {
					.emdash-inline-editor-guidance {
						border-color: #1e40af;
						background: #172554;
						color: #dbeafe;
					}
					.emdash-inline-editor-error {
						border-color: #991b1b;
						background: #450a0a;
						color: #fee2e2;
					}
					.emdash-plugin-block-placeholder {
						border-color: #374151;
						background: #111827;
						color: #9ca3af;
					}
				}
			`})]})}export{jc as InlinePortableTextEditor,kc as _InlineTableBlockNode,lc as _createUnsupportedFileHandlers,gc as _pmToPortableText,xc as _portableTextToPM};