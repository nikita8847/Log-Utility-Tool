import React, { useState, useEffect } from 'react';
import { Collapse, Empty } from 'antd';
import styled from 'styled-components';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/theme-tomorrow';
import { flowSequences } from '../../constants/flowSequences';
import { ApiSequence, type FlowPayload } from '../../types';

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

const StyledCollapse = styled(Collapse)`
  background: var(--color-white);
  
  .ant-collapse-header {
    font-weight: 500;
    color: var(--color-primary) !important;
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
            </EditorWrapper>
          </Panel>
        ))}
      </StyledCollapse>
    </EditorContainer>
  );
};

export default PayloadEditor;
