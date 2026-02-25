module.exports=[54799,(a,b,c)=>{b.exports=a.x("crypto",()=>require("crypto"))},63021,(a,b,c)=>{b.exports=a.x("@prisma/client-2c3a283f134fdcb6",()=>require("@prisma/client-2c3a283f134fdcb6"))},790,(a,b,c)=>{let{createClientModuleProxy:d}=a.r(11857);a.n(d("[project]/node_modules/next/dist/client/app-dir/link.js <module evaluation>"))},84707,(a,b,c)=>{let{createClientModuleProxy:d}=a.r(11857);a.n(d("[project]/node_modules/next/dist/client/app-dir/link.js"))},97647,a=>{"use strict";a.i(790);var b=a.i(84707);a.n(b)},95936,(a,b,c)=>{"use strict";Object.defineProperty(c,"__esModule",{value:!0});var d={default:function(){return i},useLinkStatus:function(){return h.useLinkStatus}};for(var e in d)Object.defineProperty(c,e,{enumerable:!0,get:d[e]});let f=a.r(64240),g=a.r(7997),h=f._(a.r(97647));function i(a){let b=a.legacyBehavior,c="string"==typeof a.children||"number"==typeof a.children||"string"==typeof a.children?.type,d=a.children?.type?.$$typeof===Symbol.for("react.client.reference");return!b||c||d||(a.children?.type?.$$typeof===Symbol.for("react.lazy")?console.error("Using a Lazy Component as a direct child of `<Link legacyBehavior>` from a Server Component is not supported. If you need legacyBehavior, wrap your Lazy Component in a Client Component that renders the Link's `<a>` tag."):console.error("Using a Server Component as a direct child of `<Link legacyBehavior>` is not supported. If you need legacyBehavior, wrap your Server Component in a Client Component that renders the Link's `<a>` tag.")),(0,g.jsx)(h.default,{...a})}("function"==typeof c.default||"object"==typeof c.default&&null!==c.default)&&void 0===c.default.__esModule&&(Object.defineProperty(c.default,"__esModule",{value:!0}),Object.assign(c.default,c),b.exports=c.default)},37936,(a,b,c)=>{"use strict";Object.defineProperty(c,"__esModule",{value:!0}),Object.defineProperty(c,"registerServerReference",{enumerable:!0,get:function(){return d.registerServerReference}});let d=a.r(11857)},99123,a=>{"use strict";var b=a.i(7997),c=a.i(37936),d=a.i(9307);a.i(70396);var e=a.i(73727),f=a.i(95936),g=a.i(63021);let h=globalThis.prisma??new g.PrismaClient({log:[]}),i=async function(){let{signOut:b}=await a.A(94394);await b({redirectTo:"/"})};async function j(){let a=await (0,d.auth)();a||(0,e.redirect)("/login");let c=await h.trip.findMany({where:{userId:a.user.id},orderBy:{updatedAt:"desc"},include:{_count:{select:{stops:!0,photos:!0,logs:!0}}}}),g={PLANNING:"badge-planning",ACTIVE:"badge-active",COMPLETED:"badge-completed"};return(0,b.jsxs)("div",{className:"dashboard",children:[(0,b.jsx)("nav",{className:"dashboard-nav",children:(0,b.jsxs)("div",{className:"dashboard-nav-inner",children:[(0,b.jsx)(f.default,{href:"/dashboard",className:"dashboard-brand",children:"TripDiorama"}),(0,b.jsxs)("div",{className:"dashboard-nav-right",children:[(0,b.jsx)("span",{className:"dashboard-user",children:a.user.name||a.user.email}),(0,b.jsx)("form",{action:i,children:(0,b.jsx)("button",{type:"submit",className:"btn btn-ghost btn-sm",children:"Sign Out"})})]})]})}),(0,b.jsxs)("main",{className:"page-container dashboard-main",children:[(0,b.jsxs)("div",{className:"dashboard-header",children:[(0,b.jsxs)("div",{children:[(0,b.jsx)("h1",{className:"heading-lg",children:"Your Trips"}),(0,b.jsx)("p",{className:"text-muted",children:"Plan, explore, and remember your adventures"})]}),(0,b.jsx)(f.default,{href:"/trip/new",className:"btn btn-primary",children:"+ New Trip"})]}),0===c.length?(0,b.jsxs)("div",{className:"dashboard-empty glass-card",children:[(0,b.jsx)("div",{className:"empty-icon",children:"🌍"}),(0,b.jsx)("h3",{children:"No trips yet"}),(0,b.jsx)("p",{className:"text-muted",children:"Start planning your first adventure and turn it into a beautiful 3D diorama."}),(0,b.jsx)(f.default,{href:"/trip/new",className:"btn btn-primary",children:"Create Your First Trip"})]}):(0,b.jsx)("div",{className:"trips-grid",children:c.map(a=>(0,b.jsxs)(f.default,{href:`/trip/${a.id}/plan`,className:"trip-card glass-card",children:[(0,b.jsxs)("div",{className:"trip-card-header",children:[(0,b.jsx)("h3",{className:"heading-sm",children:a.title}),(0,b.jsx)("span",{className:`badge ${g[a.status]}`,children:a.status.toLowerCase()})]}),a.description&&(0,b.jsx)("p",{className:"trip-card-desc text-muted",children:a.description}),(0,b.jsxs)("div",{className:"trip-card-meta",children:[(0,b.jsxs)("span",{children:["📍 ",a._count.stops," stops"]}),(0,b.jsxs)("span",{children:["📸 ",a._count.photos," photos"]}),(0,b.jsxs)("span",{children:["📝 ",a._count.logs," entries"]})]}),(0,b.jsxs)("div",{className:"trip-card-dates text-muted",children:[a.startDate?new Date(a.startDate).toLocaleDateString("en-US",{month:"short",day:"numeric"}):"No dates set",a.endDate&&` — ${new Date(a.endDate).toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})}`]})]},a.id))})]}),(0,b.jsx)("style",{children:`
        .dashboard {
          min-height: 100vh;
          background: var(--bg-primary);
        }

        .dashboard-nav {
          position: sticky;
          top: 0;
          z-index: 50;
          padding: var(--space-md) var(--space-lg);
          background: rgba(10, 14, 26, 0.8);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-bottom: 1px solid var(--border-subtle);
        }

        .dashboard-nav-inner {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .dashboard-brand {
          font-family: var(--font-display);
          font-size: 1.2rem;
          font-weight: 800;
          background: var(--gradient-primary);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .dashboard-nav-right {
          display: flex;
          align-items: center;
          gap: var(--space-md);
        }

        .dashboard-user {
          font-size: 0.85rem;
          color: var(--text-secondary);
        }

        .dashboard-main {
          padding-top: var(--space-2xl);
        }

        .dashboard-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: var(--space-xl);
          animation: fadeInUp 0.4s ease-out;
        }

        .dashboard-empty {
          text-align: center;
          padding: var(--space-3xl);
          animation: fadeInUp 0.5s ease-out;
        }

        .empty-icon {
          font-size: 3rem;
          margin-bottom: var(--space-md);
        }

        .dashboard-empty h3 {
          font-family: var(--font-display);
          font-size: 1.25rem;
          margin-bottom: var(--space-sm);
        }

        .dashboard-empty p {
          margin-bottom: var(--space-lg);
          max-width: 400px;
          margin-left: auto;
          margin-right: auto;
        }

        .trips-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: var(--space-lg);
        }

        .trip-card {
          padding: var(--space-lg);
          display: flex;
          flex-direction: column;
          gap: var(--space-sm);
          animation: fadeInUp 0.5s ease-out;
          text-decoration: none;
          color: inherit;
        }

        .trip-card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: var(--space-sm);
        }

        .trip-card-desc {
          font-size: 0.85rem;
          line-height: 1.5;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .trip-card-meta {
          display: flex;
          gap: var(--space-md);
          font-size: 0.8rem;
          color: var(--text-secondary);
        }

        .trip-card-dates {
          font-size: 0.75rem;
          margin-top: auto;
          padding-top: var(--space-sm);
          border-top: 1px solid var(--border-subtle);
        }

        @media (max-width: 768px) {
          .dashboard-header {
            flex-direction: column;
            gap: var(--space-md);
          }

          .trips-grid {
            grid-template-columns: 1fr;
          }
        }
      `})]})}(0,c.registerServerReference)(i,"00abfedbce0ada42fe5714107572ac9145a6eed424",null),a.s(["$$RSC_SERVER_ACTION_0",0,i,"default",()=>j],99123)},47409,a=>{"use strict";var b=a.i(99123);a.s([],88662),a.i(88662),a.s(["00abfedbce0ada42fe5714107572ac9145a6eed424",()=>b.$$RSC_SERVER_ACTION_0],47409)},94394,a=>{a.v(a=>Promise.resolve().then(()=>a(9307)))}];

//# sourceMappingURL=%5Broot-of-the-server%5D__48d2c1dd._.js.map