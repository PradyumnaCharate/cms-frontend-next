"use client";

import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Image,
  Row,
  Spinner,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
// import { selectAuth, setToken, setUser } from '../features/authSlice';
// import { useLoginUserMutation } from '../features/apiSlice';
// import { getError } from '../utils/error';
import FormField from "@/components/FormField";
import { selectAuth } from "@/features/authSlice";
import { axiosInstance, baseAddr } from "@/utils/api";
import { useRouter } from "next/navigation";
// import { toast } from 'react-toastify';

function Auth() {
  // const [loginUser,{isLoading}] = useLoginUserMutation();
  let token;
  if (typeof window !== "undefined") {
    token = localStorage.getItem("token");
  }
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = `/users/login`;
    const method = "POST";

    try {
      setLoading(true);
      const { data } = await axiosInstance.post(endpoint, {
        email: form?.email,
        password: form?.password,
      });
      console.log(data?.data?.token);

      if (data?.data?.token && data?.data?.user) {
        localStorage.setItem("token", data?.data?.token);
        localStorage.setItem("user", JSON.stringify(data?.data?.user));
      }

      setLoading(false);

      // router.push('/dash/blogs');
    } catch (error) {
      setLoading(false);
      console.error("Error submitting form:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({ ...form, [name]: value });
  };

  const formElements = [
    {
      label: "Email",
      type: "email",
      placeholder: "Your Email Here",
      name: "email",
      value: form?.email,
    },
    {
      label: "Password",
      type: "password",
      placeholder: "Shh...!",
      name: "password",
      value: form?.password,
    },
  ];

  useEffect(() => {
    if (token) {
      router.push("/dash/blogs");
    }
  }, [token]);

  return (
    <section className="bg-color">
      <Container className="p-md-5 vh-100 d-flex  justify-content-center align-items-center">
        <Card
          className="glass-morf shadow rounded-4 p-4 text-white"
          style={{ background: "var(--secondary-color)" }}
        >
          <Form style={{ maxWidth: "400px" }} onSubmit={handleSubmit}>
            <div className="text-center">
              {/* <Image src='/sayv-logo.png' /> */}
              <h3 className="text-dark">CMS</h3>
              <h2 className="text-center">Admin Login</h2>
            </div>
            <Row>
              {formElements?.map((data, i) => (
                <Col key={i} sm={12}>
                  <FormField
                    type={data?.type}
                    label={data?.label}
                    placeholder={data?.placeholder}
                    name={data?.name}
                    value={data?.value}
                    onChange={handleChange}
                  />
                </Col>
              ))}
            </Row>

            <Row>
              {/* <Col>
                    <Button variant='transparent' type='reset' className='m-1 text-white '><u>Reset</u></Button>
                    </Col> */}
              <Col className="text-center">
                <Button
                  type="submit"
                  disabled={loading}
                  variant="transparent"
                  className="action-btn ms-auto m-1 w-50"
                >
                  {loading ? <Spinner size="sm" /> : "Login"}
                </Button>
              </Col>
            </Row>
          </Form>
        </Card>
      </Container>
    </section>
  );
}

export default Auth;
