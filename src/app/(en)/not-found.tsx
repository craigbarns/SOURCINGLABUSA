import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { EditorialFooter } from '@/components/EditorialFooter';

export default function NotFound() {
  return (
    <div className="editorial-shell flex min-h-screen flex-col">
      <Navbar contactHref="/#contact" />
      <main className="editorial-section flex-1">
        <div className="editorial-container">
          <p className="editorial-kicker">404 · PAGE NOT FOUND</p>
          <h1 className="editorial-title page-title">
            A small detour.
            <br />
            <em>Let’s find your next step.</em>
          </h1>
          <p className="editorial-body page-intro">
            This page could not be found. Explore our product sourcing offer or
            tell us about your project.
          </p>
          <Link href="/" className="editorial-button mt-8">
            Back to Sourcing Lab USA ↗
          </Link>
        </div>
      </main>
      <EditorialFooter />
    </div>
  );
}
