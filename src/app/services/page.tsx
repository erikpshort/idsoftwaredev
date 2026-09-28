'use client';

import { useEffect } from 'react';

export default function ServicesPage() {
  useEffect(() => {
    window.location.replace('/#capabilities');
  }, []);

  return null;
}
