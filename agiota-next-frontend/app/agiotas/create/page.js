'use client';
import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useRouter } from 'next/navigation';
import { cadastrarAgiota } from "@/app/lib/funcoes";
import { Row, Col, InputGroup, Form as BootstrapForm, Button, Navbar } from 'react-bootstrap';
import { Eye, EyeSlash } from 'react-bootstrap-icons';
import styles from './CreateAgiota.module.css';

export default function CreateAgiota() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(prevState => !prevState);
  };

  const initialValues = {
    nome: "",
    telefone: "",
    dataDeNascimento: "",
    login: {
      email: "",
      senha: "",
    },
    endereco: {
      cep: "",
      numero: "",
      rua: "",
      bairro: "",
      cidade: "",
      estado: "",
    },
  };

  const validate = (values) => {
    const errors = {};

    if (!values.nome) {
      errors.nome = 'Nome é obrigatório';
    }

    if (!values.telefone) {
      errors.telefone = 'Telefone é obrigatório';
    }

    if (!values.dataDeNascimento) {
      errors.dataDeNascimento = 'Data de nascimento é obrigatória';
    }

    if (!values.login.email) {
      errors.login = errors.login || {};
      errors.login.email = 'Email é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(values.login.email)) {
      errors.login = errors.login || {};
      errors.login.email = 'Email inválido';
    }

    if (!values.login.senha) {
      errors.login = errors.login || {};
      errors.login.senha = 'Senha é obrigatória';
    }

    if (!values.endereco.cep) {
      errors.endereco = errors.endereco || {};
      errors.endereco.cep = 'CEP é obrigatório';
    }

    if (!values.endereco.numero) {
      errors.endereco = errors.endereco || {};
      errors.endereco.numero = 'Número é obrigatório';
    }

    if (!values.endereco.rua) {
      errors.endereco = errors.endereco || {};
      errors.endereco.rua = 'Rua é obrigatória';
    }

    if (!values.endereco.bairro) {
      errors.endereco = errors.endereco || {};
      errors.endereco.bairro = 'Bairro é obrigatório';
    }

    if (!values.endereco.cidade) {
      errors.endereco = errors.endereco || {};
      errors.endereco.cidade = 'Cidade é obrigatória';
    }

    if (!values.endereco.estado) {
      errors.endereco = errors.endereco || {};
      errors.endereco.estado = 'Estado é obrigatório';
    }

    return errors;
  };

  const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
    try {
      await cadastrarAgiota(values);
      router.push('/agiotas');
      router.refresh();
    } catch (error) {
      const terceiroDoisPontos = error.message.split(':').slice(0, 2).join(':').length + 1;
      const posicaoPontoEVirgula = error.message.indexOf(';', terceiroDoisPontos);
      const mensagemDeErro = error.message.substring(terceiroDoisPontos, posicaoPontoEVirgula).trim().split('\n')[0];
      setFieldError('general', mensagemDeErro === "fetch failed" ? "O Servidor está desligado." : mensagemDeErro);
    }
    setSubmitting(false);
  };

  return (
    <>
      {/* Top Bar */}
      <div className={styles.topBar}>
        <span className={styles.pageTitle}>Página de Cadastro de Agiotas</span>
      </div>
      <main className={`${styles.mainContainer} d-flex flex-column align-items-center`}>
        <Formik
          initialValues={initialValues}
          validate={validate}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form className="w-75">
              {errors.general && <div className="alert alert-danger">{errors.general}</div>}

              <Row className="mb-3">
                <Col md={6}>
                  <BootstrapForm.Label className={styles.customLabel}>Nome</BootstrapForm.Label>
                  <InputGroup>
                    <Field
                      type="text"
                      name="nome"
                      placeholder="Digite o nome"
                      className={`form-control ${styles.input} ${errors.nome && touched.nome ? styles.inputError : ''}`}
                    />
                  </InputGroup>
                  <ErrorMessage name="nome" component="div" className="text-danger mt-1" />
                </Col>
                <Col md={6}>
                  <BootstrapForm.Label className={styles.customLabel}>Telefone</BootstrapForm.Label>
                  <InputGroup>
                    <Field
                      type="number"
                      name="telefone"
                      placeholder="Digite o telefone"
                      className={`form-control ${styles.input} ${errors.telefone && touched.telefone ? styles.inputError : ''}`}
                    />
                  </InputGroup>
                  <ErrorMessage name="telefone" component="div" className="text-danger mt-1" />
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md={6}>
                  <BootstrapForm.Label className={styles.customLabel}>Data de Nascimento</BootstrapForm.Label>
                  <InputGroup>
                    <Field
                      type="date"
                      name="dataDeNascimento"
                      className={`form-control ${styles.input} ${errors.dataDeNascimento && touched.dataDeNascimento ? styles.inputError : ''}`}
                    />
                  </InputGroup>
                  <ErrorMessage name="dataDeNascimento" component="div" className="text-danger mt-1" />
                </Col>
              </Row>
              <Row className="mb-3">
                <Col md={6}>
                  <BootstrapForm.Label className={styles.customLabel}>Email</BootstrapForm.Label>
                  <InputGroup>
                    <Field
                      type="email"
                      name="login.email"
                      placeholder="Digite o email"
                      className={`form-control ${styles.input} ${errors.login?.email && touched.login?.email ? styles.inputError : ''}`}
                    />
                  </InputGroup>
                  <ErrorMessage name="login.email" component="div" className="text-danger mt-1" />
                </Col>
                <Col md={6}>
                  <BootstrapForm.Label className={styles.customLabel}>Senha</BootstrapForm.Label>
                  <InputGroup className={styles.inputGroup}>
                    <Field
                      type={showPassword ? "text" : "password"}
                      name="login.senha"
                      placeholder="Digite a senha"
                      className={`form-control ${styles.input} ${errors.login?.senha && touched.login?.senha ? styles.inputError : ''}`}
                    />
                    <InputGroup.Text className={styles.eyeIcon} onClick={togglePasswordVisibility}>
                      {showPassword ? '👁️' : '🙈'}
                    </InputGroup.Text>
                  </InputGroup>
                  <ErrorMessage name="login.senha" component="div" className="text-danger mt-1" />
                </Col>
              </Row>
              <Row className="mb-3">
                <Col md={4}>
                  <BootstrapForm.Label className={styles.customLabel}>CEP</BootstrapForm.Label>
                  <InputGroup>
                    <Field
                      type="number"
                      name="endereco.cep"
                      placeholder="Digite o CEP"
                      className={`form-control ${styles.input} ${errors.endereco?.cep && touched.endereco?.cep ? styles.inputError : ''}`}
                    />
                  </InputGroup>
                  <ErrorMessage name="endereco.cep" component="div" className="text-danger mt-1" />
                </Col>
                <Col md={4}>
                  <BootstrapForm.Label className={styles.customLabel}>Número</BootstrapForm.Label>
                  <InputGroup>
                    <Field
                      type="number"
                      name="endereco.numero"
                      placeholder="Digite o número"
                      className={`form-control ${styles.input} ${errors.endereco?.numero && touched.endereco?.numero ? styles.inputError : ''}`}
                    />
                  </InputGroup>
                  <ErrorMessage name="endereco.numero" component="div" className="text-danger mt-1" />
                </Col>
                <Col md={4}>
                  <BootstrapForm.Label className={styles.customLabel}>Rua</BootstrapForm.Label>
                  <InputGroup>
                    <Field
                      type="text"
                      name="endereco.rua"
                      placeholder="Digite a rua"
                      className={`form-control ${styles.input} ${errors.endereco?.rua && touched.endereco?.rua ? styles.inputError : ''}`}
                    />
                  </InputGroup>
                  <ErrorMessage name="endereco.rua" component="div" className="text-danger mt-1" />
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md={4}>
                  <BootstrapForm.Label className={styles.customLabel}>Bairro</BootstrapForm.Label>
                  <InputGroup>
                    <Field
                      type="text"
                      name="endereco.bairro"
                      placeholder="Digite o bairro"
                      className={`form-control ${styles.input} ${errors.endereco?.bairro && touched.endereco?.bairro ? styles.inputError : ''}`}
                    />
                  </InputGroup>
                  <ErrorMessage name="endereco.bairro" component="div" className="text-danger mt-1" />
                </Col>
                <Col md={4}>
                  <BootstrapForm.Label className={styles.customLabel}>Cidade</BootstrapForm.Label>
                  <InputGroup>
                    <Field
                      type="text"
                      name="endereco.cidade"
                      placeholder="Digite a cidade"
                      className={`form-control ${styles.input} ${errors.endereco?.cidade && touched.endereco?.cidade ? styles.inputError : ''}`}
                    />
                  </InputGroup>
                  <ErrorMessage name="endereco.cidade" component="div" className="text-danger mt-1" />
                </Col>
                <Col md={4}>
                  <BootstrapForm.Label className={styles.customLabel}>Estado</BootstrapForm.Label>
                  <InputGroup>
                    <Field
                      type="text"
                      name="endereco.estado"
                      placeholder="Digite o estado"
                      className={`form-control ${styles.input} ${errors.endereco?.estado && touched.endereco?.estado ? styles.inputError : ''}`}
                    />
                  </InputGroup>
                  <ErrorMessage name="endereco.estado" component="div" className="text-danger mt-1" />
                </Col>
              </Row>

              <Button type="submit" variant="primary" disabled={isSubmitting} className={styles.submitButton} style={{ marginTop: "0.5rem" }}>
                {isSubmitting ? 'Registrando...' : 'Registrar Agiota'}
              </Button>
            </Form>
          )}
        </Formik>
      </main>
    </>
  );
}
