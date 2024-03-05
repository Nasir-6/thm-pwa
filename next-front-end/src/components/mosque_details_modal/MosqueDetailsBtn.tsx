'use client';

// eslint-disable-next-line import/no-relative-packages
import { MosqueDTO } from '../../../../back-end/src/db/models/mosques';

type Props = {
  mosque: MosqueDTO;
};

const MosqueDetailsBtn = ({ mosque }: Props) => {
  return (
    <>
      <button
        type="button"
        onClick={() => window.history.pushState({}, '', `findnearestmosque/${mosque.urlSlug}`)}
        className="text-gradient-gold view-details-btn font-semibold text-sm">
        View Details
      </button>
    </>
  );
};

export default MosqueDetailsBtn;
