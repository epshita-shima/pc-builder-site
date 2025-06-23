import RootLayout from "@/src/component/Layouts/RootLayout";
import { Avatar, Card, Col, Descriptions, List, Rate, Row, Tag } from "antd";
import Image from "next/image";
import React from "react";
import style from "../../../styles/productDetails.module.css";
const ProductDetails = ({ productDetails }) => {
  const features = [
    { label: "Brand", value: productDetails.brand || "N/A" },
    { label: "Model", value: productDetails.model || "N/A" },
    { label: "Type", value: productDetails.type || "N/A" },
    { label: "Resolution", value: productDetails.resolution || "N/A" },
    { label: "Voltage", value: productDetails.voltage || "N/A" },
    { label: "Port", value: productDetails.port || "N/A" },
  ];

  const reviews = productDetails.reviews || [];
  return (
    <div className={style.productContainer}>
      {/* Top Section */}
      <Row gutter={[32, 32]} justify="center" align="middle">
        <Col xs={24} md={8}>
          <Card
            cover={
              <Image
                src={productDetails?.image_url}
                width={200}
                height={200}
                alt="products image"
                style={{ objectFit: "contain" }}
              />
            }
            bordered={false}
            className={style.productCard}
          />
        </Col>
        <Col xs={24} md={10}>
          <div style={{ textAlign: "center" }}>
            <h1 className={style.productTitle}>{productDetails.productName}</h1>
            <Tag color="blue">{productDetails.category}</Tag>
            <Tag color={productDetails.status === "In Stock" ? "green" : "red"}>
              {productDetails.status}
            </Tag>
            <h2 className={style.productPrice}>${productDetails.price}</h2>
            <Rate disabled defaultValue={productDetails.rating} />
            <p className={style.productRatingText}>
              {productDetails.rating} out of 5 stars
            </p>
          </div>
        </Col>
      </Row>

      {/* Description */}
      <Card title="Description" className={style.sectionCard}>
        <p
          style={{
            textAlign: "justify",
          }}
        >
          {productDetails.description}
        </p>
      </Card>

      {/* Key Features */}
      <Card title="Key Features" className={style.sectionCard}>
        <Descriptions column={2} bordered size="small">
          {features.map((item) => (
            <Descriptions.Item label={item.label} key={item.label}>
              {item.value}
            </Descriptions.Item>
          ))}
        </Descriptions>
      </Card>

      {/* Reviews */}
      <Card title="Customer Reviews" className={style.sectionCard}>
        <List
          itemLayout="vertical"
          dataSource={reviews}
          renderItem={(review) => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar>{review.reviewer[0]}</Avatar>}
                title={<b>{review.reviewer}</b>}
                description={<Rate disabled defaultValue={review.rating} />}
              />
              <p>{review.comment}</p>
            </List.Item>
          )}
        />
      </Card>
    </div>
  );
};

export default ProductDetails;

ProductDetails.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

export const getStaticPaths = async () => {
  const res = await fetch("http://localhost:5000/data");
  const allProducts = await res.json();
  const paths = allProducts.map((category) => ({
    params: {
      productId: category.id,
    },
  }));
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  const { params } = context;
  const slug = params.productId;
  const res = await fetch(`http://localhost:5000/data/${slug}`);
  const data = await res.json();
  return {
    props: {
      productDetails: data,
    },
  };
};
