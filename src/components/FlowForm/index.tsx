import React from 'react';
import styled from 'styled-components';
import { Form, Input, Select, Row, Col } from 'antd';
import { validFlows } from '../../constants/flowSequences';

const FormContainer = styled.div`
  padding: 1.5rem 2rem;
  background-color: var(--color-white);
  border-bottom: 1px solid var(--color-light);
  width: 100%;

  input {
  &:hover{
    border-color:var(--color-primary) !important;
  }
}
`;

const StyledForm = styled(Form)`
  width: 100%;
  
  .ant-form-item-label > label {
    color: var(--color-primary);
    font-weight: 500;
  }
`;

const StyledSelect = styled(Select)`
  width: 100%;
  select{
    &:hover{
    border-color:var(--color-primary) !important;
}}
`;

interface FormData {
  domain: string;
  version: string;
  bppId: string;
  bapId: string;
  flowName: string;
}

interface FlowFormProps {
  onFormChange: (values: any) => void;
}

const FlowForm: React.FC<FlowFormProps> = ({ onFormChange }) => {
  const [form] = Form.useForm();

  const handleFormChange = () => {
    const values = form.getFieldsValue();
    onFormChange(values as FormData);
  };

  return (
    <FormContainer>
      <StyledForm 
        form={form} 
        layout="horizontal" 
        onValuesChange={handleFormChange}
      
      >
        <Row gutter={24}>
          <Col xs={24} sm={12} md={4}>
            <Form.Item 
              label="Domain" 
              name="domain"
              rules={[{ required: true, message: 'Please enter domain!' }]}
            >
              <Input placeholder="Enter domain" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={4}>
            <Form.Item 
              label="Version" 
              name="version"
              rules={[{ required: true, message: 'Please enter version!' }]}
            >
              <Input placeholder="Enter version" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={5}>
            <Form.Item 
              label="BPP ID" 
              name="bppId"
              rules={[{ required: true, message: 'Please enter BPP ID!' }]}
            >
              <Input placeholder="Enter BPP ID" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={5}>
            <Form.Item 
              label="BAP ID" 
              name="bapId"
              rules={[{ required: true, message: 'Please enter BAP ID!' }]}
            >
              <Input placeholder="Enter BAP ID" />
            </Form.Item>
          </Col>
          <Col xs={24} md={6}>
            <Form.Item 
              label="Flow Name" 
              name="flowName"
              rules={[{ required: true, message: 'Please select a flow!' }]}
            >
              <StyledSelect placeholder="Select a flow">
                {validFlows.map((flow) => (
                  <Select.Option key={flow} value={flow}>
                    Flow {flow}
                  </Select.Option>
                ))}
              </StyledSelect>
            </Form.Item>
          </Col>
        </Row>
      </StyledForm>
    </FormContainer>
  );
};

export default FlowForm;
