import StartCapture from "../../components/StartCapture/StartCapture";

export const SMSFlow = () => {
  return (
    <div>
      <h1>SMSFlow</h1>
      <StartCapture
        fetchURL="http://localhost:5000/api/start"
        btnTitle="Start Capture"
        iFrame={false}
      />
    </div>
  );
};
