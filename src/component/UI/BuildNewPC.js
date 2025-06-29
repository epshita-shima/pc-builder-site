import { Button, Col, Row, Space, Card, Divider } from "antd";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faGear, faPrint } from "@fortawesome/free-solid-svg-icons";

const BuildNewPC = () => {
  const categories = [
    "CPU / Processor",
    "Motherboard",
    "RAM",
    "Power Supply Unit",
    "Storage Device",
    "Monitor",
  ];
  const getCategoryIcon = (category) => {
    if (category.includes("CPU"))
      return <FontAwesomeIcon icon={faGear} style={{ fontSize: 30 }} />;
    if (category.includes("Motherboard"))
      return <FontAwesomeIcon icon={faGear} style={{ fontSize: 30 }} />;
    if (category.includes("RAM"))
      return <FontAwesomeIcon icon={faGear} style={{ fontSize: 30 }} />;
    if (category.includes("Power"))
      return <FontAwesomeIcon icon={faGear} style={{ fontSize: 30 }} />;
    if (category.includes("Storage"))
      return <FontAwesomeIcon icon={faGear} style={{ fontSize: 30 }} />;
    if (category.includes("Monitor"))
      return <FontAwesomeIcon icon={faGear} style={{ fontSize: 30 }} />;
  };
  return (
    <div
      style={{ width: "100%", backgroundColor: "#f5f5f5", padding: "16px 0" }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 16px" }}>
        <Row
          justify="space-between"
          align="middle"
          style={{
            backgroundColor: "white",
            padding: "16px",
          }}
        >
          <Col>
            <Space>
              <Button
                style={{
                  backgroundColor: "transparent",
                  border: "1px solid black",
                  fontWeight: "bold",
                }}
              >
                Total TK {0}
              </Button>
            </Space>
          </Col>
          <Col align="center">
            <h2 style={{ margin: 0, fontWeight: "bold", fontSize: "20px" }}>
              PC Builder
            </h2>
            <p>Select Your Components</p>
          </Col>

          <Col>
            <Space>
              <Button
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "50px",
                  width: "80px",
                  textAlign: "center",
                  backgroundColor: "white",
                  border: "1px solid #ddd",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)", // soft elegant shadow
                  borderRadius: "8px",
                }}
              >
                <FontAwesomeIcon
                  icon={faDownload}
                  style={{ fontSize: "22px" }}
                />
                <span style={{ fontSize: "12px" }}>Download</span>
              </Button>

              <Button
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "50px",
                  width: "80px",
                  textAlign: "center",
                  backgroundColor: "white",
                  border: "1px solid #ddd",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                  borderRadius: "8px",
                }}
              >
                <FontAwesomeIcon
                  icon={faPrint}
                  style={{
                    fontSize: "22px",
                    marginTop: "2px",
                    fontWeight: "bold",
                  }}
                />
                <span style={{ fontSize: "12px" }}>Print</span>
              </Button>
            </Space>
          </Col>
        </Row>

        <Row
          style={{
            backgroundColor: "gray",
            padding: "8px",
            marginTop: "16px",
          }}
        >
          <Col justify="start">
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <p
                style={{
                  margin: 0,
                  fontWeight: "bold",
                  fontSize: "18px",
                  color: "white",
                }}
              >
                Your Build PC
              </p>
              <button
                style={{
                  margin: 0,
                  fontWeight: "bold",
                  fontSize: "16px",
                  backgroundColor: "white",
                  color: "black",
                  padding: "4px",
                }}
              >
                Estimated Power Consumption 0W
              </button>
            </div>
          </Col>
        </Row>

        {categories.map((category, index) => (
          <div key={index} style={{ marginBottom: 0 }}>
            <Row
              justify="space-between"
              align="middle"
              style={{ marginBottom: 0 }}
            >
              <Col span={24}>
                <Card
                  hoverable
                  bodyStyle={{ padding: "18px 16px" }} // less padding inside card
                  style={{
                    border: "1px solid #eee",
                    borderRadius: 0,
                    marginBottom: 0,
                  }}
                >
                  <Row justify="space-between" align="middle">
                    <Col>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                        }}
                      >
                        {getCategoryIcon(category)}
                        <h3 style={{ margin: 0 }}>{category}</h3>
                      </div>
                    </Col>
                    <Col>
                      <Button style={{ background: "black", color: "white" }}>
                        Select
                      </Button>
                    </Col>
                  </Row>
                </Card>
              </Col>
            </Row>

    
            {index !== categories.length - 1 && (
              <Divider style={{ margin: 0, borderColor: "black" }} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BuildNewPC;
