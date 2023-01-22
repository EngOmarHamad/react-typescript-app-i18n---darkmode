import i18n from 'i18next';
import React, { useEffect, useState } from 'react';
import Title from 'antd/es/typography/Title';
import {
  Button,
  Drawer,
  InputNumber,
  Menu,
  Row,
  Switch,
  Table
  } from 'antd';
import { getCart, getProductsByCategory } from '../Pages/Api/Index';
import { MenuProps } from 'antd/es/menu/menu';
import { Product } from '../Interfaces/Index';
import { useAppContext } from '../Context/AppContext';
import { useTranslation } from 'react-i18next';

import {
  FastForwardFilled,
  HomeFilled,
  ManOutlined,
  ShoppingCartOutlined,
  WomanOutlined,
  CloseOutlined,
  CheckOutlined,
} from "@ant-design/icons/lib/icons";
type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const items: MenuProps["items"] = [
  getItem("Home", "Home", <HomeFilled />),
  getItem("Man", "Man", <ManOutlined />, [
    getItem("Shirts", "mens-shirts"),
    getItem("Shoes", "mens-shoes"),
    getItem("watch's", "mens-watches"),
  ]),
  getItem("Woman", "Woman", <WomanOutlined />, [
    getItem("Dresses", "womens-dresses"),
    getItem("Shoes", "womens-shoes"),
    getItem("watch's", "womens-watches"),
    getItem("Bags", "womens-bags"),
    getItem("Jewelry", "womens-jewellery"),
  ]),
  getItem("fragrances", "fragrances", <FastForwardFilled />),
];

// "smartphones",
//   "laptops",
//   "fragrances",
//   "skincare",
//   "groceries",
//   "home-decoration",
//   "furniture",
//   "tops",
//   "",
//   "",
//   "",
//   "",
//   "",
//   "",
//   "",
//   "",
//   "sunglasses",
//   "automotive",
//   "motorcycle",
//   "lighting";
export default function NavBar() {
  const [listOfProduct, setListOfProduct] = useState<Product[]>([]);
  const { fetchbyCategory, cart, removeFormCart, toggleDark, isDark, fetch } =
    useAppContext();
  const { t } = useTranslation();

  const [open, setOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  // async function fetchData() {
  //   setListOfProduct(await getCart().then((data) => data["products"]));
  // }

  const onClick: MenuProps["onClick"] = async (e) => {
    console.log("click ", e);
    if (e.key === "Home") {
      fetch();
    } else {
      fetchbyCategory(e.key);
    }
  };
  useEffect(() => {
    // fetchData();
  }, []);
  return (
    <>
      <Row
        align={"middle"}
        justify={"space-between"}
        className="text-white m-0"
      >
        <Menu
          className=" dark:text-black m-0 text-white"
          theme={isDark ? "dark" : "light"}
          mode="horizontal"
          defaultSelectedKeys={["Home"]}
          onClick={onClick}
          items={items}
        />
        <Title level={3} className="text-white dark:text-black m-0">
          {t("Omar Store")}
        </Title>{" "}
        <div className="flex  items-center justify-center gap-4">
          <Button
            type="link"
            onClick={showDrawer}
            className="flex items-center justify-center"
          >
            <ShoppingCartOutlined className="text-white dark:text-black text-3xl m-0" />
          </Button>
          <Switch
            checkedChildren="AR"
            unCheckedChildren="EN"
            defaultChecked
            checked={isChecked}
            onChange={() => {
              setIsChecked(!isChecked);
              console.log(isChecked);
              i18n.changeLanguage(isChecked ? "ar" : "en");
            }}
          />
          <Switch
            checkedChildren="d"
            unCheckedChildren="l"
            defaultChecked
            checked={isDark}
            onChange={toggleDark}
          />
        </div>
      </Row>

      <Drawer
        title="Cart"
        width={520}
        closable={false}
        onClose={onClose}
        placement={isChecked ? "right" : "left"}
        open={open}
      >
        <Table
          dataSource={cart}
          pagination={false}
          columns={[
            {
              title: "Title",
              dataIndex: "title",
            },
            {
              title: "Price",
              dataIndex: "price",
              render: (value: number) => {
                return <span>${value}</span>;
              },
            },

            {
              title: "Total",
              dataIndex: "total",
              render: (value) => {
                return <span>${value}</span>;
              },
            },
            {
              title: "Quantity",
              dataIndex: "quantity",
              render: (value: number, record: Product) => (
                <Button onClick={() => removeFormCart(record)}>
                  Remove Form CART
                </Button>
              ),
            },
          ]}
          // dataSource={listOfProduct}
          summary={(data) => {
            const total = data.reduce((pre, current) => pre + current.price, 0);
            return <p>Total: {total.toString()}</p>;
          }}
        />
        {/* <Drawer
          title="Two-level Drawer"
          width={320}
          closable={false}
          onClose={onChildrenDrawerClose}
          open={childrenDrawer}
        >
          This is two-level drawer
        </Drawer> */}
      </Drawer>
    </>
  );
}
