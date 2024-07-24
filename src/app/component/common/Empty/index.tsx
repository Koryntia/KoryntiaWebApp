import React from 'react';
import { Button, Empty, Typography } from 'antd';

interface IEmpty {
  image?: string;
  description?: string;
  action?: string;
}

const EmptyComponent = ({ image, description, action }: IEmpty) => (
  <div className='flex w-full h-full justify-center items-center'>
    <Empty
      image={image ? image : Empty.PRESENTED_IMAGE_SIMPLE}
      description={description}
    >
      {action && <Button type="primary">{action}</Button>}
    </Empty>
  </div>

);

export default EmptyComponent;