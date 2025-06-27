import SMSFlowForm from "../../components/SMSFlowForm/SMSFlowForm";
import StartCapture from "../../components/StartCapture/StartCapture";

export const SMSFlow = () => {
  return (
    <div>
      <SMSFlowForm />

      <StartCapture
        fetchURL="http://localhost:5000/api/start"
        btnTitle="Start Capture"
        iFrame={false}
      />
    </div>
  );
};
