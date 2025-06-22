import { Card, Col, Row } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

const AllProducts = ({ allProducts }) => {
  const { Meta } = Card;
  console.log({allProducts})
  return (
    <div>
      
      <Row gutter={[16, 24]}>
        {allProducts?.map((products) => (
          <Col key={products.id} className="gutter-row"  xs={24} sm={12} md={8} lg={6}>
            <div    style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          marginTop:'10px'
        }}>
              <Card
              hoverable
               style={{ flex: 1, display: "flex", flexDirection: "column" }}
              cover={
                <Image
                  src={products?.image_url}
                  width={500}
                  height={200}
                  alt="products image"
                  style={{border:'1px solid lightgray',padding:'5px', }}
                ></Image>
              }
            >
              <Meta title={products?.productName} />
              <div
                className="line"
                style={{
                  height: "5px",
                  margin: "20px",
                  background: "#000",
                  margin: "20px 0",
                  width: "100%",
                }}
              ></div>
<p>Category: <span>{products?.category}</span></p>
<p>Price: <span>{products?.price}</span></p>
<p>Stock: <span>{products?.status}</span></p>
<p>Rating: <span>{products?.rating}</span></p>
              <Link href={`/products/${products.id}`}>
                <p
                  style={{
                    fontSize: "15px",
                    marginTop: "20px",
                    backgroundColor: "black",
                    color: "white",
                    width: "100%",
                    fontWeight: "300",
                    letterSpacing: "3px",
                    padding: "2px 5px",
                    textAlign: "center",
                  }}
                >
                  Product Details 
                </p>
              </Link>
            </Card>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default AllProducts
