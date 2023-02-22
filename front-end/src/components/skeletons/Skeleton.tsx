import './Skeleton.css';

interface SkeletonProps {
  type: 'text' | 'text-xs' | 'text-sm' | 'map-icon';
  width?: number;
}

// eslint-disable-next-line react/prop-types
const Skeleton: React.FC<SkeletonProps> = ({ type, width }) => {
  if (type === 'map-icon') return <div className={`skeleton ${type}`} />;

  const scale = 16; // width scales by 16px
  const scaledWidth = width ? `${width * scale}px` : '100%';
  return <div className={`skeleton ${type}`} style={{ width: scaledWidth }} />;
};

export default Skeleton;
