import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function SEO({ title, description, schema }) {
  const location = useLocation();

  useEffect(() => {
    // 1. Update Title
    if (title) {
      document.title = title.includes('PaperGenius') ? title : `${title} | PaperGenius`;
    }

    // 2. Update Meta Description
    if (description) {
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.name = 'description';
        document.head.appendChild(metaDesc);
      }
      metaDesc.content = description;
    }

    // 3. Dynamic Canonical URL (Fixes Duplicate Canonical Bug)
    const canonicalUrl = `https://papergenius.in${location.pathname === '/' ? '' : location.pathname}`;
    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement('link');
      linkCanonical.rel = 'canonical';
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.href = canonicalUrl;

    // 4. Inject Structured Data (Schema JSON-LD) if provided
    let scriptTag = document.getElementById('route-schema-json');
    if (schema) {
      if (!scriptTag) {
        scriptTag = document.createElement('script');
        scriptTag.id = 'route-schema-json';
        scriptTag.type = 'application/ld+json';
        document.head.appendChild(scriptTag);
      }
      scriptTag.text = JSON.stringify(schema);
    } else if (scriptTag) {
      scriptTag.remove();
    }
  }, [title, description, schema, location]);

  return null;
}
