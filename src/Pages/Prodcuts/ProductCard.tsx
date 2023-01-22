import Meta from 'antd/es/card/Meta';
import {
  Badge,
  Button,
  Card,
  Image,
  Rate,
  Typography
  } from 'antd';
import { Product } from '../../Interfaces/Index';
import { useAppContext } from '../../Context/AppContext';
import { useState } from 'react';


export default function ProductCard(props: { prodcut: Product }) {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <div className="p-3 hover:-translate-y-5 transition-transform duration-700 ">
        <Badge.Ribbon
          className="itemCardBadge "
          text={`${props.prodcut.discountPercentage} % off`}
          color="cyan"
        >
          <Card
            className="  dark:bg-white bg-zinc-800"
            title={props.prodcut.title}
            cover={
              <>
                <Image
                  height={250}
                  alt="example"
                  src={props.prodcut.thumbnail}
                  preview={{ visible: false }}
                  onClick={() => setVisible(true)}
                ></Image>

                <div className="hidden">
                  <Image.PreviewGroup
                    preview={{
                      visible,
                      onVisibleChange: (vis) => setVisible(vis),
                    }}
                  >
                    {props.prodcut.images.reverse().map((image) => (
                      <Image src={image} />
                    ))}
                  </Image.PreviewGroup>{" "}
                </div>
              </>
            }
            actions={[
              <Rate disabled allowHalf defaultValue={props.prodcut.rating} />,
              <AddToCartButton item={props.prodcut} />,
            ]}
          >
            <Meta
              className="dark:text-white"
              title={
                <Typography.Paragraph>
                  Price: ${props.prodcut.price}
                  <Typography.Text delete type="danger">
                    {" "}
                    $
                    {(
                      props.prodcut.price +
                      (props.prodcut.price * props.prodcut.discountPercentage) /
                        100
                    )
                      .toFixed(2)
                      .toString()}
                  </Typography.Text>
                </Typography.Paragraph>
              }
              description="This is the description"
            />
          </Card>
        </Badge.Ribbon>
      </div>
    </>
  );
}

function AddToCartButton(props: { item: Product }) {
  const [loading, setLoading] = useState(false);
  const { addToCart, removeFormCart, cart } = useAppContext();
  const addProductToCart = () => {
    setLoading(true);
    setTimeout(() => {
      addToCart(props.item);
      setLoading(false);
    }, 1000);
  };
  const removeForm = () => {
    setLoading(true);
    setTimeout(() => {
      removeFormCart(props.item);
      setLoading(false);
    }, 1000);
  };
  const isExists = () => {
    return !cart.some((c) => c.id === props.item.id);
  };

  return (
    <Button
      type="link"
      className={
        isExists()
          ? `hover:bg-green-500 bg-red-500          
             text-white w-full h-full flex justify-center items-center rounded-none text-xl`
          : `hover:bg-red-500 bg-green-500
            text-white w-full h-full flex justify-center items-center rounded-none text-xl`
      }
      onClick={isExists() ? () => addProductToCart() : () => removeForm()}
      loading={loading}
    >
      <p>{!isExists() ? "remove from cart" : "Add to Cart"}</p>
    </Button>
  );
}
