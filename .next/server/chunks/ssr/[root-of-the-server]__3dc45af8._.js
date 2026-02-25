module.exports=[54799,(a,b,c)=>{b.exports=a.x("crypto",()=>require("crypto"))},63021,(a,b,c)=>{b.exports=a.x("@prisma/client-2c3a283f134fdcb6",()=>require("@prisma/client-2c3a283f134fdcb6"))},93695,(a,b,c)=>{b.exports=a.x("next/dist/shared/lib/no-fallback-error.external.js",()=>require("next/dist/shared/lib/no-fallback-error.external.js"))},50645,a=>{a.n(a.i(27572))},43619,a=>{a.n(a.i(79962))},13718,a=>{a.n(a.i(85523))},18198,a=>{a.n(a.i(45518))},62212,a=>{a.n(a.i(66114))},790,(a,b,c)=>{let{createClientModuleProxy:d}=a.r(11857);a.n(d("[project]/node_modules/next/dist/client/app-dir/link.js <module evaluation>"))},84707,(a,b,c)=>{let{createClientModuleProxy:d}=a.r(11857);a.n(d("[project]/node_modules/next/dist/client/app-dir/link.js"))},97647,a=>{"use strict";a.i(790);var b=a.i(84707);a.n(b)},95936,(a,b,c)=>{"use strict";Object.defineProperty(c,"__esModule",{value:!0});var d={default:function(){return i},useLinkStatus:function(){return h.useLinkStatus}};for(var e in d)Object.defineProperty(c,e,{enumerable:!0,get:d[e]});let f=a.r(64240),g=a.r(7997),h=f._(a.r(97647));function i(a){let b=a.legacyBehavior,c="string"==typeof a.children||"number"==typeof a.children||"string"==typeof a.children?.type,d=a.children?.type?.$$typeof===Symbol.for("react.client.reference");return!b||c||d||(a.children?.type?.$$typeof===Symbol.for("react.lazy")?console.error("Using a Lazy Component as a direct child of `<Link legacyBehavior>` from a Server Component is not supported. If you need legacyBehavior, wrap your Lazy Component in a Client Component that renders the Link's `<a>` tag."):console.error("Using a Server Component as a direct child of `<Link legacyBehavior>` is not supported. If you need legacyBehavior, wrap your Server Component in a Client Component that renders the Link's `<a>` tag.")),(0,g.jsx)(h.default,{...a})}("function"==typeof c.default||"object"==typeof c.default&&null!==c.default)&&void 0===c.default.__esModule&&(Object.defineProperty(c.default,"__esModule",{value:!0}),Object.assign(c.default,c),b.exports=c.default)},60168,a=>{"use strict";var b=a.i(7997),c=a.i(95936),d=a.i(9307);a.i(70396);var e=a.i(73727);async function f(){return await (0,d.auth)()&&(0,e.redirect)("/dashboard"),(0,b.jsxs)("div",{className:"landing-page",children:[(0,b.jsx)("nav",{className:"landing-nav",children:(0,b.jsxs)("div",{className:"landing-nav-inner",children:[(0,b.jsx)("span",{className:"landing-brand",children:"TripDiorama"}),(0,b.jsxs)("div",{className:"landing-nav-links",children:[(0,b.jsx)(c.default,{href:"/login",className:"btn btn-ghost",children:"Sign In"}),(0,b.jsx)(c.default,{href:"/register",className:"btn btn-primary",children:"Get Started"})]})]})}),(0,b.jsxs)("main",{className:"landing-hero",children:[(0,b.jsxs)("div",{className:"landing-hero-content",children:[(0,b.jsx)("div",{className:"landing-badge",children:"✨ Your trips, reimagined in 3D"}),(0,b.jsxs)("h1",{className:"landing-title",children:["Plan your trip.",(0,b.jsx)("br",{}),"Live your adventure.",(0,b.jsx)("br",{}),(0,b.jsx)("span",{className:"text-gradient",children:"Keep it forever."})]}),(0,b.jsx)("p",{className:"landing-subtitle",children:"TripDiorama transforms your travel memories into stunning 3D isometric dioramas — photorealistic terrain, your photos, journals, and routes, all in one beautiful miniature world."}),(0,b.jsxs)("div",{className:"landing-ctas",children:[(0,b.jsx)(c.default,{href:"/register",className:"btn btn-primary btn-lg",children:"Start Planning Free"}),(0,b.jsx)(c.default,{href:"/login",className:"btn btn-secondary btn-lg",children:"Sign In"})]})]}),(0,b.jsx)("div",{className:"landing-visual",children:(0,b.jsx)("div",{className:"landing-diorama-preview",children:(0,b.jsxs)("div",{className:"diorama-mock",children:[(0,b.jsx)("div",{className:"diorama-mock-terrain"}),(0,b.jsx)("div",{className:"diorama-mock-route"}),(0,b.jsx)("div",{className:"diorama-mock-pin pin-1"}),(0,b.jsx)("div",{className:"diorama-mock-pin pin-2"}),(0,b.jsx)("div",{className:"diorama-mock-pin pin-3"})]})})})]}),(0,b.jsxs)("section",{className:"landing-features",children:[(0,b.jsxs)("div",{className:"feature-card glass-card",children:[(0,b.jsx)("div",{className:"feature-icon",children:"🗺️"}),(0,b.jsx)("h3",{children:"Plan on 2D Maps"}),(0,b.jsx)("p",{children:"Draw routes or pin locations on interactive satellite maps. Build your itinerary with dates, notes, and stops."})]}),(0,b.jsxs)("div",{className:"feature-card glass-card",children:[(0,b.jsx)("div",{className:"feature-icon",children:"📸"}),(0,b.jsx)("h3",{children:"Log Your Journey"}),(0,b.jsx)("p",{children:"Upload photos, write journal entries, and track your GPS path as you explore."})]}),(0,b.jsxs)("div",{className:"feature-card glass-card",children:[(0,b.jsx)("div",{className:"feature-icon",children:"🏔️"}),(0,b.jsx)("h3",{children:"3D Diorama"}),(0,b.jsx)("p",{children:"Get a photorealistic 3D miniature of your trip with real terrain, your photos, and memories."})]})]}),(0,b.jsx)("style",{children:`
        .landing-page {
          min-height: 100vh;
          background: var(--gradient-hero);
          overflow: hidden;
        }

        .landing-nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 50;
          padding: var(--space-md) var(--space-lg);
          background: rgba(10, 14, 26, 0.6);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-bottom: 1px solid var(--border-subtle);
        }

        .landing-nav-inner {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .landing-brand {
          font-family: var(--font-display);
          font-size: 1.3rem;
          font-weight: 800;
          background: var(--gradient-primary);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .landing-nav-links {
          display: flex;
          gap: var(--space-sm);
        }

        .landing-hero {
          max-width: 1200px;
          margin: 0 auto;
          padding: 8rem var(--space-lg) 4rem;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--space-3xl);
          align-items: center;
          min-height: 100vh;
        }

        .landing-badge {
          display: inline-block;
          padding: 0.35rem 1rem;
          background: rgba(6, 182, 212, 0.1);
          border: 1px solid rgba(6, 182, 212, 0.2);
          border-radius: var(--radius-full);
          font-size: 0.85rem;
          color: var(--accent-primary);
          margin-bottom: var(--space-lg);
          animation: fadeInUp 0.6s ease-out;
        }

        .landing-title {
          font-family: var(--font-display);
          font-size: 3.5rem;
          font-weight: 800;
          line-height: 1.1;
          letter-spacing: -0.03em;
          margin-bottom: var(--space-lg);
          animation: fadeInUp 0.6s ease-out 0.1s both;
        }

        .landing-subtitle {
          font-size: 1.15rem;
          color: var(--text-secondary);
          line-height: 1.7;
          max-width: 520px;
          margin-bottom: var(--space-xl);
          animation: fadeInUp 0.6s ease-out 0.2s both;
        }

        .landing-ctas {
          display: flex;
          gap: var(--space-md);
          animation: fadeInUp 0.6s ease-out 0.3s both;
        }

        /* Diorama Preview Mock */
        .landing-visual {
          display: flex;
          align-items: center;
          justify-content: center;
          animation: fadeInUp 0.8s ease-out 0.4s both;
        }

        .landing-diorama-preview {
          perspective: 800px;
        }

        .diorama-mock {
          width: 350px;
          height: 350px;
          position: relative;
          transform: rotateX(45deg) rotateZ(45deg);
          transform-style: preserve-3d;
          animation: float 4s ease-in-out infinite;
        }

        .diorama-mock-terrain {
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #1a4a3a, #2d6b4f, #1a4a3a, #0d3325);
          border-radius: var(--radius-md);
          box-shadow: 
            0 30px 0 -5px #0d2218,
            0 35px 0 -5px #091a12,
            0 40px 60px rgba(0, 0, 0, 0.5);
          position: relative;
          overflow: hidden;
        }

        .diorama-mock-terrain::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(
            45deg,
            transparent 30%,
            rgba(6, 182, 212, 0.1) 50%,
            transparent 70%
          );
        }

        .diorama-mock-route {
          position: absolute;
          top: 20%;
          left: 15%;
          width: 70%;
          height: 60%;
          border: 2px solid rgba(6, 182, 212, 0.6);
          border-radius: 50%;
          transform: rotateX(-15deg);
          box-shadow: 0 0 15px rgba(6, 182, 212, 0.3);
        }

        .diorama-mock-pin {
          position: absolute;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          box-shadow: 0 0 10px currentColor;
        }

        .pin-1 { top: 25%; left: 30%; background: #06b6d4; color: #06b6d4; }
        .pin-2 { top: 55%; left: 70%; background: #8b5cf6; color: #8b5cf6; }
        .pin-3 { top: 70%; left: 35%; background: #f59e0b; color: #f59e0b; }

        /* Features */
        .landing-features {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 var(--space-lg) 6rem;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--space-lg);
        }

        .feature-card {
          padding: var(--space-xl);
          text-align: center;
        }

        .feature-icon {
          font-size: 2.5rem;
          margin-bottom: var(--space-md);
        }

        .feature-card h3 {
          font-family: var(--font-display);
          font-size: 1.15rem;
          margin-bottom: var(--space-sm);
        }

        .feature-card p {
          font-size: 0.9rem;
          color: var(--text-secondary);
          line-height: 1.6;
        }

        @media (max-width: 900px) {
          .landing-hero {
            grid-template-columns: 1fr;
            text-align: center;
            padding-top: 6rem;
          }

          .landing-title {
            font-size: 2.5rem;
          }

          .landing-subtitle {
            margin-left: auto;
            margin-right: auto;
          }

          .landing-ctas {
            justify-content: center;
          }

          .landing-visual {
            display: none;
          }

          .landing-features {
            grid-template-columns: 1fr;
          }
        }
      `})]})}a.s(["default",()=>f])}];

//# sourceMappingURL=%5Broot-of-the-server%5D__3dc45af8._.js.map