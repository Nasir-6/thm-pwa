import './Skeleton.css';

interface SkeletonProps {
  type: 'text' | 'text-xs' | 'text-sm' | 'map-icon' | 'map';
  width?: number;
  lines?: number;
}

// eslint-disable-next-line react/prop-types
const Skeleton: React.FC<SkeletonProps> = ({ type, width, lines = 1 }) => {
  const margin = '2px 0'; // set top and bottom margin to 20px for all skeletons

  if (type === 'map-icon') return <div className={`skeleton ${type}`} style={{ margin }} />;
  if (type === 'map') return <div className={`skeleton ${type}`} />;

  const scale = 16; // width scales by 16px
  const scaledWidth = width ? `${width * scale}px` : '100%';

  let height = 0;

  switch (type) {
    case 'text-xs':
      height = 14;
      break;
    case 'text-sm':
      height = 16;
      break;
    case 'text':
      height = 20;
      break;
    default:
  }
  const scaledHeight = `${height * lines}px`;

  return <div className="skeleton" style={{ width: scaledWidth, height: scaledHeight, margin }} />;
};

export default Skeleton;
