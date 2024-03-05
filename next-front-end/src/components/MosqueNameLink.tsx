'use client';

import React from 'react';

type Props = {
  mosqueName: string;
  mosqueUrlSlug: string;
};

const MosqueNameLink = ({ mosqueName, mosqueUrlSlug }: Props) => (
  <p
    onClick={() => {
      window.history.pushState({}, '', `/${mosqueUrlSlug}`);
    }}>
    {mosqueName}
  </p>
);

export default MosqueNameLink;
