
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-background to-muted/40">
      <header className="fixed top-0 left-0 right-0 z-50 px-4 md:px-6 h-16 flex items-center bg-background/80 backdrop-blur-sm border-b border-border/20 shadow-sm">
        <Link href="/" className="flex items-center gap-2 font-semibold text-primary">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="M6 12c0-3.31 2.69-6 6-6s6 2.69 6 6-2.69 6-6 6"/><path d="M6 12c0 3.31 2.69 6 6 6s6-2.69 6-6-2.69-6-6-6"/></svg>
          <span className="text-lg">bond</span>
        </Link>
        <nav className="ml-auto flex items-center gap-4 sm:gap-6">
          <Button variant="outline" asChild>
            <Link href="/login">Sign In</Link>
          </Button>
          <Button asChild>
            <Link href="/chat">Open Chat</Link>
          </Button>
        </nav>
      </header>
      <main className="flex-1 flex items-center justify-center pt-16">
        <section className="container px-4 md:px-6 text-center">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-foreground">
              Connect and Collaborate Instantly
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              A modern chat application designed for seamless team communication, powered by AI.
            </p>
          </div>
          <div className="mt-8 flex justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/chat">Get Started</Link>
            </Button>
            <Button size="lg" variant="secondary" asChild>
              <Link href="#">Learn More</Link>
            </Button>
          </div>
        </section>
      </main>
       <footer className="flex items-center justify-center py-6 px-4 md:px-6 border-t bg-background/80 backdrop-blur-sm">
        <p className="text-sm text-muted-foreground">&copy; 2024 bond. All rights reserved.</p>
      </footer>
    </div>
  );
}
