import React, { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
}

/**
 * Reusable SEO component to set document title, description, and canonical URLs.
 * Works seamlessly in client-side routing.
 */
export const SEO: React.FC<SEOProps> = ({ title, description, canonical }) => {
  useEffect(() => {
    // 1. Update Title tag
    if (title) {
      document.title = `${title} | Aetheria Luxe - Curating Modern Elegance`;
    }

    // 2. Update Meta description tag
    if (description) {
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.setAttribute('name', 'description');
        document.head.appendChild(metaDesc);
      }
      metaDesc.setAttribute('content', description);
    }

    // 3. Update Canonical link tag
    let canonicalLink: HTMLLinkElement | null = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }

    const href = canonical || `${window.location.origin}${window.location.pathname}`;
    canonicalLink.setAttribute('href', href);
  }, [title, description, canonical]);

  return null;
};

export default SEO;
