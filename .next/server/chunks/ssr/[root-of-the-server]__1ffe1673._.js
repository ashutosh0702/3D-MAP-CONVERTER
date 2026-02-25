module.exports=[56704,(a,b,c)=>{b.exports=a.x("next/dist/server/app-render/work-async-storage.external.js",()=>require("next/dist/server/app-render/work-async-storage.external.js"))},32319,(a,b,c)=>{b.exports=a.x("next/dist/server/app-render/work-unit-async-storage.external.js",()=>require("next/dist/server/app-render/work-unit-async-storage.external.js"))},20635,(a,b,c)=>{b.exports=a.x("next/dist/server/app-render/action-async-storage.external.js",()=>require("next/dist/server/app-render/action-async-storage.external.js"))},9270,(a,b,c)=>{"use strict";b.exports=a.r(42602).vendored.contexts.AppRouterContext},36313,(a,b,c)=>{"use strict";b.exports=a.r(42602).vendored.contexts.HooksClientContext},18341,(a,b,c)=>{"use strict";b.exports=a.r(42602).vendored.contexts.ServerInsertedHtml},46058,(a,b,c)=>{"use strict";function d(a){if("function"!=typeof WeakMap)return null;var b=new WeakMap,c=new WeakMap;return(d=function(a){return a?c:b})(a)}c._=function(a,b){if(!b&&a&&a.__esModule)return a;if(null===a||"object"!=typeof a&&"function"!=typeof a)return{default:a};var c=d(b);if(c&&c.has(a))return c.get(a);var e={__proto__:null},f=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var g in a)if("default"!==g&&Object.prototype.hasOwnProperty.call(a,g)){var h=f?Object.getOwnPropertyDescriptor(a,g):null;h&&(h.get||h.set)?Object.defineProperty(e,g,h):e[g]=a[g]}return e.default=a,c&&c.set(a,e),e}},39118,(a,b,c)=>{"use strict";Object.defineProperty(c,"__esModule",{value:!0});var d={DEFAULT_SEGMENT_KEY:function(){return l},NOT_FOUND_SEGMENT_KEY:function(){return m},PAGE_SEGMENT_KEY:function(){return k},addSearchParamsIfPageSegment:function(){return i},computeSelectedLayoutSegment:function(){return j},getSegmentValue:function(){return f},getSelectedLayoutSegmentPath:function(){return function a(b,c,d=!0,e=[]){let g;if(d)g=b[1][c];else{let a=b[1];g=a.children??Object.values(a)[0]}if(!g)return e;let h=f(g[0]);return!h||h.startsWith(k)?e:(e.push(h),a(g,c,!1,e))}},isGroupSegment:function(){return g},isParallelRouteSegment:function(){return h}};for(var e in d)Object.defineProperty(c,e,{enumerable:!0,get:d[e]});function f(a){return Array.isArray(a)?a[1]:a}function g(a){return"("===a[0]&&a.endsWith(")")}function h(a){return a.startsWith("@")&&"@children"!==a}function i(a,b){if(a.includes(k)){let a=JSON.stringify(b);return"{}"!==a?k+"?"+a:k}return a}function j(a,b){if(!a||0===a.length)return null;let c="children"===b?a[0]:a[a.length-1];return c===l?null:c}let k="__PAGE__",l="__DEFAULT__",m="/_not-found"},70616,a=>{"use strict";var b=a.i(87924),c=a.i(72131),d=a.i(50944);function e(){let a=(0,d.useRouter)(),[e,f]=(0,c.useState)(""),[g,h]=(0,c.useState)(""),[i,j]=(0,c.useState)("PIN_LOCATIONS"),[k,l]=(0,c.useState)(""),[m,n]=(0,c.useState)(""),[o,p]=(0,c.useState)(!1),[q,r]=(0,c.useState)(""),s=async b=>{if(b.preventDefault(),!e.trim())return void r("Give your trip a name");p(!0),r("");try{let b=await fetch("/api/trips",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({title:e,description:g,inputMode:i,startDate:k||null,endDate:m||null})});if(!b.ok){let a=await b.json();r(a.error||"Failed to create trip");return}let c=await b.json();a.push(`/trip/${c.id}/plan`)}catch{r("Something went wrong")}finally{p(!1)}};return(0,b.jsxs)("div",{className:"new-trip-page",children:[(0,b.jsx)("div",{className:"new-trip-container",children:(0,b.jsxs)("div",{className:"new-trip-card glass-card",children:[(0,b.jsx)("h1",{className:"heading-lg",style:{marginBottom:"0.25rem"},children:"New Adventure"}),(0,b.jsx)("p",{className:"text-muted",style:{marginBottom:"1.5rem"},children:"Set up your trip and start planning on the map"}),q&&(0,b.jsx)("div",{className:"auth-error",style:{marginBottom:"1rem"},children:q}),(0,b.jsxs)("form",{onSubmit:s,style:{display:"flex",flexDirection:"column",gap:"1rem"},children:[(0,b.jsxs)("div",{className:"input-group",children:[(0,b.jsx)("label",{htmlFor:"title",children:"Trip Name *"}),(0,b.jsx)("input",{id:"title",type:"text",className:"input",placeholder:"e.g. Himalayan Trek 2026",value:e,onChange:a=>f(a.target.value),required:!0})]}),(0,b.jsxs)("div",{className:"input-group",children:[(0,b.jsx)("label",{htmlFor:"description",children:"Description"}),(0,b.jsx)("textarea",{id:"description",className:"input",placeholder:"What's this trip about?",value:g,onChange:a=>h(a.target.value),rows:3,style:{resize:"vertical",fontFamily:"inherit"}})]}),(0,b.jsxs)("div",{className:"input-group",children:[(0,b.jsx)("label",{children:"Planning Mode"}),(0,b.jsxs)("div",{className:"mode-toggle",children:[(0,b.jsxs)("button",{type:"button",className:`mode-option ${"PIN_LOCATIONS"===i?"active":""}`,onClick:()=>j("PIN_LOCATIONS"),children:[(0,b.jsx)("span",{className:"mode-icon",children:"📍"}),(0,b.jsx)("span",{className:"mode-label",children:"Pin Locations"}),(0,b.jsx)("span",{className:"mode-desc",children:"Click to place stops on the map"})]}),(0,b.jsxs)("button",{type:"button",className:`mode-option ${"DRAW_ROUTE"===i?"active":""}`,onClick:()=>j("DRAW_ROUTE"),children:[(0,b.jsx)("span",{className:"mode-icon",children:"✏️"}),(0,b.jsx)("span",{className:"mode-label",children:"Draw Route"}),(0,b.jsx)("span",{className:"mode-desc",children:"Draw your path on the map"})]})]})]}),(0,b.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"1rem"},children:[(0,b.jsxs)("div",{className:"input-group",children:[(0,b.jsx)("label",{htmlFor:"startDate",children:"Start Date"}),(0,b.jsx)("input",{id:"startDate",type:"date",className:"input",value:k,onChange:a=>l(a.target.value)})]}),(0,b.jsxs)("div",{className:"input-group",children:[(0,b.jsx)("label",{htmlFor:"endDate",children:"End Date"}),(0,b.jsx)("input",{id:"endDate",type:"date",className:"input",value:m,onChange:a=>n(a.target.value)})]})]}),(0,b.jsx)("button",{type:"submit",className:"btn btn-primary btn-lg",disabled:o,style:{marginTop:"0.5rem"},children:o?"Creating...":"Create Trip & Open Map"})]}),(0,b.jsx)("button",{className:"btn btn-ghost",onClick:()=>a.push("/dashboard"),style:{marginTop:"0.5rem",width:"100%"},children:"← Back to Dashboard"})]})}),(0,b.jsx)("style",{children:`
        .new-trip-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--gradient-hero);
          padding: var(--space-lg);
        }

        .new-trip-container {
          width: 100%;
          max-width: 520px;
          animation: fadeInUp 0.5s ease-out;
        }

        .new-trip-card {
          padding: var(--space-2xl);
        }

        .auth-error {
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.2);
          border-radius: var(--radius-md);
          padding: var(--space-sm) var(--space-md);
          color: #fca5a5;
          font-size: 0.85rem;
          text-align: center;
        }

        .mode-toggle {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--space-sm);
        }

        .mode-option {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.3rem;
          padding: var(--space-md);
          background: var(--bg-secondary);
          border: 2px solid var(--border-subtle);
          border-radius: var(--radius-md);
          cursor: pointer;
          transition: all var(--transition-fast);
          font-family: inherit;
          color: var(--text-primary);
        }

        .mode-option:hover {
          border-color: var(--border-medium);
        }

        .mode-option.active {
          border-color: var(--accent-primary);
          background: rgba(6, 182, 212, 0.05);
          box-shadow: 0 0 0 3px rgba(6, 182, 212, 0.1);
        }

        .mode-icon {
          font-size: 1.5rem;
        }

        .mode-label {
          font-weight: 600;
          font-size: 0.9rem;
        }

        .mode-desc {
          font-size: 0.7rem;
          color: var(--text-muted);
          text-align: center;
        }

        textarea.input {
          min-height: 80px;
        }

        input[type="date"].input {
          color-scheme: dark;
        }
      `})]})}a.s(["default",()=>e])}];

//# sourceMappingURL=%5Broot-of-the-server%5D__1ffe1673._.js.map