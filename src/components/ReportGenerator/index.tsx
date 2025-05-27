import React, { useMemo, useState } from 'react';
import axios from 'axios';
import { Button, Space, Typography, Card, Tooltip, notification } from 'antd';
import { FileTextOutlined, LoadingOutlined, VerticalAlignBottomOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { ApiSequence, type FlowPayload, type FormData } from '../../types';
import { flowSequences } from '../../constants/flowSequences';

const { Title } = Typography;

const ReportContainer = styled.div`
  padding: 1.5rem;
  background-color: var(--color-white);
  height: calc(100vh - 180px);
  overflow-y: auto;
  display: flex;
  flex-direction: column;
 
`;

const StyledCard = styled(Card)`
  margin-bottom: 1rem;

`;

const ReportHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

const StyledButton = styled(Button)`
  background-color: var(--color-primary);
  color:var(--color-white);
  &:hover{
    background-color: var(--color-white) !important;
    border-color:var(--color-primary) !important;
    color:var(--color-primary) !important;
  }
    
  

`;

interface ReportGeneratorProps {
  formData: FormData;
  payloads: FlowPayload;
}

const ReportGenerator: React.FC<ReportGeneratorProps> = ({ formData, payloads }) => {
  const [report, setReport] = useState({})
  const [isLoading, setisLoading] = useState(false)
  const { domain, version, bppId, bapId, flowName } = formData;


  const openNotification = (message: string, type: 'success' | 'error' | 'info' | 'warning' = 'info') => {
    notification[type]({
      message,
      description: '',
      placement: 'topRight', 

    });
  };

  const isFormDataComplete = useMemo(() => {
    const { domain, version, bppId, bapId, flowName } = formData;
    return domain && version && bppId && bapId && flowName;
  }, [formData]);
  const arePayloadsComplete = useMemo(() => {
    const { flowName } = formData;

    // If no flow is selected or flow sequence doesn't exist
    if (!flowName || !flowSequences[flowName]) {
      return false;
    }


    const requiredApis = flowSequences[flowName] as ApiSequence[];
    // If there are no payloads at all
    if (Object.keys(payloads).length === 0) {
      return false;
    }

    // Check each API in the flow
    return requiredApis.every((api) => {
      const payloadKey = ApiSequence[api];
      const currentPayload = payloads[payloadKey];
      const isPayloadEmpty = JSON.stringify(currentPayload).trim() === '{}' || JSON.stringify(currentPayload).trim() === '{\n  \n}';
      if (
        !currentPayload ||
        isPayloadEmpty
      ) {
        return false;
      }
      return true;


    });
  }, [formData, payloads]);

  // Button should be disabled if either form data or payloads are incomplete
  const isGenerateButtonDisabled = !isFormDataComplete || !arePayloadsComplete;

  const generateReport = async () => {
    setisLoading(true)

    // Process payloads to ensure they're proper JSON objects, not strings
    const processedPayloads: Record<string, any> = {};

    for (const key in payloads) {
      try {
        // Parse the JSON string to get the actual object
        const payloadValue = payloads[key];
        processedPayloads[key] = typeof payloadValue === 'string'
          ? JSON.parse(payloadValue)
          : payloadValue;
      } catch (e) {
        // If parsing fails, use the original value
        processedPayloads[key] = payloads[key];
      }
    }



    const reportData = {
      domain,
      version,
      bpp_id: bppId,
      bap_id: bapId,
      flow: flowName,
      generatedAt: new Date().toISOString(),
      payload: processedPayloads
    };

    const url = import.meta.env.VITE_BASE_URL;
    try {
      const response = await axios.post(url + '/api/validate', reportData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setReport(response.data?.response?.report)
      openNotification("Report Generated Successfully", 'success');


      if (response.data?.response?.report) {
        setisLoading(false)

      }
    } catch (error) {
      setisLoading(false)
      openNotification("Something went wrong", 'error');

    }




  };

  const downloadReport = () => {
    // Create a downloadable file
    const dataStr = JSON.stringify(report, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);

    const exportFileDefaultName = `ondc-flow-${flowName}-report-${new Date().toISOString().split('T')[0]}.json`;

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  }



  return (
    <ReportContainer>
      <ReportHeader>
        <Title level={4} style={{ margin: 0, color: 'var(--color-primary)' }}>
          Report Generator
        </Title>
        <ButtonContainer>
          <Tooltip
            color='var(--color-gray)'
            title={
              !isFormDataComplete
                ? "Please fill in all form fields"
                : !arePayloadsComplete
                  ? "Please provide payloads for all API calls"
                  : "Generate Report"
            }
          >
            <StyledButton
              icon={isLoading ? <LoadingOutlined style={{ color: 'var(--color-primary)' }} spin /> : <FileTextOutlined />}
              onClick={generateReport}
            disabled={isGenerateButtonDisabled}
            >
              Generate Report
            </StyledButton>
          </Tooltip>

          <StyledButton

            icon={<VerticalAlignBottomOutlined />}
            onClick={() => downloadReport()}
            disabled={isGenerateButtonDisabled}
          >
            Download Report
          </StyledButton>
        </ButtonContainer>
      </ReportHeader>
      {
        formData &&
        <StyledCard title="Configuration Summary">
          <p><strong>Domain:</strong> {formData.domain || 'Not specified'}</p>
          <p><strong>Version:</strong> {formData.version || 'Not specified'}</p>
          <p><strong>BPP ID:</strong> {formData.bppId || 'Not specified'}</p>
          <p><strong>BAP ID:</strong> {formData.bapId || 'Not specified'}</p>
          <p><strong>Flow:</strong> Flow {formData.flowName || 'Not specified'}</p>
        </StyledCard>
      }

      {
        payloads &&
        <StyledCard title="Flow Status">
          <Space direction="vertical" style={{ width: '100%' }}>
            {Object.keys(payloads).length > 0 ? (
              Object.keys(payloads).map((key) => (
                <div key={key}>
                  <p>
                    <strong>{`${key}`}:</strong>{' '}
                    {payloads[key]
                      // && payloads[key].trim() !== '{\n  \n}' 
                      ? '✅ Payload provided'
                      : '❌ Payload missing'
                    }
                  </p>
                </div>
              ))
            ) : (
              <p>No payload data available. Please select a flow and provide payloads.</p>
            )}
          </Space>
        </StyledCard>
      }



      {
        report ? (
          <StyledCard title="Report">
            <Space direction="vertical" style={{ width: '100%' }}>
              <div >

                {Object.keys(report).length > 0 ? (
                  Object.entries(report).map(([flowKey, errors], index) => (
                    <div key={index} style={{ marginBottom: '1rem' }}>
                      <h3 style={{ marginBottom: '0.5rem' }}>{flowKey}</h3>
                      {errors && typeof errors === 'object' ? (
                        Object.entries(errors).map(([errorKey, message], i) => (
                          <div key={i} style={{ marginLeft: '1rem', marginBottom: '0.3rem' }}>
                            <strong>{errorKey}:</strong> <span>{message}</span>
                          </div>
                        ))
                      ) : (
                        <p>No error details found.</p>
                      )}
                    </div>
                  ))
                ) : (
                  <p>No report data available. Please generate report.</p>
                )}
              </div>

            </Space>
          </StyledCard>) : ''
      }

    </ReportContainer>
  );
};

export default ReportGenerator;
