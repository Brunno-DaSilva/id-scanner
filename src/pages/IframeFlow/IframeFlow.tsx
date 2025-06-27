import StartCapture from "../../components/StartCapture/StartCapture";

export const IframeFlow = () => {
  return (
    <div>
      <h1>IframeFlow</h1>
      <StartCapture
        fetchURL="http://localhost:5000/api/start"
        btnTitle="Start Capture"
        iFrame={true}
      />
    </div>
  );
};
