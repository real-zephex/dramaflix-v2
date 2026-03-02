"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCcw, Home } from "lucide-react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex h-[80vh] flex-col items-center justify-center space-y-6 p-4 text-center">
      <div className="rounded-full bg-destructive/10 p-6 animate-pulse">
        <AlertTriangle className="h-16 w-16 text-destructive" />
      </div>
      
      <div className="space-y-2">
        <h2 className="text-4xl font-extrabold tracking-tight">Oops! Something went wrong</h2>
        <p className="max-w-md text-muted-foreground text-lg">
            Something went wrong! But don&apos;t worry, our maintenance droids
            are on it.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          variant="default"
          size="lg"
          onClick={() => reset()}
          className="gap-2 min-w-[200px]"
        >
          <RefreshCcw className="h-5 w-5" />
          Try Again
        </Button>
        <Button variant="outline" size="lg" asChild className="gap-2 min-w-[200px]">
          <Link href="/">
            <Home className="h-5 w-5" />
            Back to Home
          </Link>
        </Button>
      </div>

      {process.env.NODE_ENV === "development" && (
        <div className="mt-8 max-w-2xl w-full text-left">
          <p className="text-xs font-mono text-muted-foreground mb-2 uppercase tracking-wider">Error Details (Dev Mode):</p>
          <pre className="overflow-auto rounded-lg bg-muted p-4 text-xs font-mono text-destructive">
            {error.message}
          </pre>
        </div>
      )}
    </div>
  );
}
