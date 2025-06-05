import { useState } from "react";
import styled from "styled-components";
import { GlobalStyle } from "./styles/theme";
import Navbar from "./components/Navbar";
import FlowForm from "./components/FlowForm";
import PayloadEditor from "./components/PayloadEditor";
import ReportGenerator from "./components/ReportGenerator";
import type { FormData as AppFormData, FlowPayload } from "./types";
import { notification } from "antd";

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const BottomSection = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const EditorSection = styled.div`
  flex: 1;
  border-right: 1px solid var(--color-light);
`;

const ReportSection = styled.div`
  flex: 1;
`;

function App() {
  const [formData, setFormData] = useState<AppFormData>({
    domain: "",
    version: "",
    bppId: "",
    bapId: "",
    flowName: "",
  });

  const [payloads, setPayloads] = useState<FlowPayload>({});

  const handleFormChange = (values: AppFormData) => {
    setFormData(values);
  };

  const handlePayloadChange = (updatedPayloads: FlowPayload) => {
    setPayloads(updatedPayloads);
  };

  notification.config({
    placement: "topRight",
    duration: 3,
  });
  return (
    <AppContainer>
      <GlobalStyle />
      <Navbar />
      <MainContent>
        <FlowForm onFormChange={handleFormChange} />
        <BottomSection>
          <EditorSection>
            <PayloadEditor
              selectedFlow={formData?.flowName || ""}
              onPayloadChange={handlePayloadChange}
              domain={formData?.domain || ""}
            />
          </EditorSection>
          <ReportSection>
            <ReportGenerator
              formData={formData}
              payloads={payloads}
            />
          </ReportSection>
        </BottomSection>
      </MainContent>
    </AppContainer>
  );
}

export default App;
