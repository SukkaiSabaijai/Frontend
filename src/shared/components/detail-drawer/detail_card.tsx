import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { useBoolean } from '@/shared/hooks/use-boolean';

interface DetailCardProps {
  description: string;
  latitude: number;
  longitude: number;
}

const DetailCard: React.FC<DetailCardProps> = ({ description, latitude, longitude }) => {
  const [isMen, setIsMen] = useState<boolean | null>(null);
  const [isWomen, setIsWomen] = useState<boolean | null>(null);
  const [isDisabled, setIsDisabled] = useState<boolean | null>(null);

  useEffect(() => {
    const fetchData = async () => {

      const response = await fetch('/api/your-endpoint');
      const data = await response.json();


      setIsMen(data.isMen);
      setIsWomen(data.isWomen);
      setIsDisabled(data.isDisabled);
    };

    fetchData();
  }, []);

  const menEmoji = isMen ? '👨' : '⚪';
  const womenEmoji = isWomen ? '👩' : '⚪';
  const disabledEmoji = isDisabled ? '♿' : '⚪';

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col items-center">
        <div className={cn('mt-2 mb-2 p-2 border rounded')}>
          <p className={cn('text-sm', 'text-gray-700')}>
            Latitude: {latitude}, Longitude: {longitude}
          </p>
        </div>

        <div className={cn('max-w-sm', 'bg-white', 'border', 'border-gray-200', 'rounded-xl', 'shadow-md', 'overflow-hidden')}>
          <div className={cn('p-4')}>
            <p className={cn('text-sm', 'text-gray-500', 'mt-2')}>{description}</p>
          </div>
        </div>

        <div className={cn('max-w-sm', 'bg-white', 'border', 'border-gray-200', 'rounded-2xl', 'shadow-md', 'overflow-hidden', 'mt-2')}>
          <div className={cn('p-4')}>
            <p className={cn('text-sm', 'text-gray-500', 'mt-2')}>
              {menEmoji} Men, {womenEmoji} Women, {disabledEmoji} Disabled
            </p>
          </div>
        </div>
        <div>

        </div>
      </div>
    </div>
  );
};

export default DetailCard;
