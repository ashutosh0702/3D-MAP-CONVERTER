(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,18566,(e,a,t)=>{a.exports=e.r(76562)},70876,e=>{"use strict";var a=e.i(43476),t=e.i(71645),r=e.i(18566);function i(){let e=(0,r.useRouter)(),[i,s]=(0,t.useState)(""),[n,l]=(0,t.useState)(""),[o,d]=(0,t.useState)("PIN_LOCATIONS"),[c,p]=(0,t.useState)(""),[m,u]=(0,t.useState)(""),[h,g]=(0,t.useState)(!1),[x,b]=(0,t.useState)(""),v=async a=>{if(a.preventDefault(),!i.trim())return void b("Give your trip a name");g(!0),b("");try{let a=await fetch("/api/trips",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({title:i,description:n,inputMode:o,startDate:c||null,endDate:m||null})});if(!a.ok){let e=await a.json();b(e.error||"Failed to create trip");return}let t=await a.json();e.push(`/trip/${t.id}/plan`)}catch{b("Something went wrong")}finally{g(!1)}};return(0,a.jsxs)("div",{className:"new-trip-page",children:[(0,a.jsx)("div",{className:"new-trip-container",children:(0,a.jsxs)("div",{className:"new-trip-card glass-card",children:[(0,a.jsx)("h1",{className:"heading-lg",style:{marginBottom:"0.25rem"},children:"New Adventure"}),(0,a.jsx)("p",{className:"text-muted",style:{marginBottom:"1.5rem"},children:"Set up your trip and start planning on the map"}),x&&(0,a.jsx)("div",{className:"auth-error",style:{marginBottom:"1rem"},children:x}),(0,a.jsxs)("form",{onSubmit:v,style:{display:"flex",flexDirection:"column",gap:"1rem"},children:[(0,a.jsxs)("div",{className:"input-group",children:[(0,a.jsx)("label",{htmlFor:"title",children:"Trip Name *"}),(0,a.jsx)("input",{id:"title",type:"text",className:"input",placeholder:"e.g. Himalayan Trek 2026",value:i,onChange:e=>s(e.target.value),required:!0})]}),(0,a.jsxs)("div",{className:"input-group",children:[(0,a.jsx)("label",{htmlFor:"description",children:"Description"}),(0,a.jsx)("textarea",{id:"description",className:"input",placeholder:"What's this trip about?",value:n,onChange:e=>l(e.target.value),rows:3,style:{resize:"vertical",fontFamily:"inherit"}})]}),(0,a.jsxs)("div",{className:"input-group",children:[(0,a.jsx)("label",{children:"Planning Mode"}),(0,a.jsxs)("div",{className:"mode-toggle",children:[(0,a.jsxs)("button",{type:"button",className:`mode-option ${"PIN_LOCATIONS"===o?"active":""}`,onClick:()=>d("PIN_LOCATIONS"),children:[(0,a.jsx)("span",{className:"mode-icon",children:"📍"}),(0,a.jsx)("span",{className:"mode-label",children:"Pin Locations"}),(0,a.jsx)("span",{className:"mode-desc",children:"Click to place stops on the map"})]}),(0,a.jsxs)("button",{type:"button",className:`mode-option ${"DRAW_ROUTE"===o?"active":""}`,onClick:()=>d("DRAW_ROUTE"),children:[(0,a.jsx)("span",{className:"mode-icon",children:"✏️"}),(0,a.jsx)("span",{className:"mode-label",children:"Draw Route"}),(0,a.jsx)("span",{className:"mode-desc",children:"Draw your path on the map"})]})]})]}),(0,a.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"1rem"},children:[(0,a.jsxs)("div",{className:"input-group",children:[(0,a.jsx)("label",{htmlFor:"startDate",children:"Start Date"}),(0,a.jsx)("input",{id:"startDate",type:"date",className:"input",value:c,onChange:e=>p(e.target.value)})]}),(0,a.jsxs)("div",{className:"input-group",children:[(0,a.jsx)("label",{htmlFor:"endDate",children:"End Date"}),(0,a.jsx)("input",{id:"endDate",type:"date",className:"input",value:m,onChange:e=>u(e.target.value)})]})]}),(0,a.jsx)("button",{type:"submit",className:"btn btn-primary btn-lg",disabled:h,style:{marginTop:"0.5rem"},children:h?"Creating...":"Create Trip & Open Map"})]}),(0,a.jsx)("button",{className:"btn btn-ghost",onClick:()=>e.push("/dashboard"),style:{marginTop:"0.5rem",width:"100%"},children:"← Back to Dashboard"})]})}),(0,a.jsx)("style",{children:`
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
      `})]})}e.s(["default",()=>i])}]);