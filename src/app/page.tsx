import Link from "next/link";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function LandingPage() {
  const session = await auth();
  if (session) redirect("/dashboard");

  return (
    <div className="landing-page">
      <nav className="landing-nav">
        <div className="landing-nav-inner">
          <span className="landing-brand">TripDiorama</span>
          <div className="landing-nav-links">
            <Link href="/login" className="btn btn-ghost">Sign In</Link>
            <Link href="/register" className="btn btn-primary">Get Started</Link>
          </div>
        </div>
      </nav>

      <main className="landing-hero">
        <div className="landing-hero-content">
          <div className="landing-badge">✨ Your trips, reimagined in 3D</div>
          <h1 className="landing-title">
            Plan your trip.<br />
            Live your adventure.<br />
            <span className="text-gradient">Keep it forever.</span>
          </h1>
          <p className="landing-subtitle">
            TripDiorama transforms your travel memories into stunning 3D isometric
            dioramas — photorealistic terrain, your photos, journals, and routes,
            all in one beautiful miniature world.
          </p>
          <div className="landing-ctas">
            <Link href="/register" className="btn btn-primary btn-lg">
              Start Planning Free
            </Link>
            <Link href="/login" className="btn btn-secondary btn-lg">
              Sign In
            </Link>
          </div>
        </div>

        <div className="landing-visual">
          <div className="landing-diorama-preview">
            <div className="diorama-mock">
              <div className="diorama-mock-terrain"></div>
              <div className="diorama-mock-route"></div>
              <div className="diorama-mock-pin pin-1"></div>
              <div className="diorama-mock-pin pin-2"></div>
              <div className="diorama-mock-pin pin-3"></div>
            </div>
          </div>
        </div>
      </main>

      <section className="landing-features">
        <div className="feature-card glass-card">
          <div className="feature-icon">🗺️</div>
          <h3>Plan on 2D Maps</h3>
          <p>Draw routes or pin locations on interactive satellite maps. Build your itinerary with dates, notes, and stops.</p>
        </div>
        <div className="feature-card glass-card">
          <div className="feature-icon">📸</div>
          <h3>Log Your Journey</h3>
          <p>Upload photos, write journal entries, and track your GPS path as you explore.</p>
        </div>
        <div className="feature-card glass-card">
          <div className="feature-icon">🏔️</div>
          <h3>3D Diorama</h3>
          <p>Get a photorealistic 3D miniature of your trip with real terrain, your photos, and memories.</p>
        </div>
      </section>

      <style>{`
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
      `}</style>
    </div>
  );
}
