import React from 'react';
import { Link } from "react-router-dom";
import Button from "../components/common/Button";
import { FileQuestion } from "lucide-react";

const NotFound = () => (
  <div className="min-h-[calc(100vh-160px)] bg-[var(--bg-main)] flex items-center justify-center py-16 px-4">
    <div className="max-w-md w-full text-center bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-2xl p-8 sm:p-12 shadow-sm space-y-6">
      <div className="w-20 h-20 mx-auto rounded-full bg-[var(--bg-main)] border border-[var(--border-subtle)] flex items-center justify-center text-[var(--color-primary-600)]">
        <FileQuestion size={40} />
      </div>

      <div className="space-y-2">
        <h1 className="text-5xl font-extrabold text-[var(--text-primary)] tracking-tight">404</h1>
        <h2 className="text-xl font-semibold text-[var(--text-primary)]">Page Not Found</h2>
        <p className="text-[var(--text-secondary)] text-sm max-w-xs mx-auto">
          The page you are looking for doesn't exist or has been moved.
        </p>
      </div>

      <Link to="/" className="inline-block">
        <Button variant="primary">
          Back to Home
        </Button>
      </Link>
    </div>
  </div>
);

export default NotFound;
