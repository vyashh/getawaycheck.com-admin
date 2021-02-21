import React, { useRef, useState, useContext } from "react";
import { Context } from "../services/store";
import { Form, Button, Card, Alert, Container } from "react-bootstrap";
import { useAuth } from "../providers/AuthProvider";
import { useHistory, Redirect } from "react-router-dom";
import Loading from "../components/loading/loading,component";

export default function Signup() {
  const { errorLogin, loadingIndicator } = useContext(Context);
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login, currentUser } = useAuth();
  const [error, setError] = errorLogin;
  const [loading, setLoading] = loadingIndicator;
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      history.push("/");
    } catch {
      setError("Failed to log in");
    }
    setLoading(false);
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="w-100" style={{ maxWidth: "40%" }}>
          {!currentUser && !loading ? (
            <Card>
              <Card.Body>
                <h2 className="text-center mb-4">Inloggen</h2>

                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                  <Form.Group id="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" ref={emailRef} required />
                  </Form.Group>{" "}
                  <Form.Group id="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" ref={passwordRef} required />
                  </Form.Group>{" "}
                  <Button disabled={loading} type="submit" className="w-100">
                    Login
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          ) : (
            <Redirect to="/" />
          )}
        </div>
      </Container>
    </>
  );
}
