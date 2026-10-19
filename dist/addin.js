(()=>{var Zm=Object.create;var Nd=Object.defineProperty;var Jm=Object.getOwnPropertyDescriptor;var eg=Object.getOwnPropertyNames;var tg=Object.getPrototypeOf,ng=Object.prototype.hasOwnProperty;var P=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var rg=(e,t,n,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let o of eg(t))!ng.call(e,o)&&o!==n&&Nd(e,o,{get:()=>t[o],enumerable:!(r=Jm(t,o))||r.enumerable});return e};var F=(e,t,n)=>(n=e!=null?Zm(tg(e)):{},rg(t||!e||!e.__esModule?Nd(n,"default",{value:e,enumerable:!0}):n,e));var Bd=P(T=>{"use strict";var pr=Symbol.for("react.element"),og=Symbol.for("react.portal"),ig=Symbol.for("react.fragment"),ag=Symbol.for("react.strict_mode"),lg=Symbol.for("react.profiler"),sg=Symbol.for("react.provider"),dg=Symbol.for("react.context"),cg=Symbol.for("react.forward_ref"),pg=Symbol.for("react.suspense"),fg=Symbol.for("react.memo"),ug=Symbol.for("react.lazy"),Ed=Symbol.iterator;function mg(e){return e===null||typeof e!="object"?null:(e=Ed&&e[Ed]||e["@@iterator"],typeof e=="function"?e:null)}var Pd={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},Md=Object.assign,Id={};function yn(e,t,n){this.props=e,this.context=t,this.refs=Id,this.updater=n||Pd}yn.prototype.isReactComponent={};yn.prototype.setState=function(e,t){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")};yn.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function Td(){}Td.prototype=yn.prototype;function Ia(e,t,n){this.props=e,this.context=t,this.refs=Id,this.updater=n||Pd}var Ta=Ia.prototype=new Td;Ta.constructor=Ia;Md(Ta,yn.prototype);Ta.isPureReactComponent=!0;var jd=Array.isArray,Ld=Object.prototype.hasOwnProperty,La={current:null},Od={key:!0,ref:!0,__self:!0,__source:!0};function Rd(e,t,n){var r,o={},i=null,a=null;if(t!=null)for(r in t.ref!==void 0&&(a=t.ref),t.key!==void 0&&(i=""+t.key),t)Ld.call(t,r)&&!Od.hasOwnProperty(r)&&(o[r]=t[r]);var l=arguments.length-2;if(l===1)o.children=n;else if(1<l){for(var s=Array(l),d=0;d<l;d++)s[d]=arguments[d+2];o.children=s}if(e&&e.defaultProps)for(r in l=e.defaultProps,l)o[r]===void 0&&(o[r]=l[r]);return{$$typeof:pr,type:e,key:i,ref:a,props:o,_owner:La.current}}function gg(e,t){return{$$typeof:pr,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}function Oa(e){return typeof e=="object"&&e!==null&&e.$$typeof===pr}function hg(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(n){return t[n]})}var Dd=/\/+/g;function Ma(e,t){return typeof e=="object"&&e!==null&&e.key!=null?hg(""+e.key):t.toString(36)}function zo(e,t,n,r,o){var i=typeof e;(i==="undefined"||i==="boolean")&&(e=null);var a=!1;if(e===null)a=!0;else switch(i){case"string":case"number":a=!0;break;case"object":switch(e.$$typeof){case pr:case og:a=!0}}if(a)return a=e,o=o(a),e=r===""?"."+Ma(a,0):r,jd(o)?(n="",e!=null&&(n=e.replace(Dd,"$&/")+"/"),zo(o,t,n,"",function(d){return d})):o!=null&&(Oa(o)&&(o=gg(o,n+(!o.key||a&&a.key===o.key?"":(""+o.key).replace(Dd,"$&/")+"/")+e)),t.push(o)),1;if(a=0,r=r===""?".":r+":",jd(e))for(var l=0;l<e.length;l++){i=e[l];var s=r+Ma(i,l);a+=zo(i,t,n,s,o)}else if(s=mg(e),typeof s=="function")for(e=s.call(e),l=0;!(i=e.next()).done;)i=i.value,s=r+Ma(i,l++),a+=zo(i,t,n,s,o);else if(i==="object")throw t=String(e),Error("Objects are not valid as a React child (found: "+(t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.");return a}function vo(e,t,n){if(e==null)return e;var r=[],o=0;return zo(e,r,"","",function(i){return t.call(n,i,o++)}),r}function xg(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(n){(e._status===0||e._status===-1)&&(e._status=1,e._result=n)},function(n){(e._status===0||e._status===-1)&&(e._status=2,e._result=n)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var _e={current:null},_o={transition:null},bg={ReactCurrentDispatcher:_e,ReactCurrentBatchConfig:_o,ReactCurrentOwner:La};function Fd(){throw Error("act(...) is not supported in production builds of React.")}T.Children={map:vo,forEach:function(e,t,n){vo(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return vo(e,function(){t++}),t},toArray:function(e){return vo(e,function(t){return t})||[]},only:function(e){if(!Oa(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};T.Component=yn;T.Fragment=ig;T.Profiler=lg;T.PureComponent=Ia;T.StrictMode=ag;T.Suspense=pg;T.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=bg;T.act=Fd;T.cloneElement=function(e,t,n){if(e==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var r=Md({},e.props),o=e.key,i=e.ref,a=e._owner;if(t!=null){if(t.ref!==void 0&&(i=t.ref,a=La.current),t.key!==void 0&&(o=""+t.key),e.type&&e.type.defaultProps)var l=e.type.defaultProps;for(s in t)Ld.call(t,s)&&!Od.hasOwnProperty(s)&&(r[s]=t[s]===void 0&&l!==void 0?l[s]:t[s])}var s=arguments.length-2;if(s===1)r.children=n;else if(1<s){l=Array(s);for(var d=0;d<s;d++)l[d]=arguments[d+2];r.children=l}return{$$typeof:pr,type:e.type,key:o,ref:i,props:r,_owner:a}};T.createContext=function(e){return e={$$typeof:dg,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},e.Provider={$$typeof:sg,_context:e},e.Consumer=e};T.createElement=Rd;T.createFactory=function(e){var t=Rd.bind(null,e);return t.type=e,t};T.createRef=function(){return{current:null}};T.forwardRef=function(e){return{$$typeof:cg,render:e}};T.isValidElement=Oa;T.lazy=function(e){return{$$typeof:ug,_payload:{_status:-1,_result:e},_init:xg}};T.memo=function(e,t){return{$$typeof:fg,type:e,compare:t===void 0?null:t}};T.startTransition=function(e){var t=_o.transition;_o.transition={};try{e()}finally{_o.transition=t}};T.unstable_act=Fd;T.useCallback=function(e,t){return _e.current.useCallback(e,t)};T.useContext=function(e){return _e.current.useContext(e)};T.useDebugValue=function(){};T.useDeferredValue=function(e){return _e.current.useDeferredValue(e)};T.useEffect=function(e,t){return _e.current.useEffect(e,t)};T.useId=function(){return _e.current.useId()};T.useImperativeHandle=function(e,t,n){return _e.current.useImperativeHandle(e,t,n)};T.useInsertionEffect=function(e,t){return _e.current.useInsertionEffect(e,t)};T.useLayoutEffect=function(e,t){return _e.current.useLayoutEffect(e,t)};T.useMemo=function(e,t){return _e.current.useMemo(e,t)};T.useReducer=function(e,t,n){return _e.current.useReducer(e,t,n)};T.useRef=function(e){return _e.current.useRef(e)};T.useState=function(e){return _e.current.useState(e)};T.useSyncExternalStore=function(e,t,n){return _e.current.useSyncExternalStore(e,t,n)};T.useTransition=function(){return _e.current.useTransition()};T.version="18.3.1"});var O=P((Bv,Ud)=>{"use strict";Ud.exports=Bd()});var Xd=P(H=>{"use strict";function Ua(e,t){var n=e.length;e.push(t);e:for(;0<n;){var r=n-1>>>1,o=e[r];if(0<yo(o,t))e[r]=t,e[n]=o,n=r;else break e}}function Je(e){return e.length===0?null:e[0]}function ko(e){if(e.length===0)return null;var t=e[0],n=e.pop();if(n!==t){e[0]=n;e:for(var r=0,o=e.length,i=o>>>1;r<i;){var a=2*(r+1)-1,l=e[a],s=a+1,d=e[s];if(0>yo(l,n))s<o&&0>yo(d,l)?(e[r]=d,e[s]=n,r=s):(e[r]=l,e[a]=n,r=a);else if(s<o&&0>yo(d,n))e[r]=d,e[s]=n,r=s;else break e}}return t}function yo(e,t){var n=e.sortIndex-t.sortIndex;return n!==0?n:e.id-t.id}typeof performance=="object"&&typeof performance.now=="function"?($d=performance,H.unstable_now=function(){return $d.now()}):(Ra=Date,Ad=Ra.now(),H.unstable_now=function(){return Ra.now()-Ad});var $d,Ra,Ad,st=[],Nt=[],vg=1,We=null,me=3,So=!1,Jt=!1,ur=!1,Wd=typeof setTimeout=="function"?setTimeout:null,Vd=typeof clearTimeout=="function"?clearTimeout:null,Hd=typeof setImmediate!="undefined"?setImmediate:null;typeof navigator!="undefined"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function $a(e){for(var t=Je(Nt);t!==null;){if(t.callback===null)ko(Nt);else if(t.startTime<=e)ko(Nt),t.sortIndex=t.expirationTime,Ua(st,t);else break;t=Je(Nt)}}function Aa(e){if(ur=!1,$a(e),!Jt)if(Je(st)!==null)Jt=!0,qa(Ha);else{var t=Je(Nt);t!==null&&Wa(Aa,t.startTime-e)}}function Ha(e,t){Jt=!1,ur&&(ur=!1,Vd(mr),mr=-1),So=!0;var n=me;try{for($a(t),We=Je(st);We!==null&&(!(We.expirationTime>t)||e&&!Qd());){var r=We.callback;if(typeof r=="function"){We.callback=null,me=We.priorityLevel;var o=r(We.expirationTime<=t);t=H.unstable_now(),typeof o=="function"?We.callback=o:We===Je(st)&&ko(st),$a(t)}else ko(st);We=Je(st)}if(We!==null)var i=!0;else{var a=Je(Nt);a!==null&&Wa(Aa,a.startTime-t),i=!1}return i}finally{We=null,me=n,So=!1}}var Co=!1,wo=null,mr=-1,Kd=5,Gd=-1;function Qd(){return!(H.unstable_now()-Gd<Kd)}function Fa(){if(wo!==null){var e=H.unstable_now();Gd=e;var t=!0;try{t=wo(!0,e)}finally{t?fr():(Co=!1,wo=null)}}else Co=!1}var fr;typeof Hd=="function"?fr=function(){Hd(Fa)}:typeof MessageChannel!="undefined"?(Ba=new MessageChannel,qd=Ba.port2,Ba.port1.onmessage=Fa,fr=function(){qd.postMessage(null)}):fr=function(){Wd(Fa,0)};var Ba,qd;function qa(e){wo=e,Co||(Co=!0,fr())}function Wa(e,t){mr=Wd(function(){e(H.unstable_now())},t)}H.unstable_IdlePriority=5;H.unstable_ImmediatePriority=1;H.unstable_LowPriority=4;H.unstable_NormalPriority=3;H.unstable_Profiling=null;H.unstable_UserBlockingPriority=2;H.unstable_cancelCallback=function(e){e.callback=null};H.unstable_continueExecution=function(){Jt||So||(Jt=!0,qa(Ha))};H.unstable_forceFrameRate=function(e){0>e||125<e?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):Kd=0<e?Math.floor(1e3/e):5};H.unstable_getCurrentPriorityLevel=function(){return me};H.unstable_getFirstCallbackNode=function(){return Je(st)};H.unstable_next=function(e){switch(me){case 1:case 2:case 3:var t=3;break;default:t=me}var n=me;me=t;try{return e()}finally{me=n}};H.unstable_pauseExecution=function(){};H.unstable_requestPaint=function(){};H.unstable_runWithPriority=function(e,t){switch(e){case 1:case 2:case 3:case 4:case 5:break;default:e=3}var n=me;me=e;try{return t()}finally{me=n}};H.unstable_scheduleCallback=function(e,t,n){var r=H.unstable_now();switch(typeof n=="object"&&n!==null?(n=n.delay,n=typeof n=="number"&&0<n?r+n:r):n=r,e){case 1:var o=-1;break;case 2:o=250;break;case 5:o=1073741823;break;case 4:o=1e4;break;default:o=5e3}return o=n+o,e={id:vg++,callback:t,priorityLevel:e,startTime:n,expirationTime:o,sortIndex:-1},n>r?(e.sortIndex=n,Ua(Nt,e),Je(st)===null&&e===Je(Nt)&&(ur?(Vd(mr),mr=-1):ur=!0,Wa(Aa,n-r))):(e.sortIndex=o,Ua(st,e),Jt||So||(Jt=!0,qa(Ha))),e};H.unstable_shouldYield=Qd;H.unstable_wrapCallback=function(e){var t=me;return function(){var n=me;me=t;try{return e.apply(this,arguments)}finally{me=n}}}});var Zd=P(($v,Yd)=>{"use strict";Yd.exports=Xd()});var ru=P(Ue=>{"use strict";var zg=O(),Fe=Zd();function y(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,n=1;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var ip=new Set,Or={};function un(e,t){Hn(e,t),Hn(e+"Capture",t)}function Hn(e,t){for(Or[e]=t,e=0;e<t.length;e++)ip.add(t[e])}var yt=!(typeof window=="undefined"||typeof window.document=="undefined"||typeof window.document.createElement=="undefined"),ml=Object.prototype.hasOwnProperty,_g=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,Jd={},ec={};function yg(e){return ml.call(ec,e)?!0:ml.call(Jd,e)?!1:_g.test(e)?ec[e]=!0:(Jd[e]=!0,!1)}function wg(e,t,n,r){if(n!==null&&n.type===0)return!1;switch(typeof t){case"function":case"symbol":return!0;case"boolean":return r?!1:n!==null?!n.acceptsBooleans:(e=e.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-");default:return!1}}function kg(e,t,n,r){if(t===null||typeof t=="undefined"||wg(e,t,n,r))return!0;if(r)return!1;if(n!==null)switch(n.type){case 3:return!t;case 4:return t===!1;case 5:return isNaN(t);case 6:return isNaN(t)||1>t}return!1}function ke(e,t,n,r,o,i,a){this.acceptsBooleans=t===2||t===3||t===4,this.attributeName=r,this.attributeNamespace=o,this.mustUseProperty=n,this.propertyName=e,this.type=t,this.sanitizeURL=i,this.removeEmptyString=a}var fe={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){fe[e]=new ke(e,0,!1,e,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var t=e[0];fe[t]=new ke(t,1,!1,e[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(e){fe[e]=new ke(e,2,!1,e.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){fe[e]=new ke(e,2,!1,e,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){fe[e]=new ke(e,3,!1,e.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(e){fe[e]=new ke(e,3,!0,e,null,!1,!1)});["capture","download"].forEach(function(e){fe[e]=new ke(e,4,!1,e,null,!1,!1)});["cols","rows","size","span"].forEach(function(e){fe[e]=new ke(e,6,!1,e,null,!1,!1)});["rowSpan","start"].forEach(function(e){fe[e]=new ke(e,5,!1,e.toLowerCase(),null,!1,!1)});var as=/[\-:]([a-z])/g;function ls(e){return e[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var t=e.replace(as,ls);fe[t]=new ke(t,1,!1,e,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var t=e.replace(as,ls);fe[t]=new ke(t,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(e){var t=e.replace(as,ls);fe[t]=new ke(t,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(e){fe[e]=new ke(e,1,!1,e.toLowerCase(),null,!1,!1)});fe.xlinkHref=new ke("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(e){fe[e]=new ke(e,1,!1,e.toLowerCase(),null,!0,!0)});function ss(e,t,n,r){var o=fe.hasOwnProperty(t)?fe[t]:null;(o!==null?o.type!==0:r||!(2<t.length)||t[0]!=="o"&&t[0]!=="O"||t[1]!=="n"&&t[1]!=="N")&&(kg(t,n,o,r)&&(n=null),r||o===null?yg(t)&&(n===null?e.removeAttribute(t):e.setAttribute(t,""+n)):o.mustUseProperty?e[o.propertyName]=n===null?o.type===3?!1:"":n:(t=o.attributeName,r=o.attributeNamespace,n===null?e.removeAttribute(t):(o=o.type,n=o===3||o===4&&n===!0?"":""+n,r?e.setAttributeNS(r,t,n):e.setAttribute(t,n))))}var Ct=zg.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,No=Symbol.for("react.element"),Sn=Symbol.for("react.portal"),Cn=Symbol.for("react.fragment"),ds=Symbol.for("react.strict_mode"),gl=Symbol.for("react.profiler"),ap=Symbol.for("react.provider"),lp=Symbol.for("react.context"),cs=Symbol.for("react.forward_ref"),hl=Symbol.for("react.suspense"),xl=Symbol.for("react.suspense_list"),ps=Symbol.for("react.memo"),jt=Symbol.for("react.lazy");Symbol.for("react.scope");Symbol.for("react.debug_trace_mode");var sp=Symbol.for("react.offscreen");Symbol.for("react.legacy_hidden");Symbol.for("react.cache");Symbol.for("react.tracing_marker");var tc=Symbol.iterator;function gr(e){return e===null||typeof e!="object"?null:(e=tc&&e[tc]||e["@@iterator"],typeof e=="function"?e:null)}var J=Object.assign,Va;function wr(e){if(Va===void 0)try{throw Error()}catch(n){var t=n.stack.trim().match(/\n( *(at )?)/);Va=t&&t[1]||""}return`
`+Va+e}var Ka=!1;function Ga(e,t){if(!e||Ka)return"";Ka=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(t)if(t=function(){throw Error()},Object.defineProperty(t.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(t,[])}catch(d){var r=d}Reflect.construct(e,[],t)}else{try{t.call()}catch(d){r=d}e.call(t.prototype)}else{try{throw Error()}catch(d){r=d}e()}}catch(d){if(d&&r&&typeof d.stack=="string"){for(var o=d.stack.split(`
`),i=r.stack.split(`
`),a=o.length-1,l=i.length-1;1<=a&&0<=l&&o[a]!==i[l];)l--;for(;1<=a&&0<=l;a--,l--)if(o[a]!==i[l]){if(a!==1||l!==1)do if(a--,l--,0>l||o[a]!==i[l]){var s=`
`+o[a].replace(" at new "," at ");return e.displayName&&s.includes("<anonymous>")&&(s=s.replace("<anonymous>",e.displayName)),s}while(1<=a&&0<=l);break}}}finally{Ka=!1,Error.prepareStackTrace=n}return(e=e?e.displayName||e.name:"")?wr(e):""}function Sg(e){switch(e.tag){case 5:return wr(e.type);case 16:return wr("Lazy");case 13:return wr("Suspense");case 19:return wr("SuspenseList");case 0:case 2:case 15:return e=Ga(e.type,!1),e;case 11:return e=Ga(e.type.render,!1),e;case 1:return e=Ga(e.type,!0),e;default:return""}}function bl(e){if(e==null)return null;if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case Cn:return"Fragment";case Sn:return"Portal";case gl:return"Profiler";case ds:return"StrictMode";case hl:return"Suspense";case xl:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case lp:return(e.displayName||"Context")+".Consumer";case ap:return(e._context.displayName||"Context")+".Provider";case cs:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case ps:return t=e.displayName||null,t!==null?t:bl(e.type)||"Memo";case jt:t=e._payload,e=e._init;try{return bl(e(t))}catch{}}return null}function Cg(e){var t=e.type;switch(e.tag){case 24:return"Cache";case 9:return(t.displayName||"Context")+".Consumer";case 10:return(t._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=t.render,e=e.displayName||e.name||"",t.displayName||(e!==""?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return t;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return bl(t);case 8:return t===ds?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t}return null}function Ht(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function dp(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function Ng(e){var t=dp(e)?"checked":"value",n=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),r=""+e[t];if(!e.hasOwnProperty(t)&&typeof n!="undefined"&&typeof n.get=="function"&&typeof n.set=="function"){var o=n.get,i=n.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return o.call(this)},set:function(a){r=""+a,i.call(this,a)}}),Object.defineProperty(e,t,{enumerable:n.enumerable}),{getValue:function(){return r},setValue:function(a){r=""+a},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function Eo(e){e._valueTracker||(e._valueTracker=Ng(e))}function cp(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),r="";return e&&(r=dp(e)?e.checked?"true":"false":e.value),e=r,e!==n?(t.setValue(e),!0):!1}function ni(e){if(e=e||(typeof document!="undefined"?document:void 0),typeof e=="undefined")return null;try{return e.activeElement||e.body}catch{return e.body}}function vl(e,t){var n=t.checked;return J({},t,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n!=null?n:e._wrapperState.initialChecked})}function nc(e,t){var n=t.defaultValue==null?"":t.defaultValue,r=t.checked!=null?t.checked:t.defaultChecked;n=Ht(t.value!=null?t.value:n),e._wrapperState={initialChecked:r,initialValue:n,controlled:t.type==="checkbox"||t.type==="radio"?t.checked!=null:t.value!=null}}function pp(e,t){t=t.checked,t!=null&&ss(e,"checked",t,!1)}function zl(e,t){pp(e,t);var n=Ht(t.value),r=t.type;if(n!=null)r==="number"?(n===0&&e.value===""||e.value!=n)&&(e.value=""+n):e.value!==""+n&&(e.value=""+n);else if(r==="submit"||r==="reset"){e.removeAttribute("value");return}t.hasOwnProperty("value")?_l(e,t.type,n):t.hasOwnProperty("defaultValue")&&_l(e,t.type,Ht(t.defaultValue)),t.checked==null&&t.defaultChecked!=null&&(e.defaultChecked=!!t.defaultChecked)}function rc(e,t,n){if(t.hasOwnProperty("value")||t.hasOwnProperty("defaultValue")){var r=t.type;if(!(r!=="submit"&&r!=="reset"||t.value!==void 0&&t.value!==null))return;t=""+e._wrapperState.initialValue,n||t===e.value||(e.value=t),e.defaultValue=t}n=e.name,n!==""&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,n!==""&&(e.name=n)}function _l(e,t,n){(t!=="number"||ni(e.ownerDocument)!==e)&&(n==null?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+n&&(e.defaultValue=""+n))}var kr=Array.isArray;function Rn(e,t,n,r){if(e=e.options,t){t={};for(var o=0;o<n.length;o++)t["$"+n[o]]=!0;for(n=0;n<e.length;n++)o=t.hasOwnProperty("$"+e[n].value),e[n].selected!==o&&(e[n].selected=o),o&&r&&(e[n].defaultSelected=!0)}else{for(n=""+Ht(n),t=null,o=0;o<e.length;o++){if(e[o].value===n){e[o].selected=!0,r&&(e[o].defaultSelected=!0);return}t!==null||e[o].disabled||(t=e[o])}t!==null&&(t.selected=!0)}}function yl(e,t){if(t.dangerouslySetInnerHTML!=null)throw Error(y(91));return J({},t,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function oc(e,t){var n=t.value;if(n==null){if(n=t.children,t=t.defaultValue,n!=null){if(t!=null)throw Error(y(92));if(kr(n)){if(1<n.length)throw Error(y(93));n=n[0]}t=n}t==null&&(t=""),n=t}e._wrapperState={initialValue:Ht(n)}}function fp(e,t){var n=Ht(t.value),r=Ht(t.defaultValue);n!=null&&(n=""+n,n!==e.value&&(e.value=n),t.defaultValue==null&&e.defaultValue!==n&&(e.defaultValue=n)),r!=null&&(e.defaultValue=""+r)}function ic(e){var t=e.textContent;t===e._wrapperState.initialValue&&t!==""&&t!==null&&(e.value=t)}function up(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function wl(e,t){return e==null||e==="http://www.w3.org/1999/xhtml"?up(t):e==="http://www.w3.org/2000/svg"&&t==="foreignObject"?"http://www.w3.org/1999/xhtml":e}var jo,mp=function(e){return typeof MSApp!="undefined"&&MSApp.execUnsafeLocalFunction?function(t,n,r,o){MSApp.execUnsafeLocalFunction(function(){return e(t,n,r,o)})}:e}(function(e,t){if(e.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in e)e.innerHTML=t;else{for(jo=jo||document.createElement("div"),jo.innerHTML="<svg>"+t.valueOf().toString()+"</svg>",t=jo.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;t.firstChild;)e.appendChild(t.firstChild)}});function Rr(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var Nr={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},Eg=["Webkit","ms","Moz","O"];Object.keys(Nr).forEach(function(e){Eg.forEach(function(t){t=t+e.charAt(0).toUpperCase()+e.substring(1),Nr[t]=Nr[e]})});function gp(e,t,n){return t==null||typeof t=="boolean"||t===""?"":n||typeof t!="number"||t===0||Nr.hasOwnProperty(e)&&Nr[e]?(""+t).trim():t+"px"}function hp(e,t){e=e.style;for(var n in t)if(t.hasOwnProperty(n)){var r=n.indexOf("--")===0,o=gp(n,t[n],r);n==="float"&&(n="cssFloat"),r?e.setProperty(n,o):e[n]=o}}var jg=J({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function kl(e,t){if(t){if(jg[e]&&(t.children!=null||t.dangerouslySetInnerHTML!=null))throw Error(y(137,e));if(t.dangerouslySetInnerHTML!=null){if(t.children!=null)throw Error(y(60));if(typeof t.dangerouslySetInnerHTML!="object"||!("__html"in t.dangerouslySetInnerHTML))throw Error(y(61))}if(t.style!=null&&typeof t.style!="object")throw Error(y(62))}}function Sl(e,t){if(e.indexOf("-")===-1)return typeof t.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Cl=null;function fs(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var Nl=null,Fn=null,Bn=null;function ac(e){if(e=to(e)){if(typeof Nl!="function")throw Error(y(280));var t=e.stateNode;t&&(t=Di(t),Nl(e.stateNode,e.type,t))}}function xp(e){Fn?Bn?Bn.push(e):Bn=[e]:Fn=e}function bp(){if(Fn){var e=Fn,t=Bn;if(Bn=Fn=null,ac(e),t)for(e=0;e<t.length;e++)ac(t[e])}}function vp(e,t){return e(t)}function zp(){}var Qa=!1;function _p(e,t,n){if(Qa)return e(t,n);Qa=!0;try{return vp(e,t,n)}finally{Qa=!1,(Fn!==null||Bn!==null)&&(zp(),bp())}}function Fr(e,t){var n=e.stateNode;if(n===null)return null;var r=Di(n);if(r===null)return null;n=r[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(e=e.type,r=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!r;break e;default:e=!1}if(e)return null;if(n&&typeof n!="function")throw Error(y(231,t,typeof n));return n}var El=!1;if(yt)try{wn={},Object.defineProperty(wn,"passive",{get:function(){El=!0}}),window.addEventListener("test",wn,wn),window.removeEventListener("test",wn,wn)}catch{El=!1}var wn;function Dg(e,t,n,r,o,i,a,l,s){var d=Array.prototype.slice.call(arguments,3);try{t.apply(n,d)}catch(g){this.onError(g)}}var Er=!1,ri=null,oi=!1,jl=null,Pg={onError:function(e){Er=!0,ri=e}};function Mg(e,t,n,r,o,i,a,l,s){Er=!1,ri=null,Dg.apply(Pg,arguments)}function Ig(e,t,n,r,o,i,a,l,s){if(Mg.apply(this,arguments),Er){if(Er){var d=ri;Er=!1,ri=null}else throw Error(y(198));oi||(oi=!0,jl=d)}}function mn(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,(t.flags&4098)!==0&&(n=t.return),e=t.return;while(e)}return t.tag===3?n:null}function yp(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function lc(e){if(mn(e)!==e)throw Error(y(188))}function Tg(e){var t=e.alternate;if(!t){if(t=mn(e),t===null)throw Error(y(188));return t!==e?null:e}for(var n=e,r=t;;){var o=n.return;if(o===null)break;var i=o.alternate;if(i===null){if(r=o.return,r!==null){n=r;continue}break}if(o.child===i.child){for(i=o.child;i;){if(i===n)return lc(o),e;if(i===r)return lc(o),t;i=i.sibling}throw Error(y(188))}if(n.return!==r.return)n=o,r=i;else{for(var a=!1,l=o.child;l;){if(l===n){a=!0,n=o,r=i;break}if(l===r){a=!0,r=o,n=i;break}l=l.sibling}if(!a){for(l=i.child;l;){if(l===n){a=!0,n=i,r=o;break}if(l===r){a=!0,r=i,n=o;break}l=l.sibling}if(!a)throw Error(y(189))}}if(n.alternate!==r)throw Error(y(190))}if(n.tag!==3)throw Error(y(188));return n.stateNode.current===n?e:t}function wp(e){return e=Tg(e),e!==null?kp(e):null}function kp(e){if(e.tag===5||e.tag===6)return e;for(e=e.child;e!==null;){var t=kp(e);if(t!==null)return t;e=e.sibling}return null}var Sp=Fe.unstable_scheduleCallback,sc=Fe.unstable_cancelCallback,Lg=Fe.unstable_shouldYield,Og=Fe.unstable_requestPaint,re=Fe.unstable_now,Rg=Fe.unstable_getCurrentPriorityLevel,us=Fe.unstable_ImmediatePriority,Cp=Fe.unstable_UserBlockingPriority,ii=Fe.unstable_NormalPriority,Fg=Fe.unstable_LowPriority,Np=Fe.unstable_IdlePriority,Ci=null,ft=null;function Bg(e){if(ft&&typeof ft.onCommitFiberRoot=="function")try{ft.onCommitFiberRoot(Ci,e,void 0,(e.current.flags&128)===128)}catch{}}var ot=Math.clz32?Math.clz32:Ag,Ug=Math.log,$g=Math.LN2;function Ag(e){return e>>>=0,e===0?32:31-(Ug(e)/$g|0)|0}var Do=64,Po=4194304;function Sr(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function ai(e,t){var n=e.pendingLanes;if(n===0)return 0;var r=0,o=e.suspendedLanes,i=e.pingedLanes,a=n&268435455;if(a!==0){var l=a&~o;l!==0?r=Sr(l):(i&=a,i!==0&&(r=Sr(i)))}else a=n&~o,a!==0?r=Sr(a):i!==0&&(r=Sr(i));if(r===0)return 0;if(t!==0&&t!==r&&(t&o)===0&&(o=r&-r,i=t&-t,o>=i||o===16&&(i&4194240)!==0))return t;if((r&4)!==0&&(r|=n&16),t=e.entangledLanes,t!==0)for(e=e.entanglements,t&=r;0<t;)n=31-ot(t),o=1<<n,r|=e[n],t&=~o;return r}function Hg(e,t){switch(e){case 1:case 2:case 4:return t+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function qg(e,t){for(var n=e.suspendedLanes,r=e.pingedLanes,o=e.expirationTimes,i=e.pendingLanes;0<i;){var a=31-ot(i),l=1<<a,s=o[a];s===-1?((l&n)===0||(l&r)!==0)&&(o[a]=Hg(l,t)):s<=t&&(e.expiredLanes|=l),i&=~l}}function Dl(e){return e=e.pendingLanes&-1073741825,e!==0?e:e&1073741824?1073741824:0}function Ep(){var e=Do;return Do<<=1,(Do&4194240)===0&&(Do=64),e}function Xa(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function Jr(e,t,n){e.pendingLanes|=t,t!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,t=31-ot(t),e[t]=n}function Wg(e,t){var n=e.pendingLanes&~t;e.pendingLanes=t,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=t,e.mutableReadLanes&=t,e.entangledLanes&=t,t=e.entanglements;var r=e.eventTimes;for(e=e.expirationTimes;0<n;){var o=31-ot(n),i=1<<o;t[o]=0,r[o]=-1,e[o]=-1,n&=~i}}function ms(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var r=31-ot(n),o=1<<r;o&t|e[r]&t&&(e[r]|=t),n&=~o}}var B=0;function jp(e){return e&=-e,1<e?4<e?(e&268435455)!==0?16:536870912:4:1}var Dp,gs,Pp,Mp,Ip,Pl=!1,Mo=[],Lt=null,Ot=null,Rt=null,Br=new Map,Ur=new Map,Pt=[],Vg="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function dc(e,t){switch(e){case"focusin":case"focusout":Lt=null;break;case"dragenter":case"dragleave":Ot=null;break;case"mouseover":case"mouseout":Rt=null;break;case"pointerover":case"pointerout":Br.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":Ur.delete(t.pointerId)}}function hr(e,t,n,r,o,i){return e===null||e.nativeEvent!==i?(e={blockedOn:t,domEventName:n,eventSystemFlags:r,nativeEvent:i,targetContainers:[o]},t!==null&&(t=to(t),t!==null&&gs(t)),e):(e.eventSystemFlags|=r,t=e.targetContainers,o!==null&&t.indexOf(o)===-1&&t.push(o),e)}function Kg(e,t,n,r,o){switch(t){case"focusin":return Lt=hr(Lt,e,t,n,r,o),!0;case"dragenter":return Ot=hr(Ot,e,t,n,r,o),!0;case"mouseover":return Rt=hr(Rt,e,t,n,r,o),!0;case"pointerover":var i=o.pointerId;return Br.set(i,hr(Br.get(i)||null,e,t,n,r,o)),!0;case"gotpointercapture":return i=o.pointerId,Ur.set(i,hr(Ur.get(i)||null,e,t,n,r,o)),!0}return!1}function Tp(e){var t=nn(e.target);if(t!==null){var n=mn(t);if(n!==null){if(t=n.tag,t===13){if(t=yp(n),t!==null){e.blockedOn=t,Ip(e.priority,function(){Pp(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Vo(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=Ml(e.domEventName,e.eventSystemFlags,t[0],e.nativeEvent);if(n===null){n=e.nativeEvent;var r=new n.constructor(n.type,n);Cl=r,n.target.dispatchEvent(r),Cl=null}else return t=to(n),t!==null&&gs(t),e.blockedOn=n,!1;t.shift()}return!0}function cc(e,t,n){Vo(e)&&n.delete(t)}function Gg(){Pl=!1,Lt!==null&&Vo(Lt)&&(Lt=null),Ot!==null&&Vo(Ot)&&(Ot=null),Rt!==null&&Vo(Rt)&&(Rt=null),Br.forEach(cc),Ur.forEach(cc)}function xr(e,t){e.blockedOn===t&&(e.blockedOn=null,Pl||(Pl=!0,Fe.unstable_scheduleCallback(Fe.unstable_NormalPriority,Gg)))}function $r(e){function t(o){return xr(o,e)}if(0<Mo.length){xr(Mo[0],e);for(var n=1;n<Mo.length;n++){var r=Mo[n];r.blockedOn===e&&(r.blockedOn=null)}}for(Lt!==null&&xr(Lt,e),Ot!==null&&xr(Ot,e),Rt!==null&&xr(Rt,e),Br.forEach(t),Ur.forEach(t),n=0;n<Pt.length;n++)r=Pt[n],r.blockedOn===e&&(r.blockedOn=null);for(;0<Pt.length&&(n=Pt[0],n.blockedOn===null);)Tp(n),n.blockedOn===null&&Pt.shift()}var Un=Ct.ReactCurrentBatchConfig,li=!0;function Qg(e,t,n,r){var o=B,i=Un.transition;Un.transition=null;try{B=1,hs(e,t,n,r)}finally{B=o,Un.transition=i}}function Xg(e,t,n,r){var o=B,i=Un.transition;Un.transition=null;try{B=4,hs(e,t,n,r)}finally{B=o,Un.transition=i}}function hs(e,t,n,r){if(li){var o=Ml(e,t,n,r);if(o===null)rl(e,t,r,si,n),dc(e,r);else if(Kg(o,e,t,n,r))r.stopPropagation();else if(dc(e,r),t&4&&-1<Vg.indexOf(e)){for(;o!==null;){var i=to(o);if(i!==null&&Dp(i),i=Ml(e,t,n,r),i===null&&rl(e,t,r,si,n),i===o)break;o=i}o!==null&&r.stopPropagation()}else rl(e,t,r,null,n)}}var si=null;function Ml(e,t,n,r){if(si=null,e=fs(r),e=nn(e),e!==null)if(t=mn(e),t===null)e=null;else if(n=t.tag,n===13){if(e=yp(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null);return si=e,null}function Lp(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(Rg()){case us:return 1;case Cp:return 4;case ii:case Fg:return 16;case Np:return 536870912;default:return 16}default:return 16}}var It=null,xs=null,Ko=null;function Op(){if(Ko)return Ko;var e,t=xs,n=t.length,r,o="value"in It?It.value:It.textContent,i=o.length;for(e=0;e<n&&t[e]===o[e];e++);var a=n-e;for(r=1;r<=a&&t[n-r]===o[i-r];r++);return Ko=o.slice(e,1<r?1-r:void 0)}function Go(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function Io(){return!0}function pc(){return!1}function Be(e){function t(n,r,o,i,a){this._reactName=n,this._targetInst=o,this.type=r,this.nativeEvent=i,this.target=a,this.currentTarget=null;for(var l in e)e.hasOwnProperty(l)&&(n=e[l],this[l]=n?n(i):i[l]);return this.isDefaultPrevented=(i.defaultPrevented!=null?i.defaultPrevented:i.returnValue===!1)?Io:pc,this.isPropagationStopped=pc,this}return J(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=Io)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=Io)},persist:function(){},isPersistent:Io}),t}var Xn={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},bs=Be(Xn),eo=J({},Xn,{view:0,detail:0}),Yg=Be(eo),Ya,Za,br,Ni=J({},eo,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:vs,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==br&&(br&&e.type==="mousemove"?(Ya=e.screenX-br.screenX,Za=e.screenY-br.screenY):Za=Ya=0,br=e),Ya)},movementY:function(e){return"movementY"in e?e.movementY:Za}}),fc=Be(Ni),Zg=J({},Ni,{dataTransfer:0}),Jg=Be(Zg),eh=J({},eo,{relatedTarget:0}),Ja=Be(eh),th=J({},Xn,{animationName:0,elapsedTime:0,pseudoElement:0}),nh=Be(th),rh=J({},Xn,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),oh=Be(rh),ih=J({},Xn,{data:0}),uc=Be(ih),ah={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},lh={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},sh={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function dh(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=sh[e])?!!t[e]:!1}function vs(){return dh}var ch=J({},eo,{key:function(e){if(e.key){var t=ah[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=Go(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?lh[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:vs,charCode:function(e){return e.type==="keypress"?Go(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?Go(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),ph=Be(ch),fh=J({},Ni,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),mc=Be(fh),uh=J({},eo,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:vs}),mh=Be(uh),gh=J({},Xn,{propertyName:0,elapsedTime:0,pseudoElement:0}),hh=Be(gh),xh=J({},Ni,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),bh=Be(xh),vh=[9,13,27,32],zs=yt&&"CompositionEvent"in window,jr=null;yt&&"documentMode"in document&&(jr=document.documentMode);var zh=yt&&"TextEvent"in window&&!jr,Rp=yt&&(!zs||jr&&8<jr&&11>=jr),gc=" ",hc=!1;function Fp(e,t){switch(e){case"keyup":return vh.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Bp(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var Nn=!1;function _h(e,t){switch(e){case"compositionend":return Bp(t);case"keypress":return t.which!==32?null:(hc=!0,gc);case"textInput":return e=t.data,e===gc&&hc?null:e;default:return null}}function yh(e,t){if(Nn)return e==="compositionend"||!zs&&Fp(e,t)?(e=Op(),Ko=xs=It=null,Nn=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return Rp&&t.locale!=="ko"?null:t.data;default:return null}}var wh={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function xc(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!wh[e.type]:t==="textarea"}function Up(e,t,n,r){xp(r),t=di(t,"onChange"),0<t.length&&(n=new bs("onChange","change",null,n,r),e.push({event:n,listeners:t}))}var Dr=null,Ar=null;function kh(e){Yp(e,0)}function Ei(e){var t=Dn(e);if(cp(t))return e}function Sh(e,t){if(e==="change")return t}var $p=!1;yt&&(yt?(Lo="oninput"in document,Lo||(el=document.createElement("div"),el.setAttribute("oninput","return;"),Lo=typeof el.oninput=="function"),To=Lo):To=!1,$p=To&&(!document.documentMode||9<document.documentMode));var To,Lo,el;function bc(){Dr&&(Dr.detachEvent("onpropertychange",Ap),Ar=Dr=null)}function Ap(e){if(e.propertyName==="value"&&Ei(Ar)){var t=[];Up(t,Ar,e,fs(e)),_p(kh,t)}}function Ch(e,t,n){e==="focusin"?(bc(),Dr=t,Ar=n,Dr.attachEvent("onpropertychange",Ap)):e==="focusout"&&bc()}function Nh(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return Ei(Ar)}function Eh(e,t){if(e==="click")return Ei(t)}function jh(e,t){if(e==="input"||e==="change")return Ei(t)}function Dh(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var at=typeof Object.is=="function"?Object.is:Dh;function Hr(e,t){if(at(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var o=n[r];if(!ml.call(t,o)||!at(e[o],t[o]))return!1}return!0}function vc(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function zc(e,t){var n=vc(e);e=0;for(var r;n;){if(n.nodeType===3){if(r=e+n.textContent.length,e<=t&&r>=t)return{node:n,offset:t-e};e=r}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=vc(n)}}function Hp(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?Hp(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function qp(){for(var e=window,t=ni();t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href=="string"}catch{n=!1}if(n)e=t.contentWindow;else break;t=ni(e.document)}return t}function _s(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}function Ph(e){var t=qp(),n=e.focusedElem,r=e.selectionRange;if(t!==n&&n&&n.ownerDocument&&Hp(n.ownerDocument.documentElement,n)){if(r!==null&&_s(n)){if(t=r.start,e=r.end,e===void 0&&(e=t),"selectionStart"in n)n.selectionStart=t,n.selectionEnd=Math.min(e,n.value.length);else if(e=(t=n.ownerDocument||document)&&t.defaultView||window,e.getSelection){e=e.getSelection();var o=n.textContent.length,i=Math.min(r.start,o);r=r.end===void 0?i:Math.min(r.end,o),!e.extend&&i>r&&(o=r,r=i,i=o),o=zc(n,i);var a=zc(n,r);o&&a&&(e.rangeCount!==1||e.anchorNode!==o.node||e.anchorOffset!==o.offset||e.focusNode!==a.node||e.focusOffset!==a.offset)&&(t=t.createRange(),t.setStart(o.node,o.offset),e.removeAllRanges(),i>r?(e.addRange(t),e.extend(a.node,a.offset)):(t.setEnd(a.node,a.offset),e.addRange(t)))}}for(t=[],e=n;e=e.parentNode;)e.nodeType===1&&t.push({element:e,left:e.scrollLeft,top:e.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<t.length;n++)e=t[n],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}}var Mh=yt&&"documentMode"in document&&11>=document.documentMode,En=null,Il=null,Pr=null,Tl=!1;function _c(e,t,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;Tl||En==null||En!==ni(r)||(r=En,"selectionStart"in r&&_s(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),Pr&&Hr(Pr,r)||(Pr=r,r=di(Il,"onSelect"),0<r.length&&(t=new bs("onSelect","select",null,t,n),e.push({event:t,listeners:r}),t.target=En)))}function Oo(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n}var jn={animationend:Oo("Animation","AnimationEnd"),animationiteration:Oo("Animation","AnimationIteration"),animationstart:Oo("Animation","AnimationStart"),transitionend:Oo("Transition","TransitionEnd")},tl={},Wp={};yt&&(Wp=document.createElement("div").style,"AnimationEvent"in window||(delete jn.animationend.animation,delete jn.animationiteration.animation,delete jn.animationstart.animation),"TransitionEvent"in window||delete jn.transitionend.transition);function ji(e){if(tl[e])return tl[e];if(!jn[e])return e;var t=jn[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in Wp)return tl[e]=t[n];return e}var Vp=ji("animationend"),Kp=ji("animationiteration"),Gp=ji("animationstart"),Qp=ji("transitionend"),Xp=new Map,yc="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function Wt(e,t){Xp.set(e,t),un(t,[e])}for(Ro=0;Ro<yc.length;Ro++)Fo=yc[Ro],wc=Fo.toLowerCase(),kc=Fo[0].toUpperCase()+Fo.slice(1),Wt(wc,"on"+kc);var Fo,wc,kc,Ro;Wt(Vp,"onAnimationEnd");Wt(Kp,"onAnimationIteration");Wt(Gp,"onAnimationStart");Wt("dblclick","onDoubleClick");Wt("focusin","onFocus");Wt("focusout","onBlur");Wt(Qp,"onTransitionEnd");Hn("onMouseEnter",["mouseout","mouseover"]);Hn("onMouseLeave",["mouseout","mouseover"]);Hn("onPointerEnter",["pointerout","pointerover"]);Hn("onPointerLeave",["pointerout","pointerover"]);un("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));un("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));un("onBeforeInput",["compositionend","keypress","textInput","paste"]);un("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));un("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));un("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Cr="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Ih=new Set("cancel close invalid load scroll toggle".split(" ").concat(Cr));function Sc(e,t,n){var r=e.type||"unknown-event";e.currentTarget=n,Ig(r,t,void 0,e),e.currentTarget=null}function Yp(e,t){t=(t&4)!==0;for(var n=0;n<e.length;n++){var r=e[n],o=r.event;r=r.listeners;e:{var i=void 0;if(t)for(var a=r.length-1;0<=a;a--){var l=r[a],s=l.instance,d=l.currentTarget;if(l=l.listener,s!==i&&o.isPropagationStopped())break e;Sc(o,l,d),i=s}else for(a=0;a<r.length;a++){if(l=r[a],s=l.instance,d=l.currentTarget,l=l.listener,s!==i&&o.isPropagationStopped())break e;Sc(o,l,d),i=s}}}if(oi)throw e=jl,oi=!1,jl=null,e}function W(e,t){var n=t[Bl];n===void 0&&(n=t[Bl]=new Set);var r=e+"__bubble";n.has(r)||(Zp(t,e,2,!1),n.add(r))}function nl(e,t,n){var r=0;t&&(r|=4),Zp(n,e,r,t)}var Bo="_reactListening"+Math.random().toString(36).slice(2);function qr(e){if(!e[Bo]){e[Bo]=!0,ip.forEach(function(n){n!=="selectionchange"&&(Ih.has(n)||nl(n,!1,e),nl(n,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[Bo]||(t[Bo]=!0,nl("selectionchange",!1,t))}}function Zp(e,t,n,r){switch(Lp(t)){case 1:var o=Qg;break;case 4:o=Xg;break;default:o=hs}n=o.bind(null,t,n,e),o=void 0,!El||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(o=!0),r?o!==void 0?e.addEventListener(t,n,{capture:!0,passive:o}):e.addEventListener(t,n,!0):o!==void 0?e.addEventListener(t,n,{passive:o}):e.addEventListener(t,n,!1)}function rl(e,t,n,r,o){var i=r;if((t&1)===0&&(t&2)===0&&r!==null)e:for(;;){if(r===null)return;var a=r.tag;if(a===3||a===4){var l=r.stateNode.containerInfo;if(l===o||l.nodeType===8&&l.parentNode===o)break;if(a===4)for(a=r.return;a!==null;){var s=a.tag;if((s===3||s===4)&&(s=a.stateNode.containerInfo,s===o||s.nodeType===8&&s.parentNode===o))return;a=a.return}for(;l!==null;){if(a=nn(l),a===null)return;if(s=a.tag,s===5||s===6){r=i=a;continue e}l=l.parentNode}}r=r.return}_p(function(){var d=i,g=fs(n),u=[];e:{var h=Xp.get(e);if(h!==void 0){var x=bs,b=e;switch(e){case"keypress":if(Go(n)===0)break e;case"keydown":case"keyup":x=ph;break;case"focusin":b="focus",x=Ja;break;case"focusout":b="blur",x=Ja;break;case"beforeblur":case"afterblur":x=Ja;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":x=fc;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":x=Jg;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":x=mh;break;case Vp:case Kp:case Gp:x=nh;break;case Qp:x=hh;break;case"scroll":x=Yg;break;case"wheel":x=bh;break;case"copy":case"cut":case"paste":x=oh;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":x=mc}var v=(t&4)!==0,C=!v&&e==="scroll",f=v?h!==null?h+"Capture":null:h;v=[];for(var p=d,c;p!==null;){c=p;var m=c.stateNode;if(c.tag===5&&m!==null&&(c=m,f!==null&&(m=Fr(p,f),m!=null&&v.push(Wr(p,m,c)))),C)break;p=p.return}0<v.length&&(h=new x(h,b,null,n,g),u.push({event:h,listeners:v}))}}if((t&7)===0){e:{if(h=e==="mouseover"||e==="pointerover",x=e==="mouseout"||e==="pointerout",h&&n!==Cl&&(b=n.relatedTarget||n.fromElement)&&(nn(b)||b[wt]))break e;if((x||h)&&(h=g.window===g?g:(h=g.ownerDocument)?h.defaultView||h.parentWindow:window,x?(b=n.relatedTarget||n.toElement,x=d,b=b?nn(b):null,b!==null&&(C=mn(b),b!==C||b.tag!==5&&b.tag!==6)&&(b=null)):(x=null,b=d),x!==b)){if(v=fc,m="onMouseLeave",f="onMouseEnter",p="mouse",(e==="pointerout"||e==="pointerover")&&(v=mc,m="onPointerLeave",f="onPointerEnter",p="pointer"),C=x==null?h:Dn(x),c=b==null?h:Dn(b),h=new v(m,p+"leave",x,n,g),h.target=C,h.relatedTarget=c,m=null,nn(g)===d&&(v=new v(f,p+"enter",b,n,g),v.target=c,v.relatedTarget=C,m=v),C=m,x&&b)t:{for(v=x,f=b,p=0,c=v;c;c=kn(c))p++;for(c=0,m=f;m;m=kn(m))c++;for(;0<p-c;)v=kn(v),p--;for(;0<c-p;)f=kn(f),c--;for(;p--;){if(v===f||f!==null&&v===f.alternate)break t;v=kn(v),f=kn(f)}v=null}else v=null;x!==null&&Cc(u,h,x,v,!1),b!==null&&C!==null&&Cc(u,C,b,v,!0)}}e:{if(h=d?Dn(d):window,x=h.nodeName&&h.nodeName.toLowerCase(),x==="select"||x==="input"&&h.type==="file")var z=Sh;else if(xc(h))if($p)z=jh;else{z=Nh;var w=Ch}else(x=h.nodeName)&&x.toLowerCase()==="input"&&(h.type==="checkbox"||h.type==="radio")&&(z=Eh);if(z&&(z=z(e,d))){Up(u,z,n,g);break e}w&&w(e,h,d),e==="focusout"&&(w=h._wrapperState)&&w.controlled&&h.type==="number"&&_l(h,"number",h.value)}switch(w=d?Dn(d):window,e){case"focusin":(xc(w)||w.contentEditable==="true")&&(En=w,Il=d,Pr=null);break;case"focusout":Pr=Il=En=null;break;case"mousedown":Tl=!0;break;case"contextmenu":case"mouseup":case"dragend":Tl=!1,_c(u,n,g);break;case"selectionchange":if(Mh)break;case"keydown":case"keyup":_c(u,n,g)}var D;if(zs)e:{switch(e){case"compositionstart":var S="onCompositionStart";break e;case"compositionend":S="onCompositionEnd";break e;case"compositionupdate":S="onCompositionUpdate";break e}S=void 0}else Nn?Fp(e,n)&&(S="onCompositionEnd"):e==="keydown"&&n.keyCode===229&&(S="onCompositionStart");S&&(Rp&&n.locale!=="ko"&&(Nn||S!=="onCompositionStart"?S==="onCompositionEnd"&&Nn&&(D=Op()):(It=g,xs="value"in It?It.value:It.textContent,Nn=!0)),w=di(d,S),0<w.length&&(S=new uc(S,e,null,n,g),u.push({event:S,listeners:w}),D?S.data=D:(D=Bp(n),D!==null&&(S.data=D)))),(D=zh?_h(e,n):yh(e,n))&&(d=di(d,"onBeforeInput"),0<d.length&&(g=new uc("onBeforeInput","beforeinput",null,n,g),u.push({event:g,listeners:d}),g.data=D))}Yp(u,t)})}function Wr(e,t,n){return{instance:e,listener:t,currentTarget:n}}function di(e,t){for(var n=t+"Capture",r=[];e!==null;){var o=e,i=o.stateNode;o.tag===5&&i!==null&&(o=i,i=Fr(e,n),i!=null&&r.unshift(Wr(e,i,o)),i=Fr(e,t),i!=null&&r.push(Wr(e,i,o))),e=e.return}return r}function kn(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5);return e||null}function Cc(e,t,n,r,o){for(var i=t._reactName,a=[];n!==null&&n!==r;){var l=n,s=l.alternate,d=l.stateNode;if(s!==null&&s===r)break;l.tag===5&&d!==null&&(l=d,o?(s=Fr(n,i),s!=null&&a.unshift(Wr(n,s,l))):o||(s=Fr(n,i),s!=null&&a.push(Wr(n,s,l)))),n=n.return}a.length!==0&&e.push({event:t,listeners:a})}var Th=/\r\n?/g,Lh=/\u0000|\uFFFD/g;function Nc(e){return(typeof e=="string"?e:""+e).replace(Th,`
`).replace(Lh,"")}function Uo(e,t,n){if(t=Nc(t),Nc(e)!==t&&n)throw Error(y(425))}function ci(){}var Ll=null,Ol=null;function Rl(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var Fl=typeof setTimeout=="function"?setTimeout:void 0,Oh=typeof clearTimeout=="function"?clearTimeout:void 0,Ec=typeof Promise=="function"?Promise:void 0,Rh=typeof queueMicrotask=="function"?queueMicrotask:typeof Ec!="undefined"?function(e){return Ec.resolve(null).then(e).catch(Fh)}:Fl;function Fh(e){setTimeout(function(){throw e})}function ol(e,t){var n=t,r=0;do{var o=n.nextSibling;if(e.removeChild(n),o&&o.nodeType===8)if(n=o.data,n==="/$"){if(r===0){e.removeChild(o),$r(t);return}r--}else n!=="$"&&n!=="$?"&&n!=="$!"||r++;n=o}while(n);$r(t)}function Ft(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?")break;if(t==="/$")return null}}return e}function jc(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="$"||n==="$!"||n==="$?"){if(t===0)return e;t--}else n==="/$"&&t++}e=e.previousSibling}return null}var Yn=Math.random().toString(36).slice(2),pt="__reactFiber$"+Yn,Vr="__reactProps$"+Yn,wt="__reactContainer$"+Yn,Bl="__reactEvents$"+Yn,Bh="__reactListeners$"+Yn,Uh="__reactHandles$"+Yn;function nn(e){var t=e[pt];if(t)return t;for(var n=e.parentNode;n;){if(t=n[wt]||n[pt]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=jc(e);e!==null;){if(n=e[pt])return n;e=jc(e)}return t}e=n,n=e.parentNode}return null}function to(e){return e=e[pt]||e[wt],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}function Dn(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(y(33))}function Di(e){return e[Vr]||null}var Ul=[],Pn=-1;function Vt(e){return{current:e}}function V(e){0>Pn||(e.current=Ul[Pn],Ul[Pn]=null,Pn--)}function q(e,t){Pn++,Ul[Pn]=e.current,e.current=t}var qt={},be=Vt(qt),je=Vt(!1),sn=qt;function qn(e,t){var n=e.type.contextTypes;if(!n)return qt;var r=e.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===t)return r.__reactInternalMemoizedMaskedChildContext;var o={},i;for(i in n)o[i]=t[i];return r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=t,e.__reactInternalMemoizedMaskedChildContext=o),o}function De(e){return e=e.childContextTypes,e!=null}function pi(){V(je),V(be)}function Dc(e,t,n){if(be.current!==qt)throw Error(y(168));q(be,t),q(je,n)}function Jp(e,t,n){var r=e.stateNode;if(t=t.childContextTypes,typeof r.getChildContext!="function")return n;r=r.getChildContext();for(var o in r)if(!(o in t))throw Error(y(108,Cg(e)||"Unknown",o));return J({},n,r)}function fi(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||qt,sn=be.current,q(be,e),q(je,je.current),!0}function Pc(e,t,n){var r=e.stateNode;if(!r)throw Error(y(169));n?(e=Jp(e,t,sn),r.__reactInternalMemoizedMergedChildContext=e,V(je),V(be),q(be,e)):V(je),q(je,n)}var bt=null,Pi=!1,il=!1;function ef(e){bt===null?bt=[e]:bt.push(e)}function $h(e){Pi=!0,ef(e)}function Kt(){if(!il&&bt!==null){il=!0;var e=0,t=B;try{var n=bt;for(B=1;e<n.length;e++){var r=n[e];do r=r(!0);while(r!==null)}bt=null,Pi=!1}catch(o){throw bt!==null&&(bt=bt.slice(e+1)),Sp(us,Kt),o}finally{B=t,il=!1}}return null}var Mn=[],In=0,ui=null,mi=0,Ve=[],Ke=0,dn=null,vt=1,zt="";function en(e,t){Mn[In++]=mi,Mn[In++]=ui,ui=e,mi=t}function tf(e,t,n){Ve[Ke++]=vt,Ve[Ke++]=zt,Ve[Ke++]=dn,dn=e;var r=vt;e=zt;var o=32-ot(r)-1;r&=~(1<<o),n+=1;var i=32-ot(t)+o;if(30<i){var a=o-o%5;i=(r&(1<<a)-1).toString(32),r>>=a,o-=a,vt=1<<32-ot(t)+o|n<<o|r,zt=i+e}else vt=1<<i|n<<o|r,zt=e}function ys(e){e.return!==null&&(en(e,1),tf(e,1,0))}function ws(e){for(;e===ui;)ui=Mn[--In],Mn[In]=null,mi=Mn[--In],Mn[In]=null;for(;e===dn;)dn=Ve[--Ke],Ve[Ke]=null,zt=Ve[--Ke],Ve[Ke]=null,vt=Ve[--Ke],Ve[Ke]=null}var Re=null,Oe=null,G=!1,rt=null;function nf(e,t){var n=Ge(5,null,null,0);n.elementType="DELETED",n.stateNode=t,n.return=e,t=e.deletions,t===null?(e.deletions=[n],e.flags|=16):t.push(n)}function Mc(e,t){switch(e.tag){case 5:var n=e.type;return t=t.nodeType!==1||n.toLowerCase()!==t.nodeName.toLowerCase()?null:t,t!==null?(e.stateNode=t,Re=e,Oe=Ft(t.firstChild),!0):!1;case 6:return t=e.pendingProps===""||t.nodeType!==3?null:t,t!==null?(e.stateNode=t,Re=e,Oe=null,!0):!1;case 13:return t=t.nodeType!==8?null:t,t!==null?(n=dn!==null?{id:vt,overflow:zt}:null,e.memoizedState={dehydrated:t,treeContext:n,retryLane:1073741824},n=Ge(18,null,null,0),n.stateNode=t,n.return=e,e.child=n,Re=e,Oe=null,!0):!1;default:return!1}}function $l(e){return(e.mode&1)!==0&&(e.flags&128)===0}function Al(e){if(G){var t=Oe;if(t){var n=t;if(!Mc(e,t)){if($l(e))throw Error(y(418));t=Ft(n.nextSibling);var r=Re;t&&Mc(e,t)?nf(r,n):(e.flags=e.flags&-4097|2,G=!1,Re=e)}}else{if($l(e))throw Error(y(418));e.flags=e.flags&-4097|2,G=!1,Re=e}}}function Ic(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;Re=e}function $o(e){if(e!==Re)return!1;if(!G)return Ic(e),G=!0,!1;var t;if((t=e.tag!==3)&&!(t=e.tag!==5)&&(t=e.type,t=t!=="head"&&t!=="body"&&!Rl(e.type,e.memoizedProps)),t&&(t=Oe)){if($l(e))throw rf(),Error(y(418));for(;t;)nf(e,t),t=Ft(t.nextSibling)}if(Ic(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(y(317));e:{for(e=e.nextSibling,t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="/$"){if(t===0){Oe=Ft(e.nextSibling);break e}t--}else n!=="$"&&n!=="$!"&&n!=="$?"||t++}e=e.nextSibling}Oe=null}}else Oe=Re?Ft(e.stateNode.nextSibling):null;return!0}function rf(){for(var e=Oe;e;)e=Ft(e.nextSibling)}function Wn(){Oe=Re=null,G=!1}function ks(e){rt===null?rt=[e]:rt.push(e)}var Ah=Ct.ReactCurrentBatchConfig;function vr(e,t,n){if(e=n.ref,e!==null&&typeof e!="function"&&typeof e!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(y(309));var r=n.stateNode}if(!r)throw Error(y(147,e));var o=r,i=""+e;return t!==null&&t.ref!==null&&typeof t.ref=="function"&&t.ref._stringRef===i?t.ref:(t=function(a){var l=o.refs;a===null?delete l[i]:l[i]=a},t._stringRef=i,t)}if(typeof e!="string")throw Error(y(284));if(!n._owner)throw Error(y(290,e))}return e}function Ao(e,t){throw e=Object.prototype.toString.call(t),Error(y(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e))}function Tc(e){var t=e._init;return t(e._payload)}function of(e){function t(f,p){if(e){var c=f.deletions;c===null?(f.deletions=[p],f.flags|=16):c.push(p)}}function n(f,p){if(!e)return null;for(;p!==null;)t(f,p),p=p.sibling;return null}function r(f,p){for(f=new Map;p!==null;)p.key!==null?f.set(p.key,p):f.set(p.index,p),p=p.sibling;return f}function o(f,p){return f=At(f,p),f.index=0,f.sibling=null,f}function i(f,p,c){return f.index=c,e?(c=f.alternate,c!==null?(c=c.index,c<p?(f.flags|=2,p):c):(f.flags|=2,p)):(f.flags|=1048576,p)}function a(f){return e&&f.alternate===null&&(f.flags|=2),f}function l(f,p,c,m){return p===null||p.tag!==6?(p=fl(c,f.mode,m),p.return=f,p):(p=o(p,c),p.return=f,p)}function s(f,p,c,m){var z=c.type;return z===Cn?g(f,p,c.props.children,m,c.key):p!==null&&(p.elementType===z||typeof z=="object"&&z!==null&&z.$$typeof===jt&&Tc(z)===p.type)?(m=o(p,c.props),m.ref=vr(f,p,c),m.return=f,m):(m=ti(c.type,c.key,c.props,null,f.mode,m),m.ref=vr(f,p,c),m.return=f,m)}function d(f,p,c,m){return p===null||p.tag!==4||p.stateNode.containerInfo!==c.containerInfo||p.stateNode.implementation!==c.implementation?(p=ul(c,f.mode,m),p.return=f,p):(p=o(p,c.children||[]),p.return=f,p)}function g(f,p,c,m,z){return p===null||p.tag!==7?(p=ln(c,f.mode,m,z),p.return=f,p):(p=o(p,c),p.return=f,p)}function u(f,p,c){if(typeof p=="string"&&p!==""||typeof p=="number")return p=fl(""+p,f.mode,c),p.return=f,p;if(typeof p=="object"&&p!==null){switch(p.$$typeof){case No:return c=ti(p.type,p.key,p.props,null,f.mode,c),c.ref=vr(f,null,p),c.return=f,c;case Sn:return p=ul(p,f.mode,c),p.return=f,p;case jt:var m=p._init;return u(f,m(p._payload),c)}if(kr(p)||gr(p))return p=ln(p,f.mode,c,null),p.return=f,p;Ao(f,p)}return null}function h(f,p,c,m){var z=p!==null?p.key:null;if(typeof c=="string"&&c!==""||typeof c=="number")return z!==null?null:l(f,p,""+c,m);if(typeof c=="object"&&c!==null){switch(c.$$typeof){case No:return c.key===z?s(f,p,c,m):null;case Sn:return c.key===z?d(f,p,c,m):null;case jt:return z=c._init,h(f,p,z(c._payload),m)}if(kr(c)||gr(c))return z!==null?null:g(f,p,c,m,null);Ao(f,c)}return null}function x(f,p,c,m,z){if(typeof m=="string"&&m!==""||typeof m=="number")return f=f.get(c)||null,l(p,f,""+m,z);if(typeof m=="object"&&m!==null){switch(m.$$typeof){case No:return f=f.get(m.key===null?c:m.key)||null,s(p,f,m,z);case Sn:return f=f.get(m.key===null?c:m.key)||null,d(p,f,m,z);case jt:var w=m._init;return x(f,p,c,w(m._payload),z)}if(kr(m)||gr(m))return f=f.get(c)||null,g(p,f,m,z,null);Ao(p,m)}return null}function b(f,p,c,m){for(var z=null,w=null,D=p,S=p=0,I=null;D!==null&&S<c.length;S++){D.index>S?(I=D,D=null):I=D.sibling;var M=h(f,D,c[S],m);if(M===null){D===null&&(D=I);break}e&&D&&M.alternate===null&&t(f,D),p=i(M,p,S),w===null?z=M:w.sibling=M,w=M,D=I}if(S===c.length)return n(f,D),G&&en(f,S),z;if(D===null){for(;S<c.length;S++)D=u(f,c[S],m),D!==null&&(p=i(D,p,S),w===null?z=D:w.sibling=D,w=D);return G&&en(f,S),z}for(D=r(f,D);S<c.length;S++)I=x(D,f,S,c[S],m),I!==null&&(e&&I.alternate!==null&&D.delete(I.key===null?S:I.key),p=i(I,p,S),w===null?z=I:w.sibling=I,w=I);return e&&D.forEach(function(le){return t(f,le)}),G&&en(f,S),z}function v(f,p,c,m){var z=gr(c);if(typeof z!="function")throw Error(y(150));if(c=z.call(c),c==null)throw Error(y(151));for(var w=z=null,D=p,S=p=0,I=null,M=c.next();D!==null&&!M.done;S++,M=c.next()){D.index>S?(I=D,D=null):I=D.sibling;var le=h(f,D,M.value,m);if(le===null){D===null&&(D=I);break}e&&D&&le.alternate===null&&t(f,D),p=i(le,p,S),w===null?z=le:w.sibling=le,w=le,D=I}if(M.done)return n(f,D),G&&en(f,S),z;if(D===null){for(;!M.done;S++,M=c.next())M=u(f,M.value,m),M!==null&&(p=i(M,p,S),w===null?z=M:w.sibling=M,w=M);return G&&en(f,S),z}for(D=r(f,D);!M.done;S++,M=c.next())M=x(D,f,S,M.value,m),M!==null&&(e&&M.alternate!==null&&D.delete(M.key===null?S:M.key),p=i(M,p,S),w===null?z=M:w.sibling=M,w=M);return e&&D.forEach(function(qe){return t(f,qe)}),G&&en(f,S),z}function C(f,p,c,m){if(typeof c=="object"&&c!==null&&c.type===Cn&&c.key===null&&(c=c.props.children),typeof c=="object"&&c!==null){switch(c.$$typeof){case No:e:{for(var z=c.key,w=p;w!==null;){if(w.key===z){if(z=c.type,z===Cn){if(w.tag===7){n(f,w.sibling),p=o(w,c.props.children),p.return=f,f=p;break e}}else if(w.elementType===z||typeof z=="object"&&z!==null&&z.$$typeof===jt&&Tc(z)===w.type){n(f,w.sibling),p=o(w,c.props),p.ref=vr(f,w,c),p.return=f,f=p;break e}n(f,w);break}else t(f,w);w=w.sibling}c.type===Cn?(p=ln(c.props.children,f.mode,m,c.key),p.return=f,f=p):(m=ti(c.type,c.key,c.props,null,f.mode,m),m.ref=vr(f,p,c),m.return=f,f=m)}return a(f);case Sn:e:{for(w=c.key;p!==null;){if(p.key===w)if(p.tag===4&&p.stateNode.containerInfo===c.containerInfo&&p.stateNode.implementation===c.implementation){n(f,p.sibling),p=o(p,c.children||[]),p.return=f,f=p;break e}else{n(f,p);break}else t(f,p);p=p.sibling}p=ul(c,f.mode,m),p.return=f,f=p}return a(f);case jt:return w=c._init,C(f,p,w(c._payload),m)}if(kr(c))return b(f,p,c,m);if(gr(c))return v(f,p,c,m);Ao(f,c)}return typeof c=="string"&&c!==""||typeof c=="number"?(c=""+c,p!==null&&p.tag===6?(n(f,p.sibling),p=o(p,c),p.return=f,f=p):(n(f,p),p=fl(c,f.mode,m),p.return=f,f=p),a(f)):n(f,p)}return C}var Vn=of(!0),af=of(!1),gi=Vt(null),hi=null,Tn=null,Ss=null;function Cs(){Ss=Tn=hi=null}function Ns(e){var t=gi.current;V(gi),e._currentValue=t}function Hl(e,t,n){for(;e!==null;){var r=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,r!==null&&(r.childLanes|=t)):r!==null&&(r.childLanes&t)!==t&&(r.childLanes|=t),e===n)break;e=e.return}}function $n(e,t){hi=e,Ss=Tn=null,e=e.dependencies,e!==null&&e.firstContext!==null&&((e.lanes&t)!==0&&(Ee=!0),e.firstContext=null)}function Xe(e){var t=e._currentValue;if(Ss!==e)if(e={context:e,memoizedValue:t,next:null},Tn===null){if(hi===null)throw Error(y(308));Tn=e,hi.dependencies={lanes:0,firstContext:e}}else Tn=Tn.next=e;return t}var rn=null;function Es(e){rn===null?rn=[e]:rn.push(e)}function lf(e,t,n,r){var o=t.interleaved;return o===null?(n.next=n,Es(t)):(n.next=o.next,o.next=n),t.interleaved=n,kt(e,r)}function kt(e,t){e.lanes|=t;var n=e.alternate;for(n!==null&&(n.lanes|=t),n=e,e=e.return;e!==null;)e.childLanes|=t,n=e.alternate,n!==null&&(n.childLanes|=t),n=e,e=e.return;return n.tag===3?n.stateNode:null}var Dt=!1;function js(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function sf(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function _t(e,t){return{eventTime:e,lane:t,tag:0,payload:null,callback:null,next:null}}function Bt(e,t,n){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,(L&2)!==0){var o=r.pending;return o===null?t.next=t:(t.next=o.next,o.next=t),r.pending=t,kt(e,n)}return o=r.interleaved,o===null?(t.next=t,Es(r)):(t.next=o.next,o.next=t),r.interleaved=t,kt(e,n)}function Qo(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,(n&4194240)!==0)){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,ms(e,n)}}function Lc(e,t){var n=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var o=null,i=null;if(n=n.firstBaseUpdate,n!==null){do{var a={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};i===null?o=i=a:i=i.next=a,n=n.next}while(n!==null);i===null?o=i=t:i=i.next=t}else o=i=t;n={baseState:r.baseState,firstBaseUpdate:o,lastBaseUpdate:i,shared:r.shared,effects:r.effects},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}function xi(e,t,n,r){var o=e.updateQueue;Dt=!1;var i=o.firstBaseUpdate,a=o.lastBaseUpdate,l=o.shared.pending;if(l!==null){o.shared.pending=null;var s=l,d=s.next;s.next=null,a===null?i=d:a.next=d,a=s;var g=e.alternate;g!==null&&(g=g.updateQueue,l=g.lastBaseUpdate,l!==a&&(l===null?g.firstBaseUpdate=d:l.next=d,g.lastBaseUpdate=s))}if(i!==null){var u=o.baseState;a=0,g=d=s=null,l=i;do{var h=l.lane,x=l.eventTime;if((r&h)===h){g!==null&&(g=g.next={eventTime:x,lane:0,tag:l.tag,payload:l.payload,callback:l.callback,next:null});e:{var b=e,v=l;switch(h=t,x=n,v.tag){case 1:if(b=v.payload,typeof b=="function"){u=b.call(x,u,h);break e}u=b;break e;case 3:b.flags=b.flags&-65537|128;case 0:if(b=v.payload,h=typeof b=="function"?b.call(x,u,h):b,h==null)break e;u=J({},u,h);break e;case 2:Dt=!0}}l.callback!==null&&l.lane!==0&&(e.flags|=64,h=o.effects,h===null?o.effects=[l]:h.push(l))}else x={eventTime:x,lane:h,tag:l.tag,payload:l.payload,callback:l.callback,next:null},g===null?(d=g=x,s=u):g=g.next=x,a|=h;if(l=l.next,l===null){if(l=o.shared.pending,l===null)break;h=l,l=h.next,h.next=null,o.lastBaseUpdate=h,o.shared.pending=null}}while(!0);if(g===null&&(s=u),o.baseState=s,o.firstBaseUpdate=d,o.lastBaseUpdate=g,t=o.shared.interleaved,t!==null){o=t;do a|=o.lane,o=o.next;while(o!==t)}else i===null&&(o.shared.lanes=0);pn|=a,e.lanes=a,e.memoizedState=u}}function Oc(e,t,n){if(e=t.effects,t.effects=null,e!==null)for(t=0;t<e.length;t++){var r=e[t],o=r.callback;if(o!==null){if(r.callback=null,r=n,typeof o!="function")throw Error(y(191,o));o.call(r)}}}var no={},ut=Vt(no),Kr=Vt(no),Gr=Vt(no);function on(e){if(e===no)throw Error(y(174));return e}function Ds(e,t){switch(q(Gr,t),q(Kr,e),q(ut,no),e=t.nodeType,e){case 9:case 11:t=(t=t.documentElement)?t.namespaceURI:wl(null,"");break;default:e=e===8?t.parentNode:t,t=e.namespaceURI||null,e=e.tagName,t=wl(t,e)}V(ut),q(ut,t)}function Kn(){V(ut),V(Kr),V(Gr)}function df(e){on(Gr.current);var t=on(ut.current),n=wl(t,e.type);t!==n&&(q(Kr,e),q(ut,n))}function Ps(e){Kr.current===e&&(V(ut),V(Kr))}var Y=Vt(0);function bi(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==void 0){if((t.flags&128)!==0)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var al=[];function Ms(){for(var e=0;e<al.length;e++)al[e]._workInProgressVersionPrimary=null;al.length=0}var Xo=Ct.ReactCurrentDispatcher,ll=Ct.ReactCurrentBatchConfig,cn=0,Z=null,ie=null,se=null,vi=!1,Mr=!1,Qr=0,Hh=0;function ge(){throw Error(y(321))}function Is(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!at(e[n],t[n]))return!1;return!0}function Ts(e,t,n,r,o,i){if(cn=i,Z=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,Xo.current=e===null||e.memoizedState===null?Kh:Gh,e=n(r,o),Mr){i=0;do{if(Mr=!1,Qr=0,25<=i)throw Error(y(301));i+=1,se=ie=null,t.updateQueue=null,Xo.current=Qh,e=n(r,o)}while(Mr)}if(Xo.current=zi,t=ie!==null&&ie.next!==null,cn=0,se=ie=Z=null,vi=!1,t)throw Error(y(300));return e}function Ls(){var e=Qr!==0;return Qr=0,e}function ct(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return se===null?Z.memoizedState=se=e:se=se.next=e,se}function Ye(){if(ie===null){var e=Z.alternate;e=e!==null?e.memoizedState:null}else e=ie.next;var t=se===null?Z.memoizedState:se.next;if(t!==null)se=t,ie=e;else{if(e===null)throw Error(y(310));ie=e,e={memoizedState:ie.memoizedState,baseState:ie.baseState,baseQueue:ie.baseQueue,queue:ie.queue,next:null},se===null?Z.memoizedState=se=e:se=se.next=e}return se}function Xr(e,t){return typeof t=="function"?t(e):t}function sl(e){var t=Ye(),n=t.queue;if(n===null)throw Error(y(311));n.lastRenderedReducer=e;var r=ie,o=r.baseQueue,i=n.pending;if(i!==null){if(o!==null){var a=o.next;o.next=i.next,i.next=a}r.baseQueue=o=i,n.pending=null}if(o!==null){i=o.next,r=r.baseState;var l=a=null,s=null,d=i;do{var g=d.lane;if((cn&g)===g)s!==null&&(s=s.next={lane:0,action:d.action,hasEagerState:d.hasEagerState,eagerState:d.eagerState,next:null}),r=d.hasEagerState?d.eagerState:e(r,d.action);else{var u={lane:g,action:d.action,hasEagerState:d.hasEagerState,eagerState:d.eagerState,next:null};s===null?(l=s=u,a=r):s=s.next=u,Z.lanes|=g,pn|=g}d=d.next}while(d!==null&&d!==i);s===null?a=r:s.next=l,at(r,t.memoizedState)||(Ee=!0),t.memoizedState=r,t.baseState=a,t.baseQueue=s,n.lastRenderedState=r}if(e=n.interleaved,e!==null){o=e;do i=o.lane,Z.lanes|=i,pn|=i,o=o.next;while(o!==e)}else o===null&&(n.lanes=0);return[t.memoizedState,n.dispatch]}function dl(e){var t=Ye(),n=t.queue;if(n===null)throw Error(y(311));n.lastRenderedReducer=e;var r=n.dispatch,o=n.pending,i=t.memoizedState;if(o!==null){n.pending=null;var a=o=o.next;do i=e(i,a.action),a=a.next;while(a!==o);at(i,t.memoizedState)||(Ee=!0),t.memoizedState=i,t.baseQueue===null&&(t.baseState=i),n.lastRenderedState=i}return[i,r]}function cf(){}function pf(e,t){var n=Z,r=Ye(),o=t(),i=!at(r.memoizedState,o);if(i&&(r.memoizedState=o,Ee=!0),r=r.queue,Os(mf.bind(null,n,r,e),[e]),r.getSnapshot!==t||i||se!==null&&se.memoizedState.tag&1){if(n.flags|=2048,Yr(9,uf.bind(null,n,r,o,t),void 0,null),de===null)throw Error(y(349));(cn&30)!==0||ff(n,t,o)}return o}function ff(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=Z.updateQueue,t===null?(t={lastEffect:null,stores:null},Z.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function uf(e,t,n,r){t.value=n,t.getSnapshot=r,gf(t)&&hf(e)}function mf(e,t,n){return n(function(){gf(t)&&hf(e)})}function gf(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!at(e,n)}catch{return!0}}function hf(e){var t=kt(e,1);t!==null&&it(t,e,1,-1)}function Rc(e){var t=ct();return typeof e=="function"&&(e=e()),t.memoizedState=t.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:Xr,lastRenderedState:e},t.queue=e,e=e.dispatch=Vh.bind(null,Z,e),[t.memoizedState,e]}function Yr(e,t,n,r){return e={tag:e,create:t,destroy:n,deps:r,next:null},t=Z.updateQueue,t===null?(t={lastEffect:null,stores:null},Z.updateQueue=t,t.lastEffect=e.next=e):(n=t.lastEffect,n===null?t.lastEffect=e.next=e:(r=n.next,n.next=e,e.next=r,t.lastEffect=e)),e}function xf(){return Ye().memoizedState}function Yo(e,t,n,r){var o=ct();Z.flags|=e,o.memoizedState=Yr(1|t,n,void 0,r===void 0?null:r)}function Mi(e,t,n,r){var o=Ye();r=r===void 0?null:r;var i=void 0;if(ie!==null){var a=ie.memoizedState;if(i=a.destroy,r!==null&&Is(r,a.deps)){o.memoizedState=Yr(t,n,i,r);return}}Z.flags|=e,o.memoizedState=Yr(1|t,n,i,r)}function Fc(e,t){return Yo(8390656,8,e,t)}function Os(e,t){return Mi(2048,8,e,t)}function bf(e,t){return Mi(4,2,e,t)}function vf(e,t){return Mi(4,4,e,t)}function zf(e,t){if(typeof t=="function")return e=e(),t(e),function(){t(null)};if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function _f(e,t,n){return n=n!=null?n.concat([e]):null,Mi(4,4,zf.bind(null,t,e),n)}function Rs(){}function yf(e,t){var n=Ye();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&Is(t,r[1])?r[0]:(n.memoizedState=[e,t],e)}function wf(e,t){var n=Ye();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&Is(t,r[1])?r[0]:(e=e(),n.memoizedState=[e,t],e)}function kf(e,t,n){return(cn&21)===0?(e.baseState&&(e.baseState=!1,Ee=!0),e.memoizedState=n):(at(n,t)||(n=Ep(),Z.lanes|=n,pn|=n,e.baseState=!0),t)}function qh(e,t){var n=B;B=n!==0&&4>n?n:4,e(!0);var r=ll.transition;ll.transition={};try{e(!1),t()}finally{B=n,ll.transition=r}}function Sf(){return Ye().memoizedState}function Wh(e,t,n){var r=$t(e);if(n={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null},Cf(e))Nf(t,n);else if(n=lf(e,t,n,r),n!==null){var o=we();it(n,e,r,o),Ef(n,t,r)}}function Vh(e,t,n){var r=$t(e),o={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null};if(Cf(e))Nf(t,o);else{var i=e.alternate;if(e.lanes===0&&(i===null||i.lanes===0)&&(i=t.lastRenderedReducer,i!==null))try{var a=t.lastRenderedState,l=i(a,n);if(o.hasEagerState=!0,o.eagerState=l,at(l,a)){var s=t.interleaved;s===null?(o.next=o,Es(t)):(o.next=s.next,s.next=o),t.interleaved=o;return}}catch{}finally{}n=lf(e,t,o,r),n!==null&&(o=we(),it(n,e,r,o),Ef(n,t,r))}}function Cf(e){var t=e.alternate;return e===Z||t!==null&&t===Z}function Nf(e,t){Mr=vi=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function Ef(e,t,n){if((n&4194240)!==0){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,ms(e,n)}}var zi={readContext:Xe,useCallback:ge,useContext:ge,useEffect:ge,useImperativeHandle:ge,useInsertionEffect:ge,useLayoutEffect:ge,useMemo:ge,useReducer:ge,useRef:ge,useState:ge,useDebugValue:ge,useDeferredValue:ge,useTransition:ge,useMutableSource:ge,useSyncExternalStore:ge,useId:ge,unstable_isNewReconciler:!1},Kh={readContext:Xe,useCallback:function(e,t){return ct().memoizedState=[e,t===void 0?null:t],e},useContext:Xe,useEffect:Fc,useImperativeHandle:function(e,t,n){return n=n!=null?n.concat([e]):null,Yo(4194308,4,zf.bind(null,t,e),n)},useLayoutEffect:function(e,t){return Yo(4194308,4,e,t)},useInsertionEffect:function(e,t){return Yo(4,2,e,t)},useMemo:function(e,t){var n=ct();return t=t===void 0?null:t,e=e(),n.memoizedState=[e,t],e},useReducer:function(e,t,n){var r=ct();return t=n!==void 0?n(t):t,r.memoizedState=r.baseState=t,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:t},r.queue=e,e=e.dispatch=Wh.bind(null,Z,e),[r.memoizedState,e]},useRef:function(e){var t=ct();return e={current:e},t.memoizedState=e},useState:Rc,useDebugValue:Rs,useDeferredValue:function(e){return ct().memoizedState=e},useTransition:function(){var e=Rc(!1),t=e[0];return e=qh.bind(null,e[1]),ct().memoizedState=e,[t,e]},useMutableSource:function(){},useSyncExternalStore:function(e,t,n){var r=Z,o=ct();if(G){if(n===void 0)throw Error(y(407));n=n()}else{if(n=t(),de===null)throw Error(y(349));(cn&30)!==0||ff(r,t,n)}o.memoizedState=n;var i={value:n,getSnapshot:t};return o.queue=i,Fc(mf.bind(null,r,i,e),[e]),r.flags|=2048,Yr(9,uf.bind(null,r,i,n,t),void 0,null),n},useId:function(){var e=ct(),t=de.identifierPrefix;if(G){var n=zt,r=vt;n=(r&~(1<<32-ot(r)-1)).toString(32)+n,t=":"+t+"R"+n,n=Qr++,0<n&&(t+="H"+n.toString(32)),t+=":"}else n=Hh++,t=":"+t+"r"+n.toString(32)+":";return e.memoizedState=t},unstable_isNewReconciler:!1},Gh={readContext:Xe,useCallback:yf,useContext:Xe,useEffect:Os,useImperativeHandle:_f,useInsertionEffect:bf,useLayoutEffect:vf,useMemo:wf,useReducer:sl,useRef:xf,useState:function(){return sl(Xr)},useDebugValue:Rs,useDeferredValue:function(e){var t=Ye();return kf(t,ie.memoizedState,e)},useTransition:function(){var e=sl(Xr)[0],t=Ye().memoizedState;return[e,t]},useMutableSource:cf,useSyncExternalStore:pf,useId:Sf,unstable_isNewReconciler:!1},Qh={readContext:Xe,useCallback:yf,useContext:Xe,useEffect:Os,useImperativeHandle:_f,useInsertionEffect:bf,useLayoutEffect:vf,useMemo:wf,useReducer:dl,useRef:xf,useState:function(){return dl(Xr)},useDebugValue:Rs,useDeferredValue:function(e){var t=Ye();return ie===null?t.memoizedState=e:kf(t,ie.memoizedState,e)},useTransition:function(){var e=dl(Xr)[0],t=Ye().memoizedState;return[e,t]},useMutableSource:cf,useSyncExternalStore:pf,useId:Sf,unstable_isNewReconciler:!1};function tt(e,t){if(e&&e.defaultProps){t=J({},t),e=e.defaultProps;for(var n in e)t[n]===void 0&&(t[n]=e[n]);return t}return t}function ql(e,t,n,r){t=e.memoizedState,n=n(r,t),n=n==null?t:J({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var Ii={isMounted:function(e){return(e=e._reactInternals)?mn(e)===e:!1},enqueueSetState:function(e,t,n){e=e._reactInternals;var r=we(),o=$t(e),i=_t(r,o);i.payload=t,n!=null&&(i.callback=n),t=Bt(e,i,o),t!==null&&(it(t,e,o,r),Qo(t,e,o))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var r=we(),o=$t(e),i=_t(r,o);i.tag=1,i.payload=t,n!=null&&(i.callback=n),t=Bt(e,i,o),t!==null&&(it(t,e,o,r),Qo(t,e,o))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=we(),r=$t(e),o=_t(n,r);o.tag=2,t!=null&&(o.callback=t),t=Bt(e,o,r),t!==null&&(it(t,e,r,n),Qo(t,e,r))}};function Bc(e,t,n,r,o,i,a){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(r,i,a):t.prototype&&t.prototype.isPureReactComponent?!Hr(n,r)||!Hr(o,i):!0}function jf(e,t,n){var r=!1,o=qt,i=t.contextType;return typeof i=="object"&&i!==null?i=Xe(i):(o=De(t)?sn:be.current,r=t.contextTypes,i=(r=r!=null)?qn(e,o):qt),t=new t(n,i),e.memoizedState=t.state!==null&&t.state!==void 0?t.state:null,t.updater=Ii,e.stateNode=t,t._reactInternals=e,r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=o,e.__reactInternalMemoizedMaskedChildContext=i),t}function Uc(e,t,n,r){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(n,r),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==e&&Ii.enqueueReplaceState(t,t.state,null)}function Wl(e,t,n,r){var o=e.stateNode;o.props=n,o.state=e.memoizedState,o.refs={},js(e);var i=t.contextType;typeof i=="object"&&i!==null?o.context=Xe(i):(i=De(t)?sn:be.current,o.context=qn(e,i)),o.state=e.memoizedState,i=t.getDerivedStateFromProps,typeof i=="function"&&(ql(e,t,i,n),o.state=e.memoizedState),typeof t.getDerivedStateFromProps=="function"||typeof o.getSnapshotBeforeUpdate=="function"||typeof o.UNSAFE_componentWillMount!="function"&&typeof o.componentWillMount!="function"||(t=o.state,typeof o.componentWillMount=="function"&&o.componentWillMount(),typeof o.UNSAFE_componentWillMount=="function"&&o.UNSAFE_componentWillMount(),t!==o.state&&Ii.enqueueReplaceState(o,o.state,null),xi(e,n,o,r),o.state=e.memoizedState),typeof o.componentDidMount=="function"&&(e.flags|=4194308)}function Gn(e,t){try{var n="",r=t;do n+=Sg(r),r=r.return;while(r);var o=n}catch(i){o=`
Error generating stack: `+i.message+`
`+i.stack}return{value:e,source:t,stack:o,digest:null}}function cl(e,t,n){return{value:e,source:null,stack:n!=null?n:null,digest:t!=null?t:null}}function Vl(e,t){try{console.error(t.value)}catch(n){setTimeout(function(){throw n})}}var Xh=typeof WeakMap=="function"?WeakMap:Map;function Df(e,t,n){n=_t(-1,n),n.tag=3,n.payload={element:null};var r=t.value;return n.callback=function(){yi||(yi=!0,ns=r),Vl(e,t)},n}function Pf(e,t,n){n=_t(-1,n),n.tag=3;var r=e.type.getDerivedStateFromError;if(typeof r=="function"){var o=t.value;n.payload=function(){return r(o)},n.callback=function(){Vl(e,t)}}var i=e.stateNode;return i!==null&&typeof i.componentDidCatch=="function"&&(n.callback=function(){Vl(e,t),typeof r!="function"&&(Ut===null?Ut=new Set([this]):Ut.add(this));var a=t.stack;this.componentDidCatch(t.value,{componentStack:a!==null?a:""})}),n}function $c(e,t,n){var r=e.pingCache;if(r===null){r=e.pingCache=new Xh;var o=new Set;r.set(t,o)}else o=r.get(t),o===void 0&&(o=new Set,r.set(t,o));o.has(n)||(o.add(n),e=cx.bind(null,e,t,n),t.then(e,e))}function Ac(e){do{var t;if((t=e.tag===13)&&(t=e.memoizedState,t=t!==null?t.dehydrated!==null:!0),t)return e;e=e.return}while(e!==null);return null}function Hc(e,t,n,r,o){return(e.mode&1)===0?(e===t?e.flags|=65536:(e.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(t=_t(-1,1),t.tag=2,Bt(n,t,1))),n.lanes|=1),e):(e.flags|=65536,e.lanes=o,e)}var Yh=Ct.ReactCurrentOwner,Ee=!1;function ye(e,t,n,r){t.child=e===null?af(t,null,n,r):Vn(t,e.child,n,r)}function qc(e,t,n,r,o){n=n.render;var i=t.ref;return $n(t,o),r=Ts(e,t,n,r,i,o),n=Ls(),e!==null&&!Ee?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~o,St(e,t,o)):(G&&n&&ys(t),t.flags|=1,ye(e,t,r,o),t.child)}function Wc(e,t,n,r,o){if(e===null){var i=n.type;return typeof i=="function"&&!Ws(i)&&i.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(t.tag=15,t.type=i,Mf(e,t,i,r,o)):(e=ti(n.type,null,r,t,t.mode,o),e.ref=t.ref,e.return=t,t.child=e)}if(i=e.child,(e.lanes&o)===0){var a=i.memoizedProps;if(n=n.compare,n=n!==null?n:Hr,n(a,r)&&e.ref===t.ref)return St(e,t,o)}return t.flags|=1,e=At(i,r),e.ref=t.ref,e.return=t,t.child=e}function Mf(e,t,n,r,o){if(e!==null){var i=e.memoizedProps;if(Hr(i,r)&&e.ref===t.ref)if(Ee=!1,t.pendingProps=r=i,(e.lanes&o)!==0)(e.flags&131072)!==0&&(Ee=!0);else return t.lanes=e.lanes,St(e,t,o)}return Kl(e,t,n,r,o)}function If(e,t,n){var r=t.pendingProps,o=r.children,i=e!==null?e.memoizedState:null;if(r.mode==="hidden")if((t.mode&1)===0)t.memoizedState={baseLanes:0,cachePool:null,transitions:null},q(On,Le),Le|=n;else{if((n&1073741824)===0)return e=i!==null?i.baseLanes|n:n,t.lanes=t.childLanes=1073741824,t.memoizedState={baseLanes:e,cachePool:null,transitions:null},t.updateQueue=null,q(On,Le),Le|=e,null;t.memoizedState={baseLanes:0,cachePool:null,transitions:null},r=i!==null?i.baseLanes:n,q(On,Le),Le|=r}else i!==null?(r=i.baseLanes|n,t.memoizedState=null):r=n,q(On,Le),Le|=r;return ye(e,t,o,n),t.child}function Tf(e,t){var n=t.ref;(e===null&&n!==null||e!==null&&e.ref!==n)&&(t.flags|=512,t.flags|=2097152)}function Kl(e,t,n,r,o){var i=De(n)?sn:be.current;return i=qn(t,i),$n(t,o),n=Ts(e,t,n,r,i,o),r=Ls(),e!==null&&!Ee?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~o,St(e,t,o)):(G&&r&&ys(t),t.flags|=1,ye(e,t,n,o),t.child)}function Vc(e,t,n,r,o){if(De(n)){var i=!0;fi(t)}else i=!1;if($n(t,o),t.stateNode===null)Zo(e,t),jf(t,n,r),Wl(t,n,r,o),r=!0;else if(e===null){var a=t.stateNode,l=t.memoizedProps;a.props=l;var s=a.context,d=n.contextType;typeof d=="object"&&d!==null?d=Xe(d):(d=De(n)?sn:be.current,d=qn(t,d));var g=n.getDerivedStateFromProps,u=typeof g=="function"||typeof a.getSnapshotBeforeUpdate=="function";u||typeof a.UNSAFE_componentWillReceiveProps!="function"&&typeof a.componentWillReceiveProps!="function"||(l!==r||s!==d)&&Uc(t,a,r,d),Dt=!1;var h=t.memoizedState;a.state=h,xi(t,r,a,o),s=t.memoizedState,l!==r||h!==s||je.current||Dt?(typeof g=="function"&&(ql(t,n,g,r),s=t.memoizedState),(l=Dt||Bc(t,n,l,r,h,s,d))?(u||typeof a.UNSAFE_componentWillMount!="function"&&typeof a.componentWillMount!="function"||(typeof a.componentWillMount=="function"&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount=="function"&&a.UNSAFE_componentWillMount()),typeof a.componentDidMount=="function"&&(t.flags|=4194308)):(typeof a.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=r,t.memoizedState=s),a.props=r,a.state=s,a.context=d,r=l):(typeof a.componentDidMount=="function"&&(t.flags|=4194308),r=!1)}else{a=t.stateNode,sf(e,t),l=t.memoizedProps,d=t.type===t.elementType?l:tt(t.type,l),a.props=d,u=t.pendingProps,h=a.context,s=n.contextType,typeof s=="object"&&s!==null?s=Xe(s):(s=De(n)?sn:be.current,s=qn(t,s));var x=n.getDerivedStateFromProps;(g=typeof x=="function"||typeof a.getSnapshotBeforeUpdate=="function")||typeof a.UNSAFE_componentWillReceiveProps!="function"&&typeof a.componentWillReceiveProps!="function"||(l!==u||h!==s)&&Uc(t,a,r,s),Dt=!1,h=t.memoizedState,a.state=h,xi(t,r,a,o);var b=t.memoizedState;l!==u||h!==b||je.current||Dt?(typeof x=="function"&&(ql(t,n,x,r),b=t.memoizedState),(d=Dt||Bc(t,n,d,r,h,b,s)||!1)?(g||typeof a.UNSAFE_componentWillUpdate!="function"&&typeof a.componentWillUpdate!="function"||(typeof a.componentWillUpdate=="function"&&a.componentWillUpdate(r,b,s),typeof a.UNSAFE_componentWillUpdate=="function"&&a.UNSAFE_componentWillUpdate(r,b,s)),typeof a.componentDidUpdate=="function"&&(t.flags|=4),typeof a.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof a.componentDidUpdate!="function"||l===e.memoizedProps&&h===e.memoizedState||(t.flags|=4),typeof a.getSnapshotBeforeUpdate!="function"||l===e.memoizedProps&&h===e.memoizedState||(t.flags|=1024),t.memoizedProps=r,t.memoizedState=b),a.props=r,a.state=b,a.context=s,r=d):(typeof a.componentDidUpdate!="function"||l===e.memoizedProps&&h===e.memoizedState||(t.flags|=4),typeof a.getSnapshotBeforeUpdate!="function"||l===e.memoizedProps&&h===e.memoizedState||(t.flags|=1024),r=!1)}return Gl(e,t,n,r,i,o)}function Gl(e,t,n,r,o,i){Tf(e,t);var a=(t.flags&128)!==0;if(!r&&!a)return o&&Pc(t,n,!1),St(e,t,i);r=t.stateNode,Yh.current=t;var l=a&&typeof n.getDerivedStateFromError!="function"?null:r.render();return t.flags|=1,e!==null&&a?(t.child=Vn(t,e.child,null,i),t.child=Vn(t,null,l,i)):ye(e,t,l,i),t.memoizedState=r.state,o&&Pc(t,n,!0),t.child}function Lf(e){var t=e.stateNode;t.pendingContext?Dc(e,t.pendingContext,t.pendingContext!==t.context):t.context&&Dc(e,t.context,!1),Ds(e,t.containerInfo)}function Kc(e,t,n,r,o){return Wn(),ks(o),t.flags|=256,ye(e,t,n,r),t.child}var Ql={dehydrated:null,treeContext:null,retryLane:0};function Xl(e){return{baseLanes:e,cachePool:null,transitions:null}}function Of(e,t,n){var r=t.pendingProps,o=Y.current,i=!1,a=(t.flags&128)!==0,l;if((l=a)||(l=e!==null&&e.memoizedState===null?!1:(o&2)!==0),l?(i=!0,t.flags&=-129):(e===null||e.memoizedState!==null)&&(o|=1),q(Y,o&1),e===null)return Al(t),e=t.memoizedState,e!==null&&(e=e.dehydrated,e!==null)?((t.mode&1)===0?t.lanes=1:e.data==="$!"?t.lanes=8:t.lanes=1073741824,null):(a=r.children,e=r.fallback,i?(r=t.mode,i=t.child,a={mode:"hidden",children:a},(r&1)===0&&i!==null?(i.childLanes=0,i.pendingProps=a):i=Oi(a,r,0,null),e=ln(e,r,n,null),i.return=t,e.return=t,i.sibling=e,t.child=i,t.child.memoizedState=Xl(n),t.memoizedState=Ql,e):Fs(t,a));if(o=e.memoizedState,o!==null&&(l=o.dehydrated,l!==null))return Zh(e,t,a,r,l,o,n);if(i){i=r.fallback,a=t.mode,o=e.child,l=o.sibling;var s={mode:"hidden",children:r.children};return(a&1)===0&&t.child!==o?(r=t.child,r.childLanes=0,r.pendingProps=s,t.deletions=null):(r=At(o,s),r.subtreeFlags=o.subtreeFlags&14680064),l!==null?i=At(l,i):(i=ln(i,a,n,null),i.flags|=2),i.return=t,r.return=t,r.sibling=i,t.child=r,r=i,i=t.child,a=e.child.memoizedState,a=a===null?Xl(n):{baseLanes:a.baseLanes|n,cachePool:null,transitions:a.transitions},i.memoizedState=a,i.childLanes=e.childLanes&~n,t.memoizedState=Ql,r}return i=e.child,e=i.sibling,r=At(i,{mode:"visible",children:r.children}),(t.mode&1)===0&&(r.lanes=n),r.return=t,r.sibling=null,e!==null&&(n=t.deletions,n===null?(t.deletions=[e],t.flags|=16):n.push(e)),t.child=r,t.memoizedState=null,r}function Fs(e,t){return t=Oi({mode:"visible",children:t},e.mode,0,null),t.return=e,e.child=t}function Ho(e,t,n,r){return r!==null&&ks(r),Vn(t,e.child,null,n),e=Fs(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function Zh(e,t,n,r,o,i,a){if(n)return t.flags&256?(t.flags&=-257,r=cl(Error(y(422))),Ho(e,t,a,r)):t.memoizedState!==null?(t.child=e.child,t.flags|=128,null):(i=r.fallback,o=t.mode,r=Oi({mode:"visible",children:r.children},o,0,null),i=ln(i,o,a,null),i.flags|=2,r.return=t,i.return=t,r.sibling=i,t.child=r,(t.mode&1)!==0&&Vn(t,e.child,null,a),t.child.memoizedState=Xl(a),t.memoizedState=Ql,i);if((t.mode&1)===0)return Ho(e,t,a,null);if(o.data==="$!"){if(r=o.nextSibling&&o.nextSibling.dataset,r)var l=r.dgst;return r=l,i=Error(y(419)),r=cl(i,r,void 0),Ho(e,t,a,r)}if(l=(a&e.childLanes)!==0,Ee||l){if(r=de,r!==null){switch(a&-a){case 4:o=2;break;case 16:o=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:o=32;break;case 536870912:o=268435456;break;default:o=0}o=(o&(r.suspendedLanes|a))!==0?0:o,o!==0&&o!==i.retryLane&&(i.retryLane=o,kt(e,o),it(r,e,o,-1))}return qs(),r=cl(Error(y(421))),Ho(e,t,a,r)}return o.data==="$?"?(t.flags|=128,t.child=e.child,t=px.bind(null,e),o._reactRetry=t,null):(e=i.treeContext,Oe=Ft(o.nextSibling),Re=t,G=!0,rt=null,e!==null&&(Ve[Ke++]=vt,Ve[Ke++]=zt,Ve[Ke++]=dn,vt=e.id,zt=e.overflow,dn=t),t=Fs(t,r.children),t.flags|=4096,t)}function Gc(e,t,n){e.lanes|=t;var r=e.alternate;r!==null&&(r.lanes|=t),Hl(e.return,t,n)}function pl(e,t,n,r,o){var i=e.memoizedState;i===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:o}:(i.isBackwards=t,i.rendering=null,i.renderingStartTime=0,i.last=r,i.tail=n,i.tailMode=o)}function Rf(e,t,n){var r=t.pendingProps,o=r.revealOrder,i=r.tail;if(ye(e,t,r.children,n),r=Y.current,(r&2)!==0)r=r&1|2,t.flags|=128;else{if(e!==null&&(e.flags&128)!==0)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&Gc(e,n,t);else if(e.tag===19)Gc(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}r&=1}if(q(Y,r),(t.mode&1)===0)t.memoizedState=null;else switch(o){case"forwards":for(n=t.child,o=null;n!==null;)e=n.alternate,e!==null&&bi(e)===null&&(o=n),n=n.sibling;n=o,n===null?(o=t.child,t.child=null):(o=n.sibling,n.sibling=null),pl(t,!1,o,n,i);break;case"backwards":for(n=null,o=t.child,t.child=null;o!==null;){if(e=o.alternate,e!==null&&bi(e)===null){t.child=o;break}e=o.sibling,o.sibling=n,n=o,o=e}pl(t,!0,n,null,i);break;case"together":pl(t,!1,null,null,void 0);break;default:t.memoizedState=null}return t.child}function Zo(e,t){(t.mode&1)===0&&e!==null&&(e.alternate=null,t.alternate=null,t.flags|=2)}function St(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),pn|=t.lanes,(n&t.childLanes)===0)return null;if(e!==null&&t.child!==e.child)throw Error(y(153));if(t.child!==null){for(e=t.child,n=At(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=At(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function Jh(e,t,n){switch(t.tag){case 3:Lf(t),Wn();break;case 5:df(t);break;case 1:De(t.type)&&fi(t);break;case 4:Ds(t,t.stateNode.containerInfo);break;case 10:var r=t.type._context,o=t.memoizedProps.value;q(gi,r._currentValue),r._currentValue=o;break;case 13:if(r=t.memoizedState,r!==null)return r.dehydrated!==null?(q(Y,Y.current&1),t.flags|=128,null):(n&t.child.childLanes)!==0?Of(e,t,n):(q(Y,Y.current&1),e=St(e,t,n),e!==null?e.sibling:null);q(Y,Y.current&1);break;case 19:if(r=(n&t.childLanes)!==0,(e.flags&128)!==0){if(r)return Rf(e,t,n);t.flags|=128}if(o=t.memoizedState,o!==null&&(o.rendering=null,o.tail=null,o.lastEffect=null),q(Y,Y.current),r)break;return null;case 22:case 23:return t.lanes=0,If(e,t,n)}return St(e,t,n)}var Ff,Yl,Bf,Uf;Ff=function(e,t){for(var n=t.child;n!==null;){if(n.tag===5||n.tag===6)e.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};Yl=function(){};Bf=function(e,t,n,r){var o=e.memoizedProps;if(o!==r){e=t.stateNode,on(ut.current);var i=null;switch(n){case"input":o=vl(e,o),r=vl(e,r),i=[];break;case"select":o=J({},o,{value:void 0}),r=J({},r,{value:void 0}),i=[];break;case"textarea":o=yl(e,o),r=yl(e,r),i=[];break;default:typeof o.onClick!="function"&&typeof r.onClick=="function"&&(e.onclick=ci)}kl(n,r);var a;n=null;for(d in o)if(!r.hasOwnProperty(d)&&o.hasOwnProperty(d)&&o[d]!=null)if(d==="style"){var l=o[d];for(a in l)l.hasOwnProperty(a)&&(n||(n={}),n[a]="")}else d!=="dangerouslySetInnerHTML"&&d!=="children"&&d!=="suppressContentEditableWarning"&&d!=="suppressHydrationWarning"&&d!=="autoFocus"&&(Or.hasOwnProperty(d)?i||(i=[]):(i=i||[]).push(d,null));for(d in r){var s=r[d];if(l=o!=null?o[d]:void 0,r.hasOwnProperty(d)&&s!==l&&(s!=null||l!=null))if(d==="style")if(l){for(a in l)!l.hasOwnProperty(a)||s&&s.hasOwnProperty(a)||(n||(n={}),n[a]="");for(a in s)s.hasOwnProperty(a)&&l[a]!==s[a]&&(n||(n={}),n[a]=s[a])}else n||(i||(i=[]),i.push(d,n)),n=s;else d==="dangerouslySetInnerHTML"?(s=s?s.__html:void 0,l=l?l.__html:void 0,s!=null&&l!==s&&(i=i||[]).push(d,s)):d==="children"?typeof s!="string"&&typeof s!="number"||(i=i||[]).push(d,""+s):d!=="suppressContentEditableWarning"&&d!=="suppressHydrationWarning"&&(Or.hasOwnProperty(d)?(s!=null&&d==="onScroll"&&W("scroll",e),i||l===s||(i=[])):(i=i||[]).push(d,s))}n&&(i=i||[]).push("style",n);var d=i;(t.updateQueue=d)&&(t.flags|=4)}};Uf=function(e,t,n,r){n!==r&&(t.flags|=4)};function zr(e,t){if(!G)switch(e.tailMode){case"hidden":t=e.tail;for(var n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null;break;case"collapsed":n=e.tail;for(var r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null}}function he(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,r=0;if(t)for(var o=e.child;o!==null;)n|=o.lanes|o.childLanes,r|=o.subtreeFlags&14680064,r|=o.flags&14680064,o.return=e,o=o.sibling;else for(o=e.child;o!==null;)n|=o.lanes|o.childLanes,r|=o.subtreeFlags,r|=o.flags,o.return=e,o=o.sibling;return e.subtreeFlags|=r,e.childLanes=n,t}function ex(e,t,n){var r=t.pendingProps;switch(ws(t),t.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return he(t),null;case 1:return De(t.type)&&pi(),he(t),null;case 3:return r=t.stateNode,Kn(),V(je),V(be),Ms(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),(e===null||e.child===null)&&($o(t)?t.flags|=4:e===null||e.memoizedState.isDehydrated&&(t.flags&256)===0||(t.flags|=1024,rt!==null&&(is(rt),rt=null))),Yl(e,t),he(t),null;case 5:Ps(t);var o=on(Gr.current);if(n=t.type,e!==null&&t.stateNode!=null)Bf(e,t,n,r,o),e.ref!==t.ref&&(t.flags|=512,t.flags|=2097152);else{if(!r){if(t.stateNode===null)throw Error(y(166));return he(t),null}if(e=on(ut.current),$o(t)){r=t.stateNode,n=t.type;var i=t.memoizedProps;switch(r[pt]=t,r[Vr]=i,e=(t.mode&1)!==0,n){case"dialog":W("cancel",r),W("close",r);break;case"iframe":case"object":case"embed":W("load",r);break;case"video":case"audio":for(o=0;o<Cr.length;o++)W(Cr[o],r);break;case"source":W("error",r);break;case"img":case"image":case"link":W("error",r),W("load",r);break;case"details":W("toggle",r);break;case"input":nc(r,i),W("invalid",r);break;case"select":r._wrapperState={wasMultiple:!!i.multiple},W("invalid",r);break;case"textarea":oc(r,i),W("invalid",r)}kl(n,i),o=null;for(var a in i)if(i.hasOwnProperty(a)){var l=i[a];a==="children"?typeof l=="string"?r.textContent!==l&&(i.suppressHydrationWarning!==!0&&Uo(r.textContent,l,e),o=["children",l]):typeof l=="number"&&r.textContent!==""+l&&(i.suppressHydrationWarning!==!0&&Uo(r.textContent,l,e),o=["children",""+l]):Or.hasOwnProperty(a)&&l!=null&&a==="onScroll"&&W("scroll",r)}switch(n){case"input":Eo(r),rc(r,i,!0);break;case"textarea":Eo(r),ic(r);break;case"select":case"option":break;default:typeof i.onClick=="function"&&(r.onclick=ci)}r=o,t.updateQueue=r,r!==null&&(t.flags|=4)}else{a=o.nodeType===9?o:o.ownerDocument,e==="http://www.w3.org/1999/xhtml"&&(e=up(n)),e==="http://www.w3.org/1999/xhtml"?n==="script"?(e=a.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):typeof r.is=="string"?e=a.createElement(n,{is:r.is}):(e=a.createElement(n),n==="select"&&(a=e,r.multiple?a.multiple=!0:r.size&&(a.size=r.size))):e=a.createElementNS(e,n),e[pt]=t,e[Vr]=r,Ff(e,t,!1,!1),t.stateNode=e;e:{switch(a=Sl(n,r),n){case"dialog":W("cancel",e),W("close",e),o=r;break;case"iframe":case"object":case"embed":W("load",e),o=r;break;case"video":case"audio":for(o=0;o<Cr.length;o++)W(Cr[o],e);o=r;break;case"source":W("error",e),o=r;break;case"img":case"image":case"link":W("error",e),W("load",e),o=r;break;case"details":W("toggle",e),o=r;break;case"input":nc(e,r),o=vl(e,r),W("invalid",e);break;case"option":o=r;break;case"select":e._wrapperState={wasMultiple:!!r.multiple},o=J({},r,{value:void 0}),W("invalid",e);break;case"textarea":oc(e,r),o=yl(e,r),W("invalid",e);break;default:o=r}kl(n,o),l=o;for(i in l)if(l.hasOwnProperty(i)){var s=l[i];i==="style"?hp(e,s):i==="dangerouslySetInnerHTML"?(s=s?s.__html:void 0,s!=null&&mp(e,s)):i==="children"?typeof s=="string"?(n!=="textarea"||s!=="")&&Rr(e,s):typeof s=="number"&&Rr(e,""+s):i!=="suppressContentEditableWarning"&&i!=="suppressHydrationWarning"&&i!=="autoFocus"&&(Or.hasOwnProperty(i)?s!=null&&i==="onScroll"&&W("scroll",e):s!=null&&ss(e,i,s,a))}switch(n){case"input":Eo(e),rc(e,r,!1);break;case"textarea":Eo(e),ic(e);break;case"option":r.value!=null&&e.setAttribute("value",""+Ht(r.value));break;case"select":e.multiple=!!r.multiple,i=r.value,i!=null?Rn(e,!!r.multiple,i,!1):r.defaultValue!=null&&Rn(e,!!r.multiple,r.defaultValue,!0);break;default:typeof o.onClick=="function"&&(e.onclick=ci)}switch(n){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break e;case"img":r=!0;break e;default:r=!1}}r&&(t.flags|=4)}t.ref!==null&&(t.flags|=512,t.flags|=2097152)}return he(t),null;case 6:if(e&&t.stateNode!=null)Uf(e,t,e.memoizedProps,r);else{if(typeof r!="string"&&t.stateNode===null)throw Error(y(166));if(n=on(Gr.current),on(ut.current),$o(t)){if(r=t.stateNode,n=t.memoizedProps,r[pt]=t,(i=r.nodeValue!==n)&&(e=Re,e!==null))switch(e.tag){case 3:Uo(r.nodeValue,n,(e.mode&1)!==0);break;case 5:e.memoizedProps.suppressHydrationWarning!==!0&&Uo(r.nodeValue,n,(e.mode&1)!==0)}i&&(t.flags|=4)}else r=(n.nodeType===9?n:n.ownerDocument).createTextNode(r),r[pt]=t,t.stateNode=r}return he(t),null;case 13:if(V(Y),r=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(G&&Oe!==null&&(t.mode&1)!==0&&(t.flags&128)===0)rf(),Wn(),t.flags|=98560,i=!1;else if(i=$o(t),r!==null&&r.dehydrated!==null){if(e===null){if(!i)throw Error(y(318));if(i=t.memoizedState,i=i!==null?i.dehydrated:null,!i)throw Error(y(317));i[pt]=t}else Wn(),(t.flags&128)===0&&(t.memoizedState=null),t.flags|=4;he(t),i=!1}else rt!==null&&(is(rt),rt=null),i=!0;if(!i)return t.flags&65536?t:null}return(t.flags&128)!==0?(t.lanes=n,t):(r=r!==null,r!==(e!==null&&e.memoizedState!==null)&&r&&(t.child.flags|=8192,(t.mode&1)!==0&&(e===null||(Y.current&1)!==0?ae===0&&(ae=3):qs())),t.updateQueue!==null&&(t.flags|=4),he(t),null);case 4:return Kn(),Yl(e,t),e===null&&qr(t.stateNode.containerInfo),he(t),null;case 10:return Ns(t.type._context),he(t),null;case 17:return De(t.type)&&pi(),he(t),null;case 19:if(V(Y),i=t.memoizedState,i===null)return he(t),null;if(r=(t.flags&128)!==0,a=i.rendering,a===null)if(r)zr(i,!1);else{if(ae!==0||e!==null&&(e.flags&128)!==0)for(e=t.child;e!==null;){if(a=bi(e),a!==null){for(t.flags|=128,zr(i,!1),r=a.updateQueue,r!==null&&(t.updateQueue=r,t.flags|=4),t.subtreeFlags=0,r=n,n=t.child;n!==null;)i=n,e=r,i.flags&=14680066,a=i.alternate,a===null?(i.childLanes=0,i.lanes=e,i.child=null,i.subtreeFlags=0,i.memoizedProps=null,i.memoizedState=null,i.updateQueue=null,i.dependencies=null,i.stateNode=null):(i.childLanes=a.childLanes,i.lanes=a.lanes,i.child=a.child,i.subtreeFlags=0,i.deletions=null,i.memoizedProps=a.memoizedProps,i.memoizedState=a.memoizedState,i.updateQueue=a.updateQueue,i.type=a.type,e=a.dependencies,i.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),n=n.sibling;return q(Y,Y.current&1|2),t.child}e=e.sibling}i.tail!==null&&re()>Qn&&(t.flags|=128,r=!0,zr(i,!1),t.lanes=4194304)}else{if(!r)if(e=bi(a),e!==null){if(t.flags|=128,r=!0,n=e.updateQueue,n!==null&&(t.updateQueue=n,t.flags|=4),zr(i,!0),i.tail===null&&i.tailMode==="hidden"&&!a.alternate&&!G)return he(t),null}else 2*re()-i.renderingStartTime>Qn&&n!==1073741824&&(t.flags|=128,r=!0,zr(i,!1),t.lanes=4194304);i.isBackwards?(a.sibling=t.child,t.child=a):(n=i.last,n!==null?n.sibling=a:t.child=a,i.last=a)}return i.tail!==null?(t=i.tail,i.rendering=t,i.tail=t.sibling,i.renderingStartTime=re(),t.sibling=null,n=Y.current,q(Y,r?n&1|2:n&1),t):(he(t),null);case 22:case 23:return Hs(),r=t.memoizedState!==null,e!==null&&e.memoizedState!==null!==r&&(t.flags|=8192),r&&(t.mode&1)!==0?(Le&1073741824)!==0&&(he(t),t.subtreeFlags&6&&(t.flags|=8192)):he(t),null;case 24:return null;case 25:return null}throw Error(y(156,t.tag))}function tx(e,t){switch(ws(t),t.tag){case 1:return De(t.type)&&pi(),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return Kn(),V(je),V(be),Ms(),e=t.flags,(e&65536)!==0&&(e&128)===0?(t.flags=e&-65537|128,t):null;case 5:return Ps(t),null;case 13:if(V(Y),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(y(340));Wn()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return V(Y),null;case 4:return Kn(),null;case 10:return Ns(t.type._context),null;case 22:case 23:return Hs(),null;case 24:return null;default:return null}}var qo=!1,xe=!1,nx=typeof WeakSet=="function"?WeakSet:Set,j=null;function Ln(e,t){var n=e.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(r){te(e,t,r)}else n.current=null}function Zl(e,t,n){try{n()}catch(r){te(e,t,r)}}var Qc=!1;function rx(e,t){if(Ll=li,e=qp(),_s(e)){if("selectionStart"in e)var n={start:e.selectionStart,end:e.selectionEnd};else e:{n=(n=e.ownerDocument)&&n.defaultView||window;var r=n.getSelection&&n.getSelection();if(r&&r.rangeCount!==0){n=r.anchorNode;var o=r.anchorOffset,i=r.focusNode;r=r.focusOffset;try{n.nodeType,i.nodeType}catch{n=null;break e}var a=0,l=-1,s=-1,d=0,g=0,u=e,h=null;t:for(;;){for(var x;u!==n||o!==0&&u.nodeType!==3||(l=a+o),u!==i||r!==0&&u.nodeType!==3||(s=a+r),u.nodeType===3&&(a+=u.nodeValue.length),(x=u.firstChild)!==null;)h=u,u=x;for(;;){if(u===e)break t;if(h===n&&++d===o&&(l=a),h===i&&++g===r&&(s=a),(x=u.nextSibling)!==null)break;u=h,h=u.parentNode}u=x}n=l===-1||s===-1?null:{start:l,end:s}}else n=null}n=n||{start:0,end:0}}else n=null;for(Ol={focusedElem:e,selectionRange:n},li=!1,j=t;j!==null;)if(t=j,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,j=e;else for(;j!==null;){t=j;try{var b=t.alternate;if((t.flags&1024)!==0)switch(t.tag){case 0:case 11:case 15:break;case 1:if(b!==null){var v=b.memoizedProps,C=b.memoizedState,f=t.stateNode,p=f.getSnapshotBeforeUpdate(t.elementType===t.type?v:tt(t.type,v),C);f.__reactInternalSnapshotBeforeUpdate=p}break;case 3:var c=t.stateNode.containerInfo;c.nodeType===1?c.textContent="":c.nodeType===9&&c.documentElement&&c.removeChild(c.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(y(163))}}catch(m){te(t,t.return,m)}if(e=t.sibling,e!==null){e.return=t.return,j=e;break}j=t.return}return b=Qc,Qc=!1,b}function Ir(e,t,n){var r=t.updateQueue;if(r=r!==null?r.lastEffect:null,r!==null){var o=r=r.next;do{if((o.tag&e)===e){var i=o.destroy;o.destroy=void 0,i!==void 0&&Zl(t,n,i)}o=o.next}while(o!==r)}}function Ti(e,t){if(t=t.updateQueue,t=t!==null?t.lastEffect:null,t!==null){var n=t=t.next;do{if((n.tag&e)===e){var r=n.create;n.destroy=r()}n=n.next}while(n!==t)}}function Jl(e){var t=e.ref;if(t!==null){var n=e.stateNode;switch(e.tag){case 5:e=n;break;default:e=n}typeof t=="function"?t(e):t.current=e}}function $f(e){var t=e.alternate;t!==null&&(e.alternate=null,$f(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&(delete t[pt],delete t[Vr],delete t[Bl],delete t[Bh],delete t[Uh])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function Af(e){return e.tag===5||e.tag===3||e.tag===4}function Xc(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||Af(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function es(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.nodeType===8?n.parentNode.insertBefore(e,t):n.insertBefore(e,t):(n.nodeType===8?(t=n.parentNode,t.insertBefore(e,n)):(t=n,t.appendChild(e)),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=ci));else if(r!==4&&(e=e.child,e!==null))for(es(e,t,n),e=e.sibling;e!==null;)es(e,t,n),e=e.sibling}function ts(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(r!==4&&(e=e.child,e!==null))for(ts(e,t,n),e=e.sibling;e!==null;)ts(e,t,n),e=e.sibling}var ce=null,nt=!1;function Et(e,t,n){for(n=n.child;n!==null;)Hf(e,t,n),n=n.sibling}function Hf(e,t,n){if(ft&&typeof ft.onCommitFiberUnmount=="function")try{ft.onCommitFiberUnmount(Ci,n)}catch{}switch(n.tag){case 5:xe||Ln(n,t);case 6:var r=ce,o=nt;ce=null,Et(e,t,n),ce=r,nt=o,ce!==null&&(nt?(e=ce,n=n.stateNode,e.nodeType===8?e.parentNode.removeChild(n):e.removeChild(n)):ce.removeChild(n.stateNode));break;case 18:ce!==null&&(nt?(e=ce,n=n.stateNode,e.nodeType===8?ol(e.parentNode,n):e.nodeType===1&&ol(e,n),$r(e)):ol(ce,n.stateNode));break;case 4:r=ce,o=nt,ce=n.stateNode.containerInfo,nt=!0,Et(e,t,n),ce=r,nt=o;break;case 0:case 11:case 14:case 15:if(!xe&&(r=n.updateQueue,r!==null&&(r=r.lastEffect,r!==null))){o=r=r.next;do{var i=o,a=i.destroy;i=i.tag,a!==void 0&&((i&2)!==0||(i&4)!==0)&&Zl(n,t,a),o=o.next}while(o!==r)}Et(e,t,n);break;case 1:if(!xe&&(Ln(n,t),r=n.stateNode,typeof r.componentWillUnmount=="function"))try{r.props=n.memoizedProps,r.state=n.memoizedState,r.componentWillUnmount()}catch(l){te(n,t,l)}Et(e,t,n);break;case 21:Et(e,t,n);break;case 22:n.mode&1?(xe=(r=xe)||n.memoizedState!==null,Et(e,t,n),xe=r):Et(e,t,n);break;default:Et(e,t,n)}}function Yc(e){var t=e.updateQueue;if(t!==null){e.updateQueue=null;var n=e.stateNode;n===null&&(n=e.stateNode=new nx),t.forEach(function(r){var o=fx.bind(null,e,r);n.has(r)||(n.add(r),r.then(o,o))})}}function et(e,t){var n=t.deletions;if(n!==null)for(var r=0;r<n.length;r++){var o=n[r];try{var i=e,a=t,l=a;e:for(;l!==null;){switch(l.tag){case 5:ce=l.stateNode,nt=!1;break e;case 3:ce=l.stateNode.containerInfo,nt=!0;break e;case 4:ce=l.stateNode.containerInfo,nt=!0;break e}l=l.return}if(ce===null)throw Error(y(160));Hf(i,a,o),ce=null,nt=!1;var s=o.alternate;s!==null&&(s.return=null),o.return=null}catch(d){te(o,t,d)}}if(t.subtreeFlags&12854)for(t=t.child;t!==null;)qf(t,e),t=t.sibling}function qf(e,t){var n=e.alternate,r=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(et(t,e),dt(e),r&4){try{Ir(3,e,e.return),Ti(3,e)}catch(v){te(e,e.return,v)}try{Ir(5,e,e.return)}catch(v){te(e,e.return,v)}}break;case 1:et(t,e),dt(e),r&512&&n!==null&&Ln(n,n.return);break;case 5:if(et(t,e),dt(e),r&512&&n!==null&&Ln(n,n.return),e.flags&32){var o=e.stateNode;try{Rr(o,"")}catch(v){te(e,e.return,v)}}if(r&4&&(o=e.stateNode,o!=null)){var i=e.memoizedProps,a=n!==null?n.memoizedProps:i,l=e.type,s=e.updateQueue;if(e.updateQueue=null,s!==null)try{l==="input"&&i.type==="radio"&&i.name!=null&&pp(o,i),Sl(l,a);var d=Sl(l,i);for(a=0;a<s.length;a+=2){var g=s[a],u=s[a+1];g==="style"?hp(o,u):g==="dangerouslySetInnerHTML"?mp(o,u):g==="children"?Rr(o,u):ss(o,g,u,d)}switch(l){case"input":zl(o,i);break;case"textarea":fp(o,i);break;case"select":var h=o._wrapperState.wasMultiple;o._wrapperState.wasMultiple=!!i.multiple;var x=i.value;x!=null?Rn(o,!!i.multiple,x,!1):h!==!!i.multiple&&(i.defaultValue!=null?Rn(o,!!i.multiple,i.defaultValue,!0):Rn(o,!!i.multiple,i.multiple?[]:"",!1))}o[Vr]=i}catch(v){te(e,e.return,v)}}break;case 6:if(et(t,e),dt(e),r&4){if(e.stateNode===null)throw Error(y(162));o=e.stateNode,i=e.memoizedProps;try{o.nodeValue=i}catch(v){te(e,e.return,v)}}break;case 3:if(et(t,e),dt(e),r&4&&n!==null&&n.memoizedState.isDehydrated)try{$r(t.containerInfo)}catch(v){te(e,e.return,v)}break;case 4:et(t,e),dt(e);break;case 13:et(t,e),dt(e),o=e.child,o.flags&8192&&(i=o.memoizedState!==null,o.stateNode.isHidden=i,!i||o.alternate!==null&&o.alternate.memoizedState!==null||($s=re())),r&4&&Yc(e);break;case 22:if(g=n!==null&&n.memoizedState!==null,e.mode&1?(xe=(d=xe)||g,et(t,e),xe=d):et(t,e),dt(e),r&8192){if(d=e.memoizedState!==null,(e.stateNode.isHidden=d)&&!g&&(e.mode&1)!==0)for(j=e,g=e.child;g!==null;){for(u=j=g;j!==null;){switch(h=j,x=h.child,h.tag){case 0:case 11:case 14:case 15:Ir(4,h,h.return);break;case 1:Ln(h,h.return);var b=h.stateNode;if(typeof b.componentWillUnmount=="function"){r=h,n=h.return;try{t=r,b.props=t.memoizedProps,b.state=t.memoizedState,b.componentWillUnmount()}catch(v){te(r,n,v)}}break;case 5:Ln(h,h.return);break;case 22:if(h.memoizedState!==null){Jc(u);continue}}x!==null?(x.return=h,j=x):Jc(u)}g=g.sibling}e:for(g=null,u=e;;){if(u.tag===5){if(g===null){g=u;try{o=u.stateNode,d?(i=o.style,typeof i.setProperty=="function"?i.setProperty("display","none","important"):i.display="none"):(l=u.stateNode,s=u.memoizedProps.style,a=s!=null&&s.hasOwnProperty("display")?s.display:null,l.style.display=gp("display",a))}catch(v){te(e,e.return,v)}}}else if(u.tag===6){if(g===null)try{u.stateNode.nodeValue=d?"":u.memoizedProps}catch(v){te(e,e.return,v)}}else if((u.tag!==22&&u.tag!==23||u.memoizedState===null||u===e)&&u.child!==null){u.child.return=u,u=u.child;continue}if(u===e)break e;for(;u.sibling===null;){if(u.return===null||u.return===e)break e;g===u&&(g=null),u=u.return}g===u&&(g=null),u.sibling.return=u.return,u=u.sibling}}break;case 19:et(t,e),dt(e),r&4&&Yc(e);break;case 21:break;default:et(t,e),dt(e)}}function dt(e){var t=e.flags;if(t&2){try{e:{for(var n=e.return;n!==null;){if(Af(n)){var r=n;break e}n=n.return}throw Error(y(160))}switch(r.tag){case 5:var o=r.stateNode;r.flags&32&&(Rr(o,""),r.flags&=-33);var i=Xc(e);ts(e,i,o);break;case 3:case 4:var a=r.stateNode.containerInfo,l=Xc(e);es(e,l,a);break;default:throw Error(y(161))}}catch(s){te(e,e.return,s)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function ox(e,t,n){j=e,Wf(e,t,n)}function Wf(e,t,n){for(var r=(e.mode&1)!==0;j!==null;){var o=j,i=o.child;if(o.tag===22&&r){var a=o.memoizedState!==null||qo;if(!a){var l=o.alternate,s=l!==null&&l.memoizedState!==null||xe;l=qo;var d=xe;if(qo=a,(xe=s)&&!d)for(j=o;j!==null;)a=j,s=a.child,a.tag===22&&a.memoizedState!==null?ep(o):s!==null?(s.return=a,j=s):ep(o);for(;i!==null;)j=i,Wf(i,t,n),i=i.sibling;j=o,qo=l,xe=d}Zc(e,t,n)}else(o.subtreeFlags&8772)!==0&&i!==null?(i.return=o,j=i):Zc(e,t,n)}}function Zc(e){for(;j!==null;){var t=j;if((t.flags&8772)!==0){var n=t.alternate;try{if((t.flags&8772)!==0)switch(t.tag){case 0:case 11:case 15:xe||Ti(5,t);break;case 1:var r=t.stateNode;if(t.flags&4&&!xe)if(n===null)r.componentDidMount();else{var o=t.elementType===t.type?n.memoizedProps:tt(t.type,n.memoizedProps);r.componentDidUpdate(o,n.memoizedState,r.__reactInternalSnapshotBeforeUpdate)}var i=t.updateQueue;i!==null&&Oc(t,i,r);break;case 3:var a=t.updateQueue;if(a!==null){if(n=null,t.child!==null)switch(t.child.tag){case 5:n=t.child.stateNode;break;case 1:n=t.child.stateNode}Oc(t,a,n)}break;case 5:var l=t.stateNode;if(n===null&&t.flags&4){n=l;var s=t.memoizedProps;switch(t.type){case"button":case"input":case"select":case"textarea":s.autoFocus&&n.focus();break;case"img":s.src&&(n.src=s.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(t.memoizedState===null){var d=t.alternate;if(d!==null){var g=d.memoizedState;if(g!==null){var u=g.dehydrated;u!==null&&$r(u)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(y(163))}xe||t.flags&512&&Jl(t)}catch(h){te(t,t.return,h)}}if(t===e){j=null;break}if(n=t.sibling,n!==null){n.return=t.return,j=n;break}j=t.return}}function Jc(e){for(;j!==null;){var t=j;if(t===e){j=null;break}var n=t.sibling;if(n!==null){n.return=t.return,j=n;break}j=t.return}}function ep(e){for(;j!==null;){var t=j;try{switch(t.tag){case 0:case 11:case 15:var n=t.return;try{Ti(4,t)}catch(s){te(t,n,s)}break;case 1:var r=t.stateNode;if(typeof r.componentDidMount=="function"){var o=t.return;try{r.componentDidMount()}catch(s){te(t,o,s)}}var i=t.return;try{Jl(t)}catch(s){te(t,i,s)}break;case 5:var a=t.return;try{Jl(t)}catch(s){te(t,a,s)}}}catch(s){te(t,t.return,s)}if(t===e){j=null;break}var l=t.sibling;if(l!==null){l.return=t.return,j=l;break}j=t.return}}var ix=Math.ceil,_i=Ct.ReactCurrentDispatcher,Bs=Ct.ReactCurrentOwner,Qe=Ct.ReactCurrentBatchConfig,L=0,de=null,oe=null,pe=0,Le=0,On=Vt(0),ae=0,Zr=null,pn=0,Li=0,Us=0,Tr=null,Ne=null,$s=0,Qn=1/0,xt=null,yi=!1,ns=null,Ut=null,Wo=!1,Tt=null,wi=0,Lr=0,rs=null,Jo=-1,ei=0;function we(){return(L&6)!==0?re():Jo!==-1?Jo:Jo=re()}function $t(e){return(e.mode&1)===0?1:(L&2)!==0&&pe!==0?pe&-pe:Ah.transition!==null?(ei===0&&(ei=Ep()),ei):(e=B,e!==0||(e=window.event,e=e===void 0?16:Lp(e.type)),e)}function it(e,t,n,r){if(50<Lr)throw Lr=0,rs=null,Error(y(185));Jr(e,n,r),((L&2)===0||e!==de)&&(e===de&&((L&2)===0&&(Li|=n),ae===4&&Mt(e,pe)),Pe(e,r),n===1&&L===0&&(t.mode&1)===0&&(Qn=re()+500,Pi&&Kt()))}function Pe(e,t){var n=e.callbackNode;qg(e,t);var r=ai(e,e===de?pe:0);if(r===0)n!==null&&sc(n),e.callbackNode=null,e.callbackPriority=0;else if(t=r&-r,e.callbackPriority!==t){if(n!=null&&sc(n),t===1)e.tag===0?$h(tp.bind(null,e)):ef(tp.bind(null,e)),Rh(function(){(L&6)===0&&Kt()}),n=null;else{switch(jp(r)){case 1:n=us;break;case 4:n=Cp;break;case 16:n=ii;break;case 536870912:n=Np;break;default:n=ii}n=Jf(n,Vf.bind(null,e))}e.callbackPriority=t,e.callbackNode=n}}function Vf(e,t){if(Jo=-1,ei=0,(L&6)!==0)throw Error(y(327));var n=e.callbackNode;if(An()&&e.callbackNode!==n)return null;var r=ai(e,e===de?pe:0);if(r===0)return null;if((r&30)!==0||(r&e.expiredLanes)!==0||t)t=ki(e,r);else{t=r;var o=L;L|=2;var i=Gf();(de!==e||pe!==t)&&(xt=null,Qn=re()+500,an(e,t));do try{sx();break}catch(l){Kf(e,l)}while(!0);Cs(),_i.current=i,L=o,oe!==null?t=0:(de=null,pe=0,t=ae)}if(t!==0){if(t===2&&(o=Dl(e),o!==0&&(r=o,t=os(e,o))),t===1)throw n=Zr,an(e,0),Mt(e,r),Pe(e,re()),n;if(t===6)Mt(e,r);else{if(o=e.current.alternate,(r&30)===0&&!ax(o)&&(t=ki(e,r),t===2&&(i=Dl(e),i!==0&&(r=i,t=os(e,i))),t===1))throw n=Zr,an(e,0),Mt(e,r),Pe(e,re()),n;switch(e.finishedWork=o,e.finishedLanes=r,t){case 0:case 1:throw Error(y(345));case 2:tn(e,Ne,xt);break;case 3:if(Mt(e,r),(r&130023424)===r&&(t=$s+500-re(),10<t)){if(ai(e,0)!==0)break;if(o=e.suspendedLanes,(o&r)!==r){we(),e.pingedLanes|=e.suspendedLanes&o;break}e.timeoutHandle=Fl(tn.bind(null,e,Ne,xt),t);break}tn(e,Ne,xt);break;case 4:if(Mt(e,r),(r&4194240)===r)break;for(t=e.eventTimes,o=-1;0<r;){var a=31-ot(r);i=1<<a,a=t[a],a>o&&(o=a),r&=~i}if(r=o,r=re()-r,r=(120>r?120:480>r?480:1080>r?1080:1920>r?1920:3e3>r?3e3:4320>r?4320:1960*ix(r/1960))-r,10<r){e.timeoutHandle=Fl(tn.bind(null,e,Ne,xt),r);break}tn(e,Ne,xt);break;case 5:tn(e,Ne,xt);break;default:throw Error(y(329))}}}return Pe(e,re()),e.callbackNode===n?Vf.bind(null,e):null}function os(e,t){var n=Tr;return e.current.memoizedState.isDehydrated&&(an(e,t).flags|=256),e=ki(e,t),e!==2&&(t=Ne,Ne=n,t!==null&&is(t)),e}function is(e){Ne===null?Ne=e:Ne.push.apply(Ne,e)}function ax(e){for(var t=e;;){if(t.flags&16384){var n=t.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var r=0;r<n.length;r++){var o=n[r],i=o.getSnapshot;o=o.value;try{if(!at(i(),o))return!1}catch{return!1}}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function Mt(e,t){for(t&=~Us,t&=~Li,e.suspendedLanes|=t,e.pingedLanes&=~t,e=e.expirationTimes;0<t;){var n=31-ot(t),r=1<<n;e[n]=-1,t&=~r}}function tp(e){if((L&6)!==0)throw Error(y(327));An();var t=ai(e,0);if((t&1)===0)return Pe(e,re()),null;var n=ki(e,t);if(e.tag!==0&&n===2){var r=Dl(e);r!==0&&(t=r,n=os(e,r))}if(n===1)throw n=Zr,an(e,0),Mt(e,t),Pe(e,re()),n;if(n===6)throw Error(y(345));return e.finishedWork=e.current.alternate,e.finishedLanes=t,tn(e,Ne,xt),Pe(e,re()),null}function As(e,t){var n=L;L|=1;try{return e(t)}finally{L=n,L===0&&(Qn=re()+500,Pi&&Kt())}}function fn(e){Tt!==null&&Tt.tag===0&&(L&6)===0&&An();var t=L;L|=1;var n=Qe.transition,r=B;try{if(Qe.transition=null,B=1,e)return e()}finally{B=r,Qe.transition=n,L=t,(L&6)===0&&Kt()}}function Hs(){Le=On.current,V(On)}function an(e,t){e.finishedWork=null,e.finishedLanes=0;var n=e.timeoutHandle;if(n!==-1&&(e.timeoutHandle=-1,Oh(n)),oe!==null)for(n=oe.return;n!==null;){var r=n;switch(ws(r),r.tag){case 1:r=r.type.childContextTypes,r!=null&&pi();break;case 3:Kn(),V(je),V(be),Ms();break;case 5:Ps(r);break;case 4:Kn();break;case 13:V(Y);break;case 19:V(Y);break;case 10:Ns(r.type._context);break;case 22:case 23:Hs()}n=n.return}if(de=e,oe=e=At(e.current,null),pe=Le=t,ae=0,Zr=null,Us=Li=pn=0,Ne=Tr=null,rn!==null){for(t=0;t<rn.length;t++)if(n=rn[t],r=n.interleaved,r!==null){n.interleaved=null;var o=r.next,i=n.pending;if(i!==null){var a=i.next;i.next=o,r.next=a}n.pending=r}rn=null}return e}function Kf(e,t){do{var n=oe;try{if(Cs(),Xo.current=zi,vi){for(var r=Z.memoizedState;r!==null;){var o=r.queue;o!==null&&(o.pending=null),r=r.next}vi=!1}if(cn=0,se=ie=Z=null,Mr=!1,Qr=0,Bs.current=null,n===null||n.return===null){ae=1,Zr=t,oe=null;break}e:{var i=e,a=n.return,l=n,s=t;if(t=pe,l.flags|=32768,s!==null&&typeof s=="object"&&typeof s.then=="function"){var d=s,g=l,u=g.tag;if((g.mode&1)===0&&(u===0||u===11||u===15)){var h=g.alternate;h?(g.updateQueue=h.updateQueue,g.memoizedState=h.memoizedState,g.lanes=h.lanes):(g.updateQueue=null,g.memoizedState=null)}var x=Ac(a);if(x!==null){x.flags&=-257,Hc(x,a,l,i,t),x.mode&1&&$c(i,d,t),t=x,s=d;var b=t.updateQueue;if(b===null){var v=new Set;v.add(s),t.updateQueue=v}else b.add(s);break e}else{if((t&1)===0){$c(i,d,t),qs();break e}s=Error(y(426))}}else if(G&&l.mode&1){var C=Ac(a);if(C!==null){(C.flags&65536)===0&&(C.flags|=256),Hc(C,a,l,i,t),ks(Gn(s,l));break e}}i=s=Gn(s,l),ae!==4&&(ae=2),Tr===null?Tr=[i]:Tr.push(i),i=a;do{switch(i.tag){case 3:i.flags|=65536,t&=-t,i.lanes|=t;var f=Df(i,s,t);Lc(i,f);break e;case 1:l=s;var p=i.type,c=i.stateNode;if((i.flags&128)===0&&(typeof p.getDerivedStateFromError=="function"||c!==null&&typeof c.componentDidCatch=="function"&&(Ut===null||!Ut.has(c)))){i.flags|=65536,t&=-t,i.lanes|=t;var m=Pf(i,l,t);Lc(i,m);break e}}i=i.return}while(i!==null)}Xf(n)}catch(z){t=z,oe===n&&n!==null&&(oe=n=n.return);continue}break}while(!0)}function Gf(){var e=_i.current;return _i.current=zi,e===null?zi:e}function qs(){(ae===0||ae===3||ae===2)&&(ae=4),de===null||(pn&268435455)===0&&(Li&268435455)===0||Mt(de,pe)}function ki(e,t){var n=L;L|=2;var r=Gf();(de!==e||pe!==t)&&(xt=null,an(e,t));do try{lx();break}catch(o){Kf(e,o)}while(!0);if(Cs(),L=n,_i.current=r,oe!==null)throw Error(y(261));return de=null,pe=0,ae}function lx(){for(;oe!==null;)Qf(oe)}function sx(){for(;oe!==null&&!Lg();)Qf(oe)}function Qf(e){var t=Zf(e.alternate,e,Le);e.memoizedProps=e.pendingProps,t===null?Xf(e):oe=t,Bs.current=null}function Xf(e){var t=e;do{var n=t.alternate;if(e=t.return,(t.flags&32768)===0){if(n=ex(n,t,Le),n!==null){oe=n;return}}else{if(n=tx(n,t),n!==null){n.flags&=32767,oe=n;return}if(e!==null)e.flags|=32768,e.subtreeFlags=0,e.deletions=null;else{ae=6,oe=null;return}}if(t=t.sibling,t!==null){oe=t;return}oe=t=e}while(t!==null);ae===0&&(ae=5)}function tn(e,t,n){var r=B,o=Qe.transition;try{Qe.transition=null,B=1,dx(e,t,n,r)}finally{Qe.transition=o,B=r}return null}function dx(e,t,n,r){do An();while(Tt!==null);if((L&6)!==0)throw Error(y(327));n=e.finishedWork;var o=e.finishedLanes;if(n===null)return null;if(e.finishedWork=null,e.finishedLanes=0,n===e.current)throw Error(y(177));e.callbackNode=null,e.callbackPriority=0;var i=n.lanes|n.childLanes;if(Wg(e,i),e===de&&(oe=de=null,pe=0),(n.subtreeFlags&2064)===0&&(n.flags&2064)===0||Wo||(Wo=!0,Jf(ii,function(){return An(),null})),i=(n.flags&15990)!==0,(n.subtreeFlags&15990)!==0||i){i=Qe.transition,Qe.transition=null;var a=B;B=1;var l=L;L|=4,Bs.current=null,rx(e,n),qf(n,e),Ph(Ol),li=!!Ll,Ol=Ll=null,e.current=n,ox(n,e,o),Og(),L=l,B=a,Qe.transition=i}else e.current=n;if(Wo&&(Wo=!1,Tt=e,wi=o),i=e.pendingLanes,i===0&&(Ut=null),Bg(n.stateNode,r),Pe(e,re()),t!==null)for(r=e.onRecoverableError,n=0;n<t.length;n++)o=t[n],r(o.value,{componentStack:o.stack,digest:o.digest});if(yi)throw yi=!1,e=ns,ns=null,e;return(wi&1)!==0&&e.tag!==0&&An(),i=e.pendingLanes,(i&1)!==0?e===rs?Lr++:(Lr=0,rs=e):Lr=0,Kt(),null}function An(){if(Tt!==null){var e=jp(wi),t=Qe.transition,n=B;try{if(Qe.transition=null,B=16>e?16:e,Tt===null)var r=!1;else{if(e=Tt,Tt=null,wi=0,(L&6)!==0)throw Error(y(331));var o=L;for(L|=4,j=e.current;j!==null;){var i=j,a=i.child;if((j.flags&16)!==0){var l=i.deletions;if(l!==null){for(var s=0;s<l.length;s++){var d=l[s];for(j=d;j!==null;){var g=j;switch(g.tag){case 0:case 11:case 15:Ir(8,g,i)}var u=g.child;if(u!==null)u.return=g,j=u;else for(;j!==null;){g=j;var h=g.sibling,x=g.return;if($f(g),g===d){j=null;break}if(h!==null){h.return=x,j=h;break}j=x}}}var b=i.alternate;if(b!==null){var v=b.child;if(v!==null){b.child=null;do{var C=v.sibling;v.sibling=null,v=C}while(v!==null)}}j=i}}if((i.subtreeFlags&2064)!==0&&a!==null)a.return=i,j=a;else e:for(;j!==null;){if(i=j,(i.flags&2048)!==0)switch(i.tag){case 0:case 11:case 15:Ir(9,i,i.return)}var f=i.sibling;if(f!==null){f.return=i.return,j=f;break e}j=i.return}}var p=e.current;for(j=p;j!==null;){a=j;var c=a.child;if((a.subtreeFlags&2064)!==0&&c!==null)c.return=a,j=c;else e:for(a=p;j!==null;){if(l=j,(l.flags&2048)!==0)try{switch(l.tag){case 0:case 11:case 15:Ti(9,l)}}catch(z){te(l,l.return,z)}if(l===a){j=null;break e}var m=l.sibling;if(m!==null){m.return=l.return,j=m;break e}j=l.return}}if(L=o,Kt(),ft&&typeof ft.onPostCommitFiberRoot=="function")try{ft.onPostCommitFiberRoot(Ci,e)}catch{}r=!0}return r}finally{B=n,Qe.transition=t}}return!1}function np(e,t,n){t=Gn(n,t),t=Df(e,t,1),e=Bt(e,t,1),t=we(),e!==null&&(Jr(e,1,t),Pe(e,t))}function te(e,t,n){if(e.tag===3)np(e,e,n);else for(;t!==null;){if(t.tag===3){np(t,e,n);break}else if(t.tag===1){var r=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof r.componentDidCatch=="function"&&(Ut===null||!Ut.has(r))){e=Gn(n,e),e=Pf(t,e,1),t=Bt(t,e,1),e=we(),t!==null&&(Jr(t,1,e),Pe(t,e));break}}t=t.return}}function cx(e,t,n){var r=e.pingCache;r!==null&&r.delete(t),t=we(),e.pingedLanes|=e.suspendedLanes&n,de===e&&(pe&n)===n&&(ae===4||ae===3&&(pe&130023424)===pe&&500>re()-$s?an(e,0):Us|=n),Pe(e,t)}function Yf(e,t){t===0&&((e.mode&1)===0?t=1:(t=Po,Po<<=1,(Po&130023424)===0&&(Po=4194304)));var n=we();e=kt(e,t),e!==null&&(Jr(e,t,n),Pe(e,n))}function px(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),Yf(e,n)}function fx(e,t){var n=0;switch(e.tag){case 13:var r=e.stateNode,o=e.memoizedState;o!==null&&(n=o.retryLane);break;case 19:r=e.stateNode;break;default:throw Error(y(314))}r!==null&&r.delete(t),Yf(e,n)}var Zf;Zf=function(e,t,n){if(e!==null)if(e.memoizedProps!==t.pendingProps||je.current)Ee=!0;else{if((e.lanes&n)===0&&(t.flags&128)===0)return Ee=!1,Jh(e,t,n);Ee=(e.flags&131072)!==0}else Ee=!1,G&&(t.flags&1048576)!==0&&tf(t,mi,t.index);switch(t.lanes=0,t.tag){case 2:var r=t.type;Zo(e,t),e=t.pendingProps;var o=qn(t,be.current);$n(t,n),o=Ts(null,t,r,e,o,n);var i=Ls();return t.flags|=1,typeof o=="object"&&o!==null&&typeof o.render=="function"&&o.$$typeof===void 0?(t.tag=1,t.memoizedState=null,t.updateQueue=null,De(r)?(i=!0,fi(t)):i=!1,t.memoizedState=o.state!==null&&o.state!==void 0?o.state:null,js(t),o.updater=Ii,t.stateNode=o,o._reactInternals=t,Wl(t,r,e,n),t=Gl(null,t,r,!0,i,n)):(t.tag=0,G&&i&&ys(t),ye(null,t,o,n),t=t.child),t;case 16:r=t.elementType;e:{switch(Zo(e,t),e=t.pendingProps,o=r._init,r=o(r._payload),t.type=r,o=t.tag=mx(r),e=tt(r,e),o){case 0:t=Kl(null,t,r,e,n);break e;case 1:t=Vc(null,t,r,e,n);break e;case 11:t=qc(null,t,r,e,n);break e;case 14:t=Wc(null,t,r,tt(r.type,e),n);break e}throw Error(y(306,r,""))}return t;case 0:return r=t.type,o=t.pendingProps,o=t.elementType===r?o:tt(r,o),Kl(e,t,r,o,n);case 1:return r=t.type,o=t.pendingProps,o=t.elementType===r?o:tt(r,o),Vc(e,t,r,o,n);case 3:e:{if(Lf(t),e===null)throw Error(y(387));r=t.pendingProps,i=t.memoizedState,o=i.element,sf(e,t),xi(t,r,null,n);var a=t.memoizedState;if(r=a.element,i.isDehydrated)if(i={element:r,isDehydrated:!1,cache:a.cache,pendingSuspenseBoundaries:a.pendingSuspenseBoundaries,transitions:a.transitions},t.updateQueue.baseState=i,t.memoizedState=i,t.flags&256){o=Gn(Error(y(423)),t),t=Kc(e,t,r,n,o);break e}else if(r!==o){o=Gn(Error(y(424)),t),t=Kc(e,t,r,n,o);break e}else for(Oe=Ft(t.stateNode.containerInfo.firstChild),Re=t,G=!0,rt=null,n=af(t,null,r,n),t.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(Wn(),r===o){t=St(e,t,n);break e}ye(e,t,r,n)}t=t.child}return t;case 5:return df(t),e===null&&Al(t),r=t.type,o=t.pendingProps,i=e!==null?e.memoizedProps:null,a=o.children,Rl(r,o)?a=null:i!==null&&Rl(r,i)&&(t.flags|=32),Tf(e,t),ye(e,t,a,n),t.child;case 6:return e===null&&Al(t),null;case 13:return Of(e,t,n);case 4:return Ds(t,t.stateNode.containerInfo),r=t.pendingProps,e===null?t.child=Vn(t,null,r,n):ye(e,t,r,n),t.child;case 11:return r=t.type,o=t.pendingProps,o=t.elementType===r?o:tt(r,o),qc(e,t,r,o,n);case 7:return ye(e,t,t.pendingProps,n),t.child;case 8:return ye(e,t,t.pendingProps.children,n),t.child;case 12:return ye(e,t,t.pendingProps.children,n),t.child;case 10:e:{if(r=t.type._context,o=t.pendingProps,i=t.memoizedProps,a=o.value,q(gi,r._currentValue),r._currentValue=a,i!==null)if(at(i.value,a)){if(i.children===o.children&&!je.current){t=St(e,t,n);break e}}else for(i=t.child,i!==null&&(i.return=t);i!==null;){var l=i.dependencies;if(l!==null){a=i.child;for(var s=l.firstContext;s!==null;){if(s.context===r){if(i.tag===1){s=_t(-1,n&-n),s.tag=2;var d=i.updateQueue;if(d!==null){d=d.shared;var g=d.pending;g===null?s.next=s:(s.next=g.next,g.next=s),d.pending=s}}i.lanes|=n,s=i.alternate,s!==null&&(s.lanes|=n),Hl(i.return,n,t),l.lanes|=n;break}s=s.next}}else if(i.tag===10)a=i.type===t.type?null:i.child;else if(i.tag===18){if(a=i.return,a===null)throw Error(y(341));a.lanes|=n,l=a.alternate,l!==null&&(l.lanes|=n),Hl(a,n,t),a=i.sibling}else a=i.child;if(a!==null)a.return=i;else for(a=i;a!==null;){if(a===t){a=null;break}if(i=a.sibling,i!==null){i.return=a.return,a=i;break}a=a.return}i=a}ye(e,t,o.children,n),t=t.child}return t;case 9:return o=t.type,r=t.pendingProps.children,$n(t,n),o=Xe(o),r=r(o),t.flags|=1,ye(e,t,r,n),t.child;case 14:return r=t.type,o=tt(r,t.pendingProps),o=tt(r.type,o),Wc(e,t,r,o,n);case 15:return Mf(e,t,t.type,t.pendingProps,n);case 17:return r=t.type,o=t.pendingProps,o=t.elementType===r?o:tt(r,o),Zo(e,t),t.tag=1,De(r)?(e=!0,fi(t)):e=!1,$n(t,n),jf(t,r,o),Wl(t,r,o,n),Gl(null,t,r,!0,e,n);case 19:return Rf(e,t,n);case 22:return If(e,t,n)}throw Error(y(156,t.tag))};function Jf(e,t){return Sp(e,t)}function ux(e,t,n,r){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Ge(e,t,n,r){return new ux(e,t,n,r)}function Ws(e){return e=e.prototype,!(!e||!e.isReactComponent)}function mx(e){if(typeof e=="function")return Ws(e)?1:0;if(e!=null){if(e=e.$$typeof,e===cs)return 11;if(e===ps)return 14}return 2}function At(e,t){var n=e.alternate;return n===null?(n=Ge(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&14680064,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n}function ti(e,t,n,r,o,i){var a=2;if(r=e,typeof e=="function")Ws(e)&&(a=1);else if(typeof e=="string")a=5;else e:switch(e){case Cn:return ln(n.children,o,i,t);case ds:a=8,o|=8;break;case gl:return e=Ge(12,n,t,o|2),e.elementType=gl,e.lanes=i,e;case hl:return e=Ge(13,n,t,o),e.elementType=hl,e.lanes=i,e;case xl:return e=Ge(19,n,t,o),e.elementType=xl,e.lanes=i,e;case sp:return Oi(n,o,i,t);default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case ap:a=10;break e;case lp:a=9;break e;case cs:a=11;break e;case ps:a=14;break e;case jt:a=16,r=null;break e}throw Error(y(130,e==null?e:typeof e,""))}return t=Ge(a,n,t,o),t.elementType=e,t.type=r,t.lanes=i,t}function ln(e,t,n,r){return e=Ge(7,e,r,t),e.lanes=n,e}function Oi(e,t,n,r){return e=Ge(22,e,r,t),e.elementType=sp,e.lanes=n,e.stateNode={isHidden:!1},e}function fl(e,t,n){return e=Ge(6,e,null,t),e.lanes=n,e}function ul(e,t,n){return t=Ge(4,e.children!==null?e.children:[],e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}function gx(e,t,n,r,o){this.tag=t,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=Xa(0),this.expirationTimes=Xa(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Xa(0),this.identifierPrefix=r,this.onRecoverableError=o,this.mutableSourceEagerHydrationData=null}function Vs(e,t,n,r,o,i,a,l,s){return e=new gx(e,t,n,l,s),t===1?(t=1,i===!0&&(t|=8)):t=0,i=Ge(3,null,null,t),e.current=i,i.stateNode=e,i.memoizedState={element:r,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},js(i),e}function hx(e,t,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:Sn,key:r==null?null:""+r,children:e,containerInfo:t,implementation:n}}function eu(e){if(!e)return qt;e=e._reactInternals;e:{if(mn(e)!==e||e.tag!==1)throw Error(y(170));var t=e;do{switch(t.tag){case 3:t=t.stateNode.context;break e;case 1:if(De(t.type)){t=t.stateNode.__reactInternalMemoizedMergedChildContext;break e}}t=t.return}while(t!==null);throw Error(y(171))}if(e.tag===1){var n=e.type;if(De(n))return Jp(e,n,t)}return t}function tu(e,t,n,r,o,i,a,l,s){return e=Vs(n,r,!0,e,o,i,a,l,s),e.context=eu(null),n=e.current,r=we(),o=$t(n),i=_t(r,o),i.callback=t!=null?t:null,Bt(n,i,o),e.current.lanes=o,Jr(e,o,r),Pe(e,r),e}function Ri(e,t,n,r){var o=t.current,i=we(),a=$t(o);return n=eu(n),t.context===null?t.context=n:t.pendingContext=n,t=_t(i,a),t.payload={element:e},r=r===void 0?null:r,r!==null&&(t.callback=r),e=Bt(o,t,a),e!==null&&(it(e,o,a,i),Qo(e,o,a)),a}function Si(e){if(e=e.current,!e.child)return null;switch(e.child.tag){case 5:return e.child.stateNode;default:return e.child.stateNode}}function rp(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function Ks(e,t){rp(e,t),(e=e.alternate)&&rp(e,t)}function xx(){return null}var nu=typeof reportError=="function"?reportError:function(e){console.error(e)};function Gs(e){this._internalRoot=e}Fi.prototype.render=Gs.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(y(409));Ri(e,t,null,null)};Fi.prototype.unmount=Gs.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;fn(function(){Ri(null,e,null,null)}),t[wt]=null}};function Fi(e){this._internalRoot=e}Fi.prototype.unstable_scheduleHydration=function(e){if(e){var t=Mp();e={blockedOn:null,target:e,priority:t};for(var n=0;n<Pt.length&&t!==0&&t<Pt[n].priority;n++);Pt.splice(n,0,e),n===0&&Tp(e)}};function Qs(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function Bi(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==" react-mount-point-unstable "))}function op(){}function bx(e,t,n,r,o){if(o){if(typeof r=="function"){var i=r;r=function(){var d=Si(a);i.call(d)}}var a=tu(t,r,e,0,null,!1,!1,"",op);return e._reactRootContainer=a,e[wt]=a.current,qr(e.nodeType===8?e.parentNode:e),fn(),a}for(;o=e.lastChild;)e.removeChild(o);if(typeof r=="function"){var l=r;r=function(){var d=Si(s);l.call(d)}}var s=Vs(e,0,!1,null,null,!1,!1,"",op);return e._reactRootContainer=s,e[wt]=s.current,qr(e.nodeType===8?e.parentNode:e),fn(function(){Ri(t,s,n,r)}),s}function Ui(e,t,n,r,o){var i=n._reactRootContainer;if(i){var a=i;if(typeof o=="function"){var l=o;o=function(){var s=Si(a);l.call(s)}}Ri(t,a,e,o)}else a=bx(n,t,e,o,r);return Si(a)}Dp=function(e){switch(e.tag){case 3:var t=e.stateNode;if(t.current.memoizedState.isDehydrated){var n=Sr(t.pendingLanes);n!==0&&(ms(t,n|1),Pe(t,re()),(L&6)===0&&(Qn=re()+500,Kt()))}break;case 13:fn(function(){var r=kt(e,1);if(r!==null){var o=we();it(r,e,1,o)}}),Ks(e,1)}};gs=function(e){if(e.tag===13){var t=kt(e,134217728);if(t!==null){var n=we();it(t,e,134217728,n)}Ks(e,134217728)}};Pp=function(e){if(e.tag===13){var t=$t(e),n=kt(e,t);if(n!==null){var r=we();it(n,e,t,r)}Ks(e,t)}};Mp=function(){return B};Ip=function(e,t){var n=B;try{return B=e,t()}finally{B=n}};Nl=function(e,t,n){switch(t){case"input":if(zl(e,n),t=n.name,n.type==="radio"&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+t)+'][type="radio"]'),t=0;t<n.length;t++){var r=n[t];if(r!==e&&r.form===e.form){var o=Di(r);if(!o)throw Error(y(90));cp(r),zl(r,o)}}}break;case"textarea":fp(e,n);break;case"select":t=n.value,t!=null&&Rn(e,!!n.multiple,t,!1)}};vp=As;zp=fn;var vx={usingClientEntryPoint:!1,Events:[to,Dn,Di,xp,bp,As]},_r={findFiberByHostInstance:nn,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},zx={bundleType:_r.bundleType,version:_r.version,rendererPackageName:_r.rendererPackageName,rendererConfig:_r.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:Ct.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return e=wp(e),e===null?null:e.stateNode},findFiberByHostInstance:_r.findFiberByHostInstance||xx,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__!="undefined"&&(yr=__REACT_DEVTOOLS_GLOBAL_HOOK__,!yr.isDisabled&&yr.supportsFiber))try{Ci=yr.inject(zx),ft=yr}catch{}var yr;Ue.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=vx;Ue.createPortal=function(e,t){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!Qs(t))throw Error(y(200));return hx(e,t,null,n)};Ue.createRoot=function(e,t){if(!Qs(e))throw Error(y(299));var n=!1,r="",o=nu;return t!=null&&(t.unstable_strictMode===!0&&(n=!0),t.identifierPrefix!==void 0&&(r=t.identifierPrefix),t.onRecoverableError!==void 0&&(o=t.onRecoverableError)),t=Vs(e,1,!1,null,null,n,!1,r,o),e[wt]=t.current,qr(e.nodeType===8?e.parentNode:e),new Gs(t)};Ue.findDOMNode=function(e){if(e==null)return null;if(e.nodeType===1)return e;var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(y(188)):(e=Object.keys(e).join(","),Error(y(268,e)));return e=wp(t),e=e===null?null:e.stateNode,e};Ue.flushSync=function(e){return fn(e)};Ue.hydrate=function(e,t,n){if(!Bi(t))throw Error(y(200));return Ui(null,e,t,!0,n)};Ue.hydrateRoot=function(e,t,n){if(!Qs(e))throw Error(y(405));var r=n!=null&&n.hydratedSources||null,o=!1,i="",a=nu;if(n!=null&&(n.unstable_strictMode===!0&&(o=!0),n.identifierPrefix!==void 0&&(i=n.identifierPrefix),n.onRecoverableError!==void 0&&(a=n.onRecoverableError)),t=tu(t,null,e,1,n!=null?n:null,o,!1,i,a),e[wt]=t.current,qr(e),r)for(e=0;e<r.length;e++)n=r[e],o=n._getVersion,o=o(n._source),t.mutableSourceEagerHydrationData==null?t.mutableSourceEagerHydrationData=[n,o]:t.mutableSourceEagerHydrationData.push(n,o);return new Fi(t)};Ue.render=function(e,t,n){if(!Bi(t))throw Error(y(200));return Ui(null,e,t,!1,n)};Ue.unmountComponentAtNode=function(e){if(!Bi(e))throw Error(y(40));return e._reactRootContainer?(fn(function(){Ui(null,null,e,!1,function(){e._reactRootContainer=null,e[wt]=null})}),!0):!1};Ue.unstable_batchedUpdates=As;Ue.unstable_renderSubtreeIntoContainer=function(e,t,n,r){if(!Bi(n))throw Error(y(200));if(e==null||e._reactInternals===void 0)throw Error(y(38));return Ui(e,t,n,!1,r)};Ue.version="18.3.1-next-f1338f8080-20240426"});var au=P((Hv,iu)=>{"use strict";function ou(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__=="undefined"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(ou)}catch(e){console.error(e)}}ou(),iu.exports=ru()});var su=P(Xs=>{"use strict";var lu=au();Xs.createRoot=lu.createRoot,Xs.hydrateRoot=lu.hydrateRoot;var qv});var cu=P($i=>{"use strict";var _x=O(),yx=Symbol.for("react.element"),wx=Symbol.for("react.fragment"),kx=Object.prototype.hasOwnProperty,Sx=_x.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,Cx={key:!0,ref:!0,__self:!0,__source:!0};function du(e,t,n){var r,o={},i=null,a=null;n!==void 0&&(i=""+n),t.key!==void 0&&(i=""+t.key),t.ref!==void 0&&(a=t.ref);for(r in t)kx.call(t,r)&&!Cx.hasOwnProperty(r)&&(o[r]=t[r]);if(e&&e.defaultProps)for(r in t=e.defaultProps,t)o[r]===void 0&&(o[r]=t[r]);return{$$typeof:yx,type:e,key:i,ref:a,props:o,_owner:Sx.current}}$i.Fragment=wx;$i.jsx=du;$i.jsxs=du});var R=P((Kv,pu)=>{"use strict";pu.exports=cu()});var Hi=P(Ai=>{"use strict";Object.defineProperty(Ai,"__esModule",{value:!0});Ai.ButtonType=void 0;Ai.ButtonType={Secondary:"secondary",Primary:"primary",Destructive:"destructive",Tertiary:"tertiary",TertiaryBlack:"tertiary-black",TertiaryDestructive:"tertiary-destructive",Light:"light"}});var Me=P(qi=>{"use strict";Object.defineProperty(qi,"__esModule",{value:!0});qi.classNames=void 0;var Nx=e=>e.map(t=>t.trim()).filter(t=>!!t).join(" ");qi.classNames=Nx});var Ys=P(Wi=>{"use strict";Object.defineProperty(Wi,"__esModule",{value:!0});Wi.DeviceType=void 0;var fu;(function(e){e.Desktop="desktop",e.Mobile="mobile"})(fu||(Wi.DeviceType=fu={}))});var uu=P(Vi=>{"use strict";Object.defineProperty(Vi,"__esModule",{value:!0});Vi.isDomEnv=void 0;var Ex=()=>typeof window!="undefined"&&typeof window.document!="undefined"&&typeof window.document.createElement!="undefined";Vi.isDomEnv=Ex});var gu=P(Ki=>{"use strict";Object.defineProperty(Ki,"__esModule",{value:!0});Ki.useIsomorphicLayoutEffect=void 0;var mu=O(),jx=uu();Ki.useIsomorphicLayoutEffect=(0,jx.isDomEnv)()?mu.useLayoutEffect:mu.useEffect});var hu=P(Gi=>{"use strict";Object.defineProperty(Gi,"__esModule",{value:!0});Gi.ensureGlobalThis=void 0;(function(){typeof globalThis!="object"&&(Object.defineProperty(Object.prototype,"__temp__",{get:function(){return this},configurable:!0}),__temp__.globalThis=__temp__,delete Object.prototype.__temp__)})();var Dx=()=>globalThis;Gi.ensureGlobalThis=Dx});var ro=P(Qi=>{"use strict";Object.defineProperty(Qi,"__esModule",{value:!0});Qi.zen=void 0;hu();Qi.zen=globalThis});var xu=P(Yi=>{"use strict";Object.defineProperty(Yi,"__esModule",{value:!0});Yi.useResize=void 0;var Px=O(),Xi=ro(),Mx=(e,t)=>{(0,Px.useEffect)(()=>{var n;if(t)return(n=Xi.zen.addEventListener)===null||n===void 0||n.call(Xi.zen,"resize",e),()=>{var r;(r=Xi.zen.removeEventListener)===null||r===void 0||r.call(Xi.zen,"resize",e)}},[e,t])};Yi.useResize=Mx});var bu=P(Zi=>{"use strict";Object.defineProperty(Zi,"__esModule",{value:!0});Zi.topWindowContext=void 0;var Ix=O();Zi.topWindowContext=(0,Ix.createContext)({topWindow:void 0})});var Zs=P(oo=>{"use strict";Object.defineProperty(oo,"__esModule",{value:!0});oo.getParentWindow=void 0;var Tx=e=>{if(e.parent){if(e.parent===e)return e;try{if(e.parent.innerWidth)return(0,oo.getParentWindow)(e.parent)}catch{}return e}return e};oo.getParentWindow=Tx});var ed=P($e=>{"use strict";Object.defineProperty($e,"__esModule",{value:!0});$e.useIsSSRProviderMounted=$e.useSSRContext=$e.SSRProvider=$e.SSRContext=void 0;var Lx=R(),Js=O();$e.SSRContext=(0,Js.createContext)(null);var Ox=({deviceType:e,isClientReady:t=!1,children:n})=>(0,Lx.jsx)($e.SSRContext.Provider,{value:{isClientReady:t,deviceType:e},children:n});$e.SSRProvider=Ox;var Rx=()=>(0,Js.useContext)($e.SSRContext);$e.useSSRContext=Rx;var Fx=()=>(0,Js.useContext)($e.SSRContext)!==null;$e.useIsSSRProviderMounted=Fx});var zu=P(Gt=>{"use strict";Object.defineProperty(Gt,"__esModule",{value:!0});Gt.useDeviceType=Gt.getDeviceType=void 0;var Ji=O(),Bx=gu(),Ux=xu(),vu=Ys(),$x=bu(),Ax=Zs(),Hx=ro(),qx=ed(),Wx=640,Vx=e=>e>Wx?vu.DeviceType.Desktop:vu.DeviceType.Mobile;Gt.getDeviceType=Vx;var Kx=e=>{let t=(0,Ji.useContext)(qx.SSRContext),n=t==null?void 0:t.deviceType,{topWindow:r}=(0,Ji.useContext)($x.topWindowContext),o=(0,Ji.useMemo)(()=>r||(0,Ax.getParentWindow)(Hx.zen),[r]),[i,a]=(0,Ji.useState)(n!=null?n:(0,Gt.getDeviceType)(o.innerWidth));(0,Ux.useResize)(()=>{a((0,Gt.getDeviceType)(o.innerWidth))},!0),(0,Bx.useIsomorphicLayoutEffect)(()=>{e(i)},[i,e])};Gt.useDeviceType=Kx});var io=P(gn=>{"use strict";Object.defineProperty(gn,"__esModule",{value:!0});gn.useMobile=gn.initialValue=void 0;var td=O(),Gx=Ys(),_u=zu(),Qx=Zs(),Xx=ed(),Yx=ro(),Zx=(0,Qx.getParentWindow)(Yx.zen);gn.initialValue=(0,_u.getDeviceType)(Zx.innerWidth);var Jx=()=>{var e;let t=(0,td.useContext)(Xx.SSRContext),[n,r]=(0,td.useState)((e=t==null?void 0:t.deviceType)!==null&&e!==void 0?e:gn.initialValue);return(0,_u.useDeviceType)(r),(0,td.useMemo)(()=>n===Gx.DeviceType.Mobile,[n])};gn.useMobile=Jx});var yu=P(Zn=>{"use strict";Object.defineProperty(Zn,"__esModule",{value:!0});Zn.themeContext=Zn.Theme=void 0;var eb=O(),nd;(function(e){e[e.Default=0]="Default",e[e.Drive=1]="Drive"})(nd||(Zn.Theme=nd={}));Zn.themeContext=(0,eb.createContext)({theme:nd.Default,dark:!1})});var rd=P(ea=>{"use strict";Object.defineProperty(ea,"__esModule",{value:!0});ea.useDrive=void 0;var wu=O(),ku=yu(),tb=()=>{let{theme:e}=(0,wu.useContext)(ku.themeContext);return(0,wu.useMemo)(()=>e===ku.Theme.Drive,[e])};ea.useDrive=tb});var Jn=P(ta=>{"use strict";Object.defineProperty(ta,"__esModule",{value:!0});ta.useDriveClassName=void 0;var nb=io(),rb=rd(),ob=e=>{let t=(0,rb.useDrive)(),n=(0,nb.useMobile)();if(t)return n?`${e}--drive`:`${e}--drive-tablet`};ta.useDriveClassName=ob});var Su=P(er=>{"use strict";var ib=er&&er.__rest||function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var o=0,r=Object.getOwnPropertySymbols(e);o<r.length;o++)t.indexOf(r[o])<0&&Object.prototype.propertyIsEnumerable.call(e,r[o])&&(n[r[o]]=e[r[o]]);return n};Object.defineProperty(er,"__esModule",{value:!0});er.filterGridProps=void 0;var ab=e=>{let{grid:t,gridLg:n,gridLgStart:r,gridFitContent:o,gridMd:i,gridMdStart:a,gridSm:l,gridSmStart:s,gridStart:d}=e;return ib(e,["grid","gridLg","gridLgStart","gridFitContent","gridMd","gridMdStart","gridSm","gridSmStart","gridStart"])};er.filterGridProps=ab});var Cu=P(na=>{"use strict";Object.defineProperty(na,"__esModule",{value:!0});na.useMobileClassName=void 0;var lb=io(),sb=rd(),db=e=>{let t=(0,sb.useDrive)(),n=(0,lb.useMobile)();if(!(t||!n))return`${e}--mobile`};na.useMobileClassName=db});var xn=P(hn=>{"use strict";var cb=hn&&hn.__rest||function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var o=0,r=Object.getOwnPropertySymbols(e);o<r.length;o++)t.indexOf(r[o])<0&&Object.prototype.propertyIsEnumerable.call(e,r[o])&&(n[r[o]]=e[r[o]]);return n};Object.defineProperty(hn,"__esModule",{value:!0});hn.Button=void 0;var Nu=R(),pb=Hi(),fb=Me(),ub=Jn(),Eu=Su(),mb=Cu(),gb=e=>{var{className:t,type:n,disabled:r,id:o,title:i,onClick:a,onMouseOver:l,onMouseOut:s,onMouseDown:d,onMouseUp:g,onKeyDown:u,onKeyUp:h,children:x,link:b,target:v,htmlType:C,rel:f,ref:p,name:c,onBlur:m,role:z,ariaLabel:w,dataAnalyticsId:D}=e,S=cb(e,["className","type","disabled","id","title","onClick","onMouseOver","onMouseOut","onMouseDown","onMouseUp","onKeyDown","onKeyUp","children","link","target","htmlType","rel","ref","name","onBlur","role","ariaLabel","dataAnalyticsId"]);let I=n&&n!==pb.ButtonType.Secondary?`zen-button--${n}`:"",M=r?"zen-button--disabled":"",le=(0,ub.useDriveClassName)("zen-button"),qe=w||i,Ce=(0,mb.useMobileClassName)("zen-button"),ht=Object.assign(Object.assign(Object.assign({id:o,title:i},qe?{"aria-label":qe}:{}),D?{"data-analytics-id":D}:{}),{className:(0,fb.classNames)(["zen-button",Ce||le||"",I,M,t!=null?t:""])});return b?(0,Nu.jsx)("a",Object.assign({role:"link",rel:f,target:v,href:r?void 0:b,"aria-disabled":r,onKeyDown:u,onKeyUp:h,onMouseOver:l,onMouseOut:s,onClick:a},ht,(0,Eu.filterGridProps)(S),{children:x})):(0,Nu.jsx)("button",Object.assign({name:c,onBlur:m,onClick:a,onMouseOver:l,onMouseOut:s,onMouseDown:d,onMouseUp:g,onKeyDown:u,onKeyUp:h,ref:p,type:C,disabled:r,role:z},ht,(0,Eu.filterGridProps)(S),{children:x}))};hn.Button=gb;hn.Button.displayName="Button"});var ra=P(tr=>{"use strict";Object.defineProperty(tr,"__esModule",{value:!0});tr.injectString=tr.dictionaries=void 0;var od=class e{constructor(){Object.defineProperty(this,"dictionaries",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),this.dictionaries=new Map([["en",{}],["cs",{}],["de",{}],["da-DK",{}],["es",{}],["fi-FI",{}],["fr-FR",{}],["fr",{}],["hu-HU",{}],["id",{}],["it",{}],["ja",{}],["ms",{}],["nb-NO",{}],["nl",{}],["pl",{}],["pt-BR",{}],["pt-PT",{}],["sk-SK",{}],["sv",{}],["th",{}],["tr",{}],["zh-Hans",{}],["ko-KR",{}],["zh-TW",{}],["ro-RO",{}],["ar",{}]])}getDictionaries(){return this.dictionaries}injectString(t,n,r){let o=this.dictionaries.get(t);o?o[n]=r:this.dictionaries.set(t,{[n]:r})}static getInstance(){return e.instance||(e.instance=new e),e.instance}},ju=od.getInstance();tr.dictionaries=ju.getDictionaries();var hb=(e,t,n)=>{ju.injectString(e,t,n)};tr.injectString=hb});var Pu=P(ia=>{"use strict";Object.defineProperty(ia,"__esModule",{value:!0});ia.IconCheckRadio=void 0;var oa=R(),Du=O(),xb=Me(),bb=({className:e,size:t,title:n,description:r,focusable:o=!1})=>{let i=(0,Du.useId)(),a=(0,Du.useMemo)(()=>(0,xb.classNames)(["zen-icon",t?`zen-icon--${t}`:"",e!=null?e:""]),[t,e]);return(0,oa.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 25",focusable:o?"true":void 0,tabIndex:o?0:void 0,role:o||n||r?void 0:"presentation",className:a,"aria-labelledby":n&&o?i:void 0,"data-name":"IconCheckRadio",children:[n?(0,oa.jsx)("title",{id:i,children:n}):null,r?(0,oa.jsx)("desc",{children:r}):null,(0,oa.jsx)("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M12 4.87a8 8 0 100 16 8 8 0 000-16zm-10 8c0-5.523 4.477-10 10-10s10 4.477 10 10c0 5.522-4.477 10-10 10s-10-4.478-10-10zm13.633-3.274a1 1 0 01.141 1.407l-4.5 5.5a1 1 0 01-1.481.074l-2-2a1 1 0 111.414-1.415l1.219 1.22 3.8-4.646a1 1 0 011.407-.14z"})]})};ia.IconCheckRadio=bb});var Iu=P(aa=>{"use strict";Object.defineProperty(aa,"__esModule",{value:!0});aa.IconInfoCircle=void 0;var nr=R(),Mu=O(),vb=Me(),zb=({className:e,size:t,title:n,description:r,focusable:o=!1})=>{let i=(0,Mu.useId)(),a=(0,Mu.useMemo)(()=>(0,vb.classNames)(["zen-icon",t?`zen-icon--${t}`:"",e!=null?e:""]),[t,e]);return(0,nr.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 25",focusable:o?"true":void 0,tabIndex:o?0:void 0,role:o||n||r?void 0:"presentation",className:a,"aria-labelledby":n&&o?i:void 0,"data-name":"IconInfoCircle",children:[n?(0,nr.jsx)("title",{id:i,children:n}):null,r?(0,nr.jsx)("desc",{children:r}):null,(0,nr.jsx)("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M12 4.87a8 8 0 100 16 8 8 0 000-16zm-10 8c0-5.523 4.477-10 10-10s10 4.477 10 10c0 5.522-4.477 10-10 10s-10-4.478-10-10zm8-1a1 1 0 011-1h1a1 1 0 011 1v5a1 1 0 11-2 0v-4a1 1 0 01-1-1z"}),(0,nr.jsx)("path",{d:"M11.5 8.87a.5.5 0 111 0 .5.5 0 01-1 0z"}),(0,nr.jsx)("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M12 9.87a1 1 0 110-2 1 1 0 010 2zm0-1.5a.5.5 0 100 1 .5.5 0 000-1z"})]})};aa.IconInfoCircle=zb});var Lu=P(la=>{"use strict";Object.defineProperty(la,"__esModule",{value:!0});la.IconWarning=void 0;var ao=R(),Tu=O(),_b=Me(),yb=({className:e,size:t,title:n,description:r,focusable:o=!1})=>{let i=(0,Tu.useId)(),a=(0,Tu.useMemo)(()=>(0,_b.classNames)(["zen-icon",t?`zen-icon--${t}`:"",e!=null?e:""]),[t,e]);return(0,ao.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",focusable:o?"true":void 0,tabIndex:o?0:void 0,role:o||n||r?void 0:"presentation",className:a,"aria-labelledby":n&&o?i:void 0,"data-name":"IconWarning",children:[n?(0,ao.jsx)("title",{id:i,children:n}):null,r?(0,ao.jsx)("desc",{children:r}):null,(0,ao.jsx)("path",{d:"M13.383 7.503a1.404 1.404 0 10-2.802-.023l.312 5.353a1.05 1.05 0 002.095.016l.395-5.346zM10.93 17.59c.289.27.648.405 1.075.405.414 0 .766-.135 1.055-.404.29-.27.435-.603.435-1 0-.398-.145-.73-.435-1a1.494 1.494 0 00-1.055-.404c-.427 0-.786.135-1.076.404a1.31 1.31 0 00-.434 1c0 .397.145.73.434 1z"}),(0,ao.jsx)("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M11.995 1.995c-5.523 0-10 4.477-10 10s4.477 10 10 10 10-4.477 10-10-4.477-10-10-10zm-8 10a8 8 0 1116 0 8 8 0 01-16 0z"})]})};la.IconWarning=yb});var Ru=P(sa=>{"use strict";Object.defineProperty(sa,"__esModule",{value:!0});sa.IconException=void 0;var lo=R(),Ou=O(),wb=Me(),kb=({className:e,size:t,title:n,description:r,focusable:o=!1})=>{let i=(0,Ou.useId)(),a=(0,Ou.useMemo)(()=>(0,wb.classNames)(["zen-icon",t?`zen-icon--${t}`:"",e!=null?e:""]),[t,e]);return(0,lo.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",focusable:o?"true":void 0,tabIndex:o?0:void 0,role:o||n||r?void 0:"presentation",className:a,"aria-labelledby":n&&o?i:void 0,"data-name":"IconException",children:[n?(0,lo.jsx)("title",{id:i,children:n}):null,r?(0,lo.jsx)("desc",{children:r}):null,(0,lo.jsx)("path",{d:"M13.207 7.232c.052-.773-.508-1.432-1.217-1.432-.702 0-1.26.646-1.219 1.411l.27 5.085c.029.528.428.94.912.94.478 0 .875-.403.91-.924l.344-5.08ZM11.074 16.816c.252.256.563.384.935.384.36 0 .665-.128.917-.384a1.3 1.3 0 0 0 .378-.95c0-.377-.126-.694-.378-.95a1.24 1.24 0 0 0-.917-.383 1.26 1.26 0 0 0-.935.383 1.3 1.3 0 0 0-.378.95c0 .378.126.695.378.95Z"}),(0,lo.jsx)("path",{fillRule:"evenodd",d:"M15.066 3.883c-1.47-2.527-4.87-2.507-6.314.039L2.56 14.834C1.026 17.54 2.827 21 5.73 21H18.27c2.92 0 4.72-3.502 3.146-6.205l-6.35-10.912Zm-4.836 1.04c.769-1.355 2.586-1.366 3.37-.02l6.35 10.912c.824 1.417-.107 3.285-1.679 3.285H5.73c-1.562 0-2.495-1.847-1.69-3.265L10.23 4.923Z",clipRule:"evenodd"})]})};sa.IconException=kb});var Bu=P(ca=>{"use strict";Object.defineProperty(ca,"__esModule",{value:!0});ca.IconGraphPresentation=void 0;var da=R(),Fu=O(),Sb=Me(),Cb=({className:e,size:t,title:n,description:r,focusable:o=!1})=>{let i=(0,Fu.useId)(),a=(0,Fu.useMemo)(()=>(0,Sb.classNames)(["zen-icon",t?`zen-icon--${t}`:"",e!=null?e:""]),[t,e]);return(0,da.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 25",focusable:o?"true":void 0,tabIndex:o?0:void 0,role:o||n||r?void 0:"presentation",className:a,"aria-labelledby":n&&o?i:void 0,"data-name":"IconGraphPresentation",children:[n?(0,da.jsx)("title",{id:i,children:n}):null,r?(0,da.jsx)("desc",{children:r}):null,(0,da.jsx)("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M2 4.87a1 1 0 011-1h18a1 1 0 011 1v14a1 1 0 01-1 1h-4.674l.636 2.225a1 1 0 01-1.923.55l-.793-2.775H9.754l-.792 2.774a1 1 0 01-1.924-.55l.636-2.224H3a1 1 0 01-1-1v-14zm2 1v12h16v-12H4zm8 2a1 1 0 011 1v6a1 1 0 11-2 0v-6a1 1 0 011-1zm4 3a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm-8 2a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1z"})]})};ca.IconGraphPresentation=Cb});var ad=P(id=>{"use strict";Object.defineProperty(id,"__esModule",{value:!0});var Nb=R(),Uu=O(),Eb=Pu(),jb=Iu(),Db=Lu(),Pb=Ru(),Mb=Jn(),Ib=Me(),Tb=Bu(),Lb=({type:e,className:t})=>{let n=(0,Uu.useMemo)(()=>({error:Pb.IconException,success:Eb.IconCheckRadio,warning:Db.IconWarning,info:jb.IconInfoCircle,upsell:Tb.IconGraphPresentation}),[]),r=(0,Mb.useDriveClassName)("zen-banner__icon-block");return(0,Nb.jsx)("div",{className:(0,Ib.classNames)(["zen-banner__icon-block",t||""]),children:(0,Uu.createElement)(n[e],{size:r?"huge":"large",className:`zen-push__icon--${e}`})})};id.default=Lb});var $u=P(pa=>{"use strict";Object.defineProperty(pa,"__esModule",{value:!0});pa.languageContext=void 0;var Ob=O();pa.languageContext=(0,Ob.createContext)("en")});var ld=P(fa=>{"use strict";Object.defineProperty(fa,"__esModule",{value:!0});fa.useLanguage=void 0;var Au=O(),Rb=$u(),Fb=ra(),Bb=()=>{let e=(0,Au.useContext)(Rb.languageContext);return{translate:(0,Au.useCallback)(n=>(Fb.dictionaries.get(e)||{})[n]||`**${n}`,[e])}};fa.useLanguage=Bb});var sd=P(Ze=>{"use strict";Object.defineProperty(Ze,"__esModule",{value:!0});Ze.getBannerOptions=Ze.options=Ze.DEFAULT_BANNER_UPSELL_SIZE=Ze.DEFAULT_BANNER_SIZE=void 0;Ze.DEFAULT_BANNER_SIZE="L";Ze.DEFAULT_BANNER_UPSELL_SIZE="XXL";Ze.options={error:{blockClassName:"zen-banner--error"},info:{blockClassName:"zen-banner--info"},success:{blockClassName:"zen-banner--success"},warning:{blockClassName:""},upsell:{blockClassName:"zen-banner--upsell"}};var Ub=e=>Ze.options[e]||Ze.options.warning;Ze.getBannerOptions=Ub});var dd=P(ma=>{"use strict";Object.defineProperty(ma,"__esModule",{value:!0});ma.IconClose=void 0;var ua=R(),Hu=O(),$b=Me(),Ab=({className:e,size:t,title:n,description:r,focusable:o=!1})=>{let i=(0,Hu.useId)(),a=(0,Hu.useMemo)(()=>(0,$b.classNames)(["zen-icon",t?`zen-icon--${t}`:"",e!=null?e:""]),[t,e]);return(0,ua.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",focusable:o?"true":void 0,tabIndex:o?0:void 0,role:o||n||r?void 0:"presentation",className:a,"aria-labelledby":n&&o?i:void 0,"data-name":"IconClose",children:[n?(0,ua.jsx)("title",{id:i,children:n}):null,r?(0,ua.jsx)("desc",{children:r}):null,(0,ua.jsx)("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M5.637 5.636a1 1 0 011.414 0l4.95 4.95 4.95-4.95a1 1 0 111.414 1.414L13.415 12l4.95 4.95a1 1 0 01-1.415 1.414L12 13.414l-4.95 4.95a1 1 0 01-1.413-1.414l4.95-4.95-4.95-4.95a1 1 0 010-1.414z"})]})};ma.IconClose=Ab});var cd=P(ga=>{"use strict";Object.defineProperty(ga,"__esModule",{value:!0});ga.useNodeText=void 0;var qu=O(),Hb=e=>{let[t,n]=(0,qu.useState)("");return(0,qu.useEffect)(()=>{if(!e.current)return;let r=e.current.textContent||"";n(r)},[e]),t};ga.useNodeText=Hb});var Gu=P(or=>{"use strict";var{injectString:U}=ra(),qb=or&&or.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(or,"__esModule",{value:!0});or.BannerSingleLine=void 0;var mt=R(),rr=Me();U("cs","Close","Zav\u0159\xEDt");U("da-DK","Close","Luk");U("de","Close","Schlie\xDFen");U("en","Close","Close");U("es","Close","Cerrar");U("fi-FI","Close","Sulkea");U("fr","Close","Fermer");U("fr-FR","Close","Fermer");U("hu-HU","Close","Bez\xE1r\xE1s");U("id","Close","Tutup");U("it","Close","Chiudere");U("ja","Close","\u9589\u3058\u308B");U("ko-KR","Close","\uB2EB\uAE30");U("ms","Close","Tutup");U("nb-NO","Close","Lukk");U("nl","Close","Sluiten");U("pl","Close","Zamknij");U("pt-BR","Close","Fechar");U("pt-PT","Close","Fechar");U("sk-SK","Close","Zatvori\u0165");U("sv","Close","St\xE4ng");U("th","Close","\u0E1B\u0E34\u0E14");U("tr","Close","Kapat");U("zh-Hans","Close","\u5173\u95ED");U("zh-TW","Close","\u95DC\u9589");U("ro-RO","Close","\xCEnchide");U("ar-SA","Close","\u0625\u063A\u0644\u0627\u0642");var Wu=xn(),Vu=Hi(),Wb=qb(ad()),Vb=ld(),Ku=sd(),Kb=dd(),pd=Jn(),Gb=io(),Qb=O(),Xb=cd(),Yb=({children:e,header:t,type:n="warning",icon:r,action:o,onClose:i,size:a=Ku.DEFAULT_BANNER_SIZE,role:l,ariaAtomic:s,ariaLive:d,className:g,primaryAction:u,id:h})=>{let x=(0,Ku.getBannerOptions)(n),{translate:b}=(0,Vb.useLanguage)(),v=(0,pd.useDriveClassName)("zen-banner__header"),C=(0,pd.useDriveClassName)("zen-banner__message"),f=(0,pd.useDriveClassName)("zen-banner__close-button"),p=(0,Gb.useMobile)(),c=(0,Qb.useRef)(null),m=(0,Xb.useNodeText)(c),z=(0,rr.classNames)(["zen-banner__link","zen-banner__link--"+n]),w=(0,rr.classNames)(["zen-banner","zen-banner__block",x.blockClassName,g||"","zen-banner__block--"+a]);return(0,mt.jsxs)("div",{id:h,className:w,role:l,"aria-atomic":s,"aria-live":d,children:[(0,mt.jsxs)("div",{className:(0,rr.classNames)(["zen-banner__content",`zen-banner__content--${a}`]),children:[r&&(0,mt.jsx)(Wb.default,{type:n}),t&&(0,mt.jsx)("div",{className:(0,rr.classNames)(["zen-banner__header",v||""]),children:t}),(0,mt.jsx)("div",{className:(0,rr.classNames)(["zen-banner__message",C||"",p?"zen-banner__message--mobile":""]),ref:c,title:m,children:e}),(o||u)&&(0,mt.jsxs)("div",{className:"zen-banner__action",children:[o&&(0,mt.jsx)(Wu.Button,{className:z,type:Vu.ButtonType.Tertiary,link:o.link,target:o.target,onClick:o.onClick,children:o.text}),u&&(0,mt.jsx)(Wu.Button,{className:z,type:Vu.ButtonType.Primary,link:u.link,target:u.target,onClick:u.onClick,children:u.text})]})]}),i&&(0,mt.jsx)("button",{type:"button",className:(0,rr.classNames)(["zen-banner__close-button",f||""]),onClick:i,title:b("Close"),"aria-label":b("Close"),children:(0,mt.jsx)(Kb.IconClose,{size:v?"huge":"large"})})]})};or.BannerSingleLine=Yb});var em=P(ar=>{"use strict";var{injectString:$}=ra(),Zb=ar&&ar.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(ar,"__esModule",{value:!0});ar.BannerMultiline=void 0;var ve=R(),ir=Me();$("cs","Close","Zav\u0159\xEDt");$("da-DK","Close","Luk");$("de","Close","Schlie\xDFen");$("en","Close","Close");$("es","Close","Cerrar");$("fi-FI","Close","Sulkea");$("fr","Close","Fermer");$("fr-FR","Close","Fermer");$("hu-HU","Close","Bez\xE1r\xE1s");$("id","Close","Tutup");$("it","Close","Chiudere");$("ja","Close","\u9589\u3058\u308B");$("ko-KR","Close","\uB2EB\uAE30");$("ms","Close","Tutup");$("nb-NO","Close","Lukk");$("nl","Close","Sluiten");$("pl","Close","Zamknij");$("pt-BR","Close","Fechar");$("pt-PT","Close","Fechar");$("sk-SK","Close","Zatvori\u0165");$("sv","Close","St\xE4ng");$("th","Close","\u0E1B\u0E34\u0E14");$("tr","Close","Kapat");$("zh-Hans","Close","\u5173\u95ED");$("zh-TW","Close","\u95DC\u9589");$("ro-RO","Close","\xCEnchide");$("ar-SA","Close","\u0625\u063A\u0644\u0627\u0642");var Qu=sd(),Jb=ld(),Xu=Zb(ad()),Yu=Hi(),Zu=dd(),Ju=xn(),ha=Jn(),ev=O(),tv=cd(),nv=({children:e,header:t,type:n="warning",icon:r,action:o,onClose:i,role:a,ariaAtomic:l,ariaLive:s,size:d=Qu.DEFAULT_BANNER_SIZE,primaryAction:g,id:u,className:h=""})=>{let x=(0,Qu.getBannerOptions)(n),{translate:b}=(0,Jb.useLanguage)(),v=(0,ha.useDriveClassName)("zen-banner__block"),C=(0,ha.useDriveClassName)("zen-banner__header"),f=(0,ha.useDriveClassName)("zen-banner__message"),p=(0,ha.useDriveClassName)("zen-banner__close-button"),c=(0,ev.useRef)(null),m=(0,tv.useNodeText)(c),z=(0,ir.classNames)(["zen-banner__link","zen-banner__link--"+n]),w=(0,ir.classNames)(["zen-banner","zen-banner__block",v||"",x.blockClassName,h,"zen-banner__block--multiline","zen-banner__block--"+d]);return(0,ve.jsx)("div",{id:u,className:w,role:a,"aria-atomic":l,"aria-live":s,children:(0,ve.jsxs)("div",{className:(0,ir.classNames)(["zen-banner__content","zen-banner__content--multiline",`zen-banner__content--${d}`]),children:[t&&(0,ve.jsxs)("div",{className:"zen-banner__multiline-container",children:[(0,ve.jsxs)("div",{className:"zen-banner__header-container",children:[r&&t&&(0,ve.jsx)(Xu.default,{type:n}),t&&(0,ve.jsx)("div",{className:(0,ir.classNames)(["zen-banner__header",C||""]),children:t})]}),i&&(0,ve.jsx)("button",{type:"button",className:(0,ir.classNames)(["zen-banner__close-button",p||""]),onClick:i,title:b("Close"),"aria-label":b("Close"),children:(0,ve.jsx)(Zu.IconClose,{size:C?"huge":"large"})})]}),(0,ve.jsxs)("div",{className:"zen-banner__message-container",children:[r&&!t&&(0,ve.jsx)(Xu.default,{className:"zen-banner__icon-block--top-gap",type:n}),(0,ve.jsx)("div",{ref:c,title:m,className:(0,ir.classNames)(["zen-banner__message",`zen-banner__message--${d}`,"zen-banner__message--multiline",f||""]),children:e}),i&&!t&&(0,ve.jsx)("button",{type:"button",className:"zen-banner__close-button zen-banner__close-button--top-gap",onClick:i,title:b("Close"),"aria-label":b("Close"),children:(0,ve.jsx)(Zu.IconClose,{size:C?"huge":"large"})})]}),(o||g)&&(0,ve.jsxs)("div",{className:"zen-banner__action zen-banner__action--multiline",children:[o&&(0,ve.jsx)(Ju.Button,{className:z,type:Yu.ButtonType.Tertiary,link:o.link,target:o.target,onClick:o.onClick,children:o.text}),g&&(0,ve.jsx)(Ju.Button,{className:z,type:Yu.ButtonType.Primary,link:g.link,target:g.target,onClick:g.onClick,children:g.text})]})]})})};ar.BannerMultiline=nv});var fd=P(Qt=>{"use strict";Object.defineProperty(Qt,"__esModule",{value:!0});Qt.Banner=Qt.BannerDisplayName=void 0;var tm=R(),rv=Gu(),ov=em(),iv=io();Qt.BannerDisplayName="Banner";var av=({children:e,header:t,type:n="warning",icon:r,action:o,size:i,onClose:a,multiline:l,role:s="status",ariaAtomic:d="true",ariaLive:g="polite",primaryAction:u,className:h,id:x})=>{let b=(0,iv.useMobile)();return(l===void 0?b:l)?(0,tm.jsx)(ov.BannerMultiline,{children:e,header:t,type:n,icon:r,size:i,action:o,onClose:a,role:s,ariaAtomic:d,ariaLive:g,primaryAction:u,className:h,id:x}):(0,tm.jsx)(rv.BannerSingleLine,{children:e,header:t,type:n,size:i,icon:r,action:o,onClose:a,role:s,ariaAtomic:d,ariaLive:g,primaryAction:u,className:h,id:x})};Qt.Banner=av;Qt.Banner.displayName=Qt.BannerDisplayName});var rm=P(va=>{"use strict";Object.defineProperty(va,"__esModule",{value:!0});va.Waiting=void 0;var Ie=R(),nm=O(),xa=Me(),lv=Jn(),ba=ro(),sv=({isLoading:e=!1,delay:t=400,hideOverlay:n=!1,className:r="",description:o})=>{let[i,a]=(0,nm.useState)(!1),l=(0,lv.useDriveClassName)("zen-waiting__spinner");return(0,nm.useEffect)(()=>{var s;let d;return e?d=(s=ba.zen.setTimeout)===null||s===void 0?void 0:s.call(ba.zen,()=>a(!0),t):a(!1),()=>{var g;d&&((g=ba.zen.clearTimeout)===null||g===void 0||g.call(ba.zen,d))}},[e,a,t]),i?(0,Ie.jsxs)("div",{className:(0,xa.classNames)(["zen-waiting",r]),children:[(0,Ie.jsx)("div",{className:(0,xa.classNames)(["zen-waiting__overlay",n?"zen-waiting__overlay--hidden":""])}),(0,Ie.jsxs)("div",{className:"zen-waiting__spinner-container",children:[(0,Ie.jsx)("div",{className:(0,xa.classNames)(["zen-waiting__spinner",l||""]),children:(0,Ie.jsxs)("svg",{viewBox:"0 0 64 64",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[(0,Ie.jsx)("defs",{children:(0,Ie.jsxs)("linearGradient",{id:"spinnerGradient",x1:"0",y1:"0",x2:"1",y2:"0",gradientUnits:"objectBoundingBox",children:[(0,Ie.jsx)("stop",{offset:"0%",stopColor:"var(--borders-form-field--active)",stopOpacity:"1"}),(0,Ie.jsx)("stop",{offset:"33.33%",stopColor:"var(--borders-form-field--active)",stopOpacity:"0.8"}),(0,Ie.jsx)("stop",{offset:"50%",stopColor:"var(--borders-form-field--active)",stopOpacity:"0.5"}),(0,Ie.jsx)("stop",{offset:"66.67%",stopColor:"var(--borders-form-field--active)",stopOpacity:"0.2"}),(0,Ie.jsx)("stop",{offset:"100%",stopColor:"var(--borders-form-field--active)",stopOpacity:"0"})]})}),(0,Ie.jsx)("path",{className:"zen-waiting__spinner-animation",stroke:"url(#spinnerGradient)",strokeWidth:"6",strokeLinecap:"round",d:"M 32 4 A 28 28 0 1 1 32 60 A 28 28 0 1 1 32 4 Z"})]})}),o&&(0,Ie.jsx)("div",{className:(0,xa.classNames)(["zen-waiting__spinner-text"]),children:o})]})]}):null};va.Waiting=sv});var im=P(za=>{"use strict";Object.defineProperty(za,"__esModule",{value:!0});za.ImageNothingFound=void 0;var Se=R(),om=O(),dv=Me(),cv=({className:e,title:t,description:n,focusable:r=!1})=>{let o=(0,om.useId)(),i=(0,om.useMemo)(()=>(0,dv.classNames)(["zen-svg-image",e!=null?e:""]),[e]);return(0,Se.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 180 180",focusable:r?"true":void 0,tabIndex:r?0:void 0,role:r||t||n?void 0:"presentation",className:i,"aria-labelledby":t&&r?o:void 0,"data-name":"ImageNothingFound",children:[t?(0,Se.jsx)("title",{id:o,children:t}):null,n?(0,Se.jsx)("desc",{children:n}):null,(0,Se.jsx)("circle",{cx:"90",cy:"90",r:"90",fill:"#F2F5F7"}),(0,Se.jsx)("path",{d:"M34 59h107v73a4 4 0 0 1-4 4H38a4 4 0 0 1-4-4V59Z",fill:"#E6EBEF"}),(0,Se.jsx)("rect",{x:"26",y:"47",width:"124",height:"12",rx:"2",fill:"#A6B8C9"}),(0,Se.jsx)("path",{fill:"#8DA4B9",d:"M34 59h107v4H34z"}),(0,Se.jsx)("rect",{x:"62",y:"70",width:"52",height:"10",rx:"2",fill:"#C0CCD8"}),(0,Se.jsx)("rect",{x:"64",y:"72",width:"50",height:"8",rx:"2",fill:"#F2F5F7"}),(0,Se.jsx)("ellipse",{cx:"120.909",cy:"111.875",rx:"19.582",ry:"19.785",fill:"#8DA4B9"}),(0,Se.jsx)("rect",{x:"133.535",y:"122.707",width:"8",height:"4",rx:"2",transform:"rotate(45 133.535 122.707)",fill:"#4E677E"}),(0,Se.jsx)("rect",{x:"137.778",y:"125.536",width:"24",height:"6",rx:"2",transform:"rotate(45 137.778 125.536)",fill:"#A6B8C9"}),(0,Se.jsx)("circle",{cx:"120",cy:"111",r:"20",fill:"#A6B8C9"}),(0,Se.jsx)("circle",{cx:"120",cy:"111",r:"15",fill:"#F9FAFB"}),(0,Se.jsx)("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M114.319 124.887C109.935 122.268 107 117.477 107 112c0-8.284 6.716-15 15-15 2.011 0 3.929.396 5.681 1.113A14.93 14.93 0 0 0 120 96c-8.284 0-15 6.716-15 15 0 6.274 3.851 11.648 9.319 13.887Z",fill:"#E6EBEF"})]})};za.ImageNothingFound=cv});var lm=P(lr=>{"use strict";var pv=lr&&lr.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(lr,"__esModule",{value:!0});lr.useIcon=void 0;var am=pv(O()),fv=e=>am.default.useMemo(()=>typeof e=="function"?am.default.createElement(e,{}):e,[e]);lr.useIcon=fv});var sm=P(_a=>{"use strict";Object.defineProperty(_a,"__esModule",{value:!0});_a.EmptyState=void 0;var so=R(),uv=Me(),mv=im(),gv=lm(),hv=({className:e,children:t,description:n,image:r})=>{let o=(0,gv.useIcon)(r);return(0,so.jsxs)("div",{className:(0,uv.classNames)(["zen-empty-state",e||""]),children:[o?(0,so.jsx)("div",{className:"zen-empty-state__image",children:o}):(0,so.jsx)(mv.ImageNothingFound,{className:"zen-empty-state__image"}),t&&(0,so.jsx)("h2",{className:"zen-empty-state__header",children:t}),n&&(0,so.jsx)("div",{className:"zen-empty-state__description",children:n})]})};_a.EmptyState=hv});var Wm=F(su(),1);var Q=F(O(),1),yd=F(xn(),1),wd=F(fd(),1),kd=F(rm(),1),$m=F(sm(),1);var ka="an_qIKWbzyE09jcDpY-MtXw",md=Object.freeze({version:1,rules:[],period:"week",periods:8,normalization:"none",unit:"miles",bands:{low:10,medium:30}}),fm={day:1,week:7,month:30},um=1.60934,xv=864e5;function Sa(e){switch(e){case"per100mi":return{low:2,medium:5};case"per1000km":return{low:12,medium:30};case"perEngineHour":return{low:.5,medium:1.5};default:return{low:10,medium:30}}}function bn(e){let t={...md,...e||{}};t.rules=Array.isArray(t.rules)?t.rules.filter(o=>o&&o.id).map(o=>({id:String(o.id),name:String(o.name||o.id),points:ya(o.points,1)})):[],fm[t.period]||(t.period="week"),t.periods=Math.min(Math.max(Math.round(ya(t.periods,8)),2),26),["none","per100mi","per1000km","perEngineHour"].includes(t.normalization)||(t.normalization="none"),["miles","km"].includes(t.unit)||(t.unit="miles");let n=Sa(t.normalization),r=e&&e.bands||{};return t.bands={low:ya(r.low,n.low),medium:ya(r.medium,n.medium)},t.bands.medium<t.bands.low&&(t.bands.medium=t.bands.low),t}function ya(e,t){let n=Number(e);return Number.isFinite(n)?n:t}function mm(e,t,n){let r=fm[t]||7,o=new Date(e);o.setHours(23,59,59,999);let i=[],a=o.getTime();for(let l=0;l<n;l++){let s=new Date(a-r*xv+1);s.setHours(0,0,0,0),i.unshift({start:s.getTime(),end:a,label:bv(s)}),a=s.getTime()-1}return i}function bv(e){return new Date(e).toLocaleDateString(void 0,{month:"short",day:"2-digit"})}function dm(e,t){let n=0,r=e.length-1;for(;n<=r;){let o=n+r>>1,i=e[o];if(t<i.start)r=o-1;else if(t>i.end)n=o+1;else return o}return-1}function ud(e,t){let n=0;for(let r of t.rules)n+=(e[r.id]||0)*r.points;return n}function vv(e,t,n,r=0){let o=ud(e,n);switch(n.normalization){case"per100mi":return t>0?o/(t/um)*100:o>0?null:0;case"per1000km":return t>0?o/t*1e3:o>0?null:0;case"perEngineHour":return r>0?o/r:o>0?null:0;default:return o}}function gd(e,t){return e==null?"No exposure":e<=t.bands.low?"Low":e<=t.bands.medium?"Medium":"High"}function gm(e,t){return e==null||t==null?null:t===0?e===0?0:null:(e-t)/t*100}function hd(e){let t=e.filter(r=>r!=null&&Number.isFinite(r)).sort((r,o)=>r-o);if(!t.length)return null;let n=t.length>>1;return t.length%2?t[n]:(t[n-1]+t[n])/2}function zv(e,t){return t==="km"?e:e/um}function hm(e){return{counts:Array.from({length:e},()=>({})),distanceKm:new Array(e).fill(0),engineHours:new Array(e).fill(0),events:0}}function cm(e,t,n){e.counts[t][n]=(e.counts[t][n]||0)+1,e.events++}function xm({periods:e,config:t,exceptions:n,trips:r,deviceIds:o,engineHours:i=[]}){let a=e.length,l=new Set(t.rules.map(u=>u.id)),s=new Map,d=new Map,g=(u,h)=>{let x=u.get(h);return x||(x=hm(a),u.set(h,x)),x};for(let u of n){let h=u.device&&u.device.id,x=u.rule&&u.rule.id;if(!h||!x||!l.has(x)||o&&!o.has(h))continue;let b=dm(e,pm(u.activeFrom));if(b<0)continue;cm(g(s,h),b,x);let v=u.driver&&u.driver.id;v&&v!=="UnknownDriverId"&&v!=="NoDriverId"&&cm(g(d,v),b,x)}for(let u of r){let h=u.device&&u.device.id;if(!h||o&&!o.has(h))continue;let x=dm(e,pm(u.start));if(x<0)continue;let b=Number(u.distance)||0;g(s,h).distanceKm[x]+=b;let v=u.driver&&u.driver.id;v&&v!=="UnknownDriverId"&&v!=="NoDriverId"&&(g(d,v).distanceKm[x]+=b)}for(let u of i){let h=u.device&&u.device.id;!h||o&&!o.has(h)||u.periodIndex>=0&&u.periodIndex<a&&(g(s,h).engineHours[u.periodIndex]+=Number(u.hours)||0)}if(o)for(let u of o)g(s,u);return{byDevice:s,byDriver:d}}function pm(e){return typeof e=="number"?e:Date.parse(e)}function wa(e,t){let n=hm(t);for(let r of e){for(let o=0;o<t;o++){n.distanceKm[o]+=r.distanceKm[o],n.engineHours[o]+=r.engineHours[o];for(let[i,a]of Object.entries(r.counts[o]))n.counts[o][i]=(n.counts[o][i]||0)+a}n.events+=r.events}return n}function co(e,t){return e.counts.map((n,r)=>vv(n,e.distanceKm[r],t,e.engineHours[r]))}function Xt(e,t){let n=co(e,t),r=n.length,o=n[r-1],i=r>1?n[r-2]:null,a=e.counts[r-1];return{scores:n,current:o,previous:i,trend:gm(o,i),band:gd(o,t),currentEvents:Object.values(a).reduce((l,s)=>l+s,0),currentPoints:ud(a,t),currentDistanceKm:e.distanceKm[r-1],totalEvents:e.events,totalDistanceKm:e.distanceKm.reduce((l,s)=>l+s,0),totalPoints:e.counts.reduce((l,s)=>l+ud(s,t),0)}}function Ca(e,t){let n=e.counts.length,r=e.counts[n-1]||{},o=n>1?e.counts[n-2]||{}:{};return t.rules.map(i=>{let a=r[i.id]||0,l=o[i.id]||0;return{id:i.id,name:i.name,points:i.points,current:a,previous:l,trend:gm(a,l),currentPoints:a*i.points,perPeriod:e.counts.map(s=>s[i.id]||0),total:e.counts.reduce((s,d)=>s+(d[i.id]||0),0)}}).sort((i,a)=>a.currentPoints-i.currentPoints||a.current-i.current)}function bm(e){let t=new Map,n=new Map,r=new Map;for(let l of e){t.set(l.id,l);let s=(l.children||[]).map(d=>d.id);r.set(l.id,s);for(let d of s)n.set(d,l.id)}let o=new Map;function i(l){if(o.has(l))return o.get(l);let s=new Set([l]),d=[...r.get(l)||[]];for(;d.length;){let g=d.pop();if(!s.has(g)){s.add(g);for(let u of r.get(g)||[])d.push(u)}}return o.set(l,s),s}let a=e.filter(l=>!n.has(l.id)).map(l=>l.id);return{byId:t,parentOf:n,childrenOf:r,descendants:i,roots:a}}var Yt="GroupCompanyId";function vm({nodeId:e,tree:t,devices:n,byDevice:r,config:o,nPeriods:i}){let a=t.byId.get(e),l=t.childrenOf.get(e)||[],s=[],d=new Set;for(let u of l){let h=t.descendants(u),x=n.filter(v=>(v.groups||[]).some(C=>h.has(C.id)));for(let v of x)d.add(v.id);let b=wa(x.map(v=>r.get(v.id)).filter(Boolean),i);s.push({id:u,name:(t.byId.get(u)||{}).name||u,kind:"group",vehicles:x.length,hasChildren:(t.childrenOf.get(u)||[]).length>0,series:b,...Xt(b,o)})}let g=n.filter(u=>!d.has(u.id)&&(u.groups||[]).some(h=>h.id===e));if(g.length&&l.length){let u=wa(g.map(h=>r.get(h.id)).filter(Boolean),i);s.push({id:`${e}::direct`,name:`${a&&a.name||"Group"} (direct)`,kind:"direct",vehicles:g.length,hasChildren:!1,series:u,...Xt(u,o)})}return s.filter(u=>u.vehicles>0)}function zm(e,t,n){if(e===Yt)return n;let r=t.descendants(e);return n.filter(o=>(o.groups||[]).some(i=>r.has(i.id)))}function _m(e,t){let n=[],r=e;for(;r;){let o=t.byId.get(r);n.unshift({id:r,name:o?o.name:r}),r=t.parentOf.get(r)}return n}function Ae(e){return e==null?"\u2014":Math.abs(e)>=100?Math.round(e).toLocaleString():(Math.round(e*10)/10).toLocaleString(void 0,{maximumFractionDigits:1})}function xd(e){if(e==null)return"\u2014";let t=Math.round(e);return`${t>0?"+":""}${t}%`}function vn(e,t,n=!1){let r=zv(e,t),o=t==="km"?"km":"mi";return n||r<10?`${r.toLocaleString(void 0,{maximumFractionDigits:1,minimumFractionDigits:r<10?1:0})} ${o}`:`${Math.round(r).toLocaleString()} ${o}`}function po(e){switch(e.normalization){case"per100mi":return"points / 100 mi";case"per1000km":return"points / 1,000 km";case"perEngineHour":return"points / engine hr";default:return"points"}}var fo=5e4,ym=864e5,_v=8;function uo(e,t,n){return new Promise((r,o)=>{try{e.call(t,n,r,i=>o(Ea(i)))}catch(i){o(Ea(i))}})}function yv(e,t){return t.length?new Promise((n,r)=>{try{e.multiCall(t,n,o=>r(Ea(o)))}catch(o){r(Ea(o))}}):Promise.resolve([])}function Ea(e){if(e instanceof Error)return e;if(typeof e=="string")return new Error(e);let t=e&&(e.message||e.error&&e.error.message)||"Unknown MyGeotab API error",n=new Error(t);return n.raw=e,n}function sr(e){let t=e&&e.message||String(e);return/propertySelector/i.test(t)?"This MyGeotab version rejected a field filter; retrying without it.":/InvalidUserException|session/i.test(t)?"Your MyGeotab session has expired. Refresh the page and sign in again.":/not allowed|permission|clearance|access/i.test(t)?"Your security clearance does not allow this request. "+t:t}async function Na(e,t,n,r,o={}){let i={typeName:t,search:n,resultsLimit:fo,...o};try{return await uo(e,"Get",{...i,propertySelector:{fields:r,isIncluded:!0}})}catch(a){if(/propertySelector|property/i.test(a.message))return uo(e,"Get",i);throw a}}async function wm(e,t){let n=t&&t.length?t.map(s=>({id:s.id})):void 0,r=new Date().toISOString(),[o,i,a,l]=await Promise.all([Na(e,"Device",{fromDate:r,...n?{groups:n}:{}},["id","name","groups","serialNumber","licensePlate","vehicleIdentificationNumber"]),Na(e,"Group",{},["id","name","children","color"]),Na(e,"Rule",{},["id","name","baseType","comment"]),Na(e,"User",{isDriver:!0},["id","name","firstName","lastName","groups"]).catch(()=>[])]);return{devices:o.filter(s=>s&&s.id),groups:i,rules:a.filter(s=>s&&s.id&&!/^Rule(Ignore|Count)/.test(s.id)).sort((s,d)=>String(s.name).localeCompare(String(d.name))),drivers:l}}function mo(e){return e?[e.firstName,e.lastName].filter(Boolean).join(" ").trim()||e.name||e.id:"Unknown driver"}async function km(e,t,n,r,o,i){let a=[];for(let u=t;u<=n;u+=r)a.push([u,Math.min(u+r-1,n)]);let l=[],s=0,d=a.slice(),g=()=>s+d.length;for(;d.length;){let u=d.splice(0,_v);(await yv(e,u.map(([x,b])=>["Get",o(new Date(x).toISOString(),new Date(b).toISOString())]))).forEach((x,b)=>{let[v,C]=u[b];if(x.length>=fo&&C-v>ym/4){let f=Math.floor((v+C)/2);d.push([v,f],[f+1,C])}else for(let f of x)l.push(f)}),s+=u.length,i&&i(s,g())}return l}async function Sm(e,{ruleIds:t,from:n,to:r,groupFilter:o,onProgress:i}){if(!t.length)return[];let a=o&&o.length?o.map(u=>({id:u.id})):void 0,l=["id","activeFrom","activeTo","device","driver","rule","distance","duration"],s=r-n,d=[],g=0;for(let u of t){let h=!0,x=!!a,b=(f,p)=>{let c={ruleSearch:{id:u},fromDate:f,toDate:p};x&&(c.deviceSearch={groups:a});let m={typeName:"ExceptionEvent",search:c,resultsLimit:fo};return h&&(m.propertySelector={fields:l,isIncluded:!0}),m},v=()=>km(e,n,r,s,b,(f,p)=>i&&i(`Events ${g+1}/${t.length}`,f,p)),C;try{C=await v()}catch(f){if(/propertySelector|property/i.test(f.message)&&h)h=!1,C=await v();else if(/deviceSearch|groups/i.test(f.message)&&x)x=!1,C=await v();else throw f}for(let f of C)d.push(f);g++}return d}async function Cm(e,{from:t,to:n,groupFilter:r,deviceCount:o,onProgress:i}){let a=r&&r.length?r.map(b=>({id:b.id})):void 0,l=["id","start","stop","distance","device","driver"],s=Math.max(1,(o||50)*8),d=Math.max(1,Math.min(31,Math.floor(fo*.6/s))),g=!0,u=!!a,h=(b,v)=>{let C={fromDate:b,toDate:v};u&&(C.deviceSearch={groups:a});let f={typeName:"Trip",search:C,resultsLimit:fo};return g&&(f.propertySelector={fields:l,isIncluded:!0}),f},x=()=>km(e,t,n,d*ym,h,(b,v)=>i&&i("Trips",b,v));try{return await x()}catch(b){if(/propertySelector|property/i.test(b.message)&&g)return g=!1,x();if(/deviceSearch|groups/i.test(b.message)&&u)return u=!1,x();throw b}}var Nm="gpsfms.fleetInsights.config";async function Em(e,t){let n=null,r=null,o=!0;try{let s=(await uo(e,"Get",{typeName:"AddInData",search:{addInId:ka}})||[]).map(d=>({...d,details:wv(d.details)})).find(d=>d.details&&d.details.type==="config");s&&(n=s.details.config,r=s.id)}catch{o=!1}let i=null;try{i=JSON.parse(localStorage.getItem(`${Nm}.${t}`)||"null")}catch{}return{config:bn(n||i||md),recordId:r,serverOk:o,source:n?"database":i?"browser":"default"}}async function jm(e,t,n,r){let o=bn(n);try{localStorage.setItem(`${Nm}.${t}`,JSON.stringify(o))}catch{}let i={type:"config",config:o,savedAt:new Date().toISOString()};try{return r?(await uo(e,"Set",{typeName:"AddInData",entity:{id:r,addInId:ka,details:i}}),{recordId:r,persisted:"database"}):{recordId:await uo(e,"Add",{typeName:"AddInData",entity:{addInId:ka,details:i,groups:[{id:"GroupCompanyId"}]}}),persisted:"database"}}catch(a){return{recordId:r,persisted:"browser",error:sr(a)}}}function wv(e){if(e==null)return null;if(typeof e=="string")try{return JSON.parse(e)}catch{return null}return e}var ze=F(O(),1),Om=F(xn(),1);var Dm=F(O(),1);var A=F(R(),1);function ja({values:e,labels:t,height:n=180,width:r=1100,unitLabel:o="",onSelect:i,selected:a}){let[l,s]=(0,Dm.useState)(null),d=e.length,g=r,u=n,h=40,x=8,b=20,v=26,C=g-h-x,f=u-b-v,p=e.map(S=>S==null?0:S),c=Math.max(1,...p),m=C/Math.max(d,1),z=Math.max(6,Math.min(56,m*.5)),w=S=>b+f-S/c*f,D=Cv(c,4);return(0,A.jsxs)("div",{className:"fi-chart",children:[(0,A.jsxs)("svg",{viewBox:`0 0 ${g} ${u}`,width:"100%",height:u,role:"img","aria-label":"Score by period",children:[D.map(S=>(0,A.jsxs)("g",{children:[(0,A.jsx)("line",{x1:h,x2:g-x,y1:w(S),y2:w(S),className:"fi-grid"}),(0,A.jsx)("text",{x:h-6,y:w(S)+3,className:"fi-axis",textAnchor:"end",children:Ae(S)})]},S)),(0,A.jsx)("line",{x1:h,x2:g-x,y1:w(0),y2:w(0),className:"fi-baseline"}),e.map((S,I)=>{let M=h+I*m+(m-z)/2,le=S==null?0:S,qe=w(le),Ce=I===d-1,ht=a===I,_=Math.max(0,w(0)-qe);return(0,A.jsxs)("g",{className:"fi-bar-group",onMouseEnter:()=>s(I),onMouseLeave:()=>s(null),onClick:()=>i&&i(I),style:{cursor:i?"pointer":"default"},children:[(0,A.jsx)("rect",{x:h+I*m,y:b,width:m,height:f,fill:"transparent"}),_>0&&(0,A.jsx)("path",{d:Sv(M,qe,z,_,4),className:`fi-bar ${Ce?"fi-bar--current":""} ${ht?"fi-bar--selected":""} ${S==null?"fi-bar--na":""}`}),(Ce||l===I)&&(0,A.jsx)("text",{x:M+z/2,y:Math.min(qe-6,w(0)-6),className:"fi-label",textAnchor:"middle",children:S==null?"n/a":Ae(S)}),(0,A.jsx)("text",{x:h+I*m+m/2,y:u-8,className:`fi-axis ${Ce?"fi-axis--strong":""}`,textAnchor:"middle",children:Ce?"Current":t[I]})]},I)})]}),l!=null&&(0,A.jsxs)("div",{className:"fi-tip",children:[(0,A.jsx)("strong",{children:l===d-1?"Current period":t[l]}),(0,A.jsx)("span",{children:e[l]==null?"No exposure":`${Ae(e[l])} ${o}`}),l>0&&(0,A.jsxs)("span",{className:"fi-tip-sub",children:["vs previous: ",xd(kv(e[l],e[l-1]))]})]})]})}function kv(e,t){return e==null||t==null?null:t===0?e===0?0:null:(e-t)/t*100}function Sv(e,t,n,r,o){let i=Math.min(o,n/2,r);return`M${e},${t+r} V${t+i} Q${e},${t} ${e+i},${t} H${e+n-i} Q${e+n},${t} ${e+n},${t+i} V${t+r} Z`}function Cv(e,t){let n=e/t,r=Math.pow(10,Math.floor(Math.log10(n||1))),o=n/r,a=(o<=1?1:o<=2?2:o<=5?5:10)*r,l=[];for(let s=0;s<=e+1e-9;s+=a)l.push(Number(s.toFixed(6)));return l[l.length-1]<e&&l.push(Number((l[l.length-1]+a).toFixed(6))),l}function Pm({values:e,width:t=90,height:n=22}){let r=e.map(s=>s==null?0:s),o=Math.max(1,...r),i=r.length,a=i>1?t/(i-1):t,l=r.map((s,d)=>`${(d*a).toFixed(1)},${(n-2-s/o*(n-4)).toFixed(1)}`).join(" ");return(0,A.jsxs)("svg",{width:t,height:n,className:"fi-spark","aria-hidden":"true",children:[(0,A.jsx)("polyline",{points:l,fill:"none",className:"fi-spark-line"}),(0,A.jsx)("circle",{cx:(i-1)*a,cy:n-2-r[i-1]/o*(n-4),r:"2.5",className:"fi-spark-dot"})]})}function go({value:e,max:t,label:n,tone:r="neutral"}){let o=t>0&&e!=null?Math.max(1.5,e/t*100):0;return(0,A.jsxs)("div",{className:"fi-hbar",children:[(0,A.jsx)("div",{className:`fi-hbar-fill fi-hbar--${r}`,style:{width:`${o}%`}}),(0,A.jsx)("span",{className:"fi-hbar-label",children:n!=null?n:Ae(e)})]})}function zn({pct:e,invert:t=!1}){if(e==null)return(0,A.jsx)("span",{className:"fi-trend fi-trend--flat",children:"\u2014"});let n=Math.round(e);if(n===0)return(0,A.jsx)("span",{className:"fi-trend fi-trend--flat",children:"0%"});let r=n>0,o=t?!r:r;return(0,A.jsxs)("span",{className:`fi-trend ${o?"fi-trend--bad":"fi-trend--good"}`,title:o?"Worse than previous period":"Better than previous period",children:[r?"\u25B2":"\u25BC"," ",Math.abs(n),"%"]})}function ho({band:e}){return(0,A.jsx)("span",{className:`fi-pill fi-pill--${e==="Low"?"ok":e==="Medium"?"warn":e==="High"?"bad":"na"}`,children:e})}var xo=F(O(),1),He=F(R(),1);function Mm({columns:e,rows:t,defaultSort:n,defaultDir:r="desc",onRowClick:o,rowKey:i=l=>l.id,emptyText:a="No rows."}){let[l,s]=(0,xo.useState)(n||e[0]&&e[0].key),[d,g]=(0,xo.useState)(r),u=(0,xo.useMemo)(()=>{let x=e.find(C=>C.key===l);if(!x)return t;let b=x.sort||(C=>C[x.key]),v=d==="asc"?1:-1;return[...t].sort((C,f)=>{let p=b(C),c=b(f);return p==null&&c==null?0:p==null?1:c==null?-1:typeof p=="string"||typeof c=="string"?String(p).localeCompare(String(c))*v:(p-c)*v})},[t,e,l,d]),h=x=>{x===l?g(b=>b==="asc"?"desc":"asc"):(s(x),g(x==="name"?"asc":"desc"))};return(0,He.jsx)("div",{className:"fi-table-wrap",children:(0,He.jsxs)("table",{className:"fi-table",children:[(0,He.jsx)("thead",{children:(0,He.jsx)("tr",{children:e.map(x=>(0,He.jsxs)("th",{style:{width:x.width,textAlign:x.align||"left"},className:x.key===l?"fi-th--sorted":"",onClick:()=>h(x.key),role:"button","aria-sort":x.key===l?d==="asc"?"ascending":"descending":"none",children:[x.label,(0,He.jsx)("span",{className:"fi-sort-ind",children:x.key===l?d==="asc"?"\u2191":"\u2193":"\u2195"})]},x.key))})}),(0,He.jsxs)("tbody",{children:[u.length===0&&(0,He.jsx)("tr",{children:(0,He.jsx)("td",{colSpan:e.length,className:"fi-empty",children:a})}),u.map(x=>(0,He.jsx)("tr",{onClick:o?()=>o(x):void 0,className:o?"fi-row--click":"",children:e.map(b=>(0,He.jsx)("td",{style:{textAlign:b.align||"left"},children:b.render?b.render(x):x[b.key]},b.key))},i(x)))]})]})})}function Im(e,t){let n=i=>{let a=i==null?"":String(i);return/[",\n]/.test(a)?`"${a.replace(/"/g,'""')}"`:a},r=e.map(i=>n(i.label)).join(","),o=t.map(i=>e.map(a=>n((a.csv||a.sort||(l=>l[a.key]))(i))).join(","));return[r,...o].join(`
`)}function Tm(e,t,n="text/csv;charset=utf-8"){let r=new Blob([t],{type:n}),o=URL.createObjectURL(r),i=document.createElement("a");i.href=o,i.download=e,document.body.appendChild(i),i.click(),i.remove(),setTimeout(()=>URL.revokeObjectURL(o),2e3)}var gt=F(O(),1),vd=F(xn(),1);var E=F(R(),1);function Lm({kind:e,id:t,config:n,periods:r,data:o,refData:i,session:a,onClose:l}){let s=r.length,[d,g]=(0,gt.useState)(s-1);(0,gt.useEffect)(()=>{g(s-1)},[t,s]),(0,gt.useEffect)(()=>{let m=z=>{z.key==="Escape"&&l()};return document.addEventListener("keydown",m),()=>document.removeEventListener("keydown",m)},[l]);let u=e==="vehicle"?o.byDevice.get(t):o.byDriver.get(t),h=e==="vehicle"?(i.devicesById.get(t)||{}).name||t:mo(i.driversById.get(t)),x=(0,gt.useMemo)(()=>u?Xt(u,n):null,[u,n]),b=(0,gt.useMemo)(()=>u?Ca(u,n):[],[u,n]),v=(0,gt.useMemo)(()=>new Map(n.rules.map(m=>[m.id,m])),[n]),C=(0,gt.useMemo)(()=>{let m=r[d];return m?o.exceptions.filter(z=>e==="vehicle"?z.device&&z.device.id===t:z.driver&&z.driver.id===t).filter(z=>v.has(z.rule&&z.rule.id)).filter(z=>{let w=Date.parse(z.activeFrom);return w>=m.start&&w<=m.end}).sort((z,w)=>Date.parse(w.activeFrom)-Date.parse(z.activeFrom)):[]},[o,e,t,r,d,v]);if(!u||!x)return null;let f=Math.max(0,...b.map(m=>m.currentPoints)),p=r[d],c=u.counts[d]||{};return(0,E.jsx)("div",{className:"fi-drawer-backdrop",onClick:l,children:(0,E.jsxs)("aside",{className:"fi-drawer",onClick:m=>m.stopPropagation(),role:"dialog","aria-label":`${h} detail`,children:[(0,E.jsxs)("header",{className:"fi-drawer-head",children:[(0,E.jsxs)("div",{children:[(0,E.jsx)("div",{className:"fi-muted",children:e==="vehicle"?"Vehicle":"Driver"}),(0,E.jsx)("h3",{children:h})]}),(0,E.jsxs)("div",{className:"fi-actions",children:[e==="vehicle"&&a&&(0,E.jsx)(vd.Button,{type:"secondary",onClick:()=>window.open(jv(a,t,p),"_blank"),children:"Trips in MyGeotab"}),(0,E.jsx)(vd.Button,{type:"tertiary",onClick:l,ariaLabel:"Close",children:"Close"})]})]}),(0,E.jsxs)("section",{className:"fi-kpis fi-kpis--3",children:[(0,E.jsx)(bd,{title:"Current score",value:Ae(x.current),sub:po(n),badge:(0,E.jsx)(ho,{band:x.band}),trend:x.trend}),(0,E.jsx)(bd,{title:"Events (current)",value:x.currentEvents.toLocaleString(),sub:`${x.currentPoints.toLocaleString()} points`}),(0,E.jsx)(bd,{title:"Distance (current)",value:vn(x.currentDistanceKm,n.unit),sub:`${vn(x.totalDistanceKm,n.unit)} over ${s} periods`})]}),(0,E.jsxs)("section",{className:"fi-card fi-card--flat",children:[(0,E.jsxs)("h4",{children:["Score by period ",(0,E.jsx)("span",{className:"fi-muted",children:"\u2014 click a bar to list its events"})]}),(0,E.jsx)(ja,{values:co(u,n),labels:r.map(m=>m.label),unitLabel:po(n),height:150,width:760,onSelect:g,selected:d})]}),(0,E.jsxs)("section",{className:"fi-card fi-card--flat",children:[(0,E.jsxs)("h4",{children:["Rule mix ",(0,E.jsx)("span",{className:"fi-muted",children:"\u2014 current period, weighted points"})]}),(0,E.jsx)("table",{className:"fi-table fi-table--compact",children:(0,E.jsx)("tbody",{children:b.map(m=>(0,E.jsxs)("tr",{children:[(0,E.jsxs)("td",{children:[m.name,(0,E.jsxs)("span",{className:"fi-muted",children:[" \xB7 ",m.points," pt"]})]}),(0,E.jsx)("td",{style:{width:"40%"},children:(0,E.jsx)(go,{value:m.currentPoints,max:f,label:m.currentPoints.toLocaleString(),tone:m.currentPoints>0?"warn":"neutral"})}),(0,E.jsxs)("td",{className:"fi-right",children:[m.current,(0,E.jsxs)("span",{className:"fi-muted",children:[" / ",m.previous]})]}),(0,E.jsx)("td",{className:"fi-right",children:(0,E.jsx)(zn,{pct:m.trend})})]},m.id))})})]}),(0,E.jsxs)("section",{className:"fi-card fi-card--flat",children:[(0,E.jsxs)("h4",{children:["Events \u2014 ",d===s-1?"current period":`period starting ${p.label}`," ",(0,E.jsxs)("span",{className:"fi-muted",children:["(",C.length,")"]})]}),(0,E.jsx)("div",{className:"fi-chips",children:Object.entries(c).map(([m,z])=>(0,E.jsxs)("span",{className:"fi-chip",children:[(v.get(m)||{}).name||m,": ",z]},m))}),(0,E.jsxs)("div",{className:"fi-table-wrap fi-table-wrap--scroll",children:[(0,E.jsxs)("table",{className:"fi-table fi-table--compact",children:[(0,E.jsx)("thead",{children:(0,E.jsxs)("tr",{children:[(0,E.jsx)("th",{children:"When"}),(0,E.jsx)("th",{children:"Rule"}),e==="vehicle"?(0,E.jsx)("th",{children:"Driver"}):(0,E.jsx)("th",{children:"Vehicle"}),(0,E.jsx)("th",{className:"fi-right",children:"Duration"}),(0,E.jsx)("th",{className:"fi-right",children:"Distance"})]})}),(0,E.jsxs)("tbody",{children:[C.slice(0,500).map(m=>(0,E.jsxs)("tr",{children:[(0,E.jsx)("td",{children:Nv(m.activeFrom)}),(0,E.jsx)("td",{children:(v.get(m.rule.id)||{}).name||m.rule.id}),(0,E.jsx)("td",{children:e==="vehicle"?m.driver&&m.driver.id&&i.driversById.get(m.driver.id)?mo(i.driversById.get(m.driver.id)):(0,E.jsx)("span",{className:"fi-muted",children:"\u2014"}):(i.devicesById.get(m.device&&m.device.id)||{}).name||"\u2014"}),(0,E.jsx)("td",{className:"fi-right",children:Ev(m.duration)}),(0,E.jsx)("td",{className:"fi-right",children:m.distance!=null?vn(Number(m.distance)/1e3,n.unit,!0):"\u2014"})]},m.id||`${m.activeFrom}-${m.rule.id}`)),C.length===0&&(0,E.jsx)("tr",{children:(0,E.jsx)("td",{colSpan:5,className:"fi-empty",children:"No tracked events in this period."})})]})]}),C.length>500&&(0,E.jsxs)("p",{className:"fi-muted",children:["Showing the first 500 of ",C.length,"."]})]})]})]})})}function bd({title:e,value:t,sub:n,badge:r,trend:o}){return(0,E.jsxs)("div",{className:"fi-kpi fi-kpi--mini",children:[(0,E.jsx)("div",{className:"fi-kpi-title",children:e}),(0,E.jsxs)("div",{className:"fi-kpi-value",children:[t,r?(0,E.jsx)("span",{className:"fi-kpi-badge",children:r}):null]}),(0,E.jsxs)("div",{className:"fi-kpi-foot",children:[(0,E.jsx)("span",{className:"fi-muted",children:n}),o!==void 0&&(0,E.jsx)(zn,{pct:o})]})]})}function Nv(e){return new Date(e).toLocaleString(void 0,{month:"short",day:"2-digit",hour:"numeric",minute:"2-digit"})}function Ev(e){if(!e)return"\u2014";let t=String(e).match(/^(?:(\d+)\.)?(\d{1,2}):(\d{2}):(\d{2})/);if(!t)return String(e);let n=Number(t[1]||0)*86400+Number(t[2])*3600+Number(t[3])*60+Number(t[4]);return n<60?`${n}s`:n<3600?`${Math.floor(n/60)}m ${n%60}s`:`${Math.floor(n/3600)}h ${Math.floor(n%3600/60)}m`}function jv(e,t,n){let r=`${window.location.origin}/${e.database}/`,o=new Date(n.start).toISOString(),i=new Date(n.end).toISOString();return`${r}#tripsHistory,dateRange:(endDate:'${i}',startDate:'${o}'),devices:!(${t})`}var N=F(R(),1);function Rm({config:e,periods:t,refData:n,data:r,nodeId:o,setNodeId:i,session:a}){let[l,s]=(0,ze.useState)("groups"),[d,g]=(0,ze.useState)(null),u=t.length,h=po(e),x=t.map(_=>_.label),b=(0,ze.useMemo)(()=>zm(o,n.tree,n.devices),[o,n]),v=(0,ze.useMemo)(()=>new Set(b.map(_=>_.id)),[b]),C=(0,ze.useMemo)(()=>wa(b.map(_=>r.byDevice.get(_.id)).filter(Boolean),u),[b,r,u]),f=(0,ze.useMemo)(()=>Xt(C,e),[C,e]),p=(0,ze.useMemo)(()=>Ca(C,e),[C,e]),c=(0,ze.useMemo)(()=>b.map(_=>{let ee=r.byDevice.get(_.id);return{id:_.id,name:_.name||_.serialNumber||_.id,kind:"vehicle",series:ee,...Xt(ee,e)}}),[b,r,e]),m=(0,ze.useMemo)(()=>hd(c.map(_=>_.current)),[c]),z=(0,ze.useMemo)(()=>hd(c.map(_=>_.previous)),[c]),w=(0,ze.useMemo)(()=>vm({nodeId:o,tree:n.tree,devices:b,byDevice:r.byDevice,config:e,nPeriods:u}),[o,n,b,r,e,u]),D=(0,ze.useMemo)(()=>{let _=new Set;for(let ue of r.exceptions)ue.driver&&v.has(ue.device&&ue.device.id)&&_.add(ue.driver.id);for(let ue of r.trips)ue.driver&&v.has(ue.device&&ue.device.id)&&_.add(ue.driver.id);let ee=[];for(let ue of _){let dr=r.byDriver.get(ue);dr&&ee.push({id:ue,name:mo(n.driversById.get(ue))||ue,kind:"driver",series:dr,...Xt(dr,e)})}return ee},[r,v,n,e]),S=(0,ze.useMemo)(()=>_m(o,n.tree),[o,n]),I=l==="groups"?w:l==="vehicles"?c:D,M=Math.max(0,...I.map(_=>_.current||0)),le=(0,ze.useMemo)(()=>[{key:"name",label:l==="groups"?"Group":l==="vehicles"?"Vehicle":"Driver",sort:_=>_.name,render:_=>(0,N.jsxs)("span",{className:_.kind==="group"?"fi-link":"",children:[_.name,_.kind==="group"&&_.vehicles!=null?(0,N.jsxs)("span",{className:"fi-muted",children:[" \xB7 ",_.vehicles," veh"]}):null]})},{key:"current",label:`Score (${h})`,sort:_=>_.current,width:"26%",render:_=>(0,N.jsx)(go,{value:_.current,max:M,label:Ae(_.current),tone:Dv(_.band)})},{key:"trend",label:"Trend",sort:_=>_.trend,align:"right",render:_=>(0,N.jsx)(zn,{pct:_.trend})},{key:"currentEvents",label:"Events",sort:_=>_.currentEvents,align:"right",render:_=>_.currentEvents.toLocaleString()},{key:"currentDistanceKm",label:"Distance",sort:_=>_.currentDistanceKm,align:"right",csv:_=>Math.round(_.currentDistanceKm),render:_=>vn(_.currentDistanceKm,e.unit)},{key:"band",label:"Risk",sort:_=>{var ee;return(ee={Low:0,Medium:1,High:2}[_.band])!=null?ee:3},render:_=>(0,N.jsx)(ho,{band:_.band})},{key:"spark",label:`Last ${u}`,sort:_=>_.totalPoints,csv:_=>_.scores.map(Ae).join(" | "),render:_=>(0,N.jsx)(Pm,{values:_.scores})}],[l,h,M,e.unit,u]),qe=_=>{_.kind==="group"?i(_.id):_.kind==="direct"?s("vehicles"):g({kind:_.kind,id:_.id})},Ce=()=>{let _=`fleet-insights_${l}_${new Date().toISOString().slice(0,10)}.csv`;Tm(_,Im(le.filter(ee=>ee.key!=="spark").concat([{key:"spark",label:"Scores (oldest\u2192current)",csv:ee=>ee.scores.map(Ae).join(" | ")}]),I))},ht=Math.max(0,...p.map(_=>_.currentPoints));return(0,N.jsxs)("div",{className:"fi-dash",children:[(0,N.jsxs)("section",{className:"fi-kpis",children:[(0,N.jsx)(Da,{title:`${S[S.length-1].name} score`,value:Ae(f.current),sub:h,trend:f.trend,badge:(0,N.jsx)(ho,{band:gd(f.current,e)})}),(0,N.jsx)(Da,{title:"Median vehicle score",value:Ae(m),sub:`${c.length.toLocaleString()} vehicles`,trend:zd(m,z)}),(0,N.jsx)(Da,{title:"Events this period",value:f.currentEvents.toLocaleString(),sub:`${f.currentPoints.toLocaleString()} points`,trend:zd(f.currentEvents,Object.values(C.counts[u-2]||{}).reduce((_,ee)=>_+ee,0))}),(0,N.jsx)(Da,{title:"Distance this period",value:vn(f.currentDistanceKm,e.unit),sub:`period: ${Pa(e)}`,trend:zd(f.currentDistanceKm,C.distanceKm[u-2]),invert:!0})]}),(0,N.jsxs)("section",{className:"fi-card",children:[(0,N.jsx)("header",{className:"fi-card-head",children:(0,N.jsxs)("div",{children:[(0,N.jsx)("h3",{children:"Score trend"}),(0,N.jsxs)("p",{className:"fi-muted",children:["Weighted unsafe points per ",Pa(e),", last ",u," periods. Lower is better."]})]})}),(0,N.jsx)(ja,{values:co(C,e),labels:x,unitLabel:h,height:200})]}),(0,N.jsxs)("div",{className:"fi-grid-2",children:[(0,N.jsxs)("section",{className:"fi-card",children:[(0,N.jsxs)("header",{className:"fi-card-head",children:[(0,N.jsxs)("div",{children:[(0,N.jsx)("h3",{children:"Performance"}),(0,N.jsxs)("nav",{className:"fi-crumbs","aria-label":"Group path",children:[S.map((_,ee)=>(0,N.jsxs)("span",{children:[ee>0&&(0,N.jsx)("span",{className:"fi-crumb-sep",children:"/"}),ee<S.length-1?(0,N.jsx)("button",{className:"fi-crumb",onClick:()=>i(_.id),children:_.name}):(0,N.jsx)("span",{className:"fi-crumb fi-crumb--current",children:_.name})]},_.id)),o!==Yt&&(0,N.jsx)("button",{className:"fi-crumb fi-crumb--reset",onClick:()=>i(Yt),children:"Reset"})]})]}),(0,N.jsxs)("div",{className:"fi-actions",children:[(0,N.jsx)("div",{className:"fi-tabs",role:"tablist",children:[["groups",`Groups (${w.length})`],["vehicles",`Vehicles (${c.length})`],["drivers",`Drivers (${D.length})`]].map(([_,ee])=>(0,N.jsx)("button",{role:"tab","aria-selected":l===_,className:`fi-tab ${l===_?"fi-tab--on":""}`,onClick:()=>s(_),children:ee},_))}),(0,N.jsx)(Om.Button,{type:"tertiary",onClick:Ce,children:"Export CSV"})]})]}),(0,N.jsx)("div",{className:"fi-perf",children:(0,N.jsx)(Mm,{columns:le,rows:I,defaultSort:"current",onRowClick:qe,emptyText:l==="groups"?"No child groups here \u2014 switch to Vehicles.":"Nothing in scope for this period."})})]}),(0,N.jsxs)("section",{className:"fi-card",children:[(0,N.jsx)("header",{className:"fi-card-head",children:(0,N.jsxs)("div",{children:[(0,N.jsx)("h3",{children:"Event performance"}),(0,N.jsx)("p",{className:"fi-muted",children:"Tracked rules, current period vs previous. Bar = weighted points."})]})}),(0,N.jsxs)("table",{className:"fi-table fi-table--compact",children:[(0,N.jsx)("thead",{children:(0,N.jsxs)("tr",{children:[(0,N.jsx)("th",{children:"Rule"}),(0,N.jsx)("th",{style:{width:"40%"},children:"Points"}),(0,N.jsx)("th",{className:"fi-right",children:"Events"}),(0,N.jsx)("th",{className:"fi-right",children:"Trend"})]})}),(0,N.jsxs)("tbody",{children:[p.map(_=>(0,N.jsxs)("tr",{children:[(0,N.jsxs)("td",{children:[_.name,(0,N.jsxs)("span",{className:"fi-muted",children:[" \xB7 ",_.points," pt"]})]}),(0,N.jsx)("td",{children:(0,N.jsx)(go,{value:_.currentPoints,max:ht,label:_.currentPoints.toLocaleString(),tone:Pv(_.currentPoints,ht)})}),(0,N.jsxs)("td",{className:"fi-right",children:[_.current.toLocaleString(),(0,N.jsxs)("span",{className:"fi-muted",children:[" / ",_.previous.toLocaleString()]})]}),(0,N.jsx)("td",{className:"fi-right",children:(0,N.jsx)(zn,{pct:_.trend})})]},_.id)),p.length===0&&(0,N.jsx)("tr",{children:(0,N.jsx)("td",{colSpan:4,className:"fi-empty",children:"No rules tracked yet \u2014 open Settings."})})]})]})]})]}),d&&(0,N.jsx)(Lm,{kind:d.kind,id:d.id,config:e,periods:t,data:r,refData:n,session:a,onClose:()=>g(null)})]})}function Da({title:e,value:t,sub:n,trend:r,invert:o=!1,badge:i}){return(0,N.jsxs)("div",{className:"fi-kpi",children:[(0,N.jsx)("div",{className:"fi-kpi-title",children:e}),(0,N.jsxs)("div",{className:"fi-kpi-value",children:[t,i?(0,N.jsx)("span",{className:"fi-kpi-badge",children:i}):null]}),(0,N.jsxs)("div",{className:"fi-kpi-foot",children:[(0,N.jsx)("span",{className:"fi-muted",children:n}),(0,N.jsx)(zn,{pct:r,invert:o})]})]})}function zd(e,t){return e==null||t==null?null:t===0?e===0?0:null:(e-t)/t*100}function Pa(e){return e.period==="day"?"day":e.period==="month"?"30 days":"week"}function Dv(e){return e==="Low"?"ok":e==="Medium"?"warn":e==="High"?"bad":"neutral"}function Pv(e,t){if(!t||e<=0)return"neutral";let n=e/t;return n>=.66?"bad":n>=.33?"warn":"ok"}var _n=F(O(),1),bo=F(xn(),1),_d=F(fd(),1);var k=F(R(),1),Bm=[[/phone|cell|handheld|mobile/i,10],[/distract/i,8],[/seat ?belt/i,6],[/following|tailgat|headway/i,5],[/speed/i,4],[/harsh brak|hard brak/i,3],[/harsh corner|hard corner/i,3],[/harsh accel|hard accel|aggressive/i,2],[/lens|obstruct|camera cover|tamper/i,5],[/smok|vap/i,4],[/drows|fatigue|yawn/i,8],[/collision|crash|accident|impact/i,25],[/stop sign|rolling stop/i,4],[/lane/i,3]];function Um({config:e,rules:t,onSave:n,onCancel:r,saving:o,saveInfo:i}){let[a,l]=(0,_n.useState)(()=>JSON.parse(JSON.stringify(e))),[s,d]=(0,_n.useState)(""),[g,u]=(0,_n.useState)(null),h=(0,_n.useMemo)(()=>new Map(a.rules.map(c=>[c.id,c])),[a.rules]),x=(0,_n.useMemo)(()=>{let c=s.trim().toLowerCase();return t.filter(m=>!c||String(m.name).toLowerCase().includes(c))},[t,s]),b=c=>{h.has(c.id)?l({...a,rules:a.rules.filter(m=>m.id!==c.id)}):l({...a,rules:[...a.rules,{id:c.id,name:c.name,points:Fm(c.name)}]})},v=(c,m)=>l({...a,rules:a.rules.map(z=>z.id===c?{...z,points:m}:z)}),C=()=>{let c=t.filter(z=>Bm.some(([w])=>w.test(String(z.name)))&&!/ignore|count/i.test(z.id)),m=new Map(a.rules.map(z=>[z.id,z]));for(let z of c)m.has(z.id)||m.set(z.id,{id:z.id,name:z.name,points:Fm(z.name)});l({...a,rules:[...m.values()]})},f=()=>{let c=bn(a);if(!c.rules.length){u("Pick at least one rule to track.");return}if(c.rules.some(m=>!(m.points>0))){u("Every tracked rule needs points greater than zero.");return}u(null),n(c)},p=a.rules.reduce((c,m)=>c+(Number(m.points)||0),0);return(0,k.jsxs)("div",{className:"fi-settings",children:[(0,k.jsxs)("header",{className:"fi-card-head",children:[(0,k.jsxs)("div",{children:[(0,k.jsx)("h3",{children:"Scoring settings"}),(0,k.jsx)("p",{className:"fi-muted",children:"Choose the exception rules to track and how many unsafe points each event is worth. Settings are saved to this database (AddInData) so everyone sees the same score."})]}),(0,k.jsxs)("div",{className:"fi-actions",children:[(0,k.jsx)(bo.Button,{type:"tertiary",onClick:r,disabled:o,children:"Cancel"}),(0,k.jsx)(bo.Button,{type:"primary",onClick:f,disabled:o,children:o?"Saving\u2026":"Save settings"})]})]}),g&&(0,k.jsx)(_d.Banner,{type:"error",onClose:()=>u(null),children:g}),i&&(0,k.jsx)(_d.Banner,{type:i.type||"info",children:i.text}),(0,k.jsxs)("div",{className:"fi-grid-2 fi-grid-2--settings",children:[(0,k.jsxs)("section",{className:"fi-card fi-card--flat",children:[(0,k.jsxs)("div",{className:"fi-card-head fi-card-head--tight",children:[(0,k.jsxs)("h4",{children:["Tracked rules ",(0,k.jsxs)("span",{className:"fi-muted",children:["(",a.rules.length," selected \xB7 ",p," pts if one of each)"]})]}),(0,k.jsxs)("div",{className:"fi-actions",children:[(0,k.jsx)(bo.Button,{type:"tertiary",onClick:C,children:"Suggest safety rules"}),(0,k.jsx)(bo.Button,{type:"tertiary",onClick:()=>l({...a,rules:[]}),disabled:!a.rules.length,children:"Clear"})]})]}),a.rules.length>0&&(0,k.jsxs)("table",{className:"fi-table fi-table--compact",children:[(0,k.jsx)("thead",{children:(0,k.jsxs)("tr",{children:[(0,k.jsx)("th",{children:"Rule"}),(0,k.jsx)("th",{className:"fi-right",style:{width:120},children:"Points / event"}),(0,k.jsx)("th",{style:{width:70}})]})}),(0,k.jsx)("tbody",{children:a.rules.map(c=>(0,k.jsxs)("tr",{children:[(0,k.jsx)("td",{children:c.name}),(0,k.jsx)("td",{className:"fi-right",children:(0,k.jsx)("input",{className:"fi-input fi-input--num",type:"number",min:"0",step:"0.5",value:c.points,onChange:m=>v(c.id,m.target.value)})}),(0,k.jsx)("td",{className:"fi-right",children:(0,k.jsx)("button",{className:"fi-linkbtn",onClick:()=>b(c),children:"Remove"})})]},c.id))})]}),(0,k.jsxs)("div",{className:"fi-rule-picker",children:[(0,k.jsx)("input",{className:"fi-input",placeholder:`Search ${t.length} rules\u2026`,value:s,onChange:c=>d(c.target.value)}),(0,k.jsxs)("ul",{className:"fi-rule-list",children:[x.map(c=>(0,k.jsx)("li",{children:(0,k.jsxs)("label",{children:[(0,k.jsx)("input",{type:"checkbox",checked:h.has(c.id),onChange:()=>b(c)}),(0,k.jsx)("span",{children:c.name}),c.baseType&&(0,k.jsxs)("span",{className:"fi-muted fi-small",children:[" ",Mv(c.baseType)]})]})},c.id)),x.length===0&&(0,k.jsx)("li",{className:"fi-muted",children:"No rules match."})]})]})]}),(0,k.jsxs)("section",{className:"fi-card fi-card--flat",children:[(0,k.jsx)("h4",{children:"Scoring"}),(0,k.jsxs)("div",{className:"fi-form",children:[(0,k.jsxs)("label",{className:"fi-field",children:[(0,k.jsx)("span",{children:"Period"}),(0,k.jsxs)("select",{className:"fi-input",value:a.period,onChange:c=>l({...a,period:c.target.value}),children:[(0,k.jsx)("option",{value:"day",children:"Daily"}),(0,k.jsx)("option",{value:"week",children:"Weekly (trailing 7 days)"}),(0,k.jsx)("option",{value:"month",children:"Monthly (trailing 30 days)"})]})]}),(0,k.jsxs)("label",{className:"fi-field",children:[(0,k.jsx)("span",{children:"Periods shown"}),(0,k.jsx)("input",{className:"fi-input fi-input--num",type:"number",min:"2",max:"26",value:a.periods,onChange:c=>l({...a,periods:c.target.value})})]}),(0,k.jsxs)("label",{className:"fi-field",children:[(0,k.jsx)("span",{children:"Normalize by"}),(0,k.jsxs)("select",{className:"fi-input",value:a.normalization,onChange:c=>{let m=c.target.value,z=Sa(a.normalization),w=Number(a.bands.low)!==z.low||Number(a.bands.medium)!==z.medium;l({...a,normalization:m,bands:w?a.bands:Sa(m)})},children:[(0,k.jsx)("option",{value:"none",children:"Nothing \u2014 raw unsafe points"}),(0,k.jsx)("option",{value:"per100mi",children:"Distance \u2014 points per 100 miles"}),(0,k.jsx)("option",{value:"per1000km",children:"Distance \u2014 points per 1,000 km"})]})]}),(0,k.jsxs)("label",{className:"fi-field",children:[(0,k.jsx)("span",{children:"Distance unit"}),(0,k.jsxs)("select",{className:"fi-input",value:a.unit,onChange:c=>l({...a,unit:c.target.value}),children:[(0,k.jsx)("option",{value:"miles",children:"Miles"}),(0,k.jsx)("option",{value:"km",children:"Kilometres"})]})]}),(0,k.jsxs)("div",{className:"fi-field",children:[(0,k.jsx)("span",{children:"Risk bands (per vehicle / driver / group score)"}),(0,k.jsxs)("div",{className:"fi-bands",children:[(0,k.jsxs)("label",{children:["Low \u2264 ",(0,k.jsx)("input",{className:"fi-input fi-input--num",type:"number",min:"0",value:a.bands.low,onChange:c=>l({...a,bands:{...a.bands,low:c.target.value}})})]}),(0,k.jsxs)("label",{children:["Medium \u2264 ",(0,k.jsx)("input",{className:"fi-input fi-input--num",type:"number",min:"0",value:a.bands.medium,onChange:c=>l({...a,bands:{...a.bands,medium:c.target.value}})})]}),(0,k.jsx)("span",{className:"fi-muted",children:"above Medium = High"})]})]})]}),(0,k.jsxs)("div",{className:"fi-formula",children:[(0,k.jsx)("h5",{children:"How the score is calculated"}),(0,k.jsxs)("code",{children:["score = \u03A3 (events of rule \xD7 points of rule)",a.normalization==="per100mi"?" \xF7 miles \xD7 100":a.normalization==="per1000km"?" \xF7 km \xD7 1,000":""]}),(0,k.jsxs)("p",{className:"fi-muted",children:["Lower is better. Trend compares the current period with the one before it. Distance comes from MyGeotab trips in the same period",a.normalization==="none"?" (shown for context only)":"","."]})]})]})]})]})}function Fm(e){for(let[t,n]of Bm)if(t.test(String(e)))return n;return 1}function Mv(e){return e==="Custom"?"":`(${e})`}var K=F(R(),1);function Sd({api:e,groupFilter:t,focusNonce:n}){let[r,o]=(0,Q.useState)(null),[i,a]=(0,Q.useState)(null),[l,s]=(0,Q.useState)({recordId:null,source:"default",serverOk:!0}),[d,g]=(0,Q.useState)(null),[u,h]=(0,Q.useState)(null),[x,b]=(0,Q.useState)("dashboard"),[v,C]=(0,Q.useState)(Yt),[f,p]=(0,Q.useState)(!1),[c,m]=(0,Q.useState)(""),[z,w]=(0,Q.useState)(null),[D,S]=(0,Q.useState)(!1),[I,M]=(0,Q.useState)(null),[le,qe]=(0,Q.useState)(null),Ce=(0,Q.useRef)(0),ht=JSON.stringify((t||[]).map(ne=>ne.id).sort());(0,Q.useEffect)(()=>{let ne=!1;return(async()=>{try{let X=await new Promise(Zt=>e.getSession(lt=>Zt(lt)));if(ne)return;o(X);let Te=await Em(e,X.database);if(ne)return;a(Te.config),s({recordId:Te.recordId,source:Te.source,serverOk:Te.serverOk}),Te.config.rules.length||b("settings")}catch(X){ne||w(sr(X))}})(),()=>{ne=!0}},[e]),(0,Q.useEffect)(()=>{let ne=!1;return g(null),(async()=>{try{m("Loading vehicles, groups and rules\u2026");let X=await wm(e,t);if(ne)return;let Te=bm(X.groups);g({...X,tree:Te,devicesById:new Map(X.devices.map(lt=>[lt.id,lt])),driversById:new Map(X.drivers.map(lt=>[lt.id,lt]))});let Zt=t&&t.length===1?t[0].id:Yt;C(Te.byId.has(Zt)?Zt:Yt)}catch(X){ne||w(sr(X))}finally{ne||m("")}})(),()=>{ne=!0}},[e,ht,n]);let _=(0,Q.useMemo)(()=>i?mm(new Date,i.period,i.periods):[],[i]),ee=(0,Q.useCallback)(async()=>{if(!i||!d||!i.rules.length)return;let ne=++Ce.current;p(!0),w(null);try{let X=_[0].start,Te=_[_.length-1].end,Zt=(cr,Xm,Ym)=>{Ce.current===ne&&m(`${cr}: ${Xm}/${Ym} windows`)},[lt,Cd]=await Promise.all([Sm(e,{ruleIds:i.rules.map(cr=>cr.id),from:X,to:Te,groupFilter:t,onProgress:Zt}),Cm(e,{from:X,to:Te,groupFilter:t,deviceCount:d.devices.length,onProgress:Zt})]);if(Ce.current!==ne)return;let Gm=new Set(d.devices.map(cr=>cr.id)),Qm=xm({periods:_,config:i,exceptions:lt,trips:Cd,deviceIds:Gm});h({...Qm,exceptions:lt,trips:Cd}),qe(new Date)}catch(X){Ce.current===ne&&w(sr(X))}finally{Ce.current===ne&&(p(!1),m(""))}},[e,i,d,_,t]),ue=i?JSON.stringify([i.rules.map(ne=>ne.id),i.period,i.periods]):"";(0,Q.useEffect)(()=>{ee()},[ue,d]);let dr=async ne=>{S(!0),M(null);try{let X=await jm(e,r.database,ne,l.recordId);a(bn(ne)),s(Te=>({...Te,recordId:X.recordId,source:X.persisted})),X.persisted==="browser"?M({type:"warning",text:`Saved in this browser only \u2014 the database rejected the write (${X.error}). Users need the AddInData clearance for shared settings.`}):b("dashboard")}catch(X){M({type:"error",text:sr(X)})}finally{S(!1)}},Km=_.length?`${new Date(_[0].start).toLocaleDateString()} \u2013 ${new Date(_[_.length-1].end).toLocaleDateString()}`:"";return(0,K.jsxs)("div",{className:"fi-root",children:[(0,K.jsxs)("header",{className:"fi-header",children:[(0,K.jsxs)("div",{children:[(0,K.jsxs)("h2",{className:"fi-title",children:["Fleet Insights ",(0,K.jsx)("span",{className:"fi-byline",children:"by GPSFMS"})]}),(0,K.jsxs)("div",{className:"fi-sub",children:[i&&(0,K.jsxs)("span",{children:[i.periods," \xD7 ",Pa(i)," \xB7 ",Km]}),le&&(0,K.jsxs)("span",{className:"fi-muted",children:[" \xB7 updated ",le.toLocaleTimeString()]}),l.source==="browser"&&(0,K.jsx)("span",{className:"fi-muted",children:" \xB7 settings saved in this browser only"})]})]}),(0,K.jsxs)("div",{className:"fi-actions",children:[x==="dashboard"&&(0,K.jsx)(yd.Button,{type:"secondary",onClick:ee,disabled:f||!i||!i.rules.length,children:"Refresh"}),x==="dashboard"?(0,K.jsx)(yd.Button,{type:"primary",onClick:()=>{M(null),b("settings")},disabled:!i||!d,children:"Settings"}):null]})]}),z&&(0,K.jsx)(wd.Banner,{type:"error",header:"Something went wrong",multiline:!0,onClose:()=>w(null),children:z}),!l.serverOk&&x==="dashboard"&&(0,K.jsxs)(wd.Banner,{type:"info",children:["Shared settings could not be read from the database; using ",l.source," settings."]}),(!i||!d)&&!z&&(0,K.jsx)(kd.Waiting,{isLoading:!0,description:c||"Loading\u2026"}),i&&d&&x==="settings"&&(0,K.jsx)(Um,{config:i,rules:d.rules,onSave:dr,saving:D,saveInfo:I,onCancel:()=>{i.rules.length&&b("dashboard")}}),i&&d&&x==="dashboard"&&(i.rules.length===0?(0,K.jsx)($m.EmptyState,{description:"No rules are being tracked yet. Open Settings to choose the exception rules and their point values."}):f&&!u?(0,K.jsx)(kd.Waiting,{isLoading:!0,description:c||"Loading events and trips\u2026"}):u?(0,K.jsxs)(K.Fragment,{children:[f&&(0,K.jsx)("div",{className:"fi-progress",children:c||"Refreshing\u2026"}),(0,K.jsx)(Rm,{config:i,periods:_,refData:d,data:u,nodeId:v,setNodeId:C,session:r})]}):null)]})}var Am=`






/*
* Roboto Mono: https://fonts.google.com/specimen/Roboto+Mono
*/

/*
 * Noto Sans Arabic https://fonts.google.com/noto/specimen/Noto+Sans+Arabic
 */




:root {
  --main-font: Roboto, "Segoe UI", Segoe, "Helvetica Neue", Helvetica, sans-serif;
  --main-font-data: "Roboto Mono", "Segoe UI", Segoe, "Helvetica Neue", Helvetica, sans-serif;
  --data-font-drive: "Roboto Mono", "Segoe UI", Segoe, "Helvetica Neue", Helvetica, sans-serif;
  --arabic-font-family: "Noto Sans Arabic", Roboto, "Segoe UI", Segoe, "Helvetica Neue", Helvetica, sans-serif;
}
.label-01,
.body-label-400 {
  font-family: var(--main-font);
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.32px;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .label-01,
html:lang(ar) .body-label-400 {
  font-family: var(--arabic-font-family);
}
.label-01-tablet-drive,
.tablet-label-400-drive {
  font-family: var(--main-font);
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.32px;
  line-height: 18px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .label-01-tablet-drive,
html:lang(ar) .tablet-label-400-drive {
  font-family: var(--arabic-font-family);
}
.label-01-mobile-drive,
.mobile-label-400-drive {
  font-family: var(--main-font);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.32px;
  line-height: 18px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .label-01-mobile-drive,
html:lang(ar) .mobile-label-400-drive {
  font-family: var(--arabic-font-family);
}
@media (max-width: 640px) {
  .tablet-label-400-drive {
    font-family: var(--main-font);
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    letter-spacing: 0.32px;
    line-height: 18px;
    text-transform: none;
    text-decoration: none;
  }
  html:lang(ar) .tablet-label-400-drive {
    font-family: var(--arabic-font-family);
  }
}
.body-01,
.body-l-400 {
  font-family: var(--main-font);
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 24px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .body-01,
html:lang(ar) .body-l-400 {
  font-family: var(--arabic-font-family);
}
.body-02-short,
.body-m-400-short {
  font-family: var(--main-font);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .body-02-short,
html:lang(ar) .body-m-400-short {
  font-family: var(--arabic-font-family);
}
.body-02-tall,
.body-m-400-tall {
  font-family: var(--main-font);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 28px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .body-02-tall,
html:lang(ar) .body-m-400-tall {
  font-family: var(--arabic-font-family);
}
.body-03,
.body-s-700 {
  font-family: var(--main-font);
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  letter-spacing: 0.32px;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .body-03,
html:lang(ar) .body-s-700 {
  font-family: var(--arabic-font-family);
}
.body-04,
.body-s-400 {
  font-family: var(--main-font);
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.32px;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .body-04,
html:lang(ar) .body-s-400 {
  font-family: var(--arabic-font-family);
}
.body-05,
.body-s-400-italic {
  font-family: var(--main-font);
  font-size: 12px;
  font-style: italic;
  font-weight: 400;
  letter-spacing: 0.32px;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .body-05,
html:lang(ar) .body-s-400-italic {
  font-family: var(--arabic-font-family);
}
.body-01-tablet-drive,
.tablet-body-l-400-drive {
  font-family: var(--main-font);
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 30px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .body-01-tablet-drive,
html:lang(ar) .tablet-body-l-400-drive {
  font-family: var(--arabic-font-family);
}
.body-01-mobile-drive,
.mobile-body-l-400-drive {
  font-family: var(--main-font);
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 28px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .body-01-mobile-drive,
html:lang(ar) .mobile-body-l-400-drive {
  font-family: var(--arabic-font-family);
}
@media (max-width: 640px) {
  .tablet-body-l-400-drive {
    font-family: var(--main-font);
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    letter-spacing: 0;
    line-height: 28px;
    text-transform: none;
    text-decoration: none;
  }
  html:lang(ar) .tablet-body-l-400-drive {
    font-family: var(--arabic-font-family);
  }
}
.body-02-short-tablet-drive,
.tablet-body-m-400-short-drive {
  font-family: var(--main-font);
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 22px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .body-02-short-tablet-drive,
html:lang(ar) .tablet-body-m-400-short-drive {
  font-family: var(--arabic-font-family);
}
.body-02-short-mobile-drive,
.mobile-body-m-400-short-drive {
  font-family: var(--main-font);
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 20px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .body-02-short-mobile-drive,
html:lang(ar) .mobile-body-m-400-short-drive {
  font-family: var(--arabic-font-family);
}
@media (max-width: 640px) {
  .tablet-body-m-400-short-drive {
    font-family: var(--main-font);
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    letter-spacing: 0;
    line-height: 20px;
    text-transform: none;
    text-decoration: none;
  }
  html:lang(ar) .tablet-body-m-400-short-drive {
    font-family: var(--arabic-font-family);
  }
}
.body-02-tall-tablet-drive,
.tablet-body-m-400-tall-drive {
  font-family: var(--main-font);
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 28px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .body-02-tall-tablet-drive,
html:lang(ar) .tablet-body-m-400-tall-drive {
  font-family: var(--arabic-font-family);
}
.body-02-tall-mobile-drive,
.mobile-body-m-400-tall-drive {
  font-family: var(--main-font);
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 26px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .body-02-tall-mobile-drive,
html:lang(ar) .mobile-body-m-400-tall-drive {
  font-family: var(--arabic-font-family);
}
@media (max-width: 640px) {
  .tablet-body-m-400-tall-drive {
    font-family: var(--main-font);
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    letter-spacing: 0;
    line-height: 26px;
    text-transform: none;
    text-decoration: none;
  }
  html:lang(ar) .tablet-body-m-400-tall-drive {
    font-family: var(--arabic-font-family);
  }
}
.body-03-tablet-drive,
.tablet-body-s-700-drive {
  font-family: var(--main-font);
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  letter-spacing: 0.32px;
  line-height: 22px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .body-03-tablet-drive,
html:lang(ar) .tablet-body-s-700-drive {
  font-family: var(--arabic-font-family);
}
.body-03-mobile-drive,
.mobile-body-s-700-drive {
  font-family: var(--main-font);
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  letter-spacing: 0.32px;
  line-height: 18px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .body-03-mobile-drive,
html:lang(ar) .mobile-body-s-700-drive {
  font-family: var(--arabic-font-family);
}
@media (max-width: 640px) {
  .tablet-body-s-700-drive {
    font-family: var(--main-font);
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    letter-spacing: 0.32px;
    line-height: 18px;
    text-transform: none;
    text-decoration: none;
  }
  html:lang(ar) .tablet-body-s-700-drive {
    font-family: var(--arabic-font-family);
  }
}
.body-04-tablet-drive,
.tablet-body-s-400-drive {
  font-family: var(--main-font);
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.32px;
  line-height: 22px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .body-04-tablet-drive,
html:lang(ar) .tablet-body-s-400-drive {
  font-family: var(--arabic-font-family);
}
.body-04-mobile-drive,
.mobile-body-s-400-drive {
  font-family: var(--main-font);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.32px;
  line-height: 20px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .body-04-mobile-drive,
html:lang(ar) .mobile-body-s-400-drive {
  font-family: var(--arabic-font-family);
}
@media (max-width: 640px) {
  .tablet-body-s-400-drive {
    font-family: var(--main-font);
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    letter-spacing: 0.32px;
    line-height: 20px;
    text-transform: none;
    text-decoration: none;
  }
  html:lang(ar) .tablet-body-s-400-drive {
    font-family: var(--arabic-font-family);
  }
}
.body-05-tablet-drive,
.tablet-body-s-400-italic-drive {
  font-family: var(--main-font);
  font-size: 16px;
  font-style: italic;
  font-weight: 400;
  letter-spacing: 0.32px;
  line-height: 20px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .body-05-tablet-drive,
html:lang(ar) .tablet-body-s-400-italic-drive {
  font-family: var(--arabic-font-family);
}
.body-05-mobile-drive,
.mobile-body-s-400-italic-drive {
  font-family: var(--main-font);
  font-size: 14px;
  font-style: italic;
  font-weight: 400;
  letter-spacing: 0.32px;
  line-height: 18px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .body-05-mobile-drive,
html:lang(ar) .mobile-body-s-400-italic-drive {
  font-family: var(--arabic-font-family);
}
@media (max-width: 640px) {
  .tablet-body-s-400-italic-drive {
    font-family: var(--main-font);
    font-size: 14px;
    font-style: italic;
    font-weight: 400;
    letter-spacing: 0.32px;
    line-height: 18px;
    text-transform: none;
    text-decoration: none;
  }
  html:lang(ar) .tablet-body-s-400-italic-drive {
    font-family: var(--arabic-font-family);
  }
}
.heading-01-desktop,
.heading-xl-300 {
  font-family: var(--main-font);
  font-size: 28px;
  font-style: normal;
  font-weight: 300;
  letter-spacing: 0;
  line-height: 36px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .heading-01-desktop,
html:lang(ar) .heading-xl-300 {
  font-family: var(--arabic-font-family);
}
.heading-01-mobile,
.heading-xl-300-mobile {
  font-family: var(--main-font);
  font-size: 20px;
  font-style: normal;
  font-weight: 300;
  letter-spacing: 0;
  line-height: 36px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .heading-01-mobile,
html:lang(ar) .heading-xl-300-mobile {
  font-family: var(--arabic-font-family);
}
@media (max-width: 640px) {
  .heading-xl-300 {
    font-family: var(--main-font);
    font-size: 20px;
    font-style: normal;
    font-weight: 300;
    letter-spacing: 0;
    line-height: 36px;
    text-transform: none;
    text-decoration: none;
  }
  html:lang(ar) .heading-xl-300 {
    font-family: var(--arabic-font-family);
  }
}
.heading-02,
.heading-l-400 {
  font-family: var(--main-font);
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 24px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .heading-02,
html:lang(ar) .heading-l-400 {
  font-family: var(--arabic-font-family);
}
.heading-03-desktop,
.heading-m-300 {
  font-family: var(--main-font);
  font-size: 20px;
  font-style: normal;
  font-weight: 300;
  letter-spacing: 0;
  line-height: 28px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .heading-03-desktop,
html:lang(ar) .heading-m-300 {
  font-family: var(--arabic-font-family);
}
.heading-03-mobile,
.heading-m-300-mobile {
  font-family: var(--main-font);
  font-size: 18px;
  font-style: normal;
  font-weight: 300;
  letter-spacing: 0;
  line-height: 28px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .heading-03-mobile,
html:lang(ar) .heading-m-300-mobile {
  font-family: var(--arabic-font-family);
}
@media (max-width: 640px) {
  .heading-m-300 {
    font-family: var(--main-font);
    font-size: 18px;
    font-style: normal;
    font-weight: 300;
    letter-spacing: 0;
    line-height: 28px;
    text-transform: none;
    text-decoration: none;
  }
  html:lang(ar) .heading-m-300 {
    font-family: var(--arabic-font-family);
  }
}
.heading-04,
.heading-s-500 {
  font-family: var(--main-font);
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  letter-spacing: 0;
  line-height: 24px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .heading-04,
html:lang(ar) .heading-s-500 {
  font-family: var(--arabic-font-family);
}
.heading-05,
.heading-xs-500 {
  font-family: var(--main-font);
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  letter-spacing: 0.16px;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .heading-05,
html:lang(ar) .heading-xs-500 {
  font-family: var(--arabic-font-family);
}
.heading-06 {
  font-family: var(--main-font);
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  letter-spacing: 0;
  line-height: 24px;
  text-transform: uppercase;
  text-decoration: none;
}
html:lang(ar) .heading-06 {
  font-family: var(--arabic-font-family);
}
.heading-07,
.heading-xs-300 {
  font-family: var(--main-font);
  font-size: 14px;
  font-style: normal;
  font-weight: 300;
  letter-spacing: 0.16px;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .heading-07,
html:lang(ar) .heading-xs-300 {
  font-family: var(--arabic-font-family);
}
.heading-01-tablet-drive,
.tablet-heading-xl-300-drive {
  font-family: var(--main-font);
  font-size: 26px;
  font-style: normal;
  font-weight: 300;
  letter-spacing: 0;
  line-height: 34px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .heading-01-tablet-drive,
html:lang(ar) .tablet-heading-xl-300-drive {
  font-family: var(--arabic-font-family);
}
.heading-01-mobile-drive,
.mobile-heading-xl-300-drive {
  font-family: var(--main-font);
  font-size: 24px;
  font-style: normal;
  font-weight: 300;
  letter-spacing: 0;
  line-height: 32px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .heading-01-mobile-drive,
html:lang(ar) .mobile-heading-xl-300-drive {
  font-family: var(--arabic-font-family);
}
@media (max-width: 640px) {
  .tablet-heading-xl-300-drive {
    font-family: var(--main-font);
    font-size: 24px;
    font-style: normal;
    font-weight: 300;
    letter-spacing: 0;
    line-height: 32px;
    text-transform: none;
    text-decoration: none;
  }
  html:lang(ar) .tablet-heading-xl-300-drive {
    font-family: var(--arabic-font-family);
  }
}
.heading-02-tablet-drive,
.tablet-heading-l-400-drive {
  font-family: var(--main-font);
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 30px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .heading-02-tablet-drive,
html:lang(ar) .tablet-heading-l-400-drive {
  font-family: var(--arabic-font-family);
}
.heading-02-mobile-drive,
.mobile-heading-l-400-drive {
  font-family: var(--main-font);
  font-size: 22px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 28px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .heading-02-mobile-drive,
html:lang(ar) .mobile-heading-l-400-drive {
  font-family: var(--arabic-font-family);
}
@media (max-width: 640px) {
  .tablet-heading-l-400-drive {
    font-family: var(--main-font);
    font-size: 22px;
    font-style: normal;
    font-weight: 400;
    letter-spacing: 0;
    line-height: 28px;
    text-transform: none;
    text-decoration: none;
  }
  html:lang(ar) .tablet-heading-l-400-drive {
    font-family: var(--arabic-font-family);
  }
}
.heading-03-tablet-drive,
.tablet-heading-m-300-drive {
  font-family: var(--main-font);
  font-size: 20px;
  font-style: normal;
  font-weight: 300;
  letter-spacing: 0;
  line-height: 26px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .heading-03-tablet-drive,
html:lang(ar) .tablet-heading-m-300-drive {
  font-family: var(--arabic-font-family);
}
.heading-03-mobile-drive,
.mobile-heading-m-300-drive {
  font-family: var(--main-font);
  font-size: 18px;
  font-style: normal;
  font-weight: 300;
  letter-spacing: 0;
  line-height: 24px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .heading-03-mobile-drive,
html:lang(ar) .mobile-heading-m-300-drive {
  font-family: var(--arabic-font-family);
}
@media (max-width: 640px) {
  .tablet-heading-m-300-drive {
    font-family: var(--main-font);
    font-size: 18px;
    font-style: normal;
    font-weight: 300;
    letter-spacing: 0;
    line-height: 24px;
    text-transform: none;
    text-decoration: none;
  }
  html:lang(ar) .tablet-heading-m-300-drive {
    font-family: var(--arabic-font-family);
  }
}
.heading-04-tablet-drive,
.tablet-heading-m-500-drive {
  font-family: var(--main-font);
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  letter-spacing: 0;
  line-height: 28px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .heading-04-tablet-drive,
html:lang(ar) .tablet-heading-m-500-drive {
  font-family: var(--arabic-font-family);
}
.heading-04-mobile-drive,
.mobile-heading-m-500-drive {
  font-family: var(--main-font);
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  letter-spacing: 0;
  line-height: 26px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .heading-04-mobile-drive,
html:lang(ar) .mobile-heading-m-500-drive {
  font-family: var(--arabic-font-family);
}
@media (max-width: 640px) {
  .tablet-heading-m-500-drive {
    font-family: var(--main-font);
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    letter-spacing: 0;
    line-height: 26px;
    text-transform: none;
    text-decoration: none;
  }
  html:lang(ar) .tablet-heading-m-500-drive {
    font-family: var(--arabic-font-family);
  }
}
.heading-05-tablet-drive,
.tablet-heading-s-500-drive {
  font-family: var(--main-font);
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  letter-spacing: 0.16px;
  line-height: 22px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .heading-05-tablet-drive,
html:lang(ar) .tablet-heading-s-500-drive {
  font-family: var(--arabic-font-family);
}
.heading-05-mobile-drive,
.mobile-heading-s-500-drive {
  font-family: var(--main-font);
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  letter-spacing: 0.16px;
  line-height: 20px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .heading-05-mobile-drive,
html:lang(ar) .mobile-heading-s-500-drive {
  font-family: var(--arabic-font-family);
}
@media (max-width: 640px) {
  .tablet-heading-s-500-drive {
    font-family: var(--main-font);
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    letter-spacing: 0.16px;
    line-height: 20px;
    text-transform: none;
    text-decoration: none;
  }
  html:lang(ar) .tablet-heading-s-500-drive {
    font-family: var(--arabic-font-family);
  }
}
.heading-06-tablet-drive {
  font-family: var(--main-font);
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  letter-spacing: 0;
  line-height: 22px;
  text-transform: uppercase;
  text-decoration: none;
}
html:lang(ar) .heading-06-tablet-drive {
  font-family: var(--arabic-font-family);
}
.heading-06-mobile-drive {
  font-family: var(--main-font);
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  letter-spacing: 0;
  line-height: 20px;
  text-transform: uppercase;
  text-decoration: none;
}
html:lang(ar) .heading-06-mobile-drive {
  font-family: var(--arabic-font-family);
}
.heading-07-tablet-drive,
.tablet-heading-s-300-drive {
  font-family: var(--main-font);
  font-size: 18px;
  font-style: normal;
  font-weight: 300;
  letter-spacing: 0.16px;
  line-height: 20px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .heading-07-tablet-drive,
html:lang(ar) .tablet-heading-s-300-drive {
  font-family: var(--arabic-font-family);
}
.heading-07-mobile-drive,
.mobile-heading-s-300-drive {
  font-family: var(--main-font);
  font-size: 16px;
  font-style: normal;
  font-weight: 300;
  letter-spacing: 0.16px;
  line-height: 18px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .heading-07-mobile-drive,
html:lang(ar) .mobile-heading-s-300-drive {
  font-family: var(--arabic-font-family);
}
@media (max-width: 640px) {
  .tablet-heading-s-300-drive {
    font-family: var(--main-font);
    font-size: 16px;
    font-style: normal;
    font-weight: 300;
    letter-spacing: 0.16px;
    line-height: 18px;
    text-transform: none;
    text-decoration: none;
  }
  html:lang(ar) .tablet-heading-s-300-drive {
    font-family: var(--arabic-font-family);
  }
}
.data-01,
.data-xxl {
  font-family: var(--main-font-data);
  font-size: 32px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 40px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .data-01,
html:lang(ar) .data-xxl {
  font-family: var(--arabic-font-family);
}
.data-02,
.data-xl {
  font-family: var(--main-font-data);
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 32px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .data-02,
html:lang(ar) .data-xl {
  font-family: var(--arabic-font-family);
}
.data-03,
.data-l {
  font-family: var(--main-font-data);
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 24px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .data-03,
html:lang(ar) .data-l {
  font-family: var(--arabic-font-family);
}
.data-04,
.data-m {
  font-family: var(--main-font-data);
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 21px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .data-04,
html:lang(ar) .data-m {
  font-family: var(--arabic-font-family);
}
.data-05,
.data-s {
  font-family: var(--main-font-data);
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 18px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .data-05,
html:lang(ar) .data-s {
  font-family: var(--arabic-font-family);
}
.data-06,
.data-xs {
  font-family: var(--main-font-data);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .data-06,
html:lang(ar) .data-xs {
  font-family: var(--arabic-font-family);
}
.data-01-tablet-drive,
.tablet-data-xl-drive {
  font-family: var(--data-font-drive);
  font-size: 34px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 42px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .data-01-tablet-drive,
html:lang(ar) .tablet-data-xl-drive {
  font-family: var(--arabic-font-family);
}
.data-01-mobile-drive,
.mobile-data-xl-drive {
  font-family: var(--data-font-drive);
  font-size: 32px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 40px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .data-01-mobile-drive,
html:lang(ar) .mobile-data-xl-drive {
  font-family: var(--arabic-font-family);
}
@media (max-width: 640px) {
  .tablet-data-xl-drive {
    font-family: var(--data-font-drive);
    font-size: 32px;
    font-style: normal;
    font-weight: 400;
    letter-spacing: 0;
    line-height: 40px;
    text-transform: none;
    text-decoration: none;
  }
  html:lang(ar) .tablet-data-xl-drive {
    font-family: var(--arabic-font-family);
  }
}
.data-02-tablet-drive,
.tablet-data-l-drive {
  font-family: var(--data-font-drive);
  font-size: 22px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 26px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .data-02-tablet-drive,
html:lang(ar) .tablet-data-l-drive {
  font-family: var(--arabic-font-family);
}
.data-02-mobile-drive,
.mobile-data-l-drive {
  font-family: var(--data-font-drive);
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 24px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .data-02-mobile-drive,
html:lang(ar) .mobile-data-l-drive {
  font-family: var(--arabic-font-family);
}
@media (max-width: 640px) {
  .tablet-data-l-drive {
    font-family: var(--data-font-drive);
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    letter-spacing: 0;
    line-height: 24px;
    text-transform: none;
    text-decoration: none;
  }
  html:lang(ar) .tablet-data-l-drive {
    font-family: var(--arabic-font-family);
  }
}
.data-03-tablet-drive,
.tablet-data-m-drive {
  font-family: var(--data-font-drive);
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 22px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .data-03-tablet-drive,
html:lang(ar) .tablet-data-m-drive {
  font-family: var(--arabic-font-family);
}
.data-03-mobile-drive,
.mobile-data-m-drive {
  font-family: var(--data-font-drive);
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 21px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .data-03-mobile-drive,
html:lang(ar) .mobile-data-m-drive {
  font-family: var(--arabic-font-family);
}
@media (max-width: 640px) {
  .tablet-data-m-drive {
    font-family: var(--data-font-drive);
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    letter-spacing: 0;
    line-height: 21px;
    text-transform: none;
    text-decoration: none;
  }
  html:lang(ar) .tablet-data-m-drive {
    font-family: var(--arabic-font-family);
  }
}
.data-04-tablet-drive,
.tablet-data-s-drive {
  font-family: var(--data-font-drive);
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 26px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .data-04-tablet-drive,
html:lang(ar) .tablet-data-s-drive {
  font-family: var(--arabic-font-family);
}
.data-04-mobile-drive,
.mobile-data-s-drive {
  font-family: var(--data-font-drive);
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 24px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .data-04-mobile-drive,
html:lang(ar) .mobile-data-s-drive {
  font-family: var(--arabic-font-family);
}
@media (max-width: 640px) {
  .tablet-data-s-drive {
    font-family: var(--data-font-drive);
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    letter-spacing: 0;
    line-height: 24px;
    text-transform: none;
    text-decoration: none;
  }
  html:lang(ar) .tablet-data-s-drive {
    font-family: var(--arabic-font-family);
  }
}
:root {
  --text-primary: #1f2833;
  --text-secondary: #4e677e;
  --text-placeholder: #8da4b9;
  --text-hyperlink: #005aa8;
  --text-nav-highlight: #0069bf;
  --text-error-message: #c51a11;
  --text-button-disabled: #c0ccd8;
  --text-reverse-primary: #ffffff;
  --text-reverse-primary-button: var(--text-reverse-primary);
  --backgrounds-main: #ffffff;
  --backgrounds-content-0: #f9fafb;
  --backgrounds-content-1: #f2f5f7;
  --backgrounds-content-2: #d9e1e8;
  --backgrounds-hover: #e6ebef;
  --backgrounds-field-disabled: #e6ebef;
  --backgrounds-text-button-disabled: #c0ccd8;
  --backgrounds-overlay: rgba(31, 40, 51, 0.4);
  --backgrounds-primary-brand: #25477b;
  --backgrounds-reverse-2: #2f5b9d;
  --backgrounds-reverse-1: #1f2833;
  --backgrounds-reverse-0: #3e5265;
  --borders-general: #c0ccd8;
  --borders-secondary: #748faa;
  --borders-form-field--hover: #748faa;
  --borders-form-field--active: #0078d3;
  --borders-form-field--error: #c51a11;
  --borders-form-field--reverse: #91b0de;
  --action-primary--default: #0078d3;
  --action-primary--hover: #005aa8;
  --action-primary--active: #004080;
  --action-secondary--default: #4e677e;
  --action-secondary--hover: #3e5265;
  --action-secondary--active: #2f3d4c;
  --action-destructive--default: #c51a11;
  --action-destructive--hover: #b11810;
  --action-destructive--active: #a01f0e;
  --action-tertiary--hover: #e6ebef;
  --action-tertiary--active: #3e5265;
  --accents-warning--main: #fef7ed;
  --accents-warning--detail: #59480d;
  --accents-error--main: #ffeceb;
  --accents-error--detail: #a01f0e;
  --accents-success--main: #edfef2;
  --accents-success--detail: #2b6436;
  --accents-general--main: #ebf6ff;
  --accents-general--detail: #25477b;
  --chart-sequential-green-1: #4aa75e;
  --chart-divergent-red-blue-3: #b72931;
  --chart-sequential-blue-5: #0c74c3;
  --duty-status-workday: #faad41;
  --duty-status-cycle: #c0c1c6;
  --duty-status-rest: #fe6867;
  --duty-status-drive: #49c649;
  --duty-status-exemption: #4e677e;
  --data--categorical-light-blue: #3ccde5;
  --data--categorical-blue: #428aff;
  --data--categorical-purple: #8256e5;
  --data--categorical-green: #06c989;
  --data--categorical-orange: #f98c41;
  --data--categorical-yellow: #f5bd60;
  --data--categorical-red: #e56a6a;
  --data--categorical-grey: #8a94a2;
}
.zen-dark {
  --text-primary: #ffffff;
  --text-secondary: #c0ccd8;
  --text-placeholder: #a6b8c9;
  --text-hyperlink: #ebf6ff;
  --text-nav-highlight: #75c4ff;
  --text-error-message: #f7a1a2;
  --text-button-disabled: #8da4b9;
  --text-reverse-primary: #1f2833;
  --backgrounds-main: #1f2833;
  --backgrounds-content-0: #2f3d4c;
  --backgrounds-content-1: #4e677e;
  --backgrounds-content-2: #3e5265;
  --backgrounds-hover: #5d7b98;
  --backgrounds-field-disabled: #748faa;
  --backgrounds-text-button-disabled: #8da4b9;
  --backgrounds-overlay: rgba(31, 40, 51, 0.4);
  --backgrounds-primary-brand: #4cb2ff;
  --backgrounds-reverse-2: #5282cb;
  --backgrounds-reverse-1: #ffffff;
  --backgrounds-reverse-0: #f2f5f7;
  --borders-general: #748faa;
  --borders-secondary: #c0ccd8;
  --borders-form-field--hover: #c0ccd8;
  --borders-form-field--active: #4cb2ff;
  --borders-form-field--error: #f47c7d;
  --borders-form-field--reverse: #1b325a;
  --action-primary--default: #4cb2ff;
  --action-primary--hover: #9ed5ff;
  --action-primary--active: #ebf6ff;
  --action-secondary--default: #e6ebef;
  --action-secondary--hover: #f2f5f7;
  --action-secondary--active: #f9fafb;
  --action-destructive--default: #f7a1a2;
  --action-destructive--hover: #fac7c7;
  --action-destructive--active: #ffeceb;
  --action-tertiary--hover: rgba(31, 40, 51, 0.07);
  --action-tertiary--active: rgba(31, 40, 51, 0.14);
  --accents-warning--main: #a17a18;
  --accents-warning--detail: #fef7ed;
  --accents-error--main: #c51a11;
  --accents-error--detail: #ffeceb;
  --accents-success--main: #46af55;
  --accents-success--detail: #edfef2;
  --accents-general--main: #396dbc;
  --accents-general--detail: #eff4fa;
  --chart-sequential-green-1: #4aa75e;
  --chart-divergent-red-blue-3: #b72931;
  --chart-sequential-blue-5: #0c74c3;
  --duty-status-workday: #59480d;
  --duty-status-cycle: #3e5265;
  --duty-status-rest: #a01f0e;
  --duty-status-drive: #2b6436;
  --duty-status-exemption: #e6ebef;
}
.zen-caption {
  display: inline-flex;
  align-items: center;
  overflow: hidden;
  gap: 8px;
}
.zen-caption--center {
  justify-content: center;
}
.zen-caption--center .zen-caption__content {
  margin-right: 0;
}
.zen-caption--full-width {
  width: 100%;
}
.zen-caption__content {
  line-height: 16px;
  font-weight: 400;
  white-space: nowrap;
  margin-left: 0;
  margin-right: auto;
}
.zen-caption--hidden {
  display: none;
}
.zen-caption--wrapped .zen-caption__content {
  white-space: normal;
  word-wrap: break-word;
}
.zen-caption.zen-caption {
  display: inline-flex;
}
.zen-ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-wrap: normal;
}
.zen-not-selectable {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.zen-shadow-dropdown-default {
  box-shadow: 0px 0px 8px 2px rgba(0, 0, 0, 0.2);
}
.zen-card-shadow {
  box-shadow: 0px 0px 8px 2px rgba(0, 0, 0, 0.1);
}
.zen-chip-shadow {
  box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.15);
}
.zenIcons_pdf {
  background-image: url("data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20width%3D%2248%22%20height%3D%2248%22%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22a%22%3E%3Cstop%20offset%3D%220%22%20stop-color%3D%22%236a0000%22%2F%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23e00%22%2F%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22d%22%20x1%3D%2215.139%22%20x2%3D%2218.633%22%20y1%3D%2210.443%22%20y2%3D%2231.32%22%20gradientTransform%3D%22matrix(1.73%200%200%201.939%20245.97%20385.974)%22%20gradientUnits%3D%22userSpaceOnUse%22%20xlink%3Ahref%3D%22%23a%22%2F%3E%3ClinearGradient%20id%3D%22b%22%3E%3Cstop%20offset%3D%220%22%20stop-color%3D%22%23f8f8f7%22%2F%3E%3Cstop%20offset%3D%22.599%22%20stop-color%3D%22%23e8e8e8%22%2F%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23e2e2de%22%2F%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22c%22%20x1%3D%2220.794%22%20x2%3D%2235.596%22%20y1%3D%2218.379%22%20y2%3D%2239.6%22%20gradientTransform%3D%22matrix(1.343%200%200%201.235%20246.554%20404.243)%22%20gradientUnits%3D%22userSpaceOnUse%22%20xlink%3Ahref%3D%22%23b%22%2F%3E%3C%2Fdefs%3E%3Cg%20transform%3D%22translate(-254.286%20-410.076)%22%3E%3Crect%20width%3D%2248%22%20height%3D%2248%22%20x%3D%22254.287%22%20y%3D%22410.086%22%20fill%3D%22none%22%20color%3D%22%23000%22%20overflow%3D%22visible%22%20ry%3D%22.002%22%2F%3E%3Crect%20width%3D%2238.997%22%20height%3D%2245.003%22%20x%3D%22259.275%22%20y%3D%22412.317%22%20fill%3D%22url(%23c)%22%20fill-rule%3D%22evenodd%22%20stroke%3D%22%23888a85%22%20rx%3D%22.567%22%20ry%3D%22.567%22%2F%3E%3Cpath%20fill%3D%22%23999%22%20fill-rule%3D%22evenodd%22%20d%3D%22M293.774%20420.82h-30v2h30zM295.384%20425.973h-32.763v2.26h32.763zM295.384%20432.753h-32.763v2.26h32.763zM295.384%20439.533h-32.763v2.26h32.763z%22%20color%3D%22%23000%22%20overflow%3D%22visible%22%2F%3E%3Crect%20width%3D%2237.026%22%20height%3D%2243.022%22%20x%3D%22260.273%22%20y%3D%22413.32%22%20fill%3D%22none%22%20stroke%3D%22%23fff%22%20rx%3D%220%22%20ry%3D%220%22%2F%3E%3Cpath%20fill%3D%22url(%23d)%22%20d%3D%22M254.785%20424.292v21.454h46.844v-21.454h-46.844z%22%2F%3E%3Cg%20fill%3D%22%23fff%22%20font-family%3D%22Bitstream%20Vera%20Sans%22%20font-size%3D%2212.448%22%20font-weight%3D%22bold%22%3E%3Cpath%20style%3D%22-inkscape-font-specification%3ABitstream%20Charter%20Bold%22%20d%3D%22M260.745%20427.96h5.398c1.605%200%202.836.401%203.692%201.203.862.795%201.292%201.932%201.293%203.409%200%201.483-.431%202.626-1.293%203.428-.856.795-2.087%201.193-3.692%201.193h-2.146v4.905h-3.252v-14.137m3.252%202.642v3.948h1.799c.631%200%201.118-.17%201.461-.511.344-.347.515-.836.515-1.468%200-.631-.172-1.117-.515-1.458-.344-.341-.831-.511-1.461-.511h-1.799M276.669%20430.715v8.626h1.166c1.329%200%202.343-.369%203.041-1.108.704-.739%201.056-1.812%201.056-3.219%200-1.401-.349-2.468-1.048-3.2-.698-.732-1.715-1.098-3.05-1.098h-1.166m-3.252-2.755h3.43c1.915%200%203.34.155%204.275.464a5.514%205.514%200%200%201%202.416%201.553%206.165%206.165%200%200%201%201.318%202.206c.287.833.431%201.777.431%202.831%200%201.067-.144%202.02-.431%202.86a6.157%206.157%200%200%201-1.318%202.206%205.647%205.647%200%200%201-2.433%201.562c-.946.303-2.365.455-4.258.455h-3.43v-14.137M287.778%20427.96h8.777v2.755h-5.525v2.632h5.195v2.755h-5.195v5.994h-3.252v-14.137%22%2F%3E%3C%2Fg%3E%3Cpath%20fill%3D%22none%22%20stroke%3D%22%23700000%22%20stroke-width%3D%221.62%22%20d%3D%22M254.746%20445.649l46.834-.151v-21.079%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E");
  background-size: contain;
}
.zenIcons_excel {
  background-image: url("data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2228%22%20height%3D%2228%22%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22a%22%20x1%3D%22-41.032%22%20x2%3D%22-64.261%22%20y1%3D%2214.119%22%20y2%3D%2214.272%22%20gradientTransform%3D%22translate(61.25%20-.415)%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20offset%3D%220%22%20stop-color%3D%22%234fa42a%22%2F%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%234fff2a%22%20stop-opacity%3D%220%22%2F%3E%3C%2FlinearGradient%3E%3C%2Fdefs%3E%3Cpath%20fill%3D%22none%22%20stroke%3D%22%234fa42a%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke-miterlimit%3D%224.3%22%20stroke-width%3D%221.6%22%20d%3D%22M2.729%202.848h22.424v22.186H2.729z%22%2F%3E%3Cpath%20fill%3D%22none%22%20stroke%3D%22%234fa42a%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%221.278%22%20d%3D%22M6.561%206.324h15.115v14.955H6.561z%22%2F%3E%3Ctext%20x%3D%22-28%22%20y%3D%229.254%22%20font-family%3D%22Sans%22%20font-size%3D%2240%22%20letter-spacing%3D%220%22%20word-spacing%3D%220%22%2F%3E%3Cpath%20fill%3D%22url(%23a)%22%20d%3D%22M7.86%208.706l3.975-.017%201.66%202.167%202.018-2.076h3.856l-3.678%204.443v.06l4.742%206.413-4.414-.042-2.464-4.171-1.758%202.88-3.7-.033%203.424-5.134.017-.027z%22%2F%3E%3Cpath%20fill%3D%22%23FFF%22%20fill-rule%3D%22evenodd%22%20d%3D%22M3.536%2013.962V3.759H24.18v20.406H3.536V13.962zm18.737%207.609c.264-.494.358-14.87.102-15.54-.128-.331-1.083-.375-8.305-.375H5.908v8.029c0%204.415.072%208.099.159%208.186.087.087%203.713.158%208.06.158%207.568%200%207.91-.02%208.146-.459z%22%2F%3E%3Cpath%20fill%3D%22%23FFF%22%20fill-rule%3D%22evenodd%22%20d%3D%22M7.332%2013.843V7.08h13.526v13.526H7.332v-6.763zm13.148%205.754c-.092-.163-1.177-1.656-2.41-3.319l-2.241-3.022%201.835-2.198%201.835-2.198-2.109-.07-2.108-.072-.879.94-.879.939-.857-1.047-.858-1.046h-2c-1.101%200-2.002.07-2.002.154s.803%201.143%201.784%202.35l1.784%202.195-1.663%202.456c-.915%201.35-1.664%202.535-1.665%202.633-.002.098.853.178%201.899.178h1.9l.855-1.335c.646-1.01.907-1.256%201.072-1.009.12.18.597.994%201.061%201.81.464.815%201.022%201.586%201.239%201.713.217.126%201.336.233%202.485.237%201.606.006%202.052-.061%201.922-.289z%22%2F%3E%3Cpath%20fill%3D%22%23FFF%22%20fill-rule%3D%22evenodd%22%20d%3D%22M3.536%2013.962V3.759H24.18v20.406H3.536V13.962zm18.75%207.459c.355-.93.306-15.121-.052-15.479-.21-.21-2.384-.285-8.305-.285h-8.02v8.028c0%204.416.07%208.1.157%208.187.087.087%203.72.158%208.074.158h7.916l.231-.609z%22%2F%3E%3C%2Fsvg%3E");
  background-size: contain;
}
.zen-link {
  color: var(--text-hyperlink);
  fill: var(--text-hyperlink);
  text-decoration: underline;
  cursor: pointer;
  background: none;
  border: none;
  word-wrap: break-word;
}
.zen-link:hover,
.zen-link:focus,
.zen-link:active {
  text-decoration: underline;
  color: var(--action-primary--active);
  fill: var(--action-primary--active);
  outline: 1px dotted var(--action-primary--active);
}
.zen-link:hover {
  outline: none;
}
.zen-link--disabled {
  cursor: default;
  text-decoration: none;
  outline: none;
}
.zen-link--disabled:hover {
  text-decoration: none;
}
.zen-link--inline {
  padding: 0;
  margin: 0;
}
.zen-link--hidden {
  display: none;
}
.zen-link--light {
  text-decoration: none;
}
.zen-select-button-mixin {
  display: flex;
  width: 100%;
  align-items: center;
  background-color: var(--backgrounds-main);
  color: var(--text-primary);
  fill: var(--action-secondary);
  border: var(--border-width-default) solid var(--backgrounds-main);
  padding: var(--padding-top-bottom) var(--padding-left-right);
  outline: none;
  cursor: pointer;
  text-decoration: none;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-wrap: normal;
}
.zen-select-button {
  display: flex;
  width: 100%;
  align-items: center;
  background-color: var(--backgrounds-main);
  color: var(--text-primary);
  fill: var(--action-secondary);
  border: var(--border-width-default) solid var(--backgrounds-main);
  padding: var(--padding-top-bottom) var(--padding-left-right);
  outline: none;
  cursor: pointer;
  text-decoration: none;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-wrap: normal;
}
.zen-select-button:hover,
.zen-select-button:focus {
  text-decoration: none;
  outline: none;
  background-color: var(--backgrounds-hover);
  border-color: var(--backgrounds-hover);
}
.zen-select-button:active {
  background-color: var(--action-primary--default);
  border-color: var(--action-primary--default);
  color: var(--text-reverse-primary);
  fill: var(--text-reverse-primary);
}
.zen-select-button:disabled,
.zen-select-button--disabled {
  opacity: 0.3;
}
.zen-range-field-wrapper-column {
  display: grid;
  grid-template-columns: minmax(min-content, auto) minmax(auto, 168px) minmax(0, auto);
  grid-template-rows: auto auto;
  gap: 0.25rem 0.5rem;
  align-items: center;
  justify-items: start;
}
.zen-range-field-wrapper-row {
  display: grid;
  align-items: center;
  justify-items: start;
  grid-template-columns: minmax(1.5rem, 2rem) minmax(4rem, 4rem) minmax(1.5rem, 2rem) minmax(1.5rem, 2rem) minmax(4rem, 4rem) minmax(1.5rem, 2rem);
  row-gap: 0.25rem;
  column-gap: 0.5rem;
}
:root {
  --border-width-default: 1px;
  --border-radius-default: 4px;
  --padding-top-bottom: 8px;
  --padding-left-right: 8px;
  --mobile: 640px;
}
.zen-visually-hidden {
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
  width: 1px;
}
.zen-button {
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.32px;
  line-height: 16px;
  text-transform: none;
  border-width: var(--border-width-default);
  border-style: solid;
  border-radius: var(--border-radius-default);
  padding: 0.4375rem 0.4375rem;
  cursor: pointer;
  outline: none;
  text-decoration: none;
  text-align: center;
  font-family: var(--main-font);
  box-sizing: border-box;
  color: var(--text-primary);
  fill: var(--text-primary);
  border-color: var(--borders-general);
  background-color: var(--backgrounds-main);
  display: inline-block;
}
.zen-button * {
  box-sizing: border-box;
}
html:lang(ar) .zen-button {
  font-family: var(--arabic-font-family);
}
.zen-button--drive {
  font-family: var(--main-font);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.32px;
  line-height: 20px;
  text-transform: none;
  text-decoration: none;
  padding: 0.6875rem 0.6875rem;
}
html:lang(ar) .zen-button--drive {
  font-family: var(--arabic-font-family);
}
.zen-button--drive-tablet {
  font-family: var(--main-font);
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.32px;
  line-height: 22px;
  text-transform: none;
  text-decoration: none;
  padding: 0.6875rem 0.6875rem;
}
html:lang(ar) .zen-button--drive-tablet {
  font-family: var(--arabic-font-family);
}
.zen-button--mobile {
  font-family: var(--main-font);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
  line-height: 1.25rem;
  padding: 0.6875rem 0.6875rem;
}
html:lang(ar) .zen-button--mobile {
  font-family: var(--arabic-font-family);
}
.zen-button--huge {
  padding: 0.75rem;
}
.zen-button:hover,
.zen-button:focus,
.zen-button:active,
.zen-button--active {
  outline: none;
  text-decoration: none;
}
.zen-button:disabled,
.zen-button--disabled {
  pointer-events: none;
  cursor: default;
}
.zen-button:hover {
  color: var(--text-primary);
  fill: var(--text-primary);
  border-color: var(--borders-form-field--reverse);
  background-color: var(--backgrounds-hover);
}
.zen-button:focus-visible {
  color: var(--text-primary);
  fill: var(--text-primary);
  border-color: var(--borders-form-field--reverse);
  background-color: var(--backgrounds-hover);
  outline: 1px solid var(--borders-form-field--active);
  outline-offset: 2px;
}
.zen-button:active,
.zen-button--active {
  color: var(--text-primary);
  fill: var(--text-primary);
  border-color: var(--borders-form-field--reverse);
  background-color: var(--accents-general--main);
  outline: none;
}
.zen-button:disabled,
.zen-button--disabled {
  color: var(--text-button-disabled);
  fill: var(--text-button-disabled);
  border-color: var(--borders-general);
  background-color: var(--backgrounds-main);
}
.zen-button--primary {
  color: var(--text-reverse-primary-button);
  fill: var(--text-reverse-primary-button);
  border-color: var(--borders-form-field--active);
  background-color: var(--action-primary--default);
}
.zen-button--primary:hover {
  color: var(--text-reverse-primary);
  fill: var(--text-reverse-primary);
  border-color: var(--action-primary--hover);
  background-color: var(--action-primary--hover);
}
.zen-button--primary:focus-visible {
  color: var(--text-reverse-primary);
  fill: var(--text-reverse-primary);
  border-color: var(--action-primary--hover);
  background-color: var(--action-primary--hover);
  outline: 1px solid var(--borders-form-field--active);
  outline-offset: 2px;
}
.zen-button--primary:active {
  color: var(--text-reverse-primary);
  fill: var(--text-reverse-primary);
  border-color: var(--action-primary--active);
  background-color: var(--action-primary--active);
  outline: none;
}
.zen-button--primary:disabled,
.zen-button--primary.zen-button--disabled {
  color: var(--text-reverse-primary);
  fill: var(--text-reverse-primary);
  border-color: var(--backgrounds-content-2);
  background-color: var(--backgrounds-content-2);
}
.zen-button--tertiary {
  color: var(--text-hyperlink);
  fill: var(--text-hyperlink);
  border-color: transparent;
  background-color: transparent;
}
.zen-button--tertiary:hover {
  color: var(--text-hyperlink);
  fill: var(--text-hyperlink);
  border: 1px solid var(--backgrounds-content-1);
  background-color: var(--backgrounds-content-1);
}
.zen-button--tertiary:focus-visible {
  color: var(--text-hyperlink);
  fill: var(--text-hyperlink);
  border-color: var(--backgrounds-content-1);
  background-color: var(--backgrounds-content-1);
  outline: 1px solid var(--borders-form-field--active);
  outline-offset: 2px;
}
.zen-button--tertiary:active {
  color: var(--text-hyperlink);
  fill: var(--text-hyperlink);
  border-color: var(--action-tertiary--hover);
  background-color: var(--action-tertiary--hover);
  outline: none;
}
.zen-button--tertiary:disabled,
.zen-button--tertiary.zen-button--disabled {
  color: var(--text-button-disabled);
  fill: var(--text-button-disabled);
  border-color: transparent;
  background-color: transparent;
}
.zen-button--destructive {
  color: var(--text-reverse-primary);
  fill: var(--text-reverse-primary);
  border-color: var(--action-destructive--default);
  background-color: var(--action-destructive--default);
}
.zen-button--destructive:hover {
  color: var(--text-reverse-primary);
  fill: var(--text-reverse-primary);
  border-color: var(--action-destructive--hover);
  background-color: var(--action-destructive--hover);
}
.zen-button--destructive:focus-visible {
  color: var(--text-reverse-primary);
  fill: var(--text-reverse-primary);
  border-color: var(--action-destructive--hover);
  background-color: var(--action-destructive--hover);
  outline: 1px solid var(--borders-form-field--active);
  outline-offset: 2px;
}
.zen-button--destructive:active {
  color: var(--text-reverse-primary);
  fill: var(--text-reverse-primary);
  border-color: var(--action-destructive--active);
  background-color: var(--action-destructive--active);
  outline: none;
}
.zen-button--destructive:disabled,
.zen-button--destructive.zen-button--disabled {
  color: var(--text-reverse-primary);
  fill: var(--text-reverse-primary);
  border-color: var(--accents-error--main);
  background-color: var(--accents-error--main);
}
.zen-button--separate {
  border-color: var(--backgrounds-main);
}
.zen-button--separate:hover,
.zen-button--separate:focus,
.zen-button--separate:active {
  border-color: var(--backgrounds-main);
}
.zen-button--icon {
  padding: 0.21875rem;
  line-height: 0;
}
.zen-button--icon--large {
  padding: 0.4375rem;
  line-height: 0;
  min-width: 2rem;
  min-height: 2rem;
}
.zen-button--tertiary-black {
  color: var(--text-primary);
  fill: var(--text-primary);
  border-color: transparent;
  background-color: transparent;
}
.zen-button--tertiary-black:hover {
  color: var(--text-primary);
  fill: var(--text-primary);
  border: 1px solid var(--backgrounds-content-1);
  background-color: var(--backgrounds-content-1);
}
.zen-button--tertiary-black:focus-visible {
  color: var(--text-primary);
  fill: var(--text-primary);
  border-color: var(--backgrounds-content-1);
  background-color: var(--backgrounds-content-1);
  outline: 1px solid var(--borders-form-field--active);
  outline-offset: 2px;
}
.zen-button--tertiary-black:active {
  color: var(--text-primary);
  fill: var(--text-primary);
  border-color: var(--action-tertiary--hover);
  background-color: var(--action-tertiary--hover);
  outline: none;
}
.zen-button--tertiary-black:disabled,
.zen-button--tertiary-black.zen-button--disabled {
  color: var(--text-button-disabled);
  fill: var(--text-button-disabled);
  border-color: transparent;
  background-color: transparent;
}
.zen-button--tertiary-destructive {
  color: var(--text-error-message);
  fill: var(--text-error-message);
  border-color: transparent;
  background-color: transparent;
}
.zen-button--tertiary-destructive:hover {
  color: var(--text-error-message);
  fill: var(--text-error-message);
  border: 1px solid var(--backgrounds-content-1);
  background-color: var(--backgrounds-content-1);
}
.zen-button--tertiary-destructive:focus-visible {
  color: var(--text-error-message);
  fill: var(--text-error-message);
  border-color: var(--backgrounds-content-1);
  background-color: var(--backgrounds-content-1);
  outline: 1px solid var(--borders-form-field--active);
  outline-offset: 2px;
}
.zen-button--tertiary-destructive:active {
  color: var(--text-error-message);
  fill: var(--text-error-message);
  border-color: var(--accents-error--main);
  background-color: var(--accents-error--main);
  outline: none;
}
.zen-button--tertiary-destructive:disabled,
.zen-button--tertiary-destructive.zen-button--disabled {
  color: var(--text-button-disabled);
  fill: var(--text-button-disabled);
  border-color: transparent;
  background-color: transparent;
}
.zen-button--light {
  color: var(--text-secondary);
  fill: var(--text-secondary);
  border-color: transparent;
  background-color: transparent;
}
.zen-button--light:hover,
.zen-button--light:focus {
  border: 1px solid var(--backgrounds-hover);
  background-color: var(--backgrounds-hover);
}
.zen-button--light:active {
  color: var(--action-primary--hover);
  fill: var(--action-primary--hover);
  border-color: var(--action-primary--default);
  background-color: transparent;
}
.zen-button--light:disabled,
.zen-button--light.zen-button--disabled {
  color: var(--text-button-disabled);
  fill: var(--text-button-disabled);
  border-color: transparent;
  background-color: transparent;
}
.zen-primary-colors {
  color: var(--text-reverse-primary-button);
  fill: var(--text-reverse-primary-button);
  border-color: var(--borders-form-field--active);
  background-color: var(--action-primary--default);
}
.zen-primary-colors--hover {
  color: var(--text-reverse-primary);
  fill: var(--text-reverse-primary);
  border-color: var(--action-primary--hover);
  background-color: var(--action-primary--hover);
}
.zen-primary-colors--focus-visible {
  color: var(--text-reverse-primary);
  fill: var(--text-reverse-primary);
  border-color: var(--action-primary--hover);
  background-color: var(--action-primary--hover);
  outline: 1px solid var(--borders-form-field--active);
  outline-offset: 2px;
}
.zen-primary-colors--active {
  color: var(--text-reverse-primary);
  fill: var(--text-reverse-primary);
  border-color: var(--action-primary--active);
  background-color: var(--action-primary--active);
}
.zen-primary-colors--disabled {
  color: var(--text-reverse-primary);
  fill: var(--text-reverse-primary);
  border-color: var(--backgrounds-content-2);
  background-color: var(--backgrounds-content-2);
}
.zen-secondary-colors {
  color: var(--text-primary);
  fill: var(--text-primary);
  border-color: var(--borders-general);
  background-color: var(--backgrounds-main);
}
.zen-secondary-colors--hover {
  color: var(--text-primary);
  fill: var(--text-primary);
  border-color: var(--borders-form-field--reverse);
  background-color: var(--backgrounds-hover);
}
.zen-secondary-colors--active {
  color: var(--text-primary);
  fill: var(--text-primary);
  border-color: var(--borders-form-field--reverse);
  background-color: var(--accents-general--main);
}
.zen-secondary-colors--focus-visible {
  color: var(--text-primary);
  fill: var(--text-primary);
  border-color: var(--borders-form-field--reverse);
  background-color: var(--backgrounds-hover);
  outline: 1px solid var(--borders-form-field--active);
  outline-offset: 2px;
}
.zen-secondary-colors--disabled {
  color: var(--text-button-disabled);
  fill: var(--text-button-disabled);
  border-color: var(--borders-general);
  background-color: var(--backgrounds-main);
}
.zen-destructive-colors {
  color: var(--text-reverse-primary);
  fill: var(--text-reverse-primary);
  border-color: var(--action-destructive--default);
  background-color: var(--action-destructive--default);
}
.zen-destructive-colors--hover {
  color: var(--text-reverse-primary);
  fill: var(--text-reverse-primary);
  border-color: var(--action-destructive--hover);
  background-color: var(--action-destructive--hover);
}
.zen-destructive-colors--active {
  color: var(--text-reverse-primary);
  fill: var(--text-reverse-primary);
  border-color: var(--action-destructive--active);
  background-color: var(--action-destructive--active);
}
.zen-destructive-colors--focus-visible {
  color: var(--text-reverse-primary);
  fill: var(--text-reverse-primary);
  border-color: var(--action-destructive--hover);
  background-color: var(--action-destructive--hover);
  outline: 1px solid var(--borders-form-field--active);
  outline-offset: 2px;
}
.zen-destructive-colors--disabled {
  color: var(--text-reverse-primary);
  fill: var(--text-reverse-primary);
  border-color: var(--accents-error--main);
  background-color: var(--accents-error--main);
}
.zen-tertiary-colors {
  color: var(--text-hyperlink);
  fill: var(--text-hyperlink);
  border-color: transparent;
  background-color: transparent;
}
.zen-tertiary-colors--hover {
  color: var(--text-hyperlink);
  fill: var(--text-hyperlink);
  border: 1px solid var(--backgrounds-content-1);
  background-color: var(--backgrounds-content-1);
}
.zen-tertiary-colors--active {
  color: var(--text-hyperlink);
  fill: var(--text-hyperlink);
  border-color: var(--action-tertiary--hover);
  background-color: var(--action-tertiary--hover);
}
.zen-tertiary-colors--focus-visible {
  color: var(--text-hyperlink);
  fill: var(--text-hyperlink);
  border-color: var(--backgrounds-content-1);
  background-color: var(--backgrounds-content-1);
  outline: 1px solid var(--borders-form-field--active);
  outline-offset: 2px;
}
.zen-tertiary-colors--disabled {
  color: var(--text-button-disabled);
  fill: var(--text-button-disabled);
  border-color: transparent;
  background-color: transparent;
}
.zen-tertiary-black-colors {
  color: var(--text-primary);
  fill: var(--text-primary);
  border-color: transparent;
  background-color: transparent;
}
.zen-tertiary-black-colors--hover {
  color: var(--text-primary);
  fill: var(--text-primary);
  border: 1px solid var(--backgrounds-content-1);
  background-color: var(--backgrounds-content-1);
}
.zen-tertiary-black-colors--active {
  color: var(--text-primary);
  fill: var(--text-primary);
  border-color: var(--action-tertiary--hover);
  background-color: var(--action-tertiary--hover);
}
.zen-tertiary-black-colors--focus-visible {
  color: var(--text-primary);
  fill: var(--text-primary);
  border-color: var(--backgrounds-content-1);
  background-color: var(--backgrounds-content-1);
  outline: 1px solid var(--borders-form-field--active);
  outline-offset: 2px;
}
.zen-tertiary-black-colors--disabled {
  color: var(--text-button-disabled);
  fill: var(--text-button-disabled);
  border-color: transparent;
  background-color: transparent;
}
.zen-tertiary-destructive-colors {
  color: var(--text-error-message);
  fill: var(--text-error-message);
  border-color: transparent;
  background-color: transparent;
}
.zen-tertiary-destructive-colors--hover {
  color: var(--text-error-message);
  fill: var(--text-error-message);
  border: 1px solid var(--backgrounds-content-1);
  background-color: var(--backgrounds-content-1);
}
.zen-tertiary-destructive-colors--active {
  color: var(--text-error-message);
  fill: var(--text-error-message);
  border-color: var(--accents-error--main);
  background-color: var(--accents-error--main);
}
.zen-tertiary-destructive-colors--focus-visible {
  color: var(--text-error-message);
  fill: var(--text-error-message);
  border-color: var(--backgrounds-content-1);
  background-color: var(--backgrounds-content-1);
  outline: 1px solid var(--borders-form-field--active);
  outline-offset: 2px;
}
.zen-tertiary-destructive-colors--disabled {
  color: var(--text-button-disabled);
  fill: var(--text-button-disabled);
  border-color: transparent;
  background-color: transparent;
}
.zen-absolute {
  box-sizing: border-box;
  position: absolute;
  z-index: 11000;
  overflow-y: auto;
  outline: none;
}
.zen-absolute * {
  box-sizing: border-box;
}
.zen-calculate-position {
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0.01;
  max-height: 1px;
}
.zen-icon {
  box-sizing: border-box;
  width: 11px;
  height: 11px;
  display: inline;
}
.zen-icon * {
  box-sizing: border-box;
}
.zen-icon:hover,
.zen-icon:focus {
  outline: none;
}
.zen-icon > use {
  pointer-events: none;
}
.zen-icon--micro {
  width: 6px;
  height: 4.5px;
}
.zen-icon--tiny {
  width: 7px;
  height: 7px;
}
.zen-icon--small {
  width: 8px;
  height: 8px;
}
.zen-icon--medium {
  width: 10px;
  height: 10px;
}
.zen-icon--big {
  width: 12px;
  height: 12px;
}
.zen-icon--bigger {
  width: 14px;
  height: 14px;
}
.zen-icon--large {
  width: 16px;
  height: 16px;
}
.zen-icon--huge {
  width: 20px;
  height: 20px;
}
.zen-icon--huger {
  width: 30px;
  height: 30px;
}
.zen-icon--rtl {
  transform: scaleX(-1);
}
.zen-accordion {
  font-family: var(--main-font);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
  box-sizing: border-box;
}
html:lang(ar) .zen-accordion {
  font-family: var(--arabic-font-family);
}
.zen-accordion * {
  box-sizing: border-box;
}
.zen-accordion__header-button {
  width: 100%;
  display: flex;
  align-items: center;
  height: 37px;
  padding: 10px 16px;
  color: var(--text-primary);
  background-color: var(--backgrounds-content-1);
  font-size: 14px;
  line-height: 16px;
  border: 0px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.02rem;
  text-transform: none;
  border-radius: var(--border-radius-default);
  cursor: pointer;
  outline: none;
  text-decoration: none;
  text-align: center;
  font-family: var(--main-font);
  fill: var(--action-secondary--default);
}
.zen-accordion__header-button .zen-accordion__header-arrow {
  fill: var(--action-secondary--default);
  margin-left: auto;
}
.zen-accordion__header-button .zen-accordion__header-arrow--rotated {
  transform: rotate(180deg);
}
.zen-accordion__header-button:hover,
.zen-accordion__header-button:focus {
  fill: var(--borders-form-field--hover);
  border-color: var(--borders-form-field--hover);
  background-color: var(--backgrounds-reverse-2);
  color: var(--text-reverse-primary);
}
.zen-accordion__header-button:hover .zen-accordion__header-arrow,
.zen-accordion__header-button:focus .zen-accordion__header-arrow {
  fill: var(--text-reverse-primary);
}
.zen-accordion__header {
  padding: 0;
  margin: 5px 0;
}
.zen-accordion__content {
  padding: 0 16px;
  margin: 0;
  overflow: hidden;
  display: block;
}
.zen-accordion__content--hidden {
  display: none;
}
.zen-accordion--legacy .zen-accordion__header-button {
  background-color: var(--backgrounds-main);
  border-radius: 0px;
  color: var(--text-primary);
  fill: var(--action-secondary--default);
}
.zen-accordion--legacy .zen-accordion__header-button:hover,
.zen-accordion--legacy .zen-accordion__header-button:focus {
  color: var(--text-primary);
  fill: var(--action-secondary--default);
  background-color: var(--backgrounds-hover);
}
.zen-accordion--legacy .zen-accordion__header-button:hover .zen-accordion__header-arrow,
.zen-accordion--legacy .zen-accordion__header-button:focus .zen-accordion__header-arrow {
  fill: var(--action-secondary--default);
}
.zen-advanced-groups-filter.zen-advanced-groups-filter {
  width: 526px;
}
.zen-advanced-groups-filter-prioritized-modal {
  z-index: 11011;
}
.zen-banner {
  box-sizing: border-box;
  min-height: 3rem;
}
.zen-banner__content {
  flex-grow: 2;
  display: flex;
  align-items: center;
  text-align: center;
  overflow: hidden;
  justify-content: center;
}
.zen-banner__content--XXL {
  max-width: unset;
}
.zen-banner__content--XL {
  max-width: 90rem;
}
.zen-banner__content--multiline {
  flex-direction: column;
  row-gap: 0.5rem;
}
.zen-banner__close-button {
  display: flex;
  align-items: center;
  justify-content: center;
  fill: var(--accents-warning--detail);
  background-color: transparent;
  border: none;
  border-radius: 15px;
  cursor: pointer;
  padding: 0;
  margin: 0.5rem;
  align-self: flex-start;
}
.zen-banner__close-button:active,
.zen-banner__close-button:hover,
.zen-banner__close-button:focus {
  background-color: var(--accents-warning--detail);
  fill: var(--accents-warning--main);
}
.zen-banner__close-button--top-gap {
  margin: 0.3125rem;
}
.zen-banner__close-button--drive,
.zen-banner__close-button--drive-tablet {
  margin: 0.75rem;
}
.zen-banner__block {
  display: flex;
  padding-block: 0.5rem 0.5rem;
  padding-inline: 1rem 0.75rem;
  background-color: var(--accents-warning--main);
  color: var(--accents-warning--detail);
  fill: var(--accents-warning--detail);
  border-radius: var(--border-radius-default);
}
.zen-banner__block--drive,
.zen-banner__block--drive-tablet {
  padding-block: 0.5rem 1rem;
  padding-inline: 1rem 0.75rem;
}
.zen-banner__block--multiline {
  height: unset;
}
.zen-banner__block--XXL {
  max-width: 100%;
}
.zen-banner__block--XL {
  max-width: 100%;
  justify-content: center;
}
.zen-banner__block--L {
  max-width: 71rem;
  min-width: 16.75rem;
}
.zen-banner__block--M {
  max-width: 47rem;
  min-width: 16.75rem;
}
.zen-banner__block--S {
  max-width: 35rem;
  min-width: 16.75rem;
}
.zen-banner__block--XS {
  max-width: 22.5rem;
  min-width: 16.75rem;
}
.zen-banner__block--multiline {
  flex-wrap: wrap;
}
.zen-banner__multiline-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}
.zen-banner__header-container {
  display: flex;
  align-items: center;
  width: 100%;
}
.zen-banner__header {
  font-family: var(--main-font);
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  letter-spacing: 0.16px;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
  padding-inline-end: 0.5rem;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  text-align: start;
}
html:lang(ar) .zen-banner__header {
  font-family: var(--arabic-font-family);
}
.zen-banner__header--drive {
  font-family: var(--main-font);
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  letter-spacing: 0.16px;
  line-height: 20px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .zen-banner__header--drive {
  font-family: var(--arabic-font-family);
}
.zen-banner__header--drive-tablet {
  font-family: var(--main-font);
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  letter-spacing: 0.16px;
  line-height: 22px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .zen-banner__header--drive-tablet {
  font-family: var(--arabic-font-family);
}
.zen-banner__icon-block {
  display: flex;
  padding-inline-end: 0.5rem;
}
.zen-banner__icon-block--top-gap {
  margin: 0.1875rem;
}
.zen-banner__message {
  font-family: var(--main-font);
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.32px;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-wrap: normal;
  text-align: start;
  margin-inline-end: auto;
  max-width: 64.6875rem;
}
html:lang(ar) .zen-banner__message {
  font-family: var(--arabic-font-family);
}
.zen-banner__message--XXL,
.zen-banner__message--XXL.zen-banner__message--drive,
.zen-banner__message--XXL.zen-banner__message--drive-tablet {
  max-width: unset;
}
.zen-banner__message--drive,
.zen-banner__message--drive-tablet {
  max-width: 28.25rem;
  padding-top: 0.25rem;
}
.zen-banner__message--drive {
  font-family: var(--main-font);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.32px;
  line-height: 20px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .zen-banner__message--drive {
  font-family: var(--arabic-font-family);
}
.zen-banner__message--drive-tablet {
  font-family: var(--main-font);
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.32px;
  line-height: 22px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .zen-banner__message--drive-tablet {
  font-family: var(--arabic-font-family);
}
.zen-banner__message--mobile {
  max-width: unset;
  overflow: unset;
  text-overflow: unset;
  white-space: unset;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
}
.zen-banner__message--multiline {
  font-family: var(--main-font);
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.32px;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
  white-space: wrap;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
html:lang(ar) .zen-banner__message--multiline {
  font-family: var(--arabic-font-family);
}
.zen-banner__message--multiline.zen-banner__message--drive {
  font-family: var(--main-font);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.32px;
  line-height: 20px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .zen-banner__message--multiline.zen-banner__message--drive {
  font-family: var(--arabic-font-family);
}
.zen-banner__message--multiline.zen-banner__message--drive-tablet {
  font-family: var(--main-font);
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.32px;
  line-height: 22px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .zen-banner__message--multiline.zen-banner__message--drive-tablet {
  font-family: var(--arabic-font-family);
}
.zen-banner__message-container {
  display: flex;
  width: 100%;
  align-items: center;
}
.zen-banner__action {
  margin-inline-start: 1rem;
  display: flex;
}
.zen-banner__action--multiline {
  align-self: self-end;
  display: flex;
}
.zen-banner .zen-banner__link {
  text-wrap: nowrap;
}
.zen-banner--error {
  background-color: var(--accents-error--main);
  color: var(--accents-error--detail);
  fill: var(--accents-error--detail);
}
.zen-banner--error .zen-banner__close-button {
  fill: var(--accents-error--detail);
}
.zen-banner--error .zen-banner__close-button:active,
.zen-banner--error .zen-banner__close-button:hover,
.zen-banner--error .zen-banner__close-button:focus {
  background-color: var(--accents-error--detail);
  fill: var(--accents-error--main);
}
.zen-banner--success {
  background-color: var(--accents-success--main);
  color: var(--accents-success--detail);
  fill: var(--accents-success--detail);
}
.zen-banner--success .zen-banner__close-button {
  fill: var(--accents-success--detail);
}
.zen-banner--success .zen-banner__close-button:active,
.zen-banner--success .zen-banner__close-button:hover,
.zen-banner--success .zen-banner__close-button:focus {
  background-color: var(--accents-success--detail);
  fill: var(--accents-success--main);
}
.zen-banner--info,
.zen-banner--upsell {
  background-color: var(--accents-general--main);
  color: var(--accents-general--detail);
  fill: var(--accents-general--detail);
}
.zen-banner--info .zen-banner__close-button,
.zen-banner--upsell .zen-banner__close-button {
  fill: var(--accents-general--detail);
}
.zen-banner--info .zen-banner__close-button:active,
.zen-banner--upsell .zen-banner__close-button:active,
.zen-banner--info .zen-banner__close-button:hover,
.zen-banner--upsell .zen-banner__close-button:hover,
.zen-banner--info .zen-banner__close-button:focus,
.zen-banner--upsell .zen-banner__close-button:focus {
  background-color: var(--accents-general--detail);
  fill: var(--accents-general--main);
}
.zen-form-field-banner {
  min-width: unset;
  max-width: unset;
  width: 100%;
}
.zen-skeleton {
  box-sizing: border-box;
  background: linear-gradient(to left, var(--backgrounds-content-2) 0%, var(--backgrounds-main) 50%, var(--backgrounds-content-2) 100%);
  background-size: 200% 100%;
  animation: skeleton-animation ease-in-out 1.5s infinite;
  background-repeat: repeat;
}
.zen-skeleton * {
  box-sizing: border-box;
}
.zen-skeleton--pill {
  height: 24px;
  border-radius: 99px;
}
.zen-skeleton--text {
  height: 16px;
}
.zen-skeleton--button {
  height: 32px;
  border-radius: 4px;
}
@keyframes skeleton-animation {
  0% {
    background-position: -50% 0%;
  }
  100% {
    background-position: -250% 0%;
  }
}
.zen-tooltip {
  box-sizing: border-box;
  font-family: var(--main-font);
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.32px;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
  box-shadow: 0px 0px 8px 2px rgba(0, 0, 0, 0.2);
  display: flex;
  position: absolute;
  background-color: var(--backgrounds-content-1);
  color: var(--text-primary);
  border: none;
  border-radius: var(--border-radius-default);
  min-width: 42px;
  width: auto;
  z-index: 11100;
}
.zen-tooltip * {
  box-sizing: border-box;
}
html:lang(ar) .zen-tooltip {
  font-family: var(--arabic-font-family);
}
.zen-tooltip--auto {
  max-width: 272px;
  max-height: 82px;
  padding: 8px;
}
.zen-tooltip--full-content {
  max-height: none;
}
.zen-tooltip--full-content .zen-tooltip__body--desktop {
  -webkit-line-clamp: unset;
  line-clamp: unset;
}
.zen-tooltip--mobile,
.zen-tooltip--drive {
  width: auto;
  max-width: 368px;
  padding: 12px;
  justify-content: space-between;
  align-items: center;
  left: 10px;
  right: 10px;
}
.zen-tooltip--mobile {
  max-height: 112px;
}
.zen-tooltip--drive {
  font-family: var(--main-font);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.32px;
  line-height: 20px;
  text-transform: none;
  text-decoration: none;
  max-height: 148px;
}
html:lang(ar) .zen-tooltip--drive {
  font-family: var(--arabic-font-family);
}
.zen-tooltip .zen-tooltip__close-button {
  display: flex;
  align-items: start;
  align-self: start;
  flex-shrink: 0;
  background: none;
  border: none;
  padding: 0;
  border-radius: 50%;
  color: var(--text-primary);
  fill: var(--text-primary);
}
.zen-tooltip .zen-tooltip__close-button:active,
.zen-tooltip .zen-tooltip__close-button:focus,
.zen-tooltip .zen-tooltip__close-button:hover {
  border: 0;
}
.zen-tooltip__title {
  font-family: var(--main-font);
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  letter-spacing: 0.16px;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
  margin-bottom: 4px;
}
html:lang(ar) .zen-tooltip__title {
  font-family: var(--arabic-font-family);
}
.zen-tooltip__body {
  display: -webkit-box;
  -webkit-box-orient: vertical;
}
.zen-tooltip__body--desktop,
.zen-tooltip__body--mobile,
.zen-tooltip__body--drive {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
}
.zen-tooltip__body--desktop {
  line-clamp: 4;
  -webkit-line-clamp: 4;
}
.zen-tooltip__body--mobile,
.zen-tooltip__body--drive {
  line-clamp: 5;
  -webkit-line-clamp: 5;
}
.zen-tooltip__body--small {
  white-space: nowrap;
}
.zen-tooltip__arrow {
  position: absolute;
  border-style: solid;
  filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.2));
}
.zen-tooltip__arrow--top {
  top: 100%;
  left: 50%;
  border-color: var(--backgrounds-content-1) transparent transparent transparent;
  border-width: 6px 5px 0 5px;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.2));
}
.zen-tooltip__arrow--bottom {
  bottom: 100%;
  left: 14px;
  border-color: transparent transparent var(--backgrounds-content-1) transparent;
  border-width: 0px 5px 6px 5px;
  filter: drop-shadow(0px -4px 4px rgba(0, 0, 0, 0.2));
}
.zen-tooltip__arrow--right {
  right: 100%;
  border-color: transparent var(--backgrounds-content-1) transparent transparent;
  border-width: 5px 6px 5px 0px;
  filter: drop-shadow(-4px 0px 4px rgba(0, 0, 0, 0.2));
}
.zen-tooltip__arrow--left {
  left: 100%;
  border-color: transparent transparent transparent var(--backgrounds-content-1);
  border-width: 5px 0px 6px 5px;
  filter: drop-shadow(4px 0px 4px rgba(0, 0, 0, 0.2));
}
.zen-tooltip__trigger {
  color: var(--text-secondary);
  fill: var(--text-secondary);
}
.zen-tooltip__trigger-container {
  display: inline-flex;
  cursor: pointer;
  padding: 0;
  outline: none;
  border: none;
  background-color: transparent;
}
.zen-tooltip__shield {
  background-color: #1f2833 !important;
  opacity: 0.4 !important;
}
.zen-shield {
  box-sizing: border-box;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10006;
  background-color: #000;
  opacity: 0.1;
}
.zen-shield * {
  box-sizing: border-box;
}
.zen-shield-faded {
  opacity: 0;
  transition: opacity 0.2s ease-in;
}
.zen-shield-faded--visible {
  opacity: 0.1;
}
.zen-tooltip-info {
  align-items: center;
  cursor: pointer;
  display: flex;
  fill: var(--text-secondary);
  justify-content: center;
  border: 0;
  background: 0;
  padding: 0;
  min-width: 16px;
  max-width: 16px;
  min-height: 16px;
  max-height: 16px;
}
.zen-tooltip-info--drive {
  min-width: 20px;
  max-width: 20px;
  min-height: 20px;
  max-height: 20px;
}
.zen-tooltip-info:focus,
.zen-tooltip-info:hover {
  background: 0;
  fill: var(--text-secondary);
}
.zen-text-icon-button {
  justify-content: center;
}
.zen-text-icon-button .zen-caption__content {
  margin-right: 0;
}
.zen-field-label {
  display: flex;
  gap: 4px;
}
.zen-field-label:not(.zen-field-label--review):not(.zen-form-list-label):not(.zen-form-field-label--top) {
  align-self: center;
}
.zen-field-label__text {
  display: flex;
  align-items: center;
  font-family: var(--main-font);
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.32px;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
  color: var(--text-primary);
}
html:lang(ar) .zen-field-label__text {
  font-family: var(--arabic-font-family);
}
.zen-field-label__text--review {
  color: var(--text-secondary);
  font-style: inherit;
}
.zen-field-label--custom-width:not(.zen-field-label--review) .zen-field-label__text {
  align-items: flex-start;
}
.zen-card-container {
  box-sizing: border-box;
  border-radius: 8px;
  border: 1px solid var(--borders-general);
  background: var(--backgrounds-main);
  display: flex;
  flex-direction: column;
  padding: 16px;
  width: 100%;
}
.zen-card-container * {
  box-sizing: border-box;
}
.zen-card-container:not(.zen-card-container--absolute) {
  min-width: 288px;
}
.zen-card-container--absolute {
  flex-shrink: 0;
}
.zen-card-container--extra-extra-large {
  min-height: 418px;
  max-height: 418px;
}
.zen-card-container--extra-large {
  max-width: 1136px;
  min-height: 418px;
  max-height: 418px;
}
.zen-card-container--large {
  max-width: 752px;
  min-height: 418px;
  max-height: 418px;
}
.zen-card-container--medium {
  max-width: 560px;
  min-height: 418px;
  max-height: 418px;
}
.zen-card-container--small {
  max-width: 368px;
  min-height: 418px;
  max-height: 418px;
}
.zen-card-container--extra-small {
  max-width: 368px;
  min-height: 200px;
  max-height: 200px;
}
.zen-card-container--extra-extra-small {
  max-width: 272px;
  min-height: 200px;
  max-height: 200px;
}
.zen-card-container--full-width {
  max-width: 100%;
  flex: 1 0 0;
}
.zen-card-container--full-height {
  min-height: unset;
  max-height: unset;
  height: 100%;
}
.zen-card-container--mobile {
  max-height: unset;
}
.zen-card-container--auto-height {
  max-height: unset;
  min-height: unset;
  align-self: flex-start;
}
.zen-card-container.zen-card-container--no-width-constraint {
  min-width: 0;
  max-width: unset;
}
@media (max-width: 640px) {
  .zen-card-container {
    max-width: unset;
  }
}
.zen-card-status {
  box-sizing: border-box;
  align-self: center;
  border: transparent;
}
.zen-card-status * {
  box-sizing: border-box;
}
.zen-card-status:focus,
.zen-card-status:hover {
  background: 0;
}
.zen-card-status--ok {
  fill: var(--accents-success--detail);
}
.zen-card-status--warning {
  fill: var(--accents-warning--detail);
}
.zen-card-status--info {
  fill: var(--action-secondary--default);
}
.zen-card-status--info:active.card-status--mobile {
  fill: var(--action-primary--active);
  color: var(--action-primary--active);
}
.zen-card-status--info:hover,
.zen-card-status--info:focus {
  fill: var(--action-primary--hover);
  color: var(--action-primary--hover);
}
.zen-card-status--error {
  fill: var(--accents-error--detail);
}
.zen-card-status-icon {
  box-sizing: border-box;
  flex-shrink: 0;
}
.zen-card-status-icon * {
  box-sizing: border-box;
}
.zen-card-status-button {
  box-sizing: border-box;
  border: none;
  flex-shrink: 0;
  padding: 0;
  align-items: center;
  display: flex;
}
.zen-card-status-button * {
  box-sizing: border-box;
}
.zen-card-status-tooltip-mobile {
  box-sizing: border-box;
  padding: 24px 16px 32px;
}
.zen-card-status-tooltip-mobile * {
  box-sizing: border-box;
}
.zen-title-text {
  font-family: var(--main-font);
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  letter-spacing: 0.16px;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
  max-width: 520px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: start;
}
html:lang(ar) .zen-title-text {
  font-family: var(--arabic-font-family);
}
.zen-title-text--mobile {
  font-family: var(--main-font);
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  letter-spacing: 0;
  line-height: 24px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .zen-title-text--mobile {
  font-family: var(--arabic-font-family);
}
.zen-title-text--drive-tablet {
  font-family: var(--main-font);
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  letter-spacing: 0.16px;
  line-height: 22px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .zen-title-text--drive-tablet {
  font-family: var(--arabic-font-family);
}
.zen-title-text--drive {
  font-family: var(--main-font);
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  letter-spacing: 0.16px;
  line-height: 20px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .zen-title-text--drive {
  font-family: var(--arabic-font-family);
}
.zen-card-title {
  margin: 0;
  padding: 0;
  font-size: inherit;
  font-weight: inherit;
  display: flex;
  gap: 8px;
  align-items: center;
  box-sizing: border-box;
  min-height: 24px;
  min-width: 0;
  text-decoration: none;
}
.zen-card-title * {
  box-sizing: border-box;
}
.zen-card-title__icon {
  height: 24px;
  width: 24px;
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  fill: var(--accents-general--detail);
  border-radius: 50%;
  background-color: var(--accents-general--main);
  box-sizing: border-box;
}
.zen-card-title__icon--success {
  fill: var(--accents-success--detail);
  background-color: var(--accents-success--main);
}
.zen-card-title__icon--error {
  fill: var(--accents-error--detail);
  background-color: var(--accents-error--main);
}
.zen-card-title__icon--warning {
  fill: var(--accents-warning--detail);
  background-color: var(--accents-warning--main);
}
.zen-card-title__icon--default {
  background-color: var(--backgrounds-content-1);
  fill: var(--text-secondary);
}
.zen-card-title__link {
  display: flex;
  gap: 4px;
  text-decoration: none;
  min-width: 0;
}
.zen-card-title__text,
.zen-card-title__link-text {
  font-family: var(--main-font);
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  letter-spacing: 0.16px;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
  max-width: 520px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: start;
  color: var(--text-primary);
}
html:lang(ar) .zen-card-title__text,
html:lang(ar) .zen-card-title__link-text {
  font-family: var(--arabic-font-family);
}
.zen-card-title__link-chevron {
  display: inline-flex;
  align-items: center;
  vertical-align: middle;
  width: 16px;
  height: 16px;
  fill: var(--text-primary);
}
.zen-card-title__clickable {
  border: none;
  background: none;
  padding: 0;
  font: inherit;
  gap: 4px;
  cursor: pointer;
}
.zen-card-title--drive .zen-card-title__text,
.zen-card-title--drive .zen-card-title__link-text {
  font-family: var(--main-font);
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  letter-spacing: 0.16px;
  line-height: 20px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .zen-card-title--drive .zen-card-title__text,
html:lang(ar) .zen-card-title--drive .zen-card-title__link-text {
  font-family: var(--arabic-font-family);
}
.zen-card-title--drive .zen-card-title__icon {
  width: 32px;
  height: 32px;
}
.zen-card-title--drive .zen-card-title__link-chevron {
  width: 20px;
  height: 20px;
}
.zen-card-title--drive-tablet .zen-card-title__text,
.zen-card-title--drive-tablet .zen-card-title__link-text {
  font-family: var(--main-font);
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  letter-spacing: 0.16px;
  line-height: 22px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .zen-card-title--drive-tablet .zen-card-title__text,
html:lang(ar) .zen-card-title--drive-tablet .zen-card-title__link-text {
  font-family: var(--arabic-font-family);
}
.zen-card-title--drive-tablet .zen-card-title__icon {
  width: 32px;
  height: 32px;
}
.zen-card-title--drive-tablet .zen-card-title__link-chevron {
  width: 20px;
  height: 20px;
}
.zen-card {
  box-sizing: border-box;
  display: grid;
  gap: 16px;
  grid-template-rows: auto 1fr;
}
.zen-card * {
  box-sizing: border-box;
}
.zen-card__header {
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
  box-sizing: border-box;
  min-width: 0;
}
.zen-card__header-primary {
  display: flex;
  gap: 4px;
  align-items: center;
  padding: 4px 0;
  width: 100%;
  max-height: 32px;
}
.zen-card__secondary {
  font-family: var(--main-font);
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.32px;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
  color: var(--text-secondary);
  width: 100%;
}
html:lang(ar) .zen-card__secondary {
  font-family: var(--arabic-font-family);
}
.zen-card__content {
  width: 100%;
  height: 100%;
}
.zen-card__content--overflow-hidden {
  overflow: hidden;
}
.zen-card__content--overflow-scroll {
  overflow-x: hidden;
  overflow-y: auto;
}
.zen-card__header-right {
  margin-left: auto;
  display: flex;
  gap: 8px;
  align-items: center;
}
.zen-card__date {
  font-family: var(--main-font);
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.32px;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
  color: var(--text-secondary, #4e677e);
  font-weight: 500;
  letter-spacing: 0.02rem;
  white-space: nowrap;
}
html:lang(ar) .zen-card__date {
  font-family: var(--arabic-font-family);
}
.zen-card__date--mobile {
  font-family: var(--main-font);
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  letter-spacing: 0.16px;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .zen-card__date--mobile {
  font-family: var(--arabic-font-family);
}
.zen-card__date--drive-tablet {
  font-family: var(--main-font);
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.32px;
  line-height: 18px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .zen-card__date--drive-tablet {
  font-family: var(--arabic-font-family);
}
.zen-card__date--drive {
  font-family: var(--main-font);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.32px;
  line-height: 18px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .zen-card__date--drive {
  font-family: var(--arabic-font-family);
}
.zen-card__date-mobile {
  font-family: var(--main-font);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.32px;
  line-height: 18px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .zen-card__date-mobile {
  font-family: var(--arabic-font-family);
}
.zen-card__menu-trigger {
  width: 32px;
  height: 32px;
  box-sizing: border-box;
}
.zen-card__menu-trigger--drive {
  width: 40px;
  height: 40px;
  padding: 9px;
}
.zen-card__menu-trigger--drive-tablet {
  width: 40px;
  height: 40px;
  padding: 9px;
}
.zen-card__menu-trigger--mobile {
  width: 40px;
  height: 40px;
  padding: 9px;
}
.zen-card__footer {
  display: flex;
  justify-content: flex-end;
}
.zen-card--no-header {
  grid-template-rows: 1fr;
}
.zen-menu-button {
  box-sizing: border-box;
  width: 100%;
  list-style-type: none;
}
.zen-menu-button * {
  box-sizing: border-box;
}
.zen-menu-button__action {
  outline: none;
  display: flex;
  font-family: var(--main-font);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
  padding: 12px 16px;
  width: 100%;
  height: 100%;
  border: 0;
  border-radius: 0;
  color: var(--text-primary);
  fill: var(--text-secondary);
}
html:lang(ar) .zen-menu-button__action {
  font-family: var(--arabic-font-family);
}
.zen-menu-button__action--has-children {
  padding: 12px 8px 12px 16px;
}
.zen-menu-button__action:focus,
.zen-menu-button__action:focus-visible,
.zen-menu-button__action:hover:not(.zen-menu-button__action--disabled):not(.zen-menu-button__action--selected):not(.zen-menu-button__action--active) {
  color: var(--text-primary);
  fill: var(--text-secondary);
  border-color: var(--borders-form-field--hover);
  background-color: var(--backgrounds-hover);
}
.zen-menu-button__action:active:not(.zen-menu-button__action--disabled),
.zen-menu-button__action--active:not(.zen-menu-button__action--disabled),
.zen-menu-button__action--selected {
  color: var(--text-reverse-primary);
  fill: var(--text-reverse-primary);
  border-color: var(--borders-form-field--active);
  background-color: var(--action-primary--default);
}
.zen-menu-button__action:active:not(.zen-menu-button__action--disabled):hover,
.zen-menu-button__action--active:not(.zen-menu-button__action--disabled):hover,
.zen-menu-button__action--selected:hover,
.zen-menu-button__action:active:not(.zen-menu-button__action--disabled):focus,
.zen-menu-button__action--active:not(.zen-menu-button__action--disabled):focus,
.zen-menu-button__action--selected:focus {
  background-color: var(--action-primary--hover);
  color: var(--text-reverse-primary);
  fill: var(--text-reverse-primary);
}
.zen-menu-button__action:disabled,
.zen-menu-button__action--disabled {
  color: var(--text-button-disabled);
  fill: var(--text-button-disabled);
  background-color: transparent;
  cursor: default;
}
.zen-menu-button__action-text {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-left: 0;
  margin-right: auto;
}
.zen-menu-button__action--drive,
.zen-menu-button__action--drive-tablet {
  font-family: var(--main-font);
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  letter-spacing: 0.16px;
  line-height: 20px;
  text-transform: none;
  text-decoration: none;
  font-weight: 400;
  padding: 16px;
}
html:lang(ar) .zen-menu-button__action--drive,
html:lang(ar) .zen-menu-button__action--drive-tablet {
  font-family: var(--arabic-font-family);
}
.zen-menu-button__action--drive.zen-menu-button__action--has-children,
.zen-menu-button__action--drive-tablet.zen-menu-button__action--has-children {
  padding: 16px 8px 16px 16px;
}
.zen-menu-button__action.zen-menu-button__action {
  outline: none;
}
.zen-menu-button__icon {
  flex: 0 0 auto;
}
.zen-menu-button__more-icon {
  flex: 0 0 auto;
  margin: 0 0 0 8px;
}
.zen-menu-item {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}
.zen-menu-item * {
  box-sizing: border-box;
}
.zen-menu-item__content {
  list-style-type: none;
}
.zen-popup {
  font-family: var(--main-font);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
  box-shadow: 0px 0px 8px 2px rgba(0, 0, 0, 0.2);
  border-radius: var(--border-radius-default);
  box-sizing: border-box;
  background-color: var(--backgrounds-main);
  padding: 4px 0;
  max-height: 90vh;
  border: 0px;
  min-height: 30px;
  min-width: 170px;
  max-width: 420px;
}
.zen-popup * {
  box-sizing: border-box;
}
html:lang(ar) .zen-popup {
  font-family: var(--arabic-font-family);
}
.zen-popup--padding {
  padding: 8px;
}
.zen-popup--no-padding {
  padding: 0;
}
.zen-popup--flex-width {
  min-width: auto;
  max-width: none;
}
.zen-popup--block {
  padding: 4px 0;
  box-shadow: 0px 2px 6px rgba(11, 32, 50, 0.2);
  border-radius: var(--border-radius-default);
}
@media (max-width: 640px) {
  .zen-popup {
    max-width: 100%;
  }
}
.zen-menu-separator {
  border-top: 1px solid var(--borders-general);
  height: 0;
}
.zen-side-panel {
  box-sizing: border-box;
  font-family: var(--main-font);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
  background-color: var(--backgrounds-main);
  box-shadow: 0 2px 6px rgba(11, 32, 50, 0.2);
  border-top-left-radius: var(--border-radius-default);
  border-bottom-left-radius: var(--border-radius-default);
  overflow: hidden;
  height: 100%;
  width: 25%;
  min-width: 360px;
  max-width: 600px;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 10007;
  display: flex;
  flex-direction: column;
  transform: translateX(100%);
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transition: transform 0.2s ease-out, opacity 0.2s ease-out, visibility 0.2s ease-out;
}
.zen-side-panel * {
  box-sizing: border-box;
}
html:lang(ar) .zen-side-panel {
  font-family: var(--arabic-font-family);
}
.zen-side-panel--shown {
  display: flex;
  transform: translateX(0);
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
}
.zen-side-panel.zen-side-panel--shown {
  transform: translateX(0);
}
.zen-side-panel--shown .zen-form-field--new-component {
  display: flex;
}
.zen-side-panel--left-positioned {
  left: 0;
  right: auto;
  transform: translateX(-100%);
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-top-right-radius: var(--border-radius-default);
  border-bottom-right-radius: var(--border-radius-default);
}
.zen-side-panel.zen-side-panel--left-positioned.zen-side-panel--shown {
  transform: translateX(0);
}
.zen-side-panel.zen-side-panel--drive {
  font-family: var(--main-font);
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 20px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .zen-side-panel.zen-side-panel--drive {
  font-family: var(--arabic-font-family);
}
.zen-side-panel.zen-side-panel--drive-tablet {
  font-family: var(--main-font);
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 22px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .zen-side-panel.zen-side-panel--drive-tablet {
  font-family: var(--arabic-font-family);
}
.zen-side-panel--bottom-positioned {
  width: 100%;
  max-width: 100%;
  height: auto;
  max-height: 100%;
  border-top-left-radius: var(--border-radius-default);
  border-bottom-left-radius: 0;
  border-top-right-radius: var(--border-radius-default);
  border-bottom-right-radius: 0;
  transform: translateY(100%);
  top: auto;
  bottom: 0;
}
.zen-side-panel.zen-side-panel--bottom-positioned.zen-side-panel--shown {
  transform: translateY(0);
}
@media (max-width: 640px) {
  .zen-side-panel {
    width: 100%;
    min-width: 100%;
    max-width: 100%;
    border-top-left-radius: var(--border-radius-default);
    border-top-right-radius: var(--border-radius-default);
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
  .zen-side-panel.zen-side-panel--drive,
  .zen-side-panel.zen-side-panel--drive-tablet {
    max-width: 100%;
  }
}
.zen-side-panel--shown-keyboard.zen-side-panel--bottom-positioned {
  top: 0;
}
.zen-side-panel-cell {
  box-sizing: border-box;
  padding: 16px;
  border-bottom: 1px solid var(--backgrounds-content-1);
  background-color: var(--backgrounds-main);
}
.zen-side-panel-cell * {
  box-sizing: border-box;
}
.zen-side-panel-cell__title {
  font-family: var(--main-font);
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.32px;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
  color: var(--text-primary);
  margin: 0 0 16px 0;
}
html:lang(ar) .zen-side-panel-cell__title {
  font-family: var(--arabic-font-family);
}
.zen-side-panel-cell__footer {
  margin: 16px 0 0 0;
}
.zen-side-panel-cell--no-padding {
  padding-left: 0;
  padding-right: 0;
}
.zen-side-panel-cell--no-padding .zen-side-panel-cell__title {
  padding-left: 16px;
}
.zen-toast {
  box-sizing: border-box;
  display: grid;
  grid-template-rows: 0.25rem 1fr;
  border-radius: 4px;
  width: 23rem;
  height: 3.5rem;
}
.zen-toast * {
  box-sizing: border-box;
}
.zen-toast--mobile {
  width: 100%;
}
.zen-toast--drive {
  height: 4.25rem;
}
.zen-toast__content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem;
}
.zen-toast__content-start,
.zen-toast__content-end {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}
.zen-toast__content-start {
  display: grid;
  grid-template-columns: 1fr;
  align-items: center;
}
.zen-toast__content-start--icon {
  grid-template-columns: 1.5rem 1fr;
}
.zen-toast__content-end {
  display: grid;
  grid-template-columns: 1.5rem;
  align-items: center;
}
.zen-toast__content-end--action {
  display: grid;
  grid-template-columns: minmax(4.6875rem, 6.875rem) 1.5rem;
  justify-self: end;
}
.zen-toast--info {
  background-color: var(--accents-general--main);
  border-color: var(--accents-general--detail);
}
.zen-toast--success {
  background-color: var(--accents-success--main);
  border-color: var(--accents-success--detail);
}
.zen-toast__icon {
  padding-inline-end: 0.5rem;
}
.zen-toast__icon--info {
  fill: var(--accents-general--detail);
}
.zen-toast__icon--success {
  fill: var(--accents-success--detail);
}
.zen-toast__header {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  font-family: var(--main-font);
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  letter-spacing: 0.16px;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .zen-toast__header {
  font-family: var(--arabic-font-family);
}
.zen-toast__header--info {
  color: var(--accents-general--detail);
  fill: var(--accents-general--detail);
}
.zen-toast__header--success {
  color: var(--accents-success--detail);
  fill: var(--accents-success--detail);
}
.zen-toast__close-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.25rem;
  height: 1.25rem;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  border-radius: 50%;
}
.zen-toast__close-button:active,
.zen-toast__close-button:focus,
.zen-toast__close-button:hover {
  background-color: var(--backgrounds-reverse-1);
  fill: var(--text-reverse-primary);
}
.zen-toast__close-button--info {
  fill: var(--accents-general--detail);
  color: var(--accents-general--detail);
  outline-color: var(--accents-general--detail);
}
.zen-toast__close-button--success {
  fill: var(--accents-success--detail);
  color: var(--accents-success--detail);
  outline-color: var(--accents-success--detail);
}
.zen-toast__action {
  max-width: 6.875rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-wrap: normal;
  justify-self: end;
}
.zen-toast__progress {
  border-radius: 4px 4px 0 0;
  transition: width 0.3s linear;
}
.zen-toast__progress--active {
  border-radius: 4px 0 0 0;
}
.zen-toast__progress--info {
  background-color: var(--accents-general--detail);
}
.zen-toast__progress--success {
  background-color: var(--accents-success--detail);
}
.zen-alert {
  box-sizing: border-box;
  font-family: var(--main-font);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 28px;
  text-transform: none;
  text-decoration: none;
  box-shadow: 0px 0px 8px 2px rgba(0, 0, 0, 0.2);
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 1rem;
  border-radius: 8px;
  background-color: var(--backgrounds-main);
  max-width: 23rem;
  min-width: 23rem;
  min-height: 6rem;
  max-height: 13.75rem;
}
.zen-alert * {
  box-sizing: border-box;
}
html:lang(ar) .zen-alert {
  font-family: var(--arabic-font-family);
}
.zen-alert--with-header {
  min-height: 8rem;
}
.zen-alert::before {
  content: "";
  position: absolute;
  top: 0;
  inset-inline-start: -0.25rem;
  width: 0.5rem;
  height: 100%;
  border-start-start-radius: 15px;
  border-end-start-radius: 15px;
  border-inline-start: 4px solid transparent;
}
.zen-alert__header {
  display: grid;
  grid-template-columns: minmax(1.25rem, 1.5rem) 1fr minmax(1.25rem, 1.5rem);
}
.zen-alert__content {
  flex-grow: 1;
  display: flex;
}
.zen-alert__body {
  font-family: var(--main-font);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 28px;
  text-transform: none;
  text-decoration: none;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  line-height: 1.5rem;
  gap: 0.5rem;
}
html:lang(ar) .zen-alert__body {
  font-family: var(--arabic-font-family);
}
.zen-alert__body-actions {
  display: flex;
  gap: 0.5rem;
  margin-inline-start: auto;
}
.zen-alert__button {
  font-size: 0.75rem;
  max-width: 8.75rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-wrap: normal;
}
.zen-alert__text {
  display: -webkit-box;
  line-clamp: 4;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  color: var(--text-primary);
}
.zen-alert__title {
  display: -webkit-box;
  line-clamp: 4;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  padding-top: 0.125rem;
  color: var(--text-primary);
  font-family: var(--main-font);
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  letter-spacing: 0.16px;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .zen-alert__title {
  font-family: var(--arabic-font-family);
}
.zen-alert__close-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.25rem;
  height: 1.25rem;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  border-radius: 50%;
  fill: var(--text-primary);
}
.zen-alert__close-button:active,
.zen-alert__close-button:focus,
.zen-alert__close-button:hover {
  background-color: var(--backgrounds-reverse-1);
  fill: var(--text-reverse-primary);
}
.zen-alert__actions {
  height: 100%;
  margin-inline-start: auto;
}
.zen-alert--error::before {
  border-inline-start-color: var(--action-destructive--active);
}
.zen-alert--info::before {
  border-inline-start-color: var(--accents-general--detail);
}
.zen-alert--success::before {
  border-inline-start-color: var(--accents-success--detail);
}
.zen-alert--warning::before {
  border-inline-start-color: var(--accents-warning--detail);
}
.zen-alert__icon {
  padding-inline-end: 0.5rem;
}
.zen-alert__icon--error {
  fill: var(--accents-error--detail);
}
.zen-alert__icon--info {
  fill: var(--accents-general--detail);
}
.zen-alert__icon--success {
  fill: var(--accents-success--detail);
}
.zen-alert__icon--warning {
  fill: var(--accents-warning--detail);
}
.zen-alert__body-container {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
}
.zen-alert__header-container {
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
  width: 100%;
}
.zen-alert--drive {
  min-height: 7.125rem;
  max-height: 14.375rem;
}
.zen-alert--drive.zen-alert--mobile .zen-alert__title {
  font-family: var(--main-font);
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  letter-spacing: 0.16px;
  line-height: 20px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .zen-alert--drive.zen-alert--mobile .zen-alert__title {
  font-family: var(--arabic-font-family);
}
.zen-alert--drive.zen-alert--mobile .zen-alert__text {
  font-family: var(--main-font);
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 26px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .zen-alert--drive.zen-alert--mobile .zen-alert__text {
  font-family: var(--arabic-font-family);
}
.zen-alert--drive .zen-alert__title {
  font-family: var(--main-font);
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  letter-spacing: 0.16px;
  line-height: 22px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .zen-alert--drive .zen-alert__title {
  font-family: var(--arabic-font-family);
}
.zen-alert--drive--with-header {
  min-height: 8.625rem;
}
.zen-alert--drive .zen-alert__text {
  line-clamp: 4;
  -webkit-line-clamp: 4;
  font-family: var(--main-font);
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 28px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .zen-alert--drive .zen-alert__text {
  font-family: var(--arabic-font-family);
}
.zen-alert--drive .zen-alert__icon {
  padding-top: 0.125rem;
}
.zen-alert--mobile {
  max-width: 100%;
  min-width: unset;
}
.zen-mobile-sheet-footer {
  box-sizing: border-box;
  border-top: 1px solid var(--borders-general);
  display: grid;
  gap: 12px;
}
.zen-mobile-sheet-footer * {
  box-sizing: border-box;
}
.zen-mobile-sheet-footer--borderless {
  border-top-width: 0;
}
.zen-mobile-sheet-wrapper {
  z-index: 11010;
}
.zen-mobile-sheet-shield {
  z-index: 11007;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.zen-mobile-sheet {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  width: 100%;
  flex: 1 1 0%;
  overflow: hidden;
}
.zen-mobile-sheet * {
  box-sizing: border-box;
}
.zen-mobile-sheet__title {
  font-family: var(--main-font);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
  color: var(--text-secondary);
  padding: 12px 8px 12px 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
html:lang(ar) .zen-mobile-sheet__title {
  font-family: var(--arabic-font-family);
}
.zen-mobile-sheet__title.zen-mobile-sheet__title--drive {
  font-family: var(--main-font);
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 20px;
  text-transform: none;
  text-decoration: none;
  padding: 0;
  padding-left: 12px;
}
html:lang(ar) .zen-mobile-sheet__title.zen-mobile-sheet__title--drive {
  font-family: var(--arabic-font-family);
}
.zen-mobile-sheet__title.zen-mobile-sheet__title--drive .zen-mobile-sheet__close-button {
  margin-top: 0;
  margin-bottom: 0;
}
.zen-mobile-sheet__title.zen-mobile-sheet__title--drive-tablet {
  font-family: var(--main-font);
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 22px;
  text-transform: none;
  text-decoration: none;
  padding: 0;
  padding-left: 12px;
}
html:lang(ar) .zen-mobile-sheet__title.zen-mobile-sheet__title--drive-tablet {
  font-family: var(--arabic-font-family);
}
.zen-mobile-sheet__title.zen-mobile-sheet__title--drive-tablet .zen-mobile-sheet__close-button {
  margin-top: 0;
  margin-bottom: 0;
}
.zen-mobile-sheet__close-button {
  width: auto;
  margin-top: -6px;
  margin-bottom: -6px;
}
.zen-mobile-sheet__title-text {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  text-overflow: ellipsis;
}
.zen-mobile-sheet__content {
  flex: 1 1 auto;
  overflow-y: auto;
}
.zen-mobile-sheet--mobile-android {
  overflow-y: hidden;
  position: fixed;
}
.zen-mobile-sheet__footer {
  flex: 0 0 auto;
}
.zen-mobile-sheet-wrapper--drive.zen-mobile-sheet-wrapper--drive,
.zen-mobile-sheet-wrapper--drive-tablet.zen-mobile-sheet-wrapper--drive-tablet {
  max-width: 520px;
  min-width: 520px;
  left: calc(50% - 260px);
}
@media (max-width: 520px) {
  .zen-mobile-sheet-wrapper--drive.zen-mobile-sheet-wrapper--drive,
  .zen-mobile-sheet-wrapper--drive-tablet.zen-mobile-sheet-wrapper--drive-tablet {
    max-width: 100%;
    min-width: 100%;
    left: 0;
  }
}
.zen-action-list {
  outline: none;
}
.zen-controlled-menu {
  z-index: 11002;
}
.zen-controlled-menu--submenu-1 {
  z-index: 11003;
}
.zen-controlled-menu--submenu-2 {
  z-index: 11004;
}
.zen-controlled-menu--submenu-3 {
  z-index: 11005;
}
.zen-controlled-menu--submenu-4 {
  z-index: 11006;
}
.zen-controlled-menu--submenu-5 {
  z-index: 11007;
}
.zen-controlled-menu-submenu--1 {
  z-index: 11003;
}
.zen-controlled-menu-submenu--2 {
  z-index: 11004;
}
.zen-controlled-menu-submenu--3 {
  z-index: 11005;
}
.zen-controlled-menu-submenu--4 {
  z-index: 11006;
}
.zen-controlled-menu-submenu--5 {
  z-index: 11007;
}
.zen-card-button--drive-tablet {
  padding-top: 12px;
  padding-bottom: 12px;
}
.zen-card-button--drive {
  padding-top: 11px;
  padding-bottom: 11px;
}
.zen-favorite-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  background-color: transparent;
  border: none;
  fill: var(--text-secondary);
  cursor: pointer;
  border-radius: var(--border-radius-default);
}
.zen-favorite-button:hover {
  background-color: var(--backgrounds-content-1);
}
.zen-favorite-button__empty {
  display: initial;
  flex: 0 0 auto;
}
.zen-favorite-button__filled.zen-favorite-button__filled {
  display: none;
  flex: 0 0 auto;
}
.zen-favorite-button--filled .zen-favorite-button__filled {
  display: initial;
}
.zen-favorite-button--filled .zen-favorite-button__empty {
  display: none;
}
.zen-favorite-button--drive,
.zen-favorite-button--drive-tablet,
.zen-favorite-button--mobile {
  width: 2.5rem;
  height: 2.5rem;
}
.zen-form-section {
  display: grid;
  gap: 24px;
  height: 100%;
}
.zen-form-section--desktop.zen-form-section--one-column {
  grid-template-columns: repeat(8, 1fr);
}
.zen-form-section--tablet.zen-form-section--one-column {
  grid-template-columns: repeat(6, 1fr);
}
.zen-form-section--mobile.zen-form-section--one-column {
  grid-template-columns: repeat(4, 1fr);
}
.zen-form-section--desktop.zen-form-section--two-column {
  grid-template-columns: repeat(6, 1fr);
}
.zen-form-section--tablet.zen-form-section--two-column {
  grid-template-columns: repeat(4, 1fr);
}
.zen-form-section--mobile.zen-form-section--two-column {
  grid-template-columns: repeat(4, 1fr);
}
.zen-form-section--modal {
  grid-template-columns: repeat(4, 1fr);
}
.zen-data-feed {
  --feed-gap: 4px;
  --display-full-list: none;
  --feed-row-margin: 2px;
  --feed-main-row-margin: 2px;
  display: flex;
  flex-direction: column;
  gap: var(--feed-gap);
  font-family: var(--main-font);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .zen-data-feed {
  font-family: var(--arabic-font-family);
}
.zen-data-feed__item-container {
  box-shadow: 0px 0px 8px 2px rgba(0, 0, 0, 0.1);
  display: flex;
}
.zen-data-feed__action-container {
  padding-top: 8px;
  padding-right: 8px;
  padding-left: 4px;
}
.zen-data-feed__content {
  flex: 1 1 auto;
  min-width: 150px;
}
.zen-data-feed__wrapper {
  flex: 0 0 auto;
  padding-block: 6px;
}
.zen-data-feed--full-list {
  --display-full-list: flex;
  --feed-row-margin: 4px;
  --feed-main-row-margin: 6px;
}
.zen-data-feed--full-list .zen-data-feed__wrapper {
  padding-block: 9px;
}
.zen-data-feed--scrollable {
  overflow-y: auto;
}
.zen-data-feed--empty .zen-data-feed__feed {
  display: none;
}
:root {
  --grid-header-height: 52px;
}
.zen-data-grid-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  contain: strict;
}
.zen-data-grid-not-interactive-mixin {
  pointer-events: none;
  user-select: none;
  -webkit-user-select: none;
  -webkit-user-drag: none;
}
.zen-data-grid-loading-mixin {
  filter: blur(7px);
  animation: load-column 1s linear infinite alternate;
}
.zen-data-grid {
  box-sizing: border-box;
  position: relative;
  overflow: auto;
  border: 1px solid var(--borders-general);
  border-radius: var(--border-radius-default);
  display: flex;
  flex-direction: column;
  flex: 0 1 auto;
  background-color: var(--backgrounds-main);
  color: var(--text-primary);
  fill: var(--text-primary);
  --row-height: 48px;
  --cell-side-padding: 10px;
  --cell-vertical-padding: 12px;
}
.zen-data-grid * {
  box-sizing: border-box;
}
.zen-data-grid__table {
  /* border-collapse: collapse; */
  border-spacing: 0;
  border-radius: var(--border-radius-default);
  min-width: 100%;
}
.zen-data-grid__footer {
  border-top: 1px solid var(--borders-general);
  position: sticky;
  left: 0;
}
.zen-data-grid__header-row {
  height: var(--grid-header-height);
}
.zen-data-grid__header-cell {
  padding: 0;
  border-bottom: 1px solid var(--borders-general);
  min-width: 60px;
  height: var(--grid-header-height);
  background-color: var(--backgrounds-main);
  position: sticky;
  top: 0;
  z-index: 3;
  text-align: left;
}
.zen-data-grid__header-cell:first-child {
  border-top-left-radius: var(--border-radius-default);
}
.zen-data-grid__header-cell:last-child {
  border-top-right-radius: var(--border-radius-default);
}
.zen-data-grid__header-cell:hover {
  background-color: var(--backgrounds-hover);
}
.zen-data-grid__header-cell--first {
  left: 0;
  z-index: 4;
}
.zen-data-grid__header-cell--first .zen-data-grid__header-cell-content {
  border-inline-start: none;
  font-weight: bold;
}
.zen-data-grid__header-cell-content {
  font-family: var(--main-font);
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.32px;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
  border-inline-start: 1px solid var(--borders-general);
  height: var(--grid-header-height);
  padding-inline: 12px;
  display: flex;
  align-items: center;
}
html:lang(ar) .zen-data-grid__header-cell-content {
  font-family: var(--arabic-font-family);
}
.zen-data-grid__row {
  height: var(--row-height);
  font-family: var(--main-font);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .zen-data-grid__row {
  font-family: var(--arabic-font-family);
}
.zen-data-grid__row:first-child .zen-data-grid__row-cell {
  border-block-start: none;
}
.zen-data-grid__row:hover > .zen-data-grid__row-cell {
  background-color: var(--backgrounds-hover);
}
.zen-data-grid__row:hover > .zen-data-grid__row-cell--visible-on-hover {
  position: sticky;
  right: 0;
}
.zen-data-grid__row:hover > .zen-data-grid__row-cell--active {
  background-color: var(--backgrounds-content-2);
}
.zen-data-grid__row--selected > .zen-data-grid__row-cell {
  background-color: var(--backgrounds-content-0);
}
.zen-data-grid__row--last > .zen-data-grid__row-cell:first-child {
  border-bottom-left-radius: var(--border-radius-default);
}
.zen-data-grid__row--last > .zen-data-grid__row-cell:last-child {
  border-bottom-right-radius: var(--border-radius-default);
}
.zen-data-grid__row--nested .zen-data-grid__row-cell:first-child {
  padding-left: 52px;
}
.zen-data-grid__row-cell {
  font-family: var(--main-font);
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.32px;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
  color: var(--text-primary);
  background-color: var(--backgrounds-main);
  border-block-start: 1px solid var(--borders-general);
  padding: var(--cell-side-padding) var(--cell-vertical-padding);
}
html:lang(ar) .zen-data-grid__row-cell {
  font-family: var(--arabic-font-family);
}
.zen-data-grid__row-cell--first {
  position: sticky;
  left: 0;
  z-index: 2;
}
.zen-data-grid__row-cell--loading {
  pointer-events: none;
  user-select: none;
  -webkit-user-select: none;
  -webkit-user-drag: none;
  filter: blur(7px);
  animation: load-column 1s linear infinite alternate;
}
.zen-data-grid__row-cell--nested {
  background-color: var(--backgrounds-content-0);
  border-block-start: none;
}
.zen-data-grid__row-cell--clickable {
  cursor: pointer;
}
.zen-data-grid__row-cell--active {
  background-color: var(--backgrounds-content-2);
}
.zen-data-grid__empty {
  flex: 1 1 auto;
}
.zen-data-grid--horizontal-scroll .zen-data-grid__header-cell--first {
  border-inline-end: 1px solid var(--borders-general);
  box-shadow: 1px 0px 2px rgba(0, 0, 0, 0.2);
}
.zen-data-grid--horizontal-scroll .zen-data-grid__row-cell--first {
  border-inline-end: 1px solid var(--borders-general);
  box-shadow: 1px 0px 2px rgba(0, 0, 0, 0.2);
}
.zen-data-grid--not-interactive .zen-data-grid__table {
  pointer-events: none;
  user-select: none;
  -webkit-user-select: none;
  -webkit-user-drag: none;
}
.zen-data-grid--loading .zen-data-grid__table {
  pointer-events: none;
  user-select: none;
  -webkit-user-select: none;
  -webkit-user-drag: none;
}
.zen-data-grid--loading .zen-data-grid__row-cell {
  filter: blur(7px);
  animation: load-column 1s linear infinite alternate;
}
.zen-data-grid--dragging {
  cursor: grabbing;
}
.zen-data-grid-header {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-wrap: normal;
}
.zen-data-grid-header--multiline {
  white-space: normal;
  display: -webkit-box;
  line-clamp: 2;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-word;
}
.zen-actions-column {
  display: flex;
  justify-content: flex-end;
  width: 100%;
  gap: 1rem;
}
.zen-actions-column__action {
  flex-shrink: 0;
}
.zen-actions-column__action_error {
  background-color: var(--accents-error--main);
  fill: var(--text-error-message);
}
.zen-actions-column__waiting {
  padding: 16px 20px;
}
.zen-skeleton-list {
  box-sizing: border-box;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 26px;
}
.zen-skeleton-list * {
  box-sizing: border-box;
}
.zen-menu-error-item {
  background-color: var(--accents-error--main);
  padding: 12px 16px;
  width: 100%;
}
.zen-menu-error-item__nav {
  color: var(--text-nav-highlight);
  fill: var(--text-nav-highlight);
  text-align: left;
}
.zen-menu-error-item:active,
.zen-menu-error-item:focus,
.zen-menu-error-item:hover {
  outline: none;
}
.zen-feed-item {
  padding: 12px;
  border-bottom: 1px solid var(--borders-general);
  background: var(--backgrounds-main);
  display: flex;
  flex-direction: column;
  row-gap: 4px;
}
.zen-feed-item__main-row {
  display: flex;
  flex-direction: column;
  row-gap: 8px;
}
.zen-feed-item__content {
  display: flex;
  justify-content: space-between;
}
.zen-feed-item__main {
  flex: 1 1 auto;
  display: flex;
  flex-direction: row;
  gap: 12px;
  min-width: 0;
  width: 100%;
  align-items: center;
}
.zen-feed-item__icon {
  flex: 0 0 auto;
  padding: 4px;
}
.zen-feed-item__icon-placeholder {
  width: 32px;
  flex: 0 0 auto;
}
.zen-feed-item__main-data {
  display: flex;
  gap: 8px;
  align-items: center;
  flex: 1 1 auto;
  min-width: 0;
}
.zen-feed-item__identifier {
  font-family: var(--main-font);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
  color: var(--text-primary);
  flex: 1 1 100%;
  min-width: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;
}
html:lang(ar) .zen-feed-item__identifier {
  font-family: var(--arabic-font-family);
}
.zen-feed-item__identifier .zen-feed-item__label {
  width: 104px;
  flex: 0 0 auto;
}
.zen-feed-item__secondary-data {
  display: flex;
  flex-direction: row;
  column-gap: 12px;
  flex: 1 1 auto;
}
.zen-feed-item__values {
  display: grid;
  grid-template-columns: minmax(104px, 104px) 1fr;
  align-items: baseline;
  gap: 4px;
  overflow-wrap: break-word;
  word-wrap: break-word;
  width: 100%;
}
.zen-feed-item__label {
  grid-column: 1/2;
  font-family: var(--main-font);
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.32px;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
  color: var(--text-secondary);
}
html:lang(ar) .zen-feed-item__label {
  font-family: var(--arabic-font-family);
}
.zen-feed-item__value {
  color: var(--text-primary);
  grid-column: 2/2;
  font-family: var(--main-font);
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.32px;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
  min-width: 104px;
}
html:lang(ar) .zen-feed-item__value {
  font-family: var(--arabic-font-family);
}
.zen-feed-item__nested {
  padding-left: 40px;
}
.zen-feed-item .zen-feed-item {
  padding: 12px 0;
  border-bottom: none;
}
.zen-feed-item .zen-feed-item .zen-feed-item__secondary-data {
  column-gap: 0;
}
.zen-feed-item .zen-feed-item .zen-feed-item__icon-placeholder {
  width: 0;
}
.zen-feed-item .zen-feed-item .zen-feed-item__main-row {
  row-gap: 4px;
}
.zen-checkbox-column {
  box-sizing: border-box;
  display: flex;
  width: 100%;
  gap: 8px;
}
.zen-checkbox-column * {
  box-sizing: border-box;
}
.zen-checkbox-column__controls {
  display: flex;
  flex: 0 0 auto;
  align-items: center;
}
.zen-checkbox-column__checkbox {
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
}
.zen-checkbox-column__content {
  flex: 1 1 auto;
  align-self: center;
  min-width: 0;
}
.zen-checkbox-column__popup:focus-visible {
  outline: none;
  border-color: var(--borders-form-field--active);
}
.zen-checkbox-column__padding {
  padding-left: 40px;
}
.zen-checkbox-column--with-actions.zen-checkbox-column {
  gap: 8px;
}
.zen-checkbox-column--with-actions .zen-checkbox-column__checkbox {
  display: flex;
  align-items: center;
}
.zen-checkbox-column--no-checkbox .zen-checkbox-column__checkbox {
  display: none;
}
.zen-checkbox {
  box-sizing: border-box;
}
.zen-checkbox * {
  box-sizing: border-box;
}
.zen-checkbox__input {
  position: absolute;
  width: 0;
  height: 0;
  opacity: 0;
  outline: none;
}
.zen-checkbox__box {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1rem;
  height: 1rem;
  min-width: 1rem;
  border-radius: var(--border-radius-default);
  background-color: var(--backgrounds-main);
  border: var(--border-width-default) solid var(--borders-form-field--hover);
  color: var(--text-primary);
  cursor: pointer;
}
.zen-checkbox--mobile .zen-checkbox__box {
  width: 1.5rem;
  height: 1.5rem;
  min-width: 1.5rem;
}
.zen-checkbox--mobile .zen-checkbox__label-text {
  font-family: var(--main-font);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .zen-checkbox--mobile .zen-checkbox__label-text {
  font-family: var(--arabic-font-family);
}
.zen-checkbox__label {
  cursor: pointer;
  display: flex;
  gap: 0.5rem;
  align-items: center;
  fill: var(--text-reverse-primary);
  color: var(--text-primary);
}
.zen-checkbox__label--reverse {
  flex-direction: row-reverse;
}
.zen-checkbox--drive .zen-checkbox__label-text {
  font-family: var(--main-font);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.32px;
  line-height: 20px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .zen-checkbox--drive .zen-checkbox__label-text {
  font-family: var(--arabic-font-family);
}
.zen-checkbox--drive .zen-checkbox__box {
  width: 1.5rem;
  height: 1.5rem;
  min-width: 1.5rem;
}
.zen-checkbox--drive-tablet .zen-checkbox__label-text {
  font-family: var(--main-font);
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.32px;
  line-height: 22px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .zen-checkbox--drive-tablet .zen-checkbox__label-text {
  font-family: var(--arabic-font-family);
}
.zen-checkbox--drive-tablet .zen-checkbox__box {
  width: 1.5rem;
  height: 1.5rem;
  min-width: 1.5rem;
}
.zen-checkbox__label-text {
  font-family: var(--main-font);
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.32px;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .zen-checkbox__label-text {
  font-family: var(--arabic-font-family);
}
.zen-checkbox__label-text--full-width {
  width: 100%;
}
.zen-checkbox__icon {
  fill: var(--backgrounds-main);
  display: none;
}
.zen-checkbox__icon--hidden {
  display: none;
}
.zen-checkbox__icon--disabled {
  fill: var(--backgrounds-content-0);
}
.zen-checkbox:has(.zen-checkbox__input:checked) .zen-checkbox__box,
.zen-checkbox:has(.zen-checkbox__input:indeterminate) .zen-checkbox__box {
  border-color: var(--borders-form-field--active);
  background-color: var(--borders-form-field--active);
  fill: var(--text-reverse-primary);
  color: var(--text-reverse-primary);
  stroke: var(--text-reverse-primary);
}
.zen-checkbox:has(.zen-checkbox__input:checked) .zen-checkbox__box .zen-checkbox__icon,
.zen-checkbox:has(.zen-checkbox__input:indeterminate) .zen-checkbox__box .zen-checkbox__icon {
  display: block;
}
.zen-checkbox:has(.zen-checkbox__input:focus) .zen-checkbox__box,
.zen-checkbox:has(.zen-checkbox__input:focus) .zen-checkbox__label {
  outline: 1px solid var(--zen-checkbox-outline, var(--borders-form-field--active));
  outline-offset: var(--border-width-default);
}
/* This was added because safari just added support for :focus-visible. Can be removed after 3 versions of safari browser. */
@supports selector(:focus-visible) {
  .zen-checkbox:has(.zen-checkbox__input:focus) .zen-checkbox__box,
  .zen-checkbox:has(.zen-checkbox__input:focus) .zen-checkbox__label {
    outline: none;
  }
  .zen-checkbox:has(.zen-checkbox__input:focus-visible) .zen-checkbox__box,
  .zen-checkbox:has(.zen-checkbox__input:focus-visible) .zen-checkbox__label {
    outline: 1px solid var(--zen-checkbox-outline, var(--borders-form-field--active));
    outline-offset: var(--border-width-default);
  }
}
.zen-checkbox:has(.zen-checkbox__input:disabled) .zen-checkbox__label {
  fill: var(--text-reverse-primary);
  color: var(--text-button-disabled);
}
.zen-checkbox:has(.zen-checkbox__input:disabled) .zen-checkbox__box {
  border-color: var(--borders-general);
  background-color: var(--backgrounds-field-disabled);
}
.zen-checkbox:has(.zen-checkbox__input:disabled:checked) .zen-checkbox__box,
.zen-checkbox:has(.zen-checkbox__input:disabled:indeterminate) .zen-checkbox__box {
  border-color: var(--borders-general);
  background-color: var(--borders-general);
}
.zen-checkbox[data-checked="true"] > .zen-checkbox__label > .zen-checkbox__box,
.zen-checkbox[data-indeterminate="true"] > .zen-checkbox__label > .zen-checkbox__box {
  border-color: var(--borders-form-field--active);
  background-color: var(--borders-form-field--active);
  fill: var(--text-reverse-primary);
  color: var(--text-reverse-primary);
}
.zen-checkbox[data-checked="true"] > .zen-checkbox__label > .zen-checkbox__box .zen-checkbox__icon,
.zen-checkbox[data-indeterminate="true"] > .zen-checkbox__label > .zen-checkbox__box .zen-checkbox__icon {
  display: block;
}
.zen-checkbox[data-disabled="true"] > .zen-checkbox__label {
  cursor: default;
}
.zen-checkbox[data-disabled="true"] > .zen-checkbox__label > .zen-checkbox__box {
  border-color: var(--borders-general);
  background-color: var(--backgrounds-field-disabled);
  cursor: default;
}
.zen-checkbox[data-disabled="true"][data-checked="true"] > .zen-checkbox__label > .zen-checkbox__box,
.zen-checkbox[data-disabled="true"][data-indeterminate="true"] > .zen-checkbox__label > .zen-checkbox__box {
  border-color: var(--borders-general);
  background-color: var(--borders-general);
}
.zen-select-list {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  overflow: auto;
  outline: none;
}
.zen-select-list * {
  box-sizing: border-box;
}
.zen-select-list__item {
  list-style: none;
  display: flex;
}
.zen-select-list__item-content {
  width: 100%;
  padding-block: 0.75rem;
  padding-inline: 1rem;
  color: var(--text-primary);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-wrap: normal;
}
.zen-select-list[aria-disabled="true"] {
  cursor: not-allowed;
  color: var(--text-placeholder);
  background-color: var(--backgrounds-field-disabled);
  pointer-events: none;
}
.zen-select-list.zen-select-list--drive .zen-select-list__item-content,
.zen-select-list.zen-select-list--drive-tablet .zen-select-list__item-content {
  padding: 1rem;
}
.zen-select-item {
  box-sizing: border-box;
  font-family: var(--main-font);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
  position: relative;
  cursor: pointer;
}
.zen-select-item * {
  box-sizing: border-box;
}
html:lang(ar) .zen-select-item {
  font-family: var(--arabic-font-family);
}
.zen-select-item:hover > .zen-select-item__wrapper {
  background-color: var(--backgrounds-hover);
}
.zen-select-item[aria-disabled="true"] {
  cursor: default;
}
.zen-select-item[aria-disabled="true"] > .zen-select-item__wrapper {
  color: var(--text-button-disabled);
  fill: var(--text-button-disabled);
}
.zen-select-item:not(.zen-select-item--with-checkbox)[aria-selected="true"] > .zen-select-item__wrapper {
  color: var(--text-reverse-primary);
  fill: var(--text-reverse-primary);
  background-color: var(--action-primary--default);
}
.zen-select-item:not(.zen-select-item--with-checkbox)[aria-selected="true"]:hover > .zen-select-item__wrapper {
  background-color: var(--action-primary--hover);
}
.zen-select-item:not(.zen-select-item--with-checkbox)[aria-selected="true"][aria-disabled="true"] > .zen-select-item__wrapper {
  color: var(--text-button-disabled);
  fill: var(--text-button-disabled);
  background-color: var(--backgrounds-field-disabled);
}
.zen-select-item:not(.zen-select-item--with-checkbox).zen-select-item--focused[aria-selected="true"] > .zen-select-item__wrapper {
  background-color: var(--action-primary--hover);
}
.zen-select-item--focused .zen-select-item__wrapper {
  background-color: var(--backgrounds-hover);
}
.zen-select-item .zen-select-item__wrapper--with-arrow {
  display: flex;
  justify-content: space-between;
  padding-inline-end: 0.5rem;
  fill: var(--text-primary);
}
.zen-select-item.zen-select-item--drive {
  font-family: var(--main-font);
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 20px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .zen-select-item.zen-select-item--drive {
  font-family: var(--arabic-font-family);
}
.zen-select-item.zen-select-item--drive-tablet {
  font-family: var(--main-font);
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 22px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .zen-select-item.zen-select-item--drive-tablet {
  font-family: var(--arabic-font-family);
}
.zen-main-column,
.zen-link-column {
  display: flex;
  align-items: center;
  gap: 12px;
}
.zen-main-column__icon,
.zen-link-column__icon {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.zen-main-column__content,
.zen-link-column__content {
  max-width: 100%;
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  min-width: 0;
  align-items: flex-start;
}
.zen-main-column__name,
.zen-link-column__name {
  font-family: var(--main-font);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-wrap: normal;
  color: var(--text-primary);
  max-width: 100%;
}
html:lang(ar) .zen-main-column__name,
html:lang(ar) .zen-link-column__name {
  font-family: var(--arabic-font-family);
}
.zen-main-column__name--link,
.zen-link-column__name--link {
  color: var(--text-hyperlink);
  text-decoration: none;
}
.zen-main-column__name--link:hover,
.zen-link-column__name--link:hover {
  text-decoration: underline;
}
.zen-main-column__name--link:focus-visible,
.zen-link-column__name--link:focus-visible {
  outline: 1px solid var(--borders-form-field--active);
}
.zen-main-column__groups,
.zen-link-column__groups {
  font-family: var(--main-font);
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.32px;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-wrap: normal;
  color: var(--text-secondary);
  max-width: 100%;
}
html:lang(ar) .zen-main-column__groups,
html:lang(ar) .zen-link-column__groups {
  font-family: var(--arabic-font-family);
}
.zen-primary-icon {
  width: 1.5rem;
  height: 1.5rem;
  fill: var(--text-reverse-primary-button);
  background-color: var(--action-primary--default);
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.zen-primary-icon--active {
  cursor: pointer;
}
.zen-primary-icon--active:hover {
  fill: var(--text-reverse-primary);
  background-color: var(--action-primary--hover);
}
.zen-primary-icon--active:focus-visible {
  fill: var(--text-reverse-primary);
  background-color: var(--action-primary--hover);
  outline: 1px solid var(--borders-form-field--active);
  outline-offset: 2px;
}
.zen-primary-icon--active:active {
  fill: var(--text-reverse-primary);
  background-color: var(--action-primary--active);
}
.zen-primary-icon--active:disabled {
  fill: var(--text-reverse-primary);
  background-color: var(--backgrounds-content-2);
  cursor: default;
}
.zen-primary-icon--disabled.zen-primary-icon--disabled {
  fill: var(--text-reverse-primary);
  background-color: var(--backgrounds-content-2);
  cursor: default;
}
.zen-primary-icon--secondary {
  fill: var(--text-hyperlink);
  background-color: transparent;
}
.zen-primary-icon--secondary.zen-primary-icon--active:hover {
  fill: var(--text-hyperlink);
  background-color: var(--backgrounds-content-1);
}
.zen-primary-icon--secondary.zen-primary-icon--active:focus-visible {
  fill: var(--text-hyperlink);
  background-color: var(--backgrounds-content-1);
  outline: 1px solid var(--borders-form-field--active);
  outline-offset: 2px;
}
.zen-primary-icon--secondary.zen-primary-icon--active:active {
  fill: var(--text-hyperlink);
  background-color: var(--action-tertiary--hover);
}
.zen-primary-icon--secondary.zen-primary-icon--active:disabled {
  fill: var(--text-button-disabled);
  background-color: transparent;
}
.zen-selectable-column {
  box-sizing: border-box;
  display: flex;
  width: 100%;
  gap: 12px;
}
.zen-selectable-column * {
  box-sizing: border-box;
}
.zen-selectable-column__checkbox {
  flex: 0 0 auto;
  display: flex;
  align-items: center;
}
.zen-selectable-column__checkbox-input {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
}
.zen-selectable-column__content {
  flex: 1 1 auto;
  overflow: hidden;
  align-self: center;
}
.zen-selectable-column__popup:focus-visible {
  outline: none;
  border-color: var(--borders-form-field--active);
}
.zen-selectable-row.zen-checkbox-column {
  gap: 12px;
}
.zen-selectable-row .zen-checkbox-column__content {
  padding-left: 32px;
}
.zen-selectable-row .zen-nested-button {
  margin-left: -32px;
}
.zen-selectable-column--with-actions .zen-selectable-column__checkbox {
  display: flex;
  align-items: center;
}
.zen-selectable-column--no-checkbox .zen-checkbox-column__checkbox {
  visibility: hidden;
}
.zen-mobile-sort-control {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  gap: 4px;
}
.zen-mobile-sort-control * {
  box-sizing: border-box;
}
.zen-mobile-sort-control__trigger {
  display: flex;
  align-items: center;
  gap: 4px;
  background: none;
  border: none;
  padding: 4px 8px;
  cursor: pointer;
  border-radius: var(--border-radius-default);
  fill: var(--action-secondary--default);
}
.zen-mobile-sort-control__trigger:hover,
.zen-mobile-sort-control__trigger:focus {
  background-color: var(--backgrounds-hover);
}
.zen-mobile-sort-control__trigger:active {
  background-color: var(--action-secondary--default);
  color: var(--text-reverse-primary);
  fill: var(--text-reverse-primary);
}
.zen-mobile-sort-control__trigger-text {
  font-family: var(--main-font);
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.32px;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .zen-mobile-sort-control__trigger-text {
  font-family: var(--arabic-font-family);
}
.zen-mobile-sort-control__sort-by-btn {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: baseline;
}
.zen-mobile-sort-control__sort-by-value,
.zen-mobile-sort-control__selected-label {
  font-family: var(--main-font);
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.32px;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
  display: block;
  color: var(--text-secondary);
}
html:lang(ar) .zen-mobile-sort-control__sort-by-value,
html:lang(ar) .zen-mobile-sort-control__selected-label {
  font-family: var(--arabic-font-family);
}
.zen-sortable-column {
  box-sizing: border-box;
  flex: 1 1 auto;
  overflow: hidden;
  cursor: pointer;
  height: var(--grid-header-height);
}
.zen-sortable-column * {
  box-sizing: border-box;
}
.zen-sortable-column .zen-sortable-column-button {
  border: var(--border-width-default) solid transparent;
  border-radius: var(--border-radius-default);
  width: 100%;
  height: 100%;
  background: none;
}
.zen-sortable-column .zen-sortable-column-button__content {
  overflow: hidden;
  flex: 1 1 auto;
}
.zen-sortable-column .zen-sortable-column-button__dir-icon {
  flex: 0 0 0;
  fill: var(--action-secondary--default);
  padding: 0;
}
.zen-sortable-column .zen-sortable-column-button__dir-icon:focus,
.zen-sortable-column .zen-sortable-column-button__dir-icon:active {
  padding: inherit;
  flex-basis: auto;
}
.zen-sortable-column .zen-sortable-column-button__dir-icon:active {
  fill: var(--text-reverse-primary);
}
.zen-sortable-column .zen-sortable-column-button__dir-icon:focus-visible {
  outline: none;
  border-color: var(--borders-form-field--active);
}
.zen-sortable-column .zen-sortable-column-button:hover .zen-sortable-column-button__dir-icon,
.zen-sortable-column .zen-sortable-column-button--active .zen-sortable-column-button__dir-icon {
  display: inherit;
  flex-basis: auto;
  padding: inherit;
}
.zen-sortable-column .zen-sortable-column-button--active .zen-sortable-column-button__content {
  font-weight: 700;
}
.zen-sortable-column--mobile {
  font-size: 0.75rem;
}
.zen-sortable-column--mobile .zen-sortable-column-button--active .zen-sortable-column-button__content {
  font-weight: normal;
}
.zen-sortable-column--mobile .zen-sortable-column__button {
  gap: 6px;
}
.zen-flexible-column {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  width: 100%;
  cursor: pointer;
  height: var(--grid-header-height);
}
.zen-flexible-column * {
  box-sizing: border-box;
}
.zen-flexible-column .zen-flexible-column__draggable-icon {
  display: none;
  transform: translateX(-88%);
  position: absolute;
}
.zen-flexible-column__draggable {
  width: 6px;
  height: 100%;
  left: -4px;
  position: absolute;
  cursor: col-resize;
}
.zen-flexible-column__draggable:hover {
  border-right: 2px solid var(--borders-form-field--active);
}
.zen-flexible-column__content {
  width: 100%;
  text-align: start;
  -webkit-user-select: none;
  user-select: none;
}
.zen-flexible-column:hover .zen-flexible-column__draggable-icon {
  display: block;
}
.zen-flexible-column--static {
  cursor: default;
}
.zen-flexible-column--static:hover .zen-flexible-column__draggable-icon {
  display: none;
}
.zen-resizer {
  box-sizing: border-box;
  position: absolute;
  background-color: none;
  z-index: 5000;
  outline: none;
  touch-action: none;
}
.zen-resizer * {
  box-sizing: border-box;
}
.zen-resizer--invisible {
  opacity: 0%;
}
.zen-resizer--invisible:hover,
.zen-resizer--invisible:focus {
  opacity: 100%;
}
.zen-resizer--manual-focus {
  opacity: 100%;
  background-color: var(--borders-form-field--active);
}
.zen-resizer--vertical {
  width: 2px;
}
.zen-resizer--vertical::after {
  content: "";
  width: 20px;
  height: 100%;
  cursor: col-resize;
  position: absolute;
  left: -9px;
}
.zen-resizer--vert-left {
  width: 2px;
}
.zen-resizer--vert-left::after {
  content: "";
  width: 10px;
  height: 100%;
  cursor: col-resize;
  position: absolute;
  left: -9px;
}
.zen-resizer--horizontal {
  height: 2px;
  cursor: row-resize;
}
.zen-resizer--horizontal::after {
  content: "";
  width: 100%;
  height: 20px;
  cursor: col-resize;
  position: absolute;
  top: -9px;
}
.zen-resizer:hover,
.zen-resizer:focus,
.zen-resizer--active {
  background-color: var(--borders-form-field--active);
}
.zen-table-column {
  box-sizing: border-box;
  position: absolute;
  background-color: var(--backgrounds-main);
  z-index: 5001;
  box-shadow: 0px 0px 8px 2px rgba(0, 0, 0, 0.3);
  border-spacing: 0;
  overflow: hidden;
  contain: strict;
  touch-action: none;
}
.zen-table-column * {
  box-sizing: border-box;
}
.zen-table-column__row {
  height: var(--row-height);
  pointer-events: none;
  overflow: hidden;
}
.zen-columns-list {
  box-sizing: border-box;
  width: 100%;
  max-height: 550px;
  display: flex;
  overflow: hidden;
  flex-direction: column;
}
.zen-columns-list * {
  box-sizing: border-box;
}
.zen-columns-list__content {
  overflow: auto;
}
.zen-columns-list__footer {
  border-top: 1px solid var(--borders-general);
  padding: 2px 8px;
  display: flex;
  justify-content: flex-end;
}
.zen-columns-list__footer .zen-columns-list__reset:focus {
  outline: none;
  border: 1px solid var(--borders-form-field--active);
}
.zen-columns-list__sub-section {
  border-top: 1px solid var(--borders-general);
  padding: 8px 0;
}
.zen-columns-list__title {
  padding: 0 10px;
  color: var(--text-secondary);
  font-family: var(--main-font);
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.32px;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .zen-columns-list__title {
  font-family: var(--arabic-font-family);
}
.zen-nested-button {
  display: flex;
  align-items: center;
  gap: 8px;
}
.zen-nested-button__button {
  background-color: transparent;
  border: none;
  fill: var(--text-secondary);
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 8px;
  cursor: pointer;
  border-radius: var(--border-radius-default);
}
.zen-nested-button__button:focus-visible {
  outline: 1px solid var(--borders-form-field--active);
  outline-offset: 2px;
}
.zen-nested-button__content {
  flex: 1 1 auto;
  min-width: 0;
}
.zen-nested-button__placeholder {
  width: 32px;
}
.zen-nested-button__padding {
  padding-left: 40px;
}
.zen-empty-state {
  box-sizing: border-box;
  display: grid;
  justify-content: center;
  align-content: center;
  text-align: center;
  gap: 0.625rem;
  grid-auto-flow: row;
  height: 100%;
  width: 100%;
  min-height: 12.5rem;
  padding: 1.25rem;
}
.zen-empty-state * {
  box-sizing: border-box;
}
.zen-empty-state__image {
  width: 180px;
  height: 180px;
  align-self: center;
  justify-self: center;
  justify-content: center;
  display: flex;
  align-items: center;
}
.zen-empty-state__header {
  font-family: var(--main-font);
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  letter-spacing: 0.16px;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
  margin: 0;
}
html:lang(ar) .zen-empty-state__header {
  font-family: var(--arabic-font-family);
}
.zen-empty-state__description {
  font-family: var(--main-font);
  font-size: 12px;
  font-style: italic;
  font-weight: 400;
  letter-spacing: 0.32px;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .zen-empty-state__description {
  font-family: var(--arabic-font-family);
}
.zen-svg-image {
  box-sizing: border-box;
  display: inline;
}
.zen-svg-image * {
  box-sizing: border-box;
}
.zen-svg-image:hover,
.zen-svg-image:focus {
  outline: none;
}
.zen-svg-image > use {
  pointer-events: none;
}
.zen-data-grid-actions {
  box-sizing: border-box;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  min-height: 3rem;
  gap: 8px;
}
.zen-data-grid-actions * {
  box-sizing: border-box;
}
.zen-data-grid-actions__separator {
  flex: 100 100 auto;
}
.zen-data-grid-actions__actions {
  flex: 1000000 1 auto;
  min-width: 50px;
}
.zen-data-grid-actions__pagination,
.zen-data-grid-actions__post-actions {
  flex: 0 0 auto;
  display: flex;
  gap: 0.75rem;
}
.zen-data-grid-actions__pagination {
  flex-grow: 1;
  flex-shrink: 1;
}
.zen-data-grid-actions__custom-elements {
  display: flex;
  gap: 8px;
  max-width: 295px;
}
.zen-data-grid-actions__post-actions {
  margin-left: 24px;
  display: flex;
  gap: 12px;
}
@media (min-width: 641px) {
  .zen-data-grid-actions__post-actions {
    margin-right: 16px;
  }
}
.zen-data-grid-actions--mobile {
  padding: 0.5rem 0.75rem;
}
.zen-data-feed-select-panel {
  padding: 8px 12px;
}
.zen-feedSelectControl {
  box-sizing: border-box;
}
.zen-feedSelectControl * {
  box-sizing: border-box;
}
.zen-bulk-actions {
  box-sizing: border-box;
  --action-buttons-min-width: 32px;
  --action-buttons-gap: 8px;
  display: flex;
  align-items: center;
  gap: var(--action-buttons-gap, 8);
}
.zen-bulk-actions * {
  box-sizing: border-box;
}
.zen-bulk-actions__action-button {
  display: flex;
  justify-content: center;
  align-items: center;
  white-space: nowrap;
  height: 32px;
  min-width: var(--action-buttons-min-width, 0);
  flex: 0 0 auto;
}
.zen-bulk-actions__action-button-icon {
  width: 16px;
  height: 16px;
  pointer-events: none;
}
.zen-bulk-actions__action-button-mobile-holder {
  display: none;
}
.zen-bulk-actions__action-button-holder {
  display: flex;
  flex-direction: row;
  align-items: center;
  flex: 1 1 auto;
  min-width: var(--action-buttons-min-width, 0);
  gap: var(--action-buttons-gap, 0);
  overflow: hidden;
  height: 3rem;
  padding-left: 3px;
}
.zen-bulk-actions__number-of-selected {
  color: var(--text-secondary);
  font-family: var(--main-font);
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.32px;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
  flex: 0 1 auto;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-wrap: normal;
}
html:lang(ar) .zen-bulk-actions__number-of-selected {
  font-family: var(--arabic-font-family);
}
.zen-bulk-actions__button-clear {
  flex: 0 0 auto;
}
.zen-bulk-actions__button-clear:focus-visible {
  outline: none;
  border-color: var(--borders-form-field--active);
}
.zen-bulk-actions--mobile .zen-bulk-actions__action-button-title {
  display: none;
}
.zen-bulk-actions--mobile .zen-bulk-actions__action-button {
  padding: 7px;
}
.zen-bulk-actions--mobile .zen-bulk-actions__action-button-icon {
  height: 20px;
  width: 20px;
}
.zen-bulk-actions--mobile .zen-bulk-actions__number-of-selected {
  font-size: 20px;
  line-height: 28px;
  min-width: 120px;
}
.zen-bulk-actions--mobile .zen-bulk-actions__action-button-holder {
  flex-grow: 1;
  justify-content: flex-end;
  gap: 10px;
}
.zen-bulk-actions--mobile .zen-bulk-actions__button-close-icon {
  height: 16px;
  width: 16px;
}
.zen-bulk-actions--mobile .zen-bulk-actions__action-button,
.zen-bulk-actions--mobile .zen-bulk-actions__button-close {
  border: none;
}
.zen-bulk-actions--condensed .zen-bulk-actions__action-button-holder {
  justify-content: flex-end;
}
.zen-bulk-actions__hidden-elements {
  position: absolute;
  width: 100%;
  height: 0;
  overflow: auto;
  z-index: -1;
  visibility: hidden;
}
.zen-bulk-actions--screen-panel {
  position: sticky;
  z-index: 2;
  border-top: 1px solid var(--borders-general);
  background: var(--backgrounds-main);
  padding: 12px 16px;
  right: 0;
  left: 0;
  bottom: 0;
}
.zen-bulk-actions--screen-panel .zen-bulk-actions__button-close {
  display: flex;
}
.zen-bulk-actions--screen-panel .zen-bulk-actions__number-of-selected {
  flex: 1 1 auto;
}
.zen-pagination {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 4px;
}
.zen-pagination * {
  box-sizing: border-box;
}
.zen-pagination__arrow-navigation-button {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  flex-grow: 0;
}
.zen-pagination__arrow-navigation-button--invisible {
  display: none;
}
.zen-pagination__arrow-navigation-button-icon--rotate {
  transform: rotate(180deg);
}
.zen-pagination__text {
  font-family: var(--main-font);
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.32px;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
  color: var(--text-secondary);
  margin-right: 4px;
}
html:lang(ar) .zen-pagination__text {
  font-family: var(--arabic-font-family);
}
.zen-table__detail-panel--header {
  background-color: var(--backgrounds-main);
  border-bottom: 1px solid var(--borders-general);
  position: sticky;
  top: 0;
  left: 0;
  box-sizing: border-box;
  width: 100%;
  z-index: 10;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 16px;
}
.zen-table__detail-panel--header-content,
.zen-table__detail-panel--header-description {
  box-sizing: border-box;
  gap: 8px;
  display: flex;
  width: 100%;
}
.zen-table__detail-panel--header-content {
  justify-content: space-between;
  justify-items: center;
  align-items: center;
}
.zen-table__detail-panel--header-description {
  font-family: var(--main-font);
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  letter-spacing: 0.16px;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
  color: var(--text-primary);
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
}
html:lang(ar) .zen-table__detail-panel--header-description {
  font-family: var(--arabic-font-family);
}
.zen-table__detail-panel--header-description * {
  font-family: var(--main-font);
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.32px;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .zen-table__detail-panel--header-description * {
  font-family: var(--arabic-font-family);
}
.zen-table__detail-panel--header-title {
  font-family: var(--main-font);
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  letter-spacing: 0;
  line-height: 24px;
  text-transform: none;
  text-decoration: none;
  color: var(--text-primary);
  display: -webkit-box;
  line-clamp: 2;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
html:lang(ar) .zen-table__detail-panel--header-title {
  font-family: var(--arabic-font-family);
}
.zen-table__detail-panel--header-details {
  font-family: var(--main-font);
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  letter-spacing: 0.16px;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
  color: var(--text-primary);
  display: flex;
  gap: 8px;
  flex: 1 1 auto;
}
html:lang(ar) .zen-table__detail-panel--header-details {
  font-family: var(--arabic-font-family);
}
.zen-table__detail-panel--header-actions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}
.zen-table-detail-panel__header * {
  box-sizing: border-box;
}
.zen-table__detail-panel-mobile .zen-table__detail-panel--header {
  padding: 0;
  border-bottom: none;
}
.zen-table__detail-panel-mobile .zen-mobile-sheet__title {
  border-bottom: 1px solid var(--borders-general);
}
.zen-table__detail-panel {
  position: relative;
  width: 360px;
  max-width: 600px;
  height: 100%;
  min-height: 400px;
  max-height: 1920px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  opacity: 0;
  flex: 0 0 0;
  transform: translateX(20px);
  will-change: opacity, transform, flex-basis;
  transition: opacity 0.35s cubic-bezier(0.4, 0, 0.2, 1), transform 0.35s cubic-bezier(0.4, 0, 0.2, 1), flex-basis 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}
.zen-table__detail-panel--shown {
  opacity: 1;
  flex: 0 0 360px;
  transform: translateX(0);
}
@container table-content (max-width: 600px) {
  .zen-table__detail-panel {
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    max-width: 100%;
    min-width: 0;
    transform: translateX(100%);
    overflow-y: hidden;
    will-change: opacity, transform;
    transition: opacity 0.35s cubic-bezier(0.4, 0, 0.2, 1), transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .zen-table__detail-panel--shown {
    opacity: 1;
    transform: translateX(0);
    overflow-y: auto;
  }
}
.zen-table__detail-panel-content {
  overflow-y: auto;
  flex: 1;
  padding: 12px;
}
.zen-table__detail-panel-footer {
  padding: 12px;
}
.zen-table__detail-panel .zen-page-header__page-name {
  font-family: var(--main-font);
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  letter-spacing: 0;
  line-height: 24px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .zen-table__detail-panel .zen-page-header__page-name {
  font-family: var(--arabic-font-family);
}
.zen-table__detail-panel-footer {
  font-family: var(--main-font);
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  letter-spacing: 0.16px;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
  color: var(--text-primary);
  background-color: var(--backgrounds-main);
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  position: sticky;
  bottom: 0;
}
html:lang(ar) .zen-table__detail-panel-footer {
  font-family: var(--arabic-font-family);
}
.zen-table__detail-panel.zen-card-container {
  padding: 0;
  width: 360px;
}
@container table-content (max-width: 600px) {
  .zen-table__detail-panel.zen-card-container.zen-table__detail-panel--shown {
    max-width: min(100%, 600px);
  }
}
.zen-table__detail-panel-mobile {
  max-height: 90%;
}
:root {
  --grid-header-height: 52px;
}
.zen-table-link {
  font-family: var(--main-font);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 16px;
  text-transform: none;
  color: var(--text-hyperlink);
  fill: var(--text-hyperlink);
  text-decoration: none;
  cursor: pointer;
  background: 0 0;
  border: 0;
  word-wrap: break-word;
}
html:lang(ar) .zen-table-link {
  font-family: var(--arabic-font-family);
}
.zen-table-number {
  font-family: var(--main-font);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
  color: var(--text-primary);
  text-align: end;
  width: 100%;
}
html:lang(ar) .zen-table-number {
  font-family: var(--arabic-font-family);
}
.zen-table__cell-loading {
  max-width: 500px;
  width: 100%;
}
.zen-table-wrapper--with-toolbar .zen-data-grid-wrapper {
  height: calc(100% - 48px);
}
.zen-table-wrapper--with-toolbar .zen-table__content {
  height: calc(100% - 48px);
}
.zen-table-wrapper--with-toolbar .zen-table__content .zen-data-grid-wrapper {
  height: 100%;
}
.zen-table__content {
  height: 100%;
  position: relative;
  display: flex;
  gap: 12px;
  container-type: inline-size;
  container-name: table-content;
}
.zen-table__table {
  height: 100%;
  flex: 1 1 auto;
  min-width: 0;
  transition: flex 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}
.pie-chart-1 {
  width: 100%;
  height: 200px;
}
.zen-action-link-column {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-left: 3px;
}
.zen-action-link-column__link {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  padding: 0;
  margin-right: 4px;
}
.zen-action-link-column__content {
  flex: 1 1 auto;
  overflow: hidden;
}
.zen-feedExpandControl {
  box-sizing: border-box;
}
.zen-feedExpandControl * {
  box-sizing: border-box;
}
.zen-summary-tile {
  box-sizing: border-box;
  font-family: var(--main-font);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
  height: 80px;
  padding: 12px;
  border-radius: 8px;
  color: var(--text-primary);
}
.zen-summary-tile * {
  box-sizing: border-box;
}
html:lang(ar) .zen-summary-tile {
  font-family: var(--arabic-font-family);
}
.zen-summary-tile__trigger {
  cursor: pointer;
  background: none;
  border: none;
  padding: 0;
  line-height: 0;
  position: relative;
}
.zen-summary-tile__trigger::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 24px;
  height: 24px;
}
.zen-summary-tile__trigger:focus-visible {
  outline: 2px solid var(--borders-form-field--active);
  outline-offset: 2px;
  border-radius: 2px;
}
.zen-summary-tile--action > .zen-summary-tile__trigger {
  position: absolute;
  top: 12px;
  right: 12px;
}
.zen-summary-tile--action {
  cursor: pointer;
  display: flex;
  flex-direction: column;
  text-align: start;
  position: relative;
}
.zen-summary-tile__clickable-area {
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  text-align: start;
  width: 100%;
  height: 100%;
  color: inherit;
  fill: inherit;
  font: inherit;
  border-radius: inherit;
}
.zen-summary-tile__clickable-area:focus-visible {
  outline: none;
}
.zen-summary-tile--action:has(.zen-summary-tile__clickable-area:focus-visible) {
  outline: 2px solid var(--borders-form-field--active);
  outline-offset: -1px;
}
.zen-summary-tile__title-block {
  height: 16px;
  display: inline-flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 8px;
}
.zen-summary-tile__content {
  max-height: 32px;
  min-height: 32px;
  overflow-y: hidden;
  width: 100%;
}
.zen-summary-tile__title-text {
  flex-grow: 1;
  margin-right: 4px;
}
.zen-summary-tile__title-icon {
  flex-shrink: 0;
}
.zen-summary-tile--small {
  min-width: 176px;
  max-width: 176px;
}
.zen-summary-tile--medium {
  min-width: 272px;
  max-width: 272px;
}
.zen-summary-tile--default {
  background-color: var(--backgrounds-content-1);
  fill: var(--text-primary);
  border: var(--border-width-default) solid var(--text-button-disabled);
  background: var(--backgrounds-main);
}
.zen-summary-tile--default .zen-summary-tile__trigger {
  fill: var(--text-secondary);
}
.zen-summary-tile--default:hover {
  box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.17);
}
.zen-summary-tile--error {
  background-color: var(--accents-error--main);
  fill: var(--accents-error--detail);
  border: var(--border-width-default) solid var(--accents-error--detail);
}
.zen-summary-tile--error:hover {
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.22);
}
.zen-summary-tile--success {
  background-color: var(--accents-success--main);
  fill: var(--accents-success--detail);
  border: var(--border-width-default) solid var(--accents-success--detail);
}
.zen-summary-tile--success:hover {
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.22);
}
.zen-summary-tile--warning {
  background-color: var(--accents-warning--main);
  fill: var(--accents-warning--detail);
  border: var(--border-width-default) solid var(--accents-warning--detail);
}
.zen-summary-tile--warning:hover {
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.22);
}
.zen-summary-tile--active {
  background-color: var(--accents-general--main);
  fill: var(--text-secondary);
  border: var(--border-width-default) solid var(--borders-form-field--active);
}
.zen-summary-tile--active:hover {
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.22);
}
.zen-form-step-marker-inner {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 26px;
  min-height: 26px;
  max-width: 26px;
  max-height: 26px;
  border-radius: 50%;
}
.zen-form-step {
  width: 100%;
  display: flex;
  align-items: flex-start;
}
.zen-form-step--first {
  width: auto;
}
.zen-form-step__item {
  font-family: var(--main-font);
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  letter-spacing: 0.16px;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .zen-form-step__item {
  font-family: var(--arabic-font-family);
}
.zen-form-step__item .zen-form-step__label {
  max-width: 80px;
  min-width: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.zen-form-step__item .zen-form-step__label-primary {
  text-align: center;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
}
.zen-form-step__item .zen-form-step__label--current {
  color: var(--action-primary--hover);
}
.zen-form-step__item .zen-form-step__label--incomplete {
  color: var(--action-secondary--default);
}
.zen-form-step__item .zen-form-step__label--complete {
  color: var(--action-primary--hover);
}
.zen-form-step__item .zen-form-step__label--complete:not(.zen-form-step__item--non-clickable) {
  cursor: pointer;
}
.zen-form-step__item .zen-form-step__label--error {
  color: var(--backgrounds-reverse-2);
}
.zen-form-step__item .zen-form-step__label--error:not(.zen-form-step__item--non-clickable) {
  cursor: pointer;
}
.zen-form-step__item .zen-form-step__label-secondary {
  color: var(--action-secondary--default);
  font-family: var(--main-font);
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.32px;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
  max-width: 80px;
  min-width: 80px;
  text-align: center;
}
html:lang(ar) .zen-form-step__item .zen-form-step__label-secondary {
  font-family: var(--arabic-font-family);
}
.zen-form-step__item .zen-form-step__marker {
  margin-left: 24px;
  display: flex;
  height: 32px;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
  min-width: 32px;
  min-height: 32px;
  max-width: 32px;
  max-height: 32px;
}
.zen-form-step__item .zen-form-step__marker--complete {
  color: var(--text-reverse-primary);
  fill: var(--text-reverse-primary);
  border: 2px solid var(--action-primary--active);
  background: var(--action-primary--active);
}
.zen-form-step__item .zen-form-step__marker--complete:not(.zen-form-step__marker--non-clickable) {
  cursor: pointer;
}
.zen-form-step__item .zen-form-step__marker--error {
  color: var(--text-reverse-primary);
  border: 2px solid var(--borders-form-field--error);
  box-sizing: border-box;
}
.zen-form-step__item .zen-form-step__marker--error .zen-form-step__marker--inner {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 26px;
  min-height: 26px;
  max-width: 26px;
  max-height: 26px;
  border-radius: 50%;
  background-color: var(--borders-form-field--error);
  color: var(--text-reverse-primary);
}
.zen-form-step__item .zen-form-step__marker--error:not(.zen-form-step__marker--non-clickable) {
  cursor: pointer;
}
.zen-form-step__item .zen-form-step__marker--current {
  color: var(--text-reverse-primary);
  border: 2px solid var(--action-primary--default);
  box-sizing: border-box;
}
.zen-form-step__item .zen-form-step__marker--current .zen-form-step__marker--inner {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 26px;
  min-height: 26px;
  max-width: 26px;
  max-height: 26px;
  border-radius: 50%;
  background-color: var(--action-primary--default);
  color: var(--text-reverse-primary);
}
.zen-form-step__item .zen-form-step__marker--incomplete {
  background-color: transparent;
  border: 2px solid var(--action-secondary--default);
  color: var(--action-secondary--default);
}
.zen-form-step__item .zen-form-step__marker--mobile {
  min-width: 10px;
  min-height: 10px;
  max-width: 10px;
  max-height: 10px;
  margin-left: 4px;
  border: 0;
}
.zen-form-step__item .zen-form-step__marker--mobile.zen-form-step__marker--complete {
  background-color: var(--action-primary--active);
  color: var(--text-reverse-primary);
  fill: var(--text-reverse-primary);
}
.zen-form-step__item .zen-form-step__marker--mobile.zen-form-step__marker--error {
  background-color: var(--borders-form-field--error);
  color: var(--text-reverse-primary);
  fill: var(--text-reverse-primary);
}
.zen-form-step__item .zen-form-step__marker--mobile.zen-form-step__marker--current {
  background-color: var(--action-primary--default);
  color: var(--text-reverse-primary);
  fill: var(--text-reverse-primary);
}
.zen-form-step__item .zen-form-step__marker--mobile.zen-form-step__marker--incomplete {
  background-color: var(--action-secondary--default);
  color: var(--text-reverse-primary);
  fill: var(--text-reverse-primary);
}
.zen-form-step__item--mobile {
  border: 0;
  background: 0;
  padding: 0;
}
.zen-form-step__connector {
  border-top: 2px solid;
  flex-grow: 1;
  min-width: 11px;
  width: 100%;
  margin-top: 16px;
  align-self: self-start;
  border-radius: 10px;
}
.zen-form-step__connector--complete {
  border-color: var(--action-primary--hover);
}
.zen-form-step__connector--error {
  border-color: var(--borders-form-field--error);
}
.zen-form-step__connector--current {
  border-color: var(--action-primary--hover);
}
.zen-form-step__connector--incomplete {
  border-color: var(--action-secondary--default);
}
.zen-form-step__connector--mobile {
  margin-top: 4px;
  margin-left: 4px;
}
.zen-form-stepper {
  display: flex;
  flex-direction: column;
  margin: 0 4px;
}
.zen-form-stepper--mobile {
  margin: 0 12px;
}
.zen-form-stepper__steps {
  display: flex;
  width: 100%;
}
.zen-form-stepper__mobile-labels {
  display: flex;
  flex-direction: column;
}
.zen-form-stepper .zen-form-stepper__mobile-label {
  font-family: var(--main-font);
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  letter-spacing: 0;
  line-height: 24px;
  text-transform: none;
  text-decoration: none;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  text-overflow: ellipsis;
  overflow: hidden;
  color: var(--text-primary);
  padding-left: 4px;
}
html:lang(ar) .zen-form-stepper .zen-form-stepper__mobile-label {
  font-family: var(--arabic-font-family);
}
.zen-form-stepper .zen-form-stepper__mobile-secondary-label {
  font-family: var(--main-font);
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.32px;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
  padding-left: 4px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  text-overflow: ellipsis;
  overflow: hidden;
  color: var(--text-secondary);
  visibility: hidden;
  display: none;
}
html:lang(ar) .zen-form-stepper .zen-form-stepper__mobile-secondary-label {
  font-family: var(--arabic-font-family);
}
.zen-form-stepper .zen-form-stepper__mobile-secondary-label--visible {
  visibility: visible;
  display: block;
}
.zen-form-stepper .zen-form-stepper__mobile-counter {
  padding-left: 4px;
  font-family: var(--main-font);
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.32px;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
  color: var(--text-secondary);
}
html:lang(ar) .zen-form-stepper .zen-form-stepper__mobile-counter {
  font-family: var(--arabic-font-family);
}
.zen-form-step-buttons {
  display: flex;
  justify-content: space-between;
  margin: 0 24px;
}
.zen-form-step-buttons--mobile {
  margin: 0 12px;
}
.zen-form-step-buttons__right {
  display: flex;
  gap: 8px;
}
.zen-review-text-control {
  color: var(--text-primary);
  font-family: var(--main-font);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
}
.zen-review-text-control--secondary {
  font-family: var(--main-font);
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.32px;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
  color: var(--text-secondary);
  font-style: italic;
}
html:lang(ar) .zen-review-text-control--secondary {
  font-family: var(--arabic-font-family);
}
html:lang(ar) .zen-review-text-control {
  font-family: var(--arabic-font-family);
}
.zen-custom-form-row {
  display: grid;
  flex-direction: column;
  grid-template-columns: repeat(2, max-content);
  gap: 8px;
  align-items: start;
}
.zen-toggler-component {
  --zen-toggler-component-height: 1rem;
  --zen-toggler-component-height-drive: 1.5rem;
  --zen-toggler-component-width: 1.875rem;
  --zen-toggler-component-width-drive: 2.625rem;
  --zen-toggler-tap-area-width-drive: 3.125rem;
  --zen-toggler-tap-area-height-drive: 2rem;
  --zen-toggler-runner-size: 0.75rem;
  --zen-toggler-runner-size-drive: 1.125rem;
  --zen-toggler-runner-focus-size: 1.625rem;
  --zen-toggler-runner-focus-size-drive: 2rem;
  box-sizing: border-box;
  width: var(--zen-toggler-component-width);
  min-width: var(--zen-toggler-component-width);
  height: var(--zen-toggler-component-height);
  min-height: var(--zen-toggler-component-height);
  border-radius: var(--zen-toggler-component-height);
  padding: 0.125rem;
  background-color: var(--action-secondary--default);
  overflow: visible;
  position: relative;
  cursor: pointer;
}
.zen-toggler-component * {
  box-sizing: border-box;
}
.zen-toggler-component--drive {
  height: var(--zen-toggler-component-height-drive);
  min-height: var(--zen-toggler-component-height-drive);
  width: var(--zen-toggler-component-width-drive);
  min-width: var(--zen-toggler-component-width-drive);
  border-radius: var(--zen-toggler-component-height-drive);
}
.zen-toggler-component--drive::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: var(--zen-toggler-tap-area-width-drive);
  height: var(--zen-toggler-tap-area-height-drive);
}
.zen-toggler-component--drive .zen-toggler-component__runner {
  width: var(--zen-toggler-runner-size-drive);
  min-width: var(--zen-toggler-runner-size-drive);
  height: var(--zen-toggler-runner-size-drive);
  min-height: var(--zen-toggler-runner-size-drive);
  margin-top: 0.0625rem;
  margin-inline-start: 0.0625rem;
}
.zen-toggler-component--drive .zen-toggler-component__focus {
  width: var(--zen-toggler-runner-focus-size-drive);
  min-width: var(--zen-toggler-runner-focus-size-drive);
  height: var(--zen-toggler-runner-focus-size-drive);
  min-height: var(--zen-toggler-runner-focus-size-drive);
  top: -0.25rem;
  inset-inline-start: -0.25rem;
}
.zen-toggler-component--drive-tablet {
  height: var(--zen-toggler-component-height-drive);
  min-height: var(--zen-toggler-component-height-drive);
  width: var(--zen-toggler-component-width-drive);
  min-width: var(--zen-toggler-component-width-drive);
  border-radius: var(--zen-toggler-component-height-drive);
}
.zen-toggler-component--drive-tablet::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: var(--zen-toggler-tap-area-width-drive);
  height: var(--zen-toggler-tap-area-height-drive);
}
.zen-toggler-component--drive-tablet .zen-toggler-component__runner {
  width: var(--zen-toggler-runner-size-drive);
  min-width: var(--zen-toggler-runner-size-drive);
  height: var(--zen-toggler-runner-size-drive);
  min-height: var(--zen-toggler-runner-size-drive);
  margin-top: 0.0625rem;
  margin-inline-start: 0.0625rem;
}
.zen-toggler-component--drive-tablet .zen-toggler-component__focus {
  width: var(--zen-toggler-runner-focus-size-drive);
  min-width: var(--zen-toggler-runner-focus-size-drive);
  height: var(--zen-toggler-runner-focus-size-drive);
  min-height: var(--zen-toggler-runner-focus-size-drive);
  top: -0.25rem;
  inset-inline-start: -0.25rem;
}
.zen-toggler-component__runner {
  width: var(--zen-toggler-runner-size);
  min-width: var(--zen-toggler-runner-size);
  height: var(--zen-toggler-runner-size);
  min-height: var(--zen-toggler-runner-size);
  border-radius: 50%;
  background-color: var(--backgrounds-main);
}
.zen-toggler-component__focus {
  display: none;
  position: absolute;
  width: var(--zen-toggler-runner-focus-size);
  min-width: var(--zen-toggler-runner-focus-size);
  height: var(--zen-toggler-runner-focus-size);
  min-height: var(--zen-toggler-runner-focus-size);
  border-radius: 50%;
  opacity: 0.4;
  top: -0.3125rem;
  background-color: var(--action-secondary--default);
  inset-inline-start: -0.3125rem;
}
.zen-toggler__input {
  position: absolute;
  width: 0;
  height: 0;
  opacity: 0;
}
.zen-toggler__label {
  cursor: pointer;
  display: flex;
  align-items: center;
}
.zen-toggler__label-text {
  font-family: var(--main-font);
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.32px;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
  color: var(--text-primary);
  margin-inline-start: 0.5rem;
}
html:lang(ar) .zen-toggler__label-text {
  font-family: var(--arabic-font-family);
}
.zen-toggler--drive .zen-toggler__label-text {
  font-family: var(--main-font);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.32px;
  line-height: 20px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .zen-toggler--drive .zen-toggler__label-text {
  font-family: var(--arabic-font-family);
}
.zen-toggler--drive-tablet .zen-toggler__label-text {
  font-family: var(--main-font);
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.32px;
  line-height: 22px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .zen-toggler--drive-tablet .zen-toggler__label-text {
  font-family: var(--arabic-font-family);
}
.zen-toggler__label--reverted {
  flex-direction: row-reverse;
}
.zen-toggler__label--reverted .zen-toggler__label-text {
  margin-inline-end: 0.5rem;
  margin-inline-start: 0;
}
.zen-toggler__input:focus-visible + .zen-toggler__label > .zen-toggler-component .zen-toggler-component__focus,
.zen-toggler__input:hover + .zen-toggler__label > .zen-toggler-component .zen-toggler-component__focus {
  display: block;
}
.zen-toggler__input:checked + .zen-toggler__label > .zen-toggler-component {
  background-color: var(--action-primary--default);
}
.zen-toggler__input:checked + .zen-toggler__label > .zen-toggler-component .zen-toggler-component__runner {
  float: inline-end;
}
.zen-toggler__input:checked + .zen-toggler__label > .zen-toggler-component .zen-toggler-component__focus {
  background-color: var(--action-primary--default);
  inset-inline-start: unset;
  inset-inline-end: -0.3125rem;
}
.zen-toggler__input:disabled + .zen-toggler__label > .zen-toggler-component {
  opacity: 0.4;
}
.zen-toggler__input:disabled + .zen-toggler__label > .zen-toggler-component .zen-toggler-component__focus {
  visibility: hidden;
}
.zen-pill-type--default {
  background: var(--backgrounds-content-1);
  color: var(--text-primary);
  fill: var(--text-primary);
}
.zen-pill-type--default .zen-pill-non-actionable__close-button {
  fill: var(--text-primary);
}
.zen-pill-type--default .zen-pill-non-actionable__close-button:active .zen-pill-non-actionable__close-icon,
.zen-pill-type--default .zen-pill-non-actionable__close-button:hover .zen-pill-non-actionable__close-icon,
.zen-pill-type--default .zen-pill-non-actionable__close-button:focus .zen-pill-non-actionable__close-icon {
  border-radius: 50%;
  background-color: var(--accents-general--detail);
  fill: var(--backgrounds-content-1);
}
.zen-pill-type--success {
  color: var(--accents-success--detail);
  background-color: var(--accents-success--main);
  fill: var(--accents-success--detail);
}
.zen-pill-type--success .zen-pill-non-actionable__close-button {
  fill: var(--accents-success--detail);
}
.zen-pill-type--success .zen-pill-non-actionable__close-button:active .zen-pill-non-actionable__close-icon,
.zen-pill-type--success .zen-pill-non-actionable__close-button:hover .zen-pill-non-actionable__close-icon,
.zen-pill-type--success .zen-pill-non-actionable__close-button:focus .zen-pill-non-actionable__close-icon {
  border-radius: 50%;
  background-color: var(--accents-success--detail);
  fill: var(--accents-success--main);
}
.zen-pill-type--error {
  background-color: var(--accents-error--main);
  color: var(--accents-error--detail);
  fill: var(--accents-error--detail);
}
.zen-pill-type--error .zen-pill-non-actionable__close-button {
  fill: var(--accents-error--detail);
}
.zen-pill-type--error .zen-pill-non-actionable__close-button:active .zen-pill-non-actionable__close-icon,
.zen-pill-type--error .zen-pill-non-actionable__close-button:hover .zen-pill-non-actionable__close-icon,
.zen-pill-type--error .zen-pill-non-actionable__close-button:focus .zen-pill-non-actionable__close-icon {
  border-radius: 50%;
  background-color: var(--accents-error--detail);
  fill: var(--accents-error--main);
}
.zen-pill-type--warning {
  background-color: var(--accents-warning--main);
  color: var(--accents-warning--detail);
  fill: var(--accents-warning--detail);
}
.zen-pill-type--warning .zen-pill-non-actionable__close-button {
  fill: var(--accents-warning--detail);
}
.zen-pill-type--warning .zen-pill-non-actionable__close-button:active .zen-pill-non-actionable__close-icon,
.zen-pill-type--warning .zen-pill-non-actionable__close-button:hover .zen-pill-non-actionable__close-icon,
.zen-pill-type--warning .zen-pill-non-actionable__close-button:focus .zen-pill-non-actionable__close-icon {
  border-radius: 50%;
  background-color: var(--accents-warning--detail);
  fill: var(--accents-warning--main);
}
.zen-pill-type--info {
  background-color: var(--accents-general--main);
  color: var(--accents-general--detail);
  fill: var(--accents-general--detail);
}
.zen-pill-type--info .zen-pill-non-actionable__close-button {
  fill: var(--accents-general--detail);
}
.zen-pill-type--info .zen-pill-non-actionable__close-button:active .zen-pill-non-actionable__close-icon,
.zen-pill-type--info .zen-pill-non-actionable__close-button:hover .zen-pill-non-actionable__close-icon,
.zen-pill-type--info .zen-pill-non-actionable__close-button:focus .zen-pill-non-actionable__close-icon {
  border-radius: 50%;
  background-color: var(--accents-general--detail);
  fill: var(--accents-general--main);
}
.zen-pill-non-actionable {
  padding: 0px 8px;
}
.zen-pill-non-actionable__close-button {
  justify-self: end;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 12px;
  box-sizing: content-box;
  fill: var(--text-primary);
  background-color: transparent;
  border: none;
  padding: 6px;
  margin: 0;
  cursor: pointer;
}
.zen-pill-non-actionable__close-button:active,
.zen-pill-non-actionable__close-button:hover,
.zen-pill-non-actionable__close-button:focus {
  outline: none;
}
.zen-pill-non-actionable__icon {
  min-width: 12px;
  max-width: 12px;
}
.zen-pill-non-actionable--closable {
  padding: 0 2px 0 8px;
}
.zen-pill-non-actionable.zen-pill-non-actionable--drive,
.zen-pill-non-actionable.zen-pill-non-actionable--drive-tablet {
  padding: 0 12px;
}
.zen-pill-non-actionable.zen-pill-non-actionable--drive .zen-pill-non-actionable__close-button,
.zen-pill-non-actionable.zen-pill-non-actionable--drive-tablet .zen-pill-non-actionable__close-button {
  height: 16px;
}
.zen-pill-non-actionable.zen-pill-non-actionable--drive .zen-pill-non-actionable__icon,
.zen-pill-non-actionable.zen-pill-non-actionable--drive-tablet .zen-pill-non-actionable__icon {
  min-width: 16px;
  max-width: 16px;
  height: 16px;
}
.zen-pill-non-actionable.zen-pill-non-actionable--drive.zen-pill-non-actionable--closable,
.zen-pill-non-actionable.zen-pill-non-actionable--drive-tablet.zen-pill-non-actionable--closable {
  padding: 0 2px 0 10px;
}
.zen-pill-content {
  font-family: var(--main-font);
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.32px;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
  display: flex;
  color: var(--text-primary);
  align-items: center;
  justify-content: space-between;
  padding: 4px 12px 4px 12px;
  border-radius: 30px;
  background: var(--backgrounds-content-1);
}
html:lang(ar) .zen-pill-content {
  font-family: var(--arabic-font-family);
}
.zen-pill-text-content {
  height: 16px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.zen-pill-text-content--hidden {
  visibility: hidden;
}
.zen-pill-text-content.zen-pill-text-content--drive,
.zen-pill-text-content.zen-pill-text-content--drive-tablet {
  height: 20px;
}
.zen-pill-text-content.zen-pill-text-content--drive {
  font-family: var(--main-font);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.32px;
  line-height: 20px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .zen-pill-text-content.zen-pill-text-content--drive {
  font-family: var(--arabic-font-family);
}
.zen-pill-text-content.zen-pill-text-content--drive-tablet {
  font-family: var(--main-font);
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.32px;
  line-height: 22px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .zen-pill-text-content.zen-pill-text-content--drive-tablet {
  font-family: var(--arabic-font-family);
}
.zen-pill-actionable {
  padding: 0 8px;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.zen-pill-actionable:not(.zen-pill-actionable--disabled):not(.zen-pill-actionable--readonly):hover {
  cursor: pointer;
}
.zen-pill-actionable:has(.zen-pill-actionable__input:focus-visible) {
  outline: 1px solid var(--borders-form-field--active);
  outline-offset: 2px;
}
.zen-pill-actionable__input {
  position: absolute;
  left: -5000px;
}
.zen-pill-actionable__content-wrapper {
  margin: 0;
}
.zen-pill-actionable--default {
  background-color: var(--backgrounds-main);
  border: 1px solid var(--borders-general);
  color: var(--text-secondary);
  fill: var(--text-secondary);
}
.zen-pill-actionable--default:hover {
  border-color: var(--borders-form-field--active);
}
.zen-pill-actionable--keyboard-nav.zen-pill-actionable--default {
  outline: 1px solid var(--borders-form-field--active);
  outline-offset: 2px;
}
.zen-pill-actionable--active {
  background-color: var(--action-primary--default);
  border: 1px solid var(--action-primary--default);
  color: var(--text-reverse-primary);
  fill: var(--text-reverse-primary);
}
.zen-pill-actionable--readonly {
  color: var(--text-secondary);
  background-color: var(--backgrounds-content-0);
  border: 1px solid var(--borders-general);
}
.zen-pill-actionable--disabled {
  color: var(--text-button-disabled);
  background-color: var(--backgrounds-field-disabled);
  border: 1px solid var(--borders-general);
}
.zen-pill-actionable.zen-pill-actionable--drive,
.zen-pill-actionable.zen-pill-actionable--drive-tablet {
  padding: 0 12px;
}
.zen-pill-new-content {
  font-family: var(--main-font);
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.32px;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 30px;
  height: 22px;
  display: grid;
  grid-auto-flow: column;
  gap: 8px;
}
html:lang(ar) .zen-pill-new-content {
  font-family: var(--arabic-font-family);
}
.zen-pill-new-content--icon-left {
  grid-template-columns: 12px 1fr;
}
.zen-pill-new-content--icon-left.zen-pill-new-content--empty {
  grid-template-columns: 12px;
}
.zen-pill-new-content--closable {
  grid-template-columns: 1fr 18px;
}
.zen-pill-new-content--closable.zen-pill-new-content--icon-left {
  grid-template-columns: 12px 1fr 18px;
}
.zen-pill-new-content--closable.zen-pill-new-content--icon-left.zen-pill-new-content--empty {
  grid-template-columns: 12px 18px;
  gap: 8px;
}
.zen-pill-new-content--hidden {
  gap: 4px;
}
.zen-pill-new-content.zen-pill-new-content--drive,
.zen-pill-new-content.zen-pill-new-content--drive-tablet {
  height: 34px;
}
.zen-pill-new-content.zen-pill-new-content--drive .zen-pill-non-actionable__icon,
.zen-pill-new-content.zen-pill-new-content--drive-tablet .zen-pill-non-actionable__icon {
  min-width: 16px;
  max-width: 16px;
  height: 16px;
}
.zen-pill-new-content.zen-pill-new-content--drive.zen-pill-new-content--icon-left,
.zen-pill-new-content.zen-pill-new-content--drive-tablet.zen-pill-new-content--icon-left {
  grid-template-columns: 16px 1fr;
}
.zen-pill-new-content.zen-pill-new-content--drive.zen-pill-new-content--icon-left.zen-pill-new-content--empty,
.zen-pill-new-content.zen-pill-new-content--drive-tablet.zen-pill-new-content--icon-left.zen-pill-new-content--empty {
  grid-template-columns: 16px;
}
.zen-pill-new-content.zen-pill-new-content--drive.zen-pill-new-content--closable.zen-pill-new-content--icon-left,
.zen-pill-new-content.zen-pill-new-content--drive-tablet.zen-pill-new-content--closable.zen-pill-new-content--icon-left {
  grid-template-columns: 16px 1fr 22px;
}
.zen-pill-new-content.zen-pill-new-content--drive.zen-pill-new-content--closable.zen-pill-new-content--icon-left.zen-pill-new-content--empty,
.zen-pill-new-content.zen-pill-new-content--drive-tablet.zen-pill-new-content--closable.zen-pill-new-content--icon-left.zen-pill-new-content--empty {
  grid-template-columns: 16px 22px;
  gap: 8px;
}
.zen-pill-new-content.zen-pill-new-content--mobile {
  height: 34px;
  font-family: var(--main-font);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .zen-pill-new-content.zen-pill-new-content--mobile {
  font-family: var(--arabic-font-family);
}
.zen-pill-new-content.zen-pill-new-content--mobile .zen-pill-non-actionable__icon {
  min-width: 16px;
  max-width: 16px;
  height: 16px;
}
.zen-pill-new-content.zen-pill-new-content--mobile.zen-pill-new-content--icon-left {
  grid-template-columns: 16px 1fr;
}
.zen-pill-new-content.zen-pill-new-content--mobile.zen-pill-new-content--icon-left.zen-pill-new-content--empty {
  grid-template-columns: 16px;
}
.zen-pill-new-content.zen-pill-new-content--mobile.zen-pill-new-content--closable.zen-pill-new-content--icon-left {
  grid-template-columns: 16px 1fr 22px;
}
.zen-pill-new-content.zen-pill-new-content--mobile.zen-pill-new-content--closable.zen-pill-new-content--icon-left.zen-pill-new-content--empty {
  grid-template-columns: 16px 22px;
  gap: 8px;
}
.zen-pill-new-content.zen-pill-new-content--drive {
  font-family: var(--main-font);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.32px;
  line-height: 20px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .zen-pill-new-content.zen-pill-new-content--drive {
  font-family: var(--arabic-font-family);
}
.zen-pill-new-content.zen-pill-new-content--drive-tablet {
  font-family: var(--main-font);
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.32px;
  line-height: 22px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .zen-pill-new-content.zen-pill-new-content--drive-tablet {
  font-family: var(--arabic-font-family);
}
.zen-pill-new {
  font-family: var(--main-font);
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.32px;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
  border-radius: 30px;
  display: grid;
  grid-auto-flow: column;
  align-items: center;
  min-width: 30px;
}
html:lang(ar) .zen-pill-new {
  font-family: var(--arabic-font-family);
}
.zen-pill-new--default {
  max-width: 200px;
  width: fit-content;
}
.zen-pill-new--empty {
  gap: 4px;
  min-width: fit-content;
}
.zen-pill-new.zen-pill-new--drive,
.zen-pill-new.zen-pill-new--mobile {
  border-radius: 50px;
}
.zen-review-list-toggle {
  color: var(--text-primary);
  font-family: var(--main-font);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 4px;
}
html:lang(ar) .zen-review-list-toggle {
  font-family: var(--arabic-font-family);
}
.zen-form-list-label {
  max-height: 32px;
  display: flex;
  align-items: center;
}
.zen-form-control {
  align-items: start;
}
.zen-form-group-list-label {
  font-style: italic;
}
.zen-divider {
  height: 1px;
  width: 100%;
  border: none;
  background-color: var(--borders-general);
  margin: 0;
  padding: 0;
}
.zen-additional-sub-section__secondary {
  margin: 16px 0;
  font-family: var(--main-font);
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.32px;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
  color: var(--text-secondary);
}
html:lang(ar) .zen-additional-sub-section__secondary {
  font-family: var(--arabic-font-family);
}
.zen-additional-sub-section__content {
  padding: 16px;
}
.zen-additional-sub-section .zen-accordion__content {
  padding: 0;
}
.zen-form-field-error {
  margin-top: 4px;
  display: flex;
  min-width: 0;
  font-family: var(--main-font);
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.32px;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
  color: var(--text-error-message);
  fill: var(--text-error-message);
}
html:lang(ar) .zen-form-field-error {
  font-family: var(--arabic-font-family);
}
.zen-form-field-error__error-text {
  margin-left: 4px;
  display: flex;
  flex-direction: column;
  overflow-wrap: break-word;
}
.zen-form-field-error__error-icon {
  flex: 0 0 auto;
}
.zen-form-field-error__icon-container {
  padding: 1px 2px 0;
  height: 16px;
}
.zen-form-field-error.zen-form-field-error--drive .zen-form-field-error__icon-container,
.zen-form-field-error.zen-form-field-error--drive-tablet .zen-form-field-error__icon-container {
  height: 18px;
}
.zen-form-field-error.zen-form-field-error--drive {
  font-family: var(--main-font);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.32px;
  line-height: 18px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .zen-form-field-error.zen-form-field-error--drive {
  font-family: var(--arabic-font-family);
}
.zen-form-field-error.zen-form-field-error--drive-tablet {
  font-family: var(--main-font);
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.32px;
  line-height: 18px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .zen-form-field-error.zen-form-field-error--drive-tablet {
  font-family: var(--arabic-font-family);
}
.zen-textarea {
  overflow: visible;
  white-space: wrap;
}
.zen-textarea--no-resize {
  resize: none;
}
.zen-form-field {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}
.zen-form-field * {
  box-sizing: border-box;
}
.zen-form-field--new-component {
  display: inline-flex;
}
.zen-form-field--with-banner {
  gap: 8px;
}
.zen-form-field--mobile.zen-form-field--with-banner {
  gap: 4px;
}
.zen-form-field__secondary {
  margin-top: 4px;
  position: relative;
  display: flex;
  width: 100%;
}
.zen-form-field__input-container {
  width: 100%;
  align-items: center;
  display: grid;
  grid-template-columns: 1fr auto;
}
.zen-form-field__input-container--hidden {
  display: none;
}
.zen-form-field__input-container--with-trailing {
  gap: 8px;
}
.zen-form-field__input-container--review {
  grid-template-columns: max-content max-content;
}
.zen-form-field.zen-form-field--form-item .zen-radio {
  padding: 0 16px 12px 0;
}
.zen-form-field__trailing-text {
  display: flex;
  align-items: center;
  font-family: var(--main-font);
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.32px;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
  color: var(--text-secondary);
}
html:lang(ar) .zen-form-field__trailing-text {
  font-family: var(--arabic-font-family);
}
.zen-form-field__input:not(.zen-range-popup) {
  width: 100%;
}
.zen-form-field__text {
  font-family: var(--main-font);
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.32px;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
  flex: 1 1 auto;
  color: var(--text-secondary);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  word-wrap: normal;
}
html:lang(ar) .zen-form-field__text {
  font-family: var(--arabic-font-family);
}
.zen-form-field__text.zen-form-field__text--drive {
  font-family: var(--main-font);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.32px;
  line-height: 18px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .zen-form-field__text.zen-form-field__text--drive {
  font-family: var(--arabic-font-family);
}
.zen-form-field__text.zen-form-field__text--drive-tablet {
  font-family: var(--main-font);
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.32px;
  line-height: 18px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .zen-form-field__text.zen-form-field__text--drive-tablet {
  font-family: var(--arabic-font-family);
}
.zen-form-field__text--error {
  color: var(--text-error-message);
  fill: var(--text-error-message);
  display: flex;
  align-items: center;
}
.zen-form-field__error-icon {
  margin-right: 6px;
  flex: 0 0 auto;
}
.zen-form-field__error-text {
  flex: 1 1 auto;
  padding-top: 1px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-wrap: normal;
  white-space: break-spaces;
}
.zen-form-field__length {
  flex: 0 0 auto;
  font-family: var(--main-font);
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.32px;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
  color: var(--text-secondary);
}
html:lang(ar) .zen-form-field__length {
  font-family: var(--arabic-font-family);
}
.zen-form-field__label-wrapper {
  display: grid;
  grid-template-rows: 1fr 20px;
}
.zen-form-field__trailing-wrapper {
  display: grid;
  grid-template-rows: 1fr 20px;
}
.zen-form-field--label-left {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
}
.zen-form-field--label-top {
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
  gap: 8px;
}
.zen-dropdown {
  box-sizing: border-box;
}
.zen-dropdown * {
  box-sizing: border-box;
}
.zen-dropdown__container {
  position: relative;
  max-width: 100%;
}
.zen-dropdown__trigger-button-text {
  color: var(--text-hyperlink);
}
.zen-dropdown .zen-dropdown__trigger-button--error {
  border: 1px solid var(--text-error-message);
}
.zen-dropdown .zen-dropdown__trigger-button--error:focus,
.zen-dropdown .zen-dropdown__trigger-button--error:hover,
.zen-dropdown .zen-dropdown__trigger-button--error:active {
  border: 1px solid var(--text-error-message);
}
.zen-dropdown .zen-dropdown__trigger-button:not(.zen-dropdown--form-item) {
  max-width: 26.25rem;
}
.zen-dropdown .zen-dropdown__trigger-button--checked {
  color: var(--text-primary);
  background-color: var(--accents-general--main);
  border: 1px solid var(--borders-form-field--reverse);
}
.zen-dropdown .zen-dropdown__trigger-button--width-parent {
  max-width: 100%;
}
.zen-dropdown--mobile .zen-mobile-sheet__title {
  border-bottom: none;
}
.zen-dropdown--mobile .zen-dropdown-mobile-sheet__search-container {
  padding-block: 1rem;
  padding-inline: 0.75rem;
}
.zen-dropdown--mobile .zen-dropdown-mobile-sheet__checkbox-container {
  padding: 1rem;
  border-bottom: var(--border-width-default) solid var(--borders-general);
}
.zen-dropdown--mobile .zen-dropdown-mobile-sheet__search {
  width: 100%;
}
.zen-dropdown-popup {
  background-color: var(--backgrounds-main);
  z-index: 11002;
}
.zen-dropdown-popup__search-container .zen-input-adornments {
  border-radius: 0;
  border: none;
  border-bottom: var(--border-width-default) solid var(--borders-general);
}
.zen-checkbox-list-with-action {
  box-sizing: border-box;
  margin-bottom: 1rem;
}
.zen-checkbox-list-with-action * {
  box-sizing: border-box;
}
.zen-checkbox-list-with-action__list {
  display: flex;
  flex-direction: column;
  list-style: none;
  padding: 0;
  margin: 0;
}
.zen-checkbox-list-with-action__list-item {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-weight: 400;
}
.zen-checkbox-list-with-action__title {
  font-family: var(--main-font);
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.32px;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
  color: var(--text-secondary);
  padding: 0.5rem;
  padding-inline-start: 1rem;
}
html:lang(ar) .zen-checkbox-list-with-action__title {
  font-family: var(--arabic-font-family);
}
.zen-checkbox-list-with-action__action-item--action {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
}
.zen-checkbox-list-with-action__action-item--action .zen-checkbox__label {
  padding-inline-end: 0.5rem;
  padding-bottom: 0.75rem;
  padding-top: 0.75rem;
}
.zen-checkbox-list-with-action__singled {
  font-weight: 700;
}
.zen-checkbox-list-with-action__action-checkbox {
  height: 2.5rem;
  position: relative;
  flex-grow: 0;
}
.zen-checkbox-list-with-action__action-checkbox .zen-checkbox__label {
  padding-inline-start: 1rem;
}
.zen-checkbox-list-with-action__action-checkbox .zen-checkbox__label-text {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-wrap: normal;
  width: 100%;
}
.zen-checkbox-list-with-action__action-checkbox--full-width .zen-checkbox__label {
  width: 100%;
}
.zen-checkbox-list-with-action__label {
  font-family: var(--main-font);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-between;
  fill: var(--text-placeholder);
  color: var(--text-primary);
  width: 100%;
  padding-block: 0.4375rem;
  padding-inline-start: 0.25rem;
  padding-inline-end: 0.5rem;
}
html:lang(ar) .zen-checkbox-list-with-action__label {
  font-family: var(--arabic-font-family);
}
.zen-checkbox-list-with-action__label--action {
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
}
.zen-checkbox-list-with-action__label--action:hover,
.zen-checkbox-list-with-action__label--action:active,
.zen-checkbox-list-with-action__label--action:focus {
  color: var(--text-hyperlink);
  fill: var(--text-hyperlink);
}
.zen-checkbox-list-with-action__label-text {
  display: flex;
  flex-grow: 1;
  padding-inline-end: 0.5rem;
}
.zen-checkbox-list-with-action__label-info {
  display: flex;
  align-items: center;
}
.zen-checkbox-list-with-action__label-count {
  margin-inline-start: 0.375rem;
}
.zen-checkbox-list-with-action__counter {
  font-family: var(--main-font);
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.32px;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
  background: var(--action-primary--default);
  color: var(--text-reverse-primary);
  border-radius: 0.5625rem;
  display: flex;
  min-width: 1rem;
  height: 1rem;
  justify-content: center;
  align-items: center;
  padding: 0.125rem 0.25rem;
}
html:lang(ar) .zen-checkbox-list-with-action__counter {
  font-family: var(--arabic-font-family);
}
.zen-checkbox-list-with-action__color-block {
  display: flex;
  align-items: center;
  justify-content: center;
}
.zen-checkbox-list-with-action__color-info {
  width: 1.25rem;
  min-width: 1.25rem;
  border-radius: 0.1875rem;
  margin-inline-end: 0.3125rem;
  height: 0.375rem;
  border: 1px solid black;
}
.zen-checkbox-list-with-action__color-info--right-indent {
  margin-inline-end: 1rem;
}
.zen-checkbox-list-with-action__color-info--hidden {
  display: none;
}
.zen-checkbox-list-with-action__sr-only {
  position: absolute;
  inset-inline-start: -624.9375rem;
  width: 1px;
  height: 1px;
  opacity: 0;
}
.zen-checkbox-list-with-action.zen-checkbox-list-with-action--drive .zen-checkbox-list-with-action__action-checkbox,
.zen-checkbox-list-with-action.zen-checkbox-list-with-action--drive-tablet .zen-checkbox-list-with-action__action-checkbox {
  height: 3.75rem;
}
.zen-checkbox-list-with-action.zen-checkbox-list-with-action--drive .zen-checkbox-list-with-action__title {
  font-family: var(--main-font);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.32px;
  line-height: 20px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .zen-checkbox-list-with-action.zen-checkbox-list-with-action--drive .zen-checkbox-list-with-action__title {
  font-family: var(--arabic-font-family);
}
.zen-checkbox-list-with-action.zen-checkbox-list-with-action--drive .zen-checkbox-list-with-action__label {
  font-family: var(--main-font);
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 20px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .zen-checkbox-list-with-action.zen-checkbox-list-with-action--drive .zen-checkbox-list-with-action__label {
  font-family: var(--arabic-font-family);
}
.zen-checkbox-list-with-action.zen-checkbox-list-with-action--drive .zen-checkbox-list-with-action__counter {
  font-family: var(--main-font);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.32px;
  line-height: 20px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .zen-checkbox-list-with-action.zen-checkbox-list-with-action--drive .zen-checkbox-list-with-action__counter {
  font-family: var(--arabic-font-family);
}
.zen-checkbox-list-with-action.zen-checkbox-list-with-action--drive-tablet .zen-checkbox-list-with-action__title {
  font-family: var(--main-font);
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.32px;
  line-height: 22px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .zen-checkbox-list-with-action.zen-checkbox-list-with-action--drive-tablet .zen-checkbox-list-with-action__title {
  font-family: var(--arabic-font-family);
}
.zen-checkbox-list-with-action.zen-checkbox-list-with-action--drive-tablet .zen-checkbox-list-with-action__label {
  font-family: var(--main-font);
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 22px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .zen-checkbox-list-with-action.zen-checkbox-list-with-action--drive-tablet .zen-checkbox-list-with-action__label {
  font-family: var(--arabic-font-family);
}
.zen-checkbox-list-with-action.zen-checkbox-list-with-action--drive-tablet .zen-checkbox-list-with-action__counter {
  font-family: var(--main-font);
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.32px;
  line-height: 22px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .zen-checkbox-list-with-action.zen-checkbox-list-with-action--drive-tablet .zen-checkbox-list-with-action__counter {
  font-family: var(--arabic-font-family);
}
.zen-dropdown-list {
  margin: 0;
  padding: 0.25rem 0 0;
  min-width: 11.25rem;
}
.zen-dropdown-list__elements {
  font-family: var(--main-font);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
  height: 100%;
  overflow-y: auto;
  max-height: 15.3125rem;
}
html:lang(ar) .zen-dropdown-list__elements {
  font-family: var(--arabic-font-family);
}
.zen-dropdown-list__label {
  font-family: var(--main-font);
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.32px;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
  width: 100%;
  height: 2.5rem;
  color: var(--text-secondary);
  padding-block: 0.5rem;
  padding-inline: 1rem;
}
html:lang(ar) .zen-dropdown-list__label {
  font-family: var(--arabic-font-family);
}
.zen-dropdown-list__checkbox-container {
  padding-block: 0.5rem;
  padding-inline: 1rem;
  border-bottom: var(--border-width-default) solid var(--borders-general);
}
.zen-dropdown-list__checkbox-container .zen-checkbox__label-text {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-wrap: normal;
}
.zen-dropdown-list__item-wrapper {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  margin: 1px;
  border-bottom: var(--border-width-default) solid var(--borders-general);
}
.zen-dropdown-list__item {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  background-color: transparent;
  width: 100%;
  height: 2.5rem;
  font-weight: 400;
  border: none;
  padding-block: 0.4375rem;
  padding-inline: 1rem;
  border-radius: 0;
}
.zen-dropdown-list__item--interactive:not(:disabled) {
  cursor: pointer;
}
.zen-dropdown-list__item--interactive:not(:disabled):hover,
.zen-dropdown-list__item--interactive:not(:disabled):focus {
  color: var(--text-primary);
  fill: var(--action-secondary--default);
  outline: none;
  background-color: var(--backgrounds-hover);
}
.zen-dropdown-list__item--interactive:not(:disabled):active {
  color: var(--text-reverse-primary);
  fill: var(--text-reverse-primary);
  outline: none;
  background-color: var(--action-secondary--default);
}
.zen-dropdown-list__item--interactive:not(:disabled):active .zen-dropdown-list__action-label {
  color: var(--text-reverse-primary);
}
.zen-dropdown-list__item--end {
  justify-content: flex-end;
}
.zen-dropdown-list__sentinel-item {
  position: "absolute";
  left: "-9999px";
  width: "1px";
  height: "1px";
  opacity: 0;
}
.zen-dropdown-list__action-label {
  font-family: var(--main-font);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
  color: var(--text-primary);
  display: flex;
  align-items: center;
}
html:lang(ar) .zen-dropdown-list__action-label {
  font-family: var(--arabic-font-family);
}
.zen-dropdown-list__action-label--limited {
  display: block;
  max-width: 12.5rem;
}
.zen-dropdown-list__icon {
  color: var(--action-secondary--default);
  fill: var(--action-secondary--default);
}
.zen-dropdown-list__action-icon {
  margin-inline-end: 0.375rem;
}
.zen-dropdown-list__action-button {
  height: 2.5rem;
  border: none;
  margin: 0;
}
.zen-dropdown-list__action-button--no-fill {
  fill: var(--borders-form-field--hover);
}
.zen-dropdown-list__action-button:active svg {
  fill: var(--text-reverse-primary);
}
.zen-dropdown-list__action-button:disabled {
  pointer-events: none;
  cursor: default;
}
.zen-dropdown-list__action-button:disabled svg {
  fill: var(--text-button-disabled);
}
.zen-dropdown-list__footer {
  display: flex;
  justify-content: flex-start;
  border-top: var(--border-width-default) solid var(--borders-general);
}
.zen-dropdown-list__action-button-back {
  padding-block: 0.4375rem;
  padding-inline: 0.875rem;
}
.zen-dropdown-list__button-group {
  display: inline-flex;
  flex-grow: 1;
  justify-content: flex-end;
}
.zen-dropdown-list__clear-button,
.zen-dropdown-list__cancel-button,
.zen-dropdown-list__apply-button {
  margin-inline-end: 0.5rem;
  margin-block-start: 0.5rem;
  margin-block-end: 0.25rem;
}
.zen-dropdown-list__clear-button {
  margin-inline-start: 0.5rem;
}
.zen-dropdown-list__container {
  width: 15.625rem;
  max-height: 15.3125rem;
  border-radius: var(--border-radius-default);
}
.zen-dropdown-list__container--empty {
  padding-block: 1rem;
  padding-inline: 1.25rem;
}
.zen-dropdown-list.zen-dropdown-list--drive .zen-dropdown-list__label,
.zen-dropdown-list.zen-dropdown-list--drive-tablet .zen-dropdown-list__label {
  height: 2.75rem;
  padding: 0.75rem;
}
.zen-dropdown-list.zen-dropdown-list--drive .zen-dropdown-list__item,
.zen-dropdown-list.zen-dropdown-list--drive-tablet .zen-dropdown-list__item {
  height: 3.75rem;
}
.zen-dropdown-list.zen-dropdown-list--drive .zen-dropdown-list__action-button,
.zen-dropdown-list.zen-dropdown-list--drive-tablet .zen-dropdown-list__action-button {
  height: 3.25rem;
}
.zen-dropdown-list.zen-dropdown-list--drive .zen-dropdown-list__elements,
.zen-dropdown-list.zen-dropdown-list--drive-tablet .zen-dropdown-list__elements {
  max-height: 16.25rem;
}
.zen-dropdown-list.zen-dropdown-list--drive .zen-dropdown-list__action-label {
  font-family: var(--main-font);
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 20px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .zen-dropdown-list.zen-dropdown-list--drive .zen-dropdown-list__action-label {
  font-family: var(--arabic-font-family);
}
.zen-dropdown-list.zen-dropdown-list--drive .zen-dropdown-list__label {
  font-family: var(--main-font);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.32px;
  line-height: 20px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .zen-dropdown-list.zen-dropdown-list--drive .zen-dropdown-list__label {
  font-family: var(--arabic-font-family);
}
.zen-dropdown-list.zen-dropdown-list--drive .zen-dropdown-list__elements {
  font-family: var(--main-font);
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 20px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .zen-dropdown-list.zen-dropdown-list--drive .zen-dropdown-list__elements {
  font-family: var(--arabic-font-family);
}
.zen-dropdown-list.zen-dropdown-list--drive-tablet .zen-dropdown-list__action-label {
  font-family: var(--main-font);
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 22px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .zen-dropdown-list.zen-dropdown-list--drive-tablet .zen-dropdown-list__action-label {
  font-family: var(--arabic-font-family);
}
.zen-dropdown-list.zen-dropdown-list--drive-tablet .zen-dropdown-list__label {
  font-family: var(--main-font);
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.32px;
  line-height: 22px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .zen-dropdown-list.zen-dropdown-list--drive-tablet .zen-dropdown-list__label {
  font-family: var(--arabic-font-family);
}
.zen-dropdown-list.zen-dropdown-list--drive-tablet .zen-dropdown-list__elements {
  font-family: var(--main-font);
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 22px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .zen-dropdown-list.zen-dropdown-list--drive-tablet .zen-dropdown-list__elements {
  font-family: var(--arabic-font-family);
}
.zen-chip {
  --chip-min-width-default: 40px;
  --chip-max-width-default: 236px;
  --chip-border-radius: 8px;
  --chip-height: 32px;
  --chip-height--drive: 40px;
  --chip-height--mobile: 40px;
  box-sizing: border-box;
  font-family: var(--main-font);
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.32px;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: var(--chip-height);
  min-width: var(--chip-min-width-default);
  max-width: var(--chip-max-width-default);
  width: fit-content;
  box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.15);
  border-radius: var(--chip-border-radius);
  gap: 2px;
}
.zen-chip * {
  box-sizing: border-box;
}
html:lang(ar) .zen-chip {
  font-family: var(--arabic-font-family);
}
.zen-chip:focus-visible {
  outline: 1px solid var(--borders-form-field--active);
  outline-offset: 1px;
}
.zen-chip--default {
  max-width: var(--chip-max-width-default);
  width: fit-content;
}
.zen-chip.zen-chip--drive {
  border-radius: 8px;
}
.zen-chip:not(.zen-chip--disabled):not(.zen-chip--readonly):hover {
  cursor: pointer;
}
.zen-chip:not(.zen-chip--disabled):not(.zen-chip--readonly):hover .zen-chip__content-wrapper {
  cursor: pointer;
}
.zen-chip__input {
  position: absolute;
  left: -5000px;
}
.zen-chip__content-wrapper {
  margin: 0;
  gap: 4px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  display: grid;
  grid-auto-flow: column;
  min-height: 16px;
}
.zen-chip--default {
  background-color: var(--backgrounds-main);
  border: 1px solid var(--borders-general);
  color: var(--text-secondary);
  fill: var(--text-secondary);
}
.zen-chip--default:hover {
  border: 1px solid var(--borders-form-field--hover);
  background-color: var(--backgrounds-content-1);
}
.zen-chip--keyboard-nav {
  outline: 1px solid var(--borders-form-field--active);
  outline-offset: 1px;
}
.zen-chip--active {
  background-color: var(--accents-general--main);
  border: 1px solid var(--borders-form-field--reverse);
  color: var(--text-secondary);
  fill: var(--text-secondary);
}
.zen-chip--active:hover {
  border-color: var(--action-primary--active);
}
.zen-chip--readonly {
  color: var(--text-secondary);
  background-color: var(--backgrounds-content-0);
  border: 1px solid var(--borders-general);
}
.zen-chip--disabled {
  color: var(--text-button-disabled);
  background-color: var(--backgrounds-field-disabled);
  border: 1px solid var(--borders-general);
}
.zen-chip--success {
  background-color: var(--accents-success--main);
  border: 1px solid var(--borders-general);
  color: var(--accents-success--detail);
  fill: var(--accents-success--detail);
}
.zen-chip--success:hover {
  border-color: var(--accents-success--detail);
}
.zen-chip--accent {
  background-color: var(--accents-general--detail);
  border: 1px solid var(--borders-general);
  color: var(--accents-general--main);
  fill: var(--accents-general--main);
}
.zen-chip--accent .zen-chip__close-button {
  fill: var(--accents-general--main);
}
.zen-chip--accent .zen-chip__close-button:hover {
  fill: var(--accents-general--detail);
}
.zen-chip--accent:hover {
  border-color: var(--accents-general--detail);
}
.zen-chip__close-button {
  display: flex;
  align-items: center;
  flex-shrink: 0;
  justify-content: center;
  padding: 0;
  cursor: pointer;
  border: none;
  background-color: transparent;
  border-radius: 15px;
  fill: var(--action-primary--active);
}
.zen-chip__close-button:hover,
.zen-chip__close-button:focus,
.zen-chip__close-button:active {
  background-color: var(--backgrounds-content-2);
  outline: none;
}
.zen-chip__close-icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
}
.zen-chip__quantity {
  font-family: var(--main-font);
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.32px;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
  background-color: var(--action-primary--default);
  color: var(--text-reverse-primary);
  min-width: 16px;
  border-radius: 16px;
  padding: 0px 4px;
}
html:lang(ar) .zen-chip__quantity {
  font-family: var(--arabic-font-family);
}
.zen-chip.zen-chip--standard {
  padding: 7px 8px;
}
.zen-chip.zen-chip--trigger .zen-chip__trigger {
  padding: 8px;
  outline: none;
}
.zen-chip.zen-chip--trigger .zen-chip__trigger--with-icon {
  padding: 7px 0 7px 7px;
}
.zen-chip.zen-chip--trigger .zen-chip__close-button {
  height: 30px;
  width: 30px;
}
.zen-chip.zen-chip--trigger:focus-within {
  outline: 1px solid var(--borders-form-field--active);
  outline-offset: 1px;
}
.zen-chip.zen-chip--drive,
.zen-chip.zen-chip--drive-tablet {
  height: var(--chip-height--drive);
  font-family: var(--main-font);
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 30px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .zen-chip.zen-chip--drive,
html:lang(ar) .zen-chip.zen-chip--drive-tablet {
  font-family: var(--arabic-font-family);
}
.zen-chip.zen-chip--drive.zen-chip--standard,
.zen-chip.zen-chip--drive-tablet.zen-chip--standard {
  padding: 7px 12px;
}
.zen-chip.zen-chip--drive.zen-chip--trigger .zen-chip__trigger,
.zen-chip.zen-chip--drive-tablet.zen-chip--trigger .zen-chip__trigger {
  padding: 5px 12px;
}
.zen-chip.zen-chip--drive.zen-chip--trigger .zen-chip__trigger--with-icon,
.zen-chip.zen-chip--drive-tablet.zen-chip--trigger .zen-chip__trigger--with-icon {
  padding: 3px 0 3px 12px;
}
.zen-chip.zen-chip--drive.zen-chip--trigger .zen-chip__close-button,
.zen-chip.zen-chip--drive-tablet.zen-chip--trigger .zen-chip__close-button {
  height: 38px;
  width: 38px;
}
.zen-chip.zen-chip--drive .zen-chip__quantity,
.zen-chip.zen-chip--drive-tablet .zen-chip__quantity {
  min-width: 30px;
  height: 30px;
  padding: 0px 8px;
}
.zen-chip.zen-chip--drive .zen-chip__close-button,
.zen-chip.zen-chip--drive-tablet .zen-chip__close-button {
  height: var(--chip-height--drive);
  width: var(--chip-height--drive);
}
.zen-chip.zen-chip--drive-tablet .zen-chip__quantity {
  font-family: var(--main-font);
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 30px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .zen-chip.zen-chip--drive-tablet .zen-chip__quantity {
  font-family: var(--arabic-font-family);
}
.zen-chip.zen-chip--drive .zen-chip__quantity {
  font-family: var(--main-font);
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 30px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .zen-chip.zen-chip--drive .zen-chip__quantity {
  font-family: var(--arabic-font-family);
}
.zen-chip-content {
  display: flex;
  color: var(--text-primary);
  align-items: center;
  justify-content: space-between;
  padding: 4px 12px 4px 12px;
  border-radius: 8px;
  background: var(--backgrounds-content-1);
}
.zen-chip-text-content {
  height: 16px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.zen-chip-text-content--hidden {
  visibility: hidden;
}
.zen-chip-text-content.zen-chip-text-content--drive,
.zen-chip-text-content.zen-chip-text-content--drive-tablet {
  height: 30px;
}
.zen-chip--mobile {
  font-family: var(--main-font);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
  height: var(--chip-height--mobile);
}
html:lang(ar) .zen-chip--mobile {
  font-family: var(--arabic-font-family);
}
.zen-chip--mobile.zen-chip--standard {
  padding: 11px 8px;
}
.zen-chip--mobile.zen-chip--trigger .zen-chip__trigger {
  padding: 12px 8px;
}
.zen-chip--mobile.zen-chip--trigger .zen-chip__trigger--with-icon {
  padding: 11px 0 11px 8px;
}
.zen-chip--mobile.zen-chip--trigger .zen-chip__close-button {
  width: 38px;
  height: 38px;
}
.zen-filter-button.zen-filter-button {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.zen-filter-button--full-width {
  width: 100%;
}
.zen-filter-button__label {
  font-family: var(--main-font);
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.32px;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .zen-filter-button__label {
  font-family: var(--arabic-font-family);
}
.zen-filter-button__label--full-width {
  flex-grow: 1;
  text-align: start;
}
.zen-filter-button__tags {
  display: flex;
  flex-wrap: nowrap;
  justify-content: flex-end;
  align-items: center;
}
.zen-filter-button__quantity {
  font-family: var(--main-font);
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.32px;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
  min-width: 1rem;
  border-radius: 1rem;
  margin-inline-start: 0.375rem;
  padding: 0 0.25rem;
  display: flex;
  align-items: center;
}
html:lang(ar) .zen-filter-button__quantity {
  font-family: var(--arabic-font-family);
}
.zen-filter-button__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1rem;
  height: 1rem;
  margin-inline-start: 0.375rem;
}
.zen-filter-button--secondary .zen-filter-button__quantity {
  background-color: var(--action-primary--default);
  color: var(--text-reverse-primary);
}
.zen-filter-button--secondary .zen-filter-button__icon {
  fill: var(--action-secondary--default);
  color: var(--text-reverse-primary);
}
.zen-filter-button--tertiary .zen-filter-button__quantity {
  background-color: var(--action-primary--default);
  color: var(--text-reverse-primary);
}
.zen-filter-button--tertiary .zen-filter-button__icon {
  color: var(--text-hyperlink);
  fill: var(--text-hyperlink);
  background-color: transparent;
}
.zen-filter-button--tertiary-black .zen-filter-button__quantity {
  background-color: var(--action-primary--default);
  color: var(--text-reverse-primary);
}
.zen-filter-button--tertiary-black .zen-filter-button__icon {
  color: var(--text-primary);
  fill: var(--text-primary);
  background-color: transparent;
}
.zen-filter-button:disabled .zen-filter-button__icon {
  fill: var(--text-button-disabled);
}
.zen-filter-button--active .zen-filter-button__icon {
  transform: rotate(180deg);
}
.zen-filter-button.zen-filter-button--drive .zen-filter-button__quantity,
.zen-filter-button.zen-filter-button--drive-tablet .zen-filter-button__quantity,
.zen-filter-button.zen-filter-button--mobile .zen-filter-button__quantity {
  height: 1.375rem;
  padding: 0 0.5rem;
  border-radius: 0.75rem;
  min-width: 1.375rem;
}
.zen-filter-button.zen-filter-button--drive .zen-filter-button__tags,
.zen-filter-button.zen-filter-button--drive-tablet .zen-filter-button__tags,
.zen-filter-button.zen-filter-button--mobile .zen-filter-button__tags {
  min-height: 1.375rem;
}
.zen-filter-button.zen-filter-button--drive .zen-filter-button__icon,
.zen-filter-button.zen-filter-button--drive-tablet .zen-filter-button__icon,
.zen-filter-button.zen-filter-button--mobile .zen-filter-button__icon {
  width: 1.25rem;
  height: 1.25rem;
}
.zen-filter-button.zen-filter-button--drive {
  padding: 0.625rem;
}
.zen-filter-button.zen-filter-button--drive .zen-filter-button__label {
  font-family: var(--main-font);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.32px;
  line-height: 20px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .zen-filter-button.zen-filter-button--drive .zen-filter-button__label {
  font-family: var(--arabic-font-family);
}
.zen-filter-button.zen-filter-button--drive .zen-filter-button__quantity {
  font-family: var(--main-font);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.32px;
  line-height: 20px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .zen-filter-button.zen-filter-button--drive .zen-filter-button__quantity {
  font-family: var(--arabic-font-family);
}
.zen-filter-button.zen-filter-button--mobile {
  padding: 0.625rem;
}
.zen-filter-button.zen-filter-button--mobile .zen-filter-button__label {
  font-family: var(--main-font);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .zen-filter-button.zen-filter-button--mobile .zen-filter-button__label {
  font-family: var(--arabic-font-family);
}
.zen-filter-button.zen-filter-button--mobile .zen-filter-button__quantity {
  font-family: var(--main-font);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .zen-filter-button.zen-filter-button--mobile .zen-filter-button__quantity {
  font-family: var(--arabic-font-family);
}
.zen-filter-button.zen-filter-button--drive-tablet {
  padding: 0.6875rem;
}
.zen-filter-button.zen-filter-button--drive-tablet .zen-filter-button__label {
  font-family: var(--main-font);
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.32px;
  line-height: 22px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .zen-filter-button.zen-filter-button--drive-tablet .zen-filter-button__label {
  font-family: var(--arabic-font-family);
}
.zen-filter-button.zen-filter-button--drive-tablet .zen-filter-button__quantity {
  font-family: var(--main-font);
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.32px;
  line-height: 22px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .zen-filter-button.zen-filter-button--drive-tablet .zen-filter-button__quantity {
  font-family: var(--arabic-font-family);
}
.zen-dropdown-searchable-trigger {
  max-width: 26.25rem;
  cursor: pointer;
  box-sizing: border-box;
  display: flex;
  flex-wrap: nowrap;
}
.zen-dropdown-searchable-trigger--form-item {
  max-width: unset;
}
.zen-dropdown-searchable-trigger * {
  box-sizing: border-box;
}
.zen-dropdown-searchable-trigger__arrow-icon--up {
  transform: rotate(180deg);
}
.zen-dropdown-searchable-trigger__icon {
  color: var(--action-secondary--default);
  fill: var(--action-secondary--default);
  min-width: 1rem;
  min-height: 1rem;
  width: 1rem;
  height: 1rem;
}
.zen-dropdown-searchable-trigger__search-container {
  display: flex;
  align-items: center;
  height: 2rem;
  outline: none;
  margin-block: 0;
  padding-block: 0.4375rem;
  padding-inline: 0.5625rem;
  flex: 1 1 auto;
  background-color: var(--backgrounds-main);
  border: var(--border-width-default) solid var(--borders-general);
  min-width: 7.5rem;
  border-radius: var(--border-radius-default);
  border-start-end-radius: 0;
  border-end-end-radius: 0;
  fill: var(--action-secondary--default);
}
.zen-dropdown-searchable-trigger__search-container:hover {
  color: var(--text-primary);
  fill: var(--accents-general--main);
  border-color: var(--borders-form-field--hover);
  background-color: var(--backgrounds-hover);
  z-index: 1;
}
.zen-dropdown-searchable-trigger__search-container:hover .zen-dropdown-searchable-trigger__input {
  background-color: var(--backgrounds-hover);
  border-color: var(--borders-form-field--active);
}
.zen-dropdown-searchable-trigger__input-container {
  width: 100%;
  min-height: 1.5rem;
  display: flex;
  align-items: center;
}
.zen-dropdown-searchable-trigger .zen-dropdown-searchable-trigger__input {
  font-family: var(--main-font);
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.32px;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
  min-width: 5.3125rem;
  height: 100%;
  width: 100%;
  border: none;
  outline: none;
  padding-block: 0;
  padding-inline: 0 0.3125rem;
  -webkit-appearance: none;
  appearance: none;
  background-color: inherit;
  color: inherit;
}
html:lang(ar) .zen-dropdown-searchable-trigger .zen-dropdown-searchable-trigger__input {
  font-family: var(--arabic-font-family);
}
.zen-dropdown-searchable-trigger__popup-trigger {
  display: flex;
  border-color: var(--borders-general);
  border: 1px solid var(--borders-general);
  border-radius: var(--border-radius-default);
  justify-content: center;
  align-items: center;
  background: var(--backgrounds-main);
  fill: var(--action-secondary--default);
  width: 2rem;
  border-start-start-radius: 0;
  border-end-start-radius: 0;
  margin-inline-start: -1px;
  cursor: pointer;
  flex-shrink: 0;
}
.zen-dropdown-searchable-trigger__popup-trigger:focus-visible {
  outline: none;
}
.zen-dropdown-searchable-trigger__popup-trigger--active {
  background-color: var(--action-secondary--default);
  fill: var(--text-reverse-primary);
}
.zen-dropdown-searchable-trigger__popup-trigger:hover:not(.zen-dropdown-searchable-trigger__popup-trigger--active),
.zen-dropdown-searchable-trigger__popup-trigger:active:not(.zen-dropdown-searchable-trigger__popup-trigger--active) {
  z-index: 1;
  border-color: var(--borders-form-field--hover);
  background-color: var(--backgrounds-hover);
}
.zen-dropdown-searchable-trigger__popup-trigger:focus:not(.zen-dropdown-searchable-trigger__popup-trigger--active) {
  z-index: 1;
  border-color: var(--borders-form-field--active);
  background-color: var(--backgrounds-hover);
}
.zen-dropdown-searchable-trigger__label-element {
  margin-inline-end: 0;
  display: flex;
  white-space: nowrap;
}
.zen-dropdown-searchable-trigger__counter {
  font-family: var(--main-font);
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.32px;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
  background: var(--action-primary--default);
  color: var(--text-reverse-primary);
  border-radius: 9px;
  display: flex;
  min-width: 1rem;
  height: 1rem;
  justify-content: center;
  align-items: center;
  padding-block: 0.125rem;
  padding-inline: 0.25rem;
}
html:lang(ar) .zen-dropdown-searchable-trigger__counter {
  font-family: var(--arabic-font-family);
}
.zen-dropdown-searchable-trigger--disabled .zen-dropdown-searchable-trigger__search-container {
  cursor: not-allowed;
  color: var(--text-placeholder);
  background-color: var(--backgrounds-field-disabled);
  pointer-events: none;
  border-color: var(--borders-general);
}
.zen-dropdown-searchable-trigger--disabled .zen-dropdown-searchable-trigger__popup-trigger {
  fill: var(--text-button-disabled);
  cursor: not-allowed;
  color: var(--text-placeholder);
  background-color: var(--backgrounds-field-disabled);
  pointer-events: none;
  border-color: var(--borders-general);
}
.zen-dropdown-searchable-trigger__input.zen-dropdown-searchable-trigger__input--selected::placeholder {
  color: var(--text-nav-highlight);
}
.zen-dropdown-searchable-trigger__close-button {
  border-radius: 16px;
  height: 1rem;
  min-width: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  margin-inline-start: 0.25rem;
  background-color: transparent;
  border: none;
  fill: var(--action-secondary--default);
  cursor: pointer;
}
.zen-dropdown-searchable-trigger__close-button svg {
  pointer-events: none;
}
.zen-dropdown-searchable-trigger__close-button:hover,
.zen-dropdown-searchable-trigger__close-button:focus,
.zen-dropdown-searchable-trigger__close-button:active {
  background-color: var(--backgrounds-hover);
}
.zen-dropdown-searchable-trigger__close-button:disabled {
  visibility: visible;
  fill: transparent;
  background-color: var(--backgrounds-field-disabled);
}
.zen-dropdown-searchable-trigger.zen-dropdown-searchable-trigger--drive .zen-dropdown-searchable-trigger__search-container,
.zen-dropdown-searchable-trigger.zen-dropdown-searchable-trigger--drive-tablet .zen-dropdown-searchable-trigger__search-container {
  height: 2.75rem;
}
.zen-dropdown-searchable-trigger.zen-dropdown-searchable-trigger--drive .zen-dropdown-searchable-trigger__popup-trigger,
.zen-dropdown-searchable-trigger.zen-dropdown-searchable-trigger--drive-tablet .zen-dropdown-searchable-trigger__popup-trigger {
  width: 2.75rem;
}
.zen-dropdown-searchable-trigger.zen-dropdown-searchable-trigger--drive .zen-dropdown-searchable-trigger__counter,
.zen-dropdown-searchable-trigger.zen-dropdown-searchable-trigger--drive-tablet .zen-dropdown-searchable-trigger__counter {
  height: 1.375rem;
  padding-block: 0;
  padding-inline: 0.5rem;
  border-radius: 12px;
}
.zen-dropdown-searchable-trigger.zen-dropdown-searchable-trigger--drive .zen-dropdown-searchable-trigger__close-button,
.zen-dropdown-searchable-trigger.zen-dropdown-searchable-trigger--drive-tablet .zen-dropdown-searchable-trigger__close-button {
  height: 1.25rem;
  min-width: 1.25rem;
}
.zen-dropdown-searchable-trigger.zen-dropdown-searchable-trigger--drive .zen-dropdown-searchable-trigger__search-container {
  height: 2.75rem;
}
.zen-dropdown-searchable-trigger.zen-dropdown-searchable-trigger--drive .zen-dropdown-searchable-trigger__popup-trigger {
  width: 2.75rem;
}
.zen-dropdown-searchable-trigger.zen-dropdown-searchable-trigger--drive .zen-dropdown-searchable-trigger__input {
  font-family: var(--main-font);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.32px;
  line-height: 20px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .zen-dropdown-searchable-trigger.zen-dropdown-searchable-trigger--drive .zen-dropdown-searchable-trigger__input {
  font-family: var(--arabic-font-family);
}
.zen-dropdown-searchable-trigger.zen-dropdown-searchable-trigger--drive .zen-dropdown-searchable-trigger__counter {
  font-family: var(--main-font);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.32px;
  line-height: 20px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .zen-dropdown-searchable-trigger.zen-dropdown-searchable-trigger--drive .zen-dropdown-searchable-trigger__counter {
  font-family: var(--arabic-font-family);
}
.zen-dropdown-searchable-trigger.zen-dropdown-searchable-trigger--drive-tablet .zen-dropdown-searchable-trigger__search-container {
  height: 2.875rem;
}
.zen-dropdown-searchable-trigger.zen-dropdown-searchable-trigger--drive-tablet .zen-dropdown-searchable-trigger__popup-trigger {
  width: 2.875rem;
}
.zen-dropdown-searchable-trigger.zen-dropdown-searchable-trigger--drive-tablet .zen-dropdown-searchable-trigger__input {
  font-family: var(--main-font);
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.32px;
  line-height: 22px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .zen-dropdown-searchable-trigger.zen-dropdown-searchable-trigger--drive-tablet .zen-dropdown-searchable-trigger__input {
  font-family: var(--arabic-font-family);
}
.zen-dropdown-searchable-trigger.zen-dropdown-searchable-trigger--drive-tablet .zen-dropdown-searchable-trigger__counter {
  font-family: var(--main-font);
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.32px;
  line-height: 22px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .zen-dropdown-searchable-trigger.zen-dropdown-searchable-trigger--drive-tablet .zen-dropdown-searchable-trigger__counter {
  font-family: var(--arabic-font-family);
}
.zen-dropdown-searchable-trigger--error {
  border: 1px solid var(--text-error-message);
  border-radius: var(--border-radius-default);
}
.zen-dropdown-searchable-trigger--error .zen-dropdown-searchable-trigger__popup-trigger {
  border: none;
  border-inline-start: 1px solid var(--text-error-message);
}
.zen-dropdown-searchable-trigger--error .zen-dropdown-searchable-trigger__popup-trigger:hover,
.zen-dropdown-searchable-trigger--error .zen-dropdown-searchable-trigger__popup-trigger:active,
.zen-dropdown-searchable-trigger--error .zen-dropdown-searchable-trigger__popup-trigger:focus {
  border: none;
  border-inline-start: 1px solid var(--text-error-message);
}
.zen-dropdown-searchable-trigger--error .zen-dropdown-searchable-trigger__search-container {
  border: none;
  border-inline-end: 1px solid var(--text-error-message);
}
.zen-dropdown-searchable-trigger:focus-within .zen-dropdown-searchable-trigger__search-container {
  z-index: 1;
  border-color: var(--borders-form-field--active);
}
.zen-dropdown-searchable-trigger:focus-within .zen-dropdown-searchable-trigger__popup-trigger {
  border-color: var(--borders-form-field--active);
}
.zen-text-input-disabled-mixin {
  cursor: not-allowed;
  color: var(--text-placeholder);
  background-color: var(--backgrounds-field-disabled);
  pointer-events: none;
  border-color: var(--borders-general);
}
.zen-text-input-hover-mixin {
  border-color: var(--borders-form-field--hover);
}
.zen-text-input-active-mixin {
  border-color: var(--borders-form-field--active);
}
.zen-text-input-error-mixin {
  border-color: var(--borders-form-field--error);
}
.zen-text-input-error-mixin:active,
.zen-text-input-error-mixin:hover,
.zen-text-input-error-mixin:focus {
  border-color: var(--borders-form-field--error);
}
.zen-text-input {
  font-family: var(--main-font);
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.32px;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
  box-sizing: border-box;
  border: var(--border-width-default) solid var(--borders-general);
  border-radius: var(--border-radius-default);
  -webkit-appearance: none;
  outline: none;
  background-color: var(--backgrounds-main);
  color: var(--text-primary);
  fill: var(--text-primary);
  padding: 0.4375rem;
  cursor: text;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
html:lang(ar) .zen-text-input {
  font-family: var(--arabic-font-family);
}
.zen-text-input * {
  box-sizing: border-box;
}
.zen-text-input::placeholder {
  color: var(--text-secondary);
}
.zen-text-input:hover,
.zen-text-input:focus {
  border-color: var(--borders-form-field--hover);
}
.zen-text-input:active {
  border-color: var(--borders-form-field--active);
}
.zen-text-input:disabled {
  cursor: not-allowed;
  color: var(--text-placeholder);
  background-color: var(--backgrounds-field-disabled);
  pointer-events: none;
  border-color: var(--borders-general);
}
.zen-text-input--error {
  border-color: var(--borders-form-field--error);
}
.zen-text-input--error:active,
.zen-text-input--error:hover,
.zen-text-input--error:focus {
  border-color: var(--borders-form-field--error);
}
.zen-text-input.zen-text-input--drive,
.zen-text-input.zen-text-input--drive-tablet {
  padding: 0.6875rem 0.75rem;
}
.zen-text-input.zen-text-input--drive {
  font-family: var(--main-font);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.32px;
  line-height: 20px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .zen-text-input.zen-text-input--drive {
  font-family: var(--arabic-font-family);
}
.zen-text-input.zen-text-input--drive-tablet {
  font-family: var(--main-font);
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.32px;
  line-height: 22px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .zen-text-input.zen-text-input--drive-tablet {
  font-family: var(--arabic-font-family);
}
.zen-text-input.zen-text-input--mobile {
  padding: 0.6875rem 0.75rem 0.75rem;
  font-family: var(--main-font);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
  font-size: 16px !important;
}
html:lang(ar) .zen-text-input.zen-text-input--mobile {
  font-family: var(--arabic-font-family);
}
.zen-input-adornments-border {
  box-sizing: border-box;
  border: 0;
  border-radius: 0;
  outline: 0;
  padding: 0;
  padding-inline-start: 0.25rem;
  -webkit-appearance: none;
  appearance: none;
  background-color: inherit;
  color: var(--text-primary);
}
.zen-input-adornments-border * {
  box-sizing: border-box;
}
.zen-input-adornments {
  box-sizing: border-box;
  height: 2rem;
  border: var(--border-width-default) solid var(--borders-general);
  border-radius: var(--border-radius-default);
  background-color: var(--backgrounds-main);
  overflow: hidden;
  padding: 0.5rem;
  display: grid;
  grid-gap: 0.5rem;
  align-items: center;
}
.zen-input-adornments * {
  box-sizing: border-box;
}
.zen-input-adornments.zen-input-adornments--has-start.zen-input-adornments--has-end {
  grid-template-columns: 1rem 1fr 1rem;
}
.zen-input-adornments.zen-input-adornments--has-start:not(.zen-input-adornments--has-end) {
  grid-template-columns: 1rem 1fr;
}
.zen-input-adornments.zen-input-adornments--has-end:not(.zen-input-adornments--has-start) {
  grid-template-columns: 1fr 1rem;
}
.zen-input-adornments:not(.zen-input-adornments--has-start):not(.zen-input-adornments--has-end) {
  grid-template-columns: 1fr;
}
.zen-input-adornments .zen-input-adornments__wrapper {
  width: 100%;
  display: flex;
}
.zen-input-adornments .zen-input-adornments__wrapper--has-end.zen-input-adornments__wrapper--empty {
  width: calc(100% + (24 / 16rem));
}
.zen-input-adornments:hover {
  border-color: var(--borders-form-field--hover);
}
.zen-input-adornments:focus-within {
  border-color: var(--borders-form-field--active);
}
.zen-input-adornments:active {
  border-color: var(--borders-form-field--active);
}
.zen-input-adornments--disabled {
  cursor: not-allowed;
  background-color: var(--backgrounds-field-disabled);
  pointer-events: none;
  color: var(--text-placeholder);
  fill: var(--text-placeholder);
}
.zen-input-adornments__input {
  height: 100%;
  width: 100%;
  height: 1rem;
}
.zen-input-adornments__input::placeholder {
  color: var(--text-secondary);
  font-feature-settings: "clig" off, "liga" off;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.zen-input-adornments__input.zen-input-adornments__input--border-none {
  box-sizing: border-box;
  border: 0;
  border-radius: 0;
  outline: 0;
  padding: 0;
  padding-inline-start: 0.25rem;
  -webkit-appearance: none;
  appearance: none;
  background-color: inherit;
  color: var(--text-primary);
}
.zen-input-adornments__input.zen-input-adornments__input--border-none * {
  box-sizing: border-box;
}
.zen-input-adornments__adornment {
  display: flex;
  align-items: center;
}
.zen-input-adornments.zen-input-adornments--drive {
  height: 2.75rem;
  display: grid;
  grid-gap: 0.5rem;
  align-items: center;
}
.zen-input-adornments.zen-input-adornments--drive.zen-input-adornments--has-start,
.zen-input-adornments.zen-input-adornments--drive.zen-input-adornments--has-end {
  display: flex;
  align-items: center;
}
.zen-input-adornments.zen-input-adornments--drive.zen-input-adornments--has-start.zen-input-adornments--has-end {
  grid-template-columns: 1.25rem 1fr 1.25rem;
}
.zen-input-adornments.zen-input-adornments--drive.zen-input-adornments--has-start:not(.zen-input-adornments--has-end) {
  grid-template-columns: 1.25rem 1fr;
}
.zen-input-adornments.zen-input-adornments--drive.zen-input-adornments--has-end:not(.zen-input-adornments--has-start) {
  grid-template-columns: 1fr 1.25rem;
}
.zen-input-adornments.zen-input-adornments--drive:not(.zen-input-adornments--has-start):not(.zen-input-adornments--has-end) {
  grid-template-columns: 1fr;
}
.zen-input-adornments.zen-input-adornments--drive .zen-input-adornments__wrapper {
  width: 100%;
  display: flex;
}
.zen-input-adornments.zen-input-adornments--drive .zen-input-adornments__wrapper--has-end.zen-input-adornments__wrapper--empty {
  width: calc(100% + (36 / 16rem));
}
.zen-input-adornments.zen-input-adornments--mobile {
  height: 2.75rem;
  display: grid;
  grid-gap: 0.5rem;
  align-items: center;
  font-size: 1.0625rem;
}
.zen-input-adornments.zen-input-adornments--mobile.zen-input-adornments--has-start,
.zen-input-adornments.zen-input-adornments--mobile.zen-input-adornments--has-end {
  display: flex;
  align-items: center;
}
.zen-input-adornments.zen-input-adornments--mobile.zen-input-adornments--has-start.zen-input-adornments--has-end {
  grid-template-columns: 1.25rem 1fr 1.25rem;
}
.zen-input-adornments.zen-input-adornments--mobile.zen-input-adornments--has-start:not(.zen-input-adornments--has-end) {
  grid-template-columns: 1.25rem 1fr;
}
.zen-input-adornments.zen-input-adornments--mobile.zen-input-adornments--has-end:not(.zen-input-adornments--has-start) {
  grid-template-columns: 1fr 1.25rem;
}
.zen-input-adornments.zen-input-adornments--mobile:not(.zen-input-adornments--has-start):not(.zen-input-adornments--has-end) {
  grid-template-columns: 1fr;
}
.zen-input-adornments.zen-input-adornments--mobile .zen-input-adornments__wrapper {
  width: 100%;
  display: flex;
}
.zen-input-adornments.zen-input-adornments--mobile .zen-input-adornments__wrapper--has-end.zen-input-adornments__wrapper--empty {
  width: calc(100% + (36 / 16rem));
}
.zen-input-adornments.zen-input-adornments--drive-tablet {
  height: 2.875rem;
  display: grid;
  grid-gap: 0.5rem;
  align-items: center;
}
.zen-input-adornments.zen-input-adornments--drive-tablet.zen-input-adornments--has-start,
.zen-input-adornments.zen-input-adornments--drive-tablet.zen-input-adornments--has-end {
  display: flex;
  align-items: center;
}
.zen-input-adornments.zen-input-adornments--drive-tablet.zen-input-adornments--has-start.zen-input-adornments--has-end {
  grid-template-columns: 1.25rem 1fr 1.25rem;
}
.zen-input-adornments.zen-input-adornments--drive-tablet.zen-input-adornments--has-start:not(.zen-input-adornments--has-end) {
  grid-template-columns: 1.25rem 1fr;
}
.zen-input-adornments.zen-input-adornments--drive-tablet.zen-input-adornments--has-end:not(.zen-input-adornments--has-start) {
  grid-template-columns: 1fr 1.25rem;
}
.zen-input-adornments.zen-input-adornments--drive-tablet:not(.zen-input-adornments--has-start):not(.zen-input-adornments--has-end) {
  grid-template-columns: 1fr;
}
.zen-input-adornments.zen-input-adornments--drive-tablet .zen-input-adornments__wrapper {
  width: 100%;
  display: flex;
}
.zen-input-adornments.zen-input-adornments--drive-tablet .zen-input-adornments__wrapper--has-end.zen-input-adornments__wrapper--empty {
  width: calc(100% + (36 / 16rem));
}
.zen-search-input {
  box-sizing: border-box;
}
.zen-search-input * {
  box-sizing: border-box;
}
.zen-search-input__input--error {
  border-color: var(--borders-form-field--error);
}
.zen-search-input__input--error:active,
.zen-search-input__input--error:hover,
.zen-search-input__input--error:focus,
.zen-search-input__input--error:focus-within {
  border-color: var(--borders-form-field--error);
}
.zen-search-input__error {
  padding-block-start: 0.25rem;
  padding-inline-start: 0.125rem;
}
.zen-search-input__pre-icon {
  color: var(--action-secondary--default);
  fill: var(--action-secondary--default);
}
.zen-search-input .zen-search-input__close-button {
  width: 1rem;
  height: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  border-radius: 50%;
  fill: var(--text-primary);
  visibility: hidden;
}
.zen-search-input .zen-search-input__close-button.zen-search-input__close-button--drive,
.zen-search-input .zen-search-input__close-button.zen-search-input__close-button--drive-tablet,
.zen-search-input .zen-search-input__close-button.zen-search-input__close-button--mobile {
  width: 1.25rem;
  height: 1.25rem;
}
.zen-search-input .zen-search-input__close-button:hover {
  cursor: pointer;
}
.zen-search-input__close-icon {
  flex-shrink: 0;
}
.zen-search-input__input:hover .zen-search-input__close-button,
.zen-search-input__input:focus-within .zen-search-input__close-button {
  border: none;
}
.zen-search-input__input:hover .zen-search-input__close-button--visible,
.zen-search-input__input:focus-within .zen-search-input__close-button--visible {
  visibility: visible;
}
.zen-footer-buttons {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 12px;
}
.zen-footer-buttons * {
  box-sizing: border-box;
}
.zen-footer-buttons .zen-footer-buttons__item {
  flex-grow: 1;
  padding: 11px 8px;
}
.zen-footer-buttons--sticky {
  position: fixed;
  width: 100%;
  height: auto;
  max-height: 100%;
  left: 0;
  top: auto;
  bottom: 0;
  z-index: 11005;
  background-color: var(--backgrounds-main);
}
.zen-footer-buttons.zen-footer-buttons--drive .zen-footer-buttons__item,
.zen-footer-buttons.zen-footer-buttons--drive-tablet .zen-footer-buttons__item {
  padding: 15px 12px;
}
.zen-advanced-groups-filter-form {
  font-family: var(--main-font);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .zen-advanced-groups-filter-form {
  font-family: var(--arabic-font-family);
}
.zen-advanced-groups-filter-form__description {
  margin-bottom: 12px;
}
.zen-advanced-groups-filter-form__sections {
  margin: 0;
  padding: 0;
}
.zen-advanced-groups-filter-form__section-switcher {
  display: flex;
  justify-content: center;
  margin-bottom: 12px;
}
.zen-advanced-groups-filter-form__section {
  list-style: none;
}
.zen-advanced-groups-filter-form__main-section {
  margin-bottom: 12px;
  border: var(--border-width-default) solid var(--borders-general);
  border-radius: var(--border-radius-default);
  display: flex;
}
.zen-advanced-groups-filter-form__inter-section-switcher {
  display: flex;
  justify-content: center;
  margin-bottom: 12px;
}
.zen-advanced-groups-filter-form__section-column {
  padding: 16px;
}
.zen-advanced-groups-filter-form__section-column--left {
  flex: 0 0 30%;
  border-right: var(--border-width-default) solid var(--borders-general);
}
.zen-advanced-groups-filter-form__section-column--right {
  flex: 1 1 70%;
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: space-between;
  overflow: hidden;
}
.zen-advanced-groups-filter-form__section-label {
  margin-bottom: 8px;
  display: block;
}
.zen-advanced-groups-filter-form__operator-section {
  display: flex;
}
.zen-advanced-groups-filter-form__operator-label {
  margin-right: 4px;
}
.zen-advanced-groups-filter-form__add-button {
  display: inline-flex;
  align-items: center;
}
.zen-advanced-groups-filter-form__remove-button {
  margin-bottom: 8px;
  padding: 4px;
  color: var(--text-hyperlink);
  fill: var(--text-hyperlink);
  border-color: transparent;
  background-color: transparent;
  text-decoration: underline;
  cursor: pointer;
}
.zen-advanced-groups-filter-form__remove-button:hover,
.zen-advanced-groups-filter-form__remove-button:focus {
  text-decoration: none;
}
.zen-advanced-groups-filter-form__remove-button:active {
  border-color: var(--borders-form-field--hover);
  border-radius: var(--border-radius-default);
  outline: auto;
}
.zen-advanced-groups-filter-form__combo-section {
  flex: 1 1 100%;
  overflow: hidden;
}
.zen-advanced-groups-filter-form__combo-box {
  margin-bottom: 20px;
}
.zen-advanced-groups-filter-form__popup.zen-advanced-groups-filter-form__popup {
  z-index: 11001;
}
.zen-advanced-groups-filter-form__mobile-sheet-stacking.zen-advanced-groups-filter-form__mobile-sheet-stacking {
  z-index: 11012;
}
.zen-group-button {
  box-sizing: border-box;
  font-family: var(--main-font);
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.32px;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
  max-width: 100%;
  display: inline-flex;
  border: 1px solid var(--text-button-disabled);
  border-radius: var(--border-radius-default);
  padding: 0.125rem;
  background-color: var(--backgrounds-main);
  color: var(--text-primary);
  position: relative;
  list-style: none;
  margin-block: 0;
  padding-inline-start: 0;
}
.zen-group-button * {
  box-sizing: border-box;
}
html:lang(ar) .zen-group-button {
  font-family: var(--arabic-font-family);
}
.zen-group-button__item {
  display: inline-flex;
  flex: 1;
}
.zen-group-button--error {
  border-color: var(--borders-form-field--error);
}
.zen-group-button__input {
  width: 1px;
  height: 1px;
  margin: -1px;
  clip: rect(0, 0, 0, 0);
  position: absolute;
}
.zen-group-button__input:checked + .zen-group-button__label {
  background-color: var(--action-primary--default);
  color: var(--text-reverse-primary);
}
.zen-group-button__input:disabled + .zen-group-button__label {
  background-color: var(--backgrounds-main);
  color: var(--text-button-disabled);
  pointer-events: none;
}
.zen-group-button__input:disabled:checked + .zen-group-button__label {
  background-color: var(--backgrounds-content-2);
  color: var(--text-reverse-primary);
}
.zen-group-button__label {
  cursor: pointer;
  flex-grow: 1;
  padding: 0.3125rem 0.625rem;
  border-radius: var(--border-radius-default);
  text-align: center;
}
.zen-group-button__label:first-of-type {
  margin-inline-end: 0.09375rem;
}
.zen-group-button__label:last-of-type {
  margin-inline-start: 0.09375rem;
}
.zen-group-button--drive-tablet {
  width: 100%;
  font-family: var(--main-font);
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.32px;
  line-height: 22px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .zen-group-button--drive-tablet {
  font-family: var(--arabic-font-family);
}
.zen-group-button--drive-tablet .zen-group-button__label {
  padding: 0.75rem;
  width: 100%;
}
.zen-group-button--drive {
  width: 100%;
  font-family: var(--main-font);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.32px;
  line-height: 20px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .zen-group-button--drive {
  font-family: var(--arabic-font-family);
}
.zen-group-button--drive .zen-group-button__label {
  padding: 0.75rem;
  width: 100%;
}
.zen-group-button--mobile {
  width: 100%;
  font-family: var(--main-font);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
  line-height: 1.25rem;
}
html:lang(ar) .zen-group-button--mobile {
  font-family: var(--arabic-font-family);
}
.zen-group-button--mobile .zen-group-button__label {
  padding: 0.75rem;
  width: 100%;
}
.zen-group-button--full-width {
  width: 100%;
}
.zen-group-button:focus-within {
  border-color: var(--borders-form-field--hover);
}
.zen-combobox-selected {
  display: flex;
  flex-wrap: wrap;
}
.zen-combobox-selected__selected-item {
  margin-block: 0 0.5rem;
  margin-inline: 0 0.5rem;
}
.zen-pill-box-item__icon.zen-pill-box-item__icon {
  padding: 0;
  color: var(--text-primary);
  fill: var(--text-primary);
  width: 16px;
  height: 16px;
}
.zen-pill-box-item__icon.zen-pill-box-item__icon:active {
  border-radius: 50%;
  color: var(--text-reverse-primary);
  fill: var(--text-reverse-primary);
  stroke: var(--text-reverse-primary);
  border-color: var(--borders-form-field--hover);
  background-color: var(--borders-form-field--hover);
}
.zen-pill-box-item__icon.zen-pill-box-item__icon:hover:not(:active),
.zen-pill-box-item__icon.zen-pill-box-item__icon:focus:not(:active) {
  border-radius: 50%;
  border: 1px solid var(--action-tertiary--hover);
  color: var(--text-primary);
  fill: var(--text-primary);
  background-color: var(--action-tertiary--hover);
}
.zen-pill-box {
  box-sizing: border-box;
  display: flex;
  align-items: baseline;
  gap: 8px;
}
.zen-pill-box * {
  box-sizing: border-box;
}
.zen-pill-box__pills {
  display: flex;
  align-items: center;
  align-content: center;
  gap: 8px;
  flex-wrap: wrap;
}
.zen-pill-box__label {
  font-family: var(--main-font);
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.32px;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
  color: var(--text-secondary);
}
html:lang(ar) .zen-pill-box__label {
  font-family: var(--arabic-font-family);
}
.zen-pill-box.zen-pill-box--drive {
  font-family: var(--main-font);
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 26px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .zen-pill-box.zen-pill-box--drive {
  font-family: var(--arabic-font-family);
}
.zen-pill-box.zen-pill-box--drive-tablet {
  font-family: var(--main-font);
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 28px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .zen-pill-box.zen-pill-box--drive-tablet {
  font-family: var(--arabic-font-family);
}
.zen-modal {
  box-sizing: border-box;
  box-shadow: 0px 0px 8px 2px rgba(0, 0, 0, 0.2);
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.zen-modal * {
  box-sizing: border-box;
}
.zen-modal__shield {
  box-sizing: border-box;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 11000;
  background-color: var(--backgrounds-hover);
  opacity: 0.5;
}
.zen-modal__shield * {
  box-sizing: border-box;
}
.zen-modal-content {
  box-sizing: border-box;
  z-index: 11001;
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: var(--backgrounds-main);
  color: var(--text-primary);
  padding: 0;
  box-shadow: 0px 2px 6px rgba(11, 32, 50, 0.2);
  max-height: 90vh;
  border-radius: 4px;
  overflow: hidden;
}
.zen-modal-content * {
  box-sizing: border-box;
}
.zen-modal-content--hidden-overflow.zen-modal-content--hidden-overflow {
  overflow-y: hidden;
}
.zen-modal-content__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: nowrap;
  padding: 24px 24px 16px 24px;
  min-height: 72px;
}
.zen-modal-content__header-title {
  display: flex;
  align-items: center;
  gap: 4px;
  flex-grow: 2;
}
.zen-modal-content__header-close-button.zen-modal-content__header-close-button {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  border: none;
  padding: 0;
  cursor: pointer;
  align-self: flex-start;
  padding: 8px;
}
.zen-modal-content__body {
  overflow: auto;
  padding: 12px 24px 32px 24px;
}
.zen-modal-content__body--no-footer {
  padding-bottom: 16px;
}
.zen-modal-content__footer {
  display: flex;
  justify-content: space-between;
  padding: 16px 24px;
  min-height: 59px;
  background-color: var(--backgrounds-content-0);
}
.zen-modal-content__footer--mobile {
  display: flex;
  flex-direction: column-reverse;
  gap: 8px;
}
.zen-modal-content__footer--mobile .zen-modal-content__icon-button {
  justify-content: center;
}
.zen-modal-content__footer--mobile .zen-modal-content__icon-button .zen-caption__content {
  margin-right: 0;
}
.zen-modal-content__footer-left {
  display: flex;
  align-items: center;
}
.zen-modal-content__footer-left--mobile {
  display: block;
  align-items: unset;
}
.zen-modal-content__footer-right {
  display: flex;
  align-items: center;
  gap: 8px;
}
.zen-modal-content__footer-right--mobile {
  display: flex;
  align-items: unset;
  flex-direction: column;
  gap: 8px;
}
.zen-modal-content__left-button {
  width: 100%;
}
.zen-modal-content__icon {
  display: flex;
  align-items: center;
  margin-right: 4px;
  padding: 4px;
  border-radius: 99px;
}
.zen-modal-content__icon--default {
  fill: var(--action-secondary--default);
  color: var(--action-secondary--default);
}
.zen-modal-content__icon--info {
  fill: var(--accents-general--detail);
  color: var(--accents-general--detail);
  background-color: var(--accents-general--main);
}
.zen-modal-content__icon--warning {
  fill: var(--accents-warning--detail);
  color: var(--accents-warning--detail);
  background-color: var(--accents-warning--main);
}
.zen-modal-content__icon--success {
  fill: var(--accents-success--detail);
  color: var(--accents-success--detail);
  background-color: var(--accents-success--main);
}
.zen-modal-content__icon--error {
  fill: var(--accents-error--detail);
  color: var(--accents-error--detail);
  background-color: var(--accents-error--main);
}
.zen-modal-content--small {
  max-width: 400px;
}
.zen-modal-content--normal {
  max-width: 600px;
}
.zen-status-pill {
  box-sizing: border-box;
}
.zen-status-pill * {
  box-sizing: border-box;
}
.zen-status-pill__pill-container {
  display: flex;
  align-items: center;
  gap: 4px;
  position: relative;
  cursor: pointer;
}
.zen-status-pill__pill-container:hover .zen-status-pill__container--default {
  border-color: var(--action-secondary--default);
}
.zen-status-pill__pill-container:hover .zen-status-pill__container--info {
  border-color: var(--accents-general--detail);
}
.zen-status-pill__pill-container:hover .zen-status-pill__container--warning {
  border-color: var(--accents-warning--detail);
}
.zen-status-pill__pill-container:hover .zen-status-pill__container--success {
  border-color: var(--accents-success--detail);
}
.zen-status-pill__pill-container:hover .zen-status-pill__container--error {
  border-color: var(--accents-error--detail);
}
.zen-status-pill__pill-container:hover .zen-status-pill__container--upsell {
  border-color: var(--action-secondary--hover);
}
.zen-status-pill__container {
  font-family: var(--main-font);
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.32px;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
  display: flex;
  align-items: center;
  padding: 4px 8px;
  border-radius: 999px;
  background-color: var(--backgrounds-content-1);
  border: var(--border-width-default) solid transparent;
  color: var(--text-primary);
  cursor: pointer;
}
html:lang(ar) .zen-status-pill__container {
  font-family: var(--arabic-font-family);
}
.zen-status-pill__container--drive {
  font-family: var(--main-font);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.32px;
  line-height: 20px;
  text-transform: none;
  text-decoration: none;
  padding: 8px;
}
html:lang(ar) .zen-status-pill__container--drive {
  font-family: var(--arabic-font-family);
}
.zen-status-pill__container--drive-tablet {
  font-family: var(--main-font);
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.32px;
  line-height: 22px;
  text-transform: none;
  text-decoration: none;
  padding: 8px;
}
html:lang(ar) .zen-status-pill__container--drive-tablet {
  font-family: var(--arabic-font-family);
}
.zen-status-pill__container--child {
  width: 100%;
}
.zen-status-pill__container:hover {
  border-color: var(--borders-secondary);
}
.zen-status-pill__container--default {
  background-color: var(--backgrounds-content-1);
  fill: var(--action-secondary--default);
  color: var(--action-secondary--default);
}
.zen-status-pill__container--default:hover {
  border-color: var(--action-secondary--default);
}
.zen-status-pill__container--info {
  background-color: var(--accents-general--main);
  fill: var(--accents-general--detail);
  color: var(--accents-general--detail);
}
.zen-status-pill__container--info:hover {
  border-color: var(--accents-general--detail);
}
.zen-status-pill__container--warning {
  background-color: var(--accents-warning--main);
  fill: var(--accents-warning--detail);
  color: var(--accents-warning--detail);
}
.zen-status-pill__container--warning:hover {
  border-color: var(--accents-warning--detail);
}
.zen-status-pill__container--success {
  background-color: var(--accents-success--main);
  fill: var(--accents-success--detail);
  color: var(--accents-success--detail);
}
.zen-status-pill__container--success:hover {
  border-color: var(--accents-success--detail);
}
.zen-status-pill__container--error {
  background-color: var(--accents-error--main);
  fill: var(--accents-error--detail);
  color: var(--accents-error--detail);
}
.zen-status-pill__container--error:hover {
  border-color: var(--accents-error--detail);
}
.zen-status-pill__container--upsell {
  background-color: var(--action-secondary--default);
  fill: var(--text-reverse-primary);
  color: var(--text-reverse-primary);
}
.zen-status-pill__container--upsell:hover {
  border-color: var(--action-secondary--hover);
}
.zen-status-pill__container:focus-visible {
  outline: none;
  border-color: var(--borders-form-field--active);
}
.zen-status-pill__text {
  margin-right: 4px;
  color: var(--text-primary);
  flex-shrink: 1;
  min-width: 0;
}
.zen-status-pill__text--default {
  color: var(--action-secondary--default);
}
.zen-status-pill__text--info {
  color: var(--accents-general--detail);
}
.zen-status-pill__text--warning {
  color: var(--accents-warning--detail);
}
.zen-status-pill__text--success {
  color: var(--accents-success--detail);
}
.zen-status-pill__text--error {
  color: var(--accents-error--detail);
}
.zen-status-pill__text--upsell {
  color: var(--text-reverse-primary);
}
.zen-status-pill__text--centered {
  margin-right: 0;
}
.zen-status-pill__expand-button {
  padding: 0;
  margin-left: auto;
  flex-shrink: 0;
}
.zen-status-pill__expand-button--default {
  fill: var(--action-secondary--default);
  color: var(--action-secondary--default);
}
.zen-status-pill__expand-button--info {
  fill: var(--accents-general--detail);
  color: var(--accents-general--detail);
}
.zen-status-pill__expand-button--warning {
  fill: var(--accents-warning--detail);
  color: var(--accents-warning--detail);
}
.zen-status-pill__expand-button--success {
  fill: var(--accents-success--detail);
  color: var(--accents-success--detail);
}
.zen-status-pill__expand-button--error {
  fill: var(--accents-error--detail);
  color: var(--accents-error--detail);
}
.zen-status-pill__expand-button--upsell {
  fill: var(--text-reverse-primary);
  color: var(--text-reverse-primary);
}
.zen-status-pill__icon {
  display: flex;
  align-items: center;
  height: 12px;
  margin-right: 4px;
  flex-shrink: 0;
}
.zen-status-pill__icon--large {
  height: 16px;
}
.zen-status-pill__icon--default {
  fill: var(--action-secondary--default);
  color: var(--action-secondary--default);
}
.zen-status-pill__icon--info {
  fill: var(--accents-general--detail);
  color: var(--accents-general--detail);
}
.zen-status-pill__icon--warning {
  fill: var(--accents-warning--detail);
  color: var(--accents-warning--detail);
}
.zen-status-pill__icon--success {
  fill: var(--accents-success--detail);
  color: var(--accents-success--detail);
}
.zen-status-pill__icon--error {
  fill: var(--accents-error--detail);
  color: var(--accents-error--detail);
}
.zen-status-pill__icon--upsell {
  fill: var(--text-reverse-primary);
  color: var(--text-reverse-primary);
}
.zen-status-pill__icon--standalone {
  margin-right: 0;
}
.zen-absolute:has(.zen-status-pill-popup) {
  overflow: visible;
}
.zen-status-pill-popup {
  box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  background-color: white;
  max-height: 560px;
  overflow: hidden;
  outline: none;
}
.zen-status-pill-popup__container {
  display: flex;
  flex-direction: column;
  padding: 12px 8px;
  gap: 16px;
  overflow-y: auto;
  max-height: 480px;
}
.zen-status-pill-popup__container--small {
  width: 220px;
}
.zen-status-pill-popup__container--medium {
  width: 320px;
}
.zen-status-pill-popup__container--large {
  width: 420px;
}
.zen-status-pill-popup__title-item {
  display: flex;
  align-items: center;
  padding: 12px 8px;
  gap: 16px;
  border-bottom: 1px solid var(--borders-general);
}
.zen-status-pill-popup__title-item-text {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: var(--text-secondary);
  font-feature-settings: "liga" off, "clig" off;
  font-family: Roboto, sans-serif;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 16px;
  letter-spacing: 0.16px;
}
html:lang(ar) .zen-status-pill-popup__title-item-text {
  font-family: "Noto Sans Arabic", Roboto, "Segoe UI", Segoe, "Helvetica Neue", Helvetica, sans-serif;
}
.zen-status-pill-popup__footer {
  display: flex;
  flex-direction: column;
}
.zen-status-pill-popup__children {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.zen-status-pill-popup__content-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.zen-status-pill-popup__header-text {
  font-family: var(--main-font);
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  letter-spacing: 0.32px;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
  color: var(--text-primary);
}
html:lang(ar) .zen-status-pill-popup__header-text {
  font-family: var(--arabic-font-family);
}
.zen-status-pill-popup__header-text--drive {
  font-family: var(--main-font);
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  letter-spacing: 0.32px;
  line-height: 18px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .zen-status-pill-popup__header-text--drive {
  font-family: var(--arabic-font-family);
}
.zen-status-pill-popup__header-text--drive-tablet {
  font-family: var(--main-font);
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  letter-spacing: 0.32px;
  line-height: 22px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .zen-status-pill-popup__header-text--drive-tablet {
  font-family: var(--arabic-font-family);
}
.zen-status-pill-popup__header-text--left {
  margin-left: auto;
}
.zen-status-pill-popup__description {
  font-family: var(--main-font);
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.32px;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
  color: var(--text-secondary);
  overflow-y: auto;
}
html:lang(ar) .zen-status-pill-popup__description {
  font-family: var(--arabic-font-family);
}
.zen-status-pill-popup__description--drive {
  font-family: var(--main-font);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.32px;
  line-height: 20px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .zen-status-pill-popup__description--drive {
  font-family: var(--arabic-font-family);
}
.zen-status-pill-popup__description--drive-tablet {
  font-family: var(--main-font);
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.32px;
  line-height: 22px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .zen-status-pill-popup__description--drive-tablet {
  font-family: var(--arabic-font-family);
}
.zen-status-pill-popup__actions {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.zen-status-pill-popup__divider.zen-divider {
  background-color: var(--borders-general);
}
.zen-status-pill-popup--mobile .zen-mobile-sheet__title {
  border-bottom: 1px solid var(--borders-general);
}
.zen-status-pill-popup--mobile .zen-mobile-sheet__content {
  padding: 16px;
  max-height: 90vh;
  overflow-y: auto;
}
.zen-status-pill-popup__mobile-title {
  font-family: var(--main-font);
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  letter-spacing: 0;
  line-height: 24px;
  text-transform: none;
  text-decoration: none;
  color: var(--text-primary);
}
html:lang(ar) .zen-status-pill-popup__mobile-title {
  font-family: var(--arabic-font-family);
}
.zen-status-pill-popup__mobile-content {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.zen-status-pill-popup__view-more-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin: 16px 8px 8px;
}
.zen-status-pill-popup__view-more-badge {
  font-family: var(--main-font);
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.32px;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 22px;
  height: 22px;
  padding: 0 6px;
  border-radius: 999px;
  background-color: var(--action-primary--default);
  color: var(--text-reverse-primary);
  line-height: 1;
  text-align: center;
  box-sizing: border-box;
}
html:lang(ar) .zen-status-pill-popup__view-more-badge {
  font-family: var(--arabic-font-family);
}
.zen-beta-pill--mobile {
  min-width: unset;
}
.zen-page-bookmark.zen-page-bookmark {
  box-sizing: border-box;
  cursor: pointer;
  background: 0 0;
  padding: 0.5rem;
  vertical-align: middle;
  border-width: 0;
  margin: 0.0625rem;
  border: none;
  background-color: transparent;
  fill: var(--text-secondary);
}
.zen-page-bookmark.zen-page-bookmark * {
  box-sizing: border-box;
}
.zen-page-bookmark.zen-page-bookmark:hover,
.zen-page-bookmark.zen-page-bookmark:focus,
.zen-page-bookmark.zen-page-bookmark:active {
  background-color: transparent;
  border: none;
  fill: var(--text-primary);
}
.zen-page-bookmark.zen-page-bookmark:focus-within {
  outline: 1px solid var(--action-primary--default);
}
.zen-page-bookmark__icon--active {
  fill: var(--text-secondary);
}
.zen-select {
  box-sizing: border-box;
  font-family: var(--main-font);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
}
.zen-select * {
  box-sizing: border-box;
}
html:lang(ar) .zen-select {
  font-family: var(--arabic-font-family);
}
.zen-select__trigger:hover {
  cursor: pointer;
}
.zen-select__trigger[aria-expanded="false"] + .zen-select__popup {
  display: none;
}
.zen-select__trigger[aria-expanded="true"] > .zen-select__arrow {
  transform: rotateZ(180deg);
}
.zen-select__popup {
  box-shadow: 0px 0px 8px 2px rgba(0, 0, 0, 0.2);
  border-radius: var(--border-radius-default);
  background-color: var(--backgrounds-main);
}
.zen-select__popup.zen-select__popup {
  z-index: 11002;
}
.zen-select__text {
  max-width: 100%;
  flex: 1 1 100%;
}
.zen-select__text--placeholder {
  color: var(--text-placeholder);
}
.zen-select__arrow {
  fill: var(--action-secondary--default);
}
.zen-select--disabled .zen-select__trigger {
  cursor: not-allowed;
  color: var(--text-placeholder);
  background-color: var(--backgrounds-field-disabled);
  pointer-events: none;
  border-color: var(--borders-general);
}
.zen-select--disabled .zen-select__arrow {
  fill: var(--text-button-disabled);
}
.zen-calendar {
  width: 100%;
  box-sizing: border-box;
  font-family: var(--main-font);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
  background-color: var(--backgrounds-main);
}
.zen-calendar * {
  box-sizing: border-box;
}
html:lang(ar) .zen-calendar {
  font-family: var(--arabic-font-family);
}
.zen-calendar__header {
  max-width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.zen-calendar .zen-calendar__btn {
  flex-shrink: 0;
}
.zen-calendar__year {
  flex: 0 1 auto;
  display: flex;
  align-items: center;
}
.zen-calendar__year--limited {
  max-width: calc(100% - 126px);
}
.zen-calendar__year-name {
  flex: 0 1 auto;
  font-family: var(--main-font);
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  letter-spacing: 0;
  line-height: 24px;
  text-transform: none;
  text-decoration: none;
  color: var(--text-primary);
  margin-left: 32px;
}
html:lang(ar) .zen-calendar__year-name {
  font-family: var(--arabic-font-family);
}
.zen-calendar__year-name--left {
  margin-left: 12px;
}
.zen-calendar__year-trigger {
  margin-left: 4px;
}
.zen-calendar__months {
  display: flex;
  gap: 12px;
}
.zen-calendar__table {
  width: 100%;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  border-collapse: separate;
  border-spacing: 0;
}
.zen-calendar__columns {
  margin: 0;
}
.zen-calendar__column {
  font-family: var(--main-font);
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  letter-spacing: 0.32px;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
  color: var(--text-primary);
  width: 14%;
  height: 16px;
  padding: 12px 0;
  text-align: center;
}
html:lang(ar) .zen-calendar__column {
  font-family: var(--arabic-font-family);
}
.zen-calendar__cell {
  padding: 0px;
  margin: 0px;
  border: 0px;
}
.zen-calendar__day-wrapper {
  color: var(--text-primary);
  margin: 0px;
  box-sizing: border-box;
  height: 24px;
  width: 100%;
  position: relative;
  cursor: pointer;
  background-color: transparent;
  border: none;
  outline: none;
  margin-bottom: 12px;
  display: flex;
  justify-content: center;
}
.zen-calendar__left-border,
.zen-calendar__right-border {
  height: 24px;
  width: 50%;
  border: 1px solid transparent;
  border-left: 0px;
  border-right: 0px;
  border-radius: 0px;
  position: absolute;
  padding: 0px;
  margin: 0px;
  top: 0px;
  z-index: 1;
  border-color: var(--action-primary--default);
  background-color: var(--accents-general--main);
}
.zen-calendar__week-start,
.zen-calendar__week-end {
  height: 24px;
  border: 1px solid var(--action-primary--default);
  background-color: var(--accents-general--main);
  position: absolute;
  top: 0;
  z-index: 1;
  width: 32px;
  border-radius: 24px;
}
.zen-calendar__week-start {
  clip-path: xywh(0 0 50% 100%);
}
.zen-calendar__week-end {
  clip-path: xywh(50% 0 50% 100%);
}
.zen-calendar__month-start,
.zen-calendar__month-end {
  position: absolute;
  height: 24px;
  top: 0;
  width: 16px;
  z-index: 1;
  border: 1px solid var(--action-primary--default);
  border-left: none;
  border-right: none;
  background-color: var(--accents-general--main);
}
.zen-calendar__month-start {
  mask-image: linear-gradient(to left, #000000, transparent);
  left: calc(50% - 16px);
}
.zen-calendar__month-end {
  mask-image: linear-gradient(to right, #000000, transparent);
  left: 50%;
}
.zen-calendar__left-border {
  left: 0px;
}
.zen-calendar__right-border {
  right: 0px;
}
.zen-calendar__day {
  font-family: var(--main-font);
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.32px;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--text-primary);
  width: 32px;
  height: 24px;
  text-align: center;
  position: absolute;
  top: 0;
  z-index: 2;
  border: 1px solid transparent;
}
html:lang(ar) .zen-calendar__day {
  font-family: var(--arabic-font-family);
}
.zen-calendar__day--other-month {
  color: var(--text-secondary);
}
.zen-calendar__day--disabled {
  color: var(--text-button-disabled);
}
.zen-calendar__day--in-range {
  background-color: var(--accents-general--main);
  border-color: var(--action-primary--default);
  border-left: 0px;
  border-right: 0px;
}
.zen-calendar__day-wrapper--hover .zen-calendar__day,
.zen-calendar__day-wrapper:hover .zen-calendar__day,
.zen-calendar__day-wrapper:focus .zen-calendar__day {
  color: var(--text-hyperlink);
  background-color: var(--accents-general--main);
  border: 1px solid var(--action-primary--default);
  border-radius: 24px;
  outline: none;
}
.zen-calendar__day-wrapper:disabled .zen-calendar__day {
  color: var(--text-button-disabled);
  background-color: transparent;
  border: 1px solid transparent;
  outline: none;
  cursor: default;
}
.zen-calendar__day-wrapper--active.zen-calendar__day-wrapper--active .zen-calendar__day {
  color: var(--text-reverse-primary);
  background-color: var(--action-primary--default);
  border: 1px solid var(--action-primary--default);
  border-radius: 24px;
}
.zen-calendar__day-wrapper--ready-to-change.zen-calendar__day-wrapper--ready-to-change .zen-calendar__day {
  color: var(--text-reverse-primary);
  border: 1px solid var(--action-primary--active);
  border-radius: 24px;
  background-color: var(--action-primary--active);
}
.zen-calendar__day-wrapper--active:hover .zen-calendar__day,
.zen-calendar__day-wrapper--active:focus .zen-calendar__day {
  color: var(--text-reverse-primary);
  background-color: var(--action-primary--hover);
  border: 1px solid var(--action-primary--hover);
}
.zen-calendar .zen-calendar__body--mobile-view .zen-calendar__day-wrapper {
  height: 32px;
}
.zen-calendar .zen-calendar__body--mobile-view .zen-calendar__left-border,
.zen-calendar .zen-calendar__body--mobile-view .zen-calendar__right-border {
  height: 32px;
}
.zen-calendar .zen-calendar__body--mobile-view .zen-calendar__week-start,
.zen-calendar .zen-calendar__body--mobile-view .zen-calendar__week-end {
  height: 32px;
  border-radius: 32px;
}
.zen-calendar .zen-calendar__body--mobile-view .zen-calendar__month-start,
.zen-calendar .zen-calendar__body--mobile-view .zen-calendar__month-end {
  height: 32px;
}
.zen-calendar .zen-calendar__body--mobile-view .zen-calendar__day {
  height: 32px;
}
.zen-calendar .zen-calendar__body--mobile-view .zen-calendar__day-wrapper--hover .zen-calendar__day,
.zen-calendar .zen-calendar__body--mobile-view .zen-calendar__day-wrapper:hover .zen-calendar__day,
.zen-calendar .zen-calendar__body--mobile-view .zen-calendar__day-wrapper:focus .zen-calendar__day {
  border-radius: 32px;
}
.zen-calendar .zen-calendar__body--mobile-view .zen-calendar__day-wrapper--active .zen-calendar__day {
  border-radius: 32px;
}
.zen-calendar.zen-calendar--drive .zen-calendar__day-wrapper,
.zen-calendar.zen-calendar--drive-tablet .zen-calendar__day-wrapper {
  height: 40px;
}
.zen-calendar.zen-calendar--drive .zen-calendar__left-border,
.zen-calendar.zen-calendar--drive-tablet .zen-calendar__left-border,
.zen-calendar.zen-calendar--drive .zen-calendar__right-border,
.zen-calendar.zen-calendar--drive-tablet .zen-calendar__right-border {
  height: 40px;
}
.zen-calendar.zen-calendar--drive .zen-calendar__week-start,
.zen-calendar.zen-calendar--drive-tablet .zen-calendar__week-start,
.zen-calendar.zen-calendar--drive .zen-calendar__week-end,
.zen-calendar.zen-calendar--drive-tablet .zen-calendar__week-end {
  height: 40px;
  border-radius: 40px;
  width: 40px;
}
.zen-calendar.zen-calendar--drive .zen-calendar__month-start,
.zen-calendar.zen-calendar--drive-tablet .zen-calendar__month-start,
.zen-calendar.zen-calendar--drive .zen-calendar__month-end,
.zen-calendar.zen-calendar--drive-tablet .zen-calendar__month-end {
  height: 40px;
}
.zen-calendar.zen-calendar--drive .zen-calendar__day,
.zen-calendar.zen-calendar--drive-tablet .zen-calendar__day {
  height: 40px;
  width: 40px;
}
.zen-calendar.zen-calendar--drive .zen-calendar__day-wrapper--hover .zen-calendar__day,
.zen-calendar.zen-calendar--drive-tablet .zen-calendar__day-wrapper--hover .zen-calendar__day,
.zen-calendar.zen-calendar--drive .zen-calendar__day-wrapper:hover .zen-calendar__day,
.zen-calendar.zen-calendar--drive-tablet .zen-calendar__day-wrapper:hover .zen-calendar__day,
.zen-calendar.zen-calendar--drive .zen-calendar__day-wrapper:focus .zen-calendar__day,
.zen-calendar.zen-calendar--drive-tablet .zen-calendar__day-wrapper:focus .zen-calendar__day {
  border-radius: 40px;
}
.zen-calendar.zen-calendar--drive .zen-calendar__day-wrapper--active.zen-calendar__day-wrapper--active .zen-calendar__day,
.zen-calendar.zen-calendar--drive-tablet .zen-calendar__day-wrapper--active.zen-calendar__day-wrapper--active .zen-calendar__day {
  border-radius: 40px;
}
.zen-calendar.zen-calendar--drive .zen-calendar__year-name,
.zen-calendar.zen-calendar--drive-tablet .zen-calendar__year-name {
  margin-left: 12px;
}
.zen-calendar.zen-calendar--drive .zen-calendar__year,
.zen-calendar.zen-calendar--drive .zen-calendar__year--limited {
  max-width: calc(100% - 163px);
}
.zen-calendar.zen-calendar--drive .zen-calendar__year-name {
  font-family: var(--main-font);
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  letter-spacing: 0;
  line-height: 26px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .zen-calendar.zen-calendar--drive .zen-calendar__year-name {
  font-family: var(--arabic-font-family);
}
.zen-calendar.zen-calendar--drive .zen-calendar__column {
  font-family: var(--main-font);
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  letter-spacing: 0.32px;
  line-height: 18px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .zen-calendar.zen-calendar--drive .zen-calendar__column {
  font-family: var(--arabic-font-family);
}
.zen-calendar.zen-calendar--drive .zen-calendar__day {
  font-family: var(--main-font);
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 28px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .zen-calendar.zen-calendar--drive .zen-calendar__day {
  font-family: var(--arabic-font-family);
}
.zen-calendar.zen-calendar--drive-tablet .zen-calendar__year,
.zen-calendar.zen-calendar--drive-tablet .zen-calendar__year--limited {
  max-width: calc(100% - 173px);
}
.zen-calendar.zen-calendar--drive-tablet .zen-calendar__year-name {
  font-family: var(--main-font);
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  letter-spacing: 0;
  line-height: 28px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .zen-calendar.zen-calendar--drive-tablet .zen-calendar__year-name {
  font-family: var(--arabic-font-family);
}
.zen-calendar.zen-calendar--drive-tablet .zen-calendar__column {
  font-family: var(--main-font);
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  letter-spacing: 0.32px;
  line-height: 22px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .zen-calendar.zen-calendar--drive-tablet .zen-calendar__column {
  font-family: var(--arabic-font-family);
}
.zen-calendar.zen-calendar--drive-tablet .zen-calendar__day {
  font-family: var(--main-font);
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 30px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .zen-calendar.zen-calendar--drive-tablet .zen-calendar__day {
  font-family: var(--arabic-font-family);
}
@media (max-width: 520px) {
  .zen-calendar .zen-calendar__year {
    max-width: calc(100% - 126px);
  }
  .zen-calendar.zen-calendar--drive .zen-calendar__year {
    max-width: calc(100% - 163px);
  }
}
.zen-parallel-selection {
  box-sizing: border-box;
}
.zen-parallel-selection * {
  box-sizing: border-box;
}
.zen-parallel-selection__select {
  max-height: 200px;
}
.zen-parallel-selection-popup.zen-parallel-selection-popup {
  z-index: 11002;
}
.zen-parallel-selection-popup.zen-parallel-selection-popup--mobile {
  z-index: 11010;
  width: 100%;
}
@media (max-width: 640px) {
  .zen-parallel-selection-popup {
    width: 100%;
  }
}
.zen-cards {
  display: flex;
  width: 100%;
}
.zen-cards--full-height {
  height: 100%;
}
.zen-chart {
  container-type: inline-size;
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 16px;
}
.zen-chart__chart {
  flex: 1 1 100%;
  overflow: hidden;
}
.zen-chart__legend {
  flex: 0 0 auto;
  padding-left: 8px;
}
.zen-chart__x-axis {
  flex: 0 0 auto;
  text-align: center;
  font-family: var(--main-font);
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  letter-spacing: 0.32px;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
  color: var(--text-primary);
}
html:lang(ar) .zen-chart__x-axis {
  font-family: var(--arabic-font-family);
}
.zen-chart {
  --pie-center-value-font-size: 28px;
  --pie-center-value-font-weight: 700;
  --pie-center-label-font-size: 14px;
  --pie-center-label-font-weight: 400;
}
.zen-chart--legend-right {
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
}
.zen-chart--legend-right .zen-chart__chart {
  flex: 0 0 auto;
  width: 40%;
  height: 100%;
}
.zen-chart--legend-right .zen-chart__legend {
  flex: 1 1 auto;
  padding-left: 16px;
  overflow-y: auto;
  overflow-x: hidden;
}
@container (max-width: 640px) {
  .zen-chart--legend-right .zen-chart__chart {
    flex: 0 0 100%;
    width: 100%;
    height: auto;
  }
  .zen-chart--legend-right .zen-chart__legend {
    flex: 0 0 100%;
    padding-left: 0;
    overflow-y: visible;
  }
}
.zen-pie-legend {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin: 0;
  padding: 0;
  list-style: none;
}
.zen-pie-legend__item {
  display: flex;
  gap: 8px;
  align-items: flex-start;
  cursor: pointer;
}
.zen-pie-legend__item-color {
  --color-box-size: 8px;
  display: inline-block;
  height: var(--color-box-size);
  width: var(--color-box-size);
  border-radius: var(--color-box-size);
  flex-shrink: 0;
  margin-top: 4px;
}
.zen-pie-legend__item-content {
  flex: 1;
  min-width: 0;
}
.zen-pie-legend__item-row {
  display: flex;
  align-items: center;
  gap: 8px;
}
.zen-pie-legend__item-label {
  font-family: var(--main-font);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
  color: var(--text-secondary);
  flex: 1;
  margin: 0;
  padding: 0;
}
html:lang(ar) .zen-pie-legend__item-label {
  font-family: var(--arabic-font-family);
}
.zen-pie-legend__item-label--hidden {
  text-decoration: line-through;
}
.zen-pie-legend__item-value {
  font-family: var(--main-font);
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 24px;
  text-transform: none;
  text-decoration: none;
  color: var(--text-primary);
  font-weight: 500;
  margin: 0;
  padding: 0;
  white-space: nowrap;
}
html:lang(ar) .zen-pie-legend__item-value {
  font-family: var(--arabic-font-family);
}
.zen-pie-legend__item-value--hidden {
  text-decoration: line-through;
}
.zen-pie-legend__item-percentage {
  font-family: var(--main-font);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
  color: var(--text-secondary);
  margin: 0;
  padding: 0;
  white-space: nowrap;
  min-width: 40px;
  text-align: right;
}
html:lang(ar) .zen-pie-legend__item-percentage {
  font-family: var(--arabic-font-family);
}
.zen-pie-legend__item-bar-track {
  height: 6px;
  background-color: var(--backgrounds-content-2);
  border-radius: 3px;
  margin-top: 4px;
  overflow: hidden;
}
.zen-pie-legend__item-bar {
  height: 100%;
  border-radius: 3px;
}
.zen-pie-legend--drive .zen-pie-legend__item-label,
.zen-pie-legend--drive .zen-pie-legend__item-value,
.zen-pie-legend--drive .zen-pie-legend__item-percentage {
  font-size: 1rem;
  line-height: 1.125rem;
}
@media (max-width: 640px) {
  .zen-pie-legend--drive .zen-pie-legend__item-label,
  .zen-pie-legend--drive .zen-pie-legend__item-value,
  .zen-pie-legend--drive .zen-pie-legend__item-percentage {
    font-size: 0.875rem;
  }
}
.zen-summary {
  font-family: var(--main-font);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 16px;
  text-decoration: none;
  box-sizing: border-box;
  background-color: var(--backgrounds-content-1);
  background: var(--backgrounds-main);
  border-radius: 8px;
  color: var(--text-primary);
  display: flex;
  flex-direction: column;
  text-transform: none;
  width: fit-content;
  max-width: 240px;
}
html:lang(ar) .zen-summary {
  font-family: var(--arabic-font-family);
}
.zen-summary * {
  box-sizing: border-box;
}
.zen-summary__header,
.zen-summary__data,
.zen-summary__content {
  width: 100%;
  min-width: 0;
}
.zen-summary__header {
  font-family: var(--main-font);
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.32px;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
  align-items: center;
  color: var(--text-secondary);
  display: inline-flex;
  gap: 4px;
  margin-bottom: 8px;
}
html:lang(ar) .zen-summary__header {
  font-family: var(--arabic-font-family);
}
.zen-summary__crossed-out {
  text-decoration: line-through;
}
.zen-summary__color {
  border: none;
  border-radius: 50%;
  display: inline-block;
  height: 8px;
  margin: 2px 2px;
  min-height: 8px;
  min-width: 8px;
  padding-inline: 0;
  text-align: center;
  text-decoration: none;
  width: 8px;
}
button.zen-summary__clickable {
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  outline: inherit;
}
.zen-summary__clickable {
  cursor: pointer;
}
.zen-summary__trigger {
  align-items: center;
  cursor: pointer;
  display: flex;
  fill: var(--text-secondary);
  justify-content: center;
  background: none;
  border: none;
  padding: 0;
  line-height: 0;
  position: relative;
}
.zen-summary__trigger::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 24px;
  height: 24px;
}
.zen-summary__trigger:focus-visible {
  outline: 2px solid var(--borders-form-field--active);
  outline-offset: 2px;
  border-radius: 2px;
}
.zen-summary__data {
  align-items: center;
  display: flex;
  flex-direction: row;
  gap: 4px;
  justify-content: left;
}
.zen-summary__value,
.zen-summary__unit {
  font-family: var(--main-font);
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.32px;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
  font-feature-settings: "liga" off, "clig" off;
}
html:lang(ar) .zen-summary__value,
html:lang(ar) .zen-summary__unit {
  font-family: var(--arabic-font-family);
}
.zen-summary__value {
  font-family: var(--main-font-data);
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 32px;
  text-transform: none;
  text-decoration: none;
  color: var(--text-primary);
}
html:lang(ar) .zen-summary__value {
  font-family: var(--arabic-font-family);
}
.zen-summary__unit,
.zen-summary__content {
  font-family: var(--main-font);
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.32px;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
  color: var(--text-secondary);
}
html:lang(ar) .zen-summary__unit,
html:lang(ar) .zen-summary__content {
  font-family: var(--arabic-font-family);
}
.zen-summary__content {
  margin-top: 8px;
  display: -webkit-box;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
}
.zen-summary__more {
  flex: 1;
}
.zen-chart-tooltip {
  box-sizing: border-box;
  padding: 12px 16px;
  max-height: 800px;
  min-height: 30px;
  min-width: 200px;
  max-width: 250px;
  display: flex;
  background-color: var(--backgrounds-content-0);
  flex-flow: column nowrap;
  gap: 4px;
  border-radius: 8px;
  pointer-events: none;
  position: absolute;
  z-index: 11100;
  border: 1px solid var(--borders-general);
  box-shadow: 0px 1px 3px 0px rgba(0, 17, 30, 0.15);
}
.zen-chart-tooltip__header {
  font-family: var(--main-font);
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  letter-spacing: 0;
  line-height: 24px;
  text-transform: none;
  text-decoration: none;
  color: var(--text-primary);
  margin-bottom: 4px;
}
html:lang(ar) .zen-chart-tooltip__header {
  font-family: var(--arabic-font-family);
}
.zen-chart-tooltip__subheader {
  font-family: var(--main-font);
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  letter-spacing: 0;
  line-height: 24px;
  text-transform: uppercase;
  text-decoration: none;
  color: var(--text-primary);
  margin-bottom: 4px;
}
html:lang(ar) .zen-chart-tooltip__subheader {
  font-family: var(--arabic-font-family);
}
.zen-chart-tooltip__afterbody {
  color: var(--text-primary);
}
.zen-chart-tooltip__label {
  font-family: var(--main-font);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
  color: var(--text-secondary);
  padding-left: 4px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-wrap: normal;
}
html:lang(ar) .zen-chart-tooltip__label {
  font-family: var(--arabic-font-family);
}
.zen-chart-tooltip__value {
  font-family: var(--main-font);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
  color: var(--text-primary);
  font-weight: 500;
}
html:lang(ar) .zen-chart-tooltip__value {
  font-family: var(--arabic-font-family);
}
.zen-chart-tooltip__items {
  display: flex;
  flex-flow: column nowrap;
  gap: 4px;
}
.zen-chart-tooltip__note {
  font-family: var(--main-font);
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.32px;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
  color: var(--text-secondary);
  display: flex;
  flex-flow: column nowrap;
  gap: 4px;
  margin-top: 4px;
}
html:lang(ar) .zen-chart-tooltip__note {
  font-family: var(--arabic-font-family);
}
.zen-chart-tooltip__item {
  display: flex;
  gap: 4px;
  align-items: center;
}
.zen-chart-tooltip__color {
  width: 10px;
  height: 2px;
  border-radius: 2px;
  flex: 0 0 auto;
}
.zen-chart-tooltip__arrow {
  background-color: var(--backgrounds-content-0);
  position: absolute;
  text-align: center;
  height: 30px;
  width: 30px;
  transform-origin: center;
  border: 1px solid var(--borders-general);
  border-radius: 2px;
  clip-path: polygon(0 18px, 0 0, 18px 0);
  filter: drop-shadow(0px 1px 3px rgba(0, 17, 30, 0.15));
}
.zen-chart-tooltip__arrow--top {
  left: calc(50% - 15px);
  top: -6px;
  transform: rotate(45deg);
}
.zen-chart-tooltip__arrow--bottom {
  left: calc(50% - 15px);
  bottom: -6px;
  transform: rotate(225deg);
}
.zen-chart-tooltip__arrow--right {
  right: -6px;
  top: calc(50% - 15px);
  transform: rotate(135deg);
}
.zen-chart-tooltip__arrow--left {
  left: -6px;
  top: calc(50% - 15px);
  transform: rotate(315deg);
}
.zen-chart-insight {
  display: flex;
  gap: 4px;
  max-width: 560px;
  margin-bottom: 8px;
}
.zen-chart-insight__icon {
  fill: var(--text-primary);
  flex: 0 0 auto;
}
.zen-chart-insight__text {
  font-family: var(--main-font);
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.32px;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
  color: var(--text-primary);
}
html:lang(ar) .zen-chart-insight__text {
  font-family: var(--arabic-font-family);
}
.zen-legend {
  display: flex;
  column-gap: 16px;
  row-gap: 8px;
  margin: 0;
  padding: 0;
  flex-wrap: wrap;
}
.zen-legend--hidden {
  display: none;
}
.zen-legend__item {
  display: flex;
  gap: 4px;
  align-items: center;
  cursor: pointer;
}
.zen-legend__item-color {
  --color-box-size: 8px;
  display: inline-block;
  height: var(--color-box-size);
  width: var(--color-box-size);
  border-radius: var(--color-box-size);
}
.zen-legend__item-label {
  font-family: var(--main-font);
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.32px;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
  color: var(--text-secondary);
  padding: 0;
  margin: 0;
  max-width: 250px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-wrap: normal;
}
html:lang(ar) .zen-legend__item-label {
  font-family: var(--arabic-font-family);
}
.zen-legend__item-label--hidden {
  text-decoration: line-through;
}
.zen-legend__item-value {
  font-family: var(--main-font);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
  color: var(--text-primary);
  font-weight: 500;
  padding: 0;
  margin: 0;
}
html:lang(ar) .zen-legend__item-value {
  font-family: var(--arabic-font-family);
}
.zen-legend__item-value--hidden {
  text-decoration: line-through;
}
.zen-legend.zen-legend--drive .zen-legend-list__item-text {
  font-size: 1rem;
  line-height: 1.125rem;
}
@media (max-width: 640px) {
  .zen-legend.zen-legend--drive .zen-legend-list__item-text {
    font-size: 0.875rem;
  }
}
.zen-chart-axis {
  display: flex;
  justify-content: space-between;
  column-gap: 16px;
  row-gap: 4px;
  flex-wrap: wrap;
  margin: 0 10px;
}
.zen-chart-axis__item {
  display: flex;
  gap: 4px;
  align-items: center;
  max-width: 100%;
}
.zen-chart-axis__item--wide {
  flex: 1 0 auto;
}
.zen-chart-axis__item--x {
  margin-left: auto;
}
.zen-chart-axis__item--x:nth-child(n + 3) {
  flex-basis: 100%;
  justify-content: flex-end;
  margin-left: 0;
}
.zen-chart-axis__label {
  font-family: var(--main-font);
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.32px;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
  color: var(--text-secondary);
  text-wrap: nowrap;
}
html:lang(ar) .zen-chart-axis__label {
  font-family: var(--arabic-font-family);
}
.zen-chart-axis__value {
  font-family: var(--main-font);
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  letter-spacing: 0.32px;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
  color: var(--text-primary);
  text-wrap: nowrap;
}
html:lang(ar) .zen-chart-axis__value {
  font-family: var(--arabic-font-family);
}
.zen-chart-axis--drive {
  flex-direction: column;
}
.zen-chart-axis--drive .zen-chart-axis__item--x {
  order: 1;
}
.zen-chart-axis--y-right {
  justify-content: flex-end;
}
.zen-chart-axis--y-right .zen-chart-axis__item--x {
  margin-left: 0;
}
.zen-chart-axis--y-right .zen-chart-axis__item--x:nth-child(n + 3) {
  flex-basis: 100%;
  justify-content: flex-end;
}
@media (max-width: 640px) {
  .zen-chart-axis__item--wide {
    flex: 0 0 auto;
  }
}
.screen-reader-only {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}
.zen-columns-filter {
  box-sizing: border-box;
}
.zen-columns-filter * {
  box-sizing: border-box;
}
.zen-columns-filter__item {
  font-family: var(--main-font);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
  width: 100%;
  padding: 12px 16px;
  border: 0px;
  border-radius: 0px;
}
html:lang(ar) .zen-columns-filter__item {
  font-family: var(--arabic-font-family);
}
.zen-columns-filter__item--button {
  text-align: start;
}
.zen-columns-filter__item--header {
  border-top: 1px solid var(--borders-general);
}
.zen-arrow-nav-button--invisible.zen-arrow-nav-button--invisible {
  display: none;
}
.zen-dataFeedHeader {
  box-sizing: border-box;
}
.zen-dataFeedHeader * {
  box-sizing: border-box;
}
.zen-sortable-column {
  box-sizing: border-box;
  flex: 1 1 auto;
  overflow: hidden;
  width: 100%;
  cursor: pointer;
  height: var(--grid-header-height);
}
.zen-sortable-column * {
  box-sizing: border-box;
}
.zen-sortable-column .zen-sortable-column-button {
  border: var(--border-width-default) solid transparent;
  border-radius: var(--border-radius-default);
  width: 100%;
  height: 100%;
  background: none;
  cursor: pointer;
}
.zen-sortable-column .zen-sortable-column-button__content {
  overflow: hidden;
  flex: 1 1 auto;
}
.zen-sortable-column .zen-sortable-column-button__dir-icon {
  flex: 0 0 0;
  fill: var(--action-secondary--default);
  padding: 0;
}
.zen-sortable-column .zen-sortable-column-button__dir-icon:focus,
.zen-sortable-column .zen-sortable-column-button__dir-icon:active {
  padding: inherit;
  flex-basis: auto;
}
.zen-sortable-column .zen-sortable-column-button__dir-icon:focus-visible {
  outline: none;
  border-color: var(--borders-form-field--active);
}
.zen-sortable-column .zen-sortable-column-button:hover .zen-sortable-column-button__dir-icon,
.zen-sortable-column .zen-sortable-column-button--active .zen-sortable-column-button__dir-icon {
  display: inherit;
  flex-basis: auto;
  padding: inherit;
}
.zen-sortable-column .zen-sortable-column-button--active .zen-sortable-column-button__content {
  font-weight: 700;
}
.zen-sortable-column--mobile {
  font-size: 0.75rem;
}
.zen-sortable-column--mobile .zen-sortable-column-button--active .zen-sortable-column-button__content {
  font-weight: normal;
}
.zen-sortable-column--mobile .zen-sortable-column__button {
  gap: 6px;
}
.zen-flexible-column {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  width: 100%;
  cursor: pointer;
  height: var(--grid-header-height);
}
.zen-flexible-column * {
  box-sizing: border-box;
}
.zen-flexible-column .zen-flexible-column__draggable-icon {
  display: none;
  transform: translateX(-88%);
  position: absolute;
}
.zen-flexible-column__draggable {
  width: 6px;
  height: 100%;
  left: -4px;
  position: absolute;
  cursor: col-resize;
}
.zen-flexible-column__draggable:hover {
  border-right: 2px solid var(--borders-form-field--active);
}
.zen-flexible-column__content {
  width: 100%;
  text-align: start;
  -webkit-user-select: none;
  user-select: none;
}
.zen-flexible-column:hover .zen-flexible-column__draggable-icon {
  display: block;
}
.zen-flexible-column--static {
  cursor: default;
}
.zen-flexible-column--static:hover .zen-flexible-column__draggable-icon {
  display: none;
}
.zen-columns-list {
  box-sizing: border-box;
  width: 100%;
  max-height: 550px;
  display: flex;
  overflow: hidden;
  flex-direction: column;
}
.zen-columns-list * {
  box-sizing: border-box;
}
.zen-columns-list__content {
  overflow: auto;
}
.zen-columns-list__footer {
  border-top: 1px solid var(--borders-general);
  padding: 2px 8px;
  display: flex;
  justify-content: flex-end;
}
.zen-columns-list__footer .zen-columns-list__reset:focus {
  outline: none;
  border: 1px solid var(--borders-form-field--active);
}
.zen-columns-list__sub-section {
  border-top: 1px solid var(--borders-general);
  padding: 8px 0;
}
.zen-columns-list__sub-section:first-child {
  border-top: none;
}
.zen-columns-list__title {
  padding: 0 10px;
  color: var(--text-secondary);
  font-family: var(--main-font);
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.32px;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .zen-columns-list__title {
  font-family: var(--arabic-font-family);
}
.zen-date-input {
  box-sizing: border-box;
}
.zen-date-input * {
  box-sizing: border-box;
}
.zen-date-input--active.zen-date-input--active {
  color: var(--text-nav-highlight);
}
.zen-date-input--error.zen-date-input--error {
  border: 1px solid var(--text-error-message);
}
.zen-date-input--error.zen-date-input--error:hover {
  border: 1px solid var(--text-error-message);
}
.zen-date-input-popup-wrapper.zen-date-input-popup-wrapper {
  z-index: 11002;
}
.zen-date-input-popup {
  width: 280px;
  min-width: 280px;
  overflow-x: hidden;
}
.zen-date-input-popup__button-clear {
  margin: 8px auto 4px 4px;
}
.zen-date-input-popup__button-apply {
  margin: 8px 0px 4px 0px;
}
.zen-date-input-popup__header {
  font-family: var(--main-font);
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  letter-spacing: 0.32px;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
  color: var(--text-secondary);
  padding: 12px 16px;
  border-bottom: 1px solid var(--backgrounds-content-1);
}
html:lang(ar) .zen-date-input-popup__header {
  font-family: var(--arabic-font-family);
}
.zen-date-input-popup__footer {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  padding: 0 8px;
  border-top: 1px solid var(--backgrounds-content-1);
}
.zen-date-input-popup.zen-date-input-popup--drive-tablet {
  width: 320px;
  min-width: 320px;
}
.zen-date-input-popup.zen-date-input-popup--drive .zen-date-input-popup__header {
  font-family: var(--main-font);
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  letter-spacing: 0.32px;
  line-height: 18px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .zen-date-input-popup.zen-date-input-popup--drive .zen-date-input-popup__header {
  font-family: var(--arabic-font-family);
}
.zen-date-input-popup.zen-date-input-popup--drive-tablet .zen-date-input-popup__header {
  font-family: var(--main-font);
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  letter-spacing: 0.32px;
  line-height: 22px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .zen-date-input-popup.zen-date-input-popup--drive-tablet .zen-date-input-popup__header {
  font-family: var(--arabic-font-family);
}
.zen-date-input-mobile-sheet .zen-mobile-sheet__title {
  border-bottom: none;
}
.zen-date-input-inner__calendar {
  padding: 0px 8px;
}
.zen-date-input-inner__calendar-wrapper {
  min-width: 280px;
}
.zen-date-input-inner__label {
  font-family: var(--main-font);
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.32px;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
  color: var(--text-primary);
}
html:lang(ar) .zen-date-input-inner__label {
  font-family: var(--arabic-font-family);
}
.zen-date-input-inner__controls-block {
  padding: 16px 16px;
}
.zen-date-input-inner__control-block {
  font-family: var(--main-font);
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  letter-spacing: 0.16px;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .zen-date-input-inner__control-block {
  font-family: var(--arabic-font-family);
}
.zen-date-input-inner__separator {
  width: 100%;
  height: 16px;
}
.zen-date-input-inner__inputs-block {
  display: flex;
  margin-top: 8px;
  flex-direction: row;
}
.zen-date-input-inner__inputs-block-item {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  flex-grow: 1;
  margin-right: 8px;
  width: 0px;
  flex-basis: 50%;
}
.zen-date-input-inner__inputs-block-item:last-child {
  margin-right: 0px;
}
.zen-date-input-inner__text-input {
  width: 100%;
}
.zen-date-input-inner__text-input--error .zen-filter-button {
  border: 1px solid var(--text-error-message);
}
.zen-date-input-inner__text-input--error .zen-filter-button:focus,
.zen-date-input-inner__text-input--error .zen-filter-button:hover,
.zen-date-input-inner__text-input--error .zen-filter-button:active {
  border: 1px solid var(--text-error-message);
}
.zen-date-input-inner__assistive-text {
  padding-top: 4px;
  padding-left: 8px;
}
.zen-date-input-inner.zen-date-input-inner--drive .zen-date-input-inner__label {
  font-family: var(--main-font);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.32px;
  line-height: 18px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .zen-date-input-inner.zen-date-input-inner--drive .zen-date-input-inner__label {
  font-family: var(--arabic-font-family);
}
.zen-date-input-inner.zen-date-input-inner--drive-tablet .zen-date-input-inner__label {
  font-family: var(--main-font);
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.32px;
  line-height: 18px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .zen-date-input-inner.zen-date-input-inner--drive-tablet .zen-date-input-inner__label {
  font-family: var(--arabic-font-family);
}
.zen-date-input-inner--mobile-view .zen-date-input-inner__controls-block {
  padding: 16px 12px;
}
.zen-date-input-inner__inputs-block-item input.zen-date-input-inner__text-input--active:not(:active) {
  border: var(--border-width-default) solid var(--borders-form-field--active);
  border-radius: 4px;
}
.zen-date-input-inner__inputs-block-item .zen-time-picker.zen-date-input-inner__text-input--active button {
  border: var(--border-width-default) solid var(--borders-form-field--active);
  border-radius: 4px;
}
.zen-time-select {
  width: 76px;
  height: 160px;
}
@media (max-width: 640px) {
  .zen-time-select {
    width: 100%;
  }
}
.zen-time-picker-select__wrapper {
  display: flex;
  justify-content: space-between;
  padding-bottom: 6px;
}
.zen-time-picker-select__divider.zen-divider {
  width: 1px;
  height: auto;
  background: linear-gradient(0deg, rgba(199, 203, 210, 0) 0, var(--borders-general) 24.48%, var(--borders-general) 51.04%, var(--borders-general) 75.52%, rgba(199, 203, 210, 0) 100%);
}
.zen-time-picker-select__footer {
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  border-top: 1px solid var(--borders-general);
  padding: 0 12px;
  height: 48px;
}
.zen-popup.zen-time-picker__popup {
  min-width: 152px;
  z-index: 11002;
}
.zen-popup.zen-time-picker__popup--mobile {
  z-index: 11010;
}
.zen-time-picker__trigger--error {
  border: 1px solid var(--text-error-message);
}
.zen-time-picker__trigger.zen-form-field__input:not(.zen-time-picker__trigger--full-width) {
  width: unset;
}
@media (max-width: 640px) {
  .zen-time-picker__popup {
    width: 100%;
  }
  .zen-time-picker-select__footer {
    flex-direction: column;
    height: 100%;
    padding: 12px;
  }
  .zen-time-picker-select__footer-button {
    width: 100%;
    border-radius: 0;
  }
}
.zen-date-range-wrapper {
  display: flex;
  flex-wrap: nowrap;
  width: 226px;
}
.zen-date-range-wrapper .zen-date-range__stepper {
  display: flex;
  border: var(--border-width-default) solid var(--borders-general);
  border-radius: var(--border-radius-default);
  justify-content: center;
  align-items: center;
  background: var(--backgrounds-main);
  fill: var(--action-secondary--default);
  width: 32px;
  cursor: pointer;
  flex-shrink: 0;
}
.zen-date-range-wrapper .zen-date-range__stepper--left {
  margin-right: -1px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}
.zen-date-range-wrapper .zen-date-range__stepper--right {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  margin-left: -1px;
}
.zen-date-range-wrapper .zen-date-range__stepper:hover:not(.zen-date-range__stepper:disabled),
.zen-date-range-wrapper .zen-date-range__stepper:focus {
  z-index: 1;
  background-color: var(--backgrounds-hover);
  border: var(--border-width-default) solid var(--borders-form-field--hover);
}
.zen-date-range-wrapper .zen-date-range__stepper:active:not(.zen-date-range__stepper:disabled) {
  color: var(--text-reverse-primary);
  fill: var(--text-reverse-primary);
  border-color: var(--action-secondary--hover);
  background-color: var(--action-secondary--hover);
}
.zen-date-range-wrapper .zen-date-range__stepper:focus-visible {
  outline: 1px solid var(--borders-form-field--active);
  outline-offset: 2px;
}
.zen-date-range-wrapper .zen-date-range__stepper:disabled {
  color: var(--text-button-disabled);
  fill: var(--text-button-disabled);
  background-color: transparent;
  cursor: default;
}
.zen-date-range-wrapper.zen-date-range-wrapper--drive {
  width: 296px;
}
.zen-date-range-wrapper.zen-date-range-wrapper--drive .zen-date-range__stepper {
  height: 44px;
  width: 44px;
}
.zen-date-range-wrapper.zen-date-range-wrapper--drive-tablet {
  width: 296px;
}
.zen-date-range-wrapper.zen-date-range-wrapper--drive-tablet .zen-date-range__stepper {
  height: 46px;
  width: 46px;
}
.zen-date-range-wrapper.zen-date-range-wrapper--mobile {
  width: 296px;
}
.zen-date-range-wrapper.zen-date-range-wrapper--mobile .zen-date-range__stepper {
  height: 44px;
  width: 44px;
}
.zen-date-range {
  box-sizing: border-box;
}
.zen-date-range * {
  box-sizing: border-box;
}
.zen-date-range--active.zen-date-range--active {
  color: var(--text-nav-highlight);
}
.zen-date-range--error.zen-date-range--error {
  border: 1px solid var(--text-error-message);
}
.zen-date-range--with-stepper.zen-date-range--with-stepper {
  width: 100%;
  justify-content: center;
  border-radius: 0;
}
.zen-date-range--with-stepper.zen-date-range--with-stepper .zen-caption__content {
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-wrap: normal;
}
.zen-date-range--with-stepper.zen-date-range--with-stepper:hover,
.zen-date-range--with-stepper.zen-date-range--with-stepper:focus {
  z-index: 1;
}
.zen-date-range.zen-date-range--with-stepper-custom svg {
  display: none;
}
.zen-date-range-popup-wrapper.zen-date-range-popup-wrapper {
  z-index: 11002;
}
.zen-date-range-popup {
  width: 280px;
  min-width: 280px;
  overflow-x: hidden;
}
.zen-date-range-popup__button-clear {
  margin: 8px auto 4px 4px;
}
.zen-date-range-popup__button-reset {
  margin: 8px 8px 4px 0px;
}
.zen-date-range-popup__button-apply {
  margin: 8px 0px 4px 0px;
}
.zen-date-range-popup__header {
  font-family: var(--main-font);
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  letter-spacing: 0.32px;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
  color: var(--text-secondary);
  padding: 12px 16px;
  border-bottom: 1px solid var(--backgrounds-content-1);
}
html:lang(ar) .zen-date-range-popup__header {
  font-family: var(--arabic-font-family);
}
.zen-date-range-popup__footer {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  padding: 0 8px;
  border-top: 1px solid var(--backgrounds-content-1);
}
.zen-date-range-popup.zen-date-range-popup--drive,
.zen-date-range-popup.zen-date-range-popup--drive-tablet {
  width: 320px;
  min-width: 320px;
}
.zen-date-range-popup.zen-date-range-popup--drive .zen-date-range-popup__header {
  font-family: var(--main-font);
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  letter-spacing: 0.32px;
  line-height: 18px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .zen-date-range-popup.zen-date-range-popup--drive .zen-date-range-popup__header {
  font-family: var(--arabic-font-family);
}
.zen-date-range-popup.zen-date-range-popup--drive-tablet .zen-date-range-popup__header {
  font-family: var(--main-font);
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  letter-spacing: 0.32px;
  line-height: 22px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .zen-date-range-popup.zen-date-range-popup--drive-tablet .zen-date-range-popup__header {
  font-family: var(--arabic-font-family);
}
.zen-date-range-mobile-sheet .zen-mobile-sheet__title {
  border-bottom: none;
}
.zen-date-range-inner {
  box-sizing: border-box;
}
.zen-date-range-inner * {
  box-sizing: border-box;
}
.zen-date-range-inner__header {
  font-family: var(--main-font);
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  letter-spacing: 0;
  line-height: 24px;
  text-transform: none;
  text-decoration: none;
  color: var(--text-primary);
  padding: 12px;
}
html:lang(ar) .zen-date-range-inner__header {
  font-family: var(--arabic-font-family);
}
.zen-date-range-inner__calendar-wrapper {
  min-width: 280px;
}
.zen-date-range-inner__range-label {
  font-family: var(--main-font);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
  color: var(--text-primary);
  text-align: start;
}
html:lang(ar) .zen-date-range-inner__range-label {
  font-family: var(--arabic-font-family);
}
.zen-date-range-inner__label-secondary {
  font-family: var(--main-font);
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.32px;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
  color: var(--text-secondary);
}
html:lang(ar) .zen-date-range-inner__label-secondary {
  font-family: var(--arabic-font-family);
}
.zen-date-range-inner__footer {
  display: flex;
  justify-content: flex-end;
  padding: 0 16px;
}
.zen-date-range-inner__button-today {
  margin: 8px;
}
.zen-date-range-inner__mobile-custom-label {
  font-family: var(--main-font);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: nowrap;
  fill: var(--text-placeholder);
  color: var(--text-primary);
  width: 100%;
  padding: 0;
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
}
html:lang(ar) .zen-date-range-inner__mobile-custom-label {
  font-family: var(--arabic-font-family);
}
.zen-date-range-inner__mobile-custom-label:focus {
  color: var(--text-hyperlink);
  fill: var(--text-hyperlink);
}
.zen-date-range-inner__mobile-custom-label--no-secondary {
  height: 16px;
}
.zen-date-range-inner__mobile-custom-icon-wrapper {
  height: 100%;
}
.zen-date-range-inner__radio-group--with-custom .zen-radio-group__item:last-of-type .zen-radio__label {
  padding-right: 8px;
}
.zen-radio {
  box-sizing: border-box;
}
.zen-radio * {
  box-sizing: border-box;
}
.zen-radio__wrapper {
  display: flex;
  align-items: center;
  flex-direction: row;
}
.zen-radio__wrapper--reversed {
  flex-direction: row-reverse;
  gap: 0.3125rem;
}
.zen-radio__label {
  font-family: var(--main-font);
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.32px;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
  margin-inline-start: 0.5rem;
  cursor: pointer;
}
html:lang(ar) .zen-radio__label {
  font-family: var(--arabic-font-family);
}
.zen-radio__label-text {
  color: var(--text-primary);
}
.zen-radio__label--full-width {
  width: 100%;
}
.zen-radio__label--input-wrapper {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  margin-inline-start: 0;
  padding: 0.75rem 1rem;
}
.zen-radio__label--input-wrapper .zen-radio__label-text {
  margin-inline-start: 0.3125rem;
  width: 100%;
}
.zen-radio__label--input-wrapper .zen-radio__input:disabled {
  cursor: default;
}
.zen-radio--drive .zen-radio__label {
  font-family: var(--main-font);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.32px;
  line-height: 20px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .zen-radio--drive .zen-radio__label {
  font-family: var(--arabic-font-family);
}
.zen-radio--drive .zen-radio__input {
  min-width: 1.5rem;
  max-width: 1.5rem;
  height: 1.5rem;
}
.zen-radio--drive .zen-radio__input::before {
  width: 0.875rem;
  height: 0.875rem;
  top: calc(50% - 0.875rem / 2);
  left: calc(50% - 0.875rem / 2);
}
.zen-radio__wrapper--mobile .zen-radio__label {
  font-family: var(--main-font);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .zen-radio__wrapper--mobile .zen-radio__label {
  font-family: var(--arabic-font-family);
}
.zen-radio__wrapper--mobile .zen-radio__input {
  min-width: 1.5rem;
  max-width: 1.5rem;
  height: 1.5rem;
}
.zen-radio__wrapper--mobile .zen-radio__input::before {
  width: 0.875rem;
  height: 0.875rem;
  top: calc(50% - 0.875rem / 2);
  left: calc(50% - 0.875rem / 2);
}
.zen-radio--drive-tablet .zen-radio__label {
  font-family: var(--main-font);
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.32px;
  line-height: 22px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .zen-radio--drive-tablet .zen-radio__label {
  font-family: var(--arabic-font-family);
}
.zen-radio--drive-tablet .zen-radio__input {
  min-width: 1.5rem;
  max-width: 1.5rem;
  height: 1.5rem;
}
.zen-radio--drive-tablet .zen-radio__input::before {
  width: 0.875rem;
  height: 0.875rem;
  top: calc(50% - 0.875rem / 2);
  left: calc(50% - 0.875rem / 2);
}
.zen-radio__input {
  -webkit-appearance: none;
  appearance: none;
  position: relative;
  cursor: pointer;
  min-width: 1rem;
  max-width: 1rem;
  height: 1rem;
  margin: 0;
  border: 1px solid var(--borders-form-field--hover);
  border-radius: 50%;
}
.zen-radio__input:checked {
  border-color: var(--borders-form-field--active);
}
.zen-radio__input:disabled {
  border-color: var(--borders-general);
  cursor: default;
}
.zen-radio__input::before {
  content: "";
  width: 0.625rem;
  height: 0.625rem;
  position: absolute;
  top: calc(50% - 0.625rem / 2);
  left: calc(50% - 0.625rem / 2);
  border-radius: 50%;
  transform: scale(0);
  transition: 120ms transform ease-in-out;
  background-color: var(--borders-form-field--active);
}
.zen-radio__input:disabled::before {
  transform: scale(0);
  background-color: var(--borders-general);
}
.zen-radio__input:checked::before {
  transform: scale(1);
}
.zen-radio--interactive:hover:not(.zen-radio--disabled) {
  background-color: var(--backgrounds-hover);
}
.zen-radio--disabled .zen-radio__label {
  cursor: default;
}
.zen-radio--disabled .zen-radio__label .zen-radio__label-text {
  color: var(--text-button-disabled);
}
.zen-radio-group {
  box-sizing: border-box;
}
.zen-radio-group * {
  box-sizing: border-box;
}
.zen-radio-group__wrapper {
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
}
.zen-radio-group__item {
  padding: 0.75rem 1rem;
}
.zen-radio-group__item--no-paddings {
  padding: 0;
}
.zen-radio-group__item--small {
  padding: 0.25rem 0;
}
.zen-radio-group__item--small.zen-radio-group__item--no-paddings {
  padding: 0;
}
.zen-radio-group__item--small.zen-radio-group__item--no-paddings .zen-radio__label--input-wrapper {
  padding: 0.25rem;
}
.zen-radio-group--horizontal .zen-radio-group__wrapper {
  flex-direction: row;
}
.zen-radio-group--vertical .zen-radio-group__wrapper {
  flex-direction: column;
}
.zen-date-selection {
  box-sizing: border-box;
}
.zen-date-selection * {
  box-sizing: border-box;
}
.zen-date-selection__buttons {
  display: flex;
  padding: 12px;
  gap: 8px;
}
.zen-date-selection__buttons-spacer {
  flex: 1 1 auto;
}
.zen-date-selection__delimiter {
  padding: 8px 0 0 0;
  margin: 0 12px;
  border-bottom: 1px solid var(--borders-general);
}
.zen-dialog {
  box-sizing: border-box;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.zen-dialog * {
  box-sizing: border-box;
}
.zen-dialog__shield {
  box-sizing: border-box;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 11000;
  background-color: var(--backgrounds-hover);
  opacity: 0.5;
}
.zen-dialog__shield * {
  box-sizing: border-box;
}
.zen-dialog-content {
  box-sizing: border-box;
  z-index: 11001;
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: var(--backgrounds-main);
  color: var(--text-primary);
  padding: 0;
  box-shadow: 0px 2px 6px rgba(11, 32, 50, 0.2);
  max-height: 90vh;
  border-radius: var(--border-radius-default);
  overflow: hidden;
}
.zen-dialog-content * {
  box-sizing: border-box;
}
.zen-dialog-content__header {
  background-color: var(--backgrounds-reverse-0);
  color: var(--text-reverse-primary);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: nowrap;
}
.zen-dialog-content__header-title {
  flex-grow: 2;
  padding-right: 12px;
  padding: 12px 24px;
}
.zen-dialog-content__header-close-button {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-right: 12px;
  width: 24px;
  height: 24px;
  fill: var(--text-reverse-primary);
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
}
.zen-dialog-content__header-close-button:active,
.zen-dialog-content__header-close-button:focus,
.zen-dialog-content__header-close-button:hover {
  background-color: var(--backgrounds-reverse-1);
  border-radius: 50%;
  outline: none;
}
.zen-dialog-content__body {
  overflow: auto;
  padding: 24px 32px 32px 24px;
}
.zen-dialog-content__footer {
  display: flex;
  justify-content: space-between;
  padding: 12px;
  border-top: 1px solid var(--borders-general);
  min-height: 59px;
}
.zen-dialog-content__footer-item {
  margin-right: 8px;
}
.zen-dialog-content--small {
  max-width: 400px;
}
.zen-dialog-content--normal {
  max-width: 600px;
}
.zen-popup-default {
  box-shadow: 0px 0px 8px 2px rgba(0, 0, 0, 0.2);
  border-radius: var(--border-radius-default);
}
.zen-popup-body.zen-popup-body {
  overflow-y: auto;
}
.zen-popup-body.zen-popup-body--hidden {
  overflow-y: hidden;
}
.zen-alerts {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 11020;
  display: grid;
  gap: 16px;
  margin-top: 48px;
  padding-right: 24px;
}
.zen-alerts--mobile {
  width: 100%;
  gap: 8px;
  margin-top: 40px;
  padding-right: 12px;
  padding-left: 12px;
  box-sizing: border-box;
}
.zen-toasts {
  position: fixed;
  bottom: 0;
  right: 0;
  z-index: 11020;
  display: grid;
  gap: 16px;
  margin-bottom: 32px;
  padding-right: 24px;
}
.zen-toasts--mobile {
  width: 100%;
  gap: 8px;
  margin-bottom: 16px;
  padding-right: 12px;
  padding-left: 12px;
  box-sizing: border-box;
}
@keyframes waiting {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.zen-waiting {
  box-sizing: border-box;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: hidden;
  z-index: 10005;
}
.zen-waiting * {
  box-sizing: border-box;
}
.zen-waiting--inline {
  position: relative;
  width: 2.5rem;
  height: 1.5rem;
}
.zen-waiting__spinner-text {
  font-family: var(--main-font);
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 24px;
  text-transform: none;
  text-decoration: none;
  color: var(--text-secondary);
  max-width: 9rem;
  text-align: center;
}
html:lang(ar) .zen-waiting__spinner-text {
  font-family: var(--arabic-font-family);
}
.zen-waiting__spinner-text--drive {
  font-family: var(--main-font);
  font-size: 22px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 28px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .zen-waiting__spinner-text--drive {
  font-family: var(--arabic-font-family);
}
.zen-waiting__spinner-text--drive-tablet {
  font-family: var(--main-font);
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 30px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .zen-waiting__spinner-text--drive-tablet {
  font-family: var(--arabic-font-family);
}
.zen-waiting__overlay {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: var(--backgrounds-overlay);
  opacity: 0.12;
  text-align: left;
  overflow: hidden;
}
.zen-waiting__overlay--hidden {
  background-color: transparent;
}
.zen-waiting__spinner-container {
  display: flex;
  min-height: 1.25rem;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 0.5rem;
}
.zen-waiting__spinner {
  display: flex;
  max-width: 4rem;
  max-height: 4rem;
  min-width: 2.5rem;
  min-height: 2.5rem;
  position: relative;
  width: 100%;
  height: 100%;
  justify-content: center;
}
.zen-waiting__spinner--drive-tablet {
  max-width: 2.5rem;
  max-height: 2.5rem;
}
.zen-waiting__spinner--drive {
  max-width: 2.5rem;
  max-height: 2.5rem;
}
@media (max-width: 640px) {
  .zen-waiting__spinner {
    max-width: 2.5rem;
    max-height: 2.5rem;
  }
}
.zen-waiting__spinner-animation {
  transform-origin: 2rem 2rem;
  animation: waiting 1.5s linear infinite;
}
.zen-file-upload {
  box-sizing: border-box;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
}
.zen-file-upload * {
  box-sizing: border-box;
}
.zen-file-upload--disabled {
  opacity: 0.6;
  pointer-events: none;
}
.zen-file-upload .zen-waiting__overlay {
  opacity: 0.5;
  border-radius: var(--border-radius-default);
}
.zen-file-upload--drive {
  gap: 1.25rem;
}
.zen-file-upload--drive-tablet {
  gap: 1.25rem;
}
.zen-file-upload__drop-zone {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem 1.5rem;
  border: 2px dashed var(--borders-general);
  border-radius: var(--border-radius-default);
  background-color: var(--backgrounds-main);
  cursor: pointer;
  transition: border-color 0.2s ease, background-color 0.2s ease;
}
.zen-file-upload__drop-zone:hover,
.zen-file-upload__drop-zone:focus {
  border-color: var(--borders-form-field--active);
  outline: none;
}
.zen-file-upload__drop-zone:focus-visible {
  outline: 2px solid var(--borders-form-field--active);
  outline-offset: 2px;
}
.zen-file-upload__drop-zone--drag-over {
  border-color: var(--borders-form-field--active);
  background-color: var(--backgrounds-content-1);
}
.zen-file-upload__drop-zone--disabled {
  cursor: default;
  pointer-events: none;
}
.zen-file-upload__drop-zone--condensed {
  padding: 1.5rem;
}
.zen-file-upload__drop-zone-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
}
.zen-file-upload__cloud-image {
  width: 120px;
  height: auto;
}
.zen-file-upload__tap-image {
  width: 120px;
  height: auto;
}
.zen-file-upload__drop-zone-text {
  font-family: var(--main-font);
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.32px;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
  color: var(--text-primary);
  display: flex;
  align-items: center;
  gap: 0.25rem;
}
html:lang(ar) .zen-file-upload__drop-zone-text {
  font-family: var(--arabic-font-family);
}
.zen-file-upload__browse-link,
.zen-file-upload__mobile-button {
  padding: 0;
}
.zen-file-upload__browse-link:hover,
.zen-file-upload__mobile-button:hover,
.zen-file-upload__browse-link:focus,
.zen-file-upload__mobile-button:focus {
  background-color: transparent;
  border-color: transparent;
  text-decoration: underline;
}
.zen-file-upload__supported-formats {
  font-family: var(--main-font);
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.32px;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
  color: var(--text-secondary);
  text-align: center;
}
html:lang(ar) .zen-file-upload__supported-formats {
  font-family: var(--arabic-font-family);
}
.zen-file-upload__template {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background-color: var(--backgrounds-content-1);
  border-radius: var(--border-radius-default);
  gap: 1rem;
}
.zen-file-upload__template-content {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
}
.zen-file-upload__template-icon {
  fill: var(--accents-success--detail);
  flex-shrink: 0;
}
.zen-file-upload__template-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}
.zen-file-upload__template-title {
  font-family: var(--main-font);
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.32px;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
  color: var(--text-primary);
  font-weight: 700;
}
html:lang(ar) .zen-file-upload__template-title {
  font-family: var(--arabic-font-family);
}
.zen-file-upload__template-description {
  font-family: var(--main-font);
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.32px;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
  color: var(--text-secondary);
}
html:lang(ar) .zen-file-upload__template-description {
  font-family: var(--arabic-font-family);
}
.zen-file-upload__section-label {
  font-family: var(--main-font);
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.32px;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
  color: var(--text-secondary);
  margin-block-end: 0.5rem;
  display: block;
}
html:lang(ar) .zen-file-upload__section-label {
  font-family: var(--arabic-font-family);
}
.zen-file-upload__uploaded {
  display: flex;
  flex-direction: column;
}
.zen-file-upload__error-banner {
  width: 100%;
}
.zen-file-upload__error-banner .zen-banner__block {
  max-width: 100%;
  width: 100%;
}
.zen-file-upload__file-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
}
.zen-file-upload__file-list-item {
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
}
.zen-file-upload__file-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 3rem;
  padding: 0.5rem;
  border: 1px solid var(--borders-general);
  border-radius: var(--border-radius-default);
  background-color: var(--backgrounds-main);
  gap: 0.625rem;
}
.zen-file-upload__file-item--error {
  border: 1px solid var(--borders-form-field--error);
}
.zen-file-upload__file-info {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  overflow: hidden;
}
.zen-file-upload__file-icon {
  fill: var(--text-secondary);
  flex-shrink: 0;
}
.zen-file-upload__file-name {
  font-family: var(--main-font);
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.32px;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
  color: var(--text-primary);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
html:lang(ar) .zen-file-upload__file-name {
  font-family: var(--arabic-font-family);
}
.zen-file-upload__file-name--error {
  color: var(--text-error-message);
}
.zen-file-upload__remove-button {
  flex-shrink: 0;
}
@media (max-width: 640px) {
  .zen-file-upload--mobile .zen-file-upload__drop-zone-text {
    text-align: center;
  }
}
.zen-filters {
  max-width: 640px;
  box-sizing: border-box;
}
.zen-filters * {
  box-sizing: border-box;
}
.zen-filters__main-row {
  display: flex;
  align-items: center;
  box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.15);
  border-radius: var(--border-radius-default);
  border: var(--border-width-default) solid var(--borders-general);
  background-color: var(--backgrounds-main);
}
.zen-filters__main-row:hover {
  background-color: var(--backgrounds-content-0);
}
.zen-filters__main-row:hover .zen-search-input__input {
  background-color: var(--backgrounds-content-0);
}
.zen-filters__main-row--mobile {
  margin: 8px;
}
.zen-filters__main-row--initial {
  view-transition-name: expand-panel;
}
.zen-filters__select-trigger {
  width: auto;
  flex-shrink: 0;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  padding: 7px 8px;
  border: var(--border-width-default) solid transparent;
  border-right: var(--border-width-default) solid var(--borders-general);
}
.zen-filters__select-trigger:hover {
  background-color: var(--backgrounds-content-0);
  border: var(--border-width-default) solid transparent;
  border-right: var(--border-width-default) solid var(--borders-general);
}
.zen-filters__select-trigger:focus-visible {
  outline: none;
  border: var(--border-width-default) solid var(--borders-form-field--active);
  background-color: var(--backgrounds-content-0);
}
.zen-filters__select-trigger-icon {
  flex-shrink: 0;
}
.zen-filters__select-trigger-content {
  display: block;
  text-align: start;
  flex-grow: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-wrap: normal;
}
.zen-filters__select-caption {
  width: auto;
  flex-shrink: 0;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  padding: 7px 8px;
  min-width: 56px;
  border: var(--border-width-default) solid transparent;
  border-right: var(--border-width-default) solid var(--borders-general);
}
.zen-filters__search {
  flex-grow: 1;
}
.zen-filters__search .zen-search-input__input {
  border: none;
  padding-right: 1px;
  padding-left: 0;
  border-bottom-left-radius: 0;
  border-top-left-radius: 0;
}
.zen-filters-popup.zen-filters-popup:not(.zen-filters-popup--mobile) {
  box-sizing: border-box;
  width: 640px;
  max-width: 640px;
  view-transition-name: expand-panel;
}
.zen-filters-popup.zen-filters-popup:not(.zen-filters-popup--mobile) * {
  box-sizing: border-box;
}
.zen-filters-popup__first-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  padding: 0;
}
.zen-filters-popup__first-row--mobile {
  padding: 8px 16px;
}
.zen-filters-popup__second-row {
  border-top: var(--border-width-default) solid var(--borders-general);
  padding: 16px 0;
}
.zen-filters-popup__second-row--mobile {
  border-top: none;
  padding: 0;
}
.zen-filters-popup__content {
  display: flex;
}
.zen-filters-popup__content .zen-filters-popup__left-panel {
  display: flex;
  flex-direction: column;
  width: 123px;
  min-height: 100%;
  height: auto;
  justify-content: stretch;
  border-right: var(--border-width-default) solid var(--borders-general);
}
.zen-filters-popup__content .zen-filters-popup__left-panel .zen-filters__select-trigger {
  width: 123px;
}
.zen-filters-popup__content .zen-filters-popup__right-panel {
  flex-grow: 1;
  height: 100%;
  max-width: calc(100% - 123px);
}
.zen-filters-popup.zen-filters-popup--mobile {
  width: 100%;
  max-width: 100%;
  view-transition-name: expand-panel;
}
.zen-filters-popup.zen-filters-popup--mobile .zen-filters-popup__right-panel {
  max-width: 100%;
}
.zen-filters-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 4px;
  margin-top: 8px;
  padding: 8px 0;
}
.zen-filters-container__removal-chip .zen-chip__icon {
  border: 1px solid var(--action-primary--active);
  border-radius: 50%;
}
.zen-filters-container__removal-chip.zen-chip--accent .zen-chip__icon {
  border: 1px solid var(--accents-general--main);
}
.zen-filters-container.zen-filters-container--mobile {
  padding: 0;
}
.zen-filters-container__mobile-scroll-wrapper {
  margin-left: 8px;
  padding: 2px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  gap: 8px;
  width: 100%;
  overflow: auto;
  -ms-overflow-style: none;
  /* IE and Edge */
  scrollbar-width: none;
  /* Firefox */
}
.zen-filters-container__mobile-scroll-wrapper::-webkit-scrollbar {
  display: none;
}
.zen-filters-container__mobile-scroll-wrapper > * {
  flex-shrink: 0;
}
.zen-filters-container__mobile-scroll-wrapper:last-child {
  margin-right: 8px;
}
.zen-filters-container.zen-filters__container--no-search {
  margin-top: 0;
  padding: 0;
}
::view-transition-group(expand-panel) {
  animation-duration: 0.15s;
  animation-timing-function: ease-out;
}
.zen-side-panel-filters__dropdown-item-chips-container {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.zen-side-panel-filters__date-popup--full-width.zen-side-panel-filters__date-popup--full-width {
  width: 328px;
}
.zen-side-panel-filters__groups-popup--full-width.zen-side-panel-filters__groups-popup--full-width {
  width: 328px;
}
.zen-groups-filter-menu {
  box-sizing: border-box;
  min-width: 255px;
  width: 100%;
  max-width: 360px;
  min-height: 80px;
  position: relative;
}
.zen-groups-filter-menu * {
  box-sizing: border-box;
}
.zen-groups-filter-menu__main-container {
  min-height: 333px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;
}
.zen-groups-filter-menu__content {
  flex-grow: 1;
  overflow: visible;
}
.zen-groups-filter-menu__divider.zen-divider {
  width: calc(100% - 32px);
  margin: auto;
}
.zen-groups-filter-menu__divider--footer.zen-divider {
  width: 100%;
  margin: 0;
}
.zen-groups-filter-menu__footer {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: flex-end;
  height: 48px;
}
.zen-groups-filter-menu__groups-box {
  overflow-y: auto;
  overflow-x: hidden;
  max-height: 260px;
}
.zen-groups-filter-menu__groups-list--no-space,
.zen-groups-filter-menu .zen-groups-filter-menu__groups-list--no-space {
  margin-bottom: 0;
}
.zen-groups-filter-menu__additional-info {
  padding: 12px 16px;
  margin: 12px auto;
  text-align: center;
}
.zen-groups-filter-menu__additional-info--faded {
  color: var(--text-secondary);
}
.zen-groups-filter-menu__button-group {
  display: inline-flex;
  flex-grow: 1;
  justify-content: flex-end;
  margin-right: 8px;
}
.zen-groups-filter-menu__reset-button,
.zen-groups-filter-menu__cancel-button,
.zen-groups-filter-menu__apply-button {
  margin-right: 8px;
  margin-top: 8px;
  margin-bottom: 4px;
}
.zen-groups-filter-menu__reset-button {
  margin-left: 8px;
}
.zen-groups-filter-menu__mobile-sheet .zen-groups-filter-menu__reset-button,
.zen-groups-filter-menu__mobile-sheet .zen-groups-filter-menu__cancel-button,
.zen-groups-filter-menu__mobile-sheet .zen-groups-filter-menu__apply-button {
  margin: 0;
}
.zen-groups-filter-menu__item-wrapper {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  margin: 1px;
}
.zen-groups-filter-menu__item {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  background-color: transparent;
  width: 100%;
  height: 40px;
  font-weight: 400;
  border: none;
  padding: 7px 16px;
  border-radius: 0;
}
.zen-groups-filter-menu__item--interactive {
  cursor: pointer;
}
.zen-groups-filter-menu__item--interactive:hover,
.zen-groups-filter-menu__item--interactive:focus {
  color: var(--text-primary);
  fill: var(--action-secondary--default);
  outline: none;
  background-color: var(--backgrounds-hover);
}
.zen-groups-filter-menu__item--interactive:active {
  color: var(--text-reverse-primary);
  fill: var(--text-reverse-primary);
  outline: none;
  background-color: var(--action-secondary--default);
}
.zen-groups-filter-menu__item--interactive:active .zen-groups-filter-menu__action-label {
  color: var(--text-reverse-primary);
}
.zen-groups-filter-menu__item--interactive:active .zen-groups-filter-menu__action-label .zen-groups-filter__label-element {
  color: var(--text-reverse-primary);
}
.zen-groups-filter-menu__item--stretched {
  justify-content: space-between;
}
.zen-groups-filter-menu__item--end {
  justify-content: flex-end;
}
.zen-groups-filter-menu__item--action {
  padding-right: 0;
}
.zen-groups-filter-menu__item--underlined {
  border-bottom: 1px solid;
}
.zen-groups-filter-menu__item--inline {
  display: inline-block;
}
.zen-groups-filter-menu__currently-selected-button {
  padding-right: 8px;
  fill: var(--borders-form-field--hover);
}
.zen-groups-filter-menu__currently-selected {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  padding: 7px 16px;
  height: 40px;
}
.zen-groups-filter-menu__toggle-label {
  display: flex;
  flex-wrap: nowrap;
}
.zen-groups-filter-menu__action-button {
  height: 40px;
  border: none;
  margin: 0;
}
.zen-groups-filter-menu__action-button--no-fill {
  fill: var(--borders-form-field--hover);
}
.zen-groups-filter-menu__action-button:active svg {
  fill: var(--text-reverse-primary);
}
.zen-groups-filter-menu__advanced-button {
  min-width: 110px;
  color: var(--text-primary);
}
.zen-groups-filter-menu__advanced-neighbor {
  max-width: calc(100% - 110px);
}
.zen-groups-filter-menu__advanced-neighbor .zen-toggler__label {
  max-width: 100%;
}
.zen-groups-filter-menu__advanced-neighbor .zen-toggler__label-text {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-wrap: normal;
}
.zen-groups-filter-menu__advanced-button,
.zen-groups-filter-menu__action-button-home {
  text-decoration: underline;
  color: var(--text-primary);
}
.zen-groups-filter-menu__advanced-button:active svg,
.zen-groups-filter-menu__action-button-home:active svg {
  fill: var(--text-reverse-primary);
}
.zen-groups-filter-menu__action-button-back.zen-groups-filter-menu:active svg {
  fill: var(--text-reverse-primary);
}
.zen-groups-filter-menu__action-icon {
  margin-right: 5px;
}
.zen-groups-filter-menu__action-label {
  color: var(--text-primary);
  display: flex;
  align-items: center;
}
.zen-groups-filter-menu__action-label--limited {
  display: block;
  max-width: 200px;
}
.zen-groups-filter-menu__select-filters {
  color: var(--text-primary);
}
.zen-groups-filter-menu--mobile {
  max-width: 100%;
  min-width: 100%;
}
.zen-groups-filter {
  box-sizing: border-box;
  display: flex;
  flex-wrap: nowrap;
  cursor: pointer;
}
.zen-groups-filter * {
  box-sizing: border-box;
}
.zen-groups-filter__arrow-icon--up {
  transform: rotate(180deg);
}
.zen-groups-filter__icon {
  color: var(--action-secondary--default);
  fill: var(--action-secondary--default);
  min-width: 16px;
  min-height: 16px;
}
.zen-groups-filter__search-container {
  display: flex;
  align-items: center;
  height: 32px;
  outline: none;
  margin-top: 0;
  margin-bottom: 0;
  padding: 7px 9px;
  flex: 1 1 auto;
  background-color: var(--backgrounds-main);
  border: var(--border-width-default) solid var(--borders-general);
  min-width: 120px;
  max-width: 180px;
  border-radius: var(--border-radius-default);
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  fill: var(--action-secondary--default);
}
.zen-groups-filter__search-container--full-size {
  max-width: 100%;
}
.zen-groups-filter__search-container:hover,
.zen-groups-filter__search-container:active {
  color: var(--text-primary);
  fill: var(--accents-general--main);
  border-color: var(--borders-form-field--hover);
  background-color: var(--backgrounds-hover);
  z-index: 1;
}
.zen-groups-filter__search-container:hover .zen-groups-filter__input,
.zen-groups-filter__search-container:active .zen-groups-filter__input {
  background-color: var(--backgrounds-hover);
}
.zen-groups-filter__search-input {
  display: flex;
  align-items: center;
}
.zen-groups-filter__search-input--post {
  padding-left: 8px;
}
.zen-groups-filter__input-container {
  height: 100%;
  width: 100%;
  min-height: 24px;
}
.zen-groups-filter__chip-input .zen-input-adornments {
  border-radius: 0;
  border: none;
  border-bottom: var(--border-width-default) solid var(--borders-general);
}
.zen-groups-filter .zen-groups-filter__input {
  min-width: 85px;
  height: 100%;
  width: 100%;
  font-size: 12px;
  border: none;
  outline: none;
  padding: 0 5px 0 0;
  -webkit-appearance: none;
  appearance: none;
  background-color: inherit;
  color: inherit;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-wrap: normal;
}
.zen-groups-filter .zen-groups-filter__input:hover {
  background-color: var(--backgrounds-hover);
}
.zen-groups-filter .zen-groups-filter__input::placeholder {
  font-family: var(--main-font);
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.32px;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
  color: var(--text-secondary);
  font-feature-settings: "clig" off, "liga" off;
  text-overflow: ellipsis;
  white-space: nowrap;
}
html:lang(ar) .zen-groups-filter .zen-groups-filter__input::placeholder {
  font-family: var(--arabic-font-family);
}
.zen-groups-filter .zen-groups-filter__input--selected::placeholder {
  color: var(--text-nav-highlight);
}
.zen-groups-filter__popup-trigger {
  display: flex;
  border-color: var(--borders-general);
  border: 1px solid var(--borders-general);
  border-radius: var(--border-radius-default);
  justify-content: center;
  align-items: center;
  background: var(--backgrounds-main);
  fill: var(--action-secondary--default);
  width: 32px;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  margin-left: -1px;
  cursor: pointer;
  flex-shrink: 0;
}
.zen-groups-filter__popup-trigger:focus-visible {
  outline: none;
}
.zen-groups-filter__popup-trigger:hover,
.zen-groups-filter__popup-trigger:focus,
.zen-groups-filter__popup-trigger:active {
  z-index: 1;
  border-color: var(--borders-form-field--hover);
  background-color: var(--backgrounds-hover);
}
.zen-groups-filter.zen-groups-filter--mobile .zen-groups-filter__search-container {
  height: 44px;
}
.zen-groups-filter.zen-groups-filter--mobile .zen-groups-filter__popup-trigger {
  width: 44px;
}
.zen-groups-filter .zen-groups-filter__search-container--error {
  border: 1px solid var(--text-error-message);
}
.zen-groups-filter .zen-groups-filter__popup-trigger--error {
  border-top: 1px solid var(--text-error-message);
  border-right: 1px solid var(--text-error-message);
  border-bottom: 1px solid var(--text-error-message);
}
.zen-groups-filter:focus-within .zen-groups-filter__search-container:not(.zen-groups-filter__search-container--error),
.zen-groups-filter:focus-within .zen-groups-filter__popup-trigger:not(.zen-groups-filter__popup-trigger--error) {
  border-color: var(--borders-form-field--hover);
}
.zen-groups-filter__label-element {
  color: var(--text-primary);
  margin-right: 6px;
  display: flex;
  white-space: nowrap;
}
.zen-groups-filter__label-element--last {
  margin-right: 0;
}
.zen-groups-filter__label-element--first {
  margin-left: 6px;
}
.zen-groups-filter__label-element--no-shrink {
  flex-shrink: 0;
  max-width: 64%;
}
.zen-groups-filter__counter {
  background: var(--action-primary--default);
  color: var(--text-reverse-primary);
  border-radius: 9px;
  display: flex;
  min-width: 16px;
  height: 16px;
  justify-content: center;
  align-items: center;
  padding: 2px 4px;
}
.zen-groups-filter__popup.zen-groups-filter__popup {
  z-index: 11001;
  overflow-y: hidden;
}
.zen-groups-filter__popup.zen-groups-filter__popup.zen-groups-filter__popup--inactive {
  z-index: 10999;
}
.zen-groups-filter-trigger {
  box-sizing: border-box;
  display: flex;
  flex-wrap: nowrap;
}
.zen-groups-filter-trigger * {
  box-sizing: border-box;
}
.zen-groups-filter-trigger__label-box {
  display: inline-flex;
}
.zen-list {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  overflow: auto;
  outline: none;
}
.zen-list * {
  box-sizing: border-box;
}
.zen-list__item {
  list-style: none;
  display: flex;
}
.zen-item-data {
  padding: 12px 12px 11px 12px;
  background-color: var(--backgrounds-main);
  border-bottom: 1px solid var(--borders-general);
  display: flex;
  flex-direction: column;
  row-gap: 4px;
}
.zen-item-data--tall {
  row-gap: 12px;
}
.zen-item-data--tall .zen-item-data__data {
  row-gap: 12px;
}
.zen-item-data--tall .zen-item-data__data-label {
  font-family: var(--main-font);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .zen-item-data--tall .zen-item-data__data-label {
  font-family: var(--arabic-font-family);
}
.zen-item-data--tall .zen-item-data__data-value {
  font-family: var(--main-font);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .zen-item-data--tall .zen-item-data__data-value {
  font-family: var(--arabic-font-family);
}
.zen-item-data:hover {
  background-color: var(--backgrounds-content-1);
}
.zen-item-data__icon {
  flex: 0 0 auto;
  width: 24px;
  height: 24px;
  padding: 4px;
  background-color: var(--action-primary--default);
  fill: var(--text-reverse-primary);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.zen-item-data__icon-placeholder {
  width: 24px;
  flex: 0 0 auto;
}
.zen-item-data__main {
  flex: 1 1 auto;
  display: flex;
  flex-direction: row;
  gap: 12px;
  min-width: 0;
  width: 100%;
  align-items: center;
}
.zen-item-data__main-data {
  display: flex;
  gap: 8px;
  align-items: center;
  flex: 1 1 auto;
  min-width: 0;
}
.zen-item-data__identifier {
  font-family: var(--main-font);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
  color: var(--text-primary);
  flex: 1 1 100%;
  min-width: 0;
  display: flex;
  flex-direction: column;
}
html:lang(ar) .zen-item-data__identifier {
  font-family: var(--arabic-font-family);
}
.zen-item-data__name {
  font-family: var(--main-font);
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  letter-spacing: 0.16px;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-wrap: normal;
  color: var(--text-primary);
  flex: 1 1 auto;
}
html:lang(ar) .zen-item-data__name {
  font-family: var(--arabic-font-family);
}
.zen-item-data__link {
  font-family: var(--main-font);
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  letter-spacing: 0.16px;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-wrap: normal;
  color: var(--text-hyperlink);
  flex: 1 1 auto;
  width: 100%;
}
html:lang(ar) .zen-item-data__link {
  font-family: var(--arabic-font-family);
}
.zen-item-data__secondary {
  font-family: var(--main-font);
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.32px;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
  color: var(--text-secondary);
  flex: 1 1 auto;
  -webkit-line-clamp: 2;
}
html:lang(ar) .zen-item-data__secondary {
  font-family: var(--arabic-font-family);
}
.zen-item-data__secondary,
.zen-item-data__data-label,
.zen-item-data__data-value,
.zen-item-data__data-value-text {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
}
.zen-item-data__data-label,
.zen-item-data__data-value,
.zen-item-data__data-value-text {
  -webkit-line-clamp: 10;
}
.zen-item-data__status {
  flex: 0 0 auto;
}
.zen-item-data__secondary-data {
  display: flex;
  flex-direction: row;
  column-gap: 12px;
  flex: 1 1 auto;
}
.zen-item-data__data {
  display: flex;
  flex-direction: column;
  row-gap: 4px;
  flex: 1 1 auto;
}
.zen-item-data__data-row {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  width: 100%;
  gap: 4px;
}
.zen-item-data__data-label {
  font-family: var(--main-font);
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.32px;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
  color: var(--text-secondary);
  flex: 0 1 30%;
}
html:lang(ar) .zen-item-data__data-label {
  font-family: var(--arabic-font-family);
}
.zen-item-data__data-value {
  flex: 1 1 70%;
  font-family: var(--main-font);
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.32px;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
  color: var(--text-primary);
  display: flex;
  align-items: center;
  gap: 8px;
}
html:lang(ar) .zen-item-data__data-value {
  font-family: var(--arabic-font-family);
}
.zen-item-data__data-value-icon {
  flex: 0 0 auto;
  fill: var(--text-secondary);
}
.zen-item-data__data-value-text {
  flex: 1 1 auto;
  color: var(--text-primary);
}
.zen-item-data__click {
  width: 32px;
  height: 32px;
  fill: var(--text-secondary);
}
.zen-item-data__checkbox-placeholder {
  width: 16px;
  flex: 0 0 auto;
}
.zen-item-data__waiting {
  width: 100%;
  max-width: 300px;
}
.zen-item-data--drive .zen-item-data__name {
  font-family: var(--main-font);
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  letter-spacing: 0.16px;
  line-height: 20px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .zen-item-data--drive .zen-item-data__name {
  font-family: var(--arabic-font-family);
}
.zen-item-data--drive .zen-item-data__link {
  font-family: var(--main-font);
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  letter-spacing: 0.16px;
  line-height: 20px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .zen-item-data--drive .zen-item-data__link {
  font-family: var(--arabic-font-family);
}
.zen-item-data--drive .zen-item-data__secondary {
  font-family: var(--main-font);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.32px;
  line-height: 20px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .zen-item-data--drive .zen-item-data__secondary {
  font-family: var(--arabic-font-family);
}
.zen-item-data--drive .zen-item-data__data-label {
  font-family: var(--main-font);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.32px;
  line-height: 18px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .zen-item-data--drive .zen-item-data__data-label {
  font-family: var(--arabic-font-family);
}
.zen-item-data--drive .zen-item-data__data-value {
  font-family: var(--main-font);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.32px;
  line-height: 20px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .zen-item-data--drive .zen-item-data__data-value {
  font-family: var(--arabic-font-family);
}
.zen-item-data--drive .zen-item-data__more-button,
.zen-item-data--drive .zen-item-data__click {
  height: 40px;
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.zen-item-data--drive .zen-item-data__checkbox-placeholder {
  width: 24px;
  flex: 0 0 auto;
}
.zen-item-data--drive-tablet .zen-item-data__name {
  font-family: var(--main-font);
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  letter-spacing: 0.16px;
  line-height: 22px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .zen-item-data--drive-tablet .zen-item-data__name {
  font-family: var(--arabic-font-family);
}
.zen-item-data--drive-tablet .zen-item-data__link {
  font-family: var(--main-font);
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  letter-spacing: 0.16px;
  line-height: 22px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .zen-item-data--drive-tablet .zen-item-data__link {
  font-family: var(--arabic-font-family);
}
.zen-item-data--drive-tablet .zen-item-data__secondary {
  font-family: var(--main-font);
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.32px;
  line-height: 22px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .zen-item-data--drive-tablet .zen-item-data__secondary {
  font-family: var(--arabic-font-family);
}
.zen-item-data--drive-tablet .zen-item-data__data-label {
  font-family: var(--main-font);
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.32px;
  line-height: 18px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .zen-item-data--drive-tablet .zen-item-data__data-label {
  font-family: var(--arabic-font-family);
}
.zen-item-data--drive-tablet .zen-item-data__data-value {
  font-family: var(--main-font);
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.32px;
  line-height: 22px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .zen-item-data--drive-tablet .zen-item-data__data-value {
  font-family: var(--arabic-font-family);
}
.zen-item-data--drive-tablet .zen-item-data__more-button,
.zen-item-data--drive-tablet .zen-item-data__click {
  height: 40px;
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.zen-item-data--drive-tablet .zen-item-data__checkbox-placeholder {
  width: 24px;
  flex: 0 0 auto;
}
.zen-item-data--mobile .zen-item-data__more-button,
.zen-item-data--mobile .zen-item-data__click {
  height: 40px;
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.zen-item-data--mobile .zen-item-data__checkbox-placeholder {
  width: 24px;
  flex: 0 0 auto;
}
.zen-list-item-compact {
  padding: 8px 0 7px 0;
  background-color: var(--backgrounds-main);
  border-bottom: 1px solid var(--borders-general);
  display: flex;
  gap: 8px;
  align-items: center;
  width: 100%;
  min-height: 40px;
}
.zen-list-item-compact__left-icon {
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  fill: var(--accents-general--detail);
}
.zen-list-item-compact__name {
  font-family: var(--main-font);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
  color: var(--text-primary);
  flex: 0 1 auto;
  align-items: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-wrap: normal;
}
html:lang(ar) .zen-list-item-compact__name {
  font-family: var(--arabic-font-family);
}
.zen-list-item-compact__right-icon {
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  fill: var(--accents-general--detail);
}
.zen-list-item-compact__status {
  flex: 0 0 auto;
  display: flex;
  align-items: center;
}
.zen-list-item-compact__data {
  font-family: var(--main-font);
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.32px;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
  color: var(--text-secondary);
  flex: 1 0 auto;
  text-align: right;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
html:lang(ar) .zen-list-item-compact__data {
  font-family: var(--arabic-font-family);
}
.zen-list-item-compact__icon--success {
  fill: var(--accents-success--detail);
}
.zen-list-item-compact__icon--error {
  fill: var(--accents-error--detail);
}
.zen-list-item-compact__icon--warning {
  fill: var(--accents-warning--detail);
}
.zen-list-item-compact__icon--info {
  fill: var(--accents-general--detail);
}
.zen-list-item-compact__waiting {
  width: 100%;
  height: 16px;
  max-width: 300px;
}
.zen-list-item-compact--drive {
  min-height: 52px;
}
.zen-list-item-compact--drive .zen-list-item-compact__name {
  font-family: var(--main-font);
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 20px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .zen-list-item-compact--drive .zen-list-item-compact__name {
  font-family: var(--arabic-font-family);
}
.zen-list-item-compact--drive .zen-list-item-compact__data {
  font-family: var(--main-font);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.32px;
  line-height: 18px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .zen-list-item-compact--drive .zen-list-item-compact__data {
  font-family: var(--arabic-font-family);
}
.zen-list-item-compact--drive .zen-list-item-compact__waiting {
  height: 20px;
  max-width: 500px;
}
.zen-list-item-compact--drive-tablet {
  min-height: 52px;
}
.zen-list-item-compact--drive-tablet .zen-list-item-compact__name {
  font-family: var(--main-font);
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 22px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .zen-list-item-compact--drive-tablet .zen-list-item-compact__name {
  font-family: var(--arabic-font-family);
}
.zen-list-item-compact--drive-tablet .zen-list-item-compact__data {
  font-family: var(--main-font);
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.32px;
  line-height: 18px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .zen-list-item-compact--drive-tablet .zen-list-item-compact__data {
  font-family: var(--arabic-font-family);
}
.zen-list-item-compact--drive-tablet .zen-list-item-compact__waiting {
  height: 22px;
  max-width: 500px;
}
.zen-list-item {
  padding: 8px 16px 7px 16px;
  background-color: var(--backgrounds-main);
  border-bottom: 1px solid var(--borders-general);
  display: flex;
  gap: 8px;
  align-items: center;
  width: 100%;
  min-height: 48px;
  box-sizing: border-box;
}
.zen-list-item:hover {
  background-color: var(--backgrounds-content-1);
}
.zen-list-item__dnd {
  flex: 0 0 auto;
  width: 32px;
  height: 32px;
  padding: 8px;
  fill: var(--text-secondary);
  cursor: pointer;
  box-sizing: border-box;
}
.zen-list-item__image {
  width: 32px;
  height: 32px;
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
}
.zen-list-item__identifier {
  font-family: var(--main-font);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
  color: var(--text-primary);
  flex: 1 1 auto;
  display: flex;
  flex-direction: row;
  min-width: 0;
  column-gap: 8px;
  align-items: center;
}
html:lang(ar) .zen-list-item__identifier {
  font-family: var(--arabic-font-family);
}
.zen-list-item__name {
  flex: 0 1 auto;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-wrap: normal;
  font-family: var(--main-font);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .zen-list-item__name {
  font-family: var(--arabic-font-family);
}
.zen-list-item__secondary {
  flex: 0 1 auto;
  font-family: var(--main-font);
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.32px;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
  color: var(--text-secondary);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-wrap: normal;
}
html:lang(ar) .zen-list-item__secondary {
  font-family: var(--arabic-font-family);
}
.zen-list-item__status {
  flex: 0 0 auto;
  display: flex;
  align-items: center;
}
.zen-list-item__actions {
  display: flex;
  flex: 0 0 auto;
  gap: 8px;
  align-items: center;
}
.zen-list-item__action-button,
.zen-list-item__more-button {
  height: 32px;
  align-items: center;
  justify-content: center;
}
.zen-list-item--dragging {
  display: none;
}
.zen-list-item__waiting {
  max-width: 300px;
}
.zen-list-item__click {
  width: 32px;
  height: 32px;
  fill: var(--text-secondary);
}
.zen-list-item--clickable {
  cursor: pointer;
}
.zen-list--vertical .zen-list-item .zen-list-item__identifier {
  flex-direction: column;
  align-items: initial;
  row-gap: 4px;
}
.zen-list--vertical .zen-list-item .zen-list-item__secondary {
  white-space: normal;
  text-overflow: clip;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
@media (max-width: 640px) {
  .zen-list-item__identifier {
    flex-direction: column;
    align-items: initial;
  }
  .zen-list-item__name {
    flex: 0 1 auto;
  }
  .zen-list-item__secondary {
    flex: 0 1 auto;
  }
}
.zen-list-item--drive {
  min-height: 60px;
}
.zen-list-item--drive .zen-list-item__image {
  width: 44px;
  height: 44px;
}
.zen-list-item--drive .zen-list-item__name {
  font-family: var(--main-font);
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 20px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .zen-list-item--drive .zen-list-item__name {
  font-family: var(--arabic-font-family);
}
.zen-list-item--drive .zen-list-item__secondary {
  font-family: var(--main-font);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.32px;
  line-height: 18px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .zen-list-item--drive .zen-list-item__secondary {
  font-family: var(--arabic-font-family);
}
.zen-list-item--drive .zen-list-item__action-button,
.zen-list-item--drive .zen-list-item__more-button {
  height: 40px;
  width: 40px;
}
.zen-list-item--drive .zen-list-item__waiting {
  height: 20px;
  max-width: 500px;
}
.zen-list-item--drive .zen-item-data__click {
  height: 40px;
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.zen-list-item--drive-tablet {
  min-height: 60px;
}
.zen-list-item--drive-tablet .zen-list-item__image {
  width: 44px;
  height: 44px;
}
.zen-list-item--drive-tablet .zen-list-item__name {
  font-family: var(--main-font);
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 22px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .zen-list-item--drive-tablet .zen-list-item__name {
  font-family: var(--arabic-font-family);
}
.zen-list-item--drive-tablet .zen-list-item__secondary {
  font-family: var(--main-font);
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.32px;
  line-height: 18px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .zen-list-item--drive-tablet .zen-list-item__secondary {
  font-family: var(--arabic-font-family);
}
.zen-list-item--drive-tablet .zen-list-item__action-button,
.zen-list-item--drive-tablet .zen-list-item__more-button {
  height: 44px;
  width: 44px;
}
.zen-list-item--drive-tablet .zen-list-item__waiting {
  height: 22px;
  max-width: 500px;
}
.zen-list-item--drive-tablet .zen-item-data__click {
  height: 40px;
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.zen-list-item--mobile {
  min-height: 60px;
}
.zen-list-item--mobile .zen-list-item__image {
  width: 44px;
  height: 44px;
}
.zen-list-item--mobile .zen-list-item__name {
  font-family: var(--main-font);
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 20px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .zen-list-item--mobile .zen-list-item__name {
  font-family: var(--arabic-font-family);
}
.zen-list-item--mobile .zen-list-item__secondary {
  font-family: var(--main-font);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.32px;
  line-height: 18px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .zen-list-item--mobile .zen-list-item__secondary {
  font-family: var(--arabic-font-family);
}
.zen-list-item--mobile .zen-list-item__action-button,
.zen-list-item--mobile .zen-list-item__more-button {
  height: 40px;
  width: 40px;
}
.zen-list-item--mobile .zen-list-item__waiting {
  height: 20px;
  max-width: 500px;
}
.zen-list-item--mobile .zen-list-item__click,
.zen-list-item--mobile .zen-item-data__click {
  height: 40px;
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.zen-filters-search-list {
  max-height: 345px;
  min-height: 340px;
}
.zen-filters-search-list--mobile {
  padding: 16px 0;
  overflow-y: auto;
}
.zen-filters-search-list__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 8px 8px;
}
.zen-filters-search-list__header-title {
  font-family: var(--main-font);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
  color: var(--text-secondary);
}
html:lang(ar) .zen-filters-search-list__header-title {
  font-family: var(--arabic-font-family);
}
.zen-filters-search-list__data {
  padding: 1px;
  max-height: 296px;
}
.zen-filters-search-list .zen-filters-search-list__header--drive .zen-filters-search-list__header-title {
  font-family: var(--main-font);
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 20px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .zen-filters-search-list .zen-filters-search-list__header--drive .zen-filters-search-list__header-title {
  font-family: var(--arabic-font-family);
}
.zen-filters-search-list .zen-filters-search-list__header--drive-tablet .zen-filters-search-list__header-title {
  font-family: var(--main-font);
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 22px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .zen-filters-search-list .zen-filters-search-list__header--drive-tablet .zen-filters-search-list__header-title {
  font-family: var(--arabic-font-family);
}
.zen-search-item-wrapper {
  display: flex;
  align-items: center;
  border: 1px solid var(--backgrounds-main);
  border-radius: 4px;
  background-color: var(--backgrounds-main);
  list-style: none;
  width: 100%;
}
.zen-search-item-wrapper:hover {
  background-color: var(--backgrounds-content-1);
  outline: none;
  border-color: var(--backgrounds-content-1);
}
.zen-search-item-wrapper--active {
  background-color: var(--accents-general--main);
  border-color: var(--accents-general--main);
}
.zen-search-item-wrapper--active:hover {
  background-color: var(--backgrounds-content-1);
  border-color: var(--backgrounds-content-1);
}
.zen-search-item-wrapper--clickable {
  padding-right: 12px;
}
.zen-search-item-wrapper:focus-within:not(.zen-search-item-data__close) {
  border: 1px solid var(--borders-form-field--active);
}
.zen-search-item-data {
  padding: 12px 12px 11px 12px;
  display: flex;
  flex-direction: row;
  gap: 8px;
  flex-grow: 1;
}
.zen-search-item-data__icon {
  flex: 0 0 auto;
  width: 32px;
  height: 32px;
  padding: 4px;
  background-color: var(--accents-general--main);
  color: var(--text-secondary);
  fill: var(--text-secondary);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.zen-search-item-data--with-close-button {
  padding: 12px 0 11px 12px;
}
.zen-search-item-data:focus-visible {
  outline: none;
}
.zen-search-item-data--clickable {
  cursor: pointer;
}
.zen-search-item-data--active {
  background-color: var(--accents-general--main);
  border-color: var(--accents-general--main);
  position: relative;
}
.zen-search-item-data--active .zen-search-item-data__icon {
  background-color: var(--action-primary--active);
  color: var(--text-reverse-primary);
  fill: var(--text-reverse-primary);
}
.zen-search-item-data--active:hover {
  background-color: var(--backgrounds-content-1);
  border-color: var(--backgrounds-content-1);
}
.zen-search-item-data--active:hover::after {
  display: flex;
  position: absolute;
  align-items: center;
  justify-content: center;
  content: "\\00d7";
  top: 0;
  right: 8px;
  width: 20px;
  height: 100%;
  font-size: 20px;
  font-weight: 300;
  line-height: 1;
}
.zen-search-item-data__main {
  flex: 1 1 auto;
  display: flex;
  flex-direction: row;
  gap: 12px;
  min-width: 0;
  width: 100%;
  align-items: center;
}
.zen-search-item-data__main-data {
  display: flex;
  gap: 8px;
  align-items: center;
  flex: 1 1 auto;
  min-width: 0;
}
.zen-search-item-data__identifier {
  font-family: var(--main-font);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
  color: var(--text-primary);
  flex: 1 1 100%;
  min-width: 0;
  display: flex;
  flex-direction: column;
}
html:lang(ar) .zen-search-item-data__identifier {
  font-family: var(--arabic-font-family);
}
.zen-search-item-data__name {
  font-family: var(--main-font);
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  letter-spacing: 0.16px;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-wrap: normal;
  color: var(--text-primary);
  flex: 1 1 auto;
  align-content: center;
}
html:lang(ar) .zen-search-item-data__name {
  font-family: var(--arabic-font-family);
}
.zen-search-item-data__secondary {
  font-family: var(--main-font);
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.32px;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
  color: var(--text-secondary);
  flex: 1 1 auto;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  text-overflow: ellipsis;
}
html:lang(ar) .zen-search-item-data__secondary {
  font-family: var(--arabic-font-family);
}
.zen-search-item-data__close {
  height: 32px;
  fill: var(--text-secondary);
}
.zen-search-item-data__close:hover {
  border-color: var(--borders-form-field--active);
  border-radius: var(--border-radius-default);
}
.zen-search-item-data__input {
  position: absolute;
  left: -5000px;
}
.zen-search-item-data-wrapper--drive .zen-search-item-data__name {
  font-family: var(--main-font);
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  letter-spacing: 0.16px;
  line-height: 20px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .zen-search-item-data-wrapper--drive .zen-search-item-data__name {
  font-family: var(--arabic-font-family);
}
.zen-search-item-data-wrapper--drive .zen-search-item-data__secondary {
  font-family: var(--main-font);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.32px;
  line-height: 20px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .zen-search-item-data-wrapper--drive .zen-search-item-data__secondary {
  font-family: var(--arabic-font-family);
}
.zen-search-item-data-wrapper--drive .zen-search-item-data__close {
  height: 44px;
  width: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.zen-search-item-data-wrapper--drive .zen-search-item-data__icon {
  width: 44px;
  height: 44px;
}
.zen-search-item-data-wrapper--drive-tablet .zen-search-item-data__name {
  font-family: var(--main-font);
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  letter-spacing: 0.16px;
  line-height: 22px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .zen-search-item-data-wrapper--drive-tablet .zen-search-item-data__name {
  font-family: var(--arabic-font-family);
}
.zen-search-item-data-wrapper--drive-tablet .zen-search-item-data__secondary {
  font-family: var(--main-font);
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.32px;
  line-height: 22px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .zen-search-item-data-wrapper--drive-tablet .zen-search-item-data__secondary {
  font-family: var(--arabic-font-family);
}
.zen-search-item-data-wrapper--drive-tablet .zen-search-item-data__close {
  height: 44px;
  width: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.zen-search-item-data-wrapper--drive-tablet .zen-search-item-data__icon {
  width: 44px;
  height: 44px;
}
.zen-search-item-data-wrapper--mobile .zen-search-item-data__name {
  font-family: var(--main-font);
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  letter-spacing: 0.16px;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .zen-search-item-data-wrapper--mobile .zen-search-item-data__name {
  font-family: var(--arabic-font-family);
}
.zen-search-item-data-wrapper--mobile .zen-search-item-data__secondary {
  font-family: var(--main-font);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .zen-search-item-data-wrapper--mobile .zen-search-item-data__secondary {
  font-family: var(--arabic-font-family);
}
.zen-search-item-data-wrapper--mobile .zen-search-item-data__close {
  height: 44px;
  width: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.zen-search-item-data-wrapper--mobile .zen-search-item-data__icon {
  width: 44px;
  height: 44px;
}
.zen-page-header {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  background-color: var(--backgrounds-main);
  border-bottom: 1px solid var(--borders-general);
  padding-bottom: 16px;
}
.zen-page-header * {
  box-sizing: border-box;
}
.zen-page-header__main-line {
  display: flex;
  justify-content: space-between;
  padding: 16px 16px 0 16px;
  align-items: center;
  height: 61px;
  margin-right: 4px;
  margin-left: 4px;
}
.zen-page-header__page-name {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-wrap: normal;
  font-family: var(--main-font);
  font-size: 28px;
  font-style: normal;
  font-weight: 300;
  letter-spacing: 0;
  line-height: 36px;
  text-transform: none;
  text-decoration: none;
  max-width: 656px;
  padding: 0px;
  margin: 0px;
  color: var(--text-primary);
  flex: 0 1 auto;
}
html:lang(ar) .zen-page-header__page-name {
  font-family: var(--arabic-font-family);
}
.zen-page-header__page-name.zen-page-header__page-name--drive-tablet {
  font-family: var(--main-font);
  font-size: 26px;
  font-style: normal;
  font-weight: 300;
  letter-spacing: 0;
  line-height: 34px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .zen-page-header__page-name.zen-page-header__page-name--drive-tablet {
  font-family: var(--arabic-font-family);
}
.zen-page-header__beta {
  flex: 0 0 auto;
}
.zen-page-header__left-aligned-tool {
  margin-right: auto;
  margin-left: 6px;
}
.zen-page-header__sub-line {
  align-items: flex-start;
  padding: 0 16px;
}
.zen-page-header__page-tools {
  display: flex;
  align-items: center;
  margin-left: 1rem;
}
.zen-page-header--new {
  gap: 16px;
  padding: 0;
  border-bottom: 0px solid transparent;
  background-color: var(--backgrounds-main);
}
.zen-page-header--new .zen-page-header__page-name {
  font-family: var(--main-font);
  font-size: 28px;
  font-style: normal;
  font-weight: 300;
  letter-spacing: 0;
  line-height: 36px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .zen-page-header--new .zen-page-header__page-name {
  font-family: var(--arabic-font-family);
}
.zen-page-header--new .zen-page-header__page-name.zen-page-header__page-name--drive-tablet {
  font-family: var(--main-font);
  font-size: 26px;
  font-style: normal;
  font-weight: 300;
  letter-spacing: 0;
  line-height: 34px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .zen-page-header--new .zen-page-header__page-name.zen-page-header__page-name--drive-tablet {
  font-family: var(--arabic-font-family);
}
.zen-page-header--new .zen-page-header__main-line {
  font-family: var(--main-font);
  font-size: 14px;
  font-style: normal;
  font-weight: 300;
  letter-spacing: 0.16px;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
  display: flex;
  gap: 16px;
  padding: 0;
  height: 56px;
  color: var(--text-primary);
}
html:lang(ar) .zen-page-header--new .zen-page-header__main-line {
  font-family: var(--arabic-font-family);
}
.zen-page-header--new .zen-page-header__main-line .zen-page-bookmark {
  padding: 8px;
}
.zen-page-header--new .zen-page-header__main-line--drive-tablet .zen-page-bookmark {
  padding: 13px;
}
.zen-page-header--new .zen-page-header__main-line--drive .zen-page-bookmark {
  padding: 12px;
}
.zen-page-header--mobile .zen-page-header__main-line {
  gap: 4px;
}
.zen-page-header--mobile .zen-page-header__page-name {
  max-width: 180px;
  min-width: 50px;
  flex: 1 1 min-content;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  white-space: initial;
  font-family: var(--main-font);
  font-size: 18px;
  font-style: normal;
  font-weight: 300;
  letter-spacing: 0;
  line-height: 28px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .zen-page-header--mobile .zen-page-header__page-name {
  font-family: var(--arabic-font-family);
}
.zen-page-header--mobile .zen-page-header__page-name.zen-page-header__page-name--drive {
  font-family: var(--main-font);
  font-size: 18px;
  font-style: normal;
  font-weight: 300;
  letter-spacing: 0;
  line-height: 24px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .zen-page-header--mobile .zen-page-header__page-name.zen-page-header__page-name--drive {
  font-family: var(--arabic-font-family);
}
.zen-page-header--mobile .zen-page-header__page-name.zen-page-header__page-name--drive-tablet {
  font-family: var(--main-font);
  font-size: 20px;
  font-style: normal;
  font-weight: 300;
  letter-spacing: 0;
  line-height: 26px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .zen-page-header--mobile .zen-page-header__page-name.zen-page-header__page-name--drive-tablet {
  font-family: var(--arabic-font-family);
}
.zen-page-header--mobile .zen-page-header__main-line {
  justify-content: initial;
}
.zen-tabs {
  box-sizing: border-box;
  width: 100%;
  position: relative;
  height: 36px;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  border-bottom: 1px solid var(--borders-general);
}
.zen-tabs * {
  box-sizing: border-box;
}
.zen-tabs__tabs-container {
  display: flex;
  justify-content: flex-start;
  overflow: hidden;
  flex-grow: 1;
  align-items: baseline;
  position: relative;
}
.zen-tabs__scrollable {
  display: flex;
  overflow-x: auto;
  overflow-y: hidden;
  scrollbar-width: none;
  -ms-overflow-style: none;
  padding: 1px;
}
.zen-tabs__scrollable::-webkit-scrollbar {
  display: none;
}
.zen-tabs__scroller {
  display: none;
  flex: 0 0 auto;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  padding: 8px;
  align-self: center;
  position: absolute;
  background-color: var(--backgrounds-main);
  border-bottom: 1px solid var(--borders-general);
}
.zen-tabs__scroller:focus-visible {
  outline: none;
  border: 1px solid var(--borders-form-field--active);
}
.zen-tabs__gradient--right::before {
  position: absolute;
  content: "";
  height: calc(36px - 2px);
  width: 40px;
  top: 0;
  right: calc(36px - 6px);
  background: linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, var(--backgrounds-content-0) 100%);
}
.zen-tabs__gradient--right::after {
  position: absolute;
  content: "";
  height: 36px;
  width: calc(36px + 1px);
  top: 0;
  right: -1px;
  background-color: var(--backgrounds-main);
}
.zen-tabs__gradient--left::before {
  position: absolute;
  content: "";
  height: 36px;
  width: calc(36px + 1px);
  top: 0;
  left: -1px;
  background-color: var(--backgrounds-main);
}
.zen-tabs__gradient--left::after {
  position: absolute;
  content: "";
  height: calc(36px - 2px);
  width: 40px;
  top: 0;
  left: calc(36px - 6px);
  background: linear-gradient(270deg, rgba(255, 255, 255, 0) 0%, var(--backgrounds-content-0) 100%);
}
.zen-tabs__start {
  margin-right: 8px;
  bottom: 0;
  left: 0px;
}
.zen-tabs__start-icon {
  transform: rotate(180deg);
}
.zen-tabs__end {
  margin-left: 8px;
  bottom: 0;
  right: 0px;
}
.zen-tabs__tabs {
  display: flex;
  flex-shrink: 1;
  align-items: center;
}
.zen-tabs--transparent .zen-tabs__element {
  background-color: transparent;
}
.zen-tabs--borderless {
  border-bottom-width: 0;
}
.zen-tabs__tab-item {
  margin: 0 1px;
}
.zen-tabs__arrow-button {
  fill: var(--action-secondary--default);
}
.zen-tabs.zen-tabs--mobile {
  height: 46px;
}
.zen-tabs .zen-tabs__scroller.zen-tabs__scroller--mobile {
  width: 46px;
  height: 46px;
}
.zen-tabs .zen-tabs__gradient.zen-tabs__gradient--mobile.zen-tabs__gradient--left::after {
  position: absolute;
  content: "";
  height: calc(46px - 2px);
  width: 50px;
  top: 0;
  left: calc(46px - 8px);
  background: linear-gradient(270deg, rgba(255, 255, 255, 0) 0%, var(--backgrounds-content-0) 100%);
}
.zen-tabs .zen-tabs__gradient.zen-tabs__gradient--mobile.zen-tabs__gradient--right::before {
  position: absolute;
  content: "";
  height: calc(46px - 2px);
  width: 50px;
  top: 0;
  right: calc(46px - 8px);
  background: linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, var(--backgrounds-content-0) 100%);
}
.zen-tabs.zen-tabs--drive,
.zen-tabs.zen-tabs--drive-tablet {
  height: 48px;
}
.zen-tabs .zen-tabs__scroller.zen-tabs__scroller--drive,
.zen-tabs .zen-tabs__scroller.zen-tabs__scroller--drive-tablet {
  width: 48px;
  height: 48px;
}
.zen-tabs .zen-tabs__gradient.zen-tabs__gradient--drive.zen-tabs__gradient--left::after,
.zen-tabs .zen-tabs__gradient.zen-tabs__gradient--drive-tablet.zen-tabs__gradient--left::after {
  position: absolute;
  content: "";
  height: calc(48px - 2px);
  width: 52px;
  top: 0;
  left: calc(48px - 8px);
  background: linear-gradient(270deg, rgba(255, 255, 255, 0) 0%, var(--backgrounds-content-0) 100%);
}
.zen-tabs .zen-tabs__gradient.zen-tabs__gradient--drive.zen-tabs__gradient--right::before,
.zen-tabs .zen-tabs__gradient.zen-tabs__gradient--drive-tablet.zen-tabs__gradient--right::before {
  position: absolute;
  content: "";
  height: calc(48px - 2px);
  width: 52px;
  top: 0;
  right: calc(48px - 8px);
  background: linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, var(--backgrounds-content-0) 100%);
}
.zen-tab-item {
  box-sizing: border-box;
  font-family: var(--main-font);
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.32px;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
  display: inline-block;
  padding: 5px 16px 4px;
  height: 34px;
  border: none;
  border-bottom: 3px solid transparent;
  background-color: transparent;
  color: var(--text-secondary);
  fill: var(--text-secondary);
  cursor: pointer;
}
.zen-tab-item * {
  box-sizing: border-box;
}
html:lang(ar) .zen-tab-item {
  font-family: var(--arabic-font-family);
}
.zen-tab-item--active {
  color: var(--text-hyperlink);
  border-bottom: 3px solid var(--borders-form-field--active);
}
.zen-tab-item--hidden {
  display: none;
}
.zen-tab-item--invisible {
  visibility: hidden;
}
.zen-tab-item:hover,
.zen-tab-item:focus {
  color: var(--text-hyperlink);
  fill: var(--action-primary--default);
}
.zen-tab-item__content {
  display: flex;
  align-items: center;
}
.zen-tab-item__content-quantity {
  font-family: var(--main-font);
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.32px;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
  background-color: var(--action-primary--default);
  color: var(--text-reverse-primary);
  min-width: 16px;
  border-radius: 16px;
  padding: 0px 4px;
  margin-left: 8px;
}
html:lang(ar) .zen-tab-item__content-quantity {
  font-family: var(--arabic-font-family);
}
.zen-tab-item__content-icon {
  display: flex;
  align-items: center;
  margin-right: 10px;
  max-height: 16px;
}
.zen-tab-item__content-icon--active {
  fill: var(--action-primary--default);
}
.zen-tab-item__content-text {
  font-family: var(--main-font);
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.32px;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-wrap: normal;
  max-width: 130px;
}
html:lang(ar) .zen-tab-item__content-text {
  font-family: var(--arabic-font-family);
}
.zen-tab-item.zen-tab-item--mobile {
  font-family: var(--main-font);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
  height: 44px;
}
html:lang(ar) .zen-tab-item.zen-tab-item--mobile {
  font-family: var(--arabic-font-family);
}
.zen-tab-item.zen-tab-item--mobile .zen-tab-item__content-text {
  font-family: var(--main-font);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .zen-tab-item.zen-tab-item--mobile .zen-tab-item__content-text {
  font-family: var(--arabic-font-family);
}
.zen-tab-item.zen-tab-item--mobile .zen-tab-item__content-icon {
  max-height: 20px;
}
.zen-tab-item.zen-tab-item--drive,
.zen-tab-item.zen-tab-item--drive-tablet {
  height: 46px;
}
.zen-tab-item.zen-tab-item--drive .zen-tab-item__content-icon,
.zen-tab-item.zen-tab-item--drive-tablet .zen-tab-item__content-icon {
  max-height: 20px;
}
.zen-tab-item.zen-tab-item--drive {
  font-family: var(--main-font);
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 20px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .zen-tab-item.zen-tab-item--drive {
  font-family: var(--arabic-font-family);
}
.zen-tab-item.zen-tab-item--drive .zen-tab-item__content-text {
  font-family: var(--main-font);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.32px;
  line-height: 18px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .zen-tab-item.zen-tab-item--drive .zen-tab-item__content-text {
  font-family: var(--arabic-font-family);
}
.zen-tab-item.zen-tab-item--drive-tablet {
  font-family: var(--main-font);
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 22px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .zen-tab-item.zen-tab-item--drive-tablet {
  font-family: var(--arabic-font-family);
}
.zen-tab-item.zen-tab-item--drive-tablet .zen-tab-item__content-text {
  font-family: var(--main-font);
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.32px;
  line-height: 18px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .zen-tab-item.zen-tab-item--drive-tablet .zen-tab-item__content-text {
  font-family: var(--arabic-font-family);
}
.zen-tab-item:focus-visible {
  outline: none;
  box-shadow: 0 0 0 1px var(--borders-form-field--active), 0 0 0 2px var(--backgrounds-main);
}
.zen-filters-toolbar {
  box-sizing: border-box;
  display: flex;
  justify-content: flex-start;
  height: 56px;
  align-items: center;
  border-bottom: 1px solid var(--borders-general);
  background-color: var(--backgrounds-main);
  padding: 0 20px;
  position: relative;
  gap: 8px;
}
.zen-filters-toolbar * {
  box-sizing: border-box;
}
.zen-filters-toolbar__filters-container {
  display: flex;
  justify-content: flex-start;
  overflow: hidden;
  height: 100%;
  align-items: center;
  position: relative;
}
.zen-filters-toolbar__filters-container--none .zen-filters-toolbar__filters {
  margin-left: 4px;
  margin-right: 4px;
}
.zen-filters-toolbar__filters-container--start .zen-filters-toolbar__filters .zen-filters-toolbar__filters-item:last-of-type {
  padding-right: 4px;
}
.zen-filters-toolbar__filters-container--end .zen-filters-toolbar__filters {
  margin-left: 4px;
}
.zen-filters-toolbar__scrollable {
  display: flex;
  overflow-x: auto;
  overflow-y: hidden;
  height: 100%;
  scrollbar-width: none;
  -ms-overflow-style: none;
  transition: margin-left 300ms ease-in-out, margin-right 300ms ease-in-out;
  margin-left: 0;
  margin-right: 0;
}
.zen-filters-toolbar__scrollable.has-left-scroller {
  margin-left: 48px;
}
.zen-filters-toolbar__scrollable.has-right-scroller {
  margin-right: 48px;
}
.zen-filters-toolbar__scrollable::-webkit-scrollbar {
  display: none;
}
.zen-filters-toolbar__scroller {
  flex: 0 0 auto;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  padding: 8px;
  opacity: 0;
  transition: opacity 300ms ease;
  position: absolute;
}
.zen-filters-toolbar__scroller--visible {
  opacity: 1;
}
.zen-filters-toolbar__scroller--hidden {
  display: none !important;
}
.zen-filters-toolbar__gradient {
  opacity: 0;
  transition: opacity 300ms ease;
}
.zen-filters-toolbar__gradient--right::before {
  position: absolute;
  content: "";
  margin-left: -40px;
  height: 100%;
  top: 0;
  width: 40px;
  background: linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, var(--backgrounds-content-0) 100%);
}
.zen-filters-toolbar__gradient--left::after {
  position: absolute;
  content: "";
  margin-left: 40px;
  height: 100%;
  top: 0;
  width: 40px;
  background: linear-gradient(270deg, rgba(255, 255, 255, 0) 0%, var(--backgrounds-content-0) 100%);
}
.zen-filters-toolbar__gradient--visible {
  display: block;
  opacity: 1;
}
.zen-filters-toolbar__gradient--hidden {
  display: none;
}
.zen-filters-toolbar__start {
  margin-inline-end: 8px;
  margin-left: 4px;
  left: 0;
}
.zen-filters-toolbar__start-icon {
  transform: rotate(180deg);
}
.zen-filters-toolbar__end {
  margin-inline-start: 8px;
  margin-right: 4px;
  right: 0;
}
.zen-filters-toolbar__filters {
  display: flex;
  flex-shrink: 1;
  align-items: center;
  gap: 8px;
}
.zen-filters-toolbar__filters-item {
  flex-shrink: 0;
}
.zen-filters-toolbar__filters-item--inactive {
  display: none;
}
.zen-filters-toolbar__actions {
  flex-shrink: 0;
  display: flex;
  gap: 8px;
}
.zen-filters-toolbar__action-label {
  font-family: var(--main-font);
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.32px;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .zen-filters-toolbar__action-label {
  font-family: var(--arabic-font-family);
}
.zen-filters-toolbar__action-quantity {
  font-family: var(--main-font);
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.32px;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
  min-width: 16px;
  border-radius: 16px;
  background-color: var(--action-primary--default);
  color: var(--text-reverse-primary);
  margin-left: 6px;
  padding: 0px 4px;
}
html:lang(ar) .zen-filters-toolbar__action-quantity {
  font-family: var(--arabic-font-family);
}
.zen-filters-toolbar__reset {
  display: none;
}
.zen-filters-toolbar--colored {
  background-color: var(--backgrounds-content-0);
}
.zen-filters-toolbar--no-actions {
  gap: 0;
}
.zen-filters-toolbar--start-scrollable .zen-filters-toolbar__start {
  display: flex;
}
.zen-filters-toolbar--end-scrollable .zen-filters-toolbar__end {
  display: flex;
}
.zen-filters-toolbar--with-filters .zen-filters-toolbar__reset {
  display: block;
}
.zen-filters-toolbar__scroller.zen-filters-toolbar__scroller--drive,
.zen-filters-toolbar__scroller.zen-filters-toolbar__scroller--drive-tablet {
  width: 46px;
  height: 46px;
}
.zen-filters-toolbar__gradient.zen-filters-toolbar__gradient--drive.zen-filters-toolbar__gradient--left::after,
.zen-filters-toolbar__gradient.zen-filters-toolbar__gradient--drive-tablet.zen-filters-toolbar__gradient--left::after {
  position: absolute;
  content: "";
  margin-left: calc(52px + 4px);
  height: 100%;
  top: 0;
  width: 52px;
  z-index: 1000;
  background: linear-gradient(270deg, rgba(255, 255, 255, 0) 0%, var(--backgrounds-content-0) 100%);
}
.zen-filters-toolbar__gradient.zen-filters-toolbar__gradient--drive.zen-filters-toolbar__gradient--right::before,
.zen-filters-toolbar__gradient.zen-filters-toolbar__gradient--drive-tablet.zen-filters-toolbar__gradient--right::before {
  position: absolute;
  content: "";
  margin-left: -52px;
  height: 100%;
  top: 0;
  width: 52px;
  background: linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, var(--backgrounds-content-0) 100%);
}
.zen-side-panel-parent--open {
  max-height: 100vh;
  overflow-y: hidden;
}
.zen-filters-bar-dropdown {
  box-sizing: border-box;
}
.zen-filters-bar-dropdown * {
  box-sizing: border-box;
}
.zen-filters-bar-dropdown--side-panel.zen-filters-bar-dropdown--side-panel {
  max-width: 100%;
}
.zen-filters-bar-dropdown--toolbar {
  max-width: 180px;
}
.zen-filters-bar-dropdown__pill-box {
  margin-top: 8px;
}
.zen-side-panel-radio-group {
  box-sizing: border-box;
}
.zen-side-panel-radio-group * {
  box-sizing: border-box;
}
.zen-side-panel-radio-group__item {
  padding: 0;
}
.zen-side-panel-radio-group .zen-radio-group__item {
  padding: 8px 0;
}
.zen-side-panel-radio-group .zen-radio__label {
  margin-left: 8px;
}
.zen-side-panel-checkbox-group {
  box-sizing: border-box;
}
.zen-side-panel-checkbox-group * {
  box-sizing: border-box;
}
.zen-side-panel-checkbox-group__checkbox {
  padding: 8px 0;
}
.zen-side-panel-checkbox-group .zen-checkbox__label-text {
  margin-left: 8px;
}
.zen-filters-bar-groups-filter--side-panel .zen-side-panel-cell__content {
  max-width: 420px;
}
.zen-range-field {
  box-sizing: border-box;
  font-family: var(--main-font);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
  width: 100%;
}
.zen-range-field * {
  box-sizing: border-box;
}
html:lang(ar) .zen-range-field {
  font-family: var(--arabic-font-family);
}
.zen-range-field--column {
  display: contents;
}
.zen-range-field--column.zen-range-field--min .zen-range-field__label {
  grid-column: 1;
  grid-row: 1;
}
.zen-range-field--column.zen-range-field--min .zen-range-field__input-container {
  grid-column: 2;
  grid-row: 1;
}
.zen-range-field--column.zen-range-field--min .zen-range-field__sense {
  grid-column: 3;
  grid-row: 1;
}
.zen-range-field--column.zen-range-field--min .zen-range-field__error {
  grid-column: 1 / span 3;
  grid-row: 2;
  min-height: 1.5rem;
}
.zen-range-field--column.zen-range-field--max .zen-range-field__label {
  grid-column: 1;
  grid-row: 3;
}
.zen-range-field--column.zen-range-field--max .zen-range-field__input-container {
  grid-column: 2;
  grid-row: 3;
}
.zen-range-field--column.zen-range-field--max .zen-range-field__sense {
  grid-column: 3;
  grid-row: 3;
}
.zen-range-field--column.zen-range-field--max .zen-range-field__error {
  grid-column: 1 / span 3;
  grid-row: 4;
  min-height: 1.5rem;
}
.zen-range-field--column .zen-range-field__label {
  min-width: 1.75rem;
  max-width: 3.5rem;
}
.zen-range-field--column .zen-range-field__input-container {
  width: 100%;
}
.zen-range-field--column .zen-range-field__sense {
  min-width: 1.75rem;
  max-width: 3.5rem;
}
.zen-range-field--row .zen-range-field__label {
  max-width: 2rem;
  min-width: 1.5rem;
}
.zen-range-field--row .zen-range-field__input-container {
  max-width: 4rem;
  min-width: 4rem;
}
.zen-range-field--row .zen-range-field__sense {
  max-width: 2rem;
  min-width: 1.5rem;
}
.zen-range-field--row.zen-range-field--min {
  display: contents;
}
.zen-range-field--row.zen-range-field--min .zen-range-field__label {
  grid-column: 1;
  grid-row: 1;
}
.zen-range-field--row.zen-range-field--min .zen-range-field__input-container {
  grid-column: 2;
  grid-row: 1;
}
.zen-range-field--row.zen-range-field--min .zen-range-field__sense {
  grid-column: 3;
  grid-row: 1;
}
.zen-range-field--row.zen-range-field--min .zen-range-field__error {
  grid-column: 1 / span 3;
  grid-row: 2;
}
.zen-range-field--row.zen-range-field--max {
  display: contents;
}
.zen-range-field--row.zen-range-field--max .zen-range-field__label {
  grid-column: 4;
  grid-row: 1;
}
.zen-range-field--row.zen-range-field--max .zen-range-field__input-container {
  grid-column: 5;
  grid-row: 1;
}
.zen-range-field--row.zen-range-field--max .zen-range-field__sense {
  grid-column: 6;
  grid-row: 1;
}
.zen-range-field--row.zen-range-field--max .zen-range-field__error {
  grid-column: 4 / span 3;
  grid-row: 2;
}
.zen-range-field__content {
  display: contents;
}
.zen-range-field__error {
  display: flex;
  font-family: var(--main-font);
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.32px;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
  color: var(--text-error-message);
  fill: var(--text-error-message);
  margin-top: 0.25rem;
}
html:lang(ar) .zen-range-field__error {
  font-family: var(--arabic-font-family);
}
.zen-range-field__error-text {
  margin-inline-start: 0.125rem;
}
.zen-range-field__label {
  font-family: var(--main-font);
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.32px;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
  color: var(--text-primary);
  flex-shrink: 0;
}
html:lang(ar) .zen-range-field__label {
  font-family: var(--arabic-font-family);
}
.zen-range-field__label--mobile {
  font-family: var(--main-font);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .zen-range-field__label--mobile {
  font-family: var(--arabic-font-family);
}
.zen-range-field__input {
  height: 2rem;
}
.zen-range-field__input::-webkit-inner-spin-button,
.zen-range-field__input::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.zen-range-field__input--mobile {
  height: 2.75rem;
}
.zen-range-field .zen-range-field__input:focus {
  border: var(--border-width-default) solid var(--borders-form-field--active);
}
.zen-range-field__sense {
  font-family: var(--main-font);
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.32px;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
  color: var(--text-primary);
  text-align: right;
}
html:lang(ar) .zen-range-field__sense {
  font-family: var(--arabic-font-family);
}
.zen-range-field__sense--mobile {
  font-family: var(--main-font);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .zen-range-field__sense--mobile {
  font-family: var(--arabic-font-family);
}
.zen-range-field__sense-text {
  text-align: start;
}
.zen-range-field .zen-range-field__input {
  appearance: textfield;
}
.zen-range {
  box-sizing: border-box;
  font-family: var(--main-font);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
}
.zen-range * {
  box-sizing: border-box;
}
html:lang(ar) .zen-range {
  font-family: var(--arabic-font-family);
}
.zen-range__fields-wrapper {
  padding: 0.75rem 1rem;
}
.zen-range__fields-container {
  display: grid;
}
.zen-range__fields-container--row {
  min-width: 18.5rem;
  max-width: 20.5rem;
  display: grid;
  align-items: center;
  justify-items: start;
  grid-template-columns: minmax(1.5rem, 2rem) minmax(4rem, 4rem) minmax(1.5rem, 2rem) minmax(1.5rem, 2rem) minmax(4rem, 4rem) minmax(1.5rem, 2rem);
  row-gap: 0.25rem;
  column-gap: 0.5rem;
}
.zen-range__fields-container--column {
  min-width: 12.5rem;
  max-width: 14.25rem;
  display: grid;
  grid-template-columns: minmax(min-content, auto) minmax(auto, 168px) minmax(0, auto);
  grid-template-rows: auto auto;
  gap: 0.25rem 0.5rem;
  align-items: center;
  justify-items: start;
}
.zen-range__trigger-button {
  max-width: 12.5rem;
}
.zen-range__content {
  display: grid;
  margin: 0;
  padding: 0.25rem 0 0;
}
.zen-range__label {
  width: 100%;
  height: 2.5rem;
  font-family: var(--main-font);
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.32px;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
  color: var(--text-secondary);
  padding: 0.75rem 1rem 0.6875rem 1rem;
  border-bottom: 1px solid var(--backgrounds-content-1);
}
html:lang(ar) .zen-range__label {
  font-family: var(--arabic-font-family);
}
.zen-range__trigger-button-text {
  color: var(--text-nav-highlight);
}
.zen-range__button-group {
  display: inline-flex;
  flex-grow: 1;
  justify-content: flex-end;
}
.zen-range__footer {
  display: flex;
  justify-content: flex-start;
  border-top: var(--border-width-default) solid var(--borders-general);
}
.zen-range__clear-button,
.zen-range__cancel-button,
.zen-range__apply-button {
  margin-inline-end: 0.5rem;
  margin-top: 0.5rem;
  margin-bottom: 0.25rem;
}
.zen-range__clear-button {
  margin-inline-start: 0.5rem;
}
.zen-range--error .zen-range__trigger-button {
  border: 1px solid var(--text-error-message);
}
.zen-range__mobile-sheet .zen-range__clear-button,
.zen-range__mobile-sheet .zen-range__cancel-button,
.zen-range__mobile-sheet .zen-range__apply-button {
  margin: 0;
}
.zen-range-popup.zen-range-popup {
  font-family: var(--main-font);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
  background-color: var(--backgrounds-main);
  z-index: 11002;
}
html:lang(ar) .zen-range-popup.zen-range-popup {
  font-family: var(--arabic-font-family);
}
.zen-filters-bar-side-panel-range__items-container {
  display: grid;
}
.zen-filters-bar-side-panel-range__items-container--column {
  min-width: 136px;
  max-width: 258px;
  display: grid;
  grid-template-columns: minmax(min-content, auto) minmax(auto, 168px) minmax(0, auto);
  grid-template-rows: auto auto;
  gap: 0.25rem 0.5rem;
  align-items: center;
  justify-items: start;
}
.zen-filters-bar-side-panel-range__items-container--row {
  max-width: 296px;
  display: grid;
  align-items: center;
  justify-items: start;
  grid-template-columns: minmax(1.5rem, 2rem) minmax(4rem, 4rem) minmax(1.5rem, 2rem) minmax(1.5rem, 2rem) minmax(4rem, 4rem) minmax(1.5rem, 2rem);
  row-gap: 0.25rem;
  column-gap: 0.5rem;
}
.zen-filters-bar-side-panel-range__item--column {
  min-width: 136px;
  min-height: 32px;
  max-width: 258px;
}
.zen-filters-bar-side-panel-range__item--row {
  min-width: 128px;
  min-height: 32px;
  max-width: 144px;
}
.zen-filters-bar-date-input {
  box-sizing: border-box;
}
.zen-filters-bar-date-input * {
  box-sizing: border-box;
}
.zen-filters-bar-date-input--full-width {
  width: 100%;
  justify-content: center;
}
.zen-filters-bar-date-input--full-width .zen-caption__content {
  margin: 0;
}
.zen-filters-bar-date-input__popup--full-width.zen-filters-bar-date-input__popup--full-width {
  width: 288px;
}
.zen-header-button--with-dropdown.zen-header-button--mobile .zen-caption__pre-content,
.zen-header-button--with-dropdown.zen-header-button--hidden-name .zen-caption__pre-content {
  margin-right: 0;
}
.zen-header-button--with-dropdown.zen-header-button-with-dropdown--drive-tablet {
  padding-top: 12px;
  padding-bottom: 12px;
}
.zen-filters-saved-popup__content {
  margin: 1px;
  font-family: var(--main-font);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .zen-filters-saved-popup__content {
  font-family: var(--arabic-font-family);
}
.zen-filters-saved-popup__content .zen-filters-saved-popup__action-button {
  width: 100%;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  height: 40px;
  padding: 12px;
  cursor: pointer;
  background-color: transparent;
  color: var(--text-primary);
  fill: var(--text-primary);
  border: none;
  gap: 8px;
  border-bottom: var(--border-width-default) solid var(--borders-general);
}
.zen-filters-saved-popup__content .zen-filters-saved-popup__action-button:focus-visible {
  outline: 1px solid var(--borders-form-field--active);
}
.zen-filters-saved-popup__content .zen-filters-saved-popup__action-button:hover {
  background-color: var(--backgrounds-content-1);
}
.zen-filters-saved-popup__content ul {
  margin: 0;
  padding: 0;
  list-style: none;
}
.zen-filters-saved-popup__content .zen-filters-saved-popup__item {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-between;
  height: 40px;
  padding: 0 6px 0 0;
  position: relative;
  margin: 1px;
}
.zen-filters-saved-popup__content .zen-filters-saved-popup__item--active {
  background-color: var(--accents-general--main);
}
.zen-filters-saved-popup__content .zen-filters-saved-popup__item:focus-within {
  outline: 1px solid var(--borders-form-field--active);
  border-radius: var(--border-radius-default);
}
.zen-filters-saved-popup__content .zen-filters-saved-popup__close-button {
  height: 32px;
  fill: var(--text-secondary);
}
.zen-filters-saved-popup__content .zen-filters-saved-popup__close-button:focus-visible {
  outline: 1px solid var(--borders-form-field--active);
}
.zen-filters-saved-popup__content .zen-filters-saved-popup__name {
  background: none;
  border: none;
  color: var(--text-primary);
  flex-grow: 1;
  text-align: left;
  cursor: pointer;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-wrap: normal;
  font-family: var(--main-font);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
  height: 100%;
  padding: 6px;
  display: flex;
  align-items: center;
  outline: none;
}
html:lang(ar) .zen-filters-saved-popup__content .zen-filters-saved-popup__name {
  font-family: var(--arabic-font-family);
}
.zen-filters-saved-popup__content .zen-filters-saved-popup__name:hover {
  background-color: var(--backgrounds-content-1);
}
.zen-filters-saved-popup__content .zen-filters-saved-popup__name--selected {
  cursor: default;
}
.zen-filters-saved-popup__content .zen-filters-saved-popup__name--selected:hover {
  background-color: transparent;
}
.zen-filters-saved-popup__content .zen-filters-saved-popup__name .zen-filters-saved-popup__action {
  padding: 6px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.zen-filters-saved-popup__content .zen-filters-saved-popup__name .zen-filters-saved-popup__action:hover {
  background-color: var(--backgrounds-content-2);
}
.zen-filters-saved-popup__content.zen-filters-saved-popup__content--drive,
.zen-filters-saved-popup__content.zen-filters-saved-popup__content--drive-tablet {
  font-family: var(--main-font);
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 20px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .zen-filters-saved-popup__content.zen-filters-saved-popup__content--drive,
html:lang(ar) .zen-filters-saved-popup__content.zen-filters-saved-popup__content--drive-tablet {
  font-family: var(--arabic-font-family);
}
.zen-filters-saved-popup__content.zen-filters-saved-popup__content--drive .zen-filters-saved-popup__action-button,
.zen-filters-saved-popup__content.zen-filters-saved-popup__content--drive-tablet .zen-filters-saved-popup__action-button {
  height: 60px;
  padding: 16px;
  font-family: var(--main-font);
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 20px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .zen-filters-saved-popup__content.zen-filters-saved-popup__content--drive .zen-filters-saved-popup__action-button,
html:lang(ar) .zen-filters-saved-popup__content.zen-filters-saved-popup__content--drive-tablet .zen-filters-saved-popup__action-button {
  font-family: var(--arabic-font-family);
}
.zen-filters-saved-popup__content.zen-filters-saved-popup__content--drive .zen-filters-saved-popup__item,
.zen-filters-saved-popup__content.zen-filters-saved-popup__content--drive-tablet .zen-filters-saved-popup__item {
  height: 60px;
}
.zen-filters-saved-popup__content.zen-filters-saved-popup__content--drive .zen-filters-saved-popup__name,
.zen-filters-saved-popup__content.zen-filters-saved-popup__content--drive-tablet .zen-filters-saved-popup__name {
  padding: 10px 10px 10px 16px;
}
.zen-filters-saved-popup__content.zen-filters-saved-popup__content--drive .zen-filters-saved-popup__close-button,
.zen-filters-saved-popup__content.zen-filters-saved-popup__content--drive-tablet .zen-filters-saved-popup__close-button {
  height: 44px;
}
.zen-filters-saved-popup__content.zen-filters-saved-popup__content--mobile {
  font-family: var(--main-font);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .zen-filters-saved-popup__content.zen-filters-saved-popup__content--mobile {
  font-family: var(--arabic-font-family);
}
.zen-filters-saved-popup__content.zen-filters-saved-popup__content--mobile .zen-filters-saved-popup__action-button {
  height: 60px;
  padding: 16px;
  font-family: var(--main-font);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .zen-filters-saved-popup__content.zen-filters-saved-popup__content--mobile .zen-filters-saved-popup__action-button {
  font-family: var(--arabic-font-family);
}
.zen-filters-saved-popup__content.zen-filters-saved-popup__content--mobile .zen-filters-saved-popup__item {
  height: 60px;
}
.zen-filters-saved-popup__content.zen-filters-saved-popup__content--mobile .zen-filters-saved-popup__name {
  padding: 10px 10px 10px 16px;
}
.zen-filters-saved-popup__content.zen-filters-saved-popup__content--mobile .zen-filters-saved-popup__close-button {
  height: 44px;
}
.zen-filters-modal__content {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
}
.zen-filters-prioritized-modal {
  z-index: 11011;
}
.zen-filters-search {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  max-width: 100%;
  flex-grow: 1;
  margin: 0 12px;
}
.zen-filters-search__selected {
  display: flex;
  gap: 8px;
  flex-wrap: nowrap;
  align-items: center;
  margin-left: 8px;
  overflow: hidden;
}
.zen-filters-search__selected-item {
  max-width: 181px;
}
.zen-filters-search__selected-item--more {
  flex-shrink: 0;
}
.zen-filters-search.zen-filters-popup__search-with-pills.zen-filters-search--mobile {
  margin: 0;
  padding: 0 12px;
  border: var(--border-width-default) solid var(--borders-general);
  border-radius: var(--border-radius-default);
}
.zen-filters-search.zen-filters-popup__search-with-pills.zen-filters-search--mobile .zen-filters-search__selected {
  flex-shrink: 0;
}
.zen-side-panel-filters {
  box-sizing: border-box;
  border-radius: var(--border-radius-default);
}
.zen-side-panel-filters * {
  box-sizing: border-box;
}
.zen-side-panel-filters__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 64px;
  padding: 16px;
}
.zen-side-panel-filters__header-buttons {
  display: flex;
  gap: 4px;
  align-items: center;
  justify-content: flex-end;
}
.zen-side-panel-filters__header-button {
  cursor: pointer;
  border: none;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.zen-side-panel-filters__header-button:hover {
  border: none;
}
.zen-side-panel-filters__header-button--active {
  color: var(--text-reverse-primary);
  fill: var(--text-reverse-primary);
  border-color: var(--action-primary--active);
  background-color: var(--action-primary--active);
}
.zen-side-panel-filters__header-button--active:hover {
  color: var(--text-reverse-primary);
  fill: var(--text-reverse-primary);
  border-color: var(--accents-general--detail);
  background-color: var(--action-primary--active);
}
.zen-side-panel-filters__header-buttons--mobile .zen-side-panel-filters__header-button {
  padding: 12px;
}
.zen-side-panel-filters__title-wrapper {
  display: flex;
  flex-wrap: nowrap;
  gap: 16px;
}
.zen-side-panel-filters__title {
  padding: 8px 0;
  font-family: var(--main-font);
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  letter-spacing: 0.16px;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
  color: var(--text-primary);
}
html:lang(ar) .zen-side-panel-filters__title {
  font-family: var(--arabic-font-family);
}
.zen-side-panel-filters__title--mobile {
  padding: 0;
  font-family: var(--main-font);
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  letter-spacing: 0;
  line-height: 24px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .zen-side-panel-filters__title--mobile {
  font-family: var(--arabic-font-family);
}
.zen-side-panel-filters__close-button {
  fill: var(--text-primary);
}
.zen-side-panel-filters__content {
  overflow-x: hidden;
  overflow-y: auto;
  flex: 1 1 auto;
}
.zen-side-panel-filters__item {
  max-width: 100%;
  width: 328px;
}
.zen-side-panel-filters__item-popup {
  z-index: 11002;
}
.zen-side-panel-filters__dropdown-skeleton {
  gap: 8px;
  padding: 0;
}
.zen-side-panel-filters__item-element.zen-side-panel-filters__item-element:not(.zen-side-panel-filters__item-element--custom) {
  width: 100%;
}
.zen-side-panel-filters__item-element.zen-side-panel-filters__item-element:not(.zen-side-panel-filters__item-element--custom).zen-side-panel-filters__item-element--centred {
  justify-content: center;
}
.zen-side-panel-filters__item-element.zen-side-panel-filters__item-element:not(.zen-side-panel-filters__item-element--custom).zen-side-panel-filters__item-element--centred .zen-caption__content {
  margin: 0;
}
.zen-side-panel-filters__item-label {
  margin-bottom: 4px;
  font-family: var(--main-font);
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  letter-spacing: 0.32px;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .zen-side-panel-filters__item-label {
  font-family: var(--arabic-font-family);
}
.zen-side-panel-filters__item-label--mobile {
  margin-bottom: 8px;
  font-family: var(--main-font);
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  letter-spacing: 0.16px;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .zen-side-panel-filters__item-label--mobile {
  font-family: var(--arabic-font-family);
}
.zen-side-panel-filters__tab-header {
  padding: 0 16px;
}
.zen-side-panel-filters__tab-header .zen-side-panel-filters__tab-header {
  padding: 0;
}
.zen-side-panel-filters__tab-content {
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 32px;
}
.zen-side-panel-filters__tab-content--hidden {
  display: none;
}
.zen-side-panel-filters__tab-content--active {
  display: flex;
}
.zen-side-panel-filters__apply-button--desktop {
  margin-inline-start: 16px;
}
.zen-side-panel-filters__footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid var(--borders-general);
  padding: 14px 28px;
  height: auto;
  flex: 0 0 auto;
}
.zen-side-panel-filters__footer--mobile {
  padding: 0;
  display: block;
}
.zen-side-panel-filters__footer--long-text {
  padding: 14px 16px;
}
.zen-side-panel-filters__footer--long-text .zen-side-panel-filters__apply-button--desktop {
  margin-inline-start: 8px;
}
.zen-side-panel-filters-wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-y: hidden;
}
.zen-side-panel-filters.zen-side-panel-filters {
  min-width: 360px;
  max-width: 360px;
}
@media (max-width: 640px) {
  .zen-side-panel-filters.zen-side-panel-filters {
    width: 100%;
    max-width: 100%;
    min-width: 100%;
  }
}
.zen-filters-select-compact {
  padding: 4px 16px;
  width: 100%;
  overflow-x: auto;
  -ms-overflow-style: none;
  /* IE and Edge */
  scrollbar-width: none;
  /* Firefox */
}
.zen-filters-select-compact::-webkit-scrollbar {
  display: none;
}
.zen-filters-select-compact__list {
  display: flex;
  flex-wrap: nowrap;
  gap: 8px;
  align-items: center;
}
.zen-filters-select-compact__pill-item:not(.zen-filters-select-compact__list-item--not-expandable) {
  opacity: 0;
  padding-left: 0;
  transform: translateX(-30%);
  transition: transform 0.3s ease-in-out, opacity 0.2s ease-in, padding-left 0.3s ease;
}
.zen-filters-select-compact__item-content {
  min-width: 0;
  overflow: hidden;
}
.zen-filters-select-compact__item-content--expanded {
  overflow: visible;
}
.zen-filters-select-compact__item-content-inner {
  display: flex;
  align-items: center;
  width: max-content;
  padding-left: 0;
  transition: padding-left 0.3s ease;
}
.zen-filters-select-compact__unfolding-pill-item {
  flex-shrink: 0;
  display: grid;
  grid-template-columns: max-content 0fr;
  transition: grid-template-columns 0.3s ease-in-out;
  align-items: center;
  position: relative;
  z-index: 1;
}
.zen-filters-select-compact__list-item--not-expandable {
  flex-shrink: 0;
}
.zen-filters-select-compact__unfolding-pill-item--expanded {
  grid-template-columns: max-content 1fr;
  z-index: 10;
  transition: grid-template-columns 0.3s ease-in-out;
}
.zen-filters-select-compact__list-item-grouped {
  background-color: var(--accents-general--main);
  color: var(--accents-general--detail);
  fill: var(--accents-general--detail);
}
.zen-filters-select-compact__item-active-parent {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
}
.zen-filters-select-compact__unfolding-pill-item--expanded .zen-filters-select-compact__pill-item {
  opacity: 1;
  padding-left: 8px;
  transform: translateX(0);
  transition: transform 0.3s ease-in-out, opacity 0.2s ease-in, padding-left 0.3s ease;
}
.zen-filters-select-compact .zen-filters-select-compact__pill-item:nth-child(1) {
  transition-delay: 0.05s;
}
.zen-filters-select-compact .zen-filters-select-compact__pill-item:nth-child(2) {
  transition-delay: 0.1s;
}
.zen-filters-select-compact .zen-filters-select-compact__pill-item:nth-child(3) {
  transition-delay: 0.15s;
}
.zen-filters-select-compact .zen-filters-select-compact__pill-item:nth-child(4) {
  transition-delay: 0.2s;
}
.zen-filters-select-compact .zen-filters-select-compact__pill-item:nth-child(5) {
  transition-delay: 0.15s;
}
.zen-filters-select-compact .zen-filters-select-compact__pill-item:nth-child(6) {
  transition-delay: 0.1s;
}
.zen-filters-select-compact .zen-filters-select-compact__pill-item:nth-child(7) {
  transition-delay: 0.05s;
}
.zen-filters-select {
  border-top: var(--border-width-default) solid var(--borders-general);
  padding-top: 1px;
}
.zen-filters-select__list-item-title {
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-grow: 1;
  gap: 8px;
}
.zen-filters-select__item-active-indicator {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: var(--action-primary--default);
  margin-left: 8px;
}
.zen-filters-select__item-button {
  width: 32px;
  height: 32px;
  overflow: visible;
}
.zen-filters-select__item-button:hover {
  background-color: var(--backgrounds-hover);
  color: var(--accents-general--detail);
  border-color: var(--backgrounds-hover);
}
.zen-filters-select__item-icon {
  fill: var(--action-secondary--default);
  margin-left: auto;
}
.zen-filters-select__item-icon.zen-filters-select__item-icon--rotated {
  transform: rotate(180deg);
}
.zen-filters-select__list-item-wrapper {
  z-index: 3;
  position: relative;
  padding: 1px;
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
}
.zen-filters-select__list-item-wrapper--expanded {
  z-index: 2;
  background-color: var(--backgrounds-content-1);
  color: var(--accents-general--detail);
  border-color: var(--backgrounds-content-1);
}
.zen-filters-select__list-item-wrapper.zen-filters-select__list-item-wrapper--active {
  z-index: 1;
  background-color: var(--accents-general--main);
  color: var(--accents-general--detail);
  border-color: var(--accents-general--main);
}
.zen-filters-select__list-item-wrapper:focus-visible {
  border-color: var(--borders-form-field--active);
}
.zen-filters-select__list-item {
  width: 100%;
  display: flex;
  height: 32px;
  align-items: center;
  justify-content: space-between;
  background-color: transparent;
  border: 1px solid transparent;
  padding-inline: 0px;
  border-radius: var(--border-radius-default);
  cursor: pointer;
  color: var(--text-primary);
  font-family: var(--main-font);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .zen-filters-select__list-item {
  font-family: var(--arabic-font-family);
}
.zen-filters-select__list-item:focus-visible {
  outline: none;
}
.zen-filters-select__list-item.zen-filters-select__sub-item {
  padding: 8px;
  background-color: var(--backgrounds-content-1);
  color: var(--accents-general--detail);
  border-color: var(--backgrounds-content-1);
}
.zen-filters-select__list-item.zen-filters-select__list-item--active {
  background-color: var(--accents-general--main);
  color: var(--accents-general--detail);
  border-color: var(--accents-general--main);
}
.zen-filters-select__list-item--not-expandable {
  padding: 8px;
}
.zen-filters-select__list-item:hover {
  background-color: var(--backgrounds-hover);
  color: var(--accents-general--detail);
  border-color: var(--backgrounds-hover);
}
.zen-filters-select__item-content {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.3s ease-out;
}
.zen-filters-select__item-content--expanded {
  grid-template-rows: 1fr;
  transition: grid-template-rows 0.3s ease-out;
}
.zen-filters-select__item-content-inner {
  min-height: 0;
  background-color: var(--backgrounds-content-1);
  opacity: 0;
  transform: translateY(-10px);
  transition: opacity 0.1s ease-in, transform 0.2s ease-out;
}
.zen-filters-select__item-content--expanded .zen-filters-select__item-content-inner {
  opacity: 1;
  min-height: max-content;
  transform: translateY(0);
  transition: opacity 0.1s ease-in, transform 0.2s ease-out;
}
.zen-filters-select__list-item:focus-visible {
  outline: none;
  border-color: var(--borders-form-field--active);
}
.zen-filters-bar-dropdown-with-checkbox {
  box-sizing: border-box;
}
.zen-filters-bar-dropdown-with-checkbox * {
  box-sizing: border-box;
}
.zen-filters-bar-dropdown-with-checkbox--side-panel.zen-filters-bar-dropdown-with-checkbox--side-panel {
  max-width: 100%;
}
.zen-filters-bar-dropdown-with-checkbox--toolbar {
  max-width: 180px;
}
.zen-filters-bar-dropdown-with-checkbox__side-panel-checkbox {
  margin-top: 8px;
}
.zen-filters-bar-dropdown-with-checkbox__pill-box {
  margin-top: 8px;
}
.zen-filters-bar-period-picker {
  box-sizing: border-box;
}
.zen-filters-bar-period-picker * {
  box-sizing: border-box;
}
.zen-filters-bar-period-picker__button-clear {
  margin: 8px auto 4px 4px;
}
.zen-filters-bar-period-picker__button-reset {
  margin: 8px 8px 4px 0px;
}
.zen-filters-bar-period-picker__button-apply {
  margin: 8px 0px 4px 0px;
}
.zen-filters-bar-period-picker--full-width {
  width: 100%;
  justify-content: center;
}
.zen-filters-bar-period-picker--full-width .zen-caption__content {
  margin: 0;
}
.zen-filters-bar-period-picker__popup--full-width.zen-filters-bar-period-picker__popup--full-width {
  width: 288px;
}
.zen-filters-bar-period-picker__error {
  margin: 12px 16px 0;
}
.zen-filters-bar-period-picker .zen-filters-bar-period-picker-wrapper.zen-date-range-wrapper {
  width: 100%;
}
.zen-side-panel-filters-bar {
  box-sizing: border-box;
  border-radius: var(--border-radius-default);
}
.zen-side-panel-filters-bar * {
  box-sizing: border-box;
}
.zen-side-panel-filters-bar__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--borders-general);
  height: 64px;
  padding: 16px;
}
.zen-side-panel-filters-bar__title-wrapper {
  display: flex;
  flex-wrap: nowrap;
  gap: 16px;
}
.zen-side-panel-filters-bar__title {
  padding: 8px 0;
  font-family: var(--main-font);
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  letter-spacing: 0.16px;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
  color: var(--text-primary);
}
html:lang(ar) .zen-side-panel-filters-bar__title {
  font-family: var(--arabic-font-family);
}
.zen-side-panel-filters-bar__title-pill {
  padding: 4px 0;
}
.zen-side-panel-filters-bar__close-button {
  fill: var(--text-primary);
  position: absolute;
  right: 16px;
}
.zen-side-panel-filters-bar__content {
  padding-top: 8px;
  overflow-x: hidden;
  overflow-y: auto;
  flex: 1 1 auto;
}
.zen-side-panel-filters-bar__apply-button--desktop {
  margin-inline-start: 16px;
}
.zen-side-panel-filters-bar__footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid var(--borders-general);
  padding: 14px 28px;
  height: auto;
  flex: 0 0 auto;
}
.zen-side-panel-filters-bar__footer--mobile {
  padding: 0;
  display: block;
}
.zen-side-panel-filters-bar__footer--long-text {
  padding: 14px 16px;
}
.zen-side-panel-filters-bar__footer--long-text .zen-side-panel-filters-bar__apply-button--desktop {
  margin-inline-start: 8px;
}
.zen-side-panel-filters-bar-wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-y: hidden;
}
.zen-side-panel-filters-bar.zen-side-panel-filters-bar {
  min-width: 320px;
  max-width: 320px;
}
@media (max-width: 640px) {
  .zen-side-panel-filters-bar.zen-side-panel-filters-bar {
    width: 100%;
    max-width: 100%;
  }
}
.zen-form-section-default-title {
  font-family: var(--main-font);
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  letter-spacing: 0.16px;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
  color: var(--text-primary);
}
html:lang(ar) .zen-form-section-default-title {
  font-family: var(--arabic-font-family);
}
.zen-form-section-card-content {
  display: grid;
  gap: 16px;
}
.zen-form-section-error-banner {
  height: fit-content;
}
.zen-form-layout-title {
  font-family: var(--main-font);
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  letter-spacing: 0;
  line-height: 24px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .zen-form-layout-title {
  font-family: var(--arabic-font-family);
}
.zen-grid {
  display: grid;
  align-items: start;
}
.zen-grid .zen-col-stretch {
  height: unset;
  max-height: unset;
  min-height: unset;
  align-self: stretch;
}
.zen-grid-item--fit-content {
  width: fit-content;
  min-width: fit-content;
  max-width: fit-content;
}
@media (min-width: 1025px) {
  .zen-grid {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    gap: 16px;
    margin: 0 24px;
  }
  .zen-grid .zen-grid {
    margin: 0;
  }
  .zen-grid .zen-col-stretch {
    height: unset;
    max-height: unset;
    min-height: unset;
    align-self: stretch;
  }
  .zen-grid__item.zen-grid__item--unset {
    width: unset;
    max-width: unset;
    min-width: 66.75px;
  }
  .zen-lg-1,
  .zen-col-1 {
    grid-column: auto / span 1;
  }
  .zen-lg-2,
  .zen-col-2 {
    grid-column: auto / span 2;
  }
  .zen-lg-3,
  .zen-col-3 {
    grid-column: auto / span 3;
  }
  .zen-lg-4,
  .zen-col-4 {
    grid-column: auto / span 4;
  }
  .zen-lg-5,
  .zen-col-5 {
    grid-column: auto / span 5;
  }
  .zen-lg-6,
  .zen-col-6 {
    grid-column: auto / span 6;
  }
  .zen-lg-7,
  .zen-col-7 {
    grid-column: auto / span 7;
  }
  .zen-lg-8,
  .zen-col-8 {
    grid-column: auto / span 8;
  }
  .zen-lg-9,
  .zen-col-9 {
    grid-column: auto / span 9;
  }
  .zen-lg-10,
  .zen-col-10 {
    grid-column: auto / span 10;
  }
  .zen-lg-11,
  .zen-col-11 {
    grid-column: auto / span 11;
  }
  .zen-lg-12,
  .zen-col-12 {
    grid-column: auto / span 12;
  }
  .zen-col-start-1,
  .zen-lg-start-1 {
    grid-column-start: 1;
  }
  .zen-col-start-2,
  .zen-lg-start-2 {
    grid-column-start: 2;
  }
  .zen-col-start-3,
  .zen-lg-start-3 {
    grid-column-start: 3;
  }
  .zen-col-start-4,
  .zen-lg-start-4 {
    grid-column-start: 4;
  }
  .zen-col-start-5,
  .zen-lg-start-5 {
    grid-column-start: 5;
  }
  .zen-col-start-6,
  .zen-lg-start-6 {
    grid-column-start: 6;
  }
  .zen-col-start-7,
  .zen-lg-start-7 {
    grid-column-start: 7;
  }
  .zen-col-start-8,
  .zen-lg-start-8 {
    grid-column-start: 8;
  }
  .zen-col-start-9,
  .zen-lg-start-9 {
    grid-column-start: 9;
  }
  .zen-col-start-10,
  .zen-lg-start-10 {
    grid-column-start: 10;
  }
  .zen-col-start-11,
  .zen-lg-start-11 {
    grid-column-start: 11;
  }
  .zen-col-start-12,
  .zen-lg-start-12 {
    grid-column-start: 12;
  }
  .zen-grid__item.zen-grid__item.zen-grid-item--fit-content {
    width: fit-content;
    min-width: fit-content;
    max-width: fit-content;
  }
}
@media (min-width: 1440px) {
  .zen-grid {
    margin: 0 auto;
    max-width: 1440px;
    width: 100%;
  }
}
@media (max-width: 1024px) {
  .zen-grid {
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    gap: 16px;
    margin: 0 24px;
  }
  .zen-grid .zen-grid {
    margin: 0;
  }
  .zen-grid .zen-grid__item.zen-grid__item--unset {
    width: unset;
    max-width: unset;
    min-width: 63.125px;
  }
  .zen-md-1,
  .zen-col-1.zen-md-unset {
    grid-column: auto / span 1;
  }
  .zen-md-2,
  .zen-col-2.zen-md-unset {
    grid-column: auto / span 2;
  }
  .zen-md-3,
  .zen-col-3.zen-md-unset {
    grid-column: auto / span 3;
  }
  .zen-md-4,
  .zen-col-4.zen-md-unset {
    grid-column: auto / span 4;
  }
  .zen-md-5,
  .zen-col-5.zen-md-unset {
    grid-column: auto / span 5;
  }
  .zen-md-6,
  .zen-col-6.zen-md-unset {
    grid-column: auto / span 6;
  }
  .zen-md-7,
  .zen-col-7.zen-md-unset {
    grid-column: auto / span 7;
  }
  .zen-md-8,
  .zen-col-8.zen-md-unset,
  .zen-col-9.zen-md-unset,
  .zen-col-10.zen-md-unset,
  .zen-col-11.zen-md-unset,
  .zen-col-12.zen-md-unset {
    grid-column: auto / span 8;
  }
  .zen-md-start-1,
  .zen-col-1.zen-md-unset {
    grid-column-start: 1;
  }
  .zen-md-start-2,
  .zen-col-start-2.zen-md-unset {
    grid-column-start: 2;
  }
  .zen-md-start-3,
  .zen-col-start-3.zen-md-unset {
    grid-column-start: 3;
  }
  .zen-md-start-4,
  .zen-col-start-4.zen-md-unset {
    grid-column-start: 4;
  }
  .zen-md-start-5,
  .zen-col-start-5.zen-md-unset {
    grid-column-start: 5;
  }
  .zen-md-start-6,
  .zen-col-start-6.zen-md-unset {
    grid-column-start: 6;
  }
  .zen-md-start-7,
  .zen-col-start-7.zen-md-unset {
    grid-column-start: 7;
  }
  .zen-md-start-8,
  .zen-col-start-8.zen-md-unset,
  .zen-col-start-9.zen-md-unset,
  .zen-col-start-10.zen-md-unset,
  .zen-col-start-11.zen-md-unset,
  .zen-col-start-12.zen-md-unset {
    grid-column-start: 8;
  }
  .zen-grid__item.zen-grid__item.zen-grid-item--fit-content {
    width: fit-content;
    min-width: fit-content;
    max-width: fit-content;
  }
}
@media (max-width: 640px) {
  .zen-grid {
    margin: 0 12px;
    grid-template-columns: repeat(4, 1fr);
  }
  .zen-grid .zen-grid {
    margin: 0;
  }
  .zen-grid .zen-grid__item.zen-grid__item--unset {
    width: unset;
    max-width: unset;
    min-width: 57px;
  }
  .zen-sm-1,
  .zen-col-1.zen-sm-unset {
    grid-column: auto / span 1;
  }
  .zen-sm-2,
  .zen-col-2.zen-sm-unset {
    grid-column: auto / span 2;
  }
  .zen-sm-3,
  .zen-col-3.zen-sm-unset {
    grid-column: auto / span 3;
  }
  .zen-sm-4,
  .zen-col-4.zen-sm-unset,
  .zen-col-5.zen-sm-unset,
  .zen-col-6.zen-sm-unset,
  .zen-col-7.zen-sm-unset,
  .zen-col-8.zen-sm-unset,
  .zen-col-9.zen-sm-unset,
  .zen-col-10.zen-sm-unset,
  .zen-col-11.zen-sm-unset,
  .zen-col-12.zen-sm-unset {
    grid-column: auto / span 4;
  }
  .zen-sm-start-1,
  .zen-col-start-1.zen-sm-unset {
    grid-column-start: 1;
  }
  .zen-sm-start-2,
  .zen-col-start-2.zen-sm-unset {
    grid-column-start: 2;
  }
  .zen-sm-start-3,
  .zen-col-start-3.zen-sm-unset {
    grid-column-start: 3;
  }
  .zen-sm-start-4,
  .zen-col-start-4.zen-sm-unset,
  .zen-col-start-5.zen-sm-unset,
  .zen-col-start-6.zen-sm-unset,
  .zen-col-start-7.zen-sm-unset,
  .zen-col-start-8.zen-sm-unset,
  .zen-col-start-9.zen-sm-unset,
  .zen-col-start-10.zen-sm-unset,
  .zen-col-start-11.zen-sm-unset,
  .zen-col-start-12.zen-sm-unset {
    grid-column-start: 4;
  }
  .zen-grid__item.zen-grid__item.zen-grid-item--fit-content {
    width: fit-content;
    min-width: fit-content;
    max-width: fit-content;
  }
}
.zen-form-layout-column-title {
  font-family: var(--main-font);
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  letter-spacing: 0;
  line-height: 24px;
  text-transform: none;
  text-decoration: none;
  height: 24px;
}
html:lang(ar) .zen-form-layout-column-title {
  font-family: var(--arabic-font-family);
}
.zen-form-layout-column {
  display: grid;
  gap: 16px;
}
.zen-form-layout-secondary {
  font-family: var(--main-font);
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.32px;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
  color: var(--text-secondary);
}
html:lang(ar) .zen-form-layout-secondary {
  font-family: var(--arabic-font-family);
}
.zen-form-layout {
  padding: 0;
  grid-template-rows: repeat(auto-fit, minmax(0, max-content));
}
.zen-form-layout:not(.zen-form-layout--has-wrapper) {
  height: max-content;
}
.zen-form-layout-stepper:not(.zen-form-layout-stepper--with-banner) {
  margin-bottom: 40px;
}
.zen-form-separator {
  margin: 32px 0;
}
.zen-form-layout-wrapper {
  display: grid;
  grid-template-rows: auto 1fr auto;
  height: 100%;
  gap: 40px;
}
.zen-form-layout-wrapper--mobile {
  gap: 24px;
}
.zen-main-header {
  position: sticky;
  top: 0;
  left: 0;
  box-sizing: border-box;
  width: 100%;
  z-index: 10;
}
.zen-main-header * {
  box-sizing: border-box;
}
.zen-main-header--border {
  border-bottom: 1px solid var(--borders-general);
}
.zen-main-header--background-color {
  width: 100%;
  background-color: var(--backgrounds-main);
}
.zen-main-header__section--hidden {
  position: absolute;
  width: 100%;
  height: 0;
  overflow: auto;
  z-index: -1;
  visibility: hidden;
}
.zen-main-header__section--inline {
  display: inline-block;
}
.zen-main-header__section--padding {
  padding: 0 20px;
}
.zen-main-header__adaptive-section {
  width: 100%;
  min-width: 100%;
  justify-content: flex-end;
  display: flex;
  gap: 8px;
}
.zen-main-header__mobile-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 8px;
  align-items: center;
}
.zen-main-header__mobile-container-new-line {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  gap: 8px;
  align-items: center;
  width: 100%;
}
.zen-main-header__tabs {
  padding: 0 20px;
  max-height: 36px;
}
.zen-main-header__tabs--drive,
.zen-main-header__tabs--drive-tablet {
  max-height: 48px;
}
.zen-main-header__tabs--mobile {
  padding: 0 12px;
  max-height: 46px;
}
.zen-main-header--mobile .zen-main-header__section--padding {
  padding: 0 8px;
}
.zen-main-header--mobile .zen-main-header__section--secondary-padding {
  height: 48px;
  padding: 2px 8px;
}
.zen-main-header--limited-title .zen-page-header__page-name {
  max-width: 100px;
}
.zen-main-header__mobile-search-input {
  flex: 1 1 100%;
}
.zen-main-header.zen-main-header--shrink-title .zen-header__section--left {
  flex-shrink: 1;
}
.zen-main-header.zen-main-header--mobile-title-large .zen-page-header__page-name {
  max-width: 260px;
}
.zen-main-header.zen-main-header--mobile-title-medium .zen-page-header__page-name {
  max-width: 220px;
}
.zen-main-header.zen-main-header--mobile-title-small .zen-page-header__page-name {
  max-width: 180px;
}
.zen-main-header .zen-main-header__tabs.zen-main-header--border .zen-tabs {
  border-bottom: none;
}
.zen-main-header--drive.zen-main-header--mobile .zen-main-header__section--secondary-padding,
.zen-main-header--drive-tablet.zen-main-header--mobile .zen-main-header__section--secondary-padding {
  padding: 0px 8px;
}
.zen-header-button {
  white-space: nowrap;
}
.zen-mobile-search-control {
  box-sizing: border-box;
}
.zen-mobile-search-control * {
  box-sizing: border-box;
}
.zen-mobile-search-control--expanded {
  display: flex;
  width: 100%;
  padding: 6px 12px 6px;
  gap: 8px;
}
.zen-mobile-search-control__search {
  width: 100%;
}
.zen-mobile-filter-control {
  position: relative;
}
.zen-mobile-filter-control__counter-wrapper {
  position: absolute;
  top: 0;
  right: 0;
}
.zen-mobile-filter-control__counter {
  font-family: var(--main-font);
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.32px;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
  background: var(--action-primary--default);
  color: var(--text-reverse-primary);
  border-radius: 9px;
  display: flex;
  min-width: 16px;
  height: 16px;
  justify-content: center;
  align-items: center;
  padding: 2px 4px;
}
html:lang(ar) .zen-mobile-filter-control__counter {
  font-family: var(--arabic-font-family);
}
.zen-mobile-filter-control__actions:focus-visible {
  outline: none;
  border: 1px solid var(--borders-form-field--active);
}
.zen-header {
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  gap: 4px;
  justify-items: center;
  align-items: center;
  height: 56px;
  width: 100%;
}
.zen-header * {
  box-sizing: border-box;
}
.zen-header__section {
  overflow: hidden;
}
.zen-header__section--right,
.zen-header__section--middle {
  display: flex;
  justify-content: space-between;
  gap: 8px;
  align-items: center;
  flex-shrink: 0;
  padding-right: 4px;
  padding-left: 4px;
  height: 100%;
}
.zen-header__section--middle {
  flex-grow: 1;
  flex-wrap: nowrap;
  justify-content: flex-end;
  overflow: auto;
}
.zen-header__section--left {
  flex-shrink: 0;
  flex-grow: 0;
}
.zen-header__section--hidden {
  display: none;
}
.zen-header__section--single {
  flex-shrink: 1;
}
.zen-header--mobile .zen-header__section--middle {
  flex-grow: 0;
}
.zen-header--mobile .zen-header__section--left {
  flex-grow: 0;
}
.zen-header--mobile .zen-header__right-sections {
  display: flex;
  justify-content: flex-end;
  flex-grow: 1;
  flex-shrink: 0;
  height: 100%;
}
.zen-header.zen-main-header__section--secondary-padding .zen-header__right-sections {
  flex-grow: 1;
}
.zen-header.zen-main-header__section--secondary-padding .zen-header__right-sections .zen-header__section--middle {
  flex-grow: 1;
}
.zen-collapsed-items {
  box-sizing: border-box;
}
.zen-collapsed-items * {
  box-sizing: border-box;
}
.zen-collapsed-items__dropdown-area {
  display: flex;
  flex-flow: column;
  min-width: 0;
  max-width: 260px;
  background-color: var(--backgrounds-content-0);
}
.zen-layout {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
}
.zen-layout * {
  box-sizing: border-box;
}
.zen-layout__header {
  position: relative;
  z-index: 10;
  width: 100%;
}
.zen-layout__header--sticky {
  position: sticky;
  top: 0;
  left: 0;
  z-index: 10;
}
.zen-layout__content {
  padding: 24px;
  flex: 1;
  background-color: var(--backgrounds-main);
  width: 100%;
}
.zen-layout__content.zen-layout__content--mobile {
  padding: 8px 0;
}
.zen-layout__content.zen-layout__content--internal-paddings {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.zen-layout__banner {
  position: relative;
  width: 100%;
}
.zen-layout__summary-tiles {
  position: relative;
  width: 100%;
  background-color: var(--backgrounds-main);
}
.zen-layout__summary-tiles--custom {
  background: var(--backgrounds-main);
}
.zen-layout__middle-element {
  height: 0;
}
.zen-layout .zen-layout__content--full-screen > *:not(.zen-layout__full-screen-element--visible):not(.zen-layout__full-screen-element--visible *):not([data-full-screen-parent="true"]) {
  display: none;
}
.zen-layout .zen-layout__content:has(> :first-child > :first-child .zen-data-grid-actions),
.zen-layout .zen-layout__content:has(> :first-child > :first-child.zen-data-grid-actions),
.zen-layout .zen-layout__content--full-screen:has(.zen-layout__full-screen-element--visible .zen-data-grid-actions) {
  padding-top: 0;
}
.zen-layout.zen-layout--no-scroll .zen-layout__content {
  overflow-y: auto;
}
.zen-card-deck {
  box-sizing: border-box;
  display: flex;
  padding: 2px 21px;
  flex-direction: column;
  align-items: center;
  border-bottom: 1px solid var(--borders-general);
  background: var(--backgrounds-main);
  gap: 8px;
}
.zen-card-deck * {
  box-sizing: border-box;
}
.zen-card-deck--mobile {
  padding: 2px 12px 1px 12px;
}
.zen-card-deck__cards {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
  padding: 6px 3px;
  margin: 0;
  list-style: none;
}
.zen-card-deck__cards-container {
  width: 100%;
  overflow: auto;
  -ms-overflow-style: none;
  /* IE and Edge */
  scrollbar-width: none;
  /* Firefox */
}
.zen-card-deck__cards-container::-webkit-scrollbar {
  display: none;
}
.zen-card-deck__arrows {
  display: flex;
  gap: 16px;
  flex-direction: row;
}
.zen-card-deck__arrow-button {
  fill: var(--text-primary);
}
.zen-card-deck__arrow-button:hover {
  fill: var(--action-secondary--hover);
}
.zen-card-deck__arrow-button:disabled {
  fill: var(--borders-general);
  cursor: not-allowed;
}
.zen-page-header-component {
  box-sizing: border-box;
  width: 100%;
  padding: 16px 24px;
  background-color: transparent;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: flex-start;
  gap: 24px;
}
.zen-page-header-component * {
  box-sizing: border-box;
}
.zen-page-header-component--mobile {
  padding: 0;
}
.zen-page-header-component__filters {
  flex-shrink: 1;
  flex-grow: 1;
}
.zen-page-header-component__actions {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  gap: 12px;
}
.zen-page-header-component__actions--mobile-portal {
  position: fixed;
  bottom: 16px;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 8px;
  padding: 12px 16px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.25);
  z-index: 10006;
  justify-content: center;
  background-color: var(--backgrounds-main);
  border: 1px solid var(--borders-general);
}
.zen-page-header-component__actions-more svg {
  rotate: 90deg;
}
.zen-legend-list {
  box-sizing: border-box;
}
.zen-legend-list * {
  box-sizing: border-box;
}
.zen-legend-list--flexible {
  display: flex;
  gap: 10px;
  flex-direction: row;
  margin: 0;
  padding: 0;
  flex-wrap: wrap;
}
.zen-legend-list__item {
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
}
.zen-legend-list__item-color {
  --color-box-size: 8px;
  display: inline-block;
  height: var(--color-box-size);
  width: var(--color-box-size);
  border-radius: var(--color-box-size);
  margin-right: 4px;
}
.zen-legend-list__item-text {
  font-size: 0.75rem;
  line-height: 1rem;
  letter-spacing: 0.02rem;
  font-weight: 500;
  color: var(--text-secondary);
  margin: 0;
  padding: 0;
}
.zen-legend-list.zen-legend-list--drive .zen-legend-list__item-text {
  font-size: 1rem;
  line-height: 1.125rem;
}
@media (max-width: 640px) {
  .zen-legend-list.zen-legend-list--drive .zen-legend-list__item-text {
    font-size: 0.875rem;
  }
}
.zen-mini-tabs {
  font-family: var(--main-font);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
  box-sizing: border-box;
  overflow: hidden;
}
html:lang(ar) .zen-mini-tabs {
  font-family: var(--arabic-font-family);
}
.zen-mini-tabs * {
  box-sizing: border-box;
}
.zen-mini-tabs--small {
  width: 336px;
  max-width: 100%;
}
.zen-mini-tabs--small .zen-mini-tabs__header-item {
  max-width: 104px;
}
.zen-mini-tabs--medium {
  width: 528px;
  max-width: 100%;
}
.zen-mini-tabs--medium .zen-mini-tabs__header-item {
  max-width: 144px;
}
.zen-mini-tabs--large {
  width: 720px;
  max-width: 100%;
}
.zen-mini-tabs--large .zen-mini-tabs__header-item {
  max-width: 168px;
}
.zen-mini-tabs--xlarge {
  width: 1104px;
  max-width: 100%;
}
.zen-mini-tabs--xlarge .zen-mini-tabs__header-item {
  max-width: 200px;
}
.zen-mini-tabs__header {
  width: 100%;
  display: flex;
}
.zen-mini-tabs__header-item {
  color: var(--text-secondary);
  background-color: transparent;
  height: 16px;
  margin: 0 16px 0 0;
  padding: 0;
  border: none;
  cursor: pointer;
}
.zen-mini-tabs__header-item--active {
  color: var(--action-primary--active);
  border-bottom: var(--border-width-default) solid var(--action-primary--active, #004080);
}
.zen-mini-tabs__header-item:last-child {
  margin: 0;
}
.zen-nav {
  --nav-gap: 16px;
  --nav-items-gap: 8px;
  --nav-bottom-padding: 12px;
  --nav-top-padding: 9px;
  --nav-left-right-padding: 12px;
  --nav-left-right-collapsed-padding: 8px;
  --nav-top-collapsed-padding: 20px;
  --nav-top-bottom-mobile-padding: 12px;
  --nav-background-color: var(--backgrounds-content-1);
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: var(--nav-gap);
  height: 100%;
  padding: var(--nav-top-padding) var(--nav-left-right-padding) var(--nav-bottom-padding);
  background-color: var(--nav-background-color);
}
.zen-nav__header {
  flex: 0 0 auto;
}
.zen-nav__content {
  flex: 1 1 auto;
  overflow-y: auto;
  overflow-x: hidden;
  position: relative;
}
.zen-nav__content--has-scrollbar {
  margin-right: calc(-1 * var(--nav-left-right-padding));
}
.zen-nav__content--overlay-scrollbar.zen-nav__content--has-scrollbar .zen-nav__content-inner {
  margin-right: var(--nav-left-right-padding);
}
.zen-nav__content::before,
.zen-nav__content::after {
  content: "";
  position: sticky;
  display: block;
  left: 0;
  width: 100%;
  height: 16px;
  pointer-events: none;
  z-index: 1;
  opacity: 0;
  transition: opacity 0.2s ease;
}
.zen-nav__content::before {
  top: 0;
  background: linear-gradient(to bottom, var(--nav-background-color), transparent);
  margin-bottom: calc(-1 * var(--nav-gap));
}
.zen-nav__content::after {
  bottom: 0;
  background: linear-gradient(to top, var(--nav-background-color), transparent);
  margin-top: calc(-1 * var(--nav-gap));
}
.zen-nav__content--show-top-shadow::before {
  opacity: 1;
}
.zen-nav__content--show-bottom-shadow::after {
  opacity: 1;
}
.zen-nav__content-inner {
  display: flex;
  flex-direction: column;
  gap: var(--nav-gap);
}
.zen-nav__empty-state {
  min-height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px 12px 24px;
  box-sizing: border-box;
  text-align: center;
}
.zen-nav__footer {
  flex: 0 0 auto;
}
.zen-nav--mobile {
  padding: var(--nav-top-bottom-mobile-padding) var(--nav-left-right-padding);
  overflow-y: auto;
  gap: 8px;
}
.zen-nav--mobile .zen-nav__content {
  overflow: initial;
  flex-grow: 0;
}
.zen-nav--mobile .zen-nav__footer {
  margin-top: 8px;
}
.zen-nav--mobile .zen-nav__header {
  padding: 6px 0;
}
.zen-nav--mobile-edit {
  overflow-y: hidden;
}
.zen-nav--mobile-edit .zen-nav__content {
  flex: 1 1 auto;
  overflow-y: auto;
}
.zen-nav--collapsed {
  padding-left: var(--nav-left-right-collapsed-padding);
  padding-right: var(--nav-left-right-collapsed-padding);
  padding-top: var(--nav-top-collapsed-padding);
}
.zen-nav--collapsed .zen-nav__content--has-scrollbar {
  margin-right: calc(-1 * var(--nav-left-right-collapsed-padding));
}
.zen-nav-button {
  padding: 6px;
}
@media (hover: hover) {
  .zen-nav__content {
    scrollbar-width: thin;
    scrollbar-color: transparent transparent;
  }
  .zen-nav__content::-webkit-scrollbar-thumb,
  .zen-nav__content::-webkit-scrollbar-track {
    background-color: transparent;
  }
  .zen-nav__content:hover {
    scrollbar-color: initial;
  }
  .zen-nav__content:hover::-webkit-scrollbar-thumb,
  .zen-nav__content:hover::-webkit-scrollbar-track {
    background-color: initial;
  }
}
.zen-nav-popup.zen-nav-popup:not(.zen-nav-popup .zen-nav-popup):not(.zen-nav-popup--mobile) {
  font-family: var(--main-font);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
  box-shadow: 0px 0px 8px 2px rgba(0, 0, 0, 0.2);
  border-radius: var(--border-radius-default);
  box-sizing: border-box;
  max-height: 800px;
  border: 0px;
  min-height: 30px;
  min-width: 170px;
  max-width: 232px;
  background-color: var(--backgrounds-content-1);
  padding: 8px;
}
html:lang(ar) .zen-nav-popup.zen-nav-popup:not(.zen-nav-popup .zen-nav-popup):not(.zen-nav-popup--mobile) {
  font-family: var(--arabic-font-family);
}
.zen-nav-popup.zen-nav-popup:not(.zen-nav-popup .zen-nav-popup):not(.zen-nav-popup--mobile).zen-nav-popup--narrow {
  width: 160px;
  min-width: 160px;
}
.zen-nav-popup.zen-nav-popup:not(.zen-nav-popup .zen-nav-popup):not(.zen-nav-popup--mobile) .zen-nav-popup__list:not(.zen-nav-popup__list--mobile) {
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.zen-nav-footer {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.zen-nav-footer__bottom {
  display: flex;
  justify-content: space-between;
  padding: 8px;
  gap: 8px;
  border: 1px solid var(--borders-general);
  border-radius: 8px;
}
.zen-nav-footer__bottom--mobile {
  flex-direction: column;
  align-items: center;
  padding: 0;
  border: none;
}
.zen-nav-footer--collapsed {
  align-items: center;
}
.zen-nav-footer--collapsed .zen-nav-footer__bottom {
  flex-direction: column;
  align-items: center;
}
.zen-nav-item {
  display: flex;
  align-items: center;
  width: 100%;
  gap: 8px;
}
.zen-nav-item--active .zen-nav-item__main {
  text-decoration: none;
}
.zen-nav-item--active .zen-nav-item__icon {
  color: var(--text-reverse-primary-button);
  fill: var(--text-reverse-primary-button);
  background-color: var(--action-primary--default);
  border-color: var(--borders-form-field--active);
}
.zen-nav-item--active .zen-nav-item__title {
  color: var(--text-nav-highlight);
  fill: var(--text-nav-highlight);
}
.zen-nav-item--active .zen-nav-item__title-text {
  font-family: var(--main-font);
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  letter-spacing: 0.16px;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .zen-nav-item--active .zen-nav-item__title-text {
  font-family: var(--arabic-font-family);
}
.zen-nav-item:not(.zen-nav-item--collapsed) .zen-nav-item__main {
  min-height: 36px;
}
.zen-nav-item--collapsed {
  width: auto;
}
.zen-nav-item--collapsed .zen-nav-item__main {
  padding: 0;
  width: auto;
  display: inline-flex;
  justify-content: center;
}
.zen-nav-item--collapsed .zen-nav-item__icon {
  padding: 6px;
  position: relative;
}
.zen-nav-item--collapsed .zen-nav-item__icon--with-counter::before {
  content: "";
  position: absolute;
  top: 4px;
  right: 4px;
  width: 8px;
  height: 8px;
  background-color: var(--action-destructive--default);
  border: 1px solid var(--backgrounds-content-0);
  border-radius: 50%;
}
.zen-nav-item--mobile-bar {
  margin: 6px;
}
.zen-nav-item--button .zen-nav-item__main {
  border: 0;
  background: transparent;
  text-align: left;
}
.zen-nav-item--link .zen-nav-item__main {
  text-decoration: none;
}
.zen-nav-item--nested:not(.zen-nav-item--mobile) .zen-nav-item__main {
  min-height: 32px;
  border-radius: 4px;
  padding: 4px;
}
.zen-nav-item--nested.zen-nav-item--mobile .zen-nav-item__main {
  border-radius: 0;
}
.zen-nav-item__main {
  box-sizing: border-box;
  width: 100%;
  display: flex;
  align-items: center;
  flex: 1 1 auto;
  min-width: 0;
  padding: 4px;
  border-radius: var(--border-radius-default);
  color: var(--text-secondary);
  fill: var(--text-secondary);
  line-height: 1rem;
  gap: 8px;
  justify-content: space-between;
  cursor: pointer;
  font-family: var(--main-font);
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.32px;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .zen-nav-item__main {
  font-family: var(--arabic-font-family);
}
.zen-nav-item__main:hover,
.zen-nav-item__main:focus-visible,
.zen-nav-item__main:focus {
  outline: none;
  background-color: var(--backgrounds-hover);
  text-decoration: none;
}
.zen-nav-item__beta {
  background-color: var(--accents-general--main);
  color: var(--accents-general--detail);
  fill: var(--accents-general--detail);
  border-radius: 1rem;
  padding: 6px 8px;
  margin-right: 4px;
  display: flex;
  align-items: center;
  flex: 0 0 auto;
}
.zen-nav-item__icon {
  padding: 4px;
  display: flex;
  align-items: center;
  border-radius: var(--border-radius-default);
  flex: 0 0 auto;
}
.zen-nav-item__title {
  flex: 1 1 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 4px;
  overflow: hidden;
}
.zen-nav-item__title-text {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-wrap: normal;
  font-family: var(--main-font);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
  flex: 1 1 auto;
}
html:lang(ar) .zen-nav-item__title-text {
  font-family: var(--arabic-font-family);
}
.zen-nav-item__title-icon {
  flex: 0 0 auto;
}
.zen-nav-item__counter {
  color: var(--text-reverse-primary);
  background-color: var(--action-destructive--default);
  padding: 2px 8px;
  border-radius: 1rem;
}
.zen-nav-item__content-left {
  display: flex;
  align-items: center;
  gap: 4px;
  flex: 1 1 auto;
  min-width: 0;
}
.zen-nav-item__content-right {
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  gap: 4px;
}
.zen-nav-item__dnd {
  touch-action: none;
}
.zen-nav-item__action {
  display: flex;
  flex: 0 0 auto;
  height: 36px;
  width: 36px;
  align-items: center;
  justify-content: center;
  padding: 4px;
  border: 0;
  border-radius: var(--border-radius-default);
  background: transparent;
  cursor: pointer;
  color: var(--text-secondary);
  fill: var(--text-secondary);
}
.zen-nav-item__action:hover,
.zen-nav-item__action:focus-visible,
.zen-nav-item__action:focus {
  outline: none;
  background-color: var(--backgrounds-hover);
  text-decoration: none;
}
.nav-footer-action {
  display: flex;
  flex-direction: column;
}
.zen-nav-header {
  box-sizing: border-box;
  display: flex;
  gap: 8px;
  align-items: center;
}
.zen-nav-header__controls {
  display: flex;
  gap: 4px;
  flex: 0 0 auto;
  align-items: center;
  justify-content: flex-end;
}
.zen-nav-header__actions-icon {
  border-radius: 50%;
  padding: 7px;
}
.zen-nav-header__actions {
  display: flex;
  flex-direction: column;
  flex: 0 0 auto;
}
.zen-nav-header__action {
  display: flex;
}
.zen-nav-header__logo-link {
  display: flex;
  align-items: center;
  flex: 1 1 100%;
  margin-bottom: -3px;
  /* Adjust for visual centering (compensate y letter shift) */
}
.zen-nav-header--collapsed {
  align-items: center;
  flex-direction: column;
  gap: 16px;
}
.zen-nav-header--collapsed .zen-nav-header__controls {
  flex-direction: column;
}
.zen-nav-header--mode-search .zen-nav-header__controls {
  flex: 1 1 100%;
}
.zen-nav-header-search {
  display: flex;
  flex-direction: row;
  gap: 4px;
  flex: 1 1 auto;
}
.zen-nav-header-search__input {
  flex: 1 1 auto;
}
.zen-nav-header-search__close-button {
  flex: 0 0 auto;
}
.zen-nav-section {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.zen-nav-section--collapsed {
  align-items: center;
}
.zen-nav-divider {
  height: 1px;
  min-height: 1px;
  width: 100%;
  background: linear-gradient(to right, transparent 0%, color-mix(in srgb, var(--borders-general) 40%, transparent) 10%, var(--borders-general) 50%, color-mix(in srgb, var(--borders-general) 40%, transparent) 90%, transparent 100%);
  border: none;
}
.zen-nav-mobile-bar {
  display: flex;
  justify-content: space-between;
  gap: 8px;
  padding: 3px 12px;
  background: var(--backgrounds-content-0);
  border-top: 1px solid var(--borders-general);
}
.zen-nav-edit-footer {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.zen-nav-edit-footer__button {
  width: calc(50% - 4px);
}
.zen-nav-edit-footer__button--with-margin {
  margin-bottom: 8px;
}
.zen-nav-edit-footer--mobile {
  flex-direction: column;
}
.zen-nav-edit-footer--mobile .zen-nav-edit-footer__button {
  width: 100%;
}
.zen-nav-edit-section {
  display: flex;
  flex-direction: column;
  gap: var(--nav-gap);
}
.zen-nav-edit-list {
  display: flex;
  flex-direction: column;
  gap: var(--nav-items-gap);
}
.zen-nav-edit-list__header {
  font-family: var(--main-font);
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  letter-spacing: 0.16px;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
  color: var(--text-secondary);
  margin: 0;
}
html:lang(ar) .zen-nav-edit-list__header {
  font-family: var(--arabic-font-family);
}
.zen-nav-edit-list__header--no-gap {
  margin-bottom: calc(var(--nav-items-gap) * -1);
}
.zen-nav-edit-list .zen-nav-edit-list__item--placeholder {
  list-style-type: none;
}
.zen-nav-edit-list .zen-nav-edit-list__item--dragging {
  display: none;
}
.zen-nav-edit-list__item--dragged {
  background-color: var(--backgrounds-hover);
}
.zen-push {
  box-sizing: border-box;
  font-family: var(--main-font);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
  box-shadow: 0px 0px 8px 2px rgba(0, 0, 0, 0.2);
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 1rem;
  max-width: 30.625rem;
  min-width: 30.625rem;
  border-radius: 8px;
}
.zen-push * {
  box-sizing: border-box;
}
html:lang(ar) .zen-push {
  font-family: var(--arabic-font-family);
}
.zen-push::before {
  content: "";
  position: absolute;
  top: 0;
  inset-inline-start: -0.375rem;
  width: 0.4375rem;
  height: 100%;
  border-start-start-radius: 15px;
  border-end-start-radius: 15px;
  border-inline-start: 5px solid transparent;
}
.zen-push__header {
  font-family: var(--main-font);
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  letter-spacing: 0.16px;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
  display: flex;
}
html:lang(ar) .zen-push__header {
  font-family: var(--arabic-font-family);
}
.zen-push__content {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}
.zen-push__body {
  font-family: var(--main-font);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
  flex-grow: 1;
  padding-top: 0.5rem;
  display: flex;
  flex-direction: column;
}
html:lang(ar) .zen-push__body {
  font-family: var(--arabic-font-family);
}
.zen-push__body-buttons {
  display: flex;
  gap: 0.5rem;
  margin-inline-start: auto;
}
.zen-push__button {
  font-size: 0.75rem;
}
.zen-push__text {
  font-size: 0.75rem;
  padding-bottom: 1rem;
}
.zen-push__title {
  font-style: normal;
  padding-bottom: 0.5rem;
  padding-top: 0.125rem;
}
.zen-push__title--error {
  color: var(--accents-error--detail);
}
.zen-push__title--info {
  color: var(--accents-general--detail);
}
.zen-push__title--success {
  color: var(--accents-success--detail);
}
.zen-push__title--warning {
  color: var(--accents-warning--detail);
}
.zen-push__close-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.25rem;
  height: 1.25rem;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  border-radius: 50%;
}
.zen-push__close-button:active,
.zen-push__close-button:focus,
.zen-push__close-button:hover {
  fill: var(--text-reverse-primary);
}
.zen-push__close-button--error {
  fill: var(--accents-error--detail);
  color: var(--accents-error--detail);
  outline-color: var(--accents-error--detail);
}
.zen-push__close-button--error:active,
.zen-push__close-button--error:focus,
.zen-push__close-button--error:hover {
  background-color: var(--accents-error--detail);
}
.zen-push__close-button--info {
  fill: var(--accents-general--detail);
  color: var(--accents-general--detail);
  outline-color: var(--accents-general--detail);
}
.zen-push__close-button--info:active,
.zen-push__close-button--info:focus,
.zen-push__close-button--info:hover {
  background-color: var(--accents-general--detail);
}
.zen-push__close-button--success {
  fill: var(--accents-success--detail);
  color: var(--accents-success--detail);
  outline-color: var(--accents-success--detail);
}
.zen-push__close-button--success:active,
.zen-push__close-button--success:focus,
.zen-push__close-button--success:hover {
  background-color: var(--accents-success--detail);
}
.zen-push__close-button--warning {
  fill: var(--accents-warning--detail);
  color: var(--accents-warning--detail);
  outline-color: var(--accents-warning--detail);
}
.zen-push__close-button--warning:active,
.zen-push__close-button--warning:focus,
.zen-push__close-button--warning:hover {
  background-color: var(--accents-warning--detail);
}
.zen-push__actions {
  height: 100%;
}
.zen-push--error {
  background-color: var(--accents-error--main);
  color: var(--accents-error--detail);
  fill: var(--accents-error--detail);
}
.zen-push--error::before {
  border-inline-start-color: var(--action-destructive--active);
}
.zen-push--error .zen-push__close-button {
  fill: var(--accents-error--detail);
}
.zen-push--error .zen-push__close-button:active,
.zen-push--error .zen-push__close-button:hover,
.zen-push--error .zen-push__close-button:focus {
  background-color: var(--accents-error--detail);
  fill: var(--accents-error--main);
}
.zen-push--info {
  background-color: var(--accents-general--main);
  color: var(--accents-general--detail);
  fill: var(--accents-general--detail);
}
.zen-push--info::before {
  border-inline-start-color: var(--accents-general--detail);
}
.zen-push--info .zen-push__close-button {
  fill: var(--accents-general--detail);
}
.zen-push--info .zen-push__close-button:active,
.zen-push--info .zen-push__close-button:hover,
.zen-push--info .zen-push__close-button:focus {
  background-color: var(--accents-general--detail);
  fill: var(--accents-general--main);
}
.zen-push--success {
  background-color: var(--accents-success--main);
  color: var(--accents-success--detail);
  fill: var(--accents-success--detail);
}
.zen-push--success::before {
  border-inline-start-color: var(--accents-success--detail);
}
.zen-push--success .zen-push__close-button {
  fill: var(--accents-success--detail);
}
.zen-push--success .zen-push__close-button:active,
.zen-push--success .zen-push__close-button:hover,
.zen-push--success .zen-push__close-button:focus {
  background-color: var(--accents-success--detail);
  fill: var(--accents-success--main);
}
.zen-push--warning {
  background-color: var(--accents-warning--main);
  color: var(--accents-warning--detail);
  fill: var(--accents-warning--detail);
}
.zen-push--warning::before {
  border-inline-start-color: var(--accents-warning--detail);
}
.zen-push--warning .zen-push__close-button {
  fill: var(--accents-success--detail);
}
.zen-push--warning .zen-push__close-button:active,
.zen-push--warning .zen-push__close-button:hover,
.zen-push--warning .zen-push__close-button:focus {
  background-color: var(--accents-success--detail);
  fill: var(--accents-success--main);
}
.zen-push__icon {
  padding-inline-end: 0.5625rem;
}
.zen-push__icon--error {
  fill: var(--accents-error--detail);
  color: var(--accents-error--detail);
}
.zen-push__icon--info {
  fill: var(--accents-general--detail);
  color: var(--accents-general--detail);
}
.zen-push__icon--info > use {
  x: 3px;
}
.zen-push__icon--success {
  fill: var(--accents-success--detail);
  color: var(--accents-success--detail);
}
.zen-push__icon--warning {
  fill: var(--accents-warning--detail);
  color: var(--accents-warning--detail);
}
.zen-push .zen-push__tertiary-button--success {
  color: var(--accents-success--detail);
}
.zen-push .zen-push__tertiary-button--error {
  color: var(--accents-error--detail);
}
.zen-push .zen-push__tertiary-button--info {
  color: var(--accents-general--detail);
}
.zen-push .zen-push__tertiary-button--warning {
  color: var(--accents-warning--detail);
}
.zen-push .zen-push__primary-button--success {
  background-color: var(--accents-success--detail);
  border-color: var(--accents-success--detail);
}
.zen-push .zen-push__primary-button--error {
  background-color: var(--action-destructive--active);
  border-color: var(--action-destructive--active);
}
.zen-push .zen-push__primary-button--info {
  background-color: var(--accents-general--detail);
  border-color: var(--accents-general--detail);
}
.zen-push .zen-push__primary-button--warning {
  background-color: var(--accents-warning--detail);
  border-color: var(--accents-warning--detail);
}
@media (max-width: 540px) {
  .zen-push {
    min-width: 9.375rem;
  }
}
.zen-overview {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  max-height: 32px;
  padding: 0;
  font-family: var(--main-font);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
}
.zen-overview * {
  box-sizing: border-box;
}
html:lang(ar) .zen-overview {
  font-family: var(--arabic-font-family);
}
.zen-overview__title {
  overflow: hidden;
}
.zen-overview__icon {
  width: 20px;
  height: 20px;
  margin-right: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  fill: var(--text-primary);
}
.zen-overview__content {
  flex-grow: 1;
  width: calc(100% - 28px);
  display: flex;
  flex-direction: column;
}
.zen-overview__content--full {
  width: 100%;
}
.zen-overview__additional {
  display: inline-flex;
  width: 100%;
  flex-grow: 1;
  justify-content: space-between;
  max-height: 16px;
  overflow: hidden;
}
.zen-overview__description {
  color: var(--text-secondary);
  flex-grow: 1;
}
.zen-overview__label {
  width: max-content;
  flex-shrink: 0;
  max-height: 32px;
  font-family: var(--main-font);
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.32px;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .zen-overview__label {
  font-family: var(--arabic-font-family);
}
.zen-overview__label-item {
  min-width: 42px;
  padding: 0 4px;
}
.zen-pill {
  box-sizing: border-box;
  font-family: var(--main-font);
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.32px;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
  display: flex;
  color: var(--text-primary);
  align-items: center;
  justify-content: space-between;
  padding: 4px 12px 4px 12px;
  border-radius: 30px;
  background: var(--backgrounds-content-1);
}
.zen-pill * {
  box-sizing: border-box;
}
html:lang(ar) .zen-pill {
  font-family: var(--arabic-font-family);
}
.zen-pill--inactive {
  color: var(--text-secondary);
  background-color: var(--backgrounds-field-disabled);
}
.zen-pill--inactive .zen-pill__close-button {
  fill: var(--text-secondary);
}
.zen-pill--success {
  color: var(--accents-success--detail);
  background-color: var(--accents-success--main);
  fill: var(--accents-success--detail);
}
.zen-pill--success .zen-pill__close-button {
  fill: var(--accents-success--detail);
}
.zen-pill--success .zen-pill__close-button:active,
.zen-pill--success .zen-pill__close-button:hover,
.zen-pill--success .zen-pill__close-button:focus {
  background-color: var(--accents-success--detail);
  fill: var(--accents-success--main);
}
.zen-pill--error {
  background-color: var(--accents-error--main);
  color: var(--accents-error--detail);
  fill: var(--accents-error--detail);
}
.zen-pill--error .zen-pill__close-button {
  fill: var(--accents-error--detail);
}
.zen-pill--error .zen-pill__close-button:active,
.zen-pill--error .zen-pill__close-button:hover,
.zen-pill--error .zen-pill__close-button:focus {
  background-color: var(--accents-error--detail);
  fill: var(--accents-error--main);
}
.zen-pill--warning {
  background-color: var(--accents-warning--main);
  color: var(--accents-warning--detail);
  fill: var(--accents-warning--detail);
}
.zen-pill--warning .zen-pill__close-button {
  fill: var(--accents-warning--detail);
}
.zen-pill--warning .zen-pill__close-button:active,
.zen-pill--warning .zen-pill__close-button:hover,
.zen-pill--warning .zen-pill__close-button:focus {
  background-color: var(--accents-warning--detail);
  fill: var(--accents-warning--main);
}
.zen-pill--info {
  background-color: var(--accents-general--main);
  color: var(--accents-general--detail);
  fill: var(--accents-general--detail);
}
.zen-pill--info .zen-pill__close-button {
  fill: var(--accents-general--detail);
}
.zen-pill--info .zen-pill__close-button:active,
.zen-pill--info .zen-pill__close-button:hover,
.zen-pill--info .zen-pill__close-button:focus {
  background-color: var(--accents-general--detail);
  fill: var(--accents-general--main);
}
.zen-pill--closable {
  padding-right: 4px;
}
.zen-pill--long {
  min-width: 200px;
}
.zen-pill__close-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  fill: var(--text-primary);
  background-color: transparent;
  border: none;
  border-radius: 15px;
  padding: 0;
  margin: 0;
  margin-left: 8px;
  cursor: pointer;
}
.zen-pill__close-button:active,
.zen-pill__close-button:hover,
.zen-pill__close-button:focus {
  background-color: var(--action-secondary--default);
  fill: var(--backgrounds-content-1);
}
.zen-pill--small {
  line-height: 12px;
  padding: 2px 4px;
  max-height: 16px;
}
.zen-pill--small .zen-pill__close-button {
  height: 12px;
  width: 12px;
}
.zen-page-layout {
  box-sizing: border-box;
  overflow-x: hidden;
  overflow-y: auto;
  z-index: 1000;
  margin: 0;
  touch-action: manipulation;
  font-family: var(--main-font);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
}
.zen-page-layout * {
  box-sizing: border-box;
}
html:lang(ar) .zen-page-layout {
  font-family: var(--arabic-font-family);
}
.zen-page-layout__content {
  display: block;
  background-color: var(--backgrounds-content-0);
}
.zen-page-layout__content--floating {
  display: flex;
}
.zen-page-layout__content--edit {
  margin-top: 10px;
}
.zen-page-layout__content--old {
  background-color: var(--backgrounds-main);
}
.zen-page-section {
  box-sizing: border-box;
}
.zen-page-section * {
  box-sizing: border-box;
}
.zen-page-section__title {
  display: flex;
  margin: 16px 0;
  font-family: var(--main-font);
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  letter-spacing: 0.16px;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
  color: var(--text-secondary);
}
html:lang(ar) .zen-page-section__title {
  font-family: var(--arabic-font-family);
}
.zen-page-section__title::after {
  content: "";
  flex-grow: 1;
  margin-left: 8px;
  margin-top: 8px;
  border-top: 1px solid var(--borders-general);
}
.zen-pill-actionable {
  box-sizing: border-box;
}
.zen-pill-actionable * {
  box-sizing: border-box;
}
.zen-pill-actionable__block {
  font-family: var(--main-font);
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.32px;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
  display: flex;
  color: var(--text-primary);
  align-items: center;
  justify-content: space-between;
  padding: 4px 12px 4px 12px;
  border-radius: 30px;
  background: var(--backgrounds-content-1);
}
html:lang(ar) .zen-pill-actionable__block {
  font-family: var(--arabic-font-family);
}
.zen-pill-actionable__icon {
  display: none;
  margin-top: 2px;
  margin-right: 8px;
}
.zen-pill-actionable__input {
  position: absolute;
  left: -5000px;
}
.zen-pill-actionable__input:hover + .zen-pill-actionable__block--actionable {
  background-color: var(--backgrounds-content-2);
}
.zen-pill-actionable__input:focus + .zen-pill-actionable__block--actionable {
  background-color: var(--backgrounds-content-2);
  outline: 1px dotted var(--borders-form-field--active);
}
.zen-pill-actionable__input:checked + .zen-pill-actionable__block--actionable {
  background: var(--action-primary--default);
  color: var(--backgrounds-main);
  fill: var(--backgrounds-main);
}
.zen-pill-actionable__input:checked + .zen-pill-actionable__block--actionable .zen-pill-actionable__icon {
  display: block;
}
.zen-pill-actionable__input:disabled + .zen-pill-actionable__block--actionable {
  background-color: var(--backgrounds-field-disabled);
  color: var(--text-button-disabled);
  cursor: not-allowed;
}
.zen-pill-actionable__input--readonly:disabled + .zen-pill-actionable__block--actionable {
  color: var(--text-primary);
}
.zen-progress {
  box-sizing: border-box;
  border-radius: var(--border-radius-default);
  background-color: var(--backgrounds-content-1);
  display: flex;
  overflow: hidden;
}
.zen-progress * {
  box-sizing: border-box;
}
.zen-progress--large {
  height: 1rem;
}
.zen-progress--medium {
  height: 0.75rem;
}
.zen-progress--small {
  height: 0.5rem;
}
.zen-progress__bar {
  background-color: var(--chart-sequential-blue-5);
}
.zen-progress__bar--low {
  background-color: var(--chart-divergent-red-blue-3);
}
.zen-progress__bar--high {
  background-color: var(--chart-sequential-green-1);
}
.zen-sort-container {
  box-sizing: border-box;
  display: flex;
}
.zen-sort-container * {
  box-sizing: border-box;
}
.zen-sort-container__button {
  display: flex;
  padding: 0.4375rem 1rem;
  border-color: var(--borders-general);
  border: 1px solid var(--borders-general);
  border-radius: var(--border-radius-default);
  justify-content: center;
  align-items: center;
  background: var(--backgrounds-main);
  fill: var(--action-secondary--default);
  outline: none;
}
.zen-sort-container__button:not([disabled]) {
  cursor: pointer;
}
.zen-sort-container__button--left-item {
  border-start-end-radius: 0;
  border-end-end-radius: 0;
  margin-inline-end: -1px;
}
.zen-sort-container__button--left-item:hover,
.zen-sort-container__button--left-item:active,
.zen-sort-container__button--left-item:focus {
  z-index: 2;
}
.zen-sort-container__button--right-item {
  border-start-start-radius: 0;
  border-end-start-radius: 0;
}
.zen-sort-container__button--right-item:hover,
.zen-sort-container__button--right-item:active,
.zen-sort-container__button--right-item:focus {
  z-index: 2;
}
.zen-sort-container__button:hover,
.zen-sort-container__button:focus {
  border-color: var(--borders-form-field--hover);
  background-color: var(--backgrounds-hover);
}
.zen-sort-container__button--small {
  padding: 0.4375rem 0.5rem;
  width: 2rem;
}
.zen-sort-container__button--small:hover,
.zen-sort-container__button--small:focus {
  border-color: var(--borders-form-field--hover);
}
.zen-sort-container__button:active {
  fill: var(--text-reverse-primary);
  color: var(--text-reverse-primary);
  background-color: var(--action-secondary--default);
  border-color: var(--action-secondary--default);
}
.zen-sort-container__button:disabled {
  background-color: var(--backgrounds-main);
  border-color: var(--borders-general);
  color: var(--text-button-disabled);
  fill: var(--text-button-disabled);
}
.zen-sort-container__button:disabled.zen-sort-container__button--small {
  border-color: var(--borders-general);
  fill: var(--text-button-disabled);
  background-color: var(--backgrounds-main);
}
.zen-sort-container__arrow-icon--up {
  transform: rotate(180deg);
}
.zen-sort-container__sort-icon {
  margin-inline-end: 0.5rem;
}
.zen-sort-container__sort-icon--hidden {
  display: none;
}
.zen-sort-container__text-block {
  font-family: var(--main-font);
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.32px;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
  display: flex;
  gap: 0.25rem;
}
html:lang(ar) .zen-sort-container__text-block {
  font-family: var(--arabic-font-family);
}
.zen-sort-container.zen-sort-container--drive .zen-sort-container__text-block {
  font-family: var(--main-font);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.32px;
  line-height: 20px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .zen-sort-container.zen-sort-container--drive .zen-sort-container__text-block {
  font-family: var(--arabic-font-family);
}
.zen-sort-container.zen-sort-container--drive .zen-sort-container__button--small {
  padding: 0.6875rem;
  width: 2.75rem;
}
.zen-sort-container.zen-sort-container--drive-tablet .zen-sort-container__text-block {
  font-family: var(--main-font);
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.32px;
  line-height: 22px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .zen-sort-container.zen-sort-container--drive-tablet .zen-sort-container__text-block {
  font-family: var(--arabic-font-family);
}
.zen-sort-container.zen-sort-container--drive-tablet .zen-sort-container__button--small {
  padding: 0.75rem;
  width: 2.875rem;
}
.zen-stepper-field {
  font-family: var(--main-font);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
  display: grid;
  gap: 0.25rem;
}
html:lang(ar) .zen-stepper-field {
  font-family: var(--arabic-font-family);
}
.zen-stepper-field:not(.zen-stepper-field--disabled):hover .zen-stepper-field__controls {
  visibility: visible;
}
.zen-stepper-field__input-wrapper {
  position: relative;
}
.zen-stepper-field__input-wrapper:hover .zen-stepper-field__input:not(:disabled):not(.zen-stepper-field__input--error) {
  border-color: var(--borders-form-field--hover);
}
.zen-stepper-field__input-wrapper:focus-within .zen-stepper-field__input:not(:disabled):not(.zen-stepper-field__input--error) {
  border-color: var(--borders-form-field--active);
}
.zen-stepper-field__controls {
  display: grid;
  width: 1rem;
  height: 1rem;
  position: absolute;
  top: 0.375rem;
}
.zen-stepper-field__controls:not(:hover),
.zen-stepper-field__controls:not(:active) {
  visibility: hidden;
}
.zen-stepper-field__control {
  height: 0.625rem;
  padding: 0;
  fill: var(--action-secondary--default);
}
.zen-stepper-field__input {
  /* For Chrome, Safari, Edge, Opera */
  /* For Firefox */
  height: 2rem;
}
.zen-stepper-field__input::-webkit-outer-spin-button,
.zen-stepper-field__input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.zen-stepper-field__input[type="number"] {
  -moz-appearance: textfield;
}
.zen-stepper-field__input:hover:not(:disabled) + .zen-stepper-field__controls,
.zen-stepper-field__input:active:not(:disabled) + .zen-stepper-field__controls {
  visibility: visible;
}
.zen-stepper-field__input:focus:not(:disabled):not(.zen-stepper-field__input--error) {
  border-color: var(--borders-form-field--active);
}
.zen-stepper-field__input.zen-text-input {
  padding-inline-end: 1.5rem;
}
.zen-stepper-field__input--error:not(:disabled) {
  border-color: var(--borders-form-field--error);
}
.zen-stepper-field__input--error:not(:disabled):active,
.zen-stepper-field__input--error:not(:disabled):hover,
.zen-stepper-field__input--error:not(:disabled):focus {
  border-color: var(--borders-form-field--error);
}
.zen-stepper-field__input--error:not(:disabled):hover,
.zen-stepper-field__input--error:not(:disabled):focus,
.zen-stepper-field__input--error:not(:disabled):active {
  border-color: var(--borders-form-field--error);
}
.zen-stepper-field__input--error:not(:disabled):hover:active,
.zen-stepper-field__input--error:not(:disabled):focus:active,
.zen-stepper-field__input--error:not(:disabled):active:active,
.zen-stepper-field__input--error:not(:disabled):hover:hover,
.zen-stepper-field__input--error:not(:disabled):focus:hover,
.zen-stepper-field__input--error:not(:disabled):active:hover,
.zen-stepper-field__input--error:not(:disabled):hover:focus,
.zen-stepper-field__input--error:not(:disabled):focus:focus,
.zen-stepper-field__input--error:not(:disabled):active:focus {
  border-color: var(--borders-form-field--error);
}
.zen-stepper-field.zen-stepper-field--drive .zen-stepper-field__controls,
.zen-stepper-field.zen-stepper-field--drive-tablet .zen-stepper-field__controls {
  width: 1.25rem;
  height: 1.25rem;
}
.zen-stepper-field.zen-stepper-field--drive .zen-stepper-field__input,
.zen-stepper-field.zen-stepper-field--drive-tablet .zen-stepper-field__input {
  min-height: 3rem;
}
.zen-stepper-field.zen-stepper-field--drive .zen-stepper-field__controls,
.zen-stepper-field.zen-stepper-field--drive-tablet .zen-stepper-field__controls {
  top: 0.875rem;
}
.zen-stepper-field.zen-stepper-field--drive.zen-stepper-field--drive .zen-text-input,
.zen-stepper-field.zen-stepper-field--drive-tablet.zen-stepper-field--drive .zen-text-input {
  padding-inline-end: 1.625rem;
}
.zen-stepper-field.zen-stepper-field--drive.zen-stepper-field--drive-tablet .zen-text-input,
.zen-stepper-field.zen-stepper-field--drive-tablet.zen-stepper-field--drive-tablet .zen-text-input {
  padding-inline-end: 1.5625rem;
}
.zen-stepper-field.zen-stepper-field--mobile {
  font-family: var(--main-font);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .zen-stepper-field.zen-stepper-field--mobile {
  font-family: var(--arabic-font-family);
}
.zen-stepper-field.zen-stepper-field--mobile .zen-stepper-field__controls {
  width: 1.25rem;
  height: 1.25rem;
}
.zen-stepper-field.zen-stepper-field--mobile .zen-stepper-field__input {
  min-height: 3rem;
}
.zen-stepper-field.zen-stepper-field--mobile .zen-stepper-field__controls {
  top: 0.875rem;
}
.zen-stepper-field.zen-stepper-field--mobile.zen-stepper-field--mobile .zen-text-input {
  padding-inline-end: 1.625rem;
}
.zen-summaries__row {
  display: flex;
  align-items: top;
  flex-direction: row;
  flex-wrap: wrap;
  row-gap: 32px;
  column-gap: 56px;
}
.zen-summaries__column,
.zen-summaries__two-columns {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: flex-start;
  row-gap: 32px;
  column-gap: 32px;
  max-height: 100vh;
}
.zen-summaries__two-columns-container {
  display: flex;
  row-gap: 32px;
  column-gap: 32px;
}
.zen-tab-bar-content {
  box-sizing: border-box;
  font-family: var(--main-font);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
  display: block;
  width: 100%;
  flex-grow: 1;
}
.zen-tab-bar-content * {
  box-sizing: border-box;
}
html:lang(ar) .zen-tab-bar-content {
  font-family: var(--arabic-font-family);
}
.zen-tab-bar-content-wrapper {
  box-sizing: border-box;
  display: block;
}
.zen-tab-bar-content-wrapper * {
  box-sizing: border-box;
}
.zen-tab-bar-content-wrapper--hidden {
  display: none;
}
.zen-tab-bar {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-height: 80px;
}
.zen-tab-bar * {
  box-sizing: border-box;
}
.zen-toast {
  box-sizing: border-box;
}
.zen-toast * {
  box-sizing: border-box;
}
.zen-toolbar {
  box-sizing: border-box;
  display: flex;
  height: 56px;
  padding: 12px;
  background-color: var(--backgrounds-content-1);
  width: 100%;
  overflow-x: hidden;
}
.zen-toolbar * {
  box-sizing: border-box;
}
.zen-toolbar__content-block {
  display: flex;
  flex-shrink: 0;
}
.zen-toolbar__item {
  margin: 0 8px 0 0;
  flex-shrink: 0;
  display: flex;
}
.zen-toolbar__item--last,
.zen-toolbar__item--empty {
  margin-right: 0;
}
.zen-toolbar--separate {
  justify-content: space-between;
}
.zen-toolbar--end {
  justify-content: flex-end;
}
.zen-toolbar--start {
  justify-content: flex-start;
}
.zen-toolbar__trigger-button {
  display: flex !important;
  align-items: center;
  font-family: var(--main-font);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 28px;
  text-transform: none;
  text-decoration: none;
}
html:lang(ar) .zen-toolbar__trigger-button {
  font-family: var(--arabic-font-family);
}
.zen-toolbar__button-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 6px;
  margin-left: 6px;
  pointer-events: none;
}
.zen-toolbar__dropdown-block {
  display: flex;
}
.zen-toolbar__dropdown-block--end {
  justify-content: flex-end;
}
.zen-toolbar__dropdown-block--start {
  justify-content: flex-start;
}
.zen-toolbar__dropdown-area {
  min-width: 0;
  max-width: 260px;
  background-color: var(--backgrounds-content-0);
  padding: 8px;
}
.zen-toolbar__popup-item {
  margin-bottom: 8px;
}
.zen-toolbar__popup-item--last {
  margin-bottom: 0;
}
.zen-toolbar__more-button .zen-toolbar__popup-item :first-child {
  width: 100%;
}
.zen-two-options-switcher {
  font-family: var(--main-font);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 16px;
  text-transform: none;
  text-decoration: none;
  box-sizing: border-box;
  --backgroundSwitcher: var(--action-primary--default);
  --backgroundRunner: var(--backgrounds-main);
  display: flex;
  align-items: center;
}
html:lang(ar) .zen-two-options-switcher {
  font-family: var(--arabic-font-family);
}
.zen-two-options-switcher * {
  box-sizing: border-box;
}
.zen-two-options-switcher__label {
  cursor: pointer;
  padding: 0.1875rem;
  color: var(--text-primary);
}
.zen-two-options-switcher__label--left {
  margin-inline-end: 0.375rem;
}
.zen-two-options-switcher__label--right {
  margin-inline-start: 0.375rem;
}
.zen-two-options-switcher__input {
  position: absolute;
  width: 0;
  height: 0;
  opacity: 0;
}
.zen-two-options-switcher__input:disabled {
  pointer-events: none;
}
.zen-two-options-switcher__input:checked(:not(:disabled)) + .zen-two-options-switcher__label {
  font-weight: 500;
}
.zen-two-options-switcher__input:focus + .zen-two-options-switcher__label {
  outline: auto;
}
.zen-two-options-switcher-control {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 1.875rem;
  min-width: 1.875rem;
  height: 1rem;
  min-height: 1rem;
  border-radius: 1rem;
  padding: 0.125rem;
  background-color: var(--backgroundSwitcher);
  overflow: visible;
  position: relative;
  cursor: pointer;
}
.zen-two-options-switcher-control__focus {
  display: none;
  position: absolute;
  width: 1.625rem;
  min-width: 1.625rem;
  height: 1.625rem;
  min-height: 1.625rem;
  border-radius: 50%;
  opacity: 0.4;
  top: -0.3125rem;
  background-color: var(--backgroundSwitcher);
  inset-inline-start: -0.3125rem;
}
.zen-two-options-switcher-control__runner {
  width: 0.75rem;
  min-width: 0.75rem;
  height: 0.75rem;
  min-height: 0.75rem;
  border-radius: 50%;
  background-color: var(--backgroundRunner);
}
.zen-two-options-switcher-control--disabled {
  opacity: 0.6;
}
.zen-two-options-switcher-control--disabled .zen-two-options-switcher-control__focus {
  visibility: hidden;
}
.zen-two-options-switcher-control:hover .zen-two-options-switcher-control__focus {
  display: block;
}
.zen-two-options-switcher-control--right {
  justify-content: flex-end;
}
.zen-two-options-switcher-control--right .zen-two-options-switcher-control__focus {
  inset-inline-start: 0.625rem;
}
`;var Hm=`/* Fleet Insights \u2014 GPSFMS brand on top of Zenith */
.fi-page-host { --fi-navy: #25477B; --fi-blue: #0084C2; --fi-ink: #1C2B39; --fi-ink-2: #56637a; --fi-line: #e3e7ee;
    --fi-surface: #ffffff; --fi-surface-2: #F4F4F4; --fi-ok: #1f8a3b; --fi-warn: #d98c00; --fi-bad: #d8403f;
    --fi-ok-bg: #e5f4e9; --fi-warn-bg: #fff2d9; --fi-bad-bg: #fde6e5; --fi-na-bg: #eef1f5; }

.fi-root { font-family: Roboto, "Segoe UI", Arial, sans-serif; color: var(--fi-ink); padding: 16px 24px 40px; background: var(--fi-surface-2); min-height: 100%; box-sizing: border-box; }
.fi-root * { box-sizing: border-box; }
.fi-header { display: flex; justify-content: space-between; align-items: flex-start; gap: 16px; flex-wrap: wrap; margin-bottom: 14px; }
.fi-title { margin: 0; font-size: 22px; font-weight: 500; color: var(--fi-navy); }
.fi-byline { font-size: 12px; font-weight: 400; color: var(--fi-ink-2); margin-left: 6px; }
.fi-sub { font-size: 13px; color: var(--fi-ink); margin-top: 2px; }
.fi-actions { display: flex; gap: 8px; align-items: center; flex-wrap: wrap; }
.fi-muted { color: var(--fi-ink-2); }
.fi-small { font-size: 12px; }
.fi-right { text-align: right; }
.fi-progress { font-size: 12px; color: var(--fi-blue); margin: -6px 0 8px; }

/* cards */
.fi-card { background: var(--fi-surface); border: 1px solid var(--fi-line); border-radius: 10px; padding: 16px 18px; margin-bottom: 14px; }
.fi-card--flat { border: none; padding: 0; margin-bottom: 18px; }
.fi-card h3 { margin: 0; font-size: 16px; font-weight: 500; color: var(--fi-navy); }
.fi-card h4 { margin: 0 0 8px; font-size: 14px; font-weight: 500; color: var(--fi-navy); }
.fi-card h5 { margin: 10px 0 4px; font-size: 13px; font-weight: 500; color: var(--fi-blue); }
.fi-card-head { display: flex; justify-content: space-between; align-items: flex-start; gap: 12px; flex-wrap: wrap; margin-bottom: 10px; }
.fi-card-head--tight { margin-bottom: 6px; }
.fi-card-head p { margin: 2px 0 0; font-size: 12.5px; }
.fi-grid-2 { display: grid; grid-template-columns: minmax(0, 3fr) minmax(0, 2fr); gap: 14px; align-items: start; }
.fi-grid-2--settings { grid-template-columns: minmax(0, 3fr) minmax(0, 2fr); }
@media (max-width: 1100px) { .fi-grid-2, .fi-grid-2--settings { grid-template-columns: 1fr; } }

/* KPIs */
.fi-kpis { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 14px; margin-bottom: 14px; }
.fi-kpis--3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
@media (max-width: 1000px) { .fi-kpis { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
.fi-kpi { background: var(--fi-surface); border: 1px solid var(--fi-line); border-radius: 10px; padding: 14px 16px; border-top: 3px solid var(--fi-blue); }
.fi-kpi--mini { padding: 10px 12px; }
.fi-kpi-title { font-size: 12.5px; color: var(--fi-ink-2); }
.fi-kpi-value { font-size: 26px; font-weight: 500; color: var(--fi-ink); margin: 2px 0; display: flex; align-items: center; gap: 10px; }
.fi-kpi--mini .fi-kpi-value { font-size: 20px; }
.fi-kpi-badge { font-size: 12px; }
.fi-kpi-foot { display: flex; justify-content: space-between; align-items: center; font-size: 12.5px; gap: 8px; }

/* chart */
.fi-chart { position: relative; }
.fi-grid { stroke: var(--fi-line); stroke-width: 1; }
.fi-baseline { stroke: #c9d0da; stroke-width: 1; }
.fi-axis { font-size: 11px; fill: var(--fi-ink-2); }
.fi-axis--strong { fill: var(--fi-ink); font-weight: 500; }
.fi-label { font-size: 11.5px; fill: var(--fi-ink); font-weight: 500; }
.fi-bar { fill: #8fc6e6; transition: fill .12s; }
.fi-bar--current { fill: var(--fi-blue); }
.fi-bar--selected { stroke: var(--fi-navy); stroke-width: 2; }
.fi-bar--na { fill: #d9dee6; }
g:hover > .fi-bar { fill: var(--fi-navy); }
.fi-tip { position: absolute; right: 12px; top: 4px; background: var(--fi-ink); color: #fff; border-radius: 6px; padding: 6px 10px; font-size: 12px; display: flex; flex-direction: column; gap: 2px; pointer-events: none; }
.fi-tip-sub { opacity: .8; }
.fi-spark-line { stroke: var(--fi-blue); stroke-width: 1.5; }
.fi-spark-dot { fill: var(--fi-navy); }

/* hbar */
.fi-hbar { position: relative; height: 22px; background: var(--fi-surface-2); border-radius: 4px; overflow: hidden; min-width: 80px; }
.fi-hbar-fill { position: absolute; left: 0; top: 0; bottom: 0; border-radius: 4px; }
.fi-hbar--neutral { background: #8fc6e6; }
.fi-hbar--ok { background: #8fd09d; }
.fi-hbar--warn { background: #f3c66b; }
.fi-hbar--bad { background: #f29a99; }
.fi-hbar-label { position: absolute; left: 8px; top: 0; line-height: 22px; font-size: 12.5px; font-weight: 500; color: var(--fi-ink); }

/* trend + pills */
.fi-trend { font-size: 12.5px; font-weight: 500; white-space: nowrap; }
.fi-trend--good { color: var(--fi-ok); }
.fi-trend--bad { color: var(--fi-bad); }
.fi-trend--flat { color: var(--fi-ink-2); }
.fi-pill { display: inline-block; font-size: 11.5px; font-weight: 500; padding: 2px 8px; border-radius: 999px; }
.fi-pill--ok { background: var(--fi-ok-bg); color: var(--fi-ok); }
.fi-pill--warn { background: var(--fi-warn-bg); color: #8a5a00; }
.fi-pill--bad { background: var(--fi-bad-bg); color: var(--fi-bad); }
.fi-pill--na { background: var(--fi-na-bg); color: var(--fi-ink-2); }
.fi-chips { display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 8px; }
.fi-chip { background: var(--fi-surface-2); border-radius: 999px; padding: 2px 10px; font-size: 12px; }

/* tabs + crumbs */
.fi-tabs { display: inline-flex; border: 1px solid var(--fi-line); border-radius: 8px; overflow: hidden; }
.fi-tab { background: #fff; border: none; padding: 6px 12px; font: inherit; font-size: 13px; color: var(--fi-ink-2); cursor: pointer; }
.fi-tab + .fi-tab { border-left: 1px solid var(--fi-line); }
.fi-tab--on { background: var(--fi-navy); color: #fff; }
.fi-crumbs { font-size: 12.5px; margin-top: 2px; display: flex; flex-wrap: wrap; align-items: center; gap: 2px; }
.fi-crumb { background: none; border: none; padding: 0 2px; font: inherit; font-size: 12.5px; color: var(--fi-blue); cursor: pointer; }
.fi-crumb--current { color: var(--fi-ink); cursor: default; font-weight: 500; }
.fi-crumb--reset { margin-left: 8px; color: var(--fi-ink-2); text-decoration: underline; }
.fi-crumb-sep { color: var(--fi-ink-2); padding: 0 2px; }
.fi-link { color: var(--fi-blue); font-weight: 500; }

/* tables */
.fi-table-wrap { overflow-x: auto; }
.fi-table-wrap--scroll { max-height: 360px; overflow-y: auto; }
.fi-table { width: 100%; border-collapse: collapse; font-size: 13px; }
.fi-table th { text-align: left; font-weight: 500; color: var(--fi-ink-2); font-size: 11.5px; text-transform: uppercase; letter-spacing: .03em; padding: 8px 8px; border-bottom: 1px solid var(--fi-line); white-space: nowrap; cursor: pointer; user-select: none; }
.fi-table th.fi-th--sorted { color: var(--fi-navy); }
.fi-sort-ind { margin-left: 4px; opacity: .6; font-size: 10px; }
.fi-table td { padding: 8px 8px; border-bottom: 1px solid var(--fi-line); vertical-align: middle; }
.fi-table--compact td, .fi-table--compact th { padding: 6px 8px; }
.fi-table tbody tr:nth-child(even) td { background: #fafbfc; }
.fi-row--click { cursor: pointer; }
.fi-row--click:hover td { background: #eef6fb !important; }
.fi-empty { text-align: center; color: var(--fi-ink-2); padding: 18px !important; }

/* drawer */
.fi-drawer-backdrop { position: fixed; inset: 0; background: rgba(16, 24, 40, .35); z-index: 10050; display: flex; justify-content: flex-end; }
.fi-drawer { width: min(860px, 96vw); height: 100%; background: #fff; box-shadow: -8px 0 40px rgba(0,0,0,.3); padding: 18px 22px 40px; overflow-y: auto; font-family: Roboto, "Segoe UI", Arial, sans-serif; color: var(--fi-ink); }
.fi-drawer-head { display: flex; justify-content: space-between; align-items: flex-start; gap: 12px; margin-bottom: 14px; }
.fi-drawer-head h3 { margin: 0; font-size: 20px; font-weight: 500; color: var(--fi-navy); }

/* settings */
.fi-settings { background: var(--fi-surface); border: 1px solid var(--fi-line); border-radius: 10px; padding: 16px 18px; }
.fi-input { font: inherit; font-size: 13px; padding: 6px 8px; border: 1px solid #c9d0da; border-radius: 6px; background: #fff; color: var(--fi-ink); width: 100%; }
.fi-input--num { width: 90px; text-align: right; }
.fi-rule-picker { margin-top: 12px; }
.fi-rule-list { list-style: none; margin: 8px 0 0; padding: 0; max-height: 320px; overflow-y: auto; border: 1px solid var(--fi-line); border-radius: 6px; }
.fi-rule-list li { padding: 5px 10px; border-bottom: 1px solid var(--fi-line); font-size: 13px; }
.fi-rule-list li:last-child { border-bottom: none; }
.fi-rule-list label { display: flex; gap: 8px; align-items: center; cursor: pointer; }
.fi-linkbtn { background: none; border: none; color: var(--fi-bad); font: inherit; font-size: 12.5px; cursor: pointer; padding: 0; }
.fi-form { display: flex; flex-direction: column; gap: 12px; }
.fi-field > span { display: block; font-size: 12.5px; color: var(--fi-ink-2); margin-bottom: 4px; }
.fi-bands { display: flex; gap: 14px; align-items: center; flex-wrap: wrap; font-size: 13px; }
.fi-bands label { display: inline-flex; gap: 6px; align-items: center; }
.fi-formula { margin-top: 16px; background: var(--fi-surface-2); border-radius: 8px; padding: 10px 12px; }
.fi-formula code { display: block; font-size: 12.5px; color: var(--fi-ink); padding: 4px 0; }
.fi-formula p { margin: 4px 0 0; font-size: 12px; }
`;var Vm=F(R(),1),qm="fi-addin-styles";function Lv(){if(document.getElementById(qm))return;let e=document.createElement("style");e.id=qm,e.textContent=Am+`
`+Hm,document.head.appendChild(e)}function Ov(e){try{let t=e&&typeof e.getGroupFilter=="function"?e.getGroupFilter():null;return Array.isArray(t)?t.map(n=>({id:n.id})):[]}catch{return[]}}typeof geotab!="undefined"&&(geotab.addin=geotab.addin||{},geotab.addin.fleetInsights=function(){let e=null,t=null,n=0;function r(o,i){if(t||(t=document.getElementById("fleetInsights-root")||document.getElementById("checkmateContent")||document.body),Lv(),!e){let a=document.createElement("div");a.className="fi-page-host",t.appendChild(a),e=(0,Wm.createRoot)(a)}e.render((0,Vm.jsx)(Sd,{api:o,groupFilter:Ov(i),focusNonce:n}))}return{initialize(o,i,a){r(o,i),a()},focus(o,i){n++,r(o,i)},blur(){}}});})();
/*! Bundled license information:

react/cjs/react.production.min.js:
  (**
   * @license React
   * react.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

scheduler/cjs/scheduler.production.min.js:
  (**
   * @license React
   * scheduler.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react-dom/cjs/react-dom.production.min.js:
  (**
   * @license React
   * react-dom.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react/cjs/react-jsx-runtime.production.min.js:
  (**
   * @license React
   * react-jsx-runtime.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)
*/
