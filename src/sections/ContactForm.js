"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Row, Col, Container, Button } from "react-bootstrap";
import InputGroup from "../components/Core/InputGroup";
import { validateEmail, validateText } from "../utils/validation";
import ContactModal from "../components/ContactModal";

const RenderInputs = ({ elements, setValues, values }) => {
  return elements.map((element, id) => {
    const { label, name } = element;
    const type = element.type.toLowerCase();

    if (
      type === "email" ||
      type === "text" ||
      type === "textarea" ||
      type === "password" ||
      type === "singleselect"
    ) {
      return (
        <Col lg="12" md={type === "textarea" ? "12" : "6"} key={name}>
          <InputGroup
            label={label}
            name={name}
            type={type}
            value={values[name] ? values[name].value : ""}
            handleChange={(e) =>
              setValues({
                ...values,
                [name]: { ...values[name], value: e.target.value },
              })
            }
            handleBlur={(e) => {
              setValues({
                ...values,
                [name]: {
                  ...values[name],
                  error:
                    type !== "email"
                      ? validateText(label, e.target.value)
                      : validateEmail(label, e.target.value),
                },
              });
            }}
            error={values[name]?.value ? "" : values[name]?.error}
            textarea={type === "textarea"}
          />
        </Col>
      );
    } else {
      return <React.Fragment key={name}></React.Fragment>;
    }
  });
};

const ContactForm = ({ data }) => {
  const [values, setValues] = useState({});
  const [modalShow, setModalShow] = useState(false);
  const router = useRouter();

  useEffect(() => {
    let tempValues = {};
    data.form.elements.map((element, id) => {
      const { label, name, defaultValue } = element;
      const type = element.type.toLowerCase();

      if (type === "email" || type === "text" || type === "textarea") {
        tempValues = {
          ...tempValues,
          [name]: { value: defaultValue, error: "", name, label, type },
        };
      }
    });

    setValues({ ...tempValues });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isError = Object.values(values).some((inValues, id) => {
      const { value } = inValues;
      return !value ? true : false;
    });
    if (isError) {
      let tempValues = { ...values };
      Object.values(values).map((inValues, id) => {
        tempValues = {
          ...tempValues,
          [inValues.name]: {
            ...inValues,
            error:
              inValues["type"] !== "email"
                ? validateText(inValues["label"], e.target.value)
                : validateEmail(inValues["label"], e.target.value),
          },
        };
      });
      setValues({ ...tempValues });
    } else {
      const formData = new FormData();
      // setModalShow(true);

      Object.entries(values).map((inValue) => {
        formData.append(inValue[0], inValue[1].value);
      });

      try {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL.slice(0, -1)}${data.link.href}`,
          formData
          // {
          //   headers: {
          //     "Content-Type": "multipart/form-data",
          //     "Access-Control-Allow-Origin": "*",
          //     "Access-Control-Allow-Origin":"origin-list",
          //     "Access-Control-Allow-Origin": "http://t3shiva.ddev.site/",
          //     "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
          //     "Access-Control-Allow-Credentials": "true",
          //   },
          // }
        );
        let status;
        res.data.content.colPos0.map((comp) => {
          if (comp.type === "form_formframework") {
            status = comp.content.form.api.status;
          }
        });
        let tempValues = { ...values };
        Object.values(values).map((inValues, id) => {
          tempValues = {
            ...tempValues,
            [inValues.name]: {
              ...inValues,
              value: "",
            },
          };
        });
        setValues({ ...tempValues });
        status === "success" && setModalShow(true);
      } catch (e) {
        console.log(e, "e");
      }
    }
  };
  function GetButtonText(element) {
    return element.type === "StaticText";
  }
  return (
    <Container>
      <div className="login-form bg-white border-gray-3 px-8 pb-9 px-sm-11 py-sm-18 pt-15 shadow-1 rounded-10">
        <form onSubmit={handleSubmit}>
          <Row className="justify-content-center pt-5">
            <Col lg="9">
              <div className="px-md-15 text-center">
                <h2 className="title heading-text-2 mb-9">
                  {data.form.id && (
                    <React.Fragment>
                      {data.form.id.split("-", 1)}
                    </React.Fragment>
                  )}
                </h2>
                <p className="heading-text-8 mb-13 mb-lg-22">
                  <React.Fragment>
                    {data.form.elements.filter(GetButtonText).length &&
                    data.form.elements.filter(GetButtonText)[0].label ===
                      "Send Reset Link"
                      ? `Enter your email to get reset link`
                      : `To get started, you need to ${
                          data.form.elements.filter(GetButtonText).length &&
                          data.form.elements.filter(GetButtonText)[0].label
                        } here`}
                  </React.Fragment>
                </p>
              </div>
            </Col>
            <RenderInputs
              elements={data.form.elements}
              values={values}
              setValues={setValues}
            />
            <Col lg="3" md="7">
              <Button className="form-btn btn btn-primary w-100" type="submit">
                {data.form.elements.filter(GetButtonText).length &&
                  data.form.elements.filter(GetButtonText)[0].label}
              </Button>
            </Col>
          </Row>
        </form>
        <ContactModal
          show={modalShow}
          onHide={() => (setModalShow(false), router.push("/"))}
        />
      </div>
    </Container>
  );
};

export default ContactForm;
