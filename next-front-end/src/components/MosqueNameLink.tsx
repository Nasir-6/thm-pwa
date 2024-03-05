'use client';
import React from 'react';

type Props = {
  mosqueName: string;
  mosqueUrlSlug: string;
};

const MosqueNameLink = ({ mosqueName, mosqueUrlSlug }: Props) => (
  <p
    onClick={() => {
      console.log('CLICKED');
      window.history.pushState({}, '', `/${mosqueUrlSlug}`);
    }}>
    {mosqueName}
  </p>
);

export default MosqueNameLink;
