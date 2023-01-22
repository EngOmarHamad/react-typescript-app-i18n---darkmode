import ProductCard from './Prodcuts/ProductCard';
import { getAllProducts, getProductsByCategory } from './Api/Index';
import { List, Typography } from 'antd';
import { Loading3QuartersOutlined, LoadingOutlined } from '@ant-design/icons';
import { Product } from '../Interfaces/Index';
import { useAppContext } from '../Context/AppContext';
import { useEffect, useState } from 'react';

export default function Home() {
  const { productList, isLoading } = useAppContext();

  return (
    <>
      <Typography> View Items Sorted By</Typography>
      <List
        loading={{
          spinning: isLoading,
          indicator: (
            <div className="flex flex-col justify-center items-center w-32 h-28">
              <Loading3QuartersOutlined
                style={{ fontSize: 50 }}
                spin
                className=" text-green-500"
              />
              <Typography.Title
                level={4}
                className="my-10 text-green-500 select-none"
              >
                It's Loading...
              </Typography.Title>
            </div>
          ),
        }}
        grid={{ xs: 1, sm: 1, lg: 3, xl: 3, xxl: 3, md: 2 }}
        // , xl: 6, xxl: 3md: 4
        renderItem={(product: Product, index: number) => (
          <ProductCard prodcut={product}></ProductCard>
        )}
        dataSource={productList}
      />
    </>
  );
}
