'use client';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useRouter } from 'next/navigation';
import { cadastrarAgiota } from "@/app/lib/funcoes";
import { Row, Col, InputGroup, Form as BootstrapForm, Button } from 'react-bootstrap';
import styles from './CreateAgiota.module.css';

export default function CreateAgiota() {
  const router = useRouter();

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

    // Validações dos campos
    // (Mesmo código de validação usado anteriormente)

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
    <main className={`${styles.mainContainer} d-flex flex-column align-items-center`}>
      <h1 className={styles.heading}>Página de Cadastro de Agiotas</h1>

      <Formik
        initialValues={initialValues}
        validate={validate}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors }) => (
          <Form className="w-75">
            {errors.general && <div className="alert alert-danger">{errors.general}</div>}

            <Row className="mb-3">
              <Col md={6}>
                <BootstrapForm.Label>Nome:</BootstrapForm.Label>
                <InputGroup>
                  <Field
                    type="text"
                    name="nome"
                    placeholder="Digite o nome"
                    className={`form-control ${styles.input}`}
                  />
                  <ErrorMessage name="nome" component="div" className="text-danger" />
                </InputGroup>
              </Col>
              <Col md={6}>
                <BootstrapForm.Label>Telefone:</BootstrapForm.Label>
                <InputGroup>
                  <Field
                    type="text"
                    name="telefone"
                    placeholder="Digite o telefone"
                    className={`form-control ${styles.input}`}
                  />
                  <ErrorMessage name="telefone" component="div" className="text-danger" />
                </InputGroup>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <BootstrapForm.Label>Data de Nascimento:</BootstrapForm.Label>
                <InputGroup>
                  <Field
                    type="date"
                    name="dataDeNascimento"
                    className={`form-control ${styles.input}`}
                  />
                  <ErrorMessage name="dataDeNascimento" component="div" className="text-danger" />
                </InputGroup>
              </Col>
            </Row>

            <h3 className={styles.subheading}>Login</h3>

            <Row className="mb-3">
              <Col md={6}>
                <BootstrapForm.Label>Email:</BootstrapForm.Label>
                <InputGroup>
                  <Field
                    type="email"
                    name="login.email"
                    placeholder="Digite o email"
                    className={`form-control ${styles.input}`}
                  />
                  <ErrorMessage name="login.email" component="div" className="text-danger" />
                </InputGroup>
              </Col>
              <Col md={6}>
                <BootstrapForm.Label>Senha:</BootstrapForm.Label>
                <InputGroup>
                  <Field
                    type="password"
                    name="login.senha"
                    placeholder="Digite a senha"
                    className={`form-control ${styles.input}`}
                  />
                  <ErrorMessage name="login.senha" component="div" className="text-danger" />
                </InputGroup>
              </Col>
            </Row>

            <h3 className={styles.subheading}>Endereço</h3>

            <Row className="mb-3">
              <Col md={4}>
                <BootstrapForm.Label>CEP:</BootstrapForm.Label>
                <InputGroup>
                  <Field
                    type="text"
                    name="endereco.cep"
                    placeholder="Digite o CEP"
                    className={`form-control ${styles.input}`}
                  />
                  <ErrorMessage name="endereco.cep" component="div" className="text-danger" />
                </InputGroup>
              </Col>
              <Col md={4}>
                <BootstrapForm.Label>Número:</BootstrapForm.Label>
                <InputGroup>
                  <Field
                    type="text"
                    name="endereco.numero"
                    placeholder="Digite o número"
                    className={`form-control ${styles.input}`}
                  />
                  <ErrorMessage name="endereco.numero" component="div" className="text-danger" />
                </InputGroup>
              </Col>
              <Col md={4}>
                <BootstrapForm.Label>Rua:</BootstrapForm.Label>
                <InputGroup>
                  <Field
                    type="text"
                    name="endereco.rua"
                    placeholder="Digite a rua"
                    className={`form-control ${styles.input}`}
                  />
                  <ErrorMessage name="endereco.rua" component="div" className="text-danger" />
                </InputGroup>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={4}>
                <BootstrapForm.Label>Bairro:</BootstrapForm.Label>
                <InputGroup>
                  <Field
                    type="text"
                    name="endereco.bairro"
                    placeholder="Digite o bairro"
                    className={`form-control ${styles.input}`}
                  />
                  <ErrorMessage name="endereco.bairro" component="div" className="text-danger" />
                </InputGroup>
              </Col>
              <Col md={4}>
                <BootstrapForm.Label>Cidade:</BootstrapForm.Label>
                <InputGroup>
                  <Field
                    type="text"
                    name="endereco.cidade"
                    placeholder="Digite a cidade"
                    className={`form-control ${styles.input}`}
                  />
                  <ErrorMessage name="endereco.cidade" component="div" className="text-danger" />
                </InputGroup>
              </Col>
              <Col md={4}>
                <BootstrapForm.Label>Estado:</BootstrapForm.Label>
                <InputGroup>
                  <Field
                    type="text"
                    name="endereco.estado"
                    placeholder="Digite o estado"
                    className={`form-control ${styles.input}`}
                  />
                  <ErrorMessage name="endereco.estado" component="div" className="text-danger" />
                </InputGroup>
              </Col>
            </Row>

            <Button type="submit" variant="primary" disabled={isSubmitting} className={styles.submitButton}>
              {isSubmitting ? 'Registrando...' : 'Registrar Agiota'}
            </Button>
          </Form>
        )}
      </Formik>
    </main>
  );
}
