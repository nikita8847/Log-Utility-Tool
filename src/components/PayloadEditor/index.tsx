import React, { useState, useEffect } from 'react';
import {  Button, Collapse, Empty, message } from 'antd';
import styled from 'styled-components';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/theme-tomorrow';
import { flowSequences } from '../../constants/flowSequences';
import { ApiSequence, type FlowPayload } from '../../types';
import { CopyOutlined, UploadOutlined } from '@ant-design/icons';

const { Panel } = Collapse;

const EditorContainer = styled.div`
  height: calc(100vh - 180px);
  overflow-y: auto;
  padding: 1rem;
  background-color: var(--color-white);
 `;

const EditorTitle = styled.h3`
  margin-bottom: 1rem;
  color: var(--color-primary);
`;
const ButtonWrapper = styled.div`
  margin-top: 12px;
    display: flex
;

    align-items: center;
    justify-content: end;
    gap: 12px;
`;

const StyledCollapse = styled(Collapse)`
  background: var(--color-white);
  
  .ant-collapse-header {
    font-weight: 500;
    color: var(--color-primary) !important;
  }
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

const EditorWrapper = styled.div`
  width: 100%;
  // border: 1px solid #d9d9d9;
  border-radius: 4px;
`;

interface PayloadEditorProps {
  selectedFlow: string;
  onPayloadChange: (payloads: FlowPayload) => void;
}

const PayloadEditor: React.FC<PayloadEditorProps> = ({ selectedFlow, onPayloadChange }) => {
  const [payloads, setPayloads] = useState<FlowPayload>({});
  const [flowSequence, setFlowSequence] = useState<ApiSequence[]>([]);
  const [jsonErrors, setJsonErrors] = useState<Record<string, string>>({});


  useEffect(() => {
    if (selectedFlow && flowSequences[selectedFlow]) {
      setFlowSequence(flowSequences[selectedFlow]);


      const initialPayloads: FlowPayload = {};
      flowSequences[selectedFlow].forEach((step) => {
        const callName = ApiSequence[step];
        initialPayloads[callName] = initialPayloads[callName] || '{\n  \n}';
      });
      setPayloads(initialPayloads);

    } else {
      setFlowSequence([]);
      setPayloads({});
    }
  }, [selectedFlow]);

  const handleEditorChange = (value: string, step: ApiSequence) => {
    const callName = ApiSequence[step];
    const updatedPayloads = {
      ...payloads,
      [callName]: value
    };
    setPayloads(updatedPayloads)
    try {
      const parsedPayloads: FlowPayload = {};
      Object.entries(updatedPayloads).forEach(([key, val]) => {
        if (val.trim() === '') return;
        parsedPayloads[key as ApiSequence] = JSON.parse(val);
      });
      onPayloadChange(parsedPayloads);
      setJsonErrors((prev) => {
        const { [callName]: _, ...rest } = prev;
        return rest;
      });
    } catch (err) {
      setJsonErrors((prev) => ({
        ...prev,
        [callName]: `Invalid JSON: ${err instanceof Error ? err.message : String(err)}`
      }));
      // Optional: Log or display an error if invalid

      console.warn(`Invalid JSON in step "${step}"`, err);
    }

    setPayloads(updatedPayloads);
    // onPayloadChange(updatedPayloads);
  };

  if (!selectedFlow || flowSequence.length === 0) {
    return (
      <EditorContainer>
        <Empty description="Select a flow to see available API calls" />
      </EditorContainer>
    );
  }

  return (
    <EditorContainer>
      <EditorTitle>API Call Payloads</EditorTitle>
      <StyledCollapse accordion>
        {flowSequence.map((step) => (
          <Panel header={`${ApiSequence[step]}`} key={step}>
            <EditorWrapper>
              <AceEditor
                mode="json"
                theme="tomorrow"
                name={`editor-${step}`}
                value={payloads[ApiSequence[step]] || '{\n  \n}'}
                onChange={(value) => handleEditorChange(value, step)}
                width="100%"
                height="250px"
                fontSize={14}
                showPrintMargin={false}
                showGutter={true}
                highlightActiveLine={true}
                setOptions={{
                  enableBasicAutocompletion: true,
                  enableLiveAutocompletion: true,
                  enableSnippets: true,
                  showLineNumbers: true,
                  tabSize: 2,
                }}
              />
              {jsonErrors[step] && (
                <div style={{ color: 'red', marginTop: '8px', fontSize: '0.9rem' }}>
                  {jsonErrors[step]}
                </div>
              )}
              <ButtonWrapper style={{ marginTop: '12px' }}>
                <input
                  type="file"
                  accept=".json,application/json"
                  style={{ display: 'none' }}
                  id={`file-upload-${step}`}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = (event) => {
                        try {
                          const json = JSON.parse(event?.target?.result as string);
                          handleEditorChange(JSON.stringify(json, null, 2), step);
                        } catch (err) {
                          alert('Invalid JSON file.');
                        }
                      };
                      reader.readAsText(file);
                    }
                    e.target.value = ''; // reset so same file can be uploaded again if needed
                  }}
                />
                <StyledButton
                  onClick={() => document.getElementById(`file-upload-${step}`)?.click()}
                
                  icon={<UploadOutlined />}
                >
                  Upload JSON
                </StyledButton>
                <StyledButton
                  icon={<CopyOutlined />}
                  onClick={() => {
                    const payload = payloads[ApiSequence[step]] || '{}';
                    navigator.clipboard.writeText(payload)
                      .then(() => {
                        message.success('Copied to clipboard!');
                      })

                  }}
                />

            
              </ButtonWrapper>
            </EditorWrapper>
          </Panel>
        ))}
      </StyledCollapse>
    </EditorContainer>
  );
};

export default PayloadEditor;
