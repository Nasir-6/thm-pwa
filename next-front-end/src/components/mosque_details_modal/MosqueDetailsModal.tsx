import React from 'react';
// eslint-disable-next-line import/no-relative-packages
import { MosqueDTO } from '../../../../back-end/src/db/models/mosques';

type Props = {
  mosque: MosqueDTO;
};

const MosqueDetailsModal = ({ mosque }: Props) => {
  console.log('mosque IN MODAL', mosque);
  return <div>MosqueDetailsModal</div>;
};

export default MosqueDetailsModal;
